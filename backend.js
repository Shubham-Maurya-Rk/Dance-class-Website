const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
mongoose.connect('mongodb://localhost/danceWebsite',{useNewUrlParser:true});
var db=mongoose.connection;
db.once('open',()=>{
    console.log("Connected to the db..");
})
const app=express();
const fs=require('fs');

app.set('view engine','pug');
app.set('views',path.join(__dirname,'static'));
app.use(express.urlencoded());
app.use('/static',express.static('static'));

const dbSchema=new mongoose.Schema({
    name:String,
    age:String,
    gender:String,
    phoneNo:String,
    address:String
});

var Contact=new mongoose.model('Contact',dbSchema);
app.get('/',(req,res)=>{
    let para={"title":"My Dance Academy"};
    res.render('home.pug',para);
})
app.get('/about',(req,res)=>{
    let para={"title":"My Dance Academy"};
    res.render('about.pug',para);
})
app.get('/contact',(req,res)=>{
    let para={"title":"My Dance Academy"};
    res.render('contact.pug',para);
})

app.post('/contact',(req,res)=>{
    let oldData=fs.readFileSync('details.txt');
    fs.writeFileSync('details.txt',oldData+`Name: '${req.body.name}'\nAge: '${req.body.age}'\nGender: '${req.body.gender}'\nGender: '${req.body.gender}'\nAddress: '${req.body.address}'\n\n`);
    var data=new Contact(req.body);
    data.save().then(()=>{
        res.send("This item has been send to this database.");
    }).catch(()=>{
        res.status(400).send("Item was not saved to db.");
    })
});

app.listen(80,()=>{
    console.log("Server running at port: 80.")
});