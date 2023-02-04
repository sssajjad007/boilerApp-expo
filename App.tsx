import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import myTheme from './src/styles/theme';
import { dispatch, RootState, store, useSelector } from './src/redux/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/Login';
import moment from 'moment-jalaali';
import { SplashManager } from './src/screens/splash';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FoodModal from './src/screens/menu/FoodList/FoodModal';
import { createModalProvider, Alert } from 'react-native-unicorn-modals';
import { CustomModal } from './src/components/AlertModal';
import { AlertTheme } from './src/components/AlertModal/theme';
import SearchModal from './src/screens/menu/FoodList/SearchModal';
import EditModal from './src/screens/menu/FoodList/EditModal';
//screenOptions={{ statusBarAnimation: 'fade', statusBarColor: "red", animationDuration: 1000, animationTypeForReplace: "push", animation: "flip", statusBarTranslucent: true }}
import RNBootSplash from 'react-native-bootsplash';
import { setConnection, setInternet } from './src/redux/slices/app';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useFonts } from 'expo-font';

moment.loadPersian({ dialect: 'persian-modern' });

function App() {
  const ModalProvider = createModalProvider({ customModal: CustomModal }, { animationDuration: 200 });
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
          <ModalProvider theme={AlertTheme}>
            <NavigationContainer
              onReady={() =>
                setTimeout(() => {
                  RNBootSplash.hide();
                }, 100)
              }>
              <BottomSheetModalProvider>
                <SplashManager />
                <StartApp />
              </BottomSheetModalProvider>
            </NavigationContainer>
          </ModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}

export function StartApp() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const checkNetworkEvent = () => {
      const unsubscribeNetInfo = NetInfo.addEventListener((state: NetInfoState) => {
        const { isConnected, isInternetReachable, details, type } = state;
        console.log('isConnectedEvent: ', isConnected, '&', isInternetReachable);
        dispatch(setConnection(!!isConnected));
        dispatch(setInternet(!!isInternetReachable));
      });
      return unsubscribeNetInfo;
    };
    const unsubscribeNetInfo = checkNetworkEvent();
    return () => unsubscribeNetInfo();
  }, []);

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
        <>
          <Stack.Screen
            name="DrawerNavigation"
            component={DrawerNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={'FoodModal'}
            component={FoodModal}
            options={{ presentation: 'containedModal', headerShown: false }}
          />
          <Stack.Screen
            name={'SearchModal'}
            component={SearchModal}
            options={{ presentation: 'containedModal', headerShown: false }}
          />
          <Stack.Screen
            name={'EditModal'}
            component={EditModal}
            options={{ presentation: 'containedModal', headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
export default App;
