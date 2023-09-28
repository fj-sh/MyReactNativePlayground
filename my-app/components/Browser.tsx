import { Button, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { type WebBrowserResult } from 'expo-web-browser';

export default function Browser() {
  const [result, setResult] = useState<WebBrowserResult | null>(null);

  const _handlePressButtonAsync = async () => {
    const result = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(result);
  };
  return (
    <View style={styles.container}>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
      <Text>{result !== null && JSON.stringify(result)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
