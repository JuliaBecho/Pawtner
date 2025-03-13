import admin from "firebase-admin";
import fs from "fs"; //Import File System module to read local files
import dotenv from "dotenv";
dotenv.config()

//Read the Firebase service service accont key from the JSON file
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL('./pawtnerdb.json', import.meta.url))
);

console.log(process.env.PORT)
//Initialize Firebase Admin with storage and authentication 
admin.initializeApp({
  storageBucket: process.env.STORAGE_BUCKET,// Firebase storage for file uploads 
  credential: admin.credential.cert(serviceAccount) // Authentication using the service accont 
});

//Create instances for FIrebase services
const bucket = admin.storage().bucket();// Access Firebase storage 
const db = admin.firestore();// Access Firestore database 
const auth = admin.auth();// Access Firebase Authentication 

//Export services to be used in other parts of the project 
export {db, bucket, auth};