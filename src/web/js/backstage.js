/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 137);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(6)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = { css: css, media: media, sourceMap: sourceMap }
    if (!newStyles[id]) {
      part.id = parentId + ':0'
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      part.id = parentId + ':' + newStyles[id].parts.length
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
  var hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.2.1
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: "development" !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var perf;

{
  perf = inBrowser && window.performance;
  if (perf && (!perf.mark || !perf.measure)) {
    perf = undefined;
  }
}

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

var warn = noop;
var tip = noop;
var formatComponentName;

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === "<Anonymous>") {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return
  }
  if (!ob) {
    obj[key] = val;
    return
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (obj, key) {
  if (Array.isArray(obj)) {
    obj.splice(key, 1);
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

function handleError (err, vm, type) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, type);
  } else {
    {
      warn(("Error in " + type + ":"), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var res = new Array(vnodes.length);
  for (var i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constrcuts that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot;
  }
  return slots
}

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'option is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && perf) {
    updateComponent = function () {
      var name = vm._name;
      var startTag = "start " + name;
      var endTag = "end " + name;
      perf.mark(startTag);
      var vnode = vm._render();
      perf.mark(endTag);
      perf.measure((name + " render"), startTag, endTag);
      perf.mark(startTag);
      vm._update(vnode, hydrating);
      perf.mark(endTag);
      perf.measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // call updated hooks
  index = queue.length;
  while (index--) {
    watcher = queue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "development" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    var child = vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    );
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.componentInstance = oldVnode.componentInstance;
  updateChildComponent(
    child,
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.componentInstance._isMounted) {
    vnode.componentInstance._isMounted = true;
    callHook(vnode.componentInstance, 'mounted');
  }
  if (vnode.data.keepAlive) {
    activateChildComponent(vnode.componentInstance, true /* direct */);
  }
}

function destroy (vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy();
    } else {
      deactivateChildComponent(vnode.componentInstance, true /* direct */);
    }
  }
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          data[key] = value[key];
        } else {
          var type = data.attrs && data.attrs.type;
          var hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

function initInjections (vm) {
  var provide = vm.$options.provide;
  var inject = vm.$options.inject;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && source._provided[provideKey]) {
          vm[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && perf) {
      perf.mark('init');
    }

    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    initInjections(vm);
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && perf) {
      vm._name = formatComponentName(vm, false);
      perf.mark('init end');
      perf.measure(((vm._name) + " init"), 'init', 'init end');
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    for (var i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (pattern instanceof RegExp) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.2.1';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important
) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  if ("development" !== 'production' &&
    el.attrsMap.checked != null) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
      "inline checked attributes will be ignored when using v-model. " +
      'Declare initial values in the component\'s data option instead.'
    );
  }
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + value + "=$$c}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  if ("development" !== 'production' &&
    el.attrsMap.checked != null) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
      "inline checked attributes will be ignored when using v-model. " +
      'Declare initial values in the component\'s data option instead.'
    );
  }
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  {
    el.children.some(checkOptionWarning);
  }

  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function checkOptionWarning (option) {
  if (option.type === 1 &&
    option.tag === 'option' &&
    option.attrsMap.selected != null) {
    warn$1(
      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
      'inline selected attributes on <option> will be ignored when using v-model. ' +
      'Declare initial values in the component\'s data option instead.'
    );
    return true
  }
  return false
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookAgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookAgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookAgumentsLength (fn) {
  if (!fn) { return false }
  var invokerFns = fn.fns;
  if (invokerFns) {
    // invoker
    return getHookAgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
      config.productionTip !== false &&
      inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr',
  true
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
  true
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track',
  true
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isScriptOrStyle = makeMap('script,style', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a script or style element
    if (!lastTag || !isScriptOrStyle(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
            (i > pos || !tagName) &&
            options.warn) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
var bindRE = /^:|^v-bind:/;
var onRE = /^@|^v-on:/;
var argRE = /:(.*)$/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var platformGetTagNamespace;
var platformMustUseProp;
var platformIsPreTag;
var preTransforms;
var transforms;
var postTransforms;
var delimiters;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if ("development" !== 'production' && !warned) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warned = true;
            warn$2(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warned = true;
            warn$2(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if ("development" !== 'production' && !warned) {
          warned = true;
          warn$2(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if ("development" !== 'production' && !warned && text === template) {
          warned = true;
          warn$2(
            'Component template requires a root element, rather than just text.'
          );
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, arg, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        if (argMatch && (arg = argMatch[1])) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("$event.button !== 0"),
  middle: genGuard("$event.button !== 1"),
  right: genGuard("$event.button !== 2")
};

function genHandlers (events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  } else if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  } else if (!handler.modifiers) {
    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
      ? handler.value
      : ("function($event){" + (handler.value) + "}")
  } else {
    var code = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code = genKeyFilter(keys) + code;
    }
    var handlerCode = simplePathRE.test(handler.value)
      ? handler.value + '($event)'
      : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    "development" !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}]"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = getNormalizationType(children);
    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
        ? normalizationType ? ("," + normalizationType) : ''
        : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// operators like typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');
// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;
// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && perf) {
        perf.mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && perf) {
        perf.mark('compile end');
        perf.measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-resource v1.2.1
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */



/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING  = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0, result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$1.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;

                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p = PromiseObj.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
            callback.call(this);
            return value;
        }, function (reason) {
            callback.call(this);
            return Promise.reject(reason);
        }
    );
};

/**
 * Utility functions.
 */

var ref = {};
var hasOwnProperty = ref.hasOwnProperty;

var ref$1 = [];
var slice = ref$1.slice;
var debug = false;
var ntick;

var inBrowser = typeof window !== 'undefined';

var Util = function (ref) {
    var config = ref.config;
    var nextTick = ref.nextTick;

    ntick = nextTick;
    debug = config.debug || !config.silent;
};

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return ntick(cb, ctx);
}

function trim(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}



function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
}

function each(obj, iterator) {

    var i, key;

    if (isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

var root = function (options$$1, next) {

    var url = next(options$$1);

    if (isString(options$$1.root) && !url.match(/^(https?:)?\//)) {
        url = options$$1.root + '/' + url;
    }

    return url;
};

/**
 * Query Parameter Transform.
 */

var query = function (options$$1, next) {

    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);

    each(options$$1.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
};

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url), expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null, values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }

                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key], result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

var template = function (options) {

    var variables = [], url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
};

/**
 * Service for URL templating.
 */

function Url(url, params) {

    var self = this || {}, options$$1 = url, transform;

    if (isString(url)) {
        options$$1 = {url: url, params: params};
    }

    options$$1 = merge({}, Url.options, self.$options, options$$1);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options$$1);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [], escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    var el = document.createElement('a');

    if (document.documentMode) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options$$1) {
        return handler.call(vm, options$$1, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj), plain = isPlainObject(obj), hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

var xdrClient = function (request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(), handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load') {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(xdr.responseText, {status: status}));
        };

        request.abort = function () { return xdr.abort(); };

        xdr.open(request.method, request.getUrl());

        if (request.timeout) {
            xdr.timeout = request.timeout;
        }

        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
};

/**
 * CORS Interceptor.
 */

var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

var cors = function (request, next) {

    if (inBrowser) {

        var orgUrl = Url.parse(location.href);
        var reqUrl = Url.parse(request.getUrl());

        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

            request.crossOrigin = true;
            request.emulateHTTP = false;

            if (!SUPPORTS_CORS) {
                request.client = xdrClient;
            }
        }
    }

    next();
};

/**
 * Body Interceptor.
 */

var body = function (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');

    } else if (isObject(request.body) || isArray(request.body)) {

        if (request.emulateJSON) {
            request.body = Url.params(request.body);
            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            request.body = JSON.stringify(request.body);
        }
    }

    next(function (response) {

        Object.defineProperty(response, 'data', {

            get: function get() {
                return this.body;
            },

            set: function set(body) {
                this.body = body;
            }

        });

        return response.bodyText ? when(response.text(), function (text) {

            var type = response.headers.get('Content-Type') || '';

            if (type.indexOf('application/json') === 0 || isJson(text)) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }

            } else {
                response.body = text;
            }

            return response;

        }) : response;

    });
};

function isJson(str) {

    var start = str.match(/^\[|^\{(?!\{)/), end = {'[': /]$/, '{': /}$/};

    return start && end[start[0]].test(str);
}

/**
 * JSONP client (Browser).
 */

var jsonpClient = function (request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;

        handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            if (status && window[callback]) {
                delete window[callback];
                document.body.removeChild(script);
            }

            resolve(request.respondWith(body, {status: status}));
        };

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        request.abort = function () {
            handler({type: 'abort'});
        };

        request.params[name] = callback;

        if (request.timeout) {
            setTimeout(request.abort, request.timeout);
        }

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
};

/**
 * JSONP Interceptor.
 */

var jsonp = function (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next();
};

/**
 * Before Interceptor.
 */

var before = function (request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
};

/**
 * HTTP method override Interceptor.
 */

var method = function (request, next) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

    next();
};

/**
 * Header Interceptor.
 */

var header = function (request, next) {

    var headers = assign({}, Http.headers.common,
        !request.crossOrigin ? Http.headers.custom : {},
        Http.headers[toLower(request.method)]
    );

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

    next();
};

/**
 * XMLHttp client (Browser).
 */

var SUPPORTS_BLOB = typeof Blob !== 'undefined' && typeof FileReader !== 'undefined';

var xhrClient = function (request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(), handler = function (event) {

            var response = request.respondWith(
                'response' in xhr ? xhr.response : xhr.responseText, {
                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
                }
            );

            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
            });

            resolve(response);
        };

        request.abort = function () { return xhr.abort(); };

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        xhr.open(request.method, request.getUrl(), true);

        if (request.timeout) {
            xhr.timeout = request.timeout;
        }

        if (request.credentials === true) {
            xhr.withCredentials = true;
        }

        if (!request.crossOrigin) {
            request.headers.set('X-Requested-With', 'XMLHttpRequest');
        }

        if ('responseType' in xhr && SUPPORTS_BLOB) {
            xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = handler;
        xhr.send(request.getBody());
    });
};

/**
 * Http client (Node).
 */

var nodeClient = function (request) {

    var client = __webpack_require__(8);

    return new PromiseObj(function (resolve) {

        var url = request.getUrl();
        var body = request.getBody();
        var method = request.method;
        var headers = {}, handler;

        request.headers.forEach(function (value, name) {
            headers[name] = value;
        });

        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {

            var response = request.respondWith(resp.body, {
                    status: resp.statusCode,
                    statusText: trim(resp.statusMessage)
                }
            );

            each(resp.headers, function (value, name) {
                response.headers.set(name, value);
            });

            resolve(response);

        }, function (error$$1) { return handler(error$$1.response); });
    });
};

/**
 * Base client.
 */

var Client = function (context) {

    var reqHandlers = [sendRequest], resHandlers = [], handler;

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new PromiseObj(function (resolve) {

            function exec() {

                handler = reqHandlers.pop();

                if (isFunction(handler)) {
                    handler.call(context, request, next);
                } else {
                    warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
                    next();
                }
            }

            function next(response) {

                if (isFunction(response)) {

                    resHandlers.unshift(response);

                } else if (isObject(response)) {

                    resHandlers.forEach(function (handler) {
                        response = when(response, function (response) {
                            return handler.call(context, response) || response;
                        });
                    });

                    when(response, resolve);

                    return;
                }

                exec();
            }

            exec();

        }, context);
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
};

function sendRequest(request, resolve) {

    var client = request.client || (inBrowser ? xhrClient : nodeClient);

    resolve(client(request));
}

/**
 * HTTP Headers.
 */

var Headers = function Headers(headers) {
    var this$1 = this;


    this.map = {};

    each(headers, function (value, name) { return this$1.append(name, value); });
};

Headers.prototype.has = function has (name) {
    return getName(this.map, name) !== null;
};

Headers.prototype.get = function get (name) {

    var list = this.map[getName(this.map, name)];

    return list ? list.join() : null;
};

Headers.prototype.getAll = function getAll (name) {
    return this.map[getName(this.map, name)] || [];
};

Headers.prototype.set = function set (name, value) {
    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
};

Headers.prototype.append = function append (name, value){

    var list = this.map[getName(this.map, name)];

    if (list) {
        list.push(trim(value));
    } else {
        this.set(name, value);
    }
};

Headers.prototype.delete = function delete$1 (name){
    delete this.map[getName(this.map, name)];
};

Headers.prototype.deleteAll = function deleteAll (){
    this.map = {};
};

Headers.prototype.forEach = function forEach (callback, thisArg) {
        var this$1 = this;

    each(this.map, function (list, name) {
        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
    });
};

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function Response(body, ref) {
    var url = ref.url;
    var headers = ref.headers;
    var status = ref.status;
    var statusText = ref.statusText;


    this.url = url;
    this.ok = status >= 200 && status < 300;
    this.status = status || 0;
    this.statusText = statusText || '';
    this.headers = new Headers(headers);
    this.body = body;

    if (isString(body)) {

        this.bodyText = body;

    } else if (isBlob(body)) {

        this.bodyBlob = body;

        if (isBlobText(body)) {
            this.bodyText = blobText(body);
        }
    }
};

Response.prototype.blob = function blob () {
    return when(this.bodyBlob);
};

Response.prototype.text = function text () {
    return when(this.bodyText);
};

Response.prototype.json = function json () {
    return when(this.text(), function (text) { return JSON.parse(text); });
};

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };

    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function Request(options$$1) {

    this.body = null;
    this.params = {};

    assign(this, options$$1, {
        method: toUpper(options$$1.method || 'GET')
    });

    if (!(this.headers instanceof Headers)) {
        this.headers = new Headers(this.headers);
    }
};

Request.prototype.getUrl = function getUrl (){
    return Url(this);
};

Request.prototype.getBody = function getBody (){
    return this.body;
};

Request.prototype.respondWith = function respondWith (body, options$$1) {
    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
};

/**
 * Service for sending network requests.
 */

var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};

function Http(options$$1) {

    var self = this || {}, client = Client(self.$vm);

    defaults(options$$1 || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {
        client.use(handler);
    });

    return client(new Request(options$$1)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);

    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    common: COMMON_HEADERS,
    custom: {}
};

Http.interceptors = [before, method, body, jsonp, header, cors];

['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {

    Http[method$$1] = function (url, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
    };

});

['post', 'put', 'patch'].forEach(function (method$$1) {

    Http[method$$1] = function (url, body$$1, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body$$1}));
    };

});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options$$1) {

    var self = this || {}, resource = {};

    actions = assign({},
        Resource.actions,
        actions
    );

    each(actions, function (action, name) {

        action = merge({url: url, params: assign({}, params)}, options$$1, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options$$1 = assign({}, action), params = {}, body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
    }

    options$$1.body = body;
    options$$1.params = assign({}, options$$1.params, params);

    return options$$1;
}

Resource.actions = {

    get: {method: 'GET'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    remove: {method: 'DELETE'},
    delete: {method: 'DELETE'}

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var this$1 = this;

                return function (executor) { return new Vue.Promise(executor, this$1); };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/**\r\n * YUI 3.5.0 - reset.css (http://developer.yahoo.com/yui/3/cssreset/)\r\n * http://cssreset.com\r\n * Copyright 2012 Yahoo! Inc. All rights reserved.\r\n * http://yuilibrary.com/license/\r\n */\r\n/*\r\n\tTODO will need to remove settings on HTML since we can't namespace it.\r\n\tTODO with the prefix, should I group by selector or property for weight savings?\r\n*/\r\nhtml{\r\n    color:#000;\r\n    // background:#FFF;\r\n}\r\n/*\r\n\tTODO remove settings on BODY since we can't namespace it.\r\n*/\r\n/*\r\n\tTODO test putting a class on HEAD.\r\n\t\t- Fails on FF.\r\n*/\r\nbody,\r\ndiv,\r\ndl,\r\ndt,\r\ndd,\r\nul,\r\nol,\r\nli,\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6,\r\npre,\r\ncode,\r\nform,\r\nfieldset,\r\nlegend,\r\ninput,\r\ntextarea,\r\np,\r\nblockquote,\r\nth,\r\ntd {\r\n    margin:0;\r\n    padding:0;\r\n}\r\ntable {\r\n    border-collapse:collapse;\r\n    border-spacing:0;\r\n}\r\nfieldset,\r\nimg {\r\n    border:0;\r\n}\r\n/*\r\n\tTODO think about hanlding inheritence differently, maybe letting IE6 fail a bit...\r\n*/\r\naddress,\r\ncaption,\r\ncite,\r\ncode,\r\ndfn,\r\nem,\r\nstrong,\r\nth,\r\nvar {\r\n    font-style:normal;\r\n    font-weight:normal;\r\n}\r\n\r\nol,\r\nul {\r\n    list-style:none;\r\n}\r\n\r\ncaption,\r\nth {\r\n    text-align:left;\r\n}\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6 {\r\n    font-size:100%;\r\n    font-weight:normal;\r\n}\r\nq:before,\r\nq:after {\r\n    content:'';\r\n}\r\nabbr,\r\nacronym {\r\n    border:0;\r\n    font-variant:normal;\r\n}\r\n/* to preserve line-height and selector appearance */\r\nsup {\r\n    vertical-align:text-top;\r\n}\r\nsub {\r\n    vertical-align:text-bottom;\r\n}\r\ninput,\r\ntextarea,\r\nselect {\r\n    font-family:inherit;\r\n    font-size:inherit;\r\n    font-weight:inherit;\r\n}\r\n/*to enable resizing for IE*/\r\ninput,\r\ntextarea,\r\nselect {\r\n    *font-size:100%;\r\n}\r\n/*because legend doesn't inherit in IE */\r\nlegend {\r\n    color:#000;\r\n}\r\n/* YUI CSS Detection Stamp */\r\n#yui3-css-stamp.cssreset { display: none; }\r\n\r\n/*�������*/\r\n.clearfix{\r\n    content: \"\";\r\n    display: table;\r\n    clear: both;\r\n}\r\n\r\n/*�������a��ǩ���»���*/\r\na{\r\n    text-decoration: none;\r\n}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEvents", function() { return addEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEvents", function() { return removeEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleClass", function() { return toggleClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cookieUtil", function() { return cookieUtil; });
//事件绑定事件 
var addEvents = (target,type,func) => {
	if(target.addEventListener){
		target.addEventListener(type,func,false);
	}else if(target.attachEvent){
		target.attachEvent("on",type,func);
	}
}

//事件取消绑定事件
var removeEvents = (target,type,func) => {
	if(target.removeEventListener){
		target.removeEventListener(type,func,false);
	}else if(target.detachEvent){
		target.detachEvent("on",type,func);
	}
}

//判断对象是否有这个class函数
var hasClass = (obj,cls) => {
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

//给对象添加class函数
var addClass = (obj,cls) => {
	if (!this.hasClass(obj,cls)) obj.className += " " + cls;
}

//给对象删除class函数
var removeClass = (obj,cls) => {
	if (this.hasClass(obj, cls)) {  
	    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	    obj.className = obj.className.replace(reg, ' ');  
	}	
}

//对象toggleClass事件函数
var toggleClass = (obj,cls) => {
	if(this.hasClass(obj,cls)){  
        this.removeClass(obj, cls);  
    }else{  
        this.addClass(obj, cls);  
    } 
}

//cookie方法
var cookieUtil = () => {
	console.log('xixi');
	return {
		get: function (name){
			const cookieName = encodeURIComponent(name) + '=';
			const cookieStart = document.cookie.indexOf(cookieName);
			let cookieValue;

			if(cookieStart > -1){
				let cookieEnd = document.cookie.indexOf(';', cookieStart);
				if(cookieEnd == -1){
					cookieEnd = document.cookie.length;
				}
				cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
			}
			return cookieValue;
		},
		set: function (name, value, expires, path, domain, secure){
			let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
			let date = new Date();
			date.setTime(date.getTime() + expires * 1000);
			cookieText += '; expires=' + date.toGMTString();

			if(path){
				cookieText += '; path=' + path;
			}
			if(domain){
				cookieText += '; domain' + domain;
			}
			if(secure){
				cookieText += '; secure';
			}
			document.cookie = cookieText;
		},
		unset: function (name, path, domain, secure){
			this.set(name, "", new Date(0), path, domain, secure);
		}
	}	
}



/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(94)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(113),
  /* template */
  __webpack_require__(74),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\backstage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] backstage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0c9d5fee", Component.options)
  } else {
    hotAPI.reload("data-v-0c9d5fee", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_backstage_formPage_vue__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_backstage_formPage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_backstage_formPage_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_backstage_chartPage_vue__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_backstage_chartPage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_backstage_chartPage_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_backstage_formPage_formIndex_vue__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_backstage_formPage_formIndex_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_backstage_formPage_formIndex_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_backstage_formPage_goodsRanking_vue__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_backstage_formPage_goodsRanking_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_backstage_formPage_goodsRanking_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_backstage_formPage_goodsSale_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_backstage_formPage_goodsSale_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_backstage_formPage_goodsSale_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_backstage_formPage_goodsRel_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_backstage_formPage_goodsRel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_backstage_formPage_goodsRel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_backstage_chartPage_chartIndex_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_backstage_chartPage_chartIndex_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_backstage_chartPage_chartIndex_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_backstage_chartPage_barLine_vue__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_backstage_chartPage_barLine_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_backstage_chartPage_barLine_vue__);












__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

const routes = [
	{ path: '/formPage', name: 'formPage', component: __WEBPACK_IMPORTED_MODULE_2__components_backstage_formPage_vue___default.a,
		children: [
		  	{
		  		path: 'formIndex',
		  		name: 'formIndex',
		  		component: __WEBPACK_IMPORTED_MODULE_4__components_backstage_formPage_formIndex_vue___default.a
		  	},
		  	{
		  		path: 'goodsRanking',
		  		name: 'goodsRanking',
		  		component: __WEBPACK_IMPORTED_MODULE_5__components_backstage_formPage_goodsRanking_vue___default.a
		  	},
		  	{
		  		path: 'goodsSale',
		  		name: 'goodsSale',
		  		component: __WEBPACK_IMPORTED_MODULE_6__components_backstage_formPage_goodsSale_vue___default.a
		  	},
		  	{
		  		path: 'goodsRel',
		  		name: 'goodsRel',
		  		component: __WEBPACK_IMPORTED_MODULE_7__components_backstage_formPage_goodsRel_vue___default.a
		  	}
	  	]
	},
	{ path: '/chartPage', name: 'chartPage', component: __WEBPACK_IMPORTED_MODULE_3__components_backstage_chartPage_vue___default.a, 
		children: [
			{
				path: 'chartIndex',
				name: 'chartIndex',
				component: __WEBPACK_IMPORTED_MODULE_8__components_backstage_chartPage_chartIndex_vue___default.a
			},
			{
				path: 'barLine',
				name: 'barLine',
				component: __WEBPACK_IMPORTED_MODULE_9__components_backstage_chartPage_barLine_vue___default.a
			}
		]
		
	},
	{ path: '/', name: 'index' }
]

/* harmony default export */ __webpack_exports__["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
	routes
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mutations__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__actions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters__ = __webpack_require__(134);






__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

const state = {
	goodsList: [],
	rankingList: [],
	goodsSale: [],
}

/* harmony default export */ __webpack_exports__["a"] = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
	state,
	getters: __WEBPACK_IMPORTED_MODULE_4__getters__["a" /* default */],
	actions: __WEBPACK_IMPORTED_MODULE_3__actions___default.a,
	mutations: __WEBPACK_IMPORTED_MODULE_2__mutations__["a" /* default */],
});

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// shim for using process in browser
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports
exports.i(__webpack_require__(5), "");

// module
exports.push([module.i, "\n@charset \"UTF-8\";\nbody {\n  font-family: \"\\5B8B\\4F53\";\n  background: url(" + __webpack_require__(50) + ");\n}\n", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.formPageBox .wrapper {\n  width: 1200px;\n  margin: 30px auto;\n  background: #bbb;\n  min-height: 500px;\n  position: relative;\n  box-sizing: border-box;\n  padding: 20px;\n}\n.formPageBox .wrapper .mode_choice {\n    position: absolute;\n    top: 120px;\n    left: -50px;\n}\n@media (max-width: 1250px) {\n.formPageBox .wrapper .mode_choice {\n        left: 0;\n}\n}\n.formPageBox .wrapper .mode_choice ul li {\n      margin-bottom: 8px;\n      color: #dedede;\n      line-height: 20px;\n      font-weight: 600;\n      cursor: pointer;\n      background: #5B37EA;\n}\n.formPageBox .wrapper .mode_choice ul li p {\n        display: table-cell;\n        vertical-align: middle;\n        text-align: center;\n        width: 45px;\n        height: 45px;\n}\n.formPageBox .wrapper .mode_choice ul .active {\n      background: #F24C0A;\n}\n", ""]);

// exports


/***/ }),
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n.goods_ranking .header_text {\n  text-align: center;\n  height: 100px;\n  font-size: 34px;\n  line-height: 100px;\n  font-weight: 600;\n}\n.goods_ranking .box {\n  position: relative;\n}\n.goods_ranking .box table {\n    margin: 0 auto 20px;\n    border: 1px solid #333;\n}\n.goods_ranking .box table th {\n      color: #FFF;\n      background: #00bc9b;\n      font-weight: 600;\n}\n.goods_ranking .box table td {\n      background: #fafafa;\n}\n.goods_ranking .box table th, .goods_ranking .box table td {\n      border: 1px solid #333;\n      padding: 10px 15px;\n      text-align: center;\n      height: 24px;\n}\n.goods_ranking .box table .ranking, .goods_ranking .box table .num, .goods_ranking .box table .name, .goods_ranking .box table .price, .goods_ranking .box table .time, .goods_ranking .box table .people, .goods_ranking .box table .rel_num {\n      min-width: 120px;\n}\n.goods_ranking .box .select_time {\n    position: absolute;\n    top: 0;\n    left: 50px;\n    width: 130px;\n    height: 30px;\n    padding-left: 10px;\n    font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n    font-size: 14px;\n}\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n.goods_rel .header_text {\n  text-align: center;\n  height: 100px;\n  font-size: 34px;\n  line-height: 100px;\n  font-weight: 600;\n}\n.goods_rel .box {\n  position: relative;\n}\n.goods_rel .box table {\n    margin: 0 auto 20px;\n    border: 1px solid #333;\n}\n.goods_rel .box table th {\n      color: #FFF;\n      background: #00bc9b;\n      font-weight: 600;\n}\n.goods_rel .box table td {\n      background: #fafafa;\n}\n.goods_rel .box table th, .goods_rel .box table td {\n      border: 1px solid #333;\n      padding: 10px 15px;\n      text-align: center;\n      height: 24px;\n}\n.goods_rel .box table .ranking, .goods_rel .box table .num, .goods_rel .box table .name, .goods_rel .box table .price, .goods_rel .box table .time, .goods_rel .box table .people, .goods_rel .box table .rel_num {\n      min-width: 120px;\n}\n.goods_rel .box .select_time {\n    position: absolute;\n    top: 0;\n    left: 50px;\n    width: 130px;\n    height: 30px;\n    padding-left: 10px;\n    font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n    font-size: 14px;\n}\n.goods_rel .update_num {\n  width: 260px;\n  margin: 0 auto;\n}\n.goods_rel .update_num input {\n    width: 70px;\n    height: 30px;\n    padding-left: 8px;\n    font-size: 14px;\n}\n.goods_rel .update_num a {\n    display: inline-block;\n    font-size: 14px;\n    width: 70px;\n    height: 30px;\n    vertical-align: top;\n    border: 2px solid #dedede;\n    text-align: center;\n    line-height: 30px;\n    background: #f7193f;\n    border-radius: 20px;\n    color: #fff;\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n#header {\n  width: 100%;\n  height: 45px;\n  background: #8892BF;\n  border-bottom: 5px solid #4F5B93;\n}\n#header .wrapper {\n    width: 1200px;\n    margin: 0 auto;\n}\n#header .wrapper ul li, #header .wrapper .banner_text {\n      text-align: center;\n      line-height: 45px;\n      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n      color: #E2E4EF;\n      font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n}\n#header .wrapper ul {\n      display: inline-block;\n      vertical-align: top;\n}\n#header .wrapper ul li {\n        float: left;\n        cursor: pointer;\n        width: 80px;\n        height: 45px;\n        font-size: 14px;\n}\n#header .wrapper ul li.active {\n        background: #4F5B93;\n}\n#header .wrapper .banner_text {\n      font-weight: 600;\n      letter-spacing: 4px;\n      margin-right: 15px;\n      font-size: 26px;\n}\n#header .wrapper .name {\n      margin-right: 50px;\n}\n#header .wrapper .name, #header .wrapper .back_home {\n      float: right;\n      text-align: center;\n      line-height: 45px;\n      color: #f1f1f1;\n      font-weight: 600;\n}\n", ""]);

// exports


/***/ }),
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n.goods_sale .header_text {\n  text-align: center;\n  height: 100px;\n  font-size: 34px;\n  line-height: 100px;\n  font-weight: 600;\n}\n.goods_sale .box {\n  position: relative;\n}\n.goods_sale .box table {\n    margin: 0 auto 20px;\n    border: 1px solid #333;\n}\n.goods_sale .box table .isShow {\n      background: red;\n}\n.goods_sale .box table th {\n      color: #FFF;\n      background: #00bc9b;\n      font-weight: 600;\n}\n.goods_sale .box table td {\n      background: #fafafa;\n}\n.goods_sale .box table th, .goods_sale .box table td {\n      border: 1px solid #333;\n      padding: 10px 15px;\n      text-align: center;\n      height: 24px;\n}\n.goods_sale .box table .ranking, .goods_sale .box table .num, .goods_sale .box table .name, .goods_sale .box table .price, .goods_sale .box table .time, .goods_sale .box table .people, .goods_sale .box table .rel_num {\n      min-width: 120px;\n}\n.goods_sale .box .select_time {\n    position: absolute;\n    top: 0;\n    left: 50px;\n    width: 130px;\n    height: 30px;\n    padding-left: 10px;\n    font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n    font-size: 14px;\n}\n.goods_sale .box .page_box {\n    width: 550px;\n    margin: 0 auto;\n    font-size: 0;\n}\n.goods_sale .box .page_box a {\n      display: inline-block;\n      font-size: 13px;\n      width: 25px;\n      height: 25px;\n      text-align: center;\n      line-height: 27px;\n      margin: 0 5px;\n      border: 1px solid #333;\n      color: #000;\n      cursor: pointer;\n      background: #fafafa;\n}\n.goods_sale .box .page_box a:first-child, .goods_sale .box .page_box a:last-child {\n        width: 40px;\n}\n.goods_sale .box .page_box .num_page {\n      border-color: #00bc9b;\n}\n.goods_sale .box .page_box .prev_page, .goods_sale .box .page_box .next_page {\n      width: 60px;\n}\n.goods_sale .box .page_box .disable {\n      opacity: 0.5;\n}\n.goods_sale .box .page_box .hidden {\n      display: none;\n}\n.goods_sale .box .page_box .active {\n      color: white;\n      background: #00bc9b;\n}\n", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.chartPageBox .wrapper {\n  width: 1200px;\n  margin: 30px auto;\n  background: #bbb;\n  min-height: 500px;\n  position: relative;\n  box-sizing: border-box;\n  padding: 20px;\n}\n.chartPageBox .wrapper .mode_choice {\n    position: absolute;\n    top: 120px;\n    left: -50px;\n}\n@media (max-width: 1250px) {\n.chartPageBox .wrapper .mode_choice {\n        left: 0;\n}\n}\n.chartPageBox .wrapper .mode_choice ul li {\n      margin-bottom: 8px;\n      color: #dedede;\n      line-height: 20px;\n      font-weight: 600;\n      cursor: pointer;\n      background: #5B37EA;\n}\n.chartPageBox .wrapper .mode_choice ul li p {\n        display: table-cell;\n        vertical-align: middle;\n        text-align: center;\n        width: 45px;\n        height: 45px;\n}\n.chartPageBox .wrapper .mode_choice ul .active {\n      background: #F24C0A;\n}\n", ""]);

// exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.form_index .header_text {\n  text-align: center;\n  height: 100px;\n  font-size: 34px;\n  line-height: 100px;\n  font-weight: 600;\n}\n.form_index .tips {\n  width: 600px;\n  margin: 0 auto;\n}\n.form_index .tips p {\n    text-indent: 2em;\n    line-height: 20px;\n    margin-bottom: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.chart_index .header_text {\n  text-align: center;\n  height: 100px;\n  font-size: 34px;\n  line-height: 100px;\n  font-weight: 600;\n}\n.chart_index .tips {\n  width: 600px;\n  margin: 0 auto;\n}\n.chart_index .tips p {\n    text-indent: 2em;\n    line-height: 20px;\n    margin-bottom: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.f {\n  width: 45%;\n  height: 400px;\n  background: white;\n}\n", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(101)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(115),
  /* template */
  __webpack_require__(81),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\backstage-header.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] backstage-header.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-449c6c4b", Component.options)
  } else {
    hotAPI.reload("data-v-449c6c4b", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(105)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(116),
  /* template */
  __webpack_require__(85),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\chartPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] chartPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60e72515", Component.options)
  } else {
    hotAPI.reload("data-v-60e72515", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(110)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(117),
  /* template */
  __webpack_require__(90),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\chartPage\\barLine.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] barLine.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c7b30a6", Component.options)
  } else {
    hotAPI.reload("data-v-8c7b30a6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(108)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(118),
  /* template */
  __webpack_require__(88),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\chartPage\\chartIndex.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] chartIndex.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ef01904", Component.options)
  } else {
    hotAPI.reload("data-v-6ef01904", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(95)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(119),
  /* template */
  __webpack_require__(75),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\formPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] formPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16d2431b", Component.options)
  } else {
    hotAPI.reload("data-v-16d2431b", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(106)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(120),
  /* template */
  __webpack_require__(86),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\formPage\\formIndex.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] formIndex.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6cde5efa", Component.options)
  } else {
    hotAPI.reload("data-v-6cde5efa", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(97)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(121),
  /* template */
  __webpack_require__(77),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\formPage\\goodsRanking.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsRanking.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32b61124", Component.options)
  } else {
    hotAPI.reload("data-v-32b61124", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(98)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(122),
  /* template */
  __webpack_require__(78),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\formPage\\goodsRel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsRel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33682f07", Component.options)
  } else {
    hotAPI.reload("data-v-33682f07", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(104)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(123),
  /* template */
  __webpack_require__(84),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\re-project\\src\\js\\components\\backstage\\formPage\\goodsSale.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsSale.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e676c6e", Component.options)
  } else {
    hotAPI.reload("data-v-5e676c6e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "main-content"
    }
  }, [_c('backstageHeader', {
    on: {
      "formPage": _vm.toFormPage,
      "chartPage": _vm.toChartPage
    }
  }), _vm._v(" "), _c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0c9d5fee", module.exports)
  }
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "formPageBox"
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "mode_choice"
  }, [_c('ul', [_c('li', {
    staticClass: "form_index_li",
    class: {
      active: _vm.mode_choice == 'form_index_li'
    },
    on: {
      "click": _vm.formIndex
    }
  }, [_c('p', [_vm._v("后台首页")])]), _vm._v(" "), _c('li', {
    staticClass: "goods_ranking_li",
    class: {
      active: _vm.mode_choice == 'goods_ranking_li'
    },
    on: {
      "click": _vm.goodsRanking
    }
  }, [_c('p', [_vm._v("销量排行")])]), _vm._v(" "), _c('li', {
    staticClass: "goods_sale_li",
    class: {
      active: _vm.mode_choice == 'goods_sale_li'
    },
    on: {
      "click": _vm.goodsSale
    }
  }, [_c('p', [_vm._v("销售记录")])]), _vm._v(" "), _c('li', {
    staticClass: "goods_rel_li",
    class: {
      active: _vm.mode_choice == 'goods_rel_li'
    },
    on: {
      "click": _vm.goodsRel
    }
  }, [_c('p', [_vm._v("货物余量")])])])]), _vm._v(" "), _c('div', {
    staticClass: "item_box"
  }, [_c('router-view')], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-16d2431b", module.exports)
  }
}

/***/ }),
/* 76 */,
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "goods_ranking"
  }, [_c('p', {
    staticClass: "header_text"
  }, [_vm._v("销量排行")]), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('table', {
    staticClass: "a"
  }, [_vm._m(0), _vm._v(" "), _vm._l((_vm.arr), function(item, index) {
    return [_c('tr', [_c('td', [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item[0]))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item[1]))])])]
  })], 2), _vm._v(" "), _c('select', {
    staticClass: "select_time",
    on: {
      "change": _vm.time
    }
  }, [_c('option', {
    attrs: {
      "value": "30",
      "selected": ""
    }
  }, [_vm._v("最近一个月")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "10"
    }
  }, [_vm._v("最近十天")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "5"
    }
  }, [_vm._v("最近五天")])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('tr', [_c('th', {
    staticClass: "ranking"
  }, [_vm._v("销量排名")]), _vm._v(" "), _c('th', {
    staticClass: "name"
  }, [_vm._v("货物名称")]), _vm._v(" "), _c('th', {
    staticClass: "num"
  }, [_vm._v("销量数目")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-32b61124", module.exports)
  }
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "goods_rel item_box_list hidden"
  }, [_c('p', {
    staticClass: "header_text"
  }, [_vm._v("货物余量")]), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('table', [_c('tr', [_c('th', {
    staticClass: "ranking"
  }, [_vm._v("销量排名")]), _vm._v(" "), _c('th', {
    staticClass: "name"
  }, [_vm._v("货物名称")]), _vm._v(" "), _c('th', {
    staticClass: "num"
  }, [_vm._v("销量数目")])])])]), _vm._v(" "), _c('div', {
    staticClass: "update_num"
  }, [_c('input', {
    staticClass: "name",
    attrs: {
      "type": "text",
      "placeholder": "货物名称"
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "num",
    attrs: {
      "type": "text",
      "placeholder": "货物数量"
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "update_bt"
  }, [_vm._v("更新")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-33682f07", module.exports)
  }
}

/***/ }),
/* 79 */,
/* 80 */,
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "header"
    }
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_c('i', {
    staticClass: "banner_text"
  }, [_vm._v("后台管理中心")]), _vm._v(" "), _c('ul', {
    staticClass: "clearfix"
  }, [_c('li', {
    staticClass: "formPage",
    class: {
      active: _vm.isNowPage
    },
    on: {
      "click": _vm.formPage
    }
  }, [_vm._v("表格")]), _vm._v(" "), _c('li', {
    staticClass: "chartPage",
    class: {
      active: !_vm.isNowPage
    },
    on: {
      "click": _vm.chartPage
    }
  }, [_vm._v("图形")])]), _vm._v(" "), _c('a', {
    staticClass: "back_home",
    attrs: {
      "href": "index.html"
    }
  }, [_vm._v("返回首页")]), _vm._v(" "), _c('span', {
    staticClass: "name"
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-449c6c4b", module.exports)
  }
}

/***/ }),
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "goods_sale"
  }, [_c('p', {
    staticClass: "header_text"
  }, [_vm._v("销售记录")]), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('table', [_vm._m(0), _vm._v(" "), _vm._l((_vm.arr), function(item, index) {
    return [_c('tr', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (index < ((_vm.nowPage * 10)) && index > (((_vm.nowPage - 1) * 10) - 1)),
        expression: "index < ((nowPage*10)) && index > (((nowPage - 1)*10) - 1)"
      }],
      attrs: {
        "data-index": index
      }
    }, [_c('td', [_vm._v(_vm._s(item[0]))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item[1]))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item[2]))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item[3]))])])]
  })], 2), _vm._v(" "), _c('select', {
    staticClass: "select_time",
    on: {
      "change": _vm.time
    }
  }, [_c('option', {
    attrs: {
      "value": "30",
      "selected": ""
    }
  }, [_vm._v("最近一个月")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "10"
    }
  }, [_vm._v("最近十天")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "5"
    }
  }, [_vm._v("最近五天")])]), _vm._v(" "), _c('div', {
    staticClass: "page_box",
    attrs: {
      "onselectstart": "return false;"
    }
  }, [_c('a', {
    staticClass: "fitst_page set_page specific_page disable"
  }, [_vm._v("首页")]), _vm._v(" "), _c('a', {
    staticClass: "prev_page set_page specific_page disable"
  }, [_vm._v("上一页")]), _vm._v(" "), _c('a', {
    staticClass: "num_page set_page active"
  }, [_vm._v("1")]), _vm._v(" "), _c('a', {
    staticClass: "num_page set_page",
    on: {
      "click": _vm.a
    }
  }, [_vm._v("2")]), _vm._v(" "), _c('a', {
    staticClass: "num_page set_page",
    on: {
      "click": _vm.b
    }
  }, [_vm._v("3")]), _vm._v(" "), _c('a', {
    staticClass: "num_page set_page",
    on: {
      "click": _vm.c
    }
  }, [_vm._v("4")]), _vm._v(" "), _c('a', {
    staticClass: "num_page set_page",
    on: {
      "click": _vm.c
    }
  }, [_vm._v("5")]), _vm._v(" "), _c('a', {
    staticClass: "next_page set_page specific_page"
  }, [_vm._v("下一页")]), _vm._v(" "), _c('a', {
    staticClass: "last_page set_page specific_page"
  }, [_vm._v("尾页")])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('tr', [_c('th', {
    staticClass: "name "
  }, [_vm._v("销售物品")]), _vm._v(" "), _c('th', {
    staticClass: "price"
  }, [_vm._v("销售价格")]), _vm._v(" "), _c('th', {
    staticClass: "people"
  }, [_vm._v("购买者")]), _vm._v(" "), _c('th', {
    staticClass: "time"
  }, [_vm._v("销售时间")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5e676c6e", module.exports)
  }
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "chartPageBox"
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "mode_choice"
  }, [_c('ul', [_c('li', {
    staticClass: "chart_index_li",
    class: {
      active: _vm.mode_choice == 'chart_index_li'
    },
    on: {
      "click": _vm.chartIndex
    }
  }, [_c('p', [_vm._v("图形首页")])]), _vm._v(" "), _c('li', {
    staticClass: "bar_line_li",
    class: {
      active: _vm.mode_choice == 'bar_line_li'
    },
    on: {
      "click": _vm.barLine
    }
  }, [_c('p', [_vm._v("柱状折线")])])])]), _vm._v(" "), _c('div', {
    staticClass: "item_box"
  }, [_c('router-view')], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-60e72515", module.exports)
  }
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form_index"
  }, [_c('p', {
    staticClass: "header_text"
  }, [_vm._v("注意事项")]), _vm._v(" "), _c('div', {
    staticClass: "tips"
  }, [_c('p', [_vm._v("不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事")]), _vm._v(" "), _c('p', [_vm._v("不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事")]), _vm._v(" "), _c('p', [_vm._v("不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事")]), _vm._v(" "), _c('p', [_vm._v("不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6cde5efa", module.exports)
  }
}

/***/ }),
/* 87 */,
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "chart_index"
  }, [_c('p', {
    staticClass: "header_text"
  }, [_vm._v("注意事项")]), _vm._v(" "), _c('div', {
    staticClass: "tips"
  }, [_c('p', [_vm._v("不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事")]), _vm._v(" "), _c('p', [_vm._v("不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事")]), _vm._v(" "), _c('p', [_vm._v("不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事")]), _vm._v(" "), _c('p', [_vm._v("不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事不要搞事")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6ef01904", module.exports)
  }
}

/***/ }),
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "f"
  }, [_vm._v("\n\tbarLine\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-8c7b30a6", module.exports)
  }
}

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3c5ac0fa", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/.0.26.2@css-loader/index.js!../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0c9d5fee\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./backstage.vue", function() {
     var newContent = require("!!../../node_modules/.0.26.2@css-loader/index.js!../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0c9d5fee\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./backstage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("fc3c55b8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/.0.26.2@css-loader/index.js!../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-16d2431b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./formPage.vue", function() {
     var newContent = require("!!../../../../node_modules/.0.26.2@css-loader/index.js!../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-16d2431b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./formPage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 96 */,
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("db7718ba", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-32b61124\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./goodsRanking.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-32b61124\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./goodsRanking.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("600968a8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-33682f07\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./goodsRel.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-33682f07\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./goodsRel.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 99 */,
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("97bf4954", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/.0.26.2@css-loader/index.js!../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-449c6c4b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./backstage-header.vue", function() {
     var newContent = require("!!../../../../node_modules/.0.26.2@css-loader/index.js!../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-449c6c4b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./backstage-header.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 102 */,
/* 103 */,
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("fa935f48", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5e676c6e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./goodsSale.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5e676c6e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./goodsSale.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("9ebe8e00", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/.0.26.2@css-loader/index.js!../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-60e72515\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./chartPage.vue", function() {
     var newContent = require("!!../../../../node_modules/.0.26.2@css-loader/index.js!../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-60e72515\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./chartPage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("13d852bf", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6cde5efa\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./formIndex.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6cde5efa\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./formIndex.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 107 */,
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("43860e9f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6ef01904\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./chartIndex.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6ef01904\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./chartIndex.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 109 */,
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(49);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2be69712", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-8c7b30a6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./barLine.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.26.2@css-loader/index.js!../../../../../node_modules/.11.1.4@vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-8c7b30a6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.2@sass-loader/lib/loader.js!../../../../../node_modules/.11.1.4@vue-loader/lib/selector.js?type=styles&index=0!./barLine.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/**
 * vuex v2.2.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
};

var prototypeAccessors$1 = { state: {},namespaced: {} };

prototypeAccessors$1.state.get = function () {
  return this._rawModule.state || {}
};

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (namespace) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.2.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["a"] = index_esm;


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.2.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // inject instance registration hooks
    var hooks = data.hook || (data.hook = {});
    hooks.init = function (vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.prepatch = function (oldVnode, vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.destroy = function (vnode) {
      if (matched.instances[name] === vnode.child) {
        matched.instances[name] = undefined;
      }
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      warn(false, ("props in \"" + (route.path) + "\" is a " + (typeof config) + ", expecting an object, function or boolean."));
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more comformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  if (query) {
    var parsedQuery;
    try {
      parsedQuery = parseQuery(query);
    } catch (e) {
      process.env.NODE_ENV !== 'production' && warn(false, e.message);
      parsedQuery = {};
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key];
    }
    return parsedQuery
  } else {
    return extraQuery
  }
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom
) {
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (ref) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  return (path || '/') + stringifyQuery(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active';
    var compareTarget = location.path ? createRoute(null, location) : route;
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.target && e.target.getAttribute) {
    var target = e.target.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this.$root._route }
  });

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop();
    } else {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function createRouteMap (
  routes,
  oldPathMap,
  oldNameMap
) {
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathMap, nameMap, route);
  });

  return {
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
      });
    } else {
      var aliasRoute = {
        path: route.alias,
        children: route.children
      };
      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
    }
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = index$1;

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCache = Object.create(null);

function getRouteRegex (path) {
  var hit = regexpCache[path];
  var keys, regexp;

  if (hit) {
    keys = hit.keys;
    regexp = hit.regexp;
  } else {
    keys = [];
    regexp = index(path, keys);
    regexpCache[path] = { keys: keys, regexp: regexp };
  }

  return { keys: keys, regexp: regexp }
}

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : (current && current.path) || '/';
  var query = resolveQuery(parsedPath.query, next.query);
  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */

function createMatcher (routes) {
  var ref = createRouteMap(routes);
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      var paramNames = getRouteRegex(record.path).keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      process.env.NODE_ENV !== 'production' && warn(
        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
      );
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  path,
  params,
  pathname
) {
  var ref = getRouteRegex(path);
  var regexp = ref.regexp;
  var keys = ref.keys;
  var m = pathname.match(regexp);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) { params[key.name] = val; }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        position = getElementPosition(el);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */


var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
  }
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, onAbort);
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function () { onAbort && onAbort(); };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    hook(route, current, function (to) {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true);
        abort();
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
        abort();
      } else {
        // confirm transition and pass on the value
        next(to);
      }
    });
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { return cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  return function boundRouteGuard () {
    return guard.apply(instance, arguments)
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

function resolveAsyncComponents (matched) {
  return flatMapComponents(matched, function (def, _, match, key) {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        var resolve = once(function (resolvedDef) {
          match.components[key] = resolvedDef;
          next();
        });

        var reject = once(function (reason) {
          warn(false, ("Failed to resolve async component " + key + ": " + reason));
          next(false);
        });

        var res = def(resolve, reject);
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject);
        }
      }
    }
  })
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    if (called) { return }
    called = true;
    return fn.apply(this, arguments)
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var i = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  );
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || []);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn);
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn);
};

VueRouter.prototype.onReady = function onReady (cb) {
  this.history.onReady(cb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(to, current || this.history.current, append);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.2.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = VueRouter;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(29)))

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _backstageHeader = __webpack_require__(57);

var _backstageHeader2 = _interopRequireDefault(_backstageHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	components: {
		backstageHeader: _backstageHeader2.default
	},
	mounted: function mounted() {
		var that = this;
		var path = that.$route.path;
		if (path == '/formPage' || path == '/') {
			that.$router.push({ name: 'formIndex' });
		} else if (path == 'chartPage') {
			that.$router.push({ name: 'chartIndex' });
		}
		that.$http.post('/backstage').then(function (result) {
			// console.log(result.body)
			that.$store.commit('getRankingList', result.body);
			that.$store.commit('getGoodsSale', result.body);
			that.$store.state.goodsList = result.body;
			// console.log(that.$store.state.goodsList)
		});
	},

	methods: {
		toFormPage: function toFormPage() {
			this.$router.push({ name: 'formIndex' });
		},
		toChartPage: function toChartPage() {
			this.$router.push({ name: 'chartIndex' });
		}
	},
	data: function data() {
		return {};
	},

	computed: {},
	created: function created() {},

	watch: {}
}; //
//
//
//
//
//
//

/***/ }),
/* 114 */,
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _function = __webpack_require__(20);

exports.default = {
	components: {},
	mounted: function mounted() {
		var that = this;
		var path = that.$route.path;
		var reg = /chartPage/;
		if (reg.test(path)) {
			this.isNowPage = false;
		}
	},

	methods: {
		formPage: function formPage() {
			this.isNowPage = true;
			this.$emit('formPage');
		},
		chartPage: function chartPage() {
			this.isNowPage = false;
			this.$emit('chartPage');
		}
	},
	props: [],
	data: function data() {
		return {
			isNowPage: true
		};
	},

	computed: {},
	created: function created() {},

	watch: {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {},
	mounted: function mounted() {
		var that = this;
		var path = that.$route.path;
		if (path == '/chartPage/barLine') {
			that.mode_choice = 'bar_line_li';
		}
	},

	methods: {
		chartIndex: function chartIndex() {
			this.$router.push({ name: 'chartIndex' });
			this.mode_choice = 'chart_index_li';
		},
		barLine: function barLine() {
			this.$router.push({ name: 'barLine' });
			this.mode_choice = 'bar_line_li';
		}
	},
	props: [],
	data: function data() {
		return {
			mode_choice: 'chart_index_li'
		};
	},
	computed: {},
	created: function created() {},
	watch: {}
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//

exports.default = {
	components: {},
	methods: {},
	props: [],
	data: function data() {
		return {};
	},
	computed: {},
	created: function created() {},
	watch: {}
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {},
	methods: {},
	props: ["isLogin"],
	data: function data() {
		return {};
	},
	computed: {},
	created: function created() {},
	watch: {}
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {},
	mounted: function mounted() {
		var that = this;
		var path = that.$route.path;
		if (path == '/formPage/goodsRanking') {
			that.mode_choice = 'goods_ranking_li';
		} else if (path == '/formPage/goodsSale') {
			that.mode_choice = 'goods_sale_li';
		} else if (path == '/formPage/goodsRel') {
			that.mode_choice = 'goods_rel_li';
		}
	},

	methods: {
		formIndex: function formIndex() {
			this.$router.push({ name: 'formIndex' });
			this.mode_choice = 'form_index_li';
		},
		goodsRanking: function goodsRanking() {
			this.$router.push({ name: 'goodsRanking' });
			this.mode_choice = 'goods_ranking_li';
		},
		goodsSale: function goodsSale() {
			this.$router.push({ name: 'goodsSale' });
			this.mode_choice = 'goods_sale_li';
		},
		goodsRel: function goodsRel() {
			this.$router.push({ name: 'goodsRel' });
			this.mode_choice = 'goods_rel_li';
		}
	},
	props: [],
	data: function data() {
		return {
			mode_choice: 'form_index_li'
		};
	},
	computed: {},
	created: function created() {},
	watch: {}
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {},
	methods: {},
	props: [],
	data: function data() {
		return {};
	},
	computed: {},
	created: function created() {},
	watch: {}
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {},
	mounted: function mounted() {},

	methods: {
		time: function time(e) {
			var value = e.target.value;
			var that = this;
			if (Object.is(value, '5')) {
				that.$store.commit('getRankingList', that.$store.getters.five);
			} else if (Object.is(value, '10')) {
				that.$store.commit('getRankingList', that.$store.getters.ten);
			} else if (Object.is(value, '30')) {
				that.$store.commit('getRankingList', that.$store.state.goodsList);
			}
		}
	},
	props: [],
	data: function data() {
		return {};
	},
	computed: {
		arr: function arr() {
			//只取前10个
			return this.$store.state.rankingList.filter(function (item, index) {
				return index < 10;
			});
		}
	},
	created: function created() {},
	watch: {}
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {},
	methods: {},
	props: ["isLogin"],
	data: function data() {
		return {};
	},
	computed: {},
	created: function created() {},
	watch: {}
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {},
	methods: {
		time: function time(e) {
			var value = e.target.value;
			var that = this;
			if (Object.is(value, '5')) {
				that.$store.commit('getGoodsSale', that.$store.getters.five);
			} else if (Object.is(value, '10')) {
				that.$store.commit('getGoodsSale', that.$store.getters.ten);
			} else if (Object.is(value, '30')) {
				that.$store.commit('getGoodsSale', that.$store.state.goodsList);
			}
		},
		a: function a() {
			this.nowPage = 2;
		},
		b: function b() {
			this.nowPage = 3;
		},
		c: function c() {
			this.nowPage = 4;
		}
	},
	props: [],
	data: function data() {
		return {
			nowPage: 1
		};
	},
	computed: {
		arr: function arr() {
			return this.$store.state.goodsSale;
		}
	},
	created: function created() {},
	watch: {}
};

/***/ }),
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */
/***/ (function(module, exports) {



/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
	ten: state => {
		var oldDate = new Date();
		oldDate.setDate(oldDate.getDate() - 9);
		oldDate = formatTime(oldDate, 0);

		function formatTime(time, hours){
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();

			return year * 1000000 + month * 10000 + date * 100 + hours;
		}
		return state.goodsList.filter(item => item.date > oldDate)
	},
	five: state => {
		var oldDate = new Date();
		oldDate.setDate(oldDate.getDate() - 4);
		oldDate = formatTime(oldDate, 0);

		function formatTime(time, hours){
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();

			return year * 1000000 + month * 10000 + date * 100 + hours;
		}
		return state.goodsList.filter(item => item.date > oldDate)
	}
};

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const getRankingList = 'getRankingList';
/* harmony export (immutable) */ __webpack_exports__["a"] = getRankingList;

const getGoodsSale = 'getGoodsSale';
/* harmony export (immutable) */ __webpack_exports__["b"] = getGoodsSale;


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types_js__ = __webpack_require__(135);


/* harmony default export */ __webpack_exports__["a"] = {
	[__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["a" /* getRankingList */]] (state, n){
		var json = {};
		//将ingredients和accessories数据转换成json格式
		n.forEach((e) => {
			var str = '';
			str += e.ingredients.name + '*1,';
			for(let i in e.accessories){
				str = str + i + '*' + e.accessories[i].num + ',';
			}
			str = str.substring(0,str.length-1);
			if(!json[str]){
				json[str] = 1;
			}else{
				json[str] += 1;
			}
		})
		//将json格式转变为数组，方便sort
		var arr = [];
		for(let i in json){
			var middle = [];
			middle.push(i,json[i]);
			arr.push(middle);
		}
		//将二维数据根据数量进行排序
		arr.sort((a, b) => b[1]-a[1]);
		state.rankingList = arr;
	},
	[__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["b" /* getGoodsSale */]] (state, n){
		var arr = n.sort((a,b) => b.date - a.date);
		var newArr = [];
		arr.forEach((e) => {
			var str = '';
			var totalPrice = 0;
			var middle = [];
			str += e.ingredients.name + '*1,';
			totalPrice += parseFloat(e.ingredients.price);
			for(let i in e.accessories){
				str = str + i + '*' + e.accessories[i].num + ',';
				totalPrice += parseFloat(e.accessories[i].num) * parseFloat(e.accessories[i].price)
			}
			str = str.substring(0,str.length-1);
			middle.push(str,totalPrice.toFixed(1),e.username ? e.username : '游客',e.date);
			newArr.push(middle);
		})
		state.goodsSale = newArr;
	}
};

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_resource__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_resource___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_resource__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__backstage_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__backstage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__backstage_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router_js__ = __webpack_require__(27);







__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_resource___default.a);

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
	el: '#main-content',
	router: __WEBPACK_IMPORTED_MODULE_4__router_js__["a" /* default */],
	store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */],
	render: cE => cE(__WEBPACK_IMPORTED_MODULE_3__backstage_vue___default.a)
})

/***/ })
/******/ ]);