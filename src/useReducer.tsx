import { useEffect, useReducer } from "react";

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
  loading: boolean;
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
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_START" }
  | { type: "FETCH_COMPLETE" };

const initialState: WeatherState = {
  error: false,
  city: "",
  inputComplete: false,
  loading: false,
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
    case "FETCH_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_DATA":
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: true,
        loading: false,
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

  useEffect(() => {
    const fetchData = async () => {
      const fetchDataWithGeolocation = async (
        position: GeolocationPosition
      ) => {
        const { latitude, longitude } = position.coords;

        const lat = String(latitude);
        const lon = String(longitude);

        dispatch({ type: "FETCH_START" });

        try {
          const placeData = await fetchFindPlacesWithLocation({ lat, lon });

          const weatherData = await fetchWeatherData({ lat, lon });
          const dailyData = await fetchDailyWeatherData({
            lat: placeData.lat,
            lon: placeData.lon,
          });

          const weekData = getDays();

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
        } catch (error) {
          dispatch({ type: "FETCH_ERROR" });
          console.error("Error: " + error);
        }
      };

      const fetchDataWithoutGeolocation = async () => {
        dispatch({ type: "FETCH_START" });

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

      (async () => {
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
    };
    fetchData();
  }, [state.city]);
  return { state, setCity };
}

export { useWeatherReducer };
