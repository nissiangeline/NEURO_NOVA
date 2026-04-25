"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Palette, Check, X, User, AlertTriangle } from "lucide-react";
import { analyzeStroopPerformance, AnalyzeStroopPerformanceOutput } from "@/ai/flows/analyze-stroop-performance";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import SpeakAloudButton from "./speak-aloud-button";

const COLORS = ["red", "blue", "green", "yellow"];
const TOTAL_ROUNDS = 10;
const DEVIATION_THRESHOLD = 15;

type StroopGameProps = {
    onGameComplete: (analysis: AnalyzeStroopPerformanceOutput) => void;
};

export default function StroopGame({ onGameComplete }: StroopGameProps) {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [word, setWord] = useState("");
  const [inkColor, setInkColor] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeStroopPerformanceOutput | null>(null);

  const generateStroop = useCallback(() => {
    const randomWord = COLORS[Math.floor(Math.random() * COLORS.length)];
    let randomColor;
    do {
      randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    } while (randomColor === randomWord);

    setWord(randomWord);
    setInkColor(randomColor);
    setFeedback(null);
  }, []);
  
  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setRound(0);
    setAnalysis(null);
    setIsLoading(false);
    setStartTime(Date.now());
    generateStroop();
  };
  
  const handleAnswer = async (selectedColor: string) => {
    if (gameState !== "playing") return;

    let isCorrect = selectedColor === inkColor;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    const nextRound = round + 1;
    
    if (nextRound < TOTAL_ROUNDS) {
      setRound(nextRound);
      setTimeout(generateStroop, 500); // Wait a bit before showing the next word
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      const timeTaken = Math.round((Date.now() - (startTime ?? Date.now())) / 1000);
      setGameState("finished");
      setIsLoading(true);
      try {
        const result = await analyzeStroopPerformance({ score: finalScore, timeTaken, totalRounds: TOTAL_ROUNDS });
        setAnalysis(result);
        onGameComplete(result);
      } catch(e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getFeedbackIcon = () => {
    if (feedback === 'correct') return <Check className="text-green-500" />;
    if (feedback === 'wrong') return <X className="text-red-500" />;
    return null;
  }


  return (
    <Card className="h-full w-full bg-transparent border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Palette className="text-primary" />
            {t('stroopGame.title')}
        </CardTitle>
        <div className="flex items-center gap-2">
            <CardDescription>{t('stroopGame.description')}</CardDescription>
            <SpeakAloudButton textToSpeak={t('stroopGame.description')} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        {gameState === "idle" && (
          <Button onClick={startGame}>{t('stroopGame.button_start')}</Button>
        )}

        {gameState === "playing" && (
            <>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <p>{t('stroopGame.instruction')}</p>
                    <SpeakAloudButton textToSpeak={t('stroopGame.instruction')} />
                </div>
                <div 
                    className="text-6xl font-bold transition-all duration-300"
                    style={{ color: inkColor, transform: feedback ? 'scale(1.1)' : 'scale(1)' }}
                >
                    {t(`stroopGame.colors.${word}`)}
                </div>
                <div className="flex gap-4">
                    {COLORS.map(color => (
                        <Button
                            key={color}
                            onClick={() => handleAnswer(color)}
                            className={cn("w-24capitalize", `bg-${color}-500 hover:bg-${color}-600`)}
                            style={{backgroundColor: color}}
                        >
                            {t(`stroopGame.colors.${color}`)}
                        </Button>
                    ))}
                </div>
                <div className="h-8 flex items-center gap-2">
                    {getFeedbackIcon()}
                    <p className="font-semibold">{t('stroopGame.score')}: {score}/{TOTAL_ROUNDS}</p>
                </div>
            </>
        )}
        
        {gameState === "finished" && (
             <div className="w-full text-left space-y-4">
                <p className="font-semibold text-lg text-center">{t('stroopGame.finished_message', { score, total: TOTAL_ROUNDS })}</p>
                
                {isLoading && <Loader2 className="h-6 w-6 animate-spin mx-auto" />}

                {analysis && (
                <div className="space-y-4">
                    <Alert variant="default" className="bg-blue-50 border-blue-200">
                        <User className="h-4 w-4" />
                        <AlertTitle>{t('stroopGame.analysis_title')}</AlertTitle>
                        <AlertDescription>{analysis.performanceSummary}</AlertDescription>
                    </Alert>
                     <div className="grid grid-cols-1 gap-4">
                        <TooltipProvider>
                        {analysis.metrics.map(metric => {
                            const deviation = Math.abs(metric.actualPercentage - metric.expectedPercentage);
                            const hasDeviation = deviation > DEVIATION_THRESHOLD;
                            return (
                                <Tooltip key={metric.name} delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <Card className="p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-semibold text-sm">{metric.name}</h4>
                                                {hasDeviation && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                                            </div>
                                            <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                                <span>Actual: <span className="font-bold text-foreground">{metric.actualPercentage}%</span></span>
                                                <span>Expected: <span className="font-bold text-foreground">{metric.expectedPercentage}%</span></span>
                                            </div>
                                        </Card>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{metric.explanation}</p>
                                    </TooltipContent>
                                </Tooltip>
                            )
                        })}
                        </TooltipProvider>
                    </div>
                </div>
                )}
                
                <Button onClick={startGame} variant="outline" className="w-full">{t('stroopGame.button_restart')}</Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
