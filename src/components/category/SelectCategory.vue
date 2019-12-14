<template>
  <div class="input-field" >
    <select
      ref="select"
      @change="chooseCategory($event)"
      v-model="selected"
    >
      <option value="" disabled selected>Выбирете категорию</option>
      <option
        v-for="c of categories"
        :key="c.id"
        :value="c.id"
      >{{c.title}}</option>
    </select>
    <label>Выберите категорию</label>
  </div>
</template>

<script>
export default {
  name: 'SelectCategory',
  props: ['categories'],
  data: () => ({
    selected: null,
  }),
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    chooseCategory(e) {
      const catId = e.target.value;
      this.$emit('changeCategory', catId);
    },
  },
};
</script>

<style scoped>

</style>
