<template>
    <div class="timer page">
        <div>
            <time-input ref="timeInput" v-show="!set" v-model="timelimit" @submit="set = true"></time-input>
            <div v-show="set">
                <p v-show="!completed" class="countdown">{{ countdown }}</p>
                <p v-show="completed" class="countdown">Time Up!</p>
                <div class="action-button-row">
                    <button @click="reset()">Reset</button>
                    <button @click="toggle()" v-show="!completed">{{ pause_play }}</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import TimeInput from "@/components/TimeInput.vue";

export default {
  components: {
    TimeInput
  },

  data() {
    return {
      timelimit: 0,
      start_time: 0,
      elapsed: 0,
      paused: true,
      completed: false,
      set: false
    };
  },

  computed: {
    countdown() {
      const int = Math.round(this.timelimit - this.elapsed / 1000);
      const secs = int % 60;
      const mins = Math.floor(int / 60) % 60;
      const hours = Math.floor(int / 3600);

      const sec_str = secs < 10 ? `0${secs}` : `${secs}`;
      const min_str = mins < 10 ? `0${mins}` : `${mins}`;
      const hrs_str = hours < 10 ? `0${hours}` : `${hours}`;

      return `${hrs_str}h ${min_str}m ${sec_str}s`;
    },

    pause_play() {
      return this.paused ? "Start" : "Pause";
    }
  },

  mounted() {
    this.$refs.timeInput.$el.focus();

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
        this.reset();
      }
    },

    start() {
      this.paused = false;
      this.start_time = Date.now();
      this.tick();
    },

    pause() {
      this.paused = true;
      this.timelimit = this.timelimit - Math.round(this.elapsed / 1000);
      this.elapsed = 0;
    },

    tick() {
      if (this.paused) {
        return;
      }
      this.elapsed = Date.now() - this.start_time;
      if (this.elapsed / 1000 > this.timelimit) {
        return this.finish();
      }

      window.requestAnimationFrame(this.tick);
    },

    finish() {
      this.completed = true;
      this.elapsed = 0;
      this.start_time = 0;

      const ut = new window.SpeechSynthesisUtterance("bitches, time is up");
      window.speechSynthesis.speak(ut);
    },

    reset() {
      this.timelimit = 0;
      this.elapsed = 0;
      this.set = false;
      this.completed = false;
      this.paused = true;
      this.$nextTick(() => this.$refs.timeInput.$el.focus());
    },

    toggle() {
      return this.paused ? this.start() : this.pause();
    }
  }
};
</script>

<style>
.countdown {
  display: inline-block;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-align: center;
  width: 100%;
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


