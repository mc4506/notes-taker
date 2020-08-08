const express = require("express");
const app = express();
// const apiRoutes = require("./routes/apiRoutes.js");
const supertest = require("supertest");
const request = supertest(app);
const path = require("path");

app.use(express.json());

app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "./", "test.json"));
})

// app.post("/test", (req, res) => {
//     fs.readFile("./test/test.json", function(err, data) {
//         if (err) throw err;
//         console.log(body);
//     })
//     res.json(req.body);
// })


describe("GET", function(){
    it("should get the json object in test.json", async function(done){
        const response = await request.get("/test");
        expect(response.status).toBe(200);
        // console.log(response);
        expect(response.body).toStrictEqual(JSON.parse('[{"title":"Test Title","text":"Test text"}]'));
        done();
    })
})

// describe("POST", function(){
//     it("should append to the array in /test", async function(done){
//         const testObj = {
//             "title": "Post Test",
//             "text": "testing"
//         }
//         const testArr = [];

//         const response = await request.post("/test/");
//         // console.log(response)
//         // testArr.push(response);

//         expect(response.status).toBe(201);
//         // expect(response.body).toHaveProperty("post");
//         done();
//     })
// })