import * as Location from 'expo-location';
import { Alert } from 'react-native';

export async function requestLocationPermission(): Promise<boolean> {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === 'granted') return true;

    const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
    if (newStatus === 'granted') return true;

    Alert.alert(
        'Permission Denied',
        'We need access to your location to provide local weather updates.'
    );
    return false;
}