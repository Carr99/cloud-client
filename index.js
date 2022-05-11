const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
const firebaseConfig = {
  apiKey: "AIzaSyAztwHCFo4RSUGbI_9EqNIvJK2NyEpcvwU",
  authDomain: "cloud-project-172ff.firebaseapp.com",
  projectId: "cloud-project-172ff",
  storageBucket: "cloud-project-172ff.appspot.com",
  messagingSenderId: "198050210346",
  appId: "1:198050210346:web:65691915d337ca4d811953",
  measurementId: "G-3FRY30F5MK"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const port = process.env.PORT || 3000;

// Import the express module
const express = require('express');

// Create a web server (app) using express 
const app = express();

// Serve all the files in the frontend folder
app.use(express.static('frontend'));

// express.json is built in Express middleware
// needed to be able to read a request body 
// (for POST / PUT / PATCH - request)
app.use(express.json({ limit: '100MB' }));

// Start the web server at port 3000
app.listen(port, () =>
  console.log('Listening on http://localhost:' + port));

const login = require('./backend/login')
login(app, db)

const setupREST = require('./backend/rest-api');
setupREST(app, db);