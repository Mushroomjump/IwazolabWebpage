const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
// Parse URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "templates" directory
app.use(express.static(path.join(__dirname, "..", "templates")));

// Connect to MongoDB Atlas
const uri =
  "mongodb+srv://mwikalimusyoki24:B1481996@cluster0.kul8d3d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

// Define a schema for user login
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Handle form submission for user signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const data = { name, email, password };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      console.error("Error inserting record: ", err);
      return res.status(500).send("Error inserting record");
    }
    console.log("Record Inserted Successfully");
    return res.redirect("/index.html");
  });
});

// Serve the signup form
app.get("/signup", (req, res) => {
  res.set({ "Access-Control-Allow-Origin": "*" });
  return res.sendFile(path.join(__dirname, "..", "templates", "signup.html"));
});

// Handle form submission for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).send("Incorrect password");
    }

    // Login successful
    console.log("Login successful");
    return res.redirect("/index.html");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Serve the login form
app.get("/login", (req, res) => {
  res.set({ "Access-Control-Allow-Origin": "*" });
  return res.sendFile(path.join(__dirname, "..", "templates", "login.html"));
});

// Start the server on port 5500
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
