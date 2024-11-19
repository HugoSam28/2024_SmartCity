import { StatusBar } from 'expo-status-bar';
import Scan from './screens/scan'
import Map from './screens/map'
import List from './screens/list'
import Profile from './screens/profile'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from "react-native";
import Styles from "./components/styles";



const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Styles/>
        <Tab.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Scan" component={Scan}/>
          <Tab.Screen name="Search" component={Map}/>
          <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

