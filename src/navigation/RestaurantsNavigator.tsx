import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RestaurantDetailScreen from '../features/restaurants/screens/RestaurantDetailScreen';
import RestaurantDisplayScreen from '../features/restaurants/screens/RestaurantsDisplayScreen';
import { RestaurantsNavigatorParams } from '../utils/types';

const RestaurantsStackNavigator =
  createStackNavigator<RestaurantsNavigatorParams>();

const RestaurantsNavigator = () => {
  return (
    <RestaurantsStackNavigator.Navigator
      initialRouteName="RestaurantsScreen"
      screenOptions={{ headerShown: false }}
    >
      <RestaurantsStackNavigator.Screen
        name="RestaurantsScreen"
        component={RestaurantDisplayScreen}
      />
      <RestaurantsStackNavigator.Screen
        name="RestaurantDetail"
        options={{
          presentation: 'modal',
        }}
        component={RestaurantDetailScreen}
      />
    </RestaurantsStackNavigator.Navigator>
  );
};

export default RestaurantsNavigator;
