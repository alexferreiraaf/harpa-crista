'use server';
/**
 * @fileOverview Flow to generate a verse of the day.
 *
 * - getVerseOfTheDay - A function that returns a verse of the day.
 * - VerseOfTheDay - The return type for the getVerseOfTheDay function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const VerseOfTheDaySchema = z.object({
  text: z.string().describe('The text of the bible verse.'),
  reference: z.string().describe('The reference of the bible verse (e.g., John 3:16).'),
});
export type VerseOfTheDay = z.infer<typeof VerseOfTheDaySchema>;

const verseOfTheDayPrompt = ai.definePrompt({
  name: 'verseOfTheDayPrompt',
  output: { schema: VerseOfTheDaySchema },
  prompt: `
    Você é um assistente que fornece versículos bíblicos inspiradores.
    Gere um versículo do dia que seja edificante e encorajador.
    Forneça o texto do versículo e sua referência.
  `,
});

const getVerseOfTheDayFlow = ai.defineFlow(
  {
    name: 'getVerseOfTheDayFlow',
    outputSchema: VerseOfTheDaySchema,
  },
  async () => {
    const { output } = await verseOfTheDayPrompt();
    return output!;
  }
);

export async function getVerseOfTheDay(): Promise<VerseOfTheDay> {
  return getVerseOfTheDayFlow();
}
