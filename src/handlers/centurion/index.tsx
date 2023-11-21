import { useState } from 'react';
import Background from './components/Background';
import React from 'react';
import { Socket } from 'socket.io-client';
import styles from './centurion.module.css';
import Strobe from './components/Strobe';
import { clsx } from 'clsx';

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

type HornEvent = {
  strobeTime: number,
  counter: number
};

enum Colors {
  'white' = '#cccccc',
  'blindingWhite' = '#ffffff',
  'uv' = '#7e48a2',
  'lightpink' = '#ecc9f6',
  'pink' = '#dd75ec',
  'orange' = '#f18900',
  'purple' = '#8800b6',
  'brown' = '#502626',
  'red' = '#ff0000',
  'yellow' = '#fff225',
  'lime' = '#9cff55',
  'green' = '#169300',
  'blue' = '#003a91',
  'gold' = '#d9923f',
  'rosered' = '#c91651',
  'cyan' = '#07fff7',
  'lightblue' = '#98e7ff',
}

export default function View({ socket }: Props) {

  const [artist, setArtists] = useState<string | null>('Roy Kakkenberg, Gijs de Man & Samuel Oosterholt');
  const [song, setSong] = useState<string | null>('Wie dit leest, trekt een bak!');
  const [hornCount, setHornCount] = useState<number>(0);
  const [strobe, setStrobe] = useState<boolean>(false);
  const [startColor, setStartColor] = useState<Colors>(Colors.lightpink);
  const [endColor, setEndColor] = useState<Colors>(Colors.orange);

  React.useEffect(() => {
    socket.on('loaded', (mixTape: MixTape) => {
      setArtists(mixTape.name);
      setSong(mixTape.name);
      setHornCount(0);
    });

    socket.on('start', () => {
      setArtists('GET READY');
      setSong(null);
      setHornCount(0);
    });

    socket.on('stop', () => {
      setArtists('STOPPED');
      setSong(null);
      setHornCount(-1);
    });

    socket.on('change_track', (trackChangeEvent: any) => {
      setArtists(trackChangeEvent[0].artists.toString());
      setSong(trackChangeEvent[0].title);
    });

    socket.on('horn', (hornEvent: HornEvent) => {
      setHornCount(hornEvent.counter);
      setStrobe(true);
      setTimeout(() => {
        setStrobe(false);
      }, hornEvent.strobeTime);
    });

    socket.on('change_colors', (newColors: string[]) => {
      setStartColor(Colors[newColors[0]]);
      setEndColor(Colors[newColors[1]]);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const getRandomInt = () => {
    return Math.floor(Math.random() * 2 * hornCount) - hornCount;
  };

  const makeTextDrunk = (note: any) => {
    return [...note].map(letter => {
      // Range [-#shots, #shots]
      let randomInt = getRandomInt();
      return (
        <span className={clsx(styles.letterAnimation, 'z-20')} style={{
          ['--random-rotation' as any]: `${randomInt / 2}deg`,
          ['--random-time' as any]: `${hornCount === 0 ? '500s' : `${1 / hornCount * 500}s`}`,
          'display': 'inline-block',
        }}>{letter === ' ' ? '\u00A0' : letter}</span>
      );
    });
  };

  const renderHornCount = () => {
    return (
      <p className={clsx(
        'text-white text-[550px] -m-20',
        styles.swingimage,
        styles.largeStroke,
        styles.effectTest,
      )}>
        {makeTextDrunk(hornCount.toString())}
      </p>
    );
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className={clsx('w-fit flex flex-col justify-center text-center', styles.displayText)}>
          {hornCount >= 0 && renderHornCount()}
          <p
            key={artist}
            className={clsx('text-white text-7xl font-bold mb-10', styles.swingimage, styles.smallStroke, styles.fadeOver)}
          >
            {makeTextDrunk(artist.toUpperCase())}
          </p>
          <p
            key={song}
            className={clsx('text-white text-7xl', styles.swingimage, styles.smallStroke, styles.fadeOver)}>
            {makeTextDrunk(song.toUpperCase())}
          </p>
        </div>
      </div>
      {strobe && <Strobe hornCount={hornCount}/>}
      <Background
        key={startColor}
        startColor={startColor}
        endColor={endColor}
      />
    </>
  );
}