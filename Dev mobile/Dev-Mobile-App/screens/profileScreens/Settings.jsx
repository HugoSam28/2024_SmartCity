import {View, Text} from "react-native";
import {useContext} from "react";
import ThemeContext from "../../provider/Theme";
import {GlobalStyles} from "../../components/styles";
import BackButton from "../../components/buttons/BackButton";

export default function Settings({ navigation }) {
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles(theme);
  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Pute = Thoams</Text>
      <Text style={styles.subtitle}>Hugo le Supreme leader</Text>
      <Text style={styles.text}>
        Le reste:
        Le corps du texte (et pas du Christ 👀)
      </Text>
    </View>
  );
}