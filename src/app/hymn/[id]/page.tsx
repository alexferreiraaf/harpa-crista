import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllHymns } from '@/lib/hymns';
import { ArrowLeft } from 'lucide-react';
import HymnView from './_components/hymn-view';

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
    <HymnView hymn={hymn} previousHymnId={previousHymnId} nextHymnId={nextHymnId} />
  );
}
