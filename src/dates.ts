function getDays(): { date: string; Days: string[] } {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const currentDayNumber = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const date = `${currentDayNumber < 10 ? "0" : ""}${currentDayNumber} ${
    currentMonth < 10 ? "0" : ""
  }${currentMonth} ${currentYear}`;

  const days = [];
  for (let i = 0; i < 5; i++) {
    const futureDate = new Date();
    futureDate.setDate(currentDayNumber + i);
    const futureDay = weekDays[futureDate.getDay()].toLowerCase();
    days.push(
      i === 0
        ? futureDay.charAt(0).toUpperCase() + futureDay.slice(1)
        : futureDay
    );
  }

  return {
    date: date,
    Days: days,
  };
}

export { getDays };
