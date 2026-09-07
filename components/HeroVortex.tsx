'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroVortex
 * ----------
 * A full-bleed "flying into a vortex" canvas background for a hero section.
 * Thin glowing streaks radiate outward from a vanishing point that drifts
 * toward the pointer, accelerate as the visitor scrolls, and fade out once
 * the hero has scrolled out of view.
 *
 * Drop it in as the first child of a `position: relative; overflow: hidden`
 * hero <section> — it reads that section's box straight off its own
 * `parentElement`, so no size props are needed. See the bottom of this file
 * for the exact integration snippet requested alongside this component.
 */

type Vec2 = { x: number; y: number };

interface Particle {
  angle: number; // polar angle around the vanishing point, radians
  radius: number; // current distance from the vanishing point
  speed: number; // per-particle base speed (radius units / frame)
  hue: number; // 0..1 draw at spawn, picks which theme color this streak uses
  x: number;
  y: number;
  prevX: number;
  prevY: number;
}

// ---- tunable constants -----------------------------------------------

const PARTICLE_COUNT_DESKTOP = 140;
const PARTICLE_COUNT_MOBILE = 70;
const MOBILE_BREAKPOINT_PX = 700;
const MAX_DEVICE_PIXEL_RATIO = 2;

const VANISH_LERP = 0.045; // how quickly the vanishing point chases the pointer
const OPACITY_LERP = 0.08; // how quickly rendered opacity chases its scroll-driven target
const BOOST_DECAY = 0.94; // per-frame decay of the click/tap speed burst

const SCROLL_PROGRESS_MAX = 1.6;
const SCROLL_SPEED_GAIN = 2.6; // speedMultiplier = 1 + progress * SCROLL_SPEED_GAIN
const BOOST_SPEED_GAIN = 3; // + boost * BOOST_SPEED_GAIN
const FADE_START = 0.85; // scroll progress at which the canvas starts fading out
const FADE_END = 1.5; // scroll progress at which the canvas is fully transparent

const RESPAWN_MAX_RADIUS = 20; // small starting radius for a freshly (re)spawned particle

// Fallback hex values in case the theme's CSS custom properties aren't
// resolvable for some reason (e.g. rendered outside the site's stylesheet) —
// keeps the effect from silently drawing black lines.
const FALLBACK_ACCENT = '#7A1B34';
const FALLBACK_HIGHLIGHT = '#B23A57';
const FALLBACK_NEAR_WHITE = '#F5F1EC';

type RGB = [number, number, number];

function hexToRgb(hex: string, fallback: RGB): RGB {
  const cleaned = hex.trim().replace('#', '');
  const isShort = cleaned.length === 3;
  const isFull = cleaned.length === 6;
  if (!isShort && !isFull) return fallback;

  const expand = (part: string) => (isShort ? part + part : part);
  const r = parseInt(expand(cleaned.slice(0, isShort ? 1 : 2)), 16);
  const g = parseInt(expand(cleaned.slice(isShort ? 1 : 2, isShort ? 2 : 4)), 16);
  const b = parseInt(expand(cleaned.slice(isShort ? 2 : 4, isShort ? 3 : 6)), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return fallback;
  return [r, g, b];
}

function readThemeColor(varName: string, fallbackHex: string): RGB {
  const fallback = hexToRgb(fallbackHex, [255, 255, 255]);
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName);
  if (!raw) return fallback;
  return hexToRgb(raw, fallback);
}

export default function HeroVortex() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion by skipping the effect entirely — the
    // canvas stays mounted but never receives a size, listeners, or a
    // render loop, so it's simply an inert, fully transparent element.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // The hero <section> is the canvas's own parent — see integration note
    // at the bottom of this file.
    const heroEl = canvas.parentElement;
    if (!heroEl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ---- theme colors, pulled from the site's CSS custom properties ----
    const accentRgb = readThemeColor('--accent', FALLBACK_ACCENT);
    const highlightRgb = readThemeColor('--accent-bright', FALLBACK_HIGHLIGHT);
    const nearWhiteRgb = readThemeColor('--ink', FALLBACK_NEAR_WHITE);

    function colorForHue(hue: number): RGB {
      if (hue < 0.5) return accentRgb; // ~50%
      if (hue < 0.8) return highlightRgb; // ~30%
      return nearWhiteRgb; // ~20%
    }

    // ---- mutable animation state ----------------------------------
    let width = 0;
    let height = 0;
    let maxRadius = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let renderedOpacity = 1;
    let boost = 0;
    let scrollProgress = 0;

    const defaultVanish = (): Vec2 => ({ x: width * 0.5, y: height * 0.42 });
    let vanish: Vec2 = { x: 0, y: 0 };
    let vanishTarget: Vec2 = { x: 0, y: 0 };

    function distanceToFarthestCorner(point: Vec2): number {
      const corners: Vec2[] = [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: 0, y: height },
        { x: width, y: height },
      ];
      let farthest = 0;
      for (const corner of corners) {
        const d = Math.hypot(corner.x - point.x, corner.y - point.y);
        if (d > farthest) farthest = d;
      }
      return farthest;
    }

    function spawnParticle(nearCenter: boolean): Particle {
      const angle = Math.random() * Math.PI * 2;
      const radius = nearCenter ? Math.random() * RESPAWN_MAX_RADIUS : Math.random() * maxRadius;
      const x = vanish.x + Math.cos(angle) * radius;
      const y = vanish.y + Math.sin(angle) * radius;
      return {
        angle,
        radius,
        speed: 0.6 + Math.random() * 1.2,
        hue: Math.random(),
        x,
        y,
        prevX: x,
        prevY: y,
      };
    }

    function isMobileWidth() {
      return width < MOBILE_BREAKPOINT_PX;
    }

    function resize() {
      const rect = heroEl!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      // Non-null assertions below: `canvas`/`ctx` are narrowed to non-null
      // at the top of the effect, but TS can't carry that narrowing into
      // nested function declarations like this one, since it can't prove
      // the ref wasn't reassigned by the time this runs.
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      // Scale the drawing context so all drawing code below can keep
      // working in CSS pixels regardless of devicePixelRatio.
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (vanish.x === 0 && vanish.y === 0) {
        vanish = defaultVanish();
      }
      vanishTarget = vanishTarget.x === 0 && vanishTarget.y === 0 ? defaultVanish() : vanishTarget;
      maxRadius = distanceToFarthestCorner(vanish);

      const count = isMobileWidth() ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      particles = Array.from({ length: count }, () => spawnParticle(false));
    }

    resize();
    window.addEventListener('resize', resize);

    // ---- pointer interactivity: vanishing point follows the cursor ----
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    function setVanishTargetFromClient(clientX: number, clientY: number) {
      const rect = heroEl!.getBoundingClientRect();
      vanishTarget = { x: clientX - rect.left, y: clientY - rect.top };
    }

    function handleMouseMove(e: MouseEvent) {
      setVanishTargetFromClient(e.clientX, e.clientY);
    }
    function handleMouseLeave() {
      vanishTarget = defaultVanish();
    }
    function handleTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (touch) setVanishTargetFromClient(touch.clientX, touch.clientY);
    }
    function handlePointerDown() {
      boost = 1;
    }

    if (isFinePointer) {
      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }
    heroEl.addEventListener('touchmove', handleTouchMove, { passive: true });
    heroEl.addEventListener('pointerdown', handlePointerDown);

    // ---- scroll-driven speed + fade ----------------------------------
    function handleScroll() {
      const raw = window.scrollY / heroEl!.offsetHeight;
      scrollProgress = Math.min(Math.max(raw, 0), SCROLL_PROGRESS_MAX);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- visibility: keep the loop alive, skip the work off-screen ----
    let isHeroVisible = true;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) isHeroVisible = entry.isIntersecting;
    });
    observer.observe(heroEl);

    // ---- render loop ---------------------------------------------------
    function frame() {
      rafId = requestAnimationFrame(frame);
      if (!isHeroVisible) return;

      boost *= BOOST_DECAY;
      vanish.x += (vanishTarget.x - vanish.x) * VANISH_LERP;
      vanish.y += (vanishTarget.y - vanish.y) * VANISH_LERP;
      // The vanishing point drifts, so the farthest-corner distance that
      // defines "fully flown out" drifts gently with it too.
      maxRadius = distanceToFarthestCorner(vanish);

      const speedMultiplier = 1 + scrollProgress * SCROLL_SPEED_GAIN + boost * BOOST_SPEED_GAIN;

      const targetOpacity =
        scrollProgress <= FADE_START
          ? 1
          : 1 - Math.min((scrollProgress - FADE_START) / (FADE_END - FADE_START), 1);
      renderedOpacity += (targetOpacity - renderedOpacity) * OPACITY_LERP;

      ctx!.clearRect(0, 0, width, height);
      ctx!.globalAlpha = renderedOpacity;
      ctx!.globalCompositeOperation = 'lighter'; // additive glow

      for (const p of particles) {
        p.prevX = p.x;
        p.prevY = p.y;
        p.radius += p.speed * speedMultiplier;

        if (p.radius > maxRadius) {
          // Flown past the edge — respawn near the center instead of
          // drawing a streak jump across the whole canvas this frame.
          const respawned = spawnParticle(true);
          p.angle = respawned.angle;
          p.radius = respawned.radius;
          p.speed = respawned.speed;
          p.hue = respawned.hue;
          p.x = respawned.x;
          p.y = respawned.y;
          p.prevX = respawned.x;
          p.prevY = respawned.y;
          continue;
        }

        p.x = vanish.x + Math.cos(p.angle) * p.radius;
        p.y = vanish.y + Math.sin(p.angle) * p.radius;

        const t = p.radius / maxRadius;
        const alpha = Math.min(t * 1.4, 0.85);
        const lineWidth = 0.6 + t * 2.2;
        const [r, g, b] = colorForHue(p.hue);

        ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.lineWidth = lineWidth;
        ctx!.beginPath();
        ctx!.moveTo(p.prevX, p.prevY);
        ctx!.lineTo(p.x, p.y);
        ctx!.stroke();
      }

      ctx!.globalCompositeOperation = 'source-over';
      ctx!.globalAlpha = 1;
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      if (isFinePointer) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      heroEl.removeEventListener('touchmove', handleTouchMove);
      heroEl.removeEventListener('pointerdown', handlePointerDown);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        // Decorative and non-interactive — the click/tap boost listens on
        // the hero section itself, not the canvas, so this never needs to
        // catch pointer events (and never blocks clicks on real hero UI).
        pointerEvents: 'none',
      }}
    />
  );
}

/*
INTEGRATION
-----------
Inside the hero section (which must be `position: relative; overflow: hidden`,
already true of this project's `.hero` class):

  <section className="hero">
    <HeroVortex />
    <div className="hero-vignette" aria-hidden="true" />

    <div className="wrap hero-inner">
      ... existing hero copy ...
    </div>
  </section>

`.hero-vignette` (add alongside the hero's other rules):

  .hero-vignette{
    position:absolute; inset:0; z-index:1; pointer-events:none;
    background:radial-gradient(circle at 50% 42%, transparent 0%, rgba(11,10,12,0.35) 55%, rgba(11,10,12,0.85) 100%);
  }

`.hero-inner` already carries `z-index:2` and `.hero-copy` `z-index:3` in this
project's stylesheet, so both sit above the canvas (z-index 0) and the
vignette (z-index 1) without any further changes.
*/
