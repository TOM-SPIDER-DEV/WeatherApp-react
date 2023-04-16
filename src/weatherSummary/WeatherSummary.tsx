import { SunnySVG } from "../svg/svgs";

function WeatherSummary(props: {
  temp: number | undefined;
  summary: string | undefined;
}) {
  return (
    <div className="mb-14">
      <SunnySVG className="ml-8 w-32 h-32" />
      <p className="ml-8 mt-8 font-bold text-white text-5xl">{props.temp}°</p>
      <p className="ml-8 mt-8 font-medium text-white text-2xl">
        {props.summary}
      </p>
    </div>
  );
}
export { WeatherSummary };
