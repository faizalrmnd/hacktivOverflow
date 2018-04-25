<template>
  <div>
    {{ questionList }}
    <div v-for="(question, index) in questionList" v-bind:key='index' class="card">
      <h5 class="card-header">{{ question.title }}</h5>
      <div class="card-body">
        <h5 class="card-title">{{ question.question }}</h5>
        <p class="card-text">{{ question.user.username }}</p>
        <!-- <p class="card-text">{{ question._id }}</p> -->
        <a href="#" @click="getAnswer(question._id)" class="btn btn-primary">Answers</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'QuestionList',
  data () {
    return {

    }
  },
  methods: {
    getAnswer: function (questionId) {
      let payload = questionId

      this.$store.dispatch('getAnswer', payload)

      this.$router.push('/answer')
    }
  },
  computed: {
    ...mapState(['questionList'])
  },
  created () {
    let payload = localStorage.getItem('token')

    this.$store.dispatch('getQuestion', payload)
  }
}
</script>

<style>

</style>
