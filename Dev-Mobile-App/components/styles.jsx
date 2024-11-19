// viewVariables/styles.js
import { StyleSheet } from "react-native";
import { useFonts} from "expo-font";

export default function LoadStyles() {
  const [loaded] = useFonts({
    Podkova: require("../assets/fonts/Podkova-Regular.ttf"),
    RobotoCondensed: require("../assets/fonts/RobotoCondensed-Regular.ttf"),
    RobotoMono: require("../assets/fonts/RobotoMono-Regular.ttf"),
  })
  if (!loaded) {
    return null;
  }
  return true;
}

// Couleurs globales
export const Colors = {
  accentColor: "#1E5AFF",               // Couleur d'accentuation
  backgroundColor: "#FAFDFF",           // Couleur de fond
  text: "#00005E",                      // Texte principal
  iconColor: "#00005E",                 // Couleur des icones
  mutedColor: "#666666",                // Texte secondaire
  containerBackGroundColor: "#ECF3FF",  // Encadrer
  containerInArrayColor: "#D3E9FF",     // Bouton dans les encadrer
};
export const ColorsDark = {
  accentColor: "#1E5AFF",
  backgroundColor: "#1C2335",
  text: "#F2F6FF",
  iconColor: "#F2F6FF",
  mutedColor: "#666666",
  containerBackGroundColor: "#29334D",
  containerInArrayColor: "#333F5E",

};

// Tailles et espacements
export const Sizes = {
  small: 15,
  medium: 26,
  large: 24,
  extraLarge: 47,
};

// Styles globaux
export const GlobalStyles = StyleSheet.create({
  title: {
    fontSize: Sizes.extraLarge,
    fontFamily: "Podkova",
    color: Colors.text,
  },
  subtitle: {
    fontFamily: "RobotoCondensed",
    fontSize: Sizes.medium,
    color: Colors.text,
  },
  text: {
    fontSize: Sizes.small,
    fontFamily: "RobotoMono",
    color: Colors.text,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: Sizes.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
});