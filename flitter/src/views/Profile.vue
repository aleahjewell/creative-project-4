<template>
  <div class="profile">
    <div class="horizontal-container">
      <div class="img-container">
        <img class="profile-pic" :src="getImage()" />
      </div>

      <div class="vertical-container">
        <input
          id="nameInput"
          :class="{ editable: editable }"
          v-model="name"
          readonly
        />
        <input
          id="handleInput"
          :class="{ editable: editable }"
          v-model="handle"
          readonly
        />
        <input
          id="imageInput"
          :class="{ editable: editable }"
          v-model="image"
          readonly
        />
      </div>
    </div>

    <div v-if="!editable">
      <button class="button" v-on:click="edit()">Edit Profile</button>
    </div>
    <div v-else>
      <button class="button" v-on:click="save()">Save</button>
      <button class="button" v-on:click="cancel()">Cancel</button>
    </div>

    <div v-for="flit in flits" v-bind:key="flit.id">
      <Flit :flit="flit" :profile="true" />
    </div>
  </div>
</template>

<script>
import Flit from "../components/Flit.vue";

export default {
  name: "Profile",
  components: {
    Flit,
  },
  data() {
    return {
      name: this.getName(),
      handle: this.getHandle(),
      image: this.getImage(),
      editable: false,
    };
  },
  computed: {
    flits() {
      return this.$root.$data.allData.flits.filter((f) => {
        return f.userId == this.$root.$data.allData.currUser.id;
      });
    },
  },
  methods: {
    getName() {
      return this.getCurrUser().name;
    },
    getHandle() {
      return this.getCurrUser().handle;
    },
    getImage() {
      return this.getCurrUser().image;
    },
    getCurrUser() {
      return this.$root.$data.allData.users.find(
        (user) => user.id == this.$root.$data.allData.currUser.id
      );
    },
    edit() {
      this.editable = true;
      document.getElementById("nameInput").readOnly = false;
      document.getElementById("handleInput").readOnly = false;
      document.getElementById("imageInput").readOnly = false;
    },
    save() {
      this.editable = false;
      document.getElementById("nameInput").readOnly = true;
      document.getElementById("handleInput").readOnly = true;
      document.getElementById("imageInput").readOnly = true;

      let i = this.$root.$data.allData.users.indexOf(this.getCurrUser());
      let currUserRef = this.$root.$data.allData.users[i];
      currUserRef.name = this.name;
      currUserRef.handle = this.handle;
      currUserRef.image = this.image;
    },
    cancel() {
      this.editable = false;
      document.getElementById("nameInput").readOnly = true;
      document.getElementById("handleInput").readOnly = true;
      document.getElementById("imageInput").readOnly = true;

      let i = this.$root.$data.allData.users.indexOf(this.getCurrUser());
      let currUserRef = this.$root.$data.allData.users[i];
      this.name = currUserRef.name;
      this.handle = currUserRef.handle;
      this.image = currUserRef.image;
    },
  },
};
</script>

<style scoped>
.profile {
  padding: 30px 0;
}

.img-container {
  display: flex;
  justify-content: center;
  margin-right: 30px;
  align-items: center;
}

.profile-pic {
  border-radius: 100px;
  height: 150px;
  width: 150px;
  object-fit: cover;
  background-color: #d9d9d9;
}

.horizontal-container {
  display: flex;
  flex-direction: row;
}

.vertical-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

button {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.3em 0.3em 0;
  border: 1px solid #1da1f2;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  color: #1da1f2;
  background-color: black;
  text-align: center;
  transition: all 0.2s;
  margin: 30px 0;
  margin-right: 12px;
}

button:hover {
  background-color: dimgray;
}

button:focus {
  outline: none;
  box-shadow: none;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 90%;
  height: 40px;
  color: dimgray;
  background-color: #000000;
  margin-bottom: 12px;
  text-overflow: ellipsis;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.editable {
  border-bottom: 1px solid dimgray !important;
}
</style>