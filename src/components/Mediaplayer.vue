<template>
  <div class="col__90">
    <div class="cols">
      <div class="col col__45 m-10">
        <img class="w-100" :src="mediaPicture" />
      </div>
      <div class="col col__55">
        <div class="col">
          <h1 class="media-artist m-10 w-100" v-text="mediaplayer.attributes.media_artist"></h1>
          <h2 class="font-small m-10" v-text="mediaplayer.attributes.media_title"></h2>
        </div>
        <div class="col col__self-end" v-if="mediaplayerActive">
          <ActionButton
            icon-name="previous"
            :actionCb="() => mediaAction('media_previous_track')" />
          <ActionButton
            :icon-name="playIcon"
            :actionCb="playOrPause" />
          <ActionButton
            icon-name="next"
            :actionCb="() => mediaAction('media_next_track')" />
        </div>
      </div>
    </div>
    <div class="cols">
      <div class="col col__items-center w-100">
          <Switcher
            icon-name="power"
            :actionCb="onOrOff"
            :switcher="receiver" />
          <img
            class="m-10"
            alt="volumebutton icon"
            :src="require(`../assets/icons/volume_down.svg`)"
            v-if="receiver.state === 'on'" />
          <Slider
            :min="0"
            :max="0.98"
            :sliderVal="receiver.attributes.volume_level"
            @update="volumeUpdated"
            v-if="receiver.state === 'on'" />
          <img
            class="m-10"
            alt="volumebutton icon"
            :src="require(`../assets/icons/volume_up.svg`)"
            v-if="receiver.state === 'on'" />
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue';
import Slider from './Slider.vue';
import Switcher from './Switcher.vue';

export default {
  props: {
    mediaplayer: { required: true },
    receiver: { required: true },
  },

  components: {
    ActionButton,
    Slider,
    Switcher,
  },

  computed: {
    mediaPicture() {
      return this.mediaplayer.attributes.entity_picture;
    },
    playIcon() {
      return this.mediaplayer.state === 'playing' ? 'pause' : 'play';
    },
    mediaplayerActive() {
      return !['off', 'idle'].includes(this.mediaplayer.state);
    },
  },

  methods: {
    onOrOff() {
      if (this.receiver.state === 'on') {
        this.receiverAction('/goform/formiPhoneAppPower.xml?1+PowerStandby');
        this.mediaAction('turn_off');
        return;
      }
      this.receiverAction('/goform/formiPhoneAppPower.xml?1+PowerOn');
      this.mediaAction('turn_on');
      this.receiverAction('/goform/formiPhoneAppDirect.xml?SIMPLAY');
    },
    playOrPause() {
      if (this.mediaplayer.state === 'playing') {
        this.mediaAction('media_pause');
        return;
      }
      this.mediaAction('media_play');
    },
    mediaAction(action) {
      this.$store.dispatch({
        type: 'mediaAction',
        id: this.mediaplayer.entity_id,
        action,
      });
    },
    receiverAction(command) {
      this.$store.dispatch({
        type: 'receiverAction',
        id: this.receiver.entity_id,
        action: 'get_command',
        command,
      });
    },
    volumeUpdated(val) {
      const valToSend = Math.round((val * 100) - 80);
      this.receiverAction(`/goform/formiPhoneAppVolume.xml?1+${valToSend}`);
    },
  },
};
</script>

<style>
  .media-artist {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    color: white;
    font-size: 20px;
  }
</style>
