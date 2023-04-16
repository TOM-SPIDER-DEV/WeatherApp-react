import { useState, useEffect, Fragment } from "react";
import "./App.css";
import { SummarySVG } from "./svg/svgs";
import { InfoDayBox } from "./weatherForecast/InfoDayBox";
import { WeatherDetails } from "./weatherForecast/WeatherDetails";
import { WeatherSummary } from "./weatherSummary/WeatherSummary";
import {
  fetchFindPlacesWithText,
  fetchFindPlacesWithLocation,
  fetchWeatherData,
  fetchDailyWeatherData,
} from "./fetchWeatherData";
import { SummaryDay } from "./weatherSummary/SummaryDay";
import {
  RootWeatherObject,
  DaysData,
  RootPlaceObject,
  RootDailyWeatherObject,
} from "./types";
import { getDays } from "./dates";
import { ChangeLocation } from "./weatherForecast/changeLocation";

function App() {
  const [error, setError] = useState<true | false>(false);
  const [weatherData, setWeatherData] = useState<RootWeatherObject>();
  const [placeData, setPlaceData] = useState<RootPlaceObject>();
  const [weekData, setweekData] = useState<DaysData>();
  const [city, setCity] = useState("");
  const [inputComplete, setInputComplete] = useState<true | false>(false);
  const [dailyData, setDailyData] = useState<RootDailyWeatherObject[]>();
  const handleClick = (value: string) => {
    setCity(value);
  };

  async function fetchDataWithGeolocation(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;

    const lat = String(latitude);
    const lon = String(longitude);

    const placeInfo = await fetchFindPlacesWithLocation({ lat, lon });
    setPlaceData(placeInfo);

    const weatherInfo = await fetchWeatherData({ lat, lon });

    const dailyWeatherData = await fetchDailyWeatherData({
      lat: placeInfo.lat,
      lon: placeInfo.lon,
    });
    setDailyData(dailyWeatherData);

    setWeatherData(weatherInfo);
    const days = await getDays();
    setweekData(days);
  }

  const fetchDataWithOUTgeolocation = async (props: { city: string }) => {
    try {
      const placeInfo = await fetchFindPlacesWithText(props.city);
      setPlaceData(placeInfo);
      const weatherInfo = await fetchWeatherData({
        lat: placeInfo.lat,
        lon: placeInfo.lon,
      });

      setWeatherData(weatherInfo);

      const dailyWeatherData = await fetchDailyWeatherData({
        lat: placeInfo.lat,
        lon: placeInfo.lon,
      });
      setDailyData(dailyWeatherData);

      const days = await getDays();
      setweekData(days);
    } catch (error) {
      setError(true);
      console.error("Error: " + error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation && !city) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchDataWithGeolocation(position);
          setInputComplete(true);
        },
        (error) => {
          console.error("Error: " + error);
          setInputComplete(false);
        }
      );
    } else {
      fetchDataWithOUTgeolocation({ city });
      setInputComplete(true);
    }
  }, [city]);
  const weatherDetails = {
    precipitation: weatherData?.current.precipitation.total + "%",
    humidity: weatherData?.current.humidity + "%",
    wind: weatherData?.current.wind.speed + "Km/h",
  };

  return (
    <Fragment>
      {inputComplete && (
        <div className="w-screen h-screen flex justify-center items-center lg:flex-row md:flex-col">
          <section
            className="bg-gradient h-2/3 rounded-2xl relative flex justify-between flex-col-reverse"
            style={{ width: "478px" }}
          >
            <SummarySVG className="absolute h-full top-0 rounded-2xl opacity-20  " />
            <WeatherSummary
              temp={weatherData?.current.temperature}
              summary={weatherData?.current.summary}
            />
            <SummaryDay
              today={weekData?.Days[0]}
              date={weekData?.date}
              place={placeData?.name}
            />
          </section>
          <section className="h-3/5 rounded-r-2xl w-1/2 max-w-xl bg-background ">
            <ul>
              {Object.entries(weatherDetails).map(([key, value]) => (
                <WeatherDetails category={key} temp={value} key={key} />
              ))}
            </ul>
            <ol className="flex justify-center items-center m-4">
              {dailyData?.map((dayData) => (
                <InfoDayBox
                  temp={dayData.temperature}
                  day={weekData?.Days[1]}
                  key={dayData.temperature}
                />
              ))}
            </ol>
            {error && (
              <p className="text-center text-red-900 text-xl p-2 text-red">
                Location not found. Please enter a valid location.
              </p>
            )}
            <ChangeLocation
              onInputChange={(value: string) => handleClick(value)}
            />
          </section>
        </div>
      )}
      {!inputComplete && (
        <div className="w-screen h-screen flex justify-center items-center ">
          <section className="w-1/3 p-8 bg-background rounded-2xl">
            <ChangeLocation
              onInputChange={(value: string) => handleClick(value)}
            />
          </section>
        </div>
      )}
    </Fragment>
  );
}

export { App };
