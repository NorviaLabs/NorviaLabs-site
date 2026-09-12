/** Norvia Labs experiments portfolio — edit this file to add/remove projects.
 *  status: "active" = shipping now; "queue" = listed idea, not yet built.
 *  tagline: short one-liner used in the lab status panel.
 *  primary: true marks the lab's active project.
 *  url / code / releases: only set when the repo is public and live. Omit until then.
 */
window.NORVIA_EXPERIMENTS = [
  {
    id: "forge",
    name: "Forge",
    stack: "Rust",
    status: "active",
    primary: true,
    tagline: "Terminal-native AI coding environment.",
    description:
      "An open-source terminal-native AI coding environment that brings the agent, editor, repository navigation, shell, diffs, approvals, and durable sessions into one workspace.",
    url: "https://forge.norvialabs.com",
    code: "https://github.com/norvialabs/forge",
    releases: "https://github.com/norvialabs/forge/releases",
  },
  {
    id: "guard",
    name: "Guard",
    stack: "Rust",
    status: "queue",
    tagline: "Governance and execution controls for agent-accessible tools and infrastructure.",
    description:
      "Governance and execution controls for agent-accessible tools and infrastructure.",
  },
  {
    id: "contract",
    name: "Contract",
    stack: "Rust",
    status: "queue",
    tagline: "Explicit contracts for systems and APIs used by agents.",
    description: "Explicit contracts for systems and APIs used by agents.",
  },
  {
    id: "route",
    name: "Route",
    stack: "Rust",
    status: "queue",
    tagline: "Routing infrastructure for agent and model workloads.",
    description: "Routing infrastructure for agent and model workloads.",
  },
  {
    id: "audit",
    name: "Audit",
    stack: "Rust",
    status: "queue",
    tagline: "Auditable records of agent actions and decisions.",
    description: "Auditable records of agent actions and decisions.",
  },
];
