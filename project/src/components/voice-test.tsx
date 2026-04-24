"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { analyzeVoiceRecording, AnalyzeVoiceRecordingOutput } from "@/ai/flows/analyze-voice-recording";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mic, Loader2, Pause, Trash2, User, AlertTriangle, UploadCloud, Square, Play } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import SpeakAloudButton from "./speak-aloud-button";

type RecordingState = "idle" | "requesting" | "recording" | "paused" | "stopped" | "analyzing" | "error" | "denied";

const DEVIATION_THRESHOLD = 15; // The percentage difference to be considered a flag-worthy deviation.

type VoiceTestProps = {
    onAnalysisComplete: (analysis: AnalyzeVoiceRecordingOutput) => void;
};

export default function VoiceTest({ onAnalysisComplete }: VoiceTestProps) {
  const { t } = useTranslation();
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeVoiceRecordingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        setError(t('voiceTest.error_file_type'));
        return;
      }
      resetAll();
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setAudioBlob(file);
      setRecordingState("stopped");
    }
  };
  
  const startTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
  }

  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }

  const startRecording = async () => {
    resetAll();
    setRecordingState("requesting");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(t('voiceTest.error_media_api'));
      setRecordingState("error");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingState("recording");
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setRecordingState("stopped");
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setTimer(0);
      startTimer();

    } catch (err) {
      console.error("Microphone access denied:", err);
      setError(t('voiceTest.error_mic_denied'));
      setRecordingState("denied");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === "recording") {
        mediaRecorderRef.current.pause();
        setRecordingState("paused");
        stopTimer();
    }
  }

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState === "paused") {
        mediaRecorderRef.current.resume();
        setRecordingState("recording");
        startTimer();
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && (recordingState === "recording" || recordingState === "paused")) {
      mediaRecorderRef.current.stop();
      stopTimer();
    }
  };
  
  const resetAll = () => {
    setRecordingState("idle");
    setError(null);
    setAnalysis(null);
    setAudioBlob(null);
    if(audioUrl) {
        URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setTimer(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    stopTimer();
  }

  const handleAnalyze = async () => {
    if (!audioBlob) return;
    setRecordingState("analyzing");
    setAnalysis(null);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result as string;
      try {
        const result = await analyzeVoiceRecording({ voiceRecordingDataUri: base64Audio });
        setAnalysis(result);
        onAnalysisComplete(result); // Notify parent component
        setRecordingState("stopped");
      } catch (e) {
        console.error("Analysis failed:", e);
        setError(t('voiceTest.error_analysis_failed'));
        setRecordingState("error");
      }
    };
  };

  const isActionDisabled = recordingState === "requesting" || recordingState === "analyzing";

  const renderRecordButton = () => {
      switch (recordingState) {
          case 'recording':
              return <Button size="icon" className="rounded-full h-20 w-20 relative shadow-lg" onClick={pauseRecording} aria-label="Pause recording"><div className="absolute inset-0 rounded-full bg-red-500/50 animate-pulse"></div><Pause className="h-8 w-8" /></Button>;
          case 'paused':
              return <Button size="icon" className="rounded-full h-20 w-20 relative shadow-lg" onClick={resumeRecording} aria-label="Resume recording"><Play className="h-8 w-8" /></Button>;
          default:
              return <Button size="icon" className="rounded-full h-20 w-20 relative shadow-lg" onClick={startRecording} disabled={isActionDisabled} aria-label="Record voice"><Mic className="h-8 w-8" /></Button>;
      }
  }

  return (
    <Card className="h-full w-full bg-transparent border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="text-primary" />
          {t('voiceTest.title')}
        </CardTitle>
        <div className="flex items-center gap-2">
            <CardDescription>
            {t('voiceTest.test_purpose')}
            </CardDescription>
            <SpeakAloudButton textToSpeak={t('voiceTest.test_purpose')} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6 text-center">
        
        {/* Main Recording Action */}
        <div className="flex items-center gap-4">
            {renderRecordButton()}
          
          {(recordingState === 'idle' || recordingState === 'stopped') && (
            <>
                <div className="text-muted-foreground text-sm">OR</div>
                <Button
                    size="lg"
                    variant="outline"
                    className="h-20 w-20 rounded-full shadow-lg flex flex-col items-center justify-center gap-1"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isActionDisabled}
                    aria-label="Upload audio file"
                >
                    <UploadCloud className="h-7 w-7" />
                    <span className="text-xs">Upload</span>
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="audio/*"
                    disabled={isActionDisabled}
                />
            </>
          )}

          {(recordingState === 'recording' || recordingState === 'paused') && (
            <Button size="icon" variant="destructive" className="rounded-full h-20 w-20 relative shadow-lg" onClick={stopRecording} aria-label="Stop recording">
                <Square className="h-8 w-8" />
            </Button>
          )}
        </div>
        <div className="h-6">
            {(recordingState === 'recording' || recordingState === 'paused') && <p className="text-lg font-mono">{new Date(timer * 1000).toISOString().substr(14, 5)}</p>}
            {(recordingState === 'analyzing' || recordingState === 'requesting') && <Loader2 className="h-5 w-5 animate-spin" />}
        </div>
        
        {/* Results / Analysis Section */}
        {audioUrl && !analysis && (
          <div className="w-full space-y-2">
            <audio src={audioUrl} controls className="w-full" />
            <div className="flex gap-2">
                <Button onClick={handleAnalyze} className="w-full" disabled={recordingState === 'analyzing'}>
                    {recordingState === 'analyzing' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {t('voiceTest.button_analyze')}
                </Button>
                <Button onClick={resetAll} variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
          </div>
        )}
        
        {(error || recordingState === 'denied') && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {analysis && (
          <div className="w-full text-left space-y-4">
             <Alert variant="default" className="bg-blue-50 border-blue-200">
                <User className="h-4 w-4" />
                <AlertTitle>{t('voiceTest.yourSummary')}</AlertTitle>
                <AlertDescription>
                  {analysis.userSummary}
                </AlertDescription>
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

              <p className="text-xs text-muted-foreground text-center px-4">
                {t('voiceTest.source_disclaimer')}
              </p>

              <Button onClick={resetAll} variant="outline" className="w-full">{t('voiceTest.button_reset')}</Button>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
