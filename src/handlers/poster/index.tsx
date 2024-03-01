import { Socket } from 'socket.io-client';
import './index.scss';
import ProgressBar from './components/ProgressBar';

interface Props {
  socket: Socket;
}

export default function PosterView({ socket }: Props) {
  return (
    <>
      <div className="overflow-hidden">
        <ProgressBar title="Yeee" />
      </div>
    </>
  );
}
