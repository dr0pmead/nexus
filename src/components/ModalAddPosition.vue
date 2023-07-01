<template>
  <div id="modalAddPosition" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999]  opacity-0 pointer-events-none duration-150 " ref="modalContent">
  <div class="bg-white rounded p-6 duration-300 w-[424px] modal-conteiner flex flex-col gap-6 relative translate-y-[50px] opacity-0" ref="modalElement">
    <button @click="closeModal" class="absolute top-[-2%] right-[-3%] w-[30px] h-[30px] rounded-[50%] bg-[#838383] flex items-center justify-center hover:bg-[#C58BC5] duration-150" id="buttonCloseModal">
      <svg class="stroke-[#1c1c1e] duration-150" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <span class="font-semibold text-xl text-[#f2f2f7]">Новый объект слежения</span>
    <form @submit="submitForm" class="flex flex-col gap-3" id="submitForm" @keydown.enter.prevent>
    <div class="text-left flex flex-col gap-1 font-[Montserrat]">
      <label for="nameValue" class="font-[Montserrat] font-light text-[#f2f2f7] text-sm mb-2">Название:</label>
      <input ref="nameValueRef" v-model="nameValue" id="nameValue" type="text" class="w-full h-14 bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 backdrop-filter backdrop-blur-lg p-3 text-[#838383] rounded-[14px] focus:outline-none focus:border-[#C889C6]" placeholder="Введите название">
    </div>
    <div class="text-left flex flex-col gap-1 font-[Montserrat]">
      <label for="addValues" class="font-[Montserrat] font-light text-[#f2f2f7] text-sm mb-2">Список значений:</label>
      <input type="text" @keydown.enter="addTag" v-model="tagInput" placeholder="Введите тег и нажмите Enter" class="resize-none w-full h-14 bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 backdrop-filter backdrop-blur-lg p-3 text-[#838383] rounded-[14px] focus:outline-none focus:border-[#C889C6]"/>
    </div>
    
    <div v-if="showTagsContainer" ref="tagsContainer" class="tags-container w-full bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 rounded-[14px] p-3">
      <div  @click="removeTag(tag)" v-for="tag in tags" :key="tag" class="tag flex gap-3 justify-between">{{ tag }} <span class="bg-[#838383] duration-150 bg-opacity-[50%] flex rounded-full w-[20px] h-[20px] items-center justify-center">
        <svg class="stroke-[#838383] duration-150 mx-auto" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span></div>
    </div>
    <div class="flex items-center justify-center">
      <button type="submit" class="w-full bg-[#C58BC5] font-light text-md rounded-[14px] text-[#f2f2f7] p-3 hover:bg-[#885886] duration-150 shadow-[#C58BC5] w-[80%] cursor-pointer" id="addPosition">Добавить запись</button>
    </div>
    
    </form>
  </div>
  <div class="fixed top-0 left-0 w-full h-full bg-[#0F0E0F] bg-opacity-70 backdrop-blur z-[-1] modalBackgroundAddPosition duration-150" ref="modalBackground"></div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nameValue: "",
      addValues: "", 
      tagInput: '',
      tags: [], // Массив для хранения тегов
      currentTag: '', // Текущий введенный тег
      showTagsContainer: false,
    };
  },
  computed: {
    tagsContainerHTML() {
      if (this.tags.length === 0) {
        return '';
      }
      return this.tags.map(tag => `<div class="tag" @click="removeTag('${tag}')">${tag}</div>`).join('');
    },
  },
  methods: {
    checkKey(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  },
  submitForm(event) {
    event.preventDefault(); // Prevent page reload

  // Создайте объект с данными, которые нужно отправить на сервер
  const data = {
    name: this.nameValue,
    tags: this.tags
  };

  // Выполните POST-запрос на сервер, передавая данные в теле запроса
  axios.post('http://localhost:3000/api/addObject', data)
    .then(response => {
      console.log('Успешно');
      // Дополнительные действия после успешной отправки
    })
    .catch(error => {
      console.error('Неудача');
      // Обработка ошибки
    });
},
    removeTag(tag) {
  const index = this.tags.indexOf(tag);
  if (index !== -1) {
    this.tags.splice(index, 1);
    if (this.tags.length === 0) {
      this.showTagsContainer = false;
    }
  }
},
    
    addTag() {
      const tag = this.tagInput.trim();
      if (tag) {
        this.tags.push(tag);
        this.tagInput = '';
        this.showTagsContainer = true;
      }
    },

    openModal() {
      this.isOpen = true;
      this.$nextTick(() => {
        this.$refs.modalContent.classList.remove('opacity-0')
        this.$refs.modalContent.classList.remove('opacity-1', 'pointer-events-none')
        this.$refs.modalElement.classList.remove('translate-y-[50px]', 'opacity-0');
        this.$refs.modalElement.classList.add('translate-y-0', 'opacity-1');
      });
    },
    closeModal() {
      this.$refs.modalContent.classList.add('opacity-0', 'pointer-events-none')
      this.$refs.modalElement.classList.remove('translate-y-0', 'opacity-1');
      this.$refs.modalElement.classList.add('translate-y-[50px]', 'opacity-0');
      setTimeout(() => {
        this.isOpen = false;
      }, 300);
      this.$emit('reset-tags');
      this.tags = [];
      this.showTagsContainer = false;
      this.tagInput = '';
      this.$emit('closeModal');
    },
    handleEscKey(event) {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    },
    handleClickOutside(event) {
      if (event.target === this.$refs.modalBackground) {
        this.closeModal();
      }
    },
  },
  beforeUnmount() {
    this.tags = [];
    this.$emit('clear-tags');
  },
  mounted() {
    window.addEventListener('keydown', this.handleEscKey);
    window.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscKey);
    window.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
.modal-conteiner {
  background-color: rgba(15, 14, 15, 0.7);
  border: 1px solid rgba(131, 131, 131, 0.3);
  border-radius: 14px;
}

#buttonCloseModal:hover {
  box-shadow: 0px 0px 10px 0px rgba(200, 137, 198, 0.25);
}

#buttonCloseModal:hover svg {
  stroke: #f2f2f7;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
cursor: pointer;

}

.tag {
  background-color: rgb(15, 14, 15, 70);
  padding: 4px 8px;
  margin: 4px;
  border-radius: 14px;
  border: 0.5px solid rgba(131, 131, 131, 50 );
  max-height: 30px;
  color: #f2f2f7;
  transition: all 0.3s;
}

.tag:hover span svg {
  stroke: #f2f2f7;
}

.tag:hover span {
  background-color: #C58BC5;
}

.tag:hover {
   border: 0.5px solid #C58BC5;
}
</style>
