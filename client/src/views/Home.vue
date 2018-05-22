<template>
  <div>
    <navbar/>
    <div class="home d-flex justify-content-center">
      <!-- <img src="../assets/logo.png"> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <!-- <navbar/> -->
      <div class="loginreg">
        <form>
          <div class="form-group">
            <h3>Login</h3>
            <label for="exampleInputEmail1">Email</label>
            <input type="text" @keyup="emailLoginValid" v-model="username" :id="emailLogVal" class="form-control" placeholder="Username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" @keyup="passLoginValid" v-model="password" :id="passLogVal" class="form-control" placeholder="Password">
          </div>
          <button v-if="logVal === false" type="submit" disabled="disabled" class="btn btn-primary">Login</button>
          <button v-if="mauSubmit === true && logVal === true" type="submit" @click="login" class="btn btn-primary">Login</button>
          <button v-if="mauSubmit === false" class="buttonload">
            <i class="fa fa-spinner fa-spin"></i>Loading
          </button>
        </form>
      </div>
      <div class="loginreg">
        <form>
          <div class="form-group">
            <h3>Register</h3>
            <label for="exampleInputEmail1">Email</label>
            <input type="text" @keyup="emailRegisValid" v-model="usernameReg" class="form-control" :id="emailRegVal" placeholder="Username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" @keyup="passRegisValid" v-model="passwordReg" class="form-control" :id="passRegVal" placeholder="Password">
          </div>
          <button v-if="RegVal === false" type="submit" disabled="disabled" class="btn btn-primary">Register</button>
          <button v-if="mauSubmit === true && RegVal === true" type="submit" @click="register" class="btn btn-primary">Register</button>
          <button v-if="mauSubmit === false" class="buttonload">
            <i class="fa fa-spinner fa-spin"></i>Loading
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import navbar from '@/components/NavBar.vue'
import { setTimeout } from 'timers';

export default {
  name: 'home',
  components: {
    navbar
  },
  data () {
    return {
      username: '',
      password: '',
      usernameReg: '',
      passwordReg: '',
      mauSubmit: true,
      emailLogVal: '1',
      passLogVal: '2',
      emailRegVal: '3',
      passRegVal: '4',
      // logVal: false
    }
  },
  methods: {
    emailLoginValid: function () {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.username).toLowerCase())) {
        this.emailLogVal = 'emailVal'
        // this.logVal = true
      } else {
        this.emailLogVal = 'emailNotVal'
        // this.logVal = false
      }
    },
    passLoginValid: function () {
      if (this.password.length >= 4) {
        this.passLogVal = 'passVal'
      } else {
        this.passLogVal = 'passNotVal'
      }
    },


    emailRegisValid: function () {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.usernameReg).toLowerCase())) {
        this.emailRegVal = 'emailRegVal'
        // this.logVal = true
      } else {
        this.emailRegVal = 'emailRegNotVal'
        // this.logVal = false
      }
    },
    passRegisValid: function () {
      if (this.passwordReg.length >= 4) {
        this.passRegVal = 'passRegVal'
      } else {
        this.passRegVal = 'passRegNotVal'
      }
    },


    register: function () {
      let payload = {
        username: this.usernameReg,
        password: this.passwordReg
      }

      this.mauSubmit = false

      this.$store.dispatch('register', payload)

      setTimeout(function(){
        this.$router.push('/question')
      }, 2000);
    },
    login: function () {
      let payload = {
        username: this.username,
        password: this.password
      }

      this.mauSubmit = false

      this.$store.dispatch('login', payload)

      let self = this

      setTimeout(function(){
        self.$router.push('/question')
      }, 2000);
    }
  },
  computed: {
    logVal: function () {
      if (this.emailLogVal === 'emailVal' && this.passLogVal === 'passVal') {
        return true
      } else {
        return false
      }
    },
    RegVal: function () {
      if (this.emailRegVal === 'emailRegVal' && this.passRegVal === 'passRegVal') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    let token = localStorage.getItem('token')

    if (token) {
      this.$router.push('/question')
    }
  }
}
</script>

<style>
  .loginreg {
    margin: 20px;
    border-radius: 25px;
    border: 2px solid #73AD21;
    padding: 20px; 
    width: 200px;
    /* height: 150px;  */
  }
  #emailVal {
    border: 1px solid green;
  }
  #emailNotVal {
    border: 1px solid red;
  }
  #passVal {
    border: 1px solid green;
  }
  #passNotVal {
    border: 1px solid red;
  }

  #emailRegVal {
    border: 1px solid green;
  }
  #emailRegNotVal {
    border: 1px solid red;
  }
  #passRegVal {
    border: 1px solid green;
  }
  #passRegNotVal {
    border: 1px solid red;
  }
  
</style>
