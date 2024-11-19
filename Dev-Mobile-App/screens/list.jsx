import { StyleSheet, Text, View } from 'react-native'
import Map from './map'
import { useState } from 'react'
import { SegmentedButtons } from 'react-native-paper';
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors, GlobalStyles} from "../components/styles";
import {useNavigation} from "@react-navigation/native";

export default function List(){
  const [value, setValue] = useState('list');
  const navigation = useNavigation();
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'map',
            checkedColor: Colors.accentColor,
            uncheckedColor: Colors.mutedColor,
            onPress: () => {
              setValue('map');
              navigation.navigate(Map);
            }
          },
          {
            value: 'list',
            checkedColor: Colors.accentColor,
            uncheckedColor: Colors.mutedColor,
          },
        ]}
      />
        <Text>Liste</Text>
    </SafeAreaView>
  )
}
