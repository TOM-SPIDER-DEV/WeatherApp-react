import { useWeatherReducer } from "./useReducer";

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
      {state.inputComplete && !state.loading && (
        <div className="w-full h-full flex justify-center items-center lg:flex-row md:flex-col flex-wrap ">
          <section className="bg-gradient lg:h-2/3  lg:rounded-2xl md:w-full flex lg:justify-between lg:flex-col-reverse md:flex-row-reverse md:items-center md: justify-around w-96 md:h-96">
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
          <section className="h-3/5 bg-background lg:rounded-r-2xl lg:rounded-2xl lg:w-1/2  md:p-8  md:w-full flex flex-col lg:max-w-xl justify-between">
            <ul>
              {Object.entries(weatherDetails).map(([key, value]) => (
                <WeatherDetails category={key} temp={value} key={key} />
              ))}
            </ul>
            <ol className="flex justify-center items-center m-4 sm:h-full md:flex-wrap">
              {state.dailyData?.map((dayData, index) => {
                const day = state.weekData?.Days[index + 1];
                return (
                  <InfoDayBox
                    key={index}
                    iconId={dayData.icon}
                    temp={dayData.temperature}
                    day={day}
                  />
                );
              })}
            </ol>

            <ChangeLocation
              onInputChange={(value: string) => setCity(value)}
              error={state.error}
            />
          </section>
        </div>
      )}
      {state.loading && (
        <div className="w-screen h-screen flex justify-center items-center ">
          <section className="w-1/3 p-8 bg-background rounded-2xl">
            <h1 className="text-2xl text-white text-center">Loading...</h1>
            <p className="text-sm text-white text-center">Please wait</p>
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
