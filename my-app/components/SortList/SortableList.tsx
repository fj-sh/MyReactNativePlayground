import { SafeAreaView, StatusBar } from 'react-native';
import { SONGS, type SongType } from './songs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  scrollTo,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import MovableSong from './MovableSong';

function clamp(value: number, lowerBound: number, upperBound: number): number {
  'worklet';
  return Math.max(lowerBound, Math.min(value, upperBound));
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

function listToObject(list: SongType[]): Record<string, number> {
  const object: Record<string, number> = {};

  for (let i = 0; i < list.length; i++) {
    object[list[i].id] = i;
  }

  return object;
}

export const SONG_HEIGHT = 70;
export const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT;

export default function SortableList() {
  const positions = useSharedValue(listToObject(SONGS));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => {
      scrollTo(scrollViewRef, 0, scrolling, false);
    },
    [scrollY.value]
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{
              flex: 1,
              position: 'relative',
              backgroundColor: 'white',
            }}
            contentContainerStyle={{
              height: SONGS.length * SONG_HEIGHT,
            }}
          >
            {SONGS.map((song) => (
              <MovableSong
                key={song.id}
                id={song.id}
                artist={song.artist}
                cover={song.cover}
                title={song.title}
                positions={positions}
                scrollY={scrollY}
                songsCount={SONGS.length}
              />
            ))}
          </Animated.ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
