<template>
  <div id="app" :class="themeName">
    
    <div id="nav">
      <div class="">
        <router-link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>
        </router-link>
      </div>
      <div class="nav-options">
        <router-link class="nav-link" to="/timer">Countdown</router-link>
        <router-link class="nav-link" to="/stopwatch">Stopwatch</router-link>
        <button class="clear-button" @click="toggleNav()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20"><path d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v.58a8 8 0 0 1 1.92 1.11l.5-.29a2 2 0 0 1 2.74.73l1 1.74a2 2 0 0 1-.73 2.73l-.5.29a8.06 8.06 0 0 1 0 2.22l.5.3a2 2 0 0 1 .73 2.72l-1 1.74a2 2 0 0 1-2.73.73l-.5-.3A8 8 0 0 1 15 19.43V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.58a8 8 0 0 1-1.92-1.11l-.5.29a2 2 0 0 1-2.74-.73l-1-1.74a2 2 0 0 1 .73-2.73l.5-.29a8.06 8.06 0 0 1 0-2.22l-.5-.3a2 2 0 0 1-.73-2.72l1-1.74a2 2 0 0 1 2.73-.73l.5.3A8 8 0 0 1 9 4.57zM7.88 7.64l-.54.51-1.77-1.02-1 1.74 1.76 1.01-.17.73a6.02 6.02 0 0 0 0 2.78l.17.73-1.76 1.01 1 1.74 1.77-1.02.54.51a6 6 0 0 0 2.4 1.4l.72.2V20h2v-2.04l.71-.2a6 6 0 0 0 2.41-1.4l.54-.51 1.77 1.02 1-1.74-1.76-1.01.17-.73a6.02 6.02 0 0 0 0-2.78l-.17-.73 1.76-1.01-1-1.74-1.77 1.02-.54-.51a6 6 0 0 0-2.4-1.4l-.72-.2V4h-2v2.04l-.71.2a6 6 0 0 0-2.41 1.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        </button>
      </div>
      
    </div>
    <router-view></router-view>
    <div class="settings-drawer" :class="{'exposed': showMenu}">
      <header>
        <h3>Settings</h3>
        <button class="clear-button" @click="toggleNav()">&times;</button>
      </header>
      <settings-panel></settings-panel>    
    </div>
  </div>
</template>

<script>
import SettingsPanel from "@/components/SettingsPanel.vue";

export default {
  components: {
    SettingsPanel
  },

  data() {
    return {
      showMenu: false
    };
  },

  computed: {
    themeName() {
      return this.$store.getters.themeName;
    },

    appClasses() {
      let a = [this.themeName];
      if (this.showMenu) {
        a.push("exposed");
      }
      return a;
    }
  },

  methods: {
    toggleNav() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>


<style lang="css" type="text/css">
#app.midnight {
  --bg-col: #191c2c;
  --bg-col-sec: #252d5a;
  --primary: red;
  --secondary: yellow;
  --white: white;
}

#app.paperwhite {
  --bg-col: #ffffff;
  --bg-col-sec: silver;
  --primary: #333;
  --secondary: #111;
  --white: #333;
}

html {
  height: 100%;
  background: black;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: var(--bg-col);
  color: var(--primary);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-variant-numeric: tabular-nums;
}

#app {
  background: var(--bg-col);
  color: var(--primary);
}

svg {
  fill: var(--primary);
}

#app {
  height: 100%;
}

#nav {
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

#nav .nav-link {
  margin: 0 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  text-decoration: none;
  color: var(--primary);
}

.nav-options {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.clear-button {
  background: none;
  border: none;
}

.settings-drawer {
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 300px;
  right: 0;
  background: var(--bg-col-sec);
  transition: 0.3s ease-in-out;
  transform: translate3d(300px, 0, 0);
}

.settings-drawer.exposed {
  transform: translate3d(0, 0, 0);
}

.settings-drawer header {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.settings-drawer header button {
  font-size: 2rem;
  color: var(--white);
}

.big-text {
  font-size: 3rem;
}

.action-button-row {
  display: flex;
  justify-content: center;
}

.action-button-row > button {
  border: 2px solid var(--white);
  padding: 0.5rem 1rem;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  background: transparent;
  margin: 0 1rem;
}

.action-button-row > button:hover {
  color: var(--bg-col);
  background: var(--white);
}

@media (max-width: 499px) {
  .big-text {
    font-size: 2.75rem;
  }
}

@media (min-width: 500px) and (max-width: 860px) {
  .big-text {
    font-size: 5rem;
  }
}

@media (min-width: 861px) and (max-width: 1200px) {
  .big-text {
    font-size: 7rem;
  }
}

@media (min-width: 1201px) {
  .big-text {
    font-size: 9rem;
  }
}
</style>
