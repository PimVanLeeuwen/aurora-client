import { useEffect, useState } from 'react';
import { CountryMedalResponse, HandlersService, MedalTableRecord } from '../../../../api';
import VerticalScroll from '../../../../components/VerticalScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faPlus, faRankingStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
  visible: boolean;
}

export default function OlympicsPoster({ visible }: Props) {
  const [medalTable, setMedalTable] = useState<MedalTableRecord[]>([]);
  const [dutchMedals, setDutchMedals] = useState<CountryMedalResponse | null>(null);

  useEffect(() => {
    HandlersService.getOlympicsMedalTable().then((res) => {
      setMedalTable(res);
    });
    HandlersService.getDutchOlympicMedals().then((res) => {
      setDutchMedals(res);
    });
  }, []);

  return (
    <div
      className="w-full h-full relative
      bg-gewis bg-cover text-shadow
      bg-olympics-2024 text-4xl font-semibold"
      style={{ fontFamily: 'Olympics2024' }}
    >
      <div className="absolute w-full h-full bg-black opacity-10" />
      <div className="absolute w-full h-full flex flex-col items-center p-10 pb-28 gap-8">
        <div
          className="font-olympics-2024 text-8xl font-medium"
          style={{ fontFamily: 'Olympics2024', textShadow: '0 0 32px darkorange' }}
        >
          Summer Olympics Paris 2024
        </div>
        <div className="flex flex-row gap-12 w-full flex-1">
          <div
            className="bg-black text-white bg-opacity-60 rounded-xl flex-1 h-full p-8 flex flex-col"
            style={{ maxHeight: 800 }}
          >
            <div
              className="text-center text-6xl font-medium pb-5"
              style={{ fontFamily: 'Olympics2024' }}
            >
              Medal table
            </div>
            <div className="w-full flex-1 overflow-hidden block">
              <VerticalScroll visible={visible} items={medalTable.length} scrollEmptySpace>
                <table className="w-full">
                  <thead>
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faRankingStar} />
                      </td>
                      <td>Country</td>
                      <td style={{ color: 'gold' }}>
                        <FontAwesomeIcon icon={faMedal} />
                      </td>
                      <td style={{ color: 'silver' }}>
                        <FontAwesomeIcon icon={faMedal} />
                      </td>
                      <td style={{ color: 'bronze' }}>
                        <FontAwesomeIcon icon={faMedal} />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPlus} />
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {medalTable.map((score) => (
                      <tr>
                        <td className="p-2">{score.rank}</td>
                        <td className="p-2 flex flex-row gap-2 items-center">
                          <img src={score.flagUrl} style={{ height: '2rem' }} />
                          {score.countryName}
                        </td>
                        <td className="p-2">{score.gold}</td>
                        <td className="p-2">{score.silver}</td>
                        <td className="p-2">{score.bronze}</td>
                        <td className="p-2">{score.gold + score.silver + score.bronze}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </VerticalScroll>
            </div>
          </div>
          <div
            className="bg-black text-white bg-opacity-60 rounded-xl flex-1 h-full p-8 flex flex-col"
            style={{ maxHeight: 800 }}
          >
            <div
              className="text-center text-6xl font-medium pb-5 flex flex-row gap-6 items-center justify-center"
              style={{ fontFamily: 'Olympics2024' }}
            >
              <img src={dutchMedals?.flagUrl ?? ''} style={{ height: '4rem' }} />
              Dutch medals
            </div>
            <div className="text-center flex flex-row gap-6 justify-center items-center mb-8">
              <div className="flex-1 flex flex-row gap-2 justify-center items-center">
                <FontAwesomeIcon style={{ color: 'silver' }} icon={faMedal} />
                <span>{dutchMedals?.silver ?? 0}</span>
              </div>
              <div className="flex-1 text-5xl flex flex-row gap-2 justify-center items-center">
                <FontAwesomeIcon style={{ color: 'gold' }} icon={faMedal} />
                {dutchMedals?.gold ?? 0}
              </div>
              <div className="flex-1 flex flex-row gap-2 justify-center items-center">
                <FontAwesomeIcon style={{ color: 'bronze' }} icon={faMedal} />
                {dutchMedals?.bronze ?? 0}
              </div>
            </div>
            <div style={{ maxHeight: 570 }}>
              <VerticalScroll
                visible={visible}
                items={dutchMedals?.medals.length ?? 0}
                scrollEmptySpace
              >
                <table>
                  <tbody>
                    {dutchMedals?.medals.map((medal) => (
                      <tr>
                        <td className="pb-4 pr-4">{medal.medal}</td>
                        <td className="pb-4">
                          <p className="text-5xl">
                            {medal.sportName} - {medal.eventName}
                          </p>
                          <p>{medal.participantName}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </VerticalScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
