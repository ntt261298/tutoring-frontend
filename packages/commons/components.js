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

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _asyncToGenerator; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _createClass; });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _interopRequireWildcard; });
/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js");


function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _objectSpread2; });

// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _objectWithoutProperties; });

// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _typeof; });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("regenerator-runtime");


/***/ }),

/***/ "./src/components/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "GoogleLoginButton", function() { return /* reexport */ components_GoogleLoginButton; });
__webpack_require__.d(__webpack_exports__, "Copyright", function() { return /* reexport */ components_Copyright; });
__webpack_require__.d(__webpack_exports__, "Modal", function() { return /* reexport */ components_Modal; });
__webpack_require__.d(__webpack_exports__, "ModalContainer", function() { return /* reexport */ components_ModalContainer; });
__webpack_require__.d(__webpack_exports__, "Braintree", function() { return /* reexport */ components_Braintree; });

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
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");

// EXTERNAL MODULE: external "@material-ui/core/Button"
var Button_ = __webpack_require__("@material-ui/core/Button");
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "@material-ui/core/Dialog"
var Dialog_ = __webpack_require__("@material-ui/core/Dialog");
var Dialog_default = /*#__PURE__*/__webpack_require__.n(Dialog_);

// EXTERNAL MODULE: external "@material-ui/core/DialogTitle"
var DialogTitle_ = __webpack_require__("@material-ui/core/DialogTitle");
var DialogTitle_default = /*#__PURE__*/__webpack_require__.n(DialogTitle_);

// EXTERNAL MODULE: external "@material-ui/core/DialogContent"
var DialogContent_ = __webpack_require__("@material-ui/core/DialogContent");
var DialogContent_default = /*#__PURE__*/__webpack_require__.n(DialogContent_);

// EXTERNAL MODULE: external "@material-ui/core/DialogActions"
var DialogActions_ = __webpack_require__("@material-ui/core/DialogActions");
var DialogActions_default = /*#__PURE__*/__webpack_require__.n(DialogActions_);

// EXTERNAL MODULE: external "@material-ui/core/IconButton"
var IconButton_ = __webpack_require__("@material-ui/core/IconButton");
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_);

// EXTERNAL MODULE: external "@material-ui/icons/Close"
var Close_ = __webpack_require__("@material-ui/icons/Close");
var Close_default = /*#__PURE__*/__webpack_require__.n(Close_);

// CONCATENATED MODULE: ./src/components/Modal.js
var styles=function styles(theme){return{root:{margin:0,padding:theme.spacing(2)},closeButton:{position:'absolute',right:theme.spacing(1),top:theme.spacing(1),color:theme.palette.grey[500]}};};var DialogTitle=Object(styles_["withStyles"])(styles)(function(props){var children=props.children,classes=props.classes,onClose=props.onClose,closable=props.closable,other=Object(objectWithoutProperties["a" /* default */])(props,["children","classes","onClose","closable"]);return/*#__PURE__*/external_react_default.a.createElement(DialogTitle_default.a,Object.assign({disableTypography:true,className:classes.root},other),/*#__PURE__*/external_react_default.a.createElement(Typography_default.a,{variant:"h6"},children),closable?/*#__PURE__*/external_react_default.a.createElement(IconButton_default.a,{"aria-label":"close",className:classes.closeButton,onClick:onClose},/*#__PURE__*/external_react_default.a.createElement(Close_default.a,null)):null);});var DialogContent=Object(styles_["withStyles"])(function(theme){return{root:{padding:theme.spacing(2)}};})(DialogContent_default.a);var DialogActions=Object(styles_["withStyles"])(function(theme){return{root:{margin:0,padding:theme.spacing(1)}};})(DialogActions_default.a);var Modal_renderHeader=function renderHeader(header,headerText,onHide,closable){if(header)return header;return/*#__PURE__*/external_react_default.a.createElement(DialogTitle,{onClose:onHide,closable:closable},headerText);};var Modal_renderFooter=function renderFooter(footer,footerType,primaryButtonText,secondaryButtonText,onClickPrimaryButton,onClickSecondaryButton,disablePrimaryButton,disableSecondaryButton){if(footer){return footer;}switch(footerType){case'single':return/*#__PURE__*/external_react_default.a.createElement(DialogActions,null,/*#__PURE__*/external_react_default.a.createElement(Button_default.a,{onClick:onClickPrimaryButton,disabled:disablePrimaryButton,color:"primary"},primaryButtonText));case'double':return/*#__PURE__*/external_react_default.a.createElement(DialogActions,null,/*#__PURE__*/external_react_default.a.createElement(Button_default.a,{onClick:onClickSecondaryButton,disabled:disableSecondaryButton,color:"secondary"},secondaryButtonText),/*#__PURE__*/external_react_default.a.createElement(Button_default.a,{onClick:onClickPrimaryButton,disabled:disablePrimaryButton,color:"primary"},primaryButtonText));default:return null;}};var Modal_Modal=function Modal(_ref){var header=_ref.header,headerText=_ref.headerText,body=_ref.body,footer=_ref.footer,primaryButtonText=_ref.primaryButtonText,onClickPrimaryButton=_ref.onClickPrimaryButton,secondaryButtonText=_ref.secondaryButtonText,onClickSecondaryButton=_ref.onClickSecondaryButton,footerType=_ref.footerType,onHide=_ref.onHide,closable=_ref.closable,disablePrimaryButton=_ref.disablePrimaryButton,disableSecondaryButton=_ref.disableSecondaryButton,showFooter=_ref.showFooter,showHeader=_ref.showHeader,backdrop=_ref.backdrop;return/*#__PURE__*/external_react_default.a.createElement(Dialog_default.a,{open:true,fullWidth:true,onClose:onHide,disableBackdropClick:!backdrop},showHeader&&Modal_renderHeader(header,headerText,onHide,closable),/*#__PURE__*/external_react_default.a.createElement(DialogContent,{dividers:true},body),showFooter&&Modal_renderFooter(footer,footerType,primaryButtonText,secondaryButtonText,onClickPrimaryButton,onClickSecondaryButton,disablePrimaryButton,disableSecondaryButton));};Modal_Modal.defaultProps={backdrop:'static',show:true,footerType:'single',closable:true,showFooter:true,showHeader:true};/* harmony default export */ var components_Modal = (Modal_Modal);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js + 1 modules
var objectSpread2 = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");

// CONCATENATED MODULE: ./src/components/ModalContainer.js
function ModalContainer(_ref){var modalsMap=_ref.modalsMap,modalProps=_ref.modalProps,handleShowModal=_ref.handleShowModal;var handleModalClose=function handleModalClose(){// Hide displaying modal
handleShowModal(null);};var displayModal=modalProps.displayModal,_onModalClose=modalProps.onModalClose,rest=Object(objectWithoutProperties["a" /* default */])(modalProps,["displayModal","onModalClose"]);var RenderedModal=modalsMap[displayModal];var currentProps=Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({},rest),{},{onModalClose:function onModalClose(e){handleModalClose();// eslint-disable-next-line no-unused-expressions
_onModalClose&&_onModalClose(e);}});return RenderedModal?/*#__PURE__*/external_react_default.a.createElement(RenderedModal,currentProps):null;}/* harmony default export */ var components_ModalContainer = (ModalContainer);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard.js
var interopRequireWildcard = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard.js");

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js");

// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js");

// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (Object(esm_typeof["a" /* default */])(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// CONCATENATED MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper.js



function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}
// CONCATENATED MODULE: ./src/components/Braintree.js
var Braintree_Braintree=/*#__PURE__*/function(_React$Component){_inherits(Braintree,_React$Component);var _super=_createSuper(Braintree);function Braintree(props){var _this;Object(classCallCheck["a" /* default */])(this,Braintree);_this=_super.call(this,props);_this.focusThenBlur=/*#__PURE__*/Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(){return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:/*
    This is for fixing a bug on IE
    When complete inputting payment method, our current focus is still on an input on
    braintree iframe. We unmount this component right after that. Then some how we can't
    focus on any other input on the screen. To fix this issue, we create a fake input
    then focus on it right before everything done on this component
    */_this.hiddenInput.current.focus();_this.hiddenInput.current.blur();_context.next=4;return Promise.resolve();case 4:case"end":return _context.stop();}}},_callee);}));_this.getPaymentMethod=/*#__PURE__*/Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee3(){var _this$props,onPaymentMethodReceived,transactionAmount;return regenerator_default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_this$props=_this.props,onPaymentMethodReceived=_this$props.onPaymentMethodReceived,transactionAmount=_this$props.transactionAmount;console.log('this.instance',_this.instance);if(!(_this.instance===null)){_context3.next=8;break;}_context3.next=5;return _this.focusThenBlur();case 5:onPaymentMethodReceived(undefined);_this.braintreeError(null);return _context3.abrupt("return");case 8:_this.instance.requestPaymentMethod({threeDSecure:{amount:transactionAmount}},/*#__PURE__*/function(){var _ref3=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee2(requestPaymentMethodErr,payload){var threeDSecureInvalid;return regenerator_default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return _this.focusThenBlur();case 2:threeDSecureInvalid= false&&false;if(!(payload===undefined||requestPaymentMethodErr||threeDSecureInvalid)){_context2.next=7;break;}onPaymentMethodReceived(undefined);_this.braintreeError(requestPaymentMethodErr);return _context2.abrupt("return");case 7:onPaymentMethodReceived(payload);case 8:case"end":return _context2.stop();}}},_callee2);}));return function(_x,_x2){return _ref3.apply(this,arguments);};}());case 9:case"end":return _context3.stop();}}},_callee3);}));_this.setup=/*#__PURE__*/function(){var _ref4=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee4(clientToken){var _this$props2,onReady,paymentOptionPriority,onBraintreeLoaded,transactionAmount,imported,dropin,options,callback;return regenerator_default.a.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:_this$props2=_this.props,onReady=_this$props2.onReady,paymentOptionPriority=_this$props2.paymentOptionPriority,onBraintreeLoaded=_this$props2.onBraintreeLoaded,transactionAmount=_this$props2.transactionAmount;_context4.next=3;return Promise.resolve().then(function(){return Object(interopRequireWildcard["a" /* default */])(__webpack_require__("braintree-web-drop-in"));});case 3:imported=_context4.sent;dropin=imported["default"]||imported;options={authorization:clientToken,container:"#".concat(_this.elementId),paymentOptionPriority:paymentOptionPriority,paypal:{flow:'vault'}};// Verify card with 3D Secure if transaction amount > 0
if(transactionAmount>0){options=Object(objectSpread2["a" /* default */])({},options);}callback=function callback(createErr,instance){_this.instance=instance;onBraintreeLoaded&&onBraintreeLoaded(createErr);onReady();};dropin.create(options,callback);case 9:case"end":return _context4.stop();}}},_callee4);}));return function(_x3){return _ref4.apply(this,arguments);};}();_this.braintreeError=function(error){var onError=_this.props.onError;onError&&onError(error);_this.setState({isBraintreeError:true},function(){return setTimeout(function(){return _this.setState({isBraintreeError:false});},500);});};_this.elementId="bt-dropin-".concat(Date.now(),"-").concat(Math.floor(Math.random()*100000));_this.instance=null;_this.state={isBraintreeError:false};_this.hiddenInput=external_react_default.a.createRef();return _this;}Object(createClass["a" /* default */])(Braintree,[{key:"componentDidMount",value:function(){var _componentDidMount=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee5(){var _this$props3,getBrainTreeClientToken,onError,res;return regenerator_default.a.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_this$props3=this.props,getBrainTreeClientToken=_this$props3.getBrainTreeClientToken,onError=_this$props3.onError;_context5.prev=1;_context5.next=4;return getBrainTreeClientToken();case 4:res=_context5.sent;this.setup(res.result.clientToken);_context5.next=11;break;case 8:_context5.prev=8;_context5.t0=_context5["catch"](1);onError&&onError(_context5.t0);case 11:case"end":return _context5.stop();}}},_callee5,this,[[1,8]]);}));function componentDidMount(){return _componentDidMount.apply(this,arguments);}return componentDidMount;}()},{key:"render",value:function render(){var isBraintreeError=this.state.isBraintreeError;return/*#__PURE__*/external_react_default.a.createElement("div",{className:"".concat(isBraintreeError?'braintree__error':'')},/*#__PURE__*/external_react_default.a.createElement("input",{type:"text",ref:this.hiddenInput,style:{height:0,opacity:0,padding:0,margin:0,border:'none'}}),/*#__PURE__*/external_react_default.a.createElement("div",{id:this.elementId}));}}]);return Braintree;}(external_react_default.a.Component);/* harmony default export */ var components_Braintree = (Braintree_Braintree);
// CONCATENATED MODULE: ./src/components/index.js


/***/ }),

/***/ "@material-ui/core/Button":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Dialog":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Dialog");

/***/ }),

/***/ "@material-ui/core/DialogActions":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogActions");

/***/ }),

/***/ "@material-ui/core/DialogContent":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogContent");

/***/ }),

/***/ "@material-ui/core/DialogTitle":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogTitle");

/***/ }),

/***/ "@material-ui/core/IconButton":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),

/***/ "@material-ui/core/Typography":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/styles":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/icons/Close":
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Close");

/***/ }),

/***/ "braintree-web-drop-in":
/***/ (function(module, exports) {

module.exports = require("braintree-web-drop-in");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-google-login":
/***/ (function(module, exports) {

module.exports = require("react-google-login");

/***/ }),

/***/ "regenerator-runtime":
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ })

/******/ });
//# sourceMappingURL=components.js.map