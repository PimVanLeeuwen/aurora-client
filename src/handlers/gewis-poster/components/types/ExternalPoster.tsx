import { useEffect, useRef } from 'react';
import ImagePoster from './ImagePoster';

interface Props {
  url: string;
  visible: boolean;
}

export default function ExternalPoster({ url, visible }: Props) {
  const ref = useRef<HTMLIFrameElement>();

  useEffect(() => {
    if (!ref || !ref.current) return;
    ref.current.src = '';
    ref.current.src = url;
  }, [visible]);

  return (
    <div className="w-full h-full relative">
      <ImagePoster source="/avico-stuk.png" />
      <iframe
        className="border-none w-full h-full overflow-hidden absolute top-0 z-30"
        src={url}
        scrolling="no"
        seamless
        ref={ref}
      />
    </div>
  );
}
