const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("route");
const cors = require("cors");
const db = require('./setup/myurl.js').mongoURL;
const contests = require('./models/contests');
const Users = require('./models/user');


mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Mongodb connected successfully"))
    .catch(err => console.log(err))


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


//@type GET
//@route /contests
//@desc route to get all the contests
//@access PUBLIC
app.get('/contests', (req, res) => {
    
    contests.find({}).then(contest => {
            res.send(contest);
        })
        .catch(err => console.log('error in displaying the contest' + err))

});


//@type POST
//@route /registererr
//@desc route to register in contest
//@access PUBLIC

app.post('/register', (req, res) => {

    const { contestName, id } = req.body;
    contests.updateOne({ contestName: contestName }, { $push: { users: id } }).then((data) => {

        Users.findOneAndUpdate({publicKey: id}, { $push: { contest: contestName }}, { upsert: true, new: true, setDefaultsOnInsert: true } ).then((data) => {
            if(data){
                res.status(200).json({
                    data: `You are successfully registered for ${contestName}`,
                })
            }else{
                res.status(400).json({
                    data: `Invalid id. Public key doesn't exist`,
                })
            }
        })

    }).catch(e => {
        console.log(e)
        res.json({
            data: `Some error occured. Please try again later`,
        });
    });
})


const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`server is running at port ${PORT}`));