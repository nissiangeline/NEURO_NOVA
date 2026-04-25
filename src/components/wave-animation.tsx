"use client";

import { cn } from "@/lib/utils";
import React from "react";

const Wave = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={cn(
      "w-full h-auto min-h-[100px] max-h-[150px]",
      className
    )}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shapeRendering="auto"
    {...props}
  >
    <defs>
      <path
        id="gentle-wave"
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      />
    </defs>
    <g className="parallax">
      <use
        xlinkHref="#gentle-wave"
        x="48"
        y="0"
        className="fill-blue-200/70"
      />
      <use
        xlinkHref="#gentle-wave"
        x="48"
        y="3"
        className="fill-blue-200/50"
      />
      <use
        xlinkHref="#gentle-wave"
        x="48"
        y="5"
        className="fill-blue-200/30"
      />
      <use
        xlinkHref="#gentle-wave"
        x="48"
        y="7"
        className="fill-blue-200"
      />
    </g>
    <style jsx>{`
      .parallax > use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        transform: translate3d(-90px, 0, 0); /* Start position */
      }
      .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
      }
      .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
      }
      .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
      }
      .parallax > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
      }
      @keyframes move-forever {
        100% {
          transform: translate3d(85px, 0, 0);
        }
      }
    `}</style>
  </svg>
);

export default function WaveAnimation() {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <Wave />
    </div>
  );
}
