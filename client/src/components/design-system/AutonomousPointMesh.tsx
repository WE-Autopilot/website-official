import React, { useEffect, useRef, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseVal: number;
}

const COLORS = [
  'rgba(168, 85, 247, ', // purple
  'rgba(34, 211, 238, ',  // cyan
  'rgba(96, 165, 250, ',  // blue
  'rgba(192, 132, 252, ', // light purple
];

export const AutonomousPointMesh: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse state with smooth damping
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
      radius: 180,
    };

    // Initialize particles (autonomous sensor nodes)
    const particleCount = Math.min(Math.floor((width * height) / 11000), 110);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2 + 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.6 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener('resize', handleResize);
    const parent = canvas.parentElement;
    if (parent && interactive) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // LiDAR sweep angle
    let scanAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      scanAngle += 0.008;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulseVal += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.15;

        // Position update with gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse avoidance & vortex swirl interaction
        if (mouse.isHovered && interactive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            // Gentle push away with perpendicular swirl
            const force = (1 - dist / mouse.radius) * 1.5;
            const angle = Math.atan2(dy, dx);
            const perpAngle = angle + Math.PI / 2;

            p.x += Math.cos(angle) * force * 1.8 + Math.cos(perpAngle) * force * 0.8;
            p.y += Math.sin(angle) * force * 1.8 + Math.sin(perpAngle) * force * 0.8;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.1, currentAlpha)})`;
        ctx.fill();

        // Draw node glow for larger nodes
        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.max(0.05, currentAlpha * 0.25)})`;
          ctx.fill();
        }

        // Connect nearby particles with LiDAR graph scanlines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 135;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect particles near mouse cursor
        if (mouse.isHovered && interactive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius * 0.9) {
            const cursorLineAlpha = (1 - dist / (mouse.radius * 0.9)) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${cursorLineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw subtle interactive cursor reticle when hovered
      if (mouse.isHovered && interactive) {
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.rotate(scanAngle * 2);

        // Reticle ring
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        // Inner target dot
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.7)';
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent && interactive) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return <canvas ref={canvasRef} className="ds-point-mesh-canvas" aria-hidden="true" />;
};

export default memo(AutonomousPointMesh);
