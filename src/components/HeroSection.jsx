import PropTypes from "prop-types";

const HeroSection = ({ onPrimaryCta }) => {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">AI asset assurance platform</p>
        <h1 className="hero__title">
          Close your compliance gaps before auditors can find them.
        </h1>
        <p className="hero__subtitle">
          Launch an interactive readiness check across SOC 2, PCI DSS, or ISO 27001
          in minutes. Our AI copilot maps asset risk, highlights weak controls, and
          gives your team a guided remediation plan.
        </p>
        <div className="hero__cta-row">
          <button className="btn btn--primary" onClick={onPrimaryCta}>
            Launch readiness chat
          </button>
          <a className="btn btn--ghost" href="#platform">
            Explore the platform
          </a>
        </div>
        <ul className="hero__bullets">
          <li>Asset inventory clarity across cloud, SaaS, and devices</li>
          <li>Real-time scoring mapped to each compliance framework</li>
          <li>Evidence-ready exports backed by AI summarization</li>
        </ul>
      </div>
      <div className="hero__card-grid">
        <div className="hero-card hero-card--gradient">
          <span className="hero-card__label">Avg. time saved per audit</span>
          <strong className="hero-card__value">67%</strong>
          <span className="hero-card__footnote">Based on 200+ customer reviews</span>
        </div>
        <div className="hero-card">
          <span className="hero-card__label">Assets monitored</span>
          <strong className="hero-card__value">28k+</strong>
          <span className="hero-card__footnote">Continuously mapped & classified</span>
        </div>
        <div className="hero-card">
          <span className="hero-card__label">Evidence requests automated</span>
          <strong className="hero-card__value">92%</strong>
          <span className="hero-card__footnote">Across access, lifecycle & tooling</span>
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  onPrimaryCta: PropTypes.func
};

export default HeroSection;
