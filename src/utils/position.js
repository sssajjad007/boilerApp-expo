import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

const ANDROID_PLATFORM = Platform.OS === 'android' ? true : false;
const ERROR = [
  '',
  'دسترسی به موقعیت شما غیر فعال است',
  'موقعیت شما قابل شناسایی نیست',
  'زمان دسترسی به موقعیت شما طولانی شد',
  'عدم پشتیبانی سرویس موقعیت‌یاب از گوشی شما',
  'موقعیت شما قابل شناسایی نیست',
];

async function getPosition(
  showError = true,
  options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
) {
  let hasLocationPermission = true;
  if (ANDROID_PLATFORM) {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    console.log('granted: ', granted);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      // showError && alert(ERROR[1]);
      hasLocationPermission = false;
    }
  } else {
    await Geolocation.requestAuthorization('whenInUse');
  }
  return new Promise((resolve, reject) => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        resolve,
        (error) => {
          console.log('error granted:', error);
          // showError && alert(ERROR[error.code]);
          reject({
            code: error.code,
            msg: ERROR[error.code],
            platform: Platform.OS,
          });
        },
        { ...options }
      );
    } else {
      reject({ code: 1, msg: ERROR[1], platform: Platform.OS });
    }
  });
}

export default getPosition;
