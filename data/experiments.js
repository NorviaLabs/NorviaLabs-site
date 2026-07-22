/** NorviaLabs experiments portfolio — edit this file to add/remove projects. */
window.NORVIA_EXPERIMENTS = [
  {
    id: "norvia-core",
    name: "norvia-core",
    stack: "TypeScript",
    family: "Foundations",
    familySlug: "foundations",
    description:
      "Shared primitives, types, and utilities that every Norvia experiment builds on.",
    url: "https://github.com/norvialabs/norvia-core",
    code: "https://github.com/norvialabs/norvia-core",
  },
  {
    id: "signalbench",
    name: "signalbench",
    stack: "Python",
    family: "Research",
    familySlug: "research",
    description:
      "Reproducible benchmarks for eval signals — latency, cost, and quality under realistic load.",
    url: "https://github.com/norvialabs/signalbench",
    code: "https://github.com/norvialabs/signalbench",
  },
  {
    id: "tracekit",
    name: "tracekit",
    stack: "Rust + Python",
    family: "Observability",
    familySlug: "observability",
    description:
      "Lightweight tracing for agent runs. Structured spans, export hooks, zero config by default.",
    url: "https://github.com/norvialabs/tracekit",
    code: "https://github.com/norvialabs/tracekit",
  },
  {
    id: "promptforge",
    name: "promptforge",
    stack: "TypeScript",
    family: "Tooling",
    familySlug: "tooling",
    description:
      "Versioned prompt packs with diffs, fixtures, and CI checks so prompts stay reviewable.",
    url: "https://github.com/norvialabs/promptforge",
    code: "https://github.com/norvialabs/promptforge",
  },
  {
    id: "sandbox-lite",
    name: "sandbox-lite",
    stack: "Rust",
    family: "Runtimes",
    familySlug: "runtimes",
    description:
      "Minimal execution sandbox for untrusted tool code. Fast start, hard limits, clean teardown.",
    url: "https://github.com/norvialabs/sandbox-lite",
    code: "https://github.com/norvialabs/sandbox-lite",
  },
  {
    id: "memshard",
    name: "memshard",
    stack: "Python",
    family: "Runtimes",
    familySlug: "runtimes",
    description:
      "Shardable memory store for long-running experiments. Local-first with optional remote sync.",
    url: "https://github.com/norvialabs/memshard",
    code: "https://github.com/norvialabs/memshard",
  },
  {
    id: "agent-sketch",
    name: "agent-sketch",
    stack: "TypeScript",
    family: "Research",
    familySlug: "research",
    description:
      "Sketch agents as graphs, export runnable skeletons, and compare design trade-offs side by side.",
    url: "https://github.com/norvialabs/agent-sketch",
    code: "https://github.com/norvialabs/agent-sketch",
  },
  {
    id: "openmetrics-ai",
    name: "openmetrics-ai",
    stack: "Go",
    family: "Observability",
    familySlug: "observability",
    description:
      "Open metrics exposition for AI workloads — tokens, tools, retries, and cost in one scrape.",
    url: "https://github.com/norvialabs/openmetrics-ai",
    code: "https://github.com/norvialabs/openmetrics-ai",
  },
  {
    id: "fixturelab",
    name: "fixturelab",
    stack: "Python",
    family: "Tooling",
    familySlug: "tooling",
    description:
      "Generate and pin fixtures for LLM tests so flaky model output does not break your suite.",
    url: "https://github.com/norvialabs/fixturelab",
    code: "https://github.com/norvialabs/fixturelab",
  },
  {
    id: "wiremock-mcp",
    name: "wiremock-mcp",
    stack: "TypeScript",
    family: "Tooling",
    familySlug: "tooling",
    description:
      "Mock MCP servers for local agent development. Deterministic tools without live backends.",
    url: "https://github.com/norvialabs/wiremock-mcp",
    code: "https://github.com/norvialabs/wiremock-mcp",
  },
  {
    id: "flowglass",
    name: "flowglass",
    stack: "Rust",
    family: "Foundations",
    familySlug: "foundations",
    description:
      "Transparent pipelines: declare steps, inspect state, and replay failures with full context.",
    url: "https://github.com/norvialabs/flowglass",
    code: "https://github.com/norvialabs/flowglass",
  },
  {
    id: "costmap",
    name: "costmap",
    stack: "Python",
    family: "Observability",
    familySlug: "observability",
    description:
      "Map where token spend actually goes across models, tools, and retries. One dashboard file.",
    url: "https://github.com/norvialabs/costmap",
    code: "https://github.com/norvialabs/costmap",
  },
];

window.NORVIA_FAMILIES = [
  {
    slug: "foundations",
    name: "Foundations",
    description: "Shared primitives and pipelines every experiment can lean on.",
  },
  {
    slug: "runtimes",
    name: "Runtimes",
    description: "Sandboxes, memory, and execution layers for experimental agents.",
  },
  {
    slug: "observability",
    name: "Observability",
    description: "Traces, metrics, and cost maps so experiments stay measurable.",
  },
  {
    slug: "tooling",
    name: "Tooling",
    description: "Dev-loop tools: prompts, fixtures, mocks, and CI-friendly helpers.",
  },
  {
    slug: "research",
    name: "Research",
    description: "Benchmarks, sketches, and ideas we are still stress-testing in the open.",
  },
];
