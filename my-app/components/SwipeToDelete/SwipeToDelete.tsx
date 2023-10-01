import { useState } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';

const defaultItems = [
  {
    key: '0',
    title: 'Herb Tonic',
    price: 10.0,
    quantity: 1,
  },
  {
    key: '1',
    title: 'Spicy Tuna',
    price: 12.8,
    quantity: 1,
  },
  {
    key: '2',
    title: 'Tunacado',
    price: 10.2,
    quantity: 1,
  },
  {
    key: '3',
    title: 'Power Shake',
    price: 10,
    quantity: 1,
  },
  {
    key: '4',
    title: 'Power Shake',
    price: 10,
    quantity: 1,
  },
  {
    key: '5',
    title: 'Power Shake',
    price: 10,
    quantity: 1,
  },
  {
    key: '6',
    title: 'Power Shake',
    price: 10,
    quantity: 2,
  },
];
const SwipeToDelete = () => {
  const [items, setItems] = useState(defaultItems);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView>
        <Text style={styles.title}>Your basket</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  restaurant: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#e2e3e4',
    width: 50,
    marginVertical: 16,
    alignSelf: 'center',
  },
  content: {
    marginHorizontal: 16,
  },
  address: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  map: {
    width: 111,
    height: 111,
    marginRight: 16,
  },
  headline: {
    fontSize: 18,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: '#545556',
    lineHeight: 22,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
  },
  deliveryOptions: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  orderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primary: {
    marginVertical: 16,
    color: '#20A454',
    fontSize: 16,
  },
});
export default SwipeToDelete;
