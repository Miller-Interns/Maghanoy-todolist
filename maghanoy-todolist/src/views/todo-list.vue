<template>
  <main class="TODOLIST">
    
    <h1>Welcome!</h1>
    <div class="CATEGORIES-CONTAINER">
      <div class="ALLCATEGORY">
        <h5>SHOW category here <span v-html="count"></span></h5>
        <button @click='toggleCategory' class='ADDBUTTON'> <addIcon/></button>
      </div>

      <div v-if='showPerCategory' class='PERCATEGORY'>
    <div class="INPUTCONTAINER">
    <input type="text"
      id="title[]"
      placeholder="TITLE"
      class="header-input"></input>
      
      <div class="item-list">
        <div
      v-for="(item, index) in items"
      :key="index"
      class="item-row">

      <input
        v-model="items[index]"
        @keydown.enter="handleEnter(index)"
        class="item-input"/>
            </div>
          </div>
        </div>
        <button @click="saveCategory" class="save-button">Save Category</button>
      </div>

      <div class='showCategory' v-if="taskList.length > 0">
        <div v-for="(task, index) in taskList" :key="index" class="category-preview">
          <h3>{{ task.title }}</h3>
          <ul>
            <li v-for="(item, itemIndex) in task.items" :key="itemIndex">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>




<script setup lang="ts">
import {ref} from 'vue'
import count from '../components/category-button.vue'
import addIcon from '../components/icons/add-icon.vue'
import editIcon from '../components/icons/edit-icon.vue'
import saveIcon from '../components/icons/save-icon.vue'
import deleteIcon from '../components/icons/delete-icon.vue'

//for the detailed category box
const showPerCategory=ref(false);
const currentTitle = ref('')
const items = ref([''])
const taskList = ref<Task[]>([])

const toggleCategory=()=>{
    showPerCategory.value=!showPerCategory.value
}
type Task = {
  title: string;
  items: string[];
}


// Handle enter key press
const handleEnter = (index: number) => {
  items.value.push('')
}

// Save category
const saveCategory = () => {
  if (currentTitle.value.trim()) {
    const newTask: Task = {
      title: currentTitle.value,
      items: items.value.filter(item => item.trim())
    }
    taskList.value.push(newTask)
    currentTitle.value = ''
    items.value = ['']
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
    showPerCategory.value = false
  }
}

// Load saved tasks on mount
const loadSavedTasks = () => {
  const savedTasks = localStorage.getItem('taskList')
  if (savedTasks) {
    taskList.value = JSON.parse(savedTasks)
  }
}

// Load saved tasks when component mounts
loadSavedTasks()
</script>
</script>

<style>
.TODOLIST {
  height: 100%;
  width: 100%;
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  background-color: #567257;
}

.CATEGORIES-CONTAINER {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 20px;
  gap: 20px;
}

.ALLCATEGORY{
  flex: 1;
  position: relative;
  border: 3px solid black;
  border-radius: 10px;
  padding: 10px;
  background-color: #483c32;
  box-shadow: 10px 10px 5px #645452;
  color: white;
  box-sizing: relative;
  
}

.PERCATEGORY {
  flex: 1;
  position: relative;
  border: 3px solid black;
  border-radius: 10px;
  padding: 10px;
  background-color: #483c32;
  box-shadow: 10px 10px 5px #645452;
  color: white;
  box-sizing: border-box;
  
}

.showCategory{
    flex: 1;
  position: relative;
  border: 3px solid black;
  border-radius: 10px;
  padding: 10px;
  background-color: #483c32;
  box-shadow: 10px 10px 5px #645452;
  color: white;
  box-sizing: border-box;
  
}

.ADDBUTTON{
  position: absolute;
  bottom: 1px; /* 🔻 Space from the bottom */
  right: 10px;  /* 🔻 Space from the right */
  width: 40px;
  height: 40px;
  padding: 5px;
  border: none;
  background: none;

  cursor: pointer;
}

.header-input{
  border: none;
  border-bottom: 1px solid #896A58; /* Optional: just a bottom line */
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #fff; /* or black if on light background */
  padding: 5px 0;
  width: 100%;
  font-size: 25px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.item-input{
  margin-top: 20px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #fff; /* or black if on light background */
  padding: 5px 0;
  width: 100%;
  font-size: 25px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}





</style>
