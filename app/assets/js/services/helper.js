angular.module('fe0.helper', [])
.value('version', '0.4.1')
/**
 *                     bbbbbbbb
 *       OOOOOOOOO     b::::::b                         jjjj
 *     OO:::::::::OO   b::::::b                        j::::j
 *   OO:::::::::::::OO b::::::b                         jjjj
 *  O:::::::OOO:::::::O b:::::b
 *  O::::::O   O::::::O b:::::bbbbbbbbb               jjjjjjj
 *  O:::::O     O:::::O b::::::::::::::bb             j:::::j
 *  O:::::O     O:::::O b::::::::::::::::b             j::::j
 *  O:::::O     O:::::O b:::::bbbbb:::::::b            j::::j
 *  O:::::O     O:::::O b:::::b    b::::::b            j::::j
 *  O:::::O     O:::::O b:::::b     b:::::b            j::::j
 *  O:::::O     O:::::O b:::::b     b:::::b            j::::j
 *  O::::::O   O::::::O b:::::b     b:::::b            j::::j
 *  O:::::::OOO:::::::O b:::::bbbbbb::::::b            j::::j
 *   OO:::::::::::::OO  b::::::::::::::::b             j::::j
 *     OO:::::::::OO    b:::::::::::::::b              j::::j
 *       OOOOOOOOO      bbbbbbbbbbbbbbbb               j::::j
 *                                                     j::::j
 *                                           jjjj      j::::j
 *                                          j::::jj   j:::::j
 *                                          j::::::jjj::::::j
 *                                           jj::::::::::::j
 *                                             jjj::::::jjj
 *                                                jjjjjj
 */
/**
 * Object Handler
 * 	Object master
 * @author Festum
 * @date 130910
 */
.factory('objHandler', function () {
	/**
	 * isDOMNode
	 *
	 * 	Check if a Javascript Object is a DOM Object
	 * 	Function won't be fooled by e.g. this
	 * 	isDOMNode( {'nodeName':'fake'} ); // returns false
	 *	Tested in Opera 11, FireFox 6, Internet Explorer 8 and Google Chrome 16.
	 *
	 * @author Festum
	 * @date 130911
	 */
	var isDOMNode = function() {
		return function (v) {
			if ( v===null ) return false;
			if ( typeof v!=='object' ) return false;
			if ( !('nodeName' in v) ) return false;

			var nn = v.nodeName;
			try {
				// DOM node property nodeName is readonly.
				// Most browsers throws an error...
				v.nodeName = 'is readonly?';
			} catch (e) {
				// ... indicating v is a DOM node ...
				return true;
			}
			// ...but others silently ignore the attempt to set the nodeName.
			if ( v.nodeName===nn ) return true;
			// Property nodeName set (and reset) - v is not a DOM node.
			v.nodeName = nn;
			return false;
		};
	};
	return {
		/**
		 * Merge Two
		 *
		 * 	Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
		 * 	This doesn't work if objects have same name attributes,
		 * 	and you would also want to merge the attributes.
		 *	This only does a shallow copy/merge.
		 *	Has the potential to clobber a lot of elements.
		 *
		 * @param obj1
		 * @param obj2
		 * @returns obj3 a new object based on obj1 and obj2
		 */
		mergeTwo: function (obj1, obj2) {
			var obj3 = {};
			for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
			for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
			return obj3;
		},
		/**
		 * Merge Recursive
		 *
		 * 	Function takes any number of arguments. It can be used to set properties on
		 * 	DOM Nodes and makes deep copies of values. However, first argument is given
		 * 	by reference.
		 * 	Tested in Opera 11, FireFox 6, Internet Explorer 8 and Google Chrome 16.
		 *
		 *	Some examples:
		 *	Set innerHTML and style of a HTML Element
		 *	mergeRecursive(
		 *		document.getElementById('mydiv'),
		 *		{style:{border:'5px solid green',color:'red'}},
		 *		{innerHTML:'Hello world!'});
		 *	Merge arrays and objects. Note that undefined can be used to preserve
		 *	values in the lefthand array/object.
		 *
		 *	o = mergeRecursive({a:'a'}, [1,2,3], [undefined, null, [30,31]], {a:undefined, b:'b'});
		 *	// o = {0:1, 1:null, 2:[30,31], a:'a', b:'b'}
		 *	Any argument not beeing a javascript object (including null) will be
		 *	ignored. Except for the first argument, also DOM nodes are discarded.
		 *	Beware that i.e. strings, created like new String() are in fact objects.
		 *
		 *	o = mergeRecursive({a:'a'}, 1, true, null, undefined, [1,2,3], 'bc', new String('de'));
		 *	// o = {0:'d', 1:'e', 2:3, a:'a'}
		 *	If you want to merge two objects into a new (without affecting any of
		 *	the two) supply {} as first argument
		 *
		 *	var a={}, b={b:'abc'}, c={c:'cde'}, o;
		 *	o = mergeRecursive(a, b, c);
		 *	// o===a is true, o===b is false, o===c is false
		 *
		 * @author Festum
		 * @date 130911
		 */
		mergeRecursive: function () {
			// _mergeRecursive does the actual job with two arguments.
			var _mergeRecursive = function (dst, src) {
				if (isDOMNode(src) || typeof src!=='object' || src===null) {
					return dst;
				}
				for ( var p in src ) {
					if( !src.hasOwnProperty(p) ) continue;
					if ( src[p]===undefined ) continue;
					if ( typeof src[p]!=='object' || src[p]===null) {
						dst[p] = src[p];
					} else if ( typeof dst[p]!=='object' || dst[p]===null ) {
						dst[p] = _mergeRecursive(src[p].constructor===Array ? [] : {}, src[p]);
					} else {
						_mergeRecursive(dst[p], src[p]);
					}
				}
				return dst;
			}

			// Loop through arguments and merge them into the first argument.
			var out = arguments[0];
			if ( typeof out!=='object' || out===null) return out;
			for ( var i=1, il=arguments.length; i<il; i++ ) {
				_mergeRecursive(out, arguments[i]);
			}
			return out;
		},
		/**
		 * Array Search
		 *
		 *	Find the specific key in value
		 *
		 * @author Festum
		 * @date 130911
		 */
		arraySearch: function(arr, val) {
			for (var i=0; i<arr.length; i++)
				if (arr[i] == val) return i;
			return false;
		},
		/**
		 * Create Nested Object
		 *
		 *	Dynamically create nested objects using object names given by an array
		 *
		 *	Usages:
		 *
		 *	createNestedObject( window, ["shapes", "circle"] );
		 * // Now window.shapes.circle is an empty object, ready to be used.
		 *	createNestedObject( window, ["shapes", "rectangle", "width"], 300 );
		 * // Now we have: window.shapes.rectangle.width === 300
		 *	createNestedObject( window, "shapes.rectangle.height".split('.'), 400 );
		 * // Now we have: window.shapes.rectangle.height === 400
		 *
		 * @function createNestedObject( base, names[, value] )
		 * @param string base the object on which to create the hierarchy
		 * @param names an array of strings contaning the names of the objects
		 * @param value (optional): if given, will be the last object in the hierarchy
		 * @return object the last object in the hierarchy
		 * @author Festum
		 * @date 130911
		 */
		createNestedObject: function(base, names, value) {
			// If a value is given, remove the last name and keep it for later:
			var lastName = arguments.length === 3 ? names.pop() : false;
			// Walk the hierarchy, creating new objects where needed.
			// If the lastName was removed, then the last object is not set yet:
			for(var i = 0; i < names.length; i++) base = base[names[i]] = base[names[i]] || {};
			// If a value was given, set it to the last name:
			if(lastName) base = base[lastName] = value;
			// Return the last object in the hierarchy:
			return base;
		},
		/**
		 * Rename Property
		 *
		 *	Object Rename Key
		 *
		 *	Usages:
		 *
		 *	renameProperty( obj, "fe0", "festum" );
		 *
		 * @function renameProperty( obj, oldName, newName )
		 * @param object
		 * @param old name you want to killed
		 * @param new nanme for replace
		 * @return updated object
		 * @author Festum
		 * @date 140108
		 */
		renameProperty: function (obj, oldName, newName) {
			// Check for the old property name to avoid a ReferenceError in strict mode.
			if (obj.hasOwnProperty(oldName)) {
				obj[newName] = obj[oldName];
				delete obj[oldName];
			}
			return obj;
		},
		/**
		 * Remove Property
		 *
		 *	Object Rename Key
		 *
		 *	Usages:
		 *
		 *	renameProperty( obj, "name", "Festum" );
		 *
		 * @function renameProperty( obj, name, value )
		 * @param object
		 * @param name field
		 * @param matching value
		 * @return updated object
		 * @author Festum
		 * @date 140109
		 */
		removeProperty: function(obj, name, value) {
			var array = $.map(obj, function(v,i){
				return v[name] === value ? null : v;
			});
			obj.length = 0; //clear original array
			obj.push.apply(obj, array); //push all elements except the one we want to delete
			return obj;
		},

	}
})
/**
 *     SSSSSSSSSSSSSSS          tttt                                iiii
 *   SS:::::::::::::::S      ttt:::t                               i::::i
 *  S:::::SSSSSS::::::S      t:::::t                                iiii
 *  S:::::S     SSSSSSS      t:::::t
 *  S:::::S            ttttttt:::::ttttttt    rrrrr   rrrrrrrrr   iiiiiii nnnn  nnnnnnnn       ggggggggg   ggggg
 *  S:::::S            t:::::::::::::::::t    r::::rrr:::::::::r  i:::::i n:::nn::::::::nn    g:::::::::ggg::::g
 *   S::::SSSS         t:::::::::::::::::t    r:::::::::::::::::r  i::::i n::::::::::::::nn  g:::::::::::::::::g
 *    SS::::::SSSSS    tttttt:::::::tttttt    rr::::::rrrrr::::::r i::::i nn:::::::::::::::ng::::::ggggg::::::gg
 *      SSS::::::::SS        t:::::t           r:::::r     r:::::r i::::i   n:::::nnnn:::::ng:::::g     g:::::g
 *         SSSSSS::::S       t:::::t           r:::::r     rrrrrrr i::::i   n::::n    n::::ng:::::g     g:::::g
 *              S:::::S      t:::::t           r:::::r             i::::i   n::::n    n::::ng:::::g     g:::::g
 *              S:::::S      t:::::t    tttttt r:::::r             i::::i   n::::n    n::::ng::::::g    g:::::g
 *  SSSSSSS     S:::::S      t::::::tttt:::::t r:::::r            i::::::i  n::::n    n::::ng:::::::ggggg:::::g
 *  S::::::SSSSSS:::::S      tt::::::::::::::t r:::::r            i::::::i  n::::n    n::::n g::::::::::::::::g
 *  S:::::::::::::::SS         tt:::::::::::tt r:::::r            i::::::i  n::::n    n::::n  gg::::::::::::::g
 *   SSSSSSSSSSSSSSS             ttttttttttt   rrrrrrr            iiiiiiii  nnnnnn    nnnnnn    gggggggg::::::g
 *                                                                                                      g:::::g
 *                                                                                          gggggg      g:::::g
 *                                                                                          g:::::gg   gg:::::g
 *                                                                                           g::::::ggg:::::::g
 *                                                                                            gg:::::::::::::g
 *                                                                                              ggg::::::ggg
 *                                                                                                 gggggg
 */
/**
 * String Handler
 *
 *	Dealing with the path stuff in singleton when get vfs response
 *
 * @author Festum
 * @date 131015
 */
.factory('stringHandler', function (jsonRoom) {
	return {
		getFilename: function (fobj) {
			return fobj.name.substring(fobj.name.lastIndexOf('/') + 1);
		},
		/*getFullPath: function (fobj) {
			console.log(fobj);
			return (fobj.parent+'/'+fobj.name).replace(/\/+/g, '/');
		}, no parent now*/
		makeFullpath: function (path, name) {
			return (path+'/'+name).replace(/\/+/g, '/');
		},
		capitalise: function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
		},
		fileExtension: function(filename){
			return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
		},
		addHours: function(date, hours) {
			return new Date(date.getTime() + hours*60*60000);
		},
		pathSlasher: function(path) {
			if(path==undefined) path=jsonRoom.get('ufsPath');
			path=path.replace(/\|/g, '/');
			return path!='/'?('/'+path+'/').replace(/\/+/g, '/'):'/';
		},
	};
})

/**
 * Form Handler
 *
 *	Dealing with the form stuff
 *
 * @author Festum
 * @date 131127
 */
.factory('formHandler', function (jsonRoom) {
	return {
		/**
		 * post2url
		 *
		 * @author Festum
		 * @date 131127
		 */
		post2url: function(path, params, method, target) {
			method = method || "post"; // Set method to post by default if not specified.
			target = method || "_blank";

			// The rest of this code assumes you are not using a library.
			// It can be made less wordy if you use one.
			var form = document.createElement("form");
			form.setAttribute("method", method);
			form.setAttribute("action", path);
			form.setAttribute("target", target);

			for(var key in params) {
				if(params.hasOwnProperty(key)) {
					var hiddenField = document.createElement("input");
					hiddenField.setAttribute("type", "hidden");
					hiddenField.setAttribute("name", key);
					hiddenField.setAttribute("value", params[key]);

					form.appendChild(hiddenField);
				 }
			}
			document.body.appendChild(form);
			form.submit();
		},
	};
})

/*
 * MMMMMMMM               MMMMMMMM               AAA               NNNNNNNN        NNNNNNNN
 * M:::::::M             M:::::::M              A:::A              N:::::::N       N::::::N
 * M::::::::M           M::::::::M             A:::::A             N::::::::N      N::::::N
 * M:::::::::M         M:::::::::M            A:::::::A            N:::::::::N     N::::::N
 * M::::::::::M       M::::::::::M           A:::::::::A           N::::::::::N    N::::::N
 * M:::::::::::M     M:::::::::::M          A:::::A:::::A          N:::::::::::N   N::::::N
 * M:::::::M::::M   M::::M:::::::M         A:::::A A:::::A         N:::::::N::::N  N::::::N
 * M::::::M M::::M M::::M M::::::M        A:::::A   A:::::A        N::::::N N::::N N::::::N
 * M::::::M  M::::M::::M  M::::::M       A:::::A     A:::::A       N::::::N  N::::N:::::::N
 * M::::::M   M:::::::M   M::::::M      A:::::AAAAAAAAA:::::A      N::::::N   N:::::::::::N
 * M::::::M    M:::::M    M::::::M     A:::::::::::::::::::::A     N::::::N    N::::::::::N
 * M::::::M     MMMMM     M::::::M    A:::::AAAAAAAAAAAAA:::::A    N::::::N     N:::::::::N
 * M::::::M               M::::::M   A:::::A             A:::::A   N::::::N      N::::::::N
 * M::::::M               M::::::M  A:::::A               A:::::A  N::::::N       N:::::::N
 * M::::::M               M::::::M A:::::A                 A:::::A N::::::N        N::::::N
 * MMMMMMMM               MMMMMMMMAAAAAAA                   AAAAAAANNNNNNNN         NNNNNNN
 */
.factory('man', function () {
	return {
		/**
		 * Error Mananager
		 *
		 * @author Festum
		 * @date 131113
		 */
		error: function(statuscode){
			var message = 'Unknow Error!';
			switch(statuscode){
				case 0:
					message = 'Success but not working properly';
					break;
				case 50:
					message = 'Database connection failure';
					break;
				case 51:
					message = 'The requested resource is missing or not found from database';
					break;
				case 52:
					message = 'File not found';
					break;
				case 60:
					message = 'Illegal input argument (Including JSON body or header field)';
					break;
				case 61:
					message = 'Inacceptable argument that exceeds the limitation of the requested service';
					break;
				case 62:
					message = 'Expectation failed (Include received unexpected byte stream)';
					break;
				case 63:
					message = 'Duplicate request (any request likes insert a record, create an object which is existing)';
					break;
				case 66:
					message = 'Object locking, try later';
					break;
				case 70:
					message = 'Insufficient storage space on the server';
					break;
				case 71:
					message = 'Insufficient free space for the user';
					break;
				case 72:
					message = 'Insufficient storage space for temporary cache on the server.';
					break;
				case 99:
					message = 'API blow up due to something uncaptured';
					break;
				case 101:
					message = 'Duplicated request with type conflicts';
					break;
				case 102:
					message = 'Resource is inaccessible since it had been locked by other request';
					break;
				case 103:
					message = 'Permission denied';
					break;
				case 104:
					message = 'Operating behavior is not allowed';
					break;
				case 400:
					message = 'Bad Request check your request';
					break;
				case 401:
					message = 'Authentication failed';
					break;
				case 405:
					message = 'Method not allowed change your request type';
					break;
				case 500:
					message = 'API blow up due to something uncaptured';
					break;
				default:
					statuscode = '@@';
			}
			return message;
		},
	};
})

/*
 *           JJJJJJJJJJJ   SSSSSSSSSSSSSSS      OOOOOOOOO     NNNNNNNN        NNNNNNNN
 *           J:::::::::J SS:::::::::::::::S   OO:::::::::OO   N:::::::N       N::::::N
 *           J:::::::::JS:::::SSSSSS::::::S OO:::::::::::::OO N::::::::N      N::::::N
 *           JJ:::::::JJS:::::S     SSSSSSSO:::::::OOO:::::::ON:::::::::N     N::::::N
 *             J:::::J  S:::::S            O::::::O   O::::::ON::::::::::N    N::::::N
 *             J:::::J  S:::::S            O:::::O     O:::::ON:::::::::::N   N::::::N
 *             J:::::J   S::::SSSS         O:::::O     O:::::ON:::::::N::::N  N::::::N
 *             J:::::j    SS::::::SSSSS    O:::::O     O:::::ON::::::N N::::N N::::::N
 *             J:::::J      SSS::::::::SS  O:::::O     O:::::ON::::::N  N::::N:::::::N
 * JJJJJJJ     J:::::J         SSSSSS::::S O:::::O     O:::::ON::::::N   N:::::::::::N
 * J:::::J     J:::::J              S:::::SO:::::O     O:::::ON::::::N    N::::::::::N
 * J::::::J   J::::::J              S:::::SO::::::O   O::::::ON::::::N     N:::::::::N
 * J:::::::JJJ:::::::J  SSSSSSS     S:::::SO:::::::OOO:::::::ON::::::N      N::::::::N
 *  JJ:::::::::::::JJ   S::::::SSSSSS:::::S OO:::::::::::::OO N::::::N       N:::::::N
 *    JJ:::::::::JJ     S:::::::::::::::SS    OO:::::::::OO   N::::::N        N::::::N
 *      JJJJJJJJJ        SSSSSSSSSSSSSSS        OOOOOOOOO     NNNNNNNN         NNNNNNN
 */
/**
 * JSON Room
 *	Store data in JSON format
 * @author Festum
 * @date 130829
 */
.factory('jsonRoom', function () {
	return {
		get: function (key) {
			try {
				if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key) || '[]');
			} catch(e) { return undefined;}
		},
		set: function (key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	};
})

/*
 *                                                                       dddddddd
 * RRRRRRRRRRRRRRRRR                                                     d::::::d
 * R::::::::::::::::R                                                    d::::::d
 * R::::::RRRRRR:::::R                                                   d::::::d
 * RR:::::R     R:::::R                                                  d:::::d
 *   R::::R     R:::::R    eeeeeeeeeeee      aaaaaaaaaaaaa       ddddddddd:::::d     eeeeeeeeeeee    rrrrr   rrrrrrrrr
 *   R::::R     R:::::R  ee::::::::::::ee    a::::::::::::a    dd::::::::::::::d   ee::::::::::::ee  r::::rrr:::::::::r
 *   R::::RRRRRR:::::R  e::::::eeeee:::::ee  aaaaaaaaa:::::a  d::::::::::::::::d  e::::::eeeee:::::eer:::::::::::::::::r
 *   R:::::::::::::RR  e::::::e     e:::::e           a::::a d:::::::ddddd:::::d e::::::e     e:::::err::::::rrrrr::::::r
 *   R::::RRRRRR:::::R e:::::::eeeee::::::e    aaaaaaa:::::a d::::::d    d:::::d e:::::::eeeee::::::e r:::::r     r:::::r
 *   R::::R     R:::::Re:::::::::::::::::e   aa::::::::::::a d:::::d     d:::::d e:::::::::::::::::e  r:::::r     rrrrrrr
 *   R::::R     R:::::Re::::::eeeeeeeeeee   a::::aaaa::::::a d:::::d     d:::::d e::::::eeeeeeeeeee   r:::::r
 *   R::::R     R:::::Re:::::::e           a::::a    a:::::a d:::::d     d:::::d e:::::::e            r:::::r
 * RR:::::R     R:::::Re::::::::e          a::::a    a:::::a d::::::ddddd::::::dde::::::::e           r:::::r
 * R::::::R     R:::::R e::::::::eeeeeeee  a:::::aaaa::::::a  d:::::::::::::::::d e::::::::eeeeeeee   r:::::r
 * R::::::R     R:::::R  ee:::::::::::::e   a::::::::::aa:::a  d:::::::::ddd::::d  ee:::::::::::::e   r:::::r
 * RRRRRRRR     RRRRRRR    eeeeeeeeeeeeee    aaaaaaaaaa  aaaa   ddddddddd   ddddd    eeeeeeeeeeeeee   rrrrrrr
 */
/**
 * File Reader
 *	Open a pysicall file for upload
 * @author Festum
 * @date 130826
 */
.factory('fileReader', function($q, $log) {
	var onLoad = function(reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.resolve(reader.result);
			});
		};
	};

	var onError = function (reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.reject(reader.result);
			});
		};
	};

	var onProgress = function(reader, scope) {
		return function (event) {
			scope.$broadcast("fileProgress",
				{
					total: event.total,
					loaded: event.loaded
				});
		};
	};

	var getReader = function(deferred, scope) {
		var reader = new FileReader();
		reader.onload = onLoad(reader, deferred, scope);
		reader.onerror = onError(reader, deferred, scope);
		reader.onprogress = onProgress(reader, scope);
		return reader;
	};

	var readAsDataURL = function (file, scope) {
		var deferred = $q.defer();

		var reader = getReader(deferred, scope);
		reader.readAsDataURL(file);

		return deferred.promise;
	};

	return {
		readAsDataUrl: readAsDataURL
	};

})

/*
 * BBBBBBBBBBBBBBBBB                                                                  66666666          444444444
 * B::::::::::::::::B                                                                6::::::6          4::::::::4
 * B::::::BBBBBB:::::B                                                              6::::::6          4:::::::::4
 * BB:::::B     B:::::B                                                            6::::::6          4::::44::::4
 *   B::::B     B:::::B  aaaaaaaaaaaaa       ssssssssss       eeeeeeeeeeee        6::::::6          4::::4 4::::4
 *   B::::B     B:::::B  a::::::::::::a    ss::::::::::s    ee::::::::::::ee     6::::::6          4::::4  4::::4
 *   B::::BBBBBB:::::B   aaaaaaaaa:::::a ss:::::::::::::s  e::::::eeeee:::::ee  6::::::6          4::::4   4::::4
 *   B:::::::::::::BB             a::::a s::::::ssss:::::se::::::e     e:::::e 6::::::::66666    4::::444444::::444
 *   B::::BBBBBB:::::B     aaaaaaa:::::a  s:::::s  ssssss e:::::::eeeee::::::e6::::::::::::::66  4::::::::::::::::4
 *   B::::B     B:::::B  aa::::::::::::a    s::::::s      e:::::::::::::::::e 6::::::66666:::::6 4444444444:::::444
 *   B::::B     B:::::B a::::aaaa::::::a       s::::::s   e::::::eeeeeeeeeee  6:::::6     6:::::6          4::::4
 *   B::::B     B:::::Ba::::a    a:::::a ssssss   s:::::s e:::::::e           6:::::6     6:::::6          4::::4
 * BB:::::BBBBBB::::::Ba::::a    a:::::a s:::::ssss::::::se::::::::e          6::::::66666::::::6          4::::4
 * B:::::::::::::::::B a:::::aaaa::::::a s::::::::::::::s  e::::::::eeeeeeee   66:::::::::::::66         44::::::44
 * B::::::::::::::::B   a::::::::::aa:::a s:::::::::::ss    ee:::::::::::::e     66:::::::::66           4::::::::4
 * BBBBBBBBBBBBBBBBB     aaaaaaaaaa  aaaa  sssssssssss        eeeeeeeeeeeeee       666666666             4444444444
 */
.factory('base64', function() {
	var keyStr = 'ABCDEFGHIJKLMNOP' +
			'QRSTUVWXYZabcdef' +
			'ghijklmnopqrstuv' +
			'wxyz0123456789+/' +
			'=';
	return {
		encode: function (input) {
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;
			input=this._utf8_encode(input);

			do {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output +
						keyStr.charAt(enc1) +
						keyStr.charAt(enc2) +
						keyStr.charAt(enc3) +
						keyStr.charAt(enc4);
				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";
			} while (i < input.length);

			return output;
		},

		decode: function (input) {
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;

			// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
			var base64test = /[^A-Za-z0-9\+\/\=]/g;
			if (base64test.exec(input)) {
				alert("There were invalid base64 characters in the input text.\n" +
						"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
						"Expect errors in decoding.");
			}
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			do {
				enc1 = keyStr.indexOf(input.charAt(i++));
				enc2 = keyStr.indexOf(input.charAt(i++));
				enc3 = keyStr.indexOf(input.charAt(i++));
				enc4 = keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode(chr1);

				if (enc3 != 64)
					output = output + String.fromCharCode(chr2);
				if (enc4 != 64)
					output = output + String.fromCharCode(chr3);

				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";

			} while (i < input.length);
			output=this._utf8_decode(output);
			return output;
		},

		_utf8_encode: function(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},

		_utf8_decode: function(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		},
	};
})



/**
 *  KKKKKKKKK    KKKKKKK
 *  K:::::::K    K:::::K
 *  K:::::::K    K:::::K
 *  K:::::::K   K::::::K
 *  KK::::::K  K:::::KKK    eeeeeeeeeeee    yyyyyyy           yyyyyyy
 *    K:::::K K:::::K     ee::::::::::::ee   y:::::y         y:::::y
 *    K::::::K:::::K     e::::::eeeee:::::ee  y:::::y       y:::::y
 *    K:::::::::::K     e::::::e     e:::::e   y:::::y     y:::::y
 *    K:::::::::::K     e:::::::eeeee::::::e    y:::::y   y:::::y
 *    K::::::K:::::K    e:::::::::::::::::e      y:::::y y:::::y
 *    K:::::K K:::::K   e::::::eeeeeeeeeee        y:::::y:::::y
 *  KK::::::K  K:::::KKKe:::::::e                  y:::::::::y
 *  K:::::::K   K::::::Ke::::::::e                  y:::::::y
 *  K:::::::K    K:::::K e::::::::eeeeeeee           y:::::y
 *  K:::::::K    K:::::K  ee:::::::::::::e          y:::::y
 *  KKKKKKKKK    KKKKKKK    eeeeeeeeeeeeee         y:::::y
 *                                                y:::::y
 *                                               y:::::y
 *                                              y:::::y
 *                                             y:::::y
 *                                            yyyyyyy
 */
/**
 * Keyboard Manager
 *	This service was based on OpenJS library available in BSD License
 *	http://www.openjs.com/scripts/events/keyboard_shortcuts/index.php
 * @author Festum
 * @date 130828
 */
.factory('keyboardManager', ['$window', '$timeout', function ($window, $timeout) {
	var keyboardManagerService = {};

	var defaultOpt = {
		'type':             'keydown',
		'propagate':        false,
		'inputDisabled':    false,
		'target':           $window.document,
		'keyCode':          false
	};
	// Store all keyboard combination shortcuts
	keyboardManagerService.keyboardEvent = {}
	// Add a new keyboard combination shortcut
	keyboardManagerService.bind = function (label, callback, opt) {
		var fct, elt, code, k;
		// Initialize opt object
		opt   = angular.extend({}, defaultOpt, opt);
		label = label.toLowerCase();
		elt   = opt.target;
		if(typeof opt.target == 'string') elt = document.getElementById(opt.target);

		fct = function (e) {
			e = e || $window.event;

			// Disable event handler when focus input and textarea
			if (opt['inputDisabled']) {
				var elt;
				if (e.target) elt = e.target;
				else if (e.srcElement) elt = e.srcElement;
				if (elt.nodeType == 3) elt = elt.parentNode;
				if (elt.tagName == 'INPUT' || elt.tagName == 'TEXTAREA') return;
			}

			// Find out which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();

			if (code == 188) character = ","; // If the user presses , when the type is onkeydown
			if (code == 190) character = "."; // If the user presses , when the type is onkeydown

			var keys = label.split("+");
			// Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			// Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			};
			// Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,

				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,

				'pause':19,
				'break':19,

				'insert':45,
				'home':36,
				'delete':46,
				'end':35,

				'pageup':33,
				'page_up':33,
				'pu':33,

				'pagedown':34,
				'page_down':34,
				'pd':34,

				'left':37,
				'up':38,
				'right':39,
				'down':40,

				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			};
			// Some modifiers key
			var modifiers = {
				shift: {
					wanted:		false,
					pressed:	e.shiftKey ? true : false
				},
				ctrl : {
					wanted:		false,
					pressed:	e.ctrlKey ? true : false
				},
				alt  : {
					wanted:		false,
					pressed:	e.altKey ? true : false
				},
				meta : { //Meta is Mac specific
					wanted:		false,
					pressed:	e.metaKey ? true : false
				}
			};
			// Foreach keys in label (split on +)
			for(var i=0, l=keys.length; k=keys[i],i<l; i++) {
				switch (k) {
					case 'ctrl':
					case 'control':
						kp++;
						modifiers.ctrl.wanted = true;
						break;
					case 'shift':
					case 'alt':
					case 'meta':
						kp++;
						modifiers[k].wanted = true;
						break;
				}

				if (k.length > 1) { // If it is a special key
					if(special_keys[k] == code) kp++;
				} else if (opt['keyCode']) { // If a specific key is set into the config
					if (opt['keyCode'] == code) kp++;
				} else { // The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { // Stupid Shift key bug created by using lowercase
							character = shift_nums[character];
							if(character == k) kp++;
						}
					}
				}
			}

			if(kp == keys.length &&
				modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
				modifiers.shift.pressed == modifiers.shift.wanted &&
				modifiers.alt.pressed == modifiers.alt.wanted &&
				modifiers.meta.pressed == modifiers.meta.wanted) {
					$timeout(function() {
						callback(e);
					}, 1);

				if(!opt['propagate']) { // Stop the event
					// e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;

					// e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}

		};
		// Store shortcut
		keyboardManagerService.keyboardEvent[label] = {
			'callback':	fct,
			'target':	elt,
			'event':	opt['type']
		};
		//Attach the function with the event
		if(elt.addEventListener) elt.addEventListener(opt['type'], fct, false);
		else if(elt.attachEvent) elt.attachEvent('on' + opt['type'], fct);
		else elt['on' + opt['type']] = fct;
	};
	// Remove the shortcut - just specify the shortcut and I will remove the binding
	keyboardManagerService.unbind = function (label) {
		label = label.toLowerCase();
		var binding = keyboardManagerService.keyboardEvent[label];
		delete(keyboardManagerService.keyboardEvent[label])
		if(!binding) return;
		var type	= binding['event'],
		elt			= binding['target'],
		callback	= binding['callback'];
		if(elt.detachEvent) elt.detachEvent('on' + type, callback);
		else if(elt.removeEventListener) elt.removeEventListener(type, callback, false);
		else elt['on'+type] = false;
	};
	return keyboardManagerService;
}])

/*
 *                                                                                           dddddddd
 * BBBBBBBBBBBBBBBBB                                                                         d::::::d
 * B::::::::::::::::B                                                                        d::::::d
 * B::::::BBBBBB:::::B                                                                       d::::::d
 * BB:::::B     B:::::B                                                                      d:::::d
 *   B::::B     B:::::Brrrrr   rrrrrrrrr       eeeeeeeeeeee      aaaaaaaaaaaaa       ddddddddd:::::d
 *   B::::B     B:::::Br::::rrr:::::::::r    ee::::::::::::ee    a::::::::::::a    dd::::::::::::::d
 *   B::::BBBBBB:::::B r:::::::::::::::::r  e::::::eeeee:::::ee  aaaaaaaaa:::::a  d::::::::::::::::d
 *   B:::::::::::::BB  rr::::::rrrrr::::::re::::::e     e:::::e           a::::a d:::::::ddddd:::::d
 *   B::::BBBBBB:::::B  r:::::r     r:::::re:::::::eeeee::::::e    aaaaaaa:::::a d::::::d    d:::::d
 *   B::::B     B:::::B r:::::r     rrrrrrre:::::::::::::::::e   aa::::::::::::a d:::::d     d:::::d
 *   B::::B     B:::::B r:::::r            e::::::eeeeeeeeeee   a::::aaaa::::::a d:::::d     d:::::d
 *   B::::B     B:::::B r:::::r            e:::::::e           a::::a    a:::::a d:::::d     d:::::d
 * BB:::::BBBBBB::::::B r:::::r            e::::::::e          a::::a    a:::::a d::::::ddddd::::::dd
 * B:::::::::::::::::B  r:::::r             e::::::::eeeeeeee  a:::::aaaa::::::a  d:::::::::::::::::d
 * B::::::::::::::::B   r:::::r              ee:::::::::::::e   a::::::::::aa:::a  d:::::::::ddd::::d
 * BBBBBBBBBBBBBBBBB    rrrrrrr                eeeeeeeeeeeeee    aaaaaaaaaa  aaaa   ddddddddd   ddddd
 */
/**
 * Breadcrumbs
 * @author Festum
 * @date 131103
 */
.factory('breadcrumbs', function() {
	var breadcrumbs = [];
	var breadcrumbsService = {};

	breadcrumbsService.set = function(urls) {
		breadcrumbs = urls;
	};

	breadcrumbsService.getAll = function() {
		return breadcrumbs;
	};

	breadcrumbsService.getFirst = function() {
		return breadcrumbs[0] || {};
	};

	return breadcrumbsService;
})


;