import { StyleSheet } from "react-native";
import { useFonts} from "expo-font";

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
  containerInArrayColor: "#D3E9FF",     // Bouton dans les encadrer
  selected: "#D3E9FF",
}
const darkColors = {
  backgroundColor: "#1C2335",
  text: "#F2F6FF",
  iconColor: "#F2F6FF",
  mutedColor: "#666666",
  containerBackgroundColor: "#29334D",
  containerInArrayColor: "#333F5E",
  selected: "#333F5E",


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
    }
  });
}