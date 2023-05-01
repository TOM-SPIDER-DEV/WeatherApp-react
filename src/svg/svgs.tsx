import NotAvailable from "./not-available.svg";
import ClearDay from "./clear-day.svg";
import PartlyCloudyDay from "./partly-cloudy-day.svg";
import Cloudy from "./cloudy.svg";
import OvercastDay from "./overcast-day.svg";
import Fog from "./fog.svg";
import LightRain from "./extreme-hail.svg";
import Rain from "./rain.svg";
import ThunderstormsDay from "./thunderstorms-day.svg";
import Sleet from "./sleet.svg";
import Snow from "./snow.svg";
import ThunderstormsDaySnow from "./thunderstorms-day-snow.svg";
import ClearNight from "./clear-night.svg";
import PartlyCloudyNight from "./partly-cloudy-night.svg";
import OvercastNight from "./overcast-night.svg";
import ThunderstormsNight from "./thunderstorms-night.svg";
import ThunderstormsNightSnow from "./thunderstorms-night-snow.svg";
import { useEffect, useState } from "react";

const Icon = ({ iconId }: { iconId: number }) => {
  switch (iconId) {
    case 1:
      // Not availble
      return <img src={NotAvailable} />;

    case 2:
      // Sunny
      return <img src={ClearDay} />;

    case 3:
    case 4:
      // Partly sunny and mostly sunny
      return <img src={PartlyCloudyDay} />;

    case 5:
    case 6:
      // Mostly cloudy
      // Cloudy
      return <img src={Cloudy} />;

    case 7:
    case 8:
      // Overcast
      // Overcast with low clouds
      return <img src={OvercastDay} />;

    case 9:
      // Fog
      return <img src={Fog} />;

    case 10:
      // Light rain
      return <img src={LightRain} />;

    case 11:
    case 12:
    case 13:
      // Rain
      // Possible rain
      // Rain shower
      return <img src={Rain} />;

    case 14:
    case 15:
      // Thunderstorm
      // Local thunderstorms
      return <img src={ThunderstormsDay} />;

    case 16:
      // Light snow
      return <img src={Sleet} />;

    case 17:
    case 18:
    case 19:
      // Snow
      // Possible snow
      // Snow shower
      return <img src={Snow} />;

    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
      // Rain and snow
      // Possible rain and snow
      return <img src={ThunderstormsDaySnow} />;
    case 25:
      // Hail
      return <img src={LightRain} />;
    case 26:
      // Clear (night)
      return <img src={ClearNight} />;
    case 27:
    case 28:
    case 29:
      // Mostly clear (night)
      // Partly clear (night)
      // Mostly cloudy (night)
      return <img src={PartlyCloudyNight} />;
    case 30:
      // Cloudy (night)
      return <img src={Cloudy} />;
    case 31:
      // Overcast with low clouds (night)
      return <img src={OvercastNight} />;
    case 32:
    case 33:
      // Rain shower (night)
      // Local thunderstorms (night)
      return <img src={ThunderstormsNight} />;
    case 34:
    case 35:
    case 36:
      // Rain and snow (night)
      return <img src={ThunderstormsNightSnow} />;
    default:
      // Handle the case when the weather icon is not recognized
      return <img src={NotAvailable} />;
  }
};

function WeatherIcon(props: { iconId: number; className: string }) {
  return (
    <div className={props.className}>
      <Icon iconId={props.iconId} />
    </div>
  );
}

const LocationSVG = (props: { classname?: string }) => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.classname}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.15625 11.25C8.15625 8.29873 10.5487 5.90625 13.5 5.90625C16.4513 5.90625 18.8437 8.29873 18.8437 11.25C18.8437 14.2013 16.4513 16.5938 13.5 16.5938C10.5487 16.5938 8.15625 14.2013 8.15625 11.25ZM13.5 7.59375C11.4807 7.59375 9.84375 9.23071 9.84375 11.25C9.84375 13.2693 11.4807 14.9062 13.5 14.9062C15.5193 14.9062 17.1562 13.2693 17.1562 11.25C17.1562 9.23071 15.5193 7.59375 13.5 7.59375Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.96491 9.96396C4.36352 5.12802 8.4047 1.40625 13.257 1.40625H13.743C18.5953 1.40625 22.6365 5.12802 23.0351 9.96396C23.2492 12.5617 22.4468 15.1413 20.7968 17.1591L15.4046 23.7537C14.4202 24.9575 12.5798 24.9575 11.5954 23.7537L6.20321 17.1591C4.55322 15.1413 3.75077 12.5617 3.96491 9.96396ZM13.257 3.09375C9.28293 3.09375 5.97317 6.14191 5.6467 10.1026C5.46849 12.2647 6.13634 14.4115 7.50958 16.091L12.9018 22.6855C13.211 23.0636 13.789 23.0636 14.0982 22.6855L19.4904 16.091C20.8637 14.4115 21.5315 12.2647 21.3533 10.1026C21.0268 6.14191 17.7171 3.09375 13.743 3.09375H13.257Z"
      fill="white"
    />
  </svg>
);

export { LocationSVG, WeatherIcon };
