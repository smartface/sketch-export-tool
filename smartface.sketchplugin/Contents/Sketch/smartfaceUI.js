var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var documents = __webpack_require__(2).getDocuments();

var _color = {
    alpha: null,
    blue: null,
    green: null,
    red: null
};
var _text = {
    text: "",
    color: _color,
    font: "",
    size: 0
};
var _frame = {
    height: 0,
    width: 0,
    x: 0,
    y: 0
};
var _lib = {
    libID: "",
    x: 0, // library x - page x 
    y: 0,
    height: 0,
    width: 0,
    isLib: false
};

var _shadow = {
    isEnabled: false,
    x: 0,
    y: 0,
    radius: 0,
    color: null
};
var _border = {
    color: null,
    radius: 0,
    width: 0
};
/* Component definiation*/
var _component = {
    type: "",
    name: "",
    objectName: "",
    id: "",
    "class": "",
    parentID: "",
    frame: _frame,
    children: [],
    property: {
        isVisible: false,
        isClickable: false,
        hasBacgroundColor: false,
        color: _color
    },
    text: _text,
    image: ""
};

var libraryMap = new Map();
var horizontalAlignment = new Map();
horizontalAlignment.set(0, "LEFT"); // left
horizontalAlignment.set(1, "RIGHT"); // right
horizontalAlignment.set(2, "CENTER"); // center
horizontalAlignment.set(3, "CENTER"); // justify 
var HORIZONTAL_ALIGNMENT_DEFAULT = horizontalAlignment.get(0);

/* component id create */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + "-" + s4() + "-" + s4() + "-" + s4();
}
/*
 * type[0] : class name ,
 * type[1] : name 
 */
function setComponent(component, type, sketch_component, color) {

    component.name = sketch_component.name;
    component.type = type[0];
    component.objectName = type[1];
    setFrame(component, sketch_component);
    colorRGBA(component, color);
}

function colorRGBA(component, color) {
    component.property.color.alpha = color.alpha;
    component.property.color.blue = color.blue;
    component.property.color.green = color.green;
    component.property.color.red = color.red;
}

function setFrame(component, sketch_component) {
    if (component.frame.height === 0 && component.frame.width === 0) {
        component.frame.height = sketch_component.frame.height;
        component.frame.width = sketch_component.frame.width;
        component.frame.x = sketch_component.frame.x;
        component.frame.y = sketch_component.frame.y;
    } else {
        component.lib.height = sketch_component.frame.height;
        component.lib.width = sketch_component.frame.width;
        component.lib.x = sketch_component.frame.x;
        component.lib.y = sketch_component.frame.y;
    }
}

// The library item frame new calculate 
function calculateNewFrame(component, parent) {}
//component.frame.height -= (parent.lib.height - parent.frame.height);
//component.frame.width -= (parent.lib.width - parent.frame.width);
//component.frame.x += (parent.frame.x);
//component.frame.y += (parent.frame.y);


/**
	sketch text to component text 
*/
function fill_text_object(sketch_component) {
    var textObj = createTextObject();
    var txJson = sketchToJson(sketch_component);
    var attributes = txJson.attributedString.value.attributes[0];
    var alignment = attributes.NSParagraphStyle.style.alignment; // horizontal alignment
    var test = attributes.textStyleVerticalAlignmentKey;

    textObj.font = attributes.NSFont.attributes.NSFontNameAttribute;
    textObj.text = txJson.attributedString.value.text;
    textObj.size = attributes.NSFont.attributes.NSFontSizeAttribute;
    textObj.color = colorHex_Rgba(attributes.MSAttributedStringColorAttribute.value);

    if (attributes.MSAttributedStringTextTransformAttribute != null) {
        if (attributes.MSAttributedStringTextTransformAttribute == 1) // uppercase
            textObj.text = String(textObj.text).toUpperCase('tr-TR');else if (attributes.MSAttributedStringTextTransformAttribute == 2) // lowercase  
            textObj.text = String(textObj.text).toLowerCase('tr-TR');
    }
    textObj.horizontalAlignment = horizontalAlignment.get(alignment) || HORIZONTAL_ALIGNMENT_DEFAULT;
    textObj.verticalAlignment = "MID";
    return textObj;
}

/*
 * sketch_data : sketch_component.layers[iter]
 * Each component layers data 
 */
function borderSet(sketch_data) {
    var borderObject = createBorderObject();
    if (sketch_data == null) return borderObject;
    if (sketch_data.style.borders == null) return borderObject;
    if (sketch_data.style.borders[0] == null) return borderObject;
    var brJson = sketchToJson(sketch_data);
    if (String(brJson.style.borders[0].isEnabled) == "1") {
        // Border 
        borderObject.width = brJson.style.borders[0].thickness;
        borderObject.color = colorHex_Rgba(brJson.style.borders[0].color.value);
        /*if (borderObject.width == 0.5)
            log(JSON.stringify(brJson.style.borders[0]))*/
    }
    borderObject.radius = brJson.layers[0].points[0].cornerRadius;
    return borderObject;
}

function shadowSet(sketch_data) {
    var shadow = createShadowObject();
    if (sketch_data == null) return shadow;
    if (sketch_data.shadows == null) return shadow;
    if (sketch_data.shadows[0] == null) return shadow;
    if (sketch_data.shadows[0].type != "Shadow") return shadow;
    var shJson = sketchToJson(sketch_data);
    if (sketch_data.shadows[0].enabled) {

        shadow.isEnabled = true;
        shadow.x = shJson.shadows[0].offsetX;
        shadow.y = shJson.shadows[0].offsetY;
        shadow.radius = shJson.shadows[0].blurRadius;
        shadow.color = colorHex_Rgba(shJson.shadows[0].color.value);
    }
    return shadow;
}

function setResize(containerComponent, sketchComponent) {
    var resize = context.command.valueForKey_onLayer_forPluginIdentifier("sf-resize", sketchComponent.sketchObject, 'smartface.io');
    resize = JSON.parse(resize);
    containerComponent.resize = resize;
}

// sketch_data : sketch_component.layers[iter].style
function colorSet(sketch_data) {
    var color = createColorObject();
    if (sketch_data == null) return color;
    if (sketch_data.fills == null) return color;
    if (sketch_data.fills[0] == null) return color;
    if (sketch_data.fills[0].color == null) return color;
    var clJson = sketchToJson(sketch_data);
    color = colorHex_Rgba(clJson.fills[0].color.value);
    return color;
}

function colorHex_Rgba(sketch_data) {
    var color = createColorObject();
    var rgba;
    if (String(sketch_data.substring(0, 1)) == "r") {
        rgba = sketch_data;
    } else if (String(sketch_data.substring(0, 1)) == "#") {
        rgba = hexToRgbA(sketch_data);
    }

    if (rgba != null) color = rgbToColor(rgba);
    return color;
}

function symbolInstanceFinder(sketch_component) {

    if (sketch_component.type == "SymbolInstance") {
        for (var i = 0; i < documents.length; i++) {
            var val = documents[i].getSymbolMasterWithID(sketch_component.symbolId);
            if (val != null) return val;
        }
    }
}

function shapeFinder(sketch_component) {
    for (var i = 0; i < documents.length; i++) {
        var val = documents[i].getLayerWithID(sketch_component.id);
        if (val != null) return val;
    }
}

function rgbToColor(rgba) {
    var color = createColorObject();
    if (String(rgba.substring(0, 4)) == "rgba") {
        var firstIndex = rgba.indexOf('(') + 1;
        var lastIdex = rgba.indexOf(')');
        var colorArr = rgba.substring(firstIndex, lastIdex).split(',');
        color.red = parseInt(colorArr[0]);
        color.green = parseInt(colorArr[1]);
        color.blue = parseInt(colorArr[2]);
        color.alpha = parseFloat(colorArr[3]);
    }
    return color;
}

function isShape(component) {
    var _component = sketchToJson(component);
    if (_component.userInfo != null) if (_component.userInfo["smartface.io"] != null) if (_component.userInfo["smartface.io"]["sf-tag"] == "shape") return true;
    return false;
}

function isSfType(component) {
    var _component = sketchToJson(component);
    if (_component.userInfo != null) if (_component.userInfo["smartface.io"] != null) if (_component.userInfo["smartface.io"]["sf-tag"] != "" && _component.userInfo["smartface.io"]["sf-tag"] != null && _component.userInfo["smartface.io"]["sf-tag"] != "null") return true;
    return false;
}

function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');

        return 'rgba(' + [c >> 16 & 255, c >> 8 & 255, c & 255].join(',') + ', 1 )';
    }
}

function sketchToJson(component) {
    var pageDict = component.sketchObject.treeAsDictionary();

    var jsonData = NSJSONSerialization.dataWithJSONObject_options_error_(pageDict, 0, nil);
    var jsonString = NSString.alloc().initWithData_encoding_(jsonData, NSUTF8StringEncoding);
    var sketch_container = JSON.parse(jsonString);
    return sketch_container;
}

/* Object create section */
function createPageObject() {
    var pageTreeComp = Object.assign({}, _component, {
        frame: createFrameObject(),
        children: Object.assign([], _component.children),
        text: Object.assign({}, _component.text),
        property: Object.assign({}, _component.property, {
            color: createColorObject()
        }),
        lib: createLibObject()
    });

    pageTreeComp.id = guid(); // Assign id for component 

    return pageTreeComp;
}

function createBorderObject() {
    return Object.assign({}, _border, {
        color: createColorObject()
    });
}

function createShadowObject() {
    return Object.assign({}, _shadow, {
        color: createColorObject()
    });
}

function createTextObject() {
    var text = Object.assign({}, _text, {
        color: createColorObject()
    });
    return text;
}

function createColorObject() {
    var color = Object.assign({}, _color);
    return color;
}

function createFrameObject() {
    var frame = Object.assign({}, _frame);
    return frame;
}

function createLibObject() {
    var lib = Object.assign({}, _lib);
    return lib;
}

function setLibProperty(containerComponent, sketchComponent) {
    containerComponent.lib.isLib = true;
    if (sketchComponent.type == "SymbolInstance") {
        var symbolId = sketchComponent.symbolId;
        var id = libraryMap.get(symbolId);
        if (id == null) {
            var newId = guid();
            libraryMap.set(symbolId, newId);
            containerComponent.lib.libID = newId;
        } else {
            containerComponent.lib.libID = id;
        }
    } else {
        containerComponent.lib.libID = guid();
    }
}
/*
 * if the objects circle this method help to detect . 
 */
function circleObject(sketchComponent) {
    var slJson = sketchToJson(sketchComponent);
    if (slJson.layers != null) {
        if (slJson.layers[0] != null) {
            if (slJson.layers[0]["<class>"] == "MSOvalShape") {
                // Thumb
                return true;
            }
        }
    }
    return false;
}

/**
 * Set the component parents Id
 */
function setParentId(sketchComponet, parent) {
    sketchComponet.parentID = parent.id;
}

function getClass(component) {
    var _component = sketchToJson(component);
    if (_component.userInfo != null) if (_component.userInfo["smartface.io"] != null) if (_component.userInfo["smartface.io"]["sf-class"] != "" && _component.userInfo["smartface.io"]["sf-class"] != null && _component.userInfo["smartface.io"]["sf-class"] != "null") return _component.userInfo["smartface.io"]["sf-class"];
    return null;
}

/**
 *  -> Visibility Set
 *  -> Class Set
 */
function setFirstPropery(containerComponent, sketchComponent, parent) {
    var classN = getClass(sketchComponent); // Class set
    if (classN != null) containerComponent["class"] = classN;
    containerComponent.parentFrame = parent.frame;
    setResize(containerComponent, sketchComponent);
    if (sketchComponent.hidden != null) // Visiblity set 
        if (sketchComponent.hidden) containerComponent.property.isVisible = false;else containerComponent.property.isVisible = true;
}
module.exports = {
    symbolInstanceFinder: symbolInstanceFinder,
    createBorderObject: createBorderObject,
    createShadowObject: createShadowObject,
    createColorObject: createColorObject,
    calculateNewFrame: calculateNewFrame,
    createPageObject: createPageObject,
    createTextObject: createTextObject,
    fill_text_object: fill_text_object,
    setFirstPropery: setFirstPropery,
    setLibProperty: setLibProperty,
    colorHex_Rgba: colorHex_Rgba,
    setComponent: setComponent,
    sketchToJson: sketchToJson,
    circleObject: circleObject,
    shapeFinder: shapeFinder,
    setParentId: setParentId,
    colorRGBA: colorRGBA,
    borderSet: borderSet,
    shadowSet: shadowSet,
    setFrame: setFrame,
    colorSet: colorSet,
    isSfType: isSfType,
    isShape: isShape,
    guid: guid
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(5)

var setInterval
var clearInterval

var fibers = []

if (fiberAvailable()) {
  setInterval = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithRepeatingInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearInterval = function (id) {
    var interval = fibers[id]
    if (interval) {
      interval.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setInterval = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    function trigger () {
      coscript.scheduleWithInterval_jsFunction(
        (delay || 0) / 1000,
        function () {
          if (fibers[id]) { // if not cleared
            func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
            trigger()
          }
        }
      )
    }
    trigger()
    return id
  }

  clearInterval = function (id) {
    fibers[id] = false
    if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
      coscript.shouldKeepAround = false
    }
  }
}

module.exports = {
  setInterval: setInterval,
  clearInterval: clearInterval
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

function EventEmitter () {}

// By default, a maximum of 10 listeners can be registered for any single event.
EventEmitter.defaultMaxListeners = 10

// Shortcuts to improve speed and size
var proto = EventEmitter.prototype

proto._maxListeners = EventEmitter.defaultMaxListeners

function indexOfListener (listeners, listener) {
  var i = listeners.length
  while (i--) {
    if (listeners[i].listener === listener) {
      return i
    }
  }

  return -1
}

function alias (name) {
  return function aliasClosure () {
    return this[name].apply(this, arguments)
  }
}

function isValidListener (listener) {
  if (typeof listener === 'function') {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

proto._getListeners = function _getListeners (evt) {
  var events = this._getEvents()

  return events[evt] || (events[evt] = [])
}

proto._getEvents = function _getEvents () {
  return this._events || (this._events = {})
}

/*
  Alias for emitter.on(eventName, listener).
*/
proto.addListener = alias('on')

/*
  Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.

  Returns true if the event had listeners, false otherwise.
*/
proto.emit = function emit (evt) {
  var args = Array.prototype.slice.call(arguments, 1)
  var listeners = this._getListeners(evt) || []
  var listener
  var i
  var key
  var response

  for (i = 0; i < listeners.length; i++) {
    listener = listeners[i]

    if (listener.once === true) {
      this.removeListener(evt, listener.listener)
    }

    response = listener.listener.apply(this, args || [])
  }

  return listeners.length > 0
}

/*
  Returns an array listing the events for which the emitter has registered listeners.
  The values in the array will be strings or Symbols.
*/
proto.eventNames = function eventNames () {
  var events = this._getEvents()
  return Object.keys(events)
}

/*
  Returns the current max listener value for the EventEmitter which is either set by emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
*/
proto.getMaxListeners = function getMaxListeners() {
  return this._maxListeners
}

/*
  Returns the number of listeners listening to the event named eventName.
*/
proto.listenerCount = function listenerCount(eventName) {
  return this._getListeners(eventName).length
}

/*
  Returns a copy of the array of listeners for the event named eventName.
*/
proto.listeners = function listeners(eventName) {
  return this._getListeners(eventName).map(function (wrappedListener) {
    return wrappedListener.listener
  })
}

/*
  Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.on = function on (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.push(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependOnceListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.once = function once (evt, listener) {
  return this.on(evt, {
    listener: listener,
    once: true
  })
}

/*
  Adds the listener function to the beginning of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependListener = function prependListener (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.unshift(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName to the beginning of the listeners array. The next time eventName is triggered, this listener is removed, and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependOnceListener = function prependOnceListener (evt, listener) {
  return this.prependListener(evt, {
    listener: listener,
    once: true
  })
}

/*
  Removes all listeners, or those of the specified eventName.

  Note that it is bad practice to remove listeners added elsewhere in the code, particularly when the EventEmitter instance was created by some other component or module (e.g. sockets or file streams).

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeAllListeners = function removeAllListeners (evt) {
  var events = this._getEvents()

  if (typeof evt === 'string') {
    // Remove all listeners for the specified event
    delete events[evt]
  } else {
    // Remove all listeners in all events
    delete this._events
  }

  return this
}

/*
  Removes the specified listener from the listener array for the event named eventName.

  removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified eventName, then removeListener must be called multiple times to remove each instance.

  Note that once an event has been emitted, all listeners attached to it at the time of emitting will be called in order. This implies that any removeListener() or removeAllListeners() calls after emitting and before the last listener finishes execution will not remove them from emit() in progress. Subsequent events will behave as expected.

  Because listeners are managed using an internal array, calling this will change the position indices of any listener registered after the listener being removed. This will not impact the order in which listeners are called, but it means that any copies of the listener array as returned by the emitter.listeners() method will need to be recreated.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeListener = function removeListener (evt, listener) {
  var listeners = this._getListeners(evt)

  var index = indexOfListener(listeners, listener)

  if (index !== -1) {
    listeners.splice(index, 1)

    this.emit('removeListener', evt, listener)
  }

  return this
}

/*
  By default EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default that helps finding memory leaks. Obviously, not all events should be limited to just 10 listeners. The emitter.setMaxListeners() method allows the limit to be modified for this specific EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.setMaxListeners = function setMaxListeners (n) {
  this._maxListeners = n
  return this
}

/*
  Returns a copy of the array of listeners for the event named eventName, including any wrappers (such as those created by .once).
*/
proto.rawListeners = function rawListeners (evt) {
  return this._getListeners(evt).slice()
}

module.exports = EventEmitter


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *  That file create a folders for outputs
 *  Write pgx,cpx
 *  create(use pgx information) scripts/ page1.js page2.js ...
 *  
 */
var fs = __webpack_require__(25);
var UI = __webpack_require__(0);
var sketch = __webpack_require__(1);
var fileManager = NSFileManager.defaultManager();
var names = [];

function creat_output_folders(currentPath, filePreName) {
    var projectName = String(filePreName).substring(String(filePreName).lastIndexOf("/") + 1, String(filePreName).lastIndexOf(".sketch"));
    //var output_directory = String(currentPath).substring(0, String(currentPath).lastIndexOf("/"));
    var outputDirectory = currentPath + "/" + projectName + "_Smarface";
    //if (fs.existsSync(outputDirectory)) // Remove directory
    //  fs.rmdirSync(outputDirectory)
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
        fs.mkdirSync(outputDirectory + "/.ui");
        fs.mkdirSync(outputDirectory + "/.ui/library");
        fs.mkdirSync(outputDirectory + "/images");
        //fs.mkdirSync(outputDirectory + "/fonts");
    }
    return {
        rootFolder: outputDirectory,
        pgxFolder: outputDirectory + "/.ui",
        cpxFolder: outputDirectory + "/.ui/library",
        imageFolder: outputDirectory + "/images"
        //fontsFolder: outputDirectory + "/fonts"
    };
}

function write_datas(folders, smartface_data) {

    for (var iter in smartface_data.pgx) {
        var filename = smartface_data.pgx[iter].components[0].props.name;
        write_file(folders.pgxFolder + "/" + filename + ".pgx", JSON.stringify(smartface_data.pgx[iter], null, '\t'));
    }
    writeLibrary(folders, smartface_data);
}

function writeLibrary(folders, smartface_data) {
    for (var iter in smartface_data.cpx) {
        var filename = folders.cpxFolder;
        filename += "/" + smartface_data.cpx[iter].components[0].props.name;
        write_file(filename + ".cpx", JSON.stringify(smartface_data.cpx[iter], null, '\t'));
    }
}

function write_file(output_file, data) {
    if (fs.existsSync(output_file)) fs.rmdirSync(output_file);
    fs.appendFileSync(output_file, data);
}

function imageExport(sketch_component, imageFolder) {
    var imageName = sketch_component.name;
    if (!checkAlreadyExport(imageName, imageFolder)) {
        iosImageExport(sketch_component, imageFolder);
        andoidImageExport(sketch_component, imageFolder);
    }
}

function checkAlreadyExport(imageName, imageFolder) {
    var directory = imageFolder + "/Android" + "/drawable-mdpi/" + imageName + ".png";
    return fileManager.fileExistsAtPath(directory) || nameIsExist(imageName);
}

function nameIsExist(name) {
    for (var i = 0; i < names.length; i++) {
        if (names[i] == name) return true;
    }
    names.push(name);
    return false;
}

function andoidImageExport(sketch_component, imageFolder) {
    var imageName = sketch_component.name;
    var outdir = "/Android";
    var options = {
        scales: '1',
        formats: 'png',
        output: imageFolder + outdir + "/drawable-mdpi"
    };
    sketch['export'](sketch_component, options);

    options = {
        scales: '1.5',
        output: imageFolder + outdir + "/drawable-hdpi"
    };
    sketch['export'](sketch_component, options);

    fileManager.moveItemAtPath_toPath_error(options.output + "/" + imageName + "@1x.png", options.output + "/" + imageName + ".png", nil);

    options = {
        scales: '2',
        output: imageFolder + outdir + "/drawable-xhdpi"
    };
    sketch['export'](sketch_component, options);
    fileManager.moveItemAtPath_toPath_error(options.output + "/" + imageName + "@2x.png", options.output + "/" + imageName + ".png", nil);

    options = {
        scales: '3',
        output: imageFolder + outdir + "/drawable-xxhdpi"
    };
    sketch['export'](sketch_component, options);
    fileManager.moveItemAtPath_toPath_error(options.output + "/" + imageName + "@3x.png", options.output + "/" + imageName + ".png", nil);

    options = {
        scales: '4',
        output: imageFolder + outdir + "/drawable-xxxhdpi"
    };
    sketch['export'](sketch_component, options);
    fileManager.moveItemAtPath_toPath_error(options.output + "/" + imageName + "@4x.png", options.output + "/" + imageName + ".png", nil);
}

function iosImageExport(sketch_component, imageFolder) {

    var imageName = sketch_component.name;
    var outdir = "/iOS/" + imageName + ".imageset";
    /// @x1 ///
    var options = {
        scales: '1',
        formats: 'png',
        output: imageFolder + outdir
    };
    sketch['export'](sketch_component, options);
    /// @x2 ///
    options = {
        scales: '2',
        formats: 'png',
        output: imageFolder + outdir
    };
    sketch['export'](sketch_component, options);

    /// @x3 ///
    options = {
        scales: '3',
        formats: 'png',
        output: imageFolder + outdir
    };
    sketch['export'](sketch_component, options);
    var obj = {
        images: [],
        info: {
            version: 1,
            author: "smartface"
        }
    };
    var scales = ["", "@2x", "@3x"];
    scales.forEach(function (scale, i) {
        obj.images.push({
            filename: '' + String(imageName) + String(scale) + '.png',
            scale: i + 1 + "x",
            idiom: "universal"
        });
    });
    var data = JSON.stringify(obj, null, "\t");
    write_file(imageFolder + "/iOS/" + imageName + ".imageset" + "/Contents.json", data);
}

function exportAllFonts(fonts) {
    var fontLibs = [];
    var folderObject = NSFileManager.defaultManager();
    /*
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("~/Library/Fonts/", nil));
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("/Library/Fonts/", nil));
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("/Network/Library/Fonts/", nil));
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("/System/Library/Fonts/", nil));
    fontLibs.push(folderObject.contentsOfDirectoryAtPath("/System Folder/Fonts/", nil));
     /*
    var isDir = MOPointer.alloc().initWithValue_(false);
    var fileExists = NSFileManager.defaultManager().fileExistsAtPath_isDirectory('/Users/Musk/tesla.gif', isDir);
    log(fileExists);
    log(isDir.value());
    if (fileExists && isDir.value() > 0) {
        log('it\'s a directory');
    }
     folderObject.copyItemAtPath_toPath_error(fromPath, toPath, nil);
    */
    log(folderObject.fileExistsAtPath_isDirectory('/System/Library/Fonts/', MOPointer.alloc().initWithValue_(false)));
    log(folderObject.contentsOfDirectoryAtPath('/System/Library/Fonts/', nil));
}

function exit(message) {
    UI.message("Erorr " + " \"" + message + "\" is not a valid directory !!");
}

module.exports = {
    write_file: write_file,
    imageExport: imageExport,
    write_datas: write_datas,
    writeLibrary: writeLibrary,
    exportAllFonts: exportAllFonts,
    creat_output_folders: creat_output_folders
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

// Default pgx page component type
var _props = {
    children: [],
    name: "",
    parent: ""
};
var _component = {
    className: "",
    id: "",
    props: _props,
    type: "",
    userProps: {}
};
var sketchUtil = __webpack_require__(3);
var UI = __webpack_require__(0);

function sketchHTMLConverter(sketch_html) {
    var pgx_html = "";
    var flag = false;
    if (sketch_html == null) return pgx_html;
    var text = sketch_html.text;
    for (var iter in sketch_html.attributes) {

        var start = sketch_html.attributes[iter].location;
        var substr = String(text).substring(start, start + sketch_html.attributes[iter].length);
        var addText = ""; // 
        var style = getStyle(sketch_html.attributes[iter]);

        for (var i = 0; i < substr.length; i++) {

            if (substr[i] == " ") {
                addText += ' '; //&nbsp;
            } else if (substr[i] == "\n") {
                pgx_html += createPgxHTML(style, addText);

                if (flag) pgx_html += "</div><div>";else {
                    pgx_html += "<div>";
                    flag = true;
                }
                addText = "";
            } else {
                addText += substr[i];
            }
        }
        pgx_html += createPgxHTML(style, addText);
    }

    if (flag) pgx_html += "</div>";

    return pgx_html;
}

function createPgxHTML(style, text) {
    return style + text + "</span>";
}
/* html style creator */
function getStyle(sketch_html_component) {
    var style = "<span style=\"font-size: ";
    var color = sketchUtil.colorHex_Rgba(sketch_html_component.MSAttributedStringColorAttribute.value);

    style += sketch_html_component.NSFont.attributes.NSFontSizeAttribute;
    style += "px ;";
    var font = fontMap(sketch_html_component.NSFont.attributes.NSFontNameAttribute);

    if (font != "Default") style += "font-family: " + font[0] + "-" + font[1] + "; ";else style += "font-family: " + "ios-Default-Regular; ";
    style += "background-color: transparent; "; // there is no higligter sketch 

    style += "color: rgb(" + color.red + ", " + color.green + ", " + color.blue + "); ";
    if (sketch_html_component.NSUnderline != null) if (sketch_html_component.NSUnderline > 0) {
        style += " text-decoration-color: ";
        style += colorMap(color) + ";";
        style += "text-decoration-line: underline; ";
    } else {
        style += "text-decoration-color: rgb(0, 0, 0); ";
    }

    style += "\">";
    return style;
}
/*
 * This function calculate again components location 
 * The sketch headerBar y = 0+y but smartface headerBar y = 0 
 */
function recalculateLocation(sketch_component, headerY) {
    for (var iter in sketch_component.children) {
        sketch_component.children[iter].frame.y -= headerY;
    }
}

function borderSetter(pgx_component, sketch_component) {
    if (sketch_component.border == null) return;
    if (sketch_component.border.width == 0) return;
    if (sketch_component.border.radius != 0) pgx_component.userProps.borderRadius = sketch_component.border.radius;

    pgx_component.userProps.borderColor = colorMap(sketch_component.border.color);
    pgx_component.userProps.borderWidth = sketch_component.border.width;
    if (sketch_component.border.circle && sketch_component.frame.width > 0) pgx_component.userProps.borderRadius = sketch_component.frame.width / 2;
}

function shadowSetter(pgx_component, sketch_component) {
    var shadow = sketch_component.shadow;
    if (shadow == null) return;
    if (!shadow.isEnabled) return;
    pgx_component.userProps.ios = {
        shadowColor: colorMap(sketch_component.shadow.color),
        shadowOpacity: sketch_component.shadow.color.alpha,
        shadowRadius: sketch_component.shadow.radius,
        shadowOffset: {
            x: shadow.x,
            y: shadow.y
        }
    };
}

function frameSetter(pgx_component, sketch_component) {
    var userProps = pgx_component.userProps;
    var sketchFrame = sketch_component.frame;
    var parentFrame = sketch_component.parentFrame;

    var _ref = sketch_component.resize || {},
        left = _ref.left,
        right = _ref.right,
        top = _ref.top,
        bottom = _ref.bottom;

    if (sketchFrame !== null) {

        userProps.left = left ? sketchFrame.x : null;
        userProps.top = top ? sketchFrame.y : null;
        userProps.width = left && right ? null : sketchFrame.width;
        userProps.height = top && bottom ? null : sketchFrame.height;
        right && (userProps.right = Math.abs(parentFrame.width - (sketchFrame.width + sketchFrame.x)));
        bottom && (userProps.bottom = Math.abs(parentFrame.height - (sketchFrame.height + sketchFrame.y)));
    }
}

function textSetter(pgx_component, sketch_component) {
    if (sketch_component.text == null) return;
    var alignment = sketch_component.text.verticalAlignment + sketch_component.text.horizontalAlignment;
    var font = fontMap(sketch_component.text.font);
    pgx_component.userProps.font = {
        size: sketch_component.text.size,
        family: font[0],
        style: font[1]
    };
    pgx_component.userProps.text = sketch_component.text.text;
    pgx_component.userProps.textColor = colorMap(sketch_component.text.color);
    pgx_component.userProps.textAlignment = alignment;
}

/**
 *   id , name , parentID  
 *  default page component setting
 */
function defaultPgxSetter(pgx_component, sketch_component) {

    pgx_component.id = sketch_component.id;
    pgx_component.props.name = sketch_component.name;
    pgx_component.props.parent = sketch_component.parentID;
    pgx_component.props.usePageVariable = false;
    pgx_component.userProps.usePageVariable = false;
    pgx_component.userProps.flexProps = {}; // empty flexProps object
    if (sketch_component.property.isVisible == false) pgx_component.userProps.visible = false;
}

function addChild(pgx_component, sketch_component) {

    for (var iter in sketch_component.children) {
        if (sketch_component.type == "gridview") if (sketch_component.children[iter].type != "gridviewitem") exit("The GridView \"" + sketch_component.name + "\" cannot contain \"" + sketch_component.children[iter].type + "\" ->\"" + sketch_component.children[iter].name + "\"\n   GridView only contains GridViewItem !");
        if (sketch_component.type == "listview") if (sketch_component.children[iter].type != "listviewitem") exit("The ListView \"" + sketch_component.name + "\" cannot contain \"" + sketch_component.children[iter].type + "\" ->\"" + sketch_component.children[iter].name + "\"\n   ListView only contains ListViewItem !");

        pgx_component.props.children.push(sketch_component.children[iter].id);
        sketch_component.children[iter].parentID = pgx_component.id;
    }
}
/**
 * -> Class Name Set
 */
function setSomeProprties(pgxComponent, sketchComponent) {
    if (sketchComponent["class"] != null) pgxComponent.className += " " + sketchComponent["class"];
}

function exit(message) {
    UI.message("❌ Exit message : " + message + "\n");
    log(message);
    process.exit(-1);
}

function fontMap(font) {
    if (font == null) return "Default";else return String(font).split("-");
}

function colorMap(color) {
    if (color == null) return "rgba( 255, 255, 255, 0 )";
    if (color.alpha == null) return "rgba( 255, 255, 255, 0 )";
    return "rgba( " + color.red + ", " + color.green + ", " + color.blue + ", " + color.alpha + " )";
}

/* component id create */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + "-" + s4() + "-" + s4() + "-" + s4();
}

function createComponent() {
    return Object.assign({}, _component, {
        props: createProps()
    }, {
        userProps: {}
    });
}

function createProps() {
    return Object.assign({}, _props, {
        children: []
    });
}

module.exports = {
    guid: guid,
    colorMap: colorMap,
    addChild: addChild,
    textSetter: textSetter,
    frameSetter: frameSetter,
    borderSetter: borderSetter,
    shadowSetter: shadowSetter,
    createComponent: createComponent,
    setSomeProprties: setSomeProprties,
    defaultPgxSetter: defaultPgxSetter,
    sketchHTMLConverter: sketchHTMLConverter,
    recalculateLocation: recalculateLocation
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(5)

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setInterval, clearInterval) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports['default'] = function (context) {
    context_ = context;
    var options = {
        identifier: 'smartface',
        alwaysOnTop: true,
        height: 505,
        width: 300,
        onlyShowCloseButton: true
    };
    var notify;
    var browserWindow = new _sketchModuleWebView2['default'](options);
    var webContents = browserWindow.webContents;

    // add a handler for a call from web content's javascript
    webContents.on('set-type', function (data) {

        var selectedLayer = context.document.selectedLayers().firstLayer();
        var name = selectedLayer.name();

        var sf_type = String(data);

        if (isValidName(name, sf_type)) {
            log("❌Component name is invalid❌");
            UI.message("❌ Component name is invalid ❌");
        }
        context.command.setValue_forKey_onLayer_forPluginIdentifier(sf_type, "sf-tag", selectedLayer, 'smartface.io');
        if (sf_type == "listviewitem" || sf_type == "gridviewitem") context.command.setValue_forKey_onLayer_forPluginIdentifier("true", "sf-library", selectedLayer, 'smartface.io');
        setLibraryItem(selectedLayer, sf_type);
        if (getResize(selectedLayer) == null) creteResize(selectedLayer);
        context.document.saveDocument(nil);
    });

    webContents.on('set-class', function (data) {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var sfClass = String(data);
        if (sfClass != null) {
            context.command.setValue_forKey_onLayer_forPluginIdentifier(sfClass, "sf-class", selectedLayer, 'smartface.io');
            addClassNames(allClassNames, sfClass);
            context.document.saveDocument(nil);
            UI.message("Class Perfect Set ✅");
        } else UI.message("❌ Something Wrong Class Not Assigned");
    });

    webContents.on('exportbtn', function (data) {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var type = context.command.valueForKey_onLayer_forPluginIdentifier("sf-tag", selectedLayer, 'smartface.io');
        mapper.exportButton(context, selectedLayer.objectID(), type);
    });

    webContents.on('set-library', function (data) {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var sfLib = String(data);
        if (sfLib != null && selectedLayer != null) {
            context.command.setValue_forKey_onLayer_forPluginIdentifier(sfLib, "sf-library", selectedLayer, 'smartface.io');
            context.document.saveDocument(nil);
            if (sfLib == "false") UI.message("Library Disabled ✅");else UI.message("Library Perfect Set ✅");
        } else UI.message("❌ Something Wrong Library Not Assigned");
    });

    webContents.on('set-resize', function (data) {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var resize = String(data);
        setResize(selectedLayer, resize);
        context.document.saveDocument(nil);
    });

    webContents.on('set-name', function (data) {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        var name = String(data);
        selectedLayer.name = name;
        context.document.saveDocument(nil);
    });

    browserWindow.loadURL(__webpack_require__(11));

    var myInterval = setInterval(function () {
        var selectedLayer = context.document.selectedLayers().firstLayer();
        if (selectedLayer != null) {
            var name = selectedLayer.name();
            setPageItemFromLibrary(selectedLayer);
            var type = context.command.valueForKey_onLayer_forPluginIdentifier("sf-tag", selectedLayer, 'smartface.io');
            var className = context.command.valueForKey_onLayer_forPluginIdentifier("sf-class", selectedLayer, 'smartface.io');
            var library = context.command.valueForKey_onLayer_forPluginIdentifier("sf-library", selectedLayer, 'smartface.io');
            var allresize = context.command.valueForKey_onLayer_forPluginIdentifier("sf-resize", selectedLayer, 'smartface.io');
            var item = sketch.fromNative(selectedLayer);
            var nameCheck = "1";
            var changed = "false";
            if (notify == null) {
                notify = selectedLayer.objectID();
                changed = "true";
            } else if (notify != selectedLayer.objectID()) {
                notify = selectedLayer.objectID();
                changed = "true";
            }
            if (isValidName(name, type) == false) nameCheck = "2";
            if (String(type) == "listviewitem" || String(type) == "gridviewitem") if (library != "true") {
                context.command.setValue_forKey_onLayer_forPluginIdentifier("true", "sf-library", selectedLayer, 'smartface.io');
                library = "true";
            }

            if (item.type == "SymbolInstance") {
                if (isValidName(name, type) == false) nameCheck = "3";else if (nameCheckLibrary(item, type) == false) nameCheck = "3";
            }
            if (type == null) type = "null";
            if (className == null) className = "null";

            var data = JSON.stringify({
                name: "" + name,
                type: "" + type,
                nameCheck: nameCheck,
                className: String(className),
                library: String(library),
                allresize: JSON.parse(allresize),
                changed: changed
            });
            // UI.message(String(data.className))
            webContents.executeJavaScript('setLayerName(' + String(data) + ')');
        } else webContents.executeJavaScript('setLayerName({})');

        if (browserWindow.isDestroyed()) {
            UI.message("😱");
            clearInterval(myInterval, context);
        }
    }, 450);
};

var _sketchModuleWebView = __webpack_require__(12);

var _sketchModuleWebView2 = _interopRequireDefault(_sketchModuleWebView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var mapper = __webpack_require__(22);
var UI = __webpack_require__(0);
var sketch = __webpack_require__(1);
var documents = __webpack_require__(2).getDocuments();

//var nameCheck = require('./isValidName');

var context_;


function isValidName(name, type) {
    if (type == "shape") return isValidNameNoUpperCase(name);
    if (/\d/.test(name.charAt(0)) && name.charAt(0) !== '_') {
        return false;
    } else if (!/^[a-z_][A-Za-z0-9_]*([A-Za-z0-9_]+)*$/.test(name)) {
        return false;
    }
    return true;
}

function isValidNameNoUpperCase(name) {
    if (/\d/.test(name.charAt(0)) && name.charAt(0) !== '_') {
        return false;
    } else if (!/^[a-z_][a-z0-9_]*([a-z0-9_]+)*$/.test(name)) {
        return false;
    }
    return true;
}

function nameCheckLibrary(item, type) {
    var flag = true;
    for (var i = 0; i < documents.length; i++) {
        var val = documents[i].getSymbolMasterWithID(item.symbolId);
        if (val != null) {
            if (isValidName(val.name, type) == false) return false;
        }
    }
    return flag;
}

function setPageItemFromLibrary(layer) {
    var item = sketch.fromNative(layer);
    if (item.type == "SymbolInstance") {
        for (var i = 0; i < documents.length; i++) {
            var val = documents[i].getSymbolMasterWithID(item.symbolId);
            if (val != null) {
                var type = context_.command.valueForKey_onLayer_forPluginIdentifier("sf-tag", val.sketchObject, 'smartface.io');
                if (type != null) context_.command.setValue_forKey_onLayer_forPluginIdentifier(type, "sf-tag", layer, 'smartface.io');
            }
        }
    }
}

function setLibraryItem(layer, sf_type) {
    var item = sketch.fromNative(layer);
    if (item.type == "SymbolInstance") {
        for (var i = 0; i < documents.length; i++) {
            var val = documents[i].getSymbolMasterWithID(item.symbolId);
            if (val != null) {
                var d = context_.command.setValue_forKey_onLayer_forPluginIdentifier(sf_type, "sf-tag", val.sketchObject, 'smartface.io');
                UI.message("✅ Perfect Set Object & SymbolInstance");
                val = null;
            }
        }
    } else UI.message("✅ Perfect Set");
}

/**
 *  layer : SelectedLayer
 *  resize: pressed button resize string (resizeup,resizedown ..)
 */
function setResize(layer, resize) {
    var resizeObject = getResize(layer);
    if (resizeObject == null) resizeObject = creteResize(layer);else resizeObject = JSON.parse(resizeObject);
    if (resizeCheck(resizeObject, resize)) {
        resizeObject[resize] = !resizeObject[resize];
        context_.command.setValue_forKey_onLayer_forPluginIdentifier(JSON.stringify(resizeObject), "sf-resize", layer, 'smartface.io');
    }
}

function resizeCheck(resizeObject, resize) {
    if (resize == "top" && resizeObject.bottom == false) return false;else if (resize == "bottom" && resizeObject.top == false) return false;else if (resize == "left" && resizeObject.right == false) return false;else if (resize == "right" && resizeObject.left == false) return false;
    return true;
}

function creteResize(layer) {
    var resizeObject = {
        top: true,
        bottom: false,
        left: true,
        right: false
    };
    context_.command.setValue_forKey_onLayer_forPluginIdentifier(JSON.stringify(resizeObject), "sf-resize", layer, 'smartface.io');
}

function getResize(layer) {
    return context_.command.valueForKey_onLayer_forPluginIdentifier("sf-resize", layer, 'smartface.io');
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)["setInterval"], __webpack_require__(4)["clearInterval"]))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "file://" + context.plugin.urlForResourceNamed("_webpack_resources/6bf6581581a47ddfaccc2ca4c9611c5f.html").path();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(6)
var buildBrowserAPI = __webpack_require__(13)
var buildWebAPI = __webpack_require__(14)
var fitSubviewToView = __webpack_require__(15)
var dispatchFirstClick = __webpack_require__(16)
var setDelegates = __webpack_require__(17)

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  // Long-running script
  var fiber
  try {
    fiber = coscript.createFiber()
  } catch (err) {
    coscript.shouldKeepAround = true
  }

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  // TODO: handle modal mode

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var webView = WebView.alloc().initWithFrame(
    NSMakeRect(0, 0, options.width || 800, options.height || 600)
  )
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)
  setDelegates(browserWindow, panel, webView)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  const title =
    options.title ||
    (typeof __command !== 'undefined' && __command.pluginBundle()
      ? __command.pluginBundle().name()
      : undefined)
  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  if (options.webPreferences) {
    // TODO:
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents.executeJavaScript(
          dispatchFirstClick(webView, event)
        )
      }
    })
  }

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    if (fiber) {
      fiber.cleanup()
    } else {
      coscript.shouldKeepAround = false
    }
  })

  threadDictionary[identifier] = panel

  if (fiber) {
    fiber.onCleanup(function() {
      if (!browserWindow._destroyed) {
        browserWindow.destroy()
      }
    })
  }

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    return BrowserWindow.fromPanel(threadDictionary[identifier], identifier)
  }

  return undefined
}

BrowserWindow.fromPanel = function(panel, identifier) {
  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (!panel || !panel.contentView) {
    throw new Error('needs to pass an NSPanel')
  }

  var webView = panel.contentView().subviews()[0]

  if (!webView) {
    throw new Error('The NSPanel needs to have a webview')
  }

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  return browserWindow
}

module.exports = BrowserWindow


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var COLOR_CLASSES = [
  'NSColor',
  'NSCachedWhiteColor',
  'NSColorSpaceColor',
  'NSDynamicSystemColor',
  'NSCachedColorSpaceColor',
]
function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      color.class &&
      COLOR_CLASSES.indexOf(String(color.class())) !== -1
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    // TODO: Check size constraints since setFrame does not check it.
    var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(bounds.origin.x, 0, size.width, size.height)
    // Flip coordinates based on the primary screen.
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y =
      NSHeight(screen.frame()) - size.height - bounds.origin.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    return panel.frame()
  }

  browserWindow.setContentBounds = function(/* bounds, animate */) {
    // TODO:
  }

  browserWindow.getContentBounds = function() {
    // TODO:
  }

  browserWindow.setSize = function(width, height, animate) {
    var bounds = browserWindow.getBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    var bounds = browserWindow.getContentBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setContentBounds(bounds, animate)
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMaxSize(minSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    bounds.origin.x = x
    bounds.origin.y = Math.round(NSHeight(mainScreenRect) - y)

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return [
      bounds.origin.x,
      Math.round(NSHeight(mainScreenRect) - bounds.origin.y),
    ]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!http|localhost|www|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url = __command
          .pluginBundle()
          .urlForResourceNamed(url)
          .path()
      }
    }
    webview.setMainFrameURL(url)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.setDrawsBackground(false)
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(6)

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL
  webContents.getURL = webview.mainFrameURL
  webContents.getTitle = webview.mainFrameTitle
  webContents.isDestroyed = function() {
    // TODO:
  }
  webContents.isLoading = function() {
    return webview.loading()
  }
  webContents.stop = webview.stopLoading
  webContents.reload = webview.reload
  webContents.canGoBack = webview.canGoBack
  webContents.canGoForward = webview.canGoForward
  webContents.goBack = webview.goBack
  webContents.goForward = webview.goForward
  webContents.executeJavaScript = function(script) {
    return webview.stringByEvaluatingJavaScriptFromString(script)
  }
  webContents.undo = function() {
    webview.undoManager().undo()
  }
  webContents.redo = function() {
    webview.undoManager().redo()
  }
  webContents.cut = webview.cut
  webContents.copy = webview.copy
  webContents.paste = webview.paste
  webContents.pasteAndMatchStyle = webview.pasteAsRichText
  webContents.delete = webview.delete
  webContents.replace = webview.replaceSelectionWithText
  webContents.getNativeWebview = function() {
    return webview
  }

  browserWindow.webContents = webContents
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  var x = point.x
  var y = webView.frame().size.height - point.y // the coord start from the bottom instead of the top
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    x +
    ', ' +
    y +
    '); ' +
    'if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(18).default
var parseWebArguments = __webpack_require__(20)
var CONSTANTS = __webpack_require__(21)

// We create one ObjC class for ourselves here
var WindowDelegateClass
var FrameLoadDelegateClass

module.exports = function(browserWindow, panel, webview) {
  if (!WindowDelegateClass) {
    WindowDelegateClass = ObjCClass({
      classname: 'WindowDelegateClass',
      utils: null,

      // Tells the delegate that the window has been resized.
      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      // Tells the delegate that the window has been resized.
      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      // Tells the delegate that the window has been resized.
      'windowShouldClose:': function() {
        var shouldClose = true
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = false
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  if (!FrameLoadDelegateClass) {
    FrameLoadDelegateClass = ObjCClass({
      classname: 'FrameLoadDelegateClass',
      state: NSMutableDictionary.dictionaryWithDictionary({
        lastQueryId: null,
        wasReady: 0,
      }),
      utils: null,

      // // Called when a client redirect is cancelled.
      // 'webView:didCancelClientRedirectForFrame:': function (
      //   webView,
      //   webFrame
      // ) {},

      // Called when the scroll position within a frame changes.
      'webView:didChangeLocationWithinPageForFrame:': function(webView) {
        this.utils.emit('did-navigate-in-page', [
          {},
          String(
            webView.stringByEvaluatingJavaScriptFromString(
              'window.location.href'
            )
          ),
        ])
      },

      // // Called when the JavaScript window object in a frame is ready for loading.
      // 'webView:didClearWindowObject:forFrame:': function (
      //   webView,
      //   windowObject,
      //   webFrame
      // ) {},

      // // Called when content starts arriving for a page load.
      // 'webView:didCommitLoadforFrame:': function (webView, webFrame) {},

      // // Notifies the delegate that a new JavaScript context has been created.
      // N.B - we intentionally omit the 2nd parameter (javascriptContext)
      // It was causing crashes in Sketch - possibly because of issues with converting
      // it from Objective C to Javascript
      'webView:didCreateJavaScriptContext:forFrame:': function(webView) {
        // any time there is a new js context, set a global value (on window.) to refer
        // to this frameloaddelegate class
        webView.windowScriptObject().setValue_forKey_(this, CONSTANTS.JS_BRIDGE)
      },

      // the normal way to expose a selector to webscript is with 'isSelectorExcludedFromWebScript:'
      // but that didn't work, so this is an alternative. This method gets invoked any time
      // an unknown method is called on this class by webscript
      'invokeUndefinedMethodFromWebScript:withArguments:': function(
        method,
        webArguments
      ) {
        if (String(method) !== 'callNative') {
          return false
        }

        var args = this.utils.parseWebArguments(webArguments)
        if (!args) {
          return false
        }

        this.utils.emit.apply(this, args)
        return true
      },

      // Called when an error occurs loading a committed data source.
      'webView:didFailLoadWithError:forFrame:': function(_, error) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when a page load completes.
      'webView:didFinishLoadForFrame:': function() {
        if (this.state.wasReady == 0) {
          // eslint-disable-line
          this.utils.emitBrowserEvent('ready-to-show')
          this.state.setObject_forKey(1, 'wasReady')
        }
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
        this.utils.emit('dom-ready')
      },

      // Called when a provisional data source for a frame receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalLoadForFrame:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // Called when the page title of a frame loads or changes.
      'webView:didReceiveTitle:forFrame:': function(_, _title) {
        var title = String(_title)
        var shouldChangeTitle = true
        this.utils.emitBrowserEvent(
          'page-title-updated',
          {
            get defaultPrevented() {
              return !shouldChangeTitle
            },
            preventDefault: function() {
              shouldChangeTitle = false
            },
          },
          title
        )

        if (shouldChangeTitle && title) {
          this.utils.setTitle(title)
        }
      },

      // Called when a page load is in progress in a given frame.
      'webView:didStartProvisionalLoadForFrame:': function() {
        this.utils.emit('did-start-loading')
      },

      // Called when a frame will be closed.
      // 'webView:willCloseFrame:': function (webView, webFrame) {}

      // Called when a frame receives a client redirect and before it is fired.
      'webView:willPerformClientRedirectToURL:delay:fireDate:forFrame:': function(
        _,
        url
      ) {
        this.utils.emit('will-navigate', {}, String(url.absoluteString))
      },
    })
  }

  var frameLoadDelegate = FrameLoadDelegateClass.new()
  frameLoadDelegate.utils = NSDictionary.dictionaryWithDictionary({
    setTitle: browserWindow.setTitle.bind(browserWindow),
    emitBrowserEvent: browserWindow.emit.bind(browserWindow),
    emit: browserWindow.webContents.emit.bind(browserWindow.webContents),
    parseWebArguments: parseWebArguments,
  })
  // reset state as well
  frameLoadDelegate.state = NSMutableDictionary.dictionaryWithDictionary({
    lastQueryId: null,
    wasReady: 0,
  })

  webview.setFrameLoadDelegate(frameLoadDelegate)

  var windowDelegate = WindowDelegateClass.new()
  windowDelegate.utils = NSDictionary.dictionaryWithDictionary({
    emit: browserWindow.emit.bind(browserWindow),
  })

  panel.setDelegate(windowDelegate)
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(19);

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments[0])
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sketchParser = __webpack_require__(23);

var _smartfaceMapper = __webpack_require__(26);

/*
 * The Sketchapp file design map to Smartface file design(pgx,cpx)
 * 
 */

var outputUtil = __webpack_require__(7);
var UI = __webpack_require__(0);
var sketch = __webpack_require__(1);

function mapAllPages(context) {
    var currentPath = openDialog();
    if (currentPath != null) {
        context.document.showMessage("🙌 MAPPING SMARTFACE 🙌");
        var folders = outputUtil.creat_output_folders(currentPath, context.document.fileURL().path());
        var pagesTree = (0, _sketchParser.sketchParseAll)(context, folders);
        if (pagesTree.length !== 0) {
            context.document.showMessage("🙌 MAPPING SMARTFACE 🙌");
            var smartfaceData = (0, _smartfaceMapper.smartfaceMapper)(pagesTree);
            if (smartfaceData.pgx.length !== 0) // Array of pages
                outputUtil.write_datas(folders, smartfaceData);else exit(2);
        } else exit(1);
    }
}

function openDialog() {

    var chooseFile = NSOpenPanel.openPanel();
    chooseFile.setMessage("Choose Export Directory");
    chooseFile.setCanChooseDirectories(true);
    chooseFile.setCanChooseFiles(false); // file choser
    if (chooseFile.runModal() == NSOKButton) return chooseFile.URL().path();
}

function mapOnePage(context, page, folders, type) {
    context.document.showMessage("🙌 MAPPING SMARTFACE 🙌");
    var pagesTree = (0, _sketchParser.sketchParseOnePage)(context, folders, page, type);
    if (pagesTree.length !== 0) {
        var smartfaceData = (0, _smartfaceMapper.smartfaceMapper)(pagesTree);
        context.document.showMessage("🙌 MAPPING SMARTFACE 🙌");
        if (smartfaceData.pgx.length !== 0) {
                // Array of pages
                if (type[0] == "page") outputUtil.write_datas(folders, smartfaceData);else outputUtil.writeLibrary(folders, smartfaceData);
        } else exit(2);
    } else exit(1);
}

function exportButton(context, objectID, exptype) {
    //var currentPath = context.document.fileURL().path();
    var currentPath = openDialog();
    if (currentPath != null) {
        var folders = outputUtil.creat_output_folders(currentPath, context.document.fileURL().path());
        var layer = sketch.fromNative(context.document.selectedLayers().firstLayer());
        var type = [];
        if (exptype == "shape") (0, _sketchParser.exportImage)(layer, folders);else if (exptype == "page") {
            type.push("page");
            mapOnePage(context, layer, folders, type);
        } else {
            type.push("library");
            mapOnePage(context, layer, folders, type);
        }
    }
}

function exit(type) {

    if (type == 1) {
        // Null Pages Error
        UI.message("Error " + ": The Sketch Parser Tree is Null");
    }
    if (type == 2) {
        UI.message("Error " + " The Mapper cannot map properly ! \nCheck your design please");
    }
}

module.exports = {
    mapAllPages: mapAllPages,
    exportButton: exportButton
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sketchUtil = __webpack_require__(3);
var pageComponent = __webpack_require__(24);
var sketch = __webpack_require__(1);
var UI = __webpack_require__(0);
var getValueFromPlugin;
var imageFolder;
var context_;
var documents = __webpack_require__(2).getDocuments();

function sketchParseAll(context, folders) {
    var pages = [];
    imageFolder = folders.imageFolder;
    var sketch_pages = sketch.fromNative(context.document);
    context_ = context;
    getValueFromPlugin = context_.command.valueForKey_onLayer_forPluginIdentifier;
    for (var key in sketch_pages.pages) {
        if (sketch_pages.pages[key].sketchObject['class']() != MSSliceLayer) {
            for (var page in sketch_pages.pages[key].layers) {
                if (sketch_pages.pages[key].layers[page].sketchObject['class']() != MSSliceLayer) {
                    var type = splitType(sketch_pages.pages[key].layers[page]);
                    if (type != null) if (type[0] == "page") {
                        var pageTreeComp = sketchUtil.createPageObject();
                        pageCreate(type, sketch_pages.pages[key].layers[page], pageTreeComp);
                        pages.push(pageTreeComp);
                    }
                }
            }
        }
    }
    return pages;
}

function sketchParseOnePage(context, folders, page, type) {
    var pages = [];
    getValueFromPlugin = context.command.valueForKey_onLayer_forPluginIdentifier;
    imageFolder = folders.imageFolder;
    context_ = context;
    //context.document.showMessage("🙌 MAPPING SMARTFACE 🙌")
    var pageTreeComp = sketchUtil.createPageObject();
    if (type[0] == "page") pageCreate(type, page, pageTreeComp);else libraryCreate(type, page, pageTreeComp);
    pages.push(pageTreeComp);
    return pages;
}

function pageComponentParse(page, pageTree) {

    for (var iter in page.layers) {
        selectComponentType(page.layers[iter], pageTree);
    }
}

/**
 * create a page Object 
 */
function pageCreate(type, page, pageTree) {
    pageComponent.is_Page(type, page, pageTree);
    pageComponentParse(page, pageTree);
}

function libraryCreate(type, page, pageTree) {
    pageTree.type = type[0];
    pageTree.name = "exported";
    //UI.message("Library" + page.name)
    selectComponentType(page, pageTree);
}

function selectComponentType(page, pageTree) {
    var type = splitType(page);
    if (type == null) return false;
    if (type[0] == null || type[0] == "null") return false;

    if (type[0] == "listview" || type[0] == "gridview") {
        multi_component(type, page, pageTree);
    } else if (type[0] == "listviewitem" || type[0] == "gridviewitem") multi_component(type, page, pageTree);else if (type[0] == "flexlayout" || type[0] == "scrollview") multi_component(type, page, pageTree);else if (type[0] == "mapview" || type[0] == "videoview" || type[0] == "webview") pageComponent.is_MVW_View(type, page, pageTree);else if (type[0] == "textbox" || type[0] == "textarea") pageComponent.is_TextBox_TextArea(type, page, pageTree);else if (type[0] == "button") pageComponent.is_Button(type, page, pageTree);else if (type[0] == "imageview") pageComponent.is_ImageView(type, page, pageTree, imageFolder);else if (type[0] == "label") pageComponent.is_Label(type, page, pageTree);else if (type[0] == "slider") pageComponent.is_Slider(type, page, pageTree);else if (type[0] == "switch") pageComponent.is_Switch(type, page, pageTree);else if (type[0] == "textview") pageComponent.is_TextView(type, page, pageTree);else if (type[0] == "searchview") pageComponent.is_SearchView(type, page, pageTree);else if (type[0] == "shape") pageComponent.is_Shape_Image(type, page, pageTree, imageFolder);else if (type[0] == "headerbar") pageComponent.is_HeaderBar(type, page, pageTree, imageFolder);
}

/**
 *   The component consist contain (component|components)
 *   flexLayout , listview , gridview
 */
function multi_component(type, page, pageTree) {
    var tree = pageComponent.is_Multi_Component(type, page, pageTree);
    var _page = page;
    if (tree != null) {
        if (page.type == "SymbolInstance") {
            _page = sketchUtil.symbolInstanceFinder(page);
        }
        pageComponentParse(_page, tree);
    }
}

function exportImage(layer, folders) {
    var imageFolder = folders.imageFolder;
    pageComponent.is_Shape_Image(null, layer, null, imageFolder);
    UI.message("✅ Image Exported");
}

/* type : page#on_button , image#bakgrnd */
function splitType(page) {
    var type = getValueFromPlugin("sf-tag", page.sketchObject, 'smartface.io');
    var lib = getValueFromPlugin("sf-library", page.sketchObject, 'smartface.io');
    var name = page.name;
    var data = [];
    if (name == null || type == null) return;
    data.push(type);
    data.push(name);
    if (lib == "true") // Library check 
        data.push(lib);else data.push("false");

    return data;
}

module.exports = {
    exportImage: exportImage,
    sketchParseAll: sketchParseAll,
    sketchParseOnePage: sketchParseOnePage
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sketchUtil = __webpack_require__(3);
var outputUtil = __webpack_require__(7);
var sketch = __webpack_require__(1);
var Document = __webpack_require__(2).Document;

/** 
    name : the name of the sketch page
    page : the sketch page data
    pageTree : the page tree
*/

function is_Page(type, page, pageTree) {

    var pageJson = sketchUtil.sketchToJson(page);
    var color = sketchUtil.colorHex_Rgba(pageJson.backgroundColor.value);
    sketchUtil.setComponent(pageTree, type, page, color);
    pageTree.frame.x = 0;
    pageTree.frame.y = 0;
}

/**
 *  type[0] = name
 *  type[1] = class name
 *  type[2] = isLibrary "true" || "false"
 */
function is_Button(type, sketch_component, pageTree) {
    var button = sketchUtil.createPageObject();
    var buttonColor = sketchUtil.createColorObject();
    button.shadow = sketchUtil.createShadowObject();
    var buttonText = sketchUtil.createTextObject();
    sketchUtil.setFirstPropery(button, sketch_component, pageTree);
    if (type[2] == "true") sketchUtil.setLibProperty(button, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(button, sketch_component);
        // log(JSON.stringify(sketch_component.overrides))
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group") {
        //Shadow
        button.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    for (var iter in sketch_component.layers) {
        // button = rectangle + text 
        var component = sketch_component.layers[iter];
        var flag = false;
        do {
            flag = false;
            if (component.type == "SymbolInstance") {
                component = sketchUtil.symbolInstanceFinder(component);
                component = component.layers[0]; // Should be change
                if (component.type == "SymbolInstance") flag = true;
            }
        } while (flag);

        if (component.type == "Text") {
            buttonText = sketchUtil.fill_text_object(component);
        }

        if (component.type == "Shape") {

            buttonColor = sketchUtil.colorSet(component.style);
            button.border = sketchUtil.borderSet(component);
            button.border.circle = sketchUtil.circleObject(component);
            if (!button.shadow.isEnabled) button.shadow = sketchUtil.shadowSet(component.style);
        }
    }
    sketchUtil.setComponent(button, type, sketch_component, buttonColor);
    button.text = buttonText;

    sketchUtil.setParentId(button, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent is lib item 
        sketchUtil.calculateNewFrame(button, pageTree);
    }
    pageTree.children.push(button);
}

function is_Shape_Image(type, sketch_component, pageTree, imageFolder) {

    var newObj = sketchUtil.shapeFinder(sketch_component);
    if (newObj != null) outputUtil.imageExport(newObj, imageFolder);else outputUtil.imageExport(sketch_component, imageFolder);
}

function is_ImageView(type, sketch_component, pageTree, imageFolder) {
    var imageView = sketchUtil.createPageObject();
    imageView.shadow = sketchUtil.createShadowObject();
    var color = sketchUtil.createColorObject();
    sketchUtil.setFirstPropery(imageView, sketch_component, pageTree);
    if (type[2] == "true") sketchUtil.setLibProperty(imageView, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(imageView, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }
    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Image" || sketchUtil.isShape(sketch_component) == true) {
        var imJson = sketchUtil.sketchToJson(sketch_component);
        var imageType = [];
        imageType.push(imJson.name);
        imageType.push("image");
        imageView.image = imJson.name + ".png"; // assign image directory
        is_Shape_Image(imageType, sketch_component, "null", imageFolder);
    }

    if (sketch_component.type == "Group") {
        imageView.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        var flag = false;
        do {
            flag = false;
            if (component.type == "SymbolInstance") {
                component = sketchUtil.symbolInstanceFinder(component);
                component = component.layers[0]; // Should be change
                if (component.type == "SymbolInstance") flag = true;
            }
        } while (flag);
        var imJson = sketchUtil.sketchToJson(component);

        if (component.type == "Image" || sketchUtil.isShape(component) == true) {
            imageView.image = imJson.name + ".png";
            is_Shape_Image("null", component, "null", imageFolder);
        } else if (component.type == "Shape") {
            imageView.border = sketchUtil.borderSet(component);
            color = sketchUtil.colorSet(component.style);
            imageView.border.circle = sketchUtil.circleObject(component);
            if (!imageView.shadow.isEnabled) //Shadow   
                imageView.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(imageView, type, sketch_component, color);

    sketchUtil.setParentId(imageView, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(imageView, pageTree);
    }
    pageTree.children.push(imageView);
}

/**
 *     LABEL 
 */
function is_Label(type, sketch_component, pageTree) {
    var label = sketchUtil.createPageObject();
    label.shadow = sketchUtil.createShadowObject();
    var label_bacground_color = sketchUtil.createColorObject();
    var label_text = sketchUtil.createTextObject();
    sketchUtil.setFirstPropery(label, sketch_component, pageTree);
    //log(JSON.stringify(sketchUtil.sketchToJson(sketch_component)))
    if (type[2] == "true") sketchUtil.setLibProperty(label, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(label, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group" || sketch_component.type == "SymbolInstance") {
        // if label in group
        label.shadow = sketchUtil.shadowSet(sketch_component.style);
    } else if (sketch_component.type == "Text") {
        //
        label_text = sketchUtil.fill_text_object(sketch_component);
    }
    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];

        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Text") {
            label_text = sketchUtil.fill_text_object(component);
        }

        if (component.type == "Shape") {
            label_bacground_color = sketchUtil.colorSet(component.style);
            label.border = sketchUtil.borderSet(component);
            label.border.circle = sketchUtil.circleObject(component);
            if (!label.shadow.isEnabled) // Shadow
                label.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(label, type, sketch_component, label_bacground_color);
    label.text = label_text;

    sketchUtil.setParentId(label, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(label, pageTree);
    }
    pageTree.children.push(label);
}

function is_TextBox_TextArea(type, sketch_component, pageTree) {
    var text_Box_Area = sketchUtil.createPageObject();
    var backgroundColor = sketchUtil.createColorObject();
    text_Box_Area.shadow = sketchUtil.createShadowObject();
    var textData = sketchUtil.createTextObject();
    sketchUtil.setFirstPropery(text_Box_Area, sketch_component, pageTree);

    if (type[2] == "true") sketchUtil.setLibProperty(text_Box_Area, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(text_Box_Area, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }
    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group") {
        text_Box_Area.shadow = sketchUtil.shadowSet(sketch_component.style);
    } else if (sketch_component.type == "Text") {
        //
        textData = sketchUtil.fill_text_object(sketch_component);
    }

    for (var iter in sketch_component.layers) {
        // text = rectangle + text 
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Text") {
            textData = sketchUtil.fill_text_object(component);
        }
        if (component.type == "Shape") {

            backgroundColor = sketchUtil.colorSet(component.style);
            text_Box_Area.border = sketchUtil.borderSet(component);
            text_Box_Area.border.circle = sketchUtil.circleObject(component);;
            if (!text_Box_Area.shadow.isEnabled) text_Box_Area.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(text_Box_Area, type, sketch_component, backgroundColor);
    text_Box_Area.text = textData;

    sketchUtil.setParentId(text_Box_Area, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(text_Box_Area, pageTree);
    }

    pageTree.children.push(text_Box_Area);
}

function is_SearchView(type, sketch_component, pageTree) {
    var searchView = sketchUtil.createPageObject();
    var searchColor = sketchUtil.createColorObject();
    searchView.shadow = sketchUtil.createShadowObject();
    var searchText = sketchUtil.createTextObject();
    sketchUtil.setFirstPropery(searchView, sketch_component, pageTree);

    if (type[2] == "true") sketchUtil.setLibProperty(searchView, sketch_component);
    if (sketch_component.type == "SymbolInstance") {
        // use default(sketch) search instance
        searchColor = sketchUtil.createColorObject();
    } else if (sketch_component.type == "Group") {
        // use grup rectangle and text 
        searchView.shadow = sketchUtil.shadowSet(sketch_component.style);

        for (var iter in sketch_component.layers) {
            // searchBar = rectangle + text 
            var component = sketch_component.layers[iter];
            if (component.type == "SymbolInstance") {
                searchColor = sketchUtil.createColorObject();
                component = sketchUtil.symbolInstanceFinder(component);
                component = component.layers[0]; // Should be change
            }
            if (component.type == "Text") {
                searchText = sketchUtil.fill_text_object(component);
            }
            if (component.type == "Shape") {
                searchColor = sketchUtil.colorSet(component.style);
                searchView.border = sketchUtil.borderSet(component);
                searchView.border.circle = sketchUtil.circleObject(component);
                if (!searchView.shadow.isEnabled) // Shadow
                    searchView.shadow = sketchUtil.shadowSet(component.style);
            }
        }
    }

    sketchUtil.setComponent(searchView, type, sketch_component, searchColor);
    searchView.text = searchText;

    sketchUtil.setParentId(searchView, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(searchView, pageTree);
    }

    pageTree.children.push(searchView);
}
/*
 * MULTI COMPONENT CONTAINER ###################################################################
 */
function is_Multi_Component(type, sketch_component, pageTree) {
    var multiComponent = sketchUtil.createPageObject();
    var color = sketchUtil.createPageObject();
    multiComponent.shadow = sketchUtil.createShadowObject();

    sketchUtil.setFirstPropery(multiComponent, sketch_component, pageTree);

    if (type[2] == "true") sketchUtil.setLibProperty(multiComponent, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(multiComponent, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "Group") {
        multiComponent.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];

        if (component.type == "SymbolInstance" && !sketchUtil.isSfType(component)) {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }

        if (component.type == "Shape" && !sketchUtil.isSfType(component)) {
            multiComponent.border = sketchUtil.borderSet(component);
            color = sketchUtil.colorSet(component.style);
            multiComponent.border.circle = sketchUtil.circleObject(component);
            if (!multiComponent.shadow.isEnabled) multiComponent.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(multiComponent, type, sketch_component, color);

    sketchUtil.setParentId(multiComponent, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(multiComponent, pageTree);
    }
    pageTree.children.push(multiComponent);
    return multiComponent;
}

/* ########################################################################################## */
function is_Slider(type, sketch_component, pageTree) {
    var slider = sketchUtil.createPageObject();
    var color = sketchUtil.createColorObject();
    var thumbColor = sketchUtil.createColorObject();
    var maxColor = sketchUtil.createColorObject();
    var minColor = sketchUtil.createColorObject();

    sketchUtil.setFirstPropery(slider, sketch_component, pageTree);
    if (type[2] == "true") sketchUtil.setLibProperty(slider, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(slider, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Shape") {
            var slJson = sketchUtil.sketchToJson(component);
            if (slJson.layers != null) {
                if (slJson.layers[0] != null) {
                    if (slJson.layers[0]["<class>"] == "MSOvalShape") {
                        // Thumb
                        thumbColor = sketchUtil.colorSet(component.style);
                    }
                    if (slJson.layers[0]["<class>"] == "MSShapePathLayer") {
                        // Line
                        if (component.name == "min") minColor = sketchUtil.colorHex_Rgba(slJson.style.borders[0].color.value);else maxColor = sketchUtil.colorHex_Rgba(slJson.style.borders[0].color.value);
                    }
                }
            }
        }
    }
    sketchUtil.setComponent(slider, type, sketch_component, color);

    slider.thumbColor = thumbColor;
    slider.minTrackColor = minColor;
    slider.maxTrackColor = maxColor;

    sketchUtil.setParentId(slider, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(slider, pageTree);
    }
    pageTree.children.push(slider);
}

function is_TextView(type, sketch_component, pageTree) {
    var text_view = sketchUtil.createPageObject();
    var backgroundColor = sketchUtil.createColorObject();
    text_view.shadow = sketchUtil.createShadowObject();
    sketchUtil.setFirstPropery(text_view, sketch_component, pageTree);

    if (type[2] == "true") sketchUtil.setLibProperty(text_view, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(text_view, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group") {
        text_view.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    if (sketch_component.type == "Text") {

        var twJson = sketchUtil.sketchToJson(sketch_component);
        var color = twJson.attributedString.value.attributes[0].MSAttributedStringColorAttribute.value;
        text_view.text.text = sketchUtil.fill_text_object(sketch_component);
        text_view.html = twJson.attributedString.value;
    }
    // textView in Group
    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Text") {

            var twJson = sketchUtil.sketchToJson(component);
            var color = twJson.attributedString.value.attributes[0].MSAttributedStringColorAttribute.value;
            text_view.text.text = sketchUtil.fill_text_object(component);
            text_view.html = twJson.attributedString.value;
        }
        if (component.type == "Shape") {
            backgroundColor = sketchUtil.colorSet(component.style);
            text_view.border = sketchUtil.borderSet(component);
            text_view.border.circle = sketchUtil.circleObject(component);
            if (!text_view.shadow.isEnabled) text_view.shadow = sketchUtil.shadowSet(component.style);
        }
    }

    sketchUtil.setComponent(text_view, type, sketch_component, backgroundColor);
    sketchUtil.setParentId(text_view, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(text_view, pageTree);
    }
    pageTree.children.push(text_view);
}
/**
 *  MapView , VideoView , WebView
 */
function is_MVW_View(type, sketch_component, pageTree) {
    var mvw_view = sketchUtil.createPageObject();
    var backgroundColor = sketchUtil.createColorObject();
    sketchUtil.setFirstPropery(mvw_view, sketch_component);

    if (type[2] == "true") sketchUtil.setLibProperty(mvw_view, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(mvw_view, sketch_component, pageTree);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }

    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    if (sketch_component.type == "Group") {
        mvw_view.shadow = sketchUtil.shadowSet(sketch_component.style);
    }

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Shape") {
            mvw_view.border = sketchUtil.borderSet(component);

            mvw_view.border.circle = sketchUtil.circleObject(component);
            if (!mvw_view.shadow.isEnabled) mvw_view.shadow = sketchUtil.shadowSet(component.style);
        }
    }
    sketchUtil.setComponent(mvw_view, type, sketch_component, backgroundColor);
    sketchUtil.setParentId(mvw_view, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(mvw_view, pageTree);
    }
    pageTree.children.push(mvw_view);
}

function is_Switch(type, sketch_component, pageTree) {
    var switchComp = sketchUtil.createPageObject();
    var thumbColor = sketchUtil.createColorObject();
    var toggleOnColor = sketchUtil.createColorObject();

    sketchUtil.setFirstPropery(switchComp, sketch_component, pageTree);

    if (type[2] == "true") sketchUtil.setLibProperty(switchComp, sketch_component);

    if (sketch_component.type == "SymbolInstance") {
        sketchUtil.setFrame(switchComp, sketch_component);
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }
    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "SymbolInstance") {
            component = sketchUtil.symbolInstanceFinder(component);
            component = component.layers[0]; // Should be change
        }
        if (component.type == "Shape") {
            var slJson = sketchUtil.sketchToJson(component);
            if (slJson.layers != null) {
                if (slJson.layers[0] != null) {
                    if (slJson.layers[0]["<class>"] == "MSOvalShape") {
                        // Thumb
                        thumbColor = sketchUtil.colorSet(component.style);
                    }
                    if (slJson.layers[0]["<class>"] == "MSRectangleShape") {
                        // Line
                        toggleOnColor = sketchUtil.colorSet(component.style);
                    }
                }
            }
        }
    }
    sketchUtil.setComponent(switchComp, type, sketch_component, sketchUtil.createColorObject());

    switchComp.thumbColor = thumbColor;
    switchComp.toggleOnColor = toggleOnColor;

    sketchUtil.setParentId(switchComp, pageTree);

    if (pageTree.lib.isLib == true) {
        // if parent lib item 
        sketchUtil.calculateNewFrame(switchComp, pageTree);
    }

    pageTree.children.push(switchComp);
}

function is_HeaderBar(type, sketch_component, pageTree, imageFolder) {
    var y = sketch_component.frame.height;
    y += sketch_component.frame.y;

    if (sketch_component.type == "SymbolInstance") {
        sketch_component = sketchUtil.symbolInstanceFinder(sketch_component);
    }
    if (sketch_component.type == "SymbolMaster") sketch_component = sketch_component.layers[0];

    for (var iter in sketch_component.layers) {
        var component = sketch_component.layers[iter];
        if (component.type == "Image" || sketchUtil.isShape(component) == true) {
            is_Shape_Image("null", component, "null", imageFolder);
        }
    }
    if (pageTree.type == "page") pageTree.headerBar = y;else context.document.showMessage("The HeaderBar should be a page child !! ");
}
module.exports = {
    is_Page: is_Page,
    is_Label: is_Label,
    is_Switch: is_Switch,
    is_Slider: is_Slider,
    is_Button: is_Button,
    is_MVW_View: is_MVW_View,
    is_TextView: is_TextView,
    is_HeaderBar: is_HeaderBar,
    is_ImageView: is_ImageView,
    is_SearchView: is_SearchView,
    is_Shape_Image: is_Shape_Image,
    is_Multi_Component: is_Multi_Component,
    is_TextBox_TextArea: is_TextBox_TextArea
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// TODO: async. Should probably be done with NSFileHandle and some notifications
// TODO: file descriptor. Needs to be done with NSFileHandle

module.exports.constants = {
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1
};

module.exports.accessSync = function (path, mode) {
    mode = mode | 0;
    var fileManager = NSFileManager.defaultManager();

    switch (mode) {
        case 0:
            return module.exports.existsSync(path);
        case 1:
            return Boolean(fileManager.isExecutableFileAtPath(path));
        case 2:
            return Boolean(fileManager.isWritableFileAtPath(path));
        case 3:
            return Boolean(fileManager.isExecutableFileAtPath(path) && fileManager.isWritableFileAtPath(path));
        case 4:
            return Boolean(fileManager.isReadableFileAtPath(path));
        case 5:
            return Boolean(fileManager.isReadableFileAtPath(path) && fileManager.isExecutableFileAtPath(path));
        case 6:
            return Boolean(fileManager.isReadableFileAtPath(path) && fileManager.isWritableFileAtPath(path));
        case 7:
            return Boolean(fileManager.isReadableFileAtPath(path) && fileManager.isWritableFileAtPath(path) && fileManager.isExecutableFileAtPath(path));
    }
};

module.exports.appendFileSync = function (file, data, options) {
    if (!module.exports.existsSync(file)) {
        return module.exports.writeFileSync(file, data, options);
    }

    var handle = NSFileHandle.fileHandleForWritingAtPath(file);
    handle.seekToEndOfFile();

    if (data && data.mocha && data.mocha()['class']() === 'NSData') {
        handle.writeData(data);
        return;
    }

    var encoding = options && options.encoding ? options.encoding : options ? options : 'utf8';

    var string = NSString.stringWithString(data);
    var nsdata;

    switch (encoding) {
        case 'utf8':
            nsdata = string.dataUsingEncoding(NSUTF8StringEncoding);
            break;
        case 'ascii':
            nsdata = string.dataUsingEncoding(NSASCIIStringEncoding);
            break;
        case 'utf16le':
        case 'ucs2':
            nsdata = string.dataUsingEncoding(NSUTF16LittleEndianStringEncoding);
            break;
        case 'base64':
            var plainData = string.dataUsingEncoding(NSUTF8StringEncoding);
            nsdata = plainData.base64EncodedStringWithOptions(0).dataUsingEncoding(NSUTF8StringEncoding);
            break;
        case 'latin1':
        case 'binary':
            nsdata = string.dataUsingEncoding(NSISOLatin1StringEncoding);
            break;
        case 'hex':
        // TODO: how?
        default:
            nsdata = string.dataUsingEncoding(NSUTF8StringEncoding);
            break;
    }

    handle.writeData(data);
};

module.exports.chmodSync = function (path, mode) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    fileManager.setAttributes_ofItemAtPath_error({
        NSFilePosixPermissions: mode
    }, path, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.copyFileSync = function (path, dest, flags) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    fileManager.copyItemAtPath_toPath_error(path, dest, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.existsSync = function (path) {
    var fileManager = NSFileManager.defaultManager();
    return Boolean(fileManager.fileExistsAtPath(path));
};

module.exports.linkSync = function (existingPath, newPath) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    fileManager.linkItemAtPath_toPath_error(existingPath, newPath, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.mkdirSync = function (path, mode) {
    mode = mode || 511;
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(path, false, {
        NSFilePosixPermissions: mode
    }, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.mkdtempSync = function (path) {
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }return text;
    }
    var tempPath = path + makeid();
    module.exports.mkdirSync(tempPath);
    return tempPath;
};

module.exports.readdirSync = function (path) {
    var fileManager = NSFileManager.defaultManager();
    var paths = fileManager.subpathsAtPath(path);
    var arr = [];
    for (var i = 0; i < paths.length; i++) {
        arr.push(paths[i]);
    }
    return arr;
};

module.exports.readFileSync = function (path, options) {
    var encoding = options && options.encoding ? options.encoding : options ? options : 'buffer';
    var fileManager = NSFileManager.defaultManager();
    var data = fileManager.contentsAtPath(path);
    switch (encoding) {
        case 'utf8':
            return String(NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding));
        case 'ascii':
            return String(NSString.alloc().initWithData_encoding(data, NSASCIIStringEncoding));
        case 'utf16le':
        case 'ucs2':
            return String(NSString.alloc().initWithData_encoding(data, NSUTF16LittleEndianStringEncoding));
        case 'base64':
            var nsdataDecoded = NSData.alloc().initWithBase64EncodedData_options(data, 0);
            return String(NSString.alloc().initWithData_encoding(nsdataDecoded, NSUTF8StringEncoding));
        case 'latin1':
        case 'binary':
            return String(NSString.alloc().initWithData_encoding(data, NSISOLatin1StringEncoding));
        case 'hex':
            // TODO: how?
            return data;
        default:
            return data;
    }
};

module.exports.readlinkSync = function (path) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    var result = fileManager.destinationOfSymbolicLinkAtPath_error(path, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }

    return result;
};

module.exports.realpathSync = function (path) {
    return NSString.stringByResolvingSymlinksInPath(path);
};

module.exports.renameSync = function (oldPath, newPath) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    fileManager.moveItemAtPath_toPath_error(oldPath, newPath, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.rmdirSync = function (path) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    fileManager.removeItemAtPath_error(path, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.statSync = function (path) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    var result = fileManager.attributesOfItemAtPath_error(path, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }

    return {
        dev: String(result.NSFileDeviceIdentifier),
        // ino: 48064969, The file system specific "Inode" number for the file.
        mode: result.NSFileType | result.NSFilePosixPermissions,
        nlink: Number(result.NSFileReferenceCount),
        uid: String(result.NSFileOwnerAccountID),
        gid: String(result.NSFileGroupOwnerAccountID),
        // rdev: 0, A numeric device identifier if the file is considered "special".
        size: Number(result.NSFileSize),
        // blksize: 4096, The file system block size for i/o operations.
        // blocks: 8, The number of blocks allocated for this file.
        atimeMs: Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
        mtimeMs: Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
        ctimeMs: Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
        birthtimeMs: Number(result.NSFileCreationDate.timeIntervalSince1970()) * 1000,
        atime: new Date(Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5), // the 0.5 comes from the node source. Not sure why it's added but in doubt...
        mtime: new Date(Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5),
        ctime: new Date(Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5),
        birthtime: new Date(Number(result.NSFileCreationDate.timeIntervalSince1970()) * 1000 + 0.5),
        isBlockDevice: function () {
            function isBlockDevice() {
                return result.NSFileType === NSFileTypeBlockSpecial;
            }

            return isBlockDevice;
        }(),
        isCharacterDevice: function () {
            function isCharacterDevice() {
                return result.NSFileType === NSFileTypeCharacterSpecial;
            }

            return isCharacterDevice;
        }(),
        isDirectory: function () {
            function isDirectory() {
                return result.NSFileType === NSFileTypeDirectory;
            }

            return isDirectory;
        }(),
        isFIFO: function () {
            function isFIFO() {
                return false;
            }

            return isFIFO;
        }(),
        isFile: function () {
            function isFile() {
                return result.NSFileType === NSFileTypeRegular;
            }

            return isFile;
        }(),
        isSocket: function () {
            function isSocket() {
                return result.NSFileType === NSFileTypeSocket;
            }

            return isSocket;
        }(),
        isSymbolicLink: function () {
            function isSymbolicLink() {
                return result.NSFileType === NSFileTypeSymbolicLink;
            }

            return isSymbolicLink;
        }()
    };
};

module.exports.symlinkSync = function (target, path) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    var result = fileManager.createSymbolicLinkAtPath_withDestinationPath_error(path, target, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.truncateSync = function (path, len) {
    var hFile = NSFileHandle.fileHandleForUpdatingAtPath(sFilePath);
    hFile.truncateFileAtOffset(len || 0);
    hFile.closeFile();
};

module.exports.unlinkSync = function (path) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    var result = fileManager.removeItemAtPath_error(path, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.utimesSync = function (path, aTime, mTime) {
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    var result = fileManager.setAttributes_ofItemAtPath_error({
        NSFileModificationDate: aTime
    }, path, err);

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

module.exports.writeFileSync = function (path, data, options) {
    var encoding = options && options.encoding ? options.encoding : options ? options : 'utf8';

    if (data && data.mocha && data.mocha()['class']() === 'NSData') {
        data.writeToFile_atomically(path, true);
        return;
    }

    var err = MOPointer.alloc().init();
    var string = NSString.stringWithString(data);

    switch (encoding) {
        case 'utf8':
            string.writeToFile_atomically_encoding_error(path, true, NSUTF8StringEncoding, err);
            break;
        case 'ascii':
            string.writeToFile_atomically_encoding_error(path, true, NSASCIIStringEncoding, err);
            break;
        case 'utf16le':
        case 'ucs2':
            string.writeToFile_atomically_encoding_error(path, true, NSUTF16LittleEndianStringEncoding, err);
            break;
        case 'base64':
            var plainData = string.dataUsingEncoding(NSUTF8StringEncoding);
            var nsdataEncoded = plainData.base64EncodedStringWithOptions(0);
            nsdataEncoded.writeToFile_atomically(path, true);
            break;
        case 'latin1':
        case 'binary':
            string.writeToFile_atomically_encoding_error(path, true, NSISOLatin1StringEncoding, err);
            break;
        case 'hex':
        // TODO: how?
        default:
            string.writeToFile_atomically_encoding_error(path, true, NSUTF8StringEncoding, err);
            break;
    }

    if (err.value() !== null) {
        throw new Error(err.value());
    }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pageComponent = __webpack_require__(27);
var smartfaceUtil = __webpack_require__(8);
var UI = __webpack_require__(0);
var pgxPages = [];
var cpxPages = [];
var mappedLibrary = new Map();

function smartfaceMapper(pages) {
    mappedLibrary.clear();
    pgxPages = [];
    cpxPages = [];
    for (var iter in pages) {
        var pgxPage = createPgxPage(pages[iter]);
        if (pgxPage != null) {
            pgxPages.push(pgxPage);
        }
    }
    return {
        pgx: pgxPages,
        cpx: cpxPages
    };
}

function mapPageComponent(smartfacePage, sketchComponent) {

    if (sketchComponent == null) return;

    for (var iter in sketchComponent) {
        var smartfaceComponent = selectComponentType(sketchComponent[iter]);
        if (smartfaceComponent != null) {
            smartfacePage.components.push(smartfaceComponent);
            if (smartfaceComponent.type != "GridViewItem" && smartfaceComponent.type != "ListViewItem" && sketchComponent[iter].lib.isLib == false) mapPageComponent(smartfacePage, sketchComponent[iter].children);

            if (sketchComponent[iter].lib.isLib == true) {
                for (var iter in smartfacePage.components) {
                    for (var iter2 in smartfacePage.components[iter].props.children) {
                        if (smartfacePage.components[iter].props.children[iter2] == smartfaceComponent.id) {
                            var id = smartfaceUtil.guid();
                            smartfacePage.components[iter].props.children[iter2] = id;
                            smartfaceComponent.id = id;
                        }
                    }
                }
            }
        }
    }
}

function selectComponentType(sketchComponent) {
    if (sketchComponent == null) return;

    var smartfaceComponent;
    var type = sketchComponent.type;
    if (type == "listview" || type == "gridview") smartfaceComponent = pageComponent.createGridListView(sketchComponent);else if (type == "mapview" || type == "videoview" || type == "webview") smartfaceComponent = pageComponent.createMapVideoWebView(sketchComponent);else if (type == "flexlayout" || type == "scrollview") smartfaceComponent = pageComponent.createMultiComponent(sketchComponent);else if (type == "textbox" || type == "textarea") smartfaceComponent = pageComponent.createTextBoxArea(sketchComponent);else if (type == "button") smartfaceComponent = pageComponent.createButton(sketchComponent);else if (type == "imageview") smartfaceComponent = pageComponent.createImageView(sketchComponent);else if (type == "label") smartfaceComponent = pageComponent.createLabel(sketchComponent);else if (type == "slider") smartfaceComponent = pageComponent.createSlider(sketchComponent);else if (type == "switch") smartfaceComponent = pageComponent.createSwitch(sketchComponent);else if (type == "textview") smartfaceComponent = pageComponent.createTextView(sketchComponent);else if (type == "searchview") smartfaceComponent = pageComponent.createSearchView(sketchComponent);else if (type == "listviewitem" || type == "gridviewitem") {
        smartfaceComponent = pageComponent.createGridListView(sketchComponent);
        createCpx(smartfaceComponent, sketchComponent);
    }

    if (sketchComponent.lib.isLib == true) {
        createCpx(smartfaceComponent, sketchComponent);
    } else {
        if (sketchComponent.objectName != null) smartfaceComponent.props.name = sketchComponent.objectName;
    }

    return smartfaceComponent;
}

function createPgxPage(sketchPage) {
    var pgxPage;
    if (sketchPage == null) return pgxPage;

    if (sketchPage.type == "page" || sketchPage.type == "library") {
        pgxPage = pageComponent.createPage(sketchPage);
        mapPageComponent(pgxPage, sketchPage.children);
    }
    return pgxPage;
}

/**
 * cpxComponent : ListViewItem or GridViewItem object
 * sketchComponent : cpxPages all contets
 */
function createCpx(cpxComponent, sketchComponent) {
    if (cpxComponent == null || sketchComponent == null) return;
    var name = mappedLibrary.get(sketchComponent.lib.libID);
    if (name != null) {
        cpxComponent.props.children = [];
        cpxComponent.source = {
            page: "__library__",
            type: name,
            id: sketchComponent.lib.libID
        };
        cpxComponent.props.name = sketchComponent.objectName;
        return;
    }

    var cpxPage = {
        components: []
    };
    var smartfaceComponent;
    var type = sketchComponent.type;
    var savedID = sketchComponent.id;
    sketchComponent.id = sketchComponent.lib.libID;

    if (type == "listview" || type == "gridview" || type == "listviewitem" || type == "gridviewitem") smartfaceComponent = pageComponent.createGridListView(sketchComponent);else if (type == "mapview" || type == "videoview" || type == "webview") smartfaceComponent = pageComponent.createMapVideoWebView(sketchComponent);else if (type == "flexlayout" || type == "scrollview") smartfaceComponent = pageComponent.createMultiComponent(sketchComponent);else if (type == "textbox" || type == "textarea") smartfaceComponent = pageComponent.createTextBoxArea(sketchComponent);else if (type == "button") smartfaceComponent = pageComponent.createButton(sketchComponent);else if (type == "imageview") smartfaceComponent = pageComponent.createImageView(sketchComponent);else if (type == "label") smartfaceComponent = pageComponent.createLabel(sketchComponent);else if (type == "slider") smartfaceComponent = pageComponent.createSlider(sketchComponent);else if (type == "switch") smartfaceComponent = pageComponent.createSwitch(sketchComponent);else if (type == "textview") smartfaceComponent = pageComponent.createTextView(sketchComponent);else if (type == "searchview") smartfaceComponent = pageComponent.createSearchView(sketchComponent);

    mappedLibrary.set(sketchComponent.lib.libID, smartfaceComponent.props.name);

    sketchComponent.id = savedID;
    cpxComponent.props.children = [];
    cpxComponent.source = {
        page: "__library__",
        type: smartfaceComponent.props.name,
        id: smartfaceComponent.id
    };
    cpxComponent.props.name = sketchComponent.objectName;
    smartfaceComponent.props.parent = smartfaceUtil.guid();
    smartfaceComponent.hiddenComponent = true; // 
    cpxPage.components.push(smartfaceComponent); // Add GridViewItem or ListViewItem on cpx 
    // map for cpx componets
    mapPageComponent(cpxPage, sketchComponent.children);

    for (var iter in cpxPage.components) {
        // add libray item 

        if (cpxPage.components[iter].source == null) {
            cpxPage.components[iter].source = {
                page: "__library__"
            };
        }
    }

    cpxPages.push(cpxPage);
}

module.exports = {
    smartfaceMapper: smartfaceMapper
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var smartfaceUtil = __webpack_require__(8);
/**
 * MULTICOMPONENT :
 * flexLayout 
 * scrollView 
 */
function createMultiComponent(sketchComponent) {
    var multiComponent = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(multiComponent, sketchComponent);
    smartfaceUtil.addChild(multiComponent, sketchComponent);
    //----------------------------------//
    if (sketchComponent.type == "flexlayout") {
        multiComponent.className = ".flexLayout";
        multiComponent.type = "FlexLayout";
    }
    if (sketchComponent.type == "scrollview") {
        multiComponent.className = ".scrollView";
        multiComponent.type = "ScrollView";

        //multiComponent.userProps.flexProps.flexDirection = "ROW";
        multiComponent.userProps.autoSizeEnabled = true;
        multiComponent.props.autoSizeEnabled = true;
    }
    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    multiComponent.userProps.backgroundColor = color;
    smartfaceUtil.frameSetter(multiComponent, sketchComponent);
    smartfaceUtil.borderSetter(multiComponent, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(multiComponent, sketchComponent);
    //--------------------------------//
    multiComponent.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(multiComponent, sketchComponent);

    return multiComponent;
}
/*
 * GridView and ListView map function
 */
function createGridListView(sketchComponent) {
    var grid_list_view = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(grid_list_view, sketchComponent);
    smartfaceUtil.addChild(grid_list_view, sketchComponent);

    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    grid_list_view.userProps.backgroundColor = color;

    grid_list_view.userProps.flexProps.positionType = "ABSOLUTE";

    if (sketchComponent.type == "gridview") {
        // GridView settings
        grid_list_view.className = ".gridView";
        grid_list_view.type = "GridView";
    }

    if (sketchComponent.type == "gridviewitem") {
        // GridViewItem settings 
        grid_list_view.className = ".gridViewItem";
        grid_list_view.type = "GridViewItem";
        grid_list_view.userProps.flexProps.positionType = "RELATIVE";
    }

    if (sketchComponent.type == "listview") {
        // ListView settings
        grid_list_view.className = ".listView";
        grid_list_view.type = "ListView";
    }

    if (sketchComponent.type == "listviewitem") {
        // ListViewItem settings
        grid_list_view.className = ".listViewItem";
        grid_list_view.type = "ListViewItem";
        grid_list_view.userProps.flexProps.positionType = "RELATIVE";
    }

    //-------------------------------//

    smartfaceUtil.frameSetter(grid_list_view, sketchComponent);
    smartfaceUtil.borderSetter(grid_list_view, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(grid_list_view, sketchComponent);
    //--------------------------------//

    smartfaceUtil.setSomeProprties(grid_list_view, sketchComponent);

    return grid_list_view;
}

function createSwitch(sketchComponent) {
    var switchComp = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(switchComp, sketchComponent);
    //--------------------------------//
    switchComp.className = ".switch";
    switchComp.type = "Switch";

    switchComp.userProps.thumbOnColor = smartfaceUtil.colorMap(sketchComponent.thumbColor);
    switchComp.userProps.toggleOnColor = smartfaceUtil.colorMap(sketchComponent.toggleOnColor);

    smartfaceUtil.frameSetter(switchComp, sketchComponent);

    //--------------------------------//
    switchComp.userProps.toggle = false;
    switchComp.props.toggle = false;
    switchComp.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(switchComp, sketchComponent);

    return switchComp;
}

/**
 *  MapView , VideoView , WebView 
 *  use that function 
 */
function createMapVideoWebView(sketchComponent) {
    var mvw_view = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(mvw_view, sketchComponent);
    //----------------------------------//

    if (sketchComponent.type == "mapview") {
        // For MapView
        mvw_view.className = ".mapView";
        mvw_view.type = "MapView";
    }

    if (sketchComponent.type == "videoview") {
        // For VideoView
        mvw_view.className = ".videoView";
        mvw_view.type = "VideoView";
    }

    if (sketchComponent.type == "webview") {
        // For WebView
        mvw_view.className = ".webView";
        mvw_view.type = "WebView";
    }

    smartfaceUtil.frameSetter(mvw_view, sketchComponent);
    smartfaceUtil.borderSetter(mvw_view, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(mvw_view, sketchComponent);
    //--------------------------------//
    mvw_view.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(mvw_view, sketchComponent);

    return mvw_view;
}

function createTextView(sketchComponent) {
    var text_view = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(text_view, sketchComponent);

    text_view.className = ".textView";
    text_view.type = "TextView";

    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    text_view.userProps.backgroundColor = color;
    var textArr = String(sketchComponent.text.text).split(" ");
    var text = "";
    for (var i = 0; i < textArr.length; i++) {
        text += textArr[i];
        if (i + 1 != textArr.length) text += ' ';
    }

    text_view.props.text = text;
    text_view.userProps.text = text;
    text_view.userProps.html = smartfaceUtil.sketchHTMLConverter(sketchComponent.html);
    //---------------------------------//
    smartfaceUtil.frameSetter(text_view, sketchComponent);
    smartfaceUtil.borderSetter(text_view, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(text_view, sketchComponent);
    //---------------------------------//
    text_view.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(text_view, sketchComponent);

    return text_view;
}

function createSlider(sketchComponent) {
    var slider = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(slider, sketchComponent);
    slider.className = ".slider";
    slider.type = "Slider";

    slider.userProps.backgroundColor = smartfaceUtil.colorMap(sketchComponent.property.color);
    slider.userProps.maxTrackColor = smartfaceUtil.colorMap(sketchComponent.maxTrackColor);
    slider.userProps.minTrackColor = smartfaceUtil.colorMap(sketchComponent.minTrackColor);
    slider.userProps.thumbColor = smartfaceUtil.colorMap(sketchComponent.thumbColor);

    //---------------------------------//
    smartfaceUtil.frameSetter(slider, sketchComponent);
    smartfaceUtil.borderSetter(slider, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(slider, sketchComponent);
    //---------------------------------//
    slider.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(slider, sketchComponent);

    return slider;
}

function createSearchView(sketchComponent) {
    var searchView = smartfaceUtil.createComponent();

    smartfaceUtil.defaultPgxSetter(searchView, sketchComponent);

    //---------------------------------//
    searchView.className = ".searchView";
    searchView.type = "SearchView";

    searchView.userProps.hint = sketchComponent.text.text;
    searchView.userProps.hintTextColor = smartfaceUtil.colorMap(sketchComponent.text.color);

    smartfaceUtil.frameSetter(searchView, sketchComponent);
    smartfaceUtil.borderSetter(searchView, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(searchView, sketchComponent);
    //----------------------------------//
    searchView.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(searchView, sketchComponent);

    return searchView;
}

function createImageView(sketchComponent) {
    var imageView = smartfaceUtil.createComponent();

    smartfaceUtil.defaultPgxSetter(imageView, sketchComponent);

    //------------------------------//
    imageView.className = ".imageView";
    imageView.type = "ImageView";

    imageView.userProps.image = sketchComponent.image;
    smartfaceUtil.frameSetter(imageView, sketchComponent);
    smartfaceUtil.borderSetter(imageView, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(imageView, sketchComponent);
    //------------------------------//
    imageView.userProps.flexProps.positionType = "ABSOLUTE";
    imageView.userProps.imageFillType = "ASPECTFIT";
    smartfaceUtil.setSomeProprties(imageView, sketchComponent);

    return imageView;
}

function createTextBoxArea(sketchComponent) {
    var textBox_Area = smartfaceUtil.createComponent();

    smartfaceUtil.defaultPgxSetter(textBox_Area, sketchComponent);

    //-------------------------------//
    textBox_Area.props.text = sketchComponent.text.text;
    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    textBox_Area.userProps.backgroundColor = color;

    smartfaceUtil.textSetter(textBox_Area, sketchComponent);
    smartfaceUtil.frameSetter(textBox_Area, sketchComponent);
    smartfaceUtil.borderSetter(textBox_Area, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(textBox_Area, sketchComponent);

    //-------------------------------//
    textBox_Area.userProps.flexProps.positionType = "ABSOLUTE";

    if (sketchComponent.type == "textbox") {
        textBox_Area.className = ".textBox";
        textBox_Area.type = "TextBox";
    }

    if (sketchComponent.type == "textarea") {
        textBox_Area.className = ".textArea";
        textBox_Area.type = "TextArea";
    }
    smartfaceUtil.setSomeProprties(textBox_Area, sketchComponent);

    return textBox_Area;
}

function createLabel(sketchComponent) {

    var label = smartfaceUtil.createComponent();

    smartfaceUtil.defaultPgxSetter(label, sketchComponent);

    //-------------------------//
    label.className = ".label";
    label.type = "Label";

    label.props.text = sketchComponent.text.text;

    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    label.userProps.backgroundColor = color;

    smartfaceUtil.textSetter(label, sketchComponent);
    smartfaceUtil.frameSetter(label, sketchComponent);
    smartfaceUtil.borderSetter(label, sketchComponent); // Border set
    smartfaceUtil.shadowSetter(label, sketchComponent);
    //-------------------------//
    label.userProps.flexProps.positionType = "ABSOLUTE";

    smartfaceUtil.setSomeProprties(label, sketchComponent);
    return label;
}

function createButton(sketchComponent) {
    var button = smartfaceUtil.createComponent();
    smartfaceUtil.defaultPgxSetter(button, sketchComponent);
    button.className = ".button";
    button.type = "Button";

    button.props.name = sketchComponent.name;
    button.props.text = sketchComponent.text.text;
    var color = smartfaceUtil.colorMap(sketchComponent.property.color);
    button.userProps.backgroundColor = color;

    smartfaceUtil.textSetter(button, sketchComponent);
    smartfaceUtil.frameSetter(button, sketchComponent);
    smartfaceUtil.borderSetter(button, sketchComponent); // Border set 
    smartfaceUtil.shadowSetter(button, sketchComponent);
    //----- The Default Button Settigs --------//
    button.props.usePageVariable = false;
    button.userProps.usePageVariable = false;
    button.userProps.flexProps.positionType = "ABSOLUTE";
    //----------------------------------------//

    smartfaceUtil.setSomeProprties(button, sketchComponent);

    return button;
}

function createPage(sketchComponent) {
    var page = smartfaceUtil.createComponent();
    // Create default pgx structure
    var pgxContainer = {
        components: []
    };
    page.className = ".page";
    page.type = "Page";
    smartfaceUtil.defaultPgxSetter(page, sketchComponent);

    //---- Crete & Add ( StatusBar & HeaderBar ) ----//
    var statusBar = createStatusBar(page);
    var headerBar = createHeaderBar(page);
    page.props.children.push(statusBar.id);
    page.props.children.push(headerBar.id);
    //-----------------------------------------------//

    smartfaceUtil.addChild(page, sketchComponent);
    var color = smartfaceUtil.colorMap(sketchComponent.property.color);

    page.userProps.backgroundColor = color;

    //-------- The default page settings ------------//
    page.initialized = false;
    page.version = "6.9.0";
    page.props.parent = null;
    page.props.isRemovable = true;
    page.userProps.orientation = "AUTO";
    page.props.orientation = "AUTO";
    //----------------------------------------------//
    if (sketchComponent.headerBar > 0) {
        // if header bar exist recalculate the objects location
        // sketch => header 0+y , smartface => header = 0		
        smartfaceUtil.recalculateLocation(sketchComponent, sketchComponent.headerBar);
    } else {
        statusBar.userProps.visible = false;
        headerBar.userProps.visible = false;
    }

    pgxContainer.components.push(page);
    pgxContainer.components.push(statusBar);
    pgxContainer.components.push(headerBar);

    return pgxContainer;
}

function createHeaderBar(page) {
    var headerBar = smartfaceUtil.createComponent();

    headerBar.className = ".headerBar";
    headerBar.id = smartfaceUtil.guid();
    headerBar.type = "HeaderBar";
    headerBar.props.isRemovable = false;
    headerBar.props.name = "headerBar";
    headerBar.props.parent = page.id;
    var title = page.props.name;
    headerBar.props.title = title;
    headerBar.userProps.title = title;
    return headerBar;
}

function createStatusBar(page) {
    var statusBar = smartfaceUtil.createComponent();

    statusBar.className = ".statusBar";
    statusBar.id = smartfaceUtil.guid();
    statusBar.type = "StatusBar";
    statusBar.props.isRemovable = false;
    statusBar.props.name = "statusBar";
    statusBar.props.parent = page.id;

    return statusBar;
}

module.exports = {
    createPage: createPage,
    createLabel: createLabel,
    createSlider: createSlider,
    createSwitch: createSwitch,
    createButton: createButton,
    createTextView: createTextView,
    createImageView: createImageView,
    createSearchView: createSearchView,
    createTextBoxArea: createTextBoxArea,
    createGridListView: createGridListView,
    createMultiComponent: createMultiComponent,
    createMapVideoWebView: createMapVideoWebView
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setTimeout, clearTimeout) {// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)["setTimeout"], __webpack_require__(9)["clearTimeout"]))

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
