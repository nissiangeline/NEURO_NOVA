'use server';

import { z } from 'zod';

const CalculateRiskScoreInputSchema = z.object({
  userContext: z.object({
    age: z.number().optional(),
    gender: z.string().optional(),
  }),

  scores: z.object({
    voiceScore: z.number(),
    mazeScore: z.number(),
    stroopScore: z.number(),
    memoryScore: z.number(),
  }),
});

export type CalculateRiskScoreInput =
  z.infer<typeof CalculateRiskScoreInputSchema>;

const CalculateRiskScoreOutputSchema = z.object({
  voiceScore: z.number(),
  mazeScore: z.number(),
  stroopScore: z.number(),
  memoryScore: z.number(),
  finalRiskScore: z.number(),
  riskLevel: z.enum([
    'Low Risk',
    'Medium Risk',
    'High Risk',
  ]),
  summary: z.string(),
});

export type CalculateRiskScoreOutput =
  z.infer<typeof CalculateRiskScoreOutputSchema>;

export async function calculateRiskScore(
  input: CalculateRiskScoreInput
): Promise<CalculateRiskScoreOutput> {

  const {
    voiceScore,
    mazeScore,
    stroopScore,
    memoryScore,
  } = input.scores;

  // 🔥 REAL WEIGHTED SCORE
  const finalRiskScore = Math.round(
    voiceScore * 0.4 +
    memoryScore * 0.35 +
    stroopScore * 0.2 +
    mazeScore * 0.05
  );

  // 🔥 RISK LEVEL
  let riskLevel:
    | 'Low Risk'
    | 'Medium Risk'
    | 'High Risk';

  if (finalRiskScore >= 80) {

    riskLevel = 'Low Risk';

  } else if (finalRiskScore >= 50) {

    riskLevel = 'Medium Risk';

  } else {

    riskLevel = 'High Risk';
  }

  // 🔥 DYNAMIC SUMMARY
  let summary = '';

  if (riskLevel === 'Low Risk') {

    summary =
      'The overall cognitive screening results appear stable and healthy. The user demonstrated strong performance across memory, attention, speech fluency, and visuospatial tasks. Maintaining mentally stimulating activities, healthy sleep, and regular wellness habits is encouraged.';

  } else if (riskLevel === 'Medium Risk') {

    summary =
      'The screening detected mild variations in cognitive performance patterns, particularly in attention consistency or memory recall. While this is not a diagnosis, maintaining cognitive exercises, stress management, and regular health monitoring may be beneficial.';

  } else {

    summary =
      'The screening identified lower performance patterns across multiple cognitive tasks. This does not confirm any medical condition, but seeking guidance from a qualified healthcare professional may help provide additional clarity and reassurance.';
  }

  return {

    voiceScore,
    mazeScore,
    stroopScore,
    memoryScore,

    finalRiskScore,

    riskLevel,

    summary,
  };
}