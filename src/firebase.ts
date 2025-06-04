// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBgnyhv_YOlsZs-XKrMiIY_H-BaIHRFfAA",
//   authDomain: "artizanmobileverify.firebaseapp.com",
//   projectId: "artizanmobileverify",
//   storageBucket: "artizanmobileverify.firebasestorage.app",
//   messagingSenderId: "889287217106",
//   appId: "1:889287217106:web:27ae9397584b454b71020b"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);



import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBgnyhv_YOlsZs-XKrMiIY_H-BaIHRFfAA",
  authDomain: 'artizanmobileverify.firebaseapp.com',
  projectId: 'artizanmobileverify',
  storageBucket: 'artizanmobileverify.firebasestorage.app',
  messagingSenderId: '889287217106',
  appId: '1:889287217106:web:27ae9397584b454b71020b'
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);
