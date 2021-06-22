<template>
  <section class="game">
    <button class="game__start-btn" @click="createdCarts">START</button>
    <div class="game__table" v-if="carts.length !== 0">
      <div
        class="game__cart"
        v-for="(item, index) in carts"
        :key="index"
        @click="reverseCart($event)"
      >
        <div class="game__cart-back"></div>
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
    };
  },
  methods: {
    createdCarts() {
      this.carts = []; // Обнуление массива карточек
      let carts = [];
      for (let i = 1; i <= 18; i += 1) {
        carts.push({
          value: Number(i),
          visible: false,
        });
      }
      carts = [...carts, ...carts]; // формирование сдвоенного массива

      // Перемешивание
      let currentIndex = carts.length;
      let temporaryValue;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = carts[currentIndex];
        carts[currentIndex] = carts[randomIndex];
        carts[randomIndex] = temporaryValue;
      }

      this.carts = [...this.carts, ...carts];
    },
    reverseCart(e) {
      console.log(typeof Number(e.target.textContent));
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
