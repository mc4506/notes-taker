const express = require("express");
const app = express();
const supertest = require("supertest");
const request = supertest(app);
const path = require("path");
const fs = require("fs");

app.use(express.json());

app.get("/test", (req, res) => {
    res.json('{"title":"test"}');
})

app.post("/post", (req, res) => {
    let testArr = [];
    testArr.push(req.body);
    res.json(testArr);
})

app.delete("/delete/:id", (req, res) => {
    let testArr = [{"title":"delete", "id":"0"}];
    let chosen = req.params.id;
    if(testArr[0].id === chosen){
        testArr.splice(0,1);
    }
    res.json(testArr);
})

describe("GET", function () {
    it("should get the json object in the response", async (done) => {
        const response = await request.get("/test");
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(('{"title":"test"}'));
        done();
    })
})

describe("POST", function () {
    it("should POST testObj and receive the testObj back in the response", async function (done) {
        const testObj = {
            "title": "Post",
        };
        const response = await request.post("/post").send(testObj);
        expect(response.text).toBe('[{"title":"Post"}]');
        done();
    })
})

describe("DELETE", function () {
    it("should DELETE obj in the test array and get an empty array back in the response", async function (done) {
        const response = await request.delete("/delete/0");
        expect(response.text).toBe('[]');
        done();
    })
})