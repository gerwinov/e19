<template>
  <div id="app">
    <div class="center" v-if="!isLoggedIn">
      <Login />
    </div>
    <div class="cols" v-else>
      <div class="col col-left">
        test
      </div>
      <div class="col col-right">
        <Button
          large
          icon-name="power"
          :switcher="switcher"
          :key="`sw${index}`"
          v-for="(switcher, index) in switches" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Button from './components/Button.vue';
import Login from './components/Login.vue';

export default {
  name: 'app',

  components: {
    Button,
    Login,
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      switches: 'getSwitches',
    }),
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Karla&display=swap');

* {
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
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
}

.col {
  display: flex;
  align-items: flex-start;
}

.col-left {
  width: 55%;
}

.col-right {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 45%;
}
</style>
