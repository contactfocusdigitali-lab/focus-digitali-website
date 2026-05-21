/* ═══════════════════════════════════════════════════════════════
   Focus Digitali — Animations (GSAP + ScrollTrigger)
   ═══════════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─── Navbar scroll class ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

/* ─── Hero: eyebrow ─── */
gsap.to('.hero-eyebrow', {
  opacity: 1,
  duration: 0.8,
  delay: 0.15,
  ease: 'power2.out'
});

/* ─── Hero: title words stagger ─── */
gsap.to('.hero-title .word', {
  opacity: 1,
  y: 0,
  duration: 0.55,
  stagger: 0.07,
  delay: 0.3,
  ease: 'power3.out'
});

/* ─── Hero: subtext ─── */
gsap.to('.hero-sub', {
  opacity: 1,
  duration: 0.7,
  delay: 1.0,
  ease: 'power2.out'
});

/* ─── Hero: CTAs ─── */
gsap.to('.hero-ctas', {
  opacity: 1,
  duration: 0.7,
  delay: 1.2,
  ease: 'power2.out'
});

/* ─── Hero: product card float in ─── */
gsap.to('#productCard', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.5,
  ease: 'power3.out'
});

/* ─── Subtle card float loop ─── */
gsap.to('#productCard', {
  y: -8,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 2
});

/* ─── Intro text ─── */
gsap.from('.intro-text', {
  scrollTrigger: { trigger: '.intro', start: 'top 78%' },
  opacity: 0,
  y: 28,
  duration: 0.85,
  ease: 'power2.out'
});

/* ─── Section labels + titles ─── */
gsap.utils.toArray('.section-header').forEach(el => {
  const children = el.querySelectorAll('.section-label, .section-title');
  gsap.from(children, {
    scrollTrigger: { trigger: el, start: 'top 80%' },
    opacity: 0,
    y: 22,
    duration: 0.7,
    stagger: 0.14,
    ease: 'power2.out'
  });
});

/* ─── Case cards: reveal on scroll ─── */
gsap.utils.toArray('.case-card').forEach((card, i) => {
  gsap.to(card, {
    scrollTrigger: { trigger: card, start: 'top 84%' },
    opacity: 1,
    y: 0,
    duration: 0.7,
    delay: i * 0.08,
    ease: 'power3.out'
  });
});

/* ─── Progress bars: animate on enter ─── */
document.querySelectorAll('.mini-bar-fill[data-width]').forEach(bar => {
  ScrollTrigger.create({
    trigger: bar,
    start: 'top 88%',
    onEnter: () => {
      bar.style.width = bar.dataset.width + '%';
    }
  });
});

/* ─── Process steps: stagger left→right ─── */
gsap.to('.step', {
  scrollTrigger: { trigger: '.steps', start: 'top 80%' },
  opacity: 1,
  y: 0,
  duration: 0.65,
  stagger: 0.16,
  ease: 'power2.out'
});

/* ─── CTA section ─── */
const ctaTrigger = { trigger: '.cta-section', start: 'top 78%' };

gsap.from('.cta-section .section-label', {
  scrollTrigger: ctaTrigger,
  opacity: 0,
  y: 16,
  duration: 0.6,
  ease: 'power2.out'
});

gsap.to('.cta-title', {
  scrollTrigger: ctaTrigger,
  opacity: 1,
  y: 0,
  duration: 0.75,
  delay: 0.12,
  ease: 'power2.out'
});

gsap.to('.cta-sub', {
  scrollTrigger: ctaTrigger,
  opacity: 1,
  y: 0,
  duration: 0.75,
  delay: 0.26,
  ease: 'power2.out'
});

gsap.to('.cta-section .btn-email', {
  scrollTrigger: ctaTrigger,
  opacity: 1,
  y: 0,
  duration: 0.75,
  delay: 0.42,
  ease: 'power2.out'
});
