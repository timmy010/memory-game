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
      <div
        class="game__cart"
        v-for="(item, index) in carts"
        :key="index"
        @click="reverseCart($event, item)"
      >
        <div class="game__cart-back" v-if="!item.visible"></div>
        {{ item.value }}
      </div>
    </div>
    <gameResultsTable v-if="this.results.length !== 0" :results="this.results" />
  </section>
</template>

<script>
import timer from "@/components/timer.vue";
import gameResultsTable from "@/components/gameResultsTable.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      firstOpenCart: null,
      secondOpenCart: null,
      timerId: null,
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
  },
  methods: {
    ...mapMutations(["createdCarts", "startTimer", "startGameOver"]),
    showCarts() {
      console.log(this.carts);
    },
    clearCarts() {
      this.firstOpenCart = null;
      this.secondOpenCart = null;
      this.carts.forEach((cart) => {
        cart.visible = false; // eslint-disable-line
      });
    },
    /* eslint-disable */
    reverseCart(e, item) {
      item.visible = true;
      if (!this.firstOpenCart) {
        this.firstOpenCart = e.target;
        this.timerId = setTimeout(() => {
          if (!this.secondOpenCart) {
            clearTimeout(this.timerId);
            this.timerId = null;
            this.clearCarts();
          }
        }, 5000);
      } else {
        this.secondOpenCart = e.target;
        clearTimeout(this.timerId);
        this.timerId = null;

        if (Number(this.firstOpenCart.textContent) === Number(this.secondOpenCart.textContent)) {
          this.firstOpenCart.remove();
          this.secondOpenCart.remove();
          if (document.querySelector(".game__cart")) {
            this.freezeClick = true;
            setTimeout(() => {
              this.clearCarts();
              this.freezeClick = false;
            }, 1000);
            this.clearCarts();
          } else {
            this.startGameOver();
          }
        } else {
          this.freezeClick = true;
          setTimeout(() => {
            this.clearCarts();
            this.freezeClick = false;
          }, 1000);
        }
      }
    },
    /* eslint-enable */
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
