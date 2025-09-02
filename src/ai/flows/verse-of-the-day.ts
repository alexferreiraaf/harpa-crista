'use server';
/**
 * @fileOverview Flow to generate a verse of the day.
 *
 * - getVerseOfTheDay - A function that returns a verse of the day.
 * - VerseOfTheDay - The return type for the getVerseOfTheDay function.
 */
import { z } from 'zod';

const VerseOfTheDaySchema = z.object({
  text: z.string().describe('The text of the bible verse.'),
  reference: z.string().describe('The reference of the bible verse (e.g., John 3:16).'),
});
export type VerseOfTheDay = z.infer<typeof VerseOfTheDaySchema>;

// Lista de versículos inspiradores para escolher aleatoriamente
const verses = [
    "John+3:16", "Romans+8:28", "Philippians+4:13", "Proverbs+3:5-6", "Jeremiah+29:11",
    "Isaiah+41:10", "Psalm+23:1", "1+Corinthians+10:13", "Romans+12:2", "Galatians+5:22-23"
];


export async function getVerseOfTheDay(): Promise<VerseOfTheDay> {
  try {
    // Escolhe um versículo aleatório da lista
    const randomVerseReference = verses[Math.floor(Math.random() * verses.length)];
    
    // Chama a API pública
    const response = await fetch(`https://bible-api.com/${randomVerseReference}?translation=almeida`);
    
    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    return {
        text: data.text,
        reference: data.reference,
    };
  } catch (error) {
    console.error("Error fetching verse from public API:", error);
    // Retorna um versículo padrão em caso de erro
    return {
        text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
        reference: "João 3:16"
    };
  }
}
