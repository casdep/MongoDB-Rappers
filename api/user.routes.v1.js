// ./api/v1/user.routes.v1.js
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');

var Album  = require('../model/album.model');
var Rapper = require('../model/rapper.model');
var RecordCompany = require('../model/recordCompany.model');


//routes rappers(endpoints)
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




routes.get('/rappers/:_id', function(req, res) {
    res.contentType('application/json');
    Rapper.find({ _id: req.params._id} )
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

routes.post('/rappers', function(req, res) {
    Rapper.create({
      name: req.body.name,
      pictureURL: req.body.pictureURL,
      breakthroughTrack: req.body.breakthroughTrack,
      dateOfBirth: req.body.dateOfBirth,
    }, function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});

routes.put('/rappers/:_id', function(req, res) {
    console.log(req);
    Rapper.findOneAndUpdate({_id: req.params._id}, req.body,
            {
                runValidators: true
            },
            function(err, result) {
              if (err) return res.send(err);
              res.send(result);
        });
});

routes.delete('/rappers/:_id', function(req, res) {
    Rapper.remove({_id: req.params._id},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});

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

//routes recordCompanies(endpoints)
routes.get('/recordcompanies', function(req, res){
  res.contentType('application/json');
  RecordCompany.find({})
    .then((recordcompanies) => {
      if(recordcompanies.lenghth === 0) {
        res.status(200).json('There are no recordcompanies');
    }
    else {
        res.status(200).json(recordcompanies);
    }
})
.catch((error) => res.status(401).json(error));
});

routes.get('/recordcompanies/:_id', function(req, res) {
    res.contentType('application/json');
    RecordCompany.find({ _id: req.params._id} )
        .then((recordcompanies) => {
            console.log(recordcompanies);
            if (recordcompanies.length === 0) {
                res.status(200).json('There are no record companies');
            }
            else {
                res.status(200).json(recordcompanies);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/recordcompanies', function(req, res) {
    RecordCompany.create({
      name: req.body.name
    }, function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});

routes.put('/recordcompanies/:_id', function(req, res) {
    console.log(req);
    RecordCompany.findOneAndUpdate({_id: req.params._id}, req.body,
            {
                runValidators: true
            },
            function(err, result) {
              if (err) return res.send(err);
              res.send(result);
        });
});

routes.delete('/recordcompanies/:_id', function(req, res) {
    RecordCompany.remove({_id: req.params._id},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});

module.exports = routes;
