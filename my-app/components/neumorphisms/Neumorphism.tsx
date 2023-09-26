import { Canvas, Fill, runTiming, useTouchHandler, useValue } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { NeumorphismButton } from './NeumorphismButton';

const { width } = Dimensions.get('window');
const PADDING = 32;
const size = width - PADDING * 2;
const x = PADDING;
const y = 75;
export const Neumorphism = () => {
  const pressed = useValue(0);
  const onTouch = useTouchHandler({
    onStart: () => {
      runTiming(pressed, pressed.current === 0 ? 0 : 1, { duration: 150 });
    },
  });

  return (
    <Canvas style={{ flex: 1 }} onTouch={onTouch}>
      <Fill color="#F0F0F3" />
      <NeumorphismButton x={x} y={y} size={size} />
    </Canvas>
  );
};
