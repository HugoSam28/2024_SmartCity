import { StyleSheet, Text, View } from 'react-native'
export default function Map(){
  return (
    <View style={styles.container}>
      <Text>Maps</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
}) ;