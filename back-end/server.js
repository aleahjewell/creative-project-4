const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/flitter', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const multer = require('multer');
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000,
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    handle: String,
    profilePicPath: String,
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('User', userSchema);

const currentUserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
});

const CurrentUser = mongoose.model('CurrentUser', currentUserSchema);

const flitSchema = new mongoose.Schema({
    flit: String,
    date: String,
    imagePath: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
});

flitSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

flitSchema.set('toJSON', {
    virtuals: true
});

const Flit = mongoose.model('Flit', flitSchema);

// Create new user
app.post('/api/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        handle: req.body.handle,
        profilePicPath: req.body.profilePicPath,
    });
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Create new flit
app.post('/api/users/:userID/flits', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userID });
        if (!user) {
            res.send(404);
            return;
        }

        let flit = new Flit({
            flit: req.body.flit,
            date: req.body.date,
            imagePath: req.body.imagePath,
            user: user,
        });
        await flit.save();
        res.send(flit);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Create current user
app.post('/api/currentUser/:userID', async (req, res) => {
    try {
        await CurrentUser.deleteMany({});

        let user = await User.findOne({ _id: req.params.userID });
        if (!user) {
            res.send(404);
            return;
        }

        let currUser = new CurrentUser({
            user: user,
        });
        await currUser.save();
        res.send(currUser);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get current user
app.get('/api/currentUser', async (req, res) => {
    try {
        let currUser = await CurrentUser.find();
        let currUserId = currUser[0].user;

        let user = await User.findOne({ _id: currUserId });
        if (!user) {
            res.sendStatus(404);
            return;
        }

        res.send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get list of all users
app.get('/api/users', async (req, res) => {
    try {
        let users = await User.find();
        res.send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get user by id
app.get('/api/users/:userID', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userID });
        res.send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

// Get list of all flits
app.get('/api/flits', async (req, res) => {
    try {
        let flits = await Flit.find().sort({ _id: -1 });
        res.send(flits);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get list of flits from user
app.get('/api/users/:userID/flits', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userID });
        if (!user) {
            res.sendStatus(404);
            return;
        }

        let flits = await Flit.find({ user: user }).sort({ _id: -1 });
        res.send(flits);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Edit user
app.put('/api/users/:userID', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userID });
        if (!user) {
            res.send(404);
            return;
        }

        user.name = req.body.name;
        user.handle = req.body.handle;
        user.profilePicPath = req.body.profilePicPath;
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete flit
app.delete('/api/users/:userID/flits/:flitID', async (req, res) => {
    try {
        let flit = await Flit.findOne({ _id: req.params.flitID, user: req.params.userID });
        if (!flit) {
            res.send(404);
            return;
        }

        await flit.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Upload photo
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

app.listen(3000, () => console.log('Server listening on port 3000'));