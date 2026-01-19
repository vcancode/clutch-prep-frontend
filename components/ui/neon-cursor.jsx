import React, { useEffect, useRef } from 'react';

export const NeonCursor = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // State
    // Start off-screen or center
    const mouse = { x: width/2, y: height/2 };
    const points = [];
    const nPoints = 35;
    
    // Initialize points
    for(let i=0; i<nPoints; i++) {
        points.push({ x: mouse.x, y: mouse.y });
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Hide default cursor globally
    document.body.style.cursor = 'none';
    
    let animationId;

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Update head point (Lerp for smoothness)
        // Responsive tracking
        points[0].x += (mouse.x - points[0].x) * 0.5;
        points[0].y += (mouse.y - points[0].y) * 0.5;

        // Update tail points (Snake effect)
        for(let i=1; i<nPoints; i++) {
            const prev = points[i-1];
            const curr = points[i];
            
            // Adjust speed for the "follow" effect
            curr.x += (prev.x - curr.x) * 0.25;
            curr.y += (prev.y - curr.y) * 0.25;
        }

        // Draw Trail
        if (points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for(let i=1; i<nPoints - 1; i++) {
                const xc = (points[i].x + points[i+1].x) / 2;
                const yc = (points[i].y + points[i+1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            ctx.lineTo(points[nPoints-1].x, points[nPoints-1].y);

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 3;
            // Neon Emerald
            ctx.strokeStyle = '#10b981'; 
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 20;
            
            ctx.stroke();
        }
        
        // Draw Head
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        // Stronger glow for head
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#34d399'; 
        ctx.fill();

        animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[10000] mix-blend-screen"
        style={{ touchAction: 'none' }} 
    />
  );
};