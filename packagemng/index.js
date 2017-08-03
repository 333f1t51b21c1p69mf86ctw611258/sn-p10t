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

app.get('/getSnapModuleList', function (req, res) {
    oscmd.getSnapModuleList(function (data) {
        var tmp = data.cmdresult;
        console.log(tmp);

        var find = '\n';
        var re = new RegExp(find, 'g');

        var lines = tmp.replace(re, ';').split(";");

        lines.splice(0, 1);
        lines.splice(lines.length - 1, 1);

        console.log("### LENGTH: " + lines.length);

        res.end(JSON.stringify(lines));
    });
});

app.get('/getSnapInfo/:snap', function (req, res) {
    var snap = req.params.snap;

    oscmd.getSnapInfo(snap, function (data) {
        var snapInfo = data;
        console.log(snapInfo);

        res.end(snapInfo);
    });
});

app.get('/installSnap/:snap', function (req, res) {
    var snap = req.params.snap;

    oscmd.installSnap(snap, function (data) {
        var snapInfo = data;
        console.log(snapInfo);

        res.end(snapInfo);
    });
});

app.get('/removeSnap/:snap', function (req, res) {
    var snap = req.params.snap;

    oscmd.removeSnap(snap, function (data) {
        var snapInfo = data;
        console.log(snapInfo);

        res.end(snapInfo);
    });
});

var server = app.listen(9080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});