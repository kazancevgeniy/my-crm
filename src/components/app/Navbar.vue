<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a @click="onClickSidebar">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{date | date('datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{getUserName}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a @click="logOut" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Navbar',

  data: () => ({
    dropdown: null,
    date: new Date(),
    interval: null,
  }),

  computed: {
    getUserName() {
      if (this.$store.getters.userInfo && this.$store.getters.userInfo.name) {
        return this.$store.getters.userInfo.name;
      }
      return '';
    },
  },

  mounted() {
    this.toggleDropdown();
    this.setCurrentTime();
  },

  beforeDestroy() {
    this.clearTimeInterval();
    this.destroyDropdown();
  },

  methods: {
    onClickSidebar() {
      this.$emit('toggleSidebar');
    },

    async logOut() {
      await this.logout();
      this.$router.push('/login?message=logout');
    },

    setCurrentTime() {
      this.interval = setInterval(() => {
        this.date = new Date();
      }, 1000);
    },

    toggleDropdown() {
      // eslint-disable-next-line no-undef
      this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: true,
      });
    },

    destroyDropdown() {
      if (this.dropdown && this.dropdown.destroy) {
        this.dropdown.destroy();
      }
    },

    clearTimeInterval() {
      clearInterval(this.interval);
    },

    ...mapActions(['logout']),
  },
};
</script>

<style>

</style>
