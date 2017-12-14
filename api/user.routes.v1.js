// ./api/v1/user.routes.v1.js
const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "admin"));
var session = driver.session();
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
  var albumArtist = req.body.artist;
  var albumName = req.body.name;
  var albumPictureURL = req.body.pictureURL;
  var albumTracks = req.body.tracks;
  var albumLengthMin = req.body.lengthMin;

  var rapperName = req.body.rapper.rapperName;
  var rapperBreakThroughTrack = req.body.rapper.breakthroughTrack;
  var rapperDateOfBirth = req.body.rapper.dateOfBirth;

  var labelName = req.body.recordcompany.labelName;

  session
    .run("MERGE(n:Album {artist:{neoArtist}, name:{neoName}, pictureURL:{neoPictureURL}, tracks:{neoTracks}, lengthMin:{neoLengthMin}})",
    {neoArtist: albumArtist, neoName: albumName, neoPictureURL: albumPictureURL, neoTracks: albumTracks, neoLengthMin: albumLengthMin});
    session.close();

    session
    .run("MERGE(g:Rapper {rapperName:{neoRapperName}, rapperBreakThroughTrack:{neoBreakThroughTrack}, rapperDateOfBirth:{neoDateOfBirth}}) RETURN g",
    {neoRapperName: rapperName, neoBreakThroughTrack: rapperBreakThroughTrack, neoDateOfBirth: rapperDateOfBirth});
    session.close();


    session
    .run("MATCH(a:Album {name:{neoName}}),(b:Rapper {rapperName:{neoRapperName}}) MERGE(a)-[r:SUNG_BY]->(b) RETURN a,b",
    {neoName: albumName, neoRapperName: rapperName});
    session.close();


    session
    .run("MERGE(n:RecordCompany {labelName:{neoRecordCompanyName}}) RETURN n",
    {neoRecordCompanyName: labelName});
    session.close();

    session
    .run("MATCH(a:Album {name:{neoName}}),(b:RecordCompany {labelName:{neoRecordCompanyName}}) MERGE(a)-[r:PRODUCED_BY]->(b) RETURN a,b",
    {neoName: albumName, neoRecordCompanyName: labelName})
    .then(function(result) {
      res.status(200).json({"response": "Album added to front page."});
      session.close();
    })
    .catch((error) => {
    });

    Album.create(
        req.body,
        function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});

routes.get('/rappers/:rapperName', function (req, res) {
  var rapperName = req.params.rapperName;

  session
    .run("MATCH (:Rapper { rapperName:{neoRapperName}})-[:SUNG_BY]-(b:Album) RETURN b", {neoRapperName: rapperName})
    .then(function(result) {
      res.status(200).json(result);
      session.close();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
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

routes.put('/albums/:name', function(req, res) {
  var albumArtist = req.body.artist;
  var albumNameBody = req.body.name;
  var albumName = req.params.name;
  var albumPictureURL = req.body.pictureURL;
  var albumTracks = req.body.tracks;
  var albumLengthMin = req.body.lengthMin;

  var rapperName = req.body.rapper.rapperName;
  var rapperBreakThroughTrack = req.body.rapper.breakthroughTrack;
  var rapperDateOfBirth = req.body.rapper.dateOfBirth;

  var labelName = req.body.recordcompany.labelName;

  session
  .run("MATCH (n { name:{neoName}})-[r:PRODUCED_BY]->() DELETE r",
  {neoName: albumName})
  session.close();

  session
  .run("MATCH (n { name:{neoName}})-[r:SUNG_BY]->() DELETE r",
  {neoName: albumName})
  session.close();

  session
  .run("MATCH(n:Album {name:{neoName}}) SET n.name={neoNameBody}, n.artist={neoArtist}, n.pictureURL={neoPictureURL}, n.tracks={neoTracks}, n.lengthMin={neoLengthMin}",
  {neoArtist: albumArtist, neoName: albumName, neoPictureURL: albumPictureURL, neoTracks: albumTracks, neoLengthMin: albumLengthMin, neoNameBody: albumNameBody});
  session.close();

  session
  .run("MATCH(a:Album {name:{neoNameBody}}),(b:RecordCompany {labelName:{neoRecordCompanyName}}) MERGE(a)-[r:PRODUCED_BY]->(b) RETURN a,b",
  {neoNameBody: albumNameBody, neoRecordCompanyName: labelName});
  session.close();

  session
  .run("MATCH(a:Album {name:{neoNameBody}}),(b:Rapper {rapperName:{neoRapperName}}) MERGE(a)-[r:SUNG_BY]->(b) RETURN a,b",
  {neoNameBody: albumNameBody, neoRapperName: rapperName})
    .then(function(result) {
    session.close();
  })
  .catch((error) =>  {
  });

    Album.findOneAndUpdate({name: req.params.name}, req.body,
            {
                runValidators: true
            },
            function(err, result) {
              if (err) return res.send(err);
              res.send(result);
        });

});

routes.delete('/albums/:name', function(req, res) {
    var albumName = req.params.name;

    session
    .run("MATCH (n:Album{name:{neoName}}) DETACH DELETE n",
    {neoName: albumName})
    .then(function(result) {
    session.close();
  })
  .catch((error) =>  {
  });

    Album.remove({name: req.params.name},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
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
