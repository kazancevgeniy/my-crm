<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addNewCategory"></CategoryCreate>
        <CategoryEdit></CategoryEdit>
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
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
  },
};
</script>
