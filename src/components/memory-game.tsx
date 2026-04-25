"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BrainCircuit, Star, Heart, Cat, Dog, Car, Bug, Sun, Moon, Rocket, Anchor, Cloud, Flower, Loader2, User, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeMemoryPerformance, AnalyzeMemoryPerformanceOutput } from "@/ai/flows/analyze-memory-performance";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import SpeakAloudButton from "./speak-aloud-button";

const icons = [
    { icon: Star }, { icon: Heart }, { icon: Cat }, { icon: Dog }, 
    { icon: Car }, { icon: Bug }, { icon: Sun }, { icon: Moon },
    { icon: Rocket }, { icon: Anchor }, { icon: Cloud }, { icon: Flower }
];

const levels = [
    { level: 1, pairs: 8, timeLimit: 60 },
    { level: 2, pairs: 10, timeLimit: 90 },
];

const DEVIATION_THRESHOLD = 15;

type CardData = {
  id: number;
  icon: React.ElementType;
  isFlipped: boolean;
  isMatched: boolean;
};

type MemoryGameProps = {
    onGameComplete: (analysis: AnalyzeMemoryPerformanceOutput) => void;
};

function FlipCard({ isFlipped, onClick, children }: { isFlipped: boolean, onClick: () => void, children: React.ReactNode }) {
    return (
        <div className="w-20 h-24 [perspective:1000px]" onClick={onClick}>
            <div className={cn("relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]", isFlipped && "[transform:rotateY(180deg)]")}>
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-primary/20 rounded-lg flex items-center justify-center">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-lg flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function MemoryGame({ onGameComplete }: MemoryGameProps) {
    const { t } = useTranslation();
    const [level, setLevel] = useState(0);
    const [cards, setCards] = useState<CardData[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [gameState, setGameState] = useState<"idle" | "playing" | "level_complete" | "game_over">("idle");
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalyzeMemoryPerformanceOutput | null>(null);

    const { toast } = useToast();

    const createDeck = useCallback(() => {
        const currentLevelConfig = levels[level];
        const neededIcons = icons.slice(0, currentLevelConfig.pairs);
        const pairedIcons = [...neededIcons, ...neededIcons];
        
        const shuffled = pairedIcons
            .map((value, index) => ({ ...value, id: index }))
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({
                ...card,
                isFlipped: false,
                isMatched: false,
            }));

        setCards(shuffled);
    }, [level]);
    
    useEffect(() => {
        if (gameState === "playing") {
            createDeck();
        }
    }, [gameState, level, createDeck]);

    const startGame = () => {
        setLevel(0);
        setMoves(0);
        setAnalysis(null);
        setGameState("playing");
    };

    const handleCardClick = (index: number) => {
        if (isChecking || cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) {
            return;
        }

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);
        setFlippedCards(prev => [...prev, index]);
    };
    
    useEffect(() => {
        if (flippedCards.length === 2) {
            setIsChecking(true);
            setMoves(m => m + 1);
            const [firstIndex, secondIndex] = flippedCards;
            const firstCard = cards[firstIndex];
            const secondCard = cards[secondIndex];

            if (firstCard.icon === secondCard.icon) {
                // Match
                setTimeout(() => {
                    setCards(prev => prev.map(card => 
                        card.icon === firstCard.icon ? { ...card, isMatched: true } : card
                    ));
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 800);
            } else {
                // No Match
                setTimeout(() => {
                    setCards(prev => prev.map((card, index) => 
                        index === firstIndex || index === secondIndex ? { ...card, isFlipped: false } : card
                    ));
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1200);
            }
        }
    }, [flippedCards, cards]);

    const handleAnalysis = useCallback(async () => {
      const { pairs } = levels[level];
      setIsLoading(true);
      try {
        const result = await analyzeMemoryPerformance({ moves, pairs });
        setAnalysis(result);
        onGameComplete(result); // Notify parent on final level
      } catch (e) {
        console.error("Analysis failed:", e);
      } finally {
        setIsLoading(false);
      }
    }, [moves, level, onGameComplete]);


    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.isMatched)) {
           setGameState("game_over");
           handleAnalysis()
        }
    }, [cards, handleAnalysis]);

    const renderGrid = () => {
      const pairs = levels[level].pairs;
      const cols = pairs === 8 ? 4 : 4; // 4x4 for 8 pairs, 4x5 for 10 pairs
      return (
        <div 
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {cards.map((card, index) => (
            <FlipCard
              key={card.id}
              isFlipped={card.isFlipped}
              onClick={() => handleCardClick(index)}
            >
              <card.icon className="w-10 h-10 text-primary" />
            </FlipCard>
          ))}
        </div>
      );
    }

    const GameContent = () => {
        switch (gameState) {
            case "idle":
                return <Button onClick={startGame}>{t('memoryGame.button_start')}</Button>;
            case "playing":
                return (
                    <div className="flex flex-col items-center gap-4">
                        {renderGrid()}
                        <p className="font-bold text-lg">{t('memoryGame.moves')}: {moves}</p>
                    </div>
                );
            case "game_over":
                 return (
                    <div className="w-full text-left space-y-4">
                        <p className="font-semibold text-lg text-center">You completed the game in {moves} moves!</p>
                        
                        {isLoading && <Loader2 className="h-6 w-6 animate-spin mx-auto" />}

                        {analysis && (
                        <div className="space-y-4">
                             <Alert variant="default" className="bg-blue-50 border-blue-200">
                                <User className="h-4 w-4" />
                                <AlertTitle>{t('memoryGame.analysis_title')}</AlertTitle>
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
                        
                        <Button onClick={startGame} variant="outline" className="w-full">{t('memoryGame.button_restart')}</Button>
                    </div>
                );
        }
    };
    
    return (
        <Card className="h-full w-full flex flex-col bg-transparent border-0 shadow-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="text-primary" />
                    {t('memoryGame.title')}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <CardDescription>
                        {t('memoryGame.test_purpose')}
                    </CardDescription>
                    <SpeakAloudButton textToSpeak={t('memoryGame.test_purpose')} />
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center gap-4">
               {GameContent()}
            </CardContent>
        </Card>
    );
}
