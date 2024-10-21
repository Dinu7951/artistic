const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();

const cloudinary = require('cloudinary').v2;

const multer = require('multer');
const app = express();
const axios = require('axios');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const port = process.env.port;
const jwt = require('jsonwebtoken');
const storage = multer.memoryStorage();
const public = multer({ storage });
let userno = "";


app.use(express.urlencoded({ extended: true }));

cloudinary.config({
    cloud_name: process.env.cloud,
    api_key: process.env.api,
    api_secret: process.env.apis,
    secure: true,
});

let password = process.env.mongopass;
let user = process.env.mongouser;

mongoose.connect('mongodb+srv://' + user + password + '@cluster0.g9bohxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    mail: String,
    phone: String,
    password: String,
    regdno: String,
    bio: String,
    insta: String,
    x_link: String,
    facebook: String,
    verified: { type: Number, default: 0 },
    verificationToken: String,
});

const postSchema = new mongoose.Schema({
    regdno:String,
    title:String,
    category:String,
    date:Date,
    image:String
})

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);


app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/index', (req, res) => {
    res.render('index.ejs');
})

app.get('/aboutme', (req, res) => {
    res.render('aboutMe.ejs');
})

app.get('/profile', async (req, res) => {
    // Assuming you're using local storage to store regdno
    
    const regdno = userno;
    console.log(regdno);

    try {
        const user = await User.findOne({ regdno: regdno });
        
        if (user) {
            console.log(user);
            // Render the profile page and pass user details
            res.render('profile.ejs', { user });
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching user details.');
    }
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.get('/scroll', (req, res) => {
    res.render('scroll.ejs');
})

app.get('/signin', (req, res) => {
    res.render('signin.ejs');
})

app.get('/signup', (req, res) => {
    res.render('signup.ejs');
})

app.post('/signup', async (req, res) => {
    const { fname, lname, mail, number, password, regdno } = req.body;
    console.log('Received body:', req.body);

    const user = await User.findOne({
        $or: [
            { regdno: regdno },
            { mail: mail },
        ]
    });

    console.log('User:', user);

    if (user) {
        res.render('signin.ejs');
    } else {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const newUser = new User({
            fname: fname,
            lname: lname,
            mail: mail,
            phone:number,
            password: password,
            regdno: regdno,
            bio:"",
            insta:"",
            x_link:"",
            facebook:"",
            verified: 0,
            verificationToken: verificationToken,
        });

        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.gmail,
                pass: process.env.password,
            },
        });

        const mailOptions = {
            from: process.env.gmail,
            to: mail,
            subject: 'Verify Your Account',
            text: `Please verify your account by clicking the link: http://localhost:3000/verify/${verificationToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Verification email sent:', info.response);
        });

        res.render('signin.ejs');
    }
});

app.get('/edit', async (req, res) => {
    const regdno = userno; // Get user regdno from the session or storage
    try {
        const user = await User.findOne({ regdno: regdno });
        if (user) {
            res.render('edit.ejs', { user }); // Render the edit profile page
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching user details.');
    }
});

app.post('/updateProfile', async (req, res) => {
    const { fname, lname, mail, phone, bio, insta, x_link, facebook } = req.body;
    console.log(req.body)
    const regdno = userno; // Get user regdno from the session or storage

    try {
        const user = await User.findOneAndUpdate(
            { regdno: regdno }, // Find user by regdno
            {
                fname: fname,
                lname: lname,
                mail: mail,
                phone: phone,
                bio: bio,
                insta: insta,
                x_link: x_link,
                facebook: facebook
            },
            { new: true } // Return the updated document
        );

        if (user) {
            // If profile update is successful, redirect to the home page
            res.redirect('/profile');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'An error occurred while updating the profile.' });
    }
});


app.post('/signin', async (req, res) => {
    const { regdno, password } = req.body;
    const user = await User.findOne({
        $or: [
            { regdno: regdno, verified: 1 },
            { mail: regdno, verified: 1 }
        ]
    });
    if (user) {
        if (password === user.password) {
            userno = user.regdno;
            const token = jwt.sign({ username: user.name, regdno: user.regdno }, 'artistic');
            res.render('index.ejs');
        } else {
            res.render('signin.ejs');
        }
    } else {
        res.render('signin.ejs');
    }
});

app.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (user) {
        user.verified = 1;
        user.verificationToken = undefined; // Clear the token once verified
        await user.save();
        res.send('Your account has been verified. You can now log in.');
    } else {
        res.send('Invalid or expired token.');
    }
});

// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         let { regdno, Title, Category } = req.body;

//         const file = req.file; // Assuming `req.file` contains the uploaded file

//         if (!file) {
//             return res.status(400).send('No file uploaded.');
//         }

//         const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

//         const result = await cloudinary.uploader.upload(dataUri);

//         const uploadedImageUrl = result.secure_url;

//         let currentDate = new Date();
//         console.log(currentDate);
        
//         const post = new Post({
//             regdno: regdno,
//             title: Title,
//             category: Category,
//             date: currentDate,
//             image: uploadedImageUrl,
//         });

//         await post.save();

//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while processing your request.');
//     }
// });



app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});