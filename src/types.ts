export interface RootWeatherObject {
  current: Current;
  elevation: number;
  lat: string;
  lon: string;
  timezone: string;
  units: string;
}

interface Current {
  cloud_cover: number;
  dew_point: number;
  feels_like: number;
  humidity: number;
  icon: string;
  icon_num: number;
  ozone: number;
  precipitation: Precipitation;
  pressure: number;
  summary: string;
  temperature: number;
  uv_index: number;
  visibility: number;
  wind: Wind;
  wind_chill: number;
}

interface Precipitation {
  total: number;
  type: string;
}

interface Wind {
  angle: number;
  dir: string;
  gusts: number;
  speed: number;
}

/* **************************** */
export interface DaysData {
  date: string;
  Days: string[];
}

/* ***************************** */

export interface RootPlaceObject {
  adm_area1: string;
  adm_area2: null | string;
  country: string;
  lat: string;
  lon: string;
  name: string;
  place_id: string;
  timezone: string;
  type: string;
}

/* ***************************** */

export interface RootDailyWeatherObject {
  cloud_cover: number;
  day: Date;
  dew_point: number;
  dew_point_max: number;
  dew_point_min: number;
  feels_like: number;
  feels_like_max: number;
  feels_like_min: number;
  humidity: number;
  icon: number;
  ozone: number;
  precipitation: Precipitation;
  predictability: number;
  pressure: number;
  probability: Probability;
  summary: string;
  temperature: number;
  temperature_max: number;
  temperature_min: number;
  visibility: number;
  weather: string;
  wind: Wind;
  wind_chill: number;
  wind_chill_max: number;
  wind_chill_min: number;
}

interface Probability {
  freeze: number;
  precipitation: number;
  storm: number;
}
