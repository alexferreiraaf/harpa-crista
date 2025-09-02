import { getAllHymns } from '@/lib/hymns';
import HymnList from './_components/hymn-list';
import { Music, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

export default function HomePage() {
  const hymns = getAllHymns();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground">
            Harpa Cristã
          </h1>
        </div>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <Suspense>
            <HymnList hymns={hymns} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
