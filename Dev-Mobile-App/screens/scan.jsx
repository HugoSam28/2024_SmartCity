import { Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles }  from '../components/styles'

export default function Scan(){
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Scan</Text>
    </View>
  )
}
