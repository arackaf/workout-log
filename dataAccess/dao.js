'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require('mongodb');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = void 0;
var dbPromise = _mongodb.MongoClient.connect(process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/workoutlog').then(function (database) {
    return db = database;
}).catch(function (err) {
    return console.log('Error connecting ' + err);
});

var DAO = function () {
    function DAO() {
        _classCallCheck(this, DAO);
    }

    _createClass(DAO, [{
        key: 'open',
        value: function open() {
            return db;
        }
    }, {
        key: 'confirmSingleResult',
        value: function confirmSingleResult(res) {
            var numInserted = +res.result.n;
            if (!numInserted) {
                throw 'Object not inserted';
            }
            if (numInserted > 1) {
                throw 'Expected 1 object to be inserted.  Actual ' + numInserted;
            }
        }
    }, {
        key: 'dispose',
        value: function dispose(db) {}
    }], [{
        key: 'init',
        value: function init() {
            return dbPromise;
        }
    }, {
        key: 'shutdown',
        value: function shutdown() {
            try {
                db.close();
            } catch (err) {}
            db = null;
        }
    }]);

    return DAO;
}();

exports.default = DAO;