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

  function statusLabel(status) {
    return status === "active" ? "Active" : "Queue";
  }

  function hasLiveLink(exp) {
    return Boolean(exp.url);
  }

  function nameHTML(exp) {
    if (exp.status === "queue" || !hasLiveLink(exp)) {
      return `<span class="product-name product-name-plain">${exp.name}</span>`;
    }
    return `<a class="product-name" href="${exp.url}" target="_blank" rel="noopener">${exp.name}</a>`;
  }

  function linksHTML(exp) {
    if (exp.status === "queue") {
      return `<span class="product-links-muted">In queue</span>`;
    }
    const parts = [];
    if (exp.url) {
      parts.push(
        `<a class="visit" href="${exp.url}" target="_blank" rel="noopener">Visit →</a>`
      );
    }
    if (exp.code) {
      parts.push(
        `<a class="code" href="${exp.code}" target="_blank" rel="noopener">Code</a>`
      );
    }
    if (!parts.length) {
      return `<span class="product-links-muted">Coming soon</span>`;
    }
    return `<div class="product-links">${parts.join("")}</div>`;
  }

  function cardHTML(exp) {
    const status = exp.status === "active" ? "active" : "queue";
    const disabled = status === "queue";
    return `
      <article class="product-card${disabled ? " is-disabled" : ""}" data-group="${exp.familySlug}" data-status="${status}"${disabled ? ' aria-disabled="true"' : ""}>
        <div class="product-card-top">
          <div class="product-name-row">
            <span class="product-icon">${arrowSvg}</span>
            ${nameHTML(exp)}
          </div>
          <div class="product-badges">
            <span class="status-badge status-${status}">${statusLabel(status)}</span>
            <span class="stack-badge" data-stack="${exp.stack}">${exp.stack}</span>
          </div>
        </div>
        <p class="product-desc">${exp.description}</p>
        <div class="product-footer">
          <span class="product-family">${exp.family}</span>
          ${linksHTML(exp)}
        </div>
      </article>`;
  }

  /** Active work first, then queue; stable by name within a status. */
  function sortedExperiments(list) {
    const rank = (s) => (s === "active" ? 0 : 1);
    return [...list].sort((a, b) => {
      const d = rank(a.status) - rank(b.status);
      if (d !== 0) return d;
      return a.name.localeCompare(b.name);
    });
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
    const base =
      activeFilter === "all"
        ? experiments
        : experiments.filter((e) => e.familySlug === activeFilter);
    return sortedExperiments(base);
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
          .map((e) => {
            if (e.status === "queue" || !e.url) {
              return `<span class="family-tag-plain${e.status === "queue" ? " is-queue" : ""}">${e.name}</span>`;
            }
            return `<a href="${e.url}" target="_blank" rel="noopener">${e.name}</a>`;
          })
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
      ["run an agentic tool loop / harness", "forge"],
      ["sandbox untrusted tool code", "sandbox-lite"],
      ["mock MCP servers locally", "wiremock-mcp"],
      ["pin fixtures for flaky LLM tests", "fixturelab"],
      ["export AI metrics and map token spend", "openmetrics-ai"],
      ["version and review prompts in CI", "promptforge"],
    ];

    tableBody.innerHTML = rows
      .map(([need, name]) => {
        const exp = experiments.find((e) => e.name === name);
        if (!exp) return "";
        const queued = exp.status === "queue";
        let reach;
        if (queued) {
          reach = `<span class="mono decision-muted">${exp.name}</span> <span class="decision-status">queue</span>`;
        } else if (exp.url) {
          reach = `<a class="mono" href="${exp.url}" target="_blank" rel="noopener">${exp.name}</a>`;
        } else {
          reach = `<span class="mono">${exp.name}</span>`;
        }
        return `
          <tr${queued ? ' class="decision-row-queue"' : ""}>
            <td>${need}</td>
            <td>${reach}</td>
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
    if (key === "active") {
      el.textContent = String(experiments.filter((e) => e.status === "active").length);
    }
  });

  /* Contact form → Web3Forms */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const success = contactForm.querySelector("[data-form-success]");
    const error = contactForm.querySelector("[data-form-error]");
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const cfg = window.NORVIA_CONTACT || {};
    const accessKey = (cfg.accessKey || "").trim();
    const subjectPrefix = cfg.subjectPrefix || "Norvia Labs contact";
    const githubUrl = "https://github.com/norvialabs";

    function show(el, text) {
      if (!el) return;
      if (text) el.innerHTML = text;
      el.classList.add("show");
    }

    function hideStatus() {
      if (success) success.classList.remove("show");
      if (error) error.classList.remove("show");
    }

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      submitBtn.setAttribute("aria-busy", loading ? "true" : "false");
      if (!submitBtn.dataset.label) {
        submitBtn.dataset.label = submitBtn.textContent;
      }
      submitBtn.textContent = loading ? "Sending…" : submitBtn.dataset.label;
    }

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideStatus();

      const nameEl = contactForm.elements.namedItem("name");
      const emailEl = contactForm.elements.namedItem("email");
      const companyEl = contactForm.elements.namedItem("company");
      const messageEl = contactForm.elements.namedItem("message");
      const botEl = contactForm.elements.namedItem("botcheck");

      const nameTrim = String((nameEl && nameEl.value) || "").trim();
      const emailTrim = String((emailEl && emailEl.value) || "").trim();
      const companyTrim = String((companyEl && companyEl.value) || "").trim();
      const messageTrim = String((messageEl && messageEl.value) || "").trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim);

      if (!nameTrim || !emailOk || !messageTrim) {
        show(
          error,
          "Please fill in name, a valid email, and a message — then try again."
        );
        return;
      }

      // Honeypot: only treat as bot when the hidden checkbox is actually checked.
      // (Checkbox .value is always "on" even when unchecked — do not use .value here.)
      if (botEl && botEl.checked) {
        show(
          success,
          "Thank you! Your message has been sent. We will get back to you soon."
        );
        contactForm.reset();
        return;
      }

      if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
        show(
          error,
          `Contact form is not configured yet. Please open an issue on
          <a class="text-link" href="${githubUrl}" target="_blank" rel="noopener">GitHub</a>.`
        );
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `${subjectPrefix}: ${nameTrim}`,
            from_name: cfg.fromName || "Norvia Labs website",
            name: nameTrim,
            email: emailTrim,
            company: companyTrim || undefined,
            message: messageTrim,
            replyto: emailTrim,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          show(
            success,
            "Thank you! Your message has been sent. We will get back to you soon."
          );
          contactForm.reset();
        } else {
          const msg =
            data.message ||
            "Sorry, something went wrong. Please try again in a moment.";
          show(
            error,
            `${msg}
            You can also open an issue on
            <a class="text-link" href="${githubUrl}" target="_blank" rel="noopener">GitHub</a>.`
          );
        }
      } catch (_) {
        show(
          error,
          `Network error — please try again, or open an issue on
          <a class="text-link" href="${githubUrl}" target="_blank" rel="noopener">GitHub</a>.`
        );
      } finally {
        setLoading(false);
      }
    });
  }
})();
