import { useState, useEffect } from "react";
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
  const [weatherData, setWeatherData] = useState<RootWeatherObject>();
  const [placeData, setPlaceData] = useState<RootPlaceObject>();
  const [weekData, setweekData] = useState<DaysData>();
  const [city, setCity] = useState("");
  const [dailyData, setDailyData] = useState<RootDailyWeatherObject>();
  const handleClick = (value: string) => {
    setCity(value);
  };

  async function fetchDataWithGeolocation(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;

    const lat = String(latitude);
    const lon = String(longitude);

    const placeInfo = await fetchFindPlacesWithLocation({ lat, lon });
    setPlaceData(placeInfo);

    console.log(placeInfo);

    const weatherInfo = await fetchWeatherData({ lat, lon });

    setWeatherData(weatherInfo);
    const days = await getDays();
    setweekData(days);
  }
  const fetchDataWithOUTgeolocation = async (props: { city: string }) => {
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
  };

  useEffect(() => {
    if (navigator.geolocation && !city) {
      navigator.geolocation.getCurrentPosition(fetchDataWithGeolocation);
    } else if (!navigator.geolocation && !city) {
      //
    } else {
      fetchDataWithOUTgeolocation({ city });
    }
  }, [city]);

  const weatherDetails = {
    precipitation: weatherData?.current.precipitation.total + "%",
    humidity: weatherData?.current.humidity + "%",
    wind: weatherData?.current.wind.speed + "Km/h",
  };

  return (
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
      <section className="h-3/5 rounded-r-2xl w-1/2 max-w-xl bg-brand ">
        <ul>
          {Object.entries(weatherDetails).map(([key, value]) => (
            <WeatherDetails category={key} temp={value} key={key} />
          ))}
        </ul>
        <ol className="flex justify-center items-center m-4">
          <InfoDayBox temp={23} day={weekData?.Days[1]} />
          <InfoDayBox temp={10} day={weekData?.Days[2]} />
          <InfoDayBox temp={15} day={weekData?.Days[3]} />
          <InfoDayBox temp={30} day={weekData?.Days[4]} />
        </ol>
        <ChangeLocation onInputChange={(value: string) => handleClick(value)} />
      </section>
    </div>
  );
}

export { App };
