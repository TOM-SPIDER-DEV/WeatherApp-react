import "./App.css";
import { useWeatherReducer } from "./useReducer";

import { SummarySVG } from "./svg/svgs";

import { InfoDayBox } from "./weatherForecast/InfoDayBox";
import { WeatherDetails } from "./weatherForecast/WeatherDetails";
import { ChangeLocation } from "./weatherForecast/changeLocation";

import { WeatherSummary } from "./weatherSummary/WeatherSummary";
import { SummaryDay } from "./weatherSummary/SummaryDay";

function App() {
  const { state, setCity } = useWeatherReducer();

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
              iconId={state.weatherData?.current.icon_num || 1}
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
                  iconId={dayData.icon}
                  temp={dayData.temperature}
                  day={state.weekData?.Days[1]}
                  key={dayData.temperature}
                />
              ))}
            </ol>

            <ChangeLocation
              onInputChange={(value: string) => setCity(value)}
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
              onInputChange={(value: string) => setCity(value)}
            />
          </section>
        </div>
      )}
    </>
  );
}

export { App };
