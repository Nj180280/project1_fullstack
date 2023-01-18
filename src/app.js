const express=require('express') //require
const hbs=require("hbs")

require("./db/conn")
const User=require("./models/usermsg") //see for user entered data
const app=express(); //invocation
const port = process.env.PORT || 3000
const path=require("path");
const exp = require('constants');
const staticpath=path.join(__dirname,"../public") //setting the path and using a static folder 
const templatepath=path.join(__dirname,"../templates/views")
const partialpath=path.join(__dirname,"../templates/partials")
//setting middleware
app.use(express.static(staticpath)) 
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")))

app.use(express.urlencoded({extended:false})) //to get data from user in other than json form  , parse json format 

//setting view engine and handlebars
app.set("view engine","hbs")
app.set("views",templatepath) //setting path of views that is moved in template folder 
hbs.registerPartials(partialpath) //setting path for partials

//routing
app.get('/', function(req,res) //default route
{
    res.render("index")//rendering some file
});
app.get('/contact', function(req,res) //default route
{
    res.render("contact")//rendering some file
});
app.post('/contact', async(req,res) => //getting info input by user in db
{
    try 
    {
        const userData= new User(req.body) //saving user data 
        await userData.save()
        res.status(201).render("index")
    } 
    catch (error) 
    {
        res.status(500).send(error) //catching error and displaying
    }
});


app.listen(port,() =>      //making port listen to a particular thing 
{
    console.log("server is running at port no ",port) //automatically does res.contentHeader and status code is set automatically in some cases
});