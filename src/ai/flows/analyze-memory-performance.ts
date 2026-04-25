'use server';
/**
 * @fileOverview A memory game performance analysis AI agent.
 *
 * - analyzeMemoryPerformance - A function that analyzes the moves taken to complete the memory game.
 * - AnalyzeMemoryPerformanceInput - The input type for the analyzeMemoryPerformance function.
 * - AnalyzeMemoryPerformanceOutput - The return type for the analyzeMemoryPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeMemoryPerformanceInputSchema = z.object({
  moves: z.number().describe('The number of moves (pairs flipped) it took the user to complete the game.'),
  pairs: z.number().describe('The number of pairs in the game (e.g., 8 for a 4x4 grid).'),
});
export type AnalyzeMemoryPerformanceInput = z.infer<typeof AnalyzeMemoryPerformanceInputSchema>;

const MetricSchema = z.object({
  name: z.string().describe("The name of the metric being measured (e.g., 'Working Memory', 'Attention Span')."),
  actualPercentage: z.number().min(0).max(100).describe("The user's score for this metric, represented as a percentage (0-100)."),
  expectedPercentage: z.number().min(0).max(100).describe("The baseline score for a healthy individual for this metric, represented as a percentage (0-100)."),
  explanation: z.string().describe("A brief, one-sentence explanation of what this metric measures."),
});

const AnalyzeMemoryPerformanceOutputSchema = z.object({
  performanceSummary: z
    .string()
    .describe(
      "A 1-2 sentence analysis of the user's performance, considering the number of moves. Provide a gentle, encouraging summary of their working memory and attention."
    ),
  metrics: z.array(MetricSchema).describe("An array of quantitative performance metrics.")
});
export type AnalyzeMemoryPerformanceOutput = z.infer<typeof AnalyzeMemoryPerformanceOutputSchema>;

export async function analyzeMemoryPerformance(input: AnalyzeMemoryPerformanceInput): Promise<AnalyzeMemoryPerformanceOutput> {
  return analyzeMemoryPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMemoryPerformancePrompt',
  input: {schema: AnalyzeMemoryPerformanceInputSchema},
  output: {schema: AnalyzeMemoryPerformanceOutputSchema},
  prompt: `You are an expert in cognitive assessment. A user has completed a card pair matching game. This game tests working memory, visual memory, and attention.

The game had {{{pairs}}} pairs of cards.
The user completed it in {{{moves}}} moves (pair flips).

The ideal number of moves is equal to the number of pairs. Extra moves indicate incorrect matches.
- Performance for {{{pairs}}} pairs:
  - Excellent (90-100%): {{{pairs}}} to {{{pairs}}}+2 moves
  - Good (70-89%): {{{pairs}}}+3 to {{{pairs}}}+5 moves
  - Average (50-69%): {{{pairs}}}+6 to {{{pairs}}}+8 moves
  - Below Average (<50%): >{{{pairs}}}+8 moves

Analyze the user's performance.

Based on the analysis, provide the following structured output:
1.  **performanceSummary**: A gentle, encouraging, and non-clinical 1-2 sentence summary of their performance.
2.  **metrics**: An array of 2 key metrics: 'Working Memory' and 'Attention Span'.
    *   For each metric, provide an 'actualPercentage' based on their performance percentile (derived from moves vs. pairs), an 'expectedPercentage' (use 85% as a healthy baseline), and a brief 'explanation'.
    *   'Working Memory' reflects their ability to hold and recall card locations.
    *   'Attention Span' reflects their focus during the task.
    *   Both metrics are derived from the same 'moves' and 'pairs' values.
`,
});

const analyzeMemoryPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeMemoryPerformanceFlow',
    inputSchema: AnalyzeMemoryPerformanceInputSchema,
    outputSchema: AnalyzeMemoryPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
