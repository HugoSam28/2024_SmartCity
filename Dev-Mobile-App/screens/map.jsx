import {StyleSheet, View} from 'react-native'
import MapView from 'react-native-maps';

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
               initialRegion={{
                 latitude: 50.46681,
                 longitude: 4.86583,
                 latitudeDelta: 0.0045,
                 longitudeDelta: 0.0045
               }}
      >

      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});