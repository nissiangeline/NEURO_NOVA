import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-voice-recording.ts';
import '@/ai/flows/analyze-maze-performance.ts';
import '@/ai/flows/analyze-stroop-performance.ts';
import '@/ai/flows/analyze-memory-performance.ts';
import '@/ai/flows/calculate-risk-score.ts';
import '@/ai/flows/text-to-speech.ts';
