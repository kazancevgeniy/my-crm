<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
      <router-link
        tag="li"
        v-for="link in links"
        :key="link.title"
        :to="link.url"
        :exact="link.exact"
        active-class="active"
      >
        <a class="waves-effect waves-orange pointer">{{link.title}}</a>
      </router-link>
    </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    links: [
      {
        title: 'Счет',
        url: '/',
        exact: true,
      },
      {
        title: 'История',
        url: '/history',
      },
      {
        title: 'Планирование',
        url: '/planning',
      },
      {
        title: 'Новая запись',
        url: 'new-record',
      },
      {
        title: 'Категории',
        url: 'categories',
      },
    ],
  }),
};
</script>

<style>

</style>
