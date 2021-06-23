<template>
  <section class="game">
    <button class="game__start-btn" @click="createdCarts">START</button>
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
export default {
  name: "App",
  data() {
    return {
      carts: [],
      firstOpenCart: null,
      secondOpenCart: null,
    };
  },
  methods: {
    createdCarts() {
      this.carts = [];
      for (let i = 1; i <= 18; i += 1) {
        this.carts.push({
          value: Number(i),
          visible: false,
        });
        this.carts.push({
          value: Number(i),
          visible: false,
        });
      }
      let currentIndex = this.carts.length;
      let temporaryValue;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this.carts[currentIndex];
        this.carts[currentIndex] = this.carts[randomIndex];
        this.carts[randomIndex] = temporaryValue;
      }
      console.log(this.carts);
    },
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
