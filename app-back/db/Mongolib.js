const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://127.0.0.1:27017";

const dbName = 'job';

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        callback(db, client);
    });
}

const findDocuments = function (db, callback) {
    const collection = db.collection('offers');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const postDocument = function(db, req, callback) {
    const collection = db.collection('offers');
    const item = {
        name: req.body.name,
        company: req.body.company,
        salary: req.body.salary,
        city: req.body.city
    }
    collection.insertOne(item, function (err, docs)
    {
        assert.equal(err, null);
        callback(docs);
    })
}

exports.getDatabase = getDatabase;
exports.findDocuments = findDocuments;
exports.postDocument = postDocument;