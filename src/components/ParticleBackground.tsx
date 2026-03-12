import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create flowing lines / particles
    const createParticle = () => ({
      x: Math.random() * canvas.width * 0.5,
      y: Math.random() * canvas.height,
      vx: 0.3 + Math.random() * 0.8,
      vy: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 200 + 100,
    });

    for (let i = 0; i < 80; i++) {
      particles.push(createParticle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy + Math.sin(p.x * 0.01) * 0.5;
        p.life--;

        if (p.life <= 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[i] = createParticle();
          return;
        }

        const alpha = Math.min(p.life / 100, 1) * 0.6;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200, 79, 232, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 15, p.y - p.vy * 15);
        ctx.stroke();
      });

      // Draw flowing curves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(224, 64, 251, ${0.08 + i * 0.02})`;
        ctx.lineWidth = 1;
        const offset = Date.now() * 0.0005 + i * 0.5;
        for (let x = 0; x < canvas.width * 0.6; x += 2) {
          const y = canvas.height * 0.3 + 
            Math.sin(x * 0.005 + offset) * 80 + 
            Math.sin(x * 0.01 + offset * 1.5) * 40 +
            i * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;
