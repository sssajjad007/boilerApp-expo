import { FC, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Circle, useTiming } from "@shopify/react-native-skia";
import { ExpandingExplosion } from "./ExpandingExplosion";

const baseDuration = 1000;
const effectDuration = 1000;

export const Rocket: FC = () => {
  const { width, height } = useWindowDimensions();
  const startX = width / 2;
  const startY = height;

  const offsetX = Math.random() * width * 0.5;
  const directionX = Math.sign(Math.random() - 0.5);
  const [endX] = useState(startX + directionX * offsetX);

  const offsetY = height * (0.75 + (Math.random() * 0.5 - 0.25));
  const [endY] = useState(startY - offsetY);

  const x = useTiming({ from: startX, to: endX }, { duration: baseDuration });
  const y = useTiming({ from: startY, to: endY }, { duration: baseDuration });

  const [phase, setPhase] = useState<"base" | "effect">("base");

  useEffect(() => {
    setTimeout(() => {
      setPhase("effect");
    }, baseDuration);
  }, []);

  if (phase === "base") {
    return <Circle cx={x} cy={y} r={3} color="white" />;
  } else {
    return <ExpandingExplosion cx={endX} cy={endY} duration={effectDuration} />;
  }
};
