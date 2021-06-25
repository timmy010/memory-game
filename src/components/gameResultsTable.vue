<template>
  <table class="game__results-table">
    <thead>
      <tr>
        <th>№</th>
        <th>Результат</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results" :key="result.id">
        <td>{{ result.id }}</td>
        <td>{{ result.value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    results: Array,
  },
};
</script>

<style lang="scss">
.game__results-table {
  width: 80%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}
.game__results-table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}
.game__results-table td {
  width: 50%;
  border: 1px solid #dddddd;
  padding: 5px;
}
</style>
