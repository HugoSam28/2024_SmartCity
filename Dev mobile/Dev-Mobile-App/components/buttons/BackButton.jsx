import React, {useContext} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from '../../components/styles.jsx'
import ThemeContext from "../../provider/Theme";


export default function BackButton({ onPress }) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 90,
        left: 30,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20
      }}
      onPress={onPress}>
      <Ionicons name="arrow-back" size={28} color={Colors(theme).text} />
    </TouchableOpacity>
  );
}