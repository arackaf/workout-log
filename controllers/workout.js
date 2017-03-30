'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _easyExpressControllers = require('easy-express-controllers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var workoutController = (_dec = (0, _easyExpressControllers.controller)({ defaultVerb: 'post' }), _dec(_class = function () {
    function workoutController() {
        _classCallCheck(this, workoutController);
    }

    _createClass(workoutController, [{
        key: 'save',
        value: function save() {
            console.log('SAVE');
        }
    }]);

    return workoutController;
}()) || _class);
exports.default = workoutController;