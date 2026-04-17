import React, { useEffect, useRef, useState } from 'react';

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  shockRadius?: number;
  shockStrength?: number;
}

export const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 2,
  gap = 25,
  baseColor = '#333333',
  activeColor = '#ffffff',
  shockRadius = 200,
  shockStrength = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const dotsRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; originalX: number; originalY: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeDots();
    };

    const initializeDots = () => {
      dotsRef.current = [];
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          dotsRef.current.push({
            x,
            y,
            vx: 0,
            vy: 0,
            originalX: x,
            originalY: y,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update dots based on mouse proximity
      dotsRef.current.forEach((dot) => {
        const dx = dot.originalX - mousePos.x;
        const dy = dot.originalY - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < shockRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / shockRadius) * shockStrength;
          dot.vx = Math.cos(angle) * force;
          dot.vy = Math.sin(angle) * force;
        } else {
          dot.vx *= 0.9;
          dot.vy *= 0.9;
        }

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Apply damping to return to original position
        dot.x += (dot.originalX - dot.x) * 0.1;
        dot.y += (dot.originalY - dot.y) * 0.1;
      });

      // Draw dots
      dotsRef.current.forEach((dot) => {
        const dx = dot.originalX - mousePos.x;
        const dy = dot.originalY - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Determine color based on proximity
        let color = baseColor;
        if (distance < shockRadius) {
          const intensity = 1 - distance / shockRadius;
          color = activeColor;
          ctx.globalAlpha = 0.3 + intensity * 0.7;
        } else {
          ctx.globalAlpha = 0.3;
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dotSize, gap, baseColor, activeColor, shockRadius, shockStrength, mousePos.x, mousePos.y]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
