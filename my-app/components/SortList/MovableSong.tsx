import Animated, {
  cancelAnimation,
  runOnJS,
  type SharedValue,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Platform, useWindowDimensions, View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import {
  Gesture,
  GestureDetector,
  type GestureStateChangeEvent,
  type LongPressGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { clamp } from 'react-native-redash';

export interface SongProps {
  artist: string;
  cover: string;
  title: string;
}
interface MovableSongProps extends SongProps {
  id: string;
  positions: SharedValue<Record<string, number>>;
  scrollY: SharedValue<number>;
  songsCount: number;
}

interface MovableSongProps extends SongProps {
  id: string;
  positions: SharedValue<Record<string, number>>;
  scrollY: SharedValue<number>;
  songsCount: number;
}

export const SONG_HEIGHT = 70;
export const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT;
function Song({ artist, cover, title }: SongProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: SONG_HEIGHT,
        padding: 10,
      }}
    >
      <Image source={{ uri: cover }} style={{ height: 50, width: 50, borderRadius: 4 }} />

      <View
        style={{
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4,
          }}
        >
          {title}
        </Text>

        <Text style={{ fontSize: 12, color: 'gray' }}>{artist}</Text>
      </View>
    </View>
  );
}

function objectMove(
  object: Record<string, number>,
  from: number,
  to: number
): Record<string, number> {
  'worklet';
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}
export default function MovableSong({
  id,
  artist,
  cover,
  title,
  positions,
  scrollY,
  songsCount,
}: MovableSongProps) {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT);

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT);
        }
      }
    },
    [moving]
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);

      if (Platform.OS === 'ios') {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Scroll up
        scrollY.value = withTiming(0, { duration: 1500 });
      } else if (positionY >= scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD) {
        // Scroll down
        const contentHeight = songsCount * SONG_HEIGHT;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = withTiming(maxScroll, { duration: 1500 });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(Math.floor(positionY / SONG_HEIGHT), 0, songsCount - 1);

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(positions.value, positions.value[id], newPosition);

        if (Platform.OS === 'ios') {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    },
    onFinish() {
      top.value = positions.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  const longPress = Gesture.LongPress().onStart(
    (event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
      runOnJS(setMoving)(true);

      console.log('event.absoluteY:', event.absoluteY);

      if (Platform.OS === 'ios') {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  const isLongPressed = useSharedValue(false);
  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((event, stateManager) => {
      if (isLongPressed.value) {
        stateManager.activate();
      } else {
        stateManager.fail();
      }
      runOnJS(setMoving)(true);

      if (Platform.OS === 'ios') {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
    })
    .onUpdate((event) => {
      console.log(event.x);
      const positionY = event.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Scroll up
        scrollY.value = withTiming(0, { duration: 1500 });
      } else if (positionY >= scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD) {
        // Scroll down
        const contentHeight = songsCount * SONG_HEIGHT;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = withTiming(maxScroll, { duration: 1500 });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(Math.floor(positionY / SONG_HEIGHT), 0, songsCount - 1);

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(positions.value, positions.value[id], newPosition);

        if (Platform.OS === 'ios') {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    })
    .onTouchesUp(() => {
      isLongPressed.value = false;
      top.value = positions.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    });

  // 以下の stackoverflow の回答を参考にした
  // https://stackoverflow.com/questions/70715041/how-do-i-implement-a-drag-after-a-long-press-using-react-native-gesture-handler
  const composed = Gesture.Simultaneous(longPress, panGesture);

  return (
    <Animated.View style={animatedStyle}>
      <BlurView intensity={moving ? 100 : 0} tint="light">
        {/* <PanGestureHandler onGestureEvent={gestureHandler}> */}
        {/*   <Animated.View style={{ maxWidth: '80%' }}> */}
        {/*     <Song artist={artist} cover={cover} title={title} /> */}
        {/*   </Animated.View> */}
        {/* </PanGestureHandler> */}
        <GestureDetector gesture={composed}>
          <Animated.View style={{ maxWidth: '80%' }}>
            <Song artist={artist} cover={cover} title={title} />
          </Animated.View>
        </GestureDetector>
      </BlurView>
    </Animated.View>
  );
}
