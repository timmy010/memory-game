<template>
  <section class="game">
    <button
      class="game__start-btn"
      @click="
        this.createdCarts();
        this.startTimer();
        this.showCarts();
      "
    >
      START
    </button>
    <p class="game__status" v-if="status">
      {{ status }}
    </p>
    <timer />
    <div class="game__table" :class="{ wait: freezeClick }" v-if="carts.length !== 0">
      <gameCart v-model:freezeClick="freezeClick" />
    </div>
    <gameResultsTable v-if="this.results.length !== 0" :results="this.results" />
  </section>
</template>

<script>
import timer from "@/components/timer.vue";
import gameResultsTable from "@/components/gameResultsTable.vue";
import gameCart from "@/components/gameCart.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      freezeClick: false,
    };
  },
  computed: {
    ...mapState(["carts", "isGameOver", "results"]),
    status() {
      let statusStr = "";
      if (this.isGameOver) {
        statusStr = "Поздравляем! Игра закончена! Для старта новой игры нажмите Start";
      } else if (this.carts.length === 0) {
        statusStr = "Для старта игры нажмите Start";
      }
      return statusStr;
    },
  },
  components: {
    timer,
    gameResultsTable,
    gameCart,
  },
  methods: {
    ...mapMutations(["createdCarts", "startTimer", "startGameOver"]),
    showCarts() {
      console.log(this.carts);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
