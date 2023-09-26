import { Link } from 'expo-router';
import { StyleSheet, View, Text, PixelRatio, Pressable } from 'react-native';
import { Easing, runTiming, useFont, useValue } from '@shopify/react-native-skia';
import CircularProgress from '../../components/CircularProgress';

const RADIUS = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 12;
export default function Page() {
  const percentageComplete = 0.85;
  const animationState = useValue(0);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const font = useFont(require('../../Roboto-Light.ttf'), 60);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const smallerFont = useFont(require('../../Roboto-Light.ttf'), 25);

  const animateChart = () => {
    animationState.current = 0;

    runTiming(animationState, percentageComplete, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const isFontLoaded = font != null && smallerFont != null;

  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <Link href={'/'} style={styles.linkButton}>
          <Text style={styles.linkText}>Home</Text>
        </Link>
      </View>

      {isFontLoaded && (
        <>
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  linkContainer: {
    marginVertical: 16,
  },
  linkButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F4511E',
    borderWidth: 1,
  },
  linkText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  donutChartContainer: {
    height: RADIUS * 2,
    width: RADIUS * 2,
  },
  button: {
    marginTop: 40,
    backgroundColor: 'blue',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
