import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { ThemedText } from "./themed-text";
import { useSettings } from "@/contexts/settings-context";
import useLocation from "@/hooks/use-location";
import FavoritesButton from "./favorites-button";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

type Weather = {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    sys: {
        country: string;
    };
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
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
};

export type City = {
    coord: {
        lat: number;
        lon: number;
    };
    name: string;
};

type WeatherScreenProps = {
    selectedCity?: City | null;
};

const WeatherScreen = ({ selectedCity }: WeatherScreenProps) => {
    const [weather, setWeather] = useState<Weather>();
    const { units } = useSettings();
    const { location } = useLocation();

    const fetchWeather = async (lat: number, lon: number) => {
        const results = await fetch(
            `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=${units}`
        );
        const data = await results.json();
        console.log(JSON.stringify(data, null, 2));
        setWeather(data);
    };

    useEffect(() => {
        if (selectedCity) {
            fetchWeather(
                selectedCity.coord.lat,
                selectedCity.coord.lon
            );
        } else if (location) {
            fetchWeather(
                location.coords.latitude,
                location.coords.longitude
            );
        }
    }, [location, units, selectedCity]);

    const tempSymbol = units === 'metric' ? '°C' : '°F';

    if (!weather) {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.heartButton}>
                <FavoritesButton city={weather} />
            </View>
            <Image
                source={{
                    uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
                }}
                style={styles.weatherIcon}
            />
            <ThemedText style={styles.location}>{weather.name}</ThemedText>
            <ThemedText style={styles.temp}>
                {Math.round(weather.main.temp)}{tempSymbol}</ThemedText>
            <ThemedText style={styles.description}>
                {weather.weather[0].description}
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 120,
    },
    heartButton: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 0,
        paddingRight: 10,
    },
    weatherIcon: {
        width: 200,
        height: 200,
    },
    location: {
        fontSize: 32,
        lineHeight: 40,
    },
    temp: {
        fontSize: 80,
        lineHeight: 88,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 26,
        lineHeight: 40,
        paddingTop: 10,
        textTransform: 'capitalize',
    },
})

export default WeatherScreen;