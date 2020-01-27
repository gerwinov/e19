<template>
  <button
    class="actionbutton font-small m-10"
    @click="actionCb">
    <img
      class="actionbutton__img"
      alt="actionbutton icon"
      :src="require(`../assets/icons/${iconName}.svg`)" />
  </button>
</template>

<script>
export default {
  name: 'ActionButton',

  props: {
    iconName: {
      type: String,
      required: true,
    },
    actionCb: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .actionbutton {
    background-color: rgba(255, 255, 255, .3);
    opacity: 1;
    border-radius: 15px;
    border: unset;
    outline: none;
    display: flex;
    align-self: stretch;

    &__img {
      margin: 10px;
      width: 22px;
    }

    &__name {
      display: block;
    }
  }
</style>
