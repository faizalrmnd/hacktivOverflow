import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      password: '',
      role: ''
    },
    questionList: [],
    answer: {}
  },
  mutations: {
    setUser: function (state, payload) {
      state.user.username = payload.username
      Vue.set(state.user, 'password', payload.password)
      // state.role = Object.assign({}, state.role, payload.role)
      state.user.role = payload.role
    },
    setQuestion: function (state, payload) {
      state.questionList = payload
    },
    setAnswer: function (state, payload) {
      state.questionList.forEach(question => {
        if (question._id === payload) {
          state.answer = question
        }
      })
    }
  },
  actions: {
    register: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.134.112/register', {
          email: payload.email,
          password: payload.password
        })
          .then(function (response) {
            context.commit('setUser', payload)
            localStorage.setItem('token', response.data.token)
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    login: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.134.112/login', {
          email: payload.email,
          password: payload.password
        })
          .then(function (response) {
            // context.commit('setUser', response.data.user)
            localStorage.setItem('token', response.data.token)
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    getQuestion: function (context, payload) {
      axios
        .get('http://35.197.134.112/question', { headers: { token: payload } })
        .then(response => {
        // If request is good...
        // console.log(response.data.data.todo)
          // console.log(JSON.stringify(response.data.data))
          context.commit('setQuestion', response.data.data)
        })
        .catch((error) => {
          console.log('error 3 ' + error)
        })
    },
    updateQuestion: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://35.197.134.112/question', { headers: { token: payload } })
          .then(response => {
            // If request is good...
            // console.log(response.data.data.todo)
          // console.log(JSON.stringify(response.data.data))
            context.commit('setQuestion', response.data.data)
            resolve()
          })
          .catch((error) => {
            console.log('error 3 ' + error)
            reject(error)
          })
      })
    },
    getAnswer: function (context, payload) {
      context.commit('setAnswer', payload)
    },
    addQuestion: function (context, payload) {
      let token = localStorage.getItem('token')

      axios.post('http://35.197.134.112/question/post', {
        title: payload.title,
        question: payload.question
      }, { headers: { token: token } })
        .then(function (response) {
          axios
            .get('http://35.197.134.112/question', { headers: { token: token } })
            .then(response => {
            // If request is good...
            // console.log(response.data.data.todo)
              // console.log(JSON.stringify(response.data.data))
              context.commit('setQuestion', response.data.data)
            })
            .catch((error) => {
              console.log('error 3 ' + error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    oAuth: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://35.197.134.112/oauth', {
          email: payload,
          password: 'gmail'
        })
          .then(function (response) {
            // context.commit('setUser', response.data.user)
            localStorage.setItem('token', response.data.token)
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    }
  }
})
