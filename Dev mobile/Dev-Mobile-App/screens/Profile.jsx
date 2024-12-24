import { GlobalStyles } from "../components/styles";
import { useContext } from "react";
import ThemeContext from "../provider/Theme";
import {createStackNavigator} from "@react-navigation/native/src/__stubs__/createStackNavigator";
import {default as ProfileMenu} from "./profileScreens/Profile";
import Account from "./profileScreens/Account";
import Subscriptions from "./profileScreens/Subscriptions";
import History from "./profileScreens/History";
import InviteFriends from "./profileScreens/InviteFriends";
import Settings from "./profileScreens/Settings";
import Help from "./profileScreens/Help";

export default function Profile(){
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles(theme);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator id='Profile' screenOptions={{headerShown: false}}>
      <Stack.Screen
        name='profile'
        component={ProfileMenu}
      />
      <Stack.Screen
        name='account'
        component={Account}
        options={{tabBar: { visible: false }}}
      />
      <Stack.Screen
        name='susbscriptions'
        component={Subscriptions}
        options={{tabBarStyle: { display: 'none' }}}
      />
      <Stack.Screen
        name='history'
        component={History}
        options={{tabBarStyle: { display: 'none' }}}
      />
      <Stack.Screen
        name='inviteFriends'
        component={InviteFriends}
        options={{tabBar: { visible: false }}}
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
  )
}

/*<View style={styles.container}>
      <Text style={styles.title}>Pute = Thoams</Text>
      <Text style={styles.subtitle}>Hugo le Supreme leader</Text>
      <Text style={styles.text}>
        Le reste:
        Le corps du texte (et pas du Christ 👀)
      </Text>
    </View>
 */