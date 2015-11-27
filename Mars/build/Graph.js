"use strict";var _createClass=(function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if("value" in descriptor)descriptor.writable = true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass !== "function" && superClass !== null){throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}function _typeof(obj){return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol?"symbol":typeof obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Graph=(function(){var _=require("underscore");var UIDGenerator=require("./UIDGenerator");var CALLBACK_UID_KEY="_mars_graph_callback_uid";var uidGenerator=new UIDGenerator({sequenceLength:30});var GraphObject=(function(){function GraphObject(_ref){var _ref$data=_ref.data;var data=_ref$data === undefined?{}:_ref$data;var _ref$listen=_ref.listen;var listen=_ref$listen === undefined?{}:_ref$listen;var _ref$verify=_ref.verify;var verify=_ref$verify === undefined?{}:_ref$verify;var _ref$change=_ref.change;var change=_ref$change === undefined?{}:_ref$change;_classCallCheck(this,GraphObject);this._listeners = {};this._data = {};this._checks = {};this._changeListeners = {};for(var evt in listen) {if(listen.hasOwnProperty(evt)){this.on(evt,listen[evt]);}}this.data(data);this.verify(verify);this.change(change);}_createClass(GraphObject,[{key:"data",value:function data(dat){this._data = _.extendOwn(this._data,dat);return this;}},{key:"_callbackify",value:function _callbackify(callback){if(typeof callback === "function"){if(!callback[CALLBACK_UID_KEY]){callback[CALLBACK_UID_KEY] = uidGenerator.generate();}}else if(callback.constructor === Array){callback.map(function(fn){if(!fn[CALLBACK_UID_KEY]){fn[CALLBACK_UID_KEY] = uidGenerator.generate();}});}} /*
         Description:
            Adds one or more event listeners to this object
         Usage:
            on(event, callback)
                Adds `callback` as a listener for the `event` event
            on(event, callbacks)
                Adds all methods within the `callbacks` array as listeners
                for the `event` event
            on(json)
                Uses a `json` object where the keys are event names and the
                values are event listeners (or arrays of listeners) and Adds
                them
         */},{key:"on",value:function on(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}if(args.length === 1){return this._onJSON.apply(this,args);}if(args.length >= 2){return this._onEvtCallback.apply(this,args);}return this;}},{key:"_onJSON",value:function _onJSON(json){if((typeof json === "undefined"?"undefined":_typeof(json)) !== "object"){return this;}for(var evt in json) {if(json.hasOwnProperty(evt)){this._onEvtCallback(evt,json[evt]);}}return this;}},{key:"_onEvtCallback",value:function _onEvtCallback(evt){var callback=arguments.length <= 1 || arguments[1] === undefined?function(){}:arguments[1];if(typeof evt !== "string" || typeof callback !== "function" && callback.constructor !== Array){return this;}if(typeof this._listeners[evt] === "undefined" || this._listeners[evt].constructor !== Array){this._listeners[evt] = [];}if(typeof callback === "function"){callback[CALLBACK_UID_KEY] = uidGenerator.generate();this._listeners[evt].push(callback);}else if(callback.constructor === Array){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=callback[Symbol.iterator](),_step;!(_iteratorNormalCompletion = (_step = _iterator.next()).done);_iteratorNormalCompletion = true) {var listener=_step.value;this._onEvtCallback(evt,listener);}}catch(err) {_didIteratorError = true;_iteratorError = err;}finally {try{if(!_iteratorNormalCompletion && _iterator.return){_iterator.return();}}finally {if(_didIteratorError){throw _iteratorError;}}}}return this;} /*
         Description:
            Unbinds one or more event listeners from an object
         Usage:
            off(event, listener)
                Removes the listener on the `event` event matching `listener`
                (if any)
            off(event, listeners)
                Unbinds all listeners within the `listeners` array from the
                `event` event
            off(json)
                Uses a JSON object where the keys are event names and the values
                are event listeners (or groups of them) and remove all listeners
                from their respective events
         */},{key:"off",value:function off(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2 < _len2;_key2++) {args[_key2] = arguments[_key2];}if(args.length === 1){return this._offJSON.apply(this,args);}if(args.length >= 2){return this._offEvtCallback.apply(this,args);}return this;}},{key:"_offJSON",value:function _offJSON(json){if((typeof json === "undefined"?"undefined":_typeof(json)) !== "object"){return this;}for(var evt in json) {if(json.hasOwnProperty(evt)){this._offEvtCallback(evt,json[evt]);}}return this;}},{key:"_offEvtCallback",value:function _offEvtCallback(evt,callback){var _this=this;if(this._listeners[evt] === undefined){return this;}if(typeof callback === "function"){var _ret=(function(){if(!callback[CALLBACK_UID_KEY]){return {v:_this};}var callbackUid=callback[CALLBACK_UID_KEY];var filtered=_this._listeners[evt].filter(function(val){return val[CALLBACK_UID_KEY] !== callbackUid;});if(!filtered.length){delete _this._listeners[evt];}else {_this._listeners[evt] = filtered;}})();if((typeof _ret === "undefined"?"undefined":_typeof(_ret)) === "object")return _ret.v;}else if(callback.constructor === Array){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=callback[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);_iteratorNormalCompletion2 = true) {var listener=_step2.value;this._offEvtCallback(evt,listener);}}catch(err) {_didIteratorError2 = true;_iteratorError2 = err;}finally {try{if(!_iteratorNormalCompletion2 && _iterator2.return){_iterator2.return();}}finally {if(_didIteratorError2){throw _iteratorError2;}}}}return this;} /*
         Description:
            Fires one or more events with optional data
         Usage:
            fire(event, data)
                Fires the `event` event passing the `data` object to it
            fire(events, data)
                Fires all events in `events` passing the data object to them
            fire(json)
                `json` is a JSON object containing the names of events as keys
                and the data to pass to them when fired as values
         */},{key:"fire",value:function fire(){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3 < _len3;_key3++) {args[_key3] = arguments[_key3];}if(!args.length){return this;}if(args.length === 1 && _typeof(args[0]) === "object" && args[0].constructor !== Array){return this._fireJSON.apply(this,args);}if(args[0].constructor === Array){return this._fireEvents.apply(this,args);}if(typeof args[0] === "string"){return this._fireEvent.apply(this,args);}return this;}},{key:"_fireJSON",value:function _fireJSON(json){for(var eventName in json) {if(json.hasOwnProperty(eventName)){this._fireEvent(eventName,json[eventName]);}}return this;}},{key:"_fireEvents",value:function _fireEvents(eventNames,data){var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=eventNames[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);_iteratorNormalCompletion3 = true) {var eventName=_step3.value;this._fireEvent(eventName,data);}}catch(err) {_didIteratorError3 = true;_iteratorError3 = err;}finally {try{if(!_iteratorNormalCompletion3 && _iterator3.return){_iterator3.return();}}finally {if(_didIteratorError3){throw _iteratorError3;}}}return this;}},{key:"_fireEvent",value:function _fireEvent(eventName,data){if(this._listeners.hasOwnProperty(eventName)){var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=this._listeners[eventName][Symbol.iterator](),_step4;!(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);_iteratorNormalCompletion4 = true) {var listener=_step4.value;listener(data);}}catch(err) {_didIteratorError4 = true;_iteratorError4 = err;}finally {try{if(!_iteratorNormalCompletion4 && _iterator4.return){_iterator4.return();}}finally {if(_didIteratorError4){throw _iteratorError4;}}}}return this;}},{key:"change",value:function change(listeners){_.mapObject(listeners,function(value,key){});return this;}},{key:"verify",value:function verify(checks){_.mapObject(checks,function(value,key){});return this;}}]);return GraphObject;})();var Graph=(function(_GraphObject){_inherits(Graph,_GraphObject);function Graph(){var cfg=arguments.length <= 0 || arguments[0] === undefined?{}:arguments[0];_classCallCheck(this,Graph);return _possibleConstructorReturn(this,Object.getPrototypeOf(Graph).call(this,cfg));}return Graph;})(GraphObject);var Node=(function(_GraphObject2){_inherits(Node,_GraphObject2);function Node(){var cfg=arguments.length <= 0 || arguments[0] === undefined?{}:arguments[0];_classCallCheck(this,Node);return _possibleConstructorReturn(this,Object.getPrototypeOf(Node).call(this,cfg));}return Node;})(GraphObject);var Edge=(function(_GraphObject3){_inherits(Edge,_GraphObject3);function Edge(){var cfg=arguments.length <= 0 || arguments[0] === undefined?{}:arguments[0];_classCallCheck(this,Edge);return _possibleConstructorReturn(this,Object.getPrototypeOf(Edge).call(this,cfg));}_createClass(Edge,[{key:"connect",value:function connect(){}},{key:"unconnect",value:function unconnect(){}}]);return Edge;})(GraphObject);Graph.Node = Node;Graph.Edge = Edge;module.exports = Graph;return Graph;})();