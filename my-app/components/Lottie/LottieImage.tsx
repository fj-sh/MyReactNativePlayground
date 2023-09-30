import tw from 'twrnc';
import { View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';

export default function LottieImage() {
  const animation = useRef<LottieView>(null);
  const play = () => {
    animation.current?.play();
  };

  const pause = () => {
    animation.current?.pause();
  };
  const stop = () => {
    animation.current?.reset();
  };
  useEffect(() => {}, []);
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <TouchableOpacity onPress={play}>
        <Text>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stop}>
        <Text>stop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pause}>
        <Text>pause</Text>
      </TouchableOpacity>
      <LottieView
        autoPlay={false}
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        source={require('./check.json')}
        loop={false}
      />
    </View>
  );
}
