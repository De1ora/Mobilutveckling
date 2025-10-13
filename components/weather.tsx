import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./themed-text";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

type Weather = {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
};

const WeatherScreen = () => {
    const [weather, setWeather] = useState<Weather>();

    const fetchWeather = async () => {
        const lat = 28.4636;
        const lon = -16.2518;
        const results = await fetch(
            `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`
        );
        const data = await results.json();
        console.log(JSON.stringify(data, null, 2));
        setWeather(data);
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    if (!weather) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <ThemedText style={styles.location}>{weather.name}</ThemedText>
            <ThemedText style={styles.temp}>{Math.round(weather.main.temp)}°</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    location: {
        fontSize: 32,
        lineHeight: 40,
    },
    temp: {
        fontSize: 80,
        lineHeight: 88,
    },
})

export default WeatherScreen;