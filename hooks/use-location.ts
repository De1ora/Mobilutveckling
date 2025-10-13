import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Location:", location);
      setLocation(location);
    })();
  }, []);

  return { location, errorMsg };
}