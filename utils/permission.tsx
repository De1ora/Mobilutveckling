import * as Location from 'expo-location';
import { Alert } from 'react-native';

export async function requestLocationPermission(): Promise<boolean> {
    // Kolla nuvarande status 
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === 'granted') return true;

    // Be om tillåtelse 
    const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
    if (newStatus === 'granted') return true;

    // Hantera nekad tillåtelse
    Alert.alert(
        'Permission Denied',
        'We need access to your location to provide local weather updates.'
    );
    return false;
}