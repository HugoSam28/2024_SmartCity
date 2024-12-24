import Scan from '../screens/Scan'
import MapListNavigator from './MapListNavigator'
import Profile from '../screens/Profile'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from "./styles";
import React, {useContext} from "react";
import ThemeContext from "../provider/Theme";
import { View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';



const Tab = createBottomTabNavigator();


export default function TabsMenu() {
  const theme = useContext(ThemeContext);
  const stylesColors = Colors(theme);

  const screenOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: stylesColors.backgroundColor
    }
  }
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="Search">
          <Tab.Screen
            name="Scan"
            component={Scan}
            options={{
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: focused ? 'RobotoMonoBold' : 'RobotoMono',
                    color: focused ? stylesColors.accentColor : stylesColors.iconColor,
                  }}
                >Scan</Text>
              ),
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
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: focused ? 'RobotoMonoBold' : 'RobotoMono',
                    color: focused ? stylesColors.accentColor : stylesColors.iconColor,
                  }}
                >Search</Text>
              ),
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
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: focused ? 'RobotoMonoBold' : 'RobotoMono',
                    color: focused ? stylesColors.accentColor : stylesColors.iconColor,
                  }}
                >Profile</Text>
              ),
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