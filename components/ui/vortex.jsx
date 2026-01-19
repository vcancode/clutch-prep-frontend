import { cn } from "../../lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

export const Vortex = (props) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const baseHue = props.baseHue || 220;
  const rangeHue = 100;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = props.backgroundColor || "#000000";
  
  const noise3D = createNoise3D();
  const particlePropsRef = useRef(new Float32Array(particlePropsLength));
  const centerRef = useRef([0, 0]);
  const tickRef = useRef(0);
  const requestRef = useRef();

  const TAU = 2 * Math.PI;
  const rand = (n) => n * Math.random();
  const randRange = (n) => n - rand(2 * n);
  const fadeInOut = (t, m) => {
    let hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

  const initParticle = (i) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let x = rand(canvas.width);
    let y = centerRef.current[1] + randRange(rangeY);
    let vx = 0;
    let vy = 0;
    let life = 0;
    let ttl = baseTTL + rand(rangeTTL);
    let speed = baseSpeed + rand(rangeSpeed);
    let radius = baseRadius + rand(rangeRadius);
    let hue = baseHue + rand(rangeHue);

    particlePropsRef.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    tickRef.current++;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sparkling effect achieved with 'lighter' composite operation
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    
    const particleProps = particlePropsRef.current;
    
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
      let x = particleProps[i];
      let y = particleProps[i2];
      let n = noise3D(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * TAU;
      let vx = lerp(particleProps[i3], Math.cos(n), 0.5);
      let vy = lerp(particleProps[i4], Math.sin(n), 0.5);
      let life = particleProps[i5];
      let ttl = particleProps[i6];
      let speed = particleProps[i7];
      let x2 = x + vx * speed;
      let y2 = y + vy * speed;
      let radius = particleProps[i8];
      let hue = particleProps[i9];

      ctx.beginPath();
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      life++;
      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life;

      if (x2 > canvas.width || x2 < 0 || y2 > canvas.height || y2 < 0 || life > ttl) {
        initParticle(i);
      }
    }

    requestRef.current = requestAnimationFrame(draw);
  };

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerRef.current[0] = 0.5 * canvas.width;
    centerRef.current[1] = 0.5 * canvas.height;
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
    
    requestRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute h-full w-full inset-0 z-0 bg-transparent flex items-center justify-center"
      >
        <canvas 
          ref={canvasRef}
          style={{ 
            filter: "blur(0.5px) brightness(1.5)",
            WebkitFilter: "blur(0.5px) brightness(1.5)",
          }}
        ></canvas>
        {/* Glow Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-transparent backdrop-blur-[1px] opacity-20" />
      </motion.div>

      <div className={cn("relative z-10", props.className)}>
        {props.children}
      </div>
    </div>
  );
};