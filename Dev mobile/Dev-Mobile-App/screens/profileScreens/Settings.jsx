import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import {useThemeContext} from "../../provider/Theme";
import {Colors, GlobalStyles} from "../../components/styles";
import BackButton from "../../components/buttons/BackButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLanguageContext} from "../../provider/LanguageContext";
import CountryFlag from "react-native-country-flag";
import {useState} from "react";
import SelectDropdown from 'react-native-select-dropdown'
import {Entypo} from "@expo/vector-icons";

export default function Settings({ navigation }) {
  const {theme, userThemeChoice, setTheme} = useThemeContext();
  const styles = GlobalStyles(theme);
  const { i18n, languageChange, locale } = useLanguageContext();
  const [selectedTheme, setSelectedTheme] = useState(userThemeChoice);
  const themeList = [
    {title: i18n.t('light'), value:'light'},
    {title: i18n.t('dark'), value:'dark'},
    {title: i18n.t('auto'), value:'auto'},
  ]
  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <View
        style={{
          ...styles.container,
          alignItems:'center',
          justifyContent:'center',
          flexDirection: "column"
        }}
      >
        <Text style={{...styles.subtitle, fontSize:35, marginBottom:30}}>{i18n.t('theme')}</Text>
        <SelectDropdown
          data={themeList}
          onSelect={(selectedItem) => {
            setSelectedTheme(selectedItem.value)
            setTheme(selectedItem.value)
          }}
          defaultValueByIndex={themeList.findIndex((t) => t.value === userThemeChoice)}
          showsVerticalScrollIndicator={false}
          dropdownStyle={{
            backgroundColor: Colors(theme).containerBackgroundColor,
            borderRadius: 8,
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View
                style={{
                  ...styles.subContainer,
                  width: '60%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection:'row',
                  marginBottom:80
                }}
              >
                <Text style={{...styles.text, fontSize:18}}>
                  {i18n.t(selectedTheme)}
                </Text>
                <Entypo color={Colors(theme).iconColor} name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...(isSelected && {backgroundColor: Colors(theme).containerInArrayColor}),
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}>
                <Text style={{...styles.text, fontFamily: "RobotoMonoBold"}}>{item.title}</Text>
              </View>
            );
          }}
          />

        <Text style={{...styles.subtitle, fontSize:35, marginBottom:30}}>{i18n.t('languages')}</Text>

        <View style={{gap:50, flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={() => {languageChange('fr')}}>
            <CountryFlag isoCode="fr" size={52} style={{borderRadius: 10}} />
            {locale === 'fr' ? (
              <Text
                style={{
                  fontSize:40,
                  marginTop:-13,
                  textAlign:'center',
                  color: Colors(theme).text
                }}
              >•</Text>
            ) : <Text></Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {languageChange('en')}} >
            <CountryFlag isoCode="gb" size={52} style={{borderRadius: 10}} />
            {locale === 'en' ? (
              <Text
                style={{
                  fontSize:40,
                  marginTop:-13,
                  textAlign:'center',
                  color: Colors(theme).text
                }}
              >•</Text>
            ) : <Text></Text>}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
