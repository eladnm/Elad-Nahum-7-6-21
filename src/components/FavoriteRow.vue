<template>
  <div
    class="favorite-box d-flex justify-center align-center flex-column"
    @click="goToCity"
  >
    <h3 class="location-name">{{ city.LocalizedName }}</h3>
    <template v-if="condition">
      <div class="temperature d-flex justify-center align-center">
        <img
          class="weather-icon"
          alt="Partly sunny"
          src="https://www.accuweather.com/images/weathericons/3.svg"
        /><span>{{ temp }}°</span>
      </div>
      <span class="weather-text">{{ condition.WeatherText }}</span>
    </template>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script lang="ts">
import { City, CurrentCondition } from "@/utils/type";
import { Component, Prop, Vue } from "@/utils/vue-imports";
import api from "@/api";
import { Action, State } from "vuex-class";
import { calculate } from "@/utils";

@Component({
  name: "FavoriteRow",
})
export default class FavoriteRow extends Vue {
  @Prop({ required: true }) readonly city!: City;
  private condition: CurrentCondition = {} as CurrentCondition;
  public loading = false;
  @State readonly unit!: string;
  @Action public setCurrentCity!: (key:City) => Promise<any>;

  get temp() {
    if (!this.condition || Object.keys(this.condition).length === 0) return "";
    return calculate(this.condition.Temperature.Metric.Value, this.unit);
  }
  loadCondition() {
    this.loading = true;
    api
      .getCurrentCondition(this.city.Key)
      .then((res) => res.json())
      .then((res) => {
        this.condition = res[0];
      })
      .finally(() => {
        this.loading = false;
      });
  }

  goToCity() {
    this.setCurrentCity(this.city).then(() => {
      this.$router.push("/");
    });
  }
  mounted() {
    this.loadCondition();
  }
}
</script>
