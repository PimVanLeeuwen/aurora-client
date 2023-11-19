import { useState } from 'react';
import Background from './components/Background';
import React from 'react';
import { Socket } from 'socket.io-client';
import styles from './centurion.module.css';

interface Props {
  socket: Socket;
}

interface TrackChangeEvent {
  title: string;
  artists: string[];
  cover?: string;
}

interface MixTape {
  name: string;
  songFile: string;
  feed: FeedEvent[];
}

export type FeedEvent = {
  timestamp: number;
} & (Horn | Song | Beat);

type Horn = {
  type: 'horn',
  data: {
    counter: number,
  },
};

export type SongData = {
  artist: string,
  title: string,
};

type Song = {
  type: 'song',
  data: SongData | SongData[],
};

type Beat = {
  type: 'beat',
};

export default function View({ socket }: Props) {

  const [artist, setArtists] = useState<string | null>('Roy Kakkenberg, Gijs de Man & Samuel Oosterholt');
  const [song, setSong] = useState<string | null>('Wie dit leest, trekt een bak!');
  const [hornCount, setHornCount] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);

  React.useEffect(() => {
    socket.on('loaded', (mixTape: MixTape) => {
      setArtists(mixTape.name);
      setSong(mixTape.name);
      setHornCount(0);
    });

    socket.on('start', () => {
      setArtists('STOPPED');
      setSong(null);
      setHornCount(-1);
    });

    socket.on('stop', () => {
      setArtists('STOPPED');
      setSong(null);
      setHornCount(0);
    });

    socket.on('change_track', (trackChangeEvent: TrackChangeEvent[]) => {
      setArtists(trackChangeEvent[0].artists.toString());
      setSong(trackChangeEvent[0].title);
    });
    
    socket.on('horn', (hornEvent: number) => {
      setHornCount(hornEvent);

      // document.getElementById('swingimage').style;

    });


    // socket.removeAllListeners();
  }, []);


  return (
    <>
      <div className="h-screen flex items-center justify-center z-10">
        <div className="w-fit max-w-4xl flex flex-col justify-center text-center">
          <p
            className={`text-[300px] text-bold m-5 ${styles.swingimage}`}
          > {hornCount} </p>
          <p className={`text-black text-6xl p-4 font-bold ${styles.swingimage}`}>{artist}</p>
          <p className={`text-white text-6xl p-4 font-semibold ${styles.swingimage}`}>{song}</p>
        </div>
      </div>
      <Background/>
    </>
  );
}