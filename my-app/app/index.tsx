import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { usePersonStore } from '../lib/store/usePersonStore';

export default function Page() {
  const firstName = usePersonStore((state) => state.firstName);
  return (
    <View style={styles.container}>
      <Link href={'/samples/skia-circular-progress'} style={styles.linkButton}>
        <Text style={styles.linkText}>Skia Circular Progress</Text>
      </Link>
      <Link href={'/samples/arc-slider'} style={styles.linkButton}>
        <Text style={styles.linkText}>Arc Slider</Text>
      </Link>
      <Link href={'/samples/neumorphism'} style={styles.linkButton}>
        <Text style={styles.linkText}>Neumorphism</Text>
      </Link>
      <Link href={'/samples/browser'} style={styles.linkButton}>
        <Text style={styles.linkText}>Browser</Text>
      </Link>
      <Link href={'/samples/lottie'} style={styles.linkButton}>
        <Text style={styles.linkText}>lottie</Text>
      </Link>
      <Link href={'/samples/sort-list'} style={styles.linkButton}>
        <Text style={styles.linkText}>SortableList</Text>
      </Link>
      <Link href={'/samples/swipe-to-delete'} style={styles.linkButton}>
        <Text style={styles.linkText}>SwipeToDelete</Text>
      </Link>

      <Link href={'/samples/zustand'} style={styles.linkButton}>
        <Text style={styles.linkText}>{firstName}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    backgroundColor: '#304FFE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0056b3',
    borderWidth: 1,
    marginVertical: 16,
  },
  linkText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});
