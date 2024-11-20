import { StatusBar } from 'expo-status-bar';
import Scan from './screens/scan'
import MapListNavigator from './components/mapListNavigator'
import Profile from './screens/profile'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoadStyles from "./components/styles";
import {useColorScheme} from "react-native";
import ThemeContext from "./provider/Theme";

const Tab = createBottomTabNavigator();

export default function App() {
  const theme = useColorScheme();
  return (
    <ThemeContext.Provider value={theme}>
      <NavigationContainer>
        <LoadStyles/>
        <Tab.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Scan" component={Scan}/>
          <Tab.Screen name="Search" component={MapListNavigator}/>
          <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

