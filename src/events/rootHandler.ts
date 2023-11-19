import { io } from 'socket.io-client';
import { Handlers } from '../App';

export default function registerRootHandler(setCurrentHandler: (value: (((prevState: Handlers) => Handlers) | Handlers)) => void) {
  let rootSocket = io('/', {
    path: '/socket.io/',
  });

  rootSocket.on('connect', () => {
    const engine = rootSocket.io.engine;
    engine.on('packet', ({ type, data }) => {
      console.log(type, data);
      setCurrentHandler(Handlers.CENTURION);
    });
  });
}