import './components/index.scss';
import PosterBaseView from '../';
import { getGewisPosters } from '../../api';
import OverlayHubble from './components/OverlayHubble.tsx';

export default function PosterHubbleView() {
  return (
    <PosterBaseView
      overlay={OverlayHubble}
      // @ts-expect-error This should be type converting
      getPosters={getGewisPosters}
    />
  );
}
