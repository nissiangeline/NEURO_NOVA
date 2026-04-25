'use server';
/**
 * @fileOverview A Stroop test performance analysis AI agent.
 *
 * - analyzeStroopPerformance - A function that analyzes the score and time taken to complete the Stroop test.
 * - AnalyzeStroopPerformanceInput - The input type for the analyzeStroopPerformance function.
 * - AnalyzeStroopPerformanceOutput - The return type for the analyzeStroopPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeStroopPerformanceInputSchema = z.object({
  score: z.number().describe('The number of correct answers out of the total.'),
  totalRounds: z.number().describe('The total number of rounds in the test.'),
  timeTaken: z.number().describe('The time in seconds it took the user to complete the test.'),
});
export type AnalyzeStroopPerformanceInput = z.infer<typeof AnalyzeStroopPerformanceInputSchema>;

const MetricSchema = z.object({
  name: z.string().describe("The name of the metric being measured (e.g., 'Selective Attention', 'Processing Speed')."),
  actualPercentage: z.number().min(0).max(100).describe("The user's score for this metric, represented as a percentage (0-100)."),
  expectedPercentage: z.number().min(0).max(100).describe("The baseline score for a healthy individual for this metric, represented as a percentage (0-100)."),
  explanation: z.string().describe("A brief, one-sentence explanation of what this metric measures."),
});

const AnalyzeStroopPerformanceOutputSchema = z.object({
  performanceSummary: z
    .string()
    .describe(
      "A 1-2 sentence analysis of the user's performance, considering their score and time. Provide a gentle, encouraging summary of their selective attention and processing speed."
    ),
  metrics: z.array(MetricSchema).describe("An array of quantitative performance metrics.")
});
export type AnalyzeStroopPerformanceOutput = z.infer<typeof AnalyzeStroopPerformanceOutputSchema>;

export async function analyzeStroopPerformance(input: AnalyzeStroopPerformanceInput): Promise<AnalyzeStroopPerformanceOutput> {
  return analyzeStroopPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeStroopPerformancePrompt',
  input: {schema: AnalyzeStroopPerformanceInputSchema},
  output: {schema: AnalyzeStroopPerformanceOutputSchema},
  prompt: `You are an expert in cognitive assessment. A user has completed a Stroop test. The test measures selective attention, cognitive flexibility, and processing speed.

The test had {{{totalRounds}}} rounds.
User Score: {{{score}}}/{{{totalRounds}}}
Time Taken: {{{timeTaken}}} seconds.

Typical performance for a healthy adult (50-80):
- Score: 8-10 out of 10. (Accuracy > 80%)
- Time: 15-25 seconds for 10 rounds. (High processing speed)

Analyze the user's score and time.

Based on the analysis, provide the following structured output:
1.  **performanceSummary**: A gentle, encouraging, and non-clinical 1-2 sentence summary of their performance.
2.  **metrics**: An array of 2 key metrics: 'Selective Attention' (based on score) and 'Processing Speed' (based on time).
    *   For 'Selective Attention', the 'actualPercentage' is the user's score percentage. The 'expectedPercentage' is 90%.
    *   For 'Processing Speed', estimate a percentage. <20s is excellent (90-100%), 20-30s is good (70-89%), >30s is average or slow (<70%). The 'expectedPercentage' is 80%.
    *   Provide a brief 'explanation' for each metric.
`,
});

const analyzeStroopPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeStroopPerformanceFlow',
    inputSchema: AnalyzeStroopPerformanceInputSchema,
    outputSchema: AnalyzeStroopPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
