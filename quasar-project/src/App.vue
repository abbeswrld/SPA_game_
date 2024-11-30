<template>
  <div class="app">
    
    <h1 class="h1">Remember me</h1>
    <p>A simple game</p>


    <Board></Board>
  </div>
</template>

<script>
import Board from './components/BoardGame.vue'

export default {
  name: 'App',
  components: {
    Board,
  }
}
</script>

<style scoped>
 .app{
  font-family: mine;
  text-align: center;
  margin-top: 40px;
 }
 .logo{
  width: 200px;
 }

 @font-face {
    font-family: "mine";
    src: url("assets/minecraft.ttf") format("truetype");
    font-style: normal;
    font-weight: normal;
} 
</style>
