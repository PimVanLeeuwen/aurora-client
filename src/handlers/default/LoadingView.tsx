import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default function LoadingView({ children }: Props) {
  return (
    <div
      style={{ fontSize: '32px' }}
      className="w-screen h-screen flex flex-col gap-2 items-center justify-center"
    >
      {children}
    </div>
  );
}
