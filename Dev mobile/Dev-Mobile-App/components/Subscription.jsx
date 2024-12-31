import {View, Text} from "react-native";
import {useThemeContext} from "../provider/Theme";
import {Colors, GlobalStyles} from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Subscription({id, label, vehicleType, discount, paymentRecurrence}) {
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  const icons = {
    Voiture : <MaterialCommunityIcons name="car" size={32} color={Colors(theme).iconColor} />,
    Trottinette : <MaterialCommunityIcons name="scooter" size={32} color={Colors(theme).iconColor} />,
    Velo: <MaterialIcons name="pedal-bike" size={32} color={Colors(theme).iconColor} />,
    Scooter: <MaterialIcons name="two-wheeler" size={32} color={Colors(theme).iconColor} />
  }
  return (
    <View style={{...styles.subContainer, width: 265}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{...styles.subtitle, fontFamily: 'RobotoCondensedBold'}}>{label}</Text>
        <View style={{
          width: 55,
          height: 55,
          borderRadius: 10,
          backgroundColor: Colors(theme).containerInArrayColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {icons['Voiture']}
        </View>
      </View>
    </View>
  )
}