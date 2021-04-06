<template>
  <div class="search">
    <div class="search-bar">
      <form class="pure-form">
        <i class="fas fa-search"></i>
        <input v-model="searchText" placeholder="Search Flitter" />
      </form>
    </div>

    <div class="list">
      <div v-for="flit in flits" v-bind:key="flit.id">
        <Flit :flit="flit" :profile="false" />
      </div>
    </div>
  </div>
</template>

<script>
import Flit from "../components/Flit.vue";

export default {
  name: "Search",
  components: {
    Flit,
  },
  data() {
    return { searchText: "" };
  },
  computed: {
    flits() {
      let flits = this.$root.$data.allData.flits.filter(
        (f) => f.flit.toLowerCase().search(this.searchText.toLowerCase()) >= 0
      );
      let authors = this.$root.$data.allData.flits.filter((f) => {
        let name = this.$root.$data.allData.users.find(
          (user) => user.id == f.userId
        ).name;
        return name.toLowerCase().search(this.searchText.toLowerCase()) >= 0;
      });
      let handles = this.$root.$data.allData.flits.filter((f) => {
        let handle = this.$root.$data.allData.users.find(
          (user) => user.id == f.userId
        ).handle;
        return handle.toLowerCase().search(this.searchText.toLowerCase()) >= 0;
      });

      let someResults = flits.concat(authors);
      let allResults = someResults.concat(handles);

      return allResults.filter((item, index) => {
        return allResults.indexOf(item) == index;
      });
    },
  },
};
</script>


<style scoped>
.search {
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: fit-content;
}

.search-bar {
  width: 80%;
  height: fit-content;
  margin-bottom: 20px;
}

form {
  display: table;
  width: 100%;
  border: 1px solid dimgray;
  border-radius: 50px;
  padding: 0 20px;
}

i {
  display: table-cell;
  width: 1px;
  background-color: #000000;
  padding-right: 10px;
  color: #1da1f2;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
  color: dimgray;
  background-color: #000000;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.list {
  display: flex;
  flex-direction: column;
  border: none;
}
</style>