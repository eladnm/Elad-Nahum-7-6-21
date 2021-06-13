<template>
  <v-container fluid>
    <form class="auto-complete-form">
      <v-autocomplete
        v-model="model"
        :items="entries"
        :loading="isLoading"
        :search-input.sync="search"
        :color="$vuetify.theme.dark ? 'white' : '#333'"
        hide-no-data
        hide-selected
        rounded
        solo
        item-text="LocalizedName"
        item-value="Key"
        placeholder="Type to search..."
        return-object
        :background-color="
          $vuetify.theme.dark ? 'rgba( 0,0,0,.3 )' : 'rgb(51, 153, 255)'
        "
        id="search"
      ></v-autocomplete>
    </form>
    <current v-if="hasCondition" :condition="currentCondition"></current>

    <forcasts :items="forcasts"></forcasts>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import { City, CityData, CurrentCondition, ForcastItem } from "@/utils/type";
import { Vue, Component, Watch } from "@/utils/vue-imports";
import Current from "./Current.vue";
import Forcasts from "./Forcasts.vue";
import api from "../api";
import { Action, State } from "vuex-class";

const defaultLocation: Partial<City> = {
  Key: "215854",
  LocalizedName: "Tel Aviv",
};

@Component({
  name: "Dashboard",
  components: { Current, Forcasts },
})
export default class Dashboard extends Vue {
  private isLoading = false;
  public search: string | null | undefined = null;
  public entries: Array<any> = [];
  public descriptionLimit = 60;
  //private count = 0;
  public model: Record<string, any> | null = null;

  @State public cityData!: CityData;
  //this.$store.state.cityData
  @State public currentCondition!: CurrentCondition;
  @State public city?: City;
  @State public triedToLocate!: boolean;
  @Action public setCurrentCity!: (key: City) => void;
  @Action public loadCity!: (key: City | undefined) => void;

  get forcasts(): ForcastItem[] {
    return this.cityData ? this.cityData.DailyForecasts : [];
  }

  get hasCondition() {
    return (
      this.currentCondition && Object.keys(this.currentCondition).length > 0
    );
  }
  @Watch("search")
  searchChanged(newVal: string) {
    // Items have already been loaded
    //if (this.entries.length > 0) return;

    // Items have already been requested
    if (this.isLoading) return;

    this.isLoading = true;

    // Lazily load input items

    api
      .search(newVal)
      .then((res) => res.json())
      .then((res) => {
        this.entries = res;
      })
      .catch((err) => {
        console.log(err);
        Vue.$toast.error(`An error occured!` + " " + err);
      })
      .finally(() => (this.isLoading = false));
  }

  isEmpty(el: Object | undefined) {
    return !el || Object.keys(el).length === 0;
  }

  mounted() {
    if (!this.isEmpty(this.city)) {
      //this.loadCity(this.city);
      this.$store.dispatch("loadCity", this.city);
    }
  }

  created() {
    if (!this.triedToLocate) {
      this.$store.dispatch("getCurrentLocation").then(() => {
        if (this.isEmpty(this.city)) {
          //this.loadCity(this.city);
          this.$store.dispatch("loadCity", defaultLocation);
        }
      });
    }
  }
  @Watch("model")
  modelChanged(newValue: City) {
    if (newValue) {
      this.setCurrentCity(newValue);
    }
  }

  @Watch("city")
  cityChange(newValue: City) {
    if (!this.isEmpty(newValue)) this.loadCity(newValue);

    //this.$store.dispatch("loadCity", newValue);
  }
}
</script>
