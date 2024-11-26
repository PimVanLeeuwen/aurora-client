import { OverlayProps } from '../../poster-base';
import GewisProgressBar from './GewisProgressBar.tsx';

export default function OverlayGewis({
  poster,
  posterTitle,
  seconds,
  posterIndex,
  nextPoster,
  pausePoster,
  borrelMode,
}: OverlayProps) {
  return (
    <GewisProgressBar
      title={posterTitle}
      seconds={seconds}
      posterIndex={posterIndex}
      minimal={poster?.footer === 'minimal'}
      hide={poster?.footer === 'hidden'}
      borrelMode={borrelMode}
      nextPoster={nextPoster}
      pausePoster={pausePoster}
    />
  );
}
