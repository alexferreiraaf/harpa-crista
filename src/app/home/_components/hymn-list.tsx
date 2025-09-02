"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import type { Hymn } from '@/lib/hymns';
import { Search, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { User as FirebaseUser } from 'firebase/auth';
import { addFavoriteHymn, removeFavoriteHymn } from '@/lib/hymns';
import { useToast } from '@/hooks/use-toast';


export default function HymnList({ 
  hymns,
  user,
  favoriteHymnIds: initialFavoriteHymnIds = [],
}: { 
  hymns: Hymn[];
  user: FirebaseUser | null;
  favoriteHymnIds?: string[];
}) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteHymnIds, setFavoriteHymnIds] = useState(new Set(initialFavoriteHymnIds));
  
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    setFavoriteHymnIds(new Set(initialFavoriteHymnIds));
  }, [initialFavoriteHymnIds]);


  const filteredHymns = useMemo(() => {
    if (!searchTerm) {
      return hymns;
    }
    return hymns.filter(
      (hymn) =>
        hymn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hymn.number.toString().includes(searchTerm)
    );
  }, [searchTerm, hymns]);
  
  const handleFavoriteClick = async (e: React.MouseEvent, hymnId: string) => {
    e.preventDefault(); // Impede a navegação ao clicar no ícone
    e.stopPropagation();

    if (!user || user.isAnonymous) {
      toast({
        title: 'Faça login para favoritar',
        description: 'Você precisa estar logado para salvar seus hinos favoritos.',
        variant: 'destructive',
      });
      return;
    }

    const newFavoriteIds = new Set(favoriteHymnIds);
    if (favoriteHymnIds.has(hymnId)) {
      await removeFavoriteHymn(user.uid, hymnId);
      newFavoriteIds.delete(hymnId);
    } else {
      await addFavoriteHymn(user.uid, hymnId);
      newFavoriteIds.add(hymnId);
    }
    setFavoriteHymnIds(newFavoriteIds);
  };


  return (
    <>
      <div className="relative mb-4 md:mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Pesquisar hino por nome ou número..."
          className="w-full pl-12 h-12 md:h-14 text-base md:text-lg rounded-full shadow-lg border-2 border-transparent focus-visible:ring-accent focus-visible:border-accent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)] rounded-lg">
        <div className="space-y-2 pr-2">
          {filteredHymns.length > 0 ? (
            filteredHymns.map((hymn, index) => (
              <Link href={`/hymn/${hymn.id}`} key={hymn.id} passHref>
                <Card 
                  className="hover:bg-accent/20 transition-colors duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 25}ms`, animationFillMode: 'both' }}
                >
                  <CardContent className="flex items-center gap-4 p-3 md:p-4">
                    <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 text-primary font-bold text-base md:text-lg shrink-0">
                      {hymn.number}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground text-base md:text-lg">{hymn.title}</p>
                    </div>
                     <button
                        onClick={(e) => handleFavoriteClick(e, hymn.id)}
                        className="p-2 rounded-full hover:bg-yellow-400/20 text-muted-foreground hover:text-yellow-500 transition-colors"
                        aria-label={favoriteHymnIds.has(hymn.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      >
                        <Star className={cn("h-6 w-6", favoriteHymnIds.has(hymn.id) && "fill-yellow-500 text-yellow-500")} />
                      </button>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>Nenhum hino encontrado.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
}
