export function computeNextScore(currentScore, node, option) {
  if (!node.tag || typeof option.scoreImpact !== "number") return currentScore;

  const impact = option.scoreImpact;
  const maxForQuestion = node.options.reduce((max, opt) => {
    if (typeof opt.scoreImpact === "number" && opt.scoreImpact > max) {
      return opt.scoreImpact;
    }
    return max;
  }, 0);

  const nextTotal = currentScore.total + impact;
  const nextMax = currentScore.max + maxForQuestion;

  const tags = { ...currentScore.tags };
  const prevTag = tags[node.tag] || { total: 0, max: 0 };
  tags[node.tag] = {
    total: prevTag.total + impact,
    max: prevTag.max + maxForQuestion
  };

  return {
    total: nextTotal,
    max: nextMax,
    tags
  };
}

export function buildSummary(scoreState, frameworkId, frameworksMap) {
  const readiness =
    scoreState.max > 0
      ? Math.round((scoreState.total / scoreState.max) * 100)
      : 0;

  let levelLabel;
  let personaTitle;
  let personaSubtitle;

  if (readiness >= 80) {
    levelLabel = "Strong & audit-ready";
    personaTitle = "Proactive Guardian";
    personaSubtitle =
      "You’re ahead of the curve – now it’s about polish and automation.";
  } else if (readiness >= 60) {
    levelLabel = "Structured but reactive";
    personaTitle = "Structured Improver";
    personaSubtitle =
      "Good foundations – with some targeted fixes you’ll be audit-comfortable.";
  } else {
    levelLabel = "At risk – needs structured improvement";
    personaTitle = "Firefighting Mode";
    personaSubtitle =
      "You’re keeping things running, but not in a way auditors (or incidents) will forgive.";
  }

  const gaps = [];
  const suggestions = [];
  const tags = scoreState.tags || {};

  function checkTag(tag, label, suggestion) {
    const info = tags[tag];
    if (!info || info.max === 0) return;
    const tagScore = (info.total / info.max) * 10;
    if (tagScore < 7) {
      gaps.push(label);
      suggestions.push(suggestion);
    }
  }

  checkTag(
    "inventory",
    "Asset / information inventory",
    "Create and maintain a single, always-updated inventory with owners, locations and criticality."
  );
  checkTag(
    "ownership",
    "Ownership & accountability",
    "Assign clear owners, escalation paths and responsibilities for critical assets and systems."
  );
  checkTag(
    "classification",
    "Classification, segmentation & data minimization",
    "Classify or segment assets and environments based on risk and minimize sensitive data storage."
  );
  checkTag(
    "maintenance",
    "Lifecycle & patching",
    "Track lifecycle events, changes and patches through defined workflows linked to assets."
  );
  checkTag(
    "access",
    "Access control & monitoring",
    "Apply least-privilege access, log key actions and review access rights on a schedule."
  );
  checkTag(
    "disposal",
    "Secure decommissioning",
    "Implement secure, documented disposal or wiping procedures for assets and media."
  );
  checkTag(
    "tooling",
    "Tooling & automation",
    "Consolidate asset data into an AI-ready platform instead of scattered spreadsheets and manual processes."
  );
  checkTag(
    "incidents",
    "Incident & change linkage",
    "Ensure incidents and changes are linked to specific assets so you can show impact and traceability."
  );
  checkTag(
    "risk",
    "Risk-based control mapping",
    "Connect risks, controls and assets so decisions are based on real business impact."
  );
  checkTag(
    "reporting",
    "Evidence & reporting",
    "Centralize information so you can generate audit-ready reports in hours, not weeks."
  );
  checkTag(
    "training",
    "Awareness & training",
    "Run regular, targeted training for staff who handle critical assets or sensitive data."
  );

  const frameworkLabel = frameworksMap[frameworkId]?.label || "Framework";

  return {
    readiness,
    levelLabel,
    personaTitle,
    personaSubtitle,
    gaps,
    suggestions,
    frameworkLabel
  };
}
