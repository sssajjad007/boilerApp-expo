import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal } from 'react-native';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SplashBackground, LogoWhite } from '../../styles';
import Lottie from 'lottie-react-native';
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import { dispatch } from '../../redux/store';
import { setConnection, setInternet } from '../../redux/slices/app';
import { getBranchCode, getBranches } from '../../redux/slices/branch';
import { getVersion } from '../../api/app';
import { platform } from '../../utils/deviceUi';
import DeviceInfo from 'react-native-device-info';
import { has, retrieve } from '../../core/mmkv';
import { setAuth } from '../../api';

const VIEWS = {
  loading: 'loading',
  network: 'network',
  branchList: 'branchList',
};

export function SplashManager() {
  const [modalVisible, setModalVisible] = useState(true);
  const animationRef = useRef(null);
  const [view, setView] = useState(VIEWS.loading);

  // addEventListener triggers multiple times so i used fetch instead
  // but it triggers only once so i used addEventListener and fetch together
  // to get the current state and listen to changes
  // i used useRef to store the function and call it when i need to check the network again

  const checkNetworkEvent = () => {
    console.log('checkNetwork');
    const unsubscribeNetInfo = NetInfo.addEventListener((state: NetInfoState) => {
      const { isConnected, isInternetReachable, details, type } = state;
      console.log('isConnectedEvent: ', isConnected);
      dispatch(setConnection(!!isConnected));
      dispatch(setInternet(!!isInternetReachable));
    });
    return unsubscribeNetInfo;
  };
  const checkNetwork = (callback: (arg: boolean | null) => void) => {
    NetInfo.fetch().then((state: NetInfoState) => {
      const { isConnected, isInternetReachable, details, type } = state;
      console.log('isConnected: ', isConnected);
      dispatch(setConnection(!!isConnected));
      dispatch(setInternet(!!isInternetReachable));
      callback(isConnected);
    });
  };

  const checkUser = async (callback: (arg: boolean | null) => void) => {
    // check if user is logged in
    const token = retrieve('token', 'string');
    const refreshToken = retrieve('refreshToken', 'string');
    if (refreshToken && token) {
      setAuth({ refreshToken, token }, false);
      const { success } = await getBranchCode();
      if (success) {
        callback(success);
      } else {
        setTimeout(() => {
          opacity.value = 0;
        }, 200);
        // go to login
      }
    } else {
      setTimeout(() => {
        opacity.value = 0;
      }, 200);
      // go to login
    }
  };
  const checkVersion = async () => {
    const version = DeviceInfo.getVersion();
    const { data } = await getVersion(version, platform);
    if (data && data.updateNeeded) {
    } else if (data && data.forceUpdate) {
    } else {
    }
  };

  const splashRetryRef = useRef<() => void>();
  useEffect(() => {
    let unsubscribeNetInfo: NetInfoSubscription;
    checkNetworkEvent();
    const splashRetry = () => {
      unsubscribeNetInfo && unsubscribeNetInfo();
      // there is callback hell here :|
      // i will refactor it later
      // i used callback hell to make sure that the functions are executed in order
      // i will replace it with async await
      // like this: await checkNetwork(); await checkUser(); await getBranches();
      // and then i will use try catch to handle errors
      checkNetwork((isConnected) => {
        if (isConnected) {
          checkUser((success) => {
            if (success) {
              getBranches((data) => {
                if (data) {
                  setTimeout(() => {
                    opacity.value = 0;
                  }, 200);
                }
              });
            } else {
            }
          });
        } else {
        }
      });
    };
    splashRetryRef.current = splashRetry;
    splashRetry();
    // return () => {
    //   unsubscribeNetInfo();
    // };
  }, []);
  //////////////////////////////////////////
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
      <SplashBackground style={[activeStyle]}>
        <LogoWhite />
        <Lottie
          ref={animationRef}
          renderMode="HARDWARE"
          source={require('../../../lottie/loading.json')}
          autoPlay
          loop
          style={{ width: 64, height: 64 }}
        />
      </SplashBackground>
    </Modal>
  );
}
