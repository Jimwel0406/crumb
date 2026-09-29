import Image from "next/image";
import { IMG } from "../lib/images";
import Reveal from "./Reveal";
import Icing from "./Icing";
import StepsBox from "./StepsBox";
import Underline from "./Underline";

const RESERVE_ROWS = [
  { label: "Notice", value: "24 hours" },
  { label: "Box sizes", value: "Six or twelve" },
  { label: "Pickup", value: "8am to 11am" },
  { label: "Delivery", value: "Across town by noon" },
];

export function Band() {
  return (
    <section className="band">
      <svg className="band__piping band__piping--tl" viewBox="0 0 220 220" aria-hidden="true">
        <path
          d="M0 96c34-2 58-12 74-30 12-14 16-32 14-52"
          fill="none"
          stroke="var(--cream)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M0 150c44 0 78-10 100-30 16-14 24-32 26-54"
          fill="none"
          stroke="var(--cream)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="1 20"
        />
        <circle cx="118" cy="34" r="9" fill="var(--cream)" />
        <circle cx="150" cy="62" r="6" fill="var(--butter)" />
        <circle cx="94" cy="70" r="5" fill="var(--pistachio)" />
      </svg>

      <svg className="band__piping band__piping--br" viewBox="0 0 220 220" aria-hidden="true">
        <path
          d="M220 124c-34 2-58 12-74 30-12 14-16 32-14 52"
          fill="none"
          stroke="var(--cream)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M220 70c-44 0-78 10-100 30-16 14-24 32-26 54"
          fill="none"
          stroke="var(--cream)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="1 20"
        />
        <circle cx="102" cy="186" r="9" fill="var(--cream)" />
        <circle cx="70" cy="158" r="6" fill="var(--butter)" />
        <circle cx="126" cy="150" r="5" fill="var(--pistachio)" />
      </svg>

      <span className="band__sprinkles" aria-hidden="true" />
      <div className="container band__inner">
        <Reveal className="band__head" variant="fade-down">
          <span className="label eyebrow">Order ahead</span>
          <h2 className="band__title">Reserve a box the night before.</h2>
        </Reveal>

        <Reveal className="note-frost" variant="pop" delay={160}>
          <span className="note-frost__icing" aria-hidden="true">
            <Icing />
          </span>
          <span className="note-frost__sprinkles" aria-hidden="true" />
          <p className="note-frost__copy">
            Everything is made that morning. The earlier you come, the more of
            the board is left.
          </p>
          <dl className="note-frost__rows">
            {RESERVE_ROWS.map((row) => (
              <div className="note-frost__row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal as="div" className="band__actions" variant="pop" delay={320}>
          <a className="btn btn--ink" href="#visit">
            Reserve a box
          </a>
          <a className="arrow-link band__link" href="#flavours">
            See today&rsquo;s case <span aria-hidden="true">&rarr;</span>
            <Underline />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "1",
    title: "Pick your six",
    copy: "Choose from the case, or ask the bakers to pick the newest thing.",
  },
  {
    n: "2",
    title: "We bake at dawn",
    copy: "The batter is mixed at four. Everything is piped by hand.",
  },
  {
    n: "3",
    title: "Boxed with a bow",
    copy: "Lined, lidded and tied with a paper ribbon so it travels.",
  },
  {
    n: "4",
    title: "Pickup or drop-off",
    copy: "Grab it on Butter Lane, or send it across town before lunch.",
  },
];

export function Steps() {
  return (
    <section className="steps" id="story">
      <div className="container">
        <Reveal className="steps__head" variant="fade-up">
          <span className="label eyebrow">How it works</span>
          <h2 className="section-title">From bowl to box in a morning</h2>
        </Reveal>

        <StepsBox steps={STEPS} />

        <Reveal className="steps__foot" variant="pop" delay={560}>
          <a className="btn btn--outline" href="#boxes">
            Build your box
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const PANELS = [
  {
    id: "classic",
    tag: "From $4.50",
    label: "The forever flavour",
    title: "The classic six",
    note: "Vanilla bean sponge with buttercream.",
    copy: "Six vanilla cupcakes, swirled high and dusted with vanilla sugar.",
    hl: "We don’t mess with it.",
    cta: "Add a six-box",
    img: IMG.classic,
    alt: "Pink frosted cupcakes with strawberries",
    blob: "butter",
    reverse: false,
  },
  {
    id: "seasonal",
    tag: "This month",
    label: "Seasonal drops",
    title: "Flavours that move with the market",
    note: "The flavour board is chalk, and it changes often.",
    copy:
      "Saturday market fruit becomes curd, jam and swirls by Monday morning.",
    hl: "It changes with the market.",
    cta: "See what’s dropping",
    img: IMG.seasonal,
    alt: "Brightly coloured cupcakes in purple, yellow and blue",
    blob: "accent",
    reverse: true,
  },
  {
    id: "boxes",
    tag: "Box of 12",
    label: "Party boxes",
    title: "Built for birthdays, launches and long tables",
    note: "Order a day ahead and we’ll have it ready.",
    copy:
      "A dozen in one flavour or a mixed row, card tucked under the lid.",
    hl: "Offices, weddings, and the occasional apology.",
    cta: "Order a party box",
    img: IMG.boxes,
    alt: "Cupcakes with pastel frosting packed in a box",
    blob: "dough",
    reverse: false,
  },
];

export function Panels() {
  return (
    <div className="panels" id="boxes">
      <div className="container">
        {PANELS.map((panel) => {
          const slide = panel.reverse ? "slide-l" : "slide-r";
          return (
            <article
              className={`panel${panel.reverse ? " panel--reverse" : ""}`}
              key={panel.id}
            >
              <div className="panel__media">
                <Reveal
                  as="span"
                  className={`panel__blob panel__blob--${panel.blob}`}
                  variant="blob"
                  delay={60}
                  aria-hidden="true"
                />
                <Reveal className="circle-photo" variant="iris" delay={160}>
                  <Image
                    src={panel.img}
                    alt={panel.alt}
                    width={640}
                    height={640}
                  />
                </Reveal>
                <Reveal
                  as="span"
                  className="panel__tag"
                  variant="pop"
                  delay={480}
                >
                  {panel.tag}
                </Reveal>
              </div>

              <div className="panel__body">
                <Reveal
                  as="span"
                  className="label eyebrow"
                  variant="wipe-x"
                >
                  {panel.label}
                </Reveal>
                <Reveal
                  as="h2"
                  className="section-title"
                  variant={slide}
                  delay={100}
                >
                  {panel.title}
                </Reveal>
                <Reveal
                  as="p"
                  className="panel__quote"
                  variant={slide}
                  delay={190}
                >
                  {panel.note}
                </Reveal>
                <Reveal
                  as="p"
                  className="lead panel__copy"
                  variant={slide}
                  delay={280}
                >
                  {panel.copy} <span className="hl">{panel.hl}</span>
                </Reveal>
                <Reveal
                  as="a"
                  className="arrow-link"
                  variant={slide}
                  delay={370}
                  href="#visit"
                >
                  {panel.cta} <span aria-hidden="true">&rarr;</span>
                  <Underline />
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

const FLAVORS = [
  {
    name: "Vanilla Cloud",
    price: "$4.50",
    copy: "Vanilla sponge, plenty of buttercream.",
    img: IMG.vanilla,
    alt: "Vanilla cupcakes with white frosting and sprinkles",
  },
  {
    name: "Bittersweet Fudge",
    price: "$5.00",
    copy: "70% cocoa, whipped ganache, sea salt.",
    img: IMG.fudge,
    alt: "Chocolate cupcake topped with a hazelnut",
  },
  {
    name: "Raspberry Ripple",
    price: "$5.00",
    copy: "Market raspberries, seeds and all.",
    img: IMG.raspberry,
    alt: "Raspberry cupcakes in pink liners",
  },
  {
    name: "Lemon Drop",
    price: "$4.50",
    copy: "Lemon zest sponge, tart curd centre.",
    img: IMG.lemon,
    alt: "Cupcake with white frosting on a yellow background",
  },
];

export function Strip() {
  return (
    <section className="strip" id="flavours">
      <div className="container">
        <div className="strip__head">
          <Reveal className="strip__head-copy" variant="fade-up">
            <span className="label eyebrow">Today&rsquo;s case</span>
            <h2 className="section-title">On the board today</h2>
          </Reveal>
          <Reveal
            as="a"
            className="arrow-link"
            variant="pop"
            delay={240}
            href="#visit"
          >
            Full menu <span aria-hidden="true">&rarr;</span>
            <Underline />
          </Reveal>
        </div>

        <div className="strip__grid">
          {FLAVORS.map((flavor, i) => (
            <Reveal
              as="article"
              key={flavor.name}
              className="flavor"
              variant={i % 2 === 0 ? "card-l" : "card-r"}
              delay={i * 120}
            >
              <div className="flavor__media">
                <div className="circle-photo">
                  <Image
                    src={flavor.img}
                    alt={flavor.alt}
                    width={520}
                    height={520}
                  />
                </div>
              </div>
              <span className="flavor__price">{flavor.price}</span>
              <h3>{flavor.name}</h3>
              <p className="flavor__bubble">{flavor.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
