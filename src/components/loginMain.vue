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
            
        </div>
  
          <div class="mt-4 text-left flex flex-col gap-1 font-[Montserrat]">
            <label for="password" class="font-[Montserrat] font-light text-[#f2f2f7] text-sm mb-2">Пароль:</label>
            <input ref="passwordInput" v-model="password" id="password" type="password" class="w-full h-14 bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 backdrop-filter backdrop-blur-lg p-3 text-white rounded-md focus:outline-none focus:border-[#C889C6]" placeholder="Введите пароль">
        </div>
  
          <div class="mt-6 text-center">
            <p class="font-[Montserrat] text-[#C889C6] text-[12px] mb-3">{{ errorMessage }} </p>
        <button class="w-full h-14 bg-[#C889C6] rounded-[14px] font-[Montserrat] font-light text-white text-[19px] hover:bg-[#885886] duration-150 cursor-pointer" :disabled="isButtonDisabled" :class="{ 'opacity-[0.5] hover:bg-[#C889C6]': isButtonDisabled }">Войти</button>
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
            name: this.name
          }),
        });

        if (response.ok) {
      // Логин успешен
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('name', this.name);
        this.$router.push('/dashboard');
        router.replace('/dashboard');
        console.log(data)
      } else {
        // Неверное имя пользователя или пароль
        this.errorMessage = '*неверное имя пользователя и/или пароль';
        this.$refs.usernameInput.focus();
      }
    } else {
      // Логин не удался
      console.log('Ошибка входа');
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса', error);
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
