import React, { useEffect, useRef, useState } from 'react';
import { Modal, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SplashBackground, LogoWhite } from '../../styles';
import Lottie from 'lottie-react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { setConnection, setInternet } from '../../redux/slices/app';
import { getBranches } from '../../redux/slices/branch';
import { getVersion } from '../../api/app';
import { platform } from '../../utils/deviceUi';
import DeviceInfo from 'react-native-device-info';
import { Version } from '../../api/types';
import NetworkScreen from './Network';
import VersionScreen from './NewVersion';
import IntroScreen from './Intro';
import LoginScreen from '../auth/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { userInit } from '../../redux/slices/user';

export function SplashManager() {
  const [modalVisible, setModalVisible] = useState(true);
  const branchList = useSelector((state: RootState) => state.branch.branchList);
  useEffect(() => {
    if (!branchList) {
      setModalVisible(true);
    }
    if (branchList) {
      setTimeout(() => {
        opacity.value = 0;
      }, 200);
    }
  }, [branchList]);

  const splashFade = () => {
    if (opacity.value === 0) {
      setModalVisible(false);
    }
  };
  const opacity = useSharedValue(1);
  const activeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 300 }, (isFinished) => {
        if (isFinished) {
          runOnJS(splashFade)();
        }
      }),
    };
  });
  return (
    <Modal
      animationType="none"
      statusBarTranslucent
      transparent={true}
      presentationStyle="overFullScreen"
      visible={modalVisible}>
      <Animated.View style={[activeStyle, { flex: 1, backgroundColor: '#EF4123' }]}>
        <ModalContent onHide={() => setModalVisible(false)} />
      </Animated.View>
    </Modal>
  );
}

function ModalContent({ onHide }: { onHide: () => void }) {
  const animationRef = useRef(null);
  const versionRef = useRef<Version | undefined>(undefined);
  const VIEW = {
    network: 'network',
    splash: 'splash',
    version: 'version',
    notification: 'notification',
    intro: 'intro',
    login: 'login',
  };
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(VIEW.splash);
  const refreshTokenFailed = useSelector((state: RootState) => state.user.refreshTokenFailed);
  const statusPassed = useRef({
    network: false,
    version: false,
    intro: false,
    branch: false,
    userLoggedIn: false,
    notification: false,
  });
  let splashRetryRef = useRef<() => void>(() => {});

  // addEventListener triggers multiple times so i used fetch instead
  // but it triggers only once so i used addEventListener and fetch together
  // to get the current state and listen to changes
  // i used useRef to store the function and call it when i need to check the network again

  const splashFade = () => {
    if (opacity.value === 0) {
      console.log('splashFade');
      onHide();
    }
  };
  const onVersionPassed = () => {
    statusPassed.current.version = true;
    console.log('version Done');
    splashRetryRef.current();
  };
  const opacity = useSharedValue(1);
  const activeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 300 }, (isFinished) => {
        if (isFinished) {
          runOnJS(splashFade)();
        }
      }),
    };
  });
  const checkNetwork = async (callback: (arg: boolean | null) => void) => {
    await NetInfo.fetch().then((state: NetInfoState) => {
      const { isConnected, isInternetReachable, details, type } = state;
      dispatch(setConnection(!!isConnected));
      dispatch(setInternet(!!isInternetReachable));
      console.log(isInternetReachable);
      const networkStatus = isConnected && (isInternetReachable === null ? true : isInternetReachable);
      callback(networkStatus);
    });
  };
  // refresh token failed
  useEffect(() => {
    if (refreshTokenFailed) {
      console.log(':: refresh token failed retry Splash from first');
      setView(VIEW.login);
    }
  }, [refreshTokenFailed]);

  const checkVersion = async (callback: (arg: Version | undefined) => void) => {
    const version = DeviceInfo.getVersion();
    console.log('🚀 ~ file: index.tsx:122 ~ checkVersion ~ version', version);
    const { data } = await getVersion('1.0', platform);
    console.log('🚀 ~ file: index.tsx:136 ~ checkVersion ~ data', data);

    if (data) {
      versionRef.current = data;
    }
    callback(data);
    return;
  };

  useEffect(() => {
    const splashRetry = async () => {
      setLoading(true);
      if (!statusPassed.current.network) {
        await checkNetwork((isConnected) => {
          if (isConnected) {
            console.log('network Done');
            statusPassed.current.network = true;
          } else {
            console.log('network Failed');
            setView(VIEW.network);
          }
        });
      }
      if (statusPassed.current.network && !statusPassed.current.version) {
        await checkVersion((data) => {
          if (data && data.updateNeeded) {
            console.log('version Failed');
            setView(VIEW.version);
          } else if (data && data.forceUpdate) {
            console.log('version Failed');
            setView(VIEW.version);
          } else {
            console.log('version Done');
            statusPassed.current.version = true;
          }
        });
      }
      if (statusPassed.current.network && statusPassed.current.version && !statusPassed.current.userLoggedIn) {
        await userInit((success) => {
          if (success) {
            statusPassed.current.userLoggedIn = true;
            console.log('login Done');
          } else {
            console.log('login Failed');
            setView(VIEW.login);
          }
        });
      }
      if (
        statusPassed.current.network &&
        statusPassed.current.version &&
        statusPassed.current.userLoggedIn &&
        !statusPassed.current.branch
      ) {
        await getBranches((data) => {
          if (data) {
            statusPassed.current.branch = true;
            console.log('userLoggedIn Done');
          } else {
            console.log('userLoggedIn Failed');
            //TODO: go to branch View
            // setView(VIEW.login);
          }
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 400);
    };
    splashRetryRef.current = splashRetry;
    splashRetry();
  }, []);

  if (view === VIEW.network) {
    return <NetworkScreen onRetry={splashRetryRef.current} loading={loading} />;
  }
  if (view === VIEW.version) {
    return (
      <VersionScreen
        onRetry={splashRetryRef.current}
        onIgnoreHandler={onVersionPassed}
        loading={loading}
        updateUrl={versionRef.current?.urlList || ['']}
      />
    );
  }
  if (view === VIEW.login) {
    return (
      <SafeAreaProvider>
        <LoginScreen />
      </SafeAreaProvider>
    );
  }
  if (view === VIEW.intro) {
    return <IntroScreen />;
  }
  return (
    <SplashBackground style={[activeStyle]}>
      <LogoWhite />
      <Lottie
        ref={animationRef}
        renderMode="AUTOMATIC"
        source={require('../../../lottie/loading.json')}
        autoPlay
        loop
        style={{ width: 64, height: 64, position: 'absolute', top: '60%', left: '50%', marginLeft: -32 }}
      />
    </SplashBackground>
  );
}
