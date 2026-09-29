const SCALLOP =
  "M0,0H64V22A9,9,0,0,1,55,13A32,26,0,0,1,9,13A9,9,0,0,1,0,22Z";

// wider, rounder piped edge: semicircular lobes instead of the flat cusped
// ones above, so the seam into the dark section lands as a deliberate full stop.
const BIG_W = 176;
const BIG_H = 40;
const BIG_JOINT = 15;
const BIG_YJ = 6;
const BIG_DEPTH = 30;

function bigScallop() {
  const pitch = BIG_W / 2;
  const yb = BIG_YJ + BIG_JOINT;
  const rx = (pitch - 2 * BIG_JOINT) / 2;
  let d = `M0,0H${BIG_W}V${yb}`;
  for (let i = 1; i >= 0; i--) {
    const xr = (i + 1) * pitch;
    const xl = i * pitch;
    d += `A${BIG_JOINT},${BIG_JOINT} 0 0 1 ${xr - BIG_JOINT},${BIG_YJ}`;
    d += `A${rx},${BIG_DEPTH} 0 0 1 ${xl + BIG_JOINT},${BIG_YJ}`;
    d += `A${BIG_JOINT},${BIG_JOINT} 0 0 1 ${xl},${yb}`;
  }
  return d + "Z";
}

const BIG_SCALLOP = bigScallop();

const DRIP_RIDGE = 14;
const DRIP_W = 192;
const DRIP_H = 50;
const DRIPS = [
  [26, 15, 34],
  [74, 11, 22],
  [122, 13, 30],
  [164, 10, 24],
];

function dripShapes(fill) {
  return DRIPS.map(([cx, r, cy]) => (
    <g key={`${cx}-${r}-${cy}`} fill={fill}>
      <rect x={cx - r} y="0" width={r * 2} height={cy} />
      <circle cx={cx} cy={cy} r={r} />
    </g>
  ));
}

export default function Divider({
  shape = "scallop",
  above,
  below,
  rim,
  className = "seam",
}) {
  const shapeSize = {
    scallop: { w: 64, h: 39, path: SCALLOP },
    big: { w: BIG_W, h: BIG_H, path: BIG_SCALLOP },
    drip: { w: DRIP_W, h: DRIP_H, path: null },
  }[shape];
  const { w, h, path } = shapeSize;
  const id = `crumb-seam-${shape}-${above}${below}`.replace(/#/g, "");

  return (
    <svg
      className={className}
      style={{ height: `${h}px` }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width={w} height={h}>
          <rect width={w} height={h} fill={below} />
          {path ? (
            <>
              {rim ? (
                <path d={path} fill={rim} transform="translate(0 2)" />
              ) : null}
              <path d={path} fill={above} />
            </>
          ) : (
            <>
              {rim ? (
                <g transform="translate(0 2)">
                  <rect y="0" width={w} height={DRIP_RIDGE} fill={rim} />
                  {dripShapes(rim)}
                </g>
              ) : null}
              <rect y="0" width={w} height={DRIP_RIDGE} fill={above} />
              {dripShapes(above)}
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
