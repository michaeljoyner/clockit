<template>
  <div class="home page">
    <h1>Clockit</h1>
    <div>
      <router-link to="/timer">Timer</router-link>
      <router-link to="/stopwatch">Stopwatch</router-link>
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

