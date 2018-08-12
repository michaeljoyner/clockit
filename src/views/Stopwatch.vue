<template>
    <div>
        <p class="elapsed-time">
            <span>{{ elapsed_hours }}</span>:
            <span>{{ elapsed_minutes }}</span>:
            <span>{{ elapsed_seconds }}</span>:
            <span>{{ elapsed_splits }}</span>
        </p>
        <div class="action-button-row">
            <button @click="reset()">Reset</button>
            <button @click="toggle()">{{ pause_play }}</button>
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
      return this.counting ? "Pause" : "Play";
    },

    elapsed() {
      return this.current - this.start_time;
    },

    elapsed_splits() {
      const t = Math.round((this.elapsed % 1000) / 10);
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

    start() {
      this.start_time = Date.now() - this.paused_at;
      this.counting = true;
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
  color: white;
  font-weight: 700;
  font-size: 3rem;
  text-align: center;
}

.elapsed-time > span:nth-child(4) {
  font-size: 1.5rem;
}

.action-button-row {
  display: flex;
  justify-content: center;
}

.action-button-row > button {
  border: 2px solid white;
  padding: 0.5rem 1rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  background: transparent;
  margin: 0 1rem;
}
</style>
