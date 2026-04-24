"use client";

import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { BrainCircuit, Heart, Waves } from "lucide-react";
import WaveAnimation from "./wave-animation";
import Link from 'next/link';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden px-4">
      <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }}>
        <BrainCircuit className="h-12 w-12 text-primary/50" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <Heart className="h-10 w-10 text-accent/50" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
        <Waves className="h-14 w-14 text-blue-300/50" />
      </div>

      <div className="z-10 flex flex-col items-center">
        <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter text-gray-800">
          {t('hero.title')}
        </h1>
        <p className="mt-4 max-w-xl text-lg md:text-xl text-muted-foreground">
          {t('hero.subtitle')}
        </p>
        <Link href="#screening" passHref>
          <Button size="lg" className="mt-8 bg-gradient-to-r from-primary to-blue-400 text-primary-foreground hover:scale-105 transition-transform duration-150 ease-out shadow-lg">
            {t('hero.cta')}
          </Button>
        </Link>
      </div>

      <WaveAnimation />
    </section>
  );
}
