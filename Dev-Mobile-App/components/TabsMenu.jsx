import Scan from '../screens/scan'
import MapListNavigator from '../components/mapListNavigator'
import Profile from '../screens/profile'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from "./styles";
import React, {useContext} from "react";
import ThemeContext from "../provider/Theme";
import { View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';



const Tab = createBottomTabNavigator();


export default function TabsMenu() {
  const theme = useContext(ThemeContext);
  const stylesColors = colors(theme);

  const screenOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: stylesColors.backgroundColor
    }
  }
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="Scan"
            component={Scan}
            options={{
              tabBarInactiveTintColor: stylesColors.iconColor,
              tabBarActiveTintColor: stylesColors.accentColor,
              tabBarLabelStyle: {
                fontSize: 13,
                fontFamily: 'RobotoMono'
              },
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons
                      name={focused ? 'qr-code' : 'qr-code-outline'}
                      color={focused ? stylesColors.accentColor : stylesColors.iconColor}
                      size={24}
                    />
                  </View>
                )
              }
            }}
          />
          <Tab.Screen
            name="Search"
            component={MapListNavigator}
            options={{
              tabBarInactiveTintColor: stylesColors.iconColor,
              tabBarActiveTintColor: stylesColors.accentColor,
              tabBarLabelStyle: {
                fontSize: 13,
                fontFamily: 'RobotoMono'
              },
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons
                      name={focused ? 'search' : 'search-outline'}
                      size={24}
                      color={focused ? stylesColors.accentColor : stylesColors.iconColor}
                    />
                  </View>
                )
              }
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarInactiveTintColor: stylesColors.iconColor,
              tabBarActiveTintColor: stylesColors.accentColor,
              tabBarLabelStyle: {
                fontSize: 13,
                fontFamily: 'RobotoMono'
              },
              tabBarIcon: ({focused}) => {
                return (
                    <Ionicons
                      name={focused ? 'person' : 'person-outline'}
                      size={24}
                      color={focused ? stylesColors.accentColor : stylesColors.iconColor}
                    />
                )
              }
            }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  )
}