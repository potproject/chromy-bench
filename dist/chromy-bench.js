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
_commander2.default.version('0.0.1').usage('chromy-bench [options] <url>').option('-c, --count <n>', 'URL Access Count', parseInt).option('-nocache, --no-cache', 'Not Using Browser Cache').option('-nocookie, --no-cookie', 'Not Using Browser Cookies').option('-v, --visible', 'Visible Chrome Browser').option('-ua, --user-agent <ua>', 'Setting User Agent (pc/mobile)', /^(pc|mobile)$/i, 'pc').option('-setcookie, --set-cookie <cookie>', 'Set Cookie Params (JSONText)').option('-i --interval <interval>', 'Web Browser Access Interval (ms)', parseInt, '100').parse(process.argv);

if (_commander2.default.args.length < 1) {
    console.log("invaild Paramaters <url>");
    process.exit(1);
}
class ChromyBenchClass {
    constructor(program) {
        this.urlArgs = program.args;
        this.count = program.count ? program.count : 1;
        this.noCache = program.noCache ? true : false;
        this.noCookie = program.noCookie ? true : false;
        this.userAgent = program.userAgent ? program.userAgent : 'pc';
        this.visible = program.visible ? true : false;
        this.setCookie = program.setCookie ? JSON.parse(program.setCookie) : null;
        this.interval = program.interval ? program.interval : 100;
        this.chromy = new _chromy2.default({
            visible: this.visible
        });
    }
    async sleep(msec) {
        return new Promise(resolve => {
            return setTimeout(resolve, msec);
        });
    }
    getTimeNow() {
        return new Date().getTime();
    }
    async run() {
        try {
            let firstLoad = true;
            if (this.userAgent === "mobile") {
                await this.chromy.emulate('iPhone6');
            }
            if (this.setCookie) {
                await this.chromy.setCookie(setCookie);
            }

            let timerResultDOMContentLoaded = [];
            let timerResultLoad = [];
            await this.chromy.start();
            await this.sleep(1000);
            while (this.count > 0) {
                let start_ms = this.getTimeNow();
                await this.chromy.goto(this.urlArgs[0], {
                    waitLoadEvent: false
                });
                await this.chromy.client.Page.domContentEventFired();
                let DOMContentLoaded = this.getTimeNow() - start_ms;
                await this.chromy.client.Page.loadEventFired();
                let Load = this.getTimeNow() - start_ms;
                timerResultDOMContentLoaded.push(DOMContentLoaded);
                timerResultLoad.push(Load);
                if (firstLoad) {
                    console.log("DOMContentLoaded " + DOMContentLoaded + "ms Load " + Load + "ms");
                    firstLoad = false;
                } else {
                    console.log("DOMContentLoaded " + DOMContentLoaded + "ms Load " + Load + "ms");
                }
                this.count--;
                if (this.noCache) {
                    await this.chromy.clearBrowserCache();
                }
                if (this.noCookie) {
                    await this.chromy.clearAllCookies();
                    if (this.setCookie) {
                        await this.chromy.setCookie(setCookie);
                    }
                }
                await this.sleep(this.interval);
            }
            await this.chromy.close();

            //result
            console.log("--- " + this.urlArgs[0] + " statistics ---");
            console.log("DOMContentLoaded:");
            console.log("round-trip min/avg/max/stddev = " + statistical.min(timerResultDOMContentLoaded) + "/" + statistical.avg(timerResultDOMContentLoaded) + "/" + statistical.max(timerResultDOMContentLoaded) + "/" + statistical.stddev(timerResultDOMContentLoaded) + " ms");
            console.log("Load:");
            console.log("round-trip min/avg/max/stddev = " + statistical.min(timerResultLoad) + "/" + statistical.avg(timerResultLoad) + "/" + statistical.max(timerResultLoad) + "/" + statistical.stddev(timerResultLoad) + " ms");
        } catch (e) {
            console.error(e);
        }
    }
}

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
const cbc = new ChromyBenchClass(_commander2.default);
cbc.run();

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