<template>
  <v-container fluid class="d-flex justify-center align-center h-full">
    <div class="favorites-view d-flex align-center justify-center flex-column">
      <h1>Your Favorite Locations:</h1>
      <div class="f-container d-flex justify-center align-center flex-wrap">
        <FavoriteRow
          v-for="favorite in $store.state.favorites"
          :key="favorite.Key"
          :city="favorite"
        ></FavoriteRow>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import FavoriteRow from "../components/FavoriteRow.vue";

export default Vue.extend({
  name: "Favorite",
  components: { FavoriteRow },
});
</script>
<style lang="scss">
.h-full {
  height: 100%;
}

.favorites-view {
  justify-self: flex-start;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 90vw;
  max-width: 800px;
  padding: 2rem 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.2);
  transition: 0.3s all;

  h1 {
    margin: 0 auto 3rem;
    text-align: center;
  }

  .no-favorites {
    font-size: 1.2rem;
    text-align: center;
  }
}

.f-container {
  grid-gap: 1rem;
  gap: 1rem;

  & > * {
    flex: 1 0 auto;
  }
}
</style>
