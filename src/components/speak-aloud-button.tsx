"use client";

import { useState } from "react";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { Button } from "./ui/button";
import { Loader2, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SpeakAloudButtonProps = {
  textToSpeak: string;
};

export default function SpeakAloudButton({ textToSpeak }: SpeakAloudButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSpeak = async () => {
    if (!textToSpeak) return;
    setIsLoading(true);
    try {
      const audioDataUri = await textToSpeech(textToSpeak);
      const audio = new Audio(audioDataUri);
      audio.play();
    } catch (error) {
      console.error("Text-to-speech failed:", error);
      toast({
        variant: "destructive",
        title: "Audio Error",
        description: "Could not play audio. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSpeak}
      disabled={isLoading}
      aria-label="Read text aloud"
      className="h-6 w-6"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
}
