<template>
  <button
    class="switcher font-small m-10"
    :class="[{ 'switcher--large' : large },{ 'switcher--on' : switchOn }]"
    @click="flipSwitch">
    <img
      class="switcher__img"
      alt="switcher icon"
      :class="{ 'switcher__img--large' : large }"
      :src="require(`../assets/icons/${iconName}.svg`)" />
    <span v-if="large">{{ switcher.attributes.friendly_name }}</span>
  </button>
</template>

<script>
export default {
  name: 'Switcher',

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

<style lang="scss" scoped>
  .switcher {
    background-color: rgba(0, 0, 0, .3);
    opacity: 0.5;
    border-radius: 15px;
    border: unset;
    outline: none;

    &__img {
      margin: 5px;
      height: 40px;

      &--large {
        height: 65px;
      }
    }

    &--on {
      background-color: rgba(255, 255, 255, .3);
      opacity: 1;
    }

    &--large {
      width: 120px;
      height: 120px;
    }
  }
</style>
