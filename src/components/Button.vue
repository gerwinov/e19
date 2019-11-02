<template>
  <button
    class="button"
    :class="[{ 'button-large' : large },{ 'button-on' : switchOn }]"
    @click="flipSwitch">
    <img class="button-img" alt="button icon" :src="require(`../assets/icons/${iconName}.svg`)" />
    <span v-if="large">{{ switcher.attributes.friendly_name }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    large: {
      type: Boolean,
      required: false,
      default: false,
    },
    iconName: {
      type: String,
      required: true,
    },
    switcher: {
      type: Object,
      required: true,
    },
  },

  computed: {
    switchOn() {
      return this.switcher.state === 'on';
    },
  },

  methods: {
    flipSwitch() {
      const action = this.switchOn ? 'turn_off' : 'turn_on';

      this.$store.dispatch({
        type: 'flipSwitch',
        id: this.switcher.entity_id,
        action,
      });
    },
  },
};
</script>

<style scoped>
  .button {
    background-color: rgba(0, 0, 0, .3);
    opacity: 0.5;
    border-radius: 15px;
    border: unset;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 14px;
    color: white;
    margin: 10px;
    outline: none;
  }

  .button-on {
    background-color: rgba(255, 255, 255, .3);
    opacity: 1;
  }

  .button-img {
    margin: 5px;
    height: 40px;
  }

  .button-large {
    width: 120px;
    height: 120px;
  }

  .button-large .button-img {
    height: 65px;
  }
</style>
