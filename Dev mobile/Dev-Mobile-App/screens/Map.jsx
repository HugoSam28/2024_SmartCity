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
    const [location, setLocation] = useState(null); // Utilisez "null" au début pour location
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true); // Indicateur de chargement
    const {theme} = useThemeContext();
    const styles = GlobalStyles(theme);
    const [vehicles, setVehicles] = useState([]);
    const {logOut, userToken} = React.useContext(AuthContext);

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setLoading(false);
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
            setLoading(false);
        }
        body: JSON.stringify({}),

        getCurrentLocation();
    }, []);

    const fetchData = async () => {
        try {
            console.log(`http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/v1/vehicle/getAroundMe`);

            const items = await FetchWithRetry(`http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/v1/vehicle/getAroundMe`, {
                method: 'POST',
                headers: {
                    "authorization": `Bearer ${await userToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({lat: location.coords.latitude, lon: location.coords.longitude, distance: 100000000000000}),
            });
            setVehicles(items);
            console.log(items);
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        if (location) {
            fetchData();  // Appel fetchData seulement après que location soit définie
        }
    }, [location]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.paragraph}>Fetching location...</Text>
            </View>
        );
    }

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{errorMsg}</Text>
            </View>
        );
    }

    if (!location || !location.coords) {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>Location not available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={mapStyle.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                userInterfaceStyle={theme}
                showsUserLocation={true}
                showsPointsOfInterest={false}
            >
                {vehicles.map((vehicle, index) => {
                    const {x, y} = vehicle.location || [null, null];

                    // Si les coordonnées sont valides, on affiche le marqueur
                    return x && y ? (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: y,
                                longitude: x,
                            }}
                            title={vehicle.type}
                        />
                    ) : null;
                })}
            </MapView>


            {/* Refresh Button */}
            <TouchableOpacity style={style.refreshButton} onPress={fetchData}>
                <Text style={style.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>

            <MapListSwitch screen={'map'} />
        </View>
    );

}
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
