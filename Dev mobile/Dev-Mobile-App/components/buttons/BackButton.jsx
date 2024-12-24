import {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from '../styles'
import ThemeContext from "../../provider/Theme";


export default function BackButton({ onPress }) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 80,
        left: 20,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
      }}
      onPress={onPress}>
      <Ionicons name="arrow-back" size={28} color={Colors(theme).text} />
    </TouchableOpacity>
  );
}