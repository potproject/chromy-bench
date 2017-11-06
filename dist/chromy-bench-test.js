/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const statistical = {
    sum(arr) {
        return arr.reduce((prev, current) => prev + current);
    },
    min(arr) {
        return Math.min(...arr);
    },
    avg(arr) {
        return parseInt(this.sum(arr) / arr.length);
    },
    max(arr) {
        return Math.max(...arr);
    },
    stddev(arr) {
        return parseInt(Math.sqrt(this.avg(arr)));
    }
};

exports.default = statistical;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assert = __webpack_require__(6);

var _assert2 = _interopRequireDefault(_assert);

var _statistical = __webpack_require__(0);

var _statistical2 = _interopRequireDefault(_statistical);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('statistical', () => {
    describe('#min()', () => {
        it('Positive Test', () => {
            _assert2.default.equal(1, _statistical2.default.min([1, 2, 3, 4, 5]));
        });
        it('Negative Test', () => {
            (0, _assert2.default)(isNaN(_statistical2.default.min(["A", "B", "C", "D", "E"])));
        });
    });
    describe('#avg()', () => {
        it('Positive Test', () => {
            _assert2.default.equal(3, _statistical2.default.avg([1, 2, 3, 4, 5]));
        });
        it('Negative Test', () => {
            (0, _assert2.default)(isNaN(_statistical2.default.avg(["A", "B", "C", "D", "E"])));
        });
    });
    describe('#max()', () => {
        it('Positive Test', () => {
            _assert2.default.equal(5, _statistical2.default.max([1, 2, 3, 4, 5]));
        });
        it('Negative Test', () => {
            (0, _assert2.default)(isNaN(_statistical2.default.max(["A", "B", "C", "D", "E"])));
        });
    });
    describe('#stddev()', () => {
        it('Positive Test', () => {
            _assert2.default.equal(1, _statistical2.default.stddev([1, 2, 3, 4, 5]));
        });
        it('Negative Test', () => {
            (0, _assert2.default)(isNaN(_statistical2.default.stddev(["A", "B", "C", "D", "E"])));
        });
    });
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ })
/******/ ]);