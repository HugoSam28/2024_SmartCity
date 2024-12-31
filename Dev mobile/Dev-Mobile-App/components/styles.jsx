import {StyleSheet} from "react-native";
import {useFonts} from "expo-font";

export default function LoadStyles() {
  const [loaded] = useFonts({
    Podkova: require("../assets/fonts/Podkova-Regular.ttf"),
    RobotoCondensed: require("../assets/fonts/RobotoCondensed.ttf"),
    RobotoCondensedBold: require("../assets/fonts/RobotoCondensed-Bold.ttf"),
    RobotoMono: require("../assets/fonts/RobotoMono-Regular.ttf"),
    RobotoMonoBold: require("../assets/fonts/RobotoMono-Bold.ttf"),
  })
}

// Couleurs globales ! Ne pas utiliser en dehors du Colors(theme) !
const lightColors = {
  backgroundColor: "#FAFDFF",           // Couleur de fond
  text: "#000095",                      // Texte principal
  iconColor: "#000095",                 // Couleur des icones
  mutedColor: "#666666",                // Texte secondaire
  containerBackgroundColor: "#ECF3FF",  // Encadrer
  containerInArrayColor: "#e0edff",     // Bouton dans les encadrer
  selected: "#e0edff",
  shadowColor: "#5b5b5b",
}
const darkColors = {
  backgroundColor: "#1C2335",
  text: "#F2F6FF",
  iconColor: "#F2F6FF",
  mutedColor: "#666666",
  containerBackgroundColor: "#29334D",
  containerInArrayColor: "#333F5E",
  selected: "#333F5E",
  shadowColor: "#000000",


};

export function Colors(theme){
  return (
    {
      accentColor: "#1E5AFF",
      backgroundColor: theme === 'light' ? lightColors.backgroundColor : darkColors.backgroundColor,
      text: theme === 'light' ? lightColors.text : darkColors.text,
      iconColor: theme === 'light' ? lightColors.iconColor : darkColors.iconColor,
      mutedColor: theme === 'light' ? lightColors.mutedColor : darkColors.mutedColor,
      containerBackgroundColor: theme === 'light' ? lightColors.containerBackgroundColor : darkColors.containerBackgroundColor,
      containerInArrayColor: theme === 'light' ? lightColors.containerInArrayColor : darkColors.containerInArrayColor,
      selected: theme === 'light' ? lightColors.selected : darkColors.selected,
      shadowColor: theme === 'light' ? lightColors.shadowColor : darkColors.shadowColor,
    }
  );
}

export const Sizes = {
  extraSmall: 12,
  small: 15,
  medium: 26,
  large: 35,
  extraLarge: 45,
};

export function GlobalStyles(theme){
  return StyleSheet.create({
    title: {
      fontSize: Sizes.extraLarge,
      fontFamily: "Podkova",
      color: Colors(theme).text,
    },
    subtitle: {
      fontFamily: "RobotoCondensed",
      fontSize: Sizes.medium,
      color: Colors(theme).text,
    },
    text: {
      fontSize: Sizes.small,
      fontFamily: "RobotoMono",
      color: Colors(theme).text,
    },
    container: {
      height: '100%',
      backgroundColor: Colors(theme).backgroundColor,
      padding: Sizes.medium,
    },
    subContainer: {
      flexDirection: "column",
      backgroundColor: Colors(theme).containerBackgroundColor,
      borderRadius: Sizes.small,
      padding: Sizes.small,
      gap: 25,
    },
    profileContainer: {
      height: '100%',
      backgroundColor: Colors(theme).backgroundColor,
      padding: Sizes.medium,
      paddingTop: 95
    },
    label: {
      fontFamily: "RobotoCondensed",
      fontSize: Sizes.medium,
      color: Colors(theme).text,
      marginBottom: 7,
      marginLeft: 2,
    },
    input: {
      height: Sizes.extraLarge,
      width: '100%',
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors(theme).mutedColor,
      color: Colors(theme).text,
    },
    button: {
      height: 30,
      width: '45%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 50,
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginTop: 20,
    }
  });
}