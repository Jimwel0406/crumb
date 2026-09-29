import Image from "next/image";
import Drip from "./Drip";
import Reveal from "./Reveal";
import HeroCupcakeClient from "./HeroCupcakeClient";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__deco" aria-hidden="true">
        <span className="hero__deco-blob hero__deco-blob--butter" />
        <span className="hero__deco-blob hero__deco-blob--dough" />
        <span className="hero__deco-blob hero__deco-blob--pistachio" />

        <span className="hero__deco-dot hero__deco-dot--1" />
        <span className="hero__deco-dot hero__deco-dot--2" />
        <span className="hero__deco-dot hero__deco-dot--3" />
        <span className="hero__deco-dot hero__deco-dot--4" />

        <Image
          className="hero__deco-art hero__deco-art--cupcake"
          src="/hero-cupcake-doodle.png"
          alt=""
          width={420}
          height={579}
          priority={false}
        />

        <Image
          className="hero__deco-art hero__deco-art--cake"
          src="/hero-cake-doodle.png"
          alt=""
          width={300}
          height={374}
          priority={false}
        />
      </div>

      <div className="container hero__grid">
        <div className="hero__body">
          <Reveal as="span" className="label eyebrow" variant="wipe-x">
            Cupcake shop · est. 2019
          </Reveal>

          <Reveal
            as="h1"
            className="display hero__title"
            variant="fade-up"
            delay={120}
          >
            Baked before
            <br />
            <em>sunrise.</em>
          </Reveal>

          <div className="hero__cta">
            <Reveal
              as="a"
              className="btn btn--accent"
              variant="pop"
              delay={340}
              href="#flavours"
            >
              See today&rsquo;s flavours
            </Reveal>
            <Reveal
              as="a"
              className="btn btn--outline"
              variant="pop"
              delay={440}
              href="#visit"
            >
              Find the shop
            </Reveal>
          </div>

          <Reveal className="hero__meta" variant="fade-up" delay={560}>
            <div>
              <strong>6</strong>
              <span>flavours each day</span>
            </div>
            <div>
              <strong>5am</strong>
              <span>first tray out</span>
            </div>
            <div>
              <strong>Noon</strong>
              <span>usually sold out</span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="hero__anchor">
        <HeroCupcakeClient />
      </div>

      <Drip />
    </section>
  );
}
