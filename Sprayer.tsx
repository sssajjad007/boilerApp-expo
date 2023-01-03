import { FC, useState } from "react";
import {
  Circle,
  useComputedValue,
  useClockValue,
  Skia,
  Path,
} from "@shopify/react-native-skia";
import { getRandomColor } from "./helpers";
import { Platform, useWindowDimensions } from "react-native";

const pathX = (start: number, acc: number, time: number) => {
  return start + acc * time;
};
const pathY = (start: number, acc: number, time: number) => {
  return start - acc * (1 - Math.pow(time / 1000 - 1, 2));
};

const speedX = 0.25;
const speedY = 350;

const timeOffset = Platform.OS === "ios" ? 40 : 65;

const MiniExplosion: FC<{ cx: number; cy: number; index: number }> = ({
  cx,
  cy,
  index,
}) => {
  const clock = useClockValue();
  const [{ startX, startY }] = useState({
    startX: (Math.random() * speedX - speedX * 0.5) * 0.5,
    startY: Math.random() * speedY * 0.5 + speedY * 0.5,
  });
  const x = useComputedValue(() => {
    return pathX(
      cx,
      startX,
      Math.max(0, (clock.current - index * timeOffset) % 1500)
    );
  }, [clock]);
  const y = useComputedValue(() => {
    return (
      cy +
      pathY(0, startY, Math.max(0, (clock.current - index * timeOffset) % 1500))
    );
  }, [clock]);
  const [color] = useState(getRandomColor());

  return <Circle cx={x} cy={y} r={3} color={color} />;
};

const particleCount = Platform.OS === "ios" ? 60 : 30;

export const Sprayer: FC = () => {
  const { width, height } = useWindowDimensions();
  const cx = width / 2;
  const cy = height - 20;

  const path = Skia.Path.Make();
  path.moveTo(cx - 10, cy);
  path.lineTo(cx, cy - 30);
  path.lineTo(cx + 10, cy);
  path.close();

  return (
    <>
      {Array(particleCount)
        .fill(0)
        .map((_, i) => (
          <MiniExplosion key={`${i}`} index={i} cx={cx} cy={cy - 30} />
        ))}
      <Path path={path} color="white" />
    </>
  );
};
