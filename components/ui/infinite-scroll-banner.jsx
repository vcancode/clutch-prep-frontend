import React from 'react';

export const InfiniteScrollBanner = () => {
  const items = [
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
    "Class 11", "Class 12", "B.Tech", "M.Tech", "BCA", "MCA", 
    "B.Sc", "M.Sc", "PhD"
  ];

  return (
    <div className="w-full overflow-hidden bg-transparent py-10 md:py-14 relative z-10 select-none pointer-events-none">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="flex animate-scroll w-max">
        <div className="flex items-center gap-12 md:gap-24 px-12">
            {items.map((item, i) => (
            <span 
                key={i} 
                className="text-6xl md:text-9xl font-black text-emerald-500/90 uppercase tracking-tighter"
                style={{ 
                    textShadow: '0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3)',
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
                }}
            >
                {item}
            </span>
            ))}
        </div>
        <div className="flex items-center gap-12 md:gap-24 px-12">
            {items.map((item, i) => (
            <span 
                key={`duplicate-${i}`} 
                className="text-6xl md:text-9xl font-black text-emerald-500/90 uppercase tracking-tighter"
                style={{ 
                    textShadow: '0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3)',
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
                }}
            >
                {item}
            </span>
            ))}
        </div>
      </div>
    </div>
  );
};