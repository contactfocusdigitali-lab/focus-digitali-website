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

// ── i18n ──
const i18n = {
  he: {
    'nav.about': 'אודות', 'nav.projects': 'פרויקטים', 'nav.contact': 'צור קשר', 'nav.cta': 'בוא נדבר',
    'hero.title': 'פתרונות קטנים<br>לבעיות שחוזרות<br><span class="accent">כל יום.</span>',
    'hero.sub': 'בונים מערכות אישיות, בוטים ואוטומציות שמורידות עומס מהמשימות שחוזרות — בלי לטפל בהן ידנית שוב.',
    'hero.btn_primary': 'בואו נדבר', 'hero.btn_text': 'רוצה לראות עוד?',
    'about.eyebrow': 'מי אני',
    'about.title': 'בונה אוטומציות חכמות<br>שמניעות <span class="accent">עסקים קדימה.</span>',
    'about.p1': 'אני מתמחה בבניית מערכות אוטומציה מבוססות AI שמייעלות תהליכים, מחברות בין כלים, חוסכות זמן יקר ומייצרות תוצאות אמיתיות.',
    'about.p2': 'בגישה שלי הבנה עסקית עמוקה, חשיבה יצירתית וטכנולוגיה מתקדמת — כדי ליצור פתרונות <span class="accent">מדויקים, חכמים ומותאמים</span> בדיוק לצרכים שלך.',
    'about.find': 'אפשר למצוא אותי גם כאן:',
    'cases.eyebrow': 'פרויקטים', 'cases.title': 'פתרונות שהפכנו למציאות',
    'cases.sub': 'מערכות חכמות ואוטומציות שעוזרות לעסקים לנהל, לחסוך זמן ולהתרגש.',
    'cases.more': 'לכל הפרויקטים שלנו',
    'case.challenge': 'האתגר', 'case.solution': 'הפתרון', 'case.result': 'התוצאה',
    'case1.client': 'ניר, בעל עסק להדפסות תלת-מימד',
    'case1.title': 'מערכת ניהול הדפסות<br>תלת-מימד',
    'case1.challenge': 'ניר לא הצליח לנהל את המלאי, לעקוב אחרי הפרויקטים וההדפסות. הוא לא ידע אילו חומרים עומדים להגמר ואילו פרויקטים נמצאים בתהליך.',
    'case1.solution': 'בנינו מערכת מרכזית שמאפשרת ניהול מלאי, מעקב סטטוס הדפסות והמלצות חכמות – הכל במקום אחד, בזמן אמת, עם ממשק פשוט וברור.',
    'case1.r1': 'ניהול מלאי מדויק יותר', 'case1.r2': 'מעקב בזמן אמת', 'case1.r3': 'חיסכון בזמן עבודה', 'case1.r4': 'פחות טעויות ואובדן חומרים',
    'case2.client': 'חנות אונליין למוצרי עיצוב',
    'case2.title': 'בוט סטטוס<br>משימות חכם',
    'case2.challenge': 'ללקוחות שלחו עשרות הודעות ביום לשאול על סטטוס הזמנה. זה יצר עומס, בזבז זמן וגרם לחוויית שירות לקויה.',
    'case2.solution': 'בנינו בוט חכם ב-Telegram שמאפשר ללקוחות לברר סטטוס הזמנה, לקבל עדכונים אוטומטיים בזמן ולקבל מענה מיידי.',
    'case2.r1': 'ירידה של 80% בהודעות', 'case2.r2': 'שירות 24/7 ללקוחות', 'case2.r3': 'חיסכון משמעותי בזמן', 'case2.r4': 'שביעות רצון גבוהה יותר',
    'case3.client': 'מאמן כושר אישי',
    'case3.title': 'מאמן כושר<br>אישי דיגיטלי',
    'case3.challenge': 'המאמן השקיע שעות בכל שבוע במענה ללקוחות, שליחת תוכניות ומעקב אחרי אימונים. זה גזל זמן ממה שחשוב באמת.',
    'case3.solution': 'בנינו עוזר AI שמנהל את התקשורת עם המתאמנים, שולח תוכניות מותאמות, עוקב אחרי התקדמות ומזכיר תזכורות באופן אוטומטי.',
    'case3.r1': 'חיסכון שעות עבודה בשבוע', 'case3.r2': 'זמן לאימונים ופיתוח עסק', 'case3.r3': 'מעקב אישי לכל מתאמן', 'case3.r4': 'שביעות רצון גבוהה יותר',
    'cta.eyebrow': 'יצירת קשר', 'cta.title': 'בואו נדבר על הפתרון הבא שלכם',
    'cta.form_title': 'שלחו הודעה', 'cta.form_sub': 'או השאירו פרטים ואחזור אליכם בהקדם',
    'cta.name': 'שם מלא', 'cta.phone': 'טלפון', 'cta.email': 'אימייל',
    'cta.field_placeholder': 'מה תחום הפעילות שלכם?', 'cta.message': 'ספרו לי על האתגר שלכם...',
    'cta.submit': 'שלחו הודעה', 'cta.privacy': 'הפרטים שלכם נשמרים בצורה מאובטחת ולא יועברו לצד שלישי.',
    'cta.desc': 'ספרו לי על העסק שלכם, האתגרים שאתם מתמודדים איתם — ואני אחזור אליכם עם רעיונות ופתרונות מותאמים אישית.',
    'opt.ecomm': 'מסחר ואי-קומרס', 'opt.biz': 'שירותים עסקיים', 'opt.health': 'בריאות וכושר',
    'opt.mfg': 'ייצור ולוגיסטיקה', 'opt.realestate': 'נדל"ן', 'opt.other': 'אחר',
    'step1.title': 'שיחה ראשונית', 'step1.desc': 'נבחן יחד את הצרכים והאתגרים שלכם',
    'step2.title': 'הצעת פתרון', 'step2.desc': 'אציג לכם רעיונות ופתרונות מותאמים לעסק',
    'step3.title': 'תכנון והקמה', 'step3.desc': 'נבנה את המערכת ונחבר את כל מה שצריך',
    'step4.title': 'ליווי ותמיכה', 'step4.desc': 'אני כאן גם אחרי שהכל עובד, לצמיחה יחד',
    'cta.why': 'למה לעבוד איתנו?',
    'feat1.title': 'פתרונות מותאמים אישית', 'feat1.desc': 'בדיוק לצרכים שלכם',
    'feat2.title': 'אוטמציה שעובדת בשבילכם', 'feat2.desc': 'חוסכת זמן, כסף ושקט נפשי',
    'feat3.title': 'טכנולוגיות מתקדמות', 'feat3.desc': 'שילוב הכלים הטובים בשוק',
    'feat4.title': 'ליווי אישי ומקצועי', 'feat4.desc': 'מהרעיון ועד לתוצאה',
    'footer.follow': 'עקבו אחרינו', 'footer.copy': '© 2026 Focus Digitali. כל הזכויות שמורות.',
    'wa.aria': 'שלח הודעה ב-WhatsApp',
  },
  en: {
    'nav.about': 'About', 'nav.projects': 'Projects', 'nav.contact': 'Contact', 'nav.cta': "Let's Talk",
    'hero.title': 'Small Solutions<br>for Problems that<br><span class="accent">Repeat Every Day.</span>',
    'hero.sub': 'We build personal systems, bots, and automations that reduce the load of recurring tasks — no more handling them manually.',
    'hero.btn_primary': "Let's Talk", 'hero.btn_text': 'Want to see more?',
    'about.eyebrow': 'About Me',
    'about.title': 'Building Smart Automations<br>that Drive <span class="accent">Businesses Forward.</span>',
    'about.p1': 'I specialize in building AI-powered automation systems that streamline processes, connect tools, save valuable time, and deliver real results.',
    'about.p2': 'My approach combines deep business understanding, creative thinking, and advanced technology — to create solutions that are <span class="accent">precise, intelligent, and tailored</span> to your exact needs.',
    'about.find': 'You can also find me here:',
    'cases.eyebrow': 'Projects', 'cases.title': 'Solutions We Made Real',
    'cases.sub': 'Smart systems and automations that help businesses manage, save time, and scale.',
    'cases.more': 'See All Our Projects',
    'case.challenge': 'Challenge', 'case.solution': 'Solution', 'case.result': 'Results',
    'case1.client': 'Nir, 3D Printing Business Owner',
    'case1.title': '3D Printing<br>Management System',
    'case1.challenge': "Nir struggled to manage inventory, track projects and print jobs. He didn't know which materials were running low or which projects were in progress.",
    'case1.solution': 'We built a central system for inventory management, print status tracking, and smart recommendations — all in one place, in real time, with a simple and clear interface.',
    'case1.r1': 'More accurate inventory management', 'case1.r2': 'Real-time tracking', 'case1.r3': 'Saved work hours', 'case1.r4': 'Fewer errors and material loss',
    'case2.client': 'Online Design Products Store',
    'case2.title': 'Smart Task<br>Status Bot',
    'case2.challenge': 'Customers were sending dozens of messages a day asking about order status. This created overload, wasted time, and led to a poor service experience.',
    'case2.solution': 'We built a smart Telegram bot that lets customers check order status, receive automatic updates on time, and get immediate responses.',
    'case2.r1': '80% drop in support messages', 'case2.r2': '24/7 customer service', 'case2.r3': 'Significant time savings', 'case2.r4': 'Higher customer satisfaction',
    'case3.client': 'Personal Fitness Trainer',
    'case3.title': 'Digital Personal<br>Fitness Trainer',
    'case3.challenge': 'The trainer spent hours each week responding to clients, sending workout plans, and tracking training sessions. This took time away from what really matters.',
    'case3.solution': 'We built an AI assistant that manages communication with trainees, sends personalized plans, tracks progress, and sends reminders automatically.',
    'case3.r1': 'Saved hours of work per week', 'case3.r2': 'More time for training and business growth', 'case3.r3': 'Personal tracking for each trainee', 'case3.r4': 'Higher satisfaction',
    'cta.eyebrow': 'Contact Us', 'cta.title': "Let's Talk About Your Next Solution",
    'cta.form_title': 'Send a Message', 'cta.form_sub': "Or leave your details and I'll get back to you soon",
    'cta.name': 'Full Name', 'cta.phone': 'Phone', 'cta.email': 'Email',
    'cta.field_placeholder': 'What is your field of activity?', 'cta.message': 'Tell me about your challenge...',
    'cta.submit': 'Send Message', 'cta.privacy': 'Your details are stored securely and will not be shared with third parties.',
    'cta.desc': "Tell me about your business and the challenges you face — and I'll get back to you with personalized ideas and solutions.",
    'opt.ecomm': 'E-commerce & Retail', 'opt.biz': 'Business Services', 'opt.health': 'Health & Fitness',
    'opt.mfg': 'Manufacturing & Logistics', 'opt.realestate': 'Real Estate', 'opt.other': 'Other',
    'step1.title': 'Initial Call', 'step1.desc': "We'll explore your needs and challenges together",
    'step2.title': 'Solution Proposal', 'step2.desc': "I'll present ideas and solutions tailored to your business",
    'step3.title': 'Planning & Setup', 'step3.desc': "We'll build the system and connect everything needed",
    'step4.title': 'Support & Guidance', 'step4.desc': "I'm here even after everything's running, to grow together",
    'cta.why': 'Why Work With Us?',
    'feat1.title': 'Personalized Solutions', 'feat1.desc': 'Exactly for your needs',
    'feat2.title': 'Automation That Works For You', 'feat2.desc': 'Saves time, money, and peace of mind',
    'feat3.title': 'Advanced Technologies', 'feat3.desc': 'The best tools on the market',
    'feat4.title': 'Personal & Professional Guidance', 'feat4.desc': 'From idea to result',
    'footer.follow': 'Follow Us', 'footer.copy': '© 2026 Focus Digitali. All rights reserved.',
    'wa.aria': 'Send a WhatsApp message',
  }
};

function setLang(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir  = lang === 'he' ? 'rtl' : 'ltr';

  const t = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (t[el.dataset.i18n] !== undefined) el.textContent = t[el.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    if (t[el.dataset.i18nHtml] !== undefined) el.innerHTML = t[el.dataset.i18nHtml];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    if (t[el.dataset.i18nPlaceholder] !== undefined) el.placeholder = t[el.dataset.i18nPlaceholder];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    if (t[el.dataset.i18nAria] !== undefined) el.setAttribute('aria-label', t[el.dataset.i18nAria]);
  });

  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  localStorage.setItem('lang', lang);

  if (typeof gtag !== 'undefined') {
    gtag('event', 'language_switch', { language: lang });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Restore saved language preference
  const savedLang = localStorage.getItem('lang');
  if (savedLang && savedLang !== 'he') setLang(savedLang);

  document.getElementById('langToggle')?.addEventListener('click', () => {
    setLang(document.documentElement.lang === 'he' ? 'en' : 'he');
  });

  initHeroCanvas();

  // ── Section analytics ──
  const SECTION_LABELS = {
    hero:  'דף הבית',
    about: 'אודות',
    cases: 'פרויקטים',
    cta:   'צור קשר'
  };
  let currentSection = 'hero';

  function trackSection(id) {
    if (id === currentSection) return;
    currentSection = id;
    if (typeof gtag === 'undefined') return;
    // Virtual page view — shows in GA4 Pages & Screens report
    gtag('config', 'G-93XHMTG2DY', {
      page_path:  `/#${id}`,
      page_title: SECTION_LABELS[id] || id
    });
  }

  // Fire exit event — which section was the user in when they left
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && typeof gtag !== 'undefined') {
      gtag('event', 'section_exit', {
        section_name:  currentSection,
        section_label: SECTION_LABELS[currentSection] || currentSection
      });
    }
  });

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
          trackSection(entry.target.id);
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

  // ── WhatsApp click tracking ──
  const waButtons = [
    { selector: 'a.nav-cta[href*="wa.me"]',  source: 'nav_cta'         },
    { selector: 'a.btn-primary[href*="wa.me"]', source: 'hero_cta'      },
    { selector: 'a.wa-fab[href*="wa.me"]',    source: 'floating_button' }
  ];
  waButtons.forEach(({ selector, source }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.addEventListener('click', () => {
      if (typeof gtag === 'undefined') return;
      gtag('event', 'whatsapp_click', {
        source,
        current_section: currentSection
      });
    });
  });

  // ── Contact form → Google Sheets ──
  // Real URL is loaded from config.js (gitignored).
  // Without config.js the form runs in demo mode.
  const SHEET_URL = window.SHEET_URL || '';

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

      if (!SHEET_URL) {
        // Demo mode — no real submission
        await new Promise(r => setTimeout(r, 800));
        btn.textContent = '✓ נשלח (דמו)';
        form.reset();
        return;
      }

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
