import Vue from "vue";
import Vuex from "vuex";
import api from "../api";
import { City, CityData, CurrentCondition } from "../utils/type";
import { ACTIONS } from "@/utils";
Vue.use(Vuex);
const storageData = {
  favorites: localStorage.getItem("__favorites") as string,
};
export default new Vuex.Store({
  state: {
    city: {} as City,
    cityData: {} as CityData,
    currentCondition: {} as CurrentCondition,
    currentCity: null,
    unit: "C",
    them: "dark",
    favorites: (storageData.favorites
      ? JSON.parse(storageData.favorites)
      : []) as any[],
    isLocated: false,
    triedToLocate: false,
  },
  mutations: {
    SET_CURRENT_CITY(state, city) {
      state.city = city;
    },
    SET_DATA(state, data) {
      state.cityData = data;
    },
    SET_CURRENT_CONDITION(state, data) {
      state.currentCondition = data || {};
    },
    TOGGLE_UNIT(state) {
      state.unit = state.unit == "C" ? "F" : "C";
    },
    TOGGLE_FAVORITE(state, { city, action }) {
      if (action === ACTIONS.ADD) {
        state.favorites.push(city);
      } else {
        const index = state.favorites.findIndex((el) => el.Key === city.Key);
        state.favorites.splice(index, 1);
      }
      localStorage.setItem("__favorites", JSON.stringify(state.favorites));
    },
    SET_CURRENT_CITY_KEY(state, Key) {
      state.currentCity = Key;
    },
    IS_LOCATED(state, value) {
      state.isLocated = value;
    },
    SET_TRIED_TO_LOCATE(state, value) {
      state.triedToLocate = value;
    },
  },
  actions: {
    loadCity({ commit }, city) {
      commit("SET_CURRENT_CITY", city);
      const key = city.Key;
      const actions = [
        api.getData(key).then((res) => res.json()),
        api.getCurrentCondition(key).then((res) => res.json()),
      ];
      return new Promise((resolve, reject) => {
        Promise.all(actions)
          .then((data) => {
            commit("SET_DATA", data[0]);
            const [currentCondition] = data[1];
            if (currentCondition) {
              currentCondition.city = city;
            }
            commit("SET_CURRENT_CONDITION", currentCondition);
            resolve(data);
          })
          .catch((err) => {
            console.log(err);
            Vue.$toast.error(`An error occured!` + " " + err);

            reject(err);
          });
      });
    },
    changeUnit({ commit }) {
      commit("TOGGLE_UNIT");
    },
    toggleFavorite({ commit, getters }, city: City) {
      if (getters.isInFavorites(city.Key)) {
        commit("TOGGLE_FAVORITE", { city, action: ACTIONS.REMOVE });
        Vue.$toast.info(`${city.LocalizedName} has been remove from favories`);
      } else {
        commit("TOGGLE_FAVORITE", { city, action: ACTIONS.ADD });
        Vue.$toast.success(`${city.LocalizedName} added to favories !`);
      }
    },
    setCurrentCity({ commit }, city) {
      commit("SET_CURRENT_CITY", city);
    },
    getCurrentLocation({ commit, dispatch }) {
      Vue.$toast.info("Locating your device...");
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = (pos: any) => {
        commit("IS_LOCATED", true);
        commit("SET_CURRENT_CITY", {});
        const { latitude: lat, longitude: lon } = pos.coords;
        api
          .searchLocation(lon, lat)
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((res) => {
            Vue.$toast.success("Located successfully!");
            dispatch("loadCity", res);
          })
          .catch((err) => {
            console.log(err);
            Vue.$toast.error(`An error occured!` + " " + err);
          });
      };

      const error = () => {
        console.log("errorrrr");
        commit("IS_LOCATED", false);
        Vue.$toast.clear();
        Vue.$toast.error("Cannot locate your device");
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
      commit("SET_TRIED_TO_LOCATE", true);
    },
  },
  getters: {
    isInFavorites: (state) => (key: string) =>
      !!state.favorites.find((city) => city.Key === key),
  },
  modules: {},
});
