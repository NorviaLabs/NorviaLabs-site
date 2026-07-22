/** Norvia Labs experiments portfolio — edit this file to add/remove projects.
 *  status: "active" = shipping now; "queue" = planned (listed, not interactive).
 *  url / code: only set when the repo is public and live. Omit until then.
 */
window.NORVIA_EXPERIMENTS = [
  {
    id: "forge",
    name: "forge",
    stack: "Rust",
    status: "active",
    description:
      "Agentic harness for running tools, loops, and policies. Thin core, pluggable models, deterministic replays.",
  },
  {
    id: "guard",
    name: "guard",
    stack: "Rust",
    status: "queue",
    description:
      "Control-plane proxy for agent traffic: MCP governance, ephemeral agent identity (ZTNA), and real-time execution safety that stops loops and bad commands.",
  },
  {
    id: "contract",
    name: "contract",
    stack: "Rust",
    status: "queue",
    description:
      "API translation that turns existing enterprise backends into clean tool schemas agents can call without hand-written wrappers.",
  },
  {
    id: "route",
    name: "route",
    stack: "Rust",
    status: "queue",
    description:
      "Context optimizer that prunes unused tool schemas from the prompt to cut token cost and latency.",
  },
  {
    id: "audit",
    name: "audit",
    stack: "Rust",
    status: "queue",
    description:
      "Structured, cryptographic audit ledger for every action the gateway processes — built for enterprise compliance.",
  },
];
