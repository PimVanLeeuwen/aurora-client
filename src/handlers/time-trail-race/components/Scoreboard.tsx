import { PlayerParams, ScoreboardItem } from '../../../api/Client';
import { toStopwatchString } from '../helpers/time';

interface Props {
  scoreboard: ScoreboardItem[];
  player?: PlayerParams;
}

export default function Scoreboard({ scoreboard, player }: Props) {
  return (
    <div className="flex justify-start items-center text-3xl">
      <table>
        <tbody>
          {scoreboard.map((score, i) => (
            <tr key={score.uuid} className={player.uuid === score.uuid ? 'bg-gray-600' : ''}>
              <td className="pr-6">
                {score.name} ({i + 1}):
              </td>
              <td>{toStopwatchString(score.timeMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
