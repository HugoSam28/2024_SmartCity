import { Text } from 'react-native'
import Map from './map'
import { useContext, useState } from 'react'
import { SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, GlobalStyles } from "../components/styles";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../provider/Theme";

export default function List(){
  const [value, setValue] = useState('list');
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'map',
            checkedColor: colors(theme).accentColor,
            uncheckedColor: colors.mutedColor,
            onPress: () => {
              setValue('map');
              navigation.navigate(Map);
            }
          },
          {
            value: 'list',
            checkedColor: colors(theme).accentColor,
            uncheckedColor: colors(theme).mutedColor,
          },
        ]}
      />
        <Text>Liste</Text>
    </SafeAreaView>
  )
}