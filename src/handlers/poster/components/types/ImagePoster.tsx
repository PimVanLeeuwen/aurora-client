interface Props {
  source: string | string[];
}

export default function ImagePoster({ source }: Props) {
  let sourceUrl: string;
  if (Array.isArray(source)) {
    const index = Math.floor(Math.random() * source.length);
    sourceUrl = source[index];
  } else {
    sourceUrl = source;
  }

  return (
    <div className="w-full h-full bg-black relative">
      <div
        className="absolute w-full h-full blur-lg opacity-50 z-20 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url("${sourceUrl}")` }}
      >
      </div>
      <div
        className="object-contain block relative z-30 h-full bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: `url("${sourceUrl}")` }}
      />
    </div>
  );
}
