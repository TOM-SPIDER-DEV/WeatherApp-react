import { SunSVG } from "../svg/svgs";
function InfoDayBox(props: { day: string | undefined; temp: number }) {
  return (
    <li className="w-32 h-48 rounded-xl m-1 bg-gray-800 flex justify-center items-center flex-col text-center">
      <SunSVG className=" mt-1 w-16 h-16 fill-white" />
      <p className="text-center text-md mt-4 mb-2 text-white">{props.day}</p>
      <p className="font-bold text-center text-2xl  text-white">
        {props.temp}°
      </p>
    </li>
  );
}
export { InfoDayBox };
