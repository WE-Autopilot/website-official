import React, { useEffect, useRef, memo } from 'react';

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  hue: number;
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
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isActive: false,
      radius: 140,
    };

    let dots: Dot[] = [];
    const spacing = 32;

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
            baseRadius: 1.1,
            radius: 1.1,
            hue: 270, // purple/violet
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
        mouse.targetX = clientX;
        mouse.targetY = clientY;
        mouse.isActive = true;
      } else {
        mouse.isActive = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener('resize', initGrid);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const spring = 0.045;
    const damping = 0.88;
    const maxRepulsion = 14;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Mouse repulsion physics
        if (mouse.isActive) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius);
            const angle = Math.atan2(dy, dx);
            const push = force * maxRepulsion;

            d.vx += Math.cos(angle) * push * 0.3;
            d.vy += Math.sin(angle) * push * 0.3;

            d.intensity = Math.min(1, d.intensity + force * 0.5);
          }
        }

        // Spring return to home position
        const forceX = (d.originX - d.x) * spring;
        const forceY = (d.originY - d.y) * spring;

        d.vx = (d.vx + forceX) * damping;
        d.vy = (d.vy + forceY) * damping;

        d.x += d.vx;
        d.y += d.vy;

        d.intensity *= 0.94; // Decay active glow

        // Displacement distance for color / size shift
        const displacement = Math.sqrt((d.x - d.originX) ** 2 + (d.y - d.originY) ** 2);
        const activeRatio = Math.min(displacement / 20 + d.intensity, 1);

        // Draw dot
        const dotRadius = d.baseRadius + activeRatio * 1.2;
        ctx.beginPath();
        ctx.arc(d.x, d.y, dotRadius, 0, Math.PI * 2);

        if (activeRatio > 0.05) {
          // Color shift: from purple (270) to cyan (190) when pushed
          const currentHue = 270 - activeRatio * 80;
          ctx.fillStyle = `hsla(${currentHue}, 90%, 70%, ${0.25 + activeRatio * 0.65})`;
        } else {
          // Subtle resting silver/white
          ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        }
        ctx.fill();

        // Draw connecting filaments to nearby displaced dots
        if (activeRatio > 0.3) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, dotRadius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(270, 90%, 65%, ${activeRatio * 0.15})`;
          ctx.fill();
        }
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
