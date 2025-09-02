"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Sparkles, LoaderCircle } from 'lucide-react';
import { getLyricAnalysis } from '@/lib/actions';
import type { AnalyzeHymnLyricsOutput } from '@/ai/flows/hymn-lyric-analysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LyricAnalysis({ hymnTitle, lyrics }: { hymnTitle: string; lyrics: string[] }) {
  const [analysis, setAnalysis] = useState<AnalyzeHymnLyricsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const fullLyrics = lyrics.filter(line => !line.includes('[Coro]')).join('\n');
    const result = await getLyricAnalysis(hymnTitle, fullLyrics);

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setAnalysis(result.data);
    }

    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-accent" />
          Análise da Letra com IA
        </CardTitle>
        <CardDescription>
          Descubra o significado e a profundidade deste hino.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!analysis && !isLoading && !error && (
            <div className="flex flex-col items-center justify-center text-center gap-4 p-4 border-dashed border-2 rounded-lg bg-background">
                <p className="text-muted-foreground">Clique no botão para gerar uma análise com inteligência artificial.</p>
                 <Button onClick={handleAnalyze} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analisar Letra
                </Button>
            </div>
        )}
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Analisando... Por favor, aguarde.</p>
          </div>
        )}

        {error && (
            <Alert variant="destructive">
                <AlertTitle>Ocorreu um Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                <Button onClick={handleAnalyze} variant="outline" className="mt-4">
                  Tentar Novamente
                </Button>
            </Alert>
        )}

        {analysis && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-primary">Tema Geral</h3>
                <p>{analysis.overallTheme}</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
                <h3 className="font-bold text-lg my-2">Análise por Verso</h3>
                {analysis.lyricInsights.map((insight, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left hover:no-underline">{insight.lyricLine}</AccordionTrigger>
                        <AccordionContent className="text-base">
                          {insight.analysis}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

             <Button onClick={handleAnalyze} variant="outline" className="w-full mt-4">
                <Sparkles className="mr-2 h-4 w-4" />
                Analisar Novamente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
