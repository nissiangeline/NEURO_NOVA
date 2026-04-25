
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import SplitText from "@/components/split-text";

export default function AboutDementiaPage() {
  const backgroundUrl = PlaceHolderImages.find(img => img.id === 'ocean_view');

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {backgroundUrl && (
        <Image
          src={backgroundUrl.imageUrl}
          alt={backgroundUrl.description}
          fill
          className="object-cover"
          data-ai-hint={backgroundUrl.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto p-4 sm:p-8 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <Link href="/dashboard" passHref>
            <Button variant="outline" className="bg-white/80 hover:bg-white">
              <MoveLeft className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </header>

        <main className="space-y-8">
          <div className="text-center mb-12">
            <SplitText
              text="Understanding Dementia"
              tag="h1"
              className="text-4xl sm:text-5xl font-bold text-primary mb-4"
              splitType="words"
              delay={100}
            />
            <p className="text-lg text-muted-foreground">
              A journey of calm, connection, and understanding.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary/90">
                What is Dementia?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Dementia is not a single disease — it’s a group of conditions
                that affect memory, thinking, and social abilities. It’s more
                common than most people realize, and it doesn’t mean a person
                is broken. Life can still be filled with gentle moments and
                warmth.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-accent/20 border-accent/50 text-center">
            <CardContent className="p-6">
              <p className="text-accent-foreground/80 text-lg">
                Forgetfulness doesn’t mean failure. You’re not alone, and
                you’re not broken.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary/90">
                Expert Insight
              </CardTitle>
              <p className="text-muted-foreground !mt-0">
                Dr. Riyasath Ali Syed, MD
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Every mind is unique. With early awareness and compassionate
                tools, we can navigate cognitive changes with clarity and
                grace. I’m here to help you understand yours.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50/80 rounded-xl p-6 shadow-md text-center mt-10 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-primary mb-2">Want to learn more?</h3>
            <div className="flex flex-col gap-3">
              <a href="https://www.who.int/news-room/fact-sheets/detail/dementia" target="_blank" rel="noopener noreferrer" className="text-primary/90 hover:underline">
                WHO Dementia Guide 🌍
              </a>
              <Link href="/dashboard#screening" className="text-primary/90 hover:underline">
                Try Neuro Nova’s Free Screening 🧠
              </Link>
              <Link href="/dashboard#expert" className="text-primary/90 hover:underline">
                Meet Dr. Syed 🩺
              </Link>
            </div>
          </Card>

        </main>
      </div>
    </div>
  );
}
