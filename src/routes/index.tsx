import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Bot,
  ChevronDown,
  CircleGauge,
  CloudRain,
  Crosshair,
  Database,
  ExternalLink,
  Eye,
  Gauge,
  Globe2,
  Info,
  Layers3,
  LocateFixed,
  Map,
  Menu,
  MessageCircleQuestion,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import weatherMap from "@/assets/vijayawada-weather-map.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StormSense | Weather Intelligence Command Centre" },
      {
        name: "description",
        content:
          "A light, operational weather intelligence command centre for convective storm nowcasting in India.",
      },
      { property: "og:title", content: "StormSense Weather Command Centre" },
      {
        property: "og:description",
        content: "Live storm analysis, hazard diagnostics, and short-range convective nowcasting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeatherCommandCentre,
});

const timelines = [
  ["NOW", "10.7%"],
  ["+15m", "10.7%"],
  ["+30m", "10.7%"],
  ["+45m", "10.7%"],
  ["+1h", "10.7%"],
  ["+90m", "10.7%"],
  ["+2h", "7.8%"],
  ["+3h", "6.4%"],
  ["+4h", "5.0%"],
  ["+5h", "3.5%"],
  ["+6h", "2.1%"],
];

const hazards = [
  {
    title: "Severe Hail Core",
    value: "15.3%",
    status: "MODERATE",
    detail: "Hailstone diameter: 3.2 cm",
    note: "30.6 dBZ core aloft",
    color: "cyan",
    icon: Crosshair,
  },
  {
    title: "Lightning Hazard",
    value: "32%",
    status: "ELEVATED",
    detail: "Discharge rate: ~34 strikes/min",
    note: "Frequent CG strokes",
    color: "violet",
    icon: Zap,
  },
  {
    title: "Cloudburst Hazard",
    value: "41.8%",
    status: "HIGH IMPACT",
    detail: "Precip rate: 65 mm/hr",
    note: "Extreme downpour rate",
    color: "blue",
    icon: CloudRain,
  },
  {
    title: "Downburst / Gusts",
    value: "46.1%",
    status: "STRONG GUST",
    detail: "Outflow squall: Gale Force 8",
    note: "Peak squall gusts ~22.7 km/h",
    color: "amber",
    icon: Wind,
  },
] as const;

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <span className="brand-mark" aria-hidden="true">
        <Radio className="size-5" />
      </span>
      <span>
        <strong className="block font-display text-base leading-none text-foreground">STORMSENSE</strong>
        <span className="mt-1 block text-[10px] font-semibold uppercase text-primary">Weather intelligence · India</span>
      </span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-7">
        <BrandMark />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          <a className="nav-link" href="#overview">Overview</a>
          <a className="nav-link nav-link-active" href="#command-centre">Command centre</a>
          <a className="nav-link" href="#architecture">Explore architecture</a>
        </nav>
        <div className="hidden items-center gap-4 text-xs font-semibold text-muted-foreground sm:flex">
          <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-success shadow-status" /> LIVE</span>
          <span className="flex items-center gap-2"><Globe2 className="size-4" /> INDIA</span>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation" onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <a className="mobile-nav" href="#overview">Overview</a>
          <a className="mobile-nav text-primary" href="#command-centre">Command centre</a>
          <a className="mobile-nav" href="#architecture">Explore architecture</a>
        </nav>
      )}
    </header>
  );
}

function TopBar({ paused, setPaused }: { paused: boolean; setPaused: (next: boolean) => void }) {
  const [scenario, setScenario] = useState("Rapid Intensification");
  return (
    <section className="glass-panel p-4" id="overview">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <span className="brand-mark size-11"><CloudRain className="size-6" /></span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-bold text-foreground">STORMSENSE <span className="text-primary">AI</span></h1>
              <span className="status-pill bg-danger/10 text-danger">HAILSTORM NOWCAST</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Convective-scale nowcasting &amp; early warning system · 0–6h</p>
          </div>
        </div>
        <div className="segmented-control" aria-label="Workspace selection">
          <button className="segment-active"><Map className="size-4" /> GIS Command Center</button>
          <button><ShieldCheck className="size-4" /> Eco &amp; Agri Defense</button>
          <button><Layers3 className="size-4" /> Architecture Explorer</button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
        <label className="relative">
          <span className="sr-only">Scenario</span>
          <select className="h-9 appearance-none rounded-md border border-border bg-card/80 py-0 pl-3 pr-9 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring" value={scenario} onChange={(event) => setScenario(event.target.value)}>
            <option>Rapid Intensification</option>
            <option>Cloudburst Escalation</option>
            <option>Downburst Tracking</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-4 text-muted-foreground" />
        </label>
        <Button variant={paused ? "primary" : "danger"} size="sm" onClick={() => setPaused(!paused)}>
          {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />} {paused ? "RESUME" : "PAUSE"}
        </Button>
        <span className="status-pill bg-primary/10 text-primary"><Activity className="size-3" /> 1×</span>
        <span className="status-pill bg-success/10 text-success"><span className="size-1.5 rounded-full bg-success" /> 5/5 FEEDS OK</span>
      </div>
    </section>
  );
}

function MapPanel() {
  return (
    <section className="relative min-h-[520px] overflow-hidden rounded-lg border border-border shadow-panel lg:min-h-[620px]" aria-label="Live storm observation map">
      <img src={weatherMap} alt="Satellite storm observation over Vijayawada and Guntur" className="absolute inset-0 size-full object-cover" width={1408} height={912} />
      <div className="absolute inset-0 bg-map-wash" />
      <div className="map-title left-4 top-4">
        <span className="text-[10px] font-semibold uppercase text-muted-foreground">Convective cluster · Detection true</span>
        <strong className="mt-1 block text-sm text-foreground">Vijayawada short-range outlook</strong>
      </div>
      <div className="map-title right-4 top-4 hidden text-right sm:block">
        <strong className="text-sm text-foreground">42 km/h · 135° SE</strong>
        <span className="mt-1 block text-[10px] font-semibold text-danger">Intensity: 15% (Dissipating)</span>
      </div>
      <div className="absolute left-4 top-24 w-[220px] rounded-md border border-border/80 bg-card/80 p-3 shadow-panel backdrop-blur-xl sm:top-20">
        <p className="eyebrow">Earth observation sensors</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {["Satellite", "INSAT IR", "Relief Topo", "Standard OSM"].map((item, index) => (
            <span key={item} className={cn("map-chip", index === 0 && "map-chip-active")}>{item}</span>
          ))}
        </div>
        <p className="mt-3 eyebrow">Convective overlays</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            ["Hail Buffers", "text-danger"], ["0–6h Vector", "text-primary"], ["Strikes (2)", "text-violet"], ["Radar Sweep", "text-cyan"],
          ].map(([item, color]) => <span key={item} className={cn("map-chip", color)}>{item}</span>)}
        </div>
      </div>
      <div className="absolute right-4 top-24 flex flex-col gap-1">
        <Button variant="secondary" size="icon" aria-label="Zoom in">+</Button>
        <Button variant="secondary" size="icon" aria-label="Zoom out">−</Button>
        <Button variant="secondary" size="icon" aria-label="Locate"><LocateFixed className="size-4" /></Button>
      </div>
      <div className="absolute left-[51%] top-[42%] -translate-x-1/2 rounded-md border border-primary/30 bg-card/85 px-3 py-2 text-xs font-bold text-primary shadow-panel backdrop-blur-xl">
        <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-danger" /> Vijayawada Urban Asset
      </div>
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-md border border-border/70 bg-card/80 px-3 py-2 text-[10px] text-muted-foreground backdrop-blur-xl">
        <span>Satellite + radar composite · Updated 08:06 IST</span>
        <Info className="size-4 text-foreground" />
      </div>
    </section>
  );
}

function AnalystPanel() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const send = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, trimmed]);
    setInput("");
  };
  return (
    <aside className="glass-panel flex min-h-[520px] flex-col p-4 lg:min-h-[620px]" aria-label="AI storm analyst">
      <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-4">
        <div className="flex gap-3">
          <span className="icon-tile bg-primary/10 text-primary"><Bot className="size-5" /></span>
          <div>
            <h2 className="section-title">AI Storm Analyst</h2>
            <p className="mt-1 text-[11px] text-muted-foreground">Explainable convective intelligence &amp; tactical advisory</p>
          </div>
        </div>
        <span className="status-pill bg-success/10 text-success">LIVE</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="status-pill bg-secondary text-muted-foreground"><Settings2 className="size-3" /> Convective diagnostics</span>
        <Button variant="secondary" size="sm"><SlidersHorizontal className="size-3.5" /> Threat dossier</Button>
      </div>
      <div className="mt-4 rounded-md border border-border bg-card/70 p-4 shadow-soft">
        <p className="text-sm leading-6 text-foreground">
          <span className="font-semibold text-primary">I am your StormSense AI Convective Analyst</span>, powered by high-speed inference. I interpret the multi-source Doppler radar, INSAT thermal imagery, and electrical lightning data to provide explainable early warnings.
        </p>
        <p className="mt-3 text-[10px] text-muted-foreground">08:06 AM · Advisory brief</p>
      </div>
      <div className="mt-3 space-y-2">
        {messages.map((message) => (
          <div key={`${message}-${messages.indexOf(message)}`} className="ml-auto max-w-[90%] rounded-md bg-primary px-3 py-2 text-xs leading-5 text-primary-foreground">
            {message}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {["Why is this area high risk?", "What is the hail damage potential?"].map((prompt) => (
            <button key={prompt} className="suggestion-chip" onClick={() => send(prompt)}>{prompt}</button>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); send(input); }}>
          <input value={input} onChange={(event) => setInput(event.target.value)} className="h-10 min-w-0 flex-1 rounded-md border border-input bg-card/80 px-3 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Ask StormSense AI about hail, radar dBZ, or arrival…" aria-label="Ask StormSense AI" />
          <Button type="submit" size="icon" aria-label="Send message"><Send className="size-4" /></Button>
        </form>
      </div>
    </aside>
  );
}

function RiskSummary() {
  return (
    <section className="glass-panel flex flex-col gap-5 border-l-4 border-l-success p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span className="icon-tile bg-success/10 text-success"><ShieldCheck className="size-5" /></span>
        <div>
          <div className="flex flex-wrap items-center gap-2"><h2 className="section-title">Composite Convective Risk</h2><span className="status-pill bg-success/10 text-success">LOW WARNING</span></div>
          <p className="mt-1 text-[11px] text-muted-foreground">Multi-source fusion: reflectivity + cloud-top + lightning jump + CAPE</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="risk-ring"><Activity className="size-5 text-success" /></div>
        <div><strong className="font-display text-4xl text-success">32%</strong><span className="block text-[10px] font-semibold uppercase text-muted-foreground">Convective score</span></div>
        <Button variant="secondary" size="sm"><Info className="size-3.5" /> Why low risk?</Button>
      </div>
    </section>
  );
}

function HazardGrid() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {hazards.map((hazard) => {
        const Icon = hazard.icon;
        return (
          <article key={hazard.title} className={cn("hazard-card", `hazard-${hazard.color}`)}>
            <div className="flex items-center justify-between gap-2"><span className="icon-tile"><Icon className="size-5" /></span><span className="status-pill">{hazard.status}</span></div>
            <h3 className="mt-4 text-sm font-semibold text-muted-foreground">{hazard.title}</h3>
            <strong className="mt-1 block font-mono text-3xl text-foreground">{hazard.value}</strong>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted"><div className="hazard-progress" /></div>
            <p className="mt-3 text-[11px] font-semibold">{hazard.detail}</p>
            <p className="mt-2 text-[10px] text-muted-foreground">{hazard.note}</p>
          </article>
        );
      })}
    </section>
  );
}

function ImpactAlert() {
  return (
    <section className="glass-panel flex flex-col gap-4 border-l-4 border-l-danger p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span className="icon-tile bg-danger/10 text-danger"><Gauge className="size-5" /></span>
        <div>
          <p className="eyebrow text-danger">Storm approaching target <span className="ml-2 status-pill bg-danger/10 text-danger">IMMINENT IMPACT</span></p>
          <h2 className="mt-2 text-base font-bold text-foreground">Vijayawada Urban Zone</h2>
          <p className="mt-1 text-[11px] text-muted-foreground">Distance: <b className="text-primary">1564.8 km</b> · Speed: <b>42 km/h</b> · Vector: <b>135° SE</b></p>
        </div>
      </div>
      <div className="rounded-md border border-danger/20 bg-danger/5 px-6 py-3 text-center">
        <span className="text-[10px] font-semibold uppercase text-muted-foreground">Estimated arrival time</span>
        <strong className="mt-1 block font-mono text-3xl text-danger">37:15:25</strong>
        <span className="text-[10px] text-danger">Countdown to urban perimeter impact</span>
      </div>
    </section>
  );
}

function Timeline() {
  const [active, setActive] = useState(0);
  return (
    <section className="glass-panel p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="section-title flex items-center gap-2"><CircleGauge className="size-4 text-primary" /> 0–6 Hour Convective Nowcast Timeline</h2>
        <p className="text-[11px] text-muted-foreground">Projected at <b className="text-primary">NOW</b> · Risk: <b className="text-amber">10.7%</b> · Hail: <b className="text-cyan">6%</b> · Lightning: <b className="text-violet">13.8%</b></p>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 xl:grid-cols-11">
        {timelines.map(([time, risk], index) => (
          <button key={time} className={cn("timeline-step", active === index && "timeline-step-active")} onClick={() => setActive(index)}>
            <b>{time}</b><span className="mt-1 size-2 rounded-full bg-success" /><small>{risk}</small>
          </button>
        ))}
      </div>
      <div className="chart mt-5" aria-label="Projected storm risk line chart">
        <div className="chart-grid" />
        <svg viewBox="0 0 1000 110" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
          <polyline points="0,65 100,64 200,64 300,63 400,63 500,65 600,68 700,75 800,83 900,90 1000,96" fill="none" stroke="var(--cyan)" strokeWidth="4" />
          <polyline points="0,72 100,71 200,70 300,70 400,71 500,74 600,79 700,84 800,89 900,94 1000,98" fill="none" stroke="var(--violet)" strokeWidth="3" />
          <polyline points="0,78 100,78 200,77 300,77 400,78 500,80 600,84 700,88 800,92 900,96 1000,99" fill="none" stroke="var(--danger)" strokeWidth="3" />
        </svg>
      </div>
    </section>
  );
}

function ExperimentEngine() {
  const defaults = { core: 78, humidity: 80, wind: 38 };
  const [values, setValues] = useState(defaults);
  const [running, setRunning] = useState(false);
  const score = useMemo(() => Math.round((values.core * 0.35 + values.humidity * 0.4 + values.wind * 0.25) / 3), [values]);
  const update = (key: keyof typeof values, value: number) => setValues((current) => ({ ...current, [key]: value }));
  return (
    <section className="glass-panel p-4" id="architecture">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="section-title flex items-center gap-2"><SlidersHorizontal className="size-4 text-primary" /> Interactive “What-if” Experiment Engine</h2><p className="mt-2 text-[11px] text-muted-foreground">Adjust atmospheric triggers and recalculate hail, lightning, and downburst probabilities in real time.</p></div>
        <span className="status-pill bg-secondary text-muted-foreground">PROJECTED SCORE {score}%</span>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {[
          ["core", "Storm convective core", "%", "cyan"], ["humidity", "Relative humidity", "%", "blue"], ["wind", "Surface inflow wind", "km/h", "amber"],
        ].map(([key, label, unit, tone]) => (
          <label key={key} className={cn("range-control", `range-${tone}`)}>
            <span className="flex justify-between text-[11px] font-medium text-muted-foreground"><span>{label}</span><b>{values[key as keyof typeof values]} {unit}</b></span>
            <input type="range" min="0" max="100" value={values[key as keyof typeof values]} onChange={(event) => update(key as keyof typeof values, Number(event.target.value))} />
          </label>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={() => setValues(defaults)}><RotateCcw className="size-3.5" /> Reset defaults</Button>
        <Button size="sm" onClick={() => { setRunning(true); window.setTimeout(() => setRunning(false), 900); }} disabled={running}><Sparkles className="size-3.5" /> {running ? "RECALCULATING…" : "RUN RECALCULATION"}</Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 md:px-7">
        <div><BrandMark /><p className="mt-4 text-xs leading-5 text-footer-muted">Observe. Predict. Act. Real-time monitoring and short-range prediction of severe weather across India.</p></div>
        <div><p className="footer-title">Platform</p><a href="#overview">Home</a><a href="#command-centre">Command Centre</a><a href="#architecture">Explore Architecture</a></div>
        <div><p className="footer-title">Information</p><a href="#">About</a><a href="#">Data Sources</a><a href="#">Methodology</a></div>
        <div><p className="footer-title">Policies</p><a href="#">Privacy</a><a href="#">Terms</a><a href="#" className="inline-flex items-center gap-1">Public data policy <ExternalLink className="size-3" /></a></div>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 border-t border-footer-border px-4 py-5 text-[11px] text-footer-muted md:flex-row md:justify-between md:px-7"><span>© 2026 StormSense</span><span>Built for weather intelligence, public awareness and operational decision support.</span></div>
    </footer>
  );
}

function WeatherCommandCentre() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="command-centre" className="mx-auto max-w-screen-2xl space-y-3 px-3 py-4 md:px-5">
        <TopBar paused={paused} setPaused={setPaused} />
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,.9fr)]"><MapPanel /><AnalystPanel /></div>
        <RiskSummary />
        <HazardGrid />
        <ImpactAlert />
        <Timeline />
        <ExperimentEngine />
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-2 text-[10px] text-muted-foreground"><span className="flex items-center gap-2"><Database className="size-3 text-primary" /> Multi-source remote sensing · calibrated with open environmental reanalysis</span><span>Model: Random Forest · Validation: Synthetic operational mode</span></div>
      </main>
      <Footer />
    </div>
  );
}