import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAp6fmJr3DvJJRzHi6JJpNtLLl9MeruNXE",
  authDomain: "todo-project-91d4f.firebaseapp.com",
  databaseURL: "https://todo-project-91d4f-default-rtdb.firebaseio.com",
  projectId: "todo-project-91d4f",
  storageBucket: "todo-project-91d4f.appspot.com",
  messagingSenderId: "325131694315",
  appId: "1:325131694315:web:e4830566ff3d464cf30eae"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
