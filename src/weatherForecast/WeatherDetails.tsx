function WeatherDetails(props: {
  category: string | undefined;
  temp: string | undefined;
}) {
  return (
    <li>
      <p className="m-4 text-2xl font-bold">{props.category}</p>
      <p className="text-2xl m-4">{props.temp}</p>
    </li>
  );
}
export { WeatherDetails };
