//
// ./api/v1/user.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Rapper = require('../model/rapper.model');

var Ingredient = require('../model/ingredient.model');
var Ingredient = require('../model/recipe.model');

routes.get('/rappers', function(req, res) {
    res.contentType('application/json');
    Rapper.find({})
        .then((rappers) => {
            console.log(rappers);
            if (rappers.length === 0) {
                res.status(200).json('There are no rappers');
            }
            else {
                res.status(200).json(rappers);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/ingredients', function(req, res) {
    res.contentType('application/json');
    Ingredient.find({})
        .then((ingredients) => {
        if (ingredients.length === 0) {
            res.status(200).json('There are no ingredients');
        }
        else {
            res.status(200).json(ingredients);
        }
    })
        .catch((error) => res.status(401).json(error));
});


routes.get('/rappers/:name', function(req, res) {
    res.contentType('application/json');
    Rapper.find({ name: req.params.name} )
        .then((rappers) => {
            console.log(rappers);
            if (rappers.length === 0) {
                res.status(200).json('There are no rappers');
            }
            else {
                res.status(200).json(rappers);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/ingredients/:name', function(req, res) {
    res.contentType('application/json');
    Ingredient.find({ name: req.params.name} )
        .then((ingredients) => {
            console.log(ingredients);
            if (ingredients.length === 0) {
                res.status(200).json('There are no ingredients');
            }
            else {
                res.status(200).json(ingredients);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/rappers', function(req, res) {
    Rapper.create({
        name: req.body.name
    }, function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    })
});

routes.post('/ingredients', function(req, res) {
    Ingredient.create({
        name: req.body.name,
        amount: req.body.amount,
    }, function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    })
});

routes.put('/rappers/:name', function(req, res) {
    Rapper.findOneAndUpdate({name: req.params.name},
        {name: req.body.name}
        , function(err, result) {
            if (err) return res.send(err);
            res.send(result);
        })
});

routes.delete('/rappers/:name', function(req, res) {
    Rapper.remove({name: req.params.name},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});

module.exports = routes;
