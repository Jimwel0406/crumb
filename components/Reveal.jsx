"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("in");
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPhase("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "in") return undefined;
    const t = window.setTimeout(() => setPhase("done"), delay + 1900);
    return () => window.clearTimeout(t);
  }, [phase, delay]);

  const stateClass =
    phase === "idle" ? "" : phase === "in" ? " is-in" : " is-done";
  const classes = `reveal reveal--${variant}${stateClass}${
    className ? ` ${className}` : ""
  }`;

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
