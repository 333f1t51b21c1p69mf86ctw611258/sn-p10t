#!/usr/bin/env node

var express = require('express');
var app = express();
var fs = require('fs');
var oscmd = require('./oscmdexecuter');

app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

app.get('/getGitUser', function (req, res) {
    oscmd.getGitUser(function (data) {
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.get('/getOsName', function (req, res) {
    oscmd.getOsName(function (data) {
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.get('/getRamInfo', function (req, res) {
    oscmd.getRamInfo(function (data) {
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

var server = app.listen(9080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});