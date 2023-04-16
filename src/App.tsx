import { useState, useEffect } from "react";
import "./App.css";
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
import { SummarySVG } from "./svg/svgs";
import { InfoDayBox } from "./weatherForecast/InfoDayBox";
import { WeatherDetails } from "./weatherForecast/WeatherDetails";
import { WeatherSummary } from "./weatherSummary/WeatherSummary";
import { SummaryDay } from "./weatherSummary/SummaryDay";
import { getDays } from "./dates";
import { ChangeLocation } from "./weatherForecast/changeLocation";

interface WeatherState {
  error: boolean;
  weatherData?: RootWeatherObject;
  placeData?: RootPlaceObject;
  weekData?: DaysData;
  city: string;
  inputComplete: boolean;
  dailyData?: RootDailyWeatherObject[];
}

function App() {
  const [state, setState] = useState<WeatherState>({
    error: false,
    city: "",
    inputComplete: false,
  });

  const handleClick = (value: string) => {
    setState({
      ...state,
      city: value,
    });
  };

  useEffect(() => {
    const fetchDataWithGeolocation = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      const lat = String(latitude);
      const lon = String(longitude);

      const placeInfo = await fetchFindPlacesWithLocation({ lat, lon });

      const weatherInfo = await fetchWeatherData({ lat, lon });
      const dailyWeatherData = await fetchDailyWeatherData({
        lat: placeInfo.lat,
        lon: placeInfo.lon,
      });

      const days = await getDays();
      setState({
        ...state,
        placeData: placeInfo,
        weatherData: weatherInfo,
        dailyData: dailyWeatherData,
        weekData: days,
      });
    };

    const fetchDataWithoutGeolocation = async () => {
      try {
        const placeInfo = await fetchFindPlacesWithText(state.city);
        setState({
          ...state,
          placeData: placeInfo,
        });

        const weatherInfo = await fetchWeatherData({
          lat: placeInfo.lat,
          lon: placeInfo.lon,
        });

        const dailyWeatherData = await fetchDailyWeatherData({
          lat: placeInfo.lat,
          lon: placeInfo.lon,
        });

        const days = await getDays();
        setState({
          ...state,
          error: false,
          placeData: placeInfo,
          weatherData: weatherInfo,
          dailyData: dailyWeatherData,
          weekData: days,
        });
      } catch (error) {
        setState({
          ...state,
          error: true,
        });
        console.error("Error: " + error);
      }
    };

    if (navigator.geolocation && !state.city) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchDataWithGeolocation(position);
          setState({
            ...state,
            inputComplete: true,
          });
        },
        (error) => {
          console.error("Error: " + error);
          setState({
            ...state,
            inputComplete: false,
          });
        }
      );
    } else {
      fetchDataWithoutGeolocation();
      setState({
        ...state,
        inputComplete: true,
      });
    }
  }, [state.city]);

  const weatherDetails = {
    precipitation: state.weatherData?.current.precipitation.total + "%",
    humidity: state.weatherData?.current.humidity + "%",
    wind: state.weatherData?.current.wind.speed + "Km/h",
  };
  return (
    <>
      {state.inputComplete && (
        <div className="w-screen h-screen flex justify-center items-center lg:flex-row md:flex-col">
          <section
            className="bg-gradient h-2/3 rounded-2xl relative flex justify-between flex-col-reverse"
            style={{ width: "478px" }}
          >
            <SummarySVG className="absolute h-full top-0 rounded-2xl opacity-20  " />
            <WeatherSummary
              temp={state.weatherData?.current.temperature}
              summary={state.weatherData?.current.summary}
            />
            <SummaryDay
              today={state.weekData?.Days[0]}
              date={state.weekData?.date}
              place={state.placeData?.name}
            />
          </section>
          <section className="h-3/5 rounded-r-2xl w-1/2 max-w-xl bg-background ">
            <ul>
              {Object.entries(weatherDetails).map(([key, value]) => (
                <WeatherDetails category={key} temp={value} key={key} />
              ))}
            </ul>
            <ol className="flex justify-center items-center m-4">
              {state.dailyData?.map((dayData) => (
                <InfoDayBox
                  temp={dayData.temperature}
                  day={state.weekData?.Days[1]}
                  key={dayData.temperature}
                />
              ))}
            </ol>

            <ChangeLocation
              onInputChange={(value: string) => handleClick(value)}
              error={state.error}
            />
          </section>
        </div>
      )}
      {!state.inputComplete && (
        <div className="w-screen h-screen flex justify-center items-center ">
          <section className="w-1/3 p-8 bg-background rounded-2xl">
            <ChangeLocation
              error={state.error}
              onInputChange={(value: string) => handleClick(value)}
            />
          </section>
        </div>
      )}
    </>
  );
}

export { App };
