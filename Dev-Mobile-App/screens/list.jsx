import { StyleSheet, Text, View } from 'react-native'
export default function List(){
  return (
    <View style={styles.container}>
      <Text>Liste</Text>
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