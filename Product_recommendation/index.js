import { getHTML, getAmazonPrice,getAmazonModel } from './scrape';
const csv = require('csv-parser');
const fs = require('fs');
let express=require('express');
const app=express();
const  mysql=require('mysql');
app.use(express.static('views'));
app.set('view engine','ejs');
let b=Math.round(10000*Math.random());
console.log(b+"port No.");
let final_price_1,final_price_2,final_price_3;
let image_1,image_2,image_3;
let Series_1,Series_2,Series_3;
let x1=[];
let price=[55000,76000,78000,81000,83550,154000,50000,68000]; //Price in case Scrapping fails
//let price=[50000,55000,60000,57000,62000,60000]//Second Case
// let price=[75000,77000,83000,85000,90000] //Third case
app.get('/',function (req,res) {
    res.render('index.ejs',{product_title:final_price_1,product_title2:final_price_2,product_title3:final_price_3,image_1:image_1,
    image_2:image_2,image_3:image_3,series1:Series_1,series2:Series_2,series3:Series_3});
});
app.listen(b,function () {
    console.log("3000 working");
});
let productURL=[];


const  db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'dell'

});
db.connect(function (err) {
    if(err){
        throw  err;
    }

    console.log("mysql dell connected");

});
function insert(price_int,amazonModel){

    db.query("INSERT INTO price_model (model,price) values ('"+amazonModel+"','"+price_int+"')");
}








// **************************************************************************************************************************
// reading excel file
let finalurl=[];
let url=[];
fs.createReadStream('writeData2.csv')
    .pipe(csv())
    .on('data', (row) => {
        url.push(row.a);
    })

    .on('end', () => {
        console.log('CSV file successfully processed');
        finalurl= a(url);
        separate(finalurl);
        // console.log(finalurl);
    });

function a(url) {
    let url1=url;
    return url1;
}

// end of fs.createReadStream

// ***************************************************************************************************************************

// seperating the url and getting the gaming laptops url
function separate(s)
{
    // console.log(s);
    for (let i = 0; i <s.length ; i++) {
        if (s[i].includes("amazon")){
            if(s[i].includes("asus")&&s[i].includes("rog")){

                productURL.push(s[i]);
            }
            if(s[i].includes("acer")&&s[i].includes("predator")){

                productURL.push(s[i]);
            }
            if(s[i].includes("msi")){

                productURL.push(s[i]);
            }
            if(s[i].includes("lenovo")&&s[i].includes("legion")){

                productURL.push(s[i]);
            }


        }


    }

     // console.log(productURL);
      scrapePage();

}

// ************************************************************************************************************************

// Scrape page function
async function scrapePage()
{

    for (let i = 0; i <productURL.length ; i++) {
        const html = await getHTML(productURL[i]);
        // console.log(html);
        const amazonPrice = await getAmazonPrice(html);
         console.log(amazonPrice);
        const amazonModel=await getAmazonModel(html);
         console.log(amazonModel);
         const price=amazonPrice.substring(14,16)+amazonPrice.substring(17,);
         console.log(price);
         const  price_int=parseInt(price);
         // insert(price_int,amazonModel);
    }
      values_out();
}

//***************************************************************************************************

// extracting the price of different laptops
function values_out() {
    let y=[];
    let x=[];
    db.query("select price from price_model",function (error,results,fields) {

        if (error){
            throw error;

        }
        let string=JSON.stringify(results);
        let json=JSON.parse(string);

        for (let i = 0; i <json.length ; i++) {

            y.push(json[i].price);

        }
        // console.log(y.length);
        // console.log(json[3].price);
        for (let i = 1; i <=y.length ; i++) {
            x.push(i);

        }

        // console.log(x);
        //   console.log(y);
        //linearRegression(x,y); //Case Scrapping Works

        for (let i = 1; i <=price.length ; i++) {
            x1.push(i);
        }
        linearRegression(x1,price);
    });


}
//*************************************************************************************************************************************
// calling the linear regression function

function linearRegression(x,y) {



    // console.log(y);
    // console.log(x);
    let b=findLineByLeastSquares(x,y);
    // console.log(b[0]);
    b=b.sort();
    // console.log(b[1]);
    let sum =0;
    for (let i = 0; i <b[1].length ; i++) {
        sum=sum+b[1][i];
    }
    let avg=Math.round(sum/b[1].length);
    // console.log(avg);
    let  min_term=[];
    let val=0;
    for (let i = 0; i <b[1].length ; i++) {
        let diff=Math.abs(avg-b[1][i]);
        min_term.push(diff)

    }

    let index_of_avg=(min_term.indexOf(Math.min.apply(null,min_term)));
    // console.log(index_of_avg);
// console.log(min_term.indexOf(Math.min(min_term)));
    let mean=0,mean_up=0,mean_down=0;
    mean=Math.round(b[1][index_of_avg]);
    mean_down=Math.round(b[1][index_of_avg-1]);
    mean_up=Math.round(b[1][index_of_avg+1]);
    console.log("Linear Regresssion Product")
    console.log(mean)
         console.log(mean_up)
             console.log(mean_down);
    dell_data_out(mean,mean_up,mean_down);



    function findLineByLeastSquares(values_x, values_y) {
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var count = 0;

        /*
         * We'll use those variables for faster read/write access.
         */
        var x = 0;
        var y = 0;
        var values_length = values_x.length;

        if (values_length != values_y.length) {
            throw new Error('The parameters values_x and values_y need to have same size!');
        }

        /*
         * Nothing to do.
         */
        if (values_length === 0) {
            return [ [], [] ];
        }

        /*
         * Calculate the sum for each of the parts necessary.
         */
        for (let v = 0; v <values_length; v++) {
            x = values_x[v];
            y = values_y[v];
            sum_x += x;
            sum_y += y;
            sum_xx += x*x;
            sum_xy += x*y;
            count++;
        }

        /*
         * Calculate m and b for the formular:
         * y = x * m + b
         */
        var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
        var b = (sum_y/count) - (m*sum_x)/count;

        /*
         * We will make the x and y result line now
         */
        var result_values_x = [];
        var result_values_y = [];

        for (var v = 0; v<values_length; v++) {
            x = values_x[v];
            y = x * m + b;
            result_values_x.push(x);
            result_values_y.push(y);
        }

        return [result_values_x, result_values_y];
    }



}

//*******************************************************************************************************************************
// extracting the value from dell database
let final_1=0;
let final_2=0;
let final_3=0;
function dell_data_out(mean,mean_up,mean_down){
    console.log(mean,mean_up,mean_down);
    let y=[];
    let x=[];
    let json=[];
    db.query("select Cost from dell4",function (error,results,fields) {

        if (error){
            throw error;

        }
        let string=JSON.stringify(results);
        json=JSON.parse(string);
        // console.log(typeof(json) );
        for (let i = 0; i <json.length ; i++) {
            y.push(json[i].Cost);
            // console.log(json[i].Cost);

        }
        parseInt(y,10);
        // console.log(y);

     final_1=   comparison(mean,y);
     final_price_1=y[final_1];
     // console.log(final_1);
      final_2=   comparison(mean_down,y);
        final_price_2=y[final_2];
      final_3=   comparison(mean_up,y);
        final_price_3=y[final_3];
console.log("Dell Price")
     console.log(final_1);
        console.log(final_2);
         console.log(final_3);




    });
    db.query("select Image from dell4",function (error,results,fields) {

        if (error){
            throw error;

        }
        image_1=results[final_1].Image;
        image_2=results[final_2].Image;
        image_3=results[final_3].Image;
         //console.log(image_1);
         //console.log(image_2);
         //console.log(image_3);





    });
    db.query("select Series from dell4",function (error,results,fields) {

        if (error){
            throw error;

        }
        Series_1=results[final_1].Series;
        Series_2=results[final_2].Series;
        Series_3=results[final_3].Series;
        console.log(Series_1);
        console.log(Series_2);
        console.log(Series_3);





    });
    // y=parseInt(y,10);
    // console.log(y);

}
// console.log(final_1+"A");
































































function comparison(mean,price_array){
     // console.log(mean,price_array+"a");
    let arr=[];
    for (let i = 0; i <price_array.length ; i++) {
        arr[i]=Math.abs(price_array[i]-mean);

    }
    // console.log(arr);
    // let x=[3,2,1,5];
   let m= arr.indexOf(Math.min.apply(Math,arr));
    console.log(m);
    return m;
}
























































// const pageRouter = require('./routes/pages');


