<template>
  <div class="cols w-100 col__spread">
    <div class="col m-10 col__30 col__content-start">
      <h1 class="font-large w-100">{{ time }}</h1>
      <h2 class="font-small date w-100">{{ date }}</h2>
    </div>
    <div class="col col__70">
      <div class="col w-100">
        <Switcher
          icon-name="timer"
          :actionCb="startOrStop"
          :switcher="timerState" />
        <ActionButton
          icon-name="plus"
          :actionCb="increateTimer"
          :class="{ 'not-visible' : timerInterval }" />
        <ActionButton
          icon-name="minus"
          :actionCb="decreaseTimer"
          :class="{ 'not-visible' : timerInterval }" />
      </div>
      <div class="col w-100">
        <h2 class="font-small timer-time">{{ timer }}</h2>
        <audio ref="audio" :src="require('../assets/timer_ends.wav')" type="audio/wav"></audio>
      </div>
    </div>
    <div class="modal" v-show="showModal">
      <button class="modal-button font-small" @click="hideModal">Timer gereed!</button>
    </div>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue';
import Switcher from './Switcher.vue';

export default {
  name: 'Timer',

  components: {
    ActionButton,
    Switcher,
  },

  data() {
    return {
      time: null,
      date: null,
      dateTimeInterval: null,
      monthNames: [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'December',
      ],
      timerInterval: null,
      timerDuration: 0,
      timerSeconds: 0,
      showModal: false,
    };
  },

  computed: {
    timer() {
      if (this.timerInterval && this.timerDuration === 0 && this.timerSeconds === 0) {
        this.$refs.audio.play();
        this.stopTimer();
      }
      return `${this.timerDuration}:${this.timerSeconds < 10 ? '0' : ''}${this.timerSeconds}`;
    },
    timerState() {
      return {
        state: this.timerInterval ? 'on' : 'off',
      };
    },
  },

  methods: {
    setDateTime() {
      this.dateTimeInterval = setInterval(() => {
        const now = new Date();

        const date = now.getDate();
        const month = this.monthNames[now.getMonth()];
        const year = now.getFullYear();

        this.date = `${date} ${month} ${year}`;

        let hours = now.getHours();
        let minutes = now.getMinutes();

        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;

        this.time = `${hours}:${minutes}`;
      }, 1000);
    },

    increateTimer() {
      if (this.timerDuration < 59) {
        this.timerDuration = this.timerDuration + 1;
      }
    },

    decreaseTimer() {
      if (this.timerDuration > 0) {
        this.timerDuration = this.timerDuration - 1;
      }
    },

    startTimer() {
      if (this.timerDuration > 0) {
        this.timerSeconds = 59;
        this.timerDuration = this.timerDuration - 1;
        this.timerInterval = setInterval(() => {
          if (this.timerSeconds > 0) {
            this.timerSeconds = this.timerSeconds - 1;
            return;
          }
          this.timerDuration = this.timerDuration - 1;
          this.timerSeconds = 59;
        }, 1000);
      }
    },

    stopTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.timerDuration = 0;
      this.timerSeconds = 0;
      this.showModal = true;
    },

    startOrStop() {
      if (this.timerInterval) {
        this.stopTimer();
        return;
      }
      this.startTimer();
    },

    hideModal() {
      this.showModal = false;
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
    },
  },

  mounted() {
    this.setDateTime();
  },

  beforeDestroy() {
    clearInterval(this.dateTimeInterval);
    clearInterval(this.timerInterval);
  },
};
</script>

<style lang="scss" scoped>
  .date {
    margin-top: 16px;
  }

  .timer-time {
    position: relative;
    top: -20px;
    left: 20px;
  }

  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:  rgba(0, 0, 0, .7);;
  }

  .modal-button {
    background-color: rgba(0, 0, 0, .6);
    width: 200px;
    height: 100px;
    border-radius: 15px;
    border: unset;
    outline: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
