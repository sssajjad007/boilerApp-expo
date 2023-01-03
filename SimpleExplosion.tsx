import { FC } from 'react';
import {
  Circle,
  rgba,
  SkiaValue,
  useComputedValue,
  useClockValue,
  useTiming,
} from '@shopify/react-native-skia';

export const SimpleExplosion: FC<{
  cx: number | SkiaValue<number>;
  cy: number | SkiaValue<number>;
  duration: number;
}> = ({ cx, cy, duration }) => {
  const alpha = useTiming({ from: 1, to: 0 }, { duration });
  const clock = useClockValue();
  const opacity = useComputedValue(() => {
    return (clock.current % duration) / duration;
  }, [clock]);

  return <Circle cx={cx} cy={cy} r={50} color={"yellow"} opacity={opacity} />
};
