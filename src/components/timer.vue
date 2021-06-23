<template>
  <div class="timer">
    {{ computedTime }}
  </div>
</template>

<script>
export default {
  computed: {
    computedTime() {
      return this.$store.state.time;
    },
  },
};
</script>

<style lang="scss">
.timer {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
