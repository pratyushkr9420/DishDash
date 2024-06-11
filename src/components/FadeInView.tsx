import React, { FC, useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';
import styled from 'styled-components/native';

type FadeInViewProps = {
  duration: number;
} & Animated.AnimatedProps<ViewProps>;

const StyledAnimatedView = styled(Animated.View)`
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const FadeInView: FC<FadeInViewProps> = ({
  duration = 1500,
  children,
  style,
  ...props
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <StyledAnimatedView style={[style, { opacity: fadeAnim }]} {...props}>
      {children}
    </StyledAnimatedView>
  );
};

export default FadeInView;
