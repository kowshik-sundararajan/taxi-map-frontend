import {
  GEOLOCATION_OPTIONS,
  GEOLOCATION_PERMISSIONS,
  splytOffices,
} from "../constants";

export const getCurrentPosition = async (successCallback: any) => {
  if (navigator.geolocation) {
    const permissionResult = await navigator.permissions.query({
      name: "geolocation",
    });

    switch (permissionResult.state) {
      case GEOLOCATION_PERMISSIONS.GRANTED:
        navigator.geolocation.getCurrentPosition(successCallback);
        break;
      case GEOLOCATION_PERMISSIONS.PROMPT:
        navigator.geolocation.getCurrentPosition(
          successCallback,
          undefined,
          GEOLOCATION_OPTIONS
        );
        break;
      case GEOLOCATION_PERMISSIONS.DENIED:
        window.alert(
          "We are unable to access your location; please provide your location to proceed."
        );
        break;
      default:
        break;
    }
  } else {
    window.alert(
      "We are unable to access your location; please provide your location to proceed."
    );
  }
};

export const getRegionFromLatLng = (lat: number, lng: number): string => {
  if (
    lat === splytOffices.singapore.lat &&
    lng === splytOffices.singapore.lng
  ) {
    return "singapore";
  } else if (
    lat === splytOffices.london.lat &&
    lng === splytOffices.london.lng
  ) {
    return "london";
  } else {
    return "";
  }
};
