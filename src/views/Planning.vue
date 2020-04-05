<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{userInfo.bill | currency('RUR')}}</h4>
    </div>
    <Loader v-if="loading"></Loader>
    <section v-else>
      <div v-for="category in getCategoriesToShow" :key="category.id">
        <p>
          <strong>{{category.title}}</strong>
          {{category.spend | currency}} из {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import currencyFilter from '../filters/currency.filter';

export default {
  name: 'planning',
  data: () => ({
    loading: true,
  }),
  computed: {
    getCategoriesToShow() {
      return this.getCategories.map((cat) => {
        const spend = this.getRecords
          .filter(rec => rec.categoryId === cat.id)
          .filter(rec => rec.type === 'outcome')
          // eslint-disable-next-line no-param-reassign,no-return-assign
          .reduce((total, record) => total += +record.amount, 0);

        const percent = 100 * spend / cat.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const tooltipValue = cat.limit - spend;
        const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;
        // eslint-disable-next-line no-nested-ternary
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red';
        return {
          ...cat,
          tooltip,
          progressPercent,
          progressColor,
          spend,
        };
      });
    },
    ...mapGetters(['getRecords', 'getCategories', 'userInfo']),
  },
  async created() {
    await this.fetchRecords();
    await this.fetchCategories();
    this.loading = false;
  },
  methods: {
    ...mapActions(['fetchRecords', 'fetchCategories']),
  },
};
</script>
