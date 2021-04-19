export const GOOGLE_API_KEY: string =
  process.env.REACT_APP_GOOGLE_API_KEY || "";

export const splytOffices: { [name: string]: { lat: number; lng: number } } = {
  singapore: {
    lat: 1.285194,
    lng: 103.8522982,
  },
  london: {
    lat: 51.5049375,
    lng: -0.0964509,
  },
};

export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const GEOLOCATION_PERMISSIONS = {
  GRANTED: "granted",
  PROMPT: "prompt",
  DENIED: "denied",
};
