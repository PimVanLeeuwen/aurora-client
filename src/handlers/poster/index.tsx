import { Socket } from 'socket.io-client';
import './index.scss';
import ProgressBar from './components/ProgressBar';
import { useEffect, useState } from 'react';
import { Poster, PosterScreenService } from '../../api';
import PosterCarousel from './components/Carousel';

interface Props {
  socket: Socket;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO should socket be used somewhere?
export default function PosterView({ socket }: Props) {
  const [posters, setPosters] = useState<Poster[]>();
  const [posterIndex, setPosterIndex] = useState(-1);
  const [posterTimeout, setPosterTimeout] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  const refreshPosters = async () => {
    setLoading(true);
    const newPosters = await PosterScreenService.getPosters();
    setPosters((newPosters as Poster[]).filter(() => true));
    setLoading(false);
  };

  const handleNextPoster = (currentIndex: number) => {
    if (posterTimeout) clearTimeout(posterTimeout);

    const newIndex = (currentIndex + 1) % posters.length;
    if (currentIndex === 0 && posterTimeout !== undefined) {
      refreshPosters().then(() => {});
    }
    setPosterIndex(newIndex);

    const nextP = posters[newIndex];

    const timeout = setTimeout(() => handleNextPoster(newIndex), nextP.timeout * 1000);
    setPosterTimeout(timeout);
  };

  const nextPoster = () => handleNextPoster(posterIndex);

  const pausePoster = () => {
    if (posterTimeout) clearTimeout(posterTimeout);
    setPosterTimeout(undefined);
  };

  useEffect(() => {
    refreshPosters();

    return () => {
      if (posterTimeout) clearTimeout(posterTimeout);
    };
  }, []);

  useEffect(() => {
    if (posters && !posterTimeout && !loading) {
      const randomIndex = Math.floor(Math.random() * posters.length);
      handleNextPoster(randomIndex - 1);
    }
  }, [posters, loading]);

  const selectedPoster =
    posters && posters.length > 0 && posterIndex >= 0 ? posters[posterIndex] : undefined;

  return (
    <div
      className="h-screen w-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url("poster-background.png")' }}
    >
      <div className="overflow-hidden w-full h-full">
        <PosterCarousel
          posters={posters || []}
          currentPoster={posterIndex < 0 ? 0 : posterIndex}
          setTitle={setTitle}
        />
        <ProgressBar
          title={title}
          seconds={posterTimeout !== undefined ? selectedPoster?.timeout : undefined}
          posterIndex={posterIndex}
          minimal={selectedPoster?.footer === 'minimal'}
          hide={selectedPoster?.footer === 'hidden'}
          nextPoster={nextPoster}
          pausePoster={pausePoster}
        />
      </div>
    </div>
  );
}
