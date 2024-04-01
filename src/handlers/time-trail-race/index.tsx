import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  Client,
  PlayerParams,
  RaceFinishedEvent,
  RacePlayerReadyEvent,
  RacePlayerRegisteredEvent,
  RaceScoreboardEvent,
  RaceStartedEvent,
  ScoreboardItem,
  TimeTrailRaceState
} from '../../api/Client';
import StopWatch from './components/StopWatch';

interface Props {
  socket: Socket;
}

export default function TimeTrailRaceView({ socket }: Props) {
  const [state, setState] = useState<TimeTrailRaceState>(undefined);
  const [sessionName, setSessionName] = useState<string>('');
  const [player, setPlayer] = useState<PlayerParams | undefined>();
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [scoreboard, setScoreboard] = useState<ScoreboardItem[]>([]);

  useEffect(() => {
    new Client().getRaceState().then(({ state: s, sessionName: n }) => {
      setState(s);
      setSessionName(n);
    });

    socket.on('race-initialized', ({ state: s, sessionName: n }) => {
      setState(s as any as TimeTrailRaceState);
      setSessionName(n);
      setScoreboard([]);
      setPlayer(undefined);
    });

    socket.on(
      'race-player-registered',
      ({ state: s, player: p, sessionName: n, scoreboard: sb }: RacePlayerRegisteredEvent) => {
        setState(s as any as TimeTrailRaceState);
        setSessionName(n);
        setPlayer(p);
        setScoreboard(sb);
      }
    );

    socket.on(
      'race-player-ready',
      ({ state: s, player: p, sessionName: n }: RacePlayerReadyEvent) => {
        setState(s as any as TimeTrailRaceState);
        setSessionName(n);
        setPlayer(p);
      }
    );

    socket.on(
      'race-started',
      ({ state: s, sessionName: n, player: p, startTime: t }: RaceStartedEvent) => {
        setState(s as any as TimeTrailRaceState);
        setSessionName(n);
        setPlayer(p);
        setStartTime(t);
      }
    );

    socket.on(
      'race-finished',
      ({ state: s, player: p, scoreboard: sb, sessionName: n }: RaceFinishedEvent) => {
        setState(s as any as TimeTrailRaceState);
        setSessionName(n);
        setPlayer(p);
        setScoreboard(sb);
        setStartTime(undefined);
      }
    );

    socket.on(
      'race-scoreboard',
      ({ state: s, player: p, scoreboard: sb, sessionName: n }: RaceScoreboardEvent) => {
        setState(s as any as TimeTrailRaceState);
        setSessionName(n);
        setPlayer(p);
        setScoreboard(sb);
      }
    );

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const renderContent = () => {
    switch (state) {
      case TimeTrailRaceState.STARTED:
        return <StopWatch startTime={startTime} />;
      case TimeTrailRaceState.INITIALIZED:
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="gap-8">
        <h1>Spoelbakkenrace</h1>
        <h4>{sessionName}</h4>
      </div>
      {renderContent()}
    </div>
  );
}
