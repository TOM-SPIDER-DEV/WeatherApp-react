import { ReactSVG } from "react-svg";

function WeatherIcon(props: { iconId: number }) {
  const style = "mt-1 w-20 h-20 fill-white";
  switch (props.iconId) {
    case 1:
      // Not availble
      return <ReactSVG src="./not-available.svg" className={style} />;

    case 2:
      // Sunny
      return <ReactSVG src="./clear-day.svg" className={style} />;

    case 3 | 4:
      // Partly sunny and mostly sunny
      // Mostly cloudy
      return <ReactSVG src="./partly-cloudy-day.svg" className={style} />;

    case 6:
      // Cloudy
      return <ReactSVG src="./cloudy.svg" className={style} />;

    case 7 | 8:
      // Overcast
      // Overcast with low clouds
      return <ReactSVG src="./overcast-day.svg" className={style} />;

    case 9:
      // Fog
      return <ReactSVG src="./fog.svg" />;

    case 10:
      // Light rain
      return <ReactSVG src="./extreme-hail.svg" className={style} />;

    case 11 | 12 | 13:
      // Rain
      // Possible rain
      // Rain shower
      return <ReactSVG src="./rain.svg" className={style} />;

    case 14:
      // Thunderstorm
      // Local thunderstorms
      return <ReactSVG src="./thunderstorms-day.svg" className={style} />;

    case 16:
      // Light snow
      return <ReactSVG src="./sleet.svg" className={style} />;

    case 17 | 18 | 19 | 34:
      // Snow
      // Possible snow
      // Snow shower
      // Snow shower (night)
      return <ReactSVG src="./snow.svg" className={style} />;

    case 20 | 21 | 22 | 23 | 24:
      // Rain and snow
      // Possible rain and snow
      return <ReactSVG src="./thunderstorms-day-snow.svg" className={style} />;

    case 26:
      // Clear (night)
      return <ReactSVG src="./clear-night.svg" className={style} />;

    case 27 | 28:
      // Mostly clear (night)
      // Partly clear (night)
      // Mostly cloudy (night)
      return <ReactSVG src="./partly-cloudy-night.svg" className={style} />;

    case 30:
      // Cloudy (night)
      return <ReactSVG src="./cloudy.svg" className={style} />;

    case 31:
      // Overcast with low clouds (night)

      return <ReactSVG src="./overcast-night.svg" className={style} />;

    case 32 | 33:
      // Rain shower (night)
      // Local thunderstorms (night)
      return <ReactSVG src="./thunderstorms-night.svg.svg" className={style} />;

    case 35 | 36:
      // Rain and snow (night)
      return (
        <ReactSVG src="./thunderstorms-night-snow.svg.svg" className={style} />
      );

    default:
      // Handle the case when the weather icon is not recognized
      return <ReactSVG src="./not-available.svg" className={style} />;
  }
}

const SummarySVG = (props: { className: string }) => (
  <svg
    viewBox="0 0 493 666"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={props.className}
  >
    <rect width="493" height="666" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_105_5"
          transform="matrix(0.00150101 0 0 0.00111111 -0.00659229 0)"
        />
      </pattern>
    </defs>
  </svg>
);

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

export { SummarySVG, LocationSVG, WeatherIcon };
