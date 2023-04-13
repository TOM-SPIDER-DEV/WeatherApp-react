import axios from "axios";
import {
  RootWeatherObject,
  RootPlaceObject,
  RootDailyWeatherObject,
} from "./types";
const api = axios.create({
  baseURL: "https://ai-weather-by-meteosource.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": "544cf7eee2msh8d63fed7e3e9de0p1ce5a5jsnb9acb33746ee",
    "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com",
  },
});
//cabb8e460bmshf99639385117a3cp1b4bd2jsn4d98d7750ee8
//544cf7eee2msh8d63fed7e3e9de0p1ce5a5jsnb9acb33746ee

interface Geolocation {
  lat: string;
  lon: string;
}

const fetchWeatherData = async (
  props: Geolocation
): Promise<RootWeatherObject> => {
  const params = {
    lat: props.lat,
    lon: props.lon,
    timezone: "auto",
    language: "en",
    units: "ca",
  };

  const res = await api("current", { params });
  const data = await res.data;
  return data;
};

const fetchFindPlacesWithText = async (
  text: string
): Promise<RootPlaceObject> => {
  const res = await api("find_places", {
    params: {
      text,
      language: "en",
    },
  });
  const data = await res.data;

  return data[0];
};

const fetchFindPlacesWithLocation = async (
  props: Geolocation
): Promise<RootPlaceObject> => {
  const res = await api("nearest_place", {
    params: {
      lat: props.lat,
      lon: props.lon,
      language: "en",
    },
  });
  const data = await res.data;

  return data;
};

const fetchDailyWeatherData = async (
  props: Geolocation
): Promise<RootDailyWeatherObject> => {
  const params = {
    lat: props.lat,
    lon: props.lon,
    timezone: "auto",
    language: "en",
    units: "ca",
  };

  const res = await api("daily", { params });
  const data = await res.data;
  return data.daily.data.slice(1, 5);
};

export {
  fetchWeatherData,
  fetchFindPlacesWithText,
  fetchFindPlacesWithLocation,
  fetchDailyWeatherData,
};
