export const serverBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://192.168.0.245:5000"
    : "https://pictionary-live.herokuapp.com";

export const mediumDeviceMinWidth = 768;
