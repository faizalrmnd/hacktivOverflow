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
            <input type="text" @keyup="emailLoginValid" v-model="email" :id="emailLogVal" class="form-control" placeholder="email">
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
            <input type="text" @keyup="emailRegisValid" v-model="emailReg" class="form-control" :id="emailRegVal" placeholder="email">
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
      <div>
        <!-- <button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" data-provider-id="google.com" data-upgraded=",MaterialButton"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Google</span></button> -->
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import navbar from '@/components/NavBar.vue'
import { setTimeout } from 'timers'
import { error } from 'util'
import '../firebase.js'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

export default {
  name: 'home',
  components: {
    navbar
  },
  data () {
    return {
      email: '',
      password: '',
      emailReg: '',
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
      if (re.test(String(this.email).toLowerCase())) {
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
      if (re.test(String(this.emailReg).toLowerCase())) {
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
        email: this.emailReg,
        password: this.passwordReg
      }

      this.mauSubmit = false

      this.$store.dispatch('register', payload)
      .then((loggedin) => {
        this.$router.push('/question')
      })
      .catch((err) => {
        alert(error)
      })

      // setTimeout(function(){
      //   this.$router.push('/question')
      // }, 2000);
    },
    login: function () {
      let payload = {
        email: this.email,
        password: this.password
      }

      this.mauSubmit = false

      this.$store.dispatch('login', payload)
      .then((loggedin) => {
        this.$router.push('/question')
      })
      .catch((err) => {
        this.mauSubmit = true
        alert('email atau pasword salah!')
      })

      // let self = this

      // setTimeout(function(){
      //   self.$router.push('/question')
      // }, 2000);
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
    //----------oauth
    let self = this
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            self.$store.dispatch('oAuth', authResult.user.email)
            .then(() => {
                // self.modalVisible = false
                // self.$store.commit('changePage', home)   
                self.$router.push('/question')
            })
            .catch((err) => {
                // self.modalVisible = false
                // self.$ons.notification.alert(err.message)
            })
            
            
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none'
        }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        //signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                scopes: [
                    //'https://www.googleapis.com/auth/plus.login'
                    'email'
                ],
                customParameters: {
                    // Forces account selection even when one account
                    // is available.
                    prompt: 'select_account'
                }
                }
        ],
        // Terms of service url.
        //tosUrl: '<your-tos-url>'
        }
    ui.start('#firebaseui-auth-container', uiConfig)

    //----------oauth-done

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
