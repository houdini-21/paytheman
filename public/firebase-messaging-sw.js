importScripts(
  "https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDlS35S0jgrEdRT01LZSioRpHHQFx61fYY",
  authDomain: "basilisk-6bdbf.firebaseapp.com",
  projectId: "basilisk-6bdbf",
  storageBucket: "basilisk-6bdbf.appspot.com",
  messagingSenderId: "855059464771",
  appId: "1:855059464771:web:8412883a4b95e3769d4af6",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
