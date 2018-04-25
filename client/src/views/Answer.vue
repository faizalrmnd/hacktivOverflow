<template>
  <div>
    {{ answer }}
    <div class="card">
      <h5 class="card-header">{{ answer.title }}</h5>
      <div class="card-body">
        <h5 class="card-title">{{ answer.question }}</h5>
        <p class="card-text">{{ answer.user.username }}</p>
      </div>
    </div>
    <br>
    <h3>Answers:</h3>
    <div v-for="(jawaban, index) in answer.answer" v-bind:key='index' class="card">
      <div class="card-body">
        <h4 class="card-title">{{ jawaban.answer }}</h4>
        <p class="card-text">By: {{ jawaban.user.username }}</p>
      </div>
    </div>
    <h3>Post Answer:</h3>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Answer</label>
      <textarea class="form-control" v-model="answerpost" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <a href="#" @click="postAnswer(answer._id)" class="btn btn-primary">Post</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'answer',
  computed: {
    ...mapState(['answer'])
  },
  data () {
    return {
      answerpost: ''
    }
  },
  methods: {
    postAnswer: function (questionId) {
      let token = localStorage.getItem('token')

      axios.post('http://localhost:3000/answer/post', {
        questionId: questionId,
        answer: this.answerpost
      }, { headers: { token: token } })
        .then(function (response) {
          // context.commit('setUser', response.data.user)
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>

<style>

</style>
