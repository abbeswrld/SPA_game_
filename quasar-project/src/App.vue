<template>
  <div class="app">
    <h1 class="h1">Echoes of the Grid</h1>
    

    <div id="app">
    <AuthUsr v-if="!showGame"/>
    <BoardGame v-if="showGame"/>
  </div>
  </div>
</template>

<script>
import BoardGame from './components/BoardGame.vue';
import AuthUsr from './components/AuthUsr.vue';

export default {
  name: 'App',
  components: {
    BoardGame,
    AuthUsr
  },
  data() {
    return {
      showGame: false // Initially show the login/registration component
    };
  },
  mounted() {
      // Проверка авторизации (например, наличие токена в localStorage)
      const token = localStorage.getItem('token');
      this.showGame = !!token; // Устанавливаем showGame в true, если есть токен
  }
};
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
