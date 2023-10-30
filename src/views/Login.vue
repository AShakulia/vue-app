<template>
  <div class="container">
    <form class="form" @submit.prevent="register">
      <h1 class="form-title">Регистрация</h1>
      <div class="form-group">
        <div class="form-input">
          <input v-model="formData.username" name="username" type="text" placeholder="Введите логин" id="username" required />
          <div class="error" v-if="!validateName(formData.username)">Логин должен содержать от 3 символов, символы А-Z, цифры</div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-input">
          <input v-model="formData.email" name="email" type="email" placeholder="Введите e-mail" id="email" required />
          <div class="error" v-if="!validateEmail(formData.email)">Почта не верно введена</div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-input">
          <input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            placeholder="Введите пароль"
            id="password"
            required
          />
          <i
            class="password-toggle-icon"
            @click="toggleShowPassword"
            :class="showPassword ? 'icon icon-eye-blocked' : 'icon icon-eye'"
          ></i>
        </div>
        <div class="error" v-if="!validatePassword(formData.password)">Пароль должен содержать от 3 символов, символы А-Z, цифры</div>
      </div>
      <div class="form-group">
        <div class="form-input">
          <input
            v-model="formData.passwordConfirmation"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Повторите пароль"
            name="passwordConfirmation"
            id="passwordConfirmation"
            required
          />
          <div class="error" v-if="!validatePasswordConfirmation(formData.password, formData.passwordConfirmation)">Пароли не совпадают</div>
        </div>
      </div>
      <div class="form-group-btn">
        <button class="btn-action" type="submit">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Swal from 'sweetalert2';

import { validateName, validateEmail, validatePassword, validatePasswordConfirmation } from '../helpers/validators';

export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });

    const showPassword = ref(false);

    const users = ref([]); // Список зарегистрированных пользователей

    const register = () => {
      if (
        validateName(formData.value.username) &&
        validateEmail(formData.value.email) &&
        validatePassword(formData.value.password) &&
        validatePasswordConfirmation(formData.value.password, formData.value.passwordConfirmation)
      ) {
        // Проверьте, не существует ли уже пользователя с таким же email
        const userExists = users.value.some(user => user.email === formData.value.email);

        if (userExists) {
          Swal.fire({
            title: 'Неудачная регистрация',
            text: 'Пользователь с таким email уже существует.',
            icon: 'error',
            confirmButtonText: 'Ок',
            confirmButtonColor: 'rgb(20, 146, 204)'
          });
        } else {
          // Регистрация нового пользователя
          users.value.push({
            username: formData.value.username,
            email: formData.value.email,
            password: formData.value.password,
            passwordConfirmation: formData.value.passwordConfirmation,
          });

          Swal.fire({
            title: 'Успешная регистрация!',
            text: 'Вы успешно зарегистрировались.',
            icon: 'success',
            confirmButtonText: 'Ок',
            confirmButtonColor: 'rgb(20, 146, 204)'
          });
        }
      }
    };

    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      formData,
      users,
      register,
      validateName,
      validateEmail,
      validatePassword,
      validatePasswordConfirmation,
      showPassword,
      toggleShowPassword,
    };
  },
});
</script>

<style scoped lang="scss">

.container {
  width: 1260px;
  background-color: #fff;
}
.form {
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid  rgb(20, 146, 204);
  padding: 40px 20px;
  border-radius: 10px;
}

.form-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
}
.error {
  color: red;
  font-size: 10px;
  padding: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-group {
  margin-bottom: 10px;
}
.form-input {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-content {
  position: relative;
}

.password-toggle-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10%;
  cursor: pointer;
}

.form-group-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-action {
  margin: 20px auto;
  width: 50%;
}
</style>





