const admin = require("firebase-admin");
const credentials = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL:"https:gym-management-74ad3-default-rtdb.firebaseio.com",
    ignoreUndefinedProperties: true
  });
  
  const db = admin.firestore();
  const auth = admin.auth();


  module.exports={db,auth,admin};