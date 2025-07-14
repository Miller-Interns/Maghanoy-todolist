
<template>
  <main class="app-container">
    <!-- <hi> Maryne R. Maghanoy</hi>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
      <nav class="nav">
        <RouterLink to="/TODOLISTS">Go to App</RouterLink>
        <RouterLink to="/TRAINEE">Trainee's info</RouterLink>
      </nav>

  <RouterView />
    </main>  
    
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
.app-container{
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: pink;
  margin: 0;
  padding: 0;
}
.nav{
  margin-top:0 ;

}
</style>
