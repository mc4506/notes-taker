const express = require("express");
const routes = express.Router();
const path = require("path");
const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let idCounter = 0;

routes.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../db/", "db.json"));
})

routes.post("/api/notes", function(req, res){
    let notes=[];
    readFileAsync("./db/db.json", "utf8").then( data => {
        notes = JSON.parse(data);
        // console.log(notes);
    }).then(() => {
        // console.log(req.body);
        notes.push(req.body);
        notes.forEach((e, i) => e["id"] = i);
        console.log(notes);
        writeFileAsync("./db/db.json", JSON.stringify(notes));
     }).catch(err => {
         if(err) throw err;
     })
})

routes.delete("/api/notes/:id", function(req, res){
    const chosen = req.params.id;
    console.log(`delete ${chosen}`);
    let notes=[];
    readFileAsync("./db/db.json", "utf8").then( data => {
        notes = JSON.parse(data);
    }).then(() => {
        notes.forEach((e, i) => {
            if(e.id === parseInt(chosen)){
                notes.splice(i, 1);
            }
        })
        console.log(notes);
        writeFileAsync("./db/db.json", JSON.stringify(notes));
    }).catch(err => {
        if(err) throw err;
    })
})


module.exports = routes;