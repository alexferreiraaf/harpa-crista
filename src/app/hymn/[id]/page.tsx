import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllHymns } from '@/lib/hymns';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import HymnPlayer from './_components/hymn-player';

export default async function HymnDetailPage({ params }: { params: { id: string } }) {
  const hymns = await getAllHymns();
  const currentIndex = hymns.findIndex(h => h.id === params.id);

  if (currentIndex === -1) {
    notFound();
  }

  const hymn = hymns[currentIndex];
  const previousHymnId = currentIndex > 0 ? hymns[currentIndex - 1].id : null;
  const nextHymnId = currentIndex < hymns.length - 1 ? hymns[currentIndex + 1].id : null;

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <header className="sticky top-0 z-10 flex items-center gap-4 px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-sm border-b">
        <Link href="/hymns" className="flex items-center gap-2 text-primary hover:underline font-semibold">
          <ArrowLeft className="h-5 w-5" />
          Voltar para a lista
        </Link>
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
            <div className="whitespace-pre-wrap text-base sm:text-lg leading-relaxed sm:leading-loose space-y-1 font-body">
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
