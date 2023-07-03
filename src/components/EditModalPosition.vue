<template>
  <div  class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999] opacity-0 pointer-events-none duration-150 " ref="editModalContent" :id="selectedObjectId">
    <div class="bg-white rounded p-6 duration-300 w-[424px] modal-conteiner flex flex-col gap-6 relative translate-y-[50px] opacity-0" ref="editModalElement">
      <div class="absolute top-0 rounded-[14px] left-0 w-full h-full backdrop-blur duration-150 z-[9998] flex items-center justify-center hidden loading" ref="loading">
        <div class="spinner " ref="spinner">
          <div class="arc " ref="arc"></div>
          <div class="arc" ref="arc"></div>
          <div class="arc" ref="arc"></div>
        </div>
      </div>
      <button @click="closeModal" class="absolute top-[-2%] right-[-3%] w-[30px] h-[30px] rounded-[50%] bg-[#838383] flex items-center justify-center hover:bg-[#C58BC5] duration-150 z-[9999]" id="buttonCloseModal">
        <svg class="stroke-[#1c1c1e] duration-150" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="font-semibold text-xl text-[#f2f2f7]">Редактирование объекта</span>
      <form @submit="submitForm" class="flex flex-col gap-3" id="submitForm" @keydown.enter.prevent>
        <div class="text-left flex flex-col gap-1 font-[Montserrat]">
          <label for="nameValue" class="font-[Montserrat] font-light text-[#f2f2f7] text-sm mb-2">Название:</label>
          <input  ref="nameValueRef" id="nameValue" type="text" class="w-full h-14 bg-[#838383] bg-opacity-10 border border-gray-500 border-opacity-50 backdrop-filter backdrop-blur-lg p-3 text-[#838383] rounded-[14px] focus:outline-none focus:border-[#C889C6] items-center" :placeholder="objectName" :disabled="objectName"/>
        </div>
        <div class="text-left flex flex-col gap-1 font-[Montserrat]">
          <label for="addValues" class="font-[Montserrat] font-light text-[#f2f2f7] text-sm mb-2">Список значений:</label>
          <input type="text" @keydown.enter="addTag" v-model="tagInput" placeholder="Введите тег и нажмите Enter" class="resize-none w-full h-14 bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 backdrop-filter backdrop-blur-lg p-3 text-[#838383] rounded-[14px] focus:outline-none focus:border-[#C889C6]"/>
        </div>
        <div ref="tagsContainer" class="tags-container w-full bg-[#0F0E0F] bg-opacity-70 border border-gray-500 border-opacity-50 rounded-[14px] p-3">
          <div v-for="tag in tags" :key="tag" class="tag flex gap-3 justify-between" @click="removeTag(tag)">
            <div class="text-white">{{ tag }}</div>
            <span class="bg-[#838383] duration-150 bg-opacity-[50%] flex rounded-full w-[20px] h-[20px] items-center justify-center">
              <svg class="stroke-[#838383] duration-150 mx-auto" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
    
        <div class="flex items-center justify-center flex-col gap-3">
          <button type="submit" class="w-full bg-[#C58BC5] font-light text-md rounded-[14px] text-[#f2f2f7] p-3 hover:bg-[#885886] duration-150 shadow-[#C58BC5] w-[80%] cursor-pointer" id="addPosition">Сохранить изменения</button>
        </div>
        <button class=" font-light text-md rounded-[14px] text-[#FF4E50] px-3 duration-150 cursor-pointer text-[12px] underline " @click="deleteObject">Удалить объект</button>
      </form>
    </div>
    <div class="fixed top-0 left-0 w-full h-full bg-[#0F0E0F] bg-opacity-70 backdrop-blur z-[-1] modalBackgroundAddPosition duration-150" ref="editModalBackground"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  
  props: {
    selectedObjectId: {
    type: String, // или другой подходящий тип данных
    requared: true, 
  }
},
  data() {
    return {
      nameValue: '',
      addValues: '',
      tagInput: "",
      tags: [],
      currentTag: "",
      isOpen: false,
      objectName: '',
      objectTags: [],
      delTags: [],
      newTags: [],
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      const data = {
        tags: this.tags,
      };

      // axios
      //   .post("http://localhost:3000/api/editObject", data)
      //   .then((response) => {
      //     console.log("Успешно");
      //     // Дополнительные действия после успешной отправки
      //   })
      //   .catch((error) => {
      //     console.error("Неудача");
      //     // Обработка ошибки
      //   });
    },
    removeTag(tag) {
  if (this.tags.includes(tag)) {
    // Если тег является исходным тегом из базы данных
    if (this.newTags.includes(tag)) {
      // Если тег находится в массиве newTags, удаляем его оттуда
      const tagIndex = this.newTags.indexOf(tag);
      if (tagIndex !== -1) {
        this.newTags.splice(tagIndex, 1);
      }
    } else {
      // Если тег не находится в массиве newTags, добавляем его в массив delTags
      this.delTags.push(tag);
      console.log('delTags:', this.delTags);
    }
  }

  this.tags = this.tags.filter(t => t !== tag); // Удаляем тег из массива tags
},
    addTag() {
      const tag = this.tagInput.trim();
      if (tag) {
        this.tags.push(tag);
        this.newTags.push(tag); // Add the tag to the newTags array
        this.tagInput = "";
        console.log('newTags:', this.newTags);
      }
    },
    deleteObject() {
  // Выполняется при нажатии на кнопку "Удалить объект"
  if (confirm('Вы уверены, что хотите удалить объект?')) {
    this.$refs.loading.classList.remove('hidden');
    const objectId = this.selectedObjectId;

    // Выполнение запроса на удаление объекта по ID
    axios.delete(`http://localhost:3000/api/deleteObject`, { data: { objectId } })
      .then((response) => {
        if (response.status === 200) {
          // Обработка успешного удаления объекта
          this.$refs.spinner.classList.add('successfully');
          setTimeout(() => {
            this.closeModal();
            this.$refs.loading.classList.add('hidden');
          }, 300);
        } else {
          // Обработка других статусов ответа, если требуется
        }
      })
      .catch((error) => {
        // Обработка ошибки удаления объекта
      });
  }
}
,
    openModal(objectId) {

      axios
  .post('http://localhost:3000/api/object', { objectId: objectId })
  .then((response) => {
    const objectData = response.data;

     if (Array.isArray(objectData.tags)) {
      objectData.tags = objectData.tags.join(/,/g);
    }
    // Разделение полученных тегов на отдельные значения
    const tagsFromDatabase = objectData.tags.replace(/,/g, ' | ');
    this.tags = tagsFromDatabase.split('|');
    // Здесь вы можете обновить значения в вашем компоненте с помощью полученных данных
    this.objectName = objectData.name;

    this.$emit('update:selectedObjectId', objectId);
    this.isOpen = true;
    this.$nextTick(() => {
      this.$refs.editModalContent.classList.remove("opacity-0");
      this.$refs.editModalContent.classList.remove(
        "opacity-1",
        "pointer-events-none"
      );
      this.$refs.editModalElement.classList.remove(
        "translate-y-[50px]",
        "opacity-0"
      );
      this.$refs.editModalElement.classList.add("translate-y-0", "opacity-1");
    });
  })
  .catch((error) => {
    console.error('Error retrieving object data:', error);
  });

    
    },
    closeModal() {
      this.$refs.editModalContent.classList.add(
        "opacity-0",
        "pointer-events-none"
      );
      this.$refs.editModalElement.classList.remove("translate-y-0", "opacity-1");
      this.$refs.editModalElement.classList.add(
        "translate-y-[50px]",
        "opacity-0"
      );
      setTimeout(() => {
        this.isOpen = false;
      }, 300);
      this.$emit("reset-tags");
      this.tags = [];
      this.showTagsContainer = false;
      this.tagInput = "";
      this.$emit("closeModal");
    },
    handleEscKey(event) {
      if (event.key === "Escape") {
        this.closeModal();
      }
    },
    handleClickOutside(event) {
      if (event.target === this.$refs.editModalBackground) {
        this.closeModal();
      }
    },
  },
  beforeUnmount() {
    this.tags = [];
    this.$emit("clear-tags");
  },
  mounted() {
    window.addEventListener("keydown", this.handleEscKey);
    window.addEventListener("click", this.handleClickOutside);

    // Check if the 'object' prop has a valid value before accessing the 'name' property
    if (this.object && this.object.name) {
    this.nameValue = this.object.name;
    this.tags = this.object.tags;
    this.showTagsContainer = this.tags.length > 0;
  }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleEscKey);
    window.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.modal-conteiner {
  background-color: rgba(15, 14, 15, 0.7);
  border: 1px solid rgba(131, 131, 131, 0.3);
  border-radius: 14px;
}

#loading {
  background-color: rgba(15, 14, 15, 0.7);
}

.spinner {
  position: relative;
  width: 4rem;
  height: 4rem;
  transform-style: preserve-3d;
  perspective: 800px;
}
.spinner .arc {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-bottom: 3px solid #c889c6;
  transition: all 0.3s;
}
.error .arc{
  border-bottom: 3px solid #FF4E50;
}
.successfully .arc {
  border-bottom: 3px solid #4EFF8A;
}
.spinner .arc:nth-child(1) {
  animation: rotate1 1.15s linear infinite;
}
.spinner .arc:nth-child(2) {
  animation: rotate2 1.15s linear infinite;
}
.spinner .arc:nth-child(3) {
  animation: rotate3 1.15s linear infinite;
}
.spinner .arc:nth-child(1) {
  animation-delay: -0.8s;
}
.spinner .arc:nth-child(2) {
  animation-delay: -0.4s;
}
.spinner .arc:nth-child(3) {
  animation-delay: 0s;
}

@keyframes rotate1 {
  from {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0);
  }
  to {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(1turn);
  }
}
@keyframes rotate2 {
  from {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0);
  }
  to {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(1turn);
  }
}
@keyframes rotate3 {
  from {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0);
  }
  to {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(1turn);
  }
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

.tag:hover span{
  background-color: #C58BC5;
}

.tag:hover {
   border: 0.5px solid #C58BC5;
}
</style>
