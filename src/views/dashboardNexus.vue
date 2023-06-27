<template>
    <div class="bg-[#0F0E0F] min-h-screen font-[Montserrat]">
      <div class="flex flex-col px-28 py-14">
        <header class="flex justify-between h-12">
          <div class="w-44">
            <img src="@/assets/logo.png" alt="Logo" class="w-full h-auto">
          </div>
          <div class="flex items-center">
            <span class="text-white">Добро пожаловать {{ user }}</span>
          </div>
        </header>
        <div class="flex gap-8 justify-center">
          <div class="w-1/4 bg-gray-900 border border-gray-500 rounded-lg"></div>
          <div class="w-1/2">
            <!-- Здесь будет цикл для добавления значений -->
          </div>
          <div class="w-1/4 bg-gray-900 border border-gray-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['user'], 
    mounted() {
    console.log('Значение "user":', this.user);
  },
  async mounted() {
  try {
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      this.user = data.user;
    } else {
      console.log('Ошибка получения данных пользователя');
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса', error);
  }
},
    data() {
      return {
        // Здесь должно быть значение из базы данных
      };
    }
  };
  </script>