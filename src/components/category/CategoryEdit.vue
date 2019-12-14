<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <SelectCategory
        :categories="categories"
        @changeCategory="changeCategory"
        ></SelectCategory>
        <div class="input-field">
          <input
            id="edit-name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          >
          <label :class="{active: title}" for="edit-name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="edit-limit"
            type="number"
            v-model="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          >
          <label :class="{active: limit}" for="edit-limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Минимальная величина {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import SelectCategory from './SelectCategory.vue';

export default {
  name: 'CategoryEdit',
  components: {
    SelectCategory,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    title: '',
    limit: null,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const categoryData = { id: this.current, title: this.title, limit: this.limit };
      await this.$store.dispatch('updateCategory', categoryData);
      this.$emit('updated');
      this.$message('Категория успешно обновлена');
    },

    changeCategory(catId) {
      const { title, limit, id } = this.categories.find(c => c.id === catId);
      this.current = id;
      this.title = title;
      this.limit = limit;
    },
  },
};
</script>

<style scoped>

</style>
