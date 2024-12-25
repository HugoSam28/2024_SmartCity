import Scan from '../screens/Scan'
import MapListNavigator from './MapListNavigator'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Colors } from "./styles";
import {useThemeContext} from "../provider/Theme";
import { View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Account from "../screens/profileScreens/Account";
import Subscriptions from "../screens/profileScreens/Subscriptions";
import History from "../screens/profileScreens/History";
import InviteFriends from "../screens/profileScreens/InviteFriends";
import Settings from "../screens/profileScreens/Settings";
import Help from "../screens/profileScreens/Help";
import ProfileMenu from "../screens/profileScreens/Profile";
import {useLanguageContext} from "../provider/LanguageContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MainTabs() {
  const {theme} = useThemeContext();
  const stylesColors = Colors(theme);
  const {i18n} = useLanguageContext();

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
                >{i18n.t('search')}</Text>
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
                >{i18n.t('profile')}</Text>
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
          name='Tab'
          component={MainTabs}
        />
        <Stack.Screen
          name='Account'
          component={Account}
        />
        <Stack.Screen
          name='Susbscriptions'
          component={Subscriptions}
        />
        <Stack.Screen
          name='History'
          component={History}
        />
        <Stack.Screen
          name='InviteFriends'
          component={InviteFriends}
        />
        <Stack.Screen
          name='Settings'
          component={Settings}
        />
        <Stack.Screen
          name='Help'
          component={Help}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// Structure de https://reactnavigation.org/docs/hiding-tabbar-in-screens/
// Pour ne pas afficher le menu sur les composants enfants de Profile
// J'admet que la structure semble particuliere mais c'est ça, ou faire un useEffect dans les enfants,
// qui vient supprimer le tab bar du composant parent pour le remettre par la suite; mais ca foirait avec les changemennts de theme