import Map from '../screens/map';
import List from '../screens/list';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function MapListNavigator() {
  return (
    <Stack.Navigator initialRouteName="Map" screenOptions={{headerShown: false}}>
      <Stack.Screen
        initialParams={{screen: 'Map'}}
        options={{unmountonBlur: true, animation: 'slide_from_left'}}
        name="Map"
        component={Map}
      />
      <Stack.Screen
        initialParams={{screen: 'List'}}
        options={{unmountonBlur: true, animation: 'slide_from_right'}}
        name="List"
        component={List}
      />
    </Stack.Navigator>

  )
}
