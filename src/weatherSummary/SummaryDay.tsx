import { LocationSVG } from "../svg/svgs";

function SummaryDay(props: {
  today: string | undefined;
  date: string | undefined;
  place: string | undefined;
}) {
  return (
    <div>
      <p className="ml-8 mt-8 font-bold text-white text-4xl">{props.today}</p>
      <p className="ml-8 pt-2  text-white text-lg">{props.date}</p>
      <div className="flex ml-8 pt-4">
        <LocationSVG />
        <p className="text-white">{props.place}</p>
      </div>
    </div>
  );
}
export { SummaryDay };
