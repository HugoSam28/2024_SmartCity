import { StyleSheet } from "react-native";
import { useFonts} from "expo-font";

export default function LoadStyles() {
  const [loaded] = useFonts({
    Podkova: require("../assets/fonts/Podkova-Regular.ttf"),
    RobotoCondensed: require("../assets/fonts/RobotoCondensed-Regular.ttf"),
    RobotoMono: require("../assets/fonts/RobotoMono-Regular.ttf"),
    RobotoMonoBold: require("../assets/fonts/RobotoMono-Bold.ttf"),
  })
}

// Couleurs globales
const lightColors = {
  backgroundColor: "#FAFDFF",           // Couleur de fond
  text: "#000095",                      // Texte principal
  iconColor: "#000095",                 // Couleur des icones
  mutedColor: "#666666",                // Texte secondaire
  containerBackGroundColor: "#ECF3FF",  // Encadrer
  containerInArrayColor: "#D3E9FF",     // Bouton dans les encadrer
  selected: "#D3E9FF",
}
const darkColors = {
  backgroundColor: "#1C2335",
  text: "#F2F6FF",
  iconColor: "#F2F6FF",
  mutedColor: "#666666",
  containerBackGroundColor: "#29334D",
  containerInArrayColor: "#333F5E",
  selected: "#333F5E",


};

// Calcule clair/foncé
export function colors(theme){
  return (
    {
      accentColor: "#1E5AFF",
      backgroundColor: theme === 'light' ? lightColors.backgroundColor : darkColors.backgroundColor,
      text: theme === 'light' ? lightColors.text : darkColors.text,
      iconColor: theme === 'light' ? lightColors.iconColor : darkColors.iconColor,
      mutedColor: theme === 'light' ? lightColors.mutedColor : darkColors.mutedColor,
      containerBackGroundColor: theme === 'light' ? lightColors.containerBackGroundColor : darkColors.containerBackGroundColor,
      containerInArrayColor: theme === 'light' ? lightColors.containerInArrayColor : darkColors.containerInArrayColor,
      selected: theme === 'light' ? lightColors.selected : darkColors.selected,
    }
  )
};

// Tailles et espacements
export const Sizes = {
  extraSmall: 12,
  small: 15,
  medium: 26,
  large: 35,
  extraLarge: 47,
};

// Styles globaux
export function GlobalStyles(theme){
  return StyleSheet.create({
    title: {
      fontSize: Sizes.extraLarge,
      fontFamily: "Podkova",
      color: colors(theme).text,
    },
    subtitle: {
      fontFamily: "RobotoCondensed",
      fontSize: Sizes.medium,
      color: colors(theme).text,
    },
    text: {
      fontSize: Sizes.small,
      fontFamily: "RobotoMono",
      color: colors(theme).text,
    },
    container: {
      flex: 1,
      backgroundColor: colors(theme).backgroundColor,
      padding: Sizes.medium,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}