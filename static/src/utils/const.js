export const serverBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://192.168.43.244:5000"
    : "https://skribbl-remake.herokuapp.com/";

export const mediumDeviceMinWidth = 768;
