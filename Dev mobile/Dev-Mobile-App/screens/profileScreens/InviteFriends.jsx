import {View, Text, Image, Share, Alert,TouchableOpacity} from "react-native";
import {useContext} from "react";
import ThemeContext from "../../provider/Theme";
import {Colors, GlobalStyles} from "../../components/styles";
import BackButton from "../../components/buttons/BackButton";
import ActionButton from "../../components/buttons/ActionButton";
import {useEffect} from "react";
import * as Clipboard from 'expo-clipboard'
import {Tooltip} from "react-native-paper";

export default function InviteFriends({ navigation }) {
  const theme = useContext(ThemeContext);

  //IMPORTANT ! PERMET DE MASQUER LA TAB BAR
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors(theme).backgroundColor
      }
    });
  }, [navigation]);
  const styles = GlobalStyles(theme);

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
  const handleCopy = async () => {
    await Clipboard.setStringAsync('3XH9S8V2');
  }
  return (
    <>
      <View style={{...styles.container, alignItems: "center"}}>
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
          marginTop: 265,
          textAlign: "center",
          fontSize: 33,
          fontFamily: "RobotoCondensedBold",
        }}>Invite tes amis !</Text>
        <Text
          style={{
            ...styles.text,
            textAlign: "center",
            fontSize: 16,
            marginTop: 70}}
        >
          En donnant ce code à ton pote lors de son inscription, chacun recevra 3€ sur son compte 👀
        </Text>

        <Tooltip title="Copié !" enterTouchDelay={1} leaveTouchDelay={1000} theme={theme}>
          <TouchableOpacity
            style={{
              marginTop: 90,
              height: 54,
              width:200,
              borderRadius: 15,
              justifyContent: "center",
              backgroundColor: Colors(theme).containerBackgroundColor,
            }}
            onPress={handleCopy}
          >
            <Text
              style={{
                ...styles.subtitle,
                fontSize:30,
                textAlign: "center",
                color: Colors(theme).text,}}
            >
              3XH9S8V2
            </Text>
          </TouchableOpacity>
        </Tooltip>

        <ActionButton onPress={handleShare} text={'Partager'} />
      </View>
      <Text style={{...styles.text, fontSize: 14, postition: 'absolute', bottom: 139, textAlign: 'center', }}>Tu peux parrainer jusqu’à 10 personnes !</Text>
    </>
  );
}