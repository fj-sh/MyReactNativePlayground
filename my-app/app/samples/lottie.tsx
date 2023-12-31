import LottieExample from '../../components/Lottie/LottieExample';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <>
      <LottieExample />
      <View style={styles.linkContainer}>
        <Link href={'/'} style={styles.linkButton}>
          <Text style={styles.linkText}>Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
});
