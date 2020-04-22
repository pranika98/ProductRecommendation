let express = require('express');
let  fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');

const rp = require('request-promise');
var wtj = require('website-to-json');
const url = 'https://www.amazon.in/UX333FA-A4118T-13-3-inch-i5-8265U-Integrated-Graphics/dp/B07MFNY2FM/ref=sr_1_1_sspa?keywords=asus+rog&qid=1573849892&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzQkdWVzRJRTlBRjQmZW5jcnlwdGVkSWQ9QTAxMzY5NjUxT0Y1Q1NIMkQ2SUdCJmVuY3J5cHRlZEFkSWQ9QTAzNzYwMjkyRDZWUjA2T0pQWjVaJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==';

let app= express();
app.get('/scrape',function (req,res) {
    rp(url)
        .then(function (html) {
            //success!
            // console.log(html);
            res.send(html);
            // price = html.document.getElementById("#priceblock_ourprice");
            //  document.getElementById();
             console.log(html);
            // Find the specific element you want (in this case, the third pre) and get its content.


        });
});


app.listen('3000',function () {

    console.log('Magic happens on port 3000');
});



// const session = require('express-session');
// const path = require('path');
// const  mysql=require('mysql');
// // const pageRouter = require('./routes/pages');
//
// const  db=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'123456',
//     database:'dell'
//
// });
// db.connect(function (err) {
//     if(err){
//         throw  err;
//     }
//     console.log("mysql connected");
//
// });
// const app = express();



// // for body parser. to collect data that sent from the client.
// app.use(express.urlencoded( { extended : false}));
//
//
// // Serve static files. CSS, Images, JS files ... etc
// app.use(express.static(path.join(__dirname, 'public')));
//
//
// // Template engine. PUG
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.get('/',function (req,res) {
//     res.send('<h1>Hello</h1>');
//
// });

// app.listen(3000,function () {
//     console.log("server running on 3000");
//
// });
module.exports=app;