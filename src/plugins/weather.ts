import 'dotenv/config';
import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY!;

const WEATHER_KEYWORDS = ["weather", "temperature", "humidity", "wind", "pressure", "condition"];

async function parseMessage(message: string): Promise<{"lat" : Number | null, "lon": Number | null, "attribute": String | null }> {
  const lowerMsg = message.toLowerCase();

  const attribute = WEATHER_KEYWORDS.find(attr => lowerMsg.includes(attr)) || null;

  const cityMatch = message.match(/in\s+([a-zA-Z\s]+)/i);
  const city = cityMatch ? cityMatch[1].trim() : null;
  if(!city || !attribute)
  {
    return {"lat":null,"lon":null,"attribute":null};
  }
  const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`);
  const result = res.data;
  const lat=result[0].lat;
  const lon=result[0].lon;
  return {
    "lat" : lat,
    "lon" : lon,
    "attribute" : attribute
  }
}


async function getWeather(lat: Number, lon: Number): Promise<any | null> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
    const res = await axios.get(url);
    if (!res) return null;
    const result = res.data;
    return result;
  } catch(error) {
    return null;
  }
}

export async function runWeatherPlugin(message: string): Promise<string> {
  const result = await parseMessage(message);
  const {lat,lon,attribute} = result;
  if (!lat || !lon || !attribute) {
    return ""; 
  }

  const weatherData = await getWeather(lat,lon);
  if (!weatherData) {
    return "";
  }
  switch (attribute) {
    case "weather":
        return weatherData.weather[0].description;
    case "temperature":
      return `${weatherData.main.temp-273.15}°C`;
    case "humidity":
      return `${weatherData.main.humidity}% humidity`;
    case "pressure":
      return `${weatherData.main.pressure} hPa`;
    case "wind":
      return `${weatherData.wind.speed} m/s wind`;
    case "condition":
      return weatherData.main;
    default:
      return "";
  }
}