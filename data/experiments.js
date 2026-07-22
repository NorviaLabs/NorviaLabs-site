/** Norvia Labs experiments portfolio — edit this file to add/remove projects.
 *  status: "active" = currently building (max 2); "queue" = next up (listed, not interactive).
 *  url / code: only set when the repo is public and live. Omit until then.
 */
window.NORVIA_EXPERIMENTS = [
  {
    id: "forge",
    name: "forge",
    stack: "TypeScript",
    family: "Runtimes",
    familySlug: "runtimes",
    status: "active",
    description:
      "Agentic harness for running tools, loops, and policies. Thin core, pluggable models, deterministic replays.",
  },
  {
    id: "sandbox-lite",
    name: "sandbox-lite",
    stack: "Rust",
    family: "Runtimes",
    familySlug: "runtimes",
    status: "active",
    description:
      "Minimal execution sandbox for untrusted tool code. Fast start, hard limits, clean teardown.",
  },
  {
    id: "wiremock-mcp",
    name: "wiremock-mcp",
    stack: "TypeScript",
    family: "Tooling",
    familySlug: "tooling",
    status: "queue",
    description:
      "Mock MCP servers for local agent development. Deterministic tools without live backends.",
  },
  {
    id: "fixturelab",
    name: "fixturelab",
    stack: "Python",
    family: "Tooling",
    familySlug: "tooling",
    status: "queue",
    description:
      "Generate and pin fixtures for LLM tests so flaky model output does not break your suite.",
  },
  {
    id: "openmetrics-ai",
    name: "openmetrics-ai",
    stack: "Go",
    family: "Observability",
    familySlug: "observability",
    status: "queue",
    description:
      "Open metrics for AI workloads — tokens, tools, retries, and cost in one scrape. Prometheus-native.",
  },
  {
    id: "promptforge",
    name: "promptforge",
    stack: "TypeScript",
    family: "Tooling",
    familySlug: "tooling",
    status: "queue",
    description:
      "Versioned prompt packs with diffs, fixtures, and CI checks so prompts stay reviewable.",
  },
];

window.NORVIA_FAMILIES = [
  {
    slug: "runtimes",
    name: "Runtimes",
    description: "Harnesses, sandboxes, and execution layers for experimental agents.",
  },
  {
    slug: "observability",
    name: "Observability",
    description: "Metrics and cost so experiments stay measurable.",
  },
  {
    slug: "tooling",
    name: "Tooling",
    description: "Dev-loop tools: mocks, fixtures, prompts, and CI-friendly helpers.",
  },
];
