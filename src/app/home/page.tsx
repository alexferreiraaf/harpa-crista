"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllHymns, type Hymn, getFavoriteHymns } from '@/lib/hymns';
import HymnList from './_components/hymn-list';
import { User, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { observeUser, signOutUser } from '@/lib/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function HomePage() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [favoriteHymnIds, setFavoriteHymnIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = observeUser(async (user) => {
      setUser(user);
      if (user) {
        const favs = await getFavoriteHymns(user.uid);
        setFavoriteHymnIds(favs);
      } else {
        setFavoriteHymnIds([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchHymns() {
      const fetchedHymns = await getAllHymns();
      setHymns(fetchedHymns);
    }
    fetchHymns();
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
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground">
            Harpa Cristã
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-10 w-auto px-2">
                 <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                </Avatar>
                {user && (
                    <div className="text-left hidden md:flex flex-col">
                        <span className="text-xs font-semibold leading-tight">{user.displayName || 'Usuário'}</span>
                    </div>
                )}
                 <span className="sr-only">Abrir menu do usuário</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuLabel>{user.displayName || 'Minha Conta'}</DropdownMenuLabel>
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
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<p>Carregando hinos...</p>}>
            <HymnList hymns={hymns} user={user} favoriteHymnIds={favoriteHymnIds} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
