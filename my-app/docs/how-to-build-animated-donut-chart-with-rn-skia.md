
## React Native Skia をインストール

```shell
npm i @shopify/react-native-skia
```

## CircularProgress.tsx


```tsx
import {
  Canvas,
  Path,
  type SkFont,
  Skia,
  type SkiaMutableValue,
  Text,
} from '@shopify/react-native-skia';
import { StyleSheet, View } from 'react-native';

interface DonutChartProps {
  strokeWidth: number;
  radius: number;
  percentageCompleted: SkiaMutableValue<number>;
  font: SkFont;
  smallerFont: SkFont;
  targetPercentage: number;
}

export default function DonutChart({
  strokeWidth,
  radius,
  targetPercentage,
  font,
  smallerFont,
  percentageCompleted,
}: DonutChartProps) {
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
```

## App.tsx から呼び出す

```tsx
import { PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native';
import DonutChart from './components/DonutChart';
import { runTiming, useFont, useValue, Easing } from '@shopify/react-native-skia';

const RADIUS = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 12;
export default function App() {
  const percentageComplete = 0.85;
  const animationState = useValue(0);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const font = useFont(require('./Roboto-Light.ttf'), 60);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const smallerFont = useFont(require('./Roboto-Light.ttf'), 25);

  const animateChart = () => {
    animationState.current = 0;

    runTiming(animationState, percentageComplete, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  if (font == null || smallerFont == null) return <View></View>;

  return (
    <View style={styles.container}>
      <View style={styles.donutChartContainer}>
        <CircularProgress
          strokeWidth={STROKE_WIDTH}
          radius={RADIUS}
          percentageCompleted={animationState}
          font={font}
          smallerFont={smallerFont}
          targetPercentage={percentageComplete}
        />
      </View>
      <Pressable onPress={animateChart} style={styles.button}>
        <Text style={styles.buttonText}>Animate !</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 40,
    backgroundColor: 'blue',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  donutChartContainer: {
    height: RADIUS * 2,
    width: RADIUS * 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

```

## 参考

https://www.youtube.com/watch?v=VSynoqXjQvg
