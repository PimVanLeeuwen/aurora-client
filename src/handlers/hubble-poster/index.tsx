import { Socket } from 'socket.io-client';
import './index.scss';
import HubbleProgressBar from './components/HubbleProgressBar';
import HubbleOrderView from './components/HubbleOrderView';
import { useEffect, useState } from 'react';
import { HandlersService, Poster } from '../../api';
import PosterCarousel from '../base-poster/Carousel';

interface Props {
  socket: Socket;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO should socket be used somewhere?
export default function HubblePosterView({ socket }: Props) {
  const [posters, setPosters] = useState<Poster[]>();
  const [posterIndex, setPosterIndex] = useState(-1);
  const [posterTimeout, setPosterTimeout] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);

  const refreshPosters = async () => {
    setLoading(true);
    const newPosters = await HandlersService.getPosters();
    setPosters(newPosters.posters as Poster[]);
    setLoading(false);
  };

  useEffect(() => {
    if (!posters || posters.length === 0) return;
    if (posterTimeout) clearTimeout(posterTimeout);

    if (posterIndex === 0) {
      refreshPosters().then(() => {});
    }

    const nextPoster = posters[posterIndex];
    const timeout = setTimeout(
      () => setPosterIndex((i) => (i + 1) % posters.length),
      nextPoster.timeout * 1000
    );
    setPosterTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [posterIndex]);

  const nextPoster = () => {
    setPosterIndex((i) => (i + 1) % posters.length);
  };

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
      setPosterIndex(randomIndex);
    }
  }, [posters, loading]);

  const selectedPoster =
    posters && posters.length > 0 && posterIndex >= 0 ? posters[posterIndex] : undefined;

  return (
    <div
      className="h-screen w-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url("hubble-poster-background.png")' }}
    >
      <div className="overflow-hidden w-full h-full">
        <PosterCarousel
          posters={posters || []}
          currentPoster={posterIndex < 0 ? 0 : posterIndex}
        />
        <HubbleProgressBar
          seconds={posterTimeout !== undefined ? selectedPoster?.timeout : undefined}
          posterIndex={posterIndex}
          // color={posters[posterIndex].color}
          hideClock={false}
          color={"#ffffff"}
          nextPoster={nextPoster}
          pausePoster={pausePoster}
        />
        <HubbleOrderView
          orders = {[0,69]}
        />
      </div>
    </div>
  );
}
