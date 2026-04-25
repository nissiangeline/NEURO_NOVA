
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { ref, update } from "firebase/database";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";

import type { AnalyzeStroopPerformanceOutput } from "@/ai/flows/analyze-stroop-performance";
import type { AnalyzeMazePerformanceOutput } from "@/ai/flows/analyze-maze-performance";
import type { AnalyzeVoiceRecordingOutput } from "@/ai/flows/analyze-voice-recording";
import type { AnalyzeMemoryPerformanceOutput } from "@/ai/flows/analyze-memory-performance";
import { calculateRiskScore, CalculateRiskScoreOutput } from "@/ai/flows/calculate-risk-score";

type RiskScoreAnalysisProps = {
  voiceAnalysis: AnalyzeVoiceRecordingOutput;
  mazeAnalyses: AnalyzeMazePerformanceOutput[];
  stroopAnalysis: AnalyzeStroopPerformanceOutput;
  memoryAnalysis: AnalyzeMemoryPerformanceOutput;
};

export default function RiskScoreAnalysis({
  voiceAnalysis,
  mazeAnalyses,
  stroopAnalysis,
  memoryAnalysis,
}: RiskScoreAnalysisProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [analysisResult, setAnalysisResult] = useState<CalculateRiskScoreOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const performAnalysis = async () => {
      setIsLoading(true);

      const calculateAverage = (metrics: { actualPercentage: number }[] | undefined): number => {
        if (!metrics || metrics.length === 0) return 0;
        const total = metrics.reduce((sum, m) => sum + m.actualPercentage, 0);
        return Math.round(total / metrics.length);
      };

      const scores = {
        voiceScore: calculateAverage(voiceAnalysis?.metrics),
        mazeScore: calculateAverage(mazeAnalyses?.flatMap(a => a.metrics)),
        stroopScore: calculateAverage(stroopAnalysis?.metrics),
        memoryScore: calculateAverage(memoryAnalysis?.metrics),
      };

      try {
        const result = await calculateRiskScore({
          scores,
          userContext: {
            age: 50,
            gender: 'female'
          }
        });

        setAnalysisResult(result);

        await update(ref(db, `users/${user.uid}/scores`), {
          ...result,
          lastScreening: new Date().toISOString(),
        });

        toast({
          title: "Analysis Complete",
          description: "Your final cognitive score has been calculated and saved.",
        });
      } catch (error) {
        console.error("Failed to calculate or save risk score:", error);
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "There was an error generating your final analysis.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    performAnalysis();
  }, [voiceAnalysis, mazeAnalyses, stroopAnalysis, memoryAnalysis, user, toast]);

  if (isLoading || !analysisResult) {
    return (
      <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-full max-w-2xl mx-auto h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Calculating your final analysis...</p>
      </div>
    );
  }

  const { finalRiskScore, riskLevel, summary, ...scores } = analysisResult;

  return (
    <Card className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200 w-full max-w-2xl mx-auto mt-10">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary mb-2">Your Cognitive Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="grid grid-cols-2 gap-4 my-6 text-left">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-blue-800">1. Voice Test Score</p>
            <p className="text-2xl font-bold">{scores.voiceScore}%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-green-800">2. Maze Game Score</p>
            <p className="text-2xl font-bold">{scores.mazeScore}%</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-yellow-800">3. Stroop Test Score</p>
            <p className="text-2xl font-bold">{scores.stroopScore}%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-purple-800">4. Memory Game Score</p>
            <p className="text-2xl font-bold">{scores.memoryScore}%</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mt-8">Final Analysis</h3>
        <div className="text-6xl font-bold text-gray-800 my-2">{(finalRiskScore / 10).toFixed(1)}<span className="text-5xl">/10</span></div>
        <div
          className={`text-2xl font-bold mb-4 ${
            riskLevel === "Low Risk"
              ? "text-green-500"
              : riskLevel === "Medium Risk"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {riskLevel}
        </div>
        
        <CardDescription className="text-base text-gray-600 max-w-md mx-auto">{summary}</CardDescription>

        <p className="text-xs text-muted-foreground mt-8 px-4">
          <strong>Disclaimer:</strong> This is a screening tool, not a medical diagnosis. Please consult a qualified neurologist for clinical evaluation.
        </p>
        <Button onClick={() => router.push('/dashboard')} className="mt-8">
          Return to Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
