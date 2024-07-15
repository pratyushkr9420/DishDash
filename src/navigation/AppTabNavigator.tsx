import { Entypo, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MapScreen from '../features/map/screens/MapScreen';
import { CartProvider } from '../services/cart/cart.context';
import { FavoritesProvider } from '../services/favorites/favorites.context';
import { LocationProvider } from '../services/location/location.context';
import { RestaurantsProvider } from '../services/restaurants/restaurant.context';
import { theme } from '../theme';
import { RootStackParamList } from '../utils/types';
import CheckoutNavigator from './CheckoutNavigator';
import RestaurantsNavigator from './RestaurantsNavigator';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <LocationProvider>
          <RestaurantsProvider>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName="Restaurants"
                screenOptions={({ route }) => ({
                  headerShown: false,
                  tabBarStyle: {
                    backgroundColor: theme.colors.brand.secondary,
                  },
                  tabBarLabelStyle: {
                    color: theme.colors.bg.primary,
                  },
                  tabBarIcon: ({ focused, color, size }) => {
                    switch (route.name) {
                      case 'Restaurants':
                        return (
                          <Ionicons
                            name="restaurant"
                            size={size}
                            color={
                              focused
                                ? theme.colors.bg.primary
                                : theme.colors.ui.disabled
                            }
                          />
                        );
                      case 'Checkout':
                        return (
                          <Ionicons
                            name="cart"
                            size={size}
                            color={
                              focused
                                ? theme.colors.bg.primary
                                : theme.colors.ui.disabled
                            }
                          />
                        );
                      case 'Maps':
                        return (
                          <Entypo
                            name="map"
                            size={size}
                            color={
                              focused
                                ? theme.colors.bg.primary
                                : theme.colors.ui.disabled
                            }
                          />
                        );
                      case 'Settings':
                        return (
                          <Ionicons
                            name="settings"
                            size={size}
                            color={
                              focused
                                ? theme.colors.bg.primary
                                : theme.colors.ui.disabled
                            }
                          />
                        );
                    }
                  },
                })}
              >
                <Tab.Screen
                  name="Restaurants"
                  component={RestaurantsNavigator}
                />
                <Tab.Screen name="Checkout" component={CheckoutNavigator} />
                <Tab.Screen name="Maps" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
              </Tab.Navigator>
            </NavigationContainer>
          </RestaurantsProvider>
        </LocationProvider>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default TabNavigator;
