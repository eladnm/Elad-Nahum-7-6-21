<template>
  <div class="home">
    <Navbar />
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "@/utils/vue-imports";
import Navbar from "@/components/Navbar.vue";
import Dashboard from "@/components/Dashboard.vue";
interface Entry {
  Description: string;
}

@Component({
  name: "Home",
  components: {
    Navbar,
    Dashboard,
  },
})
export default class Home extends Vue {
  isLoading: boolean = false;
  search: string | null | undefined = null;
  entries: Array<Entry> = [];
  descriptionLimit: number = 60;
  count: number = 0;
  get items() {
    return this.entries.map((entry) => {
      const Description =
        entry.Description.length > this.descriptionLimit
          ? entry.Description.slice(0, this.descriptionLimit) + "..."
          : entry.Description;

      return Object.assign({}, entry, { Description });
    });
  }

  @Watch("search")
  searchChanged(newVal: string) {
    // Items have already been loaded
    if (this.items.length > 0) return;

    // Items have already been requested
    if (this.isLoading) return;

    this.isLoading = true;

    // Lazily load input items
    fetch("https://api.publicapis.org/entries")
      .then((res) => res.json())
      .then((res) => {
        const { count, entries } = res;
        this.count = count;
        this.entries = entries;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
  }
}
</script>

<style scoped>
.block {
  margin: 3rem 2rem 3rem 2rem;
}
h1,
h2 {
  margin: 0;
}
h3 {
  margin-top: 0.5rem;
}
img {
  margin-bottom: 1rem;
}
</style>
