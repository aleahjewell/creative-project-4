<template>
  <div class="flit">
    <div class="container right-margin">
      <div class="img-container">
        <img class="profile-pic" :src="profilePic" />
      </div>
    </div>
    <div class="info-container">
      <div class="profile-info">
        <h2 class="right-margin">{{ name }}</h2>
        <p class="right-margin">{{ handle }}</p>
        <p>{{ date }}</p>
      </div>

      <div class="writing" v-if="!writing">
        <p class="flit-text">{{ flitMessage }}</p>
        <div class="img-container">
          <img class="image" v-show="image != ''" :src="image" />
        </div>

        <div class="btn-container" v-show="profile">
          <button v-on:click="deleteFlit()">Delete</button>
        </div>
      </div>

      <div v-else>
        <input v-model="textInput" placeholder="Write flit" />
        <input v-model="imageInput" placeholder="Add image link" />
        <button v-on:click="post()">Post</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Flit",
  props: {
    flit: Object,
    writing: Boolean,
    profile: Boolean,
  },
  data() {
    return { textInput: "", imageInput: "" };
  },
  computed: {
    name() {
      return this.$root.$data.allData.users.find(
        (user) => user.id == this.flit.userId
      ).name;
    },
    handle() {
      return this.$root.$data.allData.users.find(
        (user) => user.id == this.flit.userId
      ).handle;
    },
    profilePic() {
      return this.$root.$data.allData.users.find(
        (user) => user.id == this.flit.userId
      ).image;
    },
    date() {
      return this.flit.date;
    },
    flitMessage() {
      return this.flit.flit;
    },
    image() {
      return this.flit.image;
    },
  },
  methods: {
    post() {
      var today = new Date();
      var d = String(today.getDate());
      var m = String(today.getMonth() + 1);
      var y = today.getFullYear();

      today = m + "/" + d + "/" + y;

      this.flit.flit = this.textInput;
      this.flit.date = today;
      this.flit.image = this.imageInput;
      this.$root.$data.allData.flits.unshift(this.flit);
      this.textInput = "";
      this.imageInput = "";
    },
    deleteFlit() {
      this.$root.$data.allData.flits = this.$root.$data.allData.flits.filter(
        (f) => f.id != this.flit.id
      );
    },
  },
};
</script>

<style scoped>
button {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin-top: 20px;
  border: 1px solid #1da1f2;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  color: #1da1f2;
  background-color: black;
  text-align: center;
  transition: all 0.2s;
}

button:hover {
  background-color: dimgray;
}

button:focus {
  outline: none;
  box-shadow: none;
}

.writing {
  width: 100%;
}

.btn-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
  border-bottom: 1px solid dimgray !important;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.flit {
  border: 1px solid dimgray;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 600px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.img-container {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.profile-pic {
  border-radius: 35px;
  height: 48px;
  width: 48px;
  object-fit: cover;
  background-color: #d9d9d9;
}

.image {
  height: 300px;
  width: 500px;
  object-fit: cover;
}

.profile-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
}

.right-margin {
  margin-right: 8px;
}

h1,
h2,
h3,
h4,
h5,
h6,
a,
p {
  margin-top: 0;
}

.flit-text {
  color: #d9d9d9;
}
</style>
