<template>
  <div>
    <div v-if="!isLoggedIn">
      <!-- ... (Форма регистрации и входа) ... -->
    </div>

    <div v-else>
      <component :is="showGame ? 'BoardGame' : null" :game-status="gameStatus" @exit="showLeaderboard = true; showGame = false" ref="gameComponent"/>
      <div v-if="showLeaderboard">
        <h2>Таблица лидеров</h2>
        <p>Ваш рекорд: {{ userRecord }}</p>
        <ul>
          <li v-for="(user, index) in leaderboard" :key="user.username">
            {{ index + 1 }}. {{ user.username }} - {{ user.record }}
          </li>
        </ul>
        <div> 
          <button @click="showLeaderboard = false; showGame = true">Играть</button>
          <button @click="logout">Выйти из аккаунта</button>
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
        const response = await axios.post('/api/create_user/', { username: this.registerUsername, password: this.registerPassword }, {
          headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
          }
        });
        console.log('Регистрация успешна:', response.data);
        this.authError = null;
        this.loginUsername = this.registerUsername;
        this.login();
      } catch (error) {
        this.authError = error.response?.data?.detail || error.message;
        console.error('Ошибка регистрации:', error);
      }
    },
    async login() {
      try {
        const csrftoken = this.getCookie('csrftoken');
        const response = await axios.post('/api/login_user/', { username: this.loginUsername, password: this.loginPassword }, {
          headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
          }
        });
        console.log('Вход успешен:', response.data);
        this.authError = null;
        this.isLoggedIn = true;
        await this.getUserRecord(); // Ждем завершения getUserRecord
        await this.getLeaderboard(); // Ждем завершения getLeaderboard
        this.showLeaderboard = true;
      } catch (error) {
        this.authError = error.response?.data?.message || error.message;
        console.error('Ошибка входа:', error);
      }
    },

    async logout() {
        this.isLoggedIn=false
    },
    async getLeaderboard() {
      try {
        const response = await axios.get('/api/get_top/');
        this.leaderboard = response.data;
      } catch (error) {
        console.error('Ошибка загрузки таблицы лидеров:', error);
      }
    },
    async getUserRecord() {
      try {
        const response = await axios.get('/api/get_user_record/?username=' + this.loginUsername);
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
    margin-bottom: 10px; /* Отступ снизу */
    margin-left: 20px;
    padding: 8px; /* Добавьте внутренний отступ */
    border: 1px solid #ccc; /* Добавьте границу */
    border-radius: 3px; /* Скругленные углы */
    
    box-sizing: border-box; /* Чтобы padding не увеличивал общую ширину */
    }


    button.register, button.login {
    display: inline-block; /* Важно! Изменено на inline-block */
    margin: 10px 5px; /* Отступ сверху, снизу и по бокам */
    width: 100px; /* Задайте нужную ширину */
    }

    .error {
        margin-top: 23px;
    }

    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
        text-align: left; 
        display: inline-block; 
        width: auto;
        margin: 20px auto;
    }

    li{
        text-align: left;
    }
  </style>