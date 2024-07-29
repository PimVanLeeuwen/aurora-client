import { useEffect, useState } from 'react';
import { HandlersService, MedalTableRecord } from '../../../../api';
import VerticalScroll from '../../../../components/VerticalScroll';

export default function OlympicsPoster() {
  const [medalTable, setMedalTable] = useState<MedalTableRecord[]>([]);

  useEffect(() => {
    HandlersService.getMedalTable().then((res) => {
      setMedalTable(res);
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
          <div className="bg-black text-white bg-opacity-60 rounded-xl flex-1 h-full p-8 flex flex-col">
            <div
              className="text-center text-6xl font-medium pb-5"
              style={{ fontFamily: 'Olympics2024' }}
            >
              Medal table
            </div>
            <div className="w-full flex-1 overflow-hidden block">
              <VerticalScroll visible items={medalTable.length} scrollEmptySpace>
                <table className="w-full">
                  <thead>
                    <tr>
                      <td />
                      <td>Country</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {medalTable.map((score, i) => (
                      <tr>
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{score.countryName}</td>
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
          <div className="bg-black text-white bg-opacity-60 rounded-xl flex-1 h-full p-8 flex flex-col"></div>
        </div>
      </div>
    </div>
  );
}
