import tw from 'twrnc';
import { View } from 'react-native';
import LottieImage from './LottieImage';

export default function LottieExample() {
  return (
    <View style={tw`flex-1 bg-white mt-[55] mx-4`}>
      <LottieImage />
    </View>
  );
}
