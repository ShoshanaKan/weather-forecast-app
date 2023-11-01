
const appId = "&appid=9376713048db7ac1a4d4b972d6fd8be3";
const baseUrl = "https://api.openweathermap.org";

export const fetchLatAndLon = async (cityName) => {
  try {
    const res = await fetch(`${baseUrl}/geo/1.0/direct?limit=1&q=${cityName}${appId}`);
    const data = await res.json();
    if (data.length === 0) {
      return null;
    }
    return data[0];
  }
  catch (e) {
    throw e;
  }
}
export const fetchCurrentWeather = async (lat, lon) => {
  try {
    const res = await fetch(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}${appId}`);
    const data = await res.json();
    return data;
  }
  catch (e) {
    throw e;
  }
}
export const fetchNextDaysHourlyWeather = async (lat, lon) => {
  try {
    const res = await fetch(`${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}${appId}`);
    const data = await res.json();
    return data;
  }
  catch (e) {
    throw e;
  }
}