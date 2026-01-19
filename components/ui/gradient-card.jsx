import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const GradientCard = ({ title, subtitle, description, icon: Icon, index, className }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
      
      const rotateX = -(y / rect.height) * 5;
      const rotateY = (x / rect.width) * 5;
      
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const formattedNumber = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative rounded-[4px] overflow-hidden bg-black border border-zinc-900 h-full min-h-[360px] flex flex-col group", className)}
      style={{
        transformStyle: "preserve-3d",
      }}
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -5 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
        borderColor: isHovered ? "rgba(52, 211, 153, 0.2)" : "rgba(24, 24, 27, 1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Background Number */}
      <div 
        className="absolute top-10 right-6 text-8xl font-bold text-zinc-900/40 select-none font-mono pointer-events-none transition-colors duration-500 group-hover:text-zinc-800/40"
        style={{ transform: 'translateZ(-20px)' }}
      >
        {formattedNumber}
      </div>

      {/* Spot Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x + 200}px ${mousePosition.y + 200}px, rgba(16, 185, 129, 0.06), transparent 40%)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center justify-center mb-8 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors duration-300">
          <Icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>

        {/* Subtitle / Tagline */}
        {subtitle && (
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4">
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-zinc-500 text-sm leading-relaxed max-w-[90%] group-hover:text-zinc-400 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Bottom accent line (optional, derived from original GradientCard but simplified) */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-900/0 to-transparent group-hover:via-emerald-500/50 transition-all duration-500" />
    </motion.div>
  );
};