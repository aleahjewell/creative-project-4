<template>
  <div class="admin">
    <div class="select">
      <h1>Select Current User</h1>

      <p>Current User: {{ currentUserName }}</p>

      <div class="form">
        <input v-model="findUser" placeholder="User" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectUser(s)"
          >
            {{ s.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="create">
      <h1>Create New User</h1>

      <input v-model="name" placeholder="Name" />
      <p></p>

      <input v-model="handle" placeholder="Handle" />
      <p></p>

      <input type="file" name="photo" @change="fileChanged" />

      <button @click="upload">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  created() {
    this.getUsers();
    this.getCurrentUser();
  },
  data() {
    return {
      users: [],
      findUser: "",
      currentUser: null,
      name: "",
      handle: "",
      file: null,
    };
  },
  computed: {
    suggestions() {
      let users = this.users.filter((user) =>
        user.name.toLowerCase().startsWith(this.findUser.toLowerCase())
      );
      return users.sort((a, b) => a.name > b.name);
    },
    currentUserName() {
      return this.currentUser ? this.currentUser.name : "";
    },
  },
  methods: {
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getCurrentUser() {
      try {
        let response = await axios.get("/api/currentUser");
        this.currentUser = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectUser(user) {
      this.setCurrentUser(user);
      this.findUser = "";
      this.currentUser = user;
    },
    async setCurrentUser(user) {
      try {
        await axios.post("/api/currentUser/" + user.id);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let response = await axios.post("/api/photos", formData);
        await axios.post("/api/users", {
          name: this.name,
          handle: this.handle,
          profilePicPath: response.data.path,
        });

        this.name = "";
        this.handle = "";
        this.path = "";
        this.getUsers();
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
h1 {
  font-size: 20pt;
}

.admin {
  margin-top: 45px;
}

form,
input {
  width: 100%;
  font-size: 14pt;
  border: 1px solid #d9d9d9;
  color: #d9d9d9;
}

.select {
  margin-bottom: 32px;
}

.suggestions {
  width: 100%;
  border: 1px solid dimgray;
}

.suggestion {
  min-height: 20px;
  font-size: 14pt;
}

.suggestion:hover {
  background-color: #1da1f2;
  color: #d9d9d9;
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
</style>