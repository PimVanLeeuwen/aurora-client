import { io } from 'socket.io-client';
import { Handlers } from '../HandlerSwitcher';

export default function registerRootHandler(setCurrentHandler: (value: (((prevState: Handlers) => Handlers) | Handlers | null)) => void) {
  let rootSocket = io('/', {
    path: '/socket.io/',
  });

  rootSocket.on('connect', () => {
    console.log('SocketIO: connected to /');
    const engine = rootSocket.io.engine;
  });

  rootSocket.on('handler_set', (handler) => {
    console.log(`Current handler: ${handler}`);
    setCurrentHandler(handler);
  });

  rootSocket.on('handler_remove', () => {
    setCurrentHandler(null);
  });
}
