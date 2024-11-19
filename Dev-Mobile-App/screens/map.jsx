import {StyleSheet, Text, View} from 'react-native'
import MapView from 'react-native-maps';
import { useState } from 'react'
import List from './list'
import {Colors, GlobalStyles} from "../components/styles";
import {SegmentedButtons} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {createStaticNavigation, useNavigation} from "@react-navigation/native";

export default function Map() {
  const [value, setValue] = useState('map');
  const navigation = useNavigation();
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <MapView style={styles.map}
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
            checkedColor: Colors.accentColor,
            uncheckedColor: Colors.mutedColor,
          },
          {
            value: 'list',
            checkedColor: Colors.accentColor,
            uncheckedColor: Colors.mutedColor,
            onPress: () => {
              setValue('list');
              navigation.navigate(List);
            }
          },
        ]}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});