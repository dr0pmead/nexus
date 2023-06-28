<template>
    <div class="bg-[#0F0E0F] w-full h-full flex justify-center items-center min-h-screen">
      <div class="flex flex-col justify-around items-center gap-16">
        <div class="flex flex-col items-center gap-3">
          <img src="../assets/logo.png" alt="Logo" class="w-64 h-12">
          <p class="font-[Montserrat] text-gray-500 text-lg">Система аудита технических активов предприятия</p>
        </div>
  
        <form @submit.prevent="login" class="bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 backdrop-filter backdrop-blur-lg w-[424px] h-[409px] p-6 rounded-[14px] justify-between flex flex-col">
          <div class="mb-6">
            <p class="font-[Montserrat] text-2xl font-semibold text-[#f2f2f7] ">Авторизация</p>
          </div>
  
          <div class="text-left flex flex-col gap-1 font-[Montserrat]">
            <label for="username" class="font-[Montserrat] font-light text-[#f2f2f7] text-sm mb-2">Имя профиля:</label>
            <input ref="usernameInput" v-model="username" id="username" type="text" class="w-full h-14 bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 backdrop-filter backdrop-blur-lg p-3 text-[#838383] rounded-md focus:outline-none focus:border-[#C889C6]" placeholder="Введите имя профиля">
            <p class="font-[Montserrat] text-[#C889C6] text-[12px]">{{ errorMessage }} </p>
        </div>
  
          <div class="mt-4 text-left flex flex-col gap-1 font-[Montserrat]">
            <label for="password" class="font-[Montserrat] font-light text-[#f2f2f7] text-sm mb-2">Пароль:</label>
            <input ref="passwordInput" v-model="password" id="password" type="password" class="w-full h-14 bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 backdrop-filter backdrop-blur-lg p-3 text-white rounded-md focus:outline-none focus:border-[#C889C6]" placeholder="Введите пароль">
            <p class="font-[Montserrat] text-[#C889C6] text-[12px]">{{ passwordErrorMessage }} </p>
          </div>
  
          <div class="mt-6 text-center">
            
        <button class="w-full h-14 bg-[#C889C6] rounded-[14px] font-[Montserrat] font-light text-white text-[19px] hover:bg-[#885886] duration-150 cursor-pointer" type="submit" :disabled="isButtonDisabled" :class="{ 'opacity-[0.5] hover:bg-[#C889C6]': isButtonDisabled }">Войти</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import router from '../router'
export default {
    
    data() {
    return {
      username: '',
      password: '',
      isButtonDisabled: true,
      isLoading: false,
      errorMessage: '', 
      passwordErrorMessage: '',
    };
  },
  methods: {
    // Остальные методы
    validateForm() {
      this.isButtonDisabled = !(this.username && this.password);
    },
    
    async login() {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            this.errorMessage = '';
            this.passwordErrorMessage = '';
            const user_id = data.user_id;
            router.replace(`/dashboard/${user_id}`);
          } else {
            if (!data.passwordMatch) {
              this.errorMessage = '';
              this.passwordErrorMessage = '* Неверный пароль';
              this.$refs.passwordInput.focus();
            } else {
              this.errorMessage = '* Пользователь не найден';
              this.passwordErrorMessage = '';
              this.$refs.usernameInput.focus();
            }
            
          }
        } else {
          console.log('Login failed');
        }
      } catch (error) {
        console.error('Error executing request', error);
      }
    },
  },
  watch: {
    username() {
      this.validateForm();
    },
    password() {
      this.validateForm();
    }
  }
};
</script>
