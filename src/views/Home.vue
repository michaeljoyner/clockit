<template>
  <div class="home page">
    <div class="home-options">
      <router-link class="nav-link" to="/timer">Timer</router-link>
      <div class="icon-holder">
        <svg xmlns="http://www.w3.org/2000/svg" width="200px" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>
      </div>
      <router-link class="nav-link" to="/stopwatch">Stopwatch</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {};
</script>

<style>
.page {
  min-height: calc(100% - 3rem);
}

.home-options {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-options .nav-link {
  color: var(--primary);
  margin: 2rem 0;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-weight: 700;
}

.home-options .nav-link:hover {
  color: var(--secondary);
  text-decoration: underline;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home > h1 {
  font-size: 8rem;
}
</style>

