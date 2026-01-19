'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Sparkles = ({
  className,
  density = 150,
  color = '#10b981',
  minSize = 1,
  maxSize = 3,
  speed = 2,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const sparklesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSparkles();
    };

    // Initialize sparkles
    const initSparkles = () => {
      sparklesRef.current = [];
      for (let i = 0; i < density; i++) {
        sparklesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random(),
          fadeDirection: Math.random() > 0.5 ? 1 : -1,
          fadeSpeed: (Math.random() * 0.02 + 0.005) * speed,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Draw sparkles
    const drawSparkles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparklesRef.current.forEach((sparkle) => {
        // Update opacity for twinkling effect
        sparkle.opacity += sparkle.fadeSpeed * sparkle.fadeDirection;
        
        if (sparkle.opacity >= 1) {
          sparkle.opacity = 1;
          sparkle.fadeDirection = -1;
        } else if (sparkle.opacity <= 0.1) {
          sparkle.opacity = 0.1;
          sparkle.fadeDirection = 1;
        }

        // Draw sparkle
        ctx.save();
        ctx.globalAlpha = sparkle.opacity;
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          sparkle.x,
          sparkle.y,
          0,
          sparkle.x,
          sparkle.y,
          sparkle.size * 3 // Increased glow radius
        );
        
        gradient.addColorStop(0, '#ffffff'); // White core for brightness
        gradient.addColorStop(0.2, color); // Emerald transition
        gradient.addColorStop(0.6, `${color}44`); // Softer emerald glow
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw bright center
        ctx.fillStyle = '#ffffff'; // Pure white center
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size / 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(drawSparkles);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawSparkles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, color, minSize, maxSize, speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn('absolute inset-0', className)}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </motion.div>
  );
};
