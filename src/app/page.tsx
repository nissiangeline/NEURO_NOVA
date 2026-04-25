
"use client";

import Link from "next/link";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useTranslation } from "react-i18next";
import BlurText from "@/components/blur-text";

export default function TitlePage() {
  const { t } = useTranslation();
  const oceanImage = PlaceHolderImages.find(img => img.id === 'ocean_calm');

  return (
    <div className="relative min-h-screen w-full font-sans">
      {oceanImage && (
        <Image
          src={oceanImage.imageUrl}
          alt={oceanImage.description}
          fill
          className="object-cover"
          data-ai-hint={oceanImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="max-w-md">
          <BlurText
            text="NEURO NOVA"
            animateBy="chars"
            delay={50}
            className="text-6xl md:text-7xl font-bold text-foreground mb-4 font-headline tracking-tighter justify-center"
          />
          <p className="text-muted-foreground mb-12 text-lg">
            Screening minds, not judging them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                Log In
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/80 hover:bg-white">
                Sign Up <MoveRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
