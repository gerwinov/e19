<template>
  <div class="col col__grow">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="(max - min) / 100"
      v-model="value"
      @change="changed" />
  </div>
</template>

<script>
export default {
  name: 'Slider',

  props: {
    sliderVal: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      value: null,
    };
  },

  watch: {
    sliderVal(newVal) {
      this.value = newVal;
    },
  },

  methods: {
    changed() {
      this.$emit('update', parseFloat(this.value));
    },
  },
};
</script>

<style lang="scss" scoped>
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #C8C8C8;
    cursor: pointer;
    margin-top: -14px;
  }

  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: #C8C8C8;
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #C8C8C8;
  }
</style>
