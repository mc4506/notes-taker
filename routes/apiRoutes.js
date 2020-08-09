const express = require("express");
const routes = express.Router();
const path = require("path");
const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

routes.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../db/", "db.json"));
})

routes.post("/api/notes", function(req, res){
    let notes=[];
    let idCounter;
    readFileAsync("./db/db.json", "utf8").then( data => {
        notes = JSON.parse(data);
        notes.length === 0 ? idCounter = 0 : idCounter = notes[notes.length-1].id
        // console.log(notes);
    }).then(() => {
        // console.log(req.body);
        notes.push(req.body);
        // OPTION 1: loop through notes array and set an id for each element based on index number
        // notes.forEach((e, i) => e["id"] = i);
        // OPTION 2: Use an ID tracker to keep track of ids
        notes[notes.length-1]["id"] = idCounter+1;
        console.log(notes);
        writeFileAsync("./db/db.json", JSON.stringify(notes));
    }).catch(err => {
         if(err) throw err;
         res.send({error: 'Something failed!'});
    })
    res.send("success");
})

routes.delete("/api/notes/:id", function(req, res){
    const chosen = req.params.id;
    // console.log(`delete ${chosen}`);
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
    res.end();
})

routes.put("/api/notes/:id", function(req, res) {
    const chosen = req.params.id;
    let notes=[];
    readFileAsync("./db/db.json", "utf8").then( data => {
        notes = JSON.parse(data);
    }).then(() => {
        notes.forEach((e, i) => {
            if(e.id === parseInt(chosen)){
                e.title = req.body.title;
                e.text = req.body.text;
            }
        })
        console.log(notes);
        writeFileAsync("./db/db.json", JSON.stringify(notes));
    }).catch(err => {
        if(err) throw err;
    })
    res.send("success");
})


module.exports = routes;