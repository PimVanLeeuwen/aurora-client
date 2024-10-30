import { MediaPoster, PhotoPoster as ClientPhotoPoster, Poster } from '../../api';
import LogoPoster from './types/LogoPoster';
import { useEffect, useMemo } from 'react';
import ImagePoster from './types/ImagePoster';
import ExternalPoster from './types/ExternalPoster';
import VideoPoster from './types/VideoPoster';

interface Props {
  posters: Poster[];
  currentPoster: number;
  setTitle?: (title: string) => void;
}

export default function PosterCarousel({ posters, currentPoster, setTitle }: Props) {
  const previousPoster = useMemo(() => (currentPoster - 1) % posters.length, [currentPoster]);
  const nextPoster = useMemo(() => (currentPoster + 1) % posters.length, [currentPoster]);

  const renderPoster = (poster: Poster, index: number) => {
    if (index !== previousPoster && index !== currentPoster && index !== nextPoster) return null;

    const visible = index === currentPoster || index === previousPoster;

    switch (poster.type as string) {
      case 'logo':
        return <LogoPoster/>;
      case 'img':
        return <ImagePoster source={(poster as MediaPoster).source} />;
      case 'extern':
        return (
          <ExternalPoster
            url={(poster as MediaPoster).source[0]}
            visible={visible}
          />
        );
      case 'video':
        return (
          <VideoPoster
            source={(poster as MediaPoster).source}
            visible={visible}
          />
        );
      default:
        return <div></div>;
    }
  };

  useEffect(() => {
    const poster = posters[currentPoster];
    if (setTitle && poster && poster.type !== 'photo') {
      setTitle(poster.label);
    }
  }, [posters, currentPoster]);

  return (
    <div className="w-full h-full top-0 left-0">
      {posters.map((p, i) => (
        <div
          className={`
            absolute w-full h-full top-0 left-0
            transition-opacity duration-500
            ${[previousPoster, currentPoster].includes(i) ? 'opacity-100' : 'opacity-0'}
            ${[currentPoster, nextPoster].includes(i) ? 'z-10' : 'z-0'}
          `}
        >
          {renderPoster(p, i)}
        </div>
      ))}
    </div>
  );
}
