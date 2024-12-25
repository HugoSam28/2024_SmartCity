import { Colors } from "./styles";
import {useState} from "react";
import {useThemeContext} from "../provider/Theme";
import { StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapListSwitch({screen}) {
  const {theme} = useThemeContext();
  const styleColors = Colors(theme)

  const [screenValue, setScreenValue] = useState(screen);
  const navigation = useNavigation();
  const buttonStyle = {
    selected: styleColors.accentColor,
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
            icon:() => (
              <Ionicons
                name={screenValue === 'map' ? 'map' : 'map-outline'}
                size={27}
                color={screenValue === 'map' ? buttonStyle.selected : buttonStyle.notSelected} />
            ),
            checkedColor: buttonStyle.selected,
            uncheckedColor: buttonStyle.notSelected,
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
            icon:() => (
              <Ionicons
                name={screenValue === 'list' ? 'list' : 'list-outline'}
                size={27}
                color={screenValue === 'list' ? buttonStyle.selected : buttonStyle.notSelected} />
            ),
            checkedColor: buttonStyle.selected,
            uncheckedColor: buttonStyle.notSelected,
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