import { useState } from 'react';
import Background from './components/Background';
import React from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

interface TrackPropertiesEvent {
  bpm: number;
  danceability: number;
  energy: number;
  loudness: number;
  valence: number;
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

  const [albumCover, setAlbumCover] = useState<string>('https://placekitten.com/g/200/200');
  const [artist, setArtists] = useState<string>('Roy Kakkenberg, Gijs de Man & Samuel Oosterholt');
  const [song, setSong] = useState<string>('Wie dit leest, trekt een bak!');


  // this.socket.emit('beat', event);
  // this.socket.emit('change_track', event);
  // this.socket.emit('horn', counter);
  // this.socket.emit('loaded', tape);
  // this.socket.emit('start');
  // this.socket.emit('stop');

  React.useEffect(() => {
    socket.on('loaded', (mixTape: MixTape) => {
      setArtists(mixTape.name);
      setSong(mixTape.name);
    });
    
    socket.on('change_track', (trackChange: TrackChangeEvent[]) => {
      console.log(trackChange);
      setArtists(trackChange[0].artists.toString());
      setSong(trackChange[0].title);
      setAlbumCover(trackChange[0].cover);
    });
    
    socket.on('horn', (trackChange: any) => {
      console.log(trackChange);

    });

    // socket.on('flush', (...args: any) => {
    //   console.log(args);
    // });

    // socket.removeAllListeners();

  }, []);

  return (
    <>
      <div className="h-screen flex items-center justify-center z-10">
        <img className="h-1/2 mr-6" src={albumCover}/>
        <div className="w-fit max-w-4xl flex flex-col justify-center">
          <p className="text-black text-6xl p-4 font-bold">{artist}</p>
          <p className="text-white text-6xl p-4 font-semibold">{song}</p>
        </div>
      </div>
      <Background/>
    </>
  );
}