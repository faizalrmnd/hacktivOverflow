import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: 'AIzaSyBeCG5cmG6Y7coCuKTOAqe1G7MEz557M_8',
  authDomain: 'hoverflow-182.firebaseapp.com',
  databaseURL: 'https://hoverflow-182.firebaseio.com',
  projectId: 'hoverflow-182',
  storageBucket: '',
  messagingSenderId: '339560225023'
})

export const firebase = firebaseApp
