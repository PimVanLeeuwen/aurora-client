import { Client, GEWISPhotoAlbumParams, PhotoPoster as IPhotoPoster } from '../../../../api/Client';
import { useEffect, useState } from 'react';
import ImagePoster from './ImagePoster';

interface Props {
  poster: IPhotoPoster;
}

export default function PhotoPoster({ poster }: Props) {
  const [url, setUrl] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO where should this be used?
  const [label, setLabel] = useState('');

  useEffect(() => {
    const body = new GEWISPhotoAlbumParams();
    body.albumIds = poster.albums;
    new Client().getPhoto(body).then((res) => {
      setUrl(res.url);
      setLabel(res.label);
    });
  }, []);

  return <ImagePoster source={url} />;
}
