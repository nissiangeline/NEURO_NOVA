
'use server';
/**
 * @fileOverview A flow to generate a summary and recommendations based on a final dementia risk score.
 *
 * - calculateRiskScore - A function that returns a summary and recommendations.
 * - CalculateRiskScoreInput - The input type for the calculateRiskscore function.
 * - CalculateRiskScoreOutput - The return type for the calculateRiskscore function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CalculateRiskScoreInputSchema = z.object({
  userContext: z.object({
    age: z.number().optional().describe('Age of the user.'),
    gender: z.string().optional().describe('Gender of the user.'),
  }),
  scores: z.object({
    voiceScore: z.number().min(0).max(100).describe("User's performance score on the voice analysis test (0-100). This reflects verbal fluency, pause frequency, and lexical diversity."),
    mazeScore: z.number().min(0).max(100).describe("User's performance score on the maze game (0-100). This reflects planning, visuospatial skills, and reaction time."),
    stroopScore: z.number().min(0).max(100).describe("User's performance score on the Stroop test (0-100). This reflects selective attention and processing speed."),
    memoryScore: z.number().min(0).max(100).describe("User's performance score on the memory game (0-100). This reflects working memory and attention span."),
  }),
});
export type CalculateRiskScoreInput = z.infer<
  typeof CalculateRiskScoreInputSchema
>;

const CalculateRiskScoreOutputSchema = z.object({
  voiceScore: z.number().describe("The user's voice score, from 0-100."),
  mazeScore: z.number().describe("The user's maze score, from 0-100."),
  stroopScore: z.number().describe("The user's stroop score, from 0-100."),
  memoryScore: z.number().describe("The user's memory score, from 0-100."),
  finalRiskScore: z.number().describe('The final, calculated cognitive score, from 0 to 100.'),
  riskLevel: z.enum(["Low Risk", "Medium Risk", "High Risk"]).describe("The final risk classification."),
  summary: z.string().describe("A calm, supportive explanation in plain English."),
});
export type CalculateRiskScoreOutput = z.infer<
  typeof CalculateRiskScoreOutputSchema
>;

export async function calculateRiskScore(
  input: CalculateRiskScoreInput
): Promise<CalculateRiskScoreOutput> {
  return calculateRiskScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateRiskScorePrompt',
  input: { schema: CalculateRiskScoreInputSchema },
  output: { schema: CalculateRiskScoreOutputSchema },
  prompt: `You are a compassionate cognitive wellness companion. Based on the user's performance in four cognitive tasks — voice fluency, maze navigation, memory recall, and Stroop test — generate a short, supportive summary of their current cognitive patterns.

Do NOT use alarming or diagnostic language. This is a screening tool, not a medical evaluation. Your tone should be gentle, stigma-free, and encouraging.

User context to consider:
- Age: {{{userContext.age}}}
- Gender: {{{userContext.gender}}}

The final score is a weighted average of the four input scores:
- voiceScore ({{{scores.voiceScore}}})
- mazeScore ({{{scores.mazeScore}}})
- memoryScore ({{{scores.memoryScore}}})
- stroopScore ({{{scores.stroopScore}}})

Calculate the final weighted score. The weights are: voice (40%), memory (35%), stroop (20%), and maze (5%).
The finalRiskScore should be the calculated weighted average.

Classify the risk level based on the final score:
- >= 80: "Low Risk"
- >= 50: "Medium Risk"
- < 50: "High Risk"

Reference benchmarks from the LASI-DAD study when appropriate. If the user’s scores are stable or improving, highlight that positively. If scores are lower, offer reassurance and suggest gentle next steps like staying mentally active or consulting a professional.

Return your response in the structured JSON format defined by the output schema.
`,
});

const calculateRiskScoreFlow = ai.defineFlow(
  {
    name: 'calculateRiskScoreFlow',
    inputSchema: CalculateRiskScoreInputSchema,
    outputSchema: CalculateRiskScoreOutputSchema,
  },
  async (input) => {
    // Validate inputs - if any score is missing, we cannot proceed.
    if (
        input.scores.voiceScore === undefined ||
        input.scores.mazeScore === undefined ||
        input.scores.stroopScore === undefined ||
        input.scores.memoryScore === undefined
    ) {
        throw new Error("One or more cognitive scores are missing. Cannot calculate final risk score.");
    }
    
    const { output } = await prompt(input);
    return output!;
  }
);
