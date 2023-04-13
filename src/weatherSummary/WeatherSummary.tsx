import { SunSVG } from "../svg/svgs";

function WeatherSummary(props: {
  temp: number | undefined;
  summary: string | undefined;
}) {
  return (
    <div className="mb-14">
      <SunSVG className="ml-8 w-20 h-20" />
      <p className="ml-8 mt-8 font-bold text-white text-5xl">{props.temp}°</p>
      <p className="ml-8 mt-8 font-medium text-white text-2xl">
        {props.summary}
      </p>
    </div>
  );
}
export { WeatherSummary };
