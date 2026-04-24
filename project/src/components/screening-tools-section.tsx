
"use client";

import React, { useRef, useEffect, useState } from 'react';
import VoiceTest from './voice-test';
import MemoryGame from './memory-game';
import MazeGame from './maze-game';
import StroopGame from './stroop-game';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import type { AnalyzeVoiceRecordingOutput } from '@/ai/flows/analyze-voice-recording';
import type { AnalyzeMazePerformanceOutput } from '@/ai/flows/analyze-maze-performance';
import type { AnalyzeStroopPerformanceOutput } from '@/ai/flows/analyze-stroop-performance';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { AnalyzeMemoryPerformanceOutput } from '@/ai/flows/analyze-memory-performance';
import RiskScoreAnalysis from './risk-score-analysis';

function CardWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const currentCard = cardRef.current;
    currentCard?.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentCard?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-primary/20",
        "before:absolute before:inset-0 before:rounded-lg before:bg-[radial-gradient(300px_circle_at_var(--mouse-x)_var(--mouse-y),_hsl(var(--primary)/0.1),_transparent_80%)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
        className
      )}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default function ScreeningToolsSection() {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [voiceAnalysis, setVoiceAnalysis] = useState<AnalyzeVoiceRecordingOutput | null>(null);
  const [mazeAnalyses, setMazeAnalyses] = useState<AnalyzeMazePerformanceOutput[] | null>(null);
  const [stroopAnalysis, setStroopAnalysis] = useState<AnalyzeStroopPerformanceOutput | null>(null);
  const [memoryAnalysis, setMemoryAnalysis] = useState<AnalyzeMemoryPerformanceOutput | null>(null);
  const [loading, setLoading] = useState(true);

  const allTestsCompleted = voiceAnalysis && mazeAnalyses && mazeAnalyses.length > 0 && stroopAnalysis && memoryAnalysis;

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold">{t('screening.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          {t('screening.subtitle')}
        </p>
      </div>

      {allTestsCompleted ? (
        <RiskScoreAnalysis 
          voiceAnalysis={voiceAnalysis}
          mazeAnalyses={mazeAnalyses}
          stroopAnalysis={stroopAnalysis}
          memoryAnalysis={memoryAnalysis}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <CardWrapper>
            <VoiceTest onAnalysisComplete={setVoiceAnalysis} />
          </CardWrapper>
          <CardWrapper>
            <MazeGame onGameComplete={(analyses) => setMazeAnalyses(analyses)}/>
          </CardWrapper>
          <CardWrapper>
            <StroopGame onGameComplete={(analysis) => setStroopAnalysis(analysis)} />
          </CardWrapper>
          <CardWrapper>
            <MemoryGame onGameComplete={setMemoryAnalysis} />
          </CardWrapper>
        </div>
      )}
    </section>
  );
}

    