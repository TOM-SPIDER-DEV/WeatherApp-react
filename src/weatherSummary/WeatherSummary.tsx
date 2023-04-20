import { WeatherIcon } from "../svg/svgs";
interface Props {
  temp: number | undefined;
  summary: string | undefined;
  iconId: number;
}
function WeatherSummary(props: Props) {
  return (
    <div className="mb-14">
      <WeatherIcon iconId={props.iconId} />
      <p className="ml-8 mt-8 font-bold text-white text-5xl">{props.temp}°</p>
      <p className="ml-8 mt-8 font-medium text-white text-2xl">
        {props.summary}
      </p>
    </div>
  );
}
export { WeatherSummary };
