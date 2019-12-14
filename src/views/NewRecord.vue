<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading"></Loader>
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <form v-else class="form">
      <SelectCategory
        :categories="categories"
        @changeCategory="changeCategory"
      ></SelectCategory>
      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
        >
        <label for="description">Описание</label>
        <span
              class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import SelectCategory from '../components/category/SelectCategory.vue';

export default {
  name: 'Record',
  components: { SelectCategory },
  data: () => ({
    loading: true,
    categories: [],
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategory');
    this.loading = false;
  },
  methods: {
    changeCategory(catId) {
      console.log(catId);
    },
  },
};
</script>
