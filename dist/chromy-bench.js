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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chromy = __webpack_require__(1);

var _chromy2 = _interopRequireDefault(_chromy);

var _commander = __webpack_require__(2);

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Commander
_commander2.default.version('0.0.1').usage('chromy-bench [options] <url>').option('-c, --count <n>', 'URL Access Count', parseInt).option('-nocache, --no-cache', 'Not Using Browser Cache').option('-nocookie, --no-cookie', 'Not Using Browser Cookies').option('-v, --visible', 'Visible Chrome Browser').option('-ua, --user-agent <ua>', 'Setting User Agent (pc/mobile)', /^(pc|mobile)$/i, 'pc').option('-setcookie, --set-cookie <cookie>', 'Set Cookie Params (JSONText)').parse(process.argv);

var url = _commander2.default.args;
var count = _commander2.default.count ? _commander2.default.count : 1;
var noCache = _commander2.default.noCache ? true : false;
var noCookie = _commander2.default.noCookie ? true : false;
var userAgent = _commander2.default.userAgent ? _commander2.default.userAgent : 'pc';
var visible = _commander2.default.visible ? true : false;
var setCookie = _commander2.default.setCookie ? JSON.parse(_commander2.default.setCookie) : null;
if (url.length < 1) {
    console.log("invaild Paramaters <url>");
    process.exit(1);
}
var sleep = function sleep(msec) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, msec);
    });
};

var chromy = new _chromy2.default({
    visible: visible
});
main(chromy, url[0], count, userAgent, noCache, noCookie, setCookie);

async function main(chromy, url) {
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var userAgent = arguments[3];
    var noCache = arguments[4];
    var noCookie = arguments[5];
    var setCookie = arguments[6];

    try {
        var firstLoad = true;
        if (userAgent === "mobile") {
            await chromy.emulate('iPhone6');
        }
        if (setCookie) {
            await chromy.setCookie(setCookie);
        }
        await chromy.start();
        await sleep(1000);
        while (count > 0) {
            var start_ms = getTime();
            await chromy.goto(url, {
                waitLoadEvent: false
            });
            await chromy.waitLoadEvent();
            if (firstLoad) {
                console.log("FirstLoad:" + (getTime() - start_ms) + "ms");
                firstLoad = false;
            } else {
                console.log("Load:" + (getTime() - start_ms) + "ms");
            }
            count--;
            if (noCache) {
                await chromy.clearBrowserCache();
            }
            if (noCookie) {
                await chromy.clearAllCookies();
            }
            await sleep(100);
        }
        await chromy.close();
    } catch (e) {
        console.error(e);
    }
}

function getTime() {
    return new Date().getTime();
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("chromy");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ })
/******/ ]);