import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

import { Link } from 'expo-router';
import PersonBook from '../../components/ZustandExample/PersonBook';
import { useAppPersistStore } from '../../lib/store/zustandStorage';

export default function Page() {
  const { isDarkTheme, setIsDarkTheme } = useAppPersistStore();

  const themeStyles = {
    textColor: isDarkTheme ? 'white' : 'black',
    backgroundColor: isDarkTheme ? 'black' : 'white',
    linkBackgroundColor: isDarkTheme ? '#333' : '#FF5722',
    borderColor: isDarkTheme ? '#444' : '#F4511E',
  };
  return (
    <>
      <PersonBook />
      <Pressable
        onPress={() => {
          setIsDarkTheme(!isDarkTheme);
        }}
      >
        <Text
          style={{
            ...styles.switchText,
            color: themeStyles.textColor,
            backgroundColor: themeStyles.backgroundColor,
            marginVertical: 16,
            width: 200,
            alignSelf: 'center',
          }}
        >
          {isDarkTheme ? 'Dark Theme' : 'Light Theme'}
        </Text>
      </Pressable>
      <View style={styles.linkContainer}>
        <Link href={'/'} style={styles.linkButton}>
          <Text style={styles.linkText}>Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  switchText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
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
});
