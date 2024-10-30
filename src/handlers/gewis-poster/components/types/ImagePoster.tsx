import { useMemo } from 'react';

interface Props {
  source: string | string[];
}

export default function ImagePoster({ source }: Props) {
  let sourceUrl = useMemo(() => {
    if ((Array.isArray(source) && source.length === 0) || source === '') {
      return '/avico-stuk.png';
    } else if (Array.isArray(source)) {
      const index = Math.floor(Math.random() * source.length);
      return source[index];
    }
    return source;
  }, [source]);

  return (
    <div className="w-full h-full bg-black relative">
      <div
        className="absolute w-full h-full blur-lg opacity-50 z-20 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url("${sourceUrl}")` }}
      ></div>
      <div
        className="object-contain block relative z-30 h-full bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: `url("${sourceUrl}")` }}
      />
    </div>
  );
}
