const options: RequestInit = {
  method: "GET",
  mode: "cors",
  redirect: "follow",
};
const apiKey2 = "hdudMoQeprgNRw9T3QbEanWXibbEu3UG";
const apiKey = "koz4s5ycX3BbiUMHGC9M42QqolVSb6iq";
export default {
  getData(key: string) {
    return fetch(
      "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
        key +
        "?" +
        "&apikey=" +
        apiKey +
        "&details=true&metric=true",
      options
    );
    // return fetch(
    //   "data4.json?" +
    //     key +
    //     "&apikey=VaG6iEAO4pgeTBriYEEsqMzYMOtnVEoA&details=true&metric=true",
    //   options
    // );
   },
  getCurrentCondition(key: string) {
    return fetch(
      "https://dataservice.accuweather.com/currentconditions/v1/" +
        key +
        "?" +
        "&apikey=" +
        apiKey +
        "&details=true&metric=true",
      options
    );
    // return fetch(
    //   "data5.json?" +
    //     key +
    //     "&apikey=VaG6iEAO4pgeTBriYEEsqMzYMOtnVEoA&details=true&metric=true",
    //   options
    // );
  },

  search(value: string): Promise<any> {
    return fetch(
      "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=" +
        value +
        "&apikey=" +
        apiKey +
        "&details=true&metric=true",
      options
    );
  },
  searchLocation(long: string, lat: string) {
    return fetch(
      "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=" +
        `${lat},${long}` +
        "&apikey=" +
        apiKey +
        "&details=true&metric=true",
      options
    );
  },
};
