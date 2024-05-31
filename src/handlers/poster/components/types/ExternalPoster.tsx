import { useEffect, useRef, useState } from 'react';
import ImagePoster from './ImagePoster';

interface Props {
  url: string;
  visible: boolean;
}

export default function ExternalPoster({ url, visible }: Props) {
  const [working, setWorking] = useState(null);
  const ref = useRef<HTMLIFrameElement>();

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          setWorking(true);
        } else {
          setWorking(false);
        }
      })
      .catch((e) => {
        console.error(e);
        setWorking(false);
      });
  }, []);

  useEffect(() => {
    if (!ref || !ref.current) return;
    ref.current.contentWindow.location.reload();
  }, [visible]);

  if (working == null) return null;

  if (working === false) {
    return <ImagePoster source="/avico-stuk.png" />;
  }

  return (
    <iframe
      className="border-none w-full h-full overflow-hidden"
      src={url}
      scrolling="no"
      seamless
      ref={ref}
    />
  );
}
