try {
    var Prototype = {
        Version: "1.7",
        Browser: function() {
            var ua = navigator.userAgent,
                isOpera = "[object Opera]" == Object.prototype.toString.call(window.opera);
            return {
                IE: !!window.attachEvent && !isOpera,
                Opera: isOpera,
                WebKit: -1 < ua.indexOf("AppleWebKit/"),
                Gecko: -1 < ua.indexOf("Gecko") && -1 === ua.indexOf("KHTML"),
                MobileSafari: /Apple.*Mobile/.test(ua)
            }
        }(),
        BrowserFeatures: {
            XPath: !!document.evaluate,
            SelectorsAPI: !!document.querySelector,
            ElementExtensions: function() {
                var constructor = window.Element || window.HTMLElement;
                return !(!constructor || !constructor.prototype)
            }(),
            SpecificElementExtensions: function() {
                if (void 0 !== window.HTMLDivElement) return !0;
                var div = document.createElement("div"),
                    form = document.createElement("form"),
                    isSupported = !1;
                return div.__proto__ && div.__proto__ !== form.__proto__ && (isSupported = !0), div = form = null, isSupported
            }()
        },
        ScriptFragment: "<script[^>]*>([\\S\\s]*?)<\/script>",
        JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
        emptyFunction: function() {},
        K: function(x) {
            return x
        }
    };
    Prototype.Browser.MobileSafari && (Prototype.BrowserFeatures.SpecificElementExtensions = !1);
    var Abstract = {},
        Try = {
            these: function() {
                for (var returnValue, i = 0, length = arguments.length; i < length; i++) {
                    var lambda = arguments[i];
                    try {
                        returnValue = lambda();
                        break
                    } catch (e) {}
                }
                return returnValue
            }
        },
        Class = function() {
            var IS_DONTENUM_BUGGY = function() {
                for (var p in {
                        toString: 1
                    })
                    if ("toString" === p) return !1;
                return !0
            }();

            function subclass() {}
            return {
                create: function() {
                    var parent = null,
                        properties = $A(arguments);

                    function klass() {
                        this.initialize.apply(this, arguments)
                    }
                    Object.isFunction(properties[0]) && (parent = properties.shift()), Object.extend(klass, Class.Methods), klass.superclass = parent, klass.subclasses = [], parent && (subclass.prototype = parent.prototype, klass.prototype = new subclass, parent.subclasses.push(klass));
                    for (var i = 0, length = properties.length; i < length; i++) klass.addMethods(properties[i]);
                    return klass.prototype.initialize || (klass.prototype.initialize = Prototype.emptyFunction), klass.prototype.constructor = klass
                },
                Methods: {
                    addMethods: function(source) {
                        var ancestor = this.superclass && this.superclass.prototype,
                            properties = Object.keys(source);
                        IS_DONTENUM_BUGGY && (source.toString != Object.prototype.toString && properties.push("toString"), source.valueOf != Object.prototype.valueOf && properties.push("valueOf"));
                        for (var i = 0, length = properties.length; i < length; i++) {
                            var property = properties[i],
                                value = source[property];
                            if (ancestor && Object.isFunction(value) && "$super" == value.argumentNames()[0]) {
                                var method = value;
                                (value = function(m) {
                                    return function() {
                                        return ancestor[m].apply(this, arguments)
                                    }
                                }(property).wrap(method)).valueOf = method.valueOf.bind(method), value.toString = method.toString.bind(method)
                            }
                            this.prototype[property] = value
                        }
                        return this
                    }
                }
            }
        }();
    ! function() {
        var _toString = Object.prototype.toString,
            NULL_TYPE = "Null",
            UNDEFINED_TYPE = "Undefined",
            BOOLEAN_TYPE = "Boolean",
            NUMBER_TYPE = "Number",
            STRING_TYPE = "String",
            OBJECT_TYPE = "Object",
            FUNCTION_CLASS = "[object Function]",
            BOOLEAN_CLASS = "[object Boolean]",
            NUMBER_CLASS = "[object Number]",
            STRING_CLASS = "[object String]",
            ARRAY_CLASS = "[object Array]",
            DATE_CLASS = "[object Date]",
            NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON && "function" == typeof JSON.stringify && "0" === JSON.stringify(0) && void 0 === JSON.stringify(Prototype.K);

        function Type(o) {
            switch (o) {
                case null:
                    return NULL_TYPE;
                case void 0:
                    return UNDEFINED_TYPE
            }
            switch (typeof o) {
                case "boolean":
                    return BOOLEAN_TYPE;
                case "number":
                    return NUMBER_TYPE;
                case "string":
                    return STRING_TYPE
            }
            return OBJECT_TYPE
        }

        function extend(destination, source) {
            for (var property in source) destination[property] = source[property];
            return destination
        }

        function isArray(object) {
            return _toString.call(object) === ARRAY_CLASS
        }

        function isUndefined(object) {
            return void 0 === object
        }
        "function" == typeof Array.isArray && Array.isArray([]) && !Array.isArray({}) && (isArray = Array.isArray), extend(Object, {
            extend: extend,
            inspect: function(object) {
                try {
                    return isUndefined(object) ? "undefined" : null === object ? "null" : object.inspect ? object.inspect() : String(object)
                } catch (e) {
                    if (e instanceof RangeError) return "...";
                    throw e
                }
            },
            toJSON: NATIVE_JSON_STRINGIFY_SUPPORT ? function(object) {
                return JSON.stringify(object)
            } : function(value) {
                return function Str(key, holder, stack) {
                    var value = holder[key];
                    Type(value) === OBJECT_TYPE && "function" == typeof value.toJSON && (value = value.toJSON(key));
                    var _class = _toString.call(value);
                    switch (_class) {
                        case NUMBER_CLASS:
                        case BOOLEAN_CLASS:
                        case STRING_CLASS:
                            value = value.valueOf()
                    }
                    switch (value) {
                        case null:
                            return "null";
                        case !0:
                            return "true";
                        case !1:
                            return "false"
                    }
                    switch (typeof value) {
                        case "string":
                            return value.inspect(!0);
                        case "number":
                            return isFinite(value) ? String(value) : "null";
                        case "object":
                            for (var i = 0, length = stack.length; i < length; i++)
                                if (stack[i] === value) throw new TypeError;
                            stack.push(value);
                            var partial = [];
                            if (_class === ARRAY_CLASS) {
                                for (var i = 0, length = value.length; i < length; i++) {
                                    var str = Str(i, value, stack);
                                    partial.push(void 0 === str ? "null" : str)
                                }
                                partial = "[" + partial.join(",") + "]"
                            } else {
                                for (var keys = Object.keys(value), i = 0, length = keys.length; i < length; i++) {
                                    var key = keys[i],
                                        str = Str(key, value, stack);
                                    void 0 !== str && partial.push(key.inspect(!0) + ":" + str)
                                }
                                partial = "{" + partial.join(",") + "}"
                            }
                            return stack.pop(), partial
                    }
                }("", {
                    "": value
                }, [])
            },
            toQueryString: function(object) {
                return $H(object).toQueryString()
            },
            toHTML: function(object) {
                return object && object.toHTML ? object.toHTML() : String.interpret(object)
            },
            keys: Object.keys || function(object) {
                if (Type(object) !== OBJECT_TYPE) throw new TypeError;
                var results = [];
                for (var property in object) object.hasOwnProperty(property) && results.push(property);
                return results
            },
            values: function(object) {
                var results = [];
                for (var property in object) results.push(object[property]);
                return results
            },
            clone: function(object) {
                return extend({}, object)
            },
            isElement: function(object) {
                return !(!object || 1 != object.nodeType)
            },
            isArray: isArray,
            isHash: function(object) {
                return object instanceof Hash
            },
            isFunction: function(object) {
                return _toString.call(object) === FUNCTION_CLASS
            },
            isString: function(object) {
                return _toString.call(object) === STRING_CLASS
            },
            isNumber: function(object) {
                return _toString.call(object) === NUMBER_CLASS
            },
            isDate: function(object) {
                return _toString.call(object) === DATE_CLASS
            },
            isUndefined: isUndefined
        })
    }(), Object.extend(Function.prototype, function() {
            var slice = Array.prototype.slice;

            function update(array, args) {
                for (var arrayLength = array.length, length = args.length; length--;) array[arrayLength + length] = args[length];
                return array
            }

            function merge(array, args) {
                return update(array = slice.call(array, 0), args)
            }
            return {
                argumentNames: function() {
                    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(",");
                    return 1 != names.length || names[0] ? names : []
                },
                bind: function(context) {
                    if (arguments.length < 2 && Object.isUndefined(context)) return this;
                    var __method = this,
                        args = slice.call(arguments, 1);
                    return function() {
                        var a = merge(args, arguments);
                        return __method.apply(context, a)
                    }
                },
                bindAsEventListener: function(context) {
                    var __method = this,
                        args = slice.call(arguments, 1);
                    return function(event) {
                        var a = update([event || window.event], args);
                        return __method.apply(context, a)
                    }
                },
                curry: function() {
                    if (!arguments.length) return this;
                    var __method = this,
                        args = slice.call(arguments, 0);
                    return function() {
                        var a = merge(args, arguments);
                        return __method.apply(this, a)
                    }
                },
                delay: function(timeout) {
                    var __method = this,
                        args = slice.call(arguments, 1);
                    return timeout *= 1e3, window.setTimeout(function() {
                        return __method.apply(__method, args)
                    }, timeout)
                },
                defer: function() {
                    var args = update([.01], arguments);
                    return this.delay.apply(this, args)
                },
                wrap: function(wrapper) {
                    var __method = this;
                    return function() {
                        var a = update([__method.bind(this)], arguments);
                        return wrapper.apply(this, a)
                    }
                },
                methodize: function() {
                    if (this._methodized) return this._methodized;
                    var __method = this;
                    return this._methodized = function() {
                        var a = update([this], arguments);
                        return __method.apply(null, a)
                    }
                }
            }
        }()),
        function(proto) {
            proto.toISOString || (proto.toISOString = function() {
                return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1).toPaddedString(2) + "-" + this.getUTCDate().toPaddedString(2) + "T" + this.getUTCHours().toPaddedString(2) + ":" + this.getUTCMinutes().toPaddedString(2) + ":" + this.getUTCSeconds().toPaddedString(2) + "Z"
            }), proto.toJSON || (proto.toJSON = function() {
                return this.toISOString()
            })
        }(Date.prototype), RegExp.prototype.match = RegExp.prototype.test, RegExp.escape = function(str) {
            return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        };
    var PeriodicalExecuter = Class.create({
        initialize: function(callback, frequency) {
            this.callback = callback, this.frequency = frequency, this.currentlyExecuting = !1, this.registerCallback()
        },
        registerCallback: function() {
            this.timer = setInterval(this.onTimerEvent.bind(this), 1e3 * this.frequency)
        },
        execute: function() {
            this.callback(this)
        },
        stop: function() {
            this.timer && (clearInterval(this.timer), this.timer = null)
        },
        onTimerEvent: function() {
            if (!this.currentlyExecuting) try {
                this.currentlyExecuting = !0, this.execute(), this.currentlyExecuting = !1
            } catch (e) {
                throw this.currentlyExecuting = !1, e
            }
        }
    });
    Object.extend(String, {
        interpret: function(value) {
            return null == value ? "" : String(value)
        },
        specialChar: {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\\": "\\\\"
        }
    }), Object.extend(String.prototype, function() {
        var NATIVE_JSON_PARSE_SUPPORT = window.JSON && "function" == typeof JSON.parse && JSON.parse('{"test": true}').test;

        function prepareReplacement(replacement) {
            if (Object.isFunction(replacement)) return replacement;
            var template = new Template(replacement);
            return function(match) {
                return template.evaluate(match)
            }
        }

        function gsub(pattern, replacement) {
            var match, result = "",
                source = this;
            if (replacement = prepareReplacement(replacement), Object.isString(pattern) && (pattern = RegExp.escape(pattern)), !pattern.length && !pattern.source) return (replacement = replacement("")) + source.split("").join(replacement) + replacement;
            for (; 0 < source.length;)(match = source.match(pattern)) ? (result += source.slice(0, match.index), result += String.interpret(replacement(match)), source = source.slice(match.index + match[0].length)) : (result += source, source = "");
            return result
        }

        function sub(pattern, replacement, count) {
            return replacement = prepareReplacement(replacement), count = Object.isUndefined(count) ? 1 : count, this.gsub(pattern, function(match) {
                return --count < 0 ? match[0] : replacement(match)
            })
        }

        function scan(pattern, iterator) {
            return this.gsub(pattern, iterator), String(this)
        }

        function truncate(length, truncation) {
            return length = length || 30, truncation = Object.isUndefined(truncation) ? "..." : truncation, this.length > length ? this.slice(0, length - truncation.length) + truncation : String(this)
        }

        function strip() {
            return this.replace(/^\s+/, "").replace(/\s+$/, "")
        }

        function stripTags() {
            return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
        }

        function stripScripts() {
            return this.replace(new RegExp(Prototype.ScriptFragment, "img"), "")
        }

        function extractScripts() {
            var matchAll = new RegExp(Prototype.ScriptFragment, "img"),
                matchOne = new RegExp(Prototype.ScriptFragment, "im");
            return (this.match(matchAll) || []).map(function(scriptTag) {
                return (scriptTag.match(matchOne) || ["", ""])[1]
            })
        }

        function evalScripts() {
            return this.extractScripts().map(function(script) {
                return eval(script)
            })
        }

        function escapeHTML() {
            return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function unescapeHTML() {
            return this.stripTags().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        }

        function toQueryParams(separator) {
            var match = this.strip().match(/([^?#]*)(#.*)?$/);
            return match ? match[1].split(separator || "&").inject({}, function(hash, pair) {
                if ((pair = pair.split("="))[0]) {
                    var key = decodeURIComponent(pair.shift()),
                        value = 1 < pair.length ? pair.join("=") : pair[0];
                    null != value && (value = decodeURIComponent(value)), key in hash ? (Object.isArray(hash[key]) || (hash[key] = [hash[key]]), hash[key].push(value)) : hash[key] = value
                }
                return hash
            }) : {}
        }

        function toArray() {
            return this.split("")
        }

        function succ() {
            return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
        }

        function times(count) {
            return count < 1 ? "" : new Array(count + 1).join(this)
        }

        function camelize() {
            return this.replace(/-+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : ""
            })
        }

        function capitalize() {
            return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
        }

        function underscore() {
            return this.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/-/g, "_").toLowerCase()
        }

        function dasherize() {
            return this.replace(/_/g, "-")
        }

        function inspect(useDoubleQuotes) {
            var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
                return character in String.specialChar ? String.specialChar[character] : "\\u00" + character.charCodeAt().toPaddedString(2, 16)
            });
            return useDoubleQuotes ? '"' + escapedString.replace(/"/g, '\\"') + '"' : "'" + escapedString.replace(/'/g, "\\'") + "'"
        }

        function unfilterJSON(filter) {
            return this.replace(filter || Prototype.JSONFilter, "$1")
        }

        function isJSON() {
            var str = this;
            return !str.blank() && (str = (str = (str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")).replace(/(?:^|:|,)(?:\s*\[)+/g, ""), /^[\],:{}\s]*$/.test(str))
        }

        function evalJSON(sanitize) {
            var json = this.unfilterJSON(),
                cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            cx.test(json) && (json = json.replace(cx, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }));
            try {
                if (!sanitize || json.isJSON()) return eval("(" + json + ")")
            } catch (e) {}
            throw new SyntaxError("Badly formed JSON string: " + this.inspect())
        }

        function parseJSON() {
            var json = this.unfilterJSON();
            return JSON.parse(json)
        }

        function include(pattern) {
            return -1 < this.indexOf(pattern)
        }

        function startsWith(pattern) {
            return 0 === this.lastIndexOf(pattern, 0)
        }

        function endsWith(pattern) {
            var d = this.length - pattern.length;
            return 0 <= d && this.indexOf(pattern, d) === d
        }

        function empty() {
            return "" == this
        }

        function blank() {
            return /^\s*$/.test(this)
        }

        function interpolate(object, pattern) {
            return new Template(this, pattern).evaluate(object)
        }
        return {
            gsub: gsub,
            sub: sub,
            scan: scan,
            truncate: truncate,
            strip: String.prototype.trim || strip,
            stripTags: stripTags,
            stripScripts: stripScripts,
            extractScripts: extractScripts,
            evalScripts: evalScripts,
            escapeHTML: escapeHTML,
            unescapeHTML: unescapeHTML,
            toQueryParams: toQueryParams,
            parseQuery: toQueryParams,
            toArray: toArray,
            succ: succ,
            times: times,
            camelize: camelize,
            capitalize: capitalize,
            underscore: underscore,
            dasherize: dasherize,
            inspect: inspect,
            unfilterJSON: unfilterJSON,
            isJSON: isJSON,
            evalJSON: NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
            include: include,
            startsWith: startsWith,
            endsWith: endsWith,
            empty: empty,
            blank: blank,
            interpolate: interpolate
        }
    }());
    var Template = Class.create({
        initialize: function(template, pattern) {
            this.template = template.toString(), this.pattern = pattern || Template.Pattern
        },
        evaluate: function(object) {
            return object && Object.isFunction(object.toTemplateReplacements) && (object = object.toTemplateReplacements()), this.template.gsub(this.pattern, function(match) {
                if (null == object) return match[1] + "";
                var before = match[1] || "";
                if ("\\" == before) return match[2];
                var ctx = object,
                    expr = match[3],
                    pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
                if (null == (match = pattern.exec(expr))) return before;
                for (; null != match;) {
                    if (null == (ctx = ctx[match[1].startsWith("[") ? match[2].replace(/\\\\]/g, "]") : match[1]]) || "" == match[3]) break;
                    expr = expr.substring("[" == match[3] ? match[1].length : match[0].length), match = pattern.exec(expr)
                }
                return before + String.interpret(ctx)
            })
        }
    });
    Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
    var $break = {},
        Enumerable = function() {
            function all(iterator, context) {
                iterator = iterator || Prototype.K;
                var result = !0;
                return this.each(function(value, index) {
                    if (!(result = result && !!iterator.call(context, value, index))) throw $break
                }), result
            }

            function any(iterator, context) {
                iterator = iterator || Prototype.K;
                var result = !1;
                return this.each(function(value, index) {
                    if (result = !!iterator.call(context, value, index)) throw $break
                }), result
            }

            function collect(iterator, context) {
                iterator = iterator || Prototype.K;
                var results = [];
                return this.each(function(value, index) {
                    results.push(iterator.call(context, value, index))
                }), results
            }

            function detect(iterator, context) {
                var result;
                return this.each(function(value, index) {
                    if (iterator.call(context, value, index)) throw result = value, $break
                }), result
            }

            function findAll(iterator, context) {
                var results = [];
                return this.each(function(value, index) {
                    iterator.call(context, value, index) && results.push(value)
                }), results
            }

            function include(object) {
                if (Object.isFunction(this.indexOf) && -1 != this.indexOf(object)) return !0;
                var found = !1;
                return this.each(function(value) {
                    if (value == object) throw found = !0, $break
                }), found
            }

            function toArray() {
                return this.map()
            }
            return {
                each: function(iterator, context) {
                    var index = 0;
                    try {
                        this._each(function(value) {
                            iterator.call(context, value, index++)
                        })
                    } catch (e) {
                        if (e != $break) throw e
                    }
                    return this
                },
                eachSlice: function(number, iterator, context) {
                    var index = -number,
                        slices = [],
                        array = this.toArray();
                    if (number < 1) return array;
                    for (;
                        (index += number) < array.length;) slices.push(array.slice(index, index + number));
                    return slices.collect(iterator, context)
                },
                all: all,
                every: all,
                any: any,
                some: any,
                collect: collect,
                map: collect,
                detect: detect,
                findAll: findAll,
                select: findAll,
                filter: findAll,
                grep: function(filter, iterator, context) {
                    iterator = iterator || Prototype.K;
                    var results = [];
                    return Object.isString(filter) && (filter = new RegExp(RegExp.escape(filter))), this.each(function(value, index) {
                        filter.match(value) && results.push(iterator.call(context, value, index))
                    }), results
                },
                include: include,
                member: include,
                inGroupsOf: function(number, fillWith) {
                    return fillWith = Object.isUndefined(fillWith) ? null : fillWith, this.eachSlice(number, function(slice) {
                        for (; slice.length < number;) slice.push(fillWith);
                        return slice
                    })
                },
                inject: function(memo, iterator, context) {
                    return this.each(function(value, index) {
                        memo = iterator.call(context, memo, value, index)
                    }), memo
                },
                invoke: function(method) {
                    var args = $A(arguments).slice(1);
                    return this.map(function(value) {
                        return value[method].apply(value, args)
                    })
                },
                max: function(iterator, context) {
                    var result;
                    return iterator = iterator || Prototype.K, this.each(function(value, index) {
                        value = iterator.call(context, value, index), (null == result || result <= value) && (result = value)
                    }), result
                },
                min: function(iterator, context) {
                    var result;
                    return iterator = iterator || Prototype.K, this.each(function(value, index) {
                        value = iterator.call(context, value, index), (null == result || value < result) && (result = value)
                    }), result
                },
                partition: function(iterator, context) {
                    iterator = iterator || Prototype.K;
                    var trues = [],
                        falses = [];
                    return this.each(function(value, index) {
                        (iterator.call(context, value, index) ? trues : falses).push(value)
                    }), [trues, falses]
                },
                pluck: function(property) {
                    var results = [];
                    return this.each(function(value) {
                        results.push(value[property])
                    }), results
                },
                reject: function(iterator, context) {
                    var results = [];
                    return this.each(function(value, index) {
                        iterator.call(context, value, index) || results.push(value)
                    }), results
                },
                sortBy: function(iterator, context) {
                    return this.map(function(value, index) {
                        return {
                            value: value,
                            criteria: iterator.call(context, value, index)
                        }
                    }).sort(function(left, right) {
                        var a = left.criteria,
                            b = right.criteria;
                        return a < b ? -1 : b < a ? 1 : 0
                    }).pluck("value")
                },
                toArray: toArray,
                entries: toArray,
                zip: function() {
                    var iterator = Prototype.K,
                        args = $A(arguments);
                    Object.isFunction(args.last()) && (iterator = args.pop());
                    var collections = [this].concat(args).map($A);
                    return this.map(function(value, index) {
                        return iterator(collections.pluck(index))
                    })
                },
                size: function() {
                    return this.toArray().length
                },
                inspect: function() {
                    return "#<Enumerable:" + this.toArray().inspect() + ">"
                },
                find: detect
            }
        }();

    function $A(iterable) {
        if (!iterable) return [];
        if ("toArray" in Object(iterable)) return iterable.toArray();
        for (var length = iterable.length || 0, results = new Array(length); length--;) results[length] = iterable[length];
        return results
    }

    function $w(string) {
        return Object.isString(string) && (string = string.strip()) ? string.split(/\s+/) : []
    }

    function $H(object) {
        return new Hash(object)
    }
    Array.from = $A,
        function() {
            var arrayProto = Array.prototype,
                slice = arrayProto.slice,
                _each = arrayProto.forEach;

            function clone() {
                return slice.call(this, 0)
            }
            _each || (_each = function(iterator, context) {
                    for (var i = 0, length = this.length >>> 0; i < length; i++) i in this && iterator.call(context, this[i], i, this)
                }), Object.extend(arrayProto, Enumerable), arrayProto._reverse || (arrayProto._reverse = arrayProto.reverse), Object.extend(arrayProto, {
                    _each: _each,
                    clear: function() {
                        return this.length = 0, this
                    },
                    first: function() {
                        return this[0]
                    },
                    last: function() {
                        return this[this.length - 1]
                    },
                    compact: function() {
                        return this.select(function(value) {
                            return null != value
                        })
                    },
                    flatten: function() {
                        return this.inject([], function(array, value) {
                            return Object.isArray(value) ? array.concat(value.flatten()) : (array.push(value), array)
                        })
                    },
                    without: function() {
                        var values = slice.call(arguments, 0);
                        return this.select(function(value) {
                            return !values.include(value)
                        })
                    },
                    reverse: function(inline) {
                        return (!1 === inline ? this.toArray() : this)._reverse()
                    },
                    uniq: function(sorted) {
                        return this.inject([], function(array, value, index) {
                            return 0 != index && (sorted ? array.last() == value : array.include(value)) || array.push(value), array
                        })
                    },
                    intersect: function(array) {
                        return this.uniq().findAll(function(item) {
                            return array.detect(function(value) {
                                return item === value
                            })
                        })
                    },
                    clone: clone,
                    toArray: clone,
                    size: function() {
                        return this.length
                    },
                    inspect: function() {
                        return "[" + this.map(Object.inspect).join(", ") + "]"
                    }
                }),
                function() {
                    return 1 !== [].concat(arguments)[0][0]
                }(1, 2) && (arrayProto.concat = function() {
                    for (var item, array = slice.call(this, 0), i = 0, length = arguments.length; i < length; i++)
                        if (item = arguments[i], !Object.isArray(item) || "callee" in item) array.push(item);
                        else
                            for (var j = 0, arrayLength = item.length; j < arrayLength; j++) array.push(item[j]);
                    return array
                }), arrayProto.indexOf || (arrayProto.indexOf = function(item, i) {
                    i || (i = 0);
                    var length = this.length;
                    for (i < 0 && (i = length + i); i < length; i++)
                        if (this[i] === item) return i;
                    return -1
                }), arrayProto.lastIndexOf || (arrayProto.lastIndexOf = function(item, i) {
                    i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
                    var n = this.slice(0, i).reverse().indexOf(item);
                    return n < 0 ? n : i - n - 1
                })
        }();
    var Hash = Class.create(Enumerable, function() {
        function toObject() {
            return Object.clone(this._object)
        }

        function toQueryPair(key, value) {
            return Object.isUndefined(value) ? key : key + "=" + encodeURIComponent(String.interpret(value))
        }
        return {
            initialize: function(object) {
                this._object = Object.isHash(object) ? object.toObject() : Object.clone(object)
            },
            _each: function(iterator) {
                for (var key in this._object) {
                    var value = this._object[key],
                        pair = [key, value];
                    pair.key = key, pair.value = value, iterator(pair)
                }
            },
            set: function(key, value) {
                return this._object[key] = value
            },
            get: function(key) {
                if (this._object[key] !== Object.prototype[key]) return this._object[key]
            },
            unset: function(key) {
                var value = this._object[key];
                return delete this._object[key], value
            },
            toObject: toObject,
            toTemplateReplacements: toObject,
            keys: function() {
                return this.pluck("key")
            },
            values: function() {
                return this.pluck("value")
            },
            index: function(value) {
                var match = this.detect(function(pair) {
                    return pair.value === value
                });
                return match && match.key
            },
            merge: function(object) {
                return this.clone().update(object)
            },
            update: function(object) {
                return new Hash(object).inject(this, function(result, pair) {
                    return result.set(pair.key, pair.value), result
                })
            },
            toQueryString: function() {
                return this.inject([], function(results, pair) {
                    var key = encodeURIComponent(pair.key),
                        values = pair.value;
                    if (values && "object" == typeof values) {
                        if (Object.isArray(values)) {
                            for (var value, queryValues = [], i = 0, len = values.length; i < len; i++) value = values[i], queryValues.push(toQueryPair(key, value));
                            return results.concat(queryValues)
                        }
                    } else results.push(toQueryPair(key, values));
                    return results
                }).join("&")
            },
            inspect: function() {
                return "#<Hash:{" + this.map(function(pair) {
                    return pair.map(Object.inspect).join(": ")
                }).join(", ") + "}>"
            },
            toJSON: toObject,
            clone: function() {
                return new Hash(this)
            }
        }
    }());

    function $R(start, end, exclusive) {
        return new ObjectRange(start, end, exclusive)
    }
    Hash.from = $H, Object.extend(Number.prototype, {
        toColorPart: function() {
            return this.toPaddedString(2, 16)
        },
        succ: function() {
            return this + 1
        },
        times: function(iterator, context) {
            return $R(0, this, !0).each(iterator, context), this
        },
        toPaddedString: function(length, radix) {
            var string = this.toString(radix || 10);
            return "0".times(length - string.length) + string
        },
        abs: function() {
            return Math.abs(this)
        },
        round: function() {
            return Math.round(this)
        },
        ceil: function() {
            return Math.ceil(this)
        },
        floor: function() {
            return Math.floor(this)
        }
    });
    var ObjectRange = Class.create(Enumerable, {
            initialize: function(start, end, exclusive) {
                this.start = start, this.end = end, this.exclusive = exclusive
            },
            _each: function(iterator) {
                for (var value = this.start; this.include(value);) iterator(value), value = value.succ()
            },
            include: function(value) {
                return !(value < this.start) && (this.exclusive ? value < this.end : value <= this.end)
            }
        }),
        Ajax = {
            getTransport: function() {
                return Try.these(function() {
                    return new XMLHttpRequest
                }, function() {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                }, function() {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                }) || !1
            },
            activeRequestCount: 0
        };

    function $(element) {
        if (1 < arguments.length) {
            for (var i = 0, elements = [], length = arguments.length; i < length; i++) elements.push($(arguments[i]));
            return elements
        }
        return Object.isString(element) && (element = document.getElementById(element)), Element.extend(element)
    }
    if (Ajax.Responders = {
            responders: [],
            _each: function(iterator) {
                this.responders._each(iterator)
            },
            register: function(responder) {
                this.include(responder) || this.responders.push(responder)
            },
            unregister: function(responder) {
                this.responders = this.responders.without(responder)
            },
            dispatch: function(callback, request, transport, json) {
                this.each(function(responder) {
                    if (Object.isFunction(responder[callback])) try {
                        responder[callback].apply(responder, [request, transport, json])
                    } catch (e) {}
                })
            }
        }, Object.extend(Ajax.Responders, Enumerable), Ajax.Responders.register({
            onCreate: function() {
                Ajax.activeRequestCount++
            },
            onComplete: function() {
                Ajax.activeRequestCount--
            }
        }), Ajax.Base = Class.create({
            initialize: function(options) {
                this.options = {
                    method: "post",
                    asynchronous: !0,
                    contentType: "application/x-www-form-urlencoded",
                    encoding: "UTF-8",
                    parameters: "",
                    evalJSON: !0,
                    evalJS: !0
                }, Object.extend(this.options, options || {}), this.options.method = this.options.method.toLowerCase(), Object.isHash(this.options.parameters) && (this.options.parameters = this.options.parameters.toObject())
            }
        }), Ajax.Request = Class.create(Ajax.Base, {
            _complete: !1,
            initialize: function($super, url, options) {
                $super(options), this.transport = Ajax.getTransport(), this.request(url)
            },
            request: function(url) {
                this.url = url, this.method = this.options.method;
                var params = Object.isString(this.options.parameters) ? this.options.parameters : Object.toQueryString(this.options.parameters);
                ["get", "post"].include(this.method) || (params += (params ? "&" : "") + "_method=" + this.method, this.method = "post"), params && "get" === this.method && (this.url += (this.url.include("?") ? "&" : "?") + params), this.parameters = params.toQueryParams();
                try {
                    var response = new Ajax.Response(this);
                    this.options.onCreate && this.options.onCreate(response), Ajax.Responders.dispatch("onCreate", this, response), this.transport.open(this.method.toUpperCase(), this.url, this.options.asynchronous), this.options.asynchronous && this.respondToReadyState.bind(this).defer(1), this.transport.onreadystatechange = this.onStateChange.bind(this), this.setRequestHeaders(), this.body = "post" == this.method ? this.options.postBody || params : null, this.transport.send(this.body), !this.options.asynchronous && this.transport.overrideMimeType && this.onStateChange()
                } catch (e) {
                    this.dispatchException(e)
                }
            },
            onStateChange: function() {
                var readyState = this.transport.readyState;
                1 < readyState && (4 != readyState || !this._complete) && this.respondToReadyState(this.transport.readyState)
            },
            setRequestHeaders: function() {
                var headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-Prototype-Version": Prototype.Version,
                    Accept: "text/javascript, text/html, application/xml, text/xml, */*"
                };
                if ("post" == this.method && (headers["Content-type"] = this.options.contentType + (this.options.encoding ? "; charset=" + this.options.encoding : ""), this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0, 2005])[1] < 2005 && (headers.Connection = "close")), "object" == typeof this.options.requestHeaders) {
                    var extras = this.options.requestHeaders;
                    if (Object.isFunction(extras.push))
                        for (var i = 0, length = extras.length; i < length; i += 2) headers[extras[i]] = extras[i + 1];
                    else $H(extras).each(function(pair) {
                        headers[pair.key] = pair.value
                    })
                }
                for (var name in headers) this.transport.setRequestHeader(name, headers[name])
            },
            success: function() {
                var status = this.getStatus();
                return !status || 200 <= status && status < 300 || 304 == status
            },
            getStatus: function() {
                try {
                    return 1223 === this.transport.status ? 204 : this.transport.status || 0
                } catch (e) {
                    return 0
                }
            },
            respondToReadyState: function(readyState) {
                var state = Ajax.Request.Events[readyState],
                    response = new Ajax.Response(this);
                if ("Complete" == state) {
                    try {
                        this._complete = !0, (this.options["on" + response.status] || this.options["on" + (this.success() ? "Success" : "Failure")] || Prototype.emptyFunction)(response, response.headerJSON)
                    } catch (e) {
                        this.dispatchException(e)
                    }
                    var contentType = response.getHeader("Content-type");
                    ("force" == this.options.evalJS || this.options.evalJS && this.isSameOrigin() && contentType && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)) && this.evalResponse()
                }
                try {
                    (this.options["on" + state] || Prototype.emptyFunction)(response, response.headerJSON), Ajax.Responders.dispatch("on" + state, this, response, response.headerJSON)
                } catch (e) {
                    this.dispatchException(e)
                }
                "Complete" == state && (this.transport.onreadystatechange = Prototype.emptyFunction)
            },
            isSameOrigin: function() {
                var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
                return !m || m[0] == "#{protocol}//#{domain}#{port}".interpolate({
                    protocol: location.protocol,
                    domain: document.domain,
                    port: location.port ? ":" + location.port : ""
                })
            },
            getHeader: function(name) {
                try {
                    return this.transport.getResponseHeader(name) || null
                } catch (e) {
                    return null
                }
            },
            evalResponse: function() {
                try {
                    return eval((this.transport.responseText || "").unfilterJSON())
                } catch (e) {
                    this.dispatchException(e)
                }
            },
            dispatchException: function(exception) {
                (this.options.onException || Prototype.emptyFunction)(this, exception), Ajax.Responders.dispatch("onException", this, exception)
            }
        }), Ajax.Request.Events = ["Uninitialized", "Loading", "Loaded", "Interactive", "Complete"], Ajax.Response = Class.create({
            initialize: function(request) {
                this.request = request;
                var transport = this.transport = request.transport,
                    readyState = this.readyState = transport.readyState;
                if ((2 < readyState && !Prototype.Browser.IE || 4 == readyState) && (this.status = this.getStatus(), this.statusText = this.getStatusText(), this.responseText = String.interpret(transport.responseText), this.headerJSON = this._getHeaderJSON()), 4 == readyState) {
                    var xml = transport.responseXML;
                    this.responseXML = Object.isUndefined(xml) ? null : xml, this.responseJSON = this._getResponseJSON()
                }
            },
            status: 0,
            statusText: "",
            getStatus: Ajax.Request.prototype.getStatus,
            getStatusText: function() {
                try {
                    return this.transport.statusText || ""
                } catch (e) {
                    return ""
                }
            },
            getHeader: Ajax.Request.prototype.getHeader,
            getAllHeaders: function() {
                try {
                    return this.getAllResponseHeaders()
                } catch (e) {
                    return null
                }
            },
            getResponseHeader: function(name) {
                return this.transport.getResponseHeader(name)
            },
            getAllResponseHeaders: function() {
                return this.transport.getAllResponseHeaders()
            },
            _getHeaderJSON: function() {
                var json = this.getHeader("X-JSON");
                if (!json) return null;
                json = decodeURIComponent(escape(json));
                try {
                    return json.evalJSON(this.request.options.sanitizeJSON || !this.request.isSameOrigin())
                } catch (e) {
                    this.request.dispatchException(e)
                }
            },
            _getResponseJSON: function() {
                var options = this.request.options;
                if (!options.evalJSON || "force" != options.evalJSON && !(this.getHeader("Content-type") || "").include("application/json") || this.responseText.blank()) return null;
                try {
                    return this.responseText.evalJSON(options.sanitizeJSON || !this.request.isSameOrigin())
                } catch (e) {
                    this.request.dispatchException(e)
                }
            }
        }), Ajax.Updater = Class.create(Ajax.Request, {
            initialize: function($super, container, url, options) {
                this.container = {
                    success: container.success || container,
                    failure: container.failure || (container.success ? null : container)
                };
                var onComplete = (options = Object.clone(options)).onComplete;
                options.onComplete = function(response, json) {
                    this.updateContent(response.responseText), Object.isFunction(onComplete) && onComplete(response, json)
                }.bind(this), $super(url, options)
            },
            updateContent: function(responseText) {
                var receiver = this.container[this.success() ? "success" : "failure"],
                    options = this.options;
                if (options.evalScripts || (responseText = responseText.stripScripts()), receiver = $(receiver))
                    if (options.insertion)
                        if (Object.isString(options.insertion)) {
                            var insertion = {};
                            insertion[options.insertion] = responseText, receiver.insert(insertion)
                        } else options.insertion(receiver, responseText);
                else receiver.update(responseText)
            }
        }), Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
            initialize: function($super, container, url, options) {
                $super(options), this.onComplete = this.options.onComplete, this.frequency = this.options.frequency || 2, this.decay = this.options.decay || 1, this.updater = {}, this.container = container, this.url = url, this.start()
            },
            start: function() {
                this.options.onComplete = this.updateComplete.bind(this), this.onTimerEvent()
            },
            stop: function() {
                this.updater.options.onComplete = void 0, clearTimeout(this.timer), (this.onComplete || Prototype.emptyFunction).apply(this, arguments)
            },
            updateComplete: function(response) {
                this.options.decay && (this.decay = response.responseText == this.lastText ? this.decay * this.options.decay : 1, this.lastText = response.responseText), this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency)
            },
            onTimerEvent: function() {
                this.updater = new Ajax.Updater(this.container, this.url, this.options)
            }
        }), Prototype.BrowserFeatures.XPath && (document._getElementsByXPath = function(expression, parentElement) {
            for (var results = [], query = document.evaluate(expression, $(parentElement) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), i = 0, length = query.snapshotLength; i < length; i++) results.push(Element.extend(query.snapshotItem(i)));
            return results
        }), !Node) var Node = {};
    Node.ELEMENT_NODE || Object.extend(Node, {
            ELEMENT_NODE: 1,
            ATTRIBUTE_NODE: 2,
            TEXT_NODE: 3,
            CDATA_SECTION_NODE: 4,
            ENTITY_REFERENCE_NODE: 5,
            ENTITY_NODE: 6,
            PROCESSING_INSTRUCTION_NODE: 7,
            COMMENT_NODE: 8,
            DOCUMENT_NODE: 9,
            DOCUMENT_TYPE_NODE: 10,
            DOCUMENT_FRAGMENT_NODE: 11,
            NOTATION_NODE: 12
        }),
        function(global) {
            var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = function() {
                    try {
                        var el = document.createElement('<input name="x">');
                        return "input" === el.tagName.toLowerCase() && "x" === el.name
                    } catch (err) {
                        return !1
                    }
                }(),
                element = global.Element;
            global.Element = function(tagName, attributes) {
                attributes = attributes || {}, tagName = tagName.toLowerCase();
                var cache = Element.cache;
                if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) return tagName = "<" + tagName + ' name="' + attributes.name + '">', delete attributes.name, Element.writeAttribute(document.createElement(tagName), attributes);
                cache[tagName] || (cache[tagName] = Element.extend(document.createElement(tagName)));
                var node = function(tagName, attributes) {
                    return "select" !== tagName && !("type" in attributes)
                }(tagName, attributes) ? cache[tagName].cloneNode(!1) : document.createElement(tagName);
                return Element.writeAttribute(node, attributes)
            }, Object.extend(global.Element, element || {}), element && (global.Element.prototype = element.prototype)
        }(this), Element.idCounter = 1, Element.cache = {}, Element._purgeElement = function(element) {
            var uid = element._prototypeUID;
            uid && (Element.stopObserving(element), element._prototypeUID = void 0, delete Element.Storage[uid])
        }, Element.Methods = {
            visible: function(element) {
                return "none" != $(element).style.display
            },
            toggle: function(element) {
                return element = $(element), Element[Element.visible(element) ? "hide" : "show"](element), element
            },
            hide: function(element) {
                return (element = $(element)).style.display = "none", element
            },
            show: function(element) {
                return (element = $(element)).style.display = "", element
            },
            remove: function(element) {
                return (element = $(element)).parentNode.removeChild(element), element
            },
            update: function() {
                var el, isBuggy, SELECT_ELEMENT_INNERHTML_BUGGY = (el = document.createElement("select"), isBuggy = !0, el.innerHTML = '<option value="test">test</option>', el.options && el.options[0] && (isBuggy = "OPTION" !== el.options[0].nodeName.toUpperCase()), el = null, isBuggy),
                    TABLE_ELEMENT_INNERHTML_BUGGY = function() {
                        try {
                            var el = document.createElement("table");
                            if (el && el.tBodies) {
                                el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
                                var isBuggy = void 0 === el.tBodies[0];
                                return el = null, isBuggy
                            }
                        } catch (e) {
                            return !0
                        }
                    }(),
                    LINK_ELEMENT_INNERHTML_BUGGY = function() {
                        try {
                            var el = document.createElement("div");
                            el.innerHTML = "<link>";
                            var isBuggy = 0 === el.childNodes.length;
                            return el = null, isBuggy
                        } catch (e) {
                            return !0
                        }
                    }(),
                    ANY_INNERHTML_BUGGY = SELECT_ELEMENT_INNERHTML_BUGGY || TABLE_ELEMENT_INNERHTML_BUGGY || LINK_ELEMENT_INNERHTML_BUGGY,
                    SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = function() {
                        var s = document.createElement("script"),
                            isBuggy = !1;
                        try {
                            s.appendChild(document.createTextNode("")), isBuggy = !s.firstChild || s.firstChild && 3 !== s.firstChild.nodeType
                        } catch (e) {
                            isBuggy = !0
                        }
                        return s = null, isBuggy
                    }();
                return function(element, content) {
                    element = $(element);
                    for (var purgeElement = Element._purgeElement, descendants = element.getElementsByTagName("*"), i = descendants.length; i--;) purgeElement(descendants[i]);
                    if (content && content.toElement && (content = content.toElement()), Object.isElement(content)) return element.update().insert(content);
                    content = Object.toHTML(content);
                    var tagName = element.tagName.toUpperCase();
                    if ("SCRIPT" === tagName && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) return element.text = content, element;
                    if (ANY_INNERHTML_BUGGY)
                        if (tagName in Element._insertionTranslations.tags) {
                            for (; element.firstChild;) element.removeChild(element.firstChild);
                            Element._getContentFromAnonymousElement(tagName, content.stripScripts()).each(function(node) {
                                element.appendChild(node)
                            })
                        } else if (LINK_ELEMENT_INNERHTML_BUGGY && Object.isString(content) && -1 < content.indexOf("<link")) {
                        for (; element.firstChild;) element.removeChild(element.firstChild);
                        Element._getContentFromAnonymousElement(tagName, content.stripScripts(), !0).each(function(node) {
                            element.appendChild(node)
                        })
                    } else element.innerHTML = content.stripScripts();
                    else element.innerHTML = content.stripScripts();
                    return content.evalScripts.bind(content).defer(), element
                }
            }(),
            replace: function(element, content) {
                if (element = $(element), content && content.toElement) content = content.toElement();
                else if (!Object.isElement(content)) {
                    content = Object.toHTML(content);
                    var range = element.ownerDocument.createRange();
                    range.selectNode(element), content.evalScripts.bind(content).defer(), content = range.createContextualFragment(content.stripScripts())
                }
                return element.parentNode.replaceChild(content, element), element
            },
            insert: function(element, insertions) {
                var content, insert, tagName, childNodes;
                for (var position in element = $(element), (Object.isString(insertions) || Object.isNumber(insertions) || Object.isElement(insertions) || insertions && (insertions.toElement || insertions.toHTML)) && (insertions = {
                        bottom: insertions
                    }), insertions) content = insertions[position], position = position.toLowerCase(), insert = Element._insertionTranslations[position], content && content.toElement && (content = content.toElement()), Object.isElement(content) ? insert(element, content) : (content = Object.toHTML(content), tagName = ("before" == position || "after" == position ? element.parentNode : element).tagName.toUpperCase(), childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts()), "top" != position && "after" != position || childNodes.reverse(), childNodes.each(insert.curry(element)), content.evalScripts.bind(content).defer());
                return element
            },
            wrap: function(element, wrapper, attributes) {
                return element = $(element), Object.isElement(wrapper) ? $(wrapper).writeAttribute(attributes || {}) : wrapper = Object.isString(wrapper) ? new Element(wrapper, attributes) : new Element("div", wrapper), element.parentNode && element.parentNode.replaceChild(wrapper, element), wrapper.appendChild(element), wrapper
            },
            inspect: function(element) {
                var result = "<" + (element = $(element)).tagName.toLowerCase();
                return $H({
                    id: "id",
                    className: "class"
                }).each(function(pair) {
                    var property = pair.first(),
                        attribute = pair.last(),
                        value = (element[property] || "").toString();
                    value && (result += " " + attribute + "=" + value.inspect(!0))
                }), result + ">"
            },
            recursivelyCollect: function(element, property, maximumLength) {
                element = $(element), maximumLength = maximumLength || -1;
                for (var elements = [];
                    (element = element[property]) && (1 == element.nodeType && elements.push(Element.extend(element)), elements.length != maximumLength););
                return elements
            },
            ancestors: function(element) {
                return Element.recursivelyCollect(element, "parentNode")
            },
            descendants: function(element) {
                return Element.select(element, "*")
            },
            firstDescendant: function(element) {
                for (element = $(element).firstChild; element && 1 != element.nodeType;) element = element.nextSibling;
                return $(element)
            },
            immediateDescendants: function(element) {
                for (var results = [], child = $(element).firstChild; child;) 1 === child.nodeType && results.push(Element.extend(child)), child = child.nextSibling;
                return results
            },
            previousSiblings: function(element, maximumLength) {
                return Element.recursivelyCollect(element, "previousSibling")
            },
            nextSiblings: function(element) {
                return Element.recursivelyCollect(element, "nextSibling")
            },
            siblings: function(element) {
                return element = $(element), Element.previousSiblings(element).reverse().concat(Element.nextSiblings(element))
            },
            match: function(element, selector) {
                return element = $(element), Object.isString(selector) ? Prototype.Selector.match(element, selector) : selector.match(element)
            },
            up: function(element, expression, index) {
                if (element = $(element), 1 == arguments.length) return $(element.parentNode);
                var ancestors = Element.ancestors(element);
                return Object.isNumber(expression) ? ancestors[expression] : Prototype.Selector.find(ancestors, expression, index)
            },
            down: function(element, expression, index) {
                return element = $(element), 1 == arguments.length ? Element.firstDescendant(element) : Object.isNumber(expression) ? Element.descendants(element)[expression] : Element.select(element, expression)[index || 0]
            },
            previous: function(element, expression, index) {
                return element = $(element), Object.isNumber(expression) && (index = expression, expression = !1), Object.isNumber(index) || (index = 0), expression ? Prototype.Selector.find(element.previousSiblings(), expression, index) : element.recursivelyCollect("previousSibling", index + 1)[index]
            },
            next: function(element, expression, index) {
                if (element = $(element), Object.isNumber(expression) && (index = expression, expression = !1), Object.isNumber(index) || (index = 0), expression) return Prototype.Selector.find(element.nextSiblings(), expression, index);
                Object.isNumber(index);
                return element.recursivelyCollect("nextSibling", index + 1)[index]
            },
            select: function(element) {
                element = $(element);
                var expressions = Array.prototype.slice.call(arguments, 1).join(", ");
                return Prototype.Selector.select(expressions, element)
            },
            adjacent: function(element) {
                element = $(element);
                var expressions = Array.prototype.slice.call(arguments, 1).join(", ");
                return Prototype.Selector.select(expressions, element.parentNode).without(element)
            },
            identify: function(element) {
                element = $(element);
                var id = Element.readAttribute(element, "id");
                if (id) return id;
                for (; $(id = "anonymous_element_" + Element.idCounter++););
                return Element.writeAttribute(element, "id", id), id
            },
            readAttribute: function(element, name) {
                if (element = $(element), Prototype.Browser.IE) {
                    var t = Element._attributeTranslations.read;
                    if (t.values[name]) return t.values[name](element, name);
                    if (t.names[name] && (name = t.names[name]), name.include(":")) return element.attributes && element.attributes[name] ? element.attributes[name].value : null
                }
                return element.getAttribute(name)
            },
            writeAttribute: function(element, name, value) {
                element = $(element);
                var attributes = {},
                    t = Element._attributeTranslations.write;
                for (var attr in "object" == typeof name ? attributes = name : attributes[name] = !!Object.isUndefined(value) || value, attributes) name = t.names[attr] || attr, value = attributes[attr], t.values[attr] && (name = t.values[attr](element, value)), !1 === value || null === value ? element.removeAttribute(name) : !0 === value ? element.setAttribute(name, name) : element.setAttribute(name, value);
                return element
            },
            getHeight: function(element) {
                return Element.getDimensions(element).height
            },
            getWidth: function(element) {
                return Element.getDimensions(element).width
            },
            classNames: function(element) {
                return new Element.ClassNames(element)
            },
            hasClassName: function(element, className) {
                if (element = $(element)) {
                    var elementClassName = element.className;
                    return 0 < elementClassName.length && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName))
                }
            },
            addClassName: function(element, className) {
                if (element = $(element)) return Element.hasClassName(element, className) || (element.className += (element.className ? " " : "") + className), element
            },
            removeClassName: function(element, className) {
                if (element = $(element)) return element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").strip(), element
            },
            toggleClassName: function(element, className) {
                if (element = $(element)) return Element[Element.hasClassName(element, className) ? "removeClassName" : "addClassName"](element, className)
            },
            cleanWhitespace: function(element) {
                for (var node = (element = $(element)).firstChild; node;) {
                    var nextNode = node.nextSibling;
                    3 != node.nodeType || /\S/.test(node.nodeValue) || element.removeChild(node), node = nextNode
                }
                return element
            },
            empty: function(element) {
                return $(element).innerHTML.blank()
            },
            descendantOf: function(element, ancestor) {
                if (element = $(element), ancestor = $(ancestor), element.compareDocumentPosition) return 8 == (8 & element.compareDocumentPosition(ancestor));
                if (ancestor.contains) return ancestor.contains(element) && ancestor !== element;
                for (; element = element.parentNode;)
                    if (element == ancestor) return !0;
                return !1
            },
            scrollTo: function(element) {
                element = $(element);
                var pos = Element.cumulativeOffset(element);
                return window.scrollTo(pos[0], pos[1]), element
            },
            getStyle: function(element, style) {
                element = $(element), style = "float" == style ? "cssFloat" : style.camelize();
                var value = element.style[style];
                if (!value || "auto" == value) {
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css[style] : null
                }
                return "opacity" == style ? value ? parseFloat(value) : 1 : "auto" == value ? null : value
            },
            getOpacity: function(element) {
                return $(element).getStyle("opacity")
            },
            setStyle: function(element, styles) {
                var elementStyle = (element = $(element)).style;
                if (Object.isString(styles)) return element.style.cssText += ";" + styles, styles.include("opacity") ? element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
                for (var property in styles) "opacity" == property ? element.setOpacity(styles[property]) : elementStyle["float" == property || "cssFloat" == property ? Object.isUndefined(elementStyle.styleFloat) ? "cssFloat" : "styleFloat" : property] = styles[property];
                return element
            },
            setOpacity: function(element, value) {
                return (element = $(element)).style.opacity = 1 == value || "" === value ? "" : value < 1e-5 ? 0 : value, element
            },
            makePositioned: function(element) {
                element = $(element);
                var pos = Element.getStyle(element, "position");
                return "static" != pos && pos || (element._madePositioned = !0, element.style.position = "relative", Prototype.Browser.Opera && (element.style.top = 0, element.style.left = 0)), element
            },
            undoPositioned: function(element) {
                return (element = $(element))._madePositioned && (element._madePositioned = void 0, element.style.position = element.style.top = element.style.left = element.style.bottom = element.style.right = ""), element
            },
            makeClipping: function(element) {
                return (element = $(element))._overflow || (element._overflow = Element.getStyle(element, "overflow") || "auto", "hidden" !== element._overflow && (element.style.overflow = "hidden")), element
            },
            undoClipping: function(element) {
                return (element = $(element))._overflow && (element.style.overflow = "auto" == element._overflow ? "" : element._overflow, element._overflow = null), element
            },
            clonePosition: function(element, source) {
                var options = Object.extend({
                    setLeft: !0,
                    setTop: !0,
                    setWidth: !0,
                    setHeight: !0,
                    offsetTop: 0,
                    offsetLeft: 0
                }, arguments[2] || {});
                source = $(source);
                var p = Element.viewportOffset(source),
                    delta = [0, 0],
                    parent = null;
                return element = $(element), "absolute" == Element.getStyle(element, "position") && (parent = Element.getOffsetParent(element), delta = Element.viewportOffset(parent)), parent == document.body && (delta[0] -= document.body.offsetLeft, delta[1] -= document.body.offsetTop), options.setLeft && (element.style.left = p[0] - delta[0] + options.offsetLeft + "px"), options.setTop && (element.style.top = p[1] - delta[1] + options.offsetTop + "px"), options.setWidth && (element.style.width = source.offsetWidth + "px"), options.setHeight && (element.style.height = source.offsetHeight + "px"), element
            }
        }, Object.extend(Element.Methods, {
            getElementsBySelector: Element.Methods.select,
            childElements: Element.Methods.immediateDescendants
        }), Element._attributeTranslations = {
            write: {
                names: {
                    className: "class",
                    htmlFor: "for"
                },
                values: {}
            }
        }, Prototype.Browser.Opera ? (Element.Methods.getStyle = Element.Methods.getStyle.wrap(function(proceed, element, style) {
            switch (style) {
                case "height":
                case "width":
                    if (!Element.visible(element)) return null;
                    var dim = parseInt(proceed(element, style), 10);
                    return dim !== element["offset" + style.capitalize()] ? dim + "px" : ("height" === style ? ["border-top-width", "padding-top", "padding-bottom", "border-bottom-width"] : ["border-left-width", "padding-left", "padding-right", "border-right-width"]).inject(dim, function(memo, property) {
                        var val = proceed(element, property);
                        return null === val ? memo : memo - parseInt(val, 10)
                    }) + "px";
                default:
                    return proceed(element, style)
            }
        }), Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(function(proceed, element, attribute) {
            return "title" === attribute ? element.title : proceed(element, attribute)
        })) : Prototype.Browser.IE ? (Element.Methods.getStyle = function(element, style) {
            element = $(element), style = "float" == style || "cssFloat" == style ? "styleFloat" : style.camelize();
            var value = element.style[style];
            return !value && element.currentStyle && (value = element.currentStyle[style]), "opacity" == style ? (value = (element.getStyle("filter") || "").match(/alpha\(opacity=(.*)\)/)) && value[1] ? parseFloat(value[1]) / 100 : 1 : "auto" == value ? "width" != style && "height" != style || "none" == element.getStyle("display") ? null : element["offset" + style.capitalize()] + "px" : value
        }, Element.Methods.setOpacity = function(element, value) {
            function stripAlpha(filter) {
                return filter.replace(/alpha\([^\)]*\)/gi, "")
            }
            var currentStyle = (element = $(element)).currentStyle;
            (currentStyle && !currentStyle.hasLayout || !currentStyle && "normal" == element.style.zoom) && (element.style.zoom = 1);
            var filter = element.getStyle("filter"),
                style = element.style;
            return 1 == value || "" === value ? (filter = stripAlpha(filter)) ? style.filter = filter : style.removeAttribute("filter") : (value < 1e-5 && (value = 0), style.filter = stripAlpha(filter) + "alpha(opacity=" + 100 * value + ")"), element
        }, Element._attributeTranslations = function() {
            var classProp = "className",
                forProp = "for",
                el = document.createElement("div");
            return el.setAttribute(classProp, "x"), "x" !== el.className && (el.setAttribute("class", "x"), "x" === el.className && (classProp = "class")), el = null, (el = document.createElement("label")).setAttribute(forProp, "x"), "x" !== el.htmlFor && (el.setAttribute("htmlFor", "x"), "x" === el.htmlFor && (forProp = "htmlFor")), el = null, {
                read: {
                    names: {
                        class: classProp,
                        className: classProp,
                        for: forProp,
                        htmlFor: forProp
                    },
                    values: {
                        _getAttr: function(element, attribute) {
                            return element.getAttribute(attribute)
                        },
                        _getAttr2: function(element, attribute) {
                            return element.getAttribute(attribute, 2)
                        },
                        _getAttrNode: function(element, attribute) {
                            var node = element.getAttributeNode(attribute);
                            return node ? node.value : ""
                        },
                        _getEv: function() {
                            var f, el = document.createElement("div");
                            el.onclick = Prototype.emptyFunction;
                            var value = el.getAttribute("onclick");
                            return -1 < String(value).indexOf("{") ? f = function(element, attribute) {
                                return (attribute = element.getAttribute(attribute)) ? (attribute = (attribute = (attribute = attribute.toString()).split("{")[1]).split("}")[0]).strip() : null
                            } : "" === value && (f = function(element, attribute) {
                                return (attribute = element.getAttribute(attribute)) ? attribute.strip() : null
                            }), el = null, f
                        }(),
                        _flag: function(element, attribute) {
                            return $(element).hasAttribute(attribute) ? attribute : null
                        },
                        style: function(element) {
                            return element.style.cssText.toLowerCase()
                        },
                        title: function(element) {
                            return element.title
                        }
                    }
                }
            }
        }(), Element._attributeTranslations.write = {
            names: Object.extend({
                cellpadding: "cellPadding",
                cellspacing: "cellSpacing"
            }, Element._attributeTranslations.read.names),
            values: {
                checked: function(element, value) {
                    element.checked = !!value
                },
                style: function(element, value) {
                    element.style.cssText = value || ""
                }
            }
        }, Element._attributeTranslations.has = {}, $w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder").each(function(attr) {
            Element._attributeTranslations.write.names[attr.toLowerCase()] = attr, Element._attributeTranslations.has[attr.toLowerCase()] = attr
        }), function(v) {
            Object.extend(v, {
                href: v._getAttr2,
                src: v._getAttr2,
                type: v._getAttr,
                action: v._getAttrNode,
                disabled: v._flag,
                checked: v._flag,
                readonly: v._flag,
                multiple: v._flag,
                onload: v._getEv,
                onunload: v._getEv,
                onclick: v._getEv,
                ondblclick: v._getEv,
                onmousedown: v._getEv,
                onmouseup: v._getEv,
                onmouseover: v._getEv,
                onmousemove: v._getEv,
                onmouseout: v._getEv,
                onfocus: v._getEv,
                onblur: v._getEv,
                onkeypress: v._getEv,
                onkeydown: v._getEv,
                onkeyup: v._getEv,
                onsubmit: v._getEv,
                onreset: v._getEv,
                onselect: v._getEv,
                onchange: v._getEv
            })
        }(Element._attributeTranslations.read.values), Prototype.BrowserFeatures.ElementExtensions && (Element.Methods.down = function(element, expression, index) {
            return element = $(element), 1 == arguments.length ? element.firstDescendant() : Object.isNumber(expression) ? function(element) {
                for (var node, nodes = element.getElementsByTagName("*"), results = [], i = 0; node = nodes[i]; i++) "!" !== node.tagName && results.push(node);
                return results
            }(element)[expression] : Element.select(element, expression)[index || 0]
        })) : Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent) ? Element.Methods.setOpacity = function(element, value) {
            return (element = $(element)).style.opacity = 1 == value ? .999999 : "" === value ? "" : value < 1e-5 ? 0 : value, element
        } : Prototype.Browser.WebKit && (Element.Methods.setOpacity = function(element, value) {
            if ((element = $(element)).style.opacity = 1 == value || "" === value ? "" : value < 1e-5 ? 0 : value, 1 == value)
                if ("IMG" == element.tagName.toUpperCase() && element.width) element.width++, element.width--;
                else try {
                    var n = document.createTextNode(" ");
                    element.appendChild(n), element.removeChild(n)
                } catch (e) {}
                return element
        }), "outerHTML" in document.documentElement && (Element.Methods.replace = function(element, content) {
            if (element = $(element), content && content.toElement && (content = content.toElement()), Object.isElement(content)) return element.parentNode.replaceChild(content, element), element;
            content = Object.toHTML(content);
            var parent = element.parentNode,
                tagName = parent.tagName.toUpperCase();
            if (Element._insertionTranslations.tags[tagName]) {
                var nextSibling = element.next(),
                    fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());
                parent.removeChild(element), nextSibling ? fragments.each(function(node) {
                    parent.insertBefore(node, nextSibling)
                }) : fragments.each(function(node) {
                    parent.appendChild(node)
                })
            } else element.outerHTML = content.stripScripts();
            return content.evalScripts.bind(content).defer(), element
        }), Element._returnOffset = function(l, t) {
            var result = [l, t];
            return result.left = l, result.top = t, result
        }, Element._getContentFromAnonymousElement = function(tagName, html, force) {
            var div = new Element("div"),
                t = Element._insertionTranslations.tags[tagName],
                workaround = !1;
            if (t ? workaround = !0 : force && (workaround = !0, t = ["", "", 0]), workaround) {
                div.innerHTML = "&nbsp;" + t[0] + html + t[1], div.removeChild(div.firstChild);
                for (var i = t[2]; i--;) div = div.firstChild
            } else div.innerHTML = html;
            return $A(div.childNodes)
        }, Element._insertionTranslations = {
            before: function(element, node) {
                element.parentNode.insertBefore(node, element)
            },
            top: function(element, node) {
                element.insertBefore(node, element.firstChild)
            },
            bottom: function(element, node) {
                element.appendChild(node)
            },
            after: function(element, node) {
                element.parentNode.insertBefore(node, element.nextSibling)
            },
            tags: {
                TABLE: ["<table>", "</table>", 1],
                TBODY: ["<table><tbody>", "</tbody></table>", 2],
                TR: ["<table><tbody><tr>", "</tr></tbody></table>", 3],
                TD: ["<table><tbody><tr><td>", "</td></tr></tbody></table>", 4],
                SELECT: ["<select>", "</select>", 1]
            }
        },
        function() {
            var tags = Element._insertionTranslations.tags;
            Object.extend(tags, {
                THEAD: tags.TBODY,
                TFOOT: tags.TBODY,
                TH: tags.TD
            })
        }(), Element.Methods.Simulated = {
            hasAttribute: function(element, attribute) {
                attribute = Element._attributeTranslations.has[attribute] || attribute;
                var node = $(element).getAttributeNode(attribute);
                return !(!node || !node.specified)
            }
        }, Element.Methods.ByTag = {}, Object.extend(Element, Element.Methods),
        function(div) {
            !Prototype.BrowserFeatures.ElementExtensions && div.__proto__ && (window.HTMLElement = {}, window.HTMLElement.prototype = div.__proto__, Prototype.BrowserFeatures.ElementExtensions = !0), div = null
        }(document.createElement("div")), Element.extend = function() {
            function extendElementWith(element, methods) {
                for (var property in methods) {
                    var value = methods[property];
                    !Object.isFunction(value) || property in element || (element[property] = value.methodize())
                }
            }
            var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY = function(tagName) {
                if (void 0 !== window.Element) {
                    var proto = window.Element.prototype;
                    if (proto) {
                        var id = "_" + (Math.random() + "").slice(2),
                            el = document.createElement(tagName),
                            isBuggy = (proto[id] = "x") !== el[id];
                        return delete proto[id], el = null, isBuggy
                    }
                }
                return !1
            }("object");
            if (Prototype.BrowserFeatures.SpecificElementExtensions) return HTMLOBJECTELEMENT_PROTOTYPE_BUGGY ? function(element) {
                if (element && void 0 === element._extendedByPrototype) {
                    var t = element.tagName;
                    t && /^(?:object|applet|embed)$/i.test(t) && (extendElementWith(element, Element.Methods), extendElementWith(element, Element.Methods.Simulated), extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]))
                }
                return element
            } : Prototype.K;
            var Methods = {},
                ByTag = Element.Methods.ByTag,
                extend = Object.extend(function(element) {
                    if (!element || void 0 !== element._extendedByPrototype || 1 != element.nodeType || element == window) return element;
                    var methods = Object.clone(Methods),
                        tagName = element.tagName.toUpperCase();
                    return ByTag[tagName] && Object.extend(methods, ByTag[tagName]), extendElementWith(element, methods), element._extendedByPrototype = Prototype.emptyFunction, element
                }, {
                    refresh: function() {
                        Prototype.BrowserFeatures.ElementExtensions || (Object.extend(Methods, Element.Methods), Object.extend(Methods, Element.Methods.Simulated))
                    }
                });
            return extend.refresh(), extend
        }(), document.documentElement.hasAttribute ? Element.hasAttribute = function(element, attribute) {
            return element.hasAttribute(attribute)
        } : Element.hasAttribute = Element.Methods.Simulated.hasAttribute, Element.addMethods = function(methods) {
            var F = Prototype.BrowserFeatures,
                T = Element.Methods.ByTag;
            if (methods || (Object.extend(Form, Form.Methods), Object.extend(Form.Element, Form.Element.Methods), Object.extend(Element.Methods.ByTag, {
                    FORM: Object.clone(Form.Methods),
                    INPUT: Object.clone(Form.Element.Methods),
                    SELECT: Object.clone(Form.Element.Methods),
                    TEXTAREA: Object.clone(Form.Element.Methods),
                    BUTTON: Object.clone(Form.Element.Methods)
                })), 2 == arguments.length) {
                var tagName = methods;
                methods = arguments[1]
            }

            function extend(tagName) {
                tagName = tagName.toUpperCase(), Element.Methods.ByTag[tagName] || (Element.Methods.ByTag[tagName] = {}), Object.extend(Element.Methods.ByTag[tagName], methods)
            }

            function copy(methods, destination, onlyIfAbsent) {
                for (var property in onlyIfAbsent = onlyIfAbsent || !1, methods) {
                    var value = methods[property];
                    Object.isFunction(value) && (onlyIfAbsent && property in destination || (destination[property] = value.methodize()))
                }
            }

            function findDOMClass(tagName) {
                var klass, trans = {
                    OPTGROUP: "OptGroup",
                    TEXTAREA: "TextArea",
                    P: "Paragraph",
                    FIELDSET: "FieldSet",
                    UL: "UList",
                    OL: "OList",
                    DL: "DList",
                    DIR: "Directory",
                    H1: "Heading",
                    H2: "Heading",
                    H3: "Heading",
                    H4: "Heading",
                    H5: "Heading",
                    H6: "Heading",
                    Q: "Quote",
                    INS: "Mod",
                    DEL: "Mod",
                    A: "Anchor",
                    IMG: "Image",
                    CAPTION: "TableCaption",
                    COL: "TableCol",
                    COLGROUP: "TableCol",
                    THEAD: "TableSection",
                    TFOOT: "TableSection",
                    TBODY: "TableSection",
                    TR: "TableRow",
                    TH: "TableCell",
                    TD: "TableCell",
                    FRAMESET: "FrameSet",
                    IFRAME: "IFrame"
                };
                if (trans[tagName] && (klass = "HTML" + trans[tagName] + "Element"), window[klass]) return window[klass];
                if (klass = "HTML" + tagName + "Element", window[klass]) return window[klass];
                if (klass = "HTML" + tagName.capitalize() + "Element", window[klass]) return window[klass];
                var element = document.createElement(tagName),
                    proto = element.__proto__ || element.constructor.prototype;
                return element = null, proto
            }
            tagName ? Object.isArray(tagName) ? tagName.each(extend) : extend(tagName) : Object.extend(Element.Methods, methods || {});
            var elementPrototype = window.HTMLElement ? HTMLElement.prototype : Element.prototype;
            if (F.ElementExtensions && (copy(Element.Methods, elementPrototype), copy(Element.Methods.Simulated, elementPrototype, !0)), F.SpecificElementExtensions)
                for (var tag in Element.Methods.ByTag) {
                    var klass = findDOMClass(tag);
                    Object.isUndefined(klass) || copy(T[tag], klass.prototype)
                }
            Object.extend(Element, Element.Methods), delete Element.ByTag, Element.extend.refresh && Element.extend.refresh(), Element.cache = {}
        }, document.viewport = {
            getDimensions: function() {
                return {
                    width: this.getWidth(),
                    height: this.getHeight()
                }
            },
            getScrollOffsets: function() {
                return Element._returnOffset(window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
            }
        },
        function(viewport) {
            var element, B = Prototype.Browser,
                doc = document,
                property = {};

            function define(D) {
                return element || (element = B.WebKit && !doc.evaluate ? document : B.Opera && window.parseFloat(window.opera.version()) < 9.5 ? document.body : document.documentElement), property[D] = "client" + D, viewport["get" + D] = function() {
                    return element[property[D]]
                }, viewport["get" + D]()
            }
            viewport.getWidth = define.curry("Width"), viewport.getHeight = define.curry("Height")
        }(document.viewport), Element.Storage = {
            UID: 1
        }, Element.addMethods({
            getStorage: function(element) {
                var uid;
                if (element = $(element)) return element === window ? uid = 0 : (void 0 === element._prototypeUID && (element._prototypeUID = Element.Storage.UID++), uid = element._prototypeUID), Element.Storage[uid] || (Element.Storage[uid] = $H()), Element.Storage[uid]
            },
            store: function(element, key, value) {
                if (element = $(element)) return 2 === arguments.length ? Element.getStorage(element).update(key) : Element.getStorage(element).set(key, value), element
            },
            retrieve: function(element, key, defaultValue) {
                if (element = $(element)) {
                    var hash = Element.getStorage(element),
                        value = hash.get(key);
                    return Object.isUndefined(value) && (hash.set(key, defaultValue), value = defaultValue), value
                }
            },
            clone: function(element, deep) {
                if (element = $(element)) {
                    var clone = element.cloneNode(deep);
                    if (clone._prototypeUID = void 0, deep)
                        for (var descendants = Element.select(clone, "*"), i = descendants.length; i--;) descendants[i]._prototypeUID = void 0;
                    return Element.extend(clone)
                }
            },
            purge: function(element) {
                if (element = $(element)) {
                    var purgeElement = Element._purgeElement;
                    purgeElement(element);
                    for (var descendants = element.getElementsByTagName("*"), i = descendants.length; i--;) purgeElement(descendants[i]);
                    return null
                }
            }
        }),
        function() {
            function getPixelValue(value, property, context) {
                var element = null;
                if (Object.isElement(value) && (value = (element = value).getStyle(property)), null === value) return null;
                if (/^(?:-)?\d+(\.\d+)?(px)?$/i.test(value)) return window.parseFloat(value);
                var match, isPercentage = value.include("%"),
                    isViewport = context === document.viewport;
                if (/\d/.test(value) && element && element.runtimeStyle && (!isPercentage || !isViewport)) {
                    var style = element.style.left,
                        rStyle = element.runtimeStyle.left;
                    return element.runtimeStyle.left = element.currentStyle.left, element.style.left = value || 0, value = element.style.pixelLeft, element.style.left = style, element.runtimeStyle.left = rStyle, value
                }
                if (element && isPercentage) {
                    context = context || element.parentNode;
                    var decimal = (match = value.match(/^(\d+)%?$/i)) ? Number(match[1]) / 100 : null,
                        whole = null,
                        isHorizontal = (element.getStyle("position"), property.include("left") || property.include("right") || property.include("width")),
                        isVertical = property.include("top") || property.include("bottom") || property.include("height");
                    return context === document.viewport ? isHorizontal ? whole = document.viewport.getWidth() : isVertical && (whole = document.viewport.getHeight()) : isHorizontal ? whole = $(context).measure("width") : isVertical && (whole = $(context).measure("height")), null === whole ? 0 : whole * decimal
                }
                return 0
            }
            var hasLayout = Prototype.K;

            function getOffsetParent(element) {
                if (isDocument(element = $(element)) || isDetached(element) || isBody(element) || isHtml(element)) return $(document.body);
                if (!("inline" === Element.getStyle(element, "display")) && element.offsetParent) return $(element.offsetParent);
                for (;
                    (element = element.parentNode) && element !== document.body;)
                    if ("static" !== Element.getStyle(element, "position")) return isHtml(element) ? $(document.body) : $(element);
                return $(document.body)
            }

            function cumulativeOffset(element) {
                var valueT = 0,
                    valueL = 0;
                if ((element = $(element)).parentNode)
                    for (; valueT += element.offsetTop || 0, valueL += element.offsetLeft || 0, element = element.offsetParent;);
                return new Element.Offset(valueL, valueT)
            }

            function positionedOffset(element) {
                var layout = (element = $(element)).getLayout(),
                    valueT = 0,
                    valueL = 0;
                do {
                    if (valueT += element.offsetTop || 0, valueL += element.offsetLeft || 0, element = element.offsetParent) {
                        if (isBody(element)) break;
                        if ("static" !== Element.getStyle(element, "position")) break
                    }
                } while (element);
                return valueL -= layout.get("margin-top"), valueT -= layout.get("margin-left"), new Element.Offset(valueL, valueT)
            }

            function isBody(element) {
                return "BODY" === element.nodeName.toUpperCase()
            }

            function isHtml(element) {
                return "HTML" === element.nodeName.toUpperCase()
            }

            function isDocument(element) {
                return element.nodeType === Node.DOCUMENT_NODE
            }

            function isDetached(element) {
                return element !== document.body && !Element.descendantOf(element, document.body)
            }
            "currentStyle" in document.documentElement && (hasLayout = function(element) {
                return element.currentStyle.hasLayout || (element.style.zoom = 1), element
            }), Element.Layout = Class.create(Hash, {
                initialize: function($super, element, preCompute) {
                    $super(), this.element = $(element), Element.Layout.PROPERTIES.each(function(property) {
                        this._set(property, null)
                    }, this), preCompute && (this._preComputing = !0, this._begin(), Element.Layout.PROPERTIES.each(this._compute, this), this._end(), this._preComputing = !1)
                },
                _set: function(property, value) {
                    return Hash.prototype.set.call(this, property, value)
                },
                set: function(property, value) {
                    throw "Properties of Element.Layout are read-only."
                },
                get: function($super, property) {
                    var value = $super(property);
                    return null === value ? this._compute(property) : value
                },
                _begin: function() {
                    if (!this._prepared) {
                        var element = this.element;
                        if (function(element) {
                                for (; element && element.parentNode;) {
                                    if ("none" === element.getStyle("display")) return !1;
                                    element = $(element.parentNode)
                                }
                                return !0
                            }(element)) this._prepared = !0;
                        else {
                            var originalStyles = {
                                position: element.style.position || "",
                                width: element.style.width || "",
                                visibility: element.style.visibility || "",
                                display: element.style.display || ""
                            };
                            element.store("prototype_original_styles", originalStyles);
                            var position = element.getStyle("position"),
                                width = element.getStyle("width");
                            "0px" !== width && null !== width || (element.style.display = "block", width = element.getStyle("width"));
                            var context = "fixed" === position ? document.viewport : element.parentNode;
                            element.setStyle({
                                position: "absolute",
                                visibility: "hidden",
                                display: "block"
                            });
                            var newWidth, positionedWidth = element.getStyle("width");
                            if (width && positionedWidth === width) newWidth = getPixelValue(element, "width", context);
                            else if ("absolute" === position || "fixed" === position) newWidth = getPixelValue(element, "width", context);
                            else {
                                newWidth = $(element.parentNode).getLayout().get("width") - this.get("margin-left") - this.get("border-left") - this.get("padding-left") - this.get("padding-right") - this.get("border-right") - this.get("margin-right")
                            }
                            element.setStyle({
                                width: newWidth + "px"
                            }), this._prepared = !0
                        }
                    }
                },
                _end: function() {
                    var element = this.element,
                        originalStyles = element.retrieve("prototype_original_styles");
                    element.store("prototype_original_styles", null), element.setStyle(originalStyles), this._prepared = !1
                },
                _compute: function(property) {
                    var COMPUTATIONS = Element.Layout.COMPUTATIONS;
                    if (!(property in COMPUTATIONS)) throw "Property not found.";
                    return this._set(property, COMPUTATIONS[property].call(this, this.element))
                },
                toObject: function() {
                    var args = $A(arguments),
                        keys = 0 === args.length ? Element.Layout.PROPERTIES : args.join(" ").split(" "),
                        obj = {};
                    return keys.each(function(key) {
                        if (Element.Layout.PROPERTIES.include(key)) {
                            var value = this.get(key);
                            null != value && (obj[key] = value)
                        }
                    }, this), obj
                },
                toHash: function() {
                    var obj = this.toObject.apply(this, arguments);
                    return new Hash(obj)
                },
                toCSS: function() {
                    var args = $A(arguments),
                        keys = 0 === args.length ? Element.Layout.PROPERTIES : args.join(" ").split(" "),
                        css = {};
                    return keys.each(function(key) {
                        if (Element.Layout.PROPERTIES.include(key) && !Element.Layout.COMPOSITE_PROPERTIES.include(key)) {
                            var value = this.get(key);
                            null != value && (css[function(key) {
                                return key.include("border") && (key += "-width"), key.camelize()
                            }(key)] = value + "px")
                        }
                    }, this), css
                },
                inspect: function() {
                    return "#<Element.Layout>"
                }
            }), Object.extend(Element.Layout, {
                PROPERTIES: $w("height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height"),
                COMPOSITE_PROPERTIES: $w("padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height"),
                COMPUTATIONS: {
                    height: function(element) {
                        this._preComputing || this._begin();
                        var bHeight = this.get("border-box-height");
                        if (bHeight <= 0) return this._preComputing || this._end(), 0;
                        var bTop = this.get("border-top"),
                            bBottom = this.get("border-bottom"),
                            pTop = this.get("padding-top"),
                            pBottom = this.get("padding-bottom");
                        return this._preComputing || this._end(), bHeight - bTop - bBottom - pTop - pBottom
                    },
                    width: function(element) {
                        this._preComputing || this._begin();
                        var bWidth = this.get("border-box-width");
                        if (bWidth <= 0) return this._preComputing || this._end(), 0;
                        var bLeft = this.get("border-left"),
                            bRight = this.get("border-right"),
                            pLeft = this.get("padding-left"),
                            pRight = this.get("padding-right");
                        return this._preComputing || this._end(), bWidth - bLeft - bRight - pLeft - pRight
                    },
                    "padding-box-height": function(element) {
                        return this.get("height") + this.get("padding-top") + this.get("padding-bottom")
                    },
                    "padding-box-width": function(element) {
                        return this.get("width") + this.get("padding-left") + this.get("padding-right")
                    },
                    "border-box-height": function(element) {
                        this._preComputing || this._begin();
                        var height = element.offsetHeight;
                        return this._preComputing || this._end(), height
                    },
                    "border-box-width": function(element) {
                        this._preComputing || this._begin();
                        var width = element.offsetWidth;
                        return this._preComputing || this._end(), width
                    },
                    "margin-box-height": function(element) {
                        var bHeight = this.get("border-box-height"),
                            mTop = this.get("margin-top"),
                            mBottom = this.get("margin-bottom");
                        return bHeight <= 0 ? 0 : bHeight + mTop + mBottom
                    },
                    "margin-box-width": function(element) {
                        var bWidth = this.get("border-box-width"),
                            mLeft = this.get("margin-left"),
                            mRight = this.get("margin-right");
                        return bWidth <= 0 ? 0 : bWidth + mLeft + mRight
                    },
                    top: function(element) {
                        return element.positionedOffset().top
                    },
                    bottom: function(element) {
                        var offset = element.positionedOffset();
                        return element.getOffsetParent().measure("height") - this.get("border-box-height") - offset.top
                    },
                    left: function(element) {
                        return element.positionedOffset().left
                    },
                    right: function(element) {
                        var offset = element.positionedOffset();
                        return element.getOffsetParent().measure("width") - this.get("border-box-width") - offset.left
                    },
                    "padding-top": function(element) {
                        return getPixelValue(element, "paddingTop")
                    },
                    "padding-bottom": function(element) {
                        return getPixelValue(element, "paddingBottom")
                    },
                    "padding-left": function(element) {
                        return getPixelValue(element, "paddingLeft")
                    },
                    "padding-right": function(element) {
                        return getPixelValue(element, "paddingRight")
                    },
                    "border-top": function(element) {
                        return getPixelValue(element, "borderTopWidth")
                    },
                    "border-bottom": function(element) {
                        return getPixelValue(element, "borderBottomWidth")
                    },
                    "border-left": function(element) {
                        return getPixelValue(element, "borderLeftWidth")
                    },
                    "border-right": function(element) {
                        return getPixelValue(element, "borderRightWidth")
                    },
                    "margin-top": function(element) {
                        return getPixelValue(element, "marginTop")
                    },
                    "margin-bottom": function(element) {
                        return getPixelValue(element, "marginBottom")
                    },
                    "margin-left": function(element) {
                        return getPixelValue(element, "marginLeft")
                    },
                    "margin-right": function(element) {
                        return getPixelValue(element, "marginRight")
                    }
                }
            }), "getBoundingClientRect" in document.documentElement && Object.extend(Element.Layout.COMPUTATIONS, {
                right: function(element) {
                    var parent = hasLayout(element.getOffsetParent()),
                        rect = element.getBoundingClientRect();
                    return (parent.getBoundingClientRect().right - rect.right).round()
                },
                bottom: function(element) {
                    var parent = hasLayout(element.getOffsetParent()),
                        rect = element.getBoundingClientRect();
                    return (parent.getBoundingClientRect().bottom - rect.bottom).round()
                }
            }), Element.Offset = Class.create({
                initialize: function(left, top) {
                    this.left = left.round(), this.top = top.round(), this[0] = this.left, this[1] = this.top
                },
                relativeTo: function(offset) {
                    return new Element.Offset(this.left - offset.left, this.top - offset.top)
                },
                inspect: function() {
                    return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this)
                },
                toString: function() {
                    return "[#{left}, #{top}]".interpolate(this)
                },
                toArray: function() {
                    return [this.left, this.top]
                }
            }), Prototype.Browser.IE ? (getOffsetParent = getOffsetParent.wrap(function(proceed, element) {
                if (isDocument(element = $(element)) || isDetached(element) || isBody(element) || isHtml(element)) return $(document.body);
                var position = element.getStyle("position");
                if ("static" !== position) return proceed(element);
                element.setStyle({
                    position: "relative"
                });
                var value = proceed(element);
                return element.setStyle({
                    position: position
                }), value
            }), positionedOffset = positionedOffset.wrap(function(proceed, element) {
                if (!(element = $(element)).parentNode) return new Element.Offset(0, 0);
                var position = element.getStyle("position");
                if ("static" !== position) return proceed(element);
                var offsetParent = element.getOffsetParent();
                offsetParent && "fixed" === offsetParent.getStyle("position") && hasLayout(offsetParent), element.setStyle({
                    position: "relative"
                });
                var value = proceed(element);
                return element.setStyle({
                    position: position
                }), value
            })) : Prototype.Browser.Webkit && (cumulativeOffset = function(element) {
                element = $(element);
                var valueT = 0,
                    valueL = 0;
                do {
                    if (valueT += element.offsetTop || 0, valueL += element.offsetLeft || 0, element.offsetParent == document.body && "absolute" == Element.getStyle(element, "position")) break;
                    element = element.offsetParent
                } while (element);
                return new Element.Offset(valueL, valueT)
            }), Element.addMethods({
                getLayout: function(element, preCompute) {
                    return new Element.Layout(element, preCompute)
                },
                measure: function(element, property) {
                    return $(element).getLayout().get(property)
                },
                getDimensions: function(element) {
                    element = $(element);
                    var display = Element.getStyle(element, "display");
                    if (display && "none" !== display) return {
                        width: element.offsetWidth,
                        height: element.offsetHeight
                    };
                    var style = element.style,
                        originalStyles = {
                            visibility: style.visibility,
                            position: style.position,
                            display: style.display
                        },
                        newStyles = {
                            visibility: "hidden",
                            display: "block"
                        };
                    "fixed" !== originalStyles.position && (newStyles.position = "absolute"), Element.setStyle(element, newStyles);
                    var dimensions = {
                        width: element.offsetWidth,
                        height: element.offsetHeight
                    };
                    return Element.setStyle(element, originalStyles), dimensions
                },
                getOffsetParent: getOffsetParent,
                cumulativeOffset: cumulativeOffset,
                positionedOffset: positionedOffset,
                cumulativeScrollOffset: function(element) {
                    for (var valueT = 0, valueL = 0; valueT += element.scrollTop || 0, valueL += element.scrollLeft || 0, element = element.parentNode;);
                    return new Element.Offset(valueL, valueT)
                },
                viewportOffset: function(forElement) {
                    element = $(element);
                    var valueT = 0,
                        valueL = 0,
                        docBody = document.body,
                        element = forElement;
                    do {
                        if (valueT += element.offsetTop || 0, valueL += element.offsetLeft || 0, element.offsetParent == docBody && "absolute" == Element.getStyle(element, "position")) break
                    } while (element = element.offsetParent);
                    for (element = forElement; element != docBody && (valueT -= element.scrollTop || 0, valueL -= element.scrollLeft || 0), element = element.parentNode;);
                    return new Element.Offset(valueL, valueT)
                },
                absolutize: function(element) {
                    if (element = $(element), "absolute" === Element.getStyle(element, "position")) return element;
                    var offsetParent = getOffsetParent(element),
                        eOffset = element.viewportOffset(),
                        pOffset = offsetParent.viewportOffset(),
                        offset = eOffset.relativeTo(pOffset),
                        layout = element.getLayout();
                    return element.store("prototype_absolutize_original_styles", {
                        left: element.getStyle("left"),
                        top: element.getStyle("top"),
                        width: element.getStyle("width"),
                        height: element.getStyle("height")
                    }), element.setStyle({
                        position: "absolute",
                        top: offset.top + "px",
                        left: offset.left + "px",
                        width: layout.get("width") + "px",
                        height: layout.get("height") + "px"
                    }), element
                },
                relativize: function(element) {
                    if (element = $(element), "relative" === Element.getStyle(element, "position")) return element;
                    var originalStyles = element.retrieve("prototype_absolutize_original_styles");
                    return originalStyles && element.setStyle(originalStyles), element
                }
            }), "getBoundingClientRect" in document.documentElement && Element.addMethods({
                viewportOffset: function(element) {
                    if (isDetached(element = $(element))) return new Element.Offset(0, 0);
                    var rect = element.getBoundingClientRect(),
                        docEl = document.documentElement;
                    return new Element.Offset(rect.left - docEl.clientLeft, rect.top - docEl.clientTop)
                }
            })
        }(), window.$$ = function() {
            var expression = $A(arguments).join(", ");
            return Prototype.Selector.select(expression, document)
        }, Prototype.Selector = function() {
            var K = Prototype.K;
            return {
                select: function() {
                    throw new Error('Method "Prototype.Selector.select" must be defined.')
                },
                match: function() {
                    throw new Error('Method "Prototype.Selector.match" must be defined.')
                },
                find: function(elements, expression, index) {
                    index = index || 0;
                    var i, match = Prototype.Selector.match,
                        length = elements.length,
                        matchIndex = 0;
                    for (i = 0; i < length; i++)
                        if (match(elements[i], expression) && index == matchIndex++) return Element.extend(elements[i])
                },
                extendElements: Element.extend === K ? K : function(elements) {
                    for (var i = 0, length = elements.length; i < length; i++) Element.extend(elements[i]);
                    return elements
                },
                extendElement: Element.extend
            }
        }(), Prototype._original_property = window.Sizzle,
        function() {
            var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                done = 0,
                toString = Object.prototype.toString,
                hasDuplicate = !1,
                baseHasDuplicate = !0;
            [0, 0].sort(function() {
                return baseHasDuplicate = !1, 0
            });
            var Sizzle = function(selector, context, results, seed) {
                results = results || [];
                var origContext = context = context || document;
                if (1 !== context.nodeType && 9 !== context.nodeType) return [];
                if (!selector || "string" != typeof selector) return results;
                for (var m, set, checkSet, extra, parts = [], prune = !0, contextXML = isXML(context), soFar = selector; null !== (chunker.exec(""), m = chunker.exec(soFar));)
                    if (soFar = m[3], parts.push(m[1]), m[2]) {
                        extra = m[3];
                        break
                    }
                if (1 < parts.length && origPOS.exec(selector))
                    if (2 === parts.length && Expr.relative[parts[0]]) set = posProcess(parts[0] + parts[1], context);
                    else
                        for (set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context); parts.length;) selector = parts.shift(), Expr.relative[selector] && (selector += parts.shift()), set = posProcess(selector, set);
                else {
                    var ret;
                    if (!seed && 1 < parts.length && 9 === context.nodeType && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) context = (ret = Sizzle.find(parts.shift(), context, contextXML)).expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                    if (context)
                        for (set = (ret = seed ? {
                                expr: parts.pop(),
                                set: makeArray(seed)
                            } : Sizzle.find(parts.pop(), 1 !== parts.length || "~" !== parts[0] && "+" !== parts[0] || !context.parentNode ? context : context.parentNode, contextXML)).expr ? Sizzle.filter(ret.expr, ret.set) : ret.set, 0 < parts.length ? checkSet = makeArray(set) : prune = !1; parts.length;) {
                            var cur = parts.pop(),
                                pop = cur;
                            Expr.relative[cur] ? pop = parts.pop() : cur = "", null == pop && (pop = context), Expr.relative[cur](checkSet, pop, contextXML)
                        } else checkSet = parts = []
                }
                if (checkSet || (checkSet = set), !checkSet) throw "Syntax error, unrecognized expression: " + (cur || selector);
                if ("[object Array]" === toString.call(checkSet))
                    if (prune)
                        if (context && 1 === context.nodeType)
                            for (var i = 0; null != checkSet[i]; i++) checkSet[i] && (!0 === checkSet[i] || 1 === checkSet[i].nodeType && contains(context, checkSet[i])) && results.push(set[i]);
                        else
                            for (i = 0; null != checkSet[i]; i++) checkSet[i] && 1 === checkSet[i].nodeType && results.push(set[i]);
                else results.push.apply(results, checkSet);
                else makeArray(checkSet, results);
                return extra && (Sizzle(extra, origContext, results, seed), Sizzle.uniqueSort(results)), results
            };
            Sizzle.uniqueSort = function(results) {
                if (sortOrder && (hasDuplicate = baseHasDuplicate, results.sort(sortOrder), hasDuplicate))
                    for (var i = 1; i < results.length; i++) results[i] === results[i - 1] && results.splice(i--, 1);
                return results
            }, Sizzle.matches = function(expr, set) {
                return Sizzle(expr, null, null, set)
            }, Sizzle.find = function(expr, context, isXML) {
                var set;
                if (!expr) return [];
                for (var i = 0, l = Expr.order.length; i < l; i++) {
                    var match, type = Expr.order[i];
                    if (match = Expr.leftMatch[type].exec(expr)) {
                        var left = match[1];
                        if (match.splice(1, 1), "\\" !== left.substr(left.length - 1) && (match[1] = (match[1] || "").replace(/\\/g, ""), null != (set = Expr.find[type](match, context, isXML)))) {
                            expr = expr.replace(Expr.match[type], "");
                            break
                        }
                    }
                }
                return set || (set = context.getElementsByTagName("*")), {
                    set: set,
                    expr: expr
                }
            }, Sizzle.filter = function(expr, set, inplace, not) {
                for (var match, anyFound, old = expr, result = [], curLoop = set, isXMLFilter = set && set[0] && isXML(set[0]); expr && set.length;) {
                    for (var type in Expr.filter)
                        if (null != (match = Expr.match[type].exec(expr))) {
                            var found, item, filter = Expr.filter[type];
                            if (anyFound = !1, curLoop == result && (result = []), Expr.preFilter[type])
                                if (match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter)) {
                                    if (!0 === match) continue
                                } else anyFound = found = !0;
                            if (match)
                                for (var i = 0; null != (item = curLoop[i]); i++)
                                    if (item) {
                                        var pass = not ^ !!(found = filter(item, match, i, curLoop));
                                        inplace && null != found ? pass ? anyFound = !0 : curLoop[i] = !1 : pass && (result.push(item), anyFound = !0)
                                    }
                            if (void 0 !== found) {
                                if (inplace || (curLoop = result), expr = expr.replace(Expr.match[type], ""), !anyFound) return [];
                                break
                            }
                        }
                    if (expr == old) {
                        if (null == anyFound) throw "Syntax error, unrecognized expression: " + expr;
                        break
                    }
                    old = expr
                }
                return curLoop
            };
            var Expr = Sizzle.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        class: "className",
                        for: "htmlFor"
                    },
                    attrHandle: {
                        href: function(elem) {
                            return elem.getAttribute("href")
                        }
                    },
                    relative: {
                        "+": function(checkSet, part, isXML) {
                            var isPartStr = "string" == typeof part,
                                isTag = isPartStr && !/\W/.test(part),
                                isPartStrNotTag = isPartStr && !isTag;
                            isTag && !isXML && (part = part.toUpperCase());
                            for (var elem, i = 0, l = checkSet.length; i < l; i++)
                                if (elem = checkSet[i]) {
                                    for (;
                                        (elem = elem.previousSibling) && 1 !== elem.nodeType;);
                                    checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ? elem || !1 : elem === part
                                }
                            isPartStrNotTag && Sizzle.filter(part, checkSet, !0)
                        },
                        ">": function(checkSet, part, isXML) {
                            var isPartStr = "string" == typeof part;
                            if (isPartStr && !/\W/.test(part)) {
                                part = isXML ? part : part.toUpperCase();
                                for (var i = 0, l = checkSet.length; i < l; i++) {
                                    if (elem = checkSet[i]) {
                                        var parent = elem.parentNode;
                                        checkSet[i] = parent.nodeName === part && parent
                                    }
                                }
                            } else {
                                for (i = 0, l = checkSet.length; i < l; i++) {
                                    var elem;
                                    (elem = checkSet[i]) && (checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part)
                                }
                                isPartStr && Sizzle.filter(part, checkSet, !0)
                            }
                        },
                        "": function(checkSet, part, isXML) {
                            var doneName = done++,
                                checkFn = dirCheck;
                            if (!/\W/.test(part)) {
                                var nodeCheck = part = isXML ? part : part.toUpperCase();
                                checkFn = dirNodeCheck
                            }
                            checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML)
                        },
                        "~": function(checkSet, part, isXML) {
                            var doneName = done++,
                                checkFn = dirCheck;
                            if ("string" == typeof part && !/\W/.test(part)) {
                                var nodeCheck = part = isXML ? part : part.toUpperCase();
                                checkFn = dirNodeCheck
                            }
                            checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML)
                        }
                    },
                    find: {
                        ID: function(match, context, isXML) {
                            if (void 0 !== context.getElementById && !isXML) {
                                var m = context.getElementById(match[1]);
                                return m ? [m] : []
                            }
                        },
                        NAME: function(match, context, isXML) {
                            if (void 0 !== context.getElementsByName) {
                                for (var ret = [], results = context.getElementsByName(match[1]), i = 0, l = results.length; i < l; i++) results[i].getAttribute("name") === match[1] && ret.push(results[i]);
                                return 0 === ret.length ? null : ret
                            }
                        },
                        TAG: function(match, context) {
                            return context.getElementsByTagName(match[1])
                        }
                    },
                    preFilter: {
                        CLASS: function(match, curLoop, inplace, result, not, isXML) {
                            if (match = " " + match[1].replace(/\\/g, "") + " ", isXML) return match;
                            for (var elem, i = 0; null != (elem = curLoop[i]); i++) elem && (not ^ (elem.className && 0 <= (" " + elem.className + " ").indexOf(match)) ? inplace || result.push(elem) : inplace && (curLoop[i] = !1));
                            return !1
                        },
                        ID: function(match) {
                            return match[1].replace(/\\/g, "")
                        },
                        TAG: function(match, curLoop) {
                            for (var i = 0; !1 === curLoop[i]; i++);
                            return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase()
                        },
                        CHILD: function(match) {
                            if ("nth" == match[1]) {
                                var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(("even" == match[2] ? "2n" : "odd" == match[2] && "2n+1") || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                                match[2] = test[1] + (test[2] || 1) - 0, match[3] = test[3] - 0
                            }
                            return match[0] = done++, match
                        },
                        ATTR: function(match, curLoop, inplace, result, not, isXML) {
                            var name = match[1].replace(/\\/g, "");
                            return !isXML && Expr.attrMap[name] && (match[1] = Expr.attrMap[name]), "~=" === match[2] && (match[4] = " " + match[4] + " "), match
                        },
                        PSEUDO: function(match, curLoop, inplace, result, not) {
                            if ("not" === match[1]) {
                                if (!(1 < (chunker.exec(match[3]) || "").length || /^\w/.test(match[3]))) {
                                    var ret = Sizzle.filter(match[3], curLoop, inplace, !0 ^ not);
                                    return inplace || result.push.apply(result, ret), !1
                                }
                                match[3] = Sizzle(match[3], null, null, curLoop)
                            } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) return !0;
                            return match
                        },
                        POS: function(match) {
                            return match.unshift(!0), match
                        }
                    },
                    filters: {
                        enabled: function(elem) {
                            return !1 === elem.disabled && "hidden" !== elem.type
                        },
                        disabled: function(elem) {
                            return !0 === elem.disabled
                        },
                        checked: function(elem) {
                            return !0 === elem.checked
                        },
                        selected: function(elem) {
                            return elem.parentNode.selectedIndex, !0 === elem.selected
                        },
                        parent: function(elem) {
                            return !!elem.firstChild
                        },
                        empty: function(elem) {
                            return !elem.firstChild
                        },
                        has: function(elem, i, match) {
                            return !!Sizzle(match[3], elem).length
                        },
                        header: function(elem) {
                            return /h\d/i.test(elem.nodeName)
                        },
                        text: function(elem) {
                            return "text" === elem.type
                        },
                        radio: function(elem) {
                            return "radio" === elem.type
                        },
                        checkbox: function(elem) {
                            return "checkbox" === elem.type
                        },
                        file: function(elem) {
                            return "file" === elem.type
                        },
                        password: function(elem) {
                            return "password" === elem.type
                        },
                        submit: function(elem) {
                            return "submit" === elem.type
                        },
                        image: function(elem) {
                            return "image" === elem.type
                        },
                        reset: function(elem) {
                            return "reset" === elem.type
                        },
                        button: function(elem) {
                            return "button" === elem.type || "BUTTON" === elem.nodeName.toUpperCase()
                        },
                        input: function(elem) {
                            return /input|select|textarea|button/i.test(elem.nodeName)
                        }
                    },
                    setFilters: {
                        first: function(elem, i) {
                            return 0 === i
                        },
                        last: function(elem, i, match, array) {
                            return i === array.length - 1
                        },
                        even: function(elem, i) {
                            return i % 2 == 0
                        },
                        odd: function(elem, i) {
                            return i % 2 == 1
                        },
                        lt: function(elem, i, match) {
                            return i < match[3] - 0
                        },
                        gt: function(elem, i, match) {
                            return i > match[3] - 0
                        },
                        nth: function(elem, i, match) {
                            return match[3] - 0 == i
                        },
                        eq: function(elem, i, match) {
                            return match[3] - 0 == i
                        }
                    },
                    filter: {
                        PSEUDO: function(elem, match, i, array) {
                            var name = match[1],
                                filter = Expr.filters[name];
                            if (filter) return filter(elem, i, match, array);
                            if ("contains" === name) return 0 <= (elem.textContent || elem.innerText || "").indexOf(match[3]);
                            if ("not" === name) {
                                for (var not = match[3], l = (i = 0, not.length); i < l; i++)
                                    if (not[i] === elem) return !1;
                                return !0
                            }
                        },
                        CHILD: function(elem, match) {
                            var type = match[1],
                                node = elem;
                            switch (type) {
                                case "only":
                                case "first":
                                    for (; node = node.previousSibling;)
                                        if (1 === node.nodeType) return !1;
                                    if ("first" == type) return !0;
                                    node = elem;
                                case "last":
                                    for (; node = node.nextSibling;)
                                        if (1 === node.nodeType) return !1;
                                    return !0;
                                case "nth":
                                    var first = match[2],
                                        last = match[3];
                                    if (1 == first && 0 == last) return !0;
                                    var doneName = match[0],
                                        parent = elem.parentNode;
                                    if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                                        var count = 0;
                                        for (node = parent.firstChild; node; node = node.nextSibling) 1 === node.nodeType && (node.nodeIndex = ++count);
                                        parent.sizcache = doneName
                                    }
                                    var diff = elem.nodeIndex - last;
                                    return 0 == first ? 0 == diff : diff % first == 0 && 0 <= diff / first
                            }
                        },
                        ID: function(elem, match) {
                            return 1 === elem.nodeType && elem.getAttribute("id") === match
                        },
                        TAG: function(elem, match) {
                            return "*" === match && 1 === elem.nodeType || elem.nodeName === match
                        },
                        CLASS: function(elem, match) {
                            return -1 < (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match)
                        },
                        ATTR: function(elem, match) {
                            var name = match[1],
                                result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : null != elem[name] ? elem[name] : elem.getAttribute(name),
                                value = result + "",
                                type = match[2],
                                check = match[4];
                            return null == result ? "!=" === type : "=" === type ? value === check : "*=" === type ? 0 <= value.indexOf(check) : "~=" === type ? 0 <= (" " + value + " ").indexOf(check) : check ? "!=" === type ? value != check : "^=" === type ? 0 === value.indexOf(check) : "$=" === type ? value.substr(value.length - check.length) === check : "|=" === type && (value === check || value.substr(0, check.length + 1) === check + "-") : value && !1 !== result
                        },
                        POS: function(elem, match, i, array) {
                            var name = match[2],
                                filter = Expr.setFilters[name];
                            if (filter) return filter(elem, i, match, array)
                        }
                    }
                },
                origPOS = Expr.match.POS;
            for (var type in Expr.match) Expr.match[type] = new RegExp(Expr.match[type].source + /(?![^\[]*\])(?![^\(]*\))/.source), Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source);
            var sortOrder, div, makeArray = function(array, results) {
                return array = Array.prototype.slice.call(array, 0), results ? (results.push.apply(results, array), results) : array
            };
            try {
                Array.prototype.slice.call(document.documentElement.childNodes, 0)
            } catch (e) {
                makeArray = function(array, results) {
                    var ret = results || [];
                    if ("[object Array]" === toString.call(array)) Array.prototype.push.apply(ret, array);
                    else if ("number" == typeof array.length)
                        for (var i = 0, l = array.length; i < l; i++) ret.push(array[i]);
                    else
                        for (i = 0; array[i]; i++) ret.push(array[i]);
                    return ret
                }
            }

            function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
                for (var sibDir = "previousSibling" == dir && !isXML, i = 0, l = checkSet.length; i < l; i++) {
                    var elem = checkSet[i];
                    if (elem) {
                        sibDir && 1 === elem.nodeType && (elem.sizcache = doneName, elem.sizset = i), elem = elem[dir];
                        for (var match = !1; elem;) {
                            if (elem.sizcache === doneName) {
                                match = checkSet[elem.sizset];
                                break
                            }
                            if (1 !== elem.nodeType || isXML || (elem.sizcache = doneName, elem.sizset = i), elem.nodeName === cur) {
                                match = elem;
                                break
                            }
                            elem = elem[dir]
                        }
                        checkSet[i] = match
                    }
                }
            }

            function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
                for (var sibDir = "previousSibling" == dir && !isXML, i = 0, l = checkSet.length; i < l; i++) {
                    var elem = checkSet[i];
                    if (elem) {
                        sibDir && 1 === elem.nodeType && (elem.sizcache = doneName, elem.sizset = i), elem = elem[dir];
                        for (var match = !1; elem;) {
                            if (elem.sizcache === doneName) {
                                match = checkSet[elem.sizset];
                                break
                            }
                            if (1 === elem.nodeType)
                                if (isXML || (elem.sizcache = doneName, elem.sizset = i), "string" != typeof cur) {
                                    if (elem === cur) {
                                        match = !0;
                                        break
                                    }
                                } else if (0 < Sizzle.filter(cur, [elem]).length) {
                                match = elem;
                                break
                            }
                            elem = elem[dir]
                        }
                        checkSet[i] = match
                    }
                }
            }
            document.documentElement.compareDocumentPosition ? sortOrder = function(a, b) {
                    if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a == b && (hasDuplicate = !0), 0;
                    var ret = 4 & a.compareDocumentPosition(b) ? -1 : a === b ? 0 : 1;
                    return 0 === ret && (hasDuplicate = !0), ret
                } : "sourceIndex" in document.documentElement ? sortOrder = function(a, b) {
                    if (!a.sourceIndex || !b.sourceIndex) return a == b && (hasDuplicate = !0), 0;
                    var ret = a.sourceIndex - b.sourceIndex;
                    return 0 === ret && (hasDuplicate = !0), ret
                } : document.createRange && (sortOrder = function(a, b) {
                    if (!a.ownerDocument || !b.ownerDocument) return a == b && (hasDuplicate = !0), 0;
                    var aRange = a.ownerDocument.createRange(),
                        bRange = b.ownerDocument.createRange();
                    aRange.setStart(a, 0), aRange.setEnd(a, 0), bRange.setStart(b, 0), bRange.setEnd(b, 0);
                    var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
                    return 0 === ret && (hasDuplicate = !0), ret
                }),
                function() {
                    var form = document.createElement("div"),
                        id = "script" + (new Date).getTime();
                    form.innerHTML = "<a name='" + id + "'/>";
                    var root = document.documentElement;
                    root.insertBefore(form, root.firstChild), document.getElementById(id) && (Expr.find.ID = function(match, context, isXML) {
                        if (void 0 !== context.getElementById && !isXML) {
                            var m = context.getElementById(match[1]);
                            return m ? m.id === match[1] || void 0 !== m.getAttributeNode && m.getAttributeNode("id").nodeValue === match[1] ? [m] : void 0 : []
                        }
                    }, Expr.filter.ID = function(elem, match) {
                        var node = void 0 !== elem.getAttributeNode && elem.getAttributeNode("id");
                        return 1 === elem.nodeType && node && node.nodeValue === match
                    }), root.removeChild(form), root = form = null
                }(), (div = document.createElement("div")).appendChild(document.createComment("")), 0 < div.getElementsByTagName("*").length && (Expr.find.TAG = function(match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if ("*" === match[1]) {
                        for (var tmp = [], i = 0; results[i]; i++) 1 === results[i].nodeType && tmp.push(results[i]);
                        results = tmp
                    }
                    return results
                }), div.innerHTML = "<a href='#'></a>", div.firstChild && void 0 !== div.firstChild.getAttribute && "#" !== div.firstChild.getAttribute("href") && (Expr.attrHandle.href = function(elem) {
                    return elem.getAttribute("href", 2)
                }), div = null, document.querySelectorAll && function() {
                    var oldSizzle = Sizzle,
                        div = document.createElement("div");
                    if (div.innerHTML = "<p class='TEST'></p>", !div.querySelectorAll || 0 !== div.querySelectorAll(".TEST").length) {
                        for (var prop in Sizzle = function(query, context, extra, seed) {
                                if (context = context || document, !seed && 9 === context.nodeType && !isXML(context)) try {
                                    return makeArray(context.querySelectorAll(query), extra)
                                } catch (e) {}
                                return oldSizzle(query, context, extra, seed)
                            }, oldSizzle) Sizzle[prop] = oldSizzle[prop];
                        div = null
                    }
                }(), document.getElementsByClassName && document.documentElement.getElementsByClassName && function() {
                    var div = document.createElement("div");
                    div.innerHTML = "<div class='test e'></div><div class='test'></div>", 0 !== div.getElementsByClassName("e").length && (div.lastChild.className = "e", 1 !== div.getElementsByClassName("e").length && (Expr.order.splice(1, 0, "CLASS"), Expr.find.CLASS = function(match, context, isXML) {
                        if (void 0 !== context.getElementsByClassName && !isXML) return context.getElementsByClassName(match[1])
                    }, div = null))
                }();
            var contains = document.compareDocumentPosition ? function(a, b) {
                    return 16 & a.compareDocumentPosition(b)
                } : function(a, b) {
                    return a !== b && (!a.contains || a.contains(b))
                },
                isXML = function(elem) {
                    return 9 === elem.nodeType && "HTML" !== elem.documentElement.nodeName || !!elem.ownerDocument && "HTML" !== elem.ownerDocument.documentElement.nodeName
                },
                posProcess = function(selector, context) {
                    for (var match, tmpSet = [], later = "", root = context.nodeType ? [context] : context; match = Expr.match.PSEUDO.exec(selector);) later += match[0], selector = selector.replace(Expr.match.PSEUDO, "");
                    selector = Expr.relative[selector] ? selector + "*" : selector;
                    for (var i = 0, l = root.length; i < l; i++) Sizzle(selector, root[i], tmpSet);
                    return Sizzle.filter(later, tmpSet)
                };
            window.Sizzle = Sizzle
        }(),
        function(engine) {
            var extendElements = Prototype.Selector.extendElements;
            Prototype.Selector.engine = engine, Prototype.Selector.select = function(selector, scope) {
                return extendElements(engine(selector, scope || document))
            }, Prototype.Selector.match = function(element, selector) {
                return 1 == engine.matches(selector, [element]).length
            }
        }(Sizzle), window.Sizzle = Prototype._original_property, delete Prototype._original_property;
    var Form = {
        reset: function(form) {
            return (form = $(form)).reset(), form
        },
        serializeElements: function(elements, options) {
            "object" != typeof options ? options = {
                hash: !!options
            } : Object.isUndefined(options.hash) && (options.hash = !0);
            var key, value, accumulator, initial, submitted = !1,
                submit = options.submit;
            return options.hash ? (initial = {}, accumulator = function(result, key, value) {
                return key in result ? (Object.isArray(result[key]) || (result[key] = [result[key]]), result[key].push(value)) : result[key] = value, result
            }) : (initial = "", accumulator = function(result, key, value) {
                return result + (result ? "&" : "") + encodeURIComponent(key) + "=" + encodeURIComponent(value)
            }), elements.inject(initial, function(result, element) {
                return !element.disabled && element.name && (key = element.name, null == (value = $(element).getValue()) || "file" == element.type || "submit" == element.type && (submitted || !1 === submit || submit && key != submit || !(submitted = !0)) || (result = accumulator(result, key, value))), result
            })
        }
    };
    Form.Methods = {
        serialize: function(form, options) {
            return Form.serializeElements(Form.getElements(form), options)
        },
        getElements: function(form) {
            for (var element, elements = $(form).getElementsByTagName("*"), arr = [], serializers = Form.Element.Serializers, i = 0; element = elements[i]; i++) arr.push(element);
            return arr.inject([], function(elements, child) {
                return serializers[child.tagName.toLowerCase()] && elements.push(Element.extend(child)), elements
            })
        },
        getInputs: function(form, typeName, name) {
            var inputs = (form = $(form)).getElementsByTagName("input");
            if (!typeName && !name) return $A(inputs).map(Element.extend);
            for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
                var input = inputs[i];
                typeName && input.type != typeName || name && input.name != name || matchingInputs.push(Element.extend(input))
            }
            return matchingInputs
        },
        disable: function(form) {
            return form = $(form), Form.getElements(form).invoke("disable"), form
        },
        enable: function(form) {
            return form = $(form), Form.getElements(form).invoke("enable"), form
        },
        findFirstElement: function(form) {
            var elements = $(form).getElements().findAll(function(element) {
                    return "hidden" != element.type && !element.disabled
                }),
                firstByIndex = elements.findAll(function(element) {
                    return element.hasAttribute("tabIndex") && 0 <= element.tabIndex
                }).sortBy(function(element) {
                    return element.tabIndex
                }).first();
            return firstByIndex || elements.find(function(element) {
                return /^(?:input|select|textarea)$/i.test(element.tagName)
            })
        },
        focusFirstElement: function(form) {
            var element = (form = $(form)).findFirstElement();
            return element && element.activate(), form
        },
        request: function(form, options) {
            form = $(form);
            var params = (options = Object.clone(options || {})).parameters,
                action = form.readAttribute("action") || "";
            return action.blank() && (action = window.location.href), options.parameters = form.serialize(!0), params && (Object.isString(params) && (params = params.toQueryParams()), Object.extend(options.parameters, params)), form.hasAttribute("method") && !options.method && (options.method = form.method), new Ajax.Request(action, options)
        }
    }, Form.Element = {
        focus: function(element) {
            return $(element).focus(), element
        },
        select: function(element) {
            return $(element).select(), element
        }
    }, Form.Element.Methods = {
        serialize: function(element) {
            if (!(element = $(element)).disabled && element.name) {
                var value = element.getValue();
                if (null != value) {
                    var pair = {};
                    return pair[element.name] = value, Object.toQueryString(pair)
                }
            }
            return ""
        },
        getValue: function(element) {
            var method = (element = $(element)).tagName.toLowerCase();
            return Form.Element.Serializers[method](element)
        },
        setValue: function(element, value) {
            var method = (element = $(element)).tagName.toLowerCase();
            return Form.Element.Serializers[method](element, value), element
        },
        clear: function(element) {
            return $(element).value = "", element
        },
        present: function(element) {
            return "" != $(element).value
        },
        activate: function(element) {
            element = $(element);
            try {
                element.focus(), !element.select || "input" == element.tagName.toLowerCase() && /^(?:button|reset|submit)$/i.test(element.type) || element.select()
            } catch (e) {}
            return element
        },
        disable: function(element) {
            return (element = $(element)).disabled = !0, element
        },
        enable: function(element) {
            return (element = $(element)).disabled = !1, element
        }
    };
    var Field = Form.Element,
        $F = Form.Element.Methods.getValue;
    Form.Element.Serializers = function() {
            function inputSelector(element, value) {
                if (Object.isUndefined(value)) return element.checked ? element.value : null;
                element.checked = !!value
            }

            function valueSelector(element, value) {
                if (Object.isUndefined(value)) return element.value;
                element.value = value
            }

            function selectOne(element) {
                var index = element.selectedIndex;
                return 0 <= index ? optionValue(element.options[index]) : null
            }

            function selectMany(element) {
                var length = element.length;
                if (!length) return null;
                for (var i = 0, values = []; i < length; i++) {
                    var opt = element.options[i];
                    opt.selected && values.push(optionValue(opt))
                }
                return values
            }

            function optionValue(opt) {
                return Element.hasAttribute(opt, "value") ? opt.value : opt.text
            }
            return {
                input: function(element, value) {
                    switch (element.type.toLowerCase()) {
                        case "checkbox":
                        case "radio":
                            return inputSelector(element, value);
                        default:
                            return valueSelector(element, value)
                    }
                },
                inputSelector: inputSelector,
                textarea: valueSelector,
                select: function(element, value) {
                    if (Object.isUndefined(value)) return ("select-one" === element.type ? selectOne : selectMany)(element);
                    for (var opt, currentValue, single = !Object.isArray(value), i = 0, length = element.length; i < length; i++)
                        if (opt = element.options[i], currentValue = this.optionValue(opt), single) {
                            if (currentValue == value) return void(opt.selected = !0)
                        } else opt.selected = value.include(currentValue)
                },
                selectOne: selectOne,
                selectMany: selectMany,
                optionValue: optionValue,
                button: valueSelector
            }
        }(), Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
            initialize: function($super, element, frequency, callback) {
                $super(callback, frequency), this.element = $(element), this.lastValue = this.getValue()
            },
            execute: function() {
                var value = this.getValue();
                (Object.isString(this.lastValue) && Object.isString(value) ? this.lastValue != value : String(this.lastValue) != String(value)) && (this.callback(this.element, value), this.lastValue = value)
            }
        }), Form.Element.Observer = Class.create(Abstract.TimedObserver, {
            getValue: function() {
                return Form.Element.getValue(this.element)
            }
        }), Form.Observer = Class.create(Abstract.TimedObserver, {
            getValue: function() {
                return Form.serialize(this.element)
            }
        }), Abstract.EventObserver = Class.create({
            initialize: function(element, callback) {
                this.element = $(element), this.callback = callback, this.lastValue = this.getValue(), "form" == this.element.tagName.toLowerCase() ? this.registerFormCallbacks() : this.registerCallback(this.element)
            },
            onElementEvent: function() {
                var value = this.getValue();
                this.lastValue != value && (this.callback(this.element, value), this.lastValue = value)
            },
            registerFormCallbacks: function() {
                Form.getElements(this.element).each(this.registerCallback, this)
            },
            registerCallback: function(element) {
                if (element.type) switch (element.type.toLowerCase()) {
                    case "checkbox":
                    case "radio":
                        Event.observe(element, "click", this.onElementEvent.bind(this));
                        break;
                    default:
                        Event.observe(element, "change", this.onElementEvent.bind(this))
                }
            }
        }), Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
            getValue: function() {
                return Form.Element.getValue(this.element)
            }
        }), Form.EventObserver = Class.create(Abstract.EventObserver, {
            getValue: function() {
                return Form.serialize(this.element)
            }
        }),
        function() {
            var _isButton, Event = {
                    KEY_BACKSPACE: 8,
                    KEY_TAB: 9,
                    KEY_RETURN: 13,
                    KEY_ESC: 27,
                    KEY_LEFT: 37,
                    KEY_UP: 38,
                    KEY_RIGHT: 39,
                    KEY_DOWN: 40,
                    KEY_DELETE: 46,
                    KEY_HOME: 36,
                    KEY_END: 35,
                    KEY_PAGEUP: 33,
                    KEY_PAGEDOWN: 34,
                    KEY_INSERT: 45,
                    cache: {}
                },
                docEl = document.documentElement,
                MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = "onmouseenter" in docEl && "onmouseleave" in docEl,
                isIELegacyEvent = function(event) {
                    return !1
                };

            function _isButtonForDOMEvents(event, code) {
                return event.which ? event.which === code + 1 : event.button === code
            }
            window.attachEvent && (isIELegacyEvent = window.addEventListener ? function(event) {
                return !(event instanceof window.Event)
            } : function(event) {
                return !0
            });
            var legacyButtonMap = {
                0: 1,
                1: 4,
                2: 2
            };

            function _isButtonForLegacyEvents(event, code) {
                return event.button === legacyButtonMap[code]
            }

            function pointerX(event) {
                var docElement = document.documentElement,
                    body = document.body || {
                        scrollLeft: 0
                    };
                return event.pageX || event.clientX + (docElement.scrollLeft || body.scrollLeft) - (docElement.clientLeft || 0)
            }

            function pointerY(event) {
                var docElement = document.documentElement,
                    body = document.body || {
                        scrollTop: 0
                    };
                return event.pageY || event.clientY + (docElement.scrollTop || body.scrollTop) - (docElement.clientTop || 0)
            }
            _isButton = window.attachEvent ? window.addEventListener ? function(event, code) {
                return isIELegacyEvent(event) ? _isButtonForLegacyEvents(event, code) : _isButtonForDOMEvents(event, code)
            } : _isButtonForLegacyEvents : Prototype.Browser.WebKit ? function(event, code) {
                switch (code) {
                    case 0:
                        return 1 == event.which && !event.metaKey;
                    case 1:
                        return 2 == event.which || 1 == event.which && event.metaKey;
                    case 2:
                        return 3 == event.which;
                    default:
                        return !1
                }
            } : _isButtonForDOMEvents, Event.Methods = {
                isLeftClick: function(event) {
                    return _isButton(event, 0)
                },
                isMiddleClick: function(event) {
                    return _isButton(event, 1)
                },
                isRightClick: function(event) {
                    return _isButton(event, 2)
                },
                element: function(event) {
                    var node = (event = Event.extend(event)).target,
                        type = event.type,
                        currentTarget = event.currentTarget;
                    return currentTarget && currentTarget.tagName && ("load" === type || "error" === type || "click" === type && "input" === currentTarget.tagName.toLowerCase() && "radio" === currentTarget.type) && (node = currentTarget), node.nodeType == Node.TEXT_NODE && (node = node.parentNode), Element.extend(node)
                },
                findElement: function(event, expression) {
                    var element = Event.element(event);
                    if (!expression) return element;
                    for (; element;) {
                        if (Object.isElement(element) && Prototype.Selector.match(element, expression)) return Element.extend(element);
                        element = element.parentNode
                    }
                },
                pointer: function(event) {
                    return {
                        x: pointerX(event),
                        y: pointerY(event)
                    }
                },
                pointerX: pointerX,
                pointerY: pointerY,
                stop: function(event) {
                    Event.extend(event), event.preventDefault(), event.stopPropagation(), event.stopped = !0
                }
            };
            var methods = Object.keys(Event.Methods).inject({}, function(m, name) {
                return m[name] = Event.Methods[name].methodize(), m
            });
            if (window.attachEvent) {
                var additionalMethods = {
                    stopPropagation: function() {
                        this.cancelBubble = !0
                    },
                    preventDefault: function() {
                        this.returnValue = !1
                    },
                    inspect: function() {
                        return "[object Event]"
                    }
                };
                Event.extend = function(event, element) {
                    if (!event) return !1;
                    if (!isIELegacyEvent(event)) return event;
                    if (event._extendedByPrototype) return event;
                    event._extendedByPrototype = Prototype.emptyFunction;
                    var pointer = Event.pointer(event);
                    return Object.extend(event, {
                        target: event.srcElement || element,
                        relatedTarget: function(event) {
                            var element;
                            switch (event.type) {
                                case "mouseover":
                                case "mouseenter":
                                    element = event.fromElement;
                                    break;
                                case "mouseout":
                                case "mouseleave":
                                    element = event.toElement;
                                    break;
                                default:
                                    return null
                            }
                            return Element.extend(element)
                        }(event),
                        pageX: pointer.x,
                        pageY: pointer.y
                    }), Object.extend(event, methods), Object.extend(event, additionalMethods), event
                }
            } else Event.extend = Prototype.K;
            window.addEventListener && (Event.prototype = window.Event.prototype || document.createEvent("HTMLEvents").__proto__, Object.extend(Event.prototype, methods));
            var CACHE = [];
            Prototype.Browser.IE && window.attachEvent("onunload", function() {
                for (var i = 0, length = CACHE.length; i < length; i++) Event.stopObserving(CACHE[i]), CACHE[i] = null
            }), Prototype.Browser.WebKit && window.addEventListener("unload", Prototype.emptyFunction, !1);
            var _getDOMEventName = Prototype.K,
                translations = {
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                };

            function observe(element, eventName, handler) {
                var responder = function(element, eventName, handler) {
                    var registry = Element.retrieve(element, "prototype_event_registry");
                    Object.isUndefined(registry) && (CACHE.push(element), registry = Element.retrieve(element, "prototype_event_registry", $H()));
                    var responder, respondersForEvent = registry.get(eventName);
                    return Object.isUndefined(respondersForEvent) && (respondersForEvent = [], registry.set(eventName, respondersForEvent)), !respondersForEvent.pluck("handler").include(handler) && (eventName.include(":") ? responder = function(event) {
                        return !Object.isUndefined(event.eventName) && event.eventName === eventName && (Event.extend(event, element), void handler.call(element, event))
                    } : MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED || "mouseenter" !== eventName && "mouseleave" !== eventName ? responder = function(event) {
                        Event.extend(event, element), handler.call(element, event)
                    } : "mouseenter" !== eventName && "mouseleave" !== eventName || (responder = function(event) {
                        Event.extend(event, element);
                        for (var parent = event.relatedTarget; parent && parent !== element;) try {
                            parent = parent.parentNode
                        } catch (e) {
                            parent = element
                        }
                        parent !== element && handler.call(element, event)
                    }), responder.handler = handler, respondersForEvent.push(responder), responder)
                }(element = $(element), eventName, handler);
                if (!responder) return element;
                if (eventName.include(":")) element.addEventListener ? element.addEventListener("dataavailable", responder, !1) : (element.attachEvent("ondataavailable", responder), element.attachEvent("onlosecapture", responder));
                else {
                    var actualEventName = _getDOMEventName(eventName);
                    element.addEventListener ? element.addEventListener(actualEventName, responder, !1) : element.attachEvent("on" + actualEventName, responder)
                }
                return element
            }

            function stopObserving(element, eventName, handler) {
                element = $(element);
                var registry = Element.retrieve(element, "prototype_event_registry");
                if (!registry) return element;
                if (!eventName) return registry.each(function(pair) {
                    var eventName = pair.key;
                    stopObserving(element, eventName)
                }), element;
                var responders = registry.get(eventName);
                if (!responders) return element;
                if (!handler) return responders.each(function(r) {
                    stopObserving(element, eventName, r.handler)
                }), element;
                for (var responder, i = responders.length; i--;)
                    if (responders[i].handler === handler) {
                        responder = responders[i];
                        break
                    }
                if (!responder) return element;
                if (eventName.include(":")) element.removeEventListener ? element.removeEventListener("dataavailable", responder, !1) : (element.detachEvent("ondataavailable", responder), element.detachEvent("onlosecapture", responder));
                else {
                    var actualEventName = _getDOMEventName(eventName);
                    element.removeEventListener ? element.removeEventListener(actualEventName, responder, !1) : element.detachEvent("on" + actualEventName, responder)
                }
                return registry.set(eventName, responders.without(responder)), element
            }

            function fire(element, eventName, memo, bubble) {
                var event;
                return element = $(element), Object.isUndefined(bubble) && (bubble = !0), element == document && document.createEvent && !element.dispatchEvent && (element = document.documentElement), document.createEvent ? (event = document.createEvent("HTMLEvents")).initEvent("dataavailable", bubble, !0) : (event = document.createEventObject()).eventType = bubble ? "ondataavailable" : "onlosecapture", event.eventName = eventName, event.memo = memo || {}, document.createEvent ? element.dispatchEvent(event) : element.fireEvent(event.eventType, event), Event.extend(event)
            }

            function on(element, eventName, selector, callback) {
                return element = $(element), Object.isFunction(selector) && Object.isUndefined(callback) && (callback = selector, selector = null), new Event.Handler(element, eventName, selector, callback).start()
            }
            MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED || (_getDOMEventName = function(eventName) {
                return translations[eventName] || eventName
            }), Event.Handler = Class.create({
                initialize: function(element, eventName, selector, callback) {
                    this.element = $(element), this.eventName = eventName, this.selector = selector, this.callback = callback, this.handler = this.handleEvent.bind(this)
                },
                start: function() {
                    return Event.observe(this.element, this.eventName, this.handler), this
                },
                stop: function() {
                    return Event.stopObserving(this.element, this.eventName, this.handler), this
                },
                handleEvent: function(event) {
                    var element = Event.findElement(event, this.selector);
                    element && this.callback.call(this.element, event, element)
                }
            }), Object.extend(Event, Event.Methods), Object.extend(Event, {
                fire: fire,
                observe: observe,
                stopObserving: stopObserving,
                on: on
            }), Element.addMethods({
                fire: fire,
                observe: observe,
                stopObserving: stopObserving,
                on: on
            }), Object.extend(document, {
                fire: fire.methodize(),
                observe: observe.methodize(),
                stopObserving: stopObserving.methodize(),
                on: on.methodize(),
                loaded: !1
            }), window.Event ? Object.extend(window.Event, Event) : window.Event = Event
        }(),
        function() {
            var timer;

            function fireContentLoadedEvent() {
                document.loaded || (timer && window.clearTimeout(timer), document.loaded = !0, document.fire("dom:loaded"))
            }
            document.addEventListener ? document.addEventListener("DOMContentLoaded", fireContentLoadedEvent, !1) : (document.observe("readystatechange", function checkReadyState() {
                "complete" === document.readyState && (document.stopObserving("readystatechange", checkReadyState), fireContentLoadedEvent())
            }), window == top && (timer = function pollDoScroll() {
                try {
                    document.documentElement.doScroll("left")
                } catch (e) {
                    return void(timer = pollDoScroll.defer())
                }
                fireContentLoadedEvent()
            }.defer())), Event.observe(window, "load", fireContentLoadedEvent)
        }(), Element.addMethods(), Hash.toQueryString = Object.toQueryString;
    var Toggle = {
        display: Element.toggle
    };
    Element.Methods.childOf = Element.Methods.descendantOf;
    var Insertion = {
            Before: function(element, content) {
                return Element.insert(element, {
                    before: content
                })
            },
            Top: function(element, content) {
                return Element.insert(element, {
                    top: content
                })
            },
            Bottom: function(element, content) {
                return Element.insert(element, {
                    bottom: content
                })
            },
            After: function(element, content) {
                return Element.insert(element, {
                    after: content
                })
            }
        },
        $continue = new Error('"throw $continue" is deprecated, use "return" instead'),
        Position = {
            includeScrollOffsets: !1,
            prepare: function() {
                this.deltaX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0, this.deltaY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            },
            within: function(element, x, y) {
                return this.includeScrollOffsets ? this.withinIncludingScrolloffsets(element, x, y) : (this.xcomp = x, this.ycomp = y, this.offset = Element.cumulativeOffset(element), y >= this.offset[1] && y < this.offset[1] + element.offsetHeight && x >= this.offset[0] && x < this.offset[0] + element.offsetWidth)
            },
            withinIncludingScrolloffsets: function(element, x, y) {
                var offsetcache = Element.cumulativeScrollOffset(element);
                return this.xcomp = x + offsetcache[0] - this.deltaX, this.ycomp = y + offsetcache[1] - this.deltaY, this.offset = Element.cumulativeOffset(element), this.ycomp >= this.offset[1] && this.ycomp < this.offset[1] + element.offsetHeight && this.xcomp >= this.offset[0] && this.xcomp < this.offset[0] + element.offsetWidth
            },
            overlap: function(mode, element) {
                return mode ? "vertical" == mode ? (this.offset[1] + element.offsetHeight - this.ycomp) / element.offsetHeight : "horizontal" == mode ? (this.offset[0] + element.offsetWidth - this.xcomp) / element.offsetWidth : void 0 : 0
            },
            cumulativeOffset: Element.Methods.cumulativeOffset,
            positionedOffset: Element.Methods.positionedOffset,
            absolutize: function(element) {
                return Position.prepare(), Element.absolutize(element)
            },
            relativize: function(element) {
                return Position.prepare(), Element.relativize(element)
            },
            realOffset: Element.Methods.cumulativeScrollOffset,
            offsetParent: Element.Methods.getOffsetParent,
            page: Element.Methods.viewportOffset,
            clone: function(source, target, options) {
                return options = options || {}, Element.clonePosition(target, source, options)
            }
        };
    document.getElementsByClassName || (document.getElementsByClassName = function(instanceMethods) {
        function iter(name) {
            return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]"
        }
        return Element.Methods.getElementsByClassName = Prototype.BrowserFeatures.XPath ? function(element, className) {
                className = className.toString().strip();
                var cond = /\s/.test(className) ? $w(className).map(iter).join("") : iter(className);
                return cond ? document._getElementsByXPath(".//*" + cond, element) : []
            } : function(element, className) {
                className = className.toString().strip();
                var elements = [],
                    classNames = /\s/.test(className) ? $w(className) : null;
                if (!classNames && !className) return elements;
                className = " " + className + " ";
                for (var child, cn, i = 0; child = $(element).getElementsByTagName("*")[i]; i++) child.className && (cn = " " + child.className + " ") && (cn.include(className) || classNames && classNames.all(function(name) {
                    return !name.toString().blank() && cn.include(" " + name + " ")
                })) && elements.push(Element.extend(child));
                return elements
            },
            function(className, parentElement) {
                return $(parentElement || document.body).getElementsByClassName(className)
            }
    }()), Element.ClassNames = Class.create(), Element.ClassNames.prototype = {
        initialize: function(element) {
            this.element = $(element)
        },
        _each: function(iterator) {
            this.element.className.split(/\s+/).select(function(name) {
                return 0 < name.length
            })._each(iterator)
        },
        set: function(className) {
            this.element.className = className
        },
        add: function(classNameToAdd) {
            this.include(classNameToAdd) || this.set($A(this).concat(classNameToAdd).join(" "))
        },
        remove: function(classNameToRemove) {
            this.include(classNameToRemove) && this.set($A(this).without(classNameToRemove).join(" "))
        },
        toString: function() {
            return $A(this).join(" ")
        }
    }, Object.extend(Element.ClassNames.prototype, Enumerable), window.Selector = Class.create({
        initialize: function(expression) {
            this.expression = expression.strip()
        },
        findElements: function(rootElement) {
            return Prototype.Selector.select(this.expression, rootElement)
        },
        match: function(element) {
            return Prototype.Selector.match(element, this.expression)
        },
        toString: function() {
            return this.expression
        },
        inspect: function() {
            return "#<Selector: " + this.expression + ">"
        }
    }), Object.extend(Selector, {
        matchElements: function(elements, expression) {
            for (var match = Prototype.Selector.match, results = [], i = 0, length = elements.length; i < length; i++) {
                var element = elements[i];
                match(element, expression) && results.push(Element.extend(element))
            }
            return results
        },
        findElement: function(elements, expression, index) {
            index = index || 0;
            for (var element, matchIndex = 0, i = 0, length = elements.length; i < length; i++)
                if (element = elements[i], Prototype.Selector.match(element, expression) && index === matchIndex++) return Element.extend(element)
        },
        findChildElements: function(element, expressions) {
            var selector = expressions.toArray().join(", ");
            return Prototype.Selector.select(selector, element || document)
        }
    });
    var Validator = Class.create();
    Validator.prototype = {
        initialize: function(className, error, test, options) {
            "function" == typeof test ? (this.options = $H(options), this._test = test) : (this.options = $H(test), this._test = function() {
                return !0
            }), this.error = error || "Validation failed.", this.className = className
        },
        test: function(v, elm) {
            return this._test(v, elm) && this.options.all(function(p) {
                return !Validator.methods[p.key] || Validator.methods[p.key](v, elm, p.value)
            })
        }
    }, Validator.methods = {
        pattern: function(v, elm, opt) {
            return Validation.get("IsEmpty").test(v) || opt.test(v)
        },
        minLength: function(v, elm, opt) {
            return v.length >= opt
        },
        maxLength: function(v, elm, opt) {
            return v.length <= opt
        },
        min: function(v, elm, opt) {
            return v >= parseFloat(opt)
        },
        max: function(v, elm, opt) {
            return v <= parseFloat(opt)
        },
        notOneOf: function(v, elm, opt) {
            return $A(opt).all(function(value) {
                return v != value
            })
        },
        oneOf: function(v, elm, opt) {
            return $A(opt).any(function(value) {
                return v == value
            })
        },
        is: function(v, elm, opt) {
            return v == opt
        },
        isNot: function(v, elm, opt) {
            return v != opt
        },
        equalToField: function(v, elm, opt) {
            return v == $F(opt)
        },
        notEqualToField: function(v, elm, opt) {
            return v != $F(opt)
        },
        include: function(v, elm, opt) {
            return $A(opt).all(function(value) {
                return Validation.get(value).test(v, elm)
            })
        }
    };
    var Validation = Class.create();

    function removeDelimiters(v) {
        return v = (v = v.replace(/\s/g, "")).replace(/\-/g, "")
    }

    function parseNumber(v) {
        if ("string" != typeof v) return parseFloat(v);
        var isDot = v.indexOf("."),
            isComa = v.indexOf(",");
        return -1 != isDot && -1 != isComa ? v = isDot < isComa ? v.replace(".", "").replace(",", ".") : v.replace(",", "") : -1 != isComa && (v = v.replace(",", ".")), parseFloat(v)
    }
    Validation.defaultOptions = {
        onSubmit: !0,
        stopOnFirst: !1,
        immediate: !1,
        focusOnError: !0,
        useTitles: !1,
        addClassNameToContainer: !1,
        containerClassName: ".input-box",
        onFormValidate: function(result, form) {},
        onElementValidate: function(result, elm) {}
    }, Validation.prototype = {
        initialize: function(form, options) {
            this.form = $(form), this.form && (this.options = Object.extend({
                onSubmit: Validation.defaultOptions.onSubmit,
                stopOnFirst: Validation.defaultOptions.stopOnFirst,
                immediate: Validation.defaultOptions.immediate,
                focusOnError: Validation.defaultOptions.focusOnError,
                useTitles: Validation.defaultOptions.useTitles,
                onFormValidate: Validation.defaultOptions.onFormValidate,
                onElementValidate: Validation.defaultOptions.onElementValidate
            }, options || {}), this.options.onSubmit && Event.observe(this.form, "submit", this.onSubmit.bind(this), !1), this.options.immediate && Form.getElements(this.form).each(function(input) {
                "select" == input.tagName.toLowerCase() && Event.observe(input, "blur", this.onChange.bindAsEventListener(this)), "radio" == input.type.toLowerCase() || "checkbox" == input.type.toLowerCase() ? Event.observe(input, "click", this.onChange.bindAsEventListener(this)) : Event.observe(input, "change", this.onChange.bindAsEventListener(this))
            }, this))
        },
        onChange: function(ev) {
            Validation.isOnChange = !0, Validation.validate(Event.element(ev), {
                useTitle: this.options.useTitles,
                onElementValidate: this.options.onElementValidate
            }), Validation.isOnChange = !1
        },
        onSubmit: function(ev) {
            this.validate() || Event.stop(ev)
        },
        validate: function() {
            var result = !1,
                useTitles = this.options.useTitles,
                callback = this.options.onElementValidate;
            try {
                result = this.options.stopOnFirst ? Form.getElements(this.form).all(function(elm) {
                    return !(!elm.hasClassName("local-validation") || this.isElementInForm(elm, this.form)) || Validation.validate(elm, {
                        useTitle: useTitles,
                        onElementValidate: callback
                    })
                }, this) : Form.getElements(this.form).collect(function(elm) {
                    return !(!elm.hasClassName("local-validation") || this.isElementInForm(elm, this.form)) || Validation.validate(elm, {
                        useTitle: useTitles,
                        onElementValidate: callback
                    })
                }, this).all()
            } catch (e) {}
            if (!result && this.options.focusOnError) try {
                Form.getElements(this.form).findAll(function(elm) {
                    return $(elm).hasClassName("validation-failed")
                }).first().focus()
            } catch (e) {}
            return this.options.onFormValidate(result, this.form), result
        },
        reset: function() {
            Form.getElements(this.form).each(Validation.reset)
        },
        isElementInForm: function(elm, form) {
            return elm.up("form") == form
        }
    }, Object.extend(Validation, {
        validate: function(elm, options) {
            options = Object.extend({
                useTitle: !1,
                onElementValidate: function(result, elm) {}
            }, options || {});
            var cn = $w((elm = $(elm)).className);
            return result = cn.all(function(value) {
                var test = Validation.test(value, elm, options.useTitle);
                return options.onElementValidate(test, elm), test
            })
        },
        insertAdvice: function(elm, advice) {
            var container = $(elm).up(".field-row");
            if (container) Element.insert(container, {
                after: advice
            });
            else if (elm.up("td.value")) elm.up("td.value").insert({
                bottom: advice
            });
            else if (elm.advaiceContainer && $(elm.advaiceContainer)) $(elm.advaiceContainer).update(advice);
            else switch (elm.type.toLowerCase()) {
                case "checkbox":
                case "radio":
                    var p = elm.parentNode;
                    p ? Element.insert(p, {
                        bottom: advice
                    }) : Element.insert(elm, {
                        after: advice
                    });
                    break;
                default:
                    Element.insert(elm, {
                        after: advice
                    })
            }
        },
        showAdvice: function(elm, advice, adviceName) {
            elm.advices ? elm.advices.each(function(pair) {
                advice && pair.value.id == advice.id || this.hideAdvice(elm, pair.value)
            }.bind(this)) : elm.advices = new Hash, elm.advices.set(adviceName, advice), "undefined" == typeof Effect ? advice.style.display = "block" : advice._adviceAbsolutize ? (Position.absolutize(advice), advice.show(), advice.setStyle({
                top: advice._adviceTop,
                left: advice._adviceLeft,
                width: advice._adviceWidth,
                "z-index": 1e3
            }), advice.addClassName("advice-absolute")) : new Effect.Appear(advice, {
                duration: 1
            })
        },
        hideAdvice: function(elm, advice) {
            null != advice && new Effect.Fade(advice, {
                duration: 1,
                afterFinishInternal: function() {
                    advice.hide()
                }
            })
        },
        updateCallback: function(elm, status) {
            void 0 !== elm.callbackFunction && eval(elm.callbackFunction + "('" + elm.id + "','" + status + "')")
        },
        ajaxError: function(elm, errorMsg) {
            var name = "validate-ajax",
                advice = Validation.getAdvice(name, elm);
            if (null == advice && (advice = this.createAdvice(name, elm, !1, errorMsg)), this.showAdvice(elm, advice, "validate-ajax"), this.updateCallback(elm, "failed"), elm.addClassName("validation-failed"), elm.addClassName("validate-ajax"), Validation.defaultOptions.addClassNameToContainer && "" != Validation.defaultOptions.containerClassName) {
                var container = elm.up(Validation.defaultOptions.containerClassName);
                container && this.allowContainerClassName(elm) && (container.removeClassName("validation-passed"), container.addClassName("validation-error"))
            }
        },
        allowContainerClassName: function(elm) {
            return "radio" != elm.type && "checkbox" != elm.type || elm.hasClassName("change-container-classname")
        },
        test: function(name, elm, useTitle) {
            var v = Validation.get(name),
                prop = "__advice" + name.camelize();
            try {
                if (Validation.isVisible(elm) && !v.test($F(elm), elm)) {
                    if (null == (advice = Validation.getAdvice(name, elm)) && (advice = this.createAdvice(name, elm, useTitle)), this.showAdvice(elm, advice, name), this.updateCallback(elm, "failed"), elm[prop] = 1, elm.advaiceContainer || (elm.removeClassName("validation-passed"), elm.addClassName("validation-failed")), Validation.defaultOptions.addClassNameToContainer && "" != Validation.defaultOptions.containerClassName)(container = elm.up(Validation.defaultOptions.containerClassName)) && this.allowContainerClassName(elm) && (container.removeClassName("validation-passed"), container.addClassName("validation-error"));
                    return !1
                }
                var container, advice = Validation.getAdvice(name, elm);
                return this.hideAdvice(elm, advice), this.updateCallback(elm, "passed"), elm[prop] = "", elm.removeClassName("validation-failed"), elm.addClassName("validation-passed"), Validation.defaultOptions.addClassNameToContainer && "" != Validation.defaultOptions.containerClassName && (container = elm.up(Validation.defaultOptions.containerClassName)) && !container.down(".validation-failed") && this.allowContainerClassName(elm) && (Validation.get("IsEmpty").test(elm.value) && this.isVisible(elm) ? container.removeClassName("validation-passed") : container.addClassName("validation-passed"), container.removeClassName("validation-error")), !0
            } catch (e) {
                throw e
            }
        },
        isVisible: function(elm) {
            for (;
                "BODY" != elm.tagName;) {
                if (!$(elm).visible()) return !1;
                elm = elm.parentNode
            }
            return !0
        },
        getAdvice: function(name, elm) {
            return $("advice-" + name + "-" + Validation.getElmID(elm)) || $("advice-" + Validation.getElmID(elm))
        },
        createAdvice: function(name, elm, useTitle, customError) {
            var v = Validation.get(name),
                errorMsg = useTitle && elm && elm.title ? elm.title : v.error;
            customError && (errorMsg = customError);
            try {
                Translator && (errorMsg = Translator.translate(errorMsg))
            } catch (e) {}
            if (advice = '<div class="validation-advice" id="advice-' + name + "-" + Validation.getElmID(elm) + '" style="display:none">' + errorMsg + "</div>", Validation.insertAdvice(elm, advice), advice = Validation.getAdvice(name, elm), $(elm).hasClassName("absolute-advice")) {
                var dimensions = $(elm).getDimensions(),
                    originalPosition = Position.cumulativeOffset(elm);
                advice._adviceTop = originalPosition[1] + dimensions.height + "px", advice._adviceLeft = originalPosition[0] + "px", advice._adviceWidth = dimensions.width + "px", advice._adviceAbsolutize = !0
            }
            return advice
        },
        getElmID: function(elm) {
            return elm.id ? elm.id : elm.name
        },
        reset: function(elm) {
            $w((elm = $(elm)).className).each(function(value) {
                var prop = "__advice" + value.camelize();
                if (elm[prop]) {
                    var advice = Validation.getAdvice(value, elm);
                    advice && advice.hide(), elm[prop] = ""
                }
                if (elm.removeClassName("validation-failed"), elm.removeClassName("validation-passed"), Validation.defaultOptions.addClassNameToContainer && "" != Validation.defaultOptions.containerClassName) {
                    var container = elm.up(Validation.defaultOptions.containerClassName);
                    container && (container.removeClassName("validation-passed"), container.removeClassName("validation-error"))
                }
            })
        },
        add: function(className, error, test, options) {
            var nv = {};
            nv[className] = new Validator(className, error, test, options), Object.extend(Validation.methods, nv)
        },
        addAllThese: function(validators) {
            var nv = {};
            $A(validators).each(function(value) {
                nv[value[0]] = new Validator(value[0], value[1], value[2], 3 < value.length ? value[3] : {})
            }), Object.extend(Validation.methods, nv)
        },
        get: function(name) {
            return Validation.methods[name] ? Validation.methods[name] : Validation.methods._LikeNoIDIEverSaw_
        },
        methods: {
            _LikeNoIDIEverSaw_: new Validator("_LikeNoIDIEverSaw_", "", {})
        }
    }), Validation.add("IsEmpty", "", function(v) {
        return "" == v || null == v || 0 == v.length || /^\s+$/.test(v)
    }), Validation.addAllThese([
        ["validate-no-html-tags", "HTML tags are not allowed", function(v) {
            return !/<(\/)?\w+/.test(v)
        }],
        ["validate-select", "Please select an option.", function(v) {
            return "none" != v && null != v && 0 != v.length
        }],
        ["required-entry", "This is a required field.", function(v) {
            return !Validation.get("IsEmpty").test(v)
        }],
        ["validate-number", "Please enter a valid number in this field.", function(v) {
            return Validation.get("IsEmpty").test(v) || !isNaN(parseNumber(v)) && /^\s*-?\d*(\.\d*)?\s*$/.test(v)
        }],
        ["validate-number-range", "The value is not within the specified range.", function(v, elm) {
            if (Validation.get("IsEmpty").test(v)) return !0;
            var numValue = parseNumber(v);
            if (isNaN(numValue)) return !1;
            var reRange = /^number-range-(-?[\d.,]+)?-(-?[\d.,]+)?$/,
                result = !0;
            return $w(elm.className).each(function(name) {
                var m = reRange.exec(name);
                m && (result = result && (null == m[1] || "" == m[1] || numValue >= parseNumber(m[1])) && (null == m[2] || "" == m[2] || numValue <= parseNumber(m[2])))
            }), result
        }],
        ["validate-digits", "Please use numbers only in this field. Please avoid spaces or other characters such as dots or commas.", function(v) {
            return Validation.get("IsEmpty").test(v) || !/[^\d]/.test(v)
        }],
        ["validate-digits-range", "The value is not within the specified range.", function(v, elm) {
            if (Validation.get("IsEmpty").test(v)) return !0;
            var numValue = parseNumber(v);
            if (isNaN(numValue)) return !1;
            var reRange = /^digits-range-(-?\d+)?-(-?\d+)?$/,
                result = !0;
            return $w(elm.className).each(function(name) {
                var m = reRange.exec(name);
                m && (result = result && (null == m[1] || "" == m[1] || numValue >= parseNumber(m[1])) && (null == m[2] || "" == m[2] || numValue <= parseNumber(m[2])))
            }), result
        }],
        ["validate-alpha", "Please use letters only (a-z or A-Z) in this field.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^[a-zA-Z]+$/.test(v)
        }],
        ["validate-code", "Please use only letters (a-z), numbers (0-9) or underscore(_) in this field, first character should be a letter.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^[a-z]+[a-z0-9_]+$/.test(v)
        }],
        ["validate-alphanum", "Please use only letters (a-z or A-Z) or numbers (0-9) only in this field. No spaces or other characters are allowed.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^[a-zA-Z0-9]+$/.test(v)
        }],
        ["validate-alphanum-with-spaces", "Please use only letters (a-z or A-Z), numbers (0-9) or spaces only in this field.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^[a-zA-Z0-9 ]+$/.test(v)
        }],
        ["validate-street", "Please use only letters (a-z or A-Z) or numbers (0-9) or spaces and # only in this field.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^[ \w]{3,}([A-Za-z]\.)?([ \w]*\#\d+)?(\r\n| )[ \w]{3,}/.test(v)
        }],
        ["validate-phoneStrict", "Please enter a valid phone number. For example (123) 456-7890 or 123-456-7890.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(v)
        }],
        ["validate-phoneLax", "Please enter a valid phone number. For example (123) 456-7890 or 123-456-7890.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^((\d[-. ]?)?((\(\d{3}\))|\d{3}))?[-. ]?\d{3}[-. ]?\d{4}$/.test(v)
        }],
        ["validate-fax", "Please enter a valid fax number. For example (123) 456-7890 or 123-456-7890.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(v)
        }],
        ["validate-date", "Please enter a valid date.", function(v) {
            var test = new Date(v);
            return Validation.get("IsEmpty").test(v) || !isNaN(test)
        }],
        ["validate-date-range", "The From Date value should be less than or equal to the To Date value.", function(v, elm) {
            var m = /\bdate-range-(\w+)-(\w+)\b/.exec(elm.className);
            if (!m || "to" == m[2] || Validation.get("IsEmpty").test(v)) return !0;
            var currentYear = (new Date).getFullYear() + "",
                normalizedTime = function(v) {
                    return (v = v.split(/[.\/]/))[2] && v[2].length < 4 && (v[2] = currentYear.substr(0, v[2].length) + v[2]), new Date(v.join("/")).getTime()
                },
                dependentElements = Element.select(elm.form, ".validate-date-range.date-range-" + m[1] + "-to");
            return !dependentElements.length || Validation.get("IsEmpty").test(dependentElements[0].value) || normalizedTime(v) <= normalizedTime(dependentElements[0].value)
        }],
        ["validate-email", "Please enter a valid email address. For example johndoe@domain.com.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i.test(v)
        }],
        ["validate-emailSender", "Please use only visible characters and spaces.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^[\S ]+$/.test(v)
        }],
        ["validate-password", "Please enter 6 or more characters. Leading or trailing spaces will be ignored.", function(v) {
            var pass = v.strip();
            return !(0 < pass.length && pass.length < 6)
        }],
        ["validate-admin-password", "Please enter 7 or more characters. Password should contain both numeric and alphabetic characters.", function(v) {
            var pass = v.strip();
            return 0 == pass.length || !(!/[a-z]/i.test(v) || !/[0-9]/.test(v)) && !(pass.length < 7)
        }],
        ["validate-cpassword", "Please make sure your passwords match.", function(v) {
            var conf = $("confirmation") ? $("confirmation") : $$(".validate-cpassword")[0],
                pass = !1;
            $("password") && (pass = $("password"));
            for (var passwordElements = $$(".validate-password"), i = 0; i < passwordElements.size(); i++) {
                var passwordElement = passwordElements[i];
                passwordElement.up("form").id == conf.up("form").id && (pass = passwordElement)
            }
            return $$(".validate-admin-password").size() && (pass = $$(".validate-admin-password")[0]), pass.value == conf.value
        }],
        ["validate-both-passwords", "Please make sure your passwords match.", function(v, input) {
            var dependentInput = $(input.form["password" == input.name ? "confirmation" : "password"]),
                isEqualValues = input.value == dependentInput.value;
            return isEqualValues && dependentInput.hasClassName("validation-failed") && Validation.test(this.className, dependentInput), "" == dependentInput.value || isEqualValues
        }],
        ["validate-url", "Please enter a valid URL. Protocol is required (http://, https:// or ftp://)", function(v) {
            return v = (v || "").replace(/^\s+/, "").replace(/\s+$/, ""), Validation.get("IsEmpty").test(v) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(v)
        }],
        ["validate-clean-url", "Please enter a valid URL. For example http://www.example.com or www.example.com", function(v) {
            return Validation.get("IsEmpty").test(v) || /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+.(com|org|net|dk|at|us|tv|info|uk|co.uk|biz|se)$)(:(\d+))?\/?/i.test(v) || /^(www)((\.[A-Z0-9][A-Z0-9_-]*)+.(com|org|net|dk|at|us|tv|info|uk|co.uk|biz|se)$)(:(\d+))?\/?/i.test(v)
        }],
        ["validate-identifier", 'Please enter a valid URL Key. For example "example-page", "example-page.html" or "anotherlevel/example-page".', function(v) {
            return Validation.get("IsEmpty").test(v) || /^[a-z0-9][a-z0-9_\/-]+(\.[a-z0-9_-]+)?$/.test(v)
        }],
        ["validate-xml-identifier", "Please enter a valid XML-identifier. For example something_1, block5, id-4.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^[A-Z][A-Z0-9_\/-]*$/i.test(v)
        }],
        ["validate-ssn", "Please enter a valid social security number. For example 123-45-6789.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^\d{3}-?\d{2}-?\d{4}$/.test(v)
        }],
        ["validate-zip", "Please enter a valid zip code. For example 90602 or 90602-1234.", function(v) {
            return Validation.get("IsEmpty").test(v) || /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(v)
        }],
        ["validate-zip-international", "Please enter a valid zip code.", function(v) {
            return !0
        }],
        ["validate-date-au", "Please use this date format: dd/mm/yyyy. For example 17/03/2006 for the 17th of March, 2006.", function(v) {
            if (Validation.get("IsEmpty").test(v)) return !0;
            var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            if (!regex.test(v)) return !1;
            var d = new Date(v.replace(regex, "$2/$1/$3"));
            return parseInt(RegExp.$2, 10) == 1 + d.getMonth() && parseInt(RegExp.$1, 10) == d.getDate() && parseInt(RegExp.$3, 10) == d.getFullYear()
        }],
        ["validate-currency-dollar", "Please enter a valid $ amount. For example $100.00.", function(v) {
            return Validation.get("IsEmpty").test(v) || /^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(v)
        }],
        ["validate-one-required", "Please select one of the above options.", function(v, elm) {
            return $A(elm.parentNode.getElementsByTagName("INPUT")).any(function(elm) {
                return $F(elm)
            })
        }],
        ["validate-one-required-by-name", "Please select one of the options.", function(v, elm) {
            for (var inputs = $$('input[name="' + elm.name.replace(/([\\"])/g, "\\$1") + '"]'), error = 1, i = 0; i < inputs.length; i++) "checkbox" != inputs[i].type && "radio" != inputs[i].type || 1 != inputs[i].checked || (error = 0), !Validation.isOnChange || "checkbox" != inputs[i].type && "radio" != inputs[i].type || Validation.reset(inputs[i]);
            return 0 == error
        }],
        ["validate-not-negative-number", "Please enter a number 0 or greater in this field.", function(v) {
            return !!Validation.get("IsEmpty").test(v) || (v = parseNumber(v), !isNaN(v) && 0 <= v)
        }],
        ["validate-zero-or-greater", "Please enter a number 0 or greater in this field.", function(v) {
            return Validation.get("validate-not-negative-number").test(v)
        }],
        ["validate-greater-than-zero", "Please enter a number greater than 0 in this field.", function(v) {
            return !!Validation.get("IsEmpty").test(v) || (v = parseNumber(v), !isNaN(v) && 0 < v)
        }],
        ["validate-state", "Please select State/Province.", function(v) {
            return 0 != v || "" == v
        }],
        ["validate-new-password", "Please enter 6 or more characters. Leading or trailing spaces will be ignored.", function(v) {
            return !!Validation.get("validate-password").test(v) && (!Validation.get("IsEmpty").test(v) || "" == v)
        }],
        ["validate-cc-number", "Please enter a valid credit card number.", function(v, elm) {
            var ccTypeContainer = $(elm.id.substr(0, elm.id.indexOf("_cc_number")) + "_cc_type");
            return ccTypeContainer && void 0 !== Validation.creditCartTypes.get(ccTypeContainer.value) && 0 == Validation.creditCartTypes.get(ccTypeContainer.value)[2] ? !(Validation.get("IsEmpty").test(v) || !Validation.get("validate-digits").test(v)) : validateCreditCard(v)
        }],
        ["validate-cc-type", "Credit card number does not match credit card type.", function(v, elm) {
            elm.value = removeDelimiters(elm.value), v = removeDelimiters(v);
            var ccTypeContainer = $(elm.id.substr(0, elm.id.indexOf("_cc_number")) + "_cc_type");
            if (!ccTypeContainer) return !0;
            var ccType = ccTypeContainer.value;
            if (void 0 === Validation.creditCartTypes.get(ccType)) return !1;
            if (0 == Validation.creditCartTypes.get(ccType)[0]) return !0;
            var validationFailure = !1;
            return Validation.creditCartTypes.each(function(pair) {
                if (pair.key == ccType) throw pair.value[0] && !v.match(pair.value[0]) && (validationFailure = !0), $break
            }), !validationFailure && (ccTypeContainer.hasClassName("validation-failed") && Validation.isOnChange && Validation.validate(ccTypeContainer), !0)
        }],
        ["validate-cc-type-select", "Card type does not match credit card number.", function(v, elm) {
            var ccNumberContainer = $(elm.id.substr(0, elm.id.indexOf("_cc_type")) + "_cc_number");
            return !(!Validation.isOnChange || !Validation.get("IsEmpty").test(ccNumberContainer.value)) || (Validation.get("validate-cc-type").test(ccNumberContainer.value, ccNumberContainer) && Validation.validate(ccNumberContainer), Validation.get("validate-cc-type").test(ccNumberContainer.value, ccNumberContainer))
        }],
        ["validate-cc-exp", "Incorrect credit card expiration date.", function(v, elm) {
            var ccExpMonth = v,
                ccExpYear = $(elm.id.substr(0, elm.id.indexOf("_expiration")) + "_expiration_yr").value,
                currentTime = new Date,
                currentMonth = currentTime.getMonth() + 1,
                currentYear = currentTime.getFullYear();
            return !(ccExpMonth < currentMonth && ccExpYear == currentYear)
        }],
        ["validate-cc-cvn", "Please enter a valid credit card verification number.", function(v, elm) {
            var ccTypeContainer = $(elm.id.substr(0, elm.id.indexOf("_cc_cid")) + "_cc_type");
            if (!ccTypeContainer) return !0;
            var ccType = ccTypeContainer.value;
            if (void 0 === Validation.creditCartTypes.get(ccType)) return !1;
            var re = Validation.creditCartTypes.get(ccType)[1];
            return !!v.match(re)
        }],
        ["validate-ajax", "", function(v, elm) {
            return !0
        }],
        ["validate-data", "Please use only letters (a-z or A-Z), numbers (0-9) or underscore(_) in this field, first character should be a letter.", function(v) {
            return "" == v || !v || /^[A-Za-z]+[A-Za-z0-9_]+$/.test(v)
        }],
        ["validate-css-length", "Please input a valid CSS-length. For example 100px or 77pt or 20em or .5ex or 50%.", function(v) {
            return "" == v || !v || /^[0-9\.]+(px|pt|em|ex|%)?$/.test(v) && !/\..*\./.test(v) && !/\.$/.test(v)
        }],
        ["validate-length", "Text length does not satisfy specified text range.", function(v, elm) {
            var reMax = new RegExp(/^maximum-length-[0-9]+$/),
                reMin = new RegExp(/^minimum-length-[0-9]+$/),
                result = !0;
            return $w(elm.className).each(function(name, index) {
                if (name.match(reMax) && result) {
                    var length = name.split("-")[2];
                    result = v.length <= length
                }
                if (name.match(reMin) && result && !Validation.get("IsEmpty").test(v)) {
                    length = name.split("-")[2];
                    result = v.length >= length
                }
            }), result
        }],
        ["validate-percents", "Please enter a number lower than 100.", {
            max: 100
        }],
        ["required-file", "Please select a file", function(v, elm) {
            var result = !Validation.get("IsEmpty").test(v);
            return !1 === result && (ovId = elm.id + "_value", $(ovId) && (result = !Validation.get("IsEmpty").test($(ovId).value))), result
        }],
        ["validate-cc-ukss", "Please enter issue number or start date for switch/solo card type.", function(v, elm) {
            var endposition;
            endposition = elm.id.match(/(.)+_cc_issue$/) ? elm.id.indexOf("_cc_issue") : elm.id.match(/(.)+_start_month$/) ? elm.id.indexOf("_start_month") : elm.id.indexOf("_start_year");
            var prefix = elm.id.substr(0, endposition),
                ccTypeContainer = $(prefix + "_cc_type");
            if (!ccTypeContainer) return !0;
            var ccType = ccTypeContainer.value;
            if (-1 == ["SS", "SM", "SO"].indexOf(ccType)) return !0;
            $(prefix + "_cc_issue").advaiceContainer = $(prefix + "_start_month").advaiceContainer = $(prefix + "_start_year").advaiceContainer = $(prefix + "_cc_type_ss_div").down("ul li.adv-container");
            var ccIssue = $(prefix + "_cc_issue").value,
                ccSMonth = $(prefix + "_start_month").value,
                ccSYear = $(prefix + "_start_year").value;
            return !!(ccSMonth && ccSYear || ccIssue)
        }]
    ]), Validation.creditCartTypes = $H({
        SO: [new RegExp("^(6334[5-9]([0-9]{11}|[0-9]{13,14}))|(6767([0-9]{12}|[0-9]{14,15}))$"), new RegExp("^([0-9]{3}|[0-9]{4})?$"), !0],
        VI: [new RegExp("^4[0-9]{12}([0-9]{3})?$"), new RegExp("^[0-9]{3}$"), !0],
        MC: [new RegExp("^5[1-5][0-9]{14}$"), new RegExp("^[0-9]{3}$"), !0],
        AE: [new RegExp("^3[47][0-9]{13}$"), new RegExp("^[0-9]{4}$"), !0],
        DI: [new RegExp("^(30[0-5][0-9]{13}|3095[0-9]{12}|35(2[8-9][0-9]{12}|[3-8][0-9]{13})|36[0-9]{12}|3[8-9][0-9]{14}|6011(0[0-9]{11}|[2-4][0-9]{11}|74[0-9]{10}|7[7-9][0-9]{10}|8[6-9][0-9]{10}|9[0-9]{11})|62(2(12[6-9][0-9]{10}|1[3-9][0-9]{11}|[2-8][0-9]{12}|9[0-1][0-9]{11}|92[0-5][0-9]{10})|[4-6][0-9]{13}|8[2-8][0-9]{12})|6(4[4-9][0-9]{13}|5[0-9]{14}))$"), new RegExp("^[0-9]{3}$"), !0],
        JCB: [new RegExp("^(30[0-5][0-9]{13}|3095[0-9]{12}|35(2[8-9][0-9]{12}|[3-8][0-9]{13})|36[0-9]{12}|3[8-9][0-9]{14}|6011(0[0-9]{11}|[2-4][0-9]{11}|74[0-9]{10}|7[7-9][0-9]{10}|8[6-9][0-9]{10}|9[0-9]{11})|62(2(12[6-9][0-9]{10}|1[3-9][0-9]{11}|[2-8][0-9]{12}|9[0-1][0-9]{11}|92[0-5][0-9]{10})|[4-6][0-9]{13}|8[2-8][0-9]{12})|6(4[4-9][0-9]{13}|5[0-9]{14}))$"), new RegExp("^[0-9]{3,4}$"), !0],
        DICL: [new RegExp("^(30[0-5][0-9]{13}|3095[0-9]{12}|35(2[8-9][0-9]{12}|[3-8][0-9]{13})|36[0-9]{12}|3[8-9][0-9]{14}|6011(0[0-9]{11}|[2-4][0-9]{11}|74[0-9]{10}|7[7-9][0-9]{10}|8[6-9][0-9]{10}|9[0-9]{11})|62(2(12[6-9][0-9]{10}|1[3-9][0-9]{11}|[2-8][0-9]{12}|9[0-1][0-9]{11}|92[0-5][0-9]{10})|[4-6][0-9]{13}|8[2-8][0-9]{12})|6(4[4-9][0-9]{13}|5[0-9]{14}))$"), new RegExp("^[0-9]{3}$"), !0],
        SM: [new RegExp("(^(5[0678])[0-9]{11,18}$)|(^(6[^05])[0-9]{11,18}$)|(^(601)[^1][0-9]{9,16}$)|(^(6011)[0-9]{9,11}$)|(^(6011)[0-9]{13,16}$)|(^(65)[0-9]{11,13}$)|(^(65)[0-9]{15,18}$)|(^(49030)[2-9]([0-9]{10}$|[0-9]{12,13}$))|(^(49033)[5-9]([0-9]{10}$|[0-9]{12,13}$))|(^(49110)[1-2]([0-9]{10}$|[0-9]{12,13}$))|(^(49117)[4-9]([0-9]{10}$|[0-9]{12,13}$))|(^(49118)[0-2]([0-9]{10}$|[0-9]{12,13}$))|(^(4936)([0-9]{12}$|[0-9]{14,15}$))"), new RegExp("^([0-9]{3}|[0-9]{4})?$"), !0],
        OT: [!1, new RegExp("^([0-9]{3}|[0-9]{4})?$"), !1]
    });
    var Translate = Class.create();
    if (Translate.prototype = {
            initialize: function(data) {
                this.data = $H(data)
            },
            translate: function() {
                var text = arguments[0];
                return this.data.get(text) ? this.data.get(text) : text
            },
            add: function() {
                1 < arguments.length ? this.data.set(arguments[0], arguments[1]) : "object" == typeof arguments[0] && $H(arguments[0]).each(function(pair) {
                    this.data.set(pair.key, pair.value)
                }.bind(this))
            }
        }, !window.Mage) var Mage = {};

    function popWin(url, win, para) {
        (win = window.open(url, win, para)).focus()
    }

    function setLocation(url) {
        window.location.href = url
    }

    function setPLocation(url, setFocus) {
        setFocus && window.opener.focus(), window.opener.location.href = url
    }

    function setLanguageCode(code, fromCode) {
        var dash, href = window.location.href,
            after = "";
        if ((dash = href.match(/\#(.*)$/)) && (href = href.replace(/\#(.*)$/, ""), after = dash[0]), href.match(/[?]/)) {
            var re = /([?&]store=)[a-z0-9_]*/;
            href.match(re) ? href = href.replace(re, "$1" + code) : href += "&store=" + code;
            re = /([?&]from_store=)[a-z0-9_]*/;
            href.match(re) && (href = href.replace(re, ""))
        } else href += "?store=" + code;
        void 0 !== fromCode && (href += "&from_store=" + fromCode), setLocation(href += after)
    }

    function decorateGeneric(elements, decorateParams) {
        var allSupportedParams = ["odd", "even", "first", "last"],
            _decorateParams = {},
            total = elements.length;
        if (total) {
            if (void 0 === decorateParams && (decorateParams = allSupportedParams), !decorateParams.length) return;
            for (var k in allSupportedParams) _decorateParams[allSupportedParams[k]] = !1;
            for (var k in decorateParams) _decorateParams[decorateParams[k]] = !0;
            _decorateParams.first && Element.addClassName(elements[0], "first"), _decorateParams.last && Element.addClassName(elements[total - 1], "last");
            for (var i = 0; i < total; i++)(i + 1) % 2 == 0 ? _decorateParams.even && Element.addClassName(elements[i], "even") : _decorateParams.odd && Element.addClassName(elements[i], "odd")
        }
    }

    function decorateTable(table, options) {
        if (table = $(table)) {
            var _options = {
                tbody: !1,
                "tbody tr": ["odd", "even", "first", "last"],
                "thead tr": ["first", "last"],
                "tfoot tr": ["first", "last"],
                "tr td": ["last"]
            };
            if (void 0 !== options)
                for (var k in options) _options[k] = options[k];
            if (_options.tbody && decorateGeneric(table.select("tbody"), _options.tbody), _options["tbody tr"] && decorateGeneric(table.select("tbody tr"), _options["tbody tr"]), _options["thead tr"] && decorateGeneric(table.select("thead tr"), _options["thead tr"]), _options["tfoot tr"] && decorateGeneric(table.select("tfoot tr"), _options["tfoot tr"]), _options["tr td"]) {
                var allRows = table.select("tr");
                if (allRows.length)
                    for (var i = 0; i < allRows.length; i++) decorateGeneric(allRows[i].getElementsByTagName("TD"), _options["tr td"])
            }
        }
    }

    function decorateList(list, nonRecursive) {
        if ($(list)) {
            if (void 0 === nonRecursive) var items = $(list).select("li");
            else items = $(list).childElements();
            decorateGeneric(items, ["odd", "even", "last"])
        }
    }

    function decorateDataList(list) {
        (list = $(list)) && (decorateGeneric(list.select("dt"), ["odd", "even", "last"]), decorateGeneric(list.select("dd"), ["odd", "even", "last"]))
    }

    function parseSidUrl(baseUrl, urlExt) {
        var sidPos = baseUrl.indexOf("/?SID="),
            sid = "";
        return urlExt = null != urlExt ? urlExt : "", -1 < sidPos && (sid = "?" + baseUrl.substring(sidPos + 2), baseUrl = baseUrl.substring(0, sidPos + 1)), baseUrl + urlExt + sid
    }

    function formatCurrency(price, format, showPlus) {
        var precision = isNaN(format.precision = Math.abs(format.precision)) || format.precision;
        precision = isNaN(format.requiredPrecision = Math.abs(format.requiredPrecision)) ? 2 : format.requiredPrecision;
        var integerRequired = isNaN(format.integerRequired = Math.abs(format.integerRequired)) ? 1 : format.integerRequired,
            decimalSymbol = null == format.decimalSymbol ? "," : format.decimalSymbol,
            groupSymbol = null == format.groupSymbol ? "." : format.groupSymbol,
            groupLength = null == format.groupLength ? 3 : format.groupLength,
            s = "";
        null == showPlus || 1 == showPlus ? s = price < 0 ? "-" : showPlus ? "+" : "" : 0 == showPlus && (s = "");
        for (var i = parseInt(price = Math.abs(+price || 0).toFixed(precision)) + "", pad = i.length < integerRequired ? integerRequired - i.length : 0; pad;) i = "0" + i, pad--;
        j = (j = i.length) > groupLength ? j % groupLength : 0, re = new RegExp("(\\d{" + groupLength + "})(?=\\d)", "g");
        var r = (j ? i.substr(0, j) + groupSymbol : "") + i.substr(j).replace(re, "$1" + groupSymbol) + (precision ? decimalSymbol + Math.abs(price - i).toFixed(precision).replace(/-/, 0).slice(2) : "");
        return (-1 == format.pattern.indexOf("{sign}") ? s + format.pattern : format.pattern.replace("{sign}", s)).replace("%s", r).replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    }

    function expandDetails(el, childClass) {
        Element.hasClassName(el, "show-details") ? ($$(childClass).each(function(item) {
            item.hide()
        }), Element.removeClassName(el, "show-details")) : ($$(childClass).each(function(item) {
            item.show()
        }), Element.addClassName(el, "show-details"))
    }
    Mage.Cookies = {}, Mage.Cookies.expires = null, Mage.Cookies.path = "/", Mage.Cookies.domain = null, Mage.Cookies.secure = !1, Mage.Cookies.set = function(name, value) {
        var argv = arguments,
            argc = arguments.length,
            expires = 2 < argc ? argv[2] : Mage.Cookies.expires,
            path = 3 < argc ? argv[3] : Mage.Cookies.path,
            domain = 4 < argc ? argv[4] : Mage.Cookies.domain,
            secure = 5 < argc ? argv[5] : Mage.Cookies.secure;
        document.cookie = name + "=" + escape(value) + (null == expires ? "" : "; expires=" + expires.toGMTString()) + (null == path ? "" : "; path=" + path) + (null == domain ? "" : "; domain=" + domain) + (1 == secure ? "; secure" : "")
    }, Mage.Cookies.get = function(name) {
        for (var arg = name + "=", alen = arg.length, clen = document.cookie.length, i = 0, j = 0; i < clen;) {
            if (j = i + alen, document.cookie.substring(i, j) == arg) return Mage.Cookies.getCookieVal(j);
            if (0 == (i = document.cookie.indexOf(" ", i) + 1)) break
        }
        return null
    }, Mage.Cookies.clear = function(name) {
        Mage.Cookies.get(name) && (document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT")
    }, Mage.Cookies.getCookieVal = function(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        return -1 == endstr && (endstr = document.cookie.length), unescape(document.cookie.substring(offset, endstr))
    };
    var isIE = "MSIE" == navigator.appVersion.match(/MSIE/);
    if (!window.Varien) var Varien = new Object;

    function truncateOptions() {
        $$(".truncated").each(function(element) {
            Event.observe(element, "mouseover", function() {
                element.down("div.truncated_full_value") && element.down("div.truncated_full_value").addClassName("show")
            }), Event.observe(element, "mouseout", function() {
                element.down("div.truncated_full_value") && element.down("div.truncated_full_value").removeClassName("show")
            })
        })
    }

    function fireEvent(element, event) {
        if (document.createEvent) return (evt = document.createEvent("HTMLEvents")).initEvent(event, !0, !0), element.dispatchEvent(evt);
        var evt = document.createEventObject();
        return element.fireEvent("on" + event, evt)
    }

    function modulo(dividend, divisor) {
        var epsilon = divisor / 1e4,
            remainder = dividend % divisor;
        return (Math.abs(remainder - divisor) < epsilon || Math.abs(remainder) < epsilon) && (remainder = 0), remainder
    }
    Varien.showLoading = function() {
            var loader = $("loading-process");
            loader && loader.show()
        }, Varien.hideLoading = function() {
            var loader = $("loading-process");
            loader && loader.hide()
        }, Varien.GlobalHandlers = {
            onCreate: function() {
                Varien.showLoading()
            },
            onComplete: function() {
                0 == Ajax.activeRequestCount && Varien.hideLoading()
            }
        }, Ajax.Responders.register(Varien.GlobalHandlers), Varien.searchForm = Class.create(), Varien.searchForm.prototype = {
            initialize: function(form, field, emptyText) {
                this.form = $(form), this.field = $(field), this.emptyText = emptyText, Event.observe(this.form, "submit", this.submit.bind(this)), Event.observe(this.field, "focus", this.focus.bind(this)), Event.observe(this.field, "blur", this.blur.bind(this)), this.blur()
            },
            submit: function(event) {
                return this.field.value != this.emptyText && "" != this.field.value || (Event.stop(event), !1)
            },
            focus: function(event) {
                this.field.value == this.emptyText && (this.field.value = "")
            },
            blur: function(event) {
                "" == this.field.value && (this.field.value = this.emptyText)
            },
            initAutocomplete: function(url, destinationElement) {
                new Ajax.Autocompleter(this.field, destinationElement, url, {
                    paramName: this.field.name,
                    method: "get",
                    minChars: 2,
                    updateElement: this._selectAutocompleteItem.bind(this),
                    onShow: function(element, update) {
                        update.style.position && "absolute" != update.style.position || (update.style.position = "absolute", Position.clone(element, update, {
                            setHeight: !1,
                            offsetTop: element.offsetHeight
                        })), Effect.Appear(update, {
                            duration: 0
                        })
                    }
                })
            },
            _selectAutocompleteItem: function(element) {
                element.title && (this.field.value = element.title), this.form.submit()
            }
        }, Varien.Tabs = Class.create(), Varien.Tabs.prototype = {
            initialize: function(selector) {
                $$(selector + " a").each(this.initTab.bind(this))
            },
            initTab: function(el) {
                el.href = "javascript:void(0)", $(el.parentNode).hasClassName("active") && this.showContent(el), el.observe("click", this.showContent.bind(this, el))
            },
            showContent: function(a) {
                var li = $(a.parentNode);
                $(li.parentNode).getElementsBySelector("li", "ol").each(function(el) {
                    var contents = $(el.id + "_contents");
                    el == li ? (el.addClassName("active"), contents.show()) : (el.removeClassName("active"), contents.hide())
                })
            }
        }, Varien.DateElement = Class.create(), Varien.DateElement.prototype = {
            initialize: function(type, content, required, format) {
                if ("id" == type) this.day = $(content + "day"), this.month = $(content + "month"), this.year = $(content + "year"), this.full = $(content + "full"), this.advice = $(content + "date-advice");
                else {
                    if ("container" != type) return;
                    this.day = content.day, this.month = content.month, this.year = content.year, this.full = content.full, this.advice = content.advice
                }
                this.required = required, this.format = format, this.day.addClassName("validate-custom"), this.day.validate = this.validate.bind(this), this.month.addClassName("validate-custom"), this.month.validate = this.validate.bind(this), this.year.addClassName("validate-custom"), this.year.validate = this.validate.bind(this), this.setDateRange(!1, !1), this.year.setAttribute("autocomplete", "off"), this.advice.hide()
            },
            validate: function() {
                var error = !1,
                    day = parseInt(this.day.value, 10) || 0,
                    month = parseInt(this.month.value, 10) || 0,
                    year = parseInt(this.year.value, 10) || 0;
                if (this.day.value.strip().empty() && this.month.value.strip().empty() && this.year.value.strip().empty()) this.required ? error = "This date is a required value." : this.full.value = "";
                else if (day && month && year) {
                    var date = new Date,
                        countDaysInMonth = 0;
                    if (date.setYear(year), date.setMonth(month - 1), date.setDate(32), (!(countDaysInMonth = 32 - date.getDate()) || 31 < countDaysInMonth) && (countDaysInMonth = 31), day < 1 || countDaysInMonth < day) "day", error = "Please enter a valid day (1-%d).";
                    else if (month < 1 || 12 < month) "month", error = "Please enter a valid month (1-12).";
                    else {
                        day % 10 == day && (this.day.value = "0" + day), month % 10 == month && (this.month.value = "0" + month), this.full.value = this.format.replace(/%[mb]/i, this.month.value).replace(/%[de]/i, this.day.value).replace(/%y/i, this.year.value);
                        var testFull = this.month.value + "/" + this.day.value + "/" + this.year.value,
                            test = new Date(testFull);
                        isNaN(test) ? error = "Please enter a valid date." : this.setFullDate(test)
                    }
                    var valueError = !1;
                    error || this.validateData() || (this.validateDataErrorType, error = valueError = this.validateDataErrorText)
                } else error = "Please enter a valid full date.";
                if (!1 !== error) {
                    try {
                        error = Translator.translate(error)
                    } catch (e) {}
                    return this.advice.innerHTML = valueError ? this.errorTextModifier(error) : error.replace("%d", countDaysInMonth), this.advice.show(), !1
                }
                return this.day.removeClassName("validation-failed"), this.month.removeClassName("validation-failed"), this.year.removeClassName("validation-failed"), this.advice.hide(), !0
            },
            validateData: function() {
                var year = this.fullDate.getFullYear(),
                    date = new Date;
                return this.curyear = date.getFullYear(), 1900 <= year && year <= this.curyear
            },
            validateDataErrorType: "year",
            validateDataErrorText: "Please enter a valid year (1900-%d).",
            errorTextModifier: function(text) {
                return text.replace("%d", this.curyear)
            },
            setDateRange: function(minDate, maxDate) {
                this.minDate = minDate, this.maxDate = maxDate
            },
            setFullDate: function(date) {
                this.fullDate = date
            }
        }, Varien.DOB = Class.create(), Varien.DOB.prototype = {
            initialize: function(selector, required, format) {
                var el = $$(selector)[0],
                    container = {};
                container.day = Element.select(el, ".dob-day input")[0], container.month = Element.select(el, ".dob-month input")[0], container.year = Element.select(el, ".dob-year input")[0], container.full = Element.select(el, ".dob-full input")[0], container.advice = Element.select(el, ".validation-advice")[0], new Varien.DateElement("container", container, required, format)
            }
        }, Varien.dateRangeDate = Class.create(), Varien.dateRangeDate.prototype = Object.extend(new Varien.DateElement, {
            validateData: function() {
                var validate = !0;
                return (this.minDate || this.maxValue) && (this.minDate && (this.minDate = new Date(this.minDate), this.minDate.setHours(0), isNaN(this.minDate) && (this.minDate = new Date("1/1/1900")), validate = validate && this.fullDate >= this.minDate), this.maxDate && (this.maxDate = new Date(this.maxDate), this.minDate.setHours(0), isNaN(this.maxDate) && (this.maxDate = new Date), validate = validate && this.fullDate <= this.maxDate), this.maxDate && this.minDate ? this.validateDataErrorText = "Please enter a valid date between %s and %s" : this.maxDate ? this.validateDataErrorText = "Please enter a valid date less than or equal to %s" : this.minDate ? this.validateDataErrorText = "Please enter a valid date equal to or greater than %s" : this.validateDataErrorText = ""), validate
            },
            validateDataErrorText: "Date should be between %s and %s",
            errorTextModifier: function(text) {
                return this.minDate && (text = text.sub("%s", this.dateFormat(this.minDate))), this.maxDate && (text = text.sub("%s", this.dateFormat(this.maxDate))), text
            },
            dateFormat: function(date) {
                return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
            }
        }), Varien.FileElement = Class.create(), Varien.FileElement.prototype = {
            initialize: function(id) {
                this.fileElement = $(id), this.hiddenElement = $(id + "_value"), this.fileElement.observe("change", this.selectFile.bind(this))
            },
            selectFile: function(event) {
                this.hiddenElement.value = this.fileElement.getValue()
            }
        }, Validation.addAllThese([
            ["validate-custom", " ", function(v, elm) {
                return elm.validate()
            }]
        ]), Event.observe(window, "load", function() {
            truncateOptions()
        }), Element.addMethods({
            getInnerText: function(element) {
                return (element = $(element)).innerText && !Prototype.Browser.Opera ? element.innerText : element.innerHTML.stripScripts().unescapeHTML().replace(/[\n\r\s]+/g, " ").strip()
            }
        }), "undefined" == typeof Range || Range.prototype.createContextualFragment || (Range.prototype.createContextualFragment = function(html) {
            var frag = document.createDocumentFragment(),
                div = document.createElement("div");
            return frag.appendChild(div), div.outerHTML = html, frag
        }),
        function(a, b) {
            "use strict";
            "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
                if (!a.document) throw new Error("jQuery requires a window with a document");
                return b(a)
            } : b(a)
        }("undefined" != typeof window ? window : this, function(a, b) {
            "use strict";
            var c = [],
                d = a.document,
                e = Object.getPrototypeOf,
                f = c.slice,
                g = c.concat,
                h = c.push,
                i = c.indexOf,
                j = {},
                k = j.toString,
                l = j.hasOwnProperty,
                m = l.toString,
                n = m.call(Object),
                o = {};

            function p(a, b) {
                var c = (b = b || d).createElement("script");
                c.text = a, b.head.appendChild(c).parentNode.removeChild(c)
            }
            var q = "3.2.1",
                r = function(a, b) {
                    return new r.fn.init(a, b)
                },
                s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                t = /^-ms-/,
                u = /-([a-z])/g,
                v = function(a, b) {
                    return b.toUpperCase()
                };

            function w(a) {
                var b = !!a && "length" in a && a.length,
                    c = r.type(a);
                return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && 0 < b && b - 1 in a)
            }
            r.fn = r.prototype = {
                jquery: q,
                constructor: r,
                length: 0,
                toArray: function() {
                    return f.call(this)
                },
                get: function(a) {
                    return null == a ? f.call(this) : a < 0 ? this[a + this.length] : this[a]
                },
                pushStack: function(a) {
                    var b = r.merge(this.constructor(), a);
                    return b.prevObject = this, b
                },
                each: function(a) {
                    return r.each(this, a)
                },
                map: function(a) {
                    return this.pushStack(r.map(this, function(b, c) {
                        return a.call(b, c, b)
                    }))
                },
                slice: function() {
                    return this.pushStack(f.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(a) {
                    var b = this.length,
                        c = +a + (a < 0 ? b : 0);
                    return this.pushStack(0 <= c && c < b ? [this[c]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: h,
                sort: c.sort,
                splice: c.splice
            }, r.extend = r.fn.extend = function() {
                var a, b, c, d, e, f, g = arguments[0] || {},
                    h = 1,
                    i = arguments.length,
                    j = !1;
                for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++)
                    if (null != (a = arguments[h]))
                        for (b in a) c = g[b], g !== (d = a[b]) && (j && d && (r.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d));
                return g
            }, r.extend({
                expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(a) {
                    throw new Error(a)
                },
                noop: function() {},
                isFunction: function(a) {
                    return "function" === r.type(a)
                },
                isWindow: function(a) {
                    return null != a && a === a.window
                },
                isNumeric: function(a) {
                    var b = r.type(a);
                    return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a))
                },
                isPlainObject: function(a) {
                    var b, c;
                    return !(!a || "[object Object]" !== k.call(a) || (b = e(a)) && ("function" != typeof(c = l.call(b, "constructor") && b.constructor) || m.call(c) !== n))
                },
                isEmptyObject: function(a) {
                    var b;
                    for (b in a) return !1;
                    return !0
                },
                type: function(a) {
                    return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? j[k.call(a)] || "object" : typeof a
                },
                globalEval: function(a) {
                    p(a)
                },
                camelCase: function(a) {
                    return a.replace(t, "ms-").replace(u, v)
                },
                each: function(a, b) {
                    var c, d = 0;
                    if (w(a))
                        for (c = a.length; d < c && !1 !== b.call(a[d], d, a[d]); d++);
                    else
                        for (d in a)
                            if (!1 === b.call(a[d], d, a[d])) break; return a
                },
                trim: function(a) {
                    return null == a ? "" : (a + "").replace(s, "")
                },
                makeArray: function(a, b) {
                    var c = b || [];
                    return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c
                },
                inArray: function(a, b, c) {
                    return null == b ? -1 : i.call(b, a, c)
                },
                merge: function(a, b) {
                    for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
                    return a.length = e, a
                },
                grep: function(a, b, c) {
                    for (var e = [], f = 0, g = a.length, h = !c; f < g; f++) !b(a[f], f) !== h && e.push(a[f]);
                    return e
                },
                map: function(a, b, c) {
                    var d, e, f = 0,
                        h = [];
                    if (w(a))
                        for (d = a.length; f < d; f++) null != (e = b(a[f], f, c)) && h.push(e);
                    else
                        for (f in a) null != (e = b(a[f], f, c)) && h.push(e);
                    return g.apply([], h)
                },
                guid: 1,
                proxy: function(a, b) {
                    var c, d, e;
                    if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), (e = function() {
                        return a.apply(b || this, d.concat(f.call(arguments)))
                    }).guid = a.guid = a.guid || r.guid++, e
                },
                now: Date.now,
                support: o
            }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
                j["[object " + b + "]"] = b.toLowerCase()
            });
            var x = function(a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
                    v = a.document,
                    w = 0,
                    x = 0,
                    y = ha(),
                    z = ha(),
                    A = ha(),
                    B = function(a, b) {
                        return a === b && (l = !0), 0
                    },
                    C = {}.hasOwnProperty,
                    D = [],
                    E = D.pop,
                    F = D.push,
                    G = D.push,
                    H = D.slice,
                    I = function(a, b) {
                        for (var c = 0, d = a.length; c < d; c++)
                            if (a[c] === b) return c;
                        return -1
                    },
                    J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    K = "[\\x20\\t\\r\\n\\f]",
                    L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                    M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]",
                    N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
                    O = new RegExp(K + "+", "g"),
                    P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
                    Q = new RegExp("^" + K + "*," + K + "*"),
                    R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
                    S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
                    T = new RegExp(N),
                    U = new RegExp("^" + L + "$"),
                    V = {
                        ID: new RegExp("^#(" + L + ")"),
                        CLASS: new RegExp("^\\.(" + L + ")"),
                        TAG: new RegExp("^(" + L + "|[*])"),
                        ATTR: new RegExp("^" + M),
                        PSEUDO: new RegExp("^" + N),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + J + ")$", "i"),
                        needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i")
                    },
                    W = /^(?:input|select|textarea|button)$/i,
                    X = /^h\d$/i,
                    Y = /^[^{]+\{\s*\[native \w/,
                    Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    $ = /[+~]/,
                    _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"),
                    aa = function(a, b, c) {
                        var d = "0x" + b - 65536;
                        return d != d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                    },
                    ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                    ca = function(a, b) {
                        return b ? "\0" === a ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
                    },
                    da = function() {
                        m()
                    },
                    ea = ta(function(a) {
                        return !0 === a.disabled && ("form" in a || "label" in a)
                    }, {
                        dir: "parentNode",
                        next: "legend"
                    });
                try {
                    G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType
                } catch (fa) {
                    G = {
                        apply: D.length ? function(a, b) {
                            F.apply(a, H.call(b))
                        } : function(a, b) {
                            for (var c = a.length, d = 0; a[c++] = b[d++];);
                            a.length = c - 1
                        }
                    }
                }

                function ga(a, b, d, e) {
                    var f, h, j, k, l, o, r, s = b && b.ownerDocument,
                        w = b ? b.nodeType : 9;
                    if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d;
                    if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
                        if (11 !== w && (l = Z.exec(a)))
                            if (f = l[1]) {
                                if (9 === w) {
                                    if (!(j = b.getElementById(f))) return d;
                                    if (j.id === f) return d.push(j), d
                                } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d
                            } else {
                                if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d;
                                if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d
                            }
                        if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                            if (1 !== w) s = b, r = a;
                            else if ("object" !== b.nodeName.toLowerCase()) {
                                for ((k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), h = (o = g(a)).length; h--;) o[h] = "#" + k + " " + sa(o[h]);
                                r = o.join(","), s = $.test(a) && qa(b.parentNode) || b
                            }
                            if (r) try {
                                return G.apply(d, s.querySelectorAll(r)), d
                            } catch (x) {} finally {
                                k === u && b.removeAttribute("id")
                            }
                        }
                    }
                    return i(a.replace(P, "$1"), b, d, e)
                }

                function ha() {
                    var a = [];
                    return function b(c, e) {
                        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
                    }
                }

                function ia(a) {
                    return a[u] = !0, a
                }

                function ja(a) {
                    var b = n.createElement("fieldset");
                    try {
                        return !!a(b)
                    } catch (c) {
                        return !1
                    } finally {
                        b.parentNode && b.parentNode.removeChild(b), b = null
                    }
                }

                function ka(a, b) {
                    for (var c = a.split("|"), e = c.length; e--;) d.attrHandle[c[e]] = b
                }

                function la(a, b) {
                    var c = b && a,
                        d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
                    if (d) return d;
                    if (c)
                        for (; c = c.nextSibling;)
                            if (c === b) return -1;
                    return a ? 1 : -1
                }

                function ma(a) {
                    return function(b) {
                        return "input" === b.nodeName.toLowerCase() && b.type === a
                    }
                }

                function na(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return ("input" === c || "button" === c) && b.type === a
                    }
                }

                function oa(a) {
                    return function(b) {
                        return "form" in b ? b.parentNode && !1 === b.disabled ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ea(b) === a : b.disabled === a : "label" in b && b.disabled === a
                    }
                }

                function pa(a) {
                    return ia(function(b) {
                        return b = +b, ia(function(c, d) {
                            for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                        })
                    })
                }

                function qa(a) {
                    return a && void 0 !== a.getElementsByTagName && a
                }
                for (b in c = ga.support = {}, f = ga.isXML = function(a) {
                        var b = a && (a.ownerDocument || a).documentElement;
                        return !!b && "HTML" !== b.nodeName
                    }, m = ga.setDocument = function(a) {
                        var b, e, g = a ? a.ownerDocument || a : v;
                        return g !== n && 9 === g.nodeType && g.documentElement && (o = (n = g).documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function(a) {
                            return a.className = "i", !a.getAttribute("className")
                        }), c.getElementsByTagName = ja(function(a) {
                            return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length
                        }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function(a) {
                            return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length
                        }), c.getById ? (d.filter.ID = function(a) {
                            var b = a.replace(_, aa);
                            return function(a) {
                                return a.getAttribute("id") === b
                            }
                        }, d.find.ID = function(a, b) {
                            if (void 0 !== b.getElementById && p) {
                                var c = b.getElementById(a);
                                return c ? [c] : []
                            }
                        }) : (d.filter.ID = function(a) {
                            var b = a.replace(_, aa);
                            return function(a) {
                                var c = void 0 !== a.getAttributeNode && a.getAttributeNode("id");
                                return c && c.value === b
                            }
                        }, d.find.ID = function(a, b) {
                            if (void 0 !== b.getElementById && p) {
                                var c, d, e, f = b.getElementById(a);
                                if (f) {
                                    if ((c = f.getAttributeNode("id")) && c.value === a) return [f];
                                    for (e = b.getElementsByName(a), d = 0; f = e[d++];)
                                        if ((c = f.getAttributeNode("id")) && c.value === a) return [f]
                                }
                                return []
                            }
                        }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                            return void 0 !== b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
                        } : function(a, b) {
                            var c, d = [],
                                e = 0,
                                f = b.getElementsByTagName(a);
                            if ("*" === a) {
                                for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                                return d
                            }
                            return f
                        }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                            if (void 0 !== b.getElementsByClassName && p) return b.getElementsByClassName(a)
                        }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function(a) {
                            o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
                        }), ja(function(a) {
                            a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                            var b = n.createElement("input");
                            b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
                        })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function(a) {
                            c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N)
                        }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function(a, b) {
                            var c = 9 === a.nodeType ? a.documentElement : a,
                                d = b && b.parentNode;
                            return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                        } : function(a, b) {
                            if (b)
                                for (; b = b.parentNode;)
                                    if (b === a) return !0;
                            return !1
                        }, B = b ? function(a, b) {
                            if (a === b) return l = !0, 0;
                            var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                            return d || (1 & (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1) || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1)
                        } : function(a, b) {
                            if (a === b) return l = !0, 0;
                            var c, d = 0,
                                e = a.parentNode,
                                f = b.parentNode,
                                g = [a],
                                h = [b];
                            if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0;
                            if (e === f) return la(a, b);
                            for (c = a; c = c.parentNode;) g.unshift(c);
                            for (c = b; c = c.parentNode;) h.unshift(c);
                            for (; g[d] === h[d];) d++;
                            return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
                        }), n
                    }, ga.matches = function(a, b) {
                        return ga(a, null, null, b)
                    }, ga.matchesSelector = function(a, b) {
                        if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
                            var d = s.call(a, b);
                            if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                        } catch (e) {}
                        return 0 < ga(b, n, null, [a]).length
                    }, ga.contains = function(a, b) {
                        return (a.ownerDocument || a) !== n && m(a), t(a, b)
                    }, ga.attr = function(a, b) {
                        (a.ownerDocument || a) !== n && m(a);
                        var e = d.attrHandle[b.toLowerCase()],
                            f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
                        return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
                    }, ga.escape = function(a) {
                        return (a + "").replace(ba, ca)
                    }, ga.error = function(a) {
                        throw new Error("Syntax error, unrecognized expression: " + a)
                    }, ga.uniqueSort = function(a) {
                        var b, d = [],
                            e = 0,
                            f = 0;
                        if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                            for (; b = a[f++];) b === a[f] && (e = d.push(f));
                            for (; e--;) a.splice(d[e], 1)
                        }
                        return k = null, a
                    }, e = ga.getText = function(a) {
                        var b, c = "",
                            d = 0,
                            f = a.nodeType;
                        if (f) {
                            if (1 === f || 9 === f || 11 === f) {
                                if ("string" == typeof a.textContent) return a.textContent;
                                for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                            } else if (3 === f || 4 === f) return a.nodeValue
                        } else
                            for (; b = a[d++];) c += e(b);
                        return c
                    }, (d = ga.selectors = {
                        cacheLength: 50,
                        createPseudo: ia,
                        match: V,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(a) {
                                return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                            },
                            CHILD: function(a) {
                                return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a
                            },
                            PSEUDO: function(a) {
                                var b, c = !a[6] && a[2];
                                return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function(a) {
                                var b = a.replace(_, aa).toLowerCase();
                                return "*" === a ? function() {
                                    return !0
                                } : function(a) {
                                    return a.nodeName && a.nodeName.toLowerCase() === b
                                }
                            },
                            CLASS: function(a) {
                                var b = y[a + " "];
                                return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function(a) {
                                    return b.test("string" == typeof a.className && a.className || void 0 !== a.getAttribute && a.getAttribute("class") || "")
                                })
                            },
                            ATTR: function(a, b, c) {
                                return function(d) {
                                    var e = ga.attr(d, a);
                                    return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && -1 < e.indexOf(c) : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? -1 < (" " + e.replace(O, " ") + " ").indexOf(c) : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"))
                                }
                            },
                            CHILD: function(a, b, c, d, e) {
                                var f = "nth" !== a.slice(0, 3),
                                    g = "last" !== a.slice(-4),
                                    h = "of-type" === b;
                                return 1 === d && 0 === e ? function(a) {
                                    return !!a.parentNode
                                } : function(b, c, i) {
                                    var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                        q = b.parentNode,
                                        r = h && b.nodeName.toLowerCase(),
                                        s = !i && !h,
                                        t = !1;
                                    if (q) {
                                        if (f) {
                                            for (; p;) {
                                                for (m = b; m = m[p];)
                                                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                                o = p = "only" === a && !o && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                            for (t = (n = (j = (k = (l = (m = q)[u] || (m[u] = {}))[m.uniqueID] || (l[m.uniqueID] = {}))[a] || [])[0] === w && j[1]) && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();)
                                                if (1 === m.nodeType && ++t && m === b) {
                                                    k[a] = [w, n, t];
                                                    break
                                                }
                                        } else if (s && (t = n = (j = (k = (l = (m = b)[u] || (m[u] = {}))[m.uniqueID] || (l[m.uniqueID] = {}))[a] || [])[0] === w && j[1]), !1 === t)
                                            for (;
                                                (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && ((k = (l = m[u] || (m[u] = {}))[m.uniqueID] || (l[m.uniqueID] = {}))[a] = [w, t]), m !== b)););
                                        return (t -= e) === d || t % d == 0 && 0 <= t / d
                                    }
                                }
                            },
                            PSEUDO: function(a, b) {
                                var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
                                return e[u] ? e(b) : 1 < e.length ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function(a, c) {
                                    for (var d, f = e(a, b), g = f.length; g--;) a[d = I(a, f[g])] = !(c[d] = f[g])
                                }) : function(a) {
                                    return e(a, 0, c)
                                }) : e
                            }
                        },
                        pseudos: {
                            not: ia(function(a) {
                                var b = [],
                                    c = [],
                                    d = h(a.replace(P, "$1"));
                                return d[u] ? ia(function(a, b, c, e) {
                                    for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                                }) : function(a, e, f) {
                                    return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                                }
                            }),
                            has: ia(function(a) {
                                return function(b) {
                                    return 0 < ga(a, b).length
                                }
                            }),
                            contains: ia(function(a) {
                                return a = a.replace(_, aa),
                                    function(b) {
                                        return -1 < (b.textContent || b.innerText || e(b)).indexOf(a)
                                    }
                            }),
                            lang: ia(function(a) {
                                return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(),
                                    function(b) {
                                        var c;
                                        do {
                                            if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-")
                                        } while ((b = b.parentNode) && 1 === b.nodeType);
                                        return !1
                                    }
                            }),
                            target: function(b) {
                                var c = a.location && a.location.hash;
                                return c && c.slice(1) === b.id
                            },
                            root: function(a) {
                                return a === o
                            },
                            focus: function(a) {
                                return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                            },
                            enabled: oa(!1),
                            disabled: oa(!0),
                            checked: function(a) {
                                var b = a.nodeName.toLowerCase();
                                return "input" === b && !!a.checked || "option" === b && !!a.selected
                            },
                            selected: function(a) {
                                return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                            },
                            empty: function(a) {
                                for (a = a.firstChild; a; a = a.nextSibling)
                                    if (a.nodeType < 6) return !1;
                                return !0
                            },
                            parent: function(a) {
                                return !d.pseudos.empty(a)
                            },
                            header: function(a) {
                                return X.test(a.nodeName)
                            },
                            input: function(a) {
                                return W.test(a.nodeName)
                            },
                            button: function(a) {
                                var b = a.nodeName.toLowerCase();
                                return "input" === b && "button" === a.type || "button" === b
                            },
                            text: function(a) {
                                var b;
                                return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                            },
                            first: pa(function() {
                                return [0]
                            }),
                            last: pa(function(a, b) {
                                return [b - 1]
                            }),
                            eq: pa(function(a, b, c) {
                                return [c < 0 ? c + b : c]
                            }),
                            even: pa(function(a, b) {
                                for (var c = 0; c < b; c += 2) a.push(c);
                                return a
                            }),
                            odd: pa(function(a, b) {
                                for (var c = 1; c < b; c += 2) a.push(c);
                                return a
                            }),
                            lt: pa(function(a, b, c) {
                                for (var d = c < 0 ? c + b : c; 0 <= --d;) a.push(d);
                                return a
                            }),
                            gt: pa(function(a, b, c) {
                                for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                                return a
                            })
                        }
                    }).pseudos.nth = d.pseudos.eq, {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) d.pseudos[b] = ma(b);
                for (b in {
                        submit: !0,
                        reset: !0
                    }) d.pseudos[b] = na(b);

                function ra() {}

                function sa(a) {
                    for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
                    return d
                }

                function ta(a, b, c) {
                    var d = b.dir,
                        e = b.next,
                        f = e || d,
                        g = c && "parentNode" === f,
                        h = x++;
                    return b.first ? function(b, c, e) {
                        for (; b = b[d];)
                            if (1 === b.nodeType || g) return a(b, c, e);
                        return !1
                    } : function(b, c, i) {
                        var j, k, l, m = [w, h];
                        if (i) {
                            for (; b = b[d];)
                                if ((1 === b.nodeType || g) && a(b, c, i)) return !0
                        } else
                            for (; b = b[d];)
                                if (1 === b.nodeType || g)
                                    if (k = (l = b[u] || (b[u] = {}))[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;
                                    else {
                                        if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2];
                                        if ((k[f] = m)[2] = a(b, c, i)) return !0
                                    } return !1
                    }
                }

                function ua(a) {
                    return 1 < a.length ? function(b, c, d) {
                        for (var e = a.length; e--;)
                            if (!a[e](b, c, d)) return !1;
                        return !0
                    } : a[0]
                }

                function wa(a, b, c, d, e) {
                    for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
                    return g
                }

                function xa(a, b, c, d, e, f) {
                    return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function(f, g, h, i) {
                        var j, k, l, m = [],
                            n = [],
                            o = g.length,
                            p = f || function(a, b, c) {
                                for (var d = 0, e = b.length; d < e; d++) ga(a, b[d], c);
                                return c
                            }(b || "*", h.nodeType ? [h] : h, []),
                            q = !a || !f && b ? p : wa(p, m, a, h, i),
                            r = c ? e || (f ? a : o || d) ? [] : g : q;
                        if (c && c(q, r, h, i), d)
                            for (j = wa(r, n), d(j, [], h, i), k = j.length; k--;)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
                        if (f) {
                            if (e || a) {
                                if (e) {
                                    for (j = [], k = r.length; k--;)(l = r[k]) && j.push(q[k] = l);
                                    e(null, r = [], j, i)
                                }
                                for (k = r.length; k--;)(l = r[k]) && -1 < (j = e ? I(f, l) : m[k]) && (f[j] = !(g[j] = l))
                            }
                        } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r)
                    })
                }

                function ya(a) {
                    for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function(a) {
                            return a === b
                        }, h, !0), l = ta(function(a) {
                            return -1 < I(b, a)
                        }, h, !0), m = [function(a, c, d) {
                            var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                            return b = null, e
                        }]; i < f; i++)
                        if (c = d.relative[a[i].type]) m = [ta(ua(m), c)];
                        else {
                            if ((c = d.filter[a[i].type].apply(null, a[i].matches))[u]) {
                                for (e = ++i; e < f && !d.relative[a[e].type]; e++);
                                return xa(1 < i && ua(m), 1 < i && sa(a.slice(0, i - 1).concat({
                                    value: " " === a[i - 2].type ? "*" : ""
                                })).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a))
                            }
                            m.push(c)
                        }
                    return ua(m)
                }

                function za(a, b) {
                    var c = 0 < b.length,
                        e = 0 < a.length,
                        f = function(f, g, h, i, k) {
                            var l, o, q, r = 0,
                                s = "0",
                                t = f && [],
                                u = [],
                                v = j,
                                x = f || e && d.find.TAG("*", k),
                                y = w += null == v ? 1 : Math.random() || .1,
                                z = x.length;
                            for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                                if (e && l) {
                                    for (o = 0, g || l.ownerDocument === n || (m(l), h = !p); q = a[o++];)
                                        if (q(l, g || n, h)) {
                                            i.push(l);
                                            break
                                        }
                                    k && (w = y)
                                }
                                c && ((l = !q && l) && r--, f && t.push(l))
                            }
                            if (r += s, c && s !== r) {
                                for (o = 0; q = b[o++];) q(t, u, g, h);
                                if (f) {
                                    if (0 < r)
                                        for (; s--;) t[s] || u[s] || (u[s] = E.call(i));
                                    u = wa(u)
                                }
                                G.apply(i, u), k && !f && 0 < u.length && 1 < r + b.length && ga.uniqueSort(i)
                            }
                            return k && (w = y, j = v), t
                        };
                    return c ? ia(f) : f
                }
                return ra.prototype = d.filters = d.pseudos, d.setFilters = new ra, g = ga.tokenize = function(a, b) {
                    var c, e, f, g, h, i, j, k = z[a + " "];
                    if (k) return b ? 0 : k.slice(0);
                    for (h = a, i = [], j = d.preFilter; h;) {
                        for (g in c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({
                                value: c,
                                type: e[0].replace(P, " ")
                            }), h = h.slice(c.length)), d.filter) !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                            value: c,
                            type: g,
                            matches: e
                        }), h = h.slice(c.length));
                        if (!c) break
                    }
                    return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
                }, h = ga.compile = function(a, b) {
                    var c, d = [],
                        e = [],
                        f = A[a + " "];
                    if (!f) {
                        for (b || (b = g(a)), c = b.length; c--;)(f = ya(b[c]))[u] ? d.push(f) : e.push(f);
                        (f = A(a, za(e, d))).selector = a
                    }
                    return f
                }, i = ga.select = function(a, b, c, e) {
                    var f, i, j, k, l, m = "function" == typeof a && a,
                        n = !e && g(a = m.selector || a);
                    if (c = c || [], 1 === n.length) {
                        if (2 < (i = n[0] = n[0].slice(0)).length && "ID" === (j = i[0]).type && 9 === b.nodeType && p && d.relative[i[1].type]) {
                            if (!(b = (d.find.ID(j.matches[0].replace(_, aa), b) || [])[0])) return c;
                            m && (b = b.parentNode), a = a.slice(i.shift().value.length)
                        }
                        for (f = V.needsContext.test(a) ? 0 : i.length; f-- && (j = i[f], !d.relative[k = j.type]);)
                            if ((l = d.find[k]) && (e = l(j.matches[0].replace(_, aa), $.test(i[0].type) && qa(b.parentNode) || b))) {
                                if (i.splice(f, 1), !(a = e.length && sa(i))) return G.apply(c, e), c;
                                break
                            }
                    }
                    return (m || h(a, n))(e, b, !p, c, !b || $.test(a) && qa(b.parentNode) || b), c
                }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function(a) {
                    return 1 & a.compareDocumentPosition(n.createElement("fieldset"))
                }), ja(function(a) {
                    return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
                }) || ka("type|href|height|width", function(a, b, c) {
                    if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
                }), c.attributes && ja(function(a) {
                    return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
                }) || ka("value", function(a, b, c) {
                    if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
                }), ja(function(a) {
                    return null == a.getAttribute("disabled")
                }) || ka(J, function(a, b, c) {
                    var d;
                    if (!c) return !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }), ga
            }(a);
            r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape;
            var y = function(a, b, c) {
                    for (var d = [], e = void 0 !== c;
                        (a = a[b]) && 9 !== a.nodeType;)
                        if (1 === a.nodeType) {
                            if (e && r(a).is(c)) break;
                            d.push(a)
                        }
                    return d
                },
                z = function(a, b) {
                    for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                    return c
                },
                A = r.expr.match.needsContext;

            function B(a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            }
            var C = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
                D = /^.[^:#\[\.,]*$/;

            function E(a, b, c) {
                return r.isFunction(b) ? r.grep(a, function(a, d) {
                    return !!b.call(a, d, a) !== c
                }) : b.nodeType ? r.grep(a, function(a) {
                    return a === b !== c
                }) : "string" != typeof b ? r.grep(a, function(a) {
                    return -1 < i.call(b, a) !== c
                }) : D.test(b) ? r.filter(b, a, c) : (b = r.filter(b, a), r.grep(a, function(a) {
                    return -1 < i.call(b, a) !== c && 1 === a.nodeType
                }))
            }
            r.filter = function(a, b, c) {
                var d = b[0];
                return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function(a) {
                    return 1 === a.nodeType
                }))
            }, r.fn.extend({
                find: function(a) {
                    var b, c, d = this.length,
                        e = this;
                    if ("string" != typeof a) return this.pushStack(r(a).filter(function() {
                        for (b = 0; b < d; b++)
                            if (r.contains(e[b], this)) return !0
                    }));
                    for (c = this.pushStack([]), b = 0; b < d; b++) r.find(a, e[b], c);
                    return 1 < d ? r.uniqueSort(c) : c
                },
                filter: function(a) {
                    return this.pushStack(E(this, a || [], !1))
                },
                not: function(a) {
                    return this.pushStack(E(this, a || [], !0))
                },
                is: function(a) {
                    return !!E(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length
                }
            });
            var F, G = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            (r.fn.init = function(a, b, c) {
                var e, f;
                if (!a) return this;
                if (c = c || F, "string" == typeof a) {
                    if (!(e = "<" === a[0] && ">" === a[a.length - 1] && 3 <= a.length ? [null, a, null] : G.exec(a)) || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                    if (e[1]) {
                        if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), C.test(e[1]) && r.isPlainObject(b))
                            for (e in b) r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
                        return this
                    }
                    return (f = d.getElementById(e[2])) && (this[0] = f, this.length = 1), this
                }
                return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this)
            }).prototype = r.fn, F = r(d);
            var I = /^(?:parents|prev(?:Until|All))/,
                J = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };

            function K(a, b) {
                for (;
                    (a = a[b]) && 1 !== a.nodeType;);
                return a
            }
            r.fn.extend({
                has: function(a) {
                    var b = r(a, this),
                        c = b.length;
                    return this.filter(function() {
                        for (var a = 0; a < c; a++)
                            if (r.contains(this, b[a])) return !0
                    })
                },
                closest: function(a, b) {
                    var c, d = 0,
                        e = this.length,
                        f = [],
                        g = "string" != typeof a && r(a);
                    if (!A.test(a))
                        for (; d < e; d++)
                            for (c = this[d]; c && c !== b; c = c.parentNode)
                                if (c.nodeType < 11 && (g ? -1 < g.index(c) : 1 === c.nodeType && r.find.matchesSelector(c, a))) {
                                    f.push(c);
                                    break
                                }
                    return this.pushStack(1 < f.length ? r.uniqueSort(f) : f)
                },
                index: function(a) {
                    return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(a, b) {
                    return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b))))
                },
                addBack: function(a) {
                    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                }
            }), r.each({
                parent: function(a) {
                    var b = a.parentNode;
                    return b && 11 !== b.nodeType ? b : null
                },
                parents: function(a) {
                    return y(a, "parentNode")
                },
                parentsUntil: function(a, b, c) {
                    return y(a, "parentNode", c)
                },
                next: function(a) {
                    return K(a, "nextSibling")
                },
                prev: function(a) {
                    return K(a, "previousSibling")
                },
                nextAll: function(a) {
                    return y(a, "nextSibling")
                },
                prevAll: function(a) {
                    return y(a, "previousSibling")
                },
                nextUntil: function(a, b, c) {
                    return y(a, "nextSibling", c)
                },
                prevUntil: function(a, b, c) {
                    return y(a, "previousSibling", c)
                },
                siblings: function(a) {
                    return z((a.parentNode || {}).firstChild, a)
                },
                children: function(a) {
                    return z(a.firstChild)
                },
                contents: function(a) {
                    return B(a, "iframe") ? a.contentDocument : (B(a, "template") && (a = a.content || a), r.merge([], a.childNodes))
                }
            }, function(a, b) {
                r.fn[a] = function(c, d) {
                    var e = r.map(this, b, c);
                    return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), 1 < this.length && (J[a] || r.uniqueSort(e), I.test(a) && e.reverse()), this.pushStack(e)
                }
            });
            var L = /[^\x20\t\r\n\f]+/g;

            function N(a) {
                return a
            }

            function O(a) {
                throw a
            }

            function P(a, b, c, d) {
                var e;
                try {
                    a && r.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && r.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d))
                } catch (a) {
                    c.apply(void 0, [a])
                }
            }
            r.Callbacks = function(a) {
                a = "string" == typeof a ? function(a) {
                    var b = {};
                    return r.each(a.match(L) || [], function(a, c) {
                        b[c] = !0
                    }), b
                }(a) : r.extend({}, a);
                var b, c, d, e, f = [],
                    g = [],
                    h = -1,
                    i = function() {
                        for (e = e || a.once, d = b = !0; g.length; h = -1)
                            for (c = g.shift(); ++h < f.length;) !1 === f[h].apply(c[0], c[1]) && a.stopOnFalse && (h = f.length, c = !1);
                        a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
                    },
                    j = {
                        add: function() {
                            return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
                                r.each(b, function(b, c) {
                                    r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c)
                                })
                            }(arguments), c && !b && i()), this
                        },
                        remove: function() {
                            return r.each(arguments, function(a, b) {
                                for (var c; - 1 < (c = r.inArray(b, f, c));) f.splice(c, 1), c <= h && h--
                            }), this
                        },
                        has: function(a) {
                            return a ? -1 < r.inArray(a, f) : 0 < f.length
                        },
                        empty: function() {
                            return f && (f = []), this
                        },
                        disable: function() {
                            return e = g = [], f = c = "", this
                        },
                        disabled: function() {
                            return !f
                        },
                        lock: function() {
                            return e = g = [], c || b || (f = c = ""), this
                        },
                        locked: function() {
                            return !!e
                        },
                        fireWith: function(a, c) {
                            return e || (c = [a, (c = c || []).slice ? c.slice() : c], g.push(c), b || i()), this
                        },
                        fire: function() {
                            return j.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!d
                        }
                    };
                return j
            }, r.extend({
                Deferred: function(b) {
                    var c = [
                            ["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2],
                            ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]
                        ],
                        d = "pending",
                        e = {
                            state: function() {
                                return d
                            },
                            always: function() {
                                return f.done(arguments).fail(arguments), this
                            },
                            catch: function(a) {
                                return e.then(null, a)
                            },
                            pipe: function() {
                                var a = arguments;
                                return r.Deferred(function(b) {
                                    r.each(c, function(c, d) {
                                        var e = r.isFunction(a[d[4]]) && a[d[4]];
                                        f[d[1]](function() {
                                            var a = e && e.apply(this, arguments);
                                            a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments)
                                        })
                                    }), a = null
                                }).promise()
                            },
                            then: function(b, d, e) {
                                var f = 0;

                                function g(b, c, d, e) {
                                    return function() {
                                        var h = this,
                                            i = arguments,
                                            j = function() {
                                                var a, j;
                                                if (!(b < f)) {
                                                    if ((a = d.apply(h, i)) === c.promise()) throw new TypeError("Thenable self-resolution");
                                                    j = a && ("object" == typeof a || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, N, e), g(f, c, O, e)) : (f++, j.call(a, g(f, c, N, e), g(f, c, O, e), g(f, c, N, c.notifyWith))) : (d !== N && (h = void 0, i = [a]), (e || c.resolveWith)(h, i))
                                                }
                                            },
                                            k = e ? j : function() {
                                                try {
                                                    j()
                                                } catch (a) {
                                                    r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), f <= b + 1 && (d !== O && (h = void 0, i = [a]), c.rejectWith(h, i))
                                                }
                                            };
                                        b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k))
                                    }
                                }
                                return r.Deferred(function(a) {
                                    c[0][3].add(g(0, a, r.isFunction(e) ? e : N, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : N)), c[2][3].add(g(0, a, r.isFunction(d) ? d : O))
                                }).promise()
                            },
                            promise: function(a) {
                                return null != a ? r.extend(a, e) : e
                            }
                        },
                        f = {};
                    return r.each(c, function(a, b) {
                        var g = b[2],
                            h = b[5];
                        e[b[1]] = g.add, h && g.add(function() {
                            d = h
                        }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function() {
                            return f[b[0] + "With"](this === f ? void 0 : this, arguments), this
                        }, f[b[0] + "With"] = g.fireWith
                    }), e.promise(f), b && b.call(f, f), f
                },
                when: function(a) {
                    var b = arguments.length,
                        c = b,
                        d = Array(c),
                        e = f.call(arguments),
                        g = r.Deferred(),
                        h = function(a) {
                            return function(c) {
                                d[a] = this, e[a] = 1 < arguments.length ? f.call(arguments) : c, --b || g.resolveWith(d, e)
                            }
                        };
                    if (b <= 1 && (P(a, g.done(h(c)).resolve, g.reject, !b), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then();
                    for (; c--;) P(e[c], h(c), g.reject);
                    return g.promise()
                }
            });
           
            var R = r.Deferred();

            function S() {
                d.removeEventListener("DOMContentLoaded", S), a.removeEventListener("load", S), r.ready()
            }
            r.fn.ready = function(a) {
                return R.then(a).catch(function(a) {
                    r.readyException(a)
                }), this
            }, r.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(a) {
                    (!0 === a ? --r.readyWait : r.isReady) || ((r.isReady = !0) !== a && 0 < --r.readyWait || R.resolveWith(d, [r]))
                }
            }), r.ready.then = R.then, "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", S), a.addEventListener("load", S));
            var T = function(a, b, c, d, e, f, g) {
                    var h = 0,
                        i = a.length,
                        j = null == c;
                    if ("object" === r.type(c))
                        for (h in e = !0, c) T(a, b, h, c[h], !0, f, g);
                    else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                            return j.call(r(a), c)
                        })), b))
                        for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                    return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
                },
                U = function(a) {
                    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
                };

            function V() {
                this.expando = r.expando + V.uid++
            }
            V.uid = 1, V.prototype = {
                cache: function(a) {
                    var b = a[this.expando];
                    return b || (b = {}, U(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                        value: b,
                        configurable: !0
                    }))), b
                },
                set: function(a, b, c) {
                    var d, e = this.cache(a);
                    if ("string" == typeof b) e[r.camelCase(b)] = c;
                    else
                        for (d in b) e[r.camelCase(d)] = b[d];
                    return e
                },
                get: function(a, b) {
                    return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)]
                },
                access: function(a, b, c) {
                    return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b)
                },
                remove: function(a, b) {
                    var c, d = a[this.expando];
                    if (void 0 !== d) {
                        if (void 0 !== b) {
                            Array.isArray(b) ? b = b.map(r.camelCase) : b = (b = r.camelCase(b)) in d ? [b] : b.match(L) || [], c = b.length;
                            for (; c--;) delete d[b[c]]
                        }(void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
                    }
                },
                hasData: function(a) {
                    var b = a[this.expando];
                    return void 0 !== b && !r.isEmptyObject(b)
                }
            };
            var W = new V,
                X = new V,
                Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                Z = /[A-Z]/g;

            function _(a, b, c) {
                var d;
                if (void 0 === c && 1 === a.nodeType)
                    if (d = "data-" + b.replace(Z, "-$&").toLowerCase(), "string" == typeof(c = a.getAttribute(d))) {
                        try {
                            c = function(a) {
                                return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Y.test(a) ? JSON.parse(a) : a)
                            }(c)
                        } catch (e) {}
                        X.set(a, b, c)
                    } else c = void 0;
                return c
            }
            r.extend({
                hasData: function(a) {
                    return X.hasData(a) || W.hasData(a)
                },
                data: function(a, b, c) {
                    return X.access(a, b, c)
                },
                removeData: function(a, b) {
                    X.remove(a, b)
                },
                _data: function(a, b, c) {
                    return W.access(a, b, c)
                },
                _removeData: function(a, b) {
                    W.remove(a, b)
                }
            }), r.fn.extend({
                data: function(a, b) {
                    var c, d, e, f = this[0],
                        g = f && f.attributes;
                    if (void 0 === a) {
                        if (this.length && (e = X.get(f), 1 === f.nodeType && !W.get(f, "hasDataAttrs"))) {
                            for (c = g.length; c--;) g[c] && (0 === (d = g[c].name).indexOf("data-") && (d = r.camelCase(d.slice(5)), _(f, d, e[d])));
                            W.set(f, "hasDataAttrs", !0)
                        }
                        return e
                    }
                    return "object" == typeof a ? this.each(function() {
                        X.set(this, a)
                    }) : T(this, function(b) {
                        var c;
                        if (f && void 0 === b) {
                            if (void 0 !== (c = X.get(f, a))) return c;
                            if (void 0 !== (c = _(f, a))) return c
                        } else this.each(function() {
                            X.set(this, a, b)
                        })
                    }, null, b, 1 < arguments.length, null, !0)
                },
                removeData: function(a) {
                    return this.each(function() {
                        X.remove(this, a)
                    })
                }
            }), r.extend({
                queue: function(a, b, c) {
                    var d;
                    if (a) return b = (b || "fx") + "queue", d = W.get(a, b), c && (!d || Array.isArray(c) ? d = W.access(a, b, r.makeArray(c)) : d.push(c)), d || []
                },
                dequeue: function(a, b) {
                    b = b || "fx";
                    var c = r.queue(a, b),
                        d = c.length,
                        e = c.shift(),
                        f = r._queueHooks(a, b);
                    "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, function() {
                        r.dequeue(a, b)
                    }, f)), !d && f && f.empty.fire()
                },
                _queueHooks: function(a, b) {
                    var c = b + "queueHooks";
                    return W.get(a, c) || W.access(a, c, {
                        empty: r.Callbacks("once memory").add(function() {
                            W.remove(a, [b + "queue", c])
                        })
                    })
                }
            }), r.fn.extend({
                queue: function(a, b) {
                    var c = 2;
                    return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                        var c = r.queue(this, a, b);
                        r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a)
                    })
                },
                dequeue: function(a) {
                    return this.each(function() {
                        r.dequeue(this, a)
                    })
                },
                clearQueue: function(a) {
                    return this.queue(a || "fx", [])
                },
                promise: function(a, b) {
                    var c, d = 1,
                        e = r.Deferred(),
                        f = this,
                        g = this.length,
                        h = function() {
                            --d || e.resolveWith(f, [f])
                        };
                    for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;)(c = W.get(f[g], a + "queueHooks")) && c.empty && (d++, c.empty.add(h));
                    return h(), e.promise(b)
                }
            });
            var aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                ba = new RegExp("^(?:([+-])=|)(" + aa + ")([a-z%]*)$", "i"),
                ca = ["Top", "Right", "Bottom", "Left"],
                da = function(a, b) {
                    return "none" === (a = b || a).style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display")
                },
                ea = function(a, b, c, d) {
                    var e, f, g = {};
                    for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                    for (f in e = c.apply(a, d || []), b) a.style[f] = g[f];
                    return e
                };

            function fa(a, b, c, d) {
                var e, f = 1,
                    g = 20,
                    h = d ? function() {
                        return d.cur()
                    } : function() {
                        return r.css(a, b, "")
                    },
                    i = h(),
                    j = c && c[3] || (r.cssNumber[b] ? "" : "px"),
                    k = (r.cssNumber[b] || "px" !== j && +i) && ba.exec(r.css(a, b));
                if (k && k[3] !== j)
                    for (j = j || k[3], c = c || [], k = +i || 1; k /= f = f || ".5", r.style(a, b, k + j), f !== (f = h() / i) && 1 !== f && --g;);
                return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
            }
            var ga = {};

            function ha(a) {
                var b, c = a.ownerDocument,
                    d = a.nodeName,
                    e = ga[d];
                return e || (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), ga[d] = e)
            }

            function ia(a, b) {
                for (var c, d, e = [], f = 0, g = a.length; f < g; f++)(d = a[f]).style && (c = d.style.display, b ? ("none" === c && (e[f] = W.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && da(d) && (e[f] = ha(d))) : "none" !== c && (e[f] = "none", W.set(d, "display", c)));
                for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
                return a
            }
            r.fn.extend({
                show: function() {
                    return ia(this, !0)
                },
                hide: function() {
                    return ia(this)
                },
                toggle: function(a) {
                    return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                        da(this) ? r(this).show() : r(this).hide()
                    })
                }
            });
            var ja = /^(?:checkbox|radio)$/i,
                ka = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
                la = /^$|\/(?:java|ecma)script/i,
                ma = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };

            function na(a, b) {
                var c;
                return c = void 0 !== a.getElementsByTagName ? a.getElementsByTagName(b || "*") : void 0 !== a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && B(a, b) ? r.merge([a], c) : c
            }

            function oa(a, b) {
                for (var c = 0, d = a.length; c < d; c++) W.set(a[c], "globalEval", !b || W.get(b[c], "globalEval"))
            }
            ma.optgroup = ma.option, ma.tbody = ma.tfoot = ma.colgroup = ma.caption = ma.thead, ma.th = ma.td;
            var pa = /<|&#?\w+;/;

            function qa(a, b, c, d, e) {
                for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++)
                    if ((f = a[n]) || 0 === f)
                        if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f);
                        else if (pa.test(f)) {
                    for (g = g || l.appendChild(b.createElement("div")), h = (ka.exec(f) || ["", ""])[1].toLowerCase(), i = ma[h] || ma._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0]; k--;) g = g.lastChild;
                    r.merge(m, g.childNodes), (g = l.firstChild).textContent = ""
                } else m.push(b.createTextNode(f));
                for (l.textContent = "", n = 0; f = m[n++];)
                    if (d && -1 < r.inArray(f, d)) e && e.push(f);
                    else if (j = r.contains(f.ownerDocument, f), g = na(l.appendChild(f), "script"), j && oa(g), c)
                    for (k = 0; f = g[k++];) la.test(f.type || "") && c.push(f);
                return l
            }! function() {
                var b = d.createDocumentFragment().appendChild(d.createElement("div")),
                    c = d.createElement("input");
                c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
            }();
            var ra = d.documentElement,
                sa = /^key/,
                ta = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                ua = /^([^.]*)(?:\.(.+)|)/;

            function va() {
                return !0
            }

            function wa() {
                return !1
            }

            function xa() {
                try {
                    return d.activeElement
                } catch (a) {}
            }

            function ya(a, b, c, d, e, f) {
                var g, h;
                if ("object" == typeof b) {
                    for (h in "string" != typeof c && (d = d || c, c = void 0), b) ya(a, h, c, d, b[h], f);
                    return a
                }
                if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), !1 === e) e = wa;
                else if (!e) return a;
                return 1 === f && (g = e, (e = function(a) {
                    return r().off(a), g.apply(this, arguments)
                }).guid = g.guid || (g.guid = r.guid++)), a.each(function() {
                    r.event.add(this, b, e, d, c)
                })
            }
            r.event = {
                global: {},
                add: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = W.get(a);
                    if (q)
                        for (c.handler && (c = (f = c).handler, e = f.selector), e && r.find.matchesSelector(ra, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                                return void 0 !== r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0
                            }), j = (b = (b || "").match(L) || [""]).length; j--;) n = p = (h = ua.exec(b[j]) || [])[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({
                            type: n,
                            origType: p,
                            data: d,
                            handler: c,
                            guid: c.guid,
                            selector: e,
                            needsContext: e && r.expr.match.needsContext.test(e),
                            namespace: o.join(".")
                        }, f), (m = i[n]) || ((m = i[n] = []).delegateCount = 0, l.setup && !1 !== l.setup.call(a, d, o, g) || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0)
                },
                remove: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = W.hasData(a) && W.get(a);
                    if (q && (i = q.events)) {
                        for (j = (b = (b || "").match(L) || [""]).length; j--;)
                            if (n = p = (h = ua.exec(b[j]) || [])[1], o = (h[2] || "").split(".").sort(), n) {
                                for (l = r.event.special[n] || {}, m = i[n = (d ? l.delegateType : l.bindType) || n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                                g && !m.length && (l.teardown && !1 !== l.teardown.call(a, o, q.handle) || r.removeEvent(a, n, q.handle), delete i[n])
                            } else
                                for (n in i) r.event.remove(a, n + b[j], c, d, !0);
                        r.isEmptyObject(i) && W.remove(a, "handle events")
                    }
                },
                dispatch: function(a) {
                    var c, d, e, f, g, h, b = r.event.fix(a),
                        i = new Array(arguments.length),
                        j = (W.get(this, "events") || {})[b.type] || [],
                        k = r.event.special[b.type] || {};
                    for (i[0] = b, c = 1; c < arguments.length; c++) i[c] = arguments[c];
                    if (b.delegateTarget = this, !k.preDispatch || !1 !== k.preDispatch.call(this, b)) {
                        for (h = r.event.handlers.call(this, b, j), c = 0;
                            (f = h[c++]) && !b.isPropagationStopped();)
                            for (b.currentTarget = f.elem, d = 0;
                                (g = f.handlers[d++]) && !b.isImmediatePropagationStopped();) b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, void 0 !== (e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i)) && !1 === (b.result = e) && (b.preventDefault(), b.stopPropagation()));
                        return k.postDispatch && k.postDispatch.call(this, b), b.result
                    }
                },
                handlers: function(a, b) {
                    var c, d, e, f, g, h = [],
                        i = b.delegateCount,
                        j = a.target;
                    if (i && j.nodeType && !("click" === a.type && 1 <= a.button))
                        for (; j !== this; j = j.parentNode || this)
                            if (1 === j.nodeType && ("click" !== a.type || !0 !== j.disabled)) {
                                for (f = [], g = {}, c = 0; c < i; c++) void 0 === g[e = (d = b[c]).selector + " "] && (g[e] = d.needsContext ? -1 < r(e, this).index(j) : r.find(e, this, null, [j]).length), g[e] && f.push(d);
                                f.length && h.push({
                                    elem: j,
                                    handlers: f
                                })
                            }
                    return j = this, i < b.length && h.push({
                        elem: j,
                        handlers: b.slice(i)
                    }), h
                },
                addProp: function(a, b) {
                    Object.defineProperty(r.Event.prototype, a, {
                        enumerable: !0,
                        configurable: !0,
                        get: r.isFunction(b) ? function() {
                            if (this.originalEvent) return b(this.originalEvent)
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[a]
                        },
                        set: function(b) {
                            Object.defineProperty(this, a, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: b
                            })
                        }
                    })
                },
                fix: function(a) {
                    return a[r.expando] ? a : new r.Event(a)
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== xa() && this.focus) return this.focus(), !1
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === xa() && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            if ("checkbox" === this.type && this.click && B(this, "input")) return this.click(), !1
                        },
                        _default: function(a) {
                            return B(a.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(a) {
                            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                        }
                    }
                }
            }, r.removeEvent = function(a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c)
            }, r.Event = function(a, b) {
                return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? va : wa, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void(this[r.expando] = !0)) : new r.Event(a, b)
            }, r.Event.prototype = {
                constructor: r.Event,
                isDefaultPrevented: wa,
                isPropagationStopped: wa,
                isImmediatePropagationStopped: wa,
                isSimulated: !1,
                preventDefault: function() {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = va, a && !this.isSimulated && a.preventDefault()
                },
                stopPropagation: function() {
                    var a = this.originalEvent;
                    this.isPropagationStopped = va, a && !this.isSimulated && a.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var a = this.originalEvent;
                    this.isImmediatePropagationStopped = va, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
                }
            }, r.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function(a) {
                    var b = a.button;
                    return null == a.which && sa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && ta.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which
                }
            }, r.event.addProp), r.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(a, b) {
                r.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function(a) {
                        var c, e = a.relatedTarget,
                            f = a.handleObj;
                        return e && (e === this || r.contains(this, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                    }
                }
            }), r.fn.extend({
                on: function(a, b, c, d) {
                    return ya(this, a, b, c, d)
                },
                one: function(a, b, c, d) {
                    return ya(this, a, b, c, d, 1)
                },
                off: function(a, b, c) {
                    var d, e;
                    if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                    if ("object" == typeof a) {
                        for (e in a) this.off(e, b, a[e]);
                        return this
                    }
                    return !1 !== b && "function" != typeof b || (c = b, b = void 0), !1 === c && (c = wa), this.each(function() {
                        r.event.remove(this, a, c, b)
                    })
                }
            });
            var za = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                Aa = /<script|<style|<link/i,
                Ba = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Ca = /^true\/(.*)/,
                Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

            function Ea(a, b) {
                return B(a, "table") && B(11 !== b.nodeType ? b : b.firstChild, "tr") && r(">tbody", a)[0] || a
            }

            function Fa(a) {
                return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
            }

            function Ga(a) {
                var b = Ca.exec(a.type);
                return b ? a.type = b[1] : a.removeAttribute("type"), a
            }

            function Ha(a, b) {
                var c, d, e, f, g, h, i, j;
                if (1 === b.nodeType) {
                    if (W.hasData(a) && (f = W.access(a), g = W.set(b, f), j = f.events))
                        for (e in delete g.handle, g.events = {}, j)
                            for (c = 0, d = j[e].length; c < d; c++) r.event.add(b, e, j[e][c]);
                    X.hasData(a) && (h = X.access(a), i = r.extend({}, h), X.set(b, i))
                }
            }

            function Ia(a, b) {
                var c = b.nodeName.toLowerCase();
                "input" === c && ja.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
            }

            function Ja(a, b, c, d) {
                b = g.apply([], b);
                var e, f, h, i, j, k, l = 0,
                    m = a.length,
                    n = m - 1,
                    q = b[0],
                    s = r.isFunction(q);
                if (s || 1 < m && "string" == typeof q && !o.checkClone && Ba.test(q)) return a.each(function(e) {
                    var f = a.eq(e);
                    s && (b[0] = q.call(this, e, f.html())), Ja(f, b, c, d)
                });
                if (m && (f = (e = qa(b, a[0].ownerDocument, !1, a, d)).firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
                    for (i = (h = r.map(na(e, "script"), Fa)).length; l < m; l++) j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, na(j, "script"))), c.call(a[l], j, l);
                    if (i)
                        for (k = h[h.length - 1].ownerDocument, r.map(h, Ga), l = 0; l < i; l++) j = h[l], la.test(j.type || "") && !W.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Da, ""), k))
                }
                return a
            }

            function Ka(a, b, c) {
                for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || r.cleanData(na(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && oa(na(d, "script")), d.parentNode.removeChild(d));
                return a
            }
            r.extend({
                htmlPrefilter: function(a) {
                    return a.replace(za, "<$1></$2>")
                },
                clone: function(a, b, c) {
                    var d, e, f, g, h = a.cloneNode(!0),
                        i = r.contains(a.ownerDocument, a);
                    if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a)))
                        for (g = na(h), d = 0, e = (f = na(a)).length; d < e; d++) Ia(f[d], g[d]);
                    if (b)
                        if (c)
                            for (f = f || na(a), g = g || na(h), d = 0, e = f.length; d < e; d++) Ha(f[d], g[d]);
                        else Ha(a, h);
                    return 0 < (g = na(h, "script")).length && oa(g, !i && na(a, "script")), h
                },
                cleanData: function(a) {
                    for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++)
                        if (U(c)) {
                            if (b = c[W.expando]) {
                                if (b.events)
                                    for (d in b.events) e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle);
                                c[W.expando] = void 0
                            }
                            c[X.expando] && (c[X.expando] = void 0)
                        }
                }
            }), r.fn.extend({
                detach: function(a) {
                    return Ka(this, a, !0)
                },
                remove: function(a) {
                    return Ka(this, a)
                },
                text: function(a) {
                    return T(this, function(a) {
                        return void 0 === a ? r.text(this) : this.empty().each(function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                        })
                    }, null, a, arguments.length)
                },
                append: function() {
                    return Ja(this, arguments, function(a) {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ea(this, a).appendChild(a)
                    })
                },
                prepend: function() {
                    return Ja(this, arguments, function(a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var b = Ea(this, a);
                            b.insertBefore(a, b.firstChild)
                        }
                    })
                },
                before: function() {
                    return Ja(this, arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this)
                    })
                },
                after: function() {
                    return Ja(this, arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (r.cleanData(na(a, !1)), a.textContent = "");
                    return this
                },
                clone: function(a, b) {
                    return a = null != a && a, b = null == b ? a : b, this.map(function() {
                        return r.clone(this, a, b)
                    })
                },
                html: function(a) {
                    return T(this, function(a) {
                        var b = this[0] || {},
                            c = 0,
                            d = this.length;
                        if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                        if ("string" == typeof a && !Aa.test(a) && !ma[(ka.exec(a) || ["", ""])[1].toLowerCase()]) {
                            a = r.htmlPrefilter(a);
                            try {
                                for (; c < d; c++) 1 === (b = this[c] || {}).nodeType && (r.cleanData(na(b, !1)), b.innerHTML = a);
                                b = 0
                            } catch (e) {}
                        }
                        b && this.empty().append(a)
                    }, null, a, arguments.length)
                },
                replaceWith: function() {
                    var a = [];
                    return Ja(this, arguments, function(b) {
                        var c = this.parentNode;
                        r.inArray(this, a) < 0 && (r.cleanData(na(this)), c && c.replaceChild(b, this))
                    }, a)
                }
            }), r.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(a, b) {
                r.fn[a] = function(a) {
                    for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get());
                    return this.pushStack(d)
                }
            });
            var La = /^margin/,
                Ma = new RegExp("^(" + aa + ")(?!px)[a-z%]+$", "i"),
                Na = function(b) {
                    var c = b.ownerDocument.defaultView;
                    return c && c.opener || (c = a), c.getComputedStyle(b)
                };

            function Oa(a, b, c) {
                var d, e, f, g, h = a.style;
                return (c = c || Na(a)) && ("" !== (g = c.getPropertyValue(b) || c[b]) || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && Ma.test(g) && La.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
            }

            function Pa(a, b) {
                return {
                    get: function() {
                        return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                    }
                }
            }! function() {
                function b() {
                    if (i) {
                        i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", ra.appendChild(h);
                        var b = a.getComputedStyle(i);
                        c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, ra.removeChild(h), i = null
                    }
                }
                var c, e, f, g, h = d.createElement("div"),
                    i = d.createElement("div");
                i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, {
                    pixelPosition: function() {
                        return b(), c
                    },
                    boxSizingReliable: function() {
                        return b(), e
                    },
                    pixelMarginRight: function() {
                        return b(), f
                    },
                    reliableMarginLeft: function() {
                        return b(), g
                    }
                }))
            }();
            var Qa = /^(none|table(?!-c[ea]).+)/,
                Ra = /^--/,
                Sa = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                Ta = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                Ua = ["Webkit", "Moz", "ms"],
                Va = d.createElement("div").style;

            function Xa(a) {
                var b = r.cssProps[a];
                return b || (b = r.cssProps[a] = function(a) {
                    if (a in Va) return a;
                    for (var b = a[0].toUpperCase() + a.slice(1), c = Ua.length; c--;)
                        if ((a = Ua[c] + b) in Va) return a
                }(a) || a), b
            }

            function Ya(a, b, c) {
                var d = ba.exec(b);
                return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
            }

            function Za(a, b, c, d, e) {
                var f, g = 0;
                for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) "margin" === c && (g += r.css(a, c + ca[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + ca[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + ca[f] + "Width", !0, e))) : (g += r.css(a, "padding" + ca[f], !0, e), "padding" !== c && (g += r.css(a, "border" + ca[f] + "Width", !0, e)));
                return g
            }

            function $a(a, b, c) {
                var d, e = Na(a),
                    f = Oa(a, b, e),
                    g = "border-box" === r.css(a, "boxSizing", !1, e);
                return Ma.test(f) ? f : (d = g && (o.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), (f = parseFloat(f) || 0) + Za(a, b, c || (g ? "border" : "content"), d, e) + "px")
            }

            function _a(a, b, c, d, e) {
                return new _a.prototype.init(a, b, c, d, e)
            }
            r.extend({
                cssHooks: {
                    opacity: {
                        get: function(a, b) {
                            if (b) {
                                var c = Oa(a, "opacity");
                                return "" === c ? "1" : c
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    float: "cssFloat"
                },
                style: function(a, b, c, d) {
                    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                        var e, f, g, h = r.camelCase(b),
                            i = Ra.test(b),
                            j = a.style;
                        return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b] : ("string" === (f = typeof c) && (e = ba.exec(c)) && e[1] && (c = fa(a, b, e), f = "number"), void(null != c && c == c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c))))
                    }
                },
                css: function(a, b, c, d) {
                    var e, f, g, h = r.camelCase(b);
                    return Ra.test(b) || (b = Xa(h)), (g = r.cssHooks[b] || r.cssHooks[h]) && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Oa(a, b, d)), "normal" === e && b in Ta && (e = Ta[b]), "" === c || c ? (f = parseFloat(e), !0 === c || isFinite(f) ? f || 0 : e) : e
                }
            }), r.each(["height", "width"], function(a, b) {
                r.cssHooks[b] = {
                    get: function(a, c, d) {
                        if (c) return !Qa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? $a(a, b, d) : ea(a, Sa, function() {
                            return $a(a, b, d)
                        })
                    },
                    set: function(a, c, d) {
                        var e, f = d && Na(a),
                            g = d && Za(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f);
                        return g && (e = ba.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Ya(0, c, g)
                    }
                }
            }), r.cssHooks.marginLeft = Pa(o.reliableMarginLeft, function(a, b) {
                if (b) return (parseFloat(Oa(a, "marginLeft")) || a.getBoundingClientRect().left - ea(a, {
                    marginLeft: 0
                }, function() {
                    return a.getBoundingClientRect().left
                })) + "px"
            }), r.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(a, b) {
                r.cssHooks[a + b] = {
                    expand: function(c) {
                        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + ca[d] + b] = f[d] || f[d - 2] || f[0];
                        return e
                    }
                }, La.test(a) || (r.cssHooks[a + b].set = Ya)
            }), r.fn.extend({
                css: function(a, b) {
                    return T(this, function(a, b, c) {
                        var d, e, f = {},
                            g = 0;
                        if (Array.isArray(b)) {
                            for (d = Na(a), e = b.length; g < e; g++) f[b[g]] = r.css(a, b[g], !1, d);
                            return f
                        }
                        return void 0 !== c ? r.style(a, b, c) : r.css(a, b)
                    }, a, b, 1 < arguments.length)
                }
            }), ((r.Tween = _a).prototype = {
                constructor: _a,
                init: function(a, b, c, d, e, f) {
                    this.elem = a, this.prop = c, this.easing = e || r.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (r.cssNumber[c] ? "" : "px")
                },
                cur: function() {
                    var a = _a.propHooks[this.prop];
                    return a && a.get ? a.get(this) : _a.propHooks._default.get(this)
                },
                run: function(a) {
                    var b, c = _a.propHooks[this.prop];
                    return this.options.duration ? this.pos = b = r.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : _a.propHooks._default.set(this), this
                }
            }).init.prototype = _a.prototype, (_a.propHooks = {
                _default: {
                    get: function(a) {
                        var b;
                        return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = r.css(a.elem, a.prop, "")) && "auto" !== b ? b : 0
                    },
                    set: function(a) {
                        r.fx.step[a.prop] ? r.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[r.cssProps[a.prop]] && !r.cssHooks[a.prop] ? a.elem[a.prop] = a.now : r.style(a.elem, a.prop, a.now + a.unit)
                    }
                }
            }).scrollTop = _a.propHooks.scrollLeft = {
                set: function(a) {
                    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                }
            }, r.easing = {
                linear: function(a) {
                    return a
                },
                swing: function(a) {
                    return .5 - Math.cos(a * Math.PI) / 2
                },
                _default: "swing"
            }, r.fx = _a.prototype.init, r.fx.step = {};
            var ab, bb, cb = /^(?:toggle|show|hide)$/,
                db = /queueHooks$/;

            function eb() {
                bb && (!1 === d.hidden && a.requestAnimationFrame ? a.requestAnimationFrame(eb) : a.setTimeout(eb, r.fx.interval), r.fx.tick())
            }

            function fb() {
                return a.setTimeout(function() {
                    ab = void 0
                }), ab = r.now()
            }

            function gb(a, b) {
                var c, d = 0,
                    e = {
                        height: a
                    };
                for (b = b ? 1 : 0; d < 4; d += 2 - b) e["margin" + (c = ca[d])] = e["padding" + c] = a;
                return b && (e.opacity = e.width = a), e
            }

            function hb(a, b, c) {
                for (var d, e = (kb.tweeners[b] || []).concat(kb.tweeners["*"]), f = 0, g = e.length; f < g; f++)
                    if (d = e[f].call(c, b, a)) return d
            }

            function kb(a, b, c) {
                var d, e, f = 0,
                    g = kb.prefilters.length,
                    h = r.Deferred().always(function() {
                        delete i.elem
                    }),
                    i = function() {
                        if (e) return !1;
                        for (var b = ab || fb(), c = Math.max(0, j.startTime + j.duration - b), f = 1 - (c / j.duration || 0), g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                        return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1)
                    },
                    j = h.promise({
                        elem: a,
                        props: r.extend({}, b),
                        opts: r.extend(!0, {
                            specialEasing: {},
                            easing: r.easing._default
                        }, c),
                        originalProperties: b,
                        originalOptions: c,
                        startTime: ab || fb(),
                        duration: c.duration,
                        tweens: [],
                        createTween: function(b, c) {
                            var d = r.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                            return j.tweens.push(d), d
                        },
                        stop: function(b) {
                            var c = 0,
                                d = b ? j.tweens.length : 0;
                            if (e) return this;
                            for (e = !0; c < d; c++) j.tweens[c].run(1);
                            return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                        }
                    }),
                    k = j.props;
                for (function(a, b) {
                        var c, d, e, f, g;
                        for (c in a)
                            if (e = b[d = r.camelCase(c)], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), (g = r.cssHooks[d]) && "expand" in g)
                                for (c in f = g.expand(f), delete a[d], f) c in a || (a[c] = f[c], b[c] = e);
                            else b[d] = e
                    }(k, j.opts.specialEasing); f < g; f++)
                    if (d = kb.prefilters[f].call(j, a, k, j.opts)) return r.isFunction(d.stop) && (r._queueHooks(j.elem, j.opts.queue).stop = r.proxy(d.stop, d)), d;
                return r.map(k, hb, j), r.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), r.fx.timer(r.extend(i, {
                    elem: a,
                    anim: j,
                    queue: j.opts.queue
                })), j
            }
            r.Animation = r.extend(kb, {
                    tweeners: {
                        "*": [function(a, b) {
                            var c = this.createTween(a, b);
                            return fa(c.elem, a, ba.exec(b), c), c
                        }]
                    },
                    tweener: function(a, b) {
                        r.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(L);
                        for (var c, d = 0, e = a.length; d < e; d++) c = a[d], kb.tweeners[c] = kb.tweeners[c] || [], kb.tweeners[c].unshift(b)
                    },
                    prefilters: [function(a, b, c) {
                        var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b,
                            m = this,
                            n = {},
                            o = a.style,
                            p = a.nodeType && da(a),
                            q = W.get(a, "fxshow");
                        for (d in c.queue || (null == (g = r._queueHooks(a, "fx")).unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function() {
                                g.unqueued || h()
                            }), g.unqueued++, m.always(function() {
                                m.always(function() {
                                    g.unqueued--, r.queue(a, "fx").length || g.empty.fire()
                                })
                            })), b)
                            if (e = b[d], cb.test(e)) {
                                if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                                    if ("show" !== e || !q || void 0 === q[d]) continue;
                                    p = !0
                                }
                                n[d] = q && q[d] || r.style(a, d)
                            }
                        if ((i = !r.isEmptyObject(b)) || !r.isEmptyObject(n))
                            for (d in l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], null == (j = q && q.display) && (j = W.get(a, "display")), "none" === (k = r.css(a, "display")) && (j ? k = j : (ia([a], !0), j = a.style.display || j, k = r.css(a, "display"), ia([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === r.css(a, "float") && (i || (m.done(function() {
                                    o.display = j
                                }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function() {
                                    o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
                                })), i = !1, n) i || (q ? "hidden" in q && (p = q.hidden) : q = W.access(a, "fxshow", {
                                display: j
                            }), f && (q.hidden = !p), p && ia([a], !0), m.done(function() {
                                for (d in p || ia([a]), W.remove(a, "fxshow"), n) r.style(a, d, n[d])
                            })), i = hb(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0))
                    }],
                    prefilter: function(a, b) {
                        b ? kb.prefilters.unshift(a) : kb.prefilters.push(a)
                    }
                }), r.speed = function(a, b, c) {
                    var d = a && "object" == typeof a ? r.extend({}, a) : {
                        complete: c || !c && b || r.isFunction(a) && a,
                        duration: a,
                        easing: c && b || b && !r.isFunction(b) && b
                    };
                    return r.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in r.fx.speeds ? d.duration = r.fx.speeds[d.duration] : d.duration = r.fx.speeds._default), null != d.queue && !0 !== d.queue || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                        r.isFunction(d.old) && d.old.call(this), d.queue && r.dequeue(this, d.queue)
                    }, d
                }, r.fn.extend({
                    fadeTo: function(a, b, c, d) {
                        return this.filter(da).css("opacity", 0).show().end().animate({
                            opacity: b
                        }, a, c, d)
                    },
                    animate: function(a, b, c, d) {
                        var e = r.isEmptyObject(a),
                            f = r.speed(b, c, d),
                            g = function() {
                                var b = kb(this, r.extend({}, a), f);
                                (e || W.get(this, "finish")) && b.stop(!0)
                            };
                        return g.finish = g, e || !1 === f.queue ? this.each(g) : this.queue(f.queue, g)
                    },
                    stop: function(a, b, c) {
                        var d = function(a) {
                            var b = a.stop;
                            delete a.stop, b(c)
                        };
                        return "string" != typeof a && (c = b, b = a, a = void 0), b && !1 !== a && this.queue(a || "fx", []), this.each(function() {
                            var b = !0,
                                e = null != a && a + "queueHooks",
                                f = r.timers,
                                g = W.get(this);
                            if (e) g[e] && g[e].stop && d(g[e]);
                            else
                                for (e in g) g[e] && g[e].stop && db.test(e) && d(g[e]);
                            for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                            !b && c || r.dequeue(this, a)
                        })
                    },
                    finish: function(a) {
                        return !1 !== a && (a = a || "fx"), this.each(function() {
                            var b, c = W.get(this),
                                d = c[a + "queue"],
                                e = c[a + "queueHooks"],
                                f = r.timers,
                                g = d ? d.length : 0;
                            for (c.finish = !0, r.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                            for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                            delete c.finish
                        })
                    }
                }), r.each(["toggle", "show", "hide"], function(a, b) {
                    var c = r.fn[b];
                    r.fn[b] = function(a, d, e) {
                        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e)
                    }
                }), r.each({
                    slideDown: gb("show"),
                    slideUp: gb("hide"),
                    slideToggle: gb("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(a, b) {
                    r.fn[a] = function(a, c, d) {
                        return this.animate(b, a, c, d)
                    }
                }), r.timers = [], r.fx.tick = function() {
                    var a, b = 0,
                        c = r.timers;
                    for (ab = r.now(); b < c.length; b++)(a = c[b])() || c[b] !== a || c.splice(b--, 1);
                    c.length || r.fx.stop(), ab = void 0
                }, r.fx.timer = function(a) {
                    r.timers.push(a), r.fx.start()
                }, r.fx.interval = 13, r.fx.start = function() {
                    bb || (bb = !0, eb())
                }, r.fx.stop = function() {
                    bb = null
                }, r.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, r.fn.delay = function(b, c) {
                    return b = r.fx && r.fx.speeds[b] || b, c = c || "fx", this.queue(c, function(c, d) {
                        var e = a.setTimeout(c, b);
                        d.stop = function() {
                            a.clearTimeout(e)
                        }
                    })
                },
                function() {
                    var a = d.createElement("input"),
                        c = d.createElement("select").appendChild(d.createElement("option"));
                    a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, (a = d.createElement("input")).value = "t", a.type = "radio", o.radioValue = "t" === a.value
                }();
            var lb, mb = r.expr.attrHandle;
            r.fn.extend({
                attr: function(a, b) {
                    return T(this, r.attr, a, b, 1 < arguments.length)
                },
                removeAttr: function(a) {
                    return this.each(function() {
                        r.removeAttr(this, a)
                    })
                }
            }), r.extend({
                attr: function(a, b, c) {
                    var d, e, f = a.nodeType;
                    if (3 !== f && 8 !== f && 2 !== f) return void 0 === a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? lb : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : null == (d = r.find.attr(a, b)) ? void 0 : d)
                },
                attrHooks: {
                    type: {
                        set: function(a, b) {
                            if (!o.radioValue && "radio" === b && B(a, "input")) {
                                var c = a.value;
                                return a.setAttribute("type", b), c && (a.value = c), b
                            }
                        }
                    }
                },
                removeAttr: function(a, b) {
                    var c, d = 0,
                        e = b && b.match(L);
                    if (e && 1 === a.nodeType)
                        for (; c = e[d++];) a.removeAttribute(c)
                }
            }), lb = {
                set: function(a, b, c) {
                    return !1 === b ? r.removeAttr(a, c) : a.setAttribute(c, c), c
                }
            }, r.each(r.expr.match.bool.source.match(/\w+/g), function(a, b) {
                var c = mb[b] || r.find.attr;
                mb[b] = function(a, b, d) {
                    var e, f, g = b.toLowerCase();
                    return d || (f = mb[g], mb[g] = e, e = null != c(a, b, d) ? g : null, mb[g] = f), e
                }
            });
            var nb = /^(?:input|select|textarea|button)$/i,
                ob = /^(?:a|area)$/i;

            function pb(a) {
                return (a.match(L) || []).join(" ")
            }

            function qb(a) {
                return a.getAttribute && a.getAttribute("class") || ""
            }
            r.fn.extend({
                prop: function(a, b) {
                    return T(this, r.prop, a, b, 1 < arguments.length)
                },
                removeProp: function(a) {
                    return this.each(function() {
                        delete this[r.propFix[a] || a]
                    })
                }
            }), r.extend({
                prop: function(a, b, c) {
                    var d, e, f = a.nodeType;
                    if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
                },
                propHooks: {
                    tabIndex: {
                        get: function(a) {
                            var b = r.find.attr(a, "tabindex");
                            return b ? parseInt(b, 10) : nb.test(a.nodeName) || ob.test(a.nodeName) && a.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }), o.optSelected || (r.propHooks.selected = {
                get: function(a) {
                    var b = a.parentNode;
                    return b && b.parentNode && b.parentNode.selectedIndex, null
                },
                set: function(a) {
                    var b = a.parentNode;
                    b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
                }
            }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                r.propFix[this.toLowerCase()] = this
            }), r.fn.extend({
                addClass: function(a) {
                    var b, c, d, e, f, g, h, i = 0;
                    if (r.isFunction(a)) return this.each(function(b) {
                        r(this).addClass(a.call(this, b, qb(this)))
                    });
                    if ("string" == typeof a && a)
                        for (b = a.match(L) || []; c = this[i++];)
                            if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
                                for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                                e !== (h = pb(d)) && c.setAttribute("class", h)
                            }
                    return this
                },
                removeClass: function(a) {
                    var b, c, d, e, f, g, h, i = 0;
                    if (r.isFunction(a)) return this.each(function(b) {
                        r(this).removeClass(a.call(this, b, qb(this)))
                    });
                    if (!arguments.length) return this.attr("class", "");
                    if ("string" == typeof a && a)
                        for (b = a.match(L) || []; c = this[i++];)
                            if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
                                for (g = 0; f = b[g++];)
                                    for (; - 1 < d.indexOf(" " + f + " ");) d = d.replace(" " + f + " ", " ");
                                e !== (h = pb(d)) && c.setAttribute("class", h)
                            }
                    return this
                },
                toggleClass: function(a, b) {
                    var c = typeof a;
                    return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function(c) {
                        r(this).toggleClass(a.call(this, c, qb(this), b), b)
                    }) : this.each(function() {
                        var b, d, e, f;
                        if ("string" === c)
                            for (d = 0, e = r(this), f = a.match(L) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                        else void 0 !== a && "boolean" !== c || ((b = qb(this)) && W.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || !1 === a ? "" : W.get(this, "__className__") || ""))
                    })
                },
                hasClass: function(a) {
                    var b, c, d = 0;
                    for (b = " " + a + " "; c = this[d++];)
                        if (1 === c.nodeType && -1 < (" " + pb(qb(c)) + " ").indexOf(b)) return !0;
                    return !1
                }
            });
            var rb = /\r/g;
            r.fn.extend({
                val: function(a) {
                    var b, c, d, e = this[0];
                    return arguments.length ? (d = r.isFunction(a), this.each(function(c) {
                        var e;
                        1 === this.nodeType && (null == (e = d ? a.call(this, c, r(this).val()) : a) ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = r.map(e, function(a) {
                            return null == a ? "" : a + ""
                        })), (b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()]) && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    })) : e ? (b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()]) && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : "string" == typeof(c = e.value) ? c.replace(rb, "") : null == c ? "" : c : void 0
                }
            }), r.extend({
                valHooks: {
                    option: {
                        get: function(a) {
                            var b = r.find.attr(a, "value");
                            return null != b ? b : pb(r.text(a))
                        }
                    },
                    select: {
                        get: function(a) {
                            var b, c, d, e = a.options,
                                f = a.selectedIndex,
                                g = "select-one" === a.type,
                                h = g ? null : [],
                                i = g ? f + 1 : e.length;
                            for (d = f < 0 ? i : g ? f : 0; d < i; d++)
                                if (((c = e[d]).selected || d === f) && !c.disabled && (!c.parentNode.disabled || !B(c.parentNode, "optgroup"))) {
                                    if (b = r(c).val(), g) return b;
                                    h.push(b)
                                }
                            return h
                        },
                        set: function(a, b) {
                            for (var c, d, e = a.options, f = r.makeArray(b), g = e.length; g--;)((d = e[g]).selected = -1 < r.inArray(r.valHooks.option.get(d), f)) && (c = !0);
                            return c || (a.selectedIndex = -1), f
                        }
                    }
                }
            }), r.each(["radio", "checkbox"], function() {
                r.valHooks[this] = {
                    set: function(a, b) {
                        if (Array.isArray(b)) return a.checked = -1 < r.inArray(r(a).val(), b)
                    }
                }, o.checkOn || (r.valHooks[this].get = function(a) {
                    return null === a.getAttribute("value") ? "on" : a.value
                })
            });
            var sb = /^(?:focusinfocus|focusoutblur)$/;
            r.extend(r.event, {
                trigger: function(b, c, e, f) {
                    var g, h, i, j, k, m, n, o = [e || d],
                        p = l.call(b, "type") ? b.type : b,
                        q = l.call(b, "namespace") ? b.namespace.split(".") : [];
                    if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !sb.test(p + r.event.triggered) && (-1 < p.indexOf(".") && (p = (q = p.split(".")).shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, (b = b[r.expando] ? b : new r.Event(p, "object" == typeof b && b)).isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || !1 !== n.trigger.apply(e, c))) {
                        if (!f && !n.noBubble && !r.isWindow(e)) {
                            for (j = n.delegateType || p, sb.test(j + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), i = h;
                            i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a)
                        }
                        for (g = 0;
                            (h = o[g++]) && !b.isPropagationStopped();) b.type = 1 < g ? j : n.bindType || p, (m = (W.get(h, "events") || {})[b.type] && W.get(h, "handle")) && m.apply(h, c), (m = k && h[k]) && m.apply && U(h) && (b.result = m.apply(h, c), !1 === b.result && b.preventDefault());
                        return b.type = p, f || b.isDefaultPrevented() || n._default && !1 !== n._default.apply(o.pop(), c) || !U(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && ((i = e[k]) && (e[k] = null), e[r.event.triggered = p](), r.event.triggered = void 0, i && (e[k] = i)), b.result
                    }
                },
                simulate: function(a, b, c) {
                    var d = r.extend(new r.Event, c, {
                        type: a,
                        isSimulated: !0
                    });
                    r.event.trigger(d, null, b)
                }
            }), r.fn.extend({
                trigger: function(a, b) {
                    return this.each(function() {
                        r.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function(a, b) {
                    var c = this[0];
                    if (c) return r.event.trigger(a, b, c, !0)
                }
            }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(a, b) {
                r.fn[b] = function(a, c) {
                    return 0 < arguments.length ? this.on(b, null, a, c) : this.trigger(b)
                }
            }), r.fn.extend({
                hover: function(a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                }
            }), o.focusin = "onfocusin" in a, o.focusin || r.each({
                focus: "focusin",
                blur: "focusout"
            }, function(a, b) {
                var c = function(a) {
                    r.event.simulate(b, a.target, r.event.fix(a))
                };
                r.event.special[b] = {
                    setup: function() {
                        var d = this.ownerDocument || this,
                            e = W.access(d, b);
                        e || d.addEventListener(a, c, !0), W.access(d, b, (e || 0) + 1)
                    },
                    teardown: function() {
                        var d = this.ownerDocument || this,
                            e = W.access(d, b) - 1;
                        e ? W.access(d, b, e) : (d.removeEventListener(a, c, !0), W.remove(d, b))
                    }
                }
            });
            var tb = a.location,
                ub = r.now(),
                vb = /\?/;
            r.parseXML = function(b) {
                var c;
                if (!b || "string" != typeof b) return null;
                try {
                    c = (new a.DOMParser).parseFromString(b, "text/xml")
                } catch (d) {
                    c = void 0
                }
                return c && !c.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + b), c
            };
            var wb = /\[\]$/,
                xb = /\r?\n/g,
                yb = /^(?:submit|button|image|reset|file)$/i,
                zb = /^(?:input|select|textarea|keygen)/i;

            function Ab(a, b, c, d) {
                var e;
                if (Array.isArray(b)) r.each(b, function(b, e) {
                    c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
                });
                else if (c || "object" !== r.type(b)) d(a, b);
                else
                    for (e in b) Ab(a + "[" + e + "]", b[e], c, d)
            }
            r.param = function(a, b) {
                var c, d = [],
                    e = function(a, b) {
                        var c = r.isFunction(b) ? b() : b;
                        d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c)
                    };
                if (Array.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function() {
                    e(this.name, this.value)
                });
                else
                    for (c in a) Ab(c, a[c], b, e);
                return d.join("&")
            }, r.fn.extend({
                serialize: function() {
                    return r.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var a = r.prop(this, "elements");
                        return a ? r.makeArray(a) : this
                    }).filter(function() {
                        var a = this.type;
                        return this.name && !r(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !ja.test(a))
                    }).map(function(a, b) {
                        var c = r(this).val();
                        return null == c ? null : Array.isArray(c) ? r.map(c, function(a) {
                            return {
                                name: b.name,
                                value: a.replace(xb, "\r\n")
                            }
                        }) : {
                            name: b.name,
                            value: c.replace(xb, "\r\n")
                        }
                    }).get()
                }
            });
            var Bb = /%20/g,
                Cb = /#.*$/,
                Db = /([?&])_=[^&]*/,
                Eb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                Gb = /^(?:GET|HEAD)$/,
                Hb = /^\/\//,
                Ib = {},
                Jb = {},
                Kb = "*/".concat("*"),
                Lb = d.createElement("a");

            function Mb(a) {
                return function(b, c) {
                    "string" != typeof b && (c = b, b = "*");
                    var d, e = 0,
                        f = b.toLowerCase().match(L) || [];
                    if (r.isFunction(c))
                        for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
                }
            }

            function Nb(a, b, c, d) {
                var e = {},
                    f = a === Jb;

                function g(h) {
                    var i;
                    return e[h] = !0, r.each(a[h] || [], function(a, h) {
                        var j = h(b, c, d);
                        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
                    }), i
                }
                return g(b.dataTypes[0]) || !e["*"] && g("*")
            }

            function Ob(a, b) {
                var c, d, e = r.ajaxSettings.flatOptions || {};
                for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
                return d && r.extend(!0, a, d), a
            }
            Lb.href = tb.href, r.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: tb.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(tb.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Kb,
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
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": r.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(a, b) {
                    return b ? Ob(Ob(a, r.ajaxSettings), b) : Ob(r.ajaxSettings, a)
                },
                ajaxPrefilter: Mb(Ib),
                ajaxTransport: Mb(Jb),
                ajax: function(b, c) {
                    "object" == typeof b && (c = b, b = void 0), c = c || {};
                    var e, f, g, h, i, j, k, l, m, n, o = r.ajaxSetup({}, c),
                        p = o.context || o,
                        q = o.context && (p.nodeType || p.jquery) ? r(p) : r.event,
                        s = r.Deferred(),
                        t = r.Callbacks("once memory"),
                        u = o.statusCode || {},
                        v = {},
                        w = {},
                        x = "canceled",
                        y = {
                            readyState: 0,
                            getResponseHeader: function(a) {
                                var b;
                                if (k) {
                                    if (!h)
                                        for (h = {}; b = Eb.exec(g);) h[b[1].toLowerCase()] = b[2];
                                    b = h[a.toLowerCase()]
                                }
                                return null == b ? null : b
                            },
                            getAllResponseHeaders: function() {
                                return k ? g : null
                            },
                            setRequestHeader: function(a, b) {
                                return null == k && (a = w[a.toLowerCase()] = w[a.toLowerCase()] || a, v[a] = b), this
                            },
                            overrideMimeType: function(a) {
                                return null == k && (o.mimeType = a), this
                            },
                            statusCode: function(a) {
                                var b;
                                if (a)
                                    if (k) y.always(a[y.status]);
                                    else
                                        for (b in a) u[b] = [u[b], a[b]];
                                return this
                            },
                            abort: function(a) {
                                var b = a || x;
                                return e && e.abort(b), A(0, b), this
                            }
                        };
                    if (s.promise(y), o.url = ((b || o.url || tb.href) + "").replace(Hb, tb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(L) || [""], null == o.crossDomain) {
                        j = d.createElement("a");
                        try {
                            j.href = o.url, j.href = j.href, o.crossDomain = Lb.protocol + "//" + Lb.host != j.protocol + "//" + j.host
                        } catch (z) {
                            o.crossDomain = !0
                        }
                    }
                    if (o.data && o.processData && "string" != typeof o.data && (o.data = r.param(o.data, o.traditional)), Nb(Ib, o, c, y), k) return y;
                    for (m in (l = r.event && o.global) && 0 == r.active++ && r.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Gb.test(o.type), f = o.url.replace(Cb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Bb, "+")) : (n = o.url.slice(f.length), o.data && (f += (vb.test(f) ? "&" : "?") + o.data, delete o.data), !1 === o.cache && (f = f.replace(Db, "$1"), n = (vb.test(f) ? "&" : "?") + "_=" + ub++ + n), o.url = f + n), o.ifModified && (r.lastModified[f] && y.setRequestHeader("If-Modified-Since", r.lastModified[f]), r.etag[f] && y.setRequestHeader("If-None-Match", r.etag[f])), (o.data && o.hasContent && !1 !== o.contentType || c.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Kb + "; q=0.01" : "") : o.accepts["*"]), o.headers) y.setRequestHeader(m, o.headers[m]);
                    if (o.beforeSend && (!1 === o.beforeSend.call(p, y, o) || k)) return y.abort();
                    if (x = "abort", t.add(o.complete), y.done(o.success), y.fail(o.error), e = Nb(Jb, o, c, y)) {
                        if (y.readyState = 1, l && q.trigger("ajaxSend", [y, o]), k) return y;
                        o.async && 0 < o.timeout && (i = a.setTimeout(function() {
                            y.abort("timeout")
                        }, o.timeout));
                        try {
                            k = !1, e.send(v, A)
                        } catch (z) {
                            if (k) throw z;
                            A(-1, z)
                        }
                    } else A(-1, "No Transport");

                    function A(b, c, d, h) {
                        var j, m, n, v, w, x = c;
                        k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", y.readyState = 0 < b ? 4 : 0, j = 200 <= b && b < 300 || 304 === b, d && (v = function(a, b, c) {
                            for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                                "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
                            if (d)
                                for (e in h)
                                    if (h[e] && h[e].test(d)) {
                                        i.unshift(e);
                                        break
                                    }
                            if (i[0] in c) f = i[0];
                            else {
                                for (e in c) {
                                    if (!i[0] || a.converters[e + " " + i[0]]) {
                                        f = e;
                                        break
                                    }
                                    g || (g = e)
                                }
                                f = f || g
                            }
                            if (f) return f !== i[0] && i.unshift(f), c[f]
                        }(o, y, d)), v = function(a, b, c, d) {
                            var e, f, g, h, i, j = {},
                                k = a.dataTypes.slice();
                            if (k[1])
                                for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
                            for (f = k.shift(); f;)
                                if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                                    if ("*" === f) f = i;
                                    else if ("*" !== i && i !== f) {
                                if (!(g = j[i + " " + f] || j["* " + f]))
                                    for (e in j)
                                        if ((h = e.split(" "))[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                            !0 === g ? g = j[e] : !0 !== j[e] && (f = h[0], k.unshift(h[1]));
                                            break
                                        }
                                if (!0 !== g)
                                    if (g && a.throws) b = g(b);
                                    else try {
                                        b = g(b)
                                    } catch (l) {
                                        return {
                                            state: "parsererror",
                                            error: g ? l : "No conversion from " + i + " to " + f
                                        }
                                    }
                            }
                            return {
                                state: "success",
                                data: b
                            }
                        }(o, v, y, j), j ? (o.ifModified && ((w = y.getResponseHeader("Last-Modified")) && (r.lastModified[f] = w), (w = y.getResponseHeader("etag")) && (r.etag[f] = w)), 204 === b || "HEAD" === o.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = v.state, m = v.data, j = !(n = v.error))) : (n = x, !b && x || (x = "error", b < 0 && (b = 0))), y.status = b, y.statusText = (c || x) + "", j ? s.resolveWith(p, [m, x, y]) : s.rejectWith(p, [y, x, n]), y.statusCode(u), u = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [y, o, j ? m : n]), t.fireWith(p, [y, x]), l && (q.trigger("ajaxComplete", [y, o]), --r.active || r.event.trigger("ajaxStop")))
                    }
                    return y
                },
                getJSON: function(a, b, c) {
                    return r.get(a, b, c, "json")
                },
                getScript: function(a, b) {
                    return r.get(a, void 0, b, "script")
                }
            }), r.each(["get", "post"], function(a, b) {
                r[b] = function(a, c, d, e) {
                    return r.isFunction(c) && (e = e || d, d = c, c = void 0), r.ajax(r.extend({
                        url: a,
                        type: b,
                        dataType: e,
                        data: c,
                        success: d
                    }, r.isPlainObject(a) && a))
                }
            }), r._evalUrl = function(a) {
                return r.ajax({
                    url: a,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    throws: !0
                })
            }, r.fn.extend({
                wrapAll: function(a) {
                    var b;
                    return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                        for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                        return a
                    }).append(this)), this
                },
                wrapInner: function(a) {
                    return r.isFunction(a) ? this.each(function(b) {
                        r(this).wrapInner(a.call(this, b))
                    }) : this.each(function() {
                        var b = r(this),
                            c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function(a) {
                    var b = r.isFunction(a);
                    return this.each(function(c) {
                        r(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function(a) {
                    return this.parent(a).not("body").each(function() {
                        r(this).replaceWith(this.childNodes)
                    }), this
                }
            }), r.expr.pseudos.hidden = function(a) {
                return !r.expr.pseudos.visible(a)
            }, r.expr.pseudos.visible = function(a) {
                return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
            }, r.ajaxSettings.xhr = function() {
                try {
                    return new a.XMLHttpRequest
                } catch (b) {}
            };
            var Rb = {
                    0: 200,
                    1223: 204
                },
                Sb = r.ajaxSettings.xhr();
            o.cors = !!Sb && "withCredentials" in Sb, o.ajax = Sb = !!Sb, r.ajaxTransport(function(b) {
                var c, d;
                if (o.cors || Sb && !b.crossDomain) return {
                    send: function(e, f) {
                        var g, h = b.xhr();
                        if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
                            for (g in b.xhrFields) h[g] = b.xhrFields[g];
                        for (g in b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) h.setRequestHeader(g, e[g]);
                        c = function(a) {
                            return function() {
                                c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Rb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
                                    binary: h.response
                                } : {
                                    text: h.responseText
                                }, h.getAllResponseHeaders()))
                            }
                        }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function() {
                            4 === h.readyState && a.setTimeout(function() {
                                c && d()
                            })
                        }, c = c("abort");
                        try {
                            h.send(b.hasContent && b.data || null)
                        } catch (i) {
                            if (c) throw i
                        }
                    },
                    abort: function() {
                        c && c()
                    }
                }
            }), r.ajaxPrefilter(function(a) {
                a.crossDomain && (a.contents.script = !1)
            }), r.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(a) {
                        return r.globalEval(a), a
                    }
                }
            }), r.ajaxPrefilter("script", function(a) {
                void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
            }), r.ajaxTransport("script", function(a) {
                var b, c;
                if (a.crossDomain) return {
                    send: function(e, f) {
                        b = r("<script>").prop({
                            charset: a.scriptCharset,
                            src: a.url
                        }).on("load error", c = function(a) {
                            b.remove(), c = null, a && f("error" === a.type ? 404 : 200, a.type)
                        }), d.head.appendChild(b[0])
                    },
                    abort: function() {
                        c && c()
                    }
                }
            });
            var Tb = [],
                Ub = /(=)\?(?=&|$)|\?\?/;
            r.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var a = Tb.pop() || r.expando + "_" + ub++;
                    return this[a] = !0, a
                }
            }), r.ajaxPrefilter("json jsonp", function(b, c, d) {
                var e, f, g, h = !1 !== b.jsonp && (Ub.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ub.test(b.data) && "data");
                if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = r.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Ub, "$1" + e) : !1 !== b.jsonp && (b.url += (vb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
                    return g || r.error(e + " was not called"), g[0]
                }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
                    g = arguments
                }, d.always(function() {
                    void 0 === f ? r(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Tb.push(e)), g && r.isFunction(f) && f(g[0]), g = f = void 0
                }), "script"
            }), o.createHTMLDocument = function() {
                var a = d.implementation.createHTMLDocument("").body;
                return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length
            }(), r.parseHTML = function(a, b, c) {
                return "string" != typeof a ? [] : ("boolean" == typeof b && (c = b, b = !1), b || (o.createHTMLDocument ? ((e = (b = d.implementation.createHTMLDocument("")).createElement("base")).href = d.location.href, b.head.appendChild(e)) : b = d), g = !c && [], (f = C.exec(a)) ? [b.createElement(f[1])] : (f = qa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes)));
                var e, f, g
            }, r.fn.load = function(a, b, c) {
                var d, e, f, g = this,
                    h = a.indexOf(" ");
                return -1 < h && (d = pb(a.slice(h)), a = a.slice(0, h)), r.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), 0 < g.length && r.ajax({
                    url: a,
                    type: e || "GET",
                    dataType: "html",
                    data: b
                }).done(function(a) {
                    f = arguments, g.html(d ? r("<div>").append(r.parseHTML(a)).find(d) : a)
                }).always(c && function(a, b) {
                    g.each(function() {
                        c.apply(this, f || [a.responseText, b, a])
                    })
                }), this
            }, r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
                r.fn[b] = function(a) {
                    return this.on(b, a)
                }
            }), r.expr.pseudos.animated = function(a) {
                return r.grep(r.timers, function(b) {
                    return a === b.elem
                }).length
            }, r.offset = {
                setOffset: function(a, b, c) {
                    var d, e, f, g, h, i, k = r.css(a, "position"),
                        l = r(a),
                        m = {};
                    "static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), ("absolute" === k || "fixed" === k) && -1 < (f + i).indexOf("auto") ? (g = (d = l.position()).top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
                }
            }, r.fn.extend({
                offset: function(a) {
                    if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                        r.offset.setOffset(this, a, b)
                    });
                    var b, c, d, e, f = this[0];
                    return f ? f.getClientRects().length ? (d = f.getBoundingClientRect(), c = (b = f.ownerDocument).documentElement, e = b.defaultView, {
                        top: d.top + e.pageYOffset - c.clientTop,
                        left: d.left + e.pageXOffset - c.clientLeft
                    }) : {
                        top: 0,
                        left: 0
                    } : void 0
                },
                position: function() {
                    if (this[0]) {
                        var a, b, c = this[0],
                            d = {
                                top: 0,
                                left: 0
                            };
                        return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), B(a[0], "html") || (d = a.offset()), d = {
                            top: d.top + r.css(a[0], "borderTopWidth", !0),
                            left: d.left + r.css(a[0], "borderLeftWidth", !0)
                        }), {
                            top: b.top - d.top - r.css(c, "marginTop", !0),
                            left: b.left - d.left - r.css(c, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var a = this.offsetParent; a && "static" === r.css(a, "position");) a = a.offsetParent;
                        return a || ra
                    })
                }
            }), r.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(a, b) {
                var c = "pageYOffset" === b;
                r.fn[a] = function(d) {
                    return T(this, function(a, d, e) {
                        var f;
                        return r.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
                    }, a, d, arguments.length)
                }
            }), r.each(["top", "left"], function(a, b) {
                r.cssHooks[b] = Pa(o.pixelPosition, function(a, c) {
                    if (c) return c = Oa(a, b), Ma.test(c) ? r(a).position()[b] + "px" : c
                })
            }), r.each({
                Height: "height",
                Width: "width"
            }, function(a, b) {
                r.each({
                    padding: "inner" + a,
                    content: b,
                    "": "outer" + a
                }, function(c, d) {
                    r.fn[d] = function(e, f) {
                        var g = arguments.length && (c || "boolean" != typeof e),
                            h = c || (!0 === e || !0 === f ? "margin" : "border");
                        return T(this, function(b, c, e) {
                            var f;
                            return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h)
                        }, b, g ? e : void 0, g)
                    }
                })
            }), r.fn.extend({
                bind: function(a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function(a, b) {
                    return this.off(a, null, b)
                },
                delegate: function(a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function(a, b, c) {
                    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                }
            }), r.holdReady = function(a) {
                a ? r.readyWait++ : r.ready(!0)
            }, r.isArray = Array.isArray, r.parseJSON = JSON.parse, r.nodeName = B, "function" == typeof define && define.amd && define("jquery", [], function() {
                return r
            });
            var Vb = a.jQuery,
                Wb = a.$;
            return r.noConflict = function(b) {
                return a.$ === r && (a.$ = Wb), b && a.jQuery === r && (a.jQuery = Vb), r
            }, b || (a.jQuery = a.$ = r), r
        }), jQuery.noConflict(),
        function(factory) {
            "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
        }(function($) {
            $.extend($.fn, {
                validate: function(options) {
                    if (this.length) {
                        var validator = $.data(this[0], "validator");
                        return validator || (this.attr("novalidate", "novalidate"), validator = new $.validator(options, this[0]), $.data(this[0], "validator", validator), validator.settings.onsubmit && (this.validateDelegate(":submit", "click", function(event) {
                            validator.settings.submitHandler && (validator.submitButton = event.target), $(event.target).hasClass("cancel") && (validator.cancelSubmit = !0), void 0 !== $(event.target).attr("formnovalidate") && (validator.cancelSubmit = !0)
                        }), this.submit(function(event) {
                            function handle() {
                                var hidden, result;
                                return !validator.settings.submitHandler || (validator.submitButton && (hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm)), result = validator.settings.submitHandler.call(validator, validator.currentForm, event), validator.submitButton && hidden.remove(), void 0 !== result && result)
                            }
                            return validator.settings.debug && event.preventDefault(), validator.cancelSubmit ? (validator.cancelSubmit = !1, handle()) : validator.form() ? validator.pendingRequest ? !(validator.formSubmitted = !0) : handle() : (validator.focusInvalid(), !1)
                        })), validator)
                    }
                    options && options.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
                },
                valid: function() {
                    var valid, validator;
                    return $(this[0]).is("form") ? valid = this.validate().form() : (valid = !0, validator = $(this[0].form).validate(), this.each(function() {
                        valid = validator.element(this) && valid
                    })), valid
                },
                removeAttrs: function(attributes) {
                    var result = {},
                        $element = this;
                    return $.each(attributes.split(/\s/), function(index, value) {
                        result[value] = $element.attr(value), $element.removeAttr(value)
                    }), result
                },
                rules: function(command, argument) {
                    var settings, staticRules, existingRules, data, param, filtered, element = this[0];
                    if (command) switch (staticRules = (settings = $.data(element.form, "validator").settings).rules, existingRules = $.validator.staticRules(element), command) {
                        case "add":
                            $.extend(existingRules, $.validator.normalizeRule(argument)), delete existingRules.messages, staticRules[element.name] = existingRules, argument.messages && (settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages));
                            break;
                        case "remove":
                            return argument ? (filtered = {}, $.each(argument.split(/\s/), function(index, method) {
                                filtered[method] = existingRules[method], delete existingRules[method], "required" === method && $(element).removeAttr("aria-required")
                            }), filtered) : (delete staticRules[element.name], existingRules)
                    }
                    return (data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element)).required && (param = data.required, delete data.required, data = $.extend({
                        required: param
                    }, data), $(element).attr("aria-required", "true")), data.remote && (param = data.remote, delete data.remote, data = $.extend(data, {
                        remote: param
                    })), data
                }
            }), $.extend($.expr[":"], {
                blank: function(a) {
                    return !$.trim("" + $(a).val())
                },
                filled: function(a) {
                    return !!$.trim("" + $(a).val())
                },
                unchecked: function(a) {
                    return !$(a).prop("checked")
                }
            }), $.validator = function(options, form) {
                this.settings = $.extend(!0, {}, $.validator.defaults, options), this.currentForm = form, this.init()
            }, $.validator.format = function(source, params) {
                return 1 === arguments.length ? function() {
                    var args = $.makeArray(arguments);
                    return args.unshift(source), $.validator.format.apply(this, args)
                } : (2 < arguments.length && params.constructor !== Array && (params = $.makeArray(arguments).slice(1)), params.constructor !== Array && (params = [params]), $.each(params, function(i, n) {
                    source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
                        return n
                    })
                }), source)
            }, $.extend($.validator, {
                defaults: {
                    messages: {},
                    groups: {},
                    rules: {},
                    errorClass: "error",
                    validClass: "valid",
                    errorElement: "label",
                    focusCleanup: !1,
                    focusInvalid: !0,
                    errorContainer: $([]),
                    errorLabelContainer: $([]),
                    onsubmit: !0,
                    ignore: ":hidden",
                    ignoreTitle: !1,
                    onfocusin: function(element) {
                        this.lastActive = element, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(element)))
                    },
                    onfocusout: function(element) {
                        this.checkable(element) || !(element.name in this.submitted) && this.optional(element) || this.element(element)
                    },
                    onkeyup: function(element, event) {
                        9 === event.which && "" === this.elementValue(element) || (element.name in this.submitted || element === this.lastElement) && this.element(element)
                    },
                    onclick: function(element) {
                        element.name in this.submitted ? this.element(element) : element.parentNode.name in this.submitted && this.element(element.parentNode)
                    },
                    highlight: function(element, errorClass, validClass) {
                        "radio" === element.type ? this.findByName(element.name).addClass(errorClass).removeClass(validClass) : $(element).addClass(errorClass).removeClass(validClass)
                    },
                    unhighlight: function(element, errorClass, validClass) {
                        "radio" === element.type ? this.findByName(element.name).removeClass(errorClass).addClass(validClass) : $(element).removeClass(errorClass).addClass(validClass)
                    }
                },
                setDefaults: function(settings) {
                    $.extend($.validator.defaults, settings)
                },
                messages: {
                    required: "This field is required.",
                    remote: "Please fix this field.",
                    email: "Please enter a valid email address.",
                    url: "Please enter a valid URL.",
                    date: "Please enter a valid date.",
                    dateISO: "Please enter a valid date ( ISO ).",
                    number: "Please enter a valid number.",
                    digits: "Please enter only digits.",
                    creditcard: "Please enter a valid credit card number.",
                    equalTo: "Please enter the same value again.",
                    maxlength: $.validator.format("Please enter no more than {0} characters."),
                    minlength: $.validator.format("Please enter at least {0} characters."),
                    rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
                    range: $.validator.format("Please enter a value between {0} and {1}."),
                    max: $.validator.format("Please enter a value less than or equal to {0}."),
                    min: $.validator.format("Please enter a value greater than or equal to {0}.")
                },
                autoCreateRanges: !1,
                prototype: {
                    init: function() {
                        this.labelContainer = $(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm), this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                        var rules, groups = this.groups = {};

                        function delegate(event) {
                            var validator = $.data(this[0].form, "validator"),
                                eventType = "on" + event.type.replace(/^validate/, ""),
                                settings = validator.settings;
                            settings[eventType] && !this.is(settings.ignore) && settings[eventType].call(validator, this[0], event)
                        }
                        $.each(this.settings.groups, function(key, value) {
                            "string" == typeof value && (value = value.split(/\s/)), $.each(value, function(index, name) {
                                groups[name] = key
                            })
                        }), rules = this.settings.rules, $.each(rules, function(key, value) {
                            rules[key] = $.validator.normalizeRule(value)
                        }), $(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", delegate).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate), this.settings.invalidHandler && $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                    },
                    form: function() {
                        return this.checkForm(), $.extend(this.submitted, this.errorMap), this.invalid = $.extend({}, this.errorMap), this.valid() || $(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                    },
                    checkForm: function() {
                        this.prepareForm();
                        for (var i = 0, elements = this.currentElements = this.elements(); elements[i]; i++) this.check(elements[i]);
                        return this.valid()
                    },
                    element: function(element) {
                        var cleanElement = this.clean(element),
                            checkElement = this.validationTargetFor(cleanElement),
                            result = !0;
                        return void 0 === (this.lastElement = checkElement) ? delete this.invalid[cleanElement.name] : (this.prepareElement(checkElement), this.currentElements = $(checkElement), (result = !1 !== this.check(checkElement)) ? delete this.invalid[checkElement.name] : this.invalid[checkElement.name] = !0), $(element).attr("aria-invalid", !result), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), result
                    },
                    showErrors: function(errors) {
                        if (errors) {
                            for (var name in $.extend(this.errorMap, errors), this.errorList = [], errors) this.errorList.push({
                                message: errors[name],
                                element: this.findByName(name)[0]
                            });
                            this.successList = $.grep(this.successList, function(element) {
                                return !(element.name in errors)
                            })
                        }
                        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                    },
                    resetForm: function() {
                        $.fn.resetForm && $(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
                    },
                    numberOfInvalids: function() {
                        return this.objectLength(this.invalid)
                    },
                    objectLength: function(obj) {
                        var i, count = 0;
                        for (i in obj) count++;
                        return count
                    },
                    hideErrors: function() {
                        this.hideThese(this.toHide)
                    },
                    hideThese: function(errors) {
                        errors.not(this.containers).text(""), this.addWrapper(errors).hide()
                    },
                    valid: function() {
                        return 0 === this.size()
                    },
                    size: function() {
                        return this.errorList.length
                    },
                    focusInvalid: function() {
                        if (this.settings.focusInvalid) try {
                            $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                        } catch (e) {}
                    },
                    findLastActive: function() {
                        var lastActive = this.lastActive;
                        return lastActive && 1 === $.grep(this.errorList, function(n) {
                            return n.element.name === lastActive.name
                        }).length && lastActive
                    },
                    elements: function() {
                        var validator = this,
                            rulesCache = {};
                        return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                            return !this.name && validator.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in rulesCache || !validator.objectLength($(this).rules())) && (rulesCache[this.name] = !0)
                        })
                    },
                    clean: function(selector) {
                        return $(selector)[0]
                    },
                    errors: function() {
                        var errorClass = this.settings.errorClass.split(" ").join(".");
                        return $(this.settings.errorElement + "." + errorClass, this.errorContext)
                    },
                    reset: function() {
                        this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = $([]), this.toHide = $([]), this.currentElements = $([])
                    },
                    prepareForm: function() {
                        this.reset(), this.toHide = this.errors().add(this.containers)
                    },
                    prepareElement: function(element) {
                        this.reset(), this.toHide = this.errorsFor(element)
                    },
                    elementValue: function(element) {
                        var val, $element = $(element),
                            type = element.type;
                        return "radio" === type || "checkbox" === type ? $("input[name='" + element.name + "']:checked").val() : "number" === type && void 0 !== element.validity ? !element.validity.badInput && $element.val() : "string" == typeof(val = $element.val()) ? val.replace(/\r/g, "") : val
                    },
                    check: function(element) {
                        element = this.validationTargetFor(this.clean(element));
                        var result, method, rule, rules = $(element).rules(),
                            rulesCount = $.map(rules, function(n, i) {
                                return i
                            }).length,
                            dependencyMismatch = !1,
                            val = this.elementValue(element);
                        for (method in rules) {
                            rule = {
                                method: method,
                                parameters: rules[method]
                            };
                            try {
                                if ("dependency-mismatch" === (result = $.validator.methods[method].call(this, val, element, rule.parameters)) && 1 === rulesCount) {
                                    dependencyMismatch = !0;
                                    continue
                                }
                                if (dependencyMismatch = !1, "pending" === result) return void(this.toHide = this.toHide.not(this.errorsFor(element)));
                                if (!result) return this.formatAndAdd(element, rule), !1
                            } catch (e) {
                                throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e), e
                            }
                        }
                        if (!dependencyMismatch) return this.objectLength(rules) && this.successList.push(element), !0
                    },
                    customDataMessage: function(element, method) {
                        return $(element).data("msg" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()) || $(element).data("msg")
                    },
                    customMessage: function(name, method) {
                        var m = this.settings.messages[name];
                        return m && (m.constructor === String ? m : m[method])
                    },
                    findDefined: function() {
                        for (var i = 0; i < arguments.length; i++)
                            if (void 0 !== arguments[i]) return arguments[i]
                    },
                    defaultMessage: function(element, method) {
                        return this.findDefined(this.customMessage(element.name, method), this.customDataMessage(element, method), !this.settings.ignoreTitle && element.title || void 0, $.validator.messages[method], "<strong>Warning: No message defined for " + element.name + "</strong>")
                    },
                    formatAndAdd: function(element, rule) {
                        var message = this.defaultMessage(element, rule.method),
                            theregex = /\$?\{(\d+)\}/g;
                        "function" == typeof message ? message = message.call(this, rule.parameters, element) : theregex.test(message) && (message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters)), this.errorList.push({
                            message: message,
                            element: element,
                            method: rule.method
                        }), this.errorMap[element.name] = message, this.submitted[element.name] = message
                    },
                    addWrapper: function(toToggle) {
                        return this.settings.wrapper && (toToggle = toToggle.add(toToggle.parent(this.settings.wrapper))), toToggle
                    },
                    defaultShowErrors: function() {
                        var i, elements, error;
                        for (i = 0; this.errorList[i]; i++) error = this.errorList[i], this.settings.highlight && this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass), this.showLabel(error.element, error.message);
                        if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                            for (i = 0; this.successList[i]; i++) this.showLabel(this.successList[i]);
                        if (this.settings.unhighlight)
                            for (i = 0, elements = this.validElements(); elements[i]; i++) this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                        this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                    },
                    validElements: function() {
                        return this.currentElements.not(this.invalidElements())
                    },
                    invalidElements: function() {
                        return $(this.errorList).map(function() {
                            return this.element
                        })
                    },
                    showLabel: function(element, message) {
                        var place, group, errorID, error = this.errorsFor(element),
                            elementID = this.idOrName(element),
                            describedBy = $(element).attr("aria-describedby");
                        error.length ? (error.removeClass(this.settings.validClass).addClass(this.settings.errorClass), error.html(message)) : (place = error = $("<" + this.settings.errorElement + ">").attr("id", elementID + "-error").addClass(this.settings.errorClass).html(message || ""), this.settings.wrapper && (place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(place) : this.settings.errorPlacement ? this.settings.errorPlacement(place, $(element)) : place.insertAfter(element), error.is("label") ? error.attr("for", elementID) : 0 === error.parents("label[for='" + elementID + "']").length && (errorID = error.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"), describedBy ? describedBy.match(new RegExp("\\b" + errorID + "\\b")) || (describedBy += " " + errorID) : describedBy = errorID, $(element).attr("aria-describedby", describedBy), (group = this.groups[element.name]) && $.each(this.groups, function(name, testgroup) {
                            testgroup === group && $("[name='" + name + "']", this.currentForm).attr("aria-describedby", error.attr("id"))
                        }))), !message && this.settings.success && (error.text(""), "string" == typeof this.settings.success ? error.addClass(this.settings.success) : this.settings.success(error, element)), this.toShow = this.toShow.add(error)
                    },
                    errorsFor: function(element) {
                        var name = this.idOrName(element),
                            describer = $(element).attr("aria-describedby"),
                            selector = "label[for='" + name + "'], label[for='" + name + "'] *";
                        return describer && (selector = selector + ", #" + describer.replace(/\s+/g, ", #")), this.errors().filter(selector)
                    },
                    idOrName: function(element) {
                        return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name)
                    },
                    validationTargetFor: function(element) {
                        return this.checkable(element) && (element = this.findByName(element.name)), $(element).not(this.settings.ignore)[0]
                    },
                    checkable: function(element) {
                        return /radio|checkbox/i.test(element.type)
                    },
                    findByName: function(name) {
                        return $(this.currentForm).find("[name='" + name + "']")
                    },
                    getLength: function(value, element) {
                        switch (element.nodeName.toLowerCase()) {
                            case "select":
                                return $("option:selected", element).length;
                            case "input":
                                if (this.checkable(element)) return this.findByName(element.name).filter(":checked").length
                        }
                        return value.length
                    },
                    depend: function(param, element) {
                        return !this.dependTypes[typeof param] || this.dependTypes[typeof param](param, element)
                    },
                    dependTypes: {
                        boolean: function(param) {
                            return param
                        },
                        string: function(param, element) {
                            return !!$(param, element.form).length
                        },
                        function: function(param, element) {
                            return param(element)
                        }
                    },
                    optional: function(element) {
                        var val = this.elementValue(element);
                        return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch"
                    },
                    startRequest: function(element) {
                        this.pending[element.name] || (this.pendingRequest++, this.pending[element.name] = !0)
                    },
                    stopRequest: function(element, valid) {
                        this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[element.name], valid && 0 === this.pendingRequest && this.formSubmitted && this.form() ? ($(this.currentForm).submit(), this.formSubmitted = !1) : !valid && 0 === this.pendingRequest && this.formSubmitted && ($(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                    },
                    previousValue: function(element) {
                        return $.data(element, "previousValue") || $.data(element, "previousValue", {
                            old: null,
                            valid: !0,
                            message: this.defaultMessage(element, "remote")
                        })
                    }
                },
                classRuleSettings: {
                    required: {
                        required: !0
                    },
                    email: {
                        email: !0
                    },
                    url: {
                        url: !0
                    },
                    date: {
                        date: !0
                    },
                    dateISO: {
                        dateISO: !0
                    },
                    number: {
                        number: !0
                    },
                    digits: {
                        digits: !0
                    },
                    creditcard: {
                        creditcard: !0
                    }
                },
                addClassRules: function(className, rules) {
                    className.constructor === String ? this.classRuleSettings[className] = rules : $.extend(this.classRuleSettings, className)
                },
                classRules: function(element) {
                    var rules = {},
                        classes = $(element).attr("class");
                    return classes && $.each(classes.split(" "), function() {
                        this in $.validator.classRuleSettings && $.extend(rules, $.validator.classRuleSettings[this])
                    }), rules
                },
                attributeRules: function(element) {
                    var method, value, rules = {},
                        $element = $(element),
                        type = element.getAttribute("type");
                    for (method in $.validator.methods) "required" === method ? ("" === (value = element.getAttribute(method)) && (value = !0), value = !!value) : value = $element.attr(method), /min|max/.test(method) && (null === type || /number|range|text/.test(type)) && (value = Number(value)), value || 0 === value ? rules[method] = value : type === method && "range" !== type && (rules[method] = !0);
                    return rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) && delete rules.maxlength, rules
                },
                dataRules: function(element) {
                    var method, value, rules = {},
                        $element = $(element);
                    for (method in $.validator.methods) void 0 !== (value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase())) && (rules[method] = value);
                    return rules
                },
                staticRules: function(element) {
                    var rules = {},
                        validator = $.data(element.form, "validator");
                    return validator.settings.rules && (rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {}), rules
                },
                normalizeRules: function(rules, element) {
                    return $.each(rules, function(prop, val) {
                        if (!1 !== val) {
                            if (val.param || val.depends) {
                                var keepRule = !0;
                                switch (typeof val.depends) {
                                    case "string":
                                        keepRule = !!$(val.depends, element.form).length;
                                        break;
                                    case "function":
                                        keepRule = val.depends.call(element, element)
                                }
                                keepRule ? rules[prop] = void 0 === val.param || val.param : delete rules[prop]
                            }
                        } else delete rules[prop]
                    }), $.each(rules, function(rule, parameter) {
                        rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter
                    }), $.each(["minlength", "maxlength"], function() {
                        rules[this] && (rules[this] = Number(rules[this]))
                    }), $.each(["rangelength", "range"], function() {
                        var parts;
                        rules[this] && ($.isArray(rules[this]) ? rules[this] = [Number(rules[this][0]), Number(rules[this][1])] : "string" == typeof rules[this] && (parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/), rules[this] = [Number(parts[0]), Number(parts[1])]))
                    }), $.validator.autoCreateRanges && (null != rules.min && null != rules.max && (rules.range = [rules.min, rules.max], delete rules.min, delete rules.max), null != rules.minlength && null != rules.maxlength && (rules.rangelength = [rules.minlength, rules.maxlength], delete rules.minlength, delete rules.maxlength)), rules
                },
                normalizeRule: function(data) {
                    if ("string" == typeof data) {
                        var transformed = {};
                        $.each(data.split(/\s/), function() {
                            transformed[this] = !0
                        }), data = transformed
                    }
                    return data
                },
                addMethod: function(name, method, message) {
                    $.validator.methods[name] = method, $.validator.messages[name] = void 0 !== message ? message : $.validator.messages[name], method.length < 3 && $.validator.addClassRules(name, $.validator.normalizeRule(name))
                },
                methods: {
                    required: function(value, element, param) {
                        if (!this.depend(param, element)) return "dependency-mismatch";
                        if ("select" === element.nodeName.toLowerCase()) {
                            var val = $(element).val();
                            return val && 0 < val.length
                        }
                        return this.checkable(element) ? 0 < this.getLength(value, element) : 0 < $.trim(value).length
                    },
                    email: function(value, element) {
                        return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
                    },
                    url: function(value, element) {
                        return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
                    },
                    date: function(value, element) {
                        return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString())
                    },
                    dateISO: function(value, element) {
                        return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
                    },
                    number: function(value, element) {
                        return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
                    },
                    digits: function(value, element) {
                        return this.optional(element) || /^\d+$/.test(value)
                    },
                    creditcard: function(value, element) {
                        if (this.optional(element)) return "dependency-mismatch";
                        if (/[^0-9 \-]+/.test(value)) return !1;
                        var n, cDigit, nCheck = 0,
                            nDigit = 0,
                            bEven = !1;
                        if ((value = value.replace(/\D/g, "")).length < 13 || 19 < value.length) return !1;
                        for (n = value.length - 1; 0 <= n; n--) cDigit = value.charAt(n), nDigit = parseInt(cDigit, 10), bEven && 9 < (nDigit *= 2) && (nDigit -= 9), nCheck += nDigit, bEven = !bEven;
                        return nCheck % 10 == 0
                    },
                    minlength: function(value, element, param) {
                        var length = $.isArray(value) ? value.length : this.getLength(value, element);
                        return this.optional(element) || param <= length
                    },
                    maxlength: function(value, element, param) {
                        var length = $.isArray(value) ? value.length : this.getLength(value, element);
                        return this.optional(element) || length <= param
                    },
                    rangelength: function(value, element, param) {
                        var length = $.isArray(value) ? value.length : this.getLength(value, element);
                        return this.optional(element) || length >= param[0] && length <= param[1]
                    },
                    min: function(value, element, param) {
                        return this.optional(element) || param <= value
                    },
                    max: function(value, element, param) {
                        return this.optional(element) || value <= param
                    },
                    range: function(value, element, param) {
                        return this.optional(element) || value >= param[0] && value <= param[1]
                    },
                    equalTo: function(value, element, param) {
                        var target = $(param);
                        return this.settings.onfocusout && target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                            $(element).valid()
                        }), value === target.val()
                    },
                    remote: function(value, element, param) {
                        if (this.optional(element)) return "dependency-mismatch";
                        var validator, data, previous = this.previousValue(element);
                        return this.settings.messages[element.name] || (this.settings.messages[element.name] = {}), previous.originalMessage = this.settings.messages[element.name].remote, this.settings.messages[element.name].remote = previous.message, param = "string" == typeof param && {
                            url: param
                        } || param, previous.old === value ? previous.valid : (previous.old = value, (validator = this).startRequest(element), (data = {})[element.name] = value, $.ajax($.extend(!0, {
                            url: param,
                            mode: "abort",
                            port: "validate" + element.name,
                            dataType: "json",
                            data: data,
                            context: validator.currentForm,
                            success: function(response) {
                                var errors, message, submitted, valid = !0 === response || "true" === response;
                                validator.settings.messages[element.name].remote = previous.originalMessage, valid ? (submitted = validator.formSubmitted, validator.prepareElement(element), validator.formSubmitted = submitted, validator.successList.push(element), delete validator.invalid[element.name], validator.showErrors()) : (errors = {}, message = response || validator.defaultMessage(element, "remote"), errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message, validator.invalid[element.name] = !0, validator.showErrors(errors)), previous.valid = valid, validator.stopRequest(element, valid)
                            }
                        }, param)), "pending")
                    }
                }
            }), $.format = function() {
                throw "$.format has been deprecated. Please use $.validator.format instead."
            };
            var ajax, pendingRequests = {};
            $.ajaxPrefilter ? $.ajaxPrefilter(function(settings, _, xhr) {
                var port = settings.port;
                "abort" === settings.mode && (pendingRequests[port] && pendingRequests[port].abort(), pendingRequests[port] = xhr)
            }) : (ajax = $.ajax, $.ajax = function(settings) {
                var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                    port = ("port" in settings ? settings : $.ajaxSettings).port;
                return "abort" === mode ? (pendingRequests[port] && pendingRequests[port].abort(), pendingRequests[port] = ajax.apply(this, arguments), pendingRequests[port]) : ajax.apply(this, arguments)
            }), $.extend($.fn, {
                validateDelegate: function(delegate, type, handler) {
                    return this.bind(type, function(event) {
                        var target = $(event.target);
                        if (target.is(delegate)) return handler.apply(target, arguments)
                    })
                }
            })
        }),
        function($) {
            "use strict";
            var Collapse = function(element, options) {
                this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
            };

            function getTargetFromTrigger($trigger) {
                var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
                return $(target)
            }

            function Plugin(option) {
                return this.each(function() {
                    var $this = $(this),
                        data = $this.data("bs.collapse"),
                        options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
                    !data && options.toggle && /show|hide/.test(option) && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]()
                })
            }
            Collapse.VERSION = "3.3.5", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {
                toggle: !0
            }, Collapse.prototype.dimension = function() {
                return this.$element.hasClass("width") ? "width" : "height"
            }, Collapse.prototype.show = function() {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var activesData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                    if (!(actives && actives.length && (activesData = actives.data("bs.collapse")) && activesData.transitioning)) {
                        var startEvent = $.Event("show.bs.collapse");
                        if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                            actives && actives.length && (Plugin.call(actives, "hide"), activesData || actives.data("bs.collapse", null));
                            var dimension = this.dimension();
                            this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                            var complete = function() {
                                this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                            };
                            if (!$.support.transition) return complete.call(this);
                            var scrollSize = $.camelCase(["scroll", dimension].join("-"));
                            this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
                        }
                    }
                }
            }, Collapse.prototype.hide = function() {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var startEvent = $.Event("hide.bs.collapse");
                    if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                        var dimension = this.dimension();
                        this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                        var complete = function() {
                            this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                        };
                        if (!$.support.transition) return complete.call(this);
                        this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)
                    }
                }
            }, Collapse.prototype.toggle = function() {
                this[this.$element.hasClass("in") ? "hide" : "show"]()
            }, Collapse.prototype.getParent = function() {
                return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
                    var $element = $(element);
                    this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
                }, this)).end()
            }, Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
                var isOpen = $element.hasClass("in");
                $element.attr("aria-expanded", isOpen), $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen)
            };
            var old = $.fn.collapse;
            $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
                return $.fn.collapse = old, this
            }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
                var $this = $(this);
                $this.attr("data-target") || e.preventDefault();
                var $target = getTargetFromTrigger($this),
                    option = $target.data("bs.collapse") ? "toggle" : $this.data();
                Plugin.call($target, option)
            })
        }(jQuery),
        function($) {
            "use strict";
            var Modal = function(element, options) {
                this.options = options, this.$body = $(document.body), this.$element = $(element), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
                    this.$element.trigger("loaded.bs.modal")
                }, this))
            };

            function Plugin(option, _relatedTarget) {
                return this.each(function() {
                    var $this = $(this),
                        data = $this.data("bs.modal"),
                        options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
                    data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget)
                })
            }
            Modal.VERSION = "3.3.5", Modal.TRANSITION_DURATION = 300, Modal.BACKDROP_TRANSITION_DURATION = 150, Modal.DEFAULTS = {
                backdrop: !0,
                keyboard: !0,
                show: !0
            }, Modal.prototype.toggle = function(_relatedTarget) {
                return this.isShown ? this.hide() : this.show(_relatedTarget)
            }, Modal.prototype.show = function(_relatedTarget) {
                var that = this,
                    e = $.Event("show.bs.modal", {
                        relatedTarget: _relatedTarget
                    });
                this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                    that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                        $(e.target).is(that.$element) && (that.ignoreBackdropClick = !0)
                    })
                }), this.backdrop(function() {
                    var transition = $.support.transition && that.$element.hasClass("fade");
                    that.$element.parent().length || that.$element.appendTo(that.$body), that.$element.show().scrollTop(0), that.adjustDialog(), transition && that.$element[0].offsetWidth, that.$element.addClass("in"), that.enforceFocus();
                    var e = $.Event("shown.bs.modal", {
                        relatedTarget: _relatedTarget
                    });
                    transition ? that.$dialog.one("bsTransitionEnd", function() {
                        that.$element.trigger("focus").trigger(e)
                    }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e)
                }))
            }, Modal.prototype.hide = function(e) {
                e && e.preventDefault(), e = $.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), $(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal())
            }, Modal.prototype.enforceFocus = function() {
                $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
                    this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
                }, this))
            }, Modal.prototype.escape = function() {
                this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
                    27 == e.which && this.hide()
                }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
            }, Modal.prototype.resize = function() {
                this.isShown ? $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this)) : $(window).off("resize.bs.modal")
            }, Modal.prototype.hideModal = function() {
                var that = this;
                this.$element.hide(), this.backdrop(function() {
                    that.$body.removeClass("modal-open"), that.resetAdjustments(), that.resetScrollbar(), that.$element.trigger("hidden.bs.modal")
                })
            }, Modal.prototype.removeBackdrop = function() {
                this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
            }, Modal.prototype.backdrop = function(callback) {
                var that = this,
                    animate = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var doAnimate = $.support.transition && animate;
                    if (this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                            this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
                        }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) return;
                    doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback()
                } else if (!this.isShown && this.$backdrop) {
                    this.$backdrop.removeClass("in");
                    var callbackRemove = function() {
                        that.removeBackdrop(), callback && callback()
                    };
                    $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove()
                } else callback && callback()
            }, Modal.prototype.handleUpdate = function() {
                this.adjustDialog()
            }, Modal.prototype.adjustDialog = function() {
                var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                this.$element.css({
                    paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
                    paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
                })
            }, Modal.prototype.resetAdjustments = function() {
                this.$element.css({
                    paddingLeft: "",
                    paddingRight: ""
                })
            }, Modal.prototype.checkScrollbar = function() {
                var fullWindowWidth = window.innerWidth;
                if (!fullWindowWidth) {
                    var documentElementRect = document.documentElement.getBoundingClientRect();
                    fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
                }
                this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth, this.scrollbarWidth = this.measureScrollbar()
            }, Modal.prototype.setScrollbar = function() {
                var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
                this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", bodyPad + this.scrollbarWidth)
            }, Modal.prototype.resetScrollbar = function() {
                this.$body.css("padding-right", this.originalBodyPad)
            }, Modal.prototype.measureScrollbar = function() {
                var scrollDiv = document.createElement("div");
                scrollDiv.className = "modal-scrollbar-measure", this.$body.append(scrollDiv);
                var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                return this.$body[0].removeChild(scrollDiv), scrollbarWidth
            };
            var old = $.fn.modal;
            $.fn.modal = Plugin, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
                return $.fn.modal = old, this
            }, $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
                var $this = $(this),
                    href = $this.attr("href"),
                    $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")),
                    option = $target.data("bs.modal") ? "toggle" : $.extend({
                        remote: !/#/.test(href) && href
                    }, $target.data(), $this.data());
                $this.is("a") && e.preventDefault(), $target.one("show.bs.modal", function(showEvent) {
                    showEvent.isDefaultPrevented() || $target.one("hidden.bs.modal", function() {
                        $this.is(":visible") && $this.trigger("focus")
                    })
                }), Plugin.call($target, option, this)
            })
        }(jQuery),
        function($) {
            "use strict";
            $.fn.emulateTransitionEnd = function(duration) {
                var called = !1,
                    $el = this;
                $(this).one("bsTransitionEnd", function() {
                    called = !0
                });
                return setTimeout(function() {
                    called || $($el).trigger($.support.transition.end)
                }, duration), this
            }, $(function() {
                $.support.transition = function() {
                    var el = document.createElement("bootstrap"),
                        transEndEventNames = {
                            WebkitTransition: "webkitTransitionEnd",
                            MozTransition: "transitionend",
                            OTransition: "oTransitionEnd otransitionend",
                            transition: "transitionend"
                        };
                    for (var name in transEndEventNames)
                        if (void 0 !== el.style[name]) return {
                            end: transEndEventNames[name]
                        };
                    return !1
                }(), $.support.transition && ($.event.special.bsTransitionEnd = {
                    bindType: $.support.transition.end,
                    delegateType: $.support.transition.end,
                    handle: function(e) {
                        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                    }
                })
            })
        }(jQuery),
        function(i) {
            "use strict";
            "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
        }(function(i) {
            "use strict";
            var e = window.Slick || {};
            (e = function() {
                var e = 0;
                return function(t, o) {
                    var s, n = this;
                    n.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: i(t),
                        appendDots: i(t),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(e, t) {
                            return i('<button type="button" />').text(t + 1)
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        focusOnChange: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnFocus: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rows: 1,
                        rtl: !1,
                        slide: "",
                        slidesPerRow: 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        useTransform: !0,
                        variableWidth: !1,
                        vertical: !1,
                        verticalSwiping: !1,
                        waitForAnimate: !0,
                        zIndex: 1e3
                    }, n.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        scrolling: !1,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        swiping: !1,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1
                    }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
                }
            }()).prototype.activateADA = function() {
                this.$slideTrack.find(".slick-active").attr({
                    "aria-hidden": "false"
                }).find("a, input, button, select").attr({
                    tabindex: "0"
                })
            }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
                var s = this;
                if ("boolean" == typeof t) o = t, t = null;
                else if (t < 0 || t >= s.slideCount) return !1;
                s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
                    i(t).attr("data-slick-index", e)
                }), s.$slidesCache = s.$slides, s.reinit()
            }, e.prototype.animateHeight = function() {
                var i = this;
                if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                    var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                    i.$list.animate({
                        height: e
                    }, i.options.speed)
                }
            }, e.prototype.animateSlide = function(e, t) {
                var o = {},
                    s = this;
                s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                    left: e
                }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
                    top: e
                }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
                    animStart: s.currentLeft
                }).animate({
                    animStart: e
                }, {
                    duration: s.options.speed,
                    easing: s.options.easing,
                    step: function(i) {
                        i = Math.ceil(i), !1 === s.options.vertical ? o[s.animType] = "translate(" + i + "px, 0px)" : o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o)
                    },
                    complete: function() {
                        t && t.call()
                    }
                })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
                    s.disableTransition(), t.call()
                }, s.options.speed))
            }, e.prototype.getNavTarget = function() {
                var t = this.options.asNavFor;
                return t && null !== t && (t = i(t).not(this.$slider)), t
            }, e.prototype.asNavFor = function(e) {
                var t = this.getNavTarget();
                null !== t && "object" == typeof t && t.each(function() {
                    var t = i(this).slick("getSlick");
                    t.unslicked || t.slideHandler(e, !0)
                })
            }, e.prototype.applyTransition = function(i) {
                var e = this,
                    t = {};
                !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
            }, e.prototype.autoPlay = function() {
                var i = this;
                i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
            }, e.prototype.autoPlayClear = function() {
                this.autoPlayTimer && clearInterval(this.autoPlayTimer)
            }, e.prototype.autoPlayIterator = function() {
                var i = this,
                    e = i.currentSlide + i.options.slidesToScroll;
                i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
            }, e.prototype.buildArrows = function() {
                var e = this;
                !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                }))
            }, e.prototype.buildDots = function() {
                var e, t, o = this;
                if (!0 === o.options.dots) {
                    for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                    o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
                }
            }, e.prototype.buildOut = function() {
                var e = this;
                e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                    i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
                }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
            }, e.prototype.buildRows = function() {
                var i, e, t, o, s, n, r, l = this;
                if (o = document.createDocumentFragment(), n = l.$slider.children(), 1 < l.options.rows) {
                    for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                        var d = document.createElement("div");
                        for (e = 0; e < l.options.rows; e++) {
                            var a = document.createElement("div");
                            for (t = 0; t < l.options.slidesPerRow; t++) {
                                var c = i * r + (e * l.options.slidesPerRow + t);
                                n.get(c) && a.appendChild(n.get(c))
                            }
                            d.appendChild(a)
                        }
                        o.appendChild(d)
                    }
                    l.$slider.empty().append(o), l.$slider.children().children().children().css({
                        width: 100 / l.options.slidesPerRow + "%",
                        display: "inline-block"
                    })
                }
            }, e.prototype.checkResponsive = function(e, t) {
                var o, s, n, r = this,
                    l = !1,
                    d = r.$slider.width(),
                    a = window.innerWidth || i(window).width();
                if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                    for (o in s = null, r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                    null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
                }
            }, e.prototype.changeSlide = function(e, t) {
                var o, s, r = this,
                    l = i(e.currentTarget);
                switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), o = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
                    case "previous":
                        s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                        break;
                    case "next":
                        s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                        break;
                    case "index":
                        var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                        r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                        break;
                    default:
                        return
                }
            }, e.prototype.checkNavigable = function(i) {
                var e, t;
                if (t = 0, i > (e = this.getNavigableIndexes())[e.length - 1]) i = e[e.length - 1];
                else
                    for (var o in e) {
                        if (i < e[o]) {
                            i = t;
                            break
                        }
                        t = e[o]
                    }
                return i
            }, e.prototype.cleanUpEvents = function() {
                var e = this;
                e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
            }, e.prototype.cleanUpSlideEvents = function() {
                var e = this;
                e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
            }, e.prototype.cleanUpRows = function() {
                var i, e = this;
                1 < e.options.rows && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
            }, e.prototype.clickHandler = function(i) {
                !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
            }, e.prototype.destroy = function(e) {
                var t = this;
                t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                    i(this).attr("style", i(this).data("originalStyling"))
                }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
            }, e.prototype.disableTransition = function(i) {
                var e = this,
                    t = {};
                t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
            }, e.prototype.fadeSlide = function(i, e) {
                var t = this;
                !1 === t.cssTransitions ? (t.$slides.eq(i).css({
                    zIndex: t.options.zIndex
                }), t.$slides.eq(i).animate({
                    opacity: 1
                }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
                    opacity: 1,
                    zIndex: t.options.zIndex
                }), e && setTimeout(function() {
                    t.disableTransition(i), e.call()
                }, t.options.speed))
            }, e.prototype.fadeSlideOut = function(i) {
                var e = this;
                !1 === e.cssTransitions ? e.$slides.eq(i).animate({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }))
            }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
                var e = this;
                null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
            }, e.prototype.focusHandler = function() {
                var e = this;
                e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
                    t.stopImmediatePropagation();
                    var o = i(this);
                    setTimeout(function() {
                        e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
                    }, 0)
                })
            }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
                return this.currentSlide
            }, e.prototype.getDotCount = function() {
                var i = this,
                    e = 0,
                    t = 0,
                    o = 0;
                if (!0 === i.options.infinite)
                    if (i.slideCount <= i.options.slidesToShow) ++o;
                    else
                        for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
                else if (!0 === i.options.centerMode) o = i.slideCount;
                else if (i.options.asNavFor)
                    for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
                else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
                return o - 1
            }, e.prototype.getLeft = function(i) {
                var e, t, o, s, n = this,
                    r = 0;
                return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (r = n.slideOffset = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
            }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
                return this.options[i]
            }, e.prototype.getNavigableIndexes = function() {
                var i, e = this,
                    t = 0,
                    o = 0,
                    s = [];
                for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                return s
            }, e.prototype.getSlick = function() {
                return this
            }, e.prototype.getSlideCount = function() {
                var e, t, o = this;
                return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
                    if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
                }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
            }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
                this.changeSlide({
                    data: {
                        message: "index",
                        index: parseInt(i)
                    }
                }, e)
            }, e.prototype.init = function(e) {
                var t = this;
                i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
            }, e.prototype.initADA = function() {
                var e = this,
                    t = Math.ceil(e.slideCount / e.options.slidesToShow),
                    o = e.getNavigableIndexes().filter(function(i) {
                        return 0 <= i && i < e.slideCount
                    });
                e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                    "aria-hidden": "true",
                    tabindex: "-1"
                }).find("a, input, button, select").attr({
                    tabindex: "-1"
                }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
                    var s = o.indexOf(t);
                    i(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + e.instanceUid + t,
                        tabindex: -1
                    }), -1 !== s && i(this).attr({
                        "aria-describedby": "slick-slide-control" + e.instanceUid + s
                    })
                }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
                    var n = o[s];
                    i(this).attr({
                        role: "presentation"
                    }), i(this).find("button").first().attr({
                        role: "tab",
                        id: "slick-slide-control" + e.instanceUid + s,
                        "aria-controls": "slick-slide" + e.instanceUid + n,
                        "aria-label": s + 1 + " of " + t,
                        "aria-selected": null,
                        tabindex: "-1"
                    })
                }).eq(e.currentSlide).find("button").attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }).end());
                for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
                e.activateADA()
            }, e.prototype.initArrowEvents = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
                    message: "previous"
                }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
            }, e.prototype.initDotEvents = function() {
                var e = this;
                !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
                    message: "index"
                }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
            }, e.prototype.initSlideEvents = function() {
                var e = this;
                e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
            }, e.prototype.initializeEvents = function() {
                var e = this;
                e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                    action: "start"
                }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                    action: "move"
                }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                    action: "end"
                }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                    action: "end"
                }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
            }, e.prototype.initUI = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
            }, e.prototype.keyHandler = function(i) {
                var e = this;
                i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                    data: {
                        message: !0 === e.options.rtl ? "next" : "previous"
                    }
                }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
                    data: {
                        message: !0 === e.options.rtl ? "previous" : "next"
                    }
                }))
            }, e.prototype.lazyLoad = function() {
                function e(e) {
                    i("img[data-lazy]", e).each(function() {
                        var e = i(this),
                            t = i(this).attr("data-lazy"),
                            o = i(this).attr("data-srcset"),
                            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                            r = document.createElement("img");
                        r.onload = function() {
                            e.animate({
                                opacity: 0
                            }, 100, function() {
                                o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                                    opacity: 1
                                }, 200, function() {
                                    e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                }), n.$slider.trigger("lazyLoaded", [n, e, t])
                            })
                        }, r.onerror = function() {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                        }, r.src = t
                    })
                }
                var t, o, s, n = this;
                if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (0 < o && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
                    for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
                e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
            }, e.prototype.loadSlider = function() {
                var i = this;
                i.setPosition(), i.$slideTrack.css({
                    opacity: 1
                }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
            }, e.prototype.next = e.prototype.slickNext = function() {
                this.changeSlide({
                    data: {
                        message: "next"
                    }
                })
            }, e.prototype.orientationChange = function() {
                this.checkResponsive(), this.setPosition()
            }, e.prototype.pause = e.prototype.slickPause = function() {
                this.autoPlayClear(), this.paused = !0
            }, e.prototype.play = e.prototype.slickPlay = function() {
                var i = this;
                i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
            }, e.prototype.postSlide = function(e) {
                var t = this;
                t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
            }, e.prototype.prev = e.prototype.slickPrev = function() {
                this.changeSlide({
                    data: {
                        message: "previous"
                    }
                })
            }, e.prototype.preventDefault = function(i) {
                i.preventDefault()
            }, e.prototype.progressiveLazyLoad = function(e) {
                e = e || 1;
                var t, o, s, n, r, l = this,
                    d = i("img[data-lazy]", l.$slider);
                d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
                    s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
                }, r.onerror = function() {
                    e < 3 ? setTimeout(function() {
                        l.progressiveLazyLoad(e + 1)
                    }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
                }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
            }, e.prototype.refresh = function(e) {
                var t, o, s = this;
                o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
                    currentSlide: t
                }), s.init(), e || s.changeSlide({
                    data: {
                        message: "index",
                        index: t
                    }
                }, !1)
            }, e.prototype.registerBreakpoints = function() {
                var e, t, o, s = this,
                    n = s.options.responsive || null;
                if ("array" === i.type(n) && n.length) {
                    for (e in s.respondTo = s.options.respondTo || "window", n)
                        if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                            for (t = n[e].breakpoint; 0 <= o;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                            s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                        }
                    s.breakpoints.sort(function(i, e) {
                        return s.options.mobileFirst ? i - e : e - i
                    })
                }
            }, e.prototype.reinit = function() {
                var e = this;
                e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
            }, e.prototype.resize = function() {
                var e = this;
                i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                    e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
                }, 50))
            }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
                var o = this;
                if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
                o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
            }, e.prototype.setCSS = function(i) {
                var e, t, o = this,
                    s = {};
                !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled || (!(s = {}) === o.cssTransitions ? s[o.animType] = "translate(" + e + ", " + t + ")" : s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"), o.$slideTrack.css(s)
            }, e.prototype.setDimensions = function() {
                var i = this;
                !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
                    padding: "0px " + i.options.centerPadding
                }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
                    padding: i.options.centerPadding + " 0px"
                })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
                var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
                !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
            }, e.prototype.setFade = function() {
                var e, t = this;
                t.$slides.each(function(o, s) {
                    e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                        position: "relative",
                        right: e,
                        top: 0,
                        zIndex: t.options.zIndex - 2,
                        opacity: 0
                    }) : i(s).css({
                        position: "relative",
                        left: e,
                        top: 0,
                        zIndex: t.options.zIndex - 2,
                        opacity: 0
                    })
                }), t.$slides.eq(t.currentSlide).css({
                    zIndex: t.options.zIndex - 1,
                    opacity: 1
                })
            }, e.prototype.setHeight = function() {
                var i = this;
                if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                    var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                    i.$list.css("height", e)
                }
            }, e.prototype.setOption = e.prototype.slickSetOption = function() {
                var e, t, o, s, n, r = this,
                    l = !1;
                if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
                else if ("multiple" === n) i.each(o, function(i, e) {
                    r.options[i] = e
                });
                else if ("responsive" === n)
                    for (t in s)
                        if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                        else {
                            for (e = r.options.responsive.length - 1; 0 <= e;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                            r.options.responsive.push(s[t])
                        }
                l && (r.unload(), r.reinit())
            }, e.prototype.setPosition = function() {
                var i = this;
                i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
            }, e.prototype.setProps = function() {
                var i = this,
                    e = document.body.style;
                i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
            }, e.prototype.setSlideClasses = function(i) {
                var e, t, o, s, n = this;
                if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
                    var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                    e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (e <= i && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
                } else 0 <= i && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
                "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
            }, e.prototype.setupInfinite = function() {
                var e, t, o, s = this;
                if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
                    for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                    for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                    s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                        i(this).attr("id", "")
                    })
                }
            }, e.prototype.interrupt = function(i) {
                i || this.autoPlay(), this.interrupted = i
            }, e.prototype.selectHandler = function(e) {
                var t = this,
                    o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
                    s = parseInt(o.attr("data-slick-index"));
                s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
            }, e.prototype.slideHandler = function(i, e, t) {
                var o, s, n, r, l, d = null,
                    a = this;
                if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
                    if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                        a.postSlide(o)
                    }) : a.postSlide(o));
                    else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
                else {
                    if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                        a.postSlide(s)
                    })) : a.postSlide(s), void a.animateHeight();
                    !0 !== t ? a.animateSlide(d, function() {
                        a.postSlide(s)
                    }) : a.postSlide(s)
                }
            }, e.prototype.startLoad = function() {
                var i = this;
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
            }, e.prototype.swipeDirection = function() {
                var i, e, t, o, s = this;
                return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && 0 <= o ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && 315 <= o ? !1 === s.options.rtl ? "left" : "right" : 135 <= o && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? 35 <= o && o <= 135 ? "down" : "up" : "vertical"
            }, e.prototype.swipeEnd = function(i) {
                var e, t, o = this;
                if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1;
                if (o.interrupted = !1, o.shouldClick = !(10 < o.touchObject.swipeLength), void 0 === o.touchObject.curX) return !1;
                if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                    switch (t = o.swipeDirection()) {
                        case "left":
                        case "down":
                            e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                            break;
                        case "right":
                        case "up":
                            e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
                    }
                    "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
                } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
            }, e.prototype.swipeHandler = function(i) {
                var e = this;
                if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i)
                }
            }, e.prototype.swipeMove = function(i) {
                var e, t, o, s, n, r, l = this;
                return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && 4 < r ? !(l.scrolling = !0) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && 4 < l.touchObject.swipeLength && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, (l.touchObject.edgeHit = !1) === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
            }, e.prototype.swipeStart = function(i) {
                var e, t = this;
                if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return !(t.touchObject = {});
                void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
            }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
                var i = this;
                null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
            }, e.prototype.unload = function() {
                var e = this;
                i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
            }, e.prototype.unslick = function(i) {
                var e = this;
                e.$slider.trigger("unslick", [e, i]), e.destroy()
            }, e.prototype.updateArrows = function() {
                var i = this;
                Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
            }, e.prototype.updateDots = function() {
                var i = this;
                null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
            }, e.prototype.visibility = function() {
                var i = this;
                i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
            }, i.fn.slick = function() {
                var i, t, o = this,
                    s = arguments[0],
                    n = Array.prototype.slice.call(arguments, 1),
                    r = o.length;
                for (i = 0; i < r; i++)
                    if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
                return o
            }
        }),
        function($) {
            $(function() {
                $("#storeSuggestion").appendTo("body");
                var displayStoreChangeSuggestion = function(storeId) {
                        var modal = $("#storeSuggestion");
                        if (storeId in storeSwitcher.countries && storeSwitcher.currentStoreId in storeSwitcher.countries && modal.length) {
                            if (modal.find(".name-better-store").text(storeSwitcher.countries[storeId].name), modal.find(".name_to-current-store").text(storeSwitcher.countries[storeSwitcher.currentStoreId].name_to), modal.find(".name_in-better-store").text(storeSwitcher.countries[storeId].name_in), modal.find(".url-current-store").text(storeSwitcher.countries[storeSwitcher.currentStoreId].human_url), modal.find(".url-better-store").text(storeSwitcher.countries[storeId].human_url), modal.find(".link-better-store").attr("href", storeSwitcher.localeSiblingUrls[storeId]).addClass(storeSwitcher.countries[storeId].code), modal.find(".flag-better-store").attr("src", storeSwitcher.flagUrls[storeId]), modal.find(".url-better-store").text(storeSwitcher.countries[storeId].base_url), modal.find("#betterStoreSprite")) {
                                var websiteCode = storeSwitcher.countries[storeId].code.slice(-2);
                                $("#betterStoreSprite").addClass("sprite-ico-store-" + websiteCode)
                            } else if (modal.find(".img-better-store")) {
                                var imgSrc = modal.find(".img-better-store").attr("src").replace("xx_xx", storeSwitcher.countries[storeId].code);
                                modal.find(".img-better-store").attr("src", imgSrc)
                            }
                            modal.modal("show")
                        }
                    },
                    autoRedirectToStore = function(storeId) {
                        window.location = storeSwitcher.localeSiblingUrls[storeId]
                    },
                    getHashParams = function() {
                        for (var e, hashParams = {}, a = /\+/g, r = /([^&;=]+)=?([^&;]*)/g, d = function(s) {
                                return decodeURIComponent(s.replace(a, " "))
                            }, q = window.location.hash.substring(1); e = r.exec(q);) hashParams[d(e[1])] = d(e[2]);
                        return hashParams
                    },
                    saveStoreSelectionInAllStores = function() {
                        $("body").append(storeSwitcher.storeSavingImages), storeSwitcher.lastSelectedStoreId = storeSwitcher.currentStoreId
                    },
                    removeHash = function() {
                        var scrollV, scrollH, loc = window.location;
                        "pushState" in history ? history.replaceState("", document.title, loc.pathname + loc.search) : (scrollV = document.body.scrollTop, scrollH = document.body.scrollLeft, loc.hash = "", document.body.scrollTop = scrollV, document.body.scrollLeft = scrollH)
                    };
                ! function() {
                    if ("saveStore" in getHashParams() && (saveStoreSelectionInAllStores(), setTimeout(function() {
                            removeHash()
                        }, 500)), $("#storeSuggestion").on("hidden.bs.modal", function() {
                            saveStoreSelectionInAllStores()
                        }), storeSwitcher.lastSelectedStoreId) return storeSwitcher.lastSelectedStoreId = parseInt(storeSwitcher.lastSelectedStoreId), storeSwitcher.currentStoreId === storeSwitcher.lastSelectedStoreId || (storeSwitcher.shouldAutoRedirect ? setTimeout(function() {
                        autoRedirectToStore(storeSwitcher.lastSelectedStoreId)
                    }, 500) : displayStoreChangeSuggestion(storeSwitcher.lastSelectedStoreId));
                    $(document).on("mapped_store_id", function(event, mapped_store_id) {
                        var httpAcceptStoreId = parseInt(mapped_store_id);
                        httpAcceptStoreId === storeSwitcher.currentStoreId || (storeSwitcher.shouldAutoRedirect ? autoRedirectToStore(httpAcceptStoreId) : displayStoreChangeSuggestion(httpAcceptStoreId))
                    })
                }()
            })
        }(jQuery);
    var rafDetect = navigator.userAgent.toLowerCase(),
        rafOS, rafBrowser, rafVersion, rafTotal, rafThestring, referafriendObject;

    function rafGetBrowserInfo() {
        rafCheckIt("konqueror") ? (rafBrowser = "Konqueror", rafOS = "Linux") : rafCheckIt("safari") ? rafBrowser = "Safari" : rafCheckIt("omniweb") ? rafBrowser = "OmniWeb" : rafCheckIt("opera") ? rafBrowser = "Opera" : rafCheckIt("webtv") ? rafBrowser = "WebTV" : rafCheckIt("icab") ? rafBrowser = "iCab" : rafCheckIt("msie") ? rafBrowser = "Internet Explorer" : rafCheckIt("compatible") ? rafBrowser = "An unknown browser" : (rafBrowser = "Netscape Navigator", rafVersion = rafDetect.charAt(8)), rafVersion || (rafVersion = rafDetect.charAt(place + rafThestring.length)), rafOS || (rafOS = rafCheckIt("linux") ? "Linux" : rafCheckIt("x11") ? "Unix" : rafCheckIt("mac") ? "Mac" : rafCheckIt("win") ? "Windows" : "an unknown operating system")
    }

    function rafCheckIt(string) {
        return place = rafDetect.indexOf(string) + 1, rafThestring = string, place
    }
    Event.observe(window, "load", rafGetBrowserInfo, !1);
    var Referafriend = Class.create();

    function addReferafriendMarkup() {
        bod = document.getElementsByTagName("body")[0], overlay = document.createElement("div"), overlay.id = "referafriend-overlay", raf = document.createElement("div"), raf.id = "referafriend", raf.className = "loading", raf.innerHTML = '<div id="rafLoadMessage"><p>Loading</p></div>', bod.appendChild(overlay), bod.appendChild(raf)
    }
    Referafriend.prototype = {
        yPos: 0,
        xPos: 0,
        isLoaded: !1,
        initialize: function(ctrl, url) {
            this.content = url || ctrl.href, referafriendObject = this, ctrl.observe("click", function(event) {
                this.activate(), Event.stop(event)
            }.bind(this)), $("referafriend").hide().observe("click", function(event) {
                event.target === event.currentTarget && referafriendObject.deactivate()
            }), $("referafriend-overlay").observe("click", function(event) {
                this.deactivate()
            }.bind(this))
        },
        activate: function() {
            "Internet Explorer" == rafBrowser && (this.getScroll(), this.prepareIE("100%", "hidden"), this.setScroll(0, 0), this.hideSelects("hidden")), this.displayReferafriend("block")
        },
        prepareIE: function(height, overflow) {
            bod = document.getElementsByTagName("body")[0], bod.style.height = height, bod.style.overflow = overflow, htm = document.getElementsByTagName("html")[0], htm.style.height = height, htm.style.overflow = overflow
        },
        hideSelects: function(visibility) {
            for (selects = document.getElementsByTagName("select"), i = 0; i < selects.length; i++) selects[i].style.visibility = visibility
        },
        getScroll: function() {
            self.pageYOffset ? this.yPos = self.pageYOffset : document.documentElement && document.documentElement.scrollTop ? this.yPos = document.documentElement.scrollTop : document.body && (this.yPos = document.body.scrollTop)
        },
        setScroll: function(x, y) {
            window.scrollTo(x, y)
        },
        displayReferafriend: function(display) {
            $("referafriend-overlay").style.display = display, "none" != ($("referafriend").style.display = display) && this.loadInfo()
        },
        loadInfo: function() {
            jQuery("#referafriend").removeClass("done"), jQuery("#referafriend").addClass("loading");
            new Ajax.Request(this.content, {
                method: "post",
                parameters: "",
                onComplete: this.processInfo.bindAsEventListener(this)
            })
        },
        processInfo: function(response) {
            var json = JSON.parse(response.responseText);
            $("rafContent").update(json.content), jQuery("#referafriend").removeClass("loading"), jQuery("#referafriend").addClass("done"), this.isLoaded = !0, this.actions(), $("referafriend-btn-close").observe("click", function(event) {
                this.deactivate()
            }.bind(this))
        },
        actions: function() {
            rafActions = $$("rafAction")
        },
        deactivate: function() {
            "Internet Explorer" == rafBrowser && (this.setScroll(0, this.yPos), this.prepareIE("auto", "auto"), this.hideSelects("visible")), this.displayReferafriend("none")
        }
    };
    var ReferafriendForm = Class.create();
    ReferafriendForm.prototype = {
        initialize: function(form) {
            this.form = form, $(this.form) && (this.sendUrl = $(this.form).action, $(this.form).observe("submit", function(event) {
                this.send(), Event.stop(event)
            }.bind(this))), this.loadWaiting = !1, this.validator = new Validation(this.form), this.onSuccess = this.success.bindAsEventListener(this), this.onComplete = this.resetLoadWaiting.bindAsEventListener(this), this.onFailure = this.resetLoadWaiting.bindAsEventListener(this);
            var container = $("invite-login-container");
            container && "none" == container.style.display && this._disableEnableAll(container, !0)
        },
        send: function() {
            if (!this.validator.validate()) return !1;
            this.setLoadWaiting(!0);
            new Ajax.Request(this.sendUrl, {
                method: "post",
                onComplete: this.onComplete,
                onSuccess: this.onSuccess,
                onFailure: this.onFailure,
                parameters: Form.serialize(this.form)
            })
        },
        success: function(transport) {
            if (this.resetLoadWaiting(transport), transport && transport.responseText) {
                var json = JSON.parse(transport.responseText);
                $("rafContent").update(json.content), $("referafriend-btn-close").observe("click", function(event) {
                    this.deactivate()
                }.bind(referafriendObject))
            }
            var event = jQuery.Event("raf_invite_action_success");
            return event.responseText = transport.responseText, event.referafriendObject = referafriendObject, jQuery(window).trigger(event), !1
        },
        _disableEnableAll: function(element, isDisabled) {
            var descendants = element.descendants();
            for (var k in descendants) descendants[k].disabled = isDisabled;
            element.disabled = isDisabled
        },
        setLoadWaiting: function(isDisabled) {
            var container = $("invite-button-container");
            isDisabled ? (container.setStyle({
                opacity: .5
            }), this._disableEnableAll(container, !0), Element.show("invite-please-wait"), this.loadWaiting = !0) : (container.setStyle({
                opacity: 1
            }), this._disableEnableAll(container, !1), Element.hide("invite-please-wait"), this.loadWaiting = !1)
        },
        resetLoadWaiting: function(transport) {
            this.setLoadWaiting(!1)
        }
    };
    var ReturnForm = {
        container: null,
        form: null,
        errorContainer: null,
        init: function() {
            this.container = jQuery("#return_form"), this.form = this.container.find("form:first-of-type"), this.errorContainer = this.container.find(".messages:first-child"), this.bindEvents()
        },
        bindEvents: function() {
            var self = this;
            this.form.bind("submit", function(event) {
                event.preventDefault(), self.errorContainer.hide(), jQuery(this).valid() && (self.loading(), jQuery.post(jQuery(this).attr("action"), jQuery(this).serialize(), self.success).fail(self.failed))
            })
        },
        success: function(data) {
            var self = ReturnForm,
                response = JSON.parse(data);
            self.stopLoading(), 0 == response.error ? self.container.html(response.content) : self.error(response.content)
        },
        failed: function(data) {
            var self = ReturnForm;
            self.stopLoading(), self.error(data.statusText)
        },
        error: function(message) {
            this.form.show(), this.errorContainer.show(), this.errorContainer.removeClass("hide"), this.errorContainer.find("span:first-of-type").html(message)
        },
        loading: function() {
            this.form.hide(), this.container.append('<div class="loading-ajax">&nbsp;</div>')
        },
        stopLoading: function() {
            this.container.find(".loading-ajax").remove()
        }
    };
    ! function(window) {
        var listener, jqProto, _val, $ = window.jQuery || window.angular.element,
            rootElement = window.document.documentElement,
            $rootElement = $(rootElement);
        return addGlobalEventListener("change", markValue), listener = markValue, jqProto = (window.jQuery || window.angular.element).prototype, _val = jqProto.val, jqProto.val = function(newValue) {
            var res = _val.apply(this, arguments);
            return 0 < arguments.length && function(arr, listener) {
                if (arr.forEach) return arr.forEach(listener);
                var i;
                for (i = 0; i < arr.length; i++) listener(arr[i])
            }(this, function(el) {
                listener(el, newValue)
            }), res
        }, $.prototype.checkAndTriggerAutoFillEvent = function() {
            var i, el;
            for (i = 0; i < this.length; i++) valueMarked(el = this[i]) || (markValue(el), triggerChangeEvent(el))
        }, addGlobalEventListener("blur", function(target) {
            window.setTimeout(function() {
                (function(el) {
                    for (; el;) {
                        if ("FORM" === el.nodeName) return $(el);
                        el = el.parentNode
                    }
                    return $()
                })(target).find("input").checkAndTriggerAutoFillEvent()
            }, 20)
        }), window.document.addEventListener("DOMContentLoaded", function() {
            window.setTimeout(function() {
                $rootElement.find("input").checkAndTriggerAutoFillEvent()
            }, 200)
        }, !1);

        function valueMarked(el) {
            var val = el.value,
                $$currentValue = el.$$currentValue;
            return !val && !$$currentValue || val === $$currentValue
        }

        function markValue(el) {
            el.$$currentValue = el.value
        }

        function addGlobalEventListener(eventName, listener) {
            rootElement.addEventListener(eventName, function(event) {
                var target = event.target;
                listener(target)
            }, !0)
        }

        function triggerChangeEvent(element) {
            var event = window.document.createEvent("HTMLEvents");
            event.initEvent("change blur", !0, !0), element.dispatchEvent(event)
        }
    }(window),
    function() {
        var initializing = !1,
            fnTest = /xyz/.test(function() {
                xyz
            }) ? /\b_super\b/ : /.*/;
        this.foodspringClass = function() {}, foodspringClass.extend = function(prop) {
            var _super = this.prototype;
            initializing = !0;
            var prototype = new this;
            for (var name in initializing = !1, prop) prototype[name] = "function" == typeof prop[name] && "function" == typeof _super[name] && fnTest.test(prop[name]) ? function(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    return this._super = tmp, ret
                }
            }(name, prop[name]) : prop[name];

            function foodspringClass() {
                !initializing && this.init && this.init.apply(this, arguments)
            }
            return ((foodspringClass.prototype = prototype).constructor = foodspringClass).extend = arguments.callee, foodspringClass
        }
    }(), "function" != typeof Function.prototype.bind && (Function.prototype.bind = function(obj, args, appendArgs) {
            var method = this;
            return function() {
                var callArgs = args || arguments;
                if (!0 === appendArgs) callArgs = (callArgs = Array.prototype.slice.call(arguments, 0)).concat(args);
                else if ("number" == typeof v) {
                    callArgs = Array.prototype.slice.call(arguments, 0);
                    var applyArgs = [appendArgs, 0].concat(args);
                    Array.prototype.splice.apply(callArgs, applyArgs)
                }
                return method.apply(obj || window, callArgs)
            }
        }),
        function() {
            "use strict";
            for (var method = "", noop = function() {}, console = window.console = window.console || {}, methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"], length = methods.length; length--;) console[method = methods[length]] || (console[method] = noop)
        }();
    var _default = {
        namespace: function() {
            "use strict";
            var d, o = null;
            return _default.each(arguments, function(v) {
                d = v.split("."), o = window[d[0]] = window[d[0]] || {}, _default.each(d.slice(1), function(v2) {
                    o = o[v2] = o[v2] || {}
                })
            }), o
        },
        apply: function(obj, config, defaults) {
            "use strict";
            if (defaults && _default.apply(obj, defaults, !1), obj && config && "object" == typeof config)
                for (var prop in config) obj[prop] = config[prop];
            return obj
        },
        each: function(array, fn, scope) {
            "use strict";
            if (!_default.isEmpty(array, !0)) {
                (void 0 === array.length || _default.isPrimitive(array)) && (array = [array]);
                for (var i = 0, len = array.length; i < len; i++)
                    if (!1 === fn.call(scope || array[i], array[i], i, array)) return i
            }
        },
        isEmpty: function(value, allowBlank) {
            "use strict";
            var isEmptyArray = _default.isArray(value) && !value.length;
            return null == value || isEmptyArray || "" === value && !allowBlank
        },
        isArray: function(value) {
            "use strict";
            return "[object Array]" === Object.prototype.toString.apply(value)
        },
        isPrimitive: function(value) {
            "use strict";
            var type = typeof value;
            return "string" === type || "number" === type || "boolean" === type
        },
        isObject: function(obj) {
            "use strict";
            return obj && "object" == typeof obj
        }
    };
    _default.Class = foodspringClass.extend({
        sEnd: 1024,
        xsEnd: 767,
        defaultScrolled: !0,
        inViewElements: [],
        pagetypeClasses: {
            cms: "cms-page-view",
            catalog: "catalog-category-view",
            contact: "cms-kontakt",
            pdp: "catalog-product-view",
            homepage: "cms-home",
            cart: "checkout-cart-index",
            searchResult: "catalogsearch-result-index",
            checkout: "onestepcheckout-index-index",
            checkoutSuccess: "checkout-onepage-success",
            bodycheck: "cms-body-check",
            bodycheckResult: "egg-template-bodycheck-result-show",
            customerAccountLogin: "customer-account-login",
            customerAccountIndex: "customer-account-index",
            customerAccountEdit: "customer-account-edit",
            customerAccountAddress: "customer-address-form",
            customerAccountForgotPassword: "customer-account-forgotpassword",
            paypalExpressReview: "payone-core-pexpress-review",
            customerAccountChangeForgotten: "customer-account-changeforgotten",
            recipesCatalog: "recipes-catalog",
            recipeItem: "recipes-item-view"
        },
        init: function() {},
        getTemplate: function(templateId) {
            "use strict";
            if (this.templates[templateId]) return this.templates[templateId];
            this.onException(templateId + "not found")
        },
        parseTemplate: function(templateId, data) {
            "use strict";
            return this.getTemplate(templateId).replace(/\{([\w\.]*)\}/g, function(str, key) {
                for (var keys = key.split("."), value = data[keys.shift()], i = 0, l = keys.length; i < l; i++) value = value[keys[i]];
                return null != value ? value : ""
            })
        },
        parseTemplateData: function(template, data) {
            "use strict";
            return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
                for (var keys = key.split("."), value = data[keys.shift()], i = 0, l = keys.length; i < l; i++) value = value[keys[i]];
                return null != value ? value : ""
            })
        },
        getElement: function(selector, scope) {
            "use strict";
            return (scope = scope || !1) && "" !== this.selectors[scope] ? jQuery(this.selectors[selector], this.selectors[scope]) : jQuery(this.selectors[selector])
        },
        onException: function(message) {
            "use strict";
            console.error(message)
        },
        isEmpty: function(value) {
            "use strict";
            return !(null != value && "" !== value)
        },
        isMediaSize: function(size) {
            "use strict";
            var clientWidth = window.innerWidth;
            switch (size) {
                case "l-up":
                    return clientWidth > this.sEnd;
                case "s-up":
                    return clientWidth > this.xsEnd;
                case "s":
                    return clientWidth > this.xsEnd && clientWidth <= this.sEnd;
                case "xs":
                    return clientWidth <= this.xsEnd;
                default:
                    return !1
            }
        },
        isRetinaDevice: function() {
            "use strict";
            return window.matchMedia && (window.matchMedia("only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)").matches || window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)").matches) || window.devicePixelRatio && 1.3 <= window.devicePixelRatio
        },
        isInView: function($element, offset) {
            "use strict";
            offset = offset || 0;
            try {
                var $win = jQuery(window),
                    $visibleAreaTop = $win.scrollTop(),
                    $visibleAreaBottom = $win.scrollTop() + $win.height(),
                    $objTopPos = $element.offset().top;
                return $visibleAreaTop - offset <= $objTopPos && $objTopPos <= $visibleAreaBottom + offset
            } catch (e) {
                return console.error("Error on checking object position."), !1
            }
        },
        isNearlyInView: function($element) {
            "use strict";
            this.isInView($element, 130)
        },
        isAboveViewpoint: function($element, offset) {
            "use strict";
            offset = offset || 0;
            try {
                var $win = jQuery(window),
                    $visibleAreaBottom = $win.scrollTop() + $win.height();
                return $element.offset().top <= $visibleAreaBottom + offset
            } catch (e) {
                return console.error("Error on checking object position."), !1
            }
        },
        isTouchDevice: function() {
            "use strict";
            var deviceAgent = navigator.userAgent.toLowerCase();
            return "ontouchstart" in window || 0 < navigator.msMaxTouchPoints || deviceAgent.match(/(iphone|ipod|ipad|android|iemobile|blackberry|bada)/i)
        },
        isPageType: function(pagetype) {
            "use strict";
            return jQuery("body").hasClass(this.pagetypeClasses[pagetype])
        },
        isCmsPage: function(name) {
            "use strict";
            return jQuery("body").hasClass(this.pagetypeClasses.cms) && jQuery("body").hasClass("cms-" + name)
        },
        getBasetUrl: function() {
            "use strict";
            var url = "";
            return "undefined" != typeof BASE_URL && (url = BASE_URL), "/" === url.substr(-1) && (url = url.substr(0, url.length - 1)), url
        },
        getSkinUrl: function() {
            "use strict";
            return SKIN_URL
        },
        getShopUrl: function() {
            "use strict";
            return SHOP_URL
        },
        getUrlParameter: function(name) {
            "use strict";
            return decodeURIComponent((new RegExp("[?|&]" + name + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
        },
        getCountryCode: function() {
            "use strict";
            return jQuery("body").data("countryCode")
        },
        getWebsiteId: function() {
            "use strict";
            return jQuery("body").data("websiteId")
        },
        getLanguageCode: function() {
            "use strict";
            return jQuery("html").prop("lang")
        },
        setCookie: function(name, value, expires) {
            "use strict";
            if (void 0 !== name && void 0 !== value && void 0 !== expires) {
                var date = new Date;
                return date.setTime(date.getTime() + expires), expires = "; expires=" + date.toUTCString(), document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/", !0
            }
            return !1
        },
        getCookie: function(name) {
            "use strict";
            for (var nameEQ = name + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
                for (var c = ca[i];
                    " " === c.charAt(0);) c = c.substring(1, c.length);
                if (0 === c.indexOf(nameEQ)) return decodeURIComponent(c.substring(nameEQ.length, c.length))
            }
            return !1
        },
        deleteCookie: function(name) {
            "use strict";
            return this.setCookie(name, "", -1)
        },
        translate: function(phrase) {
            "use strict";
            return _default.ui.translator.prototype.translate(phrase)
        },
        setDefaultScrolled: function(skipEvent) {
            "use strict";
            return !(!this.defaultScrolled || skipEvent) && (this.defaultScrolled = !1, this.timeoutId = window.setTimeout(function() {
                this.defaultScrolled = !0
            }.bind(this), 200), !0)
        }
    }), _default.namespace("_default.ui.menu"), _default.ui.menu = _default.Class.extend({
        timeoutOpen: 150,
        timeoutClose: 800,
        fadeIn: 1,
        fadeOut: 300,
        timeoutId: 0,
        timeoutOffId: 0,
        classes: {
            isOpen: "is-open",
            isFixed: "is-fixed",
            foldoutContent: "foldout-content",
            arrowRight: "icon-arrow-right"
        },
        selectors: {
            isOpen: ".is-open",
            menu: ".js-flyout-wrapper, nav ul.navigation-main li.level0",
            menuBlock: ".js-flyout, ul.level0",
            modalBg: "#boxModalBackground",
            mobileMenu: "#responsive-navigation",
            mobileMenuBtn: "#responsive-menu-button",
            mobileFoldoutLinks: ".parent > a:not(.no-overview)",
            mobileFoldout: ".navigation-main .icon-arrow-right",
            storeSwitcher: "#storeswitcher",
            storeSwitcherPlaceholder: "#storeswitcher-placeholder"
        },
        init: function() {
            "use strict";
            this.$menu = this.getElement("menu"), this.$mobileMenu = this.getElement("mobileMenu"), this.$mobileMenuBtn = this.getElement("mobileMenuBtn"), this.$modalBg = this.getElement("modalBg"), this.$storeSwitcher = this.getElement("storeSwitcher"), this.$storeSwitcherPlaceholder = this.getElement("storeSwitcherPlaceholder"), this.$mobileFoldoutLinks = this.getElement("mobileFoldoutLinks"), this.initEvents()
        },
        initEvents: function() {
            "use strict";
            this.$menu.on("mouseenter", this.showMenuBlockAction.bind(this)), this.$menu.on("mouseleave", this.hideMenuBlockAction.bind(this)), this.$menu.on("close", this.hideMenuBlockAction.bind(this)), jQuery(document).on("tap click", this.selectors.mobileFoldout, this.toggleFoldoutStyle.bind(this)), this.$mobileMenuBtn.on("tap click", this.openMobileMenu.bind(this)), this.$modalBg.on("tap click", this.closeMobileMenu.bind(this)), jQuery(window).on("resize", this.updateFolding.bind(this)), this.updateFolding()
        },
        openMobileMenu: function() {
            "use strict";
            jQuery(document).trigger("open-mobile-menu-finished"), this.$mobileMenuBtn.addClass("active"), this.$mobileMenu.addClass(this.classes.isOpen), jQuery("body").addClass(this.classes.isFixed)
        },
        closeMobileMenu: function() {
            "use strict";
            this.$mobileMenuBtn.removeClass("active"), this.$mobileMenu.removeClass(this.classes.isOpen), this.$mobileMenu.find(this.selectors.isOpen).removeClass(this.classes.isOpen), jQuery("body").removeClass(this.classes.isFixed), jQuery(document).trigger("close-mobile-menu-finished")
        },
        updateFolding: function() {
            "use strict";
            this.isMediaSize("xs") || this.isMediaSize("s") ? this.setMobileBehaviour() : this.setDesktopBehaviour()
        },
        setMobileBehaviour: function() {
            "use strict";
            var $elem, _this = this;
            this.$mobileFoldoutLinks.each(function() {
                ($elem = jQuery(this)).addClass(_this.classes.arrowRight), $elem.next("ul").addClass(_this.classes.foldoutContent)
            }), jQuery(document).trigger("setMobileBehaviour")
        },
        setDesktopBehaviour: function() {
            "use strict";
            jQuery(this.selectors.mobileFoldoutLinks).removeClass(this.classes.isOpen).removeClass(this.classes.arrowRight), jQuery(this.selectors.mobileFoldoutLinks).next("ul").removeClass(this.classes.foldoutContent);
            var storeSwitcher = this.$storeSwitcher.html();
            null !== storeSwitcher && "" === this.$storeSwitcherPlaceholder.html() && this.$storeSwitcherPlaceholder.html(storeSwitcher), jQuery(document).trigger("setDesktopBehaviour")
        },
        showMenuBlockAction: function(e) {
            "use strict";
            if (this.isMediaSize("l-up")) {
                var $self = jQuery(e.currentTarget),
                    _this = this;
                this.timeoutOffId && (window.clearTimeout(this.timeoutOffId), this.timeoutOffId = 0), jQuery.each(this.$menu, function($key, element) {
                    var $element = jQuery(element);
                    $element.get(0) !== $self.get(0) && $element.find(_this.selectors.menuBlock).fadeOut(_this.fadeOut)
                }), this.timeoutId = window.setTimeout(function() {
                    jQuery.each(this.$menu, function($key, element) {
                        var $element = jQuery(element);
                        $element.get(0) === $self.get(0) && $element.find(_this.selectors.menuBlock).stop().fadeIn(_this.fadeIn)
                    }), this.timeoutId && (window.clearTimeout(this.timeoutId), this.timeoutId = !1), $self.trigger("displayMenuBlock"), jQuery(document).trigger("displayMenuBlock")
                }.bind(this), this.timeoutOpen)
            }
        },
        hideMenuBlockAction: function(e) {
            "use strict";
            if (this.isMediaSize("l-up")) {
                var $self = jQuery(e.currentTarget);
                this.timeoutId && (window.clearTimeout(this.timeoutId), this.timeoutId = 0), this.timeoutOffId = window.setTimeout(function() {
                    var _this = this;
                    jQuery.each(this.$menu, function($key, element) {
                        var $element = jQuery(element);
                        $element.get(0) === $self.get(0) && $element.find(_this.selectors.menuBlock).fadeOut(_this.fadeOut)
                    }), this.timeoutOffId && (window.clearTimeout(this.timeoutOffId), this.timeoutOffId = 0)
                }.bind(this), this.timeoutClose)
            }
        },
        toggleFoldoutStyle: function(e) {
            "use strict";
            e.preventDefault();
            var $self = jQuery(e.currentTarget),
                $parent = $self.parent().parent();
            $self.hasClass(this.classes.isOpen) || ($parent.find("a").removeClass(this.classes.isOpen), $parent.find("ul").removeAttr("style")), $self.toggleClass(this.classes.isOpen), $self.next("ul").slideToggle("fast")
        }
    }), jQuery(document).ready(function() {
        "use strict";
        return new _default.ui.menu
    });
}
catch(e){
    
}