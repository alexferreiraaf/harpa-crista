
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Heart,
  LogIn,
  LogOut,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { observeUser, signOutUser } from '@/lib/auth';
import { getVerseOfTheDay, VerseOfTheDay } from '@/ai/flows/verse-of-the-day';

function VerseOfTheDayCard({
  verse,
  loading,
}: {
  verse: VerseOfTheDay | null;
  loading: boolean;
}) {
  return (
    <Card className="bg-primary/5 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <BookOpen className="h-6 w-6" />
          <span>Versículo do Dia</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <p className="animate-pulse bg-muted-foreground/20 rounded-md h-6 w-3/4"></p>
            <p className="animate-pulse bg-muted-foreground/20 rounded-md h-5 w-1/4"></p>
          </div>
        ) : verse ? (
          <blockquote className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              &ldquo;{verse.text}&rdquo;
            </p>
            <cite className="block text-right text-muted-foreground not-italic">
              &mdash; {verse.reference}
            </cite>
          </blockquote>
        ) : (
          <p className="text-muted-foreground">
            Não foi possível carregar o versículo do dia.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function NavigationButtons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Link href="/hymns" passHref>
        <Button
          variant="outline"
          className="w-full h-24 text-lg flex-col gap-2"
        >
          <BookOpen className="h-8 w-8" />
          <span>Todos os Hinos</span>
        </Button>
      </Link>
      <Link href="/favorites" passHref>
        <Button
          variant="outline"
          className="w-full h-24 text-lg flex-col gap-2"
        >
          <Heart className="h-8 w-8" />
          <span>Hinos Favoritos</span>
        </Button>
      </Link>
    </div>
  );
}

export default function HomePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [verse, setVerse] = useState<VerseOfTheDay | null>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);
  const [verseError, setVerseError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = observeUser(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchVerse() {
      try {
        setLoadingVerse(true);
        const dailyVerse = await getVerseOfTheDay();
        setVerse(dailyVerse);
      } catch (error) {
        console.error('Error fetching verse of the day:', error);
        setVerse(null);
        setVerseError(true);
      } finally {
        setLoadingVerse(false);
      }
    }
    fetchVerse();
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    router.push('/');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-end px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-10 w-auto px-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.photoURL || undefined}
                    alt={user?.displayName || 'User'}
                  />
                  <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                </Avatar>
                {user && (
                  <div className="text-left hidden md:flex flex-col">
                    <span className="text-xs font-semibold leading-tight">
                      {user.displayName || 'Usuário'}
                    </span>
                  </div>
                )}
                <span className="sr-only">Abrir menu do usuário</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuLabel>
                    {user.displayName || 'Minha Conta'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/" passHref>
                    <DropdownMenuItem>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-8">
           <div className="flex flex-col items-center justify-center pt-4 pb-4 text-center">
            <Logo className="h-24 w-24 text-primary mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">
              Harpa Cristã
            </h1>
          </div>
          {!verseError && <VerseOfTheDayCard verse={verse} loading={loadingVerse} />}
          <NavigationButtons />
        </div>
      </main>
    </div>
  );
}
