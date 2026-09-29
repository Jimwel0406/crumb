"use client";

import { useEffect, useState } from "react";
import Icing from "./Icing";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a className="nav__logo" href="#top">
          crumb<span>.</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#boxes">Boxes</a>
          <a href="#story">Our story</a>
          <a href="#flavours">Flavours</a>
          <a href="#visit">Visit</a>
        </nav>

        <div className="nav__actions">
          <span className="nav__cart" aria-label="Box contents">
            Your box <b>2</b>
          </span>
          <a className="btn btn--ink btn--sm" href="#visit">
            Order pickup
          </a>
        </div>
      </div>

      <span className="nav__icing" aria-hidden="true">
        <Icing />
      </span>
    </header>
  );
}
