import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CheckoutErrorScreen from '../features/checkout/screens/CheckoutErrorScreen';
import CheckoutScreen from '../features/checkout/screens/CheckoutScreen';
import CheckoutSuccessScreen from '../features/checkout/screens/CheckoutSuccessScreen';
import { CheckoutNavigatorParams } from '../utils/types';

const CheckoutStackNavigator = createStackNavigator<CheckoutNavigatorParams>();

const CheckoutNavigator = () => {
  return (
    <CheckoutStackNavigator.Navigator
      initialRouteName="CheckoutScreen"
      screenOptions={{ headerShown: false }}
    >
      <CheckoutStackNavigator.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
      />
      <CheckoutStackNavigator.Screen
        name="CheckoutSuccessScreen"
        component={CheckoutSuccessScreen}
      />
      <CheckoutStackNavigator.Screen
        name="CheckoutErrorScreen"
        component={CheckoutErrorScreen}
      />
    </CheckoutStackNavigator.Navigator>
  );
};

export default CheckoutNavigator;
