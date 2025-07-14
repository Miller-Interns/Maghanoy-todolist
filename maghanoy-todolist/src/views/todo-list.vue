<template>
  <main class="TODOLIST">
    <h1>Welcome!</h1>
    <div class="CATEGORIES-CONTAINER">

      
      <!-- Section to Show Category Count and Add Button -->
      <div class="ALLCATEGORY">
        <h5>CATEGORIES ({{ taskList.length }})</h5>
        <button @click='toggleCategoryForm' class='ADDBUTTON'>
          <!-- Add Icon SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>

      <!-- Form for Adding a New Category (v-if) -->
      <div v-if='showPerCategory' class='PERCATEGORY'>
        <div class="INPUTCONTAINER">
          <input 
            type="text"
            v-model="newCategory.title"
            placeholder="CATEGORY TITLE"
            class="header-input"
          />
          <div class="item-list">
            <div v-for="(item, index) in newCategory.items" :key="index" class="item-row">
              <input
                v-model="newCategory.items[index]"
                @keydown.enter.prevent="handleEnter"
                class="item-input"
                placeholder="New item"
              />
            </div>
          </div>
        </div>
        <div class="button-group">
          <button @click="saveCategory" class="action-button save-button">Save</button>
          <button @click="showPerCategory = false" class="action-button cancel-button">Cancel</button>
        </div>
      </div>

      <!-- Display Saved Categories -->
      <div class='showCategory' v-if="taskList.length > 0">
        <div v-for="(task, index) in taskList" :key="task.id" class="category-preview">
          
          <!-- Editing View (v-if) -->
          <div v-if="editingTaskId === task.id">
            <input v-model="editableTask.title" class="header-input-edit" />
            <div v-for="(item, itemIndex) in editableTask.items" :key="itemIndex" class="item-row">
              <input v-model="editableTask.items[itemIndex]" class="item-input-edit" />
            </div>
            <div class="icon-buttons">
              <button @click="saveEdit(index)">
                <!-- Save Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              </button>
              <button @click="cancelEdit">
                 <!-- Cancel/Close Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          <!-- Default Display View (v-else) -->
          <div v-else>
            <h3>{{ task.title }}</h3>
            <ul>
              <li v-for="(item, itemIndex) in task.items" :key="itemIndex">
                {{ item }}
              </li>
            </ul>
            <div class="icon-buttons">
              <button @click="startEdit(task)">
                <!-- Edit Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button @click="deleteTask(index)">
                <!-- Delete Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, nextTick } from 'vue';

// --- Type Definition ---
interface Task {
  id: number;
  title: string;
  items: string[];
}

// --- State ---
const showPerCategory = ref(false);
const taskList = ref<Task[]>([]);
const newCategory = reactive({ title: '', items: [''] });

const editingTaskId = ref<number | null>(null);
let editableTask = reactive<Task>({ id: 0, title: '', items: [] });

// --- Functions for Adding Categories ---
const toggleCategoryForm = () => {
  showPerCategory.value = !showPerCategory.value;
  cancelEdit(); // Close any open edit forms
}

const handleEnter = () => {
  if (newCategory.items[newCategory.items.length - 1].trim() !== '') {
    newCategory.items.push('');
    nextTick(() => {
      const inputs = document.querySelectorAll<HTMLInputElement>('.PERCATEGORY .item-input');
      inputs[inputs.length - 1]?.focus();
    });
  }
}

const saveCategory = () => {
  if (newCategory.title.trim()) {
    const newTask: Task = {
      id: Date.now(),
      title: newCategory.title,
      items: newCategory.items.filter(item => item.trim())
    };
    taskList.value.push(newTask);
    
    // Reset form and hide it
    newCategory.title = '';
    newCategory.items = [''];
    showPerCategory.value = false;
  }
}

// --- Functions for Editing and Deleting ---
const deleteTask = (index: number) => {
  taskList.value.splice(index, 1);
}

const startEdit = (task: Task) => {
  editingTaskId.value = task.id;
  // Deep copy the task to avoid modifying the original until save
  Object.assign(editableTask, JSON.parse(JSON.stringify(task)));
  showPerCategory.value = false; // Close add form if open
}

const saveEdit = (index: number) => {
  if (editableTask.title.trim()) {
      taskList.value[index] = { ...editableTask, items: editableTask.items.filter(i => i.trim()) };
      cancelEdit();
  }
}

const cancelEdit = () => {
    editingTaskId.value = null;
}

// --- Persistence (LocalStorage) ---
watch(taskList, (newTaskList) => {
  localStorage.setItem('taskList', JSON.stringify(newTaskList));
}, { deep: true });

onMounted(() => {
  const savedTasks = localStorage.getItem('taskList');
  if (savedTasks) {
    taskList.value = JSON.parse(savedTasks);
  }
});
</script>

<style>
/* --- Global Styles --- */
.TODOLIST {
  min-height: 100vh; /* Changed to min-height */
  width: 100%;
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  background-color: #567257;
  padding-bottom: 50px; /* Add padding at the bottom */
}

.CATEGORIES-CONTAINER {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  margin-top: 20px;
  gap: 20px;
}

/* --- Section Headers --- */
.ALLCATEGORY {
  position: relative;
  border: 3px solid black;
  border-radius: 10px;
  padding: 10px;
  background-color: #483c32;
  box-shadow: 10px 10px 5px #3a2f27;
  color: white;
}

h5 {
  margin: 0;
  font-size: 1.2em;
}

/* --- Category Form --- */
.PERCATEGORY {
  border: 3px solid black;
  border-radius: 10px;
  padding: 15px;
  background-color: #483c32;
  box-shadow: 10px 10px 5px #3a2f27;
}

.header-input, .item-input {
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  width: 100%;
  padding: 8px 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  border-bottom: 1px solid #896A58;
}
.header-input { font-size: 22px; margin-bottom: 15px; }
.item-input { font-size: 18px; margin-top: 10px; }

/* --- Displayed Categories --- */
.showCategory {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-preview {
  position: relative;
  border: 3px solid black;
  border-radius: 10px;
  padding: 15px;
  background-color: #483c32;
  box-shadow: 5px 5px 3px #3a2f27;
}

.category-preview h3 {
  margin-top: 0;
  border-bottom: 1px solid #567257;
  padding-bottom: 10px;
}
.category-preview ul { padding-left: 20px; margin-bottom: 5px; }
.category-preview li { margin-bottom: 5px; }


/* --- Edit View --- */
.header-input-edit, .item-input-edit {
    width: calc(100% - 12px); /* Adjust for padding */
    background: #5a4a3e;
    color: white;
    border: 1px solid #896A58;
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 8px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.header-input-edit { font-size: 1.17em; font-weight: bold; }
.item-input-edit { font-size: 1em; }


/* --- Buttons --- */
.ADDBUTTON {
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 40px;
  height: 40px;
  padding: 5px;
  border: none;
  background: none;
  cursor: pointer;
  color: white;
}

.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.action-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
}
.save-button { background-color: #567257; }
.cancel-button { background-color: #a96653; }


.icon-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
}

.icon-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 3px;
}
.icon-buttons svg {
  width: 20px;
  height: 20px;
}

</style>