<template>
  <form class="login-form" @submit="login">
    <span class="login-error" v-if="error">{{ error }}</span>

    <label class="login-label" for="input">Home Assistant URL</label>
    <input class="login-input" type="text" id="url" v-model="address">

    <label class="login-label" for="password">Password</label>
    <input class="login-input" type="password" id="password" v-model="password">

    <button class="login-button" type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      address: '',
      port: 443,
      password: '',
      error: null,
    };
  },

  methods: {
    login(e) {
      e.preventDefault();

      this.$store.dispatch({
        type: 'login',
        address: this.address,
        port: this.port,
        password: this.password,
      })
        .then(() => {
          //
        })
        .catch((error) => {
          this.error = `Home assistant code: ${error}`;
        });
    },
  },
};
</script>

<style scoped>
  .login-form {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 18px;
  }

  .login-error {
    color: red;
  }

  .login-label,
  .login-input {
    display: block;
  }

  .login-input {
    margin-bottom: 10px;
    width: 200px;
    height: 25px;
  }

  .login-button {
    width: 100px;
    border-radius: 4px;
    background-color: black;
    color: white;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 18px;
    padding: 10px;
    margin-top: 20px;
  }
</style>
