import { Socket } from 'socket.io-client';
import './index.scss';
import ProgressBar from './components/ProgressBar';
import { useEffect, useState } from 'react';
import { Client, ErrorPoster, LocalPoster, MediaPoster, PhotoPoster } from '../../api/Client';

interface Props {
  socket: Socket;
}

type Poster = LocalPoster | PhotoPoster | MediaPoster | ErrorPoster;

export default function PosterView({ socket }: Props) {
  const [posters, setPosters] = useState<Poster[]>();
  const [posterIndex, setPosterIndex] = useState(-1);
  const [posterTimeout, setPosterTimeout] = useState<number | undefined>();

  const refreshPosters = async () => {
    const client = new Client();
    const newPosters = await client.getPosters();
    setPosters(newPosters as Poster[]);
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

  return (
    <>
      <div className="overflow-hidden">
        <ProgressBar title="Yeee" />
      </div>
    </>
  );
}
