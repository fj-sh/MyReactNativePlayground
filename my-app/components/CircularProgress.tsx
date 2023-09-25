import {
  Canvas,
  Path,
  type SkFont,
  Skia,
  type SkiaMutableValue,
  Text,
} from '@shopify/react-native-skia';
import { StyleSheet, View } from 'react-native';

interface CircularProgressProps {
  strokeWidth: number;
  radius: number;
  percentageCompleted: SkiaMutableValue<number>;
  font: SkFont;
  smallerFont: SkFont;
  targetPercentage: number;
}

export default function CircularProgress({
  strokeWidth,
  radius,
  targetPercentage,
  font,
  smallerFont,
  percentageCompleted,
}: CircularProgressProps) {
  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${targetPercentage * 100}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const width = font.getTextWidth(targetText);

  const getPathColor = (targetPercentage: number) => {
    if (targetPercentage < 0.5) return 'green';
    if (targetPercentage < 0.8) return 'orange';
    return 'red';
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color={getPathColor(targetPercentage)}
          style={'stroke'}
          strokeWidth={strokeWidth}
          strokeCap={'round'}
          start={0}
          end={percentageCompleted}
        />
        <Text
          x={innerRadius - width / 2}
          y={radius + strokeWidth}
          text={targetText}
          font={font}
          opacity={percentageCompleted}
        />
        <Text
          x={innerRadius - width / 2}
          y={radius + 45}
          text={'Power'}
          font={smallerFont}
          opacity={percentageCompleted}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
