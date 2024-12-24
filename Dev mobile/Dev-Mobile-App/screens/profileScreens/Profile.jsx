import React, {useContext} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context"; // Utilisation des icônes d'Ionicons
import { GlobalStyles, Colors, Sizes } from "../../components/styles";
import ThemeContext from "../../provider/Theme";


export default function ProfileMenu({ navigation }) {
  const menuItems = [
    { icon: 'person-outline', label: 'Compte', screen: 'account' },
    { icon: 'list-outline', label: 'Abonnements', screen: 'subscriptions' },
    { icon: 'car-outline', label: 'Historique', screen: 'history' },
    { icon: 'person-add-outline', label: 'Inviter des amis', screen: 'inviteFriends' },
    { icon: 'settings-outline', label: 'Paramètres', screen: 'settings' },
    { icon: 'help-circle-outline', label: 'Aide', screen: 'help' },
  ];
  const theme = useContext(ThemeContext);
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
            onPress={() => navigation.navigate(item.screen)} // Navigation vers la page correspondante
          >
            <Ionicons name={item.icon} size={24} color={Colors(theme).text} />
            <Text style={{...styles.text, marginLeft: 10, fontSize: 20 }} >{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
}

const ViewStyles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row', // Alignement horizontal
    alignItems: 'center',
    paddingVertical: 15, // Espacement vertical
    paddingHorizontal: 10, // Espacement horizontal
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 15, // Espacement entre l'icône et le texte
  },
  label: {
    fontSize: 16,
    color: '#1e3a8a', // Couleur du texte
    fontWeight: '500',
  },
});