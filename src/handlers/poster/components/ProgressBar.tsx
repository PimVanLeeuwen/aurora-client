import Clock from './Clock';
import ProgressBarSlider from './ProgressBarSlider';

interface Props {
  title?: string;
  seconds?: number;
  posterIndex?: number;
}

export default function ProgressBar({ title, seconds, posterIndex }: Props) {
  return (
    <div className="absolute w-full bottom-0 z-50 text-white flex flex-col text-5xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 80 }}>
      <div id="w-full" style={{ height: 5, marginTop: -2 }}>
        {seconds !== undefined && posterIndex >= 0 && (<ProgressBarSlider seconds={seconds} posterIndex={posterIndex} />)}
      </div>
      <div className="flex-grow flex justify-center items-center px-6">
        <div className="relative h-full py-3" style={{ width: 200 }}>
          <div className="h-full">
            <svg
              style={{ filter: 'invert(100%) drop-shadow(3px 5px 2px rgb(0 0 0 /0.4))' }}
              viewBox="0 0 50 100"
              height="50"
            >
              <image x="0" y="0" height="100%" width="100%" xlinkHref={'public/gewis-base-black.svg'}/>
            </svg>
          </div>
        </div>
        <div className="flex-grow text-center text-shadow">{title}</div>
        <div className="text-right" style={{ width: 200 }}>
          <div>
            <Clock/>
          </div>
        </div>
      </div>
    </div>
  );
}
