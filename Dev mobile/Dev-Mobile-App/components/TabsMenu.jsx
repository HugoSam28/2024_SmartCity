import Scan from '../screens/Scan'
import MapListNavigator from './MapListNavigator'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Colors } from "./styles";
import React, {useContext} from "react";
import ThemeContext from "../provider/Theme";
import { View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Account from "../screens/profileScreens/Account";
import Subscriptions from "../screens/profileScreens/Subscriptions";
import History from "../screens/profileScreens/History";
import InviteFriends from "../screens/profileScreens/InviteFriends";
import Settings from "../screens/profileScreens/Settings";
import Help from "../screens/profileScreens/Help";
import ProfileMenu from "../screens/profileScreens/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MainTabs() {
  const theme = useContext(ThemeContext);
  const stylesColors = Colors(theme);

  const screenOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: stylesColors.backgroundColor
    }
  }
  return (
      <Tab.Navigator id='BottomTab' screenOptions={screenOptions} initialRouteName="Search">
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
            component={ProfileMenu}
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
  )
}
export default function TabsMenu() {
  return (
    <NavigationContainer>
      <Stack.Navigator id='Profile' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='tab'
          component={MainTabs}
        />
        <Stack.Screen
          name='account'
          component={Account}
        />
        <Stack.Screen
          name='susbscriptions'
          component={Subscriptions}
        />
        <Stack.Screen
          name='history'
          component={History}
        />
        <Stack.Screen
          name='inviteFriends'
          component={InviteFriends}
        />
        <Stack.Screen
          name='settings'
          component={Settings}
          options={{tabBarStyle: { display: 'none' }}}
        />
        <Stack.Screen
          name='help'
          component={Help}
          options={{tabBarStyle: { display: 'none' }}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// Structure de https://reactnavigation.org/docs/hiding-tabbar-in-screens/
// Pour ne pas afficher le menu sur les composants enfants de Profile
// J'admet que la structure semble particuliere mais c'est ça, ou faire un useEffect dans les enfants,
// qui vient supprimer le tab bar du composant parent pour le remettre par la suite; mais ca foirait avec les changemennts de theme