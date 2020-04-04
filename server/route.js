const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(cors());
router.use(express.json());

const database = require('./dbConnect');
let collection = null;

// need to look up
database.initialize(function (dbCollection) {
  collection = dbCollection;
}, function (err) {
  throw (err);
});

router.get("/getAllMovies", (request, response) => {
  collection.find().toArray((error, result) => {
    if (error) throw error;
    response.send(result);
  });
});

router.get("/getMovie/:id", (request, response) => {
  collection.findOne({ id: request.params.id }, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

router.post("/insertMovie", (request, response) => {
  const item = request.body;
  collection.insertOne(item, (insertError, insertResult) => {
    if (insertError) throw insertError;
    // send back entire updated list, to make sure frontend data is up-to-date
    collection.find().toArray(function (error, result) {
      if (error) throw error;
      response.json(result);
    });
  });
});

router.put("/updateMovie/:id", (request, response) => {
  const item = request.body;
  collection.updateOne({ id: request.params.id }, { $set: item }, (error, result) => {
    if (error) throw error;
    console.log(result);
    response.json(result);
  });
});

router.delete("/deleteMovie/:id", (request, response) => {
  collection.deleteOne({ id: request.params.id }, function (error, result) {
    if (error) throw error;
    response.json(result);
  });
});

module.exports = router;