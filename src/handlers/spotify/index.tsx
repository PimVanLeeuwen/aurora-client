import { useState } from 'react';
import Background from './components/Background';

export default function View() {

  const [albumCover, setAlbumCover] = useState<string>('https://placekitten.com/g/200/200');
  const [artist, setArtists] = useState<string>('Roy Kakkenberg, Gijs de Man & Samuel Oosterholt');
  const [song, setSong] = useState<string>('Wie dit leest, trekt een bak!');

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