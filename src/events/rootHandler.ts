import { io } from 'socket.io-client';
import { Handlers } from '../HandlerSwitcher';

export default function registerRootHandler(setCurrentHandler: (value: (((prevState: Handlers) => Handlers) | Handlers)) => void) {
  let rootSocket = io('/', {
    path: '/socket.io/',
  });

  rootSocket.on('connect', () => {
    const engine = rootSocket.io.engine;
  });

  rootSocket.on('handler_set', (handler) => {
    console.log(handler);
    setCurrentHandler(handler);
  });
}
