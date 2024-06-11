import React, { FC } from 'react';
import { useAuthenticationContext } from '../services/authentication/authentication.context';
import TabNavigator from './AppTabNavigator';
import LoginNavigator from './LoginNavigator';

const AppNavigator: FC = () => {
  const { authUser } = useAuthenticationContext();
  return authUser ? <TabNavigator /> : <LoginNavigator />;
};

export default AppNavigator;
