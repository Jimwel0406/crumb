const ICING_PATH = (() => {
  const w = 600;
  const base = 14;
  const n = 16;
  const step = w / n;
  let d = `M0,0 H${w} V${base} `;
  for (let i = n; i > 0; i -= 1) {
    const x = i * step;
    const nx = (i - 1) * step;
    d += `C${(x - step * 0.34).toFixed(1)},${base + 16} ${(
      nx +
      step * 0.34
    ).toFixed(1)},${base + 16} ${nx.toFixed(1)},${base} `;
  }
  return `${d}Z`;
})();

export default function Icing() {
  return (
    <svg
      className="icing"
      viewBox="0 0 600 34"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={ICING_PATH} fill="currentColor" />
    </svg>
  );
}
