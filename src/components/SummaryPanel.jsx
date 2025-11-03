import PropTypes from "prop-types";

const SummaryPanel = ({ summary }) => {
  if (!summary) {
    return (
      <aside className="summary-panel summary-panel--empty">
        <h3>Live readiness snapshot</h3>
        <p>
          As you answer questions, we’ll calculate your readiness score, highlight
          focus areas, and suggest AI-powered automations to close the gaps.
        </p>
        <ul>
          <li>Works across SOC 2, PCI DSS, and ISO 27001</li>
          <li>Maps gaps by inventory, access, tooling, risk, and more</li>
          <li>Exports an action plan you can share with stakeholders</li>
        </ul>
      </aside>
    );
  }

  return (
    <aside className="summary-panel">
      <header className="summary-panel__score">
        <div className="score-circle">
          <span className="score-circle__value">{summary.readiness}</span>
          <span className="score-circle__unit">/100</span>
        </div>
        <div className="score-copy">
          <p className="score-copy__framework">{summary.frameworkLabel}</p>
          <h3 className="score-copy__title">{summary.personaTitle}</h3>
          <p className="score-copy__subtitle">{summary.personaSubtitle}</p>
        </div>
      </header>
      <p className="summary-panel__level">{summary.levelLabel}</p>

      {summary.gaps.length > 0 && (
        <div className="summary-panel__section">
          <p className="summary-panel__section-title">Key gaps detected</p>
          <ul className="summary-panel__list">
            {summary.gaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </div>
      )}

      {summary.suggestions.length > 0 && (
        <div className="summary-panel__section">
          <p className="summary-panel__section-title">High-impact actions</p>
          <ul className="summary-panel__list">
            {summary.suggestions.slice(0, 4).map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="summary-panel__cta">
        <h4>Manage your first 100 assets free*</h4>
        <p>
          Convert today’s assessment into an always-on asset management workspace.
          Sync your inventory, automate change approvals, and stay audit-ready.
        </p>
        <button
          className="btn btn--light"
          onClick={() => {
            window.location.href =
              "/signup?offer=100-assets-free&source=ai-compliance-copilot";
          }}
        >
          Secure the offer
        </button>
        <small>*Limited-time promotion. Configure terms in your marketing settings.</small>
      </div>
    </aside>
  );
};

SummaryPanel.propTypes = {
  summary: PropTypes.shape({
    readiness: PropTypes.number,
    frameworkLabel: PropTypes.string,
    personaTitle: PropTypes.string,
    personaSubtitle: PropTypes.string,
    levelLabel: PropTypes.string,
    gaps: PropTypes.arrayOf(PropTypes.string),
    suggestions: PropTypes.arrayOf(PropTypes.string)
  })
};

export default SummaryPanel;
