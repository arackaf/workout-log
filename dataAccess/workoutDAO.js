'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkoutDAO = function (_DAO) {
    _inherits(WorkoutDAO, _DAO);

    function WorkoutDAO() {
        _classCallCheck(this, WorkoutDAO);

        return _possibleConstructorReturn(this, (WorkoutDAO.__proto__ || Object.getPrototypeOf(WorkoutDAO)).apply(this, arguments));
    }

    _createClass(WorkoutDAO, [{
        key: 'save',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(workout, sections) {
                var db;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _get(WorkoutDAO.prototype.__proto__ || Object.getPrototypeOf(WorkoutDAO.prototype), 'open', this).call(this);

                            case 2:
                                db = _context.sent;
                                _context.next = 5;
                                return db.collection('workouts').insert(workout);

                            case 5:
                                _context.next = 7;
                                return Promise.all(sections.map(function (s) {
                                    s.workoutId = workout._id;
                                    return db.collection('sections').insert(s);
                                }));

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return save;
        }()
    }]);

    return WorkoutDAO;
}(_dao2.default);

exports.default = WorkoutDAO;