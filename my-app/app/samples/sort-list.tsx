import Browser from '../../components/Browser';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import SortableList from '../../components/SortList/SortableList';

export default function Page() {
  return (
    <>
      <SortableList />
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
