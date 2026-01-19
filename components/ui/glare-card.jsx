import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const GlareCard = ({
  children,
  className,
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef(null);
  const [state, setState] = useState({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const handlePointerMove = (event) => {
    const rotateFactor = 0.4;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    const percentage = {
      x: (100 / rect.width) * position.x,
      y: (100 / rect.height) * position.y,
    };
    const delta = {
      x: percentage.x - 50,
      y: percentage.y - 50,
    };

    const { background, rotate, glare } = state;
    background.x = 50 + percentage.x / 4 - 12.5;
    background.y = 50 + percentage.y / 3 - 16.67;
    rotate.x = -(delta.x / 3.5);
    rotate.y = delta.y / 2;
    rotate.x *= rotateFactor;
    rotate.y *= rotateFactor;
    glare.x = percentage.x;
    glare.y = percentage.y;

    setState({
      background,
      rotate,
      glare,
    });
  };

  const handlePointerEnter = () => {
    isPointerInside.current = true;
    setTimeout(() => {
      if (isPointerInside.current) {
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
        }
      }
    }, 300);
  };

  const handlePointerLeave = () => {
    isPointerInside.current = false;
    if (refElement.current) {
      refElement.current.style.removeProperty("--duration");
      refElement.current.style.setProperty("--duration", "300ms");
    }
    setState({
      glare: { x: 50, y: 50 },
      background: { x: 50, y: 50 },
      rotate: { x: 0, y: 0 },
    });
  };

  return (
    <div
      style={{
        "--duration": "300ms",
      }}
      className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] w-full"
      ref={refElement}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className={cn(
          "h-full w-full relative transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform-style:preserve-3d]",
          className
        )}
        style={{
          transform: `rotateY(${state.rotate.x}deg) rotateX(${state.rotate.y}deg)`,
        }}
      >
        <div className=" w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div
            className={cn(
              "h-full w-full bg-zinc-950",
              "border border-zinc-800 rounded-xl"
            )}
          >
            {children}
          </div>
        </div>
        <div
          className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]"
          style={{
            "--m-x": `${state.glare.x}%`,
            "--m-y": `${state.glare.y}%`,
            "--opacity": "0.1",
          }}
        />
        <div
          className="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] relative"
          style={{
            "--m-x": `${state.glare.x}%`,
            "--m-y": `${state.glare.y}%`,
            "--opacity": "0.2",
          }}
        />
      </div>
    </div>
  );
};