const e1 = require('express');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbConnect.js');
const UserModel = require('./user_schema.js');

require('dotenv').config(); 

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = 5002;


//REG API
app.post('/login', async (req, res) => {

  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({ message: "Login successful!", token });

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
})


// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(PORT, () => console.log('EXPRESS Server Started at Port No: ' + PORT));
