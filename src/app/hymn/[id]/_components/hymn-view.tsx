"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';
import type { Hymn } from '@/lib/hymns';
import HymnPlayer from './hymn-player';

const fontSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
const leadingSizes = ['leading-relaxed', 'leading-relaxed', 'leading-loose', 'leading-loose', 'leading-loose'];


export default function HymnView({ hymn, previousHymnId, nextHymnId }: { hymn: Hymn; previousHymnId: string | null; nextHymnId: string | null; }) {
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // 'text-lg' as default

  const increaseFontSize = () => {
    setFontSizeIndex((prevIndex) => Math.min(prevIndex + 1, fontSizes.length - 1));
  };

  const decreaseFontSize = () => {
    setFontSizeIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };


  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-sm border-b">
        <Link href="/hymns" className="flex items-center gap-2 text-primary hover:underline font-semibold">
          <ArrowLeft className="h-5 w-5" />
          Voltar para a lista
        </Link>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={decreaseFontSize} disabled={fontSizeIndex === 0} aria-label="Diminuir fonte">
                <ZoomOut className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={increaseFontSize} disabled={fontSizeIndex === fontSizes.length - 1} aria-label="Aumentar fonte">
                <ZoomIn className="h-5 w-5" />
            </Button>
        </div>
      </header>
      
      <main className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold mb-2">{hymn.title}</h1>
          <p className="text-md sm:text-lg text-muted-foreground">Hino Nº {hymn.number}</p>
        </div>

        <div className="mb-6 md:mb-8">
           <HymnPlayer 
             audioUrl={hymn.audioUrl} 
             instrumentalUrl={hymn.instrumentalUrl}
             previousHymnId={previousHymnId}
             nextHymnId={nextHymnId}
            />
        </div>

        <Card className="shadow-lg h-full">
          <CardContent className="p-4 sm:p-6">
            <div className={`whitespace-pre-wrap space-y-1 font-body ${fontSizes[fontSizeIndex]} ${leadingSizes[fontSizeIndex]}`}>
              {hymn.lyrics.map((line, index) => (
                <p key={index} className={line.startsWith('[') && line.endsWith(']') ? 'font-bold mt-4' : ''}>
                  {line || ' '}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
