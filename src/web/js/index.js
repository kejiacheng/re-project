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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 433);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.3.3
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
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
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
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
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
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
];

/*  */

var config = ({
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
  performance: false,

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
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

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
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

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
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
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

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

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

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

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
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
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
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
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

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
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
  // stabilize the subscriber list first
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
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
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

LIFECYCLE_HOOKS.forEach(function (hook) {
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

ASSET_TYPES.forEach(function (type) {
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

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
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
    vm._props[key] !== undefined
  ) {
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

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
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
  return match ? match[1] : ''
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

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
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
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
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
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
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

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
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

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
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
  if (isDef(hash)) {
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

// 2. When the children contains constructs that always generated nested Arrays,
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

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

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
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
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
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
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
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
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
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
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
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
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
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
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
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
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
  if (vm._inactive || vm._inactive === null) {
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


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
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
  var watcher, id;

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
      if (circular[id] > MAX_UPDATE_COUNT) {
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

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
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
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
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

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

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
      if (isReservedProp[key] || config.isReservedAttr(key)) {
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
    ? getData(data, vm)
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

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
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

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
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
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
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
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
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
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
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
  if (isDef(on[event])) {
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
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
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
    typeof children[0] === 'function'
  ) {
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
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
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
  if (isDef(vnode)) {
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
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
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
  if (isDef(ret)) {
    (ret)._isVList = true;
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
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
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
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
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
  Vue.prototype._s = toString;
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

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

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
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
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
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
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
    !(this instanceof Vue$3)
  ) {
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
      return this
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
    return this
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
    ASSET_TYPES.forEach(function (type) {
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
  ASSET_TYPES.forEach(function (type) {
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
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
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
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
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
  ASSET_TYPES.forEach(function (type) {
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

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.3';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

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
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
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

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
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

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
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
    if (isDef(parent)) {
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
    } else if (isTrue(vnode.isComment)) {
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
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
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
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
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
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
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
      isDef(i = i.$options._scopeId)
    ) {
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
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
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
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
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
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
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
              !bailed
            ) {
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
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
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
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
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

        if (isDef(vnode.parent)) {
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

        if (isDef(parentElm$1)) {
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
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
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
    if (isUndef(attrs[key])) {
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
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
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
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
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
    expression: ("\"" + value + "\""),
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
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
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
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
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
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
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
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
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
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
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
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
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
      var strCur = isUndef(cur) ? '' : String(cur);
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
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
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
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
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

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
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
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
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
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
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
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
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
  var userWantsControl = getHookArgumentsLength(enterHook);

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
        pendingNode.elm._leaveCb
      ) {
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
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
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
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
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
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
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
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
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
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
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
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
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
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
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
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
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
// into the final desired state. This way in the second pass removed
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
Vue$3.config.isReservedAttr = isReservedAttr;
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
    inBrowser && typeof console !== 'undefined'
  ) {
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
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
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
var isPlainTextElement = makeMap('script,style,textarea', true);
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
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
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
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
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
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
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
          options.warn
        ) {
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

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

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

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

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
    canBeLeftOpenTag: options.canBeLeftOpenTag,
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
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
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
        } else {
          warnOnce(
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
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
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
  var i, l, name, rawName, value, modifiers, isProp;
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
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
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
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
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
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
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
    data += (genHandlers(el.events, false, warn$3)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
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
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
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
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}}"
}

function genForScopedSlot (key, el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el)) +
    '})'
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
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

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

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
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
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

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
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
  canBeLeftOpenTag: canBeLeftOpenTag,
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
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
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
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Url */
/* unused harmony export Http */
/* unused harmony export Resource */
/*!
 * vue-resource v1.3.3
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

function trimEnd(str, chars) {

    if (str && chars === undefined) {
        return str.replace(/\s+$/, '');
    }

    if (!str || !chars) {
        return str;
    }

    return str.replace(new RegExp(("[" + chars + "]+$")), '');
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

    if (isString(options$$1.root) && !/^(https?:)?\//.test(url)) {
        url = trimEnd(options$$1.root, '/') + '/' + url;
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

        if (isString(handler)) {
            handler = Url.transform[handler];
        }

        if (isFunction(handler)) {
            transform = factory(handler, transform, self.$vm);
        }

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

Url.transform = {template: template, query: query, root: root};
Url.transforms = ['template', 'query', 'root'];

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
 * Form data Interceptor.
 */

var form = function (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');

    } else if (isObject(request.body) && request.emulateJSON) {

        request.body = Url.params(request.body);
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    next();
};

/**
 * JSON Interceptor.
 */

var json = function (request, next) {

    var type = request.headers.get('Content-Type') || '';

    if (isObject(request.body) && type.indexOf('application/json') === 0) {
        request.body = JSON.stringify(request.body);
    }

    next(function (response) {

        return response.bodyText ? when(response.text(), function (text) {

            type = response.headers.get('Content-Type') || '';

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

        if (request.responseType && 'responseType' in xhr) {
            xhr.responseType = request.responseType;
        }

        if (request.withCredentials || request.credentials) {
            xhr.withCredentials = true;
        }

        if (!request.crossOrigin) {
            request.headers.set('X-Requested-With', 'XMLHttpRequest');
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

    var client = __webpack_require__(29);

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

Object.defineProperty(Response.prototype, 'data', {

    get: function get() {
        return this.body;
    },

    set: function set(body) {
        this.body = body;
    }

});

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

        if (isString(handler)) {
            handler = Http.interceptor[handler];
        }

        if (isFunction(handler)) {
            client.use(handler);
        }

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

Http.interceptor = {before: before, method: method, jsonp: jsonp, json: json, form: form, header: header, cors: cors};
Http.interceptors = ['before', 'method', 'jsonp', 'json', 'form', 'header', 'cors'];

['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {

    Http[method$$1] = function (url, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
    };

});

['post', 'put', 'patch'].forEach(function (method$$1) {

    Http[method$$1] = function (url, body, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body}));
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

/* harmony default export */ __webpack_exports__["a"] = (plugin);



/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(420)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(159),
  /* template */
  __webpack_require__(399),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\workFolder\\re-project\\src\\js\\main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4684ea12", Component.options)
  } else {
    hotAPI.reload("data-v-4684ea12", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _function = __webpack_require__(41);

exports.default = {
	components: {},
	mounted: function mounted() {
		var _this = this;

		this.$http.post('/backstage').then(function (result) {
			var json = {};
			//将ingredients和accessories数据转换成json格式
			result.body.forEach(function (e) {
				var str = '';
				str += e.ingredients.name + '*1,';
				for (var i in e.accessories) {
					str = str + i + '*' + e.accessories[i].num + ',';
				}
				str = str.substring(0, str.length - 1);
				if (!json[str]) {
					json[str] = 1;
				} else {
					json[str] += 1;
				}
			});
			//将json格式转变为数组，方便sort
			var arr = [];
			for (var i in json) {
				var middle = [];
				middle.push(i, json[i]);
				arr.push(middle);
			}
			//将二维数据根据数量进行排序
			arr.sort(function (a, b) {
				return b[1] - a[1];
			});
			//取出数组前10个项
			arr = arr.slice(0, 10);
			console.log(arr);
			arr.forEach(function (Arr) {
				var json = { name: Arr[0], num: Arr[1] };
				_this.ranking_list.push(json);
			});
		});
	},

	methods: {
		ing_click: function ing_click(e) {
			var that = this;
			//用三目运算符获取正确DOM元素
			var target = e.target.className == 'add_item' ? e.target.parentNode : e.target.parentNode.className == 'add_item' ? e.target.parentNode.parentNode : null;

			if (target) {
				//获取ingredients名字和价格DOM
				var item_name = target.getElementsByClassName('item_name')[0].innerHTML;
				var price_num = target.getElementsByClassName('price_num')[0].innerHTML;

				//判断ingredients是否已选择
				if (that.shopping_list.ingredients.dom) {
					//若已选择则移除原先DOM的selected类
					(0, _function.removeClass)(that.shopping_list.ingredients.dom, 'selected');
				}
				//添加目标DOM的selected类并且修改DATA中的缓存DOM
				(0, _function.addClass)(target, 'selected');
				that.shopping_list.ingredients.dom = target;
				that.shopping_list.ingredients.name = item_name;
				that.shopping_list.ingredients.price = price_num;
			}
		},
		acc_click: function acc_click(e) {
			var that = this;
			//使用三目获取正确DOM
			var target = (0, _function.hasClass)(e.target, 'num_bt') ? e.target.parentNode.parentNode.parentNode.parentNode : null;
			if (target) {
				//使用三目判断是加还是减
				var sign = (0, _function.hasClass)(e.target, 'add') ? 'add' : (0, _function.hasClass)(e.target, 'sub') ? 'sub' : null;

				//获取名字和价格
				var item_name = target.getElementsByClassName('item_name')[0].innerHTML;
				var item_price = target.getElementsByClassName('num')[0].innerHTML;

				//根据符号进行货物数量的加减
				if (Object.is(sign, 'add')) {
					if (that.shopping_list.accessories[item_name].num < 3) {
						that.shopping_list.accessories[item_name].num++;
					}
				} else if (Object.is(sign, 'sub')) {
					if (that.shopping_list.accessories[item_name].num > 0) {
						that.shopping_list.accessories[item_name].num--;
					}
				}
			}
		},
		complete_bt: function complete_bt() {
			var that = this;
			var shade = document.getElementsByClassName('shade')[0];
			var body = document.body;
			var body_height = body.clientHeight; //获取body高度
			var complete_box = document.getElementsByClassName("complete_box")[0],
			    complete_bt = document.getElementsByClassName("complete_bt")[0],
			    comlete_box_height = complete_box.offsetHeight,
			    complete_bt_height = complete_bt.offsetHeight;

			var shade_style = shade.style;
			//改变遮蔽层样式
			shade_style.height = body_height + 'px';
			shade_style.display = 'block';
			//改变complete_box的top触发动画效果
			complete_box.style.top = -comlete_box_height + complete_bt_height + 'px';

			//body点击事件函数
			var body_click = function body_click() {
				shade_style.display = 'none';
				complete_box.style.top = complete_bt_height + 'px';
				(0, _function.removeEvents)(body, 'click', body_click);
			};
			//添加body点击事件
			(0, _function.addEvents)(body, 'click', body_click);
		},
		add: function add(e) {
			var that = this;
			//获取目标DOM
			var target = e.target.parentNode.parentNode.parentNode;
			//获取该DOM的名字
			var name = target.getElementsByClassName('selected_items_name')[0].innerHTML;

			if (that.shopping_list.accessories[name].num < 3) {
				that.shopping_list.accessories[name].num++;
			}
		},
		minus: function minus(e) {
			var that = this;
			//获取目标DOM
			var target = e.target.parentNode.parentNode.parentNode;
			//获取该DOM的名字
			var name = target.getElementsByClassName('selected_items_name')[0].innerHTML;

			if (that.shopping_list.accessories[name].num > 0) {
				that.shopping_list.accessories[name].num--;
			}

			var complete_box = document.getElementsByClassName('complete_box')[0];
			//获取物品一栏的高度
			var selected_items = document.getElementsByClassName('selected_items')[0];
			var selected_items_height = selected_items.offsetHeight;

			//获取complete_box的top值并且去掉px
			var now_top = parseFloat(complete_box.style.top);
			//当该物品个数为0，则改变top
			if (Object.is(that.shopping_list.accessories[name].num, 0)) {
				complete_box.style.top = now_top + selected_items_height + 'px';
			}
		},
		clear: function clear() {
			var that = this;

			var complete_box = document.getElementsByClassName("complete_box")[0],
			    complete_bt = document.getElementsByClassName("complete_bt")[0];

			for (var i in that.shopping_list.ingredients) {
				that.shopping_list.ingredients[i] = null;
			}

			for (var _i in that.shopping_list.accessories) {
				that.shopping_list.accessories[_i].num = 0;
			}

			//用setTimeout使complete_box的高度变化发生在改变complete_box.style.top之前
			// const timer = setTimeout(() => {
			// 	complete_box.style.top = -complete_box.offsetHeight + complete_bt.offsetHeight + 'px';
			// 	clearTimeout(timer);
			// },0)
			//与上面注释段同理
			this.$nextTick(function () {
				complete_box.style.top = -complete_box.offsetHeight + complete_bt.offsetHeight + 'px';
			});
		},
		payment: function payment() {
			var that = this;
			//用sessionStorage传值
			sessionStorage.setItem('ingredients_name', that.shopping_list.ingredients.name);
			sessionStorage.setItem('ingredients_price', that.shopping_list.ingredients.price);
			//拼接accssories字符串，让支付页面可以json解析
			var accessories = '{';
			//不将数量为0的辅料填写进去
			for (var i in that.shopping_list.accessories) {
				if (!Object.is(that.shopping_list.accessories[i].num, 0)) {
					accessories += '"' + that.shopping_list.accessories[i].name + '"' + ': { "price":' + that.shopping_list.accessories[i].price + ', "num":' + that.shopping_list.accessories[i].num + "},";
				}
			}
			//去除末尾的,
			accessories = accessories.substring(0, accessories.length - 1);
			accessories += "}";
			sessionStorage.setItem('accessories', accessories);
			//总价
			that.$http.post('/totolPrice', { totolPrice: that.totol_price }).then(function (result) {
				if (result.body.success) {
					window.location = 'payment.html';
				}
			});
		}
	},
	data: function data() {
		return {
			ingredients: [{ className: 'green_tea', pic: 'green_tea.jpg', name: '绿茶', price: '2.5' }, { className: 'red_tea', pic: 'red_tea.jpg', name: '红茶', price: '2.5' }, { className: 'apple', pic: 'apple.jpg', name: '苹果汁', price: '3.5' }, { className: 'lemon', pic: 'lemon.jpg', name: '柠檬汁', price: '3.5' }, { className: 'peach', pic: 'peach.jpg', name: '蜜桃汁', price: '3.5' }, { className: 'mango', pic: 'mango.jpg', name: '芒果汁', price: '4.0' }, { className: 'orange', pic: 'orange.jpg', name: '鲜橙汁', price: '3.5' }],
			ranking_list: [],
			shopping_list: { //购物清单
				ingredients: {
					price: null,
					name: null,
					dom: null
				},
				accessories: {
					蜂蜜: {
						className: 'honey',
						pic: 'honey.jpg',
						name: '蜂蜜',
						price: '1.0',
						num: 0
					},
					椰果: {
						className: 'coconut',
						pic: 'coconut.jpg',
						name: '椰果',
						price: '0.8',
						num: 0
					},
					果葡糖浆: {
						className: 'HFCS',
						pic: 'HFCS.jpg',
						name: '果葡糖浆',
						price: '0.5',
						num: 0
					}
				}
			}
		};
	},

	computed: {
		totol_price: function totol_price() {
			//计算总价
			var accessories_price = 0;
			for (var i in this.shopping_list.accessories) {
				accessories_price += parseFloat((this.shopping_list.accessories[i].price * this.shopping_list.accessories[i].num).toFixed(1));
			}
			return parseFloat(this.shopping_list.ingredients.price) + accessories_price;
		},
		has_ingredients: function has_ingredients() {
			//判断是否选购了主料
			return this.shopping_list.ingredients.dom ? true : false;
		},
		complete_bt_height: function complete_bt_height() {
			//计算高度
			var complete_box = document.getElementsByClassName("complete_box")[0],
			    complete_bt = document.getElementsByClassName("complete_bt")[0],
			    comlete_box_height = complete_box.offsetHeight,
			    complete_bt_height = complete_bt.offsetHeight;
			return complete_bt_height + complete_box_height + 'px';
		}
	},
	created: function created() {},

	watch: {
		//深度观察
		'shopping_list.ingredients.dom': {
			handler: function handler(newEle, oldEle) {
				if (!newEle) {
					this.removeClass(oldEle, 'selected');
				}
			},
			deep: true
		}
	}
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

/***/ }),

/***/ 154:
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
	data: function data() {
		return {};
	},
	computed: {},
	created: function created() {},
	watch: {}
};

/***/ }),

/***/ 155:
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

exports.default = {
	components: {},
	methods: {
		over: function over() {
			this.personalShow = true;
		},
		out: function out() {
			this.personalShow = false;
		},
		exit: function exit() {
			var _this = this;

			var that = this;
			var index = 1;
			//向后台发送退出信号
			that.$http.post('/', { index: index }).then(function (result) {
				if (Object.is(result.body, '退出成功')) {
					//退出成功触发exit事件让父元件得到响应
					_this.$emit('exit');
				}
			});
		}
	},
	props: ["Login", "phone", "username", "loginway"],
	data: function data() {
		return {
			personalShow: false
		};
	},
	computed: {},
	created: function created() {},
	watch: {}
};

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _indexHeader = __webpack_require__(385);

var _indexHeader2 = _interopRequireDefault(_indexHeader);

var _indexContent = __webpack_require__(383);

var _indexContent2 = _interopRequireDefault(_indexContent);

var _indexFooter = __webpack_require__(384);

var _indexFooter2 = _interopRequireDefault(_indexFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	components: {
		indexHeader: _indexHeader2.default,
		indexContent: _indexContent2.default,
		indexFooter: _indexFooter2.default
	},
	methods: {
		isLogin: function isLogin() {
			var that = this;
			var index = 0;
			//通过后台判断是否登录
			that.$http.post('/', { index: index }).then(function (result) {
				if (result.body) {
					//登录则将获得的数据赋值
					that.Login = true;
					that.phone = result.body.phone;
					that.username = result.body.username;
					that.loginway = result.body.login_way;
				}
			});
		},
		modify: function modify() {
			//将数据初始化未登录状态
			var that = this;
			that.Login = false;
			that.phone = '';
			that.username = '';
			that.loginway = '';
		}
	},
	data: function data() {
		return {
			Login: false,
			phone: '',
			username: '',
			loginway: ''
		};
	},
	computed: {},
	created: function created() {
		var that = this;
		that.isLogin();
	},

	watch: {}
}; //
//
//
//
//
//
//
//

/***/ }),

/***/ 21:
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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/**\r\n * YUI 3.5.0 - reset.css (http://developer.yahoo.com/yui/3/cssreset/)\r\n * http://cssreset.com\r\n * Copyright 2012 Yahoo! Inc. All rights reserved.\r\n * http://yuilibrary.com/license/\r\n */\r\n/*\r\n\tTODO will need to remove settings on HTML since we can't namespace it.\r\n\tTODO with the prefix, should I group by selector or property for weight savings?\r\n*/\r\nhtml{\r\n    color:#000;\r\n    // background:#FFF;\r\n}\r\n/*\r\n\tTODO remove settings on BODY since we can't namespace it.\r\n*/\r\n/*\r\n\tTODO test putting a class on HEAD.\r\n\t\t- Fails on FF.\r\n*/\r\nbody,\r\ndiv,\r\ndl,\r\ndt,\r\ndd,\r\nul,\r\nol,\r\nli,\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6,\r\npre,\r\ncode,\r\nform,\r\nfieldset,\r\nlegend,\r\ninput,\r\ntextarea,\r\np,\r\nblockquote,\r\nth,\r\ntd {\r\n    margin:0;\r\n    padding:0;\r\n}\r\ntable {\r\n    border-collapse:collapse;\r\n    border-spacing:0;\r\n}\r\nfieldset,\r\nimg {\r\n    border:0;\r\n}\r\n/*\r\n\tTODO think about hanlding inheritence differently, maybe letting IE6 fail a bit...\r\n*/\r\naddress,\r\ncaption,\r\ncite,\r\ncode,\r\ndfn,\r\nem,\r\nstrong,\r\nth,\r\nvar {\r\n    font-style:normal;\r\n    font-weight:normal;\r\n}\r\n\r\nol,\r\nul {\r\n    list-style:none;\r\n}\r\n\r\ncaption,\r\nth {\r\n    text-align:left;\r\n}\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6 {\r\n    font-size:100%;\r\n    font-weight:normal;\r\n}\r\nq:before,\r\nq:after {\r\n    content:'';\r\n}\r\nabbr,\r\nacronym {\r\n    border:0;\r\n    font-variant:normal;\r\n}\r\n/* to preserve line-height and selector appearance */\r\nsup {\r\n    vertical-align:text-top;\r\n}\r\nsub {\r\n    vertical-align:text-bottom;\r\n}\r\ninput,\r\ntextarea,\r\nselect {\r\n    font-family:inherit;\r\n    font-size:inherit;\r\n    font-weight:inherit;\r\n}\r\n/*to enable resizing for IE*/\r\ninput,\r\ntextarea,\r\nselect {\r\n    *font-size:100%;\r\n}\r\n/*because legend doesn't inherit in IE */\r\nlegend {\r\n    color:#000;\r\n}\r\n/* YUI CSS Detection Stamp */\r\n#yui3-css-stamp.cssreset { display: none; }\r\n\r\n/*�������*/\r\n.clearfix{\r\n    content: \"\";\r\n    display: table;\r\n    clear: both;\r\n}\r\n\r\n/*�������a��ǩ���»���*/\r\na{\r\n    text-decoration: none;\r\n}", ""]);

// exports


/***/ }),

/***/ 28:
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

/***/ 29:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

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

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n#header {\n  height: 63px;\n}\n#header .wrapper {\n    width: 100%;\n    border-bottom: 3px solid #ff8a06;\n    min-width: 800px;\n    font-weight: 600;\n    background: #fff;\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 99;\n}\n#header .wrapper .logo {\n      width: 140px;\n      margin-left: 15px;\n}\n#header .wrapper .logo .logo_img {\n        height: 60px;\n        vertical-align: -20px;\n}\n#header .wrapper .header_left {\n      position: absolute;\n      top: 0;\n      right: 30px;\n      font-size: 0;\n}\n#header .wrapper .header_left .bt {\n        display: block;\n        float: left;\n        width: 150px;\n        height: 60px;\n        cursor: pointer;\n        line-height: 60px;\n        text-align: center;\n        color: #000;\n        font-weight: 600;\n        border-radius: 20px;\n        font-size: 16px;\n}\n#header .wrapper .header_left .bt:hover {\n          background: #86ffec;\n          color: #ff0068;\n}\n#header .wrapper .header_left .personal_wrapper {\n        display: inline-block;\n        position: relative;\n}\n#header .wrapper .header_left .personal_wrapper .personal_wrapper_box {\n          position: absolute;\n          top: 60px;\n          left: 40px;\n          width: 70px;\n          background: #fff;\n          border: 1px solid #dedede;\n}\n#header .wrapper .header_left .personal_wrapper .personal_wrapper_box ul a {\n            display: block;\n            font-size: 13px;\n            text-align: center;\n            width: 100%;\n            height: 30px;\n            line-height: 30px;\n            cursor: pointer;\n            color: #333;\n}\n#header .wrapper .header_left .personal_wrapper .personal_wrapper_box ul a:last-child {\n              border-bottom: 0;\n}\n#header .wrapper .header_left .personal_wrapper .personal_wrapper_box ul a:hover {\n              color: #f1f1f1;\n              background: #38f;\n}\n", ""]);

// exports


/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n#content {\n  margin-top: 30px;\n  width: 100%;\n  background: #f5f5f5;\n}\n#content .wrapper {\n    width: 1200px;\n    margin: 0 auto;\n    background: url(" + __webpack_require__(372) + ");\n    padding: 20px 30px;\n    box-sizing: border-box;\n    font-size: 0;\n}\n#content .wrapper .content_left {\n      width: 808px;\n      display: inline-block;\n}\n#content .wrapper .content_left .title {\n        font-size: 24px;\n        font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n}\n#content .wrapper .content_left .title span {\n          font-size: 20px;\n          color: red;\n}\n#content .wrapper .content_left .selected {\n        border-color: red;\n        box-shadow: 0 0 0 3px red inset;\n        border-radius: 60px;\n}\n#content .wrapper .content_left img {\n        width: 100px;\n        height: 100px;\n        border-radius: 50%;\n}\n#content .wrapper .content_left .item_name {\n        font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n        margin-bottom: 12px;\n}\n#content .wrapper .content_left .item_price {\n        font-weight: 600;\n        margin-bottom: 12px;\n}\n#content .wrapper .content_left .item_price span {\n          color: #FE0048;\n}\n#content .wrapper .content_left .ingredients {\n        font-size: 16px;\n}\n#content .wrapper .content_left .ingredients .ingredients_items {\n          margin: 15px 0;\n}\n#content .wrapper .content_left .ingredients .ingredients_items:after {\n            content: \"\";\n            display: table;\n            clear: both;\n}\n#content .wrapper .content_left .ingredients .ingredients_items .item {\n            width: 200px;\n            height: 250px;\n            border: 1px solid transparent;\n            float: left;\n            margin-bottom: 5px;\n            text-align: center;\n}\n#content .wrapper .content_left .ingredients .ingredients_items .item img {\n              margin: 22px 0 12px;\n}\n#content .wrapper .content_left .ingredients .ingredients_items .item .add_item {\n              width: 30px;\n              height: 30px;\n              background: #ff8a06;\n              border-radius: 50%;\n              margin: 0 auto;\n              cursor: pointer;\n}\n#content .wrapper .content_left .ingredients .ingredients_items .item .add_item .fa-plus {\n                margin-top: 5px;\n                margin-left: 1px;\n                font-size: 22px;\n                color: #fff;\n}\n#content .wrapper .content_left .accessories .accessories_items {\n        margin: 15px 0;\n}\n#content .wrapper .content_left .accessories .accessories_items:after {\n          content: \"\";\n          display: table;\n          clear: both;\n}\n#content .wrapper .content_left .accessories .accessories_items .item {\n          width: 345px;\n          height: 175px;\n          padding-left: 50px;\n          font-size: 0;\n          float: left;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_left {\n            width: 145px;\n            text-align: center;\n            display: inline-block;\n            font-size: 16px;\n            vertical-align: top;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_left img {\n              margin: 12px 0;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_right {\n            width: 175px;\n            margin-left: 25px;\n            display: inline-block;\n            font-size: 16px;\n            text-align: left;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_right .right_content {\n              margin-top: 30px;\n              border-right: 2px solid #333;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_right .right_content .item_num {\n                margin-top: 10px;\n                font-weight: 600;\n                display: inline-block;\n                vertical-align: top;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_right .right_content .item_num span {\n                  display: inline-block;\n                  text-align: center;\n                  width: 20px;\n                  color: #FE0048;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_right .right_content .add_sub {\n                margin-top: 10px;\n                display: inline-block;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_right .right_content .add_sub i {\n                  cursor: pointer;\n                  color: #545050;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_right .right_content .totol_price {\n                font-weight: 600;\n                margin-top: 20px;\n}\n#content .wrapper .content_left .accessories .accessories_items .item .item_right .right_content .totol_price span {\n                  display: inline-block;\n                  text-align: center;\n                  width: 20px;\n                  color: #FE0048;\n}\n#content .wrapper .content_right {\n      font-size: 16px;\n      width: 332px;\n      display: inline-block;\n      vertical-align: top;\n}\n#content .wrapper .content_right .tips {\n        width: 320px;\n        margin-bottom: 30px;\n}\n#content .wrapper .content_right .tips .tips_title {\n          text-align: center;\n          font-size: 24px;\n          margin-bottom: 20px;\n          font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n}\n#content .wrapper .content_right .tips ul li {\n          display: block;\n          letter-spacing: 1px;\n          line-height: 20px;\n          padding-left: 5px;\n          margin-bottom: 10px;\n}\n#content .wrapper .content_right .tips ul li .important_word {\n            color: red;\n            font-weight: 600;\n}\n#content .wrapper .content_right .tips ul li i {\n            color: red;\n            font-weight: 600;\n}\n#content .wrapper .content_right .ranking_list .ranking_list_title {\n        text-align: center;\n        font-size: 24px;\n        margin-bottom: 20px;\n        font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n}\n#content .wrapper .content_right .ranking_list ul {\n        margin-left: 10px;\n}\n#content .wrapper .content_right .ranking_list ul li {\n          font-size: 13px;\n          padding: 9px 0;\n}\n#content .wrapper .content_right .ranking_list ul li i {\n            float: left;\n            display: inline-block;\n            text-align: center;\n            line-height: 15px;\n            width: 15px;\n            height: 15px;\n            font-style: normal;\n            margin-right: 15px;\n}\n#content .wrapper .content_right .ranking_list ul li i.top_3 {\n            background: #ff7f42;\n            color: white;\n}\n#content .wrapper .content_right .ranking_list ul li span {\n            width: 232px;\n            -webkit-line-clamp: 1;\n            -webkit-box-orient: vertical;\n            display: -webkit-box;\n            overflow: hidden;\n            float: left;\n            line-height: 15px;\n            margin-right: 8px;\n            color: #444;\n}\n#content .wrapper .content_right .ranking_list ul li strong {\n            color: #ff1c4d;\n            font-weight: 600;\n}\n#content .wrapper .complete_bt {\n      width: 120px;\n      height: 40px;\n      position: fixed;\n      bottom: 0;\n      left: calc(50% - 60px);\n      left: -webkit-calc(50% - 60px);\n      left: -moz-calc(50% - 60px);\n      background: #4941FD;\n      border-radius: 50% 50% 0 0;\n      text-align: center;\n      line-height: 45px;\n      color: #fff;\n      font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n      cursor: pointer;\n      z-index: 100;\n      font-size: 16px;\n}\n#content .wrapper .complete_bt .complete_box {\n        width: 400px;\n        min-height: 135px;\n        position: absolute;\n        left: calc(-200px + 60px);\n        background: white;\n        top: 40px;\n        transition: top linear 0.3s;\n        cursor: default;\n}\n#content .wrapper .complete_bt .complete_box .header {\n          height: 35px;\n          width: 100%;\n          background: #f1f1f1;\n}\n#content .wrapper .complete_bt .complete_box .header .header_text {\n            width: 20%;\n            color: black;\n            line-height: 34px;\n            font-size: 13px;\n            float: left;\n}\n#content .wrapper .complete_bt .complete_box .header .header_text span {\n              font-weight: 900;\n              vertical-align: 1px;\n              color: #2800DE;\n}\n#content .wrapper .complete_bt .complete_box .header .clear_goods {\n            width: 20%;\n            float: right;\n            line-height: 35px;\n            color: black;\n            cursor: pointer;\n}\n#content .wrapper .complete_bt .complete_box .header .clear_goods span {\n              font-size: 13px;\n}\n#content .wrapper .complete_bt .complete_box .content {\n          padding: 0 15px;\n          min-height: 100px;\n}\n#content .wrapper .complete_bt .complete_box .content .tips {\n            height: 25px;\n            color: black;\n            font-size: 12px;\n            line-height: 25px;\n            text-align: left;\n            border-bottom: 1px solid #ccc;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .all_items .selected_items {\n            width: 100%;\n            height: 45px;\n            border-bottom: 1px solid #ccc;\n            box-sizing: border-box;\n            padding: 10px 5px;\n            color: black;\n            line-height: 25px;\n            text-align: left;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .all_items .selected_items .selected_items_name {\n              font-size: 14px;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .all_items .selected_items .selected_items_right {\n              float: right;\n              display: inline-block;\n              height: 25px;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .all_items .selected_items .selected_items_right .selected_items_price {\n                margin-right: 20px;\n                font-size: 14px;\n                color: #EF0000;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .all_items .selected_items .selected_items_right .num_box {\n                display: inline-block;\n                vertical-align: bottom;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .all_items .selected_items .selected_items_right .num_box img {\n                  width: 20px;\n                  vertical-align: top;\n                  margin-top: 4px;\n                  cursor: pointer;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .all_items .selected_items .selected_items_right .num_box .selected_items_num {\n                  margin: 0 4px 0 3px;\n                  color: #6052FB;\n                  font-size: 13px;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .selected_items_totol_price {\n            height: 30px;\n            text-align: right;\n            color: black;\n            line-height: 30px;\n            font-size: 14px;\n            margin-right: 5px;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .selected_items_totol_price .confirm_bt {\n              float: left;\n              margin-left: 5px;\n              color: #4003FF;\n              cursor: pointer;\n              font-weight: 600;\n}\n#content .wrapper .complete_bt .complete_box .content .have_goods .selected_items_totol_price .price_num {\n              color: #EF0000;\n}\n#content .wrapper .complete_bt .complete_box .content .not_have {\n            color: #6E6E6E;\n            line-height: 100px;\n}\n#content .shade {\n    z-index: 99;\n    background: #e3e3e3;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    opacity: 0.5;\n    filter: Alpha(opacity=50);\n    display: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n#footer {\n  height: 30px;\n  text-align: left;\n  margin-left: 100px;\n  line-height: 30px;\n}\n", ""]);

// exports


/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports
exports.i(__webpack_require__(27), "");

// module
exports.push([module.i, "\n@charset \"UTF-8\";\nbody {\n  font-family: \"\\5B8B\\4F53\";\n}\n", ""]);

// exports


/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 372:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAAL4CAYAAAAkgloNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTI0NTE0RTIyRjZGMTFFNUEzQUNFRDVGMkI5MEU3QjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTI0NTE0RTMyRjZGMTFFNUEzQUNFRDVGMkI5MEU3QjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMjQ1MTRFMDJGNkYxMUU1QTNBQ0VENUYyQjkwRTdCNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMjQ1MTRFMTJGNkYxMUU1QTNBQ0VENUYyQjkwRTdCNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv8qlnoABTlMSURBVHja7P1bmyXJbSWIAvAdVcye7/z/HzAX9UhNiRdRvKhHOmceZ9SiimSRbPU8zrCKVfw0fRGjWBnbgXkwM2ABZr4j5zxmWOorMTNiX9ztggXzBawlX/7i+89f/uL7z1/803efv/zFD56/+tVfP3/x2V8+f/Hz7z5/8fPvPv/+lz98/vrznzz//pc/eP7is798/vIXP3j++tc/ff761z/x9/3uH/6n9vPf/uz5i5//u+ff//KHz199/qPnL3/x/eevfvnD59//8ofPv//lD56//vwnz1/8/C+ev/zF959//8sfPH/1+d88/+E//t3z17/52fNXv/ph/9mPnr/6/G+ev/7NT9t7fvu3z3/4579//vq3f/v8L//p//f81a/++vmrz3/8/NWv/vr5y198//nrz3/y/PVvf/b89W9++vzVr37Y3/uz569++cN2L/2+vv7tz56//vVPn//w23/fXvv5j5+//vVPnv/wz3///Id//rvnr3/7t89fff6jfu0/bv/+1Q+fv/zFD56//MX3n7/87K/a//7iB22cfvnD9j2f//j5q8//xj/vi5//u+ff/cOftXH79U+fv/78J89fff7j9r2//Vm7vt/+bbuv//h3z19/3sbxq89/9PzVL3/Y7uk3P23399lfPX/x8+8+f/3rnzx//eufPn/xT999/uKfvtve/5uf+vh+8fO/eP7ys79sYzE+r4/Tl7/4fpvPf/ru8+/+4c+ef/cf/m373P5Z7Z6+17/rL56/+PlfPH/1+Y+ff//LHz5/+dn32vt//hdtjj/73vPv/vHP29r4p+/2NfLv2vt/8f3nL37+7/xzx9r58hc/eP7iH//8+atf/vD5D7/9989/+E//3+evf/3TNoZ9Httcfq+9/7O/9O9ta6z9/Xf/4X9+/vIX3+tz8v023r9pc9rmoc1dW38/6GP0M1+HX372V/27fuif+fXnP+lr4W98rL7+9U+f/+U//a/PX37WrucP//z37br/+e+e//Af/+75q1/99fPXv4l5/fo3P+tr9O/6/P64/f7XP+lr82/9vV//5qf+mvHerz7/UVu3v2rX/sXPv+trLNZejMlXfX2OfZvWaH/P7/ue++qXP3z+8rO/7HPU9twXP/+LmPfPvhf74Lf/Pua9r4f27x/4PY/48PWvf+p75A//8X95/sM///3zV7/667bmx97q9z7m96vP/6bfX5+fX//U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"

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(411)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(153),
  /* template */
  __webpack_require__(390),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\workFolder\\re-project\\src\\js\\components\\index\\index-content.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index-content.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b817dbe", Component.options)
  } else {
    hotAPI.reload("data-v-0b817dbe", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(418)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(154),
  /* template */
  __webpack_require__(397),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\workFolder\\re-project\\src\\js\\components\\index\\index-footer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index-footer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3ce25bba", Component.options)
  } else {
    hotAPI.reload("data-v-3ce25bba", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(409)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(155),
  /* template */
  __webpack_require__(388),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\workFolder\\re-project\\src\\js\\components\\index\\index-header.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index-header.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02c13615", Component.options)
  } else {
    hotAPI.reload("data-v-02c13615", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "header"
    }
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "header_left"
  }, [(!_vm.Login) ? _c('a', {
    staticClass: "bt",
    attrs: {
      "href": "login.html"
    }
  }, [_vm._v("登录")]) : _vm._e(), _vm._v(" "), (!_vm.Login) ? _c('a', {
    staticClass: "bt",
    attrs: {
      "href": "register.html"
    }
  }, [_vm._v("注册")]) : _vm._e(), _vm._v(" "), (_vm.Login) ? _c('div', {
    staticClass: "personal_wrapper",
    on: {
      "mouseover": _vm.over,
      "mouseout": _vm.out
    }
  }, [_c('a', {
    staticClass: "bt",
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_vm._v(_vm._s(_vm.username))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.personalShow),
      expression: "personalShow"
    }],
    staticClass: "personal_wrapper_box"
  }, [_c('ul', {
    staticClass: "personal_wrapper_box_list"
  }, [_vm._m(1), _vm._v(" "), (_vm.loginway == 'staff') ? _c('li', [_c('a', {
    attrs: {
      "href": "backstage.html"
    }
  }, [_vm._v("后台中心")])]) : _vm._e(), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": _vm.exit
    }
  }, [_vm._v("退出")])])])])]) : _vm._e()])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "logo"
  }, [_c('img', {
    staticClass: "logo_img",
    attrs: {
      "src": __webpack_require__(37),
      "alt": "logo图片"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "logo_text"
  }, [_vm._v("饮料随搭")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('a', [_vm._v("个人中心")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-02c13615", module.exports)
  }
}

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "content"
    }
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "content_left"
  }, [_c('div', {
    staticClass: "ingredients",
    on: {
      "click": _vm.ing_click
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "ingredients_items"
  }, [_vm._l((_vm.ingredients), function(item) {
    return [_c('div', {
      staticClass: "item",
      class: item.className
    }, [_c('img', {
      attrs: {
        "src": '../img/' + item.pic,
        "alt": item.name
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "item_name"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('p', {
      staticClass: "item_price"
    }, [_vm._v("价格："), _c('span', {
      staticClass: "price_num"
    }, [_vm._v(_vm._s(item.price))])]), _vm._v(" "), _vm._m(1, true)])]
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "accessories",
    on: {
      "click": _vm.acc_click
    }
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "accessories_items"
  }, [_vm._l((_vm.shopping_list.accessories), function(item) {
    return [_c('div', {
      staticClass: "item",
      class: item.className
    }, [_c('div', {
      staticClass: "item_left"
    }, [_c('img', {
      attrs: {
        "src": '../img/' + item.pic,
        "alt": item.name
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "item_name"
    }, [_vm._v(_vm._s(item.name))])]), _vm._v(" "), _c('div', {
      staticClass: "item_right"
    }, [_c('div', {
      staticClass: "right_content"
    }, [_c('p', {
      staticClass: "item_price"
    }, [_vm._v("价格："), _c('span', {
      staticClass: "num"
    }, [_vm._v(_vm._s(item.price))]), _c('span', [_vm._v("元/份")])]), _vm._v(" "), _c('p', {
      staticClass: "item_num"
    }, [_vm._v("数量："), _c('span', [_vm._v(_vm._s(item.num))])]), _vm._v(" "), _vm._m(3, true), _vm._v(" "), _c('p', {
      staticClass: "totol_price"
    }, [_vm._v("总计："), _c('span', [_vm._v(_vm._s((item.num * item.price).toFixed(1)))])])])])])]
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "content_right"
  }, [_vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "ranking_list"
  }, [_c('p', {
    staticClass: "ranking_list_title"
  }, [_vm._v("月售排行")]), _vm._v(" "), _c('ul', [_vm._l((_vm.ranking_list), function(item, index) {
    return [_c('li', [_c('i', {
      class: [index < 3 ? 'top_3' : 'not_top']
    }, [_vm._v(_vm._s(index + 1))]), _c('span', {
      attrs: {
        "title": item.name
      }
    }, [_vm._v(_vm._s(item.name))]), _c('strong', [_vm._v(_vm._s(item.num))])])]
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "complete_bt",
    on: {
      "click": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_c('div', {
    staticClass: "complete_bt_text",
    on: {
      "click": _vm.complete_bt
    }
  }, [_vm._v("选购完成")]), _vm._v(" "), _c('div', {
    staticClass: "complete_box"
  }, [_c('div', {
    staticClass: "header"
  }, [_vm._m(5), _vm._v(" "), _c('div', {
    staticClass: "clear_goods",
    on: {
      "click": _vm.clear
    }
  }, [_c('i', {
    staticClass: "fa fa-trash"
  }), _vm._v(" "), _c('span', [_vm._v("清空物品")])])]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_vm._m(6), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.has_ingredients),
      expression: "has_ingredients"
    }],
    staticClass: "have_goods"
  }, [_c('div', {
    staticClass: "all_items"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.shopping_list.ingredients.dom),
      expression: "shopping_list.ingredients.dom"
    }],
    staticClass: "selected_items"
  }, [_c('span', {
    staticClass: "selected_items_name"
  }, [_vm._v(_vm._s(_vm.shopping_list.ingredients.name))]), _vm._v(" "), _c('div', {
    staticClass: "selected_items_right"
  }, [_c('span', {
    staticClass: "selected_items_price"
  }, [_vm._v(_vm._s(_vm.shopping_list.ingredients.price))]), _vm._v(" "), _c('div', {
    staticClass: "num_box"
  }, [_c('img', {
    staticClass: "minus_num",
    attrs: {
      "src": '../img/minus.png'
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "selected_items_num"
  }, [_vm._v("1")]), _vm._v(" "), _c('img', {
    staticClass: "add_num",
    attrs: {
      "src": '../img/add.png'
    }
  })])])]), _vm._v(" "), _vm._l((_vm.shopping_list.accessories), function(item) {
    return [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.num != 0),
        expression: "item.num != 0"
      }],
      staticClass: "selected_items"
    }, [_c('span', {
      staticClass: "selected_items_name"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('div', {
      staticClass: "selected_items_right"
    }, [_c('span', {
      staticClass: "selected_items_price"
    }, [_vm._v(_vm._s((item.price * item.num).toFixed(1)))]), _vm._v(" "), _c('div', {
      staticClass: "num_box"
    }, [_c('img', {
      staticClass: "minus_num",
      attrs: {
        "src": '../img/minus.png'
      },
      on: {
        "click": _vm.minus
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "selected_items_num"
    }, [_vm._v(_vm._s(item.num))]), _vm._v(" "), _c('img', {
      staticClass: "add_num",
      attrs: {
        "src": '../img/add.png'
      },
      on: {
        "click": _vm.add
      }
    })])])])]
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "selected_items_totol_price"
  }, [_c('span', {
    staticClass: "confirm_bt",
    attrs: {
      "onselectstart": "return false"
    },
    on: {
      "click": _vm.payment
    }
  }, [_vm._v("确认支付")]), _vm._v("\n\t\t                        总计：\n\t\t                        "), _c('span', {
    staticClass: "price_num"
  }, [_vm._v(_vm._s(_vm.totol_price))])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.has_ingredients),
      expression: "!has_ingredients"
    }],
    staticClass: "not_have"
  }, [_vm._v("\n\t\t                    您尚未选择主料！\n\t\t                ")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "shade"
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "title"
  }, [_vm._v("主料选择"), _c('span', [_vm._v("(最多1种)")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "add_item"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "title"
  }, [_vm._v("辅料选择"), _c('span', [_vm._v("(任意选择)")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "add_sub",
    attrs: {
      "onselectstart": "return false"
    }
  }, [_c('i', {
    staticClass: "fa fa-plus add num_bt"
  }), _vm._v(" "), _c('i', {
    staticClass: " fa fa-minus sub num_bt"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tips"
  }, [_c('p', {
    staticClass: "tips_title"
  }, [_vm._v("选购须知")]), _vm._v(" "), _c('ul', {
    staticClass: "fa-ul"
  }, [_c('li', [_c('i', {
    staticClass: "fa-li fa fa-sun-o fa-spin"
  }), _vm._v("各种配料随您喜好随意搭配,主料最多只可选择"), _c('span', {
    staticClass: "important_word"
  }, [_vm._v("1")]), _vm._v("种，辅料类目数量"), _c('span', {
    staticClass: "important_word"
  }, [_vm._v("任你选择")]), _vm._v("，每份大约为"), _c('span', {
    staticClass: "important_word"
  }, [_vm._v("30ml")]), _vm._v(",每种类目最多可添加"), _c('span', {
    staticClass: "important_word"
  }, [_vm._v("3份")]), _vm._v("。")]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "fa-li fa fa-sun-o fa-spin"
  }), _vm._v("配料进行"), _c('span', {
    staticClass: "important_word"
  }, [_vm._v("消菌")]), _vm._v("冰冻贮藏，可储存"), _c('span', {
    staticClass: "important_word"
  }, [_vm._v("X")]), _vm._v("个月，请放心使用。")]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "fa-li fa fa-sun-o fa-spin"
  }), _vm._v("选购完，请点击选购完成按钮并确认需支付价格，进入支付页面")]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "fa-li fa fa-sun-o fa-spin"
  }), _vm._v("支付完毕，请从"), _c('span', {
    staticClass: "important_word"
  }, [_vm._v("右侧出口处")]), _vm._v("拿取产品，欢迎下次光临。")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header_text"
  }, [_c('span', [_vm._v("|")]), _vm._v("\n\t\t                    购物清单\n\t\t                ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tips"
  }, [_c('i', {
    staticClass: "fa fa-exclamation",
    staticStyle: {
      "color": "red"
    }
  }), _vm._v("\n\t\t                        以下是您的购物清单\n\t\t                ")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b817dbe", module.exports)
  }
}

/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "footer"
    }
  }, [_vm._v("\n\t浙ICP备16039089号\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3ce25bba", module.exports)
  }
}

/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "main-content"
    }
  }, [_c('index-header', {
    attrs: {
      "Login": _vm.Login,
      "phone": _vm.phone,
      "username": _vm.username,
      "loginway": _vm.loginway
    },
    on: {
      "exit": _vm.modify
    }
  }), _vm._v(" "), _c('index-content'), _vm._v(" "), _c('index-footer')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4684ea12", module.exports)
  }
}

/***/ }),

/***/ 4:
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

var listToStyles = __webpack_require__(28)

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

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

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

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(344);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("9423a66a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-02c13615\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index-header.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-02c13615\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index-header.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 41:
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format_time", function() { return format_time; });
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

//格式化时间，变成XXXX-XX-XX的格式
function format_time(time){
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var day = time.getDate();
	if(month < 10){
		month = "0" + month;
	}
	if(day < 10){
		day = "0" + day;
	}
	return year + "-" + month + "-" + day;
}


/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(346);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("77f5c587", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0b817dbe\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index-content.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0b817dbe\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index-content.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(353);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("dcda6e2a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3ce25bba\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index-footer.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3ce25bba\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index-footer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(355);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("60834ed6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4684ea12\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4684ea12\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_resource__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_vue__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__main_vue__);





__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_resource__["a" /* default */]);

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
	el: '#main-content',
	render: cE => cE(__WEBPACK_IMPORTED_MODULE_2__main_vue___default.a)
})

/***/ })

/******/ });