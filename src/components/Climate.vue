<template>
  <div class="cols w-100 col__spread">
    <div class="col m-10 col__40 col__content-start">
      <h1 class="font-large w-100">{{ currentTemperature }}</h1>
      <h2 class="font-small climate-text w-100">temperatuur woonkamer</h2>
    </div>
    <div class="col col__60">
      <div class="col w-100">
        <Switcher
          icon-name="thermo_on"
          :actionCb="() => toggleThermostat('comfort')"
          :switcher="comfortState" />
        <Switcher
          icon-name="thermo_off"
          :actionCb="() => toggleThermostat('away')"
          :switcher="awayState" />
      </div>
      <div class="col w-100">
        <h2 class="font-small set-temp">ingesteld: {{ targetTemperature }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Switcher from './Switcher.vue';

export default {
  name: 'Timer',

  components: {
    Switcher,
  },

  props: {
    climate: { required: true },
  },

  computed: {
    currentTemperature() {
      return `${this.climate.attributes.current_temperature.toLocaleString('nl-NL')}°C`;
    },
    targetTemperature() {
      return `${this.climate.attributes.temperature.toLocaleString('nl-NL')}°C`;
    },
    comfortState() {
      return {
        state: this.climate.attributes.preset_mode === 'comfort' ? 'on' : 'off',
      };
    },
    awayState() {
      return {
        state: this.climate.attributes.preset_mode === 'away' ? 'on' : 'off',
      };
    },
  },

  methods: {
    toggleThermostat(operationMode) {
      this.$store.commit({
        type: 'toggleThermostat',
        id: this.climate.entity_id,
        action: 'set_preset_mode',
        operationMode,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .climate-text {
    margin-top: 16px;
  }

  .set-temp {
    position: relative;
    top: -20px;
    left: 20px;
  }
</style>
