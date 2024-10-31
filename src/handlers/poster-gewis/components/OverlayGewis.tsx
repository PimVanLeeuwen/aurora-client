import { OverlayProps } from '../../poster-base';
import ProgressBar from './ProgressBar';

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
    <ProgressBar
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
