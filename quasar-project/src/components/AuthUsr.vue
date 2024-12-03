<template>
    <div>
      <div v-if="!isLoggedIn">
        <h2>Регистрация</h2>
        <div class="input">
          <input v-model="registerUsername" placeholder="Username">
          <input v-model="registerPassword" type="password" placeholder="Password">
        </div>
        
        <div >
            <button class="register" @click="register">Зарегистрироваться</button>
            <p class="error" v-if="regError">{{ regError }}</p>
        </div>
        
  
        <h2>Вход</h2>
        <div class="input">
          <input v-model="loginUsername" placeholder="Username">
          <input v-model="loginPassword" type="password" placeholder="Password">
        </div>
        
        <div >
            <button class="login" @click="login">Войти</button>
        </div>
        <p class="error" v-if="authError">{{ authError }}</p>
      </div>

    <div v-else>
      <component :is="showGame ? 'BoardGame' : null" :game-status="gameStatus" @exit="getLeaderboard (); getUserRecord(); showLeaderboard = true; isLoggedIn = true; showGame = false" ref="gameComponent"/>
      <div  v-if="showLeaderboard">
        <h2>Таблица лидеров</h2>
      <div class="leaderboard">
        <p class="record">Ваш рекорд: {{ userRecord }}</p>
      </div>
        
        <ul>
          <li v-for="(user, index) in leaderboard" :key="user.username">
            {{ index + 1 }}. {{ user.username }} - {{ user.record }}
          </li>
        </ul>
        <div class="btnplay"> 
          <button @click="showLeaderboard = false; showGame = true">Играть</button>
          <button @click="logout">Выйти</button>
        </div>
        
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import BoardGame from '/src/components/BoardGame.vue'

  export default {
    data() {
      return {
        registerUsername: '',
        registerPassword: '',
        loginUsername: '',
        loginPassword: '',
        authError: null,
        regError: null,
        isLoggedIn: false,
        leaderboard: [],
        userRecord: null,
        newRecord: 0,
        updateError: null,
        updateMessage: null,
        showGame: false, 
        showLeaderboard: false,
        gameStatus: 'NONE',
      };
    },

    components: {
    BoardGame,
    },
    methods: {
    getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    },
    async register() {
      try {
        const csrftoken = this.getCookie('csrftoken');
        const response = await axios.post('http://localhost:8000/api/create_user/', { username: this.registerUsername, password: this.registerPassword }, {
          headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
          }
        });
        console.log('Регистрация успешна:', response.data);
        this.regError = null;
        this.loginUsername = this.registerUsername;
        
      } catch (error) {
        this.regError = 'Пользователь с таким именем уже существует';
        
      }
    },
    async login() {
      try {
        const csrftoken = this.getCookie('csrftoken');
        const response = await axios.post('http://localhost:8000/api/login_user/', { username: this.loginUsername, password: this.loginPassword }, {
          headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
          }
        });
        console.log('Вход успешен:', response.data);
        this.authError = null;
        this.isLoggedIn = true;
        localStorage.setItem('username', this.loginUsername);
        await this.getUserRecord(); 
        await this.getLeaderboard(); 
        this.showLeaderboard = true;
      } catch (error) {
        this.authError = 'Неверное имя пользователя или пароль';
        console.error('Ошибка входа:', error);
      }
    },

    async logout() {
        this.isLoggedIn=false
    },
    async getLeaderboard() {
      try {
        const response = await axios.get('http://localhost:8000/api/get_top/');
        this.leaderboard = response.data;
      } catch (error) {
        console.error('Ошибка загрузки таблицы лидеров:', error);
      }
    },
    async getUserRecord() {
      try {
        const response = await axios.get('http://localhost:8000/api/get_user_record/?username=' + this.loginUsername);
        this.userRecord = response.data;
      } catch (error) {
        console.error('Ошибка получения рекорда пользователя:', error);
      }
    },
      
    },
  };
  </script>

  <style scoped>

    input {
    margin-bottom: 10px; 
    margin-left: 20px;
    padding: 8px; 
    border: 1px solid #ccc; 
    border-radius: 3px; 
    
    box-sizing: border-box; 
    }

    
    button  {
      background-color: #42b983cc;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 5px 40px;
        margin: 10px 0;
        cursor: pointer;
        outline: none;
    }

 
    button:hover{
        background-color: #42b983;
    }

    button:disabled{
        opacity: .5;
    }

    h2{
      font-size: 40px;
    }
    
    .error {
        margin-top: 23px;
        color: red;
    }

    .record{
      font-size: large;
     
    }
    .leaderboard{
      display: flex;
      justify-content: center;
    }


    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
        text-align: left; 
        display: inline-block; 
        width: auto;
        margin: 20px auto;
        font-size: larger;
    }

    
    .btnplay {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btnplay button {
      margin-right: 10px;
    }

    li{
        text-align: left;
    }
  </style>