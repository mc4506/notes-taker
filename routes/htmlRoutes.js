const express = require("express");
const routes = express.Router();
const path = require("path");

routes.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

routes.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})


module.exports = routes;