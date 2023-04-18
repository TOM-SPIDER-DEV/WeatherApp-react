import { useReducer } from "react";

import {
  fetchFindPlacesWithText,
  fetchFindPlacesWithLocation,
  fetchWeatherData,
  fetchDailyWeatherData,
} from "./fetchWeatherData";

import {
  RootWeatherObject,
  DaysData,
  RootPlaceObject,
  RootDailyWeatherObject,
} from "./types";

import { getDays } from "./dates";
interface WeatherState {
  error: boolean;
  weatherData?: RootWeatherObject;
  placeData?: RootPlaceObject;
  weekData?: DaysData;
  city: string;
  inputComplete: boolean;
  dailyData?: RootDailyWeatherObject[];
}

type WeatherAction =
  | { type: "SET_CITY"; payload: string }
  | { type: "FETCH_DATA"; payload: WeatherState }
  | { type: "FETCH_ERROR" };

const initialState: WeatherState = {
  error: false,
  city: "",
  inputComplete: false,
};

function weatherReducer(
  state: WeatherState,
  action: WeatherAction
): WeatherState {
  switch (action.type) {
    case "SET_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "FETCH_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

function useWeatherReducer() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const setCity = (value: string) => {
    dispatch({ type: "SET_CITY", payload: value });
  };

  const fetchDataWithGeolocation = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    const lat = String(latitude);
    const lon = String(longitude);

    const placeData = await fetchFindPlacesWithLocation({ lat, lon });

    const weatherData = await fetchWeatherData({ lat, lon });
    const dailyData = await fetchDailyWeatherData({
      lat: placeData.lat,
      lon: placeData.lon,
    });

    const weekData = await getDays();

    dispatch({
      type: "FETCH_DATA",
      payload: {
        ...state,
        placeData,
        weatherData,
        dailyData,
        weekData,
        inputComplete: true,
      },
    });
  };

  const fetchDataWithoutGeolocation = async () => {
    try {
      const placeData = await fetchFindPlacesWithText(state.city);

      const weatherData = await fetchWeatherData({
        lat: placeData.lat,
        lon: placeData.lon,
      });

      const dailyData = await fetchDailyWeatherData({
        lat: placeData.lat,
        lon: placeData.lon,
      });

      const weekData = await getDays();

      dispatch({
        type: "FETCH_DATA",
        payload: {
          ...state,
          error: false,
          placeData,
          weatherData,
          dailyData,
          weekData,
          inputComplete: true,
        },
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
      console.error("Error: " + error);
    }
  };

  (async function fetchData() {
    if (navigator.geolocation && !state.city) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchDataWithGeolocation(position);
        },
        (error) => {
          console.error("Error: " + error);
        }
      );
    } else {
      fetchDataWithoutGeolocation();
    }
  })();

  return { state, setCity };
}
export { useWeatherReducer };
