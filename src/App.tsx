import React, { useEffect, useState } from 'react';
import { Client } from './api/Client';
import registerRootHandler from './events/rootHandler';
import registerScreenHandler from './events/screenHandler';
import './index.css';

import { default as CenturionView }  from './handlers/centurion';
import { default as SpotifyView } from './handlers/spotify';
import { default as DefaultView } from './handlers/default';


export enum Handlers {
  'SPOTIFY' = 'spotify',
  'CENTURION' = 'centurion',
}

export default function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentHandler, setCurrentHandler] = useState<Handlers | null>(null);

  useEffect(() => {
    let client = new Client();
    client.authMock()
      .then(() => {
        registerRootHandler(setCurrentHandler);
        registerScreenHandler();
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <h1> Initializing the screen </h1>
    );
  }

  if (error) {
    return (
      <>
        <h1> Ran into an error when initializing the screen </h1>
        <p> {error.message} </p>
      </>
    );
  }

  switch (currentHandler) {
    case Handlers.CENTURION:
      return <CenturionView/>;
    case Handlers.SPOTIFY:
      return <SpotifyView/>;
    default:
      return <DefaultView/>;
  }
}
