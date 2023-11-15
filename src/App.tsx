import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import { Client, Information } from './api/Client';

export default function App() {

  const [information, setInformation] = useState<Information>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let client = new Client();
        setInformation(await client.getInformation());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <h1> Loading </h1>
    );
  }

  if (error) {
    return (
      <>
        <h1> Error </h1>
        <p> {error.message} </p>
      </>
    );
  }

  return (
  <>
    <h1> Example data </h1>
    <div>
      {information.id}
    </div>
    <Routes/>
  </>
  );
}
