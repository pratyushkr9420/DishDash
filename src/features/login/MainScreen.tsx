import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import React, { FC, useRef } from 'react';
import styled from 'styled-components/native';
import { StyledCenteredView } from '../../components/StyledComponents';
import { LoginNavigatorParams } from '../../utils/types';
import BackgroundImage from './component/BackgroundImage';
import { StyledAuthButton, StyledTitle } from './component/authComponents';

const StyledMainScreenContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  gap: 20px;
`;

type MainScreenProps = {
  navigation: StackNavigationProp<LoginNavigatorParams, 'Main'>;
};

const MainScreen: FC<MainScreenProps> = ({ navigation }) => {
  const animation = useRef(null);
  return (
    <BackgroundImage>
      <StyledCenteredView>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            position: 'absolute',
            top: 50,
            width: 300,
            height: 300,
          }}
          source={require('../../../assets/hamburger.json')}
        />
        <StyledTitle>DishDash</StyledTitle>
        <StyledMainScreenContainer>
          <StyledAuthButton
            icon="login"
            mode="contained"
            buttonColor="skyblue"
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </StyledAuthButton>
          <StyledAuthButton
            icon="account-plus"
            mode="contained"
            buttonColor="skyblue"
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </StyledAuthButton>
        </StyledMainScreenContainer>
      </StyledCenteredView>
    </BackgroundImage>
  );
};
export default MainScreen;
