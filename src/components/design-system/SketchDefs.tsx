/**
 * The pen wobble. Three SVG filters (different noise seeds so neighbouring
 * boxes don't wobble identically), referenced from CSS as url(#sketch-a/b/c).
 * They're only ever applied to border layers, never to text.
 * Render once, near the top of the app.
 */
const filters = [
  { id: "sketch-a", seed: 2 },
  { id: "sketch-b", seed: 7 },
  { id: "sketch-c", seed: 13 },
];

export function SketchDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        {filters.map((f) => (
          <filter key={f.id} id={f.id} x="-5%" y="-15%" width="110%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves={2} seed={f.seed} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={3.5} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
        {/* Long single lines (rules, road map, timeline): slower, smoother wobble so they never break up. */}
        <filter id="sketch-line" x="-2%" y="-50%" width="104%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves={1} seed={5} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={4} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

export default SketchDefs;
