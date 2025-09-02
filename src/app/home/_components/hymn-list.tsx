"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import type { Hymn } from '@/lib/hymns';
import { Search } from 'lucide-react';

export default function HymnList({ hymns }: { hymns: Hymn[] }) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

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

  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Pesquisar hino por nome ou número..."
          className="w-full pl-12 h-14 text-lg rounded-full shadow-lg border-2 border-transparent focus-visible:ring-accent focus-visible:border-accent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-14rem)] rounded-lg">
        <div className="space-y-2">
          {filteredHymns.length > 0 ? (
            filteredHymns.map((hymn, index) => (
              <Link href={`/hymn/${hymn.id}`} key={hymn.id} passHref>
                <Card 
                  className="hover:bg-accent/20 transition-colors duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 25}ms`, animationFillMode: 'both' }}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                      {hymn.number}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base md:text-lg">{hymn.title}</p>
                    </div>
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
