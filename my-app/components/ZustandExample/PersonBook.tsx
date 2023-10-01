// https://github.com/pmndrs/zustand/blob/main/docs/guides/updating-state.md

import { usePersonStore } from '../../lib/store/usePersonStore';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function PersonBook() {
  const firstName = usePersonStore((state) => state.firstName);
  const updateFirstName = usePersonStore((state) => state.updateFirstName);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.name}>{firstName}</Text>
      <TextInput
        style={styles.input}
        onChange={(e) => {
          updateFirstName(e.nativeEvent.text);
        }}
        value={firstName}
      />
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
