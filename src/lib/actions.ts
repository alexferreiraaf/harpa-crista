'use server';

import { analyzeHymnLyrics } from '@/ai/flows/hymn-lyric-analysis';
import type { AnalyzeHymnLyricsOutput } from '@/ai/flows/hymn-lyric-analysis';
import { z } from 'zod';

const LyricAnalysisInput = z.object({
  title: z.string().min(1),
  lyrics: z.string().min(1),
});

export async function getLyricAnalysis(
  title: string,
  lyrics: string
): Promise<{ data?: AnalyzeHymnLyricsOutput; error?: string }> {
  try {
    const validatedInput = LyricAnalysisInput.safeParse({ title, lyrics });
    if (!validatedInput.success) {
      return { error: 'Entrada inválida.' };
    }

    const analysis = await analyzeHymnLyrics({
      hymnTitle: validatedInput.data.title,
      lyrics: validatedInput.data.lyrics,
    });
    return { data: analysis };
  } catch (err) {
    console.error(err);
    return { error: 'Ocorreu um erro ao analisar a letra. Tente novamente mais tarde.' };
  }
}
