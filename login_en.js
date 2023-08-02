
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

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

const logregBox = document.querySelector('.logreg-box');

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const registerForm = document.querySelector('.register form');
const loginForm = document.querySelector('.login form');

const signup = (e) => {
    e.preventDefault();
    const iddevice = document.getElementById("iddevice").value;
    const email_reg = document.getElementById("email_reg").value;
    const pass_reg = document.getElementById("pass_reg").value;
  
    createUserWithEmailAndPassword(auth, email_reg, pass_reg)
        .then((userCredential) => {
            const userEmail = userCredential.user.email;
            const encodedEmail = encodeURIComponent(userEmail.replace(/[.@]/g, '_'));
            console.log("iddevice: ", iddevice);
            console.log("encodedEmail: ", encodedEmail);
            alert("Đăng ký thành công");
            set(ref(db, `${encodedEmail}`), iddevice);
            logregBox.classList.remove('active');

        })
        .catch((error) => {
            alert("Đăng ký thất bại: " + error.message);
        });
};

const login = (e) => {
    e.preventDefault();
    const email_sig = document.getElementById("email_sig").value;
    const pass_sig = document.getElementById("pass_sig").value;
    signInWithEmailAndPassword(auth, email_sig, pass_sig)
        .then((userCredential) => {
            window.location.href = "analytics_en.html";
        })
        .catch((error) => {
            alert("Đăng nhập thất bại: " + error.message);
        });
};

registerForm.addEventListener('submit', signup);
loginForm.addEventListener('submit', login);
