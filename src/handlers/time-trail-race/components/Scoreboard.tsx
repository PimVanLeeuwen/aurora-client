import { PlayerParams, ScoreboardItem } from '../../../api/Client';
import { toStopwatchString } from '../helpers/time';
import '../../poster/components/types/ScrollAnimation.scss';
import { CSSProperties } from 'react';

interface Props {
  scoreboard: ScoreboardItem[];
  player?: PlayerParams;
}

export default function Scoreboard({ scoreboard, player }: Props) {
  const animation: CSSProperties = {
    animationName: 'vertical-scroll',
    animationDelay: '3s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationDuration: `${Math.max((scoreboard.length - 8) * 3, 0)}s`
  };

  const getTimeDifference = (i: number) => {
    if (i === 0) return null;
    const current = scoreboard[i].timeMs;
    const competitor = scoreboard[i - 1].timeMs;
    const difference = current - competitor;
    return '+' + toStopwatchString(difference, false);
  };

  return (
    <div className="h-full" style={{ marginBottom: '-5rem' }}>
      <div className="text-3xl h-full" style={animation}>
        <table className="border-separate" style={{ borderSpacing: '3rem 1rem' }}>
          <tbody>
            {scoreboard.map((score, i) => (
              <tr key={score.uuid} className={player.uuid === score.uuid ? 'bg-gray-600' : ''}>
                <td className="">{i + 1})</td>
                <td className="">{score.name}</td>
                <td className="" style={{ fontFamily: 'Consolas,monaco,monospace' }}>
                  {toStopwatchString(score.timeMs)}
                </td>
                <td className="" style={{ fontFamily: 'Consolas,monaco,monospace' }}>
                  {getTimeDifference(i)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
