<template>
    <div class="settings-panel">
        <div class="settings-block">
            <span class="title">Theme:</span>
            <div>
                <label class="radio-option" for="midnight">
                    <input type="radio" name="theme" :checked="themename === 'midnight'" value="midnight" id="midnight" @input="updateThemename">
                    <span>Midnight</span>
                </label>
                <label class="radio-option" for="paperwhite">
                    <input type="radio" name="theme" :checked="themename === 'paperwhite'" value="paperwhite" id="paperwhite" @input="updateThemename">
                    <span>Paperwhite</span>
                </label>
            </div>
        </div>
        <div class="settings-block">
            <span class="title">Announcements:</span>
            <div>
                <label class="radio-option" for="mute">
                    <input type="checkbox" id="mute" :checked="muted" @change="updateMuted">
                    <span>Mute Announcements</span>
                </label>
            </div>
            <div class="text-option">
                <label for="countdown-announcement">Countdown finished:</label>
                <input type="text" id="countdown-announcement" @input="updateCountdown" :value="countdown">
            </div>
            <div class="text-option">
                <label for="stopwatch-go">Stopwatch start:</label>
                <input type="text" id="stopwatch-go" @input="updateStopwatch" :value="stopwatch">
            </div>
        </div>
        <p class="settings-note">Your settings will be updated automatically.</p>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    themename() {
      return this.$store.getters.themeName;
    },

    muted() {
      return this.$store.getters.muted;
    },

    countdown() {
      return this.$store.getters.timeupAnnouncement;
    },

    stopwatch() {
      return this.$store.getters.startwatchAnnouncement;
    }
  },

  methods: {
    updateThemename({ target: { value } }) {
      console.log(value);
      this.$store.commit("setTheme", value);
    },

    updateMuted({ target: { checked } }) {
      console.log(checked);

      this.$store.commit("setMuted", checked);
    },

    updateCountdown({ target: { value } }) {
      this.$store.commit("setTimeupAnnouncement", value);
    },

    updateStopwatch({ target: { value } }) {
      this.$store.commit("setStartwatchAnnouncement", value);
    }
  }
};
</script>

<style>
.settings-panel {
  overflow-y: auto;
}

.settings-block {
  margin: 2rem 0;
  padding: 1rem;
}

.settings-block .title {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05rem;
  margin-bottom: 0.5rem;
  display: block;
  font-weight: 700;
}

.settings-block .radio-option {
  display: block;
  margin: 0.5rem 0;
}

.settings-block .radio-option input {
  display: none;
}

.settings-block .radio-option span::before {
  content: "";
  display: inline-block;
  vertical-align: text-bottom;
  width: 0.85rem;
  height: 0.85rem;
  margin-right: 10px;
  border: 1px solid var(--primary);
}

.settings-block .radio-option input:checked + span::before {
  background: var(--primary);
}

.text-option {
  margin: 1rem 0;
}

.text-option label {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.text-option input {
  display: block;
  margin-top: 0.25rem;
  width: 90%;
  border: none;
  padding: 0.5rem;
}

.settings-note {
  margin: 3rem 1rem;
  text-align: center;
  font-size: 0.85rem;
}
</style>


