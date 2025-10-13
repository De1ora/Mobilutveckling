import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { requestLocationPermission } from "@/utils/permission";

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
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