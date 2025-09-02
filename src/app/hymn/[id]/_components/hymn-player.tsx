"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export default function HymnPlayer({ audioUrl }: { audioUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);
  
  const canPlay = audioUrl && audioUrl.length > 0;

  useEffect(() => {
    if (audioRef.current && canPlay) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  }, [audioUrl, canPlay]);

  const togglePlayPause = () => {
    if (!canPlay) return;
    const audio = audioRef.current;
    if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play().catch(error => console.error("Playback failed:", error));
        }
        setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };
  
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
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

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle>Ouvir Hino</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div className="w-full flex items-center justify-center gap-4">
            <Button onClick={togglePlayPause} size="lg" className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg" disabled={!canPlay}>
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
        </div>
        <div className="w-full flex items-center gap-2 text-sm">
            <span className="w-10 text-center tabular-nums text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
                disabled={!canPlay}
            />
            <span className="w-10 text-center tabular-nums text-muted-foreground">{formatTime(duration)}</span>
        </div>
         {!canPlay && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            Nenhum áudio disponível para este hino.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
