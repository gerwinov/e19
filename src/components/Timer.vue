<template>
  <div class="col col-45 m-10">
    <h1 class="font-large w-100">{{ time }}</h1>
    <h2 class="font-small w-100">{{ date }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Timer',

  data() {
    return {
      time: null,
      date: null,
      dateTimeInterval: null,
      monthNames: [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'December',
      ],
    };
  },

  methods: {
    setDateTime() {
      this.dateTimeInterval = setInterval(() => {
        const now = new Date();

        const date = now.getDate();
        const month = this.monthNames[now.getMonth()];
        const year = now.getFullYear();

        this.date = `${date} ${month} ${year}`;

        let hours = now.getHours();
        let minutes = now.getMinutes();

        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;

        this.time = `${hours}:${minutes}`;
      }, 1000);
    },
  },

  mounted() {
    this.setDateTime();
  },

  beforeDestroy() {
    clearInterval(this.dateTimeInterval);
  },
};
</script>

<style lang="scss" scoped>

</style>
