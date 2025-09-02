'use server';
/**
 * @fileOverview Analyzes the lyrics of a hymn to provide insights and meaning.
 *
 * - analyzeHymnLyrics - A function that handles the hymn lyric analysis process.
 * - AnalyzeHymnLyricsInput - The input type for the analyzeHymnLyrics function.
 * - AnalyzeHymnLyricsOutput - The return type for the analyzeHymnLyrics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeHymnLyricsInputSchema = z.object({
  hymnTitle: z.string().describe('The title of the hymn.'),
  lyrics: z.string().describe('The lyrics of the hymn.'),
});
export type AnalyzeHymnLyricsInput = z.infer<typeof AnalyzeHymnLyricsInputSchema>;

const AnalyzeHymnLyricsOutputSchema = z.object({
  overallTheme: z.string().describe('The overall theme or message of the hymn.'),
  lyricInsights: z.array(
    z.object({
      lyricLine: z.string().describe('A line from the hymn lyrics.'),
      analysis: z.string().describe('AI-generated insights and meaning of the lyric line.'),
    })
  ).describe('An array of lyric lines with their corresponding analysis.'),
});
export type AnalyzeHymnLyricsOutput = z.infer<typeof AnalyzeHymnLyricsOutputSchema>;

export async function analyzeHymnLyrics(input: AnalyzeHymnLyricsInput): Promise<AnalyzeHymnLyricsOutput> {
  return analyzeHymnLyricsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHymnLyricsPrompt',
  input: {schema: AnalyzeHymnLyricsInputSchema},
  output: {schema: AnalyzeHymnLyricsOutputSchema},
  prompt: `You are an expert in analyzing hymn lyrics to provide insightful interpretations.

Analyze the following hymn lyrics and provide the overall theme and line-by-line analysis:

Hymn Title: {{{hymnTitle}}}
Lyrics: {{{lyrics}}}

Format your response as follows:
Overall Theme: [Overall theme of the hymn]
Lyric Insights:
[
  {
    "lyricLine": "[A line from the hymn]",
    "analysis": "[Your insightful analysis of the lyric line]"
  },
  ...
]`,}
);

const analyzeHymnLyricsFlow = ai.defineFlow(
  {
    name: 'analyzeHymnLyricsFlow',
    inputSchema: AnalyzeHymnLyricsInputSchema,
    outputSchema: AnalyzeHymnLyricsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
