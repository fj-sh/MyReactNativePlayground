import tw from 'twrnc';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';

export default function LottieImage() {
  const animation = useRef<LottieView>(null);
  useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text>Hello World</Text>
      <LottieView
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        source={require('./check.json')}
      />
    </View>
  );
}
