import './components/index.scss';
import { useEffect, useState } from 'react';
import { getPosters, Poster } from '../../api';
import PosterCarousel from '../poster-base/components/Carousel';
import HubbleOrderView from './components/HubbleOrderView';
import HubbleProgressBar from './components/HubbleProgressBar';

export default function PosterHubbleView() {
  const [posters, setPosters] = useState<Poster[]>();
  const [posterIndex, setPosterIndex] = useState(-1);
  const [posterTimeout, setPosterTimeout] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);

  const refreshPosters = async () => {
    setLoading(true);
    const newPosters = await getPosters();
    setPosters(newPosters.data?.posters as Poster[]);
    setLoading(false);
  };

  useEffect(() => {
    if (!posters || posters.length === 0) return;
    if (posterTimeout) clearTimeout(posterTimeout);

    if (posterIndex === 0) {
      refreshPosters().then(() => {});
    }

    const nextPoster = posters[posterIndex];
    const timeout = setTimeout(() => setPosterIndex((i) => (i + 1) % posters.length), nextPoster.timeout * 1000);
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

  const selectedPoster = posters && posters.length > 0 && posterIndex >= 0 ? posters[posterIndex] : undefined;

  return (
    <div
      className="h-screen w-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url("hubble-poster-background.png")' }}
    >
      <div className="overflow-hidden w-full h-full">
        <PosterCarousel posters={posters || []} currentPoster={posterIndex < 0 ? 0 : posterIndex} />
        <HubbleProgressBar
          seconds={posterTimeout !== undefined ? selectedPoster?.timeout : undefined}
          posterIndex={posterIndex}
          // color={posters[posterIndex].color}
          hideClock={false}
          color={'#ffffff'}
          nextPoster={nextPoster}
          pausePoster={pausePoster}
        />
        <HubbleOrderView orders={['001', '002']} />
      </div>
    </div>
  );
}
