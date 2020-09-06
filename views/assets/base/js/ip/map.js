(function (define) {
    define(function () {
        var freeze, reduceArray, slice, undef;

        when.defer = defer;
        when.reject = reject;
        when.isPromise = isPromise;

        when.all = all;
        when.some = some;
        when.any = any;

        when.map = map;
        when.reduce = reduce;

        when.chain = chain;

        freeze = Object.freeze || function (o) { return o; };

        function Promise() { }

        Promise.prototype = freeze({
            always: function (alwaysback, progback) {
                return this.then(alwaysback, alwaysback, progback);
            },

            otherwise: function (errback) {
                return this.then(undef, errback);
            }
        });

        function resolved(value) {

            var p = new Promise();

            p.then = function (callback) {
                var nextValue;
                try {
                    if (callback) nextValue = callback(value);
                    return promise(nextValue === undef ? value : nextValue);
                } catch (e) {
                    return rejected(e);
                }
            };

            return freeze(p);
        }

        function rejected(reason) {

            var p = new Promise();

            p.then = function (callback, errback) {
                var nextValue;
                try {
                    if (errback) {
                        nextValue = errback(reason);
                        return promise(nextValue === undef ? reason : nextValue)
                    }

                    return rejected(reason);

                } catch (e) {
                    return rejected(e);
                }
            };

            return freeze(p);
        }
        
        function reject(promiseOrValue) {
            return when(promiseOrValue, function (value) {
                return rejected(value);
            });
        }

        function defer() {
            var deferred, promise, listeners, progressHandlers, _then, _progress, complete;

            listeners = [];
            progressHandlers = [];

            _then = function unresolvedThen(callback, errback, progback) {
                var deferred = defer();

                listeners.push(function (promise) {
                    promise.then(callback, errback)
					.then(deferred.resolve, deferred.reject, deferred.progress);
                });

                progback && progressHandlers.push(progback);

                return deferred.promise;
            };

            function then(callback, errback, progback) {
                return _then(callback, errback, progback);
            }

            function resolve(val) {
                complete(resolved(val));
            }

            function reject(err) {
                complete(rejected(err));
            }

            _progress = function (update) {
                var progress, i = 0;
                while (progress = progressHandlers[i++]) progress(update);
            };

            function progress(update) {
                _progress(update);
            }

            complete = function (completed) {
                var listener, i = 0;

                _then = completed.then;

                complete = _progress = function alreadyCompleted() {
                    throw new Error("already completed");
                };

                progressHandlers = undef;

                while (listener = listeners[i++]) {
                    listener(completed);
                }

                listeners = [];
            };
            
            deferred = {};

            promise = new Promise();
            promise.then = deferred.then = then;

            deferred.promise = freeze(promise);

            deferred.resolver = freeze({
                resolve: (deferred.resolve = resolve),
                reject: (deferred.reject = reject),
                progress: (deferred.progress = progress)
            });

            return deferred;
        }

        function isPromise(promiseOrValue) {
            return promiseOrValue && typeof promiseOrValue.then === 'function';
        }

        function when(promiseOrValue, callback, errback, progressHandler) {
            var trustedPromise = promise(promiseOrValue);

            return trustedPromise.then(callback, errback, progressHandler);
        }

        function promise(promiseOrValue) {
            var promise, deferred;

            if (promiseOrValue instanceof Promise) {
                promise = promiseOrValue;

            } else {
                deferred = defer();
                if (isPromise(promiseOrValue)) {
                    promiseOrValue.then(deferred.resolve, deferred.reject, deferred.progress);
                    promise = deferred.promise;

                } else {
                    deferred.resolve(promiseOrValue);
                    promise = deferred.promise;
                }
            }

            return promise;
        }
        
        function some(promisesOrValues, howMany, callback, errback, progressHandler) {

            checkCallbacks(2, arguments);

            return when(promisesOrValues, function (promisesOrValues) {

                var toResolve, results, ret, deferred, resolver, rejecter, handleProgress, len, i;

                len = promisesOrValues.length >>> 0;

                toResolve = Math.max(0, Math.min(howMany, len));
                results = [];
                deferred = defer();
                ret = when(deferred, callback, errback, progressHandler);

                function resolve(val) {
                    resolver(val);
                }

                function reject(err) {
                    rejecter(err);
                }

                function progress(update) {
                    handleProgress(update);
                }

                function complete() {
                    resolver = rejecter = handleProgress = noop;
                }

                if (!toResolve) {
                    deferred.resolve(results);

                } else {
                    resolver = function (val) {
                        results.push(val);

                        if (! --toResolve) {
                            complete();
                            deferred.resolve(results);
                        }
                    };

                    rejecter = function (err) {
                        complete();
                        deferred.reject(err);
                    };

                    handleProgress = deferred.progress;

                    for (i = 0; i < len; ++i) {
                        if (i in promisesOrValues) {
                            when(promisesOrValues[i], resolve, reject, progress);
                        }
                    }
                }

                return ret;
            });
        }

        function all(promisesOrValues, callback, errback, progressHandler) {

            checkCallbacks(1, arguments);

            return when(promisesOrValues, function (promisesOrValues) {
                return _reduce(promisesOrValues, reduceIntoArray, []);
            }).then(callback, errback, progressHandler);
        }

        function reduceIntoArray(current, val, i) {
            current[i] = val;
            return current;
        }

        function any(promisesOrValues, callback, errback, progressHandler) {

            function unwrapSingleResult(val) {
                return callback ? callback(val[0]) : val[0];
            }

            return some(promisesOrValues, 1, unwrapSingleResult, errback, progressHandler);
        }
        
        function map(promise, mapFunc) {
            return when(promise, function (array) {
                return _map(array, mapFunc);
            });
        }

        function _map(promisesOrValues, mapFunc) {

            var results, len, i;

            len = promisesOrValues.length >>> 0;
            results = new Array(len);

            for (i = 0; i < len; i++) {
                if (i in promisesOrValues)
                    results[i] = when(promisesOrValues[i], mapFunc);
            }

            return _reduce(results, reduceIntoArray, results);
        }
        
        function reduce(promise, reduceFunc, initialValue) {
            var args = slice.call(arguments, 1);
            return when(promise, function (array) {
                return _reduce.apply(undef, [array].concat(args));
            });
        }
        
        function _reduce(promisesOrValues, reduceFunc, initialValue) {

            var total, args;

            total = promisesOrValues.length;

            args = [
			function (current, val, i) {
			    return when(current, function (c) {
			        return when(val, function (value) {
			            return reduceFunc(c, value, i, total);
			        });
			    });
			}
            ];

            if (arguments.length > 2) args.push(initialValue);

            return reduceArray.apply(promisesOrValues, args);
        }

        function chain(promiseOrValue, resolver, resolveValue) {
            var useResolveValue = arguments.length > 2;

            return when(promiseOrValue,
			function (val) {
			    if (useResolveValue) val = resolveValue;
			    resolver.resolve(val);
			    return val;
			},
			function (e) {
			    resolver.reject(e);
			    return rejected(e);
			},
			resolver.progress
		);
        }

        function checkCallbacks(start, arrayOfCallbacks) {
            var arg, i = arrayOfCallbacks.length;
            while (i > start) {
                arg = arrayOfCallbacks[--i];
                if (arg != null && typeof arg != 'function') throw new Error('callback is not a function');
            }
        }

        function noop() { }

        slice = [].slice;

        reduceArray = [].reduce ||
		function (reduceFunc) {
                    var arr, args, reduced, len, i;

		    i = 0;
		    arr = Object(this);
		    len = arr.length >>> 0;
		    args = arguments;

		    if (args.length <= 1) {
		        for (; ;) {
		            if (i in arr) {
		                reduced = arr[i++];
		                break;
		            }

		            if (++i >= len) {
		                throw new TypeError();
		            }
		        }
		    } else {
		        reduced = args[1];
		    }

		    for (; i < len; ++i) {
		        if (i in arr)
		            reduced = reduceFunc(reduced, arr[i], i, arr);
		    }

		    return reduced;
		};

        return when;
    });
})(typeof define == 'function'
	? define
	: function (factory) {
	    typeof module != 'undefined'
		? (module.exports = factory())
		: (jQuery.layout_when = factory());
	}
);

(function ($) {
    $.fn.layout = function (method) {
        var m = $.layout.impl;
        if ($.isFunction(m[method])) {
            return m[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return m.bind.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.layout');
        }
    };

    $.layout = {
        version: "1.2.10",
        render_defaults: {
            isSelectable: true,
            isDeselectable: true,
            fade: false,
            fadeDuration: 150,
            fill: true,
            fillColor: '000000',
            fillColorMask: 'FFFFFF',
            fillOpacity: 0.7,
            highlight: true,
            stroke: false,
            strokeColor: 'ff0000',
            strokeOpacity: 1,
            strokeWidth: 1,
            includeKeys: '',
            altImage: null,
            altImageId: null,           
            altImages: {}
        },
        defaults: {
            clickNavigate: false,
            wrapClass: null,
            wrapCss: null,
            onGetList: null,
            sortList: false,
            listenToList: false,
            mapKey: '',
            mapValue: '',
            singleSelect: false,
            listKey: 'value',
            listSelectedAttribute: 'selected',
            listSelectedClass: null,
            onClick: null,
            onMouseover: null,
            onMouseout: null,
            mouseoutDelay: 0,
            onStateChange: null,
            boundList: null,
            onConfigured: null,
            configTimeout: 30000,
            noHrefIsMask: true,
            scaleMap: true,
            safeLoad: false,
            areas: []
        },
        shared_defaults: {
            render_highlight: { fade: true },
            render_select: { fade: false },
            staticState: null,
            selected: null
        },
        area_defaults:
        {
            includeKeys: '',
            isMask: false
        },
        canvas_style: {
            position: 'absolute',
            left: 0,
            top: 0,
            padding: 0,
            border: 0
        },
        hasCanvas: null,
        isTouch: null,
        map_cache: [],
        hooks: {},
        addHook: function (name, callback) {
            this.hooks[name] = (this.hooks[name] || []).push(callback);
        },
        callHooks: function (name, context) {
            $.each(this.hooks[name] || [], function (i, e) {
                e.apply(context);
            });
        },
        utils: {
            when: $.layout_when,
            defer: $.layout_when.defer,

            subclass: function (BaseClass, constr) {
                var Subclass = function () {
                    var me = this,
                        args = Array.prototype.slice.call(arguments, 0);
                    me.base = BaseClass.prototype;
                    me.base.init = function () {
                        BaseClass.prototype.constructor.apply(me, args);
                    };
                    constr.apply(me, args);
                };
                Subclass.prototype = new BaseClass();
                Subclass.prototype.constructor = Subclass;
                return Subclass;
            },
            asArray: function (obj) {
                return obj.constructor === Array ?
                    obj : this.split(obj);
            },
            split: function (text, cb) {
                var i, el, arr = text.split(',');
                for (i = 0; i < arr.length; i++) {
                    el = $.trim(arr[i]);
                    if (el === '') {
                        arr.splice(i, 1);
                    } else {
                        arr[i] = cb ? cb(el) : el;
                    }
                }
                return arr;
            },
            updateProps: function (_target, _template) {
                var onlyProps,
                    target = _target || {},
                    template = $.isEmptyObject(target) ? _template : _target;

                onlyProps = [];
                $.each(template, function (prop) {
                    onlyProps.push(prop);
                });

                $.each(Array.prototype.slice.call(arguments, 1), function (i, src) {
                    $.each(src || {}, function (prop) {
                        if (!onlyProps || $.inArray(prop, onlyProps) >= 0) {
                            var p = src[prop];

                            if ($.isPlainObject(p)) {
                                target[prop] = $.extend(target[prop] || {}, p);
                            } else if (p && p.constructor === Array) {
                                target[prop] = p.slice(0);
                            } else if (typeof p !== 'undefined') {
                                target[prop] = src[prop];
                            }

                        }
                    });
                });
                return target;
            },
            isElement: function (o) {
                return (typeof HTMLElement === "object" ? o instanceof HTMLElement :
                        o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string");
            },

            indexOfProp: function (obj, prop, val) {
                var result = obj.constructor === Array ? -1 : null;
                $.each(obj, function (i, e) {
                    if (e && (prop ? e[prop] : e) === val) {
                        result = i;
                        return false;
                    }
                });
                return result;
            },
            boolOrDefault: function (obj, def) {
                return this.isBool(obj) ?
                    obj : def || false;
            },
            isBool: function (obj) {
                return typeof obj === "boolean";
            },
            isUndef: function (obj) {
                return typeof obj === "undefined";
            },
            ifFunction: function (obj, that, args) {
                if ($.isFunction(obj)) {
                    obj.call(that, args);
                }
            },
            size: function (image, raw) {
                var u = $.layout.utils;
                return {
                    width: raw ? (image.width || image.naturalWidth) : u.imgWidth(image, true),
                    height: raw ? (image.height || image.naturalHeight) : u.imgHeight(image, true),
                    complete: function () { return !!this.height && !!this.width; }
                };
            },

            setOpacity: function (el, opacity) {
                if ($.layout.hasCanvas()) {
                    el.style.opacity = opacity;
                } else {
                    $(el).each(function (i, e) {
                        if (typeof e.opacity !== 'undefined') {
                            e.opacity = opacity;
                        } else {
                            $(e).css("opacity", opacity);
                        }
                    });
                }
            },

            fader: (function () {
                var elements = {},
                        lastKey = 0,
                        fade_func = function (el, op, endOp, duration) {
                            var index,
                                cbIntervals = duration / 15,
                                obj, u = $.layout.utils;

                            if (typeof el === 'number') {
                                obj = elements[el];
                                if (!obj) {
                                    return;
                                }
                            } else {
                                index = u.indexOfProp(elements, null, el);
                                if (index) {
                                    delete elements[index];
                                }
                                elements[++lastKey] = obj = el;
                                el = lastKey;
                            }

                            endOp = endOp || 1;

                            op = (op + (endOp / cbIntervals) > endOp - 0.01) ? endOp : op + (endOp / cbIntervals);

                            u.setOpacity(obj, op);
                            if (op < endOp) {
                                setTimeout(function () {
                                    fade_func(el, op, endOp, duration);
                                }, 15);
                            }
                        };
                return fade_func;
            }())
        },
        getBoundList: function (opts, key_list) {
            if (!opts.boundList) {
                return null;
            }
            var index, key, result = $(), list = $.layout.utils.split(key_list);
            opts.boundList.each(function (i, e) {
                for (index = 0; index < list.length; index++) {
                    key = list[index];
                    if ($(e).is('[' + opts.listKey + '="' + key + '"]')) {
                        result = result.add(e);
                    }
                }
            });
            return result;
        },
        setBoundListProperties: function (opts, target, selected) {
            target.each(function (i, e) {
                if (opts.listSelectedClass) {
                    if (selected) {
                        $(e).addClass(opts.listSelectedClass);
                    } else {
                        $(e).removeClass(opts.listSelectedClass);
                    }
                }
                if (opts.listSelectedAttribute) {
                    $(e).attr(opts.listSelectedAttribute, selected);
                }
            });
        },
        getMapDataIndex: function (obj) {
            var img, id;
            switch (obj.tagName && obj.tagName.toLowerCase()) {
                case 'area':
                    id = $(obj).parent().attr('name');
                    img = $("img[usemap='#" + id + "']")[0];
                    break;
                case 'img':
                    img = obj;
                    break;
            }
            return img ?
                this.utils.indexOfProp(this.map_cache, 'image', img) : -1;
        },
        getMapData: function (obj) {
            var index = this.getMapDataIndex(obj.length ? obj[0] : obj);
            if (index >= 0) {
                return index >= 0 ? this.map_cache[index] : null;
            }
        },
        
        queueCommand: function (map_data, that, command, args) {
            if (!map_data) {
                return false;
            }
            if (!map_data.complete || map_data.currentAction) {
                map_data.commands.push(
                {
                    that: that,
                    command: command,
                    args: args
                });
                return true;
            }
            return false;
        },
        unload: function () {
            this.impl.unload();
            this.utils = null;
            this.impl = null;
            $.fn.layout = null;
            $.layout = null;
            $('*').unbind();
        }
    };

    var m = $.layout,
        u = m.utils,
        ap = Array.prototype;

    $.each(["width", "height"], function (i, e) {
        var capProp = e.substr(0, 1).toUpperCase() + e.substr(1);
        u["img" + capProp] = function (img, jqwidth) {
            return (jqwidth ? $(img)[e]() : 0) ||
                img[e] || img["natural" + capProp] || img["client" + capProp] || img["offset" + capProp];
        };

    });

    m.Method = function (that, func_map, func_area, opts) {
        var me = this;
        me.name = opts.name;
        me.output = that;
        me.input = that;
        me.first = opts.first || false;
        me.args = opts.args ? ap.slice.call(opts.args, 0) : [];
        me.key = opts.key;
        me.func_map = func_map;
        me.func_area = func_area;
        me.name = opts.name;
        me.allowAsync = opts.allowAsync || false;
    };
    m.Method.prototype = {
        constructor: m.Method,
        go: function () {
            var i, data, ar, len, result, src = this.input,
                    area_list = [],
                    me = this;

            len = src.length;
            for (i = 0; i < len; i++) {
                data = $.layout.getMapData(src[i]);
                if (data) {
                    if (!me.allowAsync && m.queueCommand(data, me.input, me.name, me.args)) {
                        if (this.first) {
                            result = '';
                        }
                        continue;
                    }

                    ar = data.getData(src[i].nodeName === 'AREA' ? src[i] : this.key);
                    if (ar) {
                        if ($.inArray(ar, area_list) < 0) {
                            area_list.push(ar);
                        }
                    } else {
                        result = this.func_map.apply(data, me.args);
                    }
                    if (this.first || typeof result !== 'undefined') {
                        break;
                    }
                }
            }

            $(area_list).each(function (i, e) {
                result = me.func_area.apply(e, me.args);
            });

            if (typeof result !== 'undefined') {
                return result;
            } else {
                return this.output;
            }
        }
    };

    $.layout.impl = (function () {
        var me = {},
        addMap = function (map_data) {
            return m.map_cache.push(map_data) - 1;
        },
        removeMap = function (map_data) {
            m.map_cache.splice(map_data.index, 1);
            for (var i = m.map_cache.length - 1; i >= this.index; i--) {
                m.map_cache[i].index--;
            }
        };

        function hasVml() {
            var a = $('<div />').appendTo('body');
            a.html('<v:shape id="vml_flag1" adj="1" />');

            var b = a[0].firstChild;
            b.style.behavior = "url(#default#VML)";
            var has = b ? typeof b.adj === "object" : true;
            a.remove();
            return has;
        }
        
        function namespaces() {
            return typeof (document.namespaces) === 'object' ?
                document.namespaces :
                null;
        }

        function hasCanvas() {
            var d = namespaces();

            return d && d.g_vml_ ?
               false :
               $('<canvas />')[0].getContext ?
                   true :
                   false;
        }
        
        function merge_areas(map_data, areas) {
            var ar, index,
                map_areas = map_data.options.areas;

            if (areas) {
                $.each(areas, function (i, e) {
                    if (!e || !e.key) {
                        return;
                    }

                    index = u.indexOfProp(map_areas, "key", e.key);

                    if (index >= 0) {
                        $.extend(map_areas[index], e);
                    }
                    else {
                        map_areas.push(e);
                    }
                    ar = map_data.getDataForKey(e.key);
                    if (ar) {
                        $.extend(ar.options, e);
                    }
                });
            }
        }
        function merge_options(map_data, options) {
            var temp_opts = u.updateProps({}, options);
            delete temp_opts.areas;

            u.updateProps(map_data.options, temp_opts);

            merge_areas(map_data, options.areas);
            u.updateProps(map_data.area_options, map_data.options);
        }

        me.get = function (key) {
            var md = m.getMapData(this);
            if (!(md && md.complete)) {
                throw ("Can't access data until binding complete.");
            }

            return (new m.Method(this,
                function () {
                    return this.getSelected();
                },
                function () {
                    return this.isSelected();
                },
                {
                    name: 'get',
                    args: arguments,
                    key: key,
                    first: true,
                    allowAsync: true,
                    defaultReturn: ''
                }
            )).go();
        };
        me.data = function (key) {
            return (new m.Method(this,
                null,
                function () {
                    return this;
                },
                {
                    name: 'data',
                    args: arguments,
                    key: key
                }
            )).go();
        };

        me.highlight = function (key) {
            return (new m.Method(this,
                function () {
                    if (key === false) {
                        this.ensureNoHighlight();
                    } else {
                        var id = this.highlightId;
                        return id >= 0 ? this.data[id].key : null;
                    }
                },
                function () {
                    this.highlight();
                },
                {
                    name: 'highlight',
                    args: arguments,
                    key: key,
                    first: true
                }
            )).go();
        };
        
        me.keys = function (key, all) {
            var keyList = [],
                md = m.getMapData(this);

            if (!(md && md.complete)) {
                throw ("Can't access data until binding complete.");
            }


            function addUniqueKeys(ad) {
                var areas, keys = [];
                if (!all) {
                    keys.push(ad.key);
                } else {
                    areas = ad.areas();
                    $.each(areas, function (i, e) {
                        keys = keys.concat(e.keys);
                    });
                }
                $.each(keys, function (i, e) {
                    if ($.inArray(e, keyList) < 0) {
                        keyList.push(e);
                    }
                });
            }

            if (!(md && md.complete)) {
                return '';
            }
            if (typeof key === 'string') {
                if (all) {
                    addUniqueKeys(md.getDataForKey(key));
                } else {
                    keyList = [md.getKeysForGroup(key)];
                }
            } else {
                all = key;
                this.each(function (i, e) {
                    if (e.nodeName === 'AREA') {
                        addUniqueKeys(md.getDataForArea(e));
                    }
                });
            }
            return keyList.join(',');


        };
        me.select = function () {
            me.set.call(this, true);
        };
        me.deselect = function () {
            me.set.call(this, false);
        };
        
        me.set = function (selected, key, options) {
            var lastMap, map_data, opts = options,
                key_list, area_list;

            function setSelection(ar) {
                if (ar) {
                    switch (selected) {
                        case true:
                            ar.select(opts); break;
                        case false:
                            ar.deselect(true); break;
                        default:
                            ar.toggle(opts); break;
                    }
                }
            }
            function addArea(ar) {
                if (ar && $.inArray(ar, area_list) < 0) {
                    area_list.push(ar);
                    key_list += (key_list === '' ? '' : ',') + ar.key;
                }
            }

            function finishSetForMap(map_data) {
                $.each(area_list, function (i, el) {
                    setSelection(el);
                });
                if (!selected) {
                    map_data.removeSelectionFinish();
                }
                if (map_data.options.boundList) {
                    m.setBoundListProperties(map_data.options, m.getBoundList(map_data.options, key_list), selected);
                }
            }

            this.filter('img,area').each(function (i, e) {
                var keys;
                map_data = m.getMapData(e);

                if (map_data !== lastMap) {
                    if (lastMap) {
                        finishSetForMap(lastMap);
                    }

                    area_list = [];
                    key_list = '';
                }

                if (map_data) {

                    keys = '';
                    if (e.nodeName.toUpperCase() === 'IMG') {
                        if (!m.queueCommand(map_data, $(e), 'set', [selected, key, opts])) {
                            if (key instanceof Array) {
                                if (key.length) {
                                    keys = key.join(",");
                                }
                            }
                            else {
                                keys = key;
                            }

                            if (keys) {
                                $.each(u.split(keys), function (i, key) {
                                    addArea(map_data.getDataForKey(key.toString()));
                                    lastMap = map_data;
                                });
                            }
                        }
                    } else {
                        opts = key;
                        if (!m.queueCommand(map_data, $(e), 'set', [selected, opts])) {
                            addArea(map_data.getDataForArea(e));
                            lastMap = map_data;
                        }

                    }
                }
            });

            if (map_data) {
                finishSetForMap(map_data);
            }


            return this;
        };
        me.unbind = function (preserveState) {
            return (new m.Method(this,
                function () {
                    this.clearEvents();
                    this.clearMapData(preserveState);
                    removeMap(this);
                },
                null,
                {
                    name: 'unbind',
                    args: arguments
                }
            )).go();
        };
        
        me.rebind = function (options) {
            return (new m.Method(this,
                function () {
                    var me = this;

                    me.complete = false;
                    me.configureOptions(options);
                    me.bindImages().then(function () {
                        me.buildDataset(true);
                        me.complete = true;
                    });
                },
                null,
                {
                    name: 'rebind',
                    args: arguments
                }
            )).go();
        };

        me.get_options = function (key, effective) {
            var eff = u.isBool(key) ? key : effective;
            return (new m.Method(this,
                function () {
                    var opts = $.extend({}, this.options);
                    if (eff) {
                        opts.render_select = u.updateProps(
                            {},
                            m.render_defaults,
                            opts,
                            opts.render_select);

                        opts.render_highlight = u.updateProps(
                            {},
                            m.render_defaults,
                            opts,
                            opts.render_highlight);
                    }
                    return opts;
                },
                function () {
                    return eff ? this.effectiveOptions() : this.options;
                },
                {
                    name: 'get_options',
                    args: arguments,
                    first: true,
                    allowAsync: true,
                    key: key
                }
            )).go();
        };

        me.set_options = function (options) {
            return (new m.Method(this,
                function () {
                    merge_options(this, options);
                },
                null,
                {
                    name: 'set_options',
                    args: arguments
                }
            )).go();
        };
        me.unload = function () {
            var i;
            for (i = m.map_cache.length - 1; i >= 0; i--) {
                if (m.map_cache[i]) {
                    me.unbind.call($(m.map_cache[i].image));
                }
            }
            me.graphics = null;
        };

        me.snapshot = function () {
            return (new m.Method(this,
                function () {
                    $.each(this.data, function (i, e) {
                        e.selected = false;
                    });

                    this.base_canvas = this.graphics.createVisibleCanvas(this);
                    $(this.image).before(this.base_canvas);
                },
                null,
                { name: 'snapshot' }
            )).go();
        };

        me.state = function () {
            var md, result = null;
            $(this).each(function (i, e) {
                if (e.nodeName === 'IMG') {
                    md = m.getMapData(e);
                    if (md) {
                        result = md.state();
                    }
                    return false;
                }
            });
            return result;
        };

        me.bind = function (options) {

            return this.each(function (i, e) {
                var img, map, usemap, md;

                img = $(e);

                md = m.getMapData(e);

                if (md) {
                    me.unbind.apply(img);
                    if (!md.complete) {
                        img.bind();
                        return true;
                    }
                    md = null;
                }

                usemap = this.getAttribute('usemap');
                map = usemap && $('map[name="' + usemap.substr(1) + '"]');
                if (!(img.is('img') && usemap)) {
                    return true;
                }

                img.css('border', 0);

                if (!md) {
                    md = new m.MapData(this, options);

                    md.index = addMap(md);
                    md.map = map;
                    md.bindImages().then(function () {
                        md.initialize();
                    });
                }
            });
        };

        me.init = function (useCanvas) {
            var style, shapes;
            
            m.hasCanvas = function () {
                if (!u.isBool(m.hasCanvas.value)) {
                    m.hasCanvas.value = u.isBool(useCanvas) ?
                        useCanvas :
                        hasCanvas();
                }
                return m.hasCanvas.value;
            };
            m.hasVml = function () {
                if (!u.isBool(m.hasVml.value)) {
                    var d = namespaces();

                    if (d && !d.v) {
                        d.add("v", "urn:schemas-microsoft-com:vml");
                        style = document.createStyleSheet();
                        shapes = ['shape', 'rect', 'oval', 'circ', 'fill', 'stroke', 'imagedata', 'group', 'textbox'];
                        $.each(shapes,
                        function (i, el) {
                            style.addRule('v\\:' + el, "behavior: url(#default#VML); antialias:true");
                        });
                    }
                    m.hasVml.value = hasVml();
                }

                return m.hasVml.value;
            };

            m.isTouch = !!document.documentElement.ontouchstart;

            $.extend(m.defaults, m.render_defaults, m.shared_defaults);
            $.extend(m.area_defaults, m.render_defaults, m.shared_defaults);

        };
        me.test = function (obj) {
            return eval(obj);
        };
        return me;
    }());

    $.layout.impl.init();


}(jQuery));

(function ($) {
    var p, m = $.layout,
        u = m.utils,
        canvasMethods,
        vmlMethods;

    function addShapeGroupImpl(graphics, areaData, options) {
        var me = graphics,
            md = me.map_data,
            isMask = options.isMask;

        $.each(areaData.areas(), function (i, e) {
            options.isMask = isMask || (e.nohref && md.options.noHrefIsMask);
            me.addShape(e, options);
        });

        options.isMask = isMask;

    }

    function hex_to_decimal(hex) {
        return Math.max(0, Math.min(parseInt(hex, 16), 255));
    }
    function css3color(color, opacity) {
        return 'rgba(' + hex_to_decimal(color.substr(0, 2)) + ','
                + hex_to_decimal(color.substr(2, 2)) + ','
                + hex_to_decimal(color.substr(4, 2)) + ',' + opacity + ')';
    }

    m.Graphics = function (map_data) {
        var me = this;
        me.active = false;
        me.canvas = null;
        me.width = 0;
        me.height = 0;
        me.shapes = [];
        me.masks = [];
        me.map_data = map_data;
    };

    p = m.Graphics.prototype = {
        constructor: m.Graphics,

        begin: function (canvas, elementName) {
            var c = $(canvas);

            this.elementName = elementName;
            this.canvas = canvas;

            this.width = c.width();
            this.height = c.height();
            this.shapes = [];
            this.masks = [];
            this.active = true;

        },

        addShape: function (mapArea, options) {
            var addto = options.isMask ? this.masks : this.shapes;
            addto.push({ mapArea: mapArea, options: options });
        },

        createVisibleCanvas: function (mapData) {
            return $(this.createCanvasFor(mapData))
                .addClass('layout_el')
                .css(m.canvas_style)[0];
        },

        addShapeGroup: function (areaData, mode, options) {
            var me = this,
                list, name, canvas,
                map_data = this.map_data,
                opts = areaData.effectiveRenderOptions(mode);

            if (options) {
                $.extend(opts, options);
            }

            if (mode === 'select') {
                name = "static_" + areaData.areaId.toString();
                canvas = map_data.base_canvas;
            } else {
                canvas = map_data.overlay_canvas;
            }

            me.begin(canvas, name);

            if (opts.includeKeys) {
                list = u.split(opts.includeKeys);
                $.each(list, function (i, e) {
                    var areaData = map_data.getDataForKey(e.toString());
                    addShapeGroupImpl(me, areaData, areaData.effectiveRenderOptions(mode));
                });
            }

            addShapeGroupImpl(me, areaData, opts);
            me.render();
            if (opts.fade) {
                u.fader(m.hasCanvas() ?
                    canvas :
                    $(canvas).find('._fill').not('.layout_mask'),
                0,
                m.hasCanvas() ?
                    1 :
                    opts.fillOpacity,
                opts.fadeDuration);

            }

        }
    };

    function noop() { }
    canvasMethods = {
        renderShape: function (context, mapArea, offset) {
            var i,
                c = mapArea.coords(null, offset);

            switch (mapArea.shape) {
                case 'rect':
                    context.rect(c[0], c[1], c[2] - c[0], c[3] - c[1]);
                    break;
                case 'poly':
                    context.moveTo(c[0], c[1]);

                    for (i = 2; i < mapArea.length; i += 2) {
                        context.lineTo(c[i], c[i + 1]);
                    }
                    context.lineTo(c[0], c[1]);
                    break;
                case 'circ':
                case 'circle':
                    context.arc(c[0], c[1], c[2], 0, Math.PI * 2, false);
                    break;
            }
        },
        addAltImage: function (context, image, mapArea, options) {
            context.beginPath();

            this.renderShape(context, mapArea);
            context.closePath();
            context.clip();

            context.globalAlpha = options.altImageOpacity || options.fillOpacity;

            context.drawImage(image, 0, 0, mapArea.owner.scaleInfo.width, mapArea.owner.scaleInfo.height);
        },
        render: function () {
            var maskCanvas, maskContext,
                        me = this,
                        md = me.map_data,
                        hasMasks = me.masks.length,
                        shapeCanvas = me.createCanvasFor(md),
                        shapeContext = shapeCanvas.getContext('2d'),
                        context = me.canvas.getContext('2d');

            if (hasMasks) {
                maskCanvas = me.createCanvasFor(md);
                maskContext = maskCanvas.getContext('2d');
                maskContext.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

                $.each(me.masks, function (i, e) {
                    maskContext.save();
                    maskContext.beginPath();
                    me.renderShape(maskContext, e.mapArea);
                    maskContext.closePath();
                    maskContext.clip();
                    maskContext.lineWidth = 0;
                    maskContext.fillStyle = '#000';
                    maskContext.fill();
                    maskContext.restore();
                });

            }

            $.each(me.shapes, function (i, s) {
                shapeContext.save();
                if (s.options.fill) {
                    if (s.options.altImageId) {
                        me.addAltImage(shapeContext, md.images[s.options.altImageId], s.mapArea, s.options);
                    } else {
                        shapeContext.beginPath();
                        me.renderShape(shapeContext, s.mapArea);
                        shapeContext.closePath();
                        shapeContext.fillStyle = css3color(s.options.fillColor, s.options.fillOpacity);
                        shapeContext.fill();
                    }
                }
                shapeContext.restore();
            });

            $.each(me.shapes.concat(me.masks), function (i, s) {
                var offset = s.options.strokeWidth === 1 ? 0.5 : 0;
                if (s.options.stroke) {
                    shapeContext.save();
                    shapeContext.strokeStyle = css3color(s.options.strokeColor, s.options.strokeOpacity);
                    shapeContext.lineWidth = s.options.strokeWidth;

                    shapeContext.beginPath();

                    me.renderShape(shapeContext, s.mapArea, offset);
                    shapeContext.closePath();
                    shapeContext.stroke();
                    shapeContext.restore();
                }
            });

            if (hasMasks) {
                maskContext.globalCompositeOperation = "source-out";
                maskContext.drawImage(shapeCanvas, 0, 0);

                context.drawImage(maskCanvas, 0, 0);
            } else {
                context.drawImage(shapeCanvas, 0, 0);
            }

            me.active = false;
            return me.canvas;
        },
        createCanvasFor: function (md) {
            return $('<canvas width="' + md.scaleInfo.width + '" height="' + md.scaleInfo.height + '"></canvas>')[0];
        },
        clearHighlight: function () {
            var c = this.map_data.overlay_canvas;
            c.getContext('2d').clearRect(0, 0, c.width, c.height);
        },
        refreshSelections: function () {
            var canvas_temp, map_data = this.map_data;
            canvas_temp = map_data.base_canvas;

            map_data.base_canvas = this.createVisibleCanvas(map_data);
            $(map_data.base_canvas).hide();
            $(canvas_temp).before(map_data.base_canvas);

            map_data.redrawSelections();

            $(map_data.base_canvas).show();
            $(canvas_temp).remove();
        }
    };

    vmlMethods = {

        renderShape: function (mapArea, options, cssclass) {
            var me = this, fill, stroke, e, t_fill, el_name, el_class, template, c = mapArea.coords();
            el_name = me.elementName ? 'name="' + me.elementName + '" ' : '';
            el_class = cssclass ? 'class="' + cssclass + '" ' : '';

            t_fill = '<v:fill color="#' + options.fillColor + '" class="_fill" opacity="' +
                (options.fill ?
                    options.fillOpacity :
                    0) +
                '" /><v:stroke class="_fill" opacity="' +
                options.strokeOpacity + '"/>';


            stroke = options.stroke ?
                ' strokeweight=' + options.strokeWidth + ' stroked="t" strokecolor="#' +
                    options.strokeColor + '"' :
                ' stroked="f"';

            fill = options.fill ?
                ' filled="t"' :
                ' filled="f"';

            switch (mapArea.shape) {
                case 'rect':
                    template = '<v:rect ' + el_class + el_name + fill + stroke +
                        ' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:' +
                          c[0] + 'px;top:' + c[1] + 'px;width:' + (c[2] - c[0]) +
                          'px;height:' + (c[3] - c[1]) + 'px;">' + t_fill + '</v:rect>';
                    break;
                case 'poly':
                    template = '<v:shape ' + el_class + el_name + fill + stroke + ' coordorigin="0,0" coordsize="' + me.width + ',' + me.height
                                + '" path="m ' + c[0] + ',' + c[1] + ' l ' + c.slice(2).join(',')
                                + ' x e" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:' + me.width + 'px;height:' + me.height + 'px;">' + t_fill + '</v:shape>';
                    break;
                case 'circ':
                case 'circle':
                    template = '<v:oval ' + el_class + el_name + fill + stroke
                                + ' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:' + (c[0] - c[2]) + 'px;top:' + (c[1] - c[2])
                                + 'px;width:' + (c[2] * 2) + 'px;height:' + (c[2] * 2) + 'px;">' + t_fill + '</v:oval>';
                    break;
            }
            e = $(template);
            $(me.canvas).append(e);

            return e;
        },
        render: function () {
            var opts, me = this;

            $.each(this.shapes, function (i, e) {
                me.renderShape(e.mapArea, e.options);
            });

            if (this.masks.length) {
                $.each(this.masks, function (i, e) {
                    opts = u.updateProps({},
                        e.options, {
                            fillOpacity: 1,
                            fillColor: e.options.fillColorMask
                        });
                    me.renderShape(e.mapArea, opts, 'layout_mask');
                });
            }

            this.active = false;
            return this.canvas;
        },

        createCanvasFor: function (md) {
            var w = md.scaleInfo.width,
                h = md.scaleInfo.height;
            return $('<var width="' + w + '" height="' + h
                + '" style="zoom:1;overflow:hidden;display:block;width:'
                + w + 'px;height:' + h + 'px;"></var>')[0];
        },

        clearHighlight: function () {
            $(this.map_data.overlay_canvas).children().remove();
        },
        removeSelections: function (area_id) {
            if (area_id >= 0) {
                $(this.map_data.base_canvas).find('[name="static_' + area_id.toString() + '"]').remove();
            }
            else {
                $(this.map_data.base_canvas).children().remove();
            }
        }

    };

    $.each(['renderShape',
           'addAltImage',
           'render',
           'createCanvasFor',
           'clearHighlight',
           'removeSelections',
           'refreshSelections'],
        function (i, e) {
            p[e] = (function (method) {
                return function () {
                    p[method] = (m.hasCanvas() ?
                        canvasMethods[method] :
                        vmlMethods[method]) || noop;

                    return p[method].apply(this, arguments);
                };
            }(e));
        });


}(jQuery));

(function ($) {

    var m = $.layout,
        u = m.utils,
        ap = [];

    m.MapImages = function (owner) {
        this.owner = owner;
        this.clear();
    };


    m.MapImages.prototype = {
        constructor: m.MapImages,

        slice: function () {
            return ap.slice.apply(this, arguments);
        },
        splice: function () {
            ap.slice.apply(this.status, arguments);
            var result = ap.slice.apply(this, arguments);
            return result;
        },
        complete: function () {
            return $.inArray(false, this.status) < 0;
        },
        _add: function (image) {
            var index = ap.push.call(this, image) - 1;
            this.status[index] = false;
            return index;
        },

        indexOf: function (image) {
            return $.inArray(image, this);
        },

        clear: function () {
            var me = this;

            if (me.ids && me.ids.length > 0) {
                $.each(me.ids, function (i, e) {
                    delete me[e];
                });
            }

            me.ids = [];

            me.length = 0;

            me.status = [];

            me.splice(0);

        },

        add: function (image, id) {
            var index, src, me = this;

            if (!image) { return; }

            if (typeof image === 'string') {
                src = image;
                image = me[src];
                if (typeof image === 'object') {
                    return me.indexOf(image);
                }

                image = $('<img />')
                    .addClass('layout_el')
                    .hide();

                index = me._add(image[0]);

                image
                    .bind('load', function (e) {
                        me.imageLoaded.call(me, e);
                    })
                    .bind('error', function (e) {
                        me.imageLoadError.call(me, e);
                    });

                image.attr('src', src);
            } else {
                index = me._add($(image)[0]);
            }
            if (id) {
                if (this[id]) {
                    throw (id + " is already used or is not available as an altImage alias.");
                }
                me.ids.push(id);
                me[id] = me[index];
            }
            return index;
        },

        bind: function (retry) {
            var me = this,
                promise,
                triesLeft = me.owner.options.configTimeout / 200,

            check = function () {
                var i;

                i = me.length;

                while (i-- > 0) {
                    if (!me.isLoaded(i)) {
                        break;
                    }
                }

                if (me.complete()) {
                    me.resolve();
                } else {
                    if (triesLeft-- > 0) {
                        me.imgTimeout = window.setTimeout(function () {
                            check.call(me, true);
                        }, 50);
                    } else {
                        me.imageLoadError.call(me);
                    }
                }

            };

            promise = me.deferred = u.defer();

            check();
            return promise;
        },

        resolve: function () {
            var me = this,
                resolver = me.deferred;

            if (resolver) {
                me.deferred = null;
                resolver.resolve();
            }
        },

        imageLoaded: function (e) {
            var me = this,
                index = me.indexOf(e.target);

            if (index >= 0) {

                me.status[index] = true;
                if ($.inArray(false, me.status) < 0) {
                    me.resolve();
                }
            }
        },

        imageLoadError: function (e) {
            clearTimeout(this.imgTimeout);
            this.triesLeft = 0;
            var err = e ? 'The image ' + e.target.src + ' failed to load.' :
                'The images never seemed to finish loading. You may just need to increase the configTimeout if images could take a long time to load.';
            throw err;
        },

        isLoaded: function (index) {
            var img,
                me = this,
                status = me.status;

            if (status[index]) { return true; }
            img = me[index];

            if (typeof img.complete !== 'undefined') {
                status[index] = img.complete;
            } else {
                status[index] = !!u.imgWidth(img);
            }

            return status[index];
        }
    };
}(jQuery));

(function ($) {

    var m = $.layout,
        u = m.utils;

    function initializeDefaults(me) {
        $.extend(me, {
            complete: false,
            map: null, 
            base_canvas: null,  
            overlay_canvas: null,   
            commands: [],            
            data: [],               
            mapAreas: [],            
            _xref: {},
            highlightId: -1,       
            currentAreaId: -1,
            _tooltip_events: [],     
            scaleInfo: null,         
            index: -1,              
            activeAreaEvent: null
        });
    }
    function getOptionImages(obj) {
        return [obj, obj.render_highlight, obj.render_select];
    }
    
    function configureAltImages(me) {
        var opts = me.options,
            mi = me.images;

        if (m.hasCanvas()) {
            $.each(opts.altImages || {}, function (i, e) {
                mi.add(e, i);
            });

            $.each([opts].concat(opts.areas), function (i, e) {
                $.each(getOptionImages(e), function (i2, e2) {
                    if (e2 && e2.altImage) {
                        e2.altImageId = mi.add(e2.altImage);
                    }
                });
            });
        }

        me.area_options = u.updateProps({},
            m.area_defaults,
            opts);
    }
    
    function queueMouseEvent(me, delay, area, deferred) {

        deferred = deferred || u.when.defer();

        function cbFinal(areaId) {
            if (me.currentAreaId !== areaId && me.highlightId >= 0) {
                deferred.resolve();
            }
        }
        if (me.activeAreaEvent) {
            window.clearTimeout(me.activeAreaEvent);
            me.activeAreaEvent = 0;
        }
        if (delay < 0) {
            return;
        }

        if (area.owner.currentAction || delay) {
            me.activeAreaEvent = window.setTimeout((function () {
                return function () {
                    queueMouseEvent(me, 0, area, deferred);
                };
            }(area)),
                delay || 100);
        } else {
            cbFinal(area.areaId);
        }
        return deferred;
    }

    function mousedown(e) {
        if (!m.hasCanvas()) {
            this.blur();
        }
        e.preventDefault();
    }

    function mouseover(me, e) {
        var arData = me.getAllDataForArea(this),
            ar = arData.length ? arData[0] : null;
        
        if (!ar || ar.isNotRendered() || ar.owner.currentAction) {
            return;
        }

        if (me.currentAreaId === ar.areaId) {
            return;
        }
        if (me.highlightId !== ar.areaId) {
            me.clearEffects();

            ar.highlight();

            if (me.options.showToolTip) {
                $.each(arData, function (i, e) {
                    if (e.effectiveOptions().toolTip) {
                        e.showToolTip();
                    }
                });
            }
        }

        me.currentAreaId = ar.areaId;

        if ($.isFunction(me.options.onMouseover)) {
            me.options.onMouseover.call(this,
            {
                e: e,
                options: ar.effectiveOptions(),
                key: ar.key,
                selected: ar.isSelected()
            });
        }
    }

    function mouseout(me, e) {
        var newArea,
            ar = me.getDataForArea(this),
            opts = me.options;


        if (me.currentAreaId < 0 || !ar) {
            return;
        }

        newArea = me.getDataForArea(e.relatedTarget);

        if (newArea === ar) {
            return;
        }

        me.currentAreaId = -1;
        ar.area = null;

        queueMouseEvent(me, opts.mouseoutDelay, ar)
            .then(me.clearEffects);

        if ($.isFunction(opts.onMouseout)) {
            opts.onMouseout.call(this,
            {
                e: e,
                options: opts,
                key: ar.key,
                selected: ar.isSelected()
            });
        }

    }

    function clearEffects(me) {
        var opts = me.options;

        me.ensureNoHighlight();

        if (opts.toolTipClose
            && $.inArray('area-mouseout', opts.toolTipClose) >= 0
            && me.activeToolTip) {
            me.clearToolTip();
        }
    }

    function click(me, e) {
        var selected, list, list_target, newSelectionState, canChangeState, cbResult,
            that = this,
            ar = me.getDataForArea(this),
            opts = me.options;

        function clickArea(ar) {
            var areaOpts, target;
            canChangeState = (ar.isSelectable() &&
                (ar.isDeselectable() || !ar.isSelected()));

            if (canChangeState) {
                newSelectionState = !ar.isSelected();
            } else {
                newSelectionState = ar.isSelected();
            }

            list_target = m.getBoundList(opts, ar.key);

            if ($.isFunction(opts.onClick)) {
                cbResult = opts.onClick.call(that,
                {
                    e: e,
                    listTarget: list_target,
                    key: ar.key,
                    selected: newSelectionState
                });

                if (u.isBool(cbResult)) {
                    if (!cbResult) {
                        return false;
                    }
                    target = $(ar.area).attr('href');
                    if (target !== '#') {
                        window.location.href = target;
                        return false;
                    }
                }
            }

            if (canChangeState) {
                selected = ar.toggle();
            }

            if (opts.boundList && opts.boundList.length > 0) {
                m.setBoundListProperties(opts, list_target, ar.isSelected());
            }

            areaOpts = ar.effectiveOptions();
            if (areaOpts.includeKeys) {
                list = u.split(areaOpts.includeKeys);
                $.each(list, function (i, e) {
                    var ar = me.getDataForKey(e.toString());
                    if (!ar.options.isMask) {
                        clickArea(ar);
                    }
                });
            }
        }

        mousedown.call(this, e);

        if (opts.clickNavigate && ar.href) {
            window.location.href = ar.href;
            return;
        }

        if (ar && !ar.owner.currentAction) {
            opts = me.options;
            clickArea(ar);
        }
    }
    
    m.MapData = function (image, options) {
        var me = this;

        me.image = image;

        me.images = new m.MapImages(me);
        me.graphics = new m.Graphics(me);

        me.imgCssText = image.style.cssText || null;

        initializeDefaults(me);

        me.configureOptions(options);

        me.mouseover = function (e) { mouseover.call(this, me, e); };
        me.mouseout = function (e) { mouseout.call(this, me, e); };
        me.click = function (e) { click.call(this, me, e); };
        me.clearEffects = function (e) { clearEffects.call(this, me, e); };
    };

    m.MapData.prototype = {
        constructor: m.MapData,

        configureOptions: function (options) {
            this.options = u.updateProps({}, m.defaults, options);
        },
        bindImages: function () {
            var me = this,
                mi = me.images;

            if (mi.length > 2) {
                mi.splice(2);
            } else if (mi.length === 0) {
                mi.add(me.image);
                mi.add(me.image.src);
            }

            configureAltImages(me);

            return me.images.bind();
        },

        isActive: function () {
            return !this.complete || this.currentAction;
        },

        state: function () {
            return {
                complete: this.complete,
                resizing: this.currentAction === 'resizing',
                zoomed: this.zoomed,
                zoomedArea: this.zoomedArea,
                scaleInfo: this.scaleInfo
            };
        },

        wrapId: function () {
            return 'layout_wrap_' + this.index;
        },
        _idFromKey: function (key) {
            return typeof key === "string" && this._xref.hasOwnProperty(key) ?
                        this._xref[key] : -1;
        },

        getSelected: function () {
            var result = '';
            $.each(this.data, function (i, e) {
                if (e.isSelected()) {
                    result += (result ? ',' : '') + this.key;
                }
            });
            return result;
        },

        getAllDataForArea: function (area, atMost) {
            var i, ar, result,
                me = this,
                key = $(area).filter('area').attr(me.options.mapKey);

            if (key) {
                result = [];
                key = u.split(key);

                for (i = 0; i < (atMost || key.length) ; i++) {
                    ar = me.data[me._idFromKey(key[i])];
                    ar.area = area.length ? area[0] : area;
                    result.push(ar);
                }
            }

            return result;
        },
        getDataForArea: function (area) {
            var ar = this.getAllDataForArea(area, 1);
            return ar ? ar[0] || null : null;
        },
        getDataForKey: function (key) {
            return this.data[this._idFromKey(key)];
        },

        getKeysForGroup: function (key) {
            var ar = this.getDataForKey(key);

            return !ar ? '' :
                ar.isPrimary ?
                    ar.key :
                    this.getPrimaryKeysForMapAreas(ar.areas()).join(',');
        },

        getPrimaryKeysForMapAreas: function (areas) {
            var keys = [];
            $.each(areas, function (i, e) {
                if ($.inArray(e.keys[0], keys) < 0) {
                    keys.push(e.keys[0]);
                }
            });
            return keys;
        },
        getData: function (obj) {
            if (typeof obj === 'string') {
                return this.getDataForKey(obj);
            } else if (obj && obj.layout || u.isElement(obj)) {
                return this.getDataForArea(obj);
            } else {
                return null;
            }
        },
        ensureNoHighlight: function () {
            var ar;
            if (this.highlightId >= 0) {
                this.graphics.clearHighlight();
                ar = this.data[this.highlightId];
                ar.changeState('highlight', false);
                this.setHighlightId(-1);
            }
        },
        setHighlightId: function (id) {
            this.highlightId = id;
        },

        clearSelections: function () {
            $.each(this.data, function (i, e) {
                if (e.selected) {
                    e.deselect(true);
                }
            });
            this.removeSelectionFinish();

        },

        setAreaOptions: function (areas) {
            var i, area_options, ar;
            areas = areas || [];

            for (i = areas.length - 1; i >= 0; i--) {
                area_options = areas[i];
                if (area_options) {
                    ar = this.getDataForKey(area_options.key);
                    if (ar) {
                        u.updateProps(ar.options, area_options);

                        if (u.isBool(area_options.selected)) {
                            ar.selected = area_options.selected;
                        }
                    }
                }
            }
        },
        drawSelections: function (keys) {
            var i, key_arr = u.asArray(keys);

            for (i = key_arr.length - 1; i >= 0; i--) {
                this.data[key_arr[i]].drawSelection();
            }
        },
        redrawSelections: function () {
            $.each(this.data, function (i, e) {
                if (e.isSelectedOrStatic()) {
                    e.drawSelection();
                }
            });

        },
        initialize: function () {
            var imgCopy, base_canvas, overlay_canvas, wrap, parentId, css, i, size,
                img, sort_func, sorted_list, scale,
                        me = this,
                        opts = me.options;

            if (me.complete) {
                return;
            }

            img = $(me.image);

            parentId = img.parent().attr('id');

            if (parentId && parentId.length >= 12 && parentId.substring(0, 12) === "layout_wrap") {
                wrap = img.parent();
                wrap.attr('id', me.wrapId());
            } else {
                wrap = $('<div id="' + me.wrapId() + '"></div>');

                if (opts.wrapClass) {
                    if (opts.wrapClass === true) {
                        wrap.addClass(img[0].className);
                    }
                    else {
                        wrap.addClass(opts.wrapClass);
                    }
                }
            }
            me.wrapper = wrap;
            me.scaleInfo = scale = u.scaleMap(me.images[0], me.images[1], opts.scaleMap);

            me.base_canvas = base_canvas = me.graphics.createVisibleCanvas(me);
            me.overlay_canvas = overlay_canvas = me.graphics.createVisibleCanvas(me);

            imgCopy = $(me.images[1])
                .addClass('layout_el ' + me.images[0].className)
                .attr({ id: null, usemap: null });

            size = u.size(me.images[0]);

            if (size.complete) {
                imgCopy.css({
                    width: size.width,
                    height: size.height
                });
            }

            me.buildDataset();

            css = {
                display: 'block',
                position: 'relative',
                padding: 0,
                width: scale.width,
                height: scale.height
            };

            if (opts.wrapCss) {
                $.extend(css, opts.wrapCss);
            }
            if (img.parent()[0] !== me.wrapper[0]) {

                img.before(me.wrapper);
            }

            wrap.css(css);

            $(me.images.slice(2)).hide();
            for (i = 1; i < me.images.length; i++) {
                wrap.append(me.images[i]);
            }

            wrap.append(base_canvas)
                        .append(overlay_canvas)
                        .append(img.css(m.canvas_style));

            u.setOpacity(me.images[0], 0);
            $(me.images[1]).show();

            u.setOpacity(me.images[1], 1);

            if (opts.isSelectable && opts.onGetList) {
                sorted_list = me.data.slice(0);
                if (opts.sortList) {
                    if (opts.sortList === "desc") {
                        sort_func = function (a, b) {
                            return a === b ? 0 : (a > b ? -1 : 1);
                        };
                    }
                    else {
                        sort_func = function (a, b) {
                            return a === b ? 0 : (a < b ? -1 : 1);
                        };
                    }

                    sorted_list.sort(function (a, b) {
                        a = a.value;
                        b = b.value;
                        return sort_func(a, b);
                    });
                }

                me.options.boundList = opts.onGetList.call(me.image, sorted_list);
            }

            me.complete = true;
            me.processCommandQueue();

            if (opts.onConfigured && typeof opts.onConfigured === 'function') {
                opts.onConfigured.call(img, true);
            }
        },

        buildDataset: function (rebind) {
            var sel, areas, j, area_id, $area, area, curKey, mapArea, key, keys, mapAreaId, group_value, dataItem, href,
                me = this,
                opts = me.options,
                default_group;

            function addAreaData(key, value) {
                var dataItem = new m.AreaData(me, key, value);
                dataItem.areaId = me._xref[key] = me.data.push(dataItem) - 1;
                return dataItem.areaId;
            }

            me._xref = {};
            me.data = [];
            if (!rebind) {
                me.mapAreas = [];
            }

            default_group = !opts.mapKey;
            if (default_group) {
                opts.mapKey = 'data-layout-key';
            }

            sel = m.hasVml() ? 'area' :
                        (default_group ?
                            'area[coords]' :
                            'area[' + opts.mapKey + ']');

            areas = $(me.map).find(sel).unbind('.layout');

            for (mapAreaId = 0; mapAreaId < areas.length; mapAreaId++) {
                area_id = 0;
                area = areas[mapAreaId];
                $area = $(area);

                if (!area.coords) {
                    continue;
                }

                if (default_group) {
                    curKey = String(mapAreaId);
                    $area.attr('data-layout-key', curKey);

                } else {
                    curKey = area.getAttribute(opts.mapKey);
                }
                
                if (rebind) {
                    mapArea = me.mapAreas[$area.data('layout') - 1];
                    mapArea.configure(curKey);
                } else {
                    mapArea = new m.MapArea(me, area, curKey);
                    me.mapAreas.push(mapArea);
                }

                keys = mapArea.keys;

                for (j = keys.length - 1; j >= 0; j--) {
                    key = keys[j];

                    if (opts.mapValue) {
                        group_value = $area.attr(opts.mapValue);
                    }
                    if (default_group) {
                        area_id = addAreaData(me.data.length, group_value);
                        dataItem = me.data[area_id];
                        dataItem.key = key = area_id.toString();
                    }
                    else {
                        area_id = me._xref[key];
                        if (area_id >= 0) {
                            dataItem = me.data[area_id];
                            if (group_value && !me.data[area_id].value) {
                                dataItem.value = group_value;
                            }
                        }
                        else {
                            area_id = addAreaData(key, group_value);
                            dataItem = me.data[area_id];
                            dataItem.isPrimary = j === 0;
                        }
                    }
                    mapArea.areaDataXref.push(area_id);
                    dataItem.areasXref.push(mapAreaId);
                }

                href = $area.attr('href');
                if (href && href !== '#' && !dataItem.href) {
                    dataItem.href = href;
                }

                if (!mapArea.nohref) {
                    $area.bind('click.layout', me.click);

                    if (!m.isTouch) {
                        $area.bind('mouseover.layout', me.mouseover)
                            .bind('mouseout.layout', me.mouseout)
                            .bind('mousedown.layout', me.mousedown);

                    }

                }

                $area.data("layout", mapAreaId + 1);
            }

            me.setAreaOptions(opts.areas);
            me.redrawSelections();

        },
        processCommandQueue: function () {

            var cur, me = this;
            while (!me.currentAction && me.commands.length) {
                cur = me.commands[0];
                me.commands.splice(0, 1);
                m.impl[cur.command].apply(cur.that, cur.args);
            }
        },
        clearEvents: function () {
            $(this.map).find('area')
                        .unbind('.layout');
            $(this.images)
                        .unbind('.layout');
        },
        _clearCanvases: function (preserveState) {
            if (!preserveState) {
                $(this.base_canvas).remove();
            }
            $(this.overlay_canvas).remove();
        },
        clearMapData: function (preserveState) {
            var me = this;
            this._clearCanvases(preserveState);

            $.each(this.data, function (i, e) {
                e.reset();
            });
            this.data = null;
            if (!preserveState) {
                this.image.style.cssText = this.imgCssText;
                $(this.wrapper).before(this.image).remove();
            }

            me.images.clear();

            this.image = null;
            u.ifFunction(this.clearTooltip, this);
        },

        removeSelectionFinish: function () {
            var g = this.graphics;

            g.refreshSelections();
            g.clearHighlight();
        }
    };
}(jQuery));

(function ($) {
    var m = $.layout, u = m.utils;
    function select(options) {
        var me = this, o = me.owner;
        if (o.options.singleSelect) {
            o.clearSelections();
        }

        if (!me.isSelected()) {
            if (options) {

                me.optsCache = $.extend(me.effectiveRenderOptions('select'),
                    options,
                    {
                        altImageId: o.images.add(options.altImage)
                    });
            }

            me.drawSelection();

            me.selected = true;
            me.changeState('select', true);
        }

        if (o.options.singleSelect) {
            o.graphics.refreshSelections();
        }
    }

    function deselect(partial) {
        var me = this;
        me.selected = false;
        me.changeState('select', false);

        me.optsCache = null;
        me.owner.graphics.removeSelections(me.areaId);

        if (!partial) {
            me.owner.removeSelectionFinish();
        }
    }

    function toggle(options) {
        var me = this;
        if (!me.isSelected()) {
            me.select(options);
        }
        else {
            me.deselect();
        }
        return me.isSelected();
    }

    m.AreaData = function (owner, key, value) {
        $.extend(this, {
            owner: owner,
            key: key || '',
            isPrimary: true,
            areaId: -1,
            href: '',
            value: value || '',
            options: {},
            selected: null,
            areasXref: [],
            area: null,
            optsCache: null
        });
    };

    m.AreaData.prototype = {
        constuctor: m.AreaData,
        select: select,
        deselect: deselect,
        toggle: toggle,
        areas: function () {
            var i, result = [];
            for (i = 0; i < this.areasXref.length; i++) {
                result.push(this.owner.mapAreas[this.areasXref[i]]);
            }
            return result;
        },
        coords: function (offset) {
            var coords = [];
            $.each(this.areas(), function (i, el) {
                coords = coords.concat(el.coords(offset));
            });
            return coords;
        },
        reset: function () {
            $.each(this.areas(), function (i, e) {
                e.reset();
            });
            this.areasXref = [];
            this.options = null;
        },
        isSelectedOrStatic: function () {

            var o = this.effectiveOptions();
            return u.isBool(o.staticState) ? o.staticState :
                        this.isSelected();
        },
        isSelected: function () {
            return u.isBool(this.selected) ? this.selected :
                u.isBool(this.owner.area_options.selected) ? this.owner.area_options.selected : false;
        },
        isSelectable: function () {
            return u.isBool(this.effectiveOptions().staticState) ? false :
                        (u.isBool(this.owner.options.staticState) ? false : u.boolOrDefault(this.effectiveOptions().isSelectable, true));
        },
        isDeselectable: function () {
            return u.isBool(this.effectiveOptions().staticState) ? false :
                        (u.isBool(this.owner.options.staticState) ? false : u.boolOrDefault(this.effectiveOptions().isDeselectable, true));
        },
        isNotRendered: function () {
            var area = $(this.area);
            return area.attr('nohref') ||
                !area.attr('href') ||
                this.effectiveOptions().isMask;

        },

        effectiveOptions: function (options) {

            var opts = u.updateProps({},
                    this.owner.area_options,
                    this.options,
                    options || {},
                    {
                        id: this.areaId
                    }
                );

            opts.selected = this.isSelected();

            return opts;
        },

        effectiveRenderOptions: function (mode, options) {
            var allOpts, opts = this.optsCache;

            if (!opts || mode === 'highlight') {
                allOpts = this.effectiveOptions(options);
                opts = u.updateProps({},
                    allOpts,
                    allOpts["render_" + mode]
                );

                if (mode !== 'highlight') {
                    this.optsCache = opts;
                }
            }
            return $.extend({}, opts);
        },

        changeState: function (state_type, state) {
            if ($.isFunction(this.owner.options.onStateChange)) {
                this.owner.options.onStateChange.call(this.owner.image,
                    {
                        key: this.key,
                        state: state_type,
                        selected: state
                    }
                );
            }
        },

        highlight: function (options) {
            var o = this.owner;
            if (this.effectiveOptions().highlight) {
                o.graphics.addShapeGroup(this, "highlight", options);
            }
            o.setHighlightId(this.areaId);
            this.changeState('highlight', true);
        },

        drawSelection: function () {


            this.owner.graphics.addShapeGroup(this, "select");

        }
    };
    m.MapArea = function (owner, areaEl, keys) {
        if (!owner) {
            return;
        }
        var me = this;
        me.owner = owner; 
        me.area = areaEl;
        me.areaDataXref = [];
        me.originalCoords = [];
        $.each(u.split(areaEl.coords), function (i, el) {
            me.originalCoords.push(parseFloat(el));
        });
        me.length = me.originalCoords.length;
        me.shape = areaEl.shape.toLowerCase();
        me.nohref = areaEl.nohref || !areaEl.href;
        me.configure(keys);
    };
    m.MapArea.prototype = {
        constructor: m.MapArea,
        configure: function (keys) {
            this.keys = u.split(keys);
        },
        reset: function () {
            this.area = null;
        },
        coords: function (offset) {
            return $.map(this.originalCoords, function (e) {
                return offset ? e : e + offset;
            });
        }
    };
}(jQuery));

(function ($) {
    var u = $.layout.utils;

    u.areaCorners = function (elements, image, container, width, height) {
        var pos, found, minX, minY, maxX, maxY, bestMinX, bestMaxX, bestMinY, bestMaxY, curX, curY, nest, j,
           offsetx = 0,
           offsety = 0,
           rootx,
           rooty,
           iCoords, radius, angle, el,
           coords = [];

        elements = elements.length ?
            elements :
            [elements];

        container = container ?
            $(container) :
            $(document.body);

        pos = container.offset();
        rootx = pos.left;
        rooty = pos.top;

        if (image) {
            pos = $(image).offset();
            offsetx = pos.left;
            offsety = pos.top;
        }

        for (j = 0; j < elements.length; j++) {
            el = elements[j];
            if (el.nodeName === 'AREA') {
                iCoords = u.split(el.coords, parseInt);

                switch (el.shape) {
                    case 'circle':
                        curX = iCoords[0];
                        curY = iCoords[1];
                        radius = iCoords[2];
                        coords = [];
                        for (j = 0; j < 360; j += 20) {
                            angle = j * Math.PI / 180;
                            coords.push(curX + radius * Math.cos(angle), curY + radius * Math.sin(angle));
                        }
                        break;
                    case 'rect':
                        coords.push(iCoords[0], iCoords[1], iCoords[2], iCoords[1], iCoords[2], iCoords[3], iCoords[0], iCoords[3]);
                        break;
                    default:
                        coords = coords.concat(iCoords);
                        break;
                }

                for (j = 0; j < coords.length; j += 2) {
                    coords[j] = parseInt(coords[j], 10) + offsetx;
                    coords[j + 1] = parseInt(coords[j + 1], 10) + offsety;
                }
            } else {
                el = $(el);
                pos = el.position();
                coords.push(pos.left, pos.top,
                            pos.left + el.width(), pos.top,
                            pos.left + el.width(), pos.top + el.height(),
                            pos.left, pos.top + el.height());

            }
        }

        minX = minY = bestMinX = bestMinY = 999999;
        maxX = maxY = bestMaxX = bestMaxY = -1;

        for (j = coords.length - 2; j >= 0; j -= 2) {
            curX = coords[j];
            curY = coords[j + 1];

            if (curX < minX) {
                minX = curX;
                bestMaxY = curY;
            }
            if (curX > maxX) {
                maxX = curX;
                bestMinY = curY;
            }
            if (curY < minY) {
                minY = curY;
                bestMaxX = curX;
            }
            if (curY > maxY) {
                maxY = curY;
                bestMinX = curX;
            }

        }

        if (width && height) {
            found = false;
            $.each([[bestMaxX - width, minY - height], [bestMinX, minY - height],
                             [minX - width, bestMaxY - height], [minX - width, bestMinY],
                             [maxX, bestMaxY - height], [maxX, bestMinY],
                             [bestMaxX - width, maxY], [bestMinX, maxY]
            ], function (i, e) {
                if (!found && (e[0] > rootx && e[1] > rooty)) {
                    nest = e;
                    found = true;
                    return false;
                }
            });

            if (!found) {
                nest = [maxX, maxY];
            }
        }
        return nest;
    };
}(jQuery));

(function ($) {
    var m = $.layout, u = m.utils, p = m.MapArea.prototype;

    m.utils.getScaleInfo = function (eff, actual) {
        var pct;
        if (!actual) {
            pct = 1;
            actual = eff;
        } else {
            pct = eff.width / actual.width || eff.height / actual.height;
            if (pct > 0.98 && pct < 1.02) { pct = 1; }
        }
        return {
            scale: (pct !== 1),
            scalePct: pct,
            realWidth: actual.width,
            realHeight: actual.height,
            width: eff.width,
            height: eff.height,
            ratio: eff.width / eff.height
        };
    };
    m.utils.scaleMap = function (image, imageRaw, scale) {
        var vis = u.size(image),
            raw = u.size(imageRaw, true);

        if (!raw.complete()) {
            throw ("Another script, such as an extension, appears to be interfering with image loading. Please let us know about this.");
        }
        if (!vis.complete()) {
            vis = raw;
        }
        return this.getScaleInfo(vis, scale ? raw : null);
    };

    m.MapData.prototype.resize = function (width, height, duration, callback) {
        var p, promises, newsize, els, highlightId, ratio,
            me = this;

        callback = callback || duration;

        function sizeCanvas(canvas, w, h) {
            if (m.hasCanvas()) {
                canvas.width = w;
                canvas.height = h;
            } else {
                $(canvas).width(w);
                $(canvas).height(h);
            }
        }

        function cleanupAndNotify() {

            me.currentAction = '';

            if ($.isFunction(callback)) {
                callback();
            }

            me.processCommandQueue();
        }

        function finishResize() {
            sizeCanvas(me.overlay_canvas, width, height);

            if (highlightId >= 0) {
                var areaData = me.data[highlightId];
                areaData.tempOptions = { fade: false };
                me.getDataForKey(areaData.key).highlight();
                areaData.tempOptions = null;
            }
            sizeCanvas(me.base_canvas, width, height);
            me.redrawSelections();
            cleanupAndNotify();
        }

        function resizeMapData() {
            $(me.image).css(newsize);
            me.scaleInfo = u.getScaleInfo({
                width: width,
                height: height
            },
                {
                    width: me.scaleInfo.realWidth,
                    height: me.scaleInfo.realHeight
                });
            $.each(me.data, function (i, e) {
                $.each(e.areas(), function (i, e) {
                    e.resize();
                });
            });
        }

        if (me.scaleInfo.width === width && me.scaleInfo.height === height) {
            return;
        }

        highlightId = me.highlightId;


        if (!width) {
            ratio = height / me.scaleInfo.realHeight;
            width = Math.round(me.scaleInfo.realWidth * ratio);
        }
        if (!height) {
            ratio = width / me.scaleInfo.realWidth;
            height = Math.round(me.scaleInfo.realHeight * ratio);
        }

        newsize = { 'width': String(width) + 'px', 'height': String(height) + 'px' };
        if (!m.hasCanvas()) {
            $(me.base_canvas).children().remove();
        }
        
        els = $(me.wrapper).find('.layout_el').add(me.wrapper);

        if (duration) {
            promises = [];
            me.currentAction = 'resizing';
            els.each(function (i, e) {
                p = u.defer();
                promises.push(p);

                $(e).animate(newsize, {
                    duration: duration,
                    complete: p.resolve,
                    easing: "linear"
                });
            });

            p = u.defer();
            promises.push(p);

            u.when.all(promises).then(finishResize);
            resizeMapData();
            p.resolve();
        } else {
            els.css(newsize);
            resizeMapData();
            finishResize();

        }
    };


    m.MapArea = u.subclass(m.MapArea, function () {
        this.base.init();
        if (this.owner.scaleInfo.scale) {
            this.resize();
        }
    });

    p.coords = function (percent, coordOffset) {
        var j, newCoords = [],
                    pct = percent || this.owner.scaleInfo.scalePct,
                    offset = coordOffset || 0;

        if (pct === 1 && coordOffset === 0) {
            return this.originalCoords;
        }

        for (j = 0; j < this.length; j++) {
            newCoords.push(Math.round(this.originalCoords[j] * pct) + offset);
        }
        return newCoords;
    };
    p.resize = function () {
        this.area.coords = this.coords().join(',');
    };

    p.reset = function () {
        this.area.coords = this.coords(1).join(',');
    };

    m.impl.resize = function (width, height, duration, callback) {
        if (!width && !height) {
            return false;
        }
        var x = (new m.Method(this,
                function () {
                    this.resize(width, height, duration, callback);
                },
                null,
                {
                    name: 'resize',
                    args: arguments
                }
            )).go();
        return x;
    };
}(jQuery));

(function ($) {

    var m = $.layout, u = m.utils;

    $.extend(m.defaults, {
        toolTipContainer: '<div style="z-index: 99999; border: 2px solid black; background: #EEEEEE; width:160px; padding:4px; margin: 4px; -moz-box-shadow: 3px 3px 5px #535353; ' +
        '-webkit-box-shadow: 3px 3px 5px #535353; box-shadow: 3px 3px 5px #535353; -moz-border-radius: 6px 6px 6px 6px; -webkit-border-radius: 6px; ' +
        'border-radius: 6px 6px 6px 6px; opacity: 0.9;"></div>',
        showToolTip: false,
        toolTipFade: true,
        toolTipClose: ['area-mouseout', 'image-mouseout'],
        onShowToolTip: null,
        onHideToolTip: null
    });

    $.extend(m.area_defaults, {
        toolTip: null,
        toolTipClose: null
    });

    function createToolTip(html, template, css) {
        var tooltip;

        if (template) {
            tooltip = typeof template === 'string' ?
                $(template) :
                $(template).clone();

            tooltip.append(html);
        } else {
            tooltip = $(html);
        }

        tooltip.css($.extend((css || {}), {
            display: "block",
            position: "absolute"
        })).hide();

        $('body').append(tooltip);

        tooltip.attr("data-opacity", tooltip.css("opacity"))
            .css("opacity", 0);

        return tooltip.show();
    }

    function showToolTipImpl(tooltip, options) {
        var tooltipCss = {
            "left": options.left + "px",
            "top": options.top + "px"
        },
            actalOpacity = tooltip.attr("data-opacity") || 0,
            zindex = tooltip.css("z-index");

        if (parseInt(zindex, 10) === 0
            || zindex === "auto") {
            tooltipCss["z-index"] = 9999;
        }

        tooltip.css(tooltipCss)
            .addClass('layout_tooltip');


        if (options.fadeDuration && options.fadeDuration > 0) {
            u.fader(tooltip[0], 0, actalOpacity, options.fadeDuration);
        } else {
            u.setOpacity(tooltip[0], actalOpacity);
        }
    }

    m.MapData.prototype.clearToolTip = function () {
        if (this.activeToolTip) {
            this.activeToolTip.stop().remove();
            this.activeToolTip = null;
            this.activeToolTipID = null;
            u.ifFunction(this.options.onHideToolTip, this);
        }
    };
    
    function bindToolTipClose(options, bindOption, event, target, beforeClose, onClose) {
        var event_name = event + '.layout-tooltip';

        if ($.inArray(bindOption, options) >= 0) {
            target.unbind(event_name)
                .bind(event_name, function (e) {
                    if (!beforeClose || beforeClose.call(this, e)) {
                        target.unbind('.layout-tooltip');
                        if (onClose) {
                            onClose.call(this);
                        }
                    }
                });

            return {
                object: target,
                event: event_name
            };
        }
    }

    function showToolTip(tooltip, target, image, container, options) {
        var corners,
            ttopts = {};

        options = options || {};


        if (target) {

            corners = u.areaCorners(target, image, container,
                                    tooltip.outerWidth(true),
                                    tooltip.outerHeight(true));

            ttopts.left = corners[0];
            ttopts.top = corners[1];

        } else {

            ttopts.left = options.left;
            ttopts.top = options.top;
        }

        ttopts.left += (options.offsetx || 0);
        ttopts.top += (options.offsety || 0);

        ttopts.css = options.css;
        ttopts.fadeDuration = options.fadeDuration;

        showToolTipImpl(tooltip, ttopts);

        return tooltip;
    }

    m.AreaData.prototype.showToolTip = function (content, options) {
        var tooltip, closeOpts, target, tipClosed, template,
            ttopts = {},
            ad = this,
            md = ad.owner,
            areaOpts = ad.effectiveOptions();

        options = options ? $.extend({}, options) : {};

        content = content || areaOpts.toolTip;
        closeOpts = options.closeEvents || areaOpts.toolTipClose || md.options.toolTipClose || 'tooltip-click';

        template = typeof options.template !== 'undefined' ?
                options.template :
                md.options.toolTipContainer;

        options.closeEvents = typeof closeOpts === 'string' ?
            closeOpts = u.split(closeOpts) :
            closeOpts;

        options.fadeDuration = options.fadeDuration ||
                 (md.options.toolTipFade ?
                    (md.options.fadeDuration || areaOpts.fadeDuration) : 0);

        target = ad.area ?
            ad.area :
            $.map(ad.areas(),
                function (e) {
                    return e.area;
                });

        if (md.activeToolTipID === ad.areaId) {
            return;
        }

        md.clearToolTip();

        md.activeToolTip = tooltip = createToolTip(content,
            template,
            options.css);

        md.activeToolTipID = ad.areaId;

        tipClosed = function () {
            md.clearToolTip();
        };

        bindToolTipClose(closeOpts, 'area-click', 'click', $(md.map), null, tipClosed);
        bindToolTipClose(closeOpts, 'tooltip-click', 'click', tooltip, null, tipClosed);
        bindToolTipClose(closeOpts, 'image-mouseout', 'mouseout', $(md.image), function (e) {
            return (e.relatedTarget && e.relatedTarget.nodeName !== 'AREA' && e.relatedTarget !== ad.area);
        }, tipClosed);


        showToolTip(tooltip,
                    target,
                    md.image,
                    options.container,
                    template,
                    options);

        u.ifFunction(md.options.onShowToolTip, ad.area,
        {
            toolTip: tooltip,
            options: ttopts,
            areaOptions: areaOpts,
            key: ad.key,
            selected: ad.isSelected()
        });

        return tooltip;
    };

    function getHtmlFromOptions(options) {
        return (options ?
            ((typeof options === 'string' || options.jquery) ?
            options :
                options.content) :
            null);
    }

    m.impl.tooltip = function (key, options) {
        return (new m.Method(this,
        function mapData() {
            var tooltip, target, md = this;
            if (!key) {
                md.clearToolTip();
            } else {
                target = $(key);
                if (md.activeToolTipID === target[0]) {
                    return;
                }
                md.clearToolTip();

                md.activeToolTip = tooltip = createToolTip(getHtmlFromOptions(options),
                            options.template || md.options.toolTipContainer,
                            options.css);
                md.activeToolTipID = target[0];

                bindToolTipClose(['tooltip-click'], 'tooltip-click', 'click', tooltip, null, function () {
                    md.clearToolTip();
                });

                md.activeToolTip = tooltip = showToolTip(tooltip,
                    target,
                    md.image,
                    options.container,
                    options);
            }
        },
        function areaData() {
            if ($.isPlainObject(key) && !options) {
                options = key;
            }

            this.showToolTip(getHtmlFromOptions(options), options);
        },
        {
            name: 'tooltip',
            args: arguments,
            key: key
        }
    )).go();
    };
}(jQuery));