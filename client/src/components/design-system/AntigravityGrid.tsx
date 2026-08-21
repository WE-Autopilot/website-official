import React, { useEffect, useRef, memo } from 'react';

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  intensity: number;
}

export const AntigravityGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      strength: 0,
      isInside: false,
      radius: 140,
    };

    let dots: Dot[] = [];
    const spacing = 25; // Slightly denser dot matrix

    const initGrid = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const originX = c * spacing;
          const originY = r * spacing;

          dots.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            baseRadius: 0.95,
            intensity: 0,
          });
        }
      }
    };

    initGrid();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (clientX >= 0 && clientX <= width && clientY >= 0 && clientY <= height) {
        if (!mouse.isInside) {
          // Instant snap to prevent jump from top-left, then fade strength up from 0
          mouse.x = clientX;
          mouse.y = clientY;
          mouse.targetX = clientX;
          mouse.targetY = clientY;
          mouse.strength = 0;
          mouse.isInside = true;
        } else {
          mouse.targetX = clientX;
          mouse.targetY = clientY;
        }
      } else {
        mouse.isInside = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.isInside = false;
    };

    window.addEventListener('resize', initGrid);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const spring = 0.04;
    const damping = 0.86;
    const maxRepulsion = 15;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.014;

      // Smooth fade-in and position interpolation
      if (mouse.isInside) {
        mouse.strength += (1.0 - mouse.strength) * 0.08;
        mouse.x += (mouse.targetX - mouse.x) * 0.16;
        mouse.y += (mouse.targetY - mouse.y) * 0.16;
      } else {
        mouse.strength += (0.0 - mouse.strength) * 0.05;
      }

      const idleWeight = Math.max(0, 1.0 - mouse.strength);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Idle organic wave movement when mouse is absent/inactive
        let targetX = d.originX;
        let targetY = d.originY;

        if (idleWeight > 0.01) {
          const waveX = Math.sin(d.originX * 0.008 + time * 0.9 + d.originY * 0.006) * 3.5;
          const waveY = Math.cos(d.originY * 0.01 - time * 0.7 + d.originX * 0.005) * 3.0;
          targetX += waveX * idleWeight;
          targetY += waveY * idleWeight;
        }

        // Active mouse repulsion physics scaled by mouse.strength
        if (mouse.strength > 0.01) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * mouse.strength;
            const angle = Math.atan2(dy, dx);
            const push = force * maxRepulsion;

            d.vx += Math.cos(angle) * push * 0.35;
            d.vy += Math.sin(angle) * push * 0.35;

            d.intensity = Math.min(1, d.intensity + force * 0.6);
          }
        }

        // Spring return to dynamic target
        const forceX = (targetX - d.x) * spring;
        const forceY = (targetY - d.y) * spring;

        d.vx = (d.vx + forceX) * damping;
        d.vy = (d.vy + forceY) * damping;

        d.x += d.vx;
        d.y += d.vy;

        d.intensity *= 0.93; // Decay active glow

        // Displacement distance for active color shift
        const displacement = Math.sqrt((d.x - d.originX) ** 2 + (d.y - d.originY) ** 2);
        const activeRatio = Math.min(displacement / 18 + d.intensity, 1);

        // Idle diagonal shimmer pulse
        let shimmerBoost = 0;
        if (idleWeight > 0.2) {
          const shimmerVal = Math.sin(d.originX * 0.004 + d.originY * 0.004 - time * 1.4);
          if (shimmerVal > 0.7) {
            shimmerBoost = ((shimmerVal - 0.7) / 0.3) * 0.12 * idleWeight;
          }
        }

        // Draw dot
        const dotRadius = d.baseRadius + activeRatio * 1.1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, dotRadius, 0, Math.PI * 2);

        if (activeRatio > 0.05) {
          // Color shift: purple to cyan when deflected
          const currentHue = 270 - activeRatio * 85;
          ctx.fillStyle = `hsla(${currentHue}, 85%, 68%, ${0.15 + activeRatio * 0.65})`;
        } else if (shimmerBoost > 0) {
          // Gentle idle wave shimmer
          ctx.fillStyle = `hsla(270, 75%, 72%, ${0.08 + shimmerBoost})`;
        } else {
          // Subtle, soft resting silver/slate
          ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', initGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="ds-antigravity-canvas" aria-hidden="true" />;
};

export default memo(AntigravityGrid);
