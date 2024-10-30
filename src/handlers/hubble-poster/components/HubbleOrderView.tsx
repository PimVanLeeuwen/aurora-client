import { useEffect } from 'react';

interface Props {
  orders: number[];
}

export default function HubbleOrderView({ orders }: Props) {

  useEffect(() => {
  //   Do something when the orders change
  }, [orders]);

  return (
    <div
      TEST
    />
  );
}
