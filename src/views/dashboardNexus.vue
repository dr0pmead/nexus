<template>
    <div class="bg-[#0F0E0F] min-h-screen font-[Montserrat]">
      <ModalAddPosition ref="modalAddPosition" :isModalOpen="isModalOpen" @closeModal="resetTags"/>
      <EditModalPosition ref="EditModalPosition" :isModalOpen="isEditModalOpen" @closeModal="closeEditModal" :selectedObjectId="selectedObject.id"/>
    <div class="flex flex-col px-28 py-14">
      <header class="flex justify-between h-12 mb-24">
        <div class="w-44">
          <img src="@/assets/logo.png" alt="Logo" class="w-full h-auto">
        </div>
        <div class="flex items-center text-[19px]">
          <span class="text-white">Добро пожаловать, <span class="font-semibold">{{ user }}</span></span>
        </div>
      </header>
      <div class="flex gap-8 justify-center">
        <div class="w-1/4 bg-[#0F0E0F] h-[682px] border border-gray-500 rounded-lg p-6 flex flex-col gap-8 justify-between relative">
            <div class="absolute top-[4.5%] right-[3%]">
              <button >
                <svg fill="none" width="20" height="20" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="hover:stroke-[#C889C6] stroke-[#838383] duration-150 shadow-[#C889C6]">
                <path d="M4.95825 4.9585H4.24992C3.8742 4.9585 3.51386 5.10775 3.24818 5.37343C2.98251 5.6391 2.83325 5.99944 2.83325 6.37516V12.7502C2.83325 13.1259 2.98251 13.4862 3.24818 13.7519C3.51386 14.0176 3.8742 14.1668 4.24992 14.1668H10.6249C11.0006 14.1668 11.361 14.0176 11.6267 13.7519C11.8923 13.4862 12.0416 13.1259 12.0416 12.7502V12.0418" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3333 3.54174L13.4583 5.66674M14.4394 4.66445C14.7183 4.38548 14.8751 4.00711 14.8751 3.61258C14.8751 3.21805 14.7183 2.83968 14.4394 2.5607C14.1604 2.28173 13.782 2.125 13.3875 2.125C12.993 2.125 12.6146 2.28173 12.3356 2.5607L6.375 8.50008V10.6251H8.5L14.4394 4.66445Z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              

            </div>
          <div class="flex flex-col gap-8 relative">
          <div class="text-center flex flex-col">
            <span class="font-semibold text-2xl text-[#f2f2f7]">Подразделения</span>
            <span class="font-light text-[13px] text-[#838383]">Для фильтрации выберите подразделения</span>
          </div>
          <div class="flex flex-col gap-3">
            <div class="dropdown w-full bg-[#0F0F0F] relative" v-for="object in objects" :key="object.id" :id="object.id">
                <div class=" absolute top-[-10px] right-[-10px] flex flex-col gap-3">
                    <button class="bg-[#838383] duration-150 bg-opacity-[50%] flex rounded-full w-[25px] h-[25px] items-center justify-center hover:bg-[#C58BC5]" id="buttonEditObject" @click="openEditModal(object.selectedObjectId)">
                        <svg class="stroke-[#838383] duration-150 mx-auto" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.65 3.4625L6.525 1.3625L7.225 0.6625C7.41667 0.470833 7.65217 0.375 7.9315 0.375C8.21083 0.375 8.44617 0.470833 8.6375 0.6625L9.3375 1.3625C9.52917 1.55417 9.62917 1.7855 9.6375 2.0565C9.64583 2.3275 9.55417 2.55867 9.3625 2.75L8.65 3.4625ZM7.925 4.2L2.625 9.5H0.5V7.375L5.8 2.075L7.925 4.2Z"/>
                            </svg>
                            
                    </button>
                </div>
                
                <div class="dropdown-header px-4 py-3" @click="toggleDropdown">
                  <div class="radio-container">
                    <input type="checkbox" :checked="isCheckedAll && isAllCheckboxesSelected" class="switch" @click.stop="toggleAllCheckboxes" />
                  </div>
                  <div class="text-container text-left text-[#f2f2f7]">{{ object.name }}</div>
                  <div class="arrow-container">
                    <span class="arrow"></span>
                  </div>
                </div>
                <ul class="dropdown-list h-[0px] opacity-0 duration-150 hidden flex flex-col justify-center">
                  <div class="max-h-[150px] overflow-x-hidden overflow-y-scroll mr-[10px] flex flex-col gap-3 py-3">
                    <div v-for="tag in object.tags.split(',')" :key="tag" class="flex flex-col justify-between gap-3 px-4 text-[#f2f2f7] items-center cursor-pointer w-full">
                      <div class="flex gap-3 text-[#f2f2f7] items-center cursor-pointer w-full">
                        <div class="flex justify-start gap-4 w-full">
                          <input type="checkbox" :checked="isCheckedValue(tag)" :data-tag="tag" :id="'checkbox-' + tag" class="w-[16px] h-[16px] bg-transparent tag-checkbox" @change="handleCheckboxClick(tag); checkAllCheckboxesSelected()">
                          <span class="text-[14px]">{{ tag }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
              
          <button class="w-full px-4 py-3 flex items-center justify-center border-dashed border-[2px] border-[#838383] rounded-[4px] max-h-[48px] duration-150" id="addedPosition" @click="isModalOpen = true; $refs.modalAddPosition.openModal()">
            <span class="text-2xl duration-150">+</span>
          </button>
        </div>
        </div>
        <div>
          <button class="w-full bg-[#C58BC5] font-light text-md rounded-[4px] text-[#f2f2f7] p-3 hover:bg-[#885886] duration-150 shadow-[#C58BC5]" id="addFilter">Применить фильтрацию</button>
        </div>
        </div>
        <div class="w-1/2">
          <!-- Здесь будет цикл для добавления значений -->
        </div>
        <div class="w-1/4 ">
          <div class="bg-[#0F0E0F] border border-gray-500 rounded-lg"></div>
        </div>

       
            
        
      </div>
    </div>
  </div>
</template>

<script>

import ModalAddPosition from "@/components/ModalAddPosition.vue";
import EditModalPosition from "@/components/EditModalPosition.vue";
import axios from 'axios';

export default {
    components: {
    ModalAddPosition,
    EditModalPosition
  },
  data() {
    return {
      user: '',
      isOpen: false,
      isModalOpen: false, 
      isEditModalOpen: false,
      tags: [],
      objects: [], 
      isCheckedAll: false,
      isAllCheckboxesSelected: false,
      filter: [], 
      selectedObject: null
    };
  },
  created() {
    const user_id = this.$route.params.user_id;

    if (user_id) {
      this.getUserData(user_id);
    }
  },
  watch: {
    objects: {
      deep: true,
      handler(newObjects) {
        console.log(newObjects); // Вывод измененных данных массива objects в консоль
      }
    }
  },
  mounted() {
    this.fetchObjects(); // Вызов метода для получения записей при монтировании компонента
    console.log(this.objects);
  },
  methods: {
    checkAllCheckboxesSelected() {
  const dropdownList = document.querySelector('.dropdown-list');
  const tags = dropdownList.querySelectorAll('.tag-checkbox');
  const allSelected = Array.from(tags).every(tag => tag.checked);

  this.isAllCheckboxesSelected = allSelected;
},
    isCheckedValue(tag) {
        return this.filter.includes(tag);
        },
        toggleAllCheckboxes() {
    const dropdownList = document.querySelector('.dropdown-list');
    const tags = dropdownList.querySelectorAll('.tag-checkbox');
    const selectedTags = Array.from(tags).map(tag => tag.getAttribute('data-tag'));
    const checkedCount = selectedTags.filter(tag => this.filter.includes(tag)).length;

    if (checkedCount === selectedTags.length) {
        // Если все значения уже выбраны, снимаем выделение со всех значений
        this.filter = [];
        this.isCheckedAll = false;
    } else {
        // Если не все значения выбраны, выделяем все значения
        this.filter = selectedTags;
        this.isCheckedAll = true;
    }

    console.log(this.filter); // Вывод массива filter в консоль после каждого изменения
    },
    handleCheckboxClick(tag) {
      const index = this.filter.indexOf(tag);

      if (index === -1) {
        this.filter.push(tag); // Добавление значения в массив, если оно не содержится
      } else {
        this.filter.splice(index, 1); // Удаление значения из массива, если оно уже присутствует
      }

      console.log(this.filter); // Вывод массива filter в консоль после каждого изменения

      // Проверка, если все чекбоксы выделены, установить isCheckedAll в true, иначе в false
      const dropdownList = document.querySelector('.dropdown-list');
      const tags = dropdownList.querySelectorAll('.tag-checkbox');
      const selectedTags = Array.from(tags).every(tag => tag.checked);

      this.isCheckedAll = selectedTags;
    },
    selectObject(id) {
    this.selectedObjectId = id;
  },
  fetchObjects() {
  axios
    .get('http://localhost:3000/api/objects')
    .then(response => {
      this.objects = response.data;
      this.objects.forEach(object => {
        object.selectedObjectId = object.id;
      });
    })
    .catch(error => {
      console.error('Error fetching objects:', error);
    });
},
    openEditModal(id) {
        this.selectedObject = this.objects.find(object => object.id === selectedObjectId);

        if (this.selectedObject) {
            this.$refs.EditModalPosition.openModal();
        } else {
            console.error('Object with selectedObjectId not found');
        }
    },
    closeEditModal() {
      this.selectedObjectId = null;
    },
    openModal() {
        this.isModalOpen = true;
        this.$refs.modalAddPosition.openModal();
      },
    resetTags() {
      this.tags = [];
      this.isModalOpen = false;
    },  
    selectValue(value) {
      this.radioValue = event.target.checked;
    },
    handleChange(event) {
      this.radioValue = event.target.checked;
    },
    toggleDropdown() {
      // this.isChecked = !this.isChecked;
      const dropdownList = document.querySelector('.dropdown-list');
      if (dropdownList.classList.contains('h-[0px]')) {
        dropdownList.classList.remove('hidden');
        setTimeout(() => {
          dropdownList.classList.remove('h-[0px]', 'opacity-0');
          dropdownList.classList.add('h-[166px]', 'opacity-1');
        }, 2); // Задержка в 300 мс (длительность анимации)
        // Открытие dropdown
        
       
      } else {
        // Закрытие dropdown
        dropdownList.classList.remove('h-[166px]', 'opacity-1');
        dropdownList.classList.add('opacity-0', 'h-[0px]');

        // Добавление display: none через задержку
        setTimeout(() => {
          dropdownList.classList.add('hidden');
        }, 300); // Задержка в 300 мс (длительность анимации)
      }
    },
    selectOffice(office) {
      this.selectedOffice = office.name;
      this.isOpen = false;
    },
    async getUserData(user_id) {
      try {
        const response = await fetch(`http://localhost:3000/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id })
        });

        const data = await response.json();

        if (response.ok && data.name) {
          this.user = data.name;
        } else {
          console.log('Не удалось получить данные пользователя');
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
      }
    },
    onTransitionEnd() {
      if (!this.isOpen) {
        this.$refs.dropdownOptions.style.height = '0';
      }
    }, 
    
},
};
</script>

<style scoped>
.dropdown {
 
  background-color: rgb(15, 14, 15, 70%) ;
  border: 1px solid rgba(131, 131, 131, 30%);
  border-radius: 4px;
  position: relative;
}

.delObject:hover .svg{
    stroke: #f2f2f7;
}

.dropdown-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-container {
  width: 15%;
  display: flex;
  align-items: center;
}

.text-container {
  width: 80%;
}

.arrow-container {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow {
  display: block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #C58BC5;
  transition: transform 0.3s;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: rgb(15, 14, 15, 70%) ;
  border-top: 1px solid rgba(131, 131, 131, 30%);
  overflow: hidden;
  transition: opacity 0.3s, height 0.3s;

}

.dropdown-list.dropdown-open{
  opacity: 1;
  height: 166px;
}

.dropdown-list li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.dropdown-open {
  animation: dropdownOpenAnimation 0.3s forwards;
}

@keyframes dropdownOpenAnimation {
  0% {
    height: 0;
  }
  100% {
    height: 166px;
  }
}

@supports(-webkit-appearance: none) or (-moz-appearance: none) {
  input[type='checkbox'],
  input[type='radio'] {
    --active: #C58BC5;
    --active-inner: #fff;
    --focus: 2px rgba(197, 137  , 197, .3);
    --border: #C58BC5;
    --border-hover: #C58BC5;
    --background: transparent;
    --disabled: #F6F8FF;
    --disabled-inner: #E1E6F9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 2px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background .3s, border-color .3s, box-shadow .2s;
    &:after {
      content: '';
      display: block;
      left: -1px;
      top: -1px;
      position: absolute;
      transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
    }
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: .9;
      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      & + label {
        cursor: not-allowed;
      }
    }
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }
    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
      width: 21px;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    & + label {
      font-size: 14px;
      line-height: 21px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin-left: 4px;
    }
  }
  input[type='checkbox'] {
    &:not(.switch) {
      border-radius: 7px;
      &:after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 7px;
        top: 4px;
        transform: rotate(var(--r, 20deg));
      }
      &:checked {
        --r: 43deg;
      }
    }
    &.switch {
      width: 38px;
      border-radius: 11px;
      &:after {
        left: 1px;
        top: 1px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background: var(--ab, var(--border));
        transform: translateX(var(--x, 0));
      }
      &:checked {
        --ab: var(--active-inner);
        --x: 17px;
      }
      &:disabled {
        &:not(:checked) {
          &:after {
            opacity: .6;
          }
        }
      }
    }
  }
  input[type='radio'] {
    border-radius: 50%;
    &:after {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      transform: scale(var(--s, .7));
    }
    &:checked {
      --s: .5;
    }
  }
}

#buttonEditObject:hover {
    box-shadow: 0px 0px 10px 0px rgba(200, 137, 198, 0.25);
  }
  
  #buttonEditObject:hover svg {
    stroke: #f2f2f7;
  }

  
#addedPosition {
  opacity: 0.5;
}
#addedPosition span {
color: #838383;
}

#addedPosition:hover {
  border: dashed 2px #C58BC5;
  opacity: 1;
  box-shadow: 0px 0px 10px 0px rgba(200, 137, 198, 0.25);
}

#addedPosition:hover span {
  color: #C58BC5;
  
}

/* Общие стили полосы прокрутки */
::-webkit-scrollbar {
  width: 8px; /* Ширина полосы прокрутки */
  margin-right: 10px !important;
}

/* Фон полосы прокрутки */
::-webkit-scrollbar-track {
  background-color: rgba(50, 50, 50, 0.7);
  border-radius: 15px; /* Закругление краёв */
}

/* Стили активной области полосы прокрутки */
::-webkit-scrollbar-thumb {
  background-color: #0F0F0F;
  border-radius: 15px; /* Закругление краёв */
  border: 0.3px solid #838383; /* Граница */
}

/* Стили при наведении на полосу прокрутки */
::-webkit-scrollbar-thumb:hover {
  background-color: #0F0F0F;
}


@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s forwards;
}

  /* #modal > div {
    transform: translateY(100%);
  } */

.translate-y-0 {
  transform: translateY(0) !important;
}

.modal-conteiner {
    background-color: rgb(15, 14, 15, 70%) ;
    border: 1px solid rgba(131, 131, 131, 30%);
    border-radius: 14px;
}

#buttonCloseModal:hover {
    box-shadow: 0px 0px 10px 0px rgba(200, 137, 198, 0.25);
}
#buttonCloseModal:hover svg {
    stroke: #f2f2f7
}
</style>