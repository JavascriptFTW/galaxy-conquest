(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";(function(){var MarsEngine=require("../../Mars/build/MarsEngine.js"); // var FPS = 60;
// var FRAME_INTERVAL = 1000 / FPS;
// 
// var renderer = PIXI.autoDetectRenderer(
//     window.innerWidth,
//     window.innerHeight, {});
// 
// var frameCount = 0;
// 
// function runUpdate() {
//     var now = Date.now();
//     if (now - runUpdate.lastUpdate >= FRAME_INTERVAL) {
//         update();
//         frameCount += 1;
//     }
//     window.requestAnimationFrame(runUpdate);
// };
// 
// runUpdate.lastUpdate = -Infinity;
// 
// function init() {
//     document.body.appendChild(renderer.view);
//     window.requestAnimationFrame(runUpdate);
// };
// 
// function update() {
//     console.log("Hi");
// };
// 
// document.addEventListener("DOMContentLoaded", init);
})();
},{"../../Mars/build/MarsEngine.js":2}],2:[function(require,module,exports){
"use strict";var MarsEngine=(function(){var Engine={Game:require("./MarsGame.js")};module.exports = Engine;return Engine;})();
},{"./MarsGame.js":3}],3:[function(require,module,exports){

},{}]},{},[1])