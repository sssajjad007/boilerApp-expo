import { useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Canvas, Circle, Fill, useTiming } from '@shopify/react-native-skia';

import { Rocket } from './Rocket';
import { Sprayer } from './Sprayer';

let id = 0;

const rocketDuration = 3000;
const rocketTimeOffset = Platform.OS === 'ios' ? 100 : 125;

export default function App() {
  const [rockets, setRockets] = useState<number[]>([]);
  const [sprayer, setSprayer] = useState(false);
  const ref = useRef<NodeJS.Timer>();
  // I somehow needed a top level timing to keep all other timings running - ideas are welcome
  const x = useTiming({ from: -50, to: -30, loop: true });

  const launchRocket = () => {
    const myId = id;
    id += 1;
    setRockets((rs) => [...rs, myId]);
    setTimeout(() => {
      setRockets((rs) => rs.filter((r) => r !== myId));
    }, rocketDuration);
  };

  return (
    <>
      <Canvas style={styles.container}>
        <Fill color={'black'} />
        {rockets.map((currentId, i) => {
          return <Rocket key={currentId} />;
        })}
        {sprayer ? <Sprayer /> : null}
        <Circle cx={x} cy={50} r={10} color="black" />
      </Canvas>
      <TouchableOpacity style={styles.sprayerButton} onPress={() => setSprayer(!sprayer)}>
        <Text>Sprayer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rocketButton}
        onPressIn={() => {
          launchRocket();
          ref.current = setInterval(launchRocket, rocketTimeOffset);
        }}
        onPressOut={() => {
          clearInterval(ref.current);
        }}>
        <Text>Rocket</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  rocketButton: {
    position: 'absolute',
    bottom: 60,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprayerButton: {
    position: 'absolute',
    bottom: 150,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
