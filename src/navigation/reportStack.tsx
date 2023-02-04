import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportScreen from '../screens/reports';
import WebView from '../screens/webView';
import { ReportTab } from './type';

const reportStack = createNativeStackNavigator<ReportTab>();
export default function ReportNavigation() {
  return (
    <reportStack.Navigator initialRouteName={'ReportScreen'}>
      <reportStack.Screen name={'ReportScreen'} component={ReportScreen} options={{ headerShown: false }} />
      <reportStack.Screen
        name={'WebView'}
        component={WebView}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </reportStack.Navigator>
  );
}
