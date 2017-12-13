// ./api/v1/user.routes.v1.js
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');

var Album  = require('../model/album.model');

//routes albums(endpoints)
routes.get('/albums', function(req, res) {
    res.contentType('application/json');
    Album.find({})
        .then((albums) => {
            console.log(albums);
            if (albums.length === 0) {
                res.status(200).json('There are no albums');
            }
            else {
                res.status(200).json(albums);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/albums/:_id', function(req, res) {
    res.contentType('application/json');
    Album.find({ _id: req.params._id} )
        .then((albums) => {
            console.log(albums);
            if (albums.length === 0) {
                res.status(200).json('There are no albums');
            }
            else {
                res.status(200).json(albums);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/albums', function(req, res) {
    Album.create(
      req.body,
      function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});

routes.put('/albums/:_id', function(req, res) {
    console.log(req);
    Album.findOneAndUpdate({_id: req.params._id}, req.body,
            {
                runValidators: true
            },
            function(err, result) {
              if (err) return res.send(err);
              res.send(result);
        });
});

routes.delete('/albums/:_id', function(req, res) {
    Album.remove({_id: req.params._id},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});

module.exports = routes;
