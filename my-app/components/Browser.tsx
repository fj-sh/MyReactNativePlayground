import { Button, View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { type WebBrowserResult } from 'expo-web-browser';

export default function Browser() {
  const [result, setResult] = useState<WebBrowserResult | null>(null);

  const _handlePressButtonAsync = async () => {
    const result = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(result);
  };

  const targetURL = `https://react.dev/learn`;
  const fetchTitleAndSummary = async () => {
    try {
      const response = await fetch(targetURL);
      if (response.ok) {
        const htmlText = await response.text();
        const titleMatch = htmlText.match(/<title>([^<]*)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'No title found';

        // sectionタグの直下の最初のpタグの内容を取得
        const sectionMatch = htmlText.match(/<section[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/i);
        let mainContent;

        if (sectionMatch) {
          mainContent = sectionMatch[1];
        } else {
          // articleタグの内容を取得
          const articleMatch = htmlText.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
          mainContent = articleMatch ? articleMatch[1] : 'No article or section content found';
        }

        // タグを除去してプレーンテキストを取得し、最初の140文字を取得
        const bodyText = mainContent
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        const bodySummary = bodyText.substr(0, 140);

        return { title, bodySummary };
      } else {
        throw new Error(`HTTP response not ok: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchTitleAndSummary().then((data) => {
      console.log(`title: ${data?.title}`);
      console.log(`bodySummary: ${data?.bodySummary}`);
    });
  }, []);
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
