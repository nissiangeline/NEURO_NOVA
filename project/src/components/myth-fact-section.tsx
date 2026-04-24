"use client";

import FlipCard from "./flip-card";
import { useTranslation } from "react-i18next";
import { Card } from "./ui/card";

export default function MythFactSection() {
  const { t } = useTranslation();

  const myths = [
    {
      id: 1,
      front: t('mythFact.myth1_front'),
      back: t('mythFact.myth1_back'),
    },
    {
      id: 2,
      front: t('mythFact.myth2_front'),
      back: t('mythFact.myth2_back'),
    },
    {
      id: 3,
      front: t('mythFact.myth3_front'),
      back: t('mythFact.myth3_back'),
    },
    {
      id: 4,
      front: t('mythFact.myth4_front'),
      back: t('mythFact.myth4_back'),
    },
  ];

  return (
    <section className="container mx-auto px-4">
        <Card className="bg-white/60 backdrop-blur-sm p-8 md:p-12 border-gray-200">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold">{t('mythFact.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          {t('mythFact.subtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {myths.map((myth) => (
          <FlipCard
            key={myth.id}
            front={<p className="text-lg font-semibold">{myth.front}</p>}
            back={<p className="text-lg font-semibold">{myth.back}</p>}
          />
        ))}
      </div>
      </Card>
    </section>
  );
}
