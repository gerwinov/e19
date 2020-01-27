<template>
  <div class="col col__grow">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="max / 100"
      v-model="sliderVal"
      @input="sliderValUpdated" />
  </div>
</template>

<script>
export default {
  name: 'Slider',

  props: {
    defaultVal: {
      type: Number,
      required: false,
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
      sliderVal: null,
    };
  },

  computed: {
    sliderValNum() {
      return parseFloat(this.sliderVal);
    },
  },

  methods: {
    sliderValUpdated() {
      this.$emit('update', this.sliderValNum);
    },
  },

  mounted() {
    this.sliderVal = this.defaultVal || 50;
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
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: #C8C8C8;
    cursor: pointer;
    margin-top: -6px;
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
