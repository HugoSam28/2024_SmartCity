import { Text, Image, Share, Alert } from "react-native";
import {useThemeContext} from "../../provider/Theme";
import {Colors, GlobalStyles} from "../../components/styles";
import BackButton from "../../components/buttons/BackButton";
import ActionButton from "../../components/buttons/ActionButton";
import ClipboardToast from "react-native-clipboard-toast";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLanguageContext} from "../../provider/LanguageContext";

export default function InviteFriends({ navigation }) {
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  const {i18n} = useLanguageContext();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `J'ai une superbe offre pour toi ! Inscris toi vite chez ShareCrash avec mon code de parrainage (3XH9S8V2), et démarre avec 3€ sur ton compte!\nhttps://scharecrash.com/register`
      })
    }
    catch (error) {
      Alert.alert(error.message);
    }
  }
  return (
    <>
      <SafeAreaView style={{...styles.container, alignItems: "center"}}>
        <BackButton onPress={() => navigation.goBack()} />

        <Image
          source={require('../../assets/main.png')}
          style={{
            position: "absolute",
            top: 15,
            right: 0,
            width: '55%',
            resizeMode: "contain",
          }}
        />
        <Image
          source={require('../../assets/carte.png')}
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            width: '67%',
            resizeMode: "contain",
          }}
        />
        <Text style={{
          ...styles.subtitle,
          marginTop: 220,
          textAlign: "center",
          fontSize: 33,
          fontFamily: "RobotoCondensedBold",
        }}>{i18n.t('inviteYourFriends')}</Text>
        <Text
          style={{
            ...styles.text,
            textAlign: "center",
            fontSize: 16,
            marginTop: 70}}
        >
          {i18n.t('inviteTextView')}
        </Text>
        <ClipboardToast
          textToShow='3XH9S8V2'
          textToCopy='3XH9S8V2'
          toastText='Copié !'
          containerStyle={{
            marginTop: 90,
            height: 54,
            width:180,
            borderRadius: 15,
            justifyContent: "center",
            backgroundColor: Colors(theme).containerBackgroundColor,
          }}
          textStyle={{
            ...styles.subtitle,
            fontSize:27,
            textAlign: "center",
            color: Colors(theme).text
          }}
          accessibilityLabel={"Clique ici pour copier ton code de parrainage"}
          toastPosition={'center'}
          toastDuration={1000}
        />
        <ActionButton onPress={handleShare} text={i18n.t('share')} />
      </SafeAreaView>
      <Text style={{...styles.text, fontSize: 14, postition: 'absolute', bottom: 140, textAlign: 'center', }}>{i18n.t('max10Friends')}</Text>
    </>
  );
}