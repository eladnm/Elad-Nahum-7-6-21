<template>
  <div class="d-flex justify-center align-center flex-md-nowrap flex-wrap">
    <div
      id="dayForecast"
      class="d-flex justify-center align-center flex-column mr-0 mr-md-3 mb-4"
      :style="{ 'flex-basis': $vuetify.breakpoint.mobile ? '100%' : '20%' }"
      v-for="(forcast, index) in items"
      :key="index"
    >
      <h1
        style="color: #e0aa1f; text-shadow: 0 0 5px rgb(0 0 0 / 50%);"
        class="day"
      >
        {{ dayOfWeek(forcast.Date).date }}
      </h1>
      <v-img
        class="weather-icon"
        max-width="6em"
        alt="Sunny"
        :src="
          'https://www.accuweather.com/images/weathericons/' +
          forcast.Day.Icon +
          '.svg'
        "
      ></v-img>
      <h2 class="temperature">{{ getTemp(forcast) }}</h2>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "../utils/vue-imports";
import { ForcastItem } from "../utils/type";
import { calculate } from "@/utils";
import { State } from "vuex-class";

@Component({
  name: "Forcasts",
})
export default class Forcast extends Vue {
  @Prop({ default: () => [] })
  readonly items!: Array<ForcastItem>;

  @State readonly unit!: string;

  dayOfWeek(dateDay: string): object {
    interface Dates {
      date?: string;
      isToday?: boolean;
    }
    const dateObject: Dates = {};

    const dateFormat = new Date(dateDay);
    const date2 = new Date(dateDay).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    const dayString = dateFormat.toString().split(" ")[0];

    if (date2 === today) {
      dateObject.isToday = true;
    } else {
      dateObject.isToday = false;
    }
    dateObject.date = dayString;
    return dateObject;
  }
  getTemp(item: ForcastItem) {
    return `${this.calTemp(item.Temperature.Minimum.Value)}° - ${this.calTemp(
      item.Temperature.Maximum.Value
    )}°`;
  }

  calTemp(temp: number): number {
    return calculate(temp, this.unit);
  }
}
</script>
