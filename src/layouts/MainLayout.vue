<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div v-else class="app-main-layout">
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

      <div class="fixed-action-btn" v-tooltip="'Создать новую запись'">
        <router-link class="btn-floating btn-large blue" to="/new-record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
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
    loading: true,
  }),

  async created() {
    await this.fetchUser();
  },

  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },

    async fetchUser() {
      if (!Object.assign(this.$store.getters.userInfo).length) {
        await this.$store.dispatch('fetchUser');
      }
      this.loading = false;
    },
  },
};
</script>
