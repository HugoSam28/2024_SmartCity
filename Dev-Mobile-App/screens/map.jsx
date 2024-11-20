import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps';
import { useState } from 'react'
import List from './list'
import { GlobalStyles, colors } from "../components/styles";

import { SegmentedButtons } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import theme from "../provider/Theme";

export default function Map() {
  const [value, setValue] = useState('map');
  const navigation = useNavigation();
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
      >
      </MapView>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'map',
            checkedColor: colors.accentColor,
            uncheckedColor: colors.mutedColor,
          },
          {
            value: 'list',
            checkedColor: colors.accentColor,
            uncheckedColor: colors.mutedColor,
            onPress: () => {
              setValue('list');
              navigation.navigate(List);
            }
          },
        ]}
      />
    </View>
  )
};
const mapStyle = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    }
});
