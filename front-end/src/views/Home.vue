<template>
  <div class="home">
    <h1>Home</h1>

    <div class="flit">
      <div class="container right-margin">
        <div class="img-container">
          <img class="profile-pic" :src="currProfilePic" />
        </div>
      </div>

      <div class="info-container">
        <div class="profile-info">
          <h2 class="right-margin">{{ currName }}</h2>
          <p class="right-margin">@{{ currHandle }}</p>
          <p>{{ currDate }}</p>
        </div>

        <input v-model="textInput" placeholder="Write flit" />
        <input type="file" name="photo" @change="fileChanged" />

        <button v-on:click="post()">Post</button>
      </div>
    </div>

    <div v-for="flit in flits" v-bind:key="flit.id">
      <div class="flit">
        <div class="container right-margin">
          <div class="img-container">
            <img class="profile-pic" :src="flit.profilePicPath" />
          </div>
        </div>

        <div class="info-container">
          <div class="profile-info">
            <h2 class="right-margin">{{ flit.name }}</h2>
            <p class="right-margin">@{{ flit.handle }}</p>
            <p>{{ flit.date }}</p>
          </div>

          <p class="flit-text">{{ flit.flit }}</p>
          <div class="img-container">
            <img
              class="image"
              v-show="flit.imagePath != ''"
              :src="flit.imagePath"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Home",
  data() {
    return {
      flits: [],
      users: [],
      currentUser: null,
      textInput: "",
      file: null,
    };
  },
  created() {
    this.getAllFlits();
    this.getAllUsers();
    this.getCurrentUser();
  },
  computed: {
    newFlit() {
      return {
        flit: "",
        date: moment(new Date()).format("MM/DD/YYYY HH:mm a"),
        imagePath: "",
        user: this.currentUser,
      };
    },
    currName() {
      return this.currentUser ? this.currentUser.name : "";
    },
    currHandle() {
      return this.currentUser ? this.currentUser.handle : "";
    },
    currProfilePic() {
      return this.currentUser ? this.currentUser.profilePicPath : "";
    },
    currDate() {
      return this.newFlit.date;
    },
  },
  methods: {
    async getAllFlits() {
      try {
        const response = await axios.get("/api/flits");
        for (let flit of response.data) {
          let user = await this.getUserById(flit.user);
          flit.name = user.name;
          flit.handle = user.handle;
          flit.profilePicPath = user.profilePicPath;
        }
        this.flits = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCurrentUser() {
      try {
        const response = await axios.get("/api/currentUser");
        this.currentUser = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllUsers() {
      try {
        const response = await axios.get("/api/users");
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    getName(userId) {
      return this.getUserById(userId).name;
    },
    getHandle(userId) {
      return this.getUserById(userId).handle;
    },
    async getUserById(id) {
      try {
        const response = await axios.get("/api/users/" + id);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async post() {
      try {
        let response = null;
        if (this.file) {
          const formData = new FormData();
          formData.append("photo", this.file, this.file.name);
          response = await axios.post("/api/photos", formData);
        }

        await axios.post("/api/users/" + this.currentUser.id + "/flits", {
          flit: this.textInput,
          date: moment(new Date()).format("MM-DD-YYYY HH:mm a"),
          imagePath: response ? response.data.path : "",
        });

        this.textInput = "";
        this.file = null;

        this.getAllFlits();
      } catch (error) {
        console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

button {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin-right: auto;
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
  padding: 8px 0;
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
