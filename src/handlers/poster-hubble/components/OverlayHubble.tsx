import { OverlayProps } from '../../poster-base';
import HubbleProgressBar from './HubbleProgressBar';
import HubbleOrderView from './HubbleOrderView';

export default function OverlayHubble({
  // poster,
  seconds,
  posterIndex,
  nextPoster,
  pausePoster,
}: OverlayProps) {
  return (
    <>
      <HubbleProgressBar
        seconds={seconds}
        posterIndex={posterIndex}
        hideClock={false}
        // color={poster.color}
        color={'#ffffff'}
        nextPoster={nextPoster}
        pausePoster={pausePoster}
      />
      <HubbleOrderView orders={['001', '002']} />
    </>
  );
}
