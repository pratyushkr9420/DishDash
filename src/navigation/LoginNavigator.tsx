import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../features/login/LoginScreen';
import MainScreen from '../features/login/MainScreen';
import RegisterScreen from '../features/login/RegisterScreen';
import { LoginNavigatorParams } from '../utils/types';

const LoginStackNavigator = createStackNavigator<LoginNavigatorParams>();

const LoginNavigator = () => {
  return (
    <NavigationContainer>
      <LoginStackNavigator.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <LoginStackNavigator.Screen name="Main" component={MainScreen} />
        <LoginStackNavigator.Screen name="Login" component={LoginScreen} />
        <LoginStackNavigator.Screen
          name="Register"
          component={RegisterScreen}
        />
      </LoginStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigator;
