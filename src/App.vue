<template>
  <section class="game">
    <h1 class="game__title">Игра в пары</h1>
    <ul class="game__rules">
      <li>Задача игры - найти все парные карточки</li>
      <li>
        При клике на карточку карточка открывается. В течение 5 секунд необходимо нажать на вторую
        карточку. Если в течение 5 секунд не кликните на вторую карточку, первая карточка
        закрывается.
      </li>
      <li>
        Если при клике на вторую карточку находите пару, то парные карты удаляются с игрового поля.
      </li>
      <li>
        Игра заканчивается когда найдены все пары. После окончания игры показывается таблица с
        результатом - временем прошедним с момента начала игры.
      </li>
    </ul>
    <p class="game__status" v-if="status">
      {{ status }}
    </p>
    <button
      class="game__start-btn"
      @click="
        this.createdCarts();
        this.startTimer();
      "
    >
      НАЧАТЬ ИГРУ
    </button>
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
        statusStr = "Поздравляем! Игра закончена! Для старта новой игры нажмите кнопку Начать игру";
      } else if (this.carts.length === 0) {
        statusStr = "Для старта игры нажмите кнопку Начать игру";
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
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
