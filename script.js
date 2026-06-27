function initHeroCanvas() {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Blue network dots (upper 65% of canvas)
  const NET_COUNT = 55;
  const netDots = Array.from({ length: NET_COUNT }, () => ({
    x: Math.random() * 1.1 - 0.05,  // 0..1 fraction of W
    y: Math.random() * 0.68,          // upper portion
    r: Math.random() * 1.4 + 0.5,
    a: Math.random() * 0.55 + 0.12,
  }));
  const NET_DIST = 0.16; // fraction of W

  // Orange sparks radiating from lightbulb center
  // In RTL layout the visual is on the LEFT (~25% from left)
  const SPARK_COUNT = 32;
  function makeSpark() {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.0004 + 0.0001;
    return {
      angle,
      dist: Math.random() * 0.08,
      speed,
      r: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.6 + 0.3,
      fade: Math.random() * 0.004 + 0.002,
      color: Math.random() > 0.5 ? '#FFB347' : '#FF7A1A',
    };
  }
  const sparks = Array.from({ length: SPARK_COUNT }, makeSpark);

  let t = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // ── Blue network ──
    const ndx = netDots.map(d => d.x * W);
    const ndy = netDots.map(d => d.y * H);
    for (let i = 0; i < NET_COUNT; i++) {
      for (let j = i + 1; j < NET_COUNT; j++) {
        const dx = ndx[i] - ndx[j], dy = ndy[i] - ndy[j];
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxD = NET_DIST * W;
        if (dist < maxD) {
          ctx.beginPath();
          ctx.moveTo(ndx[i], ndy[i]);
          ctx.lineTo(ndx[j], ndy[j]);
          ctx.strokeStyle = `rgba(47,107,255,${0.18 * (1 - dist / maxD)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    for (let i = 0; i < NET_COUNT; i++) {
      ctx.beginPath();
      ctx.arc(ndx[i], ndy[i], netDots[i].r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(47,107,255,${netDots[i].a})`;
      ctx.fill();
    }

    // ── Orange sparks from lightbulb ──
    const ox = W * 0.25; // lightbulb center x (RTL: visual on left)
    const oy = H * 0.48;
    for (const sp of sparks) {
      const sx = ox + Math.cos(sp.angle) * sp.dist * W;
      const sy = oy + Math.sin(sp.angle) * sp.dist * H * 0.7;
      ctx.beginPath();
      ctx.arc(sx, sy, sp.r, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.globalAlpha = sp.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (!REDUCED) {
        sp.dist  += sp.speed;
        sp.alpha -= sp.fade;
        if (sp.alpha <= 0 || sp.dist > 0.38) {
          Object.assign(sp, makeSpark());
        }
      }
    }

    // ── Orange wave aurora at bottom ──
    const waveY = H * 0.88;
    const amp   = H * 0.025;
    const freq  = (2 * Math.PI) / (W * 0.55);
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 3) {
      const y = waveY + Math.sin(x * freq + t * 0.8) * amp
                      + Math.sin(x * freq * 1.7 + t * 0.5) * amp * 0.4;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    const wg = ctx.createLinearGradient(0, waveY - amp, 0, H);
    wg.addColorStop(0,   'rgba(255,122,26,0.18)');
    wg.addColorStop(0.4, 'rgba(255,122,26,0.08)');
    wg.addColorStop(1,   'rgba(255,122,26,0)');
    ctx.fillStyle = wg;
    ctx.fill();

    // Blue star glow — upper right
    const starX = W * 0.88, starY = H * 0.14;
    const sg = ctx.createRadialGradient(starX, starY, 0, starX, starY, 40);
    sg.addColorStop(0,   'rgba(47,107,255,0.55)');
    sg.addColorStop(0.3, 'rgba(47,107,255,0.18)');
    sg.addColorStop(1,   'rgba(47,107,255,0)');
    ctx.beginPath();
    ctx.arc(starX, starY, 40, 0, Math.PI * 2);
    ctx.fillStyle = sg;
    ctx.fill();
    // bright center dot
    ctx.beginPath();
    ctx.arc(starX, starY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(180,210,255,0.9)';
    ctx.fill();

    if (!REDUCED) {
      t += 0.012;
      raf = requestAnimationFrame(draw);
    }
  }

  if (REDUCED) {
    draw();
  } else {
    raf = requestAnimationFrame(draw);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();

  // Nav scroll-spy
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const spySections = Array.from(navLinks)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);
  const scrollSpy = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const hit = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (hit) hit.classList.add('active');
        }
      });
    },
    { threshold: 0.35 }
  );
  spySections.forEach(s => scrollSpy.observe(s));

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.fade-in, .fade-up').forEach(el => observer.observe(el));

  // ── Contact form → Google Sheets ──
  const SHEET_URL = 'PASTE_APPS_SCRIPT_URL_HERE';

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name    = form.name.value.trim();
      const phone   = (form.phone  ?.value || '').trim();
      const email   = form.email.value.trim();
      const field   = (form.field  ?.value || '').trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) return;

      const btn = form.querySelector('.cta-submit');
      btn.disabled    = true;
      btn.textContent = 'שולח...';

      try {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({ name, phone, email, field, message }),
          headers: { 'Content-Type': 'application/json' }
        });
        btn.textContent = '✓ נשלח בהצלחה!';
        form.reset();
      } catch {
        btn.disabled    = false;
        btn.textContent = 'שלחו הודעה';
      }
    });
  }
});
