var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/congress';
/* GET home page. */
router.get('/latestbills', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
    let skip;
    skip = req.query.page == undefined? 1: 100* req.query.page;
    var collection = db.collection('data');
    collection.find().limit(100).sort({status_at:-1}).skip(skip).toArray(function(err, docs) {
    res.setHeader('Content-Type', 'application/json');
    res.json(docs);
  });

  db.close();
});
});

module.exports = router;

