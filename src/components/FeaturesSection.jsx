const features = [
  {
    title: "Unified asset intelligence",
    description:
      "Inventory every system, dataset, and device with owners, lifecycle events, and audit trails in one AI-ready graph."
  },
  {
    title: "Automated evidence locker",
    description:
      "Map controls to frameworks, capture evidence automatically, and export auditor-ready packs in clicks."
  },
  {
    title: "Live risk & remediation",
    description:
      "Trigger workflows when gaps surface, assign owners, and track remediation progress with executive dashboards."
  }
];

const FeaturesSection = () => {
  return (
    <section className="feature-section">
      <header className="section-header">
        <p className="section-header__eyebrow">Why teams switch to our copilot</p>
        <h2 className="section-header__title">Make compliance a proactive asset practice</h2>
        <p className="section-header__subtitle">
          The readiness chat gives you instant visibility, and the platform keeps your
          controls aligned every day after.
        </p>
      </header>
      <div className="feature-section__grid">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
