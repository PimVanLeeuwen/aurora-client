import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface Props extends PropsWithChildren {
  visible: boolean;
  timeout?: number;
  items?: number;
}

export default function VerticalScroll({ children, visible, timeout, items }: Props) {
  const containerRef = useRef<HTMLDivElement>();
  const childRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!containerRef.current || !childRef.current || !visible) return;

    const containerHeight = containerRef.current.clientHeight;
    const childHeight = childRef.current.clientHeight;
    const absoluteHeightDifference = childHeight - containerHeight;
    const relativeHeightDifference = absoluteHeightDifference / containerHeight;

    if (absoluteHeightDifference <= 0) return;

    const keyframes: Keyframe[] = [
      {
        transform: 'translateY(0)'
      },
      {
        transform: `translateY(-${absoluteHeightDifference}px)`
      }
    ];
    const options: KeyframeAnimationOptions = {
      duration: Math.max(relativeHeightDifference * 12000, timeout),
      delay: 3000
    };

    childRef.current.animate(keyframes, options);
  }, [containerRef, childRef, visible, items]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <div ref={childRef} className="w-fit h-fit">
        {children}
      </div>
    </div>
  );
}
