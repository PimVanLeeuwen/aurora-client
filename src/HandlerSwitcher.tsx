import React, { useContext, useEffect, useState } from 'react';
import registerRootHandler from './events/rootHandler';
import registerScreenHandler from './events/screenHandler';
import './index.css';

import { default as CenturionView }  from './handlers/centurion';
import { default as SpotifyView } from './handlers/spotify';
import { default as DefaultView } from './handlers/default';
import { Socket } from 'socket.io-client';
import { AuthContext } from './contexts/AuthContext';
import StageEffectsView from './handlers/stage-effects';


export enum Handlers {
  SPOTIFY = 'CurrentlyPlayingTrackHandler',
  CENTURION = 'CenturionScreenHandler',
  POSTER = 'PosterScreenHandler',
  STAGE_EFFECTS = 'StageEffectsHandler',
}

export default function HandlerSwitcher() {
  const [currentHandler, setCurrentHandler] = useState<Handlers | null>(null);
  const [screenSocket, setScreenSocket] = useState<Socket>(null);

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    registerRootHandler(setCurrentHandler);
    registerScreenHandler(setScreenSocket);
  }, [user]);

  if (loading) {
    return (
      <h1>Initializing the screen...</h1>
    );
  }

  if (!user) {
    return (
      <h1>Unauthenticated</h1>
    );
  }

  if (!screenSocket) {
    return (
      <h1>Connecting to websocket...</h1>
    );
  }

  switch (currentHandler) {
    case Handlers.CENTURION:
      return <CenturionView socket={screenSocket}/>;
    case Handlers.SPOTIFY:
      return <SpotifyView socket={screenSocket}/>;
    case Handlers.POSTER:
      return <h1>Posters hier!</h1>;
    case Handlers.STAGE_EFFECTS:
      return <StageEffectsView socket={screenSocket} />;
    default:
      return <DefaultView />;
  }
}
