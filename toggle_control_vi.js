import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

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

function toggleLamp(toggleElem, stateElem, path) {
  let parentNode = toggleElem.parentNode;
  parentNode.classList.toggle('active');
  if (parentNode.classList.contains('active')) {
    set(ref(database, path), true);
  } else {
    set(ref(database, path), false); 
  }
}

let lamps = [
{toggle: document.getElementById('lamp_1_toggle'), state: document.getElementById('lamp_1_state'), path: 'c302/lamp_1_state'},
{toggle: document.getElementById('lamp_2_toggle'), state: document.getElementById('lamp_2_state'), path: 'c302/lamp_2_state'},
{toggle: document.getElementById('fan_1_toggle'), state: document.getElementById('fan_1_state'), path: 'c302/fan_1_state'},
{toggle: document.getElementById('fan_2_toggle'), state: document.getElementById('fan_2_state'), path: 'c302/fan_2_state'}
];

lamps.forEach(function(lamp) {
lamp.toggle.addEventListener('click', function() {
  toggleLamp(lamp.toggle, lamp.state, lamp.path);
});
});

function toggleAirConditioner(toggleElem, imgElem, path) {
toggleElem.parentNode.classList.toggle('active');
if (toggleElem.parentNode.classList.contains('active')) {
    set(ref(database, path), true); 

} else {
    set(ref(database, path), false); 
}
}

let airConditioners = [
{toggle: document.getElementById('air_1_toggle'), img: document.getElementById('img_air_1'), path: 'c302/air_1_state'},
{toggle: document.getElementById('air_2_toggle'), img: document.getElementById('img_air_2'), path: 'c302/air_2_state'}
];

airConditioners.forEach(function(ac) {
ac.toggle.addEventListener('click', function() {
  toggleAirConditioner(ac.toggle, ac.img, ac.path);
});
});

let lamps_fb = [
  {toggle: document.getElementById('lamp_1_toggle'), state: document.getElementById('lamp_1_state'), path: 'c302/lamp_1_state'},
  {toggle: document.getElementById('lamp_2_toggle'), state: document.getElementById('lamp_2_state'), path: 'c302/lamp_2_state'},
  {toggle: document.getElementById('fan_1_toggle'), state: document.getElementById('fan_1_state'), path: 'c302/fan_1_state'},
  {toggle: document.getElementById('fan_2_toggle'), state: document.getElementById('fan_2_state'), path: 'c302/fan_2_state'}
];

lamps_fb.forEach(function(lamp_fb) {
  onValue(ref(database, lamp_fb.path), function(snapshot) {
    let state = snapshot.val();
    if (state) {
      lamp_fb.toggle.parentNode.classList.add('active');
      lamp_fb.state.innerHTML = "ON";
      lamp_fb.state.style.color = "rgba(57,198,92,255)";
    } else {
      lamp_fb.toggle.parentNode.classList.remove('active');
      lamp_fb.state.innerHTML = "OFF";
      lamp_fb.state.style.color = "rgb(227, 4, 90)";
    }
  });
});

let airConditioners_fb = [
  {toggle: document.getElementById('air_1_toggle'), img: document.getElementById('img_air_1'), path: 'c302/air_1_state'},
  {toggle: document.getElementById('air_2_toggle'), img: document.getElementById('img_air_2'), path: 'c302/air_2_state'}
];

airConditioners_fb.forEach(function(ac) {
  onValue(ref(database, ac.path), function(snapshot) {
    let state = snapshot.val();
    if (state) {
      ac.img.src = 'img/snowflake.png';
      ac.toggle.parentNode.classList.add('active');
    } else {
      ac.img.src = 'img/cut_snowflake.png';
      ac.toggle.parentNode.classList.remove('active');
    }
  });
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
