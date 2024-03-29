var express = require('express');
var router = express.Router();
const Mongolib = require("../db/Mongolib");

/* GET home page. */
router.get('/', function (req, res, next) {
    Mongolib.getDatabase(db => {
        Mongolib.findDocuments(db, docs => {
            res.send(docs);
        })
    })
});

router.post('/',function(req,res,next)
{
    Mongolib.getDatabase(db => {
        Mongolib.postDocument(db, req, docs => {
            res.send(docs)
        })
    })
})

module.exports = router;