<template>
  <div id="app">
    <div class="center" v-if="!isLoggedIn">
      <Login />
    </div>
    <div class="cols" v-else>
      <div class="col col__55 col__vert col__spread">
        <div>
          <div class="col w-100">
            <Timer />
          </div>
          <div class="col w-100">
            <Climate :climate="climate" />
          </div>
        </div>
        <div class="col">
          <mediaplayer :mediaplayer="mediaplayer" :receiver="receiver"></mediaplayer>
        </div>
      </div>
      <div class="col col__45 col__end col__content-start">
        <div class="col col__end">
          <Switcher
            large
            icon-name="power"
            cbType="flipSwitch"
            :switcher="switcher"
            :key="`sw${index}`"
            v-for="(switcher, index) in switches" />
        </div>
        <div class="col col__end">
          <Switcher
            large
            brightness
            icon-name="light"
            cbType="toggleLight"
            :switcher="light"
            :key="`l${index}`"
            v-for="(light, index) in lights" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Login from './components/Login.vue';
import Switcher from './components/Switcher.vue';
import Timer from './components/Timer.vue';
import Climate from './components/Climate.vue';
import Mediaplayer from './components/Mediaplayer.vue';

export default {
  name: 'app',

  components: {
    Login,
    Switcher,
    Mediaplayer,
    Timer,
    Climate,
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      switches: 'getSwitches',
      lights: 'getLivingroomLights',
      mediaplayer: 'getMediaplayer',
      receiver: 'getReceiver',
      climate: 'getClimate',
    }),
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Karla&display=swap');

* {
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

h1 {
  margin: 0;
}

#app {
  background-image: url('./assets/bg.jpg');
  width: 100%;
  height: 100%;
  padding: 20px;
}

.center {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.cols {
  display: flex;
  height: 100%;
}

.col {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  &__30 {
    width: 30%;
  }

  &__35 {
    width: 35%;
  }

  &__40 {
    width: 40%;
  }

  &__45 {
    width: 45%;
  }

  &__50 {
    width: 50%;
  }

  &__55 {
    width: 55%;
  }

  &__60 {
    width: 60%;
  }

  &__65 {
    width: 65%;
  }

  &__70 {
    width: 70%;
  }

  &__80 {
    width: 80%;
  }

  &__90 {
    width: 90%;
  }

  &__end {
    justify-content: flex-end;
  }

  &__self-end {
    align-self: flex-end;
  }

  &__vert {
    flex-direction: column;
  }

  &__spread {
    justify-content: space-between;
  }

  &__content-start {
    align-content: flex-start;
  }

  &__items-center {
    align-items: center;
  }

  &__grow {
    flex-grow: 1;
  }
}

.not-visible {
  visibility: hidden;
}

.font-large {
  font-family: 'Karla', sans-serif;
  color: white;
  font-size: 60px;
  line-height: .7em;
}

.font-small {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  color: white;
}

.m-10 {
  margin: 10px;
}

.w-100 {
  width: 100%;
}

</style>
