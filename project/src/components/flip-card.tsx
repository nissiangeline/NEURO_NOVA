"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type FlipCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function FlipCard({ front, back, className, style }: FlipCardProps) {
  return (
    <div
      className={cn("group h-48 w-full [perspective:1000px]", className)}
      style={style}
    >
      <div className="relative h-full w-full rounded-lg shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <Card className="h-full w-full flex items-center justify-center p-6 text-center bg-white">
            {front}
          </Card>
        </div>
        {/* Back */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Card className="h-full w-full flex items-center justify-center p-6 text-center bg-primary text-primary-foreground">
            {back}
          </Card>
        </div>
      </div>
    </div>
  );
}
