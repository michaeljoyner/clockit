<template>
  <div id="app">
    
    <div id="nav">
      <div class="">
        <router-link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24"><path fill="#BE4326" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8.41l2.54 2.53a1 1 0 0 1-1.42 1.42L11.3 12.7A1 1 0 0 1 11 12V8a1 1 0 0 1 2 0v3.59z"/></svg>
        </router-link>
      </div>
      <div>
        <router-link class="nav-link" to="/timer">Timer</router-link>
        <router-link class="nav-link" to="/stopwatch">Stopwatch</router-link>
      </div>
      
    </div>
    <router-view/>
  </div>
</template>

<style lang="css" type="text/css">
html {
  height: 100%;
  background: black;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #3c3633;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  color: #be4326;
}
</style>
