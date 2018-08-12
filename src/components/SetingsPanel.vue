<template>
    <div>
        <div>
            <span>Theme:</span>
            <div>
                <label for="midnight">
                    <input type="radio" value="midnight" id="midnight">
                    <span>Midnight</span>
                </label>
                <label for="paperwhite">
                    <input type="radio" value="paperwhite" id="paperwhite">
                    <span>Paperwhite</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      themename: "midnight"
    };
  },

  watch: {
    themename(n) {
      console.log(n);
    }
  }
};
</script>

<style>
</style>


