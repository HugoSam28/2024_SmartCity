import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Scan from './screens/scan'
import Map from './screens/map'
import List from './screens/list'
import Profile from './screens/profile'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Scan" component={Scan}/>
          <Tab.Screen name="Search" component={Map}/>
          <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
