import { io } from 'socket.io-client';

export default function registerScreenHandler() {
  let screenSocket = io('/screen', {
    path: '/socket.io/',
  });

  screenSocket.on('connect', () => {
    const engine = screenSocket.io.engine;
    engine.on('packet', ({ type, data }) => {
      console.log(type, data);
    });
  });
}