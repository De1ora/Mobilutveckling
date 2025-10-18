const BASE_URL = 'https://api.openweathermap.org/data/2.5/find';
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

export const getCityBySearch = async (city: string, units: string) => {
    try {
        const response = await fetch(
            `${BASE_URL}?q=${city}&appid=${OPEN_WEATHER_KEY}&units=${units}`,
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching city data:", error.message);
        } else {
            console.error("Unexpected error fetching city data: " + error);
        }
        throw error;
    }
};