import { Text } from 'react-native'
import { useContext, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../components/styles";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../provider/Theme";
import MapListSwitch from "../components/MapListSwitch";

export default function List(){
  const [value, setValue] = useState('list');
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <MapListSwitch screen={'list'}/>
      <Text>Liste</Text>
    </SafeAreaView>
  )
}