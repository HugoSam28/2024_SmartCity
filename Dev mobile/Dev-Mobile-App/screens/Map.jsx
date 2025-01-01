import {StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import MapView from 'react-native-maps';
import { useThemeContext } from "../provider/Theme";
import MapListSwitch from "../components/MapListSwitch";
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import {Colors, GlobalStyles} from "../components/styles";
import FetchWithRetry from "../API/fetchWithRetry";
import {AuthContext} from "../provider/AuthContext";
import { Marker } from 'react-native-maps';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useLanguageContext} from "../provider/LanguageContext";


export default function Map() {
    const [location, setLocation] = useState(null); // Utilisez "null" au début pour location
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true); // Indicateur de chargement
    const {theme} = useThemeContext();
    const styles = GlobalStyles(theme);
    const [vehicles, setVehicles] = useState([]);
    const {logOut, userToken} = React.useContext(AuthContext);
    const {i18n} = useLanguageContext();
    const icons = {
        Voiture : <MaterialCommunityIcons name="car" size={32} color={Colors(theme).iconColor} />,
        Trottinette : <MaterialCommunityIcons name="scooter" size={32} color={Colors(theme).iconColor} />,
        Velo : <MaterialIcons name="pedal-bike" size={32} color={Colors(theme).iconColor} />,
        Scooter : <MaterialIcons name="two-wheeler" size={32} color={Colors(theme).iconColor} />
    }

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
            const items = await FetchWithRetry(`http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/v1/vehicle/getAroundMe`, {
                method: 'POST',
                headers: {
                    "authorization": `Bearer ${await userToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                    distance: 100000000000000
                }),
            });
            setVehicles(items);
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    };

    useEffect(() => {
        if (location) {
            fetchData();
        }
    }, [location])

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
                    const { x, y } = vehicle.location || {};
                    return x && y ? (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: y,
                                longitude: x,
                            }}
                        >
                            {icons[vehicle.type]}
                        </Marker>
                    ) : null;
                })}


            </MapView>

            <TouchableOpacity style={styles.refreshButton} onPress={fetchData}>
                <Text style={styles.refreshButtonText}>{i18n.t('refresh')}</Text>
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
