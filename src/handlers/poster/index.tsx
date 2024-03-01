import { Socket } from 'socket.io-client';
import './index.scss';
import ProgressBar from './components/ProgressBar';
import { useEffect, useState } from 'react';
import { Client, FooterSize } from '../../api/Client';
import { Poster } from './entities/Poster';
import PosterCarousel from './components/Carousel';

interface Props {
  socket: Socket;
}


export default function PosterView({ socket }: Props) {
  const [posters, setPosters] = useState<Poster[]>();
  const [posterIndex, setPosterIndex] = useState(-1);
  const [posterTimeout, setPosterTimeout] = useState<number | undefined>();

  const refreshPosters = async () => {
    const client = new Client();
    const newPosters = await client.getPosters();
    setPosters((newPosters as Poster[]).filter((p) => true));
  };

  const nextPoster = (currentIndex: number) => {
    const newIndex = (currentIndex + 1) % posters.length;
    if (currentIndex === 0 && posterTimeout !== undefined) {
      refreshPosters().then(() => {});
    }
    setPosterIndex(newIndex);

    const nextP = posters[newIndex];
    console.log(nextP);

    const timeout = setTimeout(() => nextPoster(newIndex), nextP.timeout * 1000);
    setPosterTimeout(timeout);
  };

  useEffect(() => {
    refreshPosters();

    return () => {
      if (posterTimeout) clearTimeout(posterTimeout);
    };
  }, []);

  useEffect(() => {
    if (posters && !posterTimeout) {
      nextPoster(-1);
    }
  }, [posters, posterTimeout]);

  const selectedPoster = posters && posters.length > 0 && posterIndex >= 0 ? posters[posterIndex] : undefined;

  return (
    <div
      className="h-screen w-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url("poster-background.png")' }}
    >
      <div className="overflow-hidden w-full h-full">
        <PosterCarousel posters={posters || []} currentPoster={posterIndex < 0 ? 0 : posterIndex} />
        <ProgressBar
          title={selectedPoster?.label}
          seconds={selectedPoster?.timeout}
          posterIndex={posterIndex}
          minimal={selectedPoster?.footer === FooterSize.Minimal}
          hide={selectedPoster?.footer === FooterSize.Hidden}
        />
      </div>
    </div>
  );
}
