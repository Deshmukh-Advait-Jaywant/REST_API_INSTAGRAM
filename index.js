const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({extended:true}));
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        userName:"Advait Deshmukh",
        image: "advait.jpg"
    },
    {
        id:uuidv4(),
        userName:"Advait Deshmukh",
        image: "advait.jpg"
    },
    {
        id:uuidv4(),
        userName:"Thrisha",
        image: "pandi.jpg"
    },
    {
        id:uuidv4(),
        userName:"Sahithi",
        image: "sahithi.jpg"
    },
    {
        id:uuidv4(),
        userName:"sanjana",
        image: "sanju.jpg"
    },
    {
        id:uuidv4(),
        userName:"Vaishali deshmukh",
        image: "mom.jpg"
    },
    {
        id:uuidv4(),
        userName:"Jaywamt deshmukh",
        image: "dad.jpg"
    },

];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let {userName,image}=req.body;
    posts.push({id,userName,image});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});
app.get("/posts/:userName/see",(req,res)=>{
    let {userName}=req.params;
    let post={};
    post=posts.filter((p)=>userName===p.userName);
    res.render("showAll.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let new_image=req.body.image;
    let post=posts.find((p)=>id===p.id);
    post.image=new_image;
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.listen(port,()=>{
    console.log("app listining on port 8080");
});