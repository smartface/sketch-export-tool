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


var _client = __webpack_require__(1);

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

document.getElementById('sf_type_list').addEventListener('change', function () {
    var e = document.getElementById("sf_type_list");
    var value = e.options[e.selectedIndex].value;
    setBackTheUI();
    (0, _client2['default'])('set-type', value);
});

document.getElementById('layerName').addEventListener('dblclick', function () {
    document.getElementById('setName').style.visibility = "visible";
    document.getElementById('layerName').style.visibility = "hidden";
    document.getElementById('setName').value = document.getElementById('layerName').innerHTML;
});

document.getElementById('setName').addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        // Enter pressed 
        setBackTheUI();
        var value = document.getElementById('setName').value;
        (0, _client2['default'])('set-name', value);
    }
});

document.getElementById('className').addEventListener('dblclick', function () {
    document.getElementById('setClass').style.visibility = "visible";
    document.getElementById('className').style.visibility = "hidden";
    var oldClassName = document.getElementById('className').innerHTML;
    if (oldClassName != "Type Class Name") document.getElementById('setClass').value = oldClassName;else document.getElementById('setClass').value = '';
});

document.getElementById('setClass').addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        // Enter pressed 
        setBackTheUI();
        var value = document.getElementById('setClass').value;
        (0, _client2['default'])('set-class', value);
    }
});

document.getElementById('checkBox').addEventListener('click', function () {
    setBackTheUI();
    if (document.getElementById("checkBox").checked == true) {
        (0, _client2['default'])('set-library', true);
    } else {
        (0, _client2['default'])('set-library', false);
    }
});

document.getElementById('exportbtn').addEventListener("click", function () {
    setBackTheUI();
    (0, _client2['default'])('exportbtn', "export");
});

document.getElementById('topBtn').addEventListener("click", function () {
    setBackTheUI();
    (0, _client2['default'])('set-resize', "top");
});

document.getElementById('rightBtn').addEventListener("click", function () {
    setBackTheUI();
    (0, _client2['default'])('set-resize', "right");
});

document.getElementById('bottomBtn').addEventListener("click", function () {
    setBackTheUI();
    (0, _client2['default'])('set-resize', "bottom");
});
document.getElementById('leftBtn').addEventListener("click", function () {
    setBackTheUI();
    (0, _client2['default'])('set-resize', "left");
});

// called from the plugin
window.setShow = function (data) {

    var name = data.name;
    var type = data.type;
    //var nameCheck = data.nameCheck;
    var className = data.className;
    var library = data.library;

    if (data.changed == "true") setBackTheUI();

    resizeBoxSet(data);

    if (type === "shape" || type === "page") {
        exportButtonVisibility("visible");
    } else {
        exportButtonVisibility("hidden");
    }

    if (library != null && library != "null" && library != "false") {
        exportButtonVisibility("visible");
        document.getElementById('checkBox').checked = true;
    } else document.getElementById('checkBox').checked = false;

    /*
    if (nameCheck != null) {
        if (nameCheck == "1")
            document.getElementById('name_rectangle').className = "sk-asset name_rectangle success";
        if (nameCheck == "2")
            document.getElementById('name_rectangle').className = "sk-asset name_rectangle error";
        if (nameCheck == "3")
            document.getElementById('name_rectangle').className = "sk-asset name_rectangle warning";
    }
    */
    if (name == null) name = " ";
    document.getElementById('layerName').innerHTML = name;
    classNameShow(className);
    if (type == "null" || type == null) {
        //document.getElementById('sf_rectangle').className = "sk-asset sf_rectangle warning";
        var item = document.getElementById("sf_type_list");
        item.selectedIndex = 0; // 0 index => NAN
        exportButtonVisibility("hidden");
    } else {
        //document.getElementById('sf_rectangle').className = "sk-asset sf_rectangle success";
        var _item = document.getElementById("sf_type_list");
        for (var i = 0; i < _item.options.length; i++) {
            if (_item.options[i].value == type) {
                _item.selectedIndex = i;
                break;
            }
        }
    }
};

function resizeBoxSet(data) {
    var allresize = data.allresize;
    var warn = data.resizeWarn;
    /*
    if (warn == 'true') {
        document.getElementById('layoutImage').className = "classFrame layoutImage warn";
        document.getElementById("test").innerHTML = "BURADA";
    } else {
        //document.getElementById('layoutImage').className = "classFrame layoutImage";
        document.getElementById("test").innerHTML = warn;
        document.getElementById('layoutImage').className = "classFrame layoutImage warn";
    }
    */
    coloredResizeButtons(allresize);
}

function exportButtonVisibility(visibility) {

    if (visibility == "visible") {
        document.getElementById("exportbtn").style.visibility = "visible";
        document.getElementById("exportbtnDisable").style.visibility = "hidden";
    } else {
        document.getElementById("exportbtn").style.visibility = "hidden";
        document.getElementById("exportbtnDisable").style.visibility = "visible";
    }
}

function setBackTheUI() {

    document.getElementById('setName').style.visibility = "hidden";
    document.getElementById('layerName').style.visibility = "visible";

    document.getElementById('setClass').style.visibility = "hidden";
    document.getElementById('className').style.visibility = "visible";
}

function coloredResizeButtons(allresize) {

    document.getElementById("top").style.background = "#D1D1D1";
    document.getElementById("bottom").style.background = "#D1D1D1";
    document.getElementById("left").style.background = "#D1D1D1";
    document.getElementById("right").style.background = "#D1D1D1";
    if (allresize != null) {
        Object.keys(allresize).forEach(function (key) {
            if (allresize[key]) document.getElementById(key).style.background = "#00A1F1";
        });
    }
}

function classNameShow(className) {
    if (className == "null" || className == null) {
        document.getElementById('className').innerHTML = 'Type Class Name';
    } else document.getElementById('className').innerHTML = className;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(2)

module.exports = function(actionName) {
  if (!actionName) {
    throw new Error('missing action name')
  }
  window[CONSTANTS.JS_BRIDGE].callNative(
    JSON.stringify([].slice.call(arguments))
  )
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ })
/******/ ]);