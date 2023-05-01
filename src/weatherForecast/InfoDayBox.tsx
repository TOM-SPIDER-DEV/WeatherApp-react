import { WeatherIcon } from "../svg/svgs";
interface Props {
  day: string | undefined;
  temp: number;
  iconId: number;
}
function InfoDayBox(props: Props) {
  return (
    <li className="w-32 h-48 sm:w-24 sm:h-40 lg:p-8  rounded-xl m-1 bg-gray-800 flex justify-center items-center flex-col text-center">
      <WeatherIcon iconId={props.iconId} className="w-32 h-32" />
      <p className="text-center text-md sm:text-sm mt-4 mb-2 text-white relative bottom-6">
        {props.day}
      </p>
      <p className="font-bold text-center text-2xl sm:text-xl text-white relative bottom-6">
        {props.temp}°
      </p>
    </li>
  );
}
export { InfoDayBox };
