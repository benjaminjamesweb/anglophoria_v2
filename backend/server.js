const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const uri = "mongodb+srv://admin:admin@cluster0.3l0ww.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db('test');
    const usersCollection = db.collection('users');

    app.post('/signup', async (req, res) => {
      const { username, password } = req.body;

      try {
        if (!username || !password) {
          console.error("Signup Error: Username and password are required");
          return res.status(400).json({ error: "Username and password are required" });
        }

        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
          console.error("Signup Error: User already exists");
          return res.status(400).json({ error: "User already exists" });
        }

        const result = await usersCollection.insertOne({ username, password });
        res.status(201).json({ message: "User signed up successfully", userId: result.insertedId });
      } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Failed to sign up" });
      }
    });

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;

      try {
        if (!username || !password) {
          console.error("Login Error: Username and password are required");
          return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await usersCollection.findOne({ username, password });
        if (!user) {
          console.error("Login Error: Invalid credentials");
          return res.status(400).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "User logged in successfully", userId: user._id });
      } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Failed to log in" });
      }
    });

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main().catch(console.error);
