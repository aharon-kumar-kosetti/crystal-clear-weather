# Light Glass Weather Command Centre

## Build
- Recreate the full StormSense command-centre page at `/`, preserving the screenshot’s navigation, map-and-analyst split, risk summary, hazard metrics, impact warning, timeline, experiment controls, and footer.
- Restyle the interface as a bright operational weather workspace with translucent glass surfaces, restrained navy typography, white and pale-gray backgrounds, and the supplied Ministry palette led by `#162F6A`.
- Use the generated Vijayawada satellite weather map as the main live observation visual, with readable overlays and controls.
- Make the scenario selector, pause control, timeline selection, AI prompt suggestions, chat input, sliders, reset, and recalculation controls interactive.
- Adapt the layout for desktop and narrow screens without losing data hierarchy or legibility.

## Technical details
- Define all colors, glass effects, shadows, typography, and reusable weather states as semantic tokens in the global design system.
- Implement the page as focused React components with local state; no backend or persistent storage is required.
- Add unique page metadata and keep the existing TanStack routing structure.
- Verify the finished page in the browser at desktop and mobile widths, checking interactions, layout, and page health.
