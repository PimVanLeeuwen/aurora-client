interface Props {
  source: string | string[];
}

export default function VideoPoster({ source }: Props) {
  let sourceUrl: string;
  if (Array.isArray(source)) {
    const index = Math.floor(Math.random() * source.length);
    sourceUrl = source[index];
  } else {
    sourceUrl = source;
  }

  return (
    <video
      className="w-full h-full"
      muted
      loop
    >
      <source src={sourceUrl} type="video/mp4" />
    </video>
  );
}
