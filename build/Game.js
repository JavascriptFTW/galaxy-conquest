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
"use strict";function _typeof(obj){return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol?"symbol":typeof obj;}var MarsGame=(function(){function Mars(){var cfg=arguments.length <= 0 || arguments[0] === undefined?{}:arguments[0];this._fps = 30;this._frameInterval = 1000 / this._fps;}Mars.prototype = { /* Sets the FPS (if a the value argument is supplied) and returns the
           current FPS no matter what */FPS:function FPS(value){var type=typeof value === "undefined"?"undefined":_typeof(value);if(type === "number" || type === "string"){if(typeof value === "string"){value = parseInt(value);if(window.isNaN(value)){console.error("Please supply a valid value to the \"FPS\" method");return;}}this._fps = value;this._frameInterval = 1000 / this._fps;}return this._fps;}, /* Sets a method to run when the game first starts up, before any resources
           have been loaded */init:function init(){}, /* Sets a method to run when all resources have been loaded and the game
           is ready to go */load:function load(){}, /* Sets a method to run whenever progress is made on any resources the
           game has been told to load */progress:function progress(){}, /* Sets a method to run every frame */update:function update(){}, /* Method to add a resource to the queue of resources to fetch before
           the game loads */preload:function preload(){}, /* Method to asynchrynously load a resource */load:function load(){}};module.exports = Mars;return Mars;})();
},{}]},{},[1])