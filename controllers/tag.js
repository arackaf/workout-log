'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _easyExpressControllers = require('easy-express-controllers');

var _workoutTagDao = require('../dataAccess/workoutTagDao');

var _workoutTagDao2 = _interopRequireDefault(_workoutTagDao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagController = (_dec = (0, _easyExpressControllers.controller)({ defaultVerb: 'get' }), _dec(_class = function () {
    function TagController() {
        _classCallCheck(this, TagController);
    }

    _createClass(TagController, [{
        key: 'workout',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var workoutTagDAO, results;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                workoutTagDAO = new _workoutTagDao2.default();
                                _context.next = 3;
                                return workoutTagDAO.load();

                            case 3:
                                results = _context.sent;


                                this.send({ success: true, tags: results });

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function workout() {
                return _ref.apply(this, arguments);
            }

            return workout;
        }()
    }]);

    return TagController;
}()) || _class);
exports.default = TagController;