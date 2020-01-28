<template>
  <div>
    <button
      class="switcher font-small m-10"
      :class="[{ 'switcher--large' : large },{ 'switcher--on' : switchOn }]"
      @click="toggleSwitcher">
      <img
        class="switcher__img"
        alt="switcher icon"
        :class="{ 'switcher__img--large' : large }"
        :src="require(`../assets/icons/${iconName}.svg`)" />
      <span class="switcher__name" v-if="large">{{ switcher.attributes.friendly_name }}</span>
    </button>
    <Slider
      :min="0"
      :max="255"
      :sliderVal="switcher.attributes.brightness"
      @update="brightnessUpdated"
      v-if="brightness" />
  </div>
</template>

<script>
import Slider from './Slider.vue';

export default {
  name: 'Switcher',

  components: {
    Slider,
  },

  props: {
    large: {
      type: Boolean,
      required: false,
      default: false,
    },
    brightness: {
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
    cbType: {
      type: String,
      required: false,
    },
    actionCb: {
      type: Function,
      required: false,
    },
  },

  computed: {
    switchOn() {
      return this.switcher.state === 'on';
    },
  },

  methods: {
    toggleSwitcher() {
      if (this.actionCb) {
        this.actionCb();
        return;
      }

      const action = this.switchOn ? 'turn_off' : 'turn_on';

      this.$store.dispatch({
        type: this.cbType,
        id: this.switcher.entity_id,
        action,
      });
    },

    brightnessUpdated(val) {
      this.$store.dispatch({
        type: 'setBrightness',
        id: this.switcher.entity_id,
        action: 'turn_on',
        options: {
          brightness: val,
        },
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

    &__name {
      display: block;
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
