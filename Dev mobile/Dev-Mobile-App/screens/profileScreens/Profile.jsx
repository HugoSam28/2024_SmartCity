import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context"; // Utilisation des icônes d'Ionicons
import { GlobalStyles, Colors } from "../../components/styles";
import {useThemeContext} from "../../provider/Theme";
import {useLanguageContext} from "../../provider/LanguageContext";

export default function ProfileMenu({ navigation }) {
  const {i18n} = useLanguageContext();

  const menuItems = [
    { icon: 'person-outline', label: i18n.t('account'), screen: 'Account' },
    { icon: 'list-outline', label: i18n.t('subscriptions'), screen: 'Subscriptions' },
    { icon: 'car-outline', label: i18n.t('history'), screen: 'History' },
    { icon: 'person-add-outline', label: i18n.t('inviteFriends'), screen: 'InviteFriends' },
    { icon: 'settings-outline', label: i18n.t('settings'), screen: 'Settings' },
    { icon: 'help-circle-outline', label: i18n.t('help'), screen: 'Help' },
  ];
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lalie</Text>
      <Text style={styles.title}>De Biourge</Text>
      <View style={{...styles.subContainer, marginTop: 40}}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon} size={24} color={Colors(theme).text} />
            <Text style={{...styles.text, marginLeft: 10, fontSize: 20 }} >{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}