<template>
  <div class="current d-flex justify-start align-start flex-column">
    <h1 class="current-title">
      <button
        class="favorite-toggle-button"
        :class="{ 'is-favorite': isInFavorites(condition.city.Key) }"
        @click="toggleFavorite(condition.city)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-heart"
          viewBox="0 0 50 50"
        >
          <path
            d="M25,47.302l-0.64-0.533c-1.217-1.015-2.861-2.115-4.765-3.39C12.169,38.408,2,31.601,2,20C2,12.832,7.832,7,15,7c3.896,0,7.542,1.734,10,4.699C27.458,8.734,31.104,7,35,7c7.168,0,13,5.832,13,13c0,11.601-10.169,18.408-17.595,23.379c-1.904,1.274-3.548,2.375-4.765,3.39L25,47.302z"
          ></path>
        </svg>
      </button>
      {{ condition.city.LocalizedName }}
    </h1>
    <p class="current-subtitle d-flex justify-center align-center flex-column">
      <span class="temperature d-flex align-center justify-center"
        ><img
          class="weather-icon"
          alt="Sunny"
          :src="`https://www.accuweather.com/images/weathericons/${condition.WeatherIcon}.svg`"
        /><span>{{ temp }}°</span></span
      ><span class="weather-text">{{ condition.WeatherText }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "../utils/vue-imports";
import { CurrentCondition } from "../utils/type";
import { State, Getter, Action } from "vuex-class";
import { calculate } from "@/utils";

@Component({ name: "Current" })
export default class Current extends Vue {
  @Prop({ required: true }) readonly condition!: CurrentCondition;

  @State readonly unit!: string;
  get temp() {
    return calculate(this.condition.Temperature.Metric.Value, this.unit);
  }

  @Getter readonly isInFavorites!: (key: string) => boolean;

  @Action public toggleFavorite!: (key: string) => void;

}
</script>

<style></style>
