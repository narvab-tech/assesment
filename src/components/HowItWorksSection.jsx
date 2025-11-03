const steps = [
  {
    step: "01",
    title: "Run the readiness chat",
    description:
      "Answer tailored questions for your chosen framework. The AI copilot scores each control family instantly."
  },
  {
    step: "02",
    title: "See live gaps & scorecard",
    description:
      "Understand which tags—inventory, access, tooling, risk—need attention with automated recommendations."
  },
  {
    step: "03",
    title: "Activate automations",
    description:
      "Turn insights into workflows: sync assets, enforce lifecycle approvals, and schedule evidence exports."
  }
];

const HowItWorksSection = () => (
  <section className="how-it-works">
    <header className="section-header">
      <p className="section-header__eyebrow">How it works</p>
      <h2 className="section-header__title">From chat to continuous compliance</h2>
      <p className="section-header__subtitle">
        Accelerate onboarding with a guided conversation, then lean on the platform
        to keep every asset in compliance.
      </p>
    </header>

    <div className="how-it-works__timeline">
      {steps.map((item) => (
        <div key={item.step} className="timeline-item">
          <span className="timeline-item__step">{item.step}</span>
          <div>
            <h3 className="timeline-item__title">{item.title}</h3>
            <p className="timeline-item__description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorksSection;
