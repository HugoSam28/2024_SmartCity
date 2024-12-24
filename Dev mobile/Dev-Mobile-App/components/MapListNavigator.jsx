import Map from '../screens/Map';
import List from '../screens/List';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function MapListNavigator() {
  return (
    <Stack.Navigator initialRouteName="Map" screenOptions={{headerShown: false}}>
      <Stack.Screen
        initialParams={{screen: 'Map'}}
        options={{unmountonBlur: true, animation: 'none'}}
        name="Map"
        component={Map}
      />
      <Stack.Screen
        initialParams={{screen: 'List'}}
        options={{unmountonBlur: true, animation: 'none'}}
        name="List"
        component={List}
      />
    </Stack.Navigator>

  )
}
