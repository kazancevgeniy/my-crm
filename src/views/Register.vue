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
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="name"
            :class="{invalid: isValidationNameRequired}"
        >
        <label for="name">Имя</label>
        <small v-if="isValidationNameRequired" class="helper-text invalid">Введите имя</small>
      </div>
      <p>
        <label>
          <input v-model="isAgree" type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Register',

  data: () => ({
    email: '',
    password: '',
    name: '',
    isAgree: false,
  }),

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    isAgree: { checked: v => v },
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

    isValidationNameRequired() {
      return this.$v.name.$dirty && !this.$v.name.required;
    },
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
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push({ name: 'home' });
      } catch (e) {
        // console.log(e);
      }
    },
  },
};
</script>
