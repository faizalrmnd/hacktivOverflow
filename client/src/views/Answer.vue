<template>
  <div>
    <!-- {{ answer }} -->
    <navbar/>
    <center>
      <div class="card">
        <h5 class="card-header">{{ answer.title }}</h5>
        <div class="card-body">
          <h5 class="card-title">{{ answer.question }}</h5>
          <p class="card-text">{{ answer.user.email }}</p>
          <button @click="vote(answer._id, 'plus')" type="button" class="btn btn-primary">
            upvote 
          </button>
          {{ answer.upvote.length - answer.downvote.length }}
          <button @click="vote(answer._id, 'minus')" type="button" class="btn btn-primary">
            downvote 
          </button>
        </div>
      </div>
    </center>
    <br>
    <h3>Answers:</h3>
    <center>
    <div v-for="(jawaban, index) in answer.answer" v-bind:key='index' class="card">
      <div class="card-body">
        <h4 class="card-title">{{ jawaban.answer }}</h4>
        <p class="card-text">By: {{ jawaban.user.email }}</p>

          <button @click="answerVote(jawaban._id, 'plus')" type="button" class="btn btn-primary">
            upvote 
          </button>
          {{ jawaban.upvote.length - jawaban.downvote.length }}
          <button @click="answerVote(jawaban._id, 'minus')" type="button" class="btn btn-primary">
            downvote 
          </button>

      </div>
    </div>
    <h3>Post Your Answer:</h3>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Answer</label>
      <textarea class="form-control" v-model="answerpost" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <a href="#" @click="postAnswer(answer._id)" class="btn btn-primary">Post</a>
    </center>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
import { mapState } from 'vuex'
import axios from 'axios'
import { setTimeout } from 'timers'

export default {
  name: 'answer',
  components: {
    navbar
  },
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
      let self = this

      axios.post('http://35.197.134.112/answer/post', {
        questionId: questionId,
        answer: this.answerpost
      }, { headers: { token: token } })
        .then(function (response) {
          self.$store.dispatch('updateQuestion', token)
          .then((updated) => {
            self.$store.dispatch('getAnswer', self.$store.state.answer._id)
          })

          // setTimeout(function () {
          //   self.$store.dispatch('getAnswer', self.$store.state.answer._id)
          // }, 1000)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    vote: function (questionId, command) {
      let token = localStorage.getItem('token')
      let self = this

      axios.put('http://35.197.134.112/question/vote', {
        id: questionId,
        command: command
      }, { headers: { token: token } })
        .then(function (response) {
          self.$store.dispatch('getQuestion', token)

          setTimeout(function () {
            self.$store.dispatch('getAnswer', self.$store.state.answer._id)
          }, 1000)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    answerVote: function (answerId, command) {
      let token = localStorage.getItem('token')
      let self = this

      axios.put('http://35.197.134.112/answer/vote', {
        id: answerId,
        command: command
      }, { headers: { token: token } })
        .then(function (response) {
          self.$store.dispatch('getQuestion', token)

          setTimeout(function () {
            self.$store.dispatch('getAnswer', self.$store.state.answer._id)
          }, 1000)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>

<style scoped>
  .card {
    width: 500px;
    align-self: center;
    border: solid slategrey;
  }
  textarea {
    width: 500px;
  }
</style>
