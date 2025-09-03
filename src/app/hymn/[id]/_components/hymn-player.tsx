"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Music2, User } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface PlayerProps {
    audioUrl: string;
    instrumentalUrl: string;
    previousHymnId: string | null;
    nextHymnId: string | null;
}

const PlayerCore = ({ 
    audioUrl, 
    title,
    previousHymnId,
    nextHymnId
}: { 
    audioUrl: string, 
    title: string,
    previousHymnId: string | null,
    nextHymnId: string | null 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const router = useRouter();


  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    setCanPlay(!!audioUrl);
    if (audioRef.current) {
        if(audioUrl) {
            audioRef.current.src = audioUrl;
            const handleOtherAudioPlay = (event: Event) => {
                const target = event.target as HTMLAudioElement;
                if (target !== audioRef.current) {
                    audioRef.current?.pause();
                }
            };
            document.addEventListener('play', handleOtherAudioPlay, true);
            
            return () => {
                document.removeEventListener('play', handleOtherAudioPlay, true);
            }
        } else {
            audioRef.current.removeAttribute('src');
            audioRef.current.load();
        }
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (!canPlay) return;
    const audio = audioRef.current;
    if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          const playEvent = new Event('play', { bubbles: true });
          audio.dispatchEvent(playEvent);
          audio.play().catch(error => console.error("Playback failed:", error));
        }
    }
  };
  
  const handleTimeUpdate = () => {
    if(audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };
  
  const handleLoadedMetadata = () => {
    if(audioRef.current) setDuration(audioRef.current.duration);
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current && canPlay) {
        audioRef.current.currentTime = value[0];
        setCurrentTime(value[0]);
    }
  }
  
  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  const handleSkipBack = () => {
    if(previousHymnId) router.push(`/hymn/${previousHymnId}`);
  }

  const handleSkipForward = () => {
    if(nextHymnId) router.push(`/hymn/${nextHymnId}`);
  }


 return (
    <div className="p-4 space-y-4">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          preload="metadata"
        />
        <div className="w-full space-y-1">
            <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
                disabled={!canPlay}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span className="w-10 text-left tabular-nums">{formatTime(currentTime)}</span>
                <span className="w-10 text-right tabular-nums">{formatTime(duration)}</span>
            </div>
        </div>
        <div className="w-full flex items-center justify-center gap-4">
             <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleSkipBack} disabled={!previousHymnId}>
                <SkipBack className="h-6 w-6" />
            </Button>
            <Button onClick={togglePlayPause} size="lg" className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg disabled:bg-muted" disabled={!canPlay}>
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleSkipForward} disabled={!nextHymnId}>
                <SkipForward className="h-6 w-6" />
            </Button>
        </div>
         {!canPlay && (
          <p className="text-sm text-muted-foreground text-center pt-2">
            Áudio não disponível.
          </p>
        )}
    </div>
  );
}


export default function HymnPlayer({ audioUrl, instrumentalUrl, previousHymnId, nextHymnId }: PlayerProps) {

  return (
    <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <Tabs defaultValue="sung" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sung" disabled={!audioUrl}>
                    <User className="mr-2 h-4 w-4" />
                    Cantado
                </TabsTrigger>
                <TabsTrigger value="instrumental" disabled={!instrumentalUrl}>
                    <Music2 className="mr-2 h-4 w-4" />
                    Instrumental
                </TabsTrigger>
            </TabsList>
            <TabsContent value="sung">
                <PlayerCore 
                    audioUrl={audioUrl} 
                    title="Cantado" 
                    previousHymnId={previousHymnId}
                    nextHymnId={nextHymnId}
                />
            </TabsContent>
            <TabsContent value="instrumental">
                <PlayerCore 
                    audioUrl={instrumentalUrl} 
                    title="Instrumental"
                    previousHymnId={previousHymnId}
                    nextHymnId={nextHymnId}
                />
            </TabsContent>
        </Tabs>
    </Card>
  );
}
