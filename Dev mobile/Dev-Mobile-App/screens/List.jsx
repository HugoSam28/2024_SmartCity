import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles } from '../components/styles'
import { useContext } from 'react'
import ThemeContext from "../provider/Theme";
import MapListSwitch from "../components/MapListSwitch";

export default function List(){
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>List</Text>
      <MapListSwitch screen={'list'}/>
    </SafeAreaView>
  )
}
