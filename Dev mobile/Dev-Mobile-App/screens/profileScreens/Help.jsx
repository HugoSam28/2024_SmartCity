import {View, Text, TextInput, Linking, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import {useThemeContext} from "../../provider/Theme";
import {Colors, GlobalStyles} from "../../components/styles";
import BackButton from "../../components/buttons/BackButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLanguageContext} from "../../provider/LanguageContext";
import {useState} from "react";
import ActionButton from "../../components/buttons/ActionButton";''

export default function Help({ navigation }) {
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  const {i18n} = useLanguageContext();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const emailInfos = {
    recipients: 'jeremy.beckx@outlook.com',
    subject: 'Yolo<3',
    body: `Hello there !\nI'm ${firstName} ${lastName}, and this is my request:\n\n
Kind regards,\n${lastName} ${firstName}, ${email} | ${phoneNumber}`
  }
  const openDefaultMailApp = () => {
    Linking.openURL(`mailto:${emailInfos.recipients}?subject=${emailInfos.subject}&body=${emailInfos.body}`)
      .then(()=>{
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
      });
  }

  return (
    <ScrollView style={{backgroundColor: Colors(theme).backgroundColor}}>
      <SafeAreaView style={styles.profileContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={{...styles.title}}>{i18n.t('anyQuestion')}</Text>
        <Text style={{...styles.text, marginTop:10, color: Colors(theme).mutedColor}}>
          {i18n.t('helpText')}
        </Text>

        <View style={{...styles.subContainer, paddingTop: 20, marginTop: 30}}>
          <View>
            <Text style={styles.label}>{i18n.t('firstName')}</Text>
            <TextInput
              name={'firstName'}
              label={i18n.t('firstName')}
              placeholder={'John'}
              placeholderTextColor={Colors(theme).text}
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              keyboardAppearance={theme}
            />
          </View>
          <View>
            <Text style={styles.label}>{i18n.t('lastName')}</Text>
            <TextInput
              name={'lastName'}
              label={i18n.t('lastName')}
              placeholder={'Smith'}
              placeholderTextColor={Colors(theme).text}
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              keyboardAppearance={theme}
            />
          </View>
          <View>
            <Text style={styles.label}>{i18n.t('email')}</Text>
            <TextInput
              name={'email'}
              label={i18n.t('email')}
              placeholder={'johnsmith@gmail.com'}
              placeholderTextColor={Colors(theme).text}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardAppearance={theme}
            />
          </View>
          <View>
            <Text style={styles.label}>{i18n.t('phoneNumber')}</Text>
            <TextInput
              name={'phoneNumber'}
              label={i18n.t('phoneNumber')}
              placeholder={'+32123456789'}
              placeholderTextColor={Colors(theme).text}
              style={styles.input}
              value={phoneNumber}
              keyboardType={'phone-pad'}
              onChangeText={setPhoneNumber}
              keyboardAppearance={theme}
            />
          </View>
        </View>
        <ActionButton onPress={openDefaultMailApp}  />
        <TouchableOpacity style={{...loginStyles.button, backgroundColor: Colors(theme).accentColor, marginTop: 40}} onPress={openDefaultMailApp}>
          <Text>{i18n.t('submit')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const loginStyles = StyleSheet.create({
  button: {
      height: 50,
      width: '100%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical:20
    }
  })