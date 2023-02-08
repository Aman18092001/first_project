const { Console } = require('console');
const express=require('express');
const path=require('path');
const { title } = require('process');
const port=2000;

const db=require('./config/mongoose');
const contact=require('./models/contact');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// //middleware1
// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     req.name="Aman";
//     next();
// });

// //middleware2
// app.use(function(req,res,next){
//     // console.log('middleware2 starts');
//     console.log(req.name);
//     next();
// })



var contactList=[
    {
        name: "Aman",
        phone: "6206644242"
    },
    {
        name:"Tony",
        phone:"9632587410"
    },
    {
        name:"ninjaBabu",
        phone:"1472589630"
    }
]

app.get('/',function(req,res){
    // console.log('name from route controller',req.name);
    contact.find({},function(err,contacts){
       if(err){
          console.log('error in fetching contacts from db:');
          return;
       }
       return res.render('home',{
        title:'My contact lists',
        contact_list:contacts
       });
        
    });
});

app.get('/practice',function(req,res){
    return res.render('practice',
    {title:'practice harder'});
});

app.post('/contact-list',function(req,res){
    //  contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    //  });
    
    // contactList.push(req.body);
    contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creation:');
        return;}
        console.log('*****',newContact);
        return res.redirect('back');
    })
});

app.get('/delete-contact',function(req,res){
    console.log(req.query);
    // get the id from query in the url
    let id=req.query.id;
    // find contact in the database using id and delete
    contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err){
        console.log('error occured in server',err);
    }
    console.log('working,fine on:',port);
});