'use server';
/**
 * @fileOverview A maze game performance analysis AI agent.
 *
 * - analyzeMazePerformance - A function that analyzes the time taken to complete the maze.
 * - AnalyzeMazePerformanceInput - The input type for the analyzeMazePerformance function.
 * - AnalyzeMazePerformanceOutput - The return type for the analyzeMazePerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMazePerformanceInputSchema = z.object({
  timeTaken: z
    .number()
    .describe('The time in seconds it took the user to complete the maze.'),
});
export type AnalyzeMazePerformanceInput = z.infer<typeof AnalyzeMazePerformanceInputSchema>;

const MetricSchema = z.object({
  name: z.string().describe("The name of the metric being measured (e.g., 'Planning & Vision', 'Reaction Time')."),
  actualPercentage: z.number().min(0).max(100).describe("The user's score for this metric, represented as a percentage (0-100)."),
  expectedPercentage: z.number().min(0).max(100).describe("The baseline score for a healthy individual for this metric, represented as a percentage (0-100)."),
  explanation: z.string().describe("A brief, one-sentence explanation of what this metric measures."),
});

const AnalyzeMazePerformanceOutputSchema = z.object({
  performanceSummary: z
    .string()
    .describe(
      "A 1-2 sentence analysis of the user's performance, considering the time taken. Provide a gentle, encouraging summary of their visuospatial and planning skills based on their speed."
    ),
  metrics: z.array(MetricSchema).describe("An array of quantitative performance metrics.")
});
export type AnalyzeMazePerformanceOutput = z.infer<typeof AnalyzeMazePerformanceOutputSchema>;

export async function analyzeMazePerformance(input: AnalyzeMazePerformanceInput): Promise<AnalyzeMazePerformanceOutput> {
  return analyzeMazePerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMazePerformancePrompt',
  input: {schema: AnalyzeMazePerformanceInputSchema},
  output: {schema: AnalyzeMazePerformanceOutputSchema},
  prompt: `You are an expert in cognitive assessment. A user has completed a simple maze game. The time taken to complete the maze is a proxy for visuospatial ability, executive function, and reaction time.

A typical time for a healthy adult (50-80) on this specific maze is around 15-30 seconds.

- A time under 15 seconds is very fast (90-100th percentile).
- A time between 15-30 seconds is good (70-89th percentile).
- A time between 31-45 seconds is average and may indicate some hesitation (50-69th percentile).
- A time over 45 seconds is slow and may suggest difficulty with planning or navigation (<50th percentile).

Analyze the user's completion time of {{{timeTaken}}} seconds.

Based on the analysis, provide the following structured output:
1. **performanceSummary**: A gentle, encouraging, and non-clinical 1-2 sentence summary of their performance.
2. **metrics**: An array of 2 key metrics: 'Planning & Vision' and 'Reaction Time'.
   - For each metric, provide an 'actualPercentage' based on their performance percentile, an 'expectedPercentage' (use 80% as a healthy baseline), and a brief 'explanation'.
   - 'Planning & Vision' reflects the overall efficiency of their pathfinding.
   - 'Reaction Time' reflects their speed in navigating the maze. A faster time suggests better reaction.
   - Both metrics are derived from the same 'timeTaken' value.
`,
});

const analyzeMazePerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeMazePerformanceFlow',
    inputSchema: AnalyzeMazePerformanceInputSchema,
    outputSchema: AnalyzeMazePerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
