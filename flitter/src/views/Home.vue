<template>
  <div class="home">
    <h1>Home</h1>

    <Flit :flit="newFlit" :writing="true" :profile="false" />

    <div v-for="flit in flits" v-bind:key="flit.id">
      <Flit :flit="flit" :profile="false" />
    </div>
  </div>
</template>

<script>
import Flit from "../components/Flit.vue";

export default {
  name: "Home",
  components: {
    Flit,
  },
  computed: {
    flits() {
      return this.$root.$data.allData.flits;
    },
    newFlit() {
      return {
        id: this.$root.$data.allData.flits.length + 1,
        flit: "",
        date: "",
        userId: this.$root.$data.allData.currUser.id,
        image: "",
      };
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
</style>
