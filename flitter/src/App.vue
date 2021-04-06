<template>
  <div id="app">
    <div class="page-wrap">
      <div class="content-wrap">
        <div id="nav">
          <div class="container">
            <img class="icon" src="icons/bird.svg" />
          </div>
          <div class="container">
            <img class="icon" src="/icons/home.svg" />
            <router-link to="/">Home</router-link>
          </div>
          <div class="container">
            <img class="icon" src="/icons/search.svg" />
            <router-link to="/search">Search</router-link>
          </div>
          <div class="container">
            <img class="icon" src="/icons/profile.svg" />
            <router-link to="/profile">Profile</router-link>
          </div>
        </div>

        <router-view />

        <div class="sidebar"></div>
      </div>

      <div class="footer">
        <a href="https://github.com/aleahjewell/creative-project-3">
          GitHub Repository
        </a>
      </div>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  background-color: black;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: dimgray;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #d9d9d9;
}

h1 {
  font-size: 20px;
}

h2,
p {
  font-size: 15px;
}

#nav {
  padding: 30px;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: fit-content;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.sidebar {
  width: 350px;
}

#nav a {
  font-weight: bold;
  color: #1da1f2;
  text-decoration: none;
  font-size: 20pt;
  margin-bottom: 12px;
}

#nav a.router-link-exact-active {
  text-decoration: underline;
}

#nav a:hover {
  text-decoration: underline;
}

.page-wrap {
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 2.5rem;
  margin: 0 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.footer {
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer a {
  color: #d9d9d9;
  text-decoration: none;
}

.footer a:hover {
  color: #d9d9d9;
  text-decoration: underline;
}

.icon {
  height: 30px;
  width: 30px;
  fill: #1da1f2;
  margin-right: 16px;
}

.container {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
}
</style>
