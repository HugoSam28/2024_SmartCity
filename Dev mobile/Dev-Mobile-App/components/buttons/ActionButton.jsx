import {Platform, Text, TouchableOpacity} from "react-native";
import {Colors, GlobalStyles} from "../styles";
import {useThemeContext} from "../../provider/Theme";

export default function ActionButton({ onPress, text }) {
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: Platform.OS === "ios" ? 50 : 45,
        height: 60,
        left:26,
        width: '100%',
        backgroundColor: Colors(theme).accentColor,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Text style={{...styles.subtitle, color: '#FAFDFF'}}>{text}</Text>
    </TouchableOpacity>
  )
}