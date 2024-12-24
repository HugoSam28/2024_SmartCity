import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles } from '../components/styles'
import { useContext } from 'react'
import ThemeContext from "../provider/Theme";

export default function Scan(){
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scan</Text>
    </SafeAreaView>
  )
}
