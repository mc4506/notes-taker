const express = require("express");
const app = express();
const htmlRoutes = require("./routes/htmlRoutes.js");

const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", htmlRoutes);



app.listen(PORT, function(){
    console.log("Sever is listening on http://localhost:8080");
})