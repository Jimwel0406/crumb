export default function BoxOpen() {
  return (
    <span className="openbox" aria-hidden="true">
      <svg
        className="openbox__flap openbox__flap--back"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M0,116 L1000,116 L948,4 L52,4 Z"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="openbox__flap openbox__flap--front"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M0,4 L1000,4 L948,116 L52,116 Z"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="openbox__flap openbox__flap--left"
        viewBox="0 0 120 1000"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M116,0 L116,1000 L4,944 L4,56 Z"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="openbox__flap openbox__flap--right"
        viewBox="0 0 120 1000"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M4,0 L4,1000 L116,944 L116,56 Z"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
