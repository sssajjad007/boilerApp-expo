import { FC, useState } from "react";
import {
  Circle,
  useComputedValue,
  useClockValue,
  useTiming,
  Group,
} from "@shopify/react-native-skia";
import { getRandomColor } from "./helpers";
import { Platform } from "react-native";

const path = (start: number, acc: number, time: number) => {
  return start + acc * time;
};

const speed = 0.5;

const MiniExplosion: FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
  const clock = useClockValue();
  const [{ startX, startY }] = useState({
    startX: Math.random() * speed - speed / 2,
    startY: Math.random() * speed - speed / 2,
  });
  const x = useComputedValue(() => {
    return path(cx, startX, clock.current);
  }, [clock]);
  const y = useComputedValue(() => {
    return path(cy, startY, clock.current);
  }, [clock]);

  return <Circle cx={x} cy={y} r={5} />;
};

const particleCount = Platform.OS === "ios" ? 15 : 10;

export const ExpandingExplosion: FC<{
  cx: number;
  cy: number;
  duration: number;
}> = ({ cx, cy, duration }) => {
  const opacity = useTiming({ from: 1, to: 0 }, { duration: duration / 2 });
  const [color] = useState(getRandomColor());

  return (
    <>
      <Group opacity={opacity} color={color}>
        {Array(particleCount)
          .fill(0)
          .map((_, i) => (
            <MiniExplosion key={`${i}`} cx={cx} cy={cy} />
          ))}
      </Group>
    </>
  );
};
