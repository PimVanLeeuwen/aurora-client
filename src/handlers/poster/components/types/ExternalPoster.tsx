interface Props {
  url: string;
}

export default function ExternalPoster({ url }: Props) {
  return (
    <iframe
      className="border-none w-full h-full overflow-hidden"
      src={url}
      scrolling="no"
      seamless
    />
  );
}
