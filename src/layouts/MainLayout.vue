<template>
  <div class="app-main-layout">
    <Navbar
      @toggleSidebar="toggleSidebar"
    />
    <Sidebar
      :isOpen="isOpen"
    />
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/new-record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';

export default {
  name: 'MainLayout',

  components: {
    Navbar,
    Sidebar,
  },

  data: () => ({
    isOpen: true,
  }),

  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
