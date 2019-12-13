<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addNewCategory"></CategoryCreate>
        <CategoryEdit
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="fetchCategories"
        ></CategoryEdit>
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>
<script>
import CategoryCreate from '../components/CategoryCreate.vue';
import CategoryEdit from '../components/CategoryEdit.vue';

export default {
  name: 'Category',
  components: { CategoryEdit, CategoryCreate },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.fetchCategories();
    console.log(this.categories);
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    async fetchCategories() {
      this.categories = await this.$store.dispatch('fetchCategory');
      // eslint-disable-next-line no-plusplus
      this.updateCount++;
    },
  },
};
</script>
