(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Mobile menu ---------- */

  var nav = document.querySelector("[data-nav]");
  var menu = document.querySelector("[data-menu]");
  if (nav && menu) {
    menu.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        menu.focus();
      }
    });
  }

  /* ---------- Particle field: the gate ---------- */

  // Silver particles are agent actions. In "gate" mode they stream into a policy gate and some get a
  // verdict: allow passes with a green flash, ask holds amber at the gate, deny turns red and scatters.
  // "converge" is a calmer gate for the closing band; "dust" is a slow drift for inner page heads.
  var VERDICT = { allow: "63,185,80", ask: "227,179,65", deny: "248,81,73" };
  var EVENTS = [
    ["write", "src/lib.rs", "inside workspace", "allow"],
    ["run", "cargo test --workspace", "sandboxed", "allow"],
    ["fetch", "api.example.com", "host not on allowlist", "ask"],
    ["read", "src/config.rs", "inside workspace", "allow"],
    ["connect", "/var/run/docker.sock", "host socket", "deny"],
    ["edit", "api/server.rs", "inside workspace", "allow"],
    ["git", "reset --hard HEAD~3", "destructive git", "ask"],
    ["run", "rg \"retry\" src/", "sandboxed", "allow"],
    ["read", "~/.ssh/id_ed25519", "outside workspace", "deny"],
    ["write", "../billing/.env", "outside workspace", "ask"],
    ["run", "cargo fmt --all", "sandboxed", "allow"],
    ["fetch", "registry.npmjs.org", "host not on allowlist", "ask"]
  ];
  var labelFont = "600 11px 'Martian Mono', ui-monospace, monospace";

  function gauss() {
    var u = 1 - Math.random(), v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function Field(canvas, mode) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var host = canvas.parentElement;
    var log = mode === "gate" ? host.querySelector("[data-log]") : null;
    var logBox = mode === "gate" ? host.querySelector(".gate-log") : null;
    var copyEl = host.querySelector("[data-mask]");
    var w = 0, h = 0, dpr = 1, gx = 0, cy = 0, sig = 0, pinch = 0.12, mask = null, narrow = false;
    var parts = [], shards = [], flashes = [], time = 0, nextEvent = 900, evIndex = mode === "gate" ? 5 : 0, running = false, last = 0;

    function size() {
      var r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      narrow = w < 900;
      mask = null;
      var c = copyEl ? copyEl.getBoundingClientRect() : null;
      if (c) mask = { x0: c.left - r.left - 20, y0: c.top - r.top - 20, x1: c.right - r.left + 20, y1: c.bottom - r.top + 20 };
      if (mode === "gate") {
        if (narrow && c) {
          // On a phone the stream would sit under the headline and have to be dimmed away, so the gate
          // gets its own stage between the actions and the decision log.
          var lb = logBox ? logBox.getBoundingClientRect().top - r.top : h;
          var top = c.bottom - r.top + 10;
          cy = (top + lb) / 2; sig = Math.max(24, (lb - top) * 0.2); gx = w * 0.62;
        } else { gx = w * 0.73; cy = h * 0.36; sig = h * 0.15; }
        pinch = 0.1;
      } else if (mode === "converge") {
        if (narrow && c) { var t2 = c.bottom - r.top + 10; cy = (t2 + h) / 2; sig = Math.max(28, (h - t2) * 0.22); gx = w * 0.72; }
        else { gx = w * 0.8; cy = h * 0.5; sig = h * 0.24; }
        pinch = 0.02;
      } else { gx = -1; cy = h * 0.55; sig = h * 0.34; }
      var target = mode === "dust" ? Math.min(700, (w * h) / 900) : Math.min(2800, (w * h) / (mode === "gate" ? 380 : 600));
      parts.length = 0;
      for (var i = 0; i < target; i++) parts.push(spawn({}, true));
    }

    function spawn(p, initial) {
      p.x = initial ? Math.random() * w : -Math.random() * 80;
      p.y0 = Math.max(4, Math.min(h - 4, cy + gauss() * sig * (mode === "gate" ? 1.6 : 1)));
      p.y = p.y0;
      p.near = Math.random() < 0.14;
      var base = mode === "dust" ? 0.05 + Math.random() * 0.12 : 0.4 + Math.random() * 0.9;
      p.v = p.near ? base * 1.7 : base;
      p.a = p.near ? 0.5 + Math.random() * 0.45 : Math.pow(Math.random(), 1.6) * 0.5 + 0.05;
      p.ph = Math.random() * 6.28;
      p.lane = cy + Math.round(((p.y0 - cy) * 0.55) / 6) * 6;
      p.verdict = null; p.hold = 0; p.glow = 0; p.flash = 0; p.label = 0; p.ev = null;
      return p;
    }

    function emit(ev) {
      if (!log) return;
      var li = document.createElement("li");
      li.className = "v-" + ev[3] + " fresh";
      [["op", ev[0]], ["tgt", ev[1]], ["why", ev[2]]].forEach(function (f) {
        var sp = document.createElement("span"); sp.className = f[0]; sp.textContent = f[1]; li.appendChild(sp);
      });
      var tag = document.createElement("span"); tag.className = "tag " + ev[3]; tag.textContent = ev[3].toUpperCase();
      li.appendChild(tag);
      log.insertBefore(li, log.firstChild);
      while (log.children.length > 6) log.removeChild(log.lastChild);
      requestAnimationFrame(function () { li.classList.remove("fresh"); });
    }

    function pickForVerdict() {
      for (var k = 0; k < 60; k++) {
        var p = parts[(Math.random() * parts.length) | 0];
        if (!p.verdict && p.x < gx - 80 && p.x > gx - 320 && Math.abs(p.y0 - cy) < sig) return p;
      }
      return null;
    }

    // y for a particle at x: a funnel that pinches into the gate, then fans out into lanes
    function track(q) {
      if (mode === "dust") return q.y0 + Math.sin(q.x * 0.008 + q.ph + time * 0.0003) * 12;
      if (q.x < gx) {
        var f = Math.max(0, Math.min(1, (gx - q.x) / (gx * 0.85)));
        var spread = pinch + (1 - pinch) * Math.pow(f, 1.4);
        var turb = (Math.sin(q.x * 0.008 + q.ph + time * 0.0008) * 16 + Math.sin(q.x * 0.025 + q.ph * 2) * 5) * f;
        return cy + (q.y0 - cy) * spread + turb;
      }
      var g = Math.min(1, (q.x - gx) / 160);
      return cy + (q.lane - cy) * (pinch + (1 - pinch) * g * g);
    }

    function step(dt) {
      time += dt;
      var k = dt / 16.67;
      if (mode === "gate") {
        nextEvent -= dt;
        if (nextEvent <= 0) {
          var p = pickForVerdict();
          if (p) { p.ev = EVENTS[evIndex % EVENTS.length]; p.verdict = p.ev[3]; p.v = Math.max(p.v, 1); evIndex++; }
          nextEvent = 1100 + Math.random() * 700;
        }
      }
      for (var i = 0; i < parts.length; i++) {
        var q = parts[i], px = q.x;
        if (q.hold > 0) {
          q.hold -= dt;
          if (q.hold <= 0) { q.v = 1; q.label = 1000; flashes.push({ c: "ask", y: q.y, life: 500 }); }
        } else {
          q.x += q.v * k;
        }
        q.y = track(q);
        if (gx > 0 && px < gx && q.x >= gx) {
          q.flash = 1;
          if (mode === "converge") { spawn(q, false); continue; }
          if (q.verdict) {
            if (q.ev) emit(q.ev);
            if (q.verdict === "ask") { q.x = gx; q.hold = 1700; q.v = 0; q.glow = 1; }
            else if (q.verdict === "deny") {
              flashes.push({ c: "deny", y: q.y, life: 700 });
              for (var s = 0; s < 22; s++) {
                var ang = Math.PI * (0.5 + Math.random());
                var sp = 1 + Math.random() * 3.2;
                shards.push({ x: gx - 2, y: q.y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 1100, y0: q.y });
              }
              spawn(q, false); continue;
            } else { q.glow = 1; q.label = 1000; flashes.push({ c: "allow", y: q.y, life: 500 }); }
          }
        }
        if (q.flash > 0) q.flash = Math.max(0, q.flash - dt / 420);
        if (q.label > 0) q.label -= dt;
        if (q.verdict && q.x > gx + 4 && q.hold <= 0) {
          q.glow = Math.max(0, q.glow - dt / 1600);
          if (q.glow === 0) { q.verdict = null; q.ev = null; }
        }
        if (q.x > w + 10) spawn(q, false);
      }
      for (var j = shards.length - 1; j >= 0; j--) {
        var sh = shards[j];
        sh.x += sh.vx * k; sh.y += sh.vy * k; sh.vx *= 0.965; sh.vy *= 0.965; sh.life -= dt;
        if (sh.life <= 0) shards.splice(j, 1);
      }
      for (var f2 = flashes.length - 1; f2 >= 0; f2--) { flashes[f2].life -= dt; if (flashes[f2].life <= 0) flashes.splice(f2, 1); }
    }

    function dim(x, y) {
      var d = 1;
      if (mask && x > mask.x0 && x < mask.x1 && y > mask.y0 && y < mask.y1) d = 0.07;
      if (mode === "dust") d *= 0.25 + 1.1 * (x / w);
      return d;
    }

    function drawGate() {
      var span = mode === "converge" ? sig * 2.4 : sig * 2.2;
      var top = Math.max(0, cy - span), bot = Math.min(h, cy + span);
      // soft, vertically fading glow
      ctx.save();
      ctx.translate(gx, cy);
      ctx.scale(1, (bot - top) / 2 / 90);
      var halo = ctx.createRadialGradient(0, 0, 0, 0, 0, 90);
      halo.addColorStop(0, "rgba(237,237,235,0.22)");
      halo.addColorStop(0.35, "rgba(237,237,235,0.08)");
      halo.addColorStop(1, "rgba(237,237,235,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(-90, -90, 180, 180);
      ctx.restore();
      var g = ctx.createLinearGradient(0, top, 0, bot);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.3, "rgba(255,255,255,0.6)");
      g.addColorStop(0.5, "rgba(255,255,255,1)");
      g.addColorStop(0.7, "rgba(255,255,255,0.6)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(gx - 0.75, top, 1.5, bot - top);
      ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.globalAlpha = 0.45; ctx.beginPath();
      for (var ty = cy - Math.floor((cy - top) / 10) * 10; ty < bot; ty += 10) { ctx.moveTo(gx - 5, ty); ctx.lineTo(gx + 5, ty); }
      ctx.stroke(); ctx.globalAlpha = 1;
      for (var i = 0; i < flashes.length; i++) {
        var fl = flashes[i], a = fl.life / (fl.c === "deny" ? 700 : 500);
        var fg = ctx.createLinearGradient(0, fl.y - 46, 0, fl.y + 46);
        fg.addColorStop(0, "rgba(" + VERDICT[fl.c] + ",0)"); fg.addColorStop(0.5, "rgba(" + VERDICT[fl.c] + "," + a + ")"); fg.addColorStop(1, "rgba(" + VERDICT[fl.c] + ",0)");
        ctx.fillStyle = fg; ctx.fillRect(gx - 1.5, fl.y - 46, 3, 92);
      }
    }

    // Scroll depth: far dust lags most, the gate sits mid-depth, near particles keep pace with the page.
    var DEPTH = { far: 0.62, mid: 0.36, near: 0.04 };
    function scrollDepth() {
      if (reduceMotion) return 0;
      var r = canvas.getBoundingClientRect();
      var damp = narrow && mode === "gate" ? 0.3 : 1;
      if (mode === "converge") return -(r.top + r.height / 2 - window.innerHeight / 2) * damp;
      return Math.max(0, -r.top) * damp;
    }

    function draw() {
      var t = scrollDepth();
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      if (gx > 0) { ctx.save(); ctx.translate(0, t * DEPTH.mid); drawGate(); ctx.restore(); }
      var buckets = [[], [], [], []];
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (p.verdict) continue;
        var a = (p.a + p.flash * 0.6) * dim(p.x, p.y + t * (p.near ? DEPTH.near : DEPTH.far));
        buckets[p.near && a > 0.3 ? 3 : a > 0.4 ? 2 : a > 0.18 ? 1 : 0].push(p);
      }
      var alphas = [0.12, 0.26, 0.48, 0.7], widths = [1, 1, 1, 1.5];
      for (var b = 0; b < 4; b++) {
        ctx.save(); ctx.translate(0, t * (b === 3 ? DEPTH.near : DEPTH.far));
        ctx.strokeStyle = "rgba(226,226,222," + alphas[b] + ")";
        ctx.lineWidth = widths[b]; ctx.beginPath();
        for (var n = 0; n < buckets[b].length; n++) {
          var q = buckets[b][n], len = mode === "dust" ? 1.6 : q.x < gx ? q.v * 3 + 0.8 : q.v * 10 + 2;
          ctx.moveTo(q.x - len, q.y); ctx.lineTo(q.x, q.y);
        }
        ctx.stroke();
        ctx.restore();
      }
      ctx.save(); ctx.translate(0, t * DEPTH.mid);
      ctx.font = labelFont; ctx.textBaseline = "middle";
      var labelled = null;
      for (var lm = 0; lm < parts.length; lm++) {
        var lp = parts[lm];
        if (lp.verdict && (lp.hold > 0 || lp.label > 0) && (!labelled || lp.hold > 0 || (labelled.hold <= 0 && lp.label > labelled.label))) labelled = lp;
      }
      for (var m = 0; m < parts.length; m++) {
        var c = parts[m];
        if (!c.verdict) continue;
        var rgb = VERDICT[c.verdict], ga = c.x < gx ? 0.7 : 0.3 + c.glow * 0.7;
        var tail = c.x < gx ? 22 : 22 + c.glow * 60;
        var tg = ctx.createLinearGradient(c.x - tail, 0, c.x, 0);
        tg.addColorStop(0, "rgba(" + rgb + ",0)"); tg.addColorStop(1, "rgba(" + rgb + "," + ga + ")");
        ctx.strokeStyle = tg; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(c.x - tail, c.y); ctx.lineTo(c.x, c.y); ctx.stroke();
        ctx.fillStyle = "rgba(" + rgb + "," + Math.min(1, ga + 0.2) + ")";
        ctx.beginPath(); ctx.arc(c.x, c.y, 3.6, 0, 6.283); ctx.fill();
        if (c.hold > 0) {
          for (var rr = 0; rr < 2; rr++) {
            var ph = ((1700 - c.hold) / 850 + rr * 0.5) % 1;
            ctx.strokeStyle = "rgba(" + rgb + "," + 0.8 * (1 - ph) + ")"; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(c.x, c.y, 6 + ph * 26, 0, 6.283); ctx.stroke();
          }
        }
        if (c === labelled && c.x <= gx + 200) {
          ctx.fillStyle = "rgba(" + rgb + "," + (c.hold > 0 ? 1 : Math.max(0, c.label / 1000)) + ")";
          ctx.fillText(c.verdict.toUpperCase(), c.x + 14, c.y - 18);
        }
      }
      var lead = null;
      for (var z = 0; z < shards.length; z++) {
        var s = shards[z];
        if (!lead || s.life > lead.life) lead = s;
        ctx.fillStyle = "rgba(" + VERDICT.deny + "," + Math.max(0, s.life / 1100) + ")";
        ctx.fillRect(s.x - 1.2, s.y - 1.2, 2.4, 2.4);
      }
      if (lead && lead.life > 500) {
        ctx.fillStyle = "rgba(" + VERDICT.deny + "," + Math.min(1, (lead.life - 500) / 400) + ")";
        ctx.fillText("DENY", gx + 14, lead.y0 + 20);
      }
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
    }

    function frame(now) {
      if (!running) return;
      var dt = Math.min(48, now - (last || now));
      last = now;
      step(dt); draw();
      requestAnimationFrame(frame);
    }
    function start() { if (running || reduceMotion) return; running = true; last = 0; requestAnimationFrame(frame); }
    function stop() { running = false; }
    function still() {
      for (var s = 0; s < 420; s++) step(16.67);
      draw();
    }

    size();
    if (reduceMotion) {
      still();
    } else if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
      }).observe(canvas);
      document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    } else {
      start();
    }
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { size(); if (reduceMotion) still(); }, 150);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (copyEl) { size(); if (reduceMotion) still(); } });
  }

  /* ---------- Scroll parallax ---------- */

  // data-parallax="0.07" shifts an element against its row as it crosses the viewport; "hero" lets the
  // headline drift back and dim as the hero leaves; "rise" lifts the footer wordmark into place at the end.
  var plx = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  if (plx.length && !reduceMotion) {
    var pTick = false;
    var pUpdate = function () {
      pTick = false;
      var vh = window.innerHeight;
      plx.forEach(function (el) {
        var mode = el.getAttribute("data-parallax");
        var ref = el.parentElement.getBoundingClientRect();
        if (ref.bottom < -200 || ref.top > vh + 200) return;
        var y = 0, o = "";
        if (mode === "hero") {
          // On phones the copy sits directly above the gate stage and log, so it stays put.
          if (window.innerWidth < 900) { el.style.transform = ""; el.style.opacity = ""; return; }
          var s = Math.max(0, -ref.top);
          y = s * 0.45;
          o = String(Math.max(0, 1 - s / (ref.height * 0.75)));
        } else if (mode === "rise") {
          y = Math.max(0, ref.bottom - vh) * 0.45;
        } else {
          y = -(ref.top + ref.height / 2 - vh / 2) * parseFloat(mode);
        }
        el.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
        if (o) el.style.opacity = o;
      });
    };
    var pQueue = function () { if (!pTick) { pTick = true; requestAnimationFrame(pUpdate); } };
    window.addEventListener("scroll", pQueue, { passive: true });
    window.addEventListener("resize", pQueue);
    pUpdate();
  }

  document.querySelectorAll("canvas[data-field]").forEach(function (c) {
    Field(c, c.getAttribute("data-field"));
  });

  /* ---------- Copy install command ---------- */

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var code = btn.parentElement.querySelector("[data-install]");
      var label = btn.querySelector("span");
      if (!code || !navigator.clipboard) return;
      navigator.clipboard.writeText(code.textContent).then(
        function () {
          if (label) label.textContent = "Copied";
          setTimeout(function () {
            if (label) label.textContent = "Copy";
          }, 1800);
        },
        function () {
          if (label) label.textContent = "Select and copy";
        }
      );
    });
  });

  /* ---------- Table of contents ---------- */

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(function (a) {
            a.removeAttribute("aria-current");
          });
          var a = byId[entry.target.id];
          if (a) a.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---------- Contact form (Web3Forms) ---------- */

  var form = document.getElementById("contact-form");
  if (!form) return;

  var cfg = window.NORVIA_CONTACT || {};
  var accessKey = String(cfg.accessKey || "").trim();
  var subjectPrefix = cfg.subjectPrefix || "Norvia Labs contact";
  var ok = form.querySelector("[data-form-ok]");
  var bad = form.querySelector("[data-form-bad]");
  var submit = form.querySelector('[type="submit"]');
  var submitLabel = submit ? submit.textContent : "";

  function setStatus(el, text) {
    [ok, bad].forEach(function (s) {
      if (s) s.classList.remove("show");
    });
    if (!el) return;
    el.querySelector("[data-msg]").textContent = text;
    el.classList.add("show");
  }

  function fieldError(name, message) {
    var input = form.elements.namedItem(name);
    var err = form.querySelector('[data-err="' + name + '"]');
    if (!input || !err) return;
    if (message) {
      input.setAttribute("aria-invalid", "true");
      err.textContent = message;
      err.classList.add("show");
    } else {
      input.removeAttribute("aria-invalid");
      err.textContent = "";
      err.classList.remove("show");
    }
  }

  function value(name) {
    var el = form.elements.namedItem(name);
    return String((el && el.value) || "").trim();
  }

  function setLoading(loading) {
    if (!submit) return;
    submit.disabled = loading;
    submit.setAttribute("aria-busy", loading ? "true" : "false");
    submit.textContent = loading ? "Sending…" : submitLabel;
  }

  ["name", "email", "message"].forEach(function (name) {
    var el = form.elements.namedItem(name);
    if (el)
      el.addEventListener("input", function () {
        fieldError(name, "");
      });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setStatus(null);

    var name = value("name");
    var email = value("email");
    var company = value("company");
    var message = value("message");
    var firstBad = null;

    if (!name) {
      fieldError("name", "Add your name.");
      firstBad = firstBad || "name";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldError("email", "Enter an email address we can reply to.");
      firstBad = firstBad || "email";
    }
    if (!message) {
      fieldError("message", "Tell us a little about what you'd like to discuss.");
      firstBad = firstBad || "message";
    }
    if (firstBad) {
      form.elements.namedItem(firstBad).focus();
      return;
    }

    var bot = form.elements.namedItem("botcheck");
    if (bot && bot.checked) {
      setStatus(ok, "Thanks, your message is on its way.");
      form.reset();
      return;
    }

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      setStatus(bad, "The form isn't connected right now. Reach the founder on LinkedIn instead.");
      return;
    }

    setLoading(true);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: subjectPrefix + ": " + name + (company ? " (" + company + ")" : ""),
        from_name: cfg.fromName || "Norvia Labs website",
        name: name,
        email: email,
        company: company || undefined,
        message: message,
        replyto: email,
      }),
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            if (res.ok && data.success) {
              setStatus(ok, "Thanks, your message is on its way. You'll get a reply by email.");
              form.reset();
            } else {
              setStatus(
                bad,
                (data.message ? data.message + ". " : "The message didn't send. ") +
                  "Try again in a moment, or reach the founder on LinkedIn."
              );
            }
          });
      })
      .catch(function () {
        setStatus(bad, "No connection to the form service. Check your network and try again, or reach the founder on LinkedIn.");
      })
      .then(function () {
        setLoading(false);
      });
  });
})();
