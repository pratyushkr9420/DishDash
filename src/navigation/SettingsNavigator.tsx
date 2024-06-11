import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CameraScreen from '../features/settings/screens/CameraScreen';
import FavoritesScreen from '../features/settings/screens/FavoritesScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';
import { theme } from '../theme';
import { SettingsNavigatorParams } from '../utils/types';

const SettingsStackNavigator = createStackNavigator<SettingsNavigatorParams>();

const SettingsNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{ headerShown: true }}
    >
      <SettingsStackNavigator.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerTintColor: theme.colors.brand.secondary,
        }}
        component={SettingsScreen}
      />
      <SettingsStackNavigator.Screen
        name="FavoritesScreen"
        options={{
          title: 'Favorites',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerTintColor: theme.colors.brand.secondary,
        }}
        component={FavoritesScreen}
      />
      <SettingsStackNavigator.Screen
        name="CameraScreen"
        options={{
          headerShown: false,
        }}
        component={CameraScreen}
      />
    </SettingsStackNavigator.Navigator>
  );
};

export default SettingsNavigator;
