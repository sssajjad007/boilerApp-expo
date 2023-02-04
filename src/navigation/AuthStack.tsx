import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/Login';

type IAuthStackParamList = {
  LoginScreen: undefined;
};
const AuthStack = createNativeStackNavigator<IAuthStackParamList>();

export default function AuthNavigation() {
  return (
    <AuthStack.Navigator initialRouteName={'LoginScreen'}>
      <AuthStack.Screen name={'LoginScreen'} component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
