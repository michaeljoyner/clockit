<template>
  <span tabindex="0" class="time-input" @keydown="handleKey">
    <div class="centering">
      <span class="big-text time-input-string">{{time_string}}</span>
    </div>
    <div class="input-grid">
      <div @click="addInput(7)">7</div>
      <div @click="addInput(8)">8</div>
      <div @click="addInput(9)">9</div>
      <div @click="addInput(4)">4</div>
      <div @click="addInput(5)">5</div>
      <div @click="addInput(6)">6</div>
      <div @click="addInput(1)">1</div>
      <div @click="addInput(2)">2</div>
      <div @click="addInput(3)">3</div>
      <div @click="clearInput()">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
        </svg>
      </div>
      <div @click="addInput(0)">0</div>
      <div @click="submit" :class="{'disabled': time_int === `000000`}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="30px"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: "TimeInput",
  props: {
    value: [String, Number]
  },

  data() {
    return {
      time_int: `000000`
    };
  },

  computed: {
    time_string() {
      const hrs = this.time_int.slice(0, 2);
      const min = this.time_int.slice(2, 4);
      const sec = this.time_int.slice(4);

      return `${hrs}h ${min}m ${sec}s`;
    }
  },

  mounted() {
    this.time_int = this.secondsToTimeNumber(this.value);
  },

  watch: {
    value(n) {
      //if new value is zero, the timer is being reset
      if (n === 0) {
        this.time_int = this.secondsToTimeNumber(n);
      }
    }
  },

  methods: {
    handleKey({ keyCode }) {
      if (keyCode >= 48 && keyCode <= 57) {
        return this.addInput(keyCode - 48);
      }

      if (keyCode === 8) {
        return this.clearInput();
      }

      if (keyCode === 13) {
        return this.submit();
      }
    },

    addInput(int) {
      if (this.time_int[0] !== `0`) {
        return;
      }
      this.time_int = `${this.time_int}${int}`.slice(1);
      this.$emit("input", this.timeNumberToSeconds(this.time_int));
    },

    clearInput() {
      this.time_int = `0${this.time_int.slice(0, 5)}`;
      this.$emit("input", this.timeNumberToSeconds(this.time_int));
    },

    reset() {
      this.time_int = `000000`;
      this.$emit("input", this.timeNumberToSeconds(this.time_int));
    },

    secondsToTimeNumber(int) {
      const secs = int % 60;
      const mins = Math.floor(int / 60) % 60;
      const hours = Math.floor(int / 3600);

      const sec_str = secs < 10 ? `0${secs}` : `${secs}`;
      const min_str = mins < 10 ? `0${mins}` : `${mins}`;
      const hrs_str = hours < 10 ? `0${hours}` : `${hours}`;

      return `${hrs_str}${min_str}${sec_str}`;
    },

    timeNumberToSeconds() {
      const hrs = parseInt(this.time_int.slice(0, 2));
      const min = parseInt(this.time_int.slice(2, 4));
      const sec = parseInt(this.time_int.slice(4));

      return hrs * 3600 + min * 60 + sec;
    },

    submit() {
      if (this.time_int === `000000`) {
        return;
      }
      this.$emit("submit");
    }
  }
};
</script>

<style>
.time-input {
  display: block;
  min-width: 150px;
  margin: 0 auto;
}

.time-input:focus {
  outline: none;
}

.time-input:focus .time-input-string {
  border-bottom: 1px solid var(--white);
}

.time-input-string {
  display: inline-block;
  font-weight: 700;
  color: var(--white);
  text-align: center;
  width: auto;
  margin-top: 1em;
}

.input-grid {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.input-grid > div {
  width: 33%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: var(--white);
  font-weight: 700;
}

.disabled {
  opacity: 0.4;
}

.centering {
  display: flex;
  justify-content: center;
}
</style>

