"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const QUOTES = [
  {
    text: "I only went in for one and came out with a box of six. The raspberry one has rather spoiled other cakes for me.",
    name: "Mateo A.",
    role: "Saturday regular since 2020",
    initials: "MA",
    tone: "butter",
  },
  {
    text: "We got a party box for the studio. It lasted about ten minutes, and the lemon curd one caused an actual argument.",
    name: "Priya N.",
    role: "Ordered the party box twice",
    initials: "PN",
    tone: "accent",
  },
  {
    text: "I order a box every Friday now. It’s still warm when I get it home, and the whole kitchen smells like the shop.",
    name: "Sam R.",
    role: "Weekly six-box subscriber",
    initials: "SR",
    tone: "pistachio",
  },
];

export default function Quotes() {
  const [view, setView] = useState({ index: 0, dir: null, step: 0 });

  const move = (delta) => {
    setView((prev) => {
      const step = prev.step + 1;
      return {
        index: (prev.index + delta + QUOTES.length) % QUOTES.length,
        dir: step % 2 === 1 ? "left" : "right",
        step,
      };
    });
  };

  return (
    <section className="quotes" aria-label="Customer quotes">
      <div className="container quotes__inner">
        <Reveal className="quotes__stage" variant="fade-up">
          {QUOTES.map((quote, i) => {
            const active = i === view.index;
            return (
              <div
                key={quote.name}
                className={`quotes__slide${active ? " is-active" : ""}`}
                data-dir={active ? view.dir : undefined}
                aria-hidden={active ? undefined : "true"}
              >
                <Reveal
                  as="span"
                  className="quotes__mark"
                  variant="spin"
                  aria-hidden="true"
                >
                  &ldquo;
                </Reveal>
                <Reveal
                  as="p"
                  className="quotes__text"
                  variant="wipe-x"
                  delay={220}
                >
                  {quote.text}
                </Reveal>
                <Reveal className="quotes__by" variant="fade-up" delay={460}>
                  <span
                    className={`quotes__avatar quotes__avatar--${quote.tone}`}
                    aria-hidden="true"
                  >
                    {quote.initials}
                  </span>
                  <div>
                    <strong>{quote.name}</strong>
                    <span>{quote.role}</span>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </Reveal>

        <div className="quotes__nav">
          <Reveal
            as="button"
            variant="pop"
            delay={580}
            type="button"
            aria-label="Previous quote"
            onClick={() => move(-1)}
          >
            &larr;
          </Reveal>
          <Reveal
            as="button"
            variant="pop"
            delay={680}
            type="button"
            aria-label="Next quote"
            onClick={() => move(1)}
          >
            &rarr;
          </Reveal>
        </div>
      </div>
    </section>
  );
}
