import PropTypes from "prop-types";

const FrameworkSelector = ({ frameworks, onSelect, selected }) => {
  return (
    <div className="framework-selector" id="platform">
      <header className="section-header">
        <p className="section-header__eyebrow">Choose your playbook</p>
        <h2 className="section-header__title">
          Framework-aware conversations for every audit horizon
        </h2>
        <p className="section-header__subtitle">
          Kick off the readiness copilot for SOC 2, PCI DSS, or ISO 27001. Each flow
          is tuned to real audit evidence requests and risk signals.
        </p>
      </header>
      <div className="framework-selector__grid">
        {Object.values(frameworks).map((framework) => {
          const isActive = framework.id === selected;
          return (
            <button
              key={framework.id}
              className={`framework-card ${isActive ? "framework-card--active" : ""}`}
              onClick={() => onSelect(framework.id)}
              style={{
                borderColor: framework.color,
                background: isActive ? framework.gradient : undefined
              }}
            >
              <span className="framework-card__badge" style={{ backgroundColor: framework.color }} />
              <h3 className="framework-card__title">{framework.label}</h3>
              <p className="framework-card__description">{framework.description}</p>
              <span className="framework-card__action">
                {isActive ? "Active session" : `Start ${framework.label} audit →`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

FrameworkSelector.propTypes = {
  frameworks: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string
};

export default FrameworkSelector;
