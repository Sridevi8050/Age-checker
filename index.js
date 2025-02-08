import express from "express";
import bodyParser from "body-parser";
import {dirname } from "path";
import { fileURLToPath } from "url"; 
const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/submit",(req,res)=>{

     
    const{ birthYear, presentYear } = req.body;
    
    const birthYearInt=parseInt(birthYear);
    const presentYearInt=parseInt(presentYear);
    

    if(!presentYearInt || !birthYearInt || birthYearInt > presentYearInt ){

        return res.redirect("/");
    }
    const age = presentYearInt - birthYearInt;

    // res.send(`Your age is ${age}`);
    let message = `<h1>Your age is ${age}.</h1> `;

    if (age < 2) {
        message += "<h1>You are an Infant.</h1>";
    } else if (age >= 2 && age <= 12) {
        message += "<h1>You are a Child.</h1>";
    } else if (age >= 13 && age <= 19) {
        message += "<h1>You are a Teenager.</h1>";
    } else if (age >= 20 && age <= 59) {
        message += "<h1>You are an Adult.</h1>";
    } else {
        message += "<h1>You are a Senior.</h1>";
    }

    res.send(message);
});




app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
    
});
