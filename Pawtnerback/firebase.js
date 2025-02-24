import admin from "firebase-admin";
import fs from "fs";


const serviceAccount = JSON.parse(
  fs.readFileSync(new URL('./pawtnerdb.json', import.meta.url))
);


admin.initializeApp({
  storageBucket: "pawtner-b4740.firebasestorage.app",
  credential: admin.credential.cert(serviceAccount)
});

const bucket = admin.storage().bucket();

const db = admin.firestore();
export {db, bucket};


