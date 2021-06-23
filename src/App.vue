<template>
  <section class="game">
    <button
      class="game__start-btn"
      @click="
        this.createdCarts();
        this.startTimer();
      "
    >
      START
    </button>
    <timer />
    <div class="game__table" v-if="carts.length !== 0">
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
  </section>
</template>

<script>
import timer from "@/components/timer.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      firstOpenCart: null,
      secondOpenCart: null,
    };
  },
  computed: {
    ...mapState(["carts"]),
  },
  components: {
    timer,
  },
  methods: {
    ...mapMutations(["createdCarts", "startTimer"]),
    /* eslint-disable */
    reverseCart(e, item) {
      item.visible = true;
      if (!this.firstOpenCart) {
        this.firstOpenCart = e.target;
      } else if (!this.secondOpenCart) {
        this.secondOpenCart = e.target;
      } else {
        if (Number(this.firstOpenCart.textContent) === Number(this.secondOpenCart.textContent)) {
          this.firstOpenCart.remove();
          this.secondOpenCart.remove();
          this.firstOpenCart = null;
          this.secondOpenCart = null;
          this.carts.forEach((cart) => {
            cart.visible = false;
          });
        } else {
          this.firstOpenCart = null;
          this.secondOpenCart = null;
          this.carts.forEach((cart) => {
            cart.visible = false;
          });
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
