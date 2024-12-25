import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps';
import { GlobalStyles } from "../components/styles";
import {useThemeContext} from "../provider/Theme";
import MapListSwitch from "../components/MapListSwitch";

export default function Map() {
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  return (
    <View style={styles.container}>
      <MapView style={mapStyle.map}
               initialRegion={{
                 latitude: 50.46681,
                 longitude: 4.86583,
                 latitudeDelta: 0.0045,
                 longitudeDelta: 0.0045
               }}
               userInterfaceStyle={theme}
               showsPointsOfInterest={false}
               >
      >
      </MapView>
      <MapListSwitch screen={'map'}/>
    </View>
  )
};
const mapStyle = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    }
});
