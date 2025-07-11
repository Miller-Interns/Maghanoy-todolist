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
      id="todo"
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
        class="item-input"
       
      />
      
    </div>
  </div>
       </div>
      </div>
      </div>
 
  </main>
</template>




<script setup lang="ts">
import {ref, nextTick} from 'vue'
import count from '../components/category-button.vue'
import addIcon from '../components/icons/add-icon.vue'

//for the detailed category box
const showPerCategory=ref(false)
const toggleCategory=()=>{
    showPerCategory.value=!showPerCategory.value
}

//for the items
const items = ref<string[]>(['']) // Initial list
const taskInputs = ref<HTMLInputElement[]>([])



// Handle Enter key press
const handleEnter = (index: number) => {
  const trimmed = items.value[index].trim()

  if (trimmed === '') {
    // Remove empty item at any index (except last empty one)
    if (index !== items.value.length - 1) {
      items.value.splice(index, 1)
    }
  } else if (index === items.value.length - 1) {
    // Add a new input only at the end
    items.value.push('')
  }
}

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
