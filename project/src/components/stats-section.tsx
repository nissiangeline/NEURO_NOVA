
"use client"

import StatCard from "./stat-card";
import { useTranslation } from "react-i18next";
import DementiaStatsChart from "./dementia-stats-chart";
import statsData from "@/lib/dementia-stats.json";

export default function StatsSection() {
    const { t } = useTranslation();

    const { stats, source } = statsData;

    return (
        <section className="container mx-auto py-16 sm:py-24 px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold">{t('stats.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
              {t('stats.subtitle')}
            </p>
          </div>
             <div className="grid gap-8 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <StatCard
                        key={stat.titleKey}
                        title={t(stat.titleKey)}
                        value={stat.value}
                        description={t(stat.descKey)}
                        icon={stat.icon}
                        color={stat.color}
                        className="card-float text-gray-800"
                        style={{animationDelay: `${index * 0.2}s`}}
                    />
                ))}
            </div>

            <DementiaStatsChart />
            
            <p className="text-center text-xs text-muted-foreground mt-8">
              {t(source)}
            </p>
        </section>
    )
}
