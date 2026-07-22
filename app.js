(function () {
  const experiments = window.NORVIA_EXPERIMENTS || [];
  const families = window.NORVIA_FAMILIES || [];

  /* Theme */
  const root = document.documentElement;
  const themeBtns = document.querySelectorAll("[data-theme-toggle]");

  function applyTheme(mode) {
    if (mode === "light") root.classList.add("light");
    else root.classList.remove("light");
    try {
      localStorage.setItem("theme", mode);
    } catch (_) {}
  }

  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = root.classList.contains("light") ? "dark" : "light";
      applyTheme(next);
    });
  });

  /* Mobile nav */
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Stack icon arrow SVG */
  const arrowSvg = `
    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
    </svg>`;

  function cardHTML(exp) {
    return `
      <article class="product-card" data-group="${exp.familySlug}">
        <div class="product-card-top">
          <div class="product-name-row">
            <span class="product-icon">${arrowSvg}</span>
            <a class="product-name" href="${exp.url}" target="_blank" rel="noopener">${exp.name}</a>
          </div>
          <span class="stack-badge" data-stack="${exp.stack}">${exp.stack}</span>
        </div>
        <p class="product-desc">${exp.description}</p>
        <div class="product-footer">
          <span class="product-family">${exp.family}</span>
          <div class="product-links">
            <a class="visit" href="${exp.url}" target="_blank" rel="noopener">Visit →</a>
            <a class="code" href="${exp.code}" target="_blank" rel="noopener">Code</a>
          </div>
        </div>
      </article>`;
  }

  /* Home / experiments grid */
  const grid = document.querySelector("[data-product-grid]");
  const filterRow = document.querySelector("[data-filter-row]");
  const empty = document.querySelector("[data-empty-state]");
  let activeFilter = "all";

  function countsByFamily() {
    const map = { all: experiments.length };
    families.forEach((f) => {
      map[f.slug] = experiments.filter((e) => e.familySlug === f.slug).length;
    });
    return map;
  }

  function renderFilters() {
    if (!filterRow) return;
    const counts = countsByFamily();
    const items = [
      { slug: "all", name: "All", count: counts.all },
      ...families.map((f) => ({
        slug: f.slug,
        name: f.name,
        count: counts[f.slug] || 0,
      })),
    ];
    filterRow.innerHTML = items
      .map(
        (f) => `
      <button type="button" class="filter-btn${f.slug === activeFilter ? " active" : ""}" data-filter="${f.slug}">
        ${f.name}<span class="count">${f.count}</span>
      </button>`
      )
      .join("");

    filterRow.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.getAttribute("data-filter");
        renderFilters();
        renderCards();
      });
    });
  }

  function filtered() {
    if (activeFilter === "all") return experiments;
    return experiments.filter((e) => e.familySlug === activeFilter);
  }

  function renderCards(limit) {
    if (!grid) return;
    let list = filtered();
    if (typeof limit === "number") list = list.slice(0, limit);
    const homeLimit = grid.hasAttribute("data-limit")
      ? parseInt(grid.getAttribute("data-limit"), 10)
      : null;
    if (homeLimit && activeFilter === "all") {
      list = filtered().slice(0, homeLimit);
    } else if (homeLimit && activeFilter !== "all") {
      list = filtered();
    }

    grid.innerHTML = list.map(cardHTML).join("");
    if (empty) {
      empty.classList.toggle("show", list.length === 0);
    }
  }

  if (grid) {
    renderFilters();
    renderCards();
  }

  /* Family section on home */
  const familyGrid = document.querySelector("[data-family-grid]");
  if (familyGrid) {
    familyGrid.innerHTML = families
      .map((f) => {
        const members = experiments.filter((e) => e.familySlug === f.slug);
        const tags = members
          .slice(0, 6)
          .map((e) => `<a href="${e.url}" target="_blank" rel="noopener">${e.name}</a>`)
          .join("");
        return `
          <div class="family-card">
            <div class="family-meta">${members.length} experiment${members.length === 1 ? "" : "s"}</div>
            <h3>${f.name}</h3>
            <p>${f.description}</p>
            <div class="family-tags">${tags}</div>
          </div>`;
      })
      .join("");
  }

  /* Decision table */
  const tableBody = document.querySelector("[data-decision-body]");
  if (tableBody) {
    const rows = [
      ["start a shared types & utils layer", "norvia-core"],
      ["benchmark eval signals under load", "signalbench"],
      ["trace agent runs with structured spans", "tracekit"],
      ["version and review prompts in CI", "promptforge"],
      ["sandbox untrusted tool code", "sandbox-lite"],
      ["store experiment memory locally", "memshard"],
      ["sketch agent graphs before coding", "agent-sketch"],
      ["export AI workload metrics", "openmetrics-ai"],
      ["pin fixtures for flaky LLM tests", "fixturelab"],
      ["mock MCP servers locally", "wiremock-mcp"],
      ["inspect and replay pipeline failures", "flowglass"],
      ["map token spend across a run", "costmap"],
    ];

    tableBody.innerHTML = rows
      .map(([need, name]) => {
        const exp = experiments.find((e) => e.name === name);
        if (!exp) return "";
        return `
          <tr>
            <td>${need}</td>
            <td><a class="mono" href="${exp.url}" target="_blank" rel="noopener">${exp.name}</a></td>
            <td>${exp.family}</td>
            <td>${exp.stack}</td>
          </tr>`;
      })
      .join("");
  }

  /* Stats */
  document.querySelectorAll("[data-stat]").forEach((el) => {
    const key = el.getAttribute("data-stat");
    if (key === "experiments") el.textContent = String(experiments.length);
    if (key === "families") el.textContent = String(families.length);
  });
})();
