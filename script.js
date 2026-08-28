(() => {
  'use strict';

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        }),
        { threshold: 0.08 }
      )
    : null;

  document.querySelectorAll('.reveal').forEach((element) => {
    if (revealObserver) revealObserver.observe(element);
    else element.classList.add('visible');
  });

  const canvas = document.querySelector('#hero-canvas');
  const shell = document.querySelector('.hero-canvas-shell');
  const hero = document.querySelector('#hero');

  if (!canvas || !shell || !hero) return;

  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return;

  const FRAME_COUNT = 45;
  const FRAME_ROOT = 'assets/hero-sequence';
  const frames = new Array(FRAME_COUNT);
  const pending = new Map();
  let requestedFrame = 0;
  let renderedFrame = -1;
  let renderRequest = 0;

  const frameUrl = (index) =>
    `${FRAME_ROOT}/frame-${String(index + 1).padStart(3, '0')}.webp?v=2`;

  const loadFrame = (index, highPriority = false) => {
    if (frames[index]) return Promise.resolve(frames[index]);
    if (pending.has(index)) return pending.get(index);

    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = highPriority ? 'high' : 'low';

    const request = new Promise((resolve, reject) => {
      image.onload = () => {
        frames[index] = image;
        pending.delete(index);
        resolve(image);
      };
      image.onerror = () => {
        pending.delete(index);
        reject(new Error(`Unable to load hero frame ${index + 1}`));
      };
    });

    pending.set(index, request);
    image.src = frameUrl(index);
    return request;
  };

  const nearestLoadedFrame = (target) => {
    if (frames[target]) return target;

    for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
      const previous = target - distance;
      const next = target + distance;
      if (previous >= 0 && frames[previous]) return previous;
      if (next < FRAME_COUNT && frames[next]) return next;
    }

    return -1;
  };

  const paint = (index) => {
    const image = frames[index];
    if (!image) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const scale = Math.max(canvasWidth / image.naturalWidth, canvasHeight / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const x = (canvasWidth - width) / 2;
    const y = (canvasHeight - height) / 2;

    context.fillStyle = '#070b19';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(image, x, y, width, height);
    renderedFrame = index;
    shell.classList.add('is-ready');
  };

  const render = () => {
    renderRequest = 0;
    const target = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(requestedFrame)));
    const available = nearestLoadedFrame(target);

    if (available >= 0 && available !== renderedFrame) paint(available);

    if (!frames[target]) {
      loadFrame(target, true)
        .then(() => {
          if (Math.round(requestedFrame) === target) requestRender();
        })
        .catch(() => {});
    }

    [target - 2, target - 1, target + 1, target + 2]
      .filter((index) => index >= 0 && index < FRAME_COUNT)
      .forEach((index) => loadFrame(index).catch(() => {}));
  };

  function requestRender() {
    if (!renderRequest) renderRequest = requestAnimationFrame(render);
  }

  const resizeCanvas = () => {
    const bounds = shell.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(bounds.width * dpr));
    const height = Math.max(1, Math.round(bounds.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      renderedFrame = -1;
      requestRender();
    }
  };

  const idle = window.requestIdleCallback
    ? (callback) => window.requestIdleCallback(callback, { timeout: 1200 })
    : (callback) => window.setTimeout(callback, 120);

  const progressivelyPreload = () => {
    let nextFrame = 1;

    const loadBatch = () => {
      const batch = [];
      while (batch.length < 3 && nextFrame < FRAME_COUNT) {
        batch.push(loadFrame(nextFrame).catch(() => {}));
        nextFrame += 1;
      }

      Promise.all(batch).finally(() => {
        if (nextFrame < FRAME_COUNT) idle(loadBatch);
      });
    };

    idle(loadBatch);
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  resizeCanvas();
  loadFrame(0, true)
    .then(() => {
      requestedFrame = 0;
      requestRender();
      if (!reducedMotion) progressivelyPreload();
    })
    .catch(() => {});

  if ('ResizeObserver' in window) {
    new ResizeObserver(resizeCanvas).observe(shell);
  } else {
    window.addEventListener('resize', resizeCanvas, { passive: true });
  }

  if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;

  window.gsap.registerPlugin(window.ScrollTrigger);
  const animationState = { frame: 0 };
  const media = window.gsap.matchMedia();

  media.add(
    {
      desktop: '(min-width: 701px)',
      motionAllowed: '(prefers-reduced-motion: no-preference)'
    },
    ({ conditions }) => {
      if (!conditions.motionAllowed) return undefined;

      const tween = window.gsap.to(animationState, {
        frame: FRAME_COUNT - 1,
        ease: 'none',
        snap: 'frame',
        onUpdate: () => {
          requestedFrame = animationState.frame;
          requestRender();
        },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: conditions.desktop ? '+=120%' : 'bottom top',
          scrub: 0.25,
          pin: conditions.desktop,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }
  );
})();
