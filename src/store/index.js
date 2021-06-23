import { createStore } from "vuex";

export default createStore({
  state: {
    time: 0,
    interval: null,
  },
  mutations: {
    startTimer() {
      console.log('start timer');
      this.state.interval = setInterval(() => {
        this.state.time = this.state.time + 1; // eslint-disable-line
        if (this.state.time > 5) {
          clearInterval(this.state.interval);
          this.state.time = 0;
        }
      }, 1000);
    },
  },
  actions: {},
});
