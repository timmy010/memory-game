import { createStore } from "vuex";

export default createStore({
  state: {
    time: 0,
    interval: null,
    carts: [],
    results: [],
  },
  mutations: {
    startGameOver() {
      const id = this.state.results.length === 0 ? 1 : this.state.results[this.state.results.length - 1].id + 1;
      this.state.results.push({
        id,
        value: this.state.time,
      });
      clearInterval(this.state.interval);
      this.state.interval = null;
      this.state.time = 0;
    },
    startTimer() {
      console.log('start timer');
      this.state.interval = setInterval(() => {
        this.state.time = this.state.time + 1; // eslint-disable-line
      }, 1000);
    },
    createdCarts() {
      this.state.carts = [];
      for (let i = 1; i <= 18; i += 1) {
        this.state.carts.push({
          value: Number(i),
          visible: false,
        });
        this.state.carts.push({
          value: Number(i),
          visible: false,
        });
      }
      let currentIndex = this.state.carts.length;
      let temporaryValue;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this.state.carts[currentIndex];
        this.state.carts[currentIndex] = this.state.carts[randomIndex];
        this.state.carts[randomIndex] = temporaryValue;
      }
      console.log(this.state.carts);
    },
  },
});
