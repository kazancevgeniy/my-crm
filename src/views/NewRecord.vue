<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading"></Loader>
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <form v-else class="form" @submit.prevent="handlerSubmit">
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
              v-model="type"
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
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model="amount"
            :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        >
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Минимальная величина {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            :class="{ invalid: $v.description.$dirty && !$v.description.required }"
            v-model="description"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid">Введите описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import SelectCategory from '../components/category/SelectCategory.vue';

export default {
  name: 'Record',
  components: { SelectCategory },
  data: () => ({
    loading: true,
    categories: [],
    categoryId: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    description: { required },
    amount: { minValue: minValue(1) },
    categoryId: { required },
  },
  computed: {
    ...mapGetters(['userInfo']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.userInfo.bill >= this.amount;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  },
  methods: {
    changeCategory(catId) {
      this.categoryId = catId;
    },
    async handlerSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        await this.$store.dispatch('createRecord', {
          categoryId: this.categoryId,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
        });
        const bill = this.type === 'income'
          ? this.userInfo.bill + this.amount
          : this.userInfo.bill - this.amount;
        await this.$store.dispatch('updateInfo', { bill });
        this.$message('Запись успешно создана');
        this.$v.$reset();
        this.amount = 1;
        this.description = '';
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
      }
    },
  },
};
</script>
