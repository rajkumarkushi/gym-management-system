const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authroutes = require("./routes/authRoutes");
const admin = require("firebase-admin");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use authentication routes
app.use("/api/auth", authroutes);

// Firebase Firestore code (optional if Firebase is used)
const db = admin.firestore();

// CRUD operations (if Firebase is still required)
// Create User

    
// Read All Users
app.get("/read", async (req, res) => {
  try {
    const userRef = db.collection("users");
    const response = await userRef.get();
    let resposnseArray = [];
    response.forEach((doc) => {
      resposnseArray.push(doc.data());
    });
    res.send(resposnseArray);
  } catch (error) {
    res.send(error);
  }
});

// Read a Single User
app.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const usersRef = db.collection("users").doc(id);
    const response = await usersRef.get();
    res.send(response.data());
  } catch (error) {
    res.send(error);
  }
});

// Update User
app.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newname = "updated"; // Adjust the logic if needed
    const userRef = await db
      .collection("users")
      .doc(id)
      .update({ name: newname });
    res.send(userRef);
  } catch (error) {
    res.send(error);
  }
});

// Delete User
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.collection("users").doc(id).delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
