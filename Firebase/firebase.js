import * as firebase from 'firebase';

const firebaseConfig = {

    apiKey: "AIzaSyAUuZUgvlmMYBOl_Kg43Eb2sHnEJp4_us4",
  
    authDomain: "sandler-cookbook.firebaseapp.com",
  
    projectId: "sandler-cookbook",
  
    storageBucket: "sandler-cookbook.appspot.com",
  
    messagingSenderId: "519878306197",
  
    appId: "1:519878306197:web:4fe836d84e5caae16dae9c"
  
  };

if(!firebase.apps.length)
{
  firebase.intializeApp(firebaseConfig);
}

export {firebase}

