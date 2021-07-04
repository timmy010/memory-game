<template>
  <div class="game__cart" v-for="item in carts" :key="item.id" @click="reverseCart($event, item)">
    <div class="game__cart-back" v-if="!item.visible"></div>
    {{ item.value }}
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      firstOpenCart: null,
      secondOpenCart: null,
      timerId: null,
    };
  },
  props: {
    freezeClick: Boolean,
  },
  computed: {
    ...mapState(["carts"]),
  },
  methods: {
    ...mapMutations(["startGameOver", "deleteCarts"]),
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
        this.firstOpenCart = item;
        this.timerId = setTimeout(() => {
          if (!this.secondOpenCart) {
            clearTimeout(this.timerId);
            this.timerId = null;
            this.clearCarts();
          }
        }, 5000);
      } else {
        this.secondOpenCart = item;
        clearTimeout(this.timerId);
        this.timerId = null;

        if (Number(this.firstOpenCart.value) === Number(this.secondOpenCart.value)) {
          this.deleteCarts(this.firstOpenCart.id);
          this.deleteCarts(this.secondOpenCart.id);
          if (document.querySelector(".game__cart") && this.carts.length !== 0) {
            this.$emit("update:freezeClick", true);
            setTimeout(() => {
              this.clearCarts();
              this.$emit("update:freezeClick", false);
            }, 1000);
            this.clearCarts();
          } else {
            this.startGameOver();
          }
        } else {
          this.$emit("update:freezeClick", true);
          setTimeout(() => {
            this.clearCarts();
            this.$emit("update:freezeClick", false);
          }, 1000);
        }
      }
    },
    /* eslint-enable */
  },
};
</script>

<style lang="scss">
.game {
  &__cart {
    position: relative;
    padding: 20px 20px;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
  }
  &__cart-back {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #31a87c;
    border: 0;
    border-radius: 5px;
    pointer-events: none;
  }
}
</style>
