import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyB7WrNTgddUG1kUWpJEvi2wQ1rkZ7qPWzw",
  authDomain: "tt-iot-c55f1.firebaseapp.com",
  databaseURL: "https://tt-iot-c55f1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tt-iot-c55f1",
  storageBucket: "tt-iot-c55f1.appspot.com",
  messagingSenderId: "704768397878",
  appId: "1:704768397878:web:f913101b2eddb9c65d3e97",
  measurementId: "G-L2BHB77QF5"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const tempRef = ref(database, 'c302/temp');

onValue(tempRef, (snapshot) => {
  const temp = snapshot.val();
  document.getElementById('temp').textContent = temp + '°C';
  document.getElementById('temp1').textContent = temp + '℃';
  document.getElementById('num_temp').style.setProperty('--num_temp', temp);
});

const preRef = ref(database, 'c302/pre');

onValue(preRef, (snapshot) => {
  const pre = snapshot.val();
  document.getElementById('pre').textContent = pre;
  document.getElementById('pre1').textContent = pre;
  document.getElementById('num_pre').style.setProperty('--num_pre', pre);
});

const humiRef = ref(database, 'c302/humi');

onValue(humiRef, (snapshot) => {
  const humi = snapshot.val();
  document.getElementById('humi').textContent = humi + '%';
  document.getElementById('humi1').textContent = humi + '%';
  document.getElementById('num_humi').style.setProperty('--num_humi', humi);
});

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    
  } else {
    window.location.replace("login_en.html")
  }
});

var userRead =  sessionStorage.getItem('userses') || localStorage.getItem('user');
if (userRead === null) {
    try {
        auth.signOut();
    }
    catch(error){
        console.error(error);
      };
}



