import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportScreen from '../screens/reports';

type IReportStackParamList = {
  ReportScreen: undefined;
};
const reportStack = createNativeStackNavigator<IReportStackParamList>();
export default function reportNavigation() {
  return (
    <reportStack.Navigator initialRouteName={'ReportScreen'}>
      <reportStack.Screen name={'ReportScreen'} component={ReportScreen} options={{ headerShown: false }} />
    </reportStack.Navigator>
  );
}
