<template>
    <div>
        <p class="elapsed-time big-text">
            <span>{{ elapsed_hours }}</span>:
            <span>{{ elapsed_minutes }}</span>:
            <span>{{ elapsed_seconds }}</span>:
            <span>{{ elapsed_splits }}</span>
        </p>
        <div class="action-button-row">
            <button @click="reset()" @keydown.space.prevent="">Reset</button>
            <button @click="toggle()" @keydown.space.prevent="">{{ pause_play }}</button>
        </div>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      start_time: 0,
      current: 0,
      interval: null,
      counting: false,
      paused_at: 0
    };
  },

  computed: {
    pause_play() {
      return this.counting ? "Pause" : "Start";
    },

    elapsed() {
      return this.current - this.start_time;
    },

    elapsed_splits() {
      const t = Math.floor((this.elapsed % 1000) / 10);
      return `${t}`.length === 1 ? `0${t}` : `${t}`;
    },

    elapsed_seconds() {
      const t = Math.floor((this.elapsed / 1000) % 60);
      return `${t}`.length === 1 ? `0${t}` : `${t}`;
    },

    elapsed_minutes() {
      const t = Math.floor((this.elapsed / 1000 / 60) % 60);
      return `${t}`.length === 1 ? `0${t}` : `${t}`;
    },

    elapsed_hours() {
      const t = Math.floor(this.elapsed / 1000 / 60 / 60);
      return `${t}`.length === 1 ? `0${t}` : `${t}`;
    }
  },

  mounted() {
    window.addEventListener("keydown", this.handleKeys);
  },

  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeys);
  },

  methods: {
    handleKeys({ keyCode }) {
      if (keyCode === 32) {
        return this.toggle();
      }

      if (keyCode === 27) {
        return this.reset();
      }
    },

    announce() {
      if (this.$store.getters.muted) {
        return;
      }
      const ut = new window.SpeechSynthesisUtterance(
        this.$store.getters.startwatchAnnouncement
      );
      window.speechSynthesis.speak(ut);
    },

    start() {
      this.start_time = Date.now() - this.paused_at;
      this.counting = true;
      this.announce();
      this.tick();
    },

    pause() {
      this.counting = false;
      this.paused_at = this.elapsed;
    },

    tick() {
      if (this.counting) {
        this.current = Date.now();
        window.requestAnimationFrame(this.tick);
      }
    },

    reset() {
      this.paused_at = 0;
      this.current = 0;
      this.start_time = 0;
      this.counting = false;
    },

    toggle() {
      this.counting ? this.pause() : this.start();
    }
  }
};
</script>

<style>
.elapsed-time {
  color: var(--white);
  font-weight: 700;
  text-align: center;
}

.elapsed-time > span:nth-child(4) {
  font-size: 1.5rem;
}
</style>
