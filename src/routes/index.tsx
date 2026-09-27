import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BellRing,
  Bot,
  ChevronDown,
  CloudLightning,
  CloudRain,
  Crosshair,
  Database,
  Gauge,
  Layers3,
  LocateFixed,
  Map,
  Menu,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  ThermometerSun,
  Wind,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useMemo, useState } from "react";

import weatherMap from "@/assets/vijayawada-weather-map.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StormSense | Convective Storm Operations" },
      { name: "description", content: "Operational storm sensing, hazard diagnostics, and six-hour convective nowcasting for Vijayawada." },
      { property: "og:title", content: "StormSense Convective Storm Operations" },
      { property: "og:description", content: "Radar-led storm analysis, hazard probabilities, and atmospheric scenario simulation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StormOperations,
});

const hazards = [
  { label: "Hail core", value: 15.3, unit: "%", state: "MODERATE", detail: "3.2 cm estimated", tone: "cool", icon: Crosshair },
  { label: "Lightning", value: 32, unit: "%", state: "ELEVATED", detail: "34 strikes / min", tone: "electric", icon: Zap },
  { label: "Cloudburst", value: 41.8, unit: "%", state: "HIGH", detail: "65 mm / hr", tone: "rain", icon: CloudRain },
  { label: "Downburst", value: 46.1, unit: "%", state: "STRONG", detail: "22.7 km/h gust", tone: "warning", icon: Wind },
] as const;

const forecast = [
  { time: "NOW", risk: 11, hail: 6, lightning: 14 },
  { time: "+30m", risk: 18, hail: 10, lightning: 23 },
  { time: "+1h", risk: 28, hail: 16, lightning: 35 },
  { time: "+2h", risk: 42, hail: 25, lightning: 49 },
  { time: "+3h", risk: 36, hail: 22, lightning: 43 },
  { time: "+4h", risk: 24, hail: 15, lightning: 31 },
  { time: "+5h", risk: 14, hail: 9, lightning: 20 },
  { time: "+6h", risk: 7, hail: 4, lightning: 11 },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="brand-radar"><Radio className="size-5" /></span>
      <span>
        <strong className="block font-display text-base leading-none">StormSense</strong>
        <small className="mt-1 block font-mono text-[9px] font-semibold uppercase text-muted-foreground">Convective operations · India</small>
      </span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="ops-header">
      <div className="mx-auto flex h-16 max-w-[1560px] items-center justify-between px-4 md:px-6">
        <Brand />
        <nav className="hidden h-full items-center lg:flex" aria-label="Main navigation">
          <a className="ops-nav ops-nav-active" href="#radar">Radar</a>
          <a className="ops-nav" href="#hazards">Hazards</a>
          <a className="ops-nav" href="#forecast">Nowcast</a>
          <a className="ops-nav" href="#simulator">Simulator</a>
        </nav>
        <div className="hidden items-center gap-5 sm:flex">
          <div className="text-right"><span className="data-label">Last scan</span><strong className="data-value text-xs">08:06:32 IST</strong></div>
          <span className="live-indicator"><i /> LIVE FEED</span>
          <Button variant="outline" size="icon" aria-label="Notification centre"><BellRing className="size-4" /></Button>
        </div>
        <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Open navigation" onClick={() => setOpen((value) => !value)}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</Button>
      </div>
      {open && <nav className="border-t border-border bg-card px-4 py-2 sm:hidden"><a className="mobile-link" href="#radar">Radar</a><a className="mobile-link" href="#hazards">Hazards</a><a className="mobile-link" href="#forecast">Nowcast</a><a className="mobile-link" href="#simulator">Simulator</a></nav>}
    </header>
  );
}

function OperationsBar({ paused, onPause }: { paused: boolean; onPause: () => void }) {
  const [scenario, setScenario] = useState("Rapid Intensification");
  return (
    <section className="ops-strip">
      <div className="min-w-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:flex sm:flex-wrap">
          <span className="threat-badge"><ShieldAlert className="size-3.5" /> SEVERE WEATHER WATCH</span>
          <span className="min-w-0 truncate text-xs font-semibold text-foreground">Vijayawada Urban Zone</span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">Cell VJY-04 · 16.5062° N, 80.6480° E · Southeast track at 42 km/h</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="select-wrap">
          <span className="sr-only">Forecast scenario</span>
          <select value={scenario} onChange={(event) => setScenario(event.target.value)}><option>Rapid Intensification</option><option>Cloudburst Escalation</option><option>Downburst Tracking</option></select>
          <ChevronDown className="size-4" />
        </label>
        <Button variant={paused ? "default" : "destructive"} size="sm" onClick={onPause}>{paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}{paused ? "Resume feed" : "Pause feed"}</Button>
      </div>
    </section>
  );
}

function RadarMap() {
  const [layer, setLayer] = useState("Reflectivity");
  return (
    <section id="radar" className="radar-shell" aria-label="Live composite weather radar">
      <img src={weatherMap} alt="Satellite and radar composite over Vijayawada" className="absolute inset-0 size-full object-cover" width={1408} height={912} />
      <div className="radar-shade" />
      <div className="radar-grid" />
      <div className="radar-sweep" />
      <div className="radar-topbar">
        <div><span className="data-label">Composite observation</span><h1 className="mt-1 font-display text-base font-semibold">Vijayawada Doppler Radar</h1></div>
        <span className="live-indicator"><i /> SCAN 08:06</span>
      </div>
      <div className="layer-panel">
        <span className="data-label">Observation layer</span>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {["Reflectivity", "Velocity", "Lightning", "Infrared"].map((item) => <Button key={item} type="button" variant={layer === item ? "default" : "secondary"} size="sm" onClick={() => setLayer(item)}>{item}</Button>)}
        </div>
        <div className="mt-3 border-t border-border pt-3"><span className="data-label">Reflectivity dBZ</span><div className="reflectivity-scale mt-2" /><div className="mt-1 flex justify-between font-mono text-[8px] text-muted-foreground"><span>5</span><span>20</span><span>35</span><span>50</span><span>65+</span></div></div>
      </div>
      <div className="map-tools"><Button variant="secondary" size="icon" aria-label="Zoom in"><ZoomIn className="size-4" /></Button><Button variant="secondary" size="icon" aria-label="Zoom out"><ZoomOut className="size-4" /></Button><Button variant="secondary" size="icon" aria-label="Locate storm"><LocateFixed className="size-4" /></Button><Button variant="secondary" size="icon" aria-label="Map layers"><Layers3 className="size-4" /></Button></div>
      <div className="storm-marker"><span className="storm-ring" /><i /><b>VJY-04</b><small>41.8% cloudburst</small></div>
      <div className="radar-readout"><span>RANGE 120 KM</span><span>ELEV 0.5°</span><span>RES 250 M</span><span className="hidden sm:inline">SOURCE INSAT-3DR + DWR</span></div>
    </section>
  );
}

function Metric({ label, value, unit, detail, tone = "primary" }: { label: string; value: string; unit: string; detail: string; tone?: string }) {
  return <div className={cn("metric-cell", `metric-${tone}`)}><span className="data-label">{label}</span><div className="mt-2 flex items-baseline gap-1"><strong className="font-display text-2xl">{value}</strong><span className="font-mono text-[10px] text-muted-foreground">{unit}</span></div><span className="mt-2 block text-[10px] text-muted-foreground">{detail}</span></div>;
}

function TelemetryRail() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const submit = (value: string) => { const next = value.trim(); if (!next) return; setMessages((items) => [...items, next]); setInput(""); };
  return (
    <aside className="telemetry-rail">
      <div className="panel-heading"><div><span className="data-label">Storm telemetry</span><h2 className="mt-1 font-display text-sm font-semibold">Live sensor fusion</h2></div><Settings2 className="size-4 text-muted-foreground" /></div>
      <div className="grid grid-cols-2">
        <Metric label="Wind velocity" value="42.8" unit="KM/H" detail="135° SE" />
        <Metric label="Pressure" value="998.2" unit="HPA" detail="−4.2 / 3h" tone="danger" />
        <Metric label="Rain rate" value="65" unit="MM/H" detail="Extreme" tone="rain" />
        <Metric label="Lightning" value="34" unit="STR/MIN" detail="CG frequent" tone="warning" />
      </div>
      <div className="advisory-block">
        <div className="flex items-center gap-2"><span className="icon-compact"><Bot className="size-4" /></span><div><span className="data-label">Storm analyst</span><h2 className="font-display text-sm font-semibold">Operational advisory</h2></div></div>
        <p className="mt-3 text-xs leading-5">Deep convection is consolidating east of Vijayawada. Lightning jump and rainfall rates support a <b>high-impact cloudburst signal</b> through the next 90 minutes.</p>
        <div className="mt-3 space-y-2">{messages.map((message, index) => <div key={`${message}-${index}`} className="analyst-message">{message}</div>)}</div>
        <div className="mt-3 flex flex-wrap gap-1.5">{["Explain cloudburst risk", "Show impact window"].map((prompt) => <Button key={prompt} variant="outline" size="sm" onClick={() => submit(prompt)}>{prompt}</Button>)}</div>
        <form className="mt-3 flex gap-2" onSubmit={(event) => { event.preventDefault(); submit(input); }}><input className="ops-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about this storm cell…" aria-label="Ask StormSense analyst" /><Button type="submit" size="icon" aria-label="Send"><Send className="size-4" /></Button></form>
      </div>
      <div className="warning-log"><div className="panel-heading"><div><span className="data-label">Warning log</span><h2 className="mt-1 font-display text-sm font-semibold">Active advisories</h2></div><span className="count-badge">02</span></div><div className="warning-item warning-critical"><b>08:04</b><span><strong>Cloudburst threshold exceeded</strong><small>Rain rate above 60 mm/h</small></span></div><div className="warning-item warning-watch"><b>07:58</b><span><strong>Lightning jump detected</strong><small>+18 strikes in 10 minutes</small></span></div></div>
    </aside>
  );
}

function HazardGrid() {
  return <section id="hazards"><div className="section-header"><div><span className="data-label">Probability diagnostics</span><h2 className="section-title">Hazard matrix</h2></div><span className="text-[10px] text-muted-foreground">RF ensemble · Confidence 82%</span></div><div className="hazard-grid">{hazards.map((hazard) => { const Icon = hazard.icon; return <article key={hazard.label} className={cn("hazard-card", `tone-${hazard.tone}`)}><div className="flex items-start justify-between"><span className="hazard-icon"><Icon className="size-4" /></span><span className="hazard-state">{hazard.state}</span></div><span className="mt-4 block text-xs font-semibold text-muted-foreground">{hazard.label}</span><div className="mt-1 flex items-baseline gap-1"><strong className="font-display text-3xl">{hazard.value}</strong><span className="font-mono text-xs text-muted-foreground">{hazard.unit}</span></div><div className="prob-track"><i style={{ width: `${hazard.value}%` }} /></div><span className="mt-3 block text-[10px] text-muted-foreground">{hazard.detail}</span></article>; })}</div></section>;
}

function ForecastChart() {
  const [active, setActive] = useState(3);
  const selected = forecast[active] ?? forecast[0] ?? { time: "NOW", risk: 0, hail: 0, lightning: 0 };
  return (
    <section id="forecast" className="instrument-panel">
      <div className="section-header"><div><span className="data-label">Probabilistic guidance</span><h2 className="section-title">0–6 hour convective nowcast</h2></div><div className="chart-legend"><span className="legend-risk">Composite</span><span className="legend-hail">Hail</span><span className="legend-lightning">Lightning</span></div></div>
      <div className="forecast-summary"><div><span className="data-label">Selected horizon</span><strong>{selected.time}</strong></div><div><span className="data-label">Composite risk</span><strong>{selected.risk}%</strong></div><div><span className="data-label">Peak window</span><strong>+2h</strong></div><div><span className="data-label">Confidence</span><strong>82%</strong></div></div>
      <div className="chart-frame">
        <div className="y-axis"><span>60%</span><span>40%</span><span>20%</span><span>0%</span></div>
        <div className="chart-canvas">
          <div className="chart-gridlines" /><div className="threshold-line"><span>WATCH THRESHOLD</span></div>
          <svg viewBox="0 0 800 220" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-label="Storm probability forecast graph">
            <path className="confidence-area" d="M0,167 L114,139 L228,98 L342,48 L456,67 L570,108 L684,143 L800,167 L800,196 L684,173 L570,144 L456,109 L342,88 L228,133 L114,164 L0,190 Z" />
            <polyline className="line-risk" points="0,180 114,154 228,117 342,66 456,88 570,132 684,165 800,191" />
            <polyline className="line-hail" points="0,197 114,181 228,159 342,128 456,139 570,164 684,185 800,204" />
            <polyline className="line-lightning" points="0,169 114,136 228,94 342,43 456,67 570,112 684,148 800,180" />
          </svg>
        </div>
      </div>
      <div className="forecast-tabs">{forecast.map((item, index) => <Button key={item.time} variant={active === index ? "default" : "ghost"} size="sm" onClick={() => setActive(index)}><span>{item.time}</span><small>{item.risk}%</small></Button>)}</div>
    </section>
  );
}

function Simulator() {
  const defaults = { moisture: 72, instability: 68, shear: 44 };
  const [values, setValues] = useState(defaults);
  const [running, setRunning] = useState(false);
  const score = useMemo(() => Math.round(values.moisture * .38 + values.instability * .4 + values.shear * .22), [values]);
  const update = (key: keyof typeof values, value: number) => setValues((current) => ({ ...current, [key]: value }));
  return (
    <section id="simulator" className="instrument-panel simulator-grid">
      <div>
        <span className="data-label">Scenario laboratory</span><h2 className="section-title">Atmospheric what-if simulator</h2>
        <p className="mt-2 max-w-xl text-xs leading-5 text-muted-foreground">Adjust the environmental inputs to estimate how this cell responds. Results are simulated locally and do not alter the live observation feed.</p>
        <div className="mt-6 space-y-5">{([
          ["moisture", "Low-level moisture", "%", ThermometerSun],
          ["instability", "Convective instability", "%", CloudLightning],
          ["shear", "Vertical wind shear", "KT", Wind],
        ] as const).map(([key, label, unit, Icon]) => <label key={key} className="sim-control"><span className="flex items-center gap-2"><Icon className="size-4 text-primary" />{label}</span><b>{values[key]} {unit}</b><input type="range" min="0" max="100" value={values[key]} onChange={(event) => update(key, Number(event.target.value))} /></label>)}</div>
      </div>
      <div className="simulation-output">
        <div className="flex items-center justify-between"><span className="data-label">Projected outcome</span><span className="model-badge">MODEL READY</span></div>
        <div className="score-gauge"><div style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><span><strong>{score}</strong><small>/ 100</small></span></div></div>
        <div className="output-grid"><div><span>Hail</span><b>{Math.round(score * .46)}%</b></div><div><span>Lightning</span><b>{Math.round(score * .72)}%</b></div><div><span>Downburst</span><b>{Math.round(score * .61)}%</b></div></div>
        <div className="mt-4 flex gap-2"><Button className="flex-1" onClick={() => { setRunning(true); window.setTimeout(() => setRunning(false), 900); }} disabled={running}><Sparkles className="size-4" />{running ? "Running model…" : "Run simulation"}</Button><Button variant="outline" size="icon" aria-label="Reset simulator" onClick={() => setValues(defaults)}><RotateCcw className="size-4" /></Button></div>
      </div>
    </section>
  );
}

function StormOperations() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-[1560px] space-y-4 px-3 py-4 md:px-6">
        <OperationsBar paused={paused} onPause={() => setPaused((value) => !value)} />
        <div className="operations-grid"><RadarMap /><TelemetryRail /></div>
        <HazardGrid />
        <ForecastChart />
        <Simulator />
        <div className="data-footnote"><span><Database className="size-3.5" /> INSAT-3DR · Doppler weather radar · lightning network</span><span><Gauge className="size-3.5" /> Synthetic operational mode · Updated 08:06 IST</span></div>
      </main>
      <footer className="ops-footer"><div className="mx-auto flex max-w-[1560px] flex-col justify-between gap-3 px-4 py-6 sm:flex-row sm:items-center md:px-6"><Brand /><p>Decision-support simulation for meteorological operations · StormSense 2026</p></div></footer>
    </div>
  );
}