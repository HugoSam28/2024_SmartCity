import {StyleSheet, View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps'; // Vous n'avez plus besoin du `Marker`
import { useThemeContext } from "../provider/Theme";
import MapListSwitch from "../components/MapListSwitch";
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { GlobalStyles, Colors } from "../components/styles";
import FetchWithRetry from "../API/fetchWithRetry";
import {AuthContext} from "../provider/AuthContext";
import { Marker } from 'react-native-maps';


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
    },
});

const style = StyleSheet.create({
    // Ajoutez un style pour le bouton de rafraîchissement
    refreshButton: {
        position: 'absolute',
        bottom: 50, // Ajustez selon l'emplacement souhaité
        right: 20,
        backgroundColor: '#007AFF', // Couleur du bouton
        padding: 10,
        borderRadius: 5,
        zIndex: 100, // Pour être sûr qu'il soit au-dessus de la carte
    },
    refreshButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
