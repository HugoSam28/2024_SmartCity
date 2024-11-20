import { colors, GlobalStyles } from "./styles";
import { useContext, useState } from "react";
import ThemeContext from "../provider/Theme";
import { StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapListSwitch({screen}) {
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles();
  const styleColors = colors(theme)

  const [screenValue, setScreenValue] = useState(screen);
  const navigation = useNavigation();
  const buttonStyle = {
    slected: styleColors.accentColor,
    notSelected: styleColors.mutedColor,
  }

  return (
    <SafeAreaView style={segmentedButtonStyle.container}>
      <SegmentedButtons
        value={screenValue}
        onValueChange={setScreenValue}
        buttons={[
          {
            value: 'map',
            icon:({ size, color }) => (
              <Ionicons
                name={screenValue === 'map' ? 'map' : 'map-outline'}
                size={27}
                color={screenValue === 'map' ? styleColors.accentColor : styleColors.mutedColor} />
            ),
            checkedColor: styleColors.accentColor,
            uncheckedColor: styleColors.mutedColor,
            onPress: () => {
              setScreenValue('map');
              navigation.navigate("Map");
            },
            style: {
              backgroundColor: screenValue === 'map' ? styleColors.selected : styleColors.backgroundColor,
              borderRadius: 12,
            }
          },
          {
            value: 'list',

            icon:({ size, color }) => (
              <Ionicons
                name={screenValue === 'list' ? 'list' : 'list-outline'}
                size={27}
                color={screenValue === 'list' ? styleColors.accentColor : styleColors.mutedColor} />
            ),
            checkedColor: styleColors.accentColor,
            uncheckedColor: styleColors.mutedColor,
            onPress: () => {
              setScreenValue('list');
              navigation.navigate("List");
            },
            style: {
              backgroundColor: screenValue === 'list' ? styleColors.selected : styleColors.backgroundColor,
              borderRadius: 12,
            }
          },
        ]}
      />
    </SafeAreaView>
  )
}
const segmentedButtonStyle =
  StyleSheet.create({
    container: {
      position: "absolute",
      top:50,
      right: 180,
    },
  });