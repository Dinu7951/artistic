import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import cors from 'cors';

// Set up Express app
const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from the public directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoUri = 'mongodb+srv://aakash:Aakash123456789@cluster0.jyeqzi8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define User schema and model
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phonenumber: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Route to handle the signin form submission
app.post('/signin', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Both fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, user });
    } else {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Error finding user in database' });
  }
});

// Route to handle the signup form submission
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, phonenumber, password } = req.body;

  if (!firstname || !lastname || !email || !phonenumber || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      phonenumber,
      password: hashedPassword
    });
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Error saving user to database' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
