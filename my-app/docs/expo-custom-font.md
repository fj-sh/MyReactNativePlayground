
## expo-font のインストール

```shell
npx expo install expo-font
```

## Google Fonts から好きなフォントをダウンロード

https://fonts.google.com/specimen/Roboto?query=roboto

## プロジェクトのルートディレクトリにフォントをコピーする

`App.tsx`と同じ階層に `Roboto-Light.ttf` を配置しました。

## useFont でフォントを読み込む

```tsx
export default function App() {
  const percentageComplete = 0.85;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const font = useFont(require('./Roboto-Light.ttf'), 60);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const smallerFont = useFont(require('./Roboto-Light.ttf'), 25);

  if (font == null || smallerFont == null) return <View></View>;

  return (
    <View style={styles.container}>
      <View style={styles.donutChartContainer}>
        <DonutChart
          strokeWidth={STROKE_WIDTH}
          radius={RADIUS}
          percentageCompleted={percentageComplete}
          font={font}
          smallerFont={smallerFont}
          targetPercentage={percentageComplete}
        />
      </View>
      <Pressable
        onPress={() => {
          console.log('pressed');
        }}
      >
        <Text style={styles.buttonText}>Animate !</Text>
      </Pressable>
    </View>
  );
}

```

## Google Fonts

```shell
npx expo install @expo-google-fonts/inter expo-font
```

```tsx
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {  useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 40 }}>Inter Black</Text>
    </View>
  );
}
```

https://github.com/expo/google-fonts

## 参考

https://docs.expo.dev/versions/latest/sdk/font/
