import BoxOpen from "./BoxOpen";
import Reveal from "./Reveal";

export default function StepsBox({ steps }) {
  return (
    <div className="steps__box">
      <BoxOpen />
      <div className="steps__grid">
        {steps.map((step) => (
          <Reveal as="article" key={step.n} className="step">
            <span className="step__num">{step.n}</span>
            <h3>{step.title}</h3>
            <p className="step__copy">{step.copy}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
