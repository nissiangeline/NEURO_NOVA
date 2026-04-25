"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function ExpertSection() {
  const { t } = useTranslation();
  const expertImage = PlaceHolderImages.find((img) => img.id === 'expert');

  return (
    <section className="container mx-auto max-w-4xl">
      <Card className="bg-white/70 border-gray-200 shadow-xl overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center">
          {expertImage && (
            <div className="md:w-1/3">
              <Image
                src={expertImage.imageUrl}
                alt={expertImage.description}
                width={400}
                height={600}
                data-ai-hint={expertImage.imageHint}
                className="object-cover h-full w-full"
              />
            </div>
          )}
          <div className="md:w-2/3">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-foreground/90">
                {t('expert.title')}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t('expert.name')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                {t('expert.bio')}
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </section>
  );
}
