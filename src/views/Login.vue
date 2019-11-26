<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: isValidationEmailRequired || isValidationEmailIncorrect}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid">{{getEmailValidateMessage}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: isValidationPasswordRequired || isValidationPasswordIncorrect}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">{{getPasswordValidateMessage}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  name: 'Login',

  data: () => ({
    email: '',
    password: '',
  }),

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },

  computed: {
    isValidationEmailRequired() {
      return this.$v.email.$dirty && !this.$v.email.required;
    },

    isValidationEmailIncorrect() {
      return this.$v.email.$dirty && !this.$v.email.email;
    },

    getEmailValidateMessage() {
      if (this.isValidationEmailRequired) {
        return 'Поле обязательно для заполнения';
      } if (this.isValidationEmailIncorrect) {
        return 'Введите корректный email';
      }
      return '';
    },

    isValidationPasswordRequired() {
      return this.$v.password.$dirty && !this.$v.password.required;
    },

    isValidationPasswordIncorrect() {
      return this.$v.password.$dirty && !this.$v.password.minLength;
    },

    getValidationPasswordMinLength() {
      return this.$v.password.$params.minLength.min;
    },

    getPasswordValidateMessage() {
      if (this.isValidationPasswordRequired) {
        return 'Введите пароль';
      } if (this.isValidationPasswordIncorrect) {
        return `Пароль должен содержать ${this.getValidationPasswordMinLength} символов. Сейчас он ${this.password.length}`;
      }
      return '';
    },
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.login(formData);
        this.$router.push({ name: 'home' });
      } catch (e) {
        console.log(e);
      }
    },

    ...mapActions(['login']),
  },
};
</script>
