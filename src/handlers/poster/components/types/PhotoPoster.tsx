import {
  PhotoPoster as IPhotoPoster,
  GEWISPhotoAlbumParams,
  PosterScreenService
} from '../../../../api';
import { useEffect, useState } from 'react';
import ImagePoster from './ImagePoster';

interface Props {
  poster: IPhotoPoster;
  visible: boolean;
  setTitle: (title: string) => void;
}

export default function PhotoPoster({ poster, visible, setTitle }: Props) {
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (visible) setTitle(label);
  }, [visible]);

  useEffect(() => {
    const body: GEWISPhotoAlbumParams = {
      albumIds: poster.albums
    };
    PosterScreenService.getPhoto(body).then((res) => {
      setUrl(res.url);
      setLabel(res.label);
    });
  }, []);

  return <ImagePoster source={url} />;
}
