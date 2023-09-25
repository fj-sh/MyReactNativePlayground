import { PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native';

import { runTiming, useFont, useValue, Easing } from '@shopify/react-native-skia';
import CircularProgress from './components/CircularProgress';
import ReAnimatedCircularProgress from './components/ReAnimatedCircularProgress';

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
