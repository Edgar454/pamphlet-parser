import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const AnimatedView = ({ children, style }) => {
  return (
    <Animated.View 
      entering={FadeIn.duration(400)} 
      exiting={FadeOut.duration(300)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};