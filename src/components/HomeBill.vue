<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur in currencies" :key="cur" class="currency-line">
          <span>{{ getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBill',
  props: ['rates'],
  computed: {
    currencies() {
      return Object.keys(this.rates).reverse();
    },
    base() {
      return this.$store.getters.userInfo.bill / (this.rates.RUB / this.rates.EUR);
    },
  },
  methods: {
    getCurrency(currency) {
      return (this.base * this.rates[currency]);
    },
  },
};
</script>

<style scoped>

</style>
