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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* global window, document, require */

	var $ = __webpack_require__(1);
	var template = __webpack_require__(2);
	__webpack_require__(3);

	var css = {
	  'text-align': 'center',
	  position: 'fixed',
	  bottom: 0,
	  right: 0
	};

	function FeedbackWidget(url, target) {
	  this.url = url;
	  this.target = target;
	  $(document).ready(this.init.bind(this));
	}

	FeedbackWidget.prototype.init = function () {
	  var $form = $(template).css(css);
	  $form.appendTo(this.target || document.body);
	  $form.on('click', 'button[value]', this.handleClick.bind(this));
	};

	FeedbackWidget.prototype.handleClick = function(e) {
	  var value = $(e.target).val();
	  this.submit(value);
	};

	FeedbackWidget.prototype.submit = function(upvote) {
	  var data = {
	    url: window.location.href,
	    referer: document.referrer || null,
	    upvote: upvote
	  };

	  var promise = $.ajax({
	    method: 'POST',
	    url: this.url,
	    data: JSON.stringify(data),
	    contentType: 'application/json'
	  });
	  promise.done(this.handleSuccess.bind(this));
	  promise.fail(this.handleError.bind(this));
	};

	FeedbackWidget.prototype.handleSuccess = function(response) {
	  console.log('Submitted feedback');
	};

	FeedbackWidget.prototype.handleError = function() {
	  console.log('Error submitting feedback');
	};

	window.FeedbackWidget = FeedbackWidget;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<div>\n  <h4>How was your experience?</h4>\n  <div>\n    <button type=\"button\" value=\"true\" class=\"usa-button\">Good</button>\n    <button type=\"button\" value=\"false\" class=\"usa-button-secondary\">Bad</button>\n  </div>\n</div>\n";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./uswds.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./uswds.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "html {\n  box-sizing: border-box;\n}\n\n*, *::after, *::before {\n  box-sizing: inherit;\n}\n\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/**\n * Remove default margin.\n */\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n/**\n * Remove the gray background color from active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  box-sizing: content-box;\n  /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n/**\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n\n@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: normal;\n  font-weight: 300;\n  src: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-light-webfont.eot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-light-webfont.woff2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff2\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-light-webfont.woff\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-light-webfont.ttf\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-regular-webfont.eot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-regular-webfont.woff2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff2\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-regular-webfont.woff\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-regular-webfont.ttf\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: italic;\n  font-weight: 400;\n  src: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-italic-webfont.eot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-italic-webfont.woff2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff2\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-italic-webfont.woff\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-italic-webfont.ttf\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: normal;\n  font-weight: 700;\n  src: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-bold-webfont.eot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-bold-webfont.woff2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff2\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-bold-webfont.woff\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/sourcesanspro-bold-webfont.ttf\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Merriweather\";\n  font-style: normal;\n  font-weight: 300;\n  src: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-light-webfont.eot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-light-webfont.woff2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff2\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-light-webfont.woff\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-light-webfont.ttf\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Merriweather\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-regular-webfont.eot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-regular-webfont.woff2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff2\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-regular-webfont.woff\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-regular-webfont.ttf\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Merriweather\";\n  font-style: italic;\n  font-weight: 400;\n  src: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-italic-webfont.eot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-italic-webfont.woff2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff2\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-italic-webfont.woff\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-italic-webfont.ttf\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Merriweather\";\n  font-style: normal;\n  font-weight: 700;\n  src: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-bold-webfont.eot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-bold-webfont.woff2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff2\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-bold-webfont.woff\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"woff\"), url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fonts/merriweather-bold-webfont.ttf\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") format(\"truetype\");\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n}\n\nbody {\n  background-color: #ffffff;\n}\n\n.lt-ie9 * {\n  -webkit-filter: none !important;\n  filter: none !important;\n}\n\n.usa-grid,\n.usa-grid-full {\n  max-width: 1200px;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 1040px;\n}\n\n.usa-grid::after,\n.usa-grid-full::after {\n  clear: both;\n  content: \"\";\n  display: block;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-grid .usa-width-one-whole,\n  .usa-grid-full .usa-width-one-whole {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 100%;\n  }\n  .usa-grid .usa-width-one-whole:last-child,\n  .usa-grid-full .usa-width-one-whole:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-half,\n  .usa-grid-full .usa-width-one-half {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 47.58542%;\n  }\n  .usa-grid .usa-width-one-half:last-child,\n  .usa-grid-full .usa-width-one-half:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-third,\n  .usa-grid-full .usa-width-one-third {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 30.11389%;\n  }\n  .usa-grid .usa-width-one-third:last-child,\n  .usa-grid-full .usa-width-one-third:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-two-thirds,\n  .usa-grid-full .usa-width-two-thirds {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 65.05695%;\n  }\n  .usa-grid .usa-width-two-thirds:last-child,\n  .usa-grid-full .usa-width-two-thirds:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-fourth,\n  .usa-grid-full .usa-width-one-fourth {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 47.58542%;\n  }\n  .usa-grid .usa-width-one-fourth:last-child,\n  .usa-grid-full .usa-width-one-fourth:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-fourth:nth-child(2n),\n  .usa-grid-full .usa-width-one-fourth:nth-child(2n) {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-three-fourths,\n  .usa-grid-full .usa-width-three-fourths {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 100%;\n  }\n  .usa-grid .usa-width-three-fourths:last-child,\n  .usa-grid-full .usa-width-three-fourths:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-sixth,\n  .usa-grid-full .usa-width-one-sixth {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 30.11389%;\n  }\n  .usa-grid .usa-width-one-sixth:last-child,\n  .usa-grid-full .usa-width-one-sixth:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-sixth:nth-child(3n),\n  .usa-grid-full .usa-width-one-sixth:nth-child(3n) {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-five-sixths,\n  .usa-grid-full .usa-width-five-sixths {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 65.05695%;\n  }\n  .usa-grid .usa-width-five-sixths:last-child,\n  .usa-grid-full .usa-width-five-sixths:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-twelfth,\n  .usa-grid-full .usa-width-one-twelfth {\n    float: left;\n    display: block;\n    margin-right: 4.82916%;\n    width: 30.11389%;\n  }\n  .usa-grid .usa-width-one-twelfth:last-child,\n  .usa-grid-full .usa-width-one-twelfth:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-twelfth:nth-child(3n),\n  .usa-grid-full .usa-width-one-twelfth:nth-child(3n) {\n    margin-right: 0;\n  }\n}\n\n@media screen and (min-width: 1201px) {\n  .usa-grid .usa-width-one-whole,\n  .usa-grid-full .usa-width-one-whole {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 100%;\n  }\n  .usa-grid .usa-width-one-whole:last-child,\n  .usa-grid-full .usa-width-one-whole:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-half,\n  .usa-grid-full .usa-width-one-half {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 48.82117%;\n  }\n  .usa-grid .usa-width-one-half:last-child,\n  .usa-grid-full .usa-width-one-half:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-third,\n  .usa-grid-full .usa-width-one-third {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 31.76157%;\n  }\n  .usa-grid .usa-width-one-third:last-child,\n  .usa-grid-full .usa-width-one-third:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-two-thirds,\n  .usa-grid-full .usa-width-two-thirds {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 65.88078%;\n  }\n  .usa-grid .usa-width-two-thirds:last-child,\n  .usa-grid-full .usa-width-two-thirds:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-fourth,\n  .usa-grid-full .usa-width-one-fourth {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 23.23176%;\n  }\n  .usa-grid .usa-width-one-fourth:last-child,\n  .usa-grid-full .usa-width-one-fourth:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-fourth:nth-child(2n),\n  .usa-grid-full .usa-width-one-fourth:nth-child(2n) {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 23.23176%;\n  }\n  .usa-grid .usa-width-one-fourth:nth-child(2n):last-child,\n  .usa-grid-full .usa-width-one-fourth:nth-child(2n):last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-fourth:nth-child(4n),\n  .usa-grid-full .usa-width-one-fourth:nth-child(4n) {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-three-fourths,\n  .usa-grid-full .usa-width-three-fourths {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 74.41059%;\n  }\n  .usa-grid .usa-width-three-fourths:last-child,\n  .usa-grid-full .usa-width-three-fourths:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-sixth,\n  .usa-grid-full .usa-width-one-sixth {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 14.70196%;\n  }\n  .usa-grid .usa-width-one-sixth:last-child,\n  .usa-grid-full .usa-width-one-sixth:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-sixth:nth-child(3n),\n  .usa-grid-full .usa-width-one-sixth:nth-child(3n) {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 14.70196%;\n  }\n  .usa-grid .usa-width-one-sixth:nth-child(3n):last-child,\n  .usa-grid-full .usa-width-one-sixth:nth-child(3n):last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-sixth:nth-child(6n),\n  .usa-grid-full .usa-width-one-sixth:nth-child(6n) {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-five-sixths,\n  .usa-grid-full .usa-width-five-sixths {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 82.94039%;\n  }\n  .usa-grid .usa-width-five-sixths:last-child,\n  .usa-grid-full .usa-width-five-sixths:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-twelfth,\n  .usa-grid-full .usa-width-one-twelfth {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 6.17215%;\n  }\n  .usa-grid .usa-width-one-twelfth:last-child,\n  .usa-grid-full .usa-width-one-twelfth:last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-twelfth:nth-child(3n),\n  .usa-grid-full .usa-width-one-twelfth:nth-child(3n) {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 6.17215%;\n  }\n  .usa-grid .usa-width-one-twelfth:nth-child(3n):last-child,\n  .usa-grid-full .usa-width-one-twelfth:nth-child(3n):last-child {\n    margin-right: 0;\n  }\n  .usa-grid .usa-width-one-twelfth:nth-child(12n),\n  .usa-grid-full .usa-width-one-twelfth:nth-child(12n) {\n    margin-right: 0;\n  }\n}\n\n.usa-grid .usa-end-row,\n.usa-grid-full .usa-end-row {\n  margin-right: 0;\n}\n\n.usa-grid {\n  padding-right: 1.5rem;\n  padding-left: 1.5rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-grid {\n    padding-right: 3rem;\n    padding-left: 3rem;\n  }\n}\n\n.usa-grid-full {\n  padding: 0;\n}\n\n.usa-sr-only {\n  position: absolute;\n  left: -999em;\n}\n\n.usa-button,\n.usa-button-primary,\n.usa-button:visited,\n.usa-button-primary:visited,\nbutton,\n[type=\"button\"],\n[type=\"submit\"],\n[type=\"reset\"],\n[type=\"image\"] {\n  margin-top: 0.5em;\n  margin-right: 0.5em;\n  margin-bottom: 0.5em;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  background-color: #0071bc;\n  border: 0;\n  border-radius: 0.3rem;\n  color: #ffffff;\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1.7rem;\n  font-weight: 700;\n  line-height: 1;\n  outline: none;\n  padding: 1rem 2rem;\n  text-align: center;\n  text-decoration: none;\n  width: 100%;\n  -webkit-font-smoothing: antialiased;\n}\n\n@media screen and (min-width: 481px) {\n  .usa-button,\n  .usa-button-primary,\n  .usa-button:visited,\n  .usa-button-primary:visited,\n  button,\n  [type=\"button\"],\n  [type=\"submit\"],\n  [type=\"reset\"],\n  [type=\"image\"] {\n    width: auto;\n  }\n}\n\n.usa-button:hover, .usa-button.usa-button-hover,\n.usa-button-primary:hover,\n.usa-button-primary.usa-button-hover,\n.usa-button:visited:hover,\n.usa-button:visited.usa-button-hover,\n.usa-button-primary:visited:hover,\n.usa-button-primary:visited.usa-button-hover,\nbutton:hover,\nbutton.usa-button-hover,\n[type=\"button\"]:hover,\n[type=\"button\"].usa-button-hover,\n[type=\"submit\"]:hover,\n[type=\"submit\"].usa-button-hover,\n[type=\"reset\"]:hover,\n[type=\"reset\"].usa-button-hover,\n[type=\"image\"]:hover,\n[type=\"image\"].usa-button-hover {\n  background-color: #205493;\n  border-bottom: 0;\n  color: #ffffff;\n  text-decoration: none;\n}\n\n.usa-button:focus, .usa-button.usa-button-focus,\n.usa-button-primary:focus,\n.usa-button-primary.usa-button-focus,\n.usa-button:visited:focus,\n.usa-button:visited.usa-button-focus,\n.usa-button-primary:visited:focus,\n.usa-button-primary:visited.usa-button-focus,\nbutton:focus,\nbutton.usa-button-focus,\n[type=\"button\"]:focus,\n[type=\"button\"].usa-button-focus,\n[type=\"submit\"]:focus,\n[type=\"submit\"].usa-button-focus,\n[type=\"reset\"]:focus,\n[type=\"reset\"].usa-button-focus,\n[type=\"image\"]:focus,\n[type=\"image\"].usa-button-focus {\n  box-shadow: 0 0 3px #3e94cf, 0 0 7px #3e94cf;\n}\n\n.usa-button:active, .usa-button.usa-button-active,\n.usa-button-primary:active,\n.usa-button-primary.usa-button-active,\n.usa-button:visited:active,\n.usa-button:visited.usa-button-active,\n.usa-button-primary:visited:active,\n.usa-button-primary:visited.usa-button-active,\nbutton:active,\nbutton.usa-button-active,\n[type=\"button\"]:active,\n[type=\"button\"].usa-button-active,\n[type=\"submit\"]:active,\n[type=\"submit\"].usa-button-active,\n[type=\"reset\"]:active,\n[type=\"reset\"].usa-button-active,\n[type=\"image\"]:active,\n[type=\"image\"].usa-button-active {\n  background-color: #112e51;\n}\n\n.usa-button.usa-button-primary-alt,\n.usa-button-primary.usa-button-primary-alt,\n.usa-button:visited.usa-button-primary-alt,\n.usa-button-primary:visited.usa-button-primary-alt,\nbutton.usa-button-primary-alt,\n[type=\"button\"].usa-button-primary-alt,\n[type=\"submit\"].usa-button-primary-alt,\n[type=\"reset\"].usa-button-primary-alt,\n[type=\"image\"].usa-button-primary-alt {\n  background-color: #02bfe7;\n  color: #212121;\n}\n\n.usa-button.usa-button-primary-alt:hover, .usa-button.usa-button-primary-alt.usa-button-hover,\n.usa-button-primary.usa-button-primary-alt:hover,\n.usa-button-primary.usa-button-primary-alt.usa-button-hover,\n.usa-button:visited.usa-button-primary-alt:hover,\n.usa-button:visited.usa-button-primary-alt.usa-button-hover,\n.usa-button-primary:visited.usa-button-primary-alt:hover,\n.usa-button-primary:visited.usa-button-primary-alt.usa-button-hover,\nbutton.usa-button-primary-alt:hover,\nbutton.usa-button-primary-alt.usa-button-hover,\n[type=\"button\"].usa-button-primary-alt:hover,\n[type=\"button\"].usa-button-primary-alt.usa-button-hover,\n[type=\"submit\"].usa-button-primary-alt:hover,\n[type=\"submit\"].usa-button-primary-alt.usa-button-hover,\n[type=\"reset\"].usa-button-primary-alt:hover,\n[type=\"reset\"].usa-button-primary-alt.usa-button-hover,\n[type=\"image\"].usa-button-primary-alt:hover,\n[type=\"image\"].usa-button-primary-alt.usa-button-hover {\n  background-color: #00a6d2;\n}\n\n.usa-button.usa-button-primary-alt:active, .usa-button.usa-button-primary-alt.usa-button-active,\n.usa-button-primary.usa-button-primary-alt:active,\n.usa-button-primary.usa-button-primary-alt.usa-button-active,\n.usa-button:visited.usa-button-primary-alt:active,\n.usa-button:visited.usa-button-primary-alt.usa-button-active,\n.usa-button-primary:visited.usa-button-primary-alt:active,\n.usa-button-primary:visited.usa-button-primary-alt.usa-button-active,\nbutton.usa-button-primary-alt:active,\nbutton.usa-button-primary-alt.usa-button-active,\n[type=\"button\"].usa-button-primary-alt:active,\n[type=\"button\"].usa-button-primary-alt.usa-button-active,\n[type=\"submit\"].usa-button-primary-alt:active,\n[type=\"submit\"].usa-button-primary-alt.usa-button-active,\n[type=\"reset\"].usa-button-primary-alt:active,\n[type=\"reset\"].usa-button-primary-alt.usa-button-active,\n[type=\"image\"].usa-button-primary-alt:active,\n[type=\"image\"].usa-button-primary-alt.usa-button-active {\n  background-color: #046b99;\n  color: #ffffff;\n}\n\n.usa-button.usa-button-secondary,\n.usa-button-primary.usa-button-secondary,\n.usa-button:visited.usa-button-secondary,\n.usa-button-primary:visited.usa-button-secondary,\nbutton.usa-button-secondary,\n[type=\"button\"].usa-button-secondary,\n[type=\"submit\"].usa-button-secondary,\n[type=\"reset\"].usa-button-secondary,\n[type=\"image\"].usa-button-secondary {\n  background-color: #e31c3d;\n}\n\n.usa-button.usa-button-secondary:hover, .usa-button.usa-button-secondary.usa-button-hover,\n.usa-button-primary.usa-button-secondary:hover,\n.usa-button-primary.usa-button-secondary.usa-button-hover,\n.usa-button:visited.usa-button-secondary:hover,\n.usa-button:visited.usa-button-secondary.usa-button-hover,\n.usa-button-primary:visited.usa-button-secondary:hover,\n.usa-button-primary:visited.usa-button-secondary.usa-button-hover,\nbutton.usa-button-secondary:hover,\nbutton.usa-button-secondary.usa-button-hover,\n[type=\"button\"].usa-button-secondary:hover,\n[type=\"button\"].usa-button-secondary.usa-button-hover,\n[type=\"submit\"].usa-button-secondary:hover,\n[type=\"submit\"].usa-button-secondary.usa-button-hover,\n[type=\"reset\"].usa-button-secondary:hover,\n[type=\"reset\"].usa-button-secondary.usa-button-hover,\n[type=\"image\"].usa-button-secondary:hover,\n[type=\"image\"].usa-button-secondary.usa-button-hover {\n  background-color: #cd2026;\n}\n\n.usa-button.usa-button-secondary:active, .usa-button.usa-button-secondary.usa-button-active,\n.usa-button-primary.usa-button-secondary:active,\n.usa-button-primary.usa-button-secondary.usa-button-active,\n.usa-button:visited.usa-button-secondary:active,\n.usa-button:visited.usa-button-secondary.usa-button-active,\n.usa-button-primary:visited.usa-button-secondary:active,\n.usa-button-primary:visited.usa-button-secondary.usa-button-active,\nbutton.usa-button-secondary:active,\nbutton.usa-button-secondary.usa-button-active,\n[type=\"button\"].usa-button-secondary:active,\n[type=\"button\"].usa-button-secondary.usa-button-active,\n[type=\"submit\"].usa-button-secondary:active,\n[type=\"submit\"].usa-button-secondary.usa-button-active,\n[type=\"reset\"].usa-button-secondary:active,\n[type=\"reset\"].usa-button-secondary.usa-button-active,\n[type=\"image\"].usa-button-secondary:active,\n[type=\"image\"].usa-button-secondary.usa-button-active {\n  background-color: #981b1e;\n}\n\n.usa-button.usa-button-gray,\n.usa-button-primary.usa-button-gray,\n.usa-button:visited.usa-button-gray,\n.usa-button-primary:visited.usa-button-gray,\nbutton.usa-button-gray,\n[type=\"button\"].usa-button-gray,\n[type=\"submit\"].usa-button-gray,\n[type=\"reset\"].usa-button-gray,\n[type=\"image\"].usa-button-gray {\n  background-color: #5b616b;\n}\n\n.usa-button.usa-button-gray:hover, .usa-button.usa-button-gray.usa-button-hover,\n.usa-button-primary.usa-button-gray:hover,\n.usa-button-primary.usa-button-gray.usa-button-hover,\n.usa-button:visited.usa-button-gray:hover,\n.usa-button:visited.usa-button-gray.usa-button-hover,\n.usa-button-primary:visited.usa-button-gray:hover,\n.usa-button-primary:visited.usa-button-gray.usa-button-hover,\nbutton.usa-button-gray:hover,\nbutton.usa-button-gray.usa-button-hover,\n[type=\"button\"].usa-button-gray:hover,\n[type=\"button\"].usa-button-gray.usa-button-hover,\n[type=\"submit\"].usa-button-gray:hover,\n[type=\"submit\"].usa-button-gray.usa-button-hover,\n[type=\"reset\"].usa-button-gray:hover,\n[type=\"reset\"].usa-button-gray.usa-button-hover,\n[type=\"image\"].usa-button-gray:hover,\n[type=\"image\"].usa-button-gray.usa-button-hover {\n  background-color: #323a45;\n}\n\n.usa-button.usa-button-gray:active, .usa-button.usa-button-gray.usa-button-active,\n.usa-button-primary.usa-button-gray:active,\n.usa-button-primary.usa-button-gray.usa-button-active,\n.usa-button:visited.usa-button-gray:active,\n.usa-button:visited.usa-button-gray.usa-button-active,\n.usa-button-primary:visited.usa-button-gray:active,\n.usa-button-primary:visited.usa-button-gray.usa-button-active,\nbutton.usa-button-gray:active,\nbutton.usa-button-gray.usa-button-active,\n[type=\"button\"].usa-button-gray:active,\n[type=\"button\"].usa-button-gray.usa-button-active,\n[type=\"submit\"].usa-button-gray:active,\n[type=\"submit\"].usa-button-gray.usa-button-active,\n[type=\"reset\"].usa-button-gray:active,\n[type=\"reset\"].usa-button-gray.usa-button-active,\n[type=\"image\"].usa-button-gray:active,\n[type=\"image\"].usa-button-gray.usa-button-active {\n  background-color: #212121;\n}\n\n.usa-button.usa-button-outline,\n.usa-button-primary.usa-button-outline,\n.usa-button:visited.usa-button-outline,\n.usa-button-primary:visited.usa-button-outline,\nbutton.usa-button-outline,\n[type=\"button\"].usa-button-outline,\n[type=\"submit\"].usa-button-outline,\n[type=\"reset\"].usa-button-outline,\n[type=\"image\"].usa-button-outline {\n  background-color: #ffffff;\n  box-shadow: inset 0 0 0 2px #0071bc;\n  color: #0071bc;\n}\n\n.usa-button.usa-button-outline:hover, .usa-button.usa-button-outline.usa-button-hover,\n.usa-button-primary.usa-button-outline:hover,\n.usa-button-primary.usa-button-outline.usa-button-hover,\n.usa-button:visited.usa-button-outline:hover,\n.usa-button:visited.usa-button-outline.usa-button-hover,\n.usa-button-primary:visited.usa-button-outline:hover,\n.usa-button-primary:visited.usa-button-outline.usa-button-hover,\nbutton.usa-button-outline:hover,\nbutton.usa-button-outline.usa-button-hover,\n[type=\"button\"].usa-button-outline:hover,\n[type=\"button\"].usa-button-outline.usa-button-hover,\n[type=\"submit\"].usa-button-outline:hover,\n[type=\"submit\"].usa-button-outline.usa-button-hover,\n[type=\"reset\"].usa-button-outline:hover,\n[type=\"reset\"].usa-button-outline.usa-button-hover,\n[type=\"image\"].usa-button-outline:hover,\n[type=\"image\"].usa-button-outline.usa-button-hover {\n  box-shadow: inset 0 0 0 2px #205493;\n  color: #205493;\n}\n\n.usa-button.usa-button-outline:active, .usa-button.usa-button-outline.usa-button-active,\n.usa-button-primary.usa-button-outline:active,\n.usa-button-primary.usa-button-outline.usa-button-active,\n.usa-button:visited.usa-button-outline:active,\n.usa-button:visited.usa-button-outline.usa-button-active,\n.usa-button-primary:visited.usa-button-outline:active,\n.usa-button-primary:visited.usa-button-outline.usa-button-active,\nbutton.usa-button-outline:active,\nbutton.usa-button-outline.usa-button-active,\n[type=\"button\"].usa-button-outline:active,\n[type=\"button\"].usa-button-outline.usa-button-active,\n[type=\"submit\"].usa-button-outline:active,\n[type=\"submit\"].usa-button-outline.usa-button-active,\n[type=\"reset\"].usa-button-outline:active,\n[type=\"reset\"].usa-button-outline.usa-button-active,\n[type=\"image\"].usa-button-outline:active,\n[type=\"image\"].usa-button-outline.usa-button-active {\n  box-shadow: inset 0 0 0 2px #112e51;\n  color: #112e51;\n}\n\n.usa-button.usa-button-outline:focus, .usa-button.usa-button-outline.usa-button-focus,\n.usa-button-primary.usa-button-outline:focus,\n.usa-button-primary.usa-button-outline.usa-button-focus,\n.usa-button:visited.usa-button-outline:focus,\n.usa-button:visited.usa-button-outline.usa-button-focus,\n.usa-button-primary:visited.usa-button-outline:focus,\n.usa-button-primary:visited.usa-button-outline.usa-button-focus,\nbutton.usa-button-outline:focus,\nbutton.usa-button-outline.usa-button-focus,\n[type=\"button\"].usa-button-outline:focus,\n[type=\"button\"].usa-button-outline.usa-button-focus,\n[type=\"submit\"].usa-button-outline:focus,\n[type=\"submit\"].usa-button-outline.usa-button-focus,\n[type=\"reset\"].usa-button-outline:focus,\n[type=\"reset\"].usa-button-outline.usa-button-focus,\n[type=\"image\"].usa-button-outline:focus,\n[type=\"image\"].usa-button-outline.usa-button-focus {\n  box-shadow: inset 0 0 0 2px #112e51, 0 0 3px #3e94cf, 0 0 7px #3e94cf;\n}\n\n.usa-button.usa-button-outline-inverse,\n.usa-button-primary.usa-button-outline-inverse,\n.usa-button:visited.usa-button-outline-inverse,\n.usa-button-primary:visited.usa-button-outline-inverse,\nbutton.usa-button-outline-inverse,\n[type=\"button\"].usa-button-outline-inverse,\n[type=\"submit\"].usa-button-outline-inverse,\n[type=\"reset\"].usa-button-outline-inverse,\n[type=\"image\"].usa-button-outline-inverse {\n  background: transparent;\n  box-shadow: inset 0 0 0 2px #ffffff;\n  color: #ffffff;\n}\n\n.usa-button.usa-button-outline-inverse:hover, .usa-button.usa-button-outline-inverse.usa-button-hover,\n.usa-button-primary.usa-button-outline-inverse:hover,\n.usa-button-primary.usa-button-outline-inverse.usa-button-hover,\n.usa-button:visited.usa-button-outline-inverse:hover,\n.usa-button:visited.usa-button-outline-inverse.usa-button-hover,\n.usa-button-primary:visited.usa-button-outline-inverse:hover,\n.usa-button-primary:visited.usa-button-outline-inverse.usa-button-hover,\nbutton.usa-button-outline-inverse:hover,\nbutton.usa-button-outline-inverse.usa-button-hover,\n[type=\"button\"].usa-button-outline-inverse:hover,\n[type=\"button\"].usa-button-outline-inverse.usa-button-hover,\n[type=\"submit\"].usa-button-outline-inverse:hover,\n[type=\"submit\"].usa-button-outline-inverse.usa-button-hover,\n[type=\"reset\"].usa-button-outline-inverse:hover,\n[type=\"reset\"].usa-button-outline-inverse.usa-button-hover,\n[type=\"image\"].usa-button-outline-inverse:hover,\n[type=\"image\"].usa-button-outline-inverse.usa-button-hover {\n  box-shadow: inset 0 0 0 2px #d6d7d9;\n  color: #d6d7d9;\n}\n\n.usa-button.usa-button-outline-inverse:active, .usa-button.usa-button-outline-inverse.usa-button-active,\n.usa-button-primary.usa-button-outline-inverse:active,\n.usa-button-primary.usa-button-outline-inverse.usa-button-active,\n.usa-button:visited.usa-button-outline-inverse:active,\n.usa-button:visited.usa-button-outline-inverse.usa-button-active,\n.usa-button-primary:visited.usa-button-outline-inverse:active,\n.usa-button-primary:visited.usa-button-outline-inverse.usa-button-active,\nbutton.usa-button-outline-inverse:active,\nbutton.usa-button-outline-inverse.usa-button-active,\n[type=\"button\"].usa-button-outline-inverse:active,\n[type=\"button\"].usa-button-outline-inverse.usa-button-active,\n[type=\"submit\"].usa-button-outline-inverse:active,\n[type=\"submit\"].usa-button-outline-inverse.usa-button-active,\n[type=\"reset\"].usa-button-outline-inverse:active,\n[type=\"reset\"].usa-button-outline-inverse.usa-button-active,\n[type=\"image\"].usa-button-outline-inverse:active,\n[type=\"image\"].usa-button-outline-inverse.usa-button-active {\n  box-shadow: inset 0 0 0 2px #aeb0b5;\n  color: #d6d7d9;\n}\n\n.usa-button.usa-button-outline-inverse:focus, .usa-button.usa-button-outline-inverse.usa-button-focus,\n.usa-button-primary.usa-button-outline-inverse:focus,\n.usa-button-primary.usa-button-outline-inverse.usa-button-focus,\n.usa-button:visited.usa-button-outline-inverse:focus,\n.usa-button:visited.usa-button-outline-inverse.usa-button-focus,\n.usa-button-primary:visited.usa-button-outline-inverse:focus,\n.usa-button-primary:visited.usa-button-outline-inverse.usa-button-focus,\nbutton.usa-button-outline-inverse:focus,\nbutton.usa-button-outline-inverse.usa-button-focus,\n[type=\"button\"].usa-button-outline-inverse:focus,\n[type=\"button\"].usa-button-outline-inverse.usa-button-focus,\n[type=\"submit\"].usa-button-outline-inverse:focus,\n[type=\"submit\"].usa-button-outline-inverse.usa-button-focus,\n[type=\"reset\"].usa-button-outline-inverse:focus,\n[type=\"reset\"].usa-button-outline-inverse.usa-button-focus,\n[type=\"image\"].usa-button-outline-inverse:focus,\n[type=\"image\"].usa-button-outline-inverse.usa-button-focus {\n  box-shadow: inset 0 0 0 2px #aeb0b5, 0 0 3px #3e94cf, 0 0 7px #3e94cf;\n}\n\n.usa-button.usa-button-big,\n.usa-button-primary.usa-button-big,\n.usa-button:visited.usa-button-big,\n.usa-button-primary:visited.usa-button-big,\nbutton.usa-button-big,\n[type=\"button\"].usa-button-big,\n[type=\"submit\"].usa-button-big,\n[type=\"reset\"].usa-button-big,\n[type=\"image\"].usa-button-big {\n  font-size: 1.9rem;\n  padding: 1.5rem 3rem;\n}\n\n[type=\"submit\"]:disabled,\n.usa-button-disabled {\n  background-color: #d6d7d9;\n  color: #323a45;\n  pointer-events: none;\n}\n\n[type=\"submit\"]:disabled:hover, [type=\"submit\"]:disabled.usa-button-hover, [type=\"submit\"]:disabled:active, [type=\"submit\"]:disabled.usa-button-active, [type=\"submit\"]:disabled:focus,\n.usa-button-disabled:hover,\n.usa-button-disabled.usa-button-hover,\n.usa-button-disabled:active,\n.usa-button-disabled.usa-button-active,\n.usa-button-disabled:focus {\n  background-color: #d6d7d9;\n  border: 0;\n  box-shadow: none;\n  color: #323a45;\n}\n\n.usa-button-unstyled {\n  background: none;\n  border: 0;\n  border-radius: 0;\n  outline: 0;\n  padding: 0;\n  text-align: left;\n  -webkit-font-smoothing: auto;\n}\n\n.usa-button-unstyled:focus, .usa-button-unstyled:hover {\n  box-shadow: initial;\n}\n\nimg {\n  max-width: 100%;\n}\n\n.media_link {\n  display: inline-block;\n  line-height: 0;\n}\n\ninput,\ninput[type=\"text\"],\ninput[type=\"email\"],\ninput[type=\"password\"],\ninput[type=\"url\"],\ninput[type=\"tel\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"file\"],\ninput[type=\"date\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"],\ninput[type=\"time\"],\ninput[type=\"week\"],\ntextarea,\nselect {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  border: 1px solid #5b616b;\n  border-radius: 0;\n  box-sizing: border-box;\n  color: #212121;\n  display: block;\n  font-size: 1.7rem;\n  height: 4.4rem;\n  line-height: 1.3;\n  margin: 0.2em 0;\n  max-width: 46rem;\n  outline: none;\n  padding: 1rem 0.7em;\n  width: 100%;\n}\n\ninput:focus, input.usa-input-focus,\ninput[type=\"text\"]:focus,\ninput[type=\"text\"].usa-input-focus,\ninput[type=\"email\"]:focus,\ninput[type=\"email\"].usa-input-focus,\ninput[type=\"password\"]:focus,\ninput[type=\"password\"].usa-input-focus,\ninput[type=\"url\"]:focus,\ninput[type=\"url\"].usa-input-focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"tel\"].usa-input-focus,\ninput[type=\"number\"]:focus,\ninput[type=\"number\"].usa-input-focus,\ninput[type=\"search\"]:focus,\ninput[type=\"search\"].usa-input-focus,\ninput[type=\"file\"]:focus,\ninput[type=\"file\"].usa-input-focus,\ninput[type=\"date\"]:focus,\ninput[type=\"date\"].usa-input-focus,\ninput[type=\"datetime-local\"]:focus,\ninput[type=\"datetime-local\"].usa-input-focus,\ninput[type=\"month\"]:focus,\ninput[type=\"month\"].usa-input-focus,\ninput[type=\"time\"]:focus,\ninput[type=\"time\"].usa-input-focus,\ninput[type=\"week\"]:focus,\ninput[type=\"week\"].usa-input-focus,\ntextarea:focus,\ntextarea.usa-input-focus,\nselect:focus,\nselect.usa-input-focus {\n  box-shadow: 0 0 3px #3e94cf, 0 0 7px #3e94cf;\n}\n\ninput.usa-input-success,\ninput[type=\"text\"].usa-input-success,\ninput[type=\"email\"].usa-input-success,\ninput[type=\"password\"].usa-input-success,\ninput[type=\"url\"].usa-input-success,\ninput[type=\"tel\"].usa-input-success,\ninput[type=\"number\"].usa-input-success,\ninput[type=\"search\"].usa-input-success,\ninput[type=\"file\"].usa-input-success,\ninput[type=\"date\"].usa-input-success,\ninput[type=\"datetime-local\"].usa-input-success,\ninput[type=\"month\"].usa-input-success,\ninput[type=\"time\"].usa-input-success,\ninput[type=\"week\"].usa-input-success,\ntextarea.usa-input-success,\nselect.usa-input-success {\n  border: 3px solid #4aa564;\n}\n\n.usa-input-error {\n  border-left: 4px solid #cd2026;\n  margin-top: 3rem;\n  padding-bottom: 0.8rem;\n  padding-left: 1.5rem;\n  padding-top: 0.8rem;\n  position: relative;\n  right: 1.9rem;\n}\n\n.usa-input-error input,\n.usa-input-error textarea,\n.usa-input-error select {\n  border: 3px solid #cd2026;\n  width: calc(100% + 1.9rem);\n}\n\n.usa-input-error label {\n  margin-top: 0;\n}\n\n.usa-input-error .usa-input-inline {\n  border: 1px solid #5b616b;\n  width: inherit;\n}\n\n.usa-input-error .usa-input-inline-error {\n  border: 3px solid #cd2026;\n}\n\n.usa-input-error-label {\n  display: block;\n  font-size: 1.7rem;\n  font-weight: 700;\n}\n\n.usa-input-error-message {\n  color: #cd2026;\n  display: block;\n  font-size: 1.7rem;\n  font-weight: 700;\n  padding-bottom: 3px;\n  padding-top: 3px;\n}\n\nlabel {\n  display: block;\n  margin-top: 3rem;\n  max-width: 46rem;\n}\n\ntextarea {\n  height: 16rem;\n}\n\nselect {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n  background-color: #ffffff;\n  background-image: url(" + __webpack_require__(38) + ");\n  background-image: url(" + __webpack_require__(39) + ");\n  background-position: right 1.3rem center;\n  background-repeat: no-repeat;\n  background-size: 1.3rem;\n}\n\nlegend {\n  font-size: 3rem;\n  font-weight: 700;\n}\n\n.usa-fieldset-inputs label {\n  margin-top: 0;\n}\n\n.usa-form-hint {\n  color: #757575;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  margin-bottom: 0;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  margin-left: -2rem;\n  opacity: 0;\n  position: absolute;\n}\n\n.lt-ie9 input[type=\"checkbox\"], .lt-ie9\ninput[type=\"radio\"] {\n  border: 0;\n  float: left;\n  margin: 0.4em 0.4em 0 0;\n  position: static;\n  width: auto;\n}\n\ninput[type=\"checkbox\"] + label,\ninput[type=\"radio\"] + label {\n  cursor: pointer;\n  font-weight: 400;\n  margin-bottom: 0.5em;\n}\n\ninput[type=\"checkbox\"] + label::before,\ninput[type=\"radio\"] + label::before {\n  background: #ffffff;\n  border-radius: 0.3rem;\n  box-shadow: 0 0 0 1px #757575;\n  content: '\\A0';\n  display: inline-block;\n  height: 1.8rem;\n  line-height: 1.8rem;\n  margin-right: 0.6em;\n  text-indent: 0.15em;\n  vertical-align: middle\\0;\n  width: 1.8rem;\n}\n\ninput[type=\"radio\"] + label::before {\n  box-shadow: 0 0 0 2px #ffffff, 0 0 0 3px #757575;\n  height: 1.6rem;\n  line-height: 1.6rem;\n  width: 1.6rem;\n  border-radius: 100%;\n}\n\ninput[type=\"checkbox\"]:checked + label::before,\ninput[type=\"radio\"]:checked + label::before {\n  background-color: #0071bc;\n  box-shadow: 0 0 0 1px #0071bc;\n}\n\ninput[type=\"radio\"]:checked + label::before {\n  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #0071bc;\n}\n\ninput[type=\"radio\"]:focus + label::before {\n  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #0071bc, 0 0 3px 4px #3e94cf, 0 0 7px 4px #3e94cf;\n}\n\ninput[type=\"checkbox\"]:checked + label::before {\n  background-image: url(" + __webpack_require__(40) + ");\n  background-image: url(" + __webpack_require__(41) + ");\n  background-position: 50%;\n  background-repeat: no-repeat;\n}\n\ninput[type=\"checkbox\"]:focus + label::before {\n  box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px #0071bc;\n}\n\ninput[type=\"checkbox\"]:disabled + label {\n  color: #5b616b;\n}\n\ninput[type=\"checkbox\"]:disabled + label::before,\ninput[type=\"radio\"]:disabled + label::before {\n  background: #d6d7d9;\n  box-shadow: 0 0 0 1px #aeb0b5;\n  cursor: not-allowed;\n}\n\ninput[type=range] {\n  -webkit-appearance: none;\n  border: none;\n  padding-left: 0;\n  width: 100%;\n}\n\ninput[type=range]:focus {\n  box-shadow: none;\n  outline: none;\n}\n\ninput[type=range]::-webkit-slider-runnable-track {\n  background: #aeb0b5;\n  border: 1px solid #757575;\n  cursor: pointer;\n  height: 1.2rem;\n  width: 100%;\n}\n\ninput[type=range]::-moz-range-track {\n  background: #0071bc;\n  border: 1px solid #757575;\n  cursor: pointer;\n  height: 1.2rem;\n  width: 100%;\n}\n\ninput[type=range]::-ms-track {\n  background: transparent;\n  color: transparent;\n  cursor: pointer;\n  height: 1.2rem;\n  width: 100%;\n}\n\ninput[type=range]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  border: 1px solid #757575;\n  height: 2.2rem;\n  border-radius: 1.5rem;\n  background: #f1f1f1;\n  cursor: pointer;\n  margin-top: -.65rem;\n  width: 2.2rem;\n}\n\ninput[type=range]::-moz-range-thumb {\n  background: #f1f1f1;\n  border: 1px solid #757575;\n  border-radius: 1.5rem;\n  cursor: pointer;\n  height: 2.2rem;\n  width: 2.2rem;\n}\n\ninput[type=range]::-ms-thumb {\n  background: #f1f1f1;\n  border: 1px solid #757575;\n  border-radius: 1.5rem;\n  cursor: pointer;\n  height: 2.2rem;\n  width: 2.2rem;\n}\n\ninput[type=range]::-ms-fill-lower {\n  background: #aeb0b5;\n  border: 1px solid #757575;\n  border-radius: 2rem;\n}\n\ninput[type=range]::-ms-fill-upper {\n  background: #aeb0b5;\n  border: 1px solid #757575;\n  border-radius: 2rem;\n}\n\ninput[type=range]:focus::-webkit-slider-thumb {\n  border: 2px solid #3e94cf;\n}\n\ninput[type=range]:focus::-moz-range-thumb {\n  border: 2px solid #3e94cf;\n}\n\ninput[type=range]:focus::-ms-thumb {\n  border: 2px solid #3e94cf;\n}\n\n.usa-date-of-birth label {\n  margin-top: 0;\n}\n\n.usa-date-of-birth input[type=number]::-webkit-inner-spin-button,\n.usa-date-of-birth input[type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  appearance: none;\n  margin: 0;\n}\n\n.usa-date-of-birth input[type=number] {\n  -moz-appearance: textfield;\n}\n\n.usa-form-group-day,\n.usa-form-group-month,\n.usa-form-group-year {\n  clear: none;\n  float: left;\n  margin-right: 1.5rem;\n  width: 5rem;\n}\n\n.usa-form-group-year {\n  width: 7rem;\n}\n\n.usa-label, .usa-label-big {\n  background-color: #0071bc;\n  border-radius: 0.3rem;\n  color: #ffffff;\n  font-size: 1.5rem;\n  margin-right: 0.5rem;\n  padding: 0.1rem 0.7rem;\n  text-transform: uppercase;\n}\n\n.usa-label:only-of-type, .usa-label-big:only-of-type {\n  margin-right: 0;\n}\n\n.usa-label-big {\n  font-size: 1.7rem;\n  padding-left: 0.9rem;\n  padding-right: 0.9rem;\n}\n\nul,\nol {\n  margin-top: 1em;\n  margin-bottom: 1em;\n  padding-left: 1.94em;\n}\n\nli {\n  line-height: 1.5;\n  margin-bottom: 0.5em;\n}\n\nli:last-child {\n  margin-bottom: 0;\n}\n\nh1 + ul,\nh1 + ol,\nh2 + ul,\nh2 + ol,\nh3 + ul,\nh3 + ol,\nh4 + ul,\nh4 + ol,\nh5 + ul,\nh5 + ol,\nh6 + ul,\nh6 + ol,\np + ul,\np + ol {\n  margin-top: 0;\n}\n\n.usa-unstyled-list {\n  margin-top: 0;\n  margin-bottom: 0;\n  list-style-type: none;\n  padding-left: 0;\n}\n\n.usa-unstyled-list > li {\n  margin-bottom: 0;\n}\n\ntable {\n  border-spacing: 0;\n  margin: 2em 0;\n  min-width: 100%;\n}\n\ntable thead th {\n  background-color: #f1f1f1;\n}\n\ntable th {\n  text-align: left;\n}\n\ntable tbody th {\n  font-weight: 400;\n}\n\ntable th,\ntable td {\n  background-color: #ffffff;\n  border: 1px solid #5b616b;\n  padding: 1.5rem;\n}\n\n.usa-table-borderless thead tr {\n  background-color: transparent;\n}\n\n.usa-table-borderless thead th {\n  border-top: 0;\n}\n\n.usa-table-borderless th,\n.usa-table-borderless td {\n  border-left: 0;\n  border-right: 0;\n}\n\nhtml {\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 10px;\n}\n\nbody {\n  font-size: 1.7rem;\n}\n\np {\n  line-height: 1.5;\n  margin-bottom: 1em;\n  margin-top: 1em;\n}\n\na {\n  color: #0071bc;\n  text-decoration: underline;\n}\n\na:hover, a:active {\n  color: #205493;\n}\n\na:visited {\n  color: #4c2c92;\n}\n\na:focus {\n  box-shadow: 0 0 3px #3e94cf, 0 0 7px #3e94cf;\n  outline: 0;\n}\n\n.usa-external_link::after {\n  background: url(" + __webpack_require__(42) + ") no-repeat 0 0;\n  background: url(" + __webpack_require__(43) + ") no-repeat 0 0;\n  background-size: 100%;\n  content: '';\n  display: inline-block;\n  height: 0.65em;\n  margin-bottom: -1px;\n  margin-left: 4px;\n  width: 0.65em;\n}\n\n.usa-external_link:hover::after {\n  background-image: url(" + __webpack_require__(44) + ");\n  background-image: url(" + __webpack_require__(45) + ");\n}\n\n.usa-external_link-alt::after {\n  background: url(" + __webpack_require__(46) + ") no-repeat 0 0;\n  background: url(" + __webpack_require__(47) + ") no-repeat 0 0;\n  background-size: 100%;\n  content: '';\n  display: inline-block;\n  height: 0.65em;\n  margin-bottom: -1px;\n  margin-left: 4px;\n  width: 0.65em;\n}\n\n.usa-external_link-alt:hover::after {\n  background-image: url(" + __webpack_require__(48) + ");\n  background-image: url(" + __webpack_require__(49) + ");\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  clear: both;\n  font-family: \"Merriweather\", \"Georgia\", \"Cambria\", \"Times New Roman\", \"Times\", serif;\n  line-height: 1.3;\n  margin-bottom: .5em;\n  margin-top: 1.5em;\n}\n\nh1 {\n  font-size: 4rem;\n  font-weight: 700;\n}\n\nh2 {\n  font-size: 3rem;\n  font-weight: 700;\n}\n\nh3 {\n  font-size: 2rem;\n  font-weight: 700;\n}\n\nh4 {\n  font-size: 1.7rem;\n  font-weight: 700;\n}\n\nh5 {\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n\nh6 {\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1.3rem;\n  font-weight: 400;\n  text-transform: uppercase;\n}\n\ncite,\nvar,\naddress,\ndfn {\n  font-style: normal;\n}\n\n.usa-content p:not(.usa-font-lead) {\n  max-width: 53rem;\n}\n\n.usa-content-list {\n  max-width: 53rem;\n}\n\n.usa-sans p,\n.usa-sans a,\n.usa-sans li,\n.usa-sans span {\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n}\n\n.usa-sans a {\n  border-bottom: none;\n  font-weight: 700;\n}\n\n.usa-serif p,\n.usa-serif a,\n.usa-serif li,\n.usa-serif span {\n  font-family: \"Merriweather\", \"Georgia\", \"Cambria\", \"Times New Roman\", \"Times\", serif;\n}\n\n.usa-display {\n  font-size: 2rem;\n  font-weight: 700;\n  margin-bottom: 0;\n}\n\n@media screen and (min-width: 481px) {\n  .usa-display {\n    font-size: 4rem;\n    font-weight: 700;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-display {\n    font-size: 5.2rem;\n    font-weight: 700;\n  }\n}\n\n.usa-font-lead {\n  font-family: \"Merriweather\", \"Georgia\", \"Cambria\", \"Times New Roman\", \"Times\", serif;\n  font-size: 2rem;\n  line-height: 1.7;\n  max-width: 77rem;\n}\n\n.usa-image-block {\n  position: relative;\n}\n\n.usa-image-text-block {\n  color: #ffffff;\n  left: 0;\n  margin-left: 8%;\n  position: absolute;\n  top: 0;\n}\n\n.usa-image-text {\n  margin-top: 0;\n}\n\n.usa-drop_text {\n  margin-bottom: 0;\n}\n\n.usa-background-dark {\n  background-color: #323a45;\n}\n\n.usa-background-dark p,\n.usa-background-dark span {\n  color: #ffffff;\n}\n\n.usa-background-dark a {\n  color: #d6d7d9;\n}\n\n.usa-background-dark a:hover {\n  color: #ffffff;\n}\n\n.usa-text-small {\n  font-size: 1.3rem;\n  margin-top: 0;\n}\n\n.usa-accordion,\n.usa-accordion-bordered {\n  margin-top: 0;\n  margin-bottom: 0;\n  list-style-type: none;\n  padding-left: 0;\n  color: #212121;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n}\n\n.usa-accordion > li,\n.usa-accordion-bordered > li {\n  margin-bottom: 0;\n}\n\n.usa-accordion + .usa-accordion,\n.usa-accordion + .usa-accordion-bordered,\n.usa-accordion-bordered + .usa-accordion,\n.usa-accordion-bordered + .usa-accordion-bordered {\n  margin-top: 1rem;\n}\n\n.usa-accordion > ul,\n.usa-accordion-bordered > ul {\n  margin-top: 0;\n  margin-bottom: 0;\n  list-style-type: none;\n  padding-left: 0;\n  color: #212121;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n}\n\n.usa-accordion > ul > li,\n.usa-accordion-bordered > ul > li {\n  margin-bottom: 0;\n}\n\n.usa-accordion > ul > li,\n.usa-accordion-bordered > ul > li {\n  background-color: #f1f1f1;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  list-style: none;\n  margin-bottom: 6px;\n  width: 100%;\n}\n\n.usa-accordion > ul button,\n.usa-accordion-bordered > ul button {\n  background: none;\n  border: 0;\n  border-radius: 0;\n  outline: 0;\n  padding: 0;\n  text-align: left;\n  -webkit-font-smoothing: auto;\n  background-color: #f1f1f1;\n  background-image: url(" + __webpack_require__(50) + ");\n  background-image: url(" + __webpack_require__(51) + ");\n  background-position: right 3rem center;\n  background-repeat: no-repeat;\n  background-size: 13px;\n  color: #212121;\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  margin: 0;\n  padding: 1.5rem 5.5rem 1.5rem 3rem;\n  width: 100%;\n}\n\n.usa-accordion > ul button:focus, .usa-accordion > ul button:hover,\n.usa-accordion-bordered > ul button:focus,\n.usa-accordion-bordered > ul button:hover {\n  box-shadow: initial;\n}\n\n.usa-accordion > ul button:focus,\n.usa-accordion-bordered > ul button:focus {\n  box-shadow: 0 0 3px #3e94cf, 0 0 7px #3e94cf;\n}\n\n.usa-accordion > ul button:hover,\n.usa-accordion-bordered > ul button:hover {\n  background-color: #d6d7d9;\n  color: #212121;\n}\n\n.usa-accordion > ul button h1,\n.usa-accordion > ul button h2,\n.usa-accordion > ul button h3,\n.usa-accordion > ul button h4,\n.usa-accordion > ul button h5,\n.usa-accordion > ul button h6,\n.usa-accordion-bordered > ul button h1,\n.usa-accordion-bordered > ul button h2,\n.usa-accordion-bordered > ul button h3,\n.usa-accordion-bordered > ul button h4,\n.usa-accordion-bordered > ul button h5,\n.usa-accordion-bordered > ul button h6 {\n  margin: 0;\n}\n\n.usa-accordion > ul [aria-expanded=false],\n.usa-accordion-bordered > ul [aria-expanded=false] {\n  background-image: url(" + __webpack_require__(52) + ");\n  background-image: url(" + __webpack_require__(53) + ");\n  background-repeat: no-repeat;\n  background-size: 1.3rem;\n}\n\n.usa-accordion > li,\n.usa-accordion-bordered > li {\n  background-color: #f1f1f1;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  list-style: none;\n  margin-bottom: 6px;\n  width: 100%;\n}\n\n.usa-accordion-bordered .usa-accordion-content {\n  border-bottom: 3px solid #f1f1f1;\n  border-left: 3px solid #f1f1f1;\n  border-right: 3px solid #f1f1f1;\n}\n\n.usa-accordion-content {\n  background-color: #ffffff;\n  display: block;\n  overflow: auto;\n  padding: 3rem;\n}\n\n.usa-accordion-content > *:first-child {\n  margin-top: 0;\n}\n\n.usa-accordion-content > *:last-child {\n  margin-bottom: 0;\n}\n\n.usa-accordion-content[aria-hidden=true] {\n  display: none;\n}\n\n.usa-accordion-button {\n  background: none;\n  border: 0;\n  border-radius: 0;\n  outline: 0;\n  padding: 0;\n  text-align: left;\n  -webkit-font-smoothing: auto;\n  background-color: #f1f1f1;\n  background-image: url(" + __webpack_require__(50) + ");\n  background-image: url(" + __webpack_require__(51) + ");\n  background-position: right 3rem center;\n  background-repeat: no-repeat;\n  background-size: 13px;\n  color: #212121;\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  margin: 0;\n  padding: 1.5rem 5.5rem 1.5rem 3rem;\n  width: 100%;\n}\n\n.usa-accordion-button:focus, .usa-accordion-button:hover {\n  box-shadow: initial;\n}\n\n.usa-accordion-button:focus {\n  box-shadow: 0 0 3px #3e94cf, 0 0 7px #3e94cf;\n}\n\n.usa-accordion-button:hover {\n  background-color: #d6d7d9;\n  color: #212121;\n}\n\n.usa-accordion-button h1,\n.usa-accordion-button h2,\n.usa-accordion-button h3,\n.usa-accordion-button h4,\n.usa-accordion-button h5,\n.usa-accordion-button h6 {\n  margin: 0;\n}\n\n.usa-accordion-button[aria-expanded=false] {\n  background-image: url(" + __webpack_require__(52) + ");\n  background-image: url(" + __webpack_require__(53) + ");\n  background-repeat: no-repeat;\n  background-size: 1.3rem;\n}\n\n.usa-alert {\n  background-color: #f1f1f1;\n  background-position: 1rem 2rem;\n  background-repeat: no-repeat;\n  background-size: 4rem;\n  margin-top: 1.5em;\n  padding: 1em;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-alert {\n    background-size: 5.2rem;\n  }\n}\n\n.usa-alert ul {\n  margin-bottom: 0;\n  margin-top: 1em;\n}\n\n.usa-alert-icon {\n  display: table-cell;\n  padding-right: 1rem;\n}\n\n.usa-alert-body {\n  display: table-cell;\n  padding-left: 3.5rem;\n  vertical-align: top;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-alert-body {\n    padding-left: 5rem;\n  }\n}\n\n.usa-alert-heading {\n  margin-bottom: .3rem;\n  margin-top: 0;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-alert-heading {\n    margin-top: .3rem;\n  }\n}\n\n.usa-alert-text {\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  margin-bottom: 0;\n  margin-top: 0;\n}\n\n.usa-alert-success {\n  background-color: #e7f4e4;\n  background-image: url(" + __webpack_require__(54) + ");\n  background-image: url(" + __webpack_require__(55) + ");\n}\n\n.usa-alert-warning {\n  background-color: #fff1d2;\n  background-image: url(" + __webpack_require__(56) + ");\n  background-image: url(" + __webpack_require__(57) + ");\n}\n\n.usa-alert-error {\n  background-color: #f9dede;\n  background-image: url(" + __webpack_require__(58) + ");\n  background-image: url(" + __webpack_require__(59) + ");\n}\n\n.usa-alert-info {\n  background-color: #e1f3f8;\n  background-image: url(" + __webpack_require__(60) + ");\n  background-image: url(" + __webpack_require__(61) + ");\n}\n\n.usa-alert-no_icon {\n  background-image: none;\n}\n\n.usa-disclaimer {\n  background-color: #f1f1f1;\n  font-size: 1.2rem;\n  height: 2.3rem;\n}\n\n@media screen and (min-width: 481px) {\n  .usa-disclaimer {\n    font-size: 1.3rem;\n  }\n}\n\n.usa-disclaimer-official {\n  display: inline-block;\n}\n\n.usa-disclaimer-official p {\n  margin: 3px 0;\n  display: inline-block;\n}\n\n@media screen and (min-width: 481px) {\n  .usa-disclaimer-official p {\n    margin-top: 2px;\n    margin-bottom: 2px;\n  }\n}\n\n.usa-disclaimer-official img {\n  float: left;\n  margin-right: 0.7rem;\n  margin-top: 1px;\n  width: 2rem;\n}\n\n.usa-disclaimer-stage {\n  margin-top: 2px;\n  margin-bottom: 2px;\n  display: none;\n  float: right;\n}\n\n@media screen and (min-width: 1201px) {\n  .usa-disclaimer-stage {\n    display: block;\n  }\n}\n\n.usa-footer .usa-unstyled-list {\n  display: block;\n}\n\n.usa-footer .usa-footer-primary-link {\n  color: #212121;\n  display: block;\n  font-weight: 700;\n  margin-top: 0;\n  padding-bottom: 2rem;\n  padding-top: 2rem;\n  text-decoration: none;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer .usa-footer-primary-link {\n    border-top: none;\n  }\n}\n\n.usa-footer .usa-footer-primary-link:hover {\n  text-decoration: underline;\n}\n\n.usa-footer a {\n  font-weight: normal;\n}\n\n.usa-footer-return-to-top {\n  padding-bottom: 2rem;\n  padding-top: 2rem;\n}\n\n.usa-footer-primary-section {\n  background-color: #f1f1f1;\n}\n\n.usa-footer-primary-section .usa-footer-primary-content {\n  padding-left: 2.5rem;\n  padding-right: 2.5rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-primary-section .usa-footer-primary-content {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n\n.usa-footer-primary-section .usa-footer-primary-content li {\n  margin-left: 1rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-primary-section .usa-footer-primary-content li {\n    margin-left: 0;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-primary-section .usa-grid-full {\n    padding-left: 2.5rem;\n    padding-right: 2.5rem;\n  }\n}\n\n.usa-footer-medium .usa-footer-primary-section {\n  padding: 0;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-medium .usa-footer-primary-section {\n    padding-bottom: 1rem;\n    padding-top: 1rem;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-medium .usa-footer-nav ul {\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n  }\n}\n\n.usa-footer-slim .usa-footer-nav a {\n  display: block;\n}\n\n.usa-footer-slim .usa-footer-primary-section {\n  padding-bottom: 2rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-slim .usa-footer-primary-section {\n    padding-bottom: 1rem;\n    padding-top: 1rem;\n  }\n  .usa-footer-slim .usa-footer-primary-section .usa-grid-full {\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-slim .usa-footer-contact_info > * {\n    margin: 0;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-slim .usa-footer-contact_info {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-slim .usa-footer-contact_info {\n    width: 100%;\n  }\n}\n\n@media screen and (min-width: 1201px) {\n  .usa-footer-slim .usa-footer-contact_info {\n    float: left;\n    display: block;\n    margin-right: 2.35765%;\n    width: 48.82117%;\n  }\n  .usa-footer-slim .usa-footer-contact_info:last-child {\n    margin-right: 0;\n  }\n}\n\nul.usa-footer-primary-content,\nli.usa-footer-primary-content,\nli.usa-footer-primary-content {\n  border-top: 1px solid #212121;\n}\n\n@media screen and (min-width: 600px) {\n  ul.usa-footer-primary-content,\n  li.usa-footer-primary-content,\n  li.usa-footer-primary-content {\n    border: none;\n  }\n}\n\nul.usa-footer-primary-content:last-child,\nli.usa-footer-primary-content:last-child,\nli.usa-footer-primary-content:last-child {\n  border-bottom: 1px solid #212121;\n}\n\n@media screen and (min-width: 600px) {\n  ul.usa-footer-primary-content:last-child,\n  li.usa-footer-primary-content:last-child,\n  li.usa-footer-primary-content:last-child {\n    border-bottom: none;\n  }\n}\n\n.usa-sign_up-block {\n  padding-bottom: 2rem;\n  padding-left: 2.5rem;\n  padding-right: 2.5rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-sign_up-block {\n    float: right;\n    padding: 0;\n  }\n}\n\n.usa-sign_up-block label:first-of-type {\n  margin-top: 0;\n}\n\n.usa-sign_up-block button {\n  float: none;\n  margin-right: 0;\n  margin-top: 1.5rem;\n}\n\n.usa-sign_up-block input {\n  width: 100%;\n}\n\n.usa-footer-secondary_section {\n  background-color: #d6d7d9;\n  padding-bottom: 3rem;\n  padding-top: 3rem;\n}\n\n.usa-footer-secondary_section a {\n  color: #212121;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-big-secondary-section {\n    padding-top: 5rem;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-contact-links {\n    text-align: right;\n  }\n}\n\n.usa-social-links a {\n  text-decoration: none;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-big .usa-footer-primary-section {\n    padding-bottom: 4rem;\n    padding-top: 3rem;\n  }\n}\n\n.usa-footer-big ul {\n  padding-bottom: 2.5rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-big ul {\n    padding-bottom: 0;\n  }\n}\n\n.usa-footer-big ul:last-child {\n  border-bottom: 1px solid #212121;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-big ul:last-child {\n    border-bottom: none;\n  }\n}\n\n.usa-footer-big ul li {\n  line-height: 2em;\n}\n\n.usa-footer-big ul .usa-footer-primary-link {\n  background-image: url(" + __webpack_require__(38) + ");\n  background-image: url(" + __webpack_require__(39) + ");\n  background-position: 1.5rem center;\n  background-repeat: no-repeat;\n  background-size: 1.3rem;\n  margin-left: 0;\n  padding-left: 3.5rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-big ul .usa-footer-primary-link {\n    background: none;\n    margin-bottom: .8rem;\n    padding-bottom: 0;\n    padding-left: 0;\n  }\n}\n\n.usa-footer-big ul .usa-footer-primary-link > * {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.usa-footer-big ul.hidden {\n  padding-bottom: 0;\n}\n\n.usa-footer-big ul.hidden li {\n  display: none;\n}\n\n.usa-footer-big ul.hidden .usa-footer-primary-link {\n  background-image: url(" + __webpack_require__(62) + ");\n  background-image: url(" + __webpack_require__(63) + ");\n  cursor: pointer;\n  display: block;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-big ul.hidden .usa-footer-primary-link {\n    background: none;\n    padding-left: 0;\n  }\n}\n\n.usa-footer-topic {\n  margin: 0;\n  padding: 2rem 0;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-sign_up-header {\n    margin: 0;\n    padding: 2rem 0;\n  }\n}\n\n.usa-footer-logo-img {\n  max-width: 14rem;\n}\n\n.usa-footer-slim-logo-img {\n  float: left;\n  max-width: 10rem;\n}\n\n.usa-footer-logo-heading {\n  margin-top: 2rem;\n}\n\n.usa-footer-contact-heading {\n  margin-top: 0;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-contact-heading {\n    margin-top: 1rem;\n  }\n}\n\n.usa-footer-slim-logo-heading {\n  display: block;\n  padding-top: 1rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-footer-slim-logo-heading {\n    display: inline-block;\n    padding-left: 1em;\n  }\n}\n\n.usa-social_link, .usa-link-facebook, .usa-link-twitter, .usa-link-youtube, .usa-link-rss {\n  margin: 2.5rem 1rem 1.5rem 0;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: auto 3rem;\n  display: inline-block;\n  height: 4.4rem;\n  left: -1.6rem;\n  position: relative;\n  text-align: center;\n  width: 4.4rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-social_link, .usa-link-facebook, .usa-link-twitter, .usa-link-youtube, .usa-link-rss {\n    margin: 0 0 0 1rem;\n    left: 1.2rem;\n  }\n}\n\n.usa-social_link span, .usa-link-facebook span, .usa-link-twitter span, .usa-link-youtube span, .usa-link-rss span {\n  position: absolute;\n  left: -999em;\n}\n\n.usa-link-facebook {\n  background-image: url(" + __webpack_require__(64) + ");\n  background-image: url(" + __webpack_require__(65) + ");\n}\n\n.usa-link-twitter {\n  background-image: url(" + __webpack_require__(66) + ");\n  background-image: url(" + __webpack_require__(67) + ");\n}\n\n.usa-link-youtube {\n  background-image: url(" + __webpack_require__(68) + ");\n  background-image: url(" + __webpack_require__(69) + ");\n}\n\n.usa-link-rss {\n  background-image: url(" + __webpack_require__(70) + ");\n  background-image: url(" + __webpack_require__(71) + ");\n}\n\nform a {\n  border-bottom: 0;\n}\n\nform [type=\"submit\"],\nform [type=\"submit\"] {\n  display: block;\n  margin-bottom: 1.5em;\n  margin-top: 2.5rem;\n}\n\n@media screen and (min-width: 600px) {\n  form [type=\"submit\"],\n  form [type=\"submit\"] {\n    padding-left: 2.7em;\n    padding-right: 2.7em;\n    width: auto;\n  }\n}\n\nform [name=\"password\"],\nform [name=\"confirmPassword\"] {\n  margin-bottom: 1.1rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-form {\n    max-width: 32rem;\n  }\n}\n\n.usa-form-note {\n  float: right;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1.5rem;\n  margin: 0 0 1.5rem;\n}\n\n.usa-form-note + * {\n  clear: both;\n}\n\nfieldset {\n  border: none;\n  margin: 0;\n  padding: 0;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-form-large {\n    max-width: 46rem;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  input.usa-input-tiny {\n    max-width: 6rem;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  input.usa-input-medium {\n    max-width: 12rem;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-input-grid {\n    padding-right: 5%;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-input-grid:last-of-type {\n    padding-right: 0;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .usa-input-grid-small {\n    float: left;\n    width: 35%;\n  }\n}\n\n.usa-input-grid-small input {\n  margin-bottom: 3rem;\n}\n\n.usa-input-grid-small select {\n  margin-bottom: 3rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-input-grid-medium {\n    float: left;\n    width: 65%;\n  }\n}\n\n.usa-input-grid-medium input {\n  margin-bottom: 3rem;\n}\n\n.usa-input-grid-medium select {\n  margin-bottom: 3rem;\n}\n\n@media screen and (min-width: 600px) {\n  .usa-input-grid-large {\n    float: left;\n    width: 100%;\n  }\n}\n\n.usa-input-grid-large input {\n  margin-bottom: 3rem;\n}\n\n.usa-input-grid-large select {\n  margin-bottom: 3rem;\n}\n\n.usa-additional_text {\n  float: right;\n  font-style: italic;\n  font-weight: normal;\n}\n\n.usa-checklist {\n  list-style: none;\n  margin-left: 0;\n  padding-left: 0;\n}\n\n.usa-checklist li {\n  display: inline-block;\n  list-style: none;\n  margin-bottom: 0;\n  margin-top: 0;\n  padding-left: 3em;\n  text-indent: -2em;\n}\n\n.usa-checklist li::before {\n  content: ' ';\n  display: inline-block;\n  height: .8em;\n  margin-right: .2em;\n  width: 1.8em;\n}\n\n.usa-checklist-checked::before {\n  background-image: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../img/correct9.png\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ");\n  background-image: url(" + __webpack_require__(72) + ");\n  background-position: 100%;\n  background-repeat: no-repeat;\n  background-size: 100%;\n}\n\n.usa-search {\n  max-width: none;\n  position: relative;\n}\n\n.usa-search::after {\n  clear: both;\n  content: \"\";\n  display: block;\n}\n\n.usa-search [type=\"search\"],\n.usa-search .usa-search-input {\n  -webkit-appearance: none;\n  border-bottom-right-radius: 0;\n  border-right: none;\n  border-top-right-radius: 0;\n  float: left;\n  font-size: 1.4rem;\n  height: 3.3rem;\n  margin: 0;\n  padding-bottom: 0;\n  padding-top: 0;\n  width: calc(100% - 4.5rem);\n}\n\n@media screen and (min-width: 481px) {\n  .usa-search [type=\"search\"],\n  .usa-search .usa-search-input {\n    width: calc(100% - 8.5rem);\n  }\n}\n\n.usa-search [type=\"submit\"],\n.usa-search .usa-search-submit {\n  background-image: url(" + __webpack_require__(73) + ");\n  background-image: url(" + __webpack_require__(74) + ");\n  background-position: 50%;\n  background-repeat: no-repeat;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  height: 3.3rem;\n  margin: 0;\n  padding: 0;\n  width: 4.5rem;\n}\n\n@media screen and (min-width: 481px) {\n  .usa-search [type=\"submit\"],\n  .usa-search .usa-search-submit {\n    background-image: none;\n    width: 8.5rem;\n  }\n}\n\n.usa-search .usa-search-submit-text {\n  display: none;\n}\n\n@media screen and (min-width: 481px) {\n  .usa-search .usa-search-submit-text {\n    display: block;\n  }\n}\n\n@media screen and (min-width: 481px) {\n  .usa-search.usa-search-big [type=\"search\"],\n  .usa-search.usa-search-big .usa-search-input {\n    font-size: 1.7rem;\n    height: 4.4rem;\n    width: calc(100% - 11.6rem);\n  }\n  .usa-search.usa-search-big [type=\"submit\"],\n  .usa-search.usa-search-big .usa-search-submit {\n    font-size: 2rem;\n    height: 4.4rem;\n    width: 11.6rem;\n  }\n}\n\n@media screen and (min-width: 481px) {\n  .usa-search.usa-search-small [type=\"search\"],\n  .usa-search.usa-search-small .usa-search-input {\n    width: calc(100% - 4.5rem);\n  }\n  .usa-search.usa-search-small [type=\"submit\"],\n  .usa-search.usa-search-small .usa-search-submit {\n    background-image: url(" + __webpack_require__(73) + ");\n    background-image: url(" + __webpack_require__(74) + ");\n    background-position: 50%;\n    background-repeat: no-repeat;\n    width: 4.5rem;\n  }\n}\n\n.usa-sidenav-list {\n  margin-top: 0;\n  margin-bottom: 0;\n  list-style-type: none;\n  padding-left: 0;\n}\n\n.usa-sidenav-list > li {\n  margin-bottom: 0;\n}\n\n.usa-sidenav-list li {\n  border-top: 1px solid #5b616b;\n  font-size: 1.7rem;\n}\n\n.usa-sidenav-list li:first-child {\n  border-top: none;\n}\n\n.usa-sidenav-list a {\n  border: none;\n  color: #212121;\n  display: block;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  line-height: 1.3;\n  padding: 0.85rem 1rem 0.85rem 1.8rem;\n  text-decoration: none;\n}\n\n.usa-sidenav-list a:hover {\n  background-color: #f1f1f1;\n  color: #0071bc;\n  text-decoration: none;\n}\n\n.usa-sidenav-list a:focus {\n  position: relative;\n  z-index: 1;\n}\n\n.usa-sidenav-list a.usa-current {\n  border-left: 4px solid #0071bc;\n  color: #0071bc;\n  font-weight: 700;\n  padding-left: 1.4rem;\n}\n\n.usa-sidenav-sub_list {\n  margin-top: 0;\n  margin-bottom: 0;\n  list-style-type: none;\n  padding-left: 0;\n  margin: 0;\n  width: 100%;\n}\n\n.usa-sidenav-sub_list > li {\n  margin-bottom: 0;\n}\n\n.usa-sidenav-sub_list li {\n  border: none;\n  font-size: 1.5rem;\n}\n\n.usa-sidenav-sub_list a {\n  padding-left: 2.8rem;\n  line-height: 1.3;\n}\n\n.usa-sidenav-sub_list a:hover, .usa-sidenav-sub_list a.usa-current {\n  border: none;\n  padding-left: 2.8rem;\n}\n\n.usa-sidenav-sub_list .usa-sidenav-sub_list a {\n  padding-left: 3.8rem;\n}\n\n.usa-sidenav-sub_list .usa-sidenav-sub_list a:hover {\n  padding-left: 3.8rem;\n}\n\n.skipnav {\n  background: transparent;\n  color: #212121;\n  left: 0;\n  padding: 1rem 1.5rem;\n  position: absolute;\n  top: -4.2rem;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  z-index: 100;\n}\n\n.skipnav:focus {\n  background: #ffffff;\n  left: 0;\n  outline: 0;\n  position: absolute;\n  top: 0;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n}\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
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
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAAA70lEQVR4AcXPN07AUBAE0LV3DgAtNZlLEFsqjkPs8K3gBGQ6KKlJnePIX/rSoiGnGWfvc7A/TmnO9RNTBZtSvkNezE/Zgk0GpsiELXEyxbf8Bj2ObZEnLolzXcQRer/FhvF8Ew8kLC4Tk2QJl5zoyO6wYrjiScs2igXSELXcnxqe0xNYMlzwuzmoCNc0+WzYHU/avM0skHyf3eFVVPlCx23+yEC6TCpjAgsfGT8sEJfs0mZtDleSuGYd12uWR5oIJreHkWjWvfGWN9i7RLP3iGDvEsHE77/DDtCyB5qolOM6w6YjHcXy0SdSmLOF/XMG8ozGHh3W/IEAAAAASUVORK5CYII="

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDQuOCA0NDQuOCI+PHBhdGggZD0iTTI0OC4xIDM1Mkw0MzQgMTY1LjljNy4yLTYuOSAxMC44LTE1LjQgMTAuOC0yNS43IDAtMTAuMy0zLjYtMTguOC0xMC44LTI1LjdsLTIxLjQtMjEuN2MtNy03LTE1LjYtMTAuNi0yNS43LTEwLjYtOS45IDAtMTguNiAzLjUtMjYgMTAuNkwyMjIuNCAyMzEuNSA4My43IDkyLjhjLTctNy0xNS42LTEwLjYtMjUuNy0xMC42LTkuOSAwLTE4LjYgMy41LTI2IDEwLjZsLTIxLjQgMjEuN2MtNyA3LTEwLjYgMTUuNi0xMC42IDI1LjdzMy41IDE4LjcgMTAuNiAyNS43TDE5Ni40IDM1MmM3LjQgNyAxNi4xIDEwLjYgMjYgMTAuNiAxMC4xIDAgMTguNy0zLjUgMjUuNy0xMC42eiIvPjwvc3ZnPg=="

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAQAAACssQXfAAAAiklEQVR4AT3PNUFGARAA4MO1AFRgQVrgTEgNXBZ0Z0aLQI0XANf594932LlLROjQHgmhM9mVwlhkMJO/4S7noMjghKEIPcmuUNNyGpa8uzUcYdA1qjjJ+ntwY8Q16jiIBCte0fSmUUr2Mio3W/BJqwQt2xHaZFhXhBnPqFr7D6eRKVMereeIv5++AKLreD06aLBkAAAAAElFTkSuQmCC"

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIxNiAxNDYiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xNjguODYgMzcuOTY2bC0xMS4wOC0xMS4wOGMtMS41Mi0xLjUyLTMuMzY3LTIuMjgtNS41NC0yLjI4LTIuMTcyIDAtNC4wMi43Ni01LjU0IDIuMjhMOTMuMjU0IDgwLjQxNCA2OS4zIDU2LjM4Yy0xLjUyLTEuNTIyLTMuMzY3LTIuMjgyLTUuNTQtMi4yODItMi4xNzIgMC00LjAyLjc2LTUuNTQgMi4yOEw0Ny4xNCA2Ny40NmMtMS41MiAxLjUyMi0yLjI4IDMuMzctMi4yOCA1LjU0MiAwIDIuMTcyLjc2IDQuMDIgMi4yOCA1LjU0bDI5LjQ5MyAyOS40OTMgMTEuMDggMTEuMDhjMS41MiAxLjUyIDMuMzY4IDIuMjggNS41NCAyLjI4IDIuMTczIDAgNC4wMi0uNzYgNS41NC0yLjI4bDExLjA4Mi0xMS4wOEwxNjguODYgNDkuMDVjMS41Mi0xLjUyIDIuMjgzLTMuMzcgMi4yODMtNS41NCAwLTIuMTc0LS43Ni00LjAyLTIuMjgtNS41NHoiLz48L3N2Zz4="

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTEuNjI2IiBoZWlnaHQ9IjUxMS42MjciIHZpZXdCb3g9IjAgMCA1MTEuNjI2IDUxMS42MjciPjxnIGZpbGw9IiMwMDcxYmMiPjxwYXRoIGQ9Ik0zOTIuODU3IDI5Mi4zNTRoLTE4LjI3NGMtMi42NyAwLTQuODYuODU1LTYuNTYzIDIuNTczLTEuNzE4IDEuNzA4LTIuNTczIDMuODk3LTIuNTczIDYuNTYzdjkxLjM2YzAgMTIuNTY0LTQuNDcgMjMuMzE2LTEzLjQxNSAzMi4yNjMtOC45NDUgOC45NDUtMTkuNyAxMy40MTQtMzIuMjY0IDEzLjQxNEg4Mi4yMjRjLTEyLjU2MiAwLTIzLjMxNy00LjQ3LTMyLjI2NC0xMy40MTQtOC45NDUtOC45NDYtMTMuNDE3LTE5LjY5OC0xMy40MTctMzIuMjYyVjE1NS4zMWMwLTEyLjU2MiA0LjQ3LTIzLjMxMyAxMy40MTctMzIuMjYgOC45NDctOC45NDYgMTkuNzAyLTEzLjQxNyAzMi4yNjQtMTMuNDE3aDIwMC45OTRjMi42NyAwIDQuODYtLjg2IDYuNTctMi41NyAxLjcxLTEuNzEzIDIuNTY2LTMuOSAyLjU2Ni02LjU2N1Y4Mi4yMmMwLTIuNjYtLjg1NS00Ljg1Mi0yLjU2Ni02LjU2Mi0xLjcxLTEuNzEzLTMuOS0yLjU2OC02LjU3LTIuNTY4SDgyLjIyNGMtMjIuNjQ4IDAtNDIuMDE2IDguMDQyLTU4LjEwMiAyNC4xMjVDOC4wNDIgMTEzLjI5NyAwIDEzMi42NjUgMCAxNTUuMzEzdjIzNy41NDJjMCAyMi42NDcgOC4wNDIgNDIuMDE4IDI0LjEyMyA1OC4wOTUgMTYuMDg2IDE2LjA4NCAzNS40NTQgMjQuMTMgNTguMTAyIDI0LjEzaDIzNy41NDNjMjIuNjQ3IDAgNDIuMDE3LTguMDQ2IDU4LjEtMjQuMTMgMTYuMDg2LTE2LjA3NyAyNC4xMjgtMzUuNDQ3IDI0LjEyOC01OC4wOTV2LTkxLjM1OGMwLTIuNjctLjg1Ni00Ljg2LTIuNTc0LTYuNTctMS43MTMtMS43MTgtMy45MDMtMi41NzMtNi41NjUtMi41NzN6Ii8+PHBhdGggZD0iTTUwNi4yIDQxLjk3Yy0zLjYxOC0zLjYxNi03LjkwNi01LjQyMy0xMi44NS01LjQyM0gzNDcuMTdjLTQuOTQ3IDAtOS4yMzIgMS44MDctMTIuODQ2IDUuNDI0LTMuNjE3IDMuNjE2LTUuNDI4IDcuOS01LjQyOCAxMi44NDhzMS44MSA5LjIzMyA1LjQyOCAxMi44NWw1MC4yNDcgNTAuMjQ4LTE4Ni4xNDYgMTg2LjE1Yy0xLjkwNiAxLjkwNC0yLjg1NiA0LjA5NC0yLjg1NiA2LjU2NCAwIDIuNDguOTUzIDQuNjY4IDIuODU2IDYuNTdsMzIuNTQ4IDMyLjU0NWMxLjkwMyAxLjkwMyA0LjA5MyAyLjg1MiA2LjU2NyAyLjg1MnM0LjY2NC0uOTQ4IDYuNTY2LTIuODUybDE4Ni4xNDgtMTg2LjE0OCA1MC4yNSA1MC4yNDhjMy42MTUgMy42MTcgNy45IDUuNDI2IDEyLjg0OCA1LjQyNnM5LjIzMy0xLjgwOCAxMi44NS01LjQyNWMzLjYxOC0zLjYxNiA1LjQyNS03Ljg5OCA1LjQyNS0xMi44NDdWNTQuODE4YzAtNC45NTItMS44MTQtOS4yMzItNS40MjgtMTIuODQ3eiIvPjwvZz48L3N2Zz4="

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTEuNjI2IiBoZWlnaHQ9IjUxMS42MjciIHZpZXdCb3g9IjAgMCA1MTEuNjI2IDUxMS42MjciPjxnIGZpbGw9IiMyMDU0OTMiPjxwYXRoIGQ9Ik0zOTIuODU3IDI5Mi4zNTRoLTE4LjI3NGMtMi42NyAwLTQuODYuODU1LTYuNTYzIDIuNTczLTEuNzE4IDEuNzA4LTIuNTczIDMuODk3LTIuNTczIDYuNTYzdjkxLjM2YzAgMTIuNTY0LTQuNDcgMjMuMzE2LTEzLjQxNSAzMi4yNjMtOC45NDUgOC45NDUtMTkuNyAxMy40MTQtMzIuMjY0IDEzLjQxNEg4Mi4yMjRjLTEyLjU2MiAwLTIzLjMxNy00LjQ3LTMyLjI2NC0xMy40MTQtOC45NDUtOC45NDYtMTMuNDE3LTE5LjY5OC0xMy40MTctMzIuMjYyVjE1NS4zMWMwLTEyLjU2MiA0LjQ3LTIzLjMxMyAxMy40MTctMzIuMjYgOC45NDctOC45NDYgMTkuNzAyLTEzLjQxNyAzMi4yNjQtMTMuNDE3aDIwMC45OTRjMi42NyAwIDQuODYtLjg2IDYuNTctMi41NyAxLjcxLTEuNzEzIDIuNTY2LTMuOSAyLjU2Ni02LjU2N1Y4Mi4yMmMwLTIuNjYtLjg1NS00Ljg1Mi0yLjU2Ni02LjU2Mi0xLjcxLTEuNzEzLTMuOS0yLjU2OC02LjU3LTIuNTY4SDgyLjIyNGMtMjIuNjQ4IDAtNDIuMDE2IDguMDQyLTU4LjEwMiAyNC4xMjVDOC4wNDIgMTEzLjI5NyAwIDEzMi42NjUgMCAxNTUuMzEzdjIzNy41NDJjMCAyMi42NDcgOC4wNDIgNDIuMDE4IDI0LjEyMyA1OC4wOTUgMTYuMDg2IDE2LjA4NCAzNS40NTQgMjQuMTMgNTguMTAyIDI0LjEzaDIzNy41NDNjMjIuNjQ3IDAgNDIuMDE3LTguMDQ2IDU4LjEtMjQuMTMgMTYuMDg2LTE2LjA3NyAyNC4xMjgtMzUuNDQ3IDI0LjEyOC01OC4wOTV2LTkxLjM1OGMwLTIuNjctLjg1Ni00Ljg2LTIuNTc0LTYuNTctMS43MTMtMS43MTgtMy45MDMtMi41NzMtNi41NjUtMi41NzN6Ii8+PHBhdGggZD0iTTUwNi4yIDQxLjk3Yy0zLjYxOC0zLjYxNi03LjkwNi01LjQyMy0xMi44NS01LjQyM0gzNDcuMTdjLTQuOTQ3IDAtOS4yMzIgMS44MDctMTIuODQ2IDUuNDI0LTMuNjE3IDMuNjE2LTUuNDI4IDcuOS01LjQyOCAxMi44NDhzMS44MSA5LjIzMyA1LjQyOCAxMi44NWw1MC4yNDcgNTAuMjQ4LTE4Ni4xNDYgMTg2LjE1Yy0xLjkwNiAxLjkwNC0yLjg1NiA0LjA5NC0yLjg1NiA2LjU2NCAwIDIuNDguOTUzIDQuNjY4IDIuODU2IDYuNTdsMzIuNTQ4IDMyLjU0NWMxLjkwMyAxLjkwMyA0LjA5MyAyLjg1MiA2LjU2NyAyLjg1MnM0LjY2NC0uOTQ4IDYuNTY2LTIuODUybDE4Ni4xNDgtMTg2LjE0OCA1MC4yNSA1MC4yNDhjMy42MTUgMy42MTcgNy45IDUuNDI2IDEyLjg0OCA1LjQyNnM5LjIzMy0xLjgwOCAxMi44NS01LjQyNWMzLjYxOC0zLjYxNiA1LjQyNS03Ljg5OCA1LjQyNS0xMi44NDdWNTQuODE4YzAtNC45NTItMS44MTQtOS4yMzItNS40MjgtMTIuODQ3eiIvPjwvZz48L3N2Zz4="

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEX////X19fX19nW1tjW1tnT09zV1dnW19nW19nX19rX19rW19nW19nX19fW19nZ2dnW1tnV19nW1tnW19nW1tvV1drV1dXX19nV19nU2dnW19nW1trW19nV19nj4+PW19nW19nV19nW19jV19rW2NnV1dzX19jW19nW2Nrb29vX19fV1dvW19nW1tr////X19rW2NrW19nW19nMzMzW19nW19jW19jX19nMzObW19nV2NjV2dnY2NjV2NjW1trX19nW1tnV2NjW19nW19nW19rW2NnX19rV2dnV19nW19nV19nW1tbW19nV2NjW19n////V19nS0tLX19nV2NjW1tjX19vT2trY2NjX19vW2NjV19nW1tjW19nR0dHW19j////W1tnW19jV19nW1tnW19nW19nV2NjW1tbV2NrW1tnW19kAAAASmqQDAAAAanRSTlMAE2Vwax1D9/xgsdiUJvAbUIHWyDI3BoWML9GQ+YYJ2f7dubioJJH9iQ46MftEA6SCofEF0sDGvQrlT0kuSD5fXVvys+6iWja+1I0l1VzFAoARc0J9TSknP2+Tl9sL4QFq9Z+w6PNOGW5X/QlO7gAAAAFiS0dEa1JlpZgAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfgBg4WIgOTH/vpAAABy0lEQVRYw+2WZ1fCMBSGr9bBdqHiQkS0DhQVRRH3VnDg3nvm//8AE/QIbTNu+Irvh5Te5nlOmuSEAvxHI1XVhj01tRp8XT1xxuXGCzyEFy9e4OMKCF7gD8gEDY1NnmavIC3BQp/WgFDQ1u4isoRAbGAPOjqJPF0gNrByt4InPSA2AIR7Cz8ifdF+QWIDIDYADLKLOTSMW4sR0y4YjdA2PoZcy/GEYwQGayfK5glM0mYqWTZPYJo2M+XzBOK08ZXPEyjdKGg+FdAXlPKzc8X9gBVY+ZIdhRTY+aIBJ3DyfwaUgMf/GrwYAZ+nhjQ7VNUCEQ+QnKfHulIg5n+iEqh4lUDJKwRqXi5A8FIBhpcJULxEgOPFAi6fMYwMUsDlF9jdAk7g5o1/kd0u4gRLJuf9dQTgNp3zpyWAZdMx/3oCWDHt66cpgNW1dev66wrA/penLYDKEGzQ0iZWsMUE29baDi3tYgUh2tkVttb2WC2L45M52jlnK+6zUR0cogRHrG/CVsynWTWWV+OHx+xrJnLCnVmSPj07v5Dl8ipV6HjtNN8QjdxyDse7KJ6/D/Je7uHxCck/iz6Isy+vavrt4F02xx+ZT0OWLz9uqSsx39LN6Hu4BGksAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA2LTE0VDIyOjM0OjAzKzAyOjAwTBnsEwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNi0xNFQyMjozNDowMyswMjowMD1EVK8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTEuNjI2IiBoZWlnaHQ9IjUxMS42MjciIHZpZXdCb3g9IjAgMCA1MTEuNjI2IDUxMS42MjciPjxnIGZpbGw9IiNkNmQ3ZDkiPjxwYXRoIGQ9Ik0zOTIuODU3IDI5Mi4zNTRoLTE4LjI3NGMtMi42NyAwLTQuODYuODU1LTYuNTYzIDIuNTczLTEuNzE4IDEuNzA4LTIuNTczIDMuODk3LTIuNTczIDYuNTYzdjkxLjM2YzAgMTIuNTY0LTQuNDcgMjMuMzE2LTEzLjQxNSAzMi4yNjMtOC45NDUgOC45NDUtMTkuNyAxMy40MTQtMzIuMjY0IDEzLjQxNEg4Mi4yMjRjLTEyLjU2MiAwLTIzLjMxNy00LjQ3LTMyLjI2NC0xMy40MTQtOC45NDUtOC45NDYtMTMuNDE3LTE5LjY5OC0xMy40MTctMzIuMjYyVjE1NS4zMWMwLTEyLjU2MiA0LjQ3LTIzLjMxMyAxMy40MTctMzIuMjYgOC45NDctOC45NDYgMTkuNzAyLTEzLjQxNyAzMi4yNjQtMTMuNDE3aDIwMC45OTRjMi42NyAwIDQuODYtLjg2IDYuNTctMi41NyAxLjcxLTEuNzEzIDIuNTY2LTMuOSAyLjU2Ni02LjU2N1Y4Mi4yMmMwLTIuNjYtLjg1NS00Ljg1Mi0yLjU2Ni02LjU2Mi0xLjcxLTEuNzEzLTMuOS0yLjU2OC02LjU3LTIuNTY4SDgyLjIyNGMtMjIuNjQ4IDAtNDIuMDE2IDguMDQyLTU4LjEwMiAyNC4xMjVDOC4wNDIgMTEzLjI5NyAwIDEzMi42NjUgMCAxNTUuMzEzdjIzNy41NDJjMCAyMi42NDcgOC4wNDIgNDIuMDE4IDI0LjEyMyA1OC4wOTUgMTYuMDg2IDE2LjA4NCAzNS40NTQgMjQuMTMgNTguMTAyIDI0LjEzaDIzNy41NDNjMjIuNjQ3IDAgNDIuMDE3LTguMDQ2IDU4LjEtMjQuMTMgMTYuMDg2LTE2LjA3NyAyNC4xMjgtMzUuNDQ3IDI0LjEyOC01OC4wOTV2LTkxLjM1OGMwLTIuNjctLjg1Ni00Ljg2LTIuNTc0LTYuNTctMS43MTMtMS43MTgtMy45MDMtMi41NzMtNi41NjUtMi41NzN6Ii8+PHBhdGggZD0iTTUwNi4yIDQxLjk3Yy0zLjYxOC0zLjYxNi03LjkwNi01LjQyMy0xMi44NS01LjQyM0gzNDcuMTdjLTQuOTQ3IDAtOS4yMzIgMS44MDctMTIuODQ2IDUuNDI0LTMuNjE3IDMuNjE2LTUuNDI4IDcuOS01LjQyOCAxMi44NDhzMS44MSA5LjIzMyA1LjQyOCAxMi44NWw1MC4yNDcgNTAuMjQ4LTE4Ni4xNDYgMTg2LjE1Yy0xLjkwNiAxLjkwNC0yLjg1NiA0LjA5NC0yLjg1NiA2LjU2NCAwIDIuNDguOTUzIDQuNjY4IDIuODU2IDYuNTdsMzIuNTQ4IDMyLjU0NWMxLjkwMyAxLjkwMyA0LjA5MyAyLjg1MiA2LjU2NyAyLjg1MnM0LjY2NC0uOTQ4IDYuNTY2LTIuODUybDE4Ni4xNDgtMTg2LjE0OCA1MC4yNSA1MC4yNDhjMy42MTUgMy42MTcgNy45IDUuNDI2IDEyLjg0OCA1LjQyNnM5LjIzMy0xLjgwOCAxMi44NS01LjQyNWMzLjYxOC0zLjYxNiA1LjQyNS03Ljg5OCA1LjQyNS0xMi44NDdWNTQuODE4YzAtNC45NTItMS44MTQtOS4yMzItNS40MjgtMTIuODQ3eiIvPjwvZz48L3N2Zz4="

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA3XAAAN1wFCKJt4AAA4KGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wNi0xNlQxNDozOToxMy0wNzowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTA2LTE2VDE0OjQ3OjA2LTA3OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0wNi0xNlQxNDo0NzowNi0wNzowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxMGE3MDZkYy00N2ZmLTRiY2MtOTk3Ni01MTg5Y2Q4ZGY4NjI8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6MTBhNzA2ZGMtNDdmZi00YmNjLTk5NzYtNTE4OWNkOGRmODYyPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6MTBhNzA2ZGMtNDdmZi00YmNjLTk5NzYtNTE4OWNkOGRmODYyPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjEwYTcwNmRjLTQ3ZmYtNGJjYy05OTc2LTUxODljZDhkZjg2Mjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wNi0xNlQxNDozOToxMy0wNzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+OTAwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj45MDAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjY0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjY0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7qXXf+AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAK4SURBVHja7Js9aBRBFMfXyAkqCGIlYmcUm4gWBiwU1CIponaCH5jGRkED1gEVFIQIioGUwZAipWKjhWKj2CpGTsTCQrASPxCRfPwsbgaWYTa3tztz84adB6+4mdvZ+f92dt7sfGRA1mTPEoAEIAGIxbcBF4EJB34Z2BkTgGPAX9zaMjAeC4DH+LF2LACmPQGI5v3fDfzoN4AdwCnghmqCH4C2Z38DHCioz7APCLYbbQBuqU4ihE2t8VCcQzBvsA94S1i716VlOoVgFvyP8Ha7RJ/gDIIucCPwseA/q8Bn4Bnw1LMvALtKdoxOIOjC7lvyVoA7wBbB0eGQqmctAPvVU87bEnBceGhcD8y7aAETlvSbTRCvATw00n4CrSaI1wDeGWkvmyJeA1gy0qabIl4D6HUgEoP412VDZAwAehX/HNhUdpwgHUBV8aUHS5IB1BVfCoJUAK7Ed4UgEYBr8WtBaEsD4Et8HsJXc1JUCgDf4rW3gJP5aXEJAPol3rowEhpAMPESAAQVHxpAcPEhAYgQHwqAGPEhAIgS328A4sT3E4AP8aO59f5RyQB8iB+yXDckFcC4h2Y/Yrl2RCqAwyUXL3p556MCoFvBisMOLzoAGXChAEKV3j5KABlw3oBQNdRFCyADzgK/gCc14nzUADIHS2/RA8gSgAQgARAD4LtR0FwEAM5YABysCuCFUdD7CABMGXVeprPRqxKAu5bCBgWLbwGLRp0X63wOn7M0p1fAgFAA1y31na8DYGtuuShvCypPivAB4JplR8sqcLQOgKJeFQVmEhgD9gJ7AvgR4Kra9WGzB3WnxLTPEJ99qjtvmP+xmc522FjsC8Vb6ysfmloHXAL+CBc/i6MtvEUZg8Aj4Jsg0b9VdDrhelq8m29X085XcHNkrVc/TefIjJewnA5OJgAJQLMB/B8AYoGObGV2r6EAAAAASUVORK5CYII="

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTEuNjI2IiBoZWlnaHQ9IjUxMS42MjciIHZpZXdCb3g9IjAgMCA1MTEuNjI2IDUxMS42MjciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0zOTIuODU3IDI5Mi4zNTRoLTE4LjI3NGMtMi42NyAwLTQuODYuODU1LTYuNTYzIDIuNTczLTEuNzE4IDEuNzA4LTIuNTczIDMuODk3LTIuNTczIDYuNTYzdjkxLjM2YzAgMTIuNTY0LTQuNDcgMjMuMzE2LTEzLjQxNSAzMi4yNjMtOC45NDUgOC45NDUtMTkuNyAxMy40MTQtMzIuMjY0IDEzLjQxNEg4Mi4yMjRjLTEyLjU2MiAwLTIzLjMxNy00LjQ3LTMyLjI2NC0xMy40MTQtOC45NDUtOC45NDYtMTMuNDE3LTE5LjY5OC0xMy40MTctMzIuMjYyVjE1NS4zMWMwLTEyLjU2MiA0LjQ3LTIzLjMxMyAxMy40MTctMzIuMjYgOC45NDctOC45NDYgMTkuNzAyLTEzLjQxNyAzMi4yNjQtMTMuNDE3aDIwMC45OTRjMi42NyAwIDQuODYtLjg2IDYuNTctMi41NyAxLjcxLTEuNzEzIDIuNTY2LTMuOSAyLjU2Ni02LjU2N1Y4Mi4yMmMwLTIuNjYtLjg1NS00Ljg1Mi0yLjU2Ni02LjU2Mi0xLjcxLTEuNzEzLTMuOS0yLjU2OC02LjU3LTIuNTY4SDgyLjIyNGMtMjIuNjQ4IDAtNDIuMDE2IDguMDQyLTU4LjEwMiAyNC4xMjVDOC4wNDIgMTEzLjI5NyAwIDEzMi42NjUgMCAxNTUuMzEzdjIzNy41NDJjMCAyMi42NDcgOC4wNDIgNDIuMDE4IDI0LjEyMyA1OC4wOTUgMTYuMDg2IDE2LjA4NCAzNS40NTQgMjQuMTMgNTguMTAyIDI0LjEzaDIzNy41NDNjMjIuNjQ3IDAgNDIuMDE3LTguMDQ2IDU4LjEtMjQuMTMgMTYuMDg2LTE2LjA3NyAyNC4xMjgtMzUuNDQ3IDI0LjEyOC01OC4wOTV2LTkxLjM1OGMwLTIuNjctLjg1Ni00Ljg2LTIuNTc0LTYuNTctMS43MTMtMS43MTgtMy45MDMtMi41NzMtNi41NjUtMi41NzN6Ii8+PHBhdGggZD0iTTUwNi4yIDQxLjk3Yy0zLjYxOC0zLjYxNi03LjkwNi01LjQyMy0xMi44NS01LjQyM0gzNDcuMTdjLTQuOTQ3IDAtOS4yMzIgMS44MDctMTIuODQ2IDUuNDI0LTMuNjE3IDMuNjE2LTUuNDI4IDcuOS01LjQyOCAxMi44NDhzMS44MSA5LjIzMyA1LjQyOCAxMi44NWw1MC4yNDcgNTAuMjQ4LTE4Ni4xNDYgMTg2LjE1Yy0xLjkwNiAxLjkwNC0yLjg1NiA0LjA5NC0yLjg1NiA2LjU2NCAwIDIuNDguOTUzIDQuNjY4IDIuODU2IDYuNTdsMzIuNTQ4IDMyLjU0NWMxLjkwMyAxLjkwMyA0LjA5MyAyLjg1MiA2LjU2NyAyLjg1MnM0LjY2NC0uOTQ4IDYuNTY2LTIuODUybDE4Ni4xNDgtMTg2LjE0OCA1MC4yNSA1MC4yNDhjMy42MTUgMy42MTcgNy45IDUuNDI2IDEyLjg0OCA1LjQyNnM5LjIzMy0xLjgwOCAxMi44NS01LjQyNWMzLjYxOC0zLjYxNiA1LjQyNS03Ljg5OCA1LjQyNS0xMi44NDdWNTQuODE4YzAtNC45NTItMS44MTQtOS4yMzItNS40MjgtMTIuODQ3eiIvPjwvZz48L3N2Zz4="

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAAAVUlEQVR4Ae2SVwHAIBQDQ/CCt+66RBVbAXn8csfelGKZjRMccBSUDQgbgSc/vpN+PBHgoy+iES3JogU9Ec2mSabj2T7E+OQ/v0n/8clVFn8jJ7jIpgLHRrH/NkY3iQAAAABJRU5ErkJggg=="

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDEuOTkxIiBoZWlnaHQ9IjQwMS45OTEiIHZpZXdCb3g9IjAgMCA0MDEuOTkxIDQwMS45OTEiPjxwYXRoIGQ9Ik0zOTQgMTU0LjE3NGMtNS4zMy01LjMzLTExLjgwNi03Ljk5NS0xOS40MTctNy45OTVIMjcuNDA2Yy03LjYxIDAtMTQuMDg0IDIuNjYtMTkuNDE0IDcuOTlDMi42NjIgMTU5LjUgMCAxNjUuOTcgMCAxNzMuNTg2djU0LjgyYzAgNy42MTcgMi42NjIgMTQuMDg2IDcuOTkyIDE5LjQxIDUuMzMgNS4zMzIgMTEuODAzIDcuOTk0IDE5LjQxNCA3Ljk5NGgzNDcuMTc2YzcuNjEgMCAxNC4wODYtMi42NiAxOS40MTctNy45OTMgNS4zMi01LjMyNCA3Ljk5LTExLjc5MyA3Ljk5LTE5LjQxdi01NC44MmMwLTcuNjE1LTIuNjYtMTQuMDg3LTcuOTktMTkuNDEzeiIvPjwvc3ZnPg=="

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAAAuElEQVR4Ac2UhQGFMBBDj9wu3Q1nMRjjMxV6Xyof9wRPH4UaOUK3Ky654bpzwy9S8nRSHhECQRqWIwJ5OiEJkVlQppMpKLWg9H7IE8t5CNLpF8b3YhrSZQY7AKEFhTQghQApkt5yDjk3Ic4RSvItEZAi6X3X9cCVdkkSuG60h1LqDytdb4Q2fd6WhpAmz5D+HHFhNXmByEgzafJ/ITIhRHa6cxh52sOQ9kMn4b6FZf8SNrxYlkOLZQs8CzRVr/mMVAAAAABJRU5ErkJggg=="

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDEuOTk0IiBoZWlnaHQ9IjQwMS45OTQiIHZpZXdCb3g9IjAgMCA0MDEuOTk0IDQwMS45OTQiPjxwYXRoIGQ9Ik0zOTQgMTU0LjE3NWMtNS4zMy01LjMzLTExLjgwNi03Ljk5NC0xOS40MTctNy45OTRIMjU1LjgxVjI3LjQxYzAtNy42MS0yLjY2NS0xNC4wODQtNy45OTMtMTkuNDE0QzI0Mi40ODcgMi42NjYgMjM2LjAyIDAgMjI4LjM5NyAwaC01NC44MWMtNy42MTMgMC0xNC4wODUgMi42NjMtMTkuNDE1IDcuOTkzLTUuMzMgNS4zMy03Ljk5NCAxMS44MDMtNy45OTQgMTkuNDE0djExOC43NzVIMjcuNDA4Yy03LjYxMiAwLTE0LjA4NSAyLjY2NC0xOS40MTUgNy45OTRTMCAxNjUuOTczIDAgMTczLjU5djU0LjgxOGMwIDcuNjE4IDIuNjYyIDE0LjA4NiA3Ljk5MiAxOS40MSA1LjMzIDUuMzMzIDExLjgwMyA3Ljk5NSAxOS40MTQgNy45OTVoMTE4Ljc3VjM3NC41OWMwIDcuNjEgMi42NjUgMTQuMDkgNy45OTUgMTkuNDE3IDUuMzMgNS4zMjUgMTEuODA2IDcuOTg3IDE5LjQxOCA3Ljk4N0gyMjguNGM3LjYxOCAwIDE0LjA4Ny0yLjY2MiAxOS40MTgtNy45ODcgNS4zMzItNS4zMyA3Ljk5NC0xMS44MDYgNy45OTQtMTkuNDE3VjI1NS44MTNoMTE4Ljc3YzcuNjE4IDAgMTQuMDktMi42NjIgMTkuNDE3LTcuOTk0IDUuMzI1LTUuMzMgNy45OS0xMS43OTcgNy45OS0xOS40MTV2LTU0LjgyYzAtNy42MTUtMi42Ni0xNC4wODYtNy45OTMtMTkuNDEzeiIvPjwvc3ZnPg=="

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjE2cHgiIGhlaWdodD0iMjE2cHgiIHZpZXdCb3g9IjAgMCAyMTYgMjE2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGQ9Ik0xNjIuMTgsNDEuNTkyYy01LjU5NS05LjU4Ni0xMy4xODUtMTcuMTc2LTIyLjc3MS0yMi43NzFjLTkuNTg4LTUuNTk1LTIwLjA1NS04LjM5Mi0zMS40MDgtOC4zOTINCgljLTExLjM1MiwwLTIxLjgyMiwyLjc5Ny0zMS40MDgsOC4zOTJjLTkuNTg3LDUuNTk0LTE3LjE3NywxMy4xODQtMjIuNzcyLDIyLjc3MUM0OC4yMjUsNTEuMTc5LDQ1LjQyOCw2MS42NDksNDUuNDI4LDczDQoJYzAsMTEuMzUyLDIuNzk4LDIxLjgyLDguMzkyLDMxLjQwOGM1LjU5NSw5LjU4NSwxMy4xODUsMTcuMTc2LDIyLjc3MiwyMi43NzFjOS41ODcsNS41OTUsMjAuMDU2LDguMzkyLDMxLjQwOCw4LjM5Mg0KCWMxMS4zNTIsMCwyMS44MjItMi43OTcsMzEuNDA4LTguMzkyYzkuNTg2LTUuNTk0LDE3LjE3Ni0xMy4xODUsMjIuNzcxLTIyLjc3MWM1LjU5NC05LjU4Nyw4LjM5MS0yMC4wNTcsOC4zOTEtMzEuNDA4DQoJQzE3MC41Nyw2MS42NDgsMTY3Ljc3Myw1MS4xNzgsMTYyLjE4LDQxLjU5MnogTTE0OC41NzIsNjMuNDY4bC00NC4yMzksNDQuMjM5Yy0xLjAzMiwxLjAzMi0yLjI4MSwxLjU0OS0zLjc0OCwxLjU0OQ0KCWMtMS40MTIsMC0yLjYzNC0wLjUxNy0zLjY2Ni0xLjU0OUw2Ny40MjUsNzguMjE1Yy0wLjk3Ny0wLjk3OS0xLjQ2Ni0yLjE5OS0xLjQ2Ni0zLjY2NmMwLTEuNTIxLDAuNDg4LTIuNzcxLDEuNDY2LTMuNzQ5DQoJbDcuNDE0LTcuMzMyYzEuMDMzLTEuMDMyLDIuMjU0LTEuNTQ4LDMuNjY3LTEuNTQ4czIuNjM1LDAuNTE2LDMuNjY3LDEuNTQ4bDE4LjQxMywxOC40MTNsMzMuMjQxLTMzLjE2DQoJYzEuMDMyLTEuMDMyLDIuMjU0LTEuNTQ4LDMuNjY2LTEuNTQ4YzEuNDExLDAsMi42MzUsMC41MTYsMy42NjYsMS41NDhsNy40MTQsNy4zMzNjMC45NzksMC45NzcsMS40NjcsMi4yMjYsMS40NjcsMy43NDcNCglDMTUwLjA0LDYxLjI2OCwxNDkuNTUyLDYyLjQ5LDE0OC41NzIsNjMuNDY4eiIvPg0KPC9zdmc+DQo="

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIyMTZweCIgaGVpZ2h0PSIxNDZweCIgdmlld0JveD0iMCAwIDIxNiAxNDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIxNiAxNDYiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZD0iTTE3OS42OTUsMTI1LjM4OEwxMTcuMTI2LDEwLjY3M2MtMC45MjQtMS42ODQtMi4yLTMuMDE1LTMuODMyLTMuOTkyYy0xLjYyOC0wLjk3OC0zLjM5NC0xLjQ2Ny01LjI5NS0xLjQ2Nw0KCWMtMS45MDEsMC0zLjY2NywwLjQ5LTUuMjk2LDEuNDY3cy0yLjkwNiwyLjMwOC0zLjgyOSwzLjk5MkwzNi4zMDMsMTI1LjM4OGMtMS45MDEsMy40MjMtMS44NDcsNi44NDUsMC4xNjMsMTAuMjY3DQoJYzAuOTI0LDEuNTc0LDIuMTg3LDIuODI0LDMuNzg5LDMuNzQ2YzEuNjAzLDAuOTI0LDMuMzI3LDEuMzg3LDUuMTc0LDEuMzg3SDE3MC41N2MxLjg0OSwwLDMuNTcyLTAuNDYzLDUuMTc1LTEuMzg3DQoJYzEuNjAzLTAuOTIyLDIuODY0LTIuMTcyLDMuNzg5LTMuNzQ2QzE4MS41NDQsMTMyLjIzMiwxODEuNTk4LDEyOC44MTEsMTc5LjY5NSwxMjUuMzg4eiBNMTE4LjQzLDExNy4yNA0KCWMwLDAuNzYtMC4yNTksMS4zOTgtMC43NzMsMS45MTRjLTAuNTE2LDAuNTE2LTEuMTI3LDAuNzczLTEuODM0LDAuNzczSDEwMC4xOGMtMC43MDYsMC0xLjMxNy0wLjI1Ny0xLjgzMy0wLjc3Mw0KCWMtMC41MTYtMC41MTctMC43NzQtMS4xNTQtMC43NzQtMS45MTR2LTE1LjQ4YzAtMC43NiwwLjI1OC0xLjM5NywwLjc3NC0xLjkxNGMwLjUxNi0wLjUxNiwxLjEyNi0wLjc3MywxLjgzMy0wLjc3M2gxNS42NDINCgljMC43MDcsMCwxLjMxOCwwLjI1NywxLjgzNCwwLjc3M2MwLjUxNSwwLjUxNywwLjc3MywxLjE1NCwwLjc3MywxLjkxNFYxMTcuMjR6IE0xMTguMjY4LDg2Ljc3DQoJYy0wLjA1NiwwLjU0My0wLjM0MSwwLjk5MS0wLjg1NiwxLjM0NGMtMC41MTcsMC4zNTQtMS4xNTQsMC41MjktMS45MTUsMC41MjloLTE1LjA3M2MtMC43NiwwLTEuNDEyLTAuMTc2LTEuOTU1LTAuNTI5DQoJYy0wLjU0NC0wLjM1NC0wLjgxNS0wLjgwMS0wLjgxNS0xLjM0NmwtMS4zODUtMzcuMjMxYzAtMC43NjEsMC4yNzItMS4zMzEsMC44MTUtMS43MTFjMC43MDYtMC41OTcsMS4zNTgtMC44OTYsMS45NTYtMC44OTZoMTcuOTI0DQoJYzAuNTk4LDAsMS4yNSwwLjI5OCwxLjk1NiwwLjg5NmMwLjU0MywwLjM4LDAuODEzLDAuODk2LDAuODEzLDEuNTQ4TDExOC4yNjgsODYuNzd6Ii8+DQo8L3N2Zz4NCg=="

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIyMTZweCIgaGVpZ2h0PSIxNDZweCIgdmlld0JveD0iMCAwIDIxNiAxNDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIxNiAxNDYiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZD0iTTE2Mi4xOCw0MS41OTJjLTUuNTk1LTkuNTg2LTEzLjE4NS0xNy4xNzYtMjIuNzcxLTIyLjc3MWMtOS41ODgtNS41OTUtMjAuMDU1LTguMzkyLTMxLjQwOC04LjM5Mg0KCWMtMTEuMzUyLDAtMjEuODIxLDIuNzk3LTMxLjQwOCw4LjM5MmMtOS41ODcsNS41OTQtMTcuMTc3LDEzLjE4NC0yMi43NzIsMjIuNzcxQzQ4LjIyNSw1MS4xNzksNDUuNDI4LDYxLjY0OSw0NS40MjgsNzMNCgljMCwxMS4zNTEsMi43OTgsMjEuODIsOC4zOTIsMzEuNDA4YzUuNTk1LDkuNTg0LDEzLjE4NSwxNy4xNzYsMjIuNzcyLDIyLjc3MWM5LjU4Nyw1LjU5NSwyMC4wNTYsOC4zOTIsMzEuNDA4LDguMzkyDQoJYzExLjM1MiwwLDIxLjgyMi0yLjc5NywzMS40MDgtOC4zOTJjOS41ODYtNS41OTQsMTcuMTc2LTEzLjE4NSwyMi43NzEtMjIuNzcxYzUuNTk0LTkuNTg4LDguMzkxLTIwLjA1OCw4LjM5MS0zMS40MDgNCglDMTcwLjU3LDYxLjY0OSwxNjcuNzczLDUxLjE3OCwxNjIuMTgsNDEuNTkyeiBNMTE4LjQzLDExMi4wMjVjMCwwLjc2MS0wLjI0NiwxLjM5OC0wLjczNCwxLjkxNHMtMS4wODYsMC43NzMtMS43OTMsMC43NzNIMTAwLjI2DQoJYy0wLjcwNiwwLTEuMzMxLTAuMjcxLTEuODc0LTAuODE0Yy0wLjU0My0wLjU0My0wLjgxNC0xLjE2OC0wLjgxNC0xLjg3M1Y5Ni41NDZjMC0wLjcwNiwwLjI3MS0xLjMzMSwwLjgxNC0xLjg3NA0KCWMwLjU0My0wLjU0MywxLjE2OC0wLjgxNCwxLjg3NC0wLjgxNGgxNS42NDNjMC43MDcsMCwxLjMwNiwwLjI1OCwxLjc5MywwLjc3M2MwLjQ4OCwwLjUxOCwwLjczNCwxLjE1NCwwLjczNCwxLjkxNVYxMTIuMDI1eg0KCSBNMTE4LjI2Niw4My45OTljLTAuMDU1LDAuNTQzLTAuMzM5LDEuMDE5LTAuODU0LDEuNDI2Yy0wLjUxNywwLjQwNy0xLjE1NCwwLjYxLTEuOTE0LDAuNjFoLTE1LjA3Mw0KCWMtMC43NjEsMC0xLjQxMy0wLjIwMy0xLjk1Ni0wLjYxYy0wLjU0My0wLjQwNy0wLjgxNS0wLjg4My0wLjgxNS0xLjQyNmwtMS4zODUtNTAuNTk1YzAtMC42NTMsMC4yNzEtMS4xNDEsMC44MTQtMS40NjcNCgljMC41NDQtMC40MzQsMS4xOTYtMC42NTIsMS45NTYtMC42NTJoMTcuOTI2YzAuNzYxLDAsMS40MTIsMC4yMTcsMS45NTUsMC42NTJjMC41NDMsMC4zMjYsMC44MTMsMC44MTUsMC44MTMsMS40NjdMMTE4LjI2Niw4My45OTl6DQoJIi8+DQo8L3N2Zz4NCg=="

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIyMTZweCIgaGVpZ2h0PSIxNDZweCIgdmlld0JveD0iMCAwIDIxNiAxNDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIxNiAxNDYiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZD0iTTE2Mi4xOCw0MS41OTJjLTUuNTk1LTkuNTg2LTEzLjE4NS0xNy4xNzYtMjIuNzcxLTIyLjc3MWMtOS41ODgtNS41OTUtMjAuMDU1LTguMzkyLTMxLjQwOC04LjM5Mg0KCWMtMTEuMzUyLDAtMjEuODIyLDIuNzk3LTMxLjQwOCw4LjM5MmMtOS41ODcsNS41OTQtMTcuMTc3LDEzLjE4NC0yMi43NzIsMjIuNzcxQzQ4LjIyNSw1MS4xNzksNDUuNDI4LDYxLjY0OSw0NS40MjgsNzMNCgljMCwxMS4zNTIsMi43OTgsMjEuODIsOC4zOTIsMzEuNDA4YzUuNTk1LDkuNTg1LDEzLjE4NSwxNy4xNzYsMjIuNzcyLDIyLjc3MWM5LjU4Nyw1LjU5NSwyMC4wNTYsOC4zOTIsMzEuNDA4LDguMzkyDQoJYzExLjM1MiwwLDIxLjgyMi0yLjc5NywzMS40MDgtOC4zOTJjOS41ODYtNS41OTQsMTcuMTc2LTEzLjE4NSwyMi43NzEtMjIuNzcxYzUuNTk0LTkuNTg3LDguMzkxLTIwLjA1Nyw4LjM5MS0zMS40MDgNCglDMTcwLjU3LDYxLjY0OCwxNjcuNzczLDUxLjE3OCwxNjIuMTgsNDEuNTkyeiBNOTcuNTcyLDI2LjA3MWMwLTAuNzYxLDAuMjQ0LTEuMzg1LDAuNzMzLTEuODc0YzAuNDg5LTAuNDg4LDEuMTE0LTAuNzMzLDEuODc0LTAuNzMzDQoJaDE1LjY0NGMwLjc2LDAsMS4zODUsMC4yNDUsMS44NzIsMC43MzNjMC40ODgsMC40ODksMC43MzQsMS4xMTMsMC43MzQsMS44NzR2MTMuMDM2YzAsMC43Ni0wLjI0NiwxLjM4NS0wLjczNCwxLjg3Mw0KCWMtMC40ODcsMC40ODktMS4xMTIsMC43MzMtMS44NzIsMC43MzNoLTE1LjY0NGMtMC43NiwwLTEuMzg1LTAuMjQ0LTEuODc0LTAuNzMzYy0wLjQ4OS0wLjQ4OC0wLjczMy0xLjExMy0wLjczMy0xLjg3M1YyNi4wNzF6DQoJIE0xMjguODU3LDExMi4xMDdjMCwwLjc2LTAuMjQ2LDEuMzg1LTAuNzMzLDEuODcyYy0wLjQ4NywwLjQ4OS0xLjExMiwwLjczMy0xLjg3NCwwLjczM2gtMzYuNWMtMC43NjEsMC0xLjM4NS0wLjI0NC0xLjg3NC0wLjczMw0KCWMtMC40ODktMC40ODgtMC43MzMtMS4xMTMtMC43MzMtMS44NzNWOTkuMDdjMC0wLjc2MiwwLjI0NC0xLjM4NSwwLjczMy0xLjg3NGMwLjQ4OS0wLjQ4OCwxLjExNC0wLjczMywxLjg3NC0wLjczM2g3LjgyMlY3MC4zOTINCglIODkuNzVjLTAuNzYxLDAtMS4zODUtMC4yNDQtMS44NzQtMC43MzNjLTAuNDg5LTAuNDg4LTAuNzMzLTEuMTEzLTAuNzMzLTEuODc0VjU0Ljc1YzAtMC43NjEsMC4yNDQtMS4zODUsMC43MzMtMS44NzQNCgljMC40ODktMC40ODksMS4xMTQtMC43MzMsMS44NzQtMC43MzNoMjYuMDczYzAuNzYsMCwxLjM4NSwwLjI0NCwxLjg3MiwwLjczM2MwLjQ4OCwwLjQ4OSwwLjczNCwxLjExMywwLjczNCwxLjg3NHY0MS43MTRoNy44Mg0KCWMwLjc2MSwwLDEuMzg2LDAuMjQ1LDEuODc0LDAuNzMzYzAuNDg3LDAuNDg4LDAuNzMzLDEuMTEzLDAuNzMzLDEuODc0VjExMi4xMDd6Ii8+DQo8L3N2Zz4NCg=="

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAAA0ElEQVR4Aa3UNRbCQBAG4GT+HABaapxLoC0Vx0E7uBWcAKeDkhrr4hlcZ/c94rLf+qxx2czoYpVoghO1+AsMYWNk1WgLP9ppoMIoPBO0CYELT5HxzwJ8eExcJcYlxTCEDwe+HsvT4oX1VViBmatTSdwYA33m/IuRCvNeu0Rmy5e29ZiYv1mGVk+luUZKbllaQHLXC9Vjkqc5lyL0n9zlApl/JJAq5qoSYiJNWDk0ZBLHSINcfuQuyQXyurCs9RYWHmk0sFdfwhhxqjotcaK2RAI9scUmIJBvoAAAAABJRU5ErkJggg=="

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NDQuODE5IiBoZWlnaHQ9IjQ0NC44MTkiIHZpZXdCb3g9IjAgMCA0NDQuODE5IDQ0NC44MTkiPjxwYXRoIGQ9Ik0zNTIuMDI1IDE5Ni43MTJMMTY1Ljg4NSAxMC44NDhDMTU5LjAyOCAzLjYxNSAxNTAuNDY4IDAgMTQwLjE4NSAwcy0xOC44NCAzLjYyLTI1LjY5NiAxMC44NDhsLTIxLjcgMjEuNDE2Yy03LjA0NSA3LjA0My0xMC41NjcgMTUuNjA0LTEwLjU2NyAyNS42OTIgMCA5Ljg5NyAzLjUyIDE4LjU2IDEwLjU2NiAyNS45OEwyMzEuNTQ0IDIyMi40MSA5Mi43ODUgMzYxLjE2OGMtNy4wNCA3LjA0My0xMC41NjMgMTUuNjA0LTEwLjU2MyAyNS42OTMgMCA5LjkgMy41MiAxOC41NjYgMTAuNTY0IDI1Ljk4bDIxLjcgMjEuNDE3YzcuMDQzIDcuMDQzIDE1LjYxMiAxMC41NjQgMjUuNjk3IDEwLjU2NCAxMC4wOSAwIDE4LjY1Ni0zLjUyIDI1LjY5Ny0xMC41NjRMMzUyLjAyNSAyNDguMzljNy4wNDYtNy40MjMgMTAuNTctMTYuMDg0IDEwLjU3LTI1Ljk4LjAwMi0xMC4wOS0zLjUyNC0xOC42NTUtMTAuNTctMjUuNjk4eiIvPjwvc3ZnPg=="

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA8CAYAAAAt3km7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAThJREFUeNrsmdENgjAQhtEwACPABDICnUA20BHcwDABKziCG4AbsAG6AW7gkfDgkxwXri31/5MLDxSajyv3HyWKIMgL7WxPmGVZSYcjRUGRMi5p+743S+eJLQPVTJhvFZL5YgtAyQR0trkybGSsochtL/m9crZqF1CqYAQ1vhsXV1VRM2NXl+V+r5StVFrNfM9Y6dqgtariYcHYgaKi6MiIW9/B0gVQhoC6TZV7hu4aUD6APTZp0Aw9QwWLAAYwgG1TIoOeOvdfSpi3yulesyYu8Tpp59Gs9GBrxpixzTIhLsUu1HfsHSpYsBkbggSTfqPBoB2pDRVskF4oNehq5vyJuT1wo3hpZEzlbwu1SWNnUjCGmjU3cFA8AAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMAj6J30EGADYNjY/i9DMCQAAAABJRU5ErkJggg=="

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTYiIGhlaWdodD0iMTQ2IiB2aWV3Qm94PSIwIDAgMjE2IDE0NiI+PHBhdGggZD0iTTExOC4zNDggNDkuODZWMzguMjkzYzAtMS43MzcuMDgtMy4wODIuMjQzLTQuMDMyLjE2NS0uOTUuNTMtMS44ODYgMS4xMDQtMi44MS41Ny0uOTIzIDEuNDk0LTEuNTYgMi43Ny0xLjkxNCAxLjI3Ny0uMzU0IDIuOTc1LS41MyA1LjA5NC0uNTNoMTEuNTY4VjUuODY2SDEyMC42M2MtMTAuNzAyIDAtMTguMzg3IDIuNTQtMjMuMDU4IDcuNjE3LTQuNjcgNS4wOC03LjAwNiAxMi41Ni03LjAwNiAyMi40NDZ2MTMuOTNINzYuNzE0VjczaDEzLjg1djY3LjEzNGgyNy43ODRWNzNoMTguNDk0bDIuNDQ0LTIzLjE0aC0yMC45Mzh6Ii8+PC9zdmc+Cg=="

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA8CAYAAAAt3km7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNrsmbF12zAQhknZhUtqgpATWO7SxZrA9gSyJkg8AaMJJJWpKE8QqUxlZQIrE5CZIHCXLrmLDy8wBZIACJDUe/jf46MkQMB9BO54AILAy8vLy8vLy6srhX0bkCTJNdxmcOE9LhUXcO3heszzfK/Q1gTqHaRgUBhDYdEB0ARuSwJSEYI9cMOFdiK43cKVwrWG8lUVWA63BVTYOIS6J6hI868M4QgSH8gHgoqoLAG72REYdZjR17kLuFIfNnUH9m75l1Gp8Eb4nIERnyxDxTRStjXnUOSzR2Bl511CxYzmsQ1lBtOvSTg1Gdi4JDeayabin4o/H+ipHFqOVu44JqF9U/SzkeIfMII9g3GfW3R63xWUbCo2jUiKw00BQFeXXUGZgHE/zAwAI0dQKwC6EqFkYDuNBjngL3LcSQ+Jyx6AHpRSKoossWFHPAX6jp/FNAjafdLIMnTApqpg2PmTxc4ZTfG4xQPTBjs7soKxYjwehxaf7gUBufCxAux9lBWcS6YhVuSpSTrw1Ullsn4uCQipAMQcRjMb+llVMJIsDboI0TbfX0pgu+C0pAy2PSGoom5B/AaMKi5OBGyrvecB0fGZEt8h66putVGV3U8V88Y+p2GtfVIwTCgxscQEc6Bg66YKjdtvtEBMhU2TvvVm00b1BV0Gykpv+SH43boJqnHEWmb6rnwrUanYtDUwH5hvKdtzVjuZXzN99Kv3A4DClfIXK2AE9w3g4p79698uGdjy2xoYwe0A7oVG7qKHKHine56gddpCG6e4OzzrKKgg1NRkP9P4GIk2bxDuq8tgYXp+MGrR6XXg5nBBHKmNaQMmU5GfRcVDm366KVVEo3PTQVq1p0DB2jYUkvF4tPMi/P4u+L9d1lWQWPDTSBsKS9HuYw+J7oqgmM1Gw57COaOlx8bVeXdY41u3lv2K0XJ+Jx6pupJSVKR3FgaQSxrJSQMs39bG0fgRvG5FD3lF7uXl5eXl5eXVQn8FGABOkh0zYP242QAAAABJRU5ErkJggg=="

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTYiIGhlaWdodD0iMTQ2IiB2aWV3Qm94PSIwIDAgMjE2IDE0NiI+PHBhdGggZD0iTTE3Mi4yIDMzLjI0Yy01LjA1IDIuMTc0LTEwLjEwMyAzLjUzLTE1LjE1MiA0LjA3NiA1LjcwMy0zLjQyMiA5LjU2LTguMjU2IDExLjU3LTE0LjUwMi01LjIxNiAzLjA5NS0xMC43ODMgNS4yMTMtMTYuNzAzIDYuMzU0LTUuMjE1LTUuNTQtMTEuNjIzLTguMzEtMTkuMjI4LTguMzEtNy4yNzggMC0xMy40ODMgMi41NjUtMTguNjE3IDcuNjk4LTUuMTMzIDUuMTMzLTcuNyAxMS4zMzgtNy43IDE4LjYxNiAwIDEuOTU1LjIxOCAzLjk2NS42NTMgNi4wMy0xMC43NTUtLjU0NC0yMC44NDQtMy4yNDYtMzAuMjY4LTguMTA3LTkuNDI0LTQuODYyLTE3LjQyMi0xMS4zNC0yMy45OTQtMTkuNDMyLTIuMzkgNC4wNzMtMy41ODIgOC41LTMuNTgyIDEzLjI4IDAgNC41MDggMS4wNiA4LjY5IDMuMTc4IDEyLjU0NyAyLjExOCAzLjg1NiA0Ljk3IDYuOTggOC41NTUgOS4zNy00LjIzNy0uMTY0LTguMjAyLTEuMjc4LTExLjg5NS0zLjM0MnYuMzI2YzAgNi4zNTUgMS45OTYgMTEuOTM1IDUuOTg4IDE2Ljc0MyAzLjk5MiA0LjgwOCA5LjAzIDcuODM1IDE1LjExMyA5LjA4NC0yLjI4LjYtNC41OS45LTYuOTI1LjktMS41MiAwLTMuMTc3LS4xMzctNC45Ny0uNDA3IDEuNjg1IDUuMjcgNC43OCA5LjYgOS4yOSAxMi45OTUgNC41MDcgMy4zOTYgOS42MTMgNS4xNDYgMTUuMzE2IDUuMjU2LTkuNTYgNy40OTUtMjAuNDUgMTEuMjQzLTMyLjY3IDExLjI0My0yLjMzNiAwLTQuNDU0LS4xMDctNi4zNTUtLjMyNSAxMi4yMiA3Ljg3NiAyNS42OSAxMS44MTMgNDAuNDEgMTEuODEzIDkuMzQ0IDAgMTguMTE2LTEuNDggMjYuMzE2LTQuNDQgOC4yMDMtMi45NiAxNS4yMS02LjkyNCAyMS4wMi0xMS44OTUgNS44MTItNC45NyAxMC44MjMtMTAuNjg2IDE1LjAzMi0xNy4xNSA0LjIxLTYuNDYzIDcuMzQ1LTEzLjIxIDkuNDEtMjAuMjQ1IDIuMDY0LTcuMDM1IDMuMDk2LTE0LjA4IDMuMDk2LTIxLjE0MyAwLTEuNTItLjAyNy0yLjY2LS4wODItMy40MjIgNS4xNjMtMy43NDYgOS41NjMtOC4yODIgMTMuMi0xMy42MDR6Ii8+PC9zdmc+Cg=="

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA8CAYAAAAt3km7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA65JREFUeNrsWutx4jAQNpn8jzvAdCAqOLsCnApCKrhQAbgCnAowFSSpAKeCQAX4KjhfBZx0t5pZdlZ+gIklhp3xGK9loc+ftC/Z865UBk0bjkajWJ7ekGq23+9TdH8lT1N9Le8N+gR217ShHOi7PJVINSFNQvT7vW/G7lq2zzggkq1AngJ078M1YGtmelK23GNMTsetPBVI9YOclWxlu7JvYPcnPKPYeCFMhRyrklEfDIpejwrwGtYrZn6BXt4CdCHqt5D67CJWEQ1CyNMXUkXy2KDrsWIWQCm94NaqbPOM+jxQawpg56DOpT665BrjpuMS/S7gvtYLQzdTYMQa48EZB2HQx8SajsgLmdgIbG3QYzPvo9+JZLIgzwnrgMF0o5avlPrc0L6w3Y9V+arefVdXwHbk+vNagG3JdXEtwKyWG7AbMD4M81uGbEoebAWG/dyUyQJMxsaHcGtqKzDsrJcQ6IYN3MMGDt9WYAkTneCcLatgr2TcybcBK4EVfZRM2BWRiES1SUFvegk53H9FfW+9m1y5tMqgwWzTdMO/QArCZQ+taimDGhBzGHRoGSF63SUmsAMDKJX9rs41ud8gCtQzLQ6xwJhijQsyRrUWo7lfOmgrVpWMOcoWyxotmIbEMs0adPjUMq7Tzll0PDtC7MgpsCFemKbiDGG5lcXUfcrnumZsWLXGhOeuHI29qnYfcqVneNsH1xLN0GHGwqaMnRoChUzqISqcfQkZgLofG9oU6D9U/0HdgLoCNkNG4YBiuwh0G8Ns+Jfa6LBItnthLGWit5bQUphyvsuWYs4RKFjHKQl+MwoK2mV1rqhPYGrqfSmG0ZavR5LKBBgK5PEbDs18ZiuwAK2VJ4PPK1AxyIdjAvdKUlexBhhlj5uqtf7KdmAma9lKcP3y3nNAwIAsGrQrXWDsLHGCMfIFgef6Gus0VnRBMsjpogrLafVUNJn1Xyh8K5syVnQ4sNcW5pzboPCR+c4Nz/mmsV8CmPqUaOzV1NuhPjGGmC81DDZGWfej97/Uluowi7BaCezUr9YmJEAVddE3xHxCDRRF94IMdqk3AlXtUO/QAJNvVWOna2xnyonwF2qMqG+jdvDWdHGnQM8ETD9DeE69lDUwNTcEyoqlD7T2fjI52dHnGbT8FjNvwhV5xBVhOhVzh11XblxjMNdTB0GldHOCc9CJ59YO4lYnpJXAAHlUl6HaFIVwW0mDGpMcoKrQAzHFQZNq0ZlSEP+k2PkDuryPzwV7l78CDACWDm9op8Wv9wAAAABJRU5ErkJggg=="

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTYiIGhlaWdodD0iMTQ2IiB2aWV3Qm94PSIwIDAgMjE2IDE0NiI+PHBhdGggZD0iTTE2Ni4yNTQgNzUuNDQzYy0uNzA1LTMuMjA1LTIuMjY4LTUuODkzLTQuNjg0LTguMDY1LTIuNDE4LTIuMTcyLTUuMjAyLTMuNDUtOC4zNTMtMy44My05Ljk5My0xLjA4NS0yNS4wNjUtMS42MjgtNDUuMjE4LTEuNjI4LTIwLjE1NSAwLTM1LjIuNTQzLTQ1LjE0IDEuNjMtMy4yMDQuMzgtNiAxLjY1Ni04LjM5IDMuODI4LTIuMzkgMi4xNzMtMy45NjcgNC44Ni00LjcyOCA4LjA2NS0xLjQxMiA2LjMwMi0yLjExOCAxNS44MDctMi4xMTggMjguNTE3IDAgMTIuOTI3LjcwNiAyMi40MzMgMi4xMTggMjguNTE3LjcwNyAzLjIwMyAyLjI3IDUuODkzIDQuNjg2IDguMDY0IDIuNDE2IDIuMTc2IDUuMiAzLjQyNSA4LjM1IDMuNzVDNzIuNzc2IDE0NS40MyA4Ny44NSAxNDYgMTA4IDE0NnMzNS4yMjUtLjU3IDQ1LjIxNy0xLjcxYzMuMTUtLjMyNyA1LjkyLTEuNTc2IDguMzEtMy43NSAyLjM5Mi0yLjE3IDMuOTY3LTQuODYgNC43MjctOC4wNjMgMS40MTItNi4zMDIgMi4xMi0xNS44MDcgMi4xMi0yOC41MTctLjAwMi0xMi45MjctLjcxLTIyLjQzMy0yLjEyLTI4LjUxN3ptLTg0LjE2MiA4LjIzaC04LjcxOHY0Ni4zNThoLTguMTQ3VjgzLjY3N2gtOC41NTV2LTcuNjZoMjUuNDJ2Ny42NnptMjEuOTk3IDQ2LjM1OGgtNy4yNTR2LTQuNGMtMi45MzMgMy4zMTctNS43MDQgNC45Ny04LjMxIDQuOTctMi41IDAtNC4wNzUtMS4wMDItNC43MjYtMy4wMS0uNDMzLTEuMzA1LS42NS0zLjI4OC0uNjUtNS45NVY4OS43ODNoNy4yNXYyOS42NTZjMCAxLjczNy4wMjcgMi42ODguMDgyIDIuODUuMTYzIDEuMTQyLjczMyAxLjcxMiAxLjcxIDEuNzEyIDEuNDY3IDAgMy4wMTYtMS4xNCA0LjY0NS0zLjQyMlY4OS43ODNoNy4yNXY0MC4yNDh6bTI3LjctMTIuMDU1YzAgMy45NjUtLjI0NiA2LjY4Mi0uNzMgOC4xNS0uOTI4IDIuOTg0LTIuODU1IDQuNDc4LTUuNzg4IDQuNDc4LTIuNjA3IDAtNS4xMzMtMS40OTMtNy41NzgtNC40Nzh2My45MWgtNy4yNXYtNTQuMDJoNy4yNXYxNy42OGMyLjMzNy0yLjkzIDQuODYtNC40IDcuNTc4LTQuNCAyLjkzMyAwIDQuODYgMS41MjMgNS43ODUgNC41NjQuNDg2IDEuNDEuNzMgNC4xLjczIDguMDYzdjE2LjA0OHptMjcuNTM2LTYuNjhoLTE0LjU4M3Y3LjA4OGMwIDMuNzUgMS4yNDggNS42MjIgMy43NDcgNS42MjIgMS43OTMgMCAyLjg4LS45NzcgMy4yNi0yLjkzNC4xMDgtLjU0Mi4xNjMtMi4yLjE2My00Ljk3aDcuNDE0djEuMDZjMCAyLjY2My0uMDU1IDQuMjM3LS4xNjMgNC43MjgtLjE2MiAxLjQ2NS0uNzMgMi45MzItMS43MSA0LjM5OC0xLjk1NiAyLjg4LTQuODkgNC4zMTgtOC44IDQuMzE4LTMuNzQ4IDAtNi42OC0xLjM4NC04LjgtNC4xNTMtMS41NzQtMi4wMS0yLjM2Mi01LjE2LTIuMzYyLTkuNDV2LTE0LjFjMC00LjI5Ljc2LTcuNDQgMi4yOC05LjQ1IDIuMTItMi43NyA1LjAyNS00LjE1NCA4LjcyLTQuMTU0IDMuNjQgMCA2LjUyIDEuMzg0IDguNjM1IDQuMTU0IDEuNDY4IDIuMDEgMi4yIDUuMTYgMi4yIDkuNDV2OC4zOTJ6Ii8+PHBhdGggZD0iTTEyMS4zNiA5NS44OTVjLTEuMjUgMC0yLjQ3LjYtMy42NjUgMS43OTN2MjQuNTIyYzEuMTk1IDEuMTk0IDIuNDE2IDEuNzkyIDMuNjY2IDEuNzkyIDIuMTIgMCAzLjE4LTEuODE4IDMuMTgtNS40NnYtMTcuMTg4YzAtMy42NC0xLjA2LTUuNDYtMy4xOC01LjQ2em0yNy4wNSAwYy0yLjQ0MyAwLTMuNjY1IDEuODQ3LTMuNjY1IDUuNTR2My43NDdoNy4zMzJ2LTMuNzQ4YzAtMy42OTQtMS4yMjMtNS41NC0zLjY2Ni01LjU0ek03Ny4zNjggMzIuNTA4djIyLjA4aDguMTQ3di0yMi4wOEw5NS4zNzIgMGgtOC4zMWwtNS41NCAyMS40MjhMNzUuNzQgMGgtOC42MzZjMS41MiA0LjU2MyAzLjI4NiA5LjY0IDUuMjk2IDE1LjIzNiAyLjU1MyA3LjQ5NSA0LjIxIDEzLjI1MyA0Ljk3IDE3LjI3MnptMjguOTIyIDIyLjY1YzMuNzQ3IDAgNi42MjUtMS4zODUgOC42MzUtNC4xNTUgMS41Mi0yLjAxIDIuMjgtNS4yMTUgMi4yOC05LjYxNFYyNy4xM2MwLTQuMzQ0LS43Ni03LjUyMi0yLjI4LTkuNTMyLTIuMDEtMi43Ny00Ljg4OC00LjE1NS04LjYzNi00LjE1NS0zLjY0IDAtNi40OTUgMS4zODUtOC41NTggNC4xNTUtMS41MiAyLjAxLTIuMjggNS4xODgtMi4yOCA5LjUzM3YxNC4yNmMwIDQuMzQ2Ljc2IDcuNTUgMi4yOCA5LjYxNSAyLjA2NCAyLjc3IDQuOTE1IDQuMTU1IDguNTU1IDQuMTU1em0tMy41MDUtMjkuNDk0YzAtMy43NDggMS4xNjgtNS42MjIgMy41MDQtNS42MjJzMy41IDEuODc0IDMuNSA1LjYyMnYxNy4xMWMwIDMuODAyLTEuMTY3IDUuNzAyLTMuNTAzIDUuNzAycy0zLjUwNS0xLjktMy41MDUtNS43MDN2LTE3LjExem0yNS45MDggMjkuNDk0YzIuNzE3IDAgNS41MTUtMS42ODQgOC4zOTMtNS4wNTJ2NC40OGg3LjQxNFYxMy45MzNoLTcuNDE0djMxLjA0Yy0xLjYzIDIuMzM3LTMuMTc3IDMuNTA0LTQuNjQ1IDMuNTA0LS45NzYgMC0xLjU0Ni0uNTk3LTEuNzEtMS43OTItLjA1My0uMTEtLjA4LTEuMDYtLjA4LTIuODUydi0yOS45aC03LjQxNHYzMi4xYzAgMi43Ny4yMTggNC44MDcuNjUyIDYuMTEuNzA3IDIuMDEgMi4zMSAzLjAxNiA0LjgwNyAzLjAxNnoiLz48L3N2Zz4K"

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA8CAYAAAAt3km7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5xJREFUeNrsWq+T2lAQhsNcXXBIcHWlru6Cqyu4uoI7R1GVHH8BVFYd/AWArCq4OnKuVQTXutTVXb+dLjOZTJK370c4SrMzO7kJee/le7v77e7LVSqllFJKKaX8B1JN3mi1Wu9xmSZuB9CIrw903e/3wb8G7FFj/Aa6hq4ANLwkYHEhYB/PBaRLYHFZEUgA3FwasLgVJwA4vzRgcYCDU1rwVMDiZDM4RQxepdyLClzPh+44pRQqteSNer3+E5c21CtozWvoa6zjQ9dRFP0+iSumuKbPIAnsjWPQ5B29ImKvajIIYAlcF/qGgdrKCOBmTw4sBeQ7aN/SknOAG5wNsBhAj604hjafGly1iMBl1hsbWtAJuFoRwMB0X8F4n5gBX2kOb2NsE3Osz85iKax6b+CeVparZbxMF7tGueYa6mH3flhYL8QcC/zZ0GRQstwvsr6rkuoLVwhp5dCWrqZ5J6OJVUnHZD3TWpES65xbk1ATXJddU0ostNZL3XWuDD2MXop2f08W5jgSCV6QerWORk3q8UZUTgEsWdgSuCW0KQQXaILzdQtnF8CO0tWp3BmcDuuNpRvnGtjRbabsnp7QLUdFuKRrYMm+qy0AN2MikrqkbwrMVQvR5NiT5K4RHx9IRGS1tEaTSpnvlb8Ho8fFGhZN5VvM+TkvyVOziWceuENQuiSePWBMYF1ScdD63J74BgAjTrSBYp0ppxHl4RDmajmtFdm1xsyCOhJyoo0Urc9emLxzKxJt8qBdh/Y4D4WaMbdUzE2gJ8L5hoVV97zDU2FsiI8BMO9e2A20skotK7qnHebWwnWilVqtW2ge4yNsKThPUOGvhOXWsPAOmuiXaFhIKs/x7JZ6tRz6bwi6b6L+BZ6PtICRy2BgH/oBegul5u8Z5vmWA64pbCip/V9k/cgHt7eCeQ5pzWg1B9Qd03oWdffS8hITys42+HmunWCTqPHtiGIME97ngMotl5iypfE2VPwuOdDxReTBHW5fSALLDDLZMAGopC8gEWnRoLTYWCfp8kaYUraXVySzq0vYUQRM9yz+JuelJJ2CikUl/53woog8lrcRC9ONicnWlcVMKvdMxjIN/gQDS+JdCUz3i+Y2J0ZCiSspmtHQlcVWmsBWDmLEswQmqhVHGlabCA4yDzZxavoh/iojwUrO/OijwZ2wwbSJU5PwSCcPpmpqvWcpkwZcTg00XHWjKIlUp1Qjy99LKaWUUkq5TPkjwAC0JIeDzh3QfgAAAABJRU5ErkJggg=="

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTYiIGhlaWdodD0iMTQ2IiB2aWV3Qm94PSIwIDAgMjE2IDE0NiI+PHBhdGggZD0iTTY2LjI4IDk5LjA3MmMtNC4zNDcgMC04LjA0IDEuNTItMTEuMDgyIDQuNTYyLTMuMDQgMy4wNDItNC41NjIgNi43MzUtNC41NjIgMTEuMDggMCA0LjM0NyAxLjUyIDguMDQgNC41NjIgMTEuMDggMy4wNDIgMy4wNDIgNi43MzYgNC41NjMgMTEuMDggNC41NjMgNC4zNDYgMCA4LjA0LTEuNTIgMTEuMDgtNC41NjIgMy4wNDItMy4wNDIgNC41NjMtNi43MzQgNC41NjMtMTEuMDhzLTEuNTItOC4wNC00LjU2LTExLjA4Yy0zLjA0LTMuMDQyLTYuNzMzLTQuNTYzLTExLjA4LTQuNTYzem0zNi4wMS0yMC4zN2MtNi4xMzgtNi4xOS0xMy4xNzItMTEuMTItMjEuMTAyLTE0Ljc4Ni03LjkzLTMuNjY3LTE2LjI0LTUuODUzLTI0LjkzLTYuNTZoLS40MDhjLTEuNDEyIDAtMi41OC40NjMtMy41MDMgMS4zODYtMS4xNC45NzctMS43MSAyLjI1NC0xLjcxIDMuODNWNzMuNTdjMCAxLjM1Ny40NDcgMi41MjUgMS4zNDMgMy41MDMuODk2Ljk4IDIuMDIzIDEuNTIyIDMuMzggMS42MyAxMi40NCAxLjE5NSAyMy4wNyA2LjIwNiAzMS44OTcgMTUuMDMyIDguODI2IDguODI1IDEzLjgzNyAxOS40NTggMTUuMDMyIDMxLjg5Ni4xMDYgMS4zNi42NSAyLjQ4OCAxLjYzIDMuMzg0Ljk3NS44OTcgMi4xNDIgMS4zNDYgMy41IDEuMzQ2aDExYzEuNTc0IDAgMi44NS0uNTcgMy44My0xLjcxIDEuMDMtMS4wOSAxLjQ5Mi0yLjM5MyAxLjM4NS0zLjkxNC0uNzA3LTguNjktMi44OTQtMTctNi41Ni0yNC45My0zLjY2Ni03LjkzLTguNTk1LTE0Ljk2NC0xNC43ODctMjEuMTAyeiIvPjxwYXRoIGQ9Ik0xNTUuNTczIDg0LjA0Yy01LjgxMi0xMy4wMS0xMy43OTYtMjQuNTY1LTIzLjk1My0zNC42NjgtMTAuMTAzLTEwLjE1Ny0yMS42NTgtMTguMTQtMzQuNjY3LTIzLjk1My0xMy4wMDgtNS44MTQtMjYuNjI4LTkuMDc0LTQwLjg2LTkuNzhoLS4yNDNjLTEuNDEyIDAtMi42MDcuNDktMy41ODUgMS40NjctMS4wODYuOTc2LTEuNjMgMi4yMjYtMS42MyAzLjc0N3YxMS42NWMwIDEuMzU4LjQ3NyAyLjU0IDEuNDI3IDMuNTQ0czIuMTA0IDEuNTM0IDMuNDYyIDEuNTljMTEuNjc4LjcwNiAyMi43NzIgMy40NzcgMzMuMjgyIDguMzEgMTAuNTEgNC44MzUgMTkuNjM1IDExLjEyIDI3LjM3NSAxOC44NiA3Ljc0IDcuNzQgMTQuMDMgMTYuODY2IDE4Ljg2IDI3LjM3NiA0LjgzNyAxMC41MTIgNy41OCAyMS42MDQgOC4yMyAzMy4yODIuMDU3IDEuMzU3LjU4NiAyLjUxMiAxLjU5IDMuNDYyIDEuMDA2Ljk1IDIuMjE1IDEuNDI3IDMuNjI3IDEuNDI3aDExLjY1YzEuNTIgMCAyLjc2OC0uNTQ0IDMuNzQ3LTEuNjMyIDEuMDg3LTEuMDg2IDEuNTc0LTIuMzYgMS40NjgtMy44MjgtLjcwNC0xNC4yMzItMy45NjQtMjcuODUyLTkuNzc2LTQwLjg2eiIvPjwvc3ZnPgo="

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIxNiAxNDYiPjxwYXRoIGZpbGw9IiMwMDcxYmMiIGQ9Ik0xNjguODYgMzcuOTY2bC0xMS4wOC0xMS4wOGMtMS41Mi0xLjUyLTMuMzY3LTIuMjgtNS41NC0yLjI4LTIuMTcyIDAtNC4wMi43Ni01LjU0IDIuMjhMOTMuMjU0IDgwLjQxNCA2OS4zIDU2LjM4Yy0xLjUyLTEuNTIyLTMuMzY3LTIuMjgyLTUuNTQtMi4yODItMi4xNzIgMC00LjAyLjc2LTUuNTQgMi4yOEw0Ny4xNCA2Ny40NmMtMS41MiAxLjUyMi0yLjI4IDMuMzctMi4yOCA1LjU0MiAwIDIuMTcyLjc2IDQuMDIgMi4yOCA1LjU0bDI5LjQ5MyAyOS40OTMgMTEuMDggMTEuMDhjMS41MiAxLjUyIDMuMzY4IDIuMjggNS41NCAyLjI4IDIuMTczIDAgNC4wMi0uNzYgNS41NC0yLjI4bDExLjA4Mi0xMS4wOEwxNjguODYgNDkuMDVjMS41Mi0xLjUyIDIuMjgzLTMuMzcgMi4yODMtNS41NCAwLTIuMTc0LS43Ni00LjAyLTIuMjgtNS41NHoiLz48L3N2Zz4="

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABA0lEQVR4AV3QtcETUBDA8YujDS4l7iyBOzsgNVS4wwTJBMgWadEKhwbvYl+04wc5nP/zd36hoBhhs4bn2r5oOqEaoRQ/SPEpEwDwxOq/VU6DGXecdcsD8N7KNE7nE7y1PX7iErj3S6GBmalYRVlZIUIdI1tSxTPcmYrTPCPbaITjEcqhg7N5TdLDPG9wNX99wc3/FBb5iHP5+7WJB1OBkoKCWoQD4GgGdBJcit9Y6hVeW5j+VD0BdRvMt8iBFHMjQjUtrPYeDL32AUDXvswhy1rhnhGAN27oYmLvr8q/Y4vjrjrrSMbea4yJ3amiqBh/yNh2G2MmfqGonKOk8KOvduq5+w0gSRi4B2V+WgAAAABJRU5ErkJggg=="

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDIxNiAxNDYiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xNzIuNzcgMTIzLjAyNUwxNDQuODI1IDk1LjA4YzYuNzM1LTkuNzIyIDEwLjEwNC0yMC41NiAxMC4xMDQtMzIuNTA4IDAtNy43NjctMS41MS0xNS4xOTUtNC41MjctMjIuMjgzLTMuMDE0LTcuMDktNy4wODgtMTMuMi0xMi4yMi0xOC4zMzZzLTExLjI0My05LjIwNy0xOC4zMy0xMi4yMmMtNy4wOS0zLjAxNi0xNC41Mi00LjUyMy0yMi4yODYtNC41MjMtNy43NjggMC0xNS4xOTYgMS41MDgtMjIuMjg0IDQuNTIzLTcuMDkgMy4wMTQtMTMuMiA3LjA4OC0xOC4zMzIgMTIuMjItNS4xMzIgNS4xMzQtOS4yMDYgMTEuMjQ1LTEyLjIyIDE4LjMzMy0zLjAxNSA3LjA4OC00LjUyMiAxNC41MTUtNC41MjIgMjIuMjgyIDAgNy43NjYgMS41MDcgMTUuMTkyIDQuNTIyIDIyLjI4MiAzLjAxNCA3LjA4OCA3LjA4OCAxMy4xOTcgMTIuMjIgMTguMzMgNS4xMzQgNS4xMzQgMTEuMjQ1IDkuMjA3IDE4LjMzMyAxMi4yMjIgNy4wOSAzLjAxNSAxNC41MTYgNC41MjIgMjIuMjgzIDQuNTIyIDExLjk1IDAgMjIuNzg2LTMuMzcgMzIuNTEtMTAuMTA1bDI3Ljk0MyAyNy44NjNjMS45NTUgMi4wNjQgNC4zOTcgMy4wOTYgNy4zMzIgMy4wOTYgMi44MjQgMCA1LjI3LTEuMDMgNy4zMzItMy4wOTYgMi4wNjQtMi4wNjMgMy4wOTYtNC41MDggMy4wOTYtNy4zMzIgMC0yLjg3Ny0xLjAwMi01LjMyMi0zLjAxMy03LjMzem0tNDkuNDEzLTM0LjY2OEMxMTYuMjE0IDk1LjUgMTA3LjYyIDk5LjA3IDk3LjU3IDk5LjA3Yy0xMC4wNDggMC0xOC42NDMtMy41Ny0yNS43ODYtMTAuNzEzQzY0LjY0IDgxLjIxNCA2MS4wNyA3Mi42MiA2MS4wNyA2Mi41N2MwLTEwLjA0NyAzLjU3Mi0xOC42NDMgMTAuNzE0LTI1Ljc4NUM3OC45MjYgMjkuNjQyIDg3LjUyMiAyNi4wNyA5Ny41NyAyNi4wN2MxMC4wNDggMCAxOC42NDMgMy41NzMgMjUuNzg3IDEwLjcxNSA3LjE0MyA3LjE0MiAxMC43MTUgMTUuNzM4IDEwLjcxNSAyNS43ODYgMCAxMC4wNS0zLjU3MyAxOC42NDctMTAuNzE1IDI1Ljc5eiIvPjwvc3ZnPg=="

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);