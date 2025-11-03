export const frameworks = {
  soc2: {
    id: "soc2",
    label: "SOC 2",
    description: "Service organization controls, asset & access readiness.",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(14,165,233,0.35))"
  },
  pci: {
    id: "pci",
    label: "PCI DSS",
    description: "Cardholder data environment, payment-related assets.",
    color: "#4ade80",
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.25), rgba(34,197,94,0.35))"
  },
  iso27001: {
    id: "iso27001",
    label: "ISO 27001",
    description: "Information security & asset governance.",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(124,58,237,0.35))"
  }
};

export const flows = {
  soc2: {
    id: "soc2-flow",
    title: "SOC 2 Asset Readiness",
    startNode: "intro",
    nodes: {
      intro: {
        type: "question",
        message:
          "Hi, I’m your SOC 2 Asset Copilot 🤖 Let’s quickly check how ready your asset practices are for a SOC 2 audit.",
        control: "buttons",
        options: [
          { label: "Start SOC 2 check", value: "START", next: "q_inventory" },
          { label: "Maybe later", value: "LATER", next: "exit" }
        ]
      },
      exit: {
        type: "bot",
        message:
          "No worries. When you’re ready for a SOC 2 readiness snapshot, I’ll be here."
      },
      q_inventory: {
        type: "question",
        tag: "inventory",
        message:
          "Do you maintain a single, up-to-date inventory of all systems and assets in scope for SOC 2 (including SaaS, servers, laptops, key equipment)?",
        control: "buttons",
        options: [
          {
            label: "Yes – centralized & always updated",
            value: "YES",
            next: "q_inventory_depth",
            scoreImpact: 10
          },
          {
            label: "Partially – some assets are tracked",
            value: "PARTIAL",
            next: "q_inventory_depth",
            scoreImpact: 5
          },
          {
            label: "No – mostly scattered / manual",
            value: "NO",
            next: "q_inventory_depth",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_inventory_depth",
            scoreImpact: 3
          }
        ]
      },
      q_inventory_depth: {
        type: "question",
        tag: "inventory",
        message:
          "How deep is the information in your inventory (e.g., owner, location, data classification, business criticality)?",
        control: "buttons",
        options: [
          {
            label: "Rich – most fields are filled in",
            value: "YES",
            next: "q_ownership",
            scoreImpact: 10
          },
          {
            label: "Mixed – some important gaps",
            value: "PARTIAL",
            next: "q_ownership",
            scoreImpact: 5
          },
          {
            label: "Basic – only names / IDs",
            value: "NO",
            next: "q_ownership",
            scoreImpact: 2
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_ownership",
            scoreImpact: 3
          }
        ]
      },
      q_ownership: {
        type: "question",
        tag: "ownership",
        message:
          "Are asset owners clearly defined and documented for critical systems (who is accountable)?",
        control: "buttons",
        options: [
          {
            label: "Yes – every critical asset has an owner",
            value: "YES",
            next: "q_ownership_escalation",
            scoreImpact: 10
          },
          {
            label: "Some do, some don’t",
            value: "PARTIAL",
            next: "q_ownership_escalation",
            scoreImpact: 5
          },
          {
            label: "No formal mapping",
            value: "NO",
            next: "q_ownership_escalation",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_ownership_escalation",
            scoreImpact: 3
          }
        ]
      },
      q_ownership_escalation: {
        type: "question",
        tag: "ownership",
        message:
          "If something breaks or a risk is found for a critical asset, is there a clear owner / escalation path documented?",
        control: "buttons",
        options: [
          {
            label: "Yes – clear and followed",
            value: "YES",
            next: "q_classification",
            scoreImpact: 10
          },
          {
            label: "Partially – people know informally",
            value: "PARTIAL",
            next: "q_classification",
            scoreImpact: 5
          },
          {
            label: "No – depends on who notices",
            value: "NO",
            next: "q_classification",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_classification",
            scoreImpact: 3
          }
        ]
      },
      q_classification: {
        type: "question",
        tag: "classification",
        message:
          "Do you classify assets by criticality or data sensitivity (e.g., high / medium / low impact on confidentiality, integrity, availability)?",
        control: "buttons",
        options: [
          {
            label: "Yes – we have a clear model",
            value: "YES",
            next: "q_maintenance",
            scoreImpact: 10
          },
          {
            label: "Some rough classification exists",
            value: "PARTIAL",
            next: "q_maintenance",
            scoreImpact: 5
          },
          {
            label: "No formal classification",
            value: "NO",
            next: "q_maintenance",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_maintenance",
            scoreImpact: 3
          }
        ]
      },
      q_maintenance: {
        type: "question",
        tag: "maintenance",
        message:
          "How do you track lifecycle and changes (onboarding, changes, retirement) for in-scope assets?",
        control: "buttons",
        options: [
          {
            label: "Digitally with approvals & history",
            value: "YES",
            next: "q_incidents",
            scoreImpact: 10
          },
          {
            label: "Partially – some workflows exist",
            value: "PARTIAL",
            next: "q_incidents",
            scoreImpact: 5
          },
          {
            label: "Ad-hoc / manual",
            value: "NO",
            next: "q_incidents",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_incidents",
            scoreImpact: 3
          }
        ]
      },
      q_incidents: {
        type: "question",
        tag: "incidents",
        message:
          "When incidents happen, can you easily link them back to the affected assets (for root cause, impact analysis, and SOC 2 evidence)?",
        control: "buttons",
        options: [
          {
            label: "Yes – it’s part of our workflow",
            value: "YES",
            next: "q_access",
            scoreImpact: 10
          },
          {
            label: "Some linkage exists",
            value: "PARTIAL",
            next: "q_access",
            scoreImpact: 5
          },
          {
            label: "Not really – it’s manual",
            value: "NO",
            next: "q_access",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_access",
            scoreImpact: 3
          }
        ]
      },
      q_access: {
        type: "question",
        tag: "access",
        message:
          "Do you control and regularly review access to systems handling customer or sensitive data (least privilege, periodic reviews)?",
        control: "buttons",
        options: [
          {
            label: "Yes – enforced & reviewed on schedule",
            value: "YES",
            next: "q_disposal",
            scoreImpact: 10
          },
          {
            label: "Partially – controls exist but not consistent",
            value: "PARTIAL",
            next: "q_disposal",
            scoreImpact: 5
          },
          {
            label: "Mostly informal",
            value: "NO",
            next: "q_disposal",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_disposal",
            scoreImpact: 3
          }
        ]
      },
      q_disposal: {
        type: "question",
        tag: "disposal",
        message:
          "When assets are retired, do you have a secure decommissioning process (data wiping, certificates, logged in a system)?",
        control: "buttons",
        options: [
          {
            label: "Yes – standardized & logged",
            value: "YES",
            next: "q_tooling",
            scoreImpact: 10
          },
          {
            label: "Partially – some cases tracked",
            value: "PARTIAL",
            next: "q_tooling",
            scoreImpact: 5
          },
          {
            label: "No formal process",
            value: "NO",
            next: "q_tooling",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_tooling",
            scoreImpact: 3
          }
        ]
      },
      q_tooling: {
        type: "question",
        tag: "tooling",
        message:
          "What best describes your current asset management tooling for SOC 2 in-scope assets?",
        control: "buttons",
        options: [
          {
            label: "Modern system with automations",
            value: "YES",
            next: "q_reporting",
            scoreImpact: 10
          },
          {
            label: "Basic CMDB / CMMS",
            value: "PARTIAL",
            next: "q_reporting",
            scoreImpact: 6
          },
          {
            label: "Spreadsheets and email",
            value: "NO",
            next: "q_reporting",
            scoreImpact: 2
          },
          {
            label: "Mostly manual / paper",
            value: "MANUAL",
            next: "q_reporting",
            scoreImpact: 0
          }
        ]
      },
      q_reporting: {
        type: "question",
        tag: "reporting",
        message:
          "If an auditor asks today, can you generate reports showing asset inventory, owners, changes and access history within a reasonable time?",
        control: "buttons",
        options: [
          {
            label: "Yes – minutes from a system",
            value: "YES",
            next: "q_training",
            scoreImpact: 10
          },
          {
            label: "Possible but manual & slow",
            value: "PARTIAL",
            next: "q_training",
            scoreImpact: 5
          },
          {
            label: "Would be very hard",
            value: "NO",
            next: "q_training",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_training",
            scoreImpact: 3
          }
        ]
      },
      q_training: {
        type: "question",
        tag: "training",
        message:
          "Do teams handling in-scope assets get regular training on SOC 2 controls, asset handling and incident reporting?",
        control: "buttons",
        options: [
          {
            label: "Yes – structured & recurring",
            value: "YES",
            next: "summary",
            scoreImpact: 10
          },
          {
            label: "Occasional / informal",
            value: "PARTIAL",
            next: "summary",
            scoreImpact: 5
          },
          {
            label: "Rarely / never",
            value: "NO",
            next: "summary",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "summary",
            scoreImpact: 3
          }
        ]
      },
      summary: { type: "summary" }
    }
  },
  pci: {
    id: "pci-flow",
    title: "PCI DSS Asset Readiness",
    startNode: "intro",
    nodes: {
      intro: {
        type: "question",
        message:
          "Hi, I’m your PCI DSS Asset Copilot 💳 Let’s check how ready your assets are for protecting cardholder data.",
        control: "buttons",
        options: [
          { label: "Start PCI DSS check", value: "START", next: "q_inventory" },
          { label: "Maybe later", value: "LATER", next: "exit" }
        ]
      },
      exit: {
        type: "bot",
        message:
          "Understood. Drop back in when you want a quick PCI DSS asset readiness snapshot."
      },
      q_inventory: {
        type: "question",
        tag: "inventory",
        message:
          "Do you maintain a clear inventory of all systems that store, process or transmit cardholder data (CDE)?",
        control: "buttons",
        options: [
          {
            label: "Yes – fully mapped CDE",
            value: "YES",
            next: "q_inventory_scope",
            scoreImpact: 10
          },
          {
            label: "Partially – most key systems listed",
            value: "PARTIAL",
            next: "q_inventory_scope",
            scoreImpact: 5
          },
          {
            label: "No – only informal knowledge",
            value: "NO",
            next: "q_inventory_scope",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_inventory_scope",
            scoreImpact: 3
          }
        ]
      },
      q_inventory_scope: {
        type: "question",
        tag: "inventory",
        message:
          "Is the boundary of your CDE (what’s in scope vs out of scope) clearly documented and reviewed?",
        control: "buttons",
        options: [
          {
            label: "Yes – clearly documented",
            value: "YES",
            next: "q_segmentation",
            scoreImpact: 10
          },
          {
            label: "Partially – some docs exist",
            value: "PARTIAL",
            next: "q_segmentation",
            scoreImpact: 5
          },
          {
            label: "Not really defined",
            value: "NO",
            next: "q_segmentation",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_segmentation",
            scoreImpact: 3
          }
        ]
      },
      q_segmentation: {
        type: "question",
        tag: "classification",
        message:
          "Is your cardholder data environment (CDE) clearly segmented from the rest of your network?",
        control: "buttons",
        options: [
          {
            label: "Yes – strongly segmented & documented",
            value: "YES",
            next: "q_patching",
            scoreImpact: 10
          },
          {
            label: "Partially segmented",
            value: "PARTIAL",
            next: "q_patching",
            scoreImpact: 5
          },
          {
            label: "Not really segmented",
            value: "NO",
            next: "q_patching",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_patching",
            scoreImpact: 3
          }
        ]
      },
      q_patching: {
        type: "question",
        tag: "maintenance",
        message:
          "Do you track and apply security patches promptly for assets in the CDE?",
        control: "buttons",
        options: [
          {
            label: "Yes – centrally tracked & enforced",
            value: "YES",
            next: "q_logging",
            scoreImpact: 10
          },
          {
            label: "Partially – not uniform",
            value: "PARTIAL",
            next: "q_logging",
            scoreImpact: 5
          },
          {
            label: "Mostly reactive",
            value: "NO",
            next: "q_logging",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_logging",
            scoreImpact: 3
          }
        ]
      },
      q_logging: {
        type: "question",
        tag: "access",
        message:
          "Do you have logging and monitoring in place for access to systems in the CDE?",
        control: "buttons",
        options: [
          {
            label: "Yes – centralized logging & alerts",
            value: "YES",
            next: "q_tokenization",
            scoreImpact: 10
          },
          {
            label: "Partially – only some systems",
            value: "PARTIAL",
            next: "q_tokenization",
            scoreImpact: 5
          },
          {
            label: "Minimal / no logging",
            value: "NO",
            next: "q_tokenization",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_tokenization",
            scoreImpact: 3
          }
        ]
      },
      q_tokenization: {
        type: "question",
        tag: "classification",
        message:
          "Do you minimize cardholder data storage (e.g., using tokenization, truncation, or avoiding storage where possible)?",
        control: "buttons",
        options: [
          {
            label: "Yes – strong minimization in place",
            value: "YES",
            next: "q_disposal",
            scoreImpact: 10
          },
          {
            label: "Partially – some controls exist",
            value: "PARTIAL",
            next: "q_disposal",
            scoreImpact: 5
          },
          {
            label: "No – we store more data than needed",
            value: "NO",
            next: "q_disposal",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_disposal",
            scoreImpact: 3
          }
        ]
      },
      q_disposal: {
        type: "question",
        tag: "disposal",
        message:
          "When devices storing card data are retired, do you securely wipe or destroy them following a documented process?",
        control: "buttons",
        options: [
          {
            label: "Yes – consistent & recorded",
            value: "YES",
            next: "q_tooling",
            scoreImpact: 10
          },
          {
            label: "Sometimes, not always recorded",
            value: "PARTIAL",
            next: "q_tooling",
            scoreImpact: 5
          },
          {
            label: "No defined process",
            value: "NO",
            next: "q_tooling",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_tooling",
            scoreImpact: 3
          }
        ]
      },
      q_tooling: {
        type: "question",
        tag: "tooling",
        message:
          "How do you currently manage and monitor assets in the CDE (inventories, patches, configs)?",
        control: "buttons",
        options: [
          {
            label: "Unified platform with automation",
            value: "YES",
            next: "q_reporting",
            scoreImpact: 10
          },
          {
            label: "Mix of tools / partial",
            value: "PARTIAL",
            next: "q_reporting",
            scoreImpact: 6
          },
          {
            label: "Spreadsheets / manual tracking",
            value: "NO",
            next: "q_reporting",
            scoreImpact: 2
          },
          {
            label: "Mostly undocumented",
            value: "MANUAL",
            next: "q_reporting",
            scoreImpact: 0
          }
        ]
      },
      q_reporting: {
        type: "question",
        tag: "reporting",
        message:
          "Can you generate evidence (asset lists, logs, patch records) required for a PCI DSS assessment without weeks of manual effort?",
        control: "buttons",
        options: [
          {
            label: "Yes – from centralized systems",
            value: "YES",
            next: "q_training",
            scoreImpact: 10
          },
          {
            label: "Possible but time-consuming",
            value: "PARTIAL",
            next: "q_training",
            scoreImpact: 5
          },
          {
            label: "Very difficult",
            value: "NO",
            next: "q_training",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_training",
            scoreImpact: 3
          }
        ]
      },
      q_training: {
        type: "question",
        tag: "training",
        message:
          "Do staff who handle cardholder data receive regular PCI DSS and security awareness training?",
        control: "buttons",
        options: [
          {
            label: "Yes – structured & tracked",
            value: "YES",
            next: "summary",
            scoreImpact: 10
          },
          {
            label: "Informal / occasional",
            value: "PARTIAL",
            next: "summary",
            scoreImpact: 5
          },
          {
            label: "Not really",
            value: "NO",
            next: "summary",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "summary",
            scoreImpact: 3
          }
        ]
      },
      summary: { type: "summary" }
    }
  },
  iso27001: {
    id: "iso-flow",
    title: "ISO 27001 Asset Readiness",
    startNode: "intro",
    nodes: {
      intro: {
        type: "question",
        message:
          "Hi, I’m your ISO 27001 Asset Copilot 🔐 Let’s assess how mature your asset and information security practices are.",
        control: "buttons",
        options: [
          {
            label: "Start ISO 27001 check",
            value: "START",
            next: "q_inventory"
          },
          {
            label: "Maybe later",
            value: "LATER",
            next: "exit"
          }
        ]
      },
      exit: {
        type: "bot",
        message:
          "Got it. Come back anytime for a quick ISO 27001 asset maturity snapshot."
      },
      q_inventory: {
        type: "question",
        tag: "inventory",
        message:
          "Do you have an information asset inventory (including data, systems and supporting assets) that is maintained and reviewed?",
        control: "buttons",
        options: [
          {
            label: "Yes – reviewed and maintained",
            value: "YES",
            next: "q_inventory_scope",
            scoreImpact: 10
          },
          {
            label: "Exists but not regularly reviewed",
            value: "PARTIAL",
            next: "q_inventory_scope",
            scoreImpact: 5
          },
          {
            label: "No formal inventory",
            value: "NO",
            next: "q_inventory_scope",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_inventory_scope",
            scoreImpact: 3
          }
        ]
      },
      q_inventory_scope: {
        type: "question",
        tag: "inventory",
        message:
          "Is it clear which assets and information are in scope for your ISMS and risk assessments?",
        control: "buttons",
        options: [
          {
            label: "Yes – scope is well documented",
            value: "YES",
            next: "q_ownership",
            scoreImpact: 10
          },
          {
            label: "Partially – documented but outdated",
            value: "PARTIAL",
            next: "q_ownership",
            scoreImpact: 5
          },
          {
            label: "No – scope is fuzzy",
            value: "NO",
            next: "q_ownership",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_ownership",
            scoreImpact: 3
          }
        ]
      },
      q_ownership: {
        type: "question",
        tag: "ownership",
        message:
          "Are information asset owners formally assigned with documented responsibilities?",
        control: "buttons",
        options: [
          {
            label: "Yes – owners & responsibilities defined",
            value: "YES",
            next: "q_classification",
            scoreImpact: 10
          },
          {
            label: "Partially – some owners identified",
            value: "PARTIAL",
            next: "q_classification",
            scoreImpact: 5
          },
          {
            label: "No formal assignment",
            value: "NO",
            next: "q_classification",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_classification",
            scoreImpact: 3
          }
        ]
      },
      q_classification: {
        type: "question",
        tag: "classification",
        message:
          "Do you classify information and assets (e.g., public / internal / confidential / restricted) and apply controls accordingly?",
        control: "buttons",
        options: [
          {
            label: "Yes – formal scheme in use",
            value: "YES",
            next: "q_risk",
            scoreImpact: 10
          },
          {
            label: "Some ad-hoc classification",
            value: "PARTIAL",
            next: "q_risk",
            scoreImpact: 5
          },
          {
            label: "No classification scheme",
            value: "NO",
            next: "q_risk",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_risk",
            scoreImpact: 3
          }
        ]
      },
      q_risk: {
        type: "question",
        tag: "risk",
        message:
          "Do you perform risk assessments that link threats, vulnerabilities and controls to specific assets or asset groups?",
        control: "buttons",
        options: [
          {
            label: "Yes – structured & documented",
            value: "YES",
            next: "q_maintenance",
            scoreImpact: 10
          },
          {
            label: "Partially – some assets covered",
            value: "PARTIAL",
            next: "q_maintenance",
            scoreImpact: 5
          },
          {
            label: "Minimal / informal",
            value: "NO",
            next: "q_maintenance",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_maintenance",
            scoreImpact: 3
          }
        ]
      },
      q_maintenance: {
        type: "question",
        tag: "maintenance",
        message:
          "Do you track lifecycle events (changes, issues, retirement) for important information assets in a structured way?",
        control: "buttons",
        options: [
          {
            label: "Yes – via defined processes / tools",
            value: "YES",
            next: "q_access",
            scoreImpact: 10
          },
          {
            label: "Partially – mixed tools & manual",
            value: "PARTIAL",
            next: "q_access",
            scoreImpact: 5
          },
          {
            label: "Low visibility and ad-hoc",
            value: "NO",
            next: "q_access",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_access",
            scoreImpact: 3
          }
        ]
      },
      q_access: {
        type: "question",
        tag: "access",
        message:
          "Are access rights to critical information and systems granted based on least privilege and reviewed regularly?",
        control: "buttons",
        options: [
          {
            label: "Yes – defined and regularly reviewed",
            value: "YES",
            next: "q_disposal",
            scoreImpact: 10
          },
          {
            label: "Partially – some reviews happen",
            value: "PARTIAL",
            next: "q_disposal",
            scoreImpact: 5
          },
          {
            label: "Not formally managed",
            value: "NO",
            next: "q_disposal",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_disposal",
            scoreImpact: 3
          }
        ]
      },
      q_disposal: {
        type: "question",
        tag: "disposal",
        message:
          "When information or media is no longer needed, do you have a secure and documented disposal procedure?",
        control: "buttons",
        options: [
          {
            label: "Yes – implemented & followed",
            value: "YES",
            next: "q_tooling",
            scoreImpact: 10
          },
          {
            label: "Partially – some cases handled",
            value: "PARTIAL",
            next: "q_tooling",
            scoreImpact: 5
          },
          {
            label: "No clear procedure",
            value: "NO",
            next: "q_tooling",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_tooling",
            scoreImpact: 3
          }
        ]
      },
      q_tooling: {
        type: "question",
        tag: "tooling",
        message:
          "How do you manage asset- and control-related information (inventories, risk register, actions) today?",
        control: "buttons",
        options: [
          {
            label: "Integrated ISMS / asset platform",
            value: "YES",
            next: "q_reporting",
            scoreImpact: 10
          },
          {
            label: "Several tools & spreadsheets",
            value: "PARTIAL",
            next: "q_reporting",
            scoreImpact: 6
          },
          {
            label: "Mostly spreadsheets / email",
            value: "NO",
            next: "q_reporting",
            scoreImpact: 2
          },
          {
            label: "Ad-hoc / undocumented",
            value: "MANUAL",
            next: "q_reporting",
            scoreImpact: 0
          }
        ]
      },
      q_reporting: {
        type: "question",
        tag: "reporting",
        message:
          "Could you demonstrate asset- and information-related controls to an ISO 27001 auditor without weeks of manual work?",
        control: "buttons",
        options: [
          {
            label: "Yes – via centralized systems",
            value: "YES",
            next: "q_training",
            scoreImpact: 10
          },
          {
            label: "Yes, but would take effort",
            value: "PARTIAL",
            next: "q_training",
            scoreImpact: 5
          },
          {
            label: "Very difficult",
            value: "NO",
            next: "q_training",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "q_training",
            scoreImpact: 3
          }
        ]
      },
      q_training: {
        type: "question",
        tag: "training",
        message:
          "Do relevant staff receive regular training on the ISMS, asset handling, and security responsibilities?",
        control: "buttons",
        options: [
          {
            label: "Yes – structured & logged",
            value: "YES",
            next: "summary",
            scoreImpact: 10
          },
          {
            label: "Occasional / informal",
            value: "PARTIAL",
            next: "summary",
            scoreImpact: 5
          },
          {
            label: "Not really",
            value: "NO",
            next: "summary",
            scoreImpact: 0
          },
          {
            label: "Not sure",
            value: "UNKNOWN",
            next: "summary",
            scoreImpact: 3
          }
        ]
      },
      summary: { type: "summary" }
    }
  }
};
