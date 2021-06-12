interface Unit {
  Value: number;
  Unit: string;
  UnitType: number;
}

interface DayType {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

export interface ForcastItem {
  Date: string;
  EpochDate: string;
  Temperature: {
    Minimum: Unit;
    Maximum: Unit;
  };
  Day: DayType;
  Night: DayType;
}

export interface CityData {
  Headline: string;
  DailyForecasts: ForcastItem[];
}

export interface CurrentCondition {
  city: City;
  WeatherText: string;
  WeatherIcon: number;
  IsDayTime: boolean;
  Temperature: {
    Metric: Unit;
    Imperial: Unit;
  };
}

export interface Area {
  ID: number;
  LocalizedName: string;
}

export interface City {
  AdministrativeArea: Area;
  Country: Area;
  Key: string;
  LocalizedName: string;
}
