import { getAllHymns } from '@/lib/hymns';
import HymnList from './_components/hymn-list';
import { UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function HomePage() {
  const hymns = await getAllHymns();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground">
            Harpa Cristã
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <UserCircle className="h-6 w-6" />
          </Button>
        </div>
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
