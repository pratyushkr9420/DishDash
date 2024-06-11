import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthenticationProvider } from './src/services/authentication/authentication.context';
import { theme } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular: require('./assets/fonts/Lato-Regular.ttf'),
    Lato_400Regular: require('./assets/fonts/Oswald-Regular.ttf'),
    Oswald_Bold: require('./assets/fonts/Oswald-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <AppNavigator />
      </AuthenticationProvider>
    </ThemeProvider>
  );
}
