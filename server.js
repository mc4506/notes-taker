const express = require("express");
const app = express();
const htmlRoutes = require("./routes/htmlRoutes.js");
const apiRoutes = require("./routes/apiRoutes.js");

const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use("/", htmlRoutes);
app.use("/", apiRoutes);


app.get("*", function(req, res){
    res.status(404).end();
})

app.listen(PORT, function(){
    console.log("Sever is listening on http://localhost:8080");
})