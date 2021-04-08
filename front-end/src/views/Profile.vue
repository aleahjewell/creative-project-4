<template>
  <div class="profile">
    <div class="horizontal-container">
      <div class="img-container">
        <img class="main-profile-pic" :src="currProfilePic" />
      </div>

      <div class="vertical-container">
        <div class="horizontal-container">
          <h2>Name:</h2>
          <input
            id="nameInput"
            :class="{ editable: editable }"
            v-model="currName"
            readonly
          />
        </div>

        <div class="horizontal-container">
          <h2>Handle:</h2>
          <input
            id="handleInput"
            :class="{ editable: editable }"
            v-model="currHandle"
            readonly
          />
        </div>

        <div class="horizontal-container">
          <h2>Photo:</h2>
          <input
            id="imageInput"
            type="file"
            name="photo"
            @change="fileChanged"
          />
        </div>
      </div>
    </div>

    <div v-if="!editable">
      <button class="button" v-on:click="edit()">Edit Profile</button>
    </div>
    <div v-else>
      <button class="button" v-on:click="save()">Save</button>
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

          <div class="btn-container">
            <button v-on:click="deleteFlit(flit)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      currentUser: null,
      flits: [],
      editable: false,
      file: null,
    };
  },
  created() {
    this.getFlitsForCurrentUser();
  },
  computed: {
    currName: {
      get: function () {
        return this.currentUser ? this.currentUser.name : "";
      },
      set: function (val) {
        this.currentUser.name = val;
      },
    },
    currHandle: {
      get: function () {
        return this.currentUser ? this.currentUser.handle : "";
      },
      set: function (val) {
        this.currentUser.handle = val;
      },
    },
    currProfilePic: {
      get: function () {
        return this.currentUser ? this.currentUser.profilePicPath : "";
      },
      set: function (val) {
        this.currentUser.profilePicPath = val;
      },
    },
  },
  methods: {
    async getFlitsForCurrentUser() {
      try {
        const currUserResponse = await axios.get("/api/currentUser");
        this.currentUser = currUserResponse.data;

        const response = await axios.get(
          "/api/users/" + this.currentUser.id + "/flits"
        );
        for (let flit of response.data) {
          flit.name = this.currentUser.name;
          flit.handle = this.currentUser.handle;
          flit.profilePicPath = this.currentUser.profilePicPath;
        }

        this.flits = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    edit() {
      this.editable = true;
      document.getElementById("nameInput").readOnly = false;
      document.getElementById("handleInput").readOnly = false;
      document.getElementById("imageInput").readOnly = false;
    },
    async save() {
      this.editable = false;
      document.getElementById("nameInput").readOnly = true;
      document.getElementById("handleInput").readOnly = true;
      document.getElementById("imageInput").readOnly = true;

      try {
        let response = null;
        if (this.file) {
          const formData = new FormData();
          formData.append("photo", this.file, this.file.name);
          response = await axios.post("/api/photos", formData);
        }

        await axios.put("/api/users/" + this.currentUser.id, {
          name: this.currentUser.name,
          handle: this.currentUser.handle,
          profilePicPath: response ? response.data.path : this.currProfilePic,
        });

        await this.getFlitsForCurrentUser();
      } catch (error) {
        console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async deleteFlit(flit) {
      // /api/users/:userID/flits/:flitID
      try {
        await axios.delete(
          "/api/users/" + this.currentUser.id + "/flits/" + flit.id
        );
        this.getFlitsForCurrentUser();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.profile {
  padding: 30px 0;
}

.main-profile-pic {
  border-radius: 100px;
  height: 150px;
  width: 150px;
  object-fit: cover;
  background-color: #d9d9d9;
}

.horizontal-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.vertical-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;
}

input {
  display: table-cell;
  font-size: 15pt;
  border: none !important;
  box-shadow: none !important;
  width: 90%;
  height: 40px;
  color: dimgray;
  background-color: #000000;
  text-overflow: ellipsis;
  padding: 8px 0;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.editable {
  border-bottom: 1px solid dimgray !important;
}

button {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin-top: 20px;
  margin-bottom: 20px;
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
  margin: 0;
  margin-right: 10px;
}

.flit-text {
  color: #d9d9d9;
}
</style>