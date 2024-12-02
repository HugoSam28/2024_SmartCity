import { Text, View } from 'react-native'
import { GlobalStyles } from "../components/styles";
import { useContext } from "react";
import ThemeContext from "../provider/Theme";

export default function Profile(){
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pute = Thoams</Text>
      <Text style={styles.subtitle}>Hugo le Supreme leader</Text>
      <Text style={styles.text}>
        Le reste:
        Le corps du texte (et pas du Christ 👀)
      </Text>
    </View>
  )
}