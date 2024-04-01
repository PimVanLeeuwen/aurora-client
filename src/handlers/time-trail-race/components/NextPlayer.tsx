import '../../poster/components/types/ScrollAnimation.scss';

interface Props {
  name: string;
}

export default function NextPlayer({ name }: Props) {
  if (!name) return null;

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="relative overflow-hidden w-fit text-5xl"
        style={{
          animation: `horizontal-marquee 10s linear 0 infinite`
        }}
      >
        Next up: {name}
      </div>
    </div>
  );
}
