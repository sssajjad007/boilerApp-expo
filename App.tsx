import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import myTheme from './src/styles/theme';
import { RootState, store, useSelector } from './src/redux/store';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/Login';
import moment from 'moment-jalaali';
import { SplashManager } from './src/screens/splash';
import { useFonts } from 'expo-font';

moment.loadPersian({ dialect: 'persian-modern' });
//screenOptions={{ statusBarAnimation: 'fade', statusBarColor: "red", animationDuration: 1000, animationTypeForReplace: "push", animation: "flip", statusBarTranslucent: true }}
const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    DelinoIcon: require('./assets/fonts/delino-icon.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <SplashManager />
            <StartApp />
          </NavigationContainer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}

export function StartApp() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        // User is signed in
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}
export default App;
