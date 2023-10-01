import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function MusicPlayer() {
  const [sound, setSound] = React.useState<Audio.Sound>();

  async function playSound() {
    console.log('Loading Sound');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { sound } = await Audio.Sound.createAsync(require('./assets/sample.mp3'));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function pauseSound() {
    console.log('Pausing Sound');
    await sound?.pauseAsync();
  }

  React.useEffect(() => {
    return sound != null
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
      <Button title={'Pause Sound'} onPress={pauseSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 16,
  },
});
