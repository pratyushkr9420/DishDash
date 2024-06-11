import React, { useState } from 'react';
import { ActivityIndicator, MD2Colors, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { StyledCenteredView } from '../../components/StyledComponents';
import { Text } from '../../components/TextComponent';
import { useAuthenticationContext } from '../../services/authentication/authentication.context';
import { colors } from '../../theme/colors';
import BackgroundImage from './component/BackgroundImage';
import { StyledAuthButton } from './component/authComponents';

const StyledLoginContainer = styled.View`
  justify-content: center;
  align-self: center;
  width: 90%;
  background-color: rgba(247, 245, 240, 0.6);
  padding: 20px;
`;

const LoginScreen = () => {
  const { login, isLoadingAuth, error } = useAuthenticationContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <BackgroundImage>
      <StyledCenteredView>
        <StyledLoginContainer>
          <TextInput
            mode="flat"
            label="Email"
            placeholder="Type your email here"
            style={{
              backgroundColor: colors.bg.primary,
              marginVertical: 10,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            mode="flat"
            label="Password"
            placeholder="Type your password here"
            secureTextEntry
            style={{
              backgroundColor: colors.bg.primary,
              marginVertical: 10,
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {isLoadingAuth ? (
            <ActivityIndicator
              animating={true}
              color={MD2Colors.cyan400}
              size={30}
            />
          ) : (
            <StyledAuthButton
              icon="login"
              mode="contained"
              buttonColor="skyblue"
              onPress={() => login(email, password)}
            >
              Login
            </StyledAuthButton>
          )}
          <Text variant="error">{error}</Text>
        </StyledLoginContainer>
      </StyledCenteredView>
    </BackgroundImage>
  );
};
export default LoginScreen;
