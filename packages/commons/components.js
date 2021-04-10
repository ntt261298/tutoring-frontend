module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "GoogleLoginButton", function() { return /* reexport */ components_GoogleLoginButton; });
__webpack_require__.d(__webpack_exports__, "Copyright", function() { return /* reexport */ components_Copyright; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-google-login"
var external_react_google_login_ = __webpack_require__("react-google-login");

// EXTERNAL MODULE: external "@material-ui/core/styles"
var styles_ = __webpack_require__("@material-ui/core/styles");

// CONCATENATED MODULE: ./src/components/GoogleLoginButton.js
var useStyles=Object(styles_["makeStyles"])(function(){return{googleButton:{height:48,width:'100%',display:'flex',margin:'5px 0',alignItems:'center',justifyContent:'center'}};});var GoogleLoginButton_GoogleLoginButton=function GoogleLoginButton(_ref){var buttonText=_ref.buttonText,googleClientId=_ref.googleClientId,onGoogleLoginSuccess=_ref.onGoogleLoginSuccess,onGoogleLoginFailure=_ref.onGoogleLoginFailure;var classes=useStyles();return/*#__PURE__*/external_react_default.a.createElement(external_react_google_login_["GoogleLogin"],{className:classes.googleButton,style:{margin:'0 auto'},clientId:googleClientId,onSuccess:onGoogleLoginSuccess,onFailure:onGoogleLoginFailure},/*#__PURE__*/external_react_default.a.createElement("span",{className:"fa fa-google"}),buttonText);};/* harmony default export */ var components_GoogleLoginButton = (GoogleLoginButton_GoogleLoginButton);
// EXTERNAL MODULE: external "@material-ui/core/Typography"
var Typography_ = __webpack_require__("@material-ui/core/Typography");
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography_);

// CONCATENATED MODULE: ./src/components/Copyright.js
var Copyright_Copyright=function Copyright(){return/*#__PURE__*/external_react_default.a.createElement(Typography_default.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xA9 Truong Nguyen",' ',new Date().getFullYear(),'.');};/* harmony default export */ var components_Copyright = (Copyright_Copyright);
// CONCATENATED MODULE: ./src/components/index.js


/***/ }),

/***/ "@material-ui/core/Typography":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/styles":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-google-login":
/***/ (function(module, exports) {

module.exports = require("react-google-login");

/***/ })

/******/ });
//# sourceMappingURL=components.js.map