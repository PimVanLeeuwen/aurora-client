import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

export default function registerScreenHandler(setScreenHandler: (value: (((prevState: Socket) => Socket) | Socket)) => void) {
  let screenSocket = io('/screen', {
    path: '/socket.io/',
  });

  screenSocket.on('connect', () => {
    console.log('Connected');
    setScreenHandler(screenSocket);
  });
}