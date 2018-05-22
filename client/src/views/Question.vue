<template>
  <div>
    <!-- <div class="row mx-0">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary col-12 px-5">

        <a class="navbar-brand" href="#">Hoverflow!</a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Main</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </div> -->
    <!-- Button trigger modal -->
    <navbar/>
    <button id="add" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      Add Question
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Your Question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input class="form-control" v-model="title" type="text" placeholder="Title">
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Question Description</label>
              <textarea class="form-control" v-model="question" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="addQuestion" class="btn btn-primary" data-dismiss="modal">Post Question</button>
          </div>
        </div>
      </div>
    </div>
    <center>
      <QuestionList/>
    </center>
  </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue'
import navbar from '@/components/NavBar.vue'

export default {
  name: 'questions',
  components: {
    QuestionList,
    navbar
  },
  data () {
    return {
      title: '',
      question: ''
    }
  },
  methods: {
    addQuestion: function () {
      let payload = {
        title: this.title,
        question: this.question
      }

      this.$store.dispatch('addQuestion', payload)
    }
  },
  mounted () {
    let token = localStorage.getItem('token')

    if (!token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  #add {
    margin: 25px;
  }
</style>
