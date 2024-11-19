import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from "../components/styles";

export default function Profile(){
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Pute = Thoams</Text>
      <Text style={GlobalStyles.subtitle}>Hugo le Supreme leader</Text>
      <Text style={GlobalStyles.text}>Jerem le gentil même s'il est en data</Text>
    </View>
  )
}