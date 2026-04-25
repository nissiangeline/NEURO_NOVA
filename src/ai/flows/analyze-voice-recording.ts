
'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing voice recordings to detect cognitive indicators.
 *
 * - analyzeVoiceRecording - A function that takes a voice recording as input and returns an analysis of cognitive indicators.
 * - AnalyzeVoiceRecordingInput - The input type for the analyzeVoiceRecording function.
 * - AnalyzeVoiceRecordingOutput - The return type for the analyzeVoiceRecording function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeVoiceRecordingInputSchema = z.object({
  voiceRecordingDataUri: z
    .string()
    .describe(
      'A voice recording as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  taskDescription: z.string().optional().describe('Optional description of the task performed during the voice recording, e.g., reading a passage or describing a picture.'),
});
export type AnalyzeVoiceRecordingInput = z.infer<typeof AnalyzeVoiceRecordingInputSchema>;


const MetricSchema = z.object({
    name: z.string().describe("The name of the metric being measured (e.g., 'Pause Frequency', 'Speech Rate', 'Word Choice Variety')."),
    actualPercentage: z.number().min(0).max(100).describe("The user's score for this metric, represented as a percentage (0-100)."),
    expectedPercentage: z.number().min(0).max(100).describe("The baseline score for a healthy individual for this metric, represented as a percentage (0-100)."),
    explanation: z.string().describe("A brief, one-sentence explanation of what this metric measures and why it's relevant for cognitive health."),
});

const AnalyzeVoiceRecordingOutputSchema = z.object({
  userSummary: z.string().describe("A very concise, objective summary of the user's overall speech patterns, strictly limited to one or two sentences."),
  metrics: z.array(MetricSchema).describe("An array of quantitative speech analysis metrics."),
});

export type AnalyzeVoiceRecordingOutput = z.infer<typeof AnalyzeVoiceRecordingOutputSchema>;

export async function analyzeVoiceRecording(input: AnalyzeVoiceRecordingInput): Promise<AnalyzeVoiceRecordingOutput> {
  return analyzeVoiceRecordingFlow(input);
}

const analyzeVoiceRecordingPrompt = ai.definePrompt({
  name: 'analyzeVoiceRecordingPrompt',
  input: {schema: AnalyzeVoiceRecordingInputSchema},
  output: {schema: AnalyzeVoiceRecordingOutputSchema},
  prompt: `You are an expert in analyzing voice recordings for early indicators of cognitive decline. Your task is to perform a quantitative analysis of the provided audio.

IMPORTANT: Differentiate between common speech impediments (like stuttering or a lisp) and patterns more specifically associated with cognitive decline (like word-finding difficulty, loss of coherence, or unusual pauses). Do not flag normal speech variations as potential issues.

Analyze the following voice recording:

Voice Recording: {{media url=voiceRecordingDataUri}}
Task Description (if provided): {{{taskDescription}}}

Based on your analysis, provide the following structured output:

1.  **userSummary**: A very concise, objective summary of the user's speech patterns observed in the recording. This summary MUST be strictly limited to one or two sentences at most.
2.  **metrics**: An array of exactly 4-5 key metrics. For each metric:
    *   **name**: The name of the metric (e.g., 'Pause Frequency', 'Speech Rate', 'Word Finding Events', 'Pitch Variability').
    *   **actualPercentage**: Your assessment of the user's performance on this metric, scored as a percentage from 0 (very poor) to 100 (excellent).
    *   **expectedPercentage**: The typical baseline percentage for a healthy adult speaker without cognitive issues. This is the benchmark to compare against. The difference between actual and expected highlights potential flags.
    *   **explanation**: A brief, one-sentence explanation of what this metric measures.

Your analysis must be quantitative and presented in the specified JSON format.
`,
});

const analyzeVoiceRecordingFlow = ai.defineFlow(
  {
    name: 'analyzeVoiceRecordingFlow',
    inputSchema: AnalyzeVoiceRecordingInputSchema,
    outputSchema: AnalyzeVoiceRecordingOutputSchema,
  },
  async input => {
    const {output} = await analyzeVoiceRecordingPrompt(input);
    return output!;
  }
);
