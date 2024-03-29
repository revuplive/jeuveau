! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.vidyardEmbed = t() : e.vidyardEmbed = t()
}(window, function() {
    return function(e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            e[r].call(i.exports, i, i.exports, n);
            i.l = !0;
            return i.exports
        }
        n.m = e;
        n.c = t;
        n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        };
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        };
        n.t = function(e, t) {
            1 & t && (e = n(e));
            if (8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            n.r(r);
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            });
            if (2 & t && "string" != typeof e)
                for (var i in e) n.d(r, i, function(t) {
                    return e[t]
                }.bind(null, i));
            return r
        };
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            n.d(t, "a", t);
            return t
        };
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        };
        n.p = "";
        return n(n.s = 5)
    }([function(e, t) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    }, function(e, t, n) {
        var r, i, o;
        ! function(a, u) {
            "use strict";
            i = [n(6)], void 0 !== (o = "function" == typeof(r = u) ? r.apply(t, i) : r) && (e.exports = o)
        }(0, function(e) {
            "use strict";
            var t = /(^|@)\S+\:\d+/,
                n = /^\s*at .*(\S+\:\d+|\(native\))/m,
                r = /^(eval@)?(\[native code\])?$/;
            return {
                parse: function(e) {
                    if (void 0 !== e.stacktrace || void 0 !== e["opera#sourceloc"]) return this.parseOpera(e);
                    if (e.stack && e.stack.match(n)) return this.parseV8OrIE(e);
                    if (e.stack) return this.parseFFOrSafari(e);
                    throw new Error("Cannot parse given Error object")
                },
                extractLocation: function(e) {
                    if (-1 === e.indexOf(":")) return [e];
                    var t = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/.exec(e.replace(/[\(\)]/g, ""));
                    return [t[1], t[2] || void 0, t[3] || void 0]
                },
                parseV8OrIE: function(t) {
                    return t.stack.split("\n").filter(function(e) {
                        return !!e.match(n)
                    }, this).map(function(t) {
                        t.indexOf("(eval ") > -1 && (t = t.replace(/eval code/g, "eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, ""));
                        var n = t.replace(/^\s+/, "").replace(/\(eval code/g, "(").split(/\s+/).slice(1),
                            r = this.extractLocation(n.pop()),
                            i = n.join(" ") || void 0,
                            o = ["eval", "<anonymous>"].indexOf(r[0]) > -1 ? void 0 : r[0];
                        return new e({
                            functionName: i,
                            fileName: o,
                            lineNumber: r[1],
                            columnNumber: r[2],
                            source: t
                        })
                    }, this)
                },
                parseFFOrSafari: function(t) {
                    return t.stack.split("\n").filter(function(e) {
                        return !e.match(r)
                    }, this).map(function(t) {
                        t.indexOf(" > eval") > -1 && (t = t.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ":$1"));
                        if (-1 === t.indexOf("@") && -1 === t.indexOf(":")) return new e({
                            functionName: t
                        });
                        var n = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                            r = t.match(n),
                            i = r && r[1] ? r[1] : void 0,
                            o = this.extractLocation(t.replace(n, ""));
                        return new e({
                            functionName: i,
                            fileName: o[0],
                            lineNumber: o[1],
                            columnNumber: o[2],
                            source: t
                        })
                    }, this)
                },
                parseOpera: function(e) {
                    return !e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? this.parseOpera9(e) : e.stack ? this.parseOpera11(e) : this.parseOpera10(e)
                },
                parseOpera9: function(t) {
                    for (var n = /Line (\d+).*script (?:in )?(\S+)/i, r = t.message.split("\n"), i = [], o = 2, a = r.length; o < a; o += 2) {
                        var u = n.exec(r[o]);
                        u && i.push(new e({
                            fileName: u[2],
                            lineNumber: u[1],
                            source: r[o]
                        }))
                    }
                    return i
                },
                parseOpera10: function(t) {
                    for (var n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, r = t.stacktrace.split("\n"), i = [], o = 0, a = r.length; o < a; o += 2) {
                        var u = n.exec(r[o]);
                        u && i.push(new e({
                            functionName: u[3] || void 0,
                            fileName: u[2],
                            lineNumber: u[1],
                            source: r[o]
                        }))
                    }
                    return i
                },
                parseOpera11: function(n) {
                    return n.stack.split("\n").filter(function(e) {
                        return !!e.match(t) && !e.match(/^Error created at/)
                    }, this).map(function(t) {
                        var n, r = t.split("@"),
                            i = this.extractLocation(r.pop()),
                            o = r.shift() || "",
                            a = o.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^\)]*\)/g, "") || void 0;
                        o.match(/\(([^\)]*)\)/) && (n = o.replace(/^[^\(]+\(([^\)]*)\)$/, "$1"));
                        var u = void 0 === n || "[arguments not available]" === n ? void 0 : n.split(",");
                        return new e({
                            functionName: a,
                            args: u,
                            fileName: i[0],
                            lineNumber: i[1],
                            columnNumber: i[2],
                            source: t
                        })
                    }, this)
                }
            }
        })
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e) {
                var t = void 0 === e ? {
                        emit: !1,
                        logger: console.log
                    } : e,
                    n = t.emit,
                    r = t.logger;
                this.emit = n;
                this.externalLogger = r;
                this.buffer = [];
                this.customLevel = {};
                this.error = this.setLevel(1);
                this.warn = this.setLevel(2);
                this.info = this.setLevel(3);
                this.log = this.setLevel(4)
            }
            e.prototype.getLogs = function(e) {
                return "function" == typeof e ? this.buffer.filter(function(t) {
                    return t.level === e.level
                }) : e ? this.buffer.filter(function(t) {
                    return t.level === e
                }) : this.buffer
            };
            e.prototype.setLevel = function(e) {
                var t = this,
                    n = function() {
                        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                        var i = {
                            level: e,
                            time: Date.now(),
                            msg: n.join(" ")
                        };
                        t.buffer.push(i);
                        t.emit && t.externalLogger(i)
                    };
                n.level = e;
                this.customLevel[e] = n;
                return n
            };
            return e
        }();
        t.default = r
    }, function(e, t, n) {
        "use strict";
        t.a = function(e) {
            var t = this.constructor;
            return this.then(function(n) {
                return t.resolve(e()).then(function() {
                    return n
                })
            }, function(n) {
                return t.resolve(e()).then(function() {
                    return t.reject(n)
                })
            })
        }
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            var r = n(3),
                i = setTimeout;

            function o() {}

            function a(e, t) {
                return function() {
                    e.apply(t, arguments)
                }
            }

            function u(e) {
                if (!(this instanceof u)) throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof e) throw new TypeError("not a function");
                this._state = 0;
                this._handled = !1;
                this._value = void 0;
                this._deferreds = [];
                p(e, this)
            }

            function s(e, t) {
                for (; 3 === e._state;) e = e._value;
                if (0 !== e._state) {
                    e._handled = !0;
                    u._immediateFn(function() {
                        var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                        if (null !== n) {
                            var r;
                            try {
                                r = n(e._value)
                            } catch (e) {
                                l(t.promise, e);
                                return
                            }
                            c(t.promise, r)
                        } else(1 === e._state ? c : l)(t.promise, e._value)
                    })
                } else e._deferreds.push(t)
            }

            function c(e, t) {
                try {
                    if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                    if (t && ("object" == typeof t || "function" == typeof t)) {
                        var n = t.then;
                        if (t instanceof u) {
                            e._state = 3;
                            e._value = t;
                            d(e);
                            return
                        }
                        if ("function" == typeof n) {
                            p(a(n, t), e);
                            return
                        }
                    }
                    e._state = 1;
                    e._value = t;
                    d(e)
                } catch (t) {
                    l(e, t)
                }
            }

            function l(e, t) {
                e._state = 2;
                e._value = t;
                d(e)
            }

            function d(e) {
                2 === e._state && 0 === e._deferreds.length && u._immediateFn(function() {
                    e._handled || u._unhandledRejectionFn(e._value)
                });
                for (var t = 0, n = e._deferreds.length; t < n; t++) s(e, e._deferreds[t]);
                e._deferreds = null
            }

            function f(e, t, n) {
                this.onFulfilled = "function" == typeof e ? e : null;
                this.onRejected = "function" == typeof t ? t : null;
                this.promise = n
            }

            function p(e, t) {
                var n = !1;
                try {
                    e(function(e) {
                        if (!n) {
                            n = !0;
                            c(t, e)
                        }
                    }, function(e) {
                        if (!n) {
                            n = !0;
                            l(t, e)
                        }
                    })
                } catch (e) {
                    if (n) return;
                    n = !0;
                    l(t, e)
                }
            }
            u.prototype.catch = function(e) {
                return this.then(null, e)
            };
            u.prototype.then = function(e, t) {
                var n = new this.constructor(o);
                s(this, new f(e, t, n));
                return n
            };
            u.prototype.finally = r.a;
            u.all = function(e) {
                return new u(function(t, n) {
                    if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");
                    var r = Array.prototype.slice.call(e);
                    if (0 === r.length) return t([]);
                    var i = r.length;

                    function o(e, a) {
                        try {
                            if (a && ("object" == typeof a || "function" == typeof a)) {
                                var u = a.then;
                                if ("function" == typeof u) {
                                    u.call(a, function(t) {
                                        o(e, t)
                                    }, n);
                                    return
                                }
                            }
                            r[e] = a;
                            0 == --i && t(r)
                        } catch (e) {
                            n(e)
                        }
                    }
                    for (var a = 0; a < r.length; a++) o(a, r[a])
                })
            };
            u.resolve = function(e) {
                return e && "object" == typeof e && e.constructor === u ? e : new u(function(t) {
                    t(e)
                })
            };
            u.reject = function(e) {
                return new u(function(t, n) {
                    n(e)
                })
            };
            u.race = function(e) {
                return new u(function(t, n) {
                    for (var r = 0, i = e.length; r < i; r++) e[r].then(t, n)
                })
            };
            u._immediateFn = "function" == typeof e && function(t) {
                e(t)
            } || function(e) {
                i(e, 0)
            };
            u._unhandledRejectionFn = function(e) {
                "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
            };
            t.a = u
        }).call(this, n(15).setImmediate)
    }, function(e, t, n) {
        "use strict";
        n.r(t);
        var r, i = n(4),
            o = function(e) {
                return "function" == typeof e
            },
            a = function(e) {
                var t = (void 0 === e ? window : e).Promise;
                return t && t.all && t.race && t.resolve && t.reject && o(t) && o(t.all) && o(t.race) && o(t.resolve) && o(t.reject)
            }() ? window.Promise : i.a,
            u = function(e, t, n, r) {
                void 0 === r && (r = window);
                window.addEventListener ? r.addEventListener(e, n, !1) : window.attachEvent && r.attachEvent(t, n);
                return {
                    eventName: e,
                    handler: n,
                    element: r
                }
            },
            s = function(e, t, n) {
                void 0 === n && (n = window);
                n.removeEventListener ? n.removeEventListener(e, t, !1) : n.detachEvent ? n.detachEvent("on" + e, t) : n["on" + e] = null
            },
            c = function(e, t) {
                if ("function" == typeof window.CustomEvent) return new window.CustomEvent(e, {
                    detail: t
                });
                if ("function" == typeof document.createEvent) {
                    var n = document.createEvent("CustomEvent");
                    n.initCustomEvent(e, !1, !1, t);
                    return n
                }
            },
            l = function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t)) return !1;
                return JSON.stringify(e) === JSON.stringify({})
            },
            d = function(e, t) {
                if (t.indexOf) return t.indexOf(e);
                for (var n = 0; n < t.length; n++)
                    if (t[n] === e) return n;
                return -1
            },
            f = function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e
            },
            p = function(e, t, n) {
                void 0 === t && (t = "*");
                void 0 === n && (n = document);
                if ("function" == typeof document.getElementsByClassName) return n.getElementsByClassName(e);
                for (var r = [], i = new RegExp("(^| )" + e + "( |$)"), o = 0, a = E(n.getElementsByTagName(t)); o < a.length; o++) {
                    var u = a[o];
                    i.test(u.className) && r.push(u)
                }
                return r
            },
            h = function(e, t) {
                void 0 === t && (t = 0);
                var n = k(e);
                return 0 !== n.height || 0 !== n.width ? (n.height / (n.width + t) * 100).toFixed(2) : 56.25.toFixed(2)
            },
            v = function(e, t) {
                void 0 === t && (t = "log");
                window.console && "function" == typeof window.console[t] && console[t](e)
            },
            y = function(e, t) {
                for (var n = 0, r = e; n < r.length; n++) {
                    var i = r[n];
                    if (!0 === t(i)) return i
                }
            },
            m = function(e, t) {
                return y(e, function(e) {
                    return e === t
                })
            },
            g = function(e) {
                var t = !1;
                return function() {
                    for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                    if (!t) {
                        e && e.apply(void 0, n);
                        t = !0
                    }
                }
            },
            b = function(e) {
                return function(t) {
                    32 !== t.keyCode && 13 !== t.keyCode || e(t)
                }
            },
            w = function(e) {
                return function(t) {
                    27 === t.keyCode && e(t)
                }
            },
            x = function() {
                return document.currentScript ? document.currentScript : y(E(document.getElementsByTagName("script")), function(e) {
                    return e.src && (null !== e.src.match("vidyard-embed-code.js") || null !== e.src.match(/v4(\.umd)?\.js/))
                })
            },
            k = function(e) {
                if (e.naturalWidth) return {
                    width: e.naturalWidth,
                    height: e.naturalHeight
                };
                var t = new Image;
                t.src = e.src;
                return {
                    width: t.width,
                    height: t.height
                }
            },
            E = function(e) {
                return Array.prototype.slice.call(e)
            },
            _ = function(e) {
                return new a(function(t, n) {
                    try {
                        t(JSON.parse(e))
                    } catch (e) {
                        n(e)
                    }
                })
            },
            O = function(e) {
                var t = e.endpoint,
                    n = e.payload,
                    r = void 0 === n ? {} : n,
                    i = e.method,
                    o = void 0 === i ? "GET" : i;
                return new a(function(e, n) {
                    var i = void 0 === (new XMLHttpRequest).withCredentials && XDomainRequest ? new XDomainRequest : new XMLHttpRequest;
                    i.open(o, t);
                    i instanceof XMLHttpRequest && i.setRequestHeader("Content-Type", "text/plain");
                    i.onerror = function(e) {
                        return n(e)
                    };
                    i.onload = function() {
                        i instanceof XMLHttpRequest ? 2 === Math.floor(i.status / 100) ? e(i.responseText) : n() : e(i.responseText)
                    };
                    i.send(JSON.stringify(r))
                })
            },
            C = function() {
                for (var e = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenchange"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitfullscreenchange"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozfullscreenchange"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "MSFullscreenChange"]
                    ], t = [], n = {}, r = 0, i = e; r < i.length; r++) {
                    var o = i[r];
                    if (o[1] in document) {
                        t = o;
                        break
                    }
                }
                if (t && t.length) {
                    for (var a = 0; a < t.length; a++) n[e[0][a]] = t[a];
                    return n
                }
                return null
            },
            I = function(e) {
                for (var t = {}, n = function(e) {
                        return e.name.replace("data-", "")
                    }, r = 0; r < e.attributes.length; r += 1) {
                    var i = e.attributes[r];
                    i.name.indexOf("data-") < 0 || (t[n(i)] = i.value)
                }
                return t
            },
            N = function(e) {
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(window.location.search);
                if (null !== t) return t[1]
            },
            S = function(e, t) {
                try {
                    var n = JSON.parse(decodeURIComponent(e));
                    return Object.keys(n).reduce(function(e, r) {
                        e[t + "[" + r + "]"] = n[r];
                        return e
                    }, {})
                } catch (e) {
                    v("Invalid " + t + " payload", "warn");
                    return {}
                }
            },
            j = function(e) {
                return Object.keys(e).reduce(function(t, n) {
                    if ("vydata" === n) {
                        var r = S(e[n], "vydata");
                        Object.keys(r).forEach(function(e) {
                            t[e] = r[e]
                        })
                    } else t[n] = e[n];
                    return t
                }, {})
            },
            T = function(e, t, n) {
                var r = function(e, t) {
                        return -1 !== e.className.indexOf(t)
                    },
                    i = function(e, t) {
                        r(e, t) || (e.className = e.className.trim() + " " + t)
                    },
                    o = function(e, t) {
                        r(e, t) && (e.className = e.className.replace(t, " ").trim())
                    };
                !0 === n ? i(e, t) : !1 === n ? o(e, t) : r(e, t) ? o(e, t) : i(e, t)
            },
            L = "4.2.29",
            P = /vidyard\.com\/embed\/v4/,
            A = "/integrations.js",
            V = .5,
            F = 319,
            U = "/details.js",
            R = "/style.js",
            M = {
                setPlaybackURL: function(e) {
                    return r = e
                },
                getPlaybackURL: function() {
                    var e = x(),
                        t = e ? e.getAttribute("data-playbackurl") : null;
                    return r || window.VIDYARD_PLAYBACK_URL || t || "play.vidyard.com"
                }
            },
            q = M.setPlaybackURL,
            B = M.getPlaybackURL,
            D = function() {
                return "https://" + B() + "/v4/"
            },
            z = function() {
                return "https://" + B() + "/v4/error"
            },
            W = function(e, t, n) {
                if (t && n)
                    if (window.postMessage && n.contentWindow) n.contentWindow.postMessage(JSON.stringify(e), t);
                    else {
                        if ("associateVisitor" !== e.event) return;
                        var r = e.event + "," + e.data.type + "," + e.data.value + "|",
                            i = n.src; - 1 === i.indexOf("#") && (i += "#");
                        i += r;
                        n.src = i
                    }
            },
            H = function(e) {
                return function(t) {
                    var n = G(t);
                    n && e(n)
                }
            };

        function G(e) {
            if ("string" == typeof e.data && "" !== e.data) try {
                var t = JSON.parse(e.data),
                    n = p("vidyard-iframe-" + t.uuid, "iframe")[0],
                    r = (n ? n.contentWindow : null) === e.source,
                    i = "string" == typeof t.event;
                if (!r || !i) return;
                return t
            } catch (e) {
                v("Invalid postMessage received", "warn");
                return
            }
        }
        var J = ["pardot", "hubspotutk", "_mkto_trk", "vy_dreamforce", "eloqua"],
            $ = ["pardot", "hubspot", "marketo", "dreamforce", "eloqua"];

        function Q() {
            var e = this,
                t = !1,
                n = {};
            this.updatePlayer = function(e) {
                if (e._tmpOrg && e.iframe) {
                    var t = e._tmpOrg.orgId;
                    n[t] || (n[t] = {
                        foundIntegrations: {},
                        id: t,
                        integrations: e._tmpOrg,
                        players: []
                    });
                    e.org = n[t];
                    for (var r = 0, i = n[t].players; r < i.length; r++) {
                        if (i[r].iframe === e.iframe) return
                    }
                    n[t].players.push(e);
                    var o = e.org.integrations,
                        a = o.eloqua,
                        u = o.eloquaFirstPartyDomain;
                    a && (null !== e.status && e.status.consent ? m(a, u) : e.on("status", function t() {
                        if (e.status.consent) {
                            m(a, u);
                            e.off("status", t)
                        }
                    }));
                    p()
                }
            };
            this.safelyCommunicateIntegration = function(e, t, n) {
                void 0 !== e.org && void 0 !== n && null !== n && !r(e, t) && s(e, t, n) && (e.org = o(e.org, t, e.uuid))
            };
            this.addKnownVisitor = function(e, t, n) {
                if (n)
                    for (var r = 0, i = n.players; r < i.length; r++) {
                        var o = i[r];
                        f(o, e, t)
                    }
            };
            this.getCookie = function(e, t) {
                var n = document.cookie.split(";");
                if ("eloqua" === e && "function" == typeof window.GetElqCustomerGUID) return window.GetElqCustomerGUID();
                for (var r = h(J[$.indexOf(e)], t), i = 0, o = n; i < o.length; i++) {
                    var a = o[i],
                        u = a.indexOf("="),
                        s = a.substr(0, u).replace(/^\s+|\s+$/g, ""),
                        c = a.substr(u + 1);
                    if (s === r) return decodeURIComponent(c)
                }
            };
            var r = function(e, t) {
                    return e.org && e.org.foundIntegrations && e.org.foundIntegrations[t] && e.org.foundIntegrations[t].sentPlayers && -1 !== d(e.uuid, e.org.foundIntegrations[t].sentPlayers)
                },
                i = function(e, t) {
                    e.foundIntegrations[t] || (e.foundIntegrations[t] = {
                        externalIdentifier: null,
                        sentPlayers: []
                    });
                    return e
                },
                o = function(e, t, n) {
                    (e = i(e, t)).foundIntegrations[t].sentPlayers.push(n);
                    return e
                },
                a = function(e, t, n) {
                    (e = i(e, t)).foundIntegrations[t].externalIdentifier = n;
                    return e
                },
                s = function(e, t, n) {
                    if (!e.ready()) return !1;
                    var r = {
                        data: {
                            type: t,
                            value: n
                        },
                        event: "associateVisitor",
                        uuid: e.uuid
                    };
                    v("IntegrationsWatcher.communicateIntegration " + r, "debug");
                    W(r, "https://" + B(), e.iframe);
                    return !0
                },
                c = function(t, n, r) {
                    if (void 0 !== t && void 0 !== r && null !== r)
                        for (var i = 0, o = t; i < o.length; i++) {
                            var a = o[i];
                            e.safelyCommunicateIntegration(a, n, r)
                        }
                },
                l = function(e, t, n) {
                    var r = {
                        data: {
                            type: t,
                            value: n
                        },
                        event: "identifyVisitor",
                        uuid: e.uuid
                    };
                    W(r, "https://" + B(), e.iframe)
                },
                f = function(e, t, n) {
                    e.ready() ? l(e, t, n) : e.on("ready", function() {
                        l(e, t, n)
                    })
                },
                p = function() {
                    for (var t = 0, r = $; t < r.length; t++) {
                        var i = r[t];
                        for (var o in n)
                            if (n.hasOwnProperty(o)) {
                                var u = n[o];
                                if (!u.integrations[i]) continue;
                                var s = e.getCookie(i, u);
                                if (!s) continue;
                                if (!(s = y(i, s, u))) continue;
                                u = a(u, i, s);
                                c(u.players, i, s)
                            }
                    }
                },
                h = function(e, t) {
                    return "pardot" === e && t && t.integrations.pardot ? "visitor_id" + t.integrations.pardot : e
                },
                y = function(e, t, n) {
                    if ("marketo" === e) {
                        if (!n.integrations.marketo || -1 === t.toLowerCase().indexOf(n.integrations.marketo.toLowerCase())) return null;
                        t = encodeURIComponent(t)
                    }
                    return t
                },
                m = function(e, n) {
                    if (!t) {
                        t = !0;
                        var r = function() {
                            if (!document.getElementById("vidyard-eloqua-include")) {
                                window._elqQ = window._elqQ || [];
                                window._elqQ.push(["elqSetSiteId", e]);
                                n && window._elqQ.push(["elqUseFirstPartyCookie", n]);
                                window._elqQ.push(["elqTrackPageView"]);
                                window._elqQ.push(["elqGetCustomerGUID"]);
                                var t = document.createElement("script");
                                t.id = "vidyard-eloqua-include";
                                t.type = "text/javascript";
                                t.async = !0;
                                t.src = "https://img.en25.com/i/elqCfg.min.js";
                                var r = document.getElementsByTagName("script")[0];
                                r.parentNode.insertBefore(t, r)
                            }
                        };
                        "complete" === document.readyState ? r() : u("DOMContentLoaded", "onload", r)
                    }
                };
            setInterval(function() {
                p()
            }, 1e3)
        }
        var K = function() {
                window.onVidyardAPI && "function" == typeof window.onVidyardAPI && window.onVidyardAPI(window.VidyardV4)
            },
            X = function() {
                document.dispatchEvent(c("onVidyardAPI", window.VidyardV4))
            },
            Z = g(function() {
                K();
                X()
            }),
            Y = n(2),
            ee = new(n.n(Y).a)({
                emit: !!window.location.search.match("vydebug=1"),
                logger: function(e) {
                    return v(e, "info")
                }
            }),
            te = x();
        if (te) {
            ee.info("vidyardEmbed V" + L + " loaded from " + te.src);
            ee.info("data-playbackurl=" + te.getAttribute("data-playbackurl"))
        }
        ee.info("userAgent " + window.navigator.userAgent);
        ee.info("cookies " + navigator.cookieEnabled);
        window.performance && window.performance.timing && window.performance.timing.navigationStart && ee.info("Script load time " + (Date.now() - window.performance.timing.navigationStart));
        var ne = {
            logger: ee,
            getPlaybackURL: B,
            setPlaybackURL: q,
            version: L
        };

        function re(e, t) {
            var n = window.VidyardV4.playerReadyListeners;
            n[t] = n[t] || [];
            n[t].push(e);
            for (var r = 0, i = window.VidyardV4.players; r < i.length; r++) {
                var o = i[r];
                void 0 !== t && o.uuid !== t || o.on("ready", e)
            }
        }

        function ie(e) {
            var t = window.VidyardV4.playerReadyListeners,
                n = e.uuid,
                r = ee.setLevel(e.uuid);
            t[n] = t[n] || [];
            var i = t[n].concat(t[void 0]);
            Object.keys(i).forEach(function(t) {
                var n = i[t];
                e.on("ready", n);
                r("attaching ready callbacks")
            })
        }
        var oe, ae = function() {
                return ["autoplay", "fullscreen", "picture-in-picture", "camera", "microphone", "display-capture"].join("; ")
            },
            ue = function(e, t) {
                var n = function(n) {
                    return "inline" === e.type ? '<div class="vidyard-inner-container-' + e.uuid + '" style="position: absolute;height: 100%; width: 100%; ' + (t.maxWidth ? "max-width: " + t.maxWidth + "px; " : "") + (t.maxHeight ? "max-height: " + t.maxHeight + "px; " : "") + '"> ' + n + "</div> " : n
                };
                return '<div class="vidyard-div-' + e.uuid + '" role="none" aria-label="Vidyard media player" style="position: absolute; padding-bottom: ' + t.ratio + '%; height: 0; overflow: hidden; max-width: 100%; ">' + n('<iframe allow="' + ae() + '"allowfullscreen allowtransparency="true" referrerpolicy="no-referrer-when-downgrade" aria-label="Vidyard video player" class="vidyard-iframe-' + e.uuid + '" frameborder=0 height="100%" width="100%" scrolling=no src="https://' + B() + "/" + e.uuid + e.toQueryString() + '" title="Vidyard video player" style="opacity: 0; background-color: transparent; position: absolute; top: 0; left: 0;"></iframe>') + "</div>"
            },
            se = function(e) {
                var t = document.createElement("script");
                t.type = "application/ld+json";
                t.text = JSON.stringify(e);
                return t
            },
            ce = function(e) {
                return new a(function(t, n) {
                    return ve({
                        error: n,
                        success: t,
                        url: "" + D() + e + R,
                        uuid: "style_" + e
                    })
                })
            },
            le = function(e) {
                return new a(function(t, n) {
                    return ve({
                        error: n,
                        success: t,
                        url: "" + D() + e + A,
                        uuid: "integrations_" + e
                    })
                })
            },
            de = function(e) {
                return new a(function(t, n) {
                    return ve({
                        error: n,
                        success: t,
                        url: "" + D() + e + U,
                        uuid: "details_" + e
                    })
                })
            },
            fe = function(e, t) {
                return new a(function(n, r) {
                    var i = encodeURIComponent(t),
                        o = "" + D() + e + "/contact/" + i + "/marketoContact.js";
                    ve({
                        error: r,
                        success: n,
                        url: o,
                        uuid: "marketoContact_" + e
                    })
                })
            },
            pe = function(e) {
                var t = e.error,
                    n = e.url,
                    r = e.requestUuid,
                    i = document.createElement("script");
                i.type = "application/javascript";
                i.onerror = t;
                i.src = n + "?callback=window.VidyardV4.jsonp." + r + ".done";
                i.setAttribute("data-playbackurl", B());
                document.body.appendChild(i);
                return i
            },
            he = {},
            ve = function(e) {
                var t = e.url,
                    n = e.uuid,
                    r = e.success,
                    i = e.error,
                    o = n.replace(/-/g, ""),
                    a = pe({
                        error: i,
                        url: t,
                        requestUuid: o
                    }),
                    u = g(function(e) {
                        r(e);
                        a.parentNode.removeChild(a)
                    });
                he[o] = he[o] || [];
                he[o].push(u);
                window.VidyardV4.jsonp[o] = {
                    done: function(e) {
                        he[o].forEach(function(t) {
                            return t(e)
                        })
                    }
                }
            },
            ye = {
                errors: {
                    placeholder: "Cannot render the player, check the placeholder Image"
                }
            },
            me = function(e, t) {
                var n = {};
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && (n[r[i]] = e[r[i]])
                }
                return n
            },
            ge = function(e) {
                if (!e) return a.reject(new Error(ye.errors.placeholder));
                var t = k(e),
                    n = t.width,
                    r = t.height,
                    i = e.getAttribute("data-uuid");
                return "" !== e.src && i && (!e.complete || 0 !== n && 0 !== r) ? e.complete ? a.resolve(e) : new a(function(t, n) {
                    e.onload = function() {
                        return t(e)
                    };
                    e.onerror = function() {
                        return n(e)
                    }
                }) : a.reject(new Error(ye.errors.placeholder))
            },
            be = function(e) {
                void 0 === e && (e = {});
                var t = e.uuid,
                    n = e.container,
                    r = e.type,
                    i = void 0 === r ? "inline" : r,
                    o = (e.aspect, me(e, ["uuid", "container", "type", "aspect"]));
                if (t && n) {
                    ee.setLevel("placeholder")("creating placeholder image");
                    var a = document.createElement("img"),
                        u = o.width ? o.width + "px" : "100%",
                        s = "\n    display: block;\n    margin: 0 auto;\n    max-height: " + (o.height ? o.height + "px" : "100%") + ";\n    max-width: " + u + ";\n    opacity: 0;\n  ";
                    a.src = "//" + B() + "/" + t + ".jpg";
                    a.className = "vidyard-player-embed";
                    a.setAttribute("style", s);
                    a.setAttribute("data-uuid", t);
                    a.setAttribute("data-type", i);
                    Object.keys(o).forEach(function(e) {
                        return a.setAttribute("data-" + e, o[e])
                    });
                    return n.appendChild(a)
                }
            },
            we = function(e) {
                var t = document.createElement("img");
                t.setAttribute("data-uuid", e);
                t.src = "//" + B() + "/" + e + ".jpg";
                return ge(t)
            },
            xe = function(e) {
                var t = e.dataParams,
                    n = e.player,
                    r = ee.setLevel(t.uuid);
                r("injecting inline embed");
                var i = function() {
                        return n.placeholder.src !== "//" + B() + "/" + n.uuid + ".jpg" ? we(n.uuid).then(h).catch(function() {
                            return !1
                        }) : a.resolve(!1)
                    },
                    o = {
                        maxHeight: t.height ? parseInt(t.height, 10).toString() : null,
                        maxWidth: t.width ? parseInt(t.width, 10).toString() : null,
                        ratio: h(n.placeholder)
                    };
                n.container.innerHTML = ue(t, o);
                var s = n.container.getElementsByTagName("iframe")[0];
                n.iframe = s;
                var c = new a(function(e) {
                        u("load", "onload", e, s)
                    }),
                    l = new a(function(e) {
                        n.on("ready", e)
                    });
                n.on("sidePlaylistOpen", function() {
                    d()
                });
                a.race([c, l]).then(function() {
                    r("player or iFrame is ready");
                    i().then(function(e) {
                        e && (s.parentElement.parentElement.style.paddingBottom = e + "%")
                    });
                    var e = document.getElementsByClassName("vidyard-inner-container-" + n.uuid)[0];
                    n.placeholder.parentElement.removeChild(n.placeholder);
                    T(n.placeholder, "inserted", !0);
                    e.appendChild(n.placeholder);
                    s.parentElement.parentElement.style.position = "relative";
                    s.style.opacity = "1"
                });
                c.then(function() {
                    n.placeholder.style.display = "none";
                    s.parentElement.parentElement.style.backgroundColor = "transparent"
                });

                function d() {
                    var e = n.container.clientWidth >= 2 * F;
                    T(n.container, "playlist-open", e)
                }
                r("getStyle sent");
                ce(n.uuid).then(function(e) {
                    r("getStyle received: " + JSON.stringify(e));
                    if (1 === e.pl && "0" !== t.playlist_always_open || "1" === t.playlist_always_open) {
                        n.iframe.parentElement.setAttribute("data-pl", "true");
                        u("resize", "onresize", d);
                        d()
                    } else n.iframe.parentElement.setAttribute("data-pl", "false")
                })
            },
            ke = function(e) {
                for (var t = Array(e.length), n = 0; n < e.length; ++n) t[n] = e[n];
                return t
            },
            Ee = function(e, t) {
                return e.filter(function(e) {
                    return e === t
                })[0]
            },
            _e = function(e) {
                return Array.isArray(e) ? e : [e]
            },
            Oe = "data-focus-lock",
            Ce = "data-focus-lock-disabled",
            Ie = "data-no-focus-lock",
            Ne = "data-autofocus-inside",
            Se = function() {
                return document && ke(document.querySelectorAll("[" + Ie + "]")).some(function(e) {
                    return e.contains(document.activeElement)
                })
            },
            je = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            Te = function e(t) {
                for (var n = t.length, r = 0; r < n; r += 1)
                    for (var i = function(n) {
                            if (r !== n && t[r].contains(t[n])) return {
                                v: e(t.filter(function(e) {
                                    return e !== t[n]
                                }))
                            }
                        }, o = 0; o < n; o += 1) {
                        var a = i(o);
                        if ("object" === (void 0 === a ? "undefined" : je(a))) return a.v
                    }
                return t
            },
            Le = function e(t) {
                return t.parentNode ? e(t.parentNode) : t
            },
            Pe = function(e) {
                return _e(e).filter(Boolean).reduce(function(e, t) {
                    var n = t.getAttribute(Oe);
                    e.push.apply(e, n ? Te(ke(Le(t).querySelectorAll("[" + Oe + '="' + n + '"]:not([' + Ce + '="disabled"])'))) : [t]);
                    return e
                }, [])
            },
            Ae = function(e) {
                return e === document.activeElement
            },
            Ve = function(e) {
                return !!Ee(ke(e.querySelectorAll("iframe")), Ae)
            },
            Fe = function(e) {
                var t = document && document.activeElement;
                return !(!t || t.dataset && t.dataset.focusGuard) && Pe(e).reduce(function(e, n) {
                    return e || n.contains(t) || Ve(n)
                }, !1)
            },
            Ue = function(e, t) {
                var n = e.tabIndex - t.tabIndex,
                    r = e.index - t.index;
                if (n) {
                    if (!e.tabIndex) return 1;
                    if (!t.tabIndex) return -1
                }
                return n || r
            },
            Re = function(e, t, n) {
                return ke(e).map(function(e, t) {
                    return {
                        node: e,
                        index: t,
                        tabIndex: n && -1 === e.tabIndex ? (e.dataset || {}).focusGuard ? 0 : -1 : e.tabIndex
                    }
                }).filter(function(e) {
                    return !t || e.tabIndex >= 0
                }).sort(Ue)
            },
            Me = ["button:enabled:not([readonly])", "select:enabled:not([readonly])", "textarea:enabled:not([readonly])", "input:enabled:not([readonly])", "a[href]", "area[href]", "iframe", "object", "embed", "[tabindex]", "[contenteditable]", "[autofocus]"],
            qe = Me.join(","),
            Be = qe + ", [data-focus-guard]",
            De = function(e, t) {
                return e.reduce(function(e, n) {
                    return e.concat(ke(n.querySelectorAll(t ? Be : qe)), n.parentNode ? ke(n.parentNode.querySelectorAll(Me.join(","))).filter(function(e) {
                        return e === n
                    }) : [])
                }, [])
            },
            ze = function(e) {
                var t = e.querySelectorAll("[" + Ne + "]");
                return ke(t).map(function(e) {
                    return De([e])
                }).reduce(function(e, t) {
                    return e.concat(t)
                }, [])
            },
            We = function(e) {
                return !(!e || !e.getPropertyValue) && ("none" === e.getPropertyValue("display") || "hidden" === e.getPropertyValue("visibility"))
            },
            He = function e(t) {
                return !t || t === document || t.nodeType === Node.DOCUMENT_NODE || !We(window.getComputedStyle(t, null)) && e(t.parentNode)
            },
            Ge = function(e) {
                return !(("INPUT" === e.tagName || "BUTTON" === e.tagName) && ("hidden" === e.type || e.disabled))
            },
            Je = function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                n.push(t);
                t.parentNode && e(t.parentNode, n);
                return n
            },
            $e = function(e, t) {
                for (var n = Je(e), r = Je(t), i = 0; i < n.length; i += 1) {
                    var o = n[i];
                    if (r.indexOf(o) >= 0) return o
                }
                return !1
            },
            Qe = function(e) {
                return ke(e).filter(function(e) {
                    return He(e)
                }).filter(function(e) {
                    return Ge(e)
                })
            },
            Ke = function(e, t) {
                return Re(Qe(De(e, t)), !0, t)
            },
            Xe = function(e) {
                return Re(Qe(De(e)), !1)
            },
            Ze = function(e) {
                return Qe(ze(e))
            },
            Ye = function(e) {
                return "INPUT" === e.tagName && "radio" === e.type
            },
            et = function(e, t) {
                return t.filter(Ye).filter(function(t) {
                    return t.name === e.name
                }).filter(function(e) {
                    return e.checked
                })[0] || e
            },
            tt = function(e, t) {
                return e.length > 1 && Ye(e[t]) && e[t].name ? e.indexOf(et(e[t], e)) : t
            },
            nt = function(e) {
                return e[0] && e.length > 1 && Ye(e[0]) && e[0].name ? et(e[0], e) : e[0]
            },
            rt = function(e) {
                return function(t) {
                    return !!t.autofocus || t.dataset && !!t.dataset.autofocus || e.indexOf(t) >= 0
                }
            },
            it = function(e) {
                return e && e.dataset && e.dataset.focusGuard
            },
            ot = function(e) {
                return !it(e)
            },
            at = function(e, t, n, r, i) {
                var o = e.length,
                    a = e[0],
                    u = e[o - 1],
                    s = it(n);
                if (!(e.indexOf(n) >= 0)) {
                    var c = t.indexOf(n),
                        l = t.indexOf(r || c),
                        d = e.indexOf(r),
                        f = c - l,
                        p = t.indexOf(a),
                        h = t.indexOf(u),
                        v = tt(e, 0),
                        y = tt(e, o - 1);
                    return -1 === c || -1 === d ? e.indexOf(i && i.length ? nt(i) : nt(e)) : !f && d >= 0 ? d : c <= p && s && Math.abs(f) > 1 ? y : c >= p && s && Math.abs(f) > 1 ? v : f && Math.abs(f) > 1 ? d : c <= p ? y : c > h ? v : f ? Math.abs(f) > 1 ? d : (o + d + f) % o : void 0
                }
            },
            ut = function(e, t, n) {
                var r = _e(e),
                    i = _e(t),
                    o = r[0],
                    a = null;
                i.filter(Boolean).forEach(function(e) {
                    a = $e(a || e, e) || a;
                    n.filter(Boolean).forEach(function(e) {
                        var t = $e(o, e);
                        t && (a = !a || t.contains(a) ? t : $e(t, a))
                    })
                });
                return a
            },
            st = function(e) {
                return e.reduce(function(e, t) {
                    return e.concat(Ze(t))
                }, [])
            },
            ct = function(e, t) {
                var n = new Map;
                t.forEach(function(e) {
                    return n.set(e.node, e)
                });
                return e.map(function(e) {
                    return n.get(e)
                }).filter(Boolean)
            },
            lt = function(e, t) {
                var n = document && document.activeElement,
                    r = Pe(e).filter(ot),
                    i = ut(n || e, e, r),
                    o = Ke(r).filter(function(e) {
                        var t = e.node;
                        return ot(t)
                    });
                if (o[0] || (o = Xe(r).filter(function(e) {
                        var t = e.node;
                        return ot(t)
                    }))[0]) {
                    var a = Ke([i]).map(function(e) {
                            return e.node
                        }),
                        u = ct(a, o),
                        s = u.map(function(e) {
                            return e.node
                        }),
                        c = at(s, a, n, t, s.filter(rt(st(r))));
                    return void 0 === c ? c : u[c]
                }
            },
            dt = function(e) {
                e.focus();
                e.contentWindow && e.contentWindow.focus()
            },
            ft = 0,
            pt = !1,
            ht = function(e, t) {
                var n = lt(e, t);
                if (!pt && n) {
                    if (ft > 2) {
                        console.error("FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting");
                        pt = !0;
                        setTimeout(function() {
                            pt = !1
                        }, 1);
                        return
                    }
                    ft++;
                    dt(n.node);
                    ft--
                }
            },
            vt = 0,
            yt = null,
            mt = function() {
                return document && document.activeElement === document.body
            },
            gt = function() {
                return mt() || Se()
            },
            bt = function() {
                var e = !1;
                if (vt) {
                    var t = vt;
                    if (!gt()) {
                        t && !Fe(t) && (e = ht(t, yt));
                        yt = document.activeElement
                    }
                }
                return e
            },
            wt = function(e) {
                return e.filter(function(e) {
                    return e
                }).slice(-1)[0]
            },
            xt = function(e) {
                vt = e;
                e && bt()
            },
            kt = [],
            Et = function(e) {
                if (xt(wt(kt))) {
                    e && e.preventDefault();
                    return !0
                }
                return !1
            },
            _t = function() {
                document.addEventListener("focusin", Et)
            },
            Ot = function() {
                document.removeEventListener("focusin", Et)
            },
            Ct = {
                on: function(e) {
                    0 === kt.length && _t();
                    if (kt.indexOf(e) < 0) {
                        kt.push(e);
                        Et()
                    }
                },
                off: function(e) {
                    kt = kt.filter(function(t) {
                        return t !== e
                    });
                    Et();
                    0 === kt.length && Ot()
                }
            };

        function It(e, t, n) {
            if (e && !document.getElementById("vidyard-overlay")) {
                var r = Lt(e),
                    i = jt(n),
                    o = Pt(t),
                    a = document.createElement("div");
                a.id = "vidyard-focusable-element";
                a.tabIndex = 0;
                i.popbox.appendChild(r.backerElement);
                i.popbox.appendChild(r.containingDiv);
                i.popbox.appendChild(o);
                document.body.appendChild(i.overlayWrapper);
                document.body.appendChild(a);
                i.closeContainer.focus();
                Ct.on(i.overlayWrapper);
                setTimeout(function() {
                    i.overlayWrapper.style.opacity = "1";
                    i.overlayWrapper.style.filter = "alpha(opacity=100)"
                }, 0);
                return {
                    container: r,
                    lightbox: i
                }
            }
        }

        function Nt(e) {
            var t = document.getElementById("vidyard-content-fixed"),
                n = document.getElementById("vidyard-focusable-element"),
                r = document.getElementById("vidyard-overlay"),
                i = document.getElementById("vidyard-overlay-wrapper"),
                o = document.getElementById("vidyard-popbox");
            if (t && r && i && o) {
                e && Object.keys(e).forEach(function(t) {
                    (0, e[t])()
                });
                n && n.parentNode.removeChild(n);
                Ct.off(i);
                i.style.opacity = "0";
                i.style.filter = "alpha(opacity=0)";
                setTimeout(function() {
                    i.parentNode.removeChild(i)
                }, 1e3 * V)
            }
        }

        function St(e) {
            e.style.opacity = "1"
        }

        function jt(e) {
            var t = {};
            t.overlay = document.createElement("div");
            t.contentFixed = document.createElement("div");
            t.popbox = document.createElement("div");
            t.overlayWrapper = document.createElement("div");
            t.closeContainer = Tt().closeContainer;
            t.overlay.id = "vidyard-overlay";
            t.overlay.setAttribute("aria-hidden", "true");
            t.overlay.style.display = "block";
            t.contentFixed.id = "vidyard-content-fixed";
            t.contentFixed.setAttribute("aria-label", "media player lightbox");
            t.contentFixed.setAttribute("role", "dialog");
            t.contentFixed.style.display = "block";
            t.popbox.id = "vidyard-popbox";
            t.overlayWrapper.id = "vidyard-overlay-wrapper";
            t.overlayWrapper.style.display = "block";
            t.contentFixed.appendChild(t.popbox);
            t.overlayWrapper.appendChild(t.overlay);
            t.overlayWrapper.appendChild(t.closeContainer);
            t.overlayWrapper.appendChild(t.contentFixed);
            if (e) {
                t.overlay.style.zIndex = e;
                t.contentFixed.style.zIndex = e + 2;
                t.closeContainer.style.zIndex = e + 1
            }
            return t
        }

        function Tt() {
            var e = {};
            e.closeContainer = document.createElement("div");
            e.closeButton = document.createElement("div");
            e.closeContainer.className = "vidyard-close-container";
            e.closeContainer.setAttribute("aria-label", "Close Player");
            e.closeContainer.setAttribute("role", "button");
            e.closeContainer.setAttribute("tabindex", "0");
            e.closeButton.className = "vidyard-close-x";
            if (document.documentMode < 9) {
                e.closeButton.className += " simple-close";
                e.closeButton.innerHTML = "&times;"
            }
            e.closeContainer.appendChild(e.closeButton);
            return e
        }

        function Lt(e) {
            var t = {};
            t.backerElement = document.createElement("div");
            t.backerElement.className = "vidyard-lightbox-content-backer";
            t.containerElement = document.createElement("div");
            t.containerElement.innerHTML = e;
            t.containingDiv = t.containerElement.getElementsByTagName("div")[0];
            t.containingDiv.style.position = "absolute";
            t.containingDiv.style.height = "100%";
            t.containingDiv.style.width = "100%";
            t.containingDiv.style.zIndex = "2";
            t.iframe = t.containerElement.getElementsByTagName("iframe")[0];
            t.iframe.parentNode.style.position = "static";
            t.iframe.parentNode.style.paddingBottom = 0;
            t.iframe.style.opacity = "1";
            setTimeout(function() {
                t.backerElement.style.opacity = "1";
                t.backerElement.style.filter = "alpha(opacity=100)"
            }, 0);
            return t
        }

        function Pt(e) {
            var t = p("vidyard-lightbox-image", "img", e)[0].cloneNode();
            t.className = "";
            t.id = "vidyard-popbox-constraint";
            t.alt = "";
            t.setAttribute("aria-hidden", "true");
            return t
        }
        var At = {};

        function Vt(e) {
            var t = p("vidyard-lightbox-centering", "div", e.container)[0];
            e.player.showLightbox = function() {
                ee.setLevel(e.player.uuid)("show lightbox");
                Ft({
                    container: e.container,
                    iframe: e.iframe,
                    overlayZindex: e.overlayZindex,
                    player: e.player
                })
            };
            e.player.hideLightbox = Rt;
            u("click", "onclick", e.player.showLightbox, t);
            u("keydown", "onkeydown", b(function(t) {
                t.preventDefault();
                e.player.showLightbox(t)
            }), t)
        }

        function Ft(e) {
            oe = document.activeElement;
            var t = It(e.iframe, e.container, e.overlayZindex);
            e.player.iframe = t.container.iframe;
            var n = e.player.uuid,
                r = t.container.iframe,
                i = qt(r, n),
                o = Bt(r, n);
            At.iframeLoaded = u("load", "onload", i, t.container.iframe);
            At.messageHandler = u("message", "onmessage", H(function(e) {
                i();
                o();
                Mt(e)
            }), window);
            At.overlayClick = u("click", "onclick", Rt, t.lightbox.overlayWrapper);
            At.fixedClick = u("click", "onclick", Rt, t.lightbox.contentFixed);
            At.closeKeyPress = u("keydown", "onkeydown", b(Rt), t.lightbox.closeContainer);
            At.responsivePlayerSize = u("resize", "onresize", Ut, window)
        }

        function Ut() {
            var e = document.getElementById("vidyard-popbox-constraint"),
                t = parseFloat((window.innerHeight / window.innerWidth * 100).toFixed(2)) < parseFloat(h(e)) ? "landscape" : "portrait";
            e.className !== t && (e.className = t)
        }

        function Rt() {
            Nt();
            oe && oe.focus();
            Object.keys(At).forEach(function(e) {
                var t = At[e],
                    n = t.eventName,
                    r = t.handler,
                    i = t.element;
                s(n, r, i)
            })
        }

        function Mt(e) {
            "keyPressed" === e.event && 27 === e.params && Rt()
        }

        function qt(e, t) {
            return g(function() {
                St(e);
                Ut();
                At.parentEsc = u("keydown", "onkeydown", w(Rt), document)
            })
        }

        function Bt(e, t) {
            return g(function() {
                W({
                    uuid: t,
                    event: "listenForKeyPress",
                    keyCode: "27"
                }, "https://" + B(), e)
            })
        }
        var Dt = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
            }
            return e
        };

        function zt(e) {
            if (!e || "string" != typeof e || e.length < 20) throw new Error("Invalid UUID given");
            var t = ee.setLevel(e),
                n = "https://" + B() + "/player/" + e + ".json?pomo=0";
            t("fetching metadata");
            return O({
                endpoint: n
            }).then(JSON.parse).then(function(n) {
                t("metadata successfully fetched");
                return Dt({
                    uuid: e
                }, n.payload.vyContext.metadata)
            }).catch(function(e) {
                t("failed to fetch metadata, " + e);
                throw new Error("Error parsing player metadata, make sure the UUID is correct")
            })
        }

        function Wt(e, t, n) {
            var r = Gt("https://" + B() + "/" + t.uuid + ".jpg", t, n);
            e.insertAdjacentHTML("afterbegin", r);
            zt(t.uuid).then(function(t) {
                var n = p("play-button", "button", e);
                1 === n.length && n[0].setAttribute("aria-label", "Play video " + t.name + ". Opens in a modal")
            }, function() {})
        }

        function Ht(e, t) {
            if (1 === e.pb) {
                var n = p("play-button", "button", t);
                if (1 === n.length) {
                    n[0].style.display = "block";
                    n[0].style.backgroundColor = "#" + e.pbc
                }
            }
        }

        function Gt(e, t, n) {
            return '<div class="vidyard-lightbox-thumbnail vidyard-lightbox-' + t.uuid + '"' + (n.maxWidth ? ' style="max-width: ' + n.maxWidth + 'px;"' : "") + '><div class="vidyard-lightbox-centering" style="padding-bottom: ' + n.ratio + '%;"><img class="vidyard-lightbox-image" src="' + e + '" alt="video thumbnail" /><div type="button" role="button" class="play-button" title="Play video" data-version="1" tabindex="0"><div class="play-button-size"></div><div class="arrow-size"><div class="arrow-size-ratio"></div><div class="arrow"></div></div></div></div></div>'
        }
        var Jt = function(e) {
            var t = e.dataParams,
                n = e.player,
                r = ee.setLevel(t.uuid);
            r("injecting lighbox embed");
            n.placeholder.style.display = "none";
            t.autoplay = 1;
            var i = {
                    ratio: h(n.placeholder)
                },
                o = ue(t, i),
                a = {
                    maxHeight: t.height ? parseInt(t.height, 10) : null,
                    maxWidth: t.width ? parseInt(t.width, 10) : null,
                    ratio: h(n.placeholder)
                };
            Wt(n.container, t, a);
            Vt({
                container: n.container,
                iframe: o,
                overlayZindex: t.overlayZindex,
                player: n
            });
            r("getStyle sent");
            ce(n.uuid).then(function(e) {
                r("getStyle received: " + JSON.stringify(e));
                Ht(e, n.container)
            })
        };

        function $t(e) {
            var t = window.VidyardV4.integrations,
                n = ee.setLevel(e.uuid),
                r = t.getCookie("marketo");
            if (r) {
                n("getMarketoLead sent");
                fe(e.uuid, r).then(_).then(function(r) {
                    n("getMarketoLead received: " + r);
                    e.on("ready", function() {
                        t.addKnownVisitor("marketo", r, e.org)
                    })
                }).catch(function() {
                    ee.warn("Invalid Marketo cookie")
                })
            }
            n("getIntegrations");
            le(e.uuid).then(function(r) {
                n("getIntegrations received: " + JSON.stringify(r));
                e.on("ready", function() {
                    e._tmpOrg = r;
                    t.updatePlayer(e)
                })
            })
        }

        function Qt(e) {
            var t = ee.setLevel(e);
            t("getSEO sent");
            de(e).then(function(e) {
                t("getSEO: " + JSON.stringify(e));
                if (!l(e)) {
                    var n = se(e);
                    document.getElementsByTagName("head")[0].appendChild(n)
                }
            })
        }
        var Kt = function(e, t) {
                var n = document.createElement("div");
                n.className = "vidyard-player-container";
                n.setAttribute("uuid", e);
                var r = n.style;
                r.margin = "auto";
                r.width = "100%";
                r.height = "auto";
                r.overflow = "hidden";
                r.display = "block";
                if ("inline" === t.type) {
                    r.maxWidth = t.width ? t.width + "px" : "";
                    r.maxHeight = t.height ? t.height + "px" : ""
                }
                return n
            },
            Xt = function() {
                function e(e) {
                    var t = this;
                    this.disable_popouts = 1;
                    var n = j(I(e));
                    Object.keys(n).forEach(function(e) {
                        t[e] = n[e]
                    });
                    if ("inline" !== this.type && "lightbox" !== this.type) {
                        v("Invalid Vidyard player embed type, defaulting to inline.", "warn");
                        this.type = "inline"
                    }
                    this.v = L;
                    this.disable_popouts = 1;
                    this.custom_id = this.custom_id || N("vycustom_id");
                    this.vyemail = this.vyemail || N("vyemail");
                    this.vysfid = this.vysfid || N("vysfid");
                    this.vyetoken = this.vyetoken || N("vyetoken");
                    var r = N("vyac"),
                        i = N("vyplayer");
                    r && i && i === this.uuid ? this.access_code = r : r && i && v("Invalid Vidyard player access code.", "warn")
                }
                e.prototype.toQueryString = function() {
                    var e, t = "?";
                    for (e in this)
                        if (this.hasOwnProperty(e) && "height" !== e && "uuid" !== e && "width" !== e && void 0 !== this[e]) {
                            t += "?" !== t ? "&" : "";
                            t += encodeURIComponent(e) + "=" + encodeURIComponent(this[e])
                        }
                    return "?" === t ? "" : t
                };
                return e
            }();

        function Zt(e) {
            void 0 === e && (e = p("vidyard-player-embed", "img"));
            for (var t = 0, n = e; t < n.length; t++) {
                var r = n[t],
                    i = new Xt(r),
                    o = i.uuid,
                    a = "https://" + B() + "/" + o + i.toQueryString();
                if (o && -1 === d(a, window.VidyardV4.preloadLinks)) {
                    Yt(o, a);
                    window.VidyardV4.preloadLinks.push(a)
                }
            }
        }

        function Yt(e, t) {
            var n = document.createElement("link");
            n.rel = "prefetch";
            n.crossOrigin = "anonymous";
            n.href = t;
            document.body.appendChild(n);
            return t
        }
        var en = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) {
                    t = arguments[n];
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                }
                return e
            },
            tn = function() {
                function e(e, t, n) {
                    var r = this;
                    this._ready = !1;
                    this._previousTime = null;
                    this._onMessageEventHandler = function(e) {
                        if (e.origin === "https://" + B()) {
                            var t;
                            try {
                                t = JSON.parse(e.data)
                            } catch (e) {
                                return
                            }
                            if ((!r.uuid || t.uuid === r.uuid) && "string" == typeof t.event) {
                                r._updateStatus(t);
                                if ("ready" === t.event) {
                                    r._ready = !0;
                                    window.VidyardV4.integrations.updatePlayer(r)
                                }
                                var n = r._callbackStore[t.event];
                                if (n)
                                    for (var i = 0, o = n; i < o.length; i++) {
                                        o[i].call(r, t.params, r)
                                    }
                            }
                        }
                    };
                    this._callbackStore = n || {
                        beforeSeek: [],
                        chapterComplete: [],
                        createCta: [],
                        fullScreenChange: [],
                        pause: [],
                        play: [],
                        playerComplete: [],
                        ready: [],
                        seek: [],
                        sidePlaylistOpen: [],
                        status: [],
                        timeupdate: [],
                        volumeChange: []
                    };
                    this.element = e;
                    this.uuid = t;
                    this.status = null;
                    this.metadata = null;
                    this.progressEventsUnsubscribe = [];
                    u("message", "onmessage", this._onMessageEventHandler)
                }
                e.prototype.on = function(e, t) {
                    var n = this;
                    if ("ready" === e && this.ready()) setTimeout(function() {
                        return t.call(n, void 0, n)
                    }, 0);
                    else if (void 0 !== this._callbackStore[e]) this._callbackStore[e].push(t);
                    else {
                        this._callbackStore[e] = [t];
                        v("The event name: " + e + " is not supported, your handler was setup regardless", "warn")
                    }
                };
                e.prototype.off = function(e, t) {
                    if (void 0 !== e) {
                        if (this._callbackStore[e])
                            if (t) {
                                var n = d(t, this._callbackStore[e]);
                                n > -1 && this._callbackStore[e].splice(n, 1)
                            } else this._callbackStore[e] = []
                    } else
                        for (var r in this._callbackStore) this._callbackStore.hasOwnProperty(r) && (this._callbackStore[r] = [])
                };
                e.prototype.ready = function() {
                    return this._ready
                };
                e.prototype.play = function() {
                    this._message({
                        event: "play"
                    })
                };
                e.prototype.pause = function() {
                    this._message({
                        event: "pause"
                    })
                };
                e.prototype.resume = function() {
                    this._message({
                        event: "resume"
                    })
                };
                e.prototype.seek = function(e) {
                    this._message({
                        event: "seek",
                        position: e
                    })
                };
                e.prototype.setVolume = function(e) {
                    this._message({
                        event: "setVolume",
                        newVolume: e
                    })
                };
                e.prototype.setPlaybackSpeed = function(e) {
                    this._message({
                        event: "setPlaybackSpeed",
                        speed: e
                    })
                };
                e.prototype.playChapter = function(e) {
                    this._message({
                        chapter_index: e,
                        event: "playChapter"
                    })
                };
                e.prototype.setAudioTrack = function(e) {
                    this._message({
                        audioTrackId: e,
                        event: "setAudioTrack"
                    })
                };
                e.prototype.enableCaption = function(e, t) {
                    this._message({
                        event: "enableCaption",
                        label: e,
                        language: t
                    })
                };
                e.prototype.disableCaption = function(e, t) {
                    this._message({
                        event: "disableCaption",
                        label: e,
                        language: t
                    })
                };
                e.prototype.consentToGDPR = function(e) {
                    this._message({
                        consent: e,
                        event: "consentToGDPR"
                    })
                };
                e.prototype.createCta = function(e) {
                    this._message({
                        attributes: f({
                            display_once: !1,
                            duration: 10,
                            fullscreen: !1,
                            html: "",
                            opacity: 1,
                            start: 0,
                            width: 300
                        }, e),
                        event: "createCta"
                    })
                };
                e.prototype.updateCta = function(e, t) {
                    this._message({
                        attributes: t,
                        event: "updateCta",
                        id: e
                    })
                };
                e.prototype.addEvent = function(e) {
                    var t = e.start,
                        n = void 0 === t ? 0 : t,
                        r = e.duration,
                        i = void 0 === r ? 1 : r,
                        o = e.chapterIndex,
                        a = void 0 === o ? 0 : o,
                        u = e.eventId;
                    u ? this._message({
                        chapterIndex: a,
                        duration: i,
                        event: "addEvent",
                        id: u,
                        start: n
                    }) : v("Missing arguments. Need eventId")
                };
                e.prototype.getCurrentChapter = function() {
                    return null === this.status ? null : this.status.chapterIndex
                };
                e.prototype.currentTime = function() {
                    return null === this.status ? null : this.status.currentTime
                };
                e.prototype.scrubbing = function() {
                    return null === this.status ? null : this.status.scrubbing
                };
                e.prototype.toggleFullscreen = function() {
                    var e = this,
                        t = C();
                    if (t) {
                        var n = this.iframe[t.requestFullscreen]();
                        n ? n.then(function() {
                            e._message({
                                event: "toggleFullscreen"
                            })
                        }) : this._message({
                            event: "toggleFullscreen"
                        });
                        u(t.fullscreenchange, "MSFullscreenChange", function() {
                            document[t.fullscreenElement] || e._message({
                                event: "exitFullscreen"
                            })
                        });
                        u("message", "onmessage", H(function(e) {
                            "fullScreenChange" === e.event && !1 === e.params && document[t.fullscreenElement] && document[t.exitFullscreen]()
                        }))
                    } else this._message({
                        event: "toggleFullscreen"
                    })
                };
                e.prototype.resetPlayer = function() {
                    this._message({
                        event: "resetPlayer"
                    })
                };
                e.prototype._message = function(e) {
                    !0 === this.ready() ? W(en({}, e, {
                        uuid: this.uuid
                    }), "https://" + B(), this.iframe) : v("Player is not ready yet! No messages can be recieved.", "error")
                };
                e.prototype._updateStatus = function(e) {
                    "object" == typeof e.status && (this.status = e.status);
                    "object" == typeof e.metadata && (this.metadata = e.metadata);
                    if (this.status) {
                        if (this.status.currentTime !== this._previousTime && this._callbackStore.timeupdate)
                            for (var t = 0, n = this._callbackStore.timeupdate; t < n.length; t++) {
                                n[t].call(this, this.status.currentTime, this)
                            }
                        this._previousTime = this.status.currentTime
                    }
                };
                return e
            }(),
            nn = function(e) {
                void 0 === e && (e = document);
                var t = p("vidyard-player-embed", "img", e);
                Zt(t);
                E(t).forEach(rn);
                Z()
            },
            rn = function(e) {
                var t = window.VidyardV4,
                    n = (t.integrations, t.api, t.players),
                    r = (t.playerReadyListeners, new Xt(e)),
                    i = r.uuid,
                    o = ee.setLevel(i);
                o("rendering");
                if (void 0 !== i) {
                    if ("true" === r.rendered) {
                        o("Already rendered");
                        return y(n, function(t) {
                            return t.placeholder === e
                        })
                    }
                    var a = Kt(i, r),
                        u = new tn(a, i);
                    e.setAttribute("data-rendered", "true");
                    e.parentNode.insertBefore(a, e);
                    u.placeholder = e;
                    u.container = a;
                    n.push(u);
                    ie(u);
                    "inline" === r.type ? xe({
                        dataParams: r,
                        player: u
                    }) : "lightbox" === r.type && Jt({
                        dataParams: r,
                        player: u
                    });
                    $t(u);
                    Qt(i);
                    window.Vidyard._players[u.uuid] = u;
                    return u
                }
                v('Embed without a UUID detected, it is impossible to insert a player without a UUID. Add "data-uuid=some_uuid" to the offending element.' + e)
            };

        function on(e) {
            e.progressEventsUnsubscribe.forEach(function(e) {
                return e()
            });
            e.progressEventsUnsubscribe = []
        }

        function an(e) {
            var t = window.VidyardV4.players;
            if (m(t, e)) {
                on(e);
                e.off();
                e.container.parentNode.removeChild(e.container);
                e.placeholder.parentNode.removeChild(e.placeholder);
                t.splice(d(e, t))
            } else v("Cannot destroy an unknown player", "warn")
        }

        function un(e) {
            if (void 0 !== e)
                for (var t = function(t) {
                        t.on("ready", function() {
                            t.consentToGDPR(e)
                        })
                    }, n = 0, r = window.VidyardV4.players; n < r.length; n++) {
                    t(r[n])
                }
        }

        function sn(e) {
            var t = 0,
                n = window.VidyardV4.api.GDPR,
                r = window.VidyardV4.players;
            if (0 === r.length) return e(!1);
            if (void 0 !== n._readyConsent) return e(n._readyConsent);
            for (var i = 0, o = r; i < o.length; i++) {
                o[i].on("ready", function() {
                    t !== r.length && (t += 1);
                    if (t === r.length) {
                        n._readyConsent = r.reduce(function(e, t) {
                            return t.status.consent && e
                        }, !0);
                        return e(n._readyConsent)
                    }
                })
            }
        }

        function cn(e) {
            return window.VidyardV4.players.filter(function(t) {
                return t.uuid === e
            })
        }
        var ln = cn,
            dn = function(e) {
                e.sort(function(e, t) {
                    return e < t ? -1 : e > t ? 1 : 0
                });
                for (var t = 0; t < e.length;) e[t] === e[t + 1] ? e.splice(t + 1, 1) : t += 1;
                return e
            };

        function fn() {
            this._compare = function(e, t) {
                return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : e[1] < t[1] ? -1 : e[1] > t[1] ? 1 : 0
            }
        }
        fn.create = function() {
            return new fn
        };
        fn.prototype = new Array;
        fn.prototype.constructor = Array.prototype.constructor;
        fn.prototype.insertOne = function(e) {
            var t = this.bsearch(e);
            this.splice(t + 1, 0, e);
            return t + 1
        };
        fn.prototype.remove = function(e) {
            this.splice(e, 1);
            return this
        };
        fn.prototype.bsearch = function(e) {
            if (!this.length) return -1;
            for (var t, n, r, i = 0, o = this.length; o - i > 1;) {
                n = this[t = Math.floor((i + o) / 2)];
                if (0 === (r = this._compare(e, n))) return t;
                r > 0 ? i = t : o = t
            }
            return 0 === i && this._compare(this[0], e) > 0 ? -1 : i
        };

        function pn(e) {
            var t, n = null,
                r = [];
            for (t = 0; t < e.length; ++t)
                if (!n || n[1] < e[t][0]) {
                    n && r.push(n);
                    n = [e[t][0], e[t][1]]
                } else e[t][1] > n[1] && (n[1] = e[t][1]);
            n && r.push(n);
            return r
        }

        function hn(e, t, n) {
            var r = [],
                i = !1,
                o = e.getCurrentChapter();

            function a() {
                var t = e.getCurrentChapter();
                r[t] = {
                    interval: [0, 0],
                    intervals: fn.create(),
                    thresholds: n.slice()
                };
                return r[t]
            }

            function u(t, n) {
                var o, u, s, c = 0,
                    l = e.getCurrentChapter();
                void 0 === r[l] && a();
                if (!(i || "object" != typeof e.metadata || t <= r[l].interval[1])) {
                    r[l].interval[1] = t;
                    u = r[l].intervals.insertOne(r[l].interval);
                    if ((o = pn(r[l].intervals)).length + 1 < r[l].intervals.length) {
                        r[l].intervals = fn.create();
                        for (s = 0; s < o.length; ++s) {
                            c += o[s][1] - o[s][0];
                            r[l].intervals.insertOne(o[s])
                        }
                    } else {
                        for (s = 0; s < o.length; ++s) c += o[s][1] - o[s][0];
                        r[l].intervals.remove(u)
                    }
                    c = "number" == typeof e.metadata.chapters_attributes[l].video_attributes.length_in_milliseconds ? c / e.metadata.chapters_attributes[l].video_attributes.length_in_milliseconds * 1e5 : c / e.metadata.chapters_attributes[l].video_attributes.length_in_seconds * 100;
                    return Math.round(c) >= r[l].thresholds[0] ? n({
                        chapter: l,
                        event: r[l].thresholds.shift(),
                        player: e
                    }) : void 0
                }
            }
            var s = function(n) {
                    var r = e.getCurrentChapter();
                    o === r ? u(n, t) : o = r
                },
                c = function(t) {
                    var n = e.getCurrentChapter();
                    if (void 0 !== r[n]) {
                        !1 === i && (r[n].interval[1] = t.start);
                        i = !0
                    }
                },
                l = function(t) {
                    var n = t,
                        o = e.getCurrentChapter();
                    void 0 === r[o] && a();
                    r[o].intervals.insertOne(r[o].interval.slice(0));
                    r[o].interval[0] = n;
                    r[o].interval[1] = n;
                    i = !1
                },
                d = function(e) {
                    r[e].interval = [0, 0];
                    i = !1
                };
            e.on("timeupdate", s);
            e.on("beforeSeek", c);
            e.on("play", l);
            e.on("chapterComplete", d);
            return {
                player: e,
                removeEventListeners: function() {
                    e.off("beforeSeek", c);
                    e.off("chapterComplete", d);
                    e.off("play", l);
                    e.off("timeupdate", s);
                    e = null;
                    r = []
                }
            }
        }

        function vn(e, t, n) {
            var r;
            void 0 === t && (t = [1, 25, 50, 75, 90]);
            var i = [],
                o = n ? ((r = {})[n.uuid] = n, r) : yn(),
                a = dn(t),
                u = function(t) {
                    if (o.hasOwnProperty(t) && t.length > 0 && "" !== o[t]) {
                        var n = hn(o[t], e, a);
                        i.push(n)
                    } else v(function() {
                        return console.error("Could not attach Progress Events to player " + t + ", make sure to load the Vidyard Player API")
                    })
                };
            for (var s in o) u(s);
            0 === i.length && v(function() {
                return console.warn("No Vidyard Players found. (include this script below player embed codes)")
            });
            return i
        }

        function yn() {
            try {
                return window.Vidyard.players()
            } catch (e) {
                v(function() {
                    return console.error("The Vidyard Player API must be loaded before this script can execute")
                });
                return {}
            }
        }

        function mn() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var n = vn.apply(void 0, e);
            Object.keys(n).forEach(function(e) {
                var t = n[e],
                    r = t.player,
                    i = t.removeEventListeners;
                r.progressEventsUnsubscribe && r.progressEventsUnsubscribe.push(i)
            })
        }
        var gn = function(e) {
            ee.setLevel("placeholder")("rendering player from placeholder image");
            var t = rn(e);
            return new a(function(e) {
                t.showLightbox ? e(t) : t.on("ready", function() {
                    return e(t)
                })
            })
        };

        function bn(e) {
            var t = e instanceof HTMLImageElement ? e : be(e);
            return ge(t).then(gn).catch(function(e) {
                return v(ye.errors.placeholder, "warn")
            })
        }
        var wn = {
                _debug: ne,
                api: {
                    GDPR: {
                        consent: un,
                        hasConsentOnReady: sn
                    },
                    addReadyListener: re,
                    destroyPlayer: an,
                    getPlayerMetadata: zt,
                    getPlayersByUUID: ln,
                    progressEvents: mn,
                    renderDOMPlayers: nn,
                    renderPlayer: bn
                },
                integrations: new Q,
                jsonp: {},
                playerReadyListeners: {
                    undefined: []
                },
                players: [],
                preloadLinks: []
            },
            xn = {
                _players: {},
                players: function() {
                    return window.VidyardV4.players.reduce(function(e, t) {
                        e[t.uuid] = t;
                        return e
                    }, {})
                }
            },
            kn = (n(11), n(1));

        function En(e) {
            var t = e.error,
                n = e.location,
                r = e.message,
                i = e.navigator,
                o = e.timeStamp,
                a = e.type,
                u = e.vyGlobal;
            return {
                data: {
                    body: {
                        trace: {
                            exception: {
                                class: t.name,
                                message: r
                            },
                            frames: kn.parse(t).map(function(e) {
                                return {
                                    code: e.source,
                                    colno: e.columnNumber,
                                    filename: e.fileName,
                                    lineno: e.lineNumber,
                                    method: e.functionName
                                }
                            })
                        }
                    },
                    client: {
                        cpu: i.platform,
                        javascript: {
                            browser: i.userAgent,
                            guess_uncaught_frames: !0,
                            source_map_enabled: !0
                        }
                    },
                    code_version: L,
                    custom: {
                        jsonpRequests: Object.keys(u.jsonp),
                        playbackUrlOverride: window.VIDYARD_PLAYBACK_URL,
                        players: u.players.map(function(e) {
                            return {
                                iframe: e.iframe ? {
                                    src: e.iframe.src
                                } : {},
                                metadata: e.metadata,
                                org: e.org ? {
                                    id: e.org.id,
                                    foundIntegrations: e.org.foundIntegrations
                                } : {},
                                uuid: e.uuid
                            }
                        }),
                        preloadLinks: u.preloadLinks
                    },
                    environment: B(),
                    fingerprint: t.name,
                    language: "javascript",
                    level: a,
                    platform: "browser",
                    request: {
                        query_string: n.search,
                        url: n.href
                    },
                    timestamp: o
                }
            }
        }
        var _n = function(e) {
                void 0 === e && (e = "");
                return e.match(P)
            },
            On = function(e) {
                var t = e.error,
                    n = e.filename,
                    r = e.message,
                    i = e.timeStamp,
                    o = e.type;
                if (_n(n)) {
                    var a = En({
                        error: t,
                        location: window.location,
                        message: r,
                        navigator: window.navigator,
                        timeStamp: i,
                        type: o,
                        vyGlobal: window.VidyardV4
                    });
                    O({
                        endpoint: z(),
                        method: "POST",
                        payload: a
                    }).then(function(e) {
                        return v("Error logged " + e)
                    }, function(e) {
                        return v("Error log failed " + e)
                    })
                }
            };

        function Cn() {
            u("error", "onerror", On, window);
            u("unhandledrejection", "", function(e) {
                var t = e.reason,
                    n = e.timeStamp,
                    r = e.type;
                if (e.reason instanceof Error && _n(t.stack)) {
                    e.preventDefault();
                    On({
                        error: t,
                        filename: t.stack,
                        message: t.message,
                        timeStamp: n,
                        type: r
                    })
                }
            })
        }
        n.d(t, "_debug", function() {
            return In
        });
        n.d(t, "api", function() {
            return Nn
        });
        n.d(t, "players", function() {
            return Sn
        });
        Cn();
        window.VidyardV4 = window.VidyardV4 || wn;
        window.Vidyard = window.Vidyard || xn;
        Z();
        var In = wn._debug,
            Nn = wn.api,
            Sn = wn.players;
        t.default = wn
    }, function(e, t, n) {
        var r, i, o;
        ! function(n, a) {
            "use strict";
            i = [], void 0 !== (o = "function" == typeof(r = a) ? r.apply(t, i) : r) && (e.exports = o)
        }(0, function() {
            "use strict";

            function e(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            }

            function t(e) {
                return e.charAt(0).toUpperCase() + e.substring(1)
            }

            function n(e) {
                return function() {
                    return this[e]
                }
            }
            var r = ["isConstructor", "isEval", "isNative", "isToplevel"],
                i = ["columnNumber", "lineNumber"],
                o = ["fileName", "functionName", "source"],
                a = ["args"],
                u = r.concat(i, o, a);

            function s(e) {
                if (e instanceof Object)
                    for (var n = 0; n < u.length; n++) e.hasOwnProperty(u[n]) && void 0 !== e[u[n]] && this["set" + t(u[n])](e[u[n]])
            }
            s.prototype = {
                getArgs: function() {
                    return this.args
                },
                setArgs: function(e) {
                    if ("[object Array]" !== Object.prototype.toString.call(e)) throw new TypeError("Args must be an Array");
                    this.args = e
                },
                getEvalOrigin: function() {
                    return this.evalOrigin
                },
                setEvalOrigin: function(e) {
                    if (e instanceof s) this.evalOrigin = e;
                    else {
                        if (!(e instanceof Object)) throw new TypeError("Eval Origin must be an Object or StackFrame");
                        this.evalOrigin = new s(e)
                    }
                },
                toString: function() {
                    return (this.getFunctionName() || "{anonymous}") + ("(" + (this.getArgs() || []).join(",") + ")") + (this.getFileName() ? "@" + this.getFileName() : "") + (e(this.getLineNumber()) ? ":" + this.getLineNumber() : "") + (e(this.getColumnNumber()) ? ":" + this.getColumnNumber() : "")
                }
            };
            for (var c = 0; c < r.length; c++) {
                s.prototype["get" + t(r[c])] = n(r[c]);
                s.prototype["set" + t(r[c])] = function(e) {
                    return function(t) {
                        this[e] = Boolean(t)
                    }
                }(r[c])
            }
            for (var l = 0; l < i.length; l++) {
                s.prototype["get" + t(i[l])] = n(i[l]);
                s.prototype["set" + t(i[l])] = function(t) {
                    return function(n) {
                        if (!e(n)) throw new TypeError(t + " must be a Number");
                        this[t] = Number(n)
                    }
                }(i[l])
            }
            for (var d = 0; d < o.length; d++) {
                s.prototype["get" + t(o[d])] = n(o[d]);
                s.prototype["set" + t(o[d])] = function(e) {
                    return function(t) {
                        this[e] = String(t)
                    }
                }(o[d])
            }
            return s
        })
    }, function(e, t) {
        e.exports = function(e) {
            var t = "undefined" != typeof window && window.location;
            if (!t) throw new Error("fixUrls requires window.location");
            if (!e || "string" != typeof e) return e;
            var n = t.protocol + "//" + t.host,
                r = n + t.pathname.replace(/\/[^\/]*$/, "/");
            return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(e, t) {
                var i, o = t.trim().replace(/^"(.*)"$/, function(e, t) {
                    return t
                }).replace(/^'(.*)'$/, function(e, t) {
                    return t
                });
                if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)) return e;
                i = 0 === o.indexOf("//") ? o : 0 === o.indexOf("/") ? n + o : r + o.replace(/^\.\//, "");
                return "url(" + JSON.stringify(i) + ")"
            })
        }
    }, function(e, t, n) {
        var r, i = {},
            o = function(e) {
                var t;
                return function() {
                    void 0 === t && (t = e.apply(this, arguments));
                    return t
                }
            }(function() {
                return window && document && document.all && !window.atob
            }),
            a = function(e) {
                return document.querySelector(e)
            },
            u = (r = {}, function(e) {
                if ("function" == typeof e) return e();
                if (void 0 === r[e]) {
                    var t = a.call(this, e);
                    if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
                        t = t.contentDocument.head
                    } catch (e) {
                        t = null
                    }
                    r[e] = t
                }
                return r[e]
            }),
            s = null,
            c = 0,
            l = [],
            d = n(7);
        e.exports = function(e, t) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {};
            t.singleton || "boolean" == typeof t.singleton || (t.singleton = o());
            t.insertInto || (t.insertInto = "head");
            t.insertAt || (t.insertAt = "bottom");
            var n = p(e, t);
            f(n, t);
            return function(e) {
                for (var r = [], o = 0; o < n.length; o++) {
                    var a = n[o];
                    (u = i[a.id]).refs--;
                    r.push(u)
                }
                if (e) {
                    f(p(e, t), t)
                }
                for (o = 0; o < r.length; o++) {
                    var u;
                    if (0 === (u = r[o]).refs) {
                        for (var s = 0; s < u.parts.length; s++) u.parts[s]();
                        delete i[u.id]
                    }
                }
            }
        };

        function f(e, t) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n],
                    o = i[r.id];
                if (o) {
                    o.refs++;
                    for (var a = 0; a < o.parts.length; a++) o.parts[a](r.parts[a]);
                    for (; a < r.parts.length; a++) o.parts.push(b(r.parts[a], t))
                } else {
                    var u = [];
                    for (a = 0; a < r.parts.length; a++) u.push(b(r.parts[a], t));
                    i[r.id] = {
                        id: r.id,
                        refs: 1,
                        parts: u
                    }
                }
            }
        }

        function p(e, t) {
            for (var n = [], r = {}, i = 0; i < e.length; i++) {
                var o = e[i],
                    a = t.base ? o[0] + t.base : o[0],
                    u = {
                        css: o[1],
                        media: o[2],
                        sourceMap: o[3]
                    };
                r[a] ? r[a].parts.push(u) : n.push(r[a] = {
                    id: a,
                    parts: [u]
                })
            }
            return n
        }

        function h(e, t) {
            var n = u(e.insertInto);
            if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var r = l[l.length - 1];
            if ("top" === e.insertAt) {
                r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild);
                l.push(t)
            } else if ("bottom" === e.insertAt) n.appendChild(t);
            else {
                if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var i = u(e.insertInto + " " + e.insertAt.before);
                n.insertBefore(t, i)
            }
        }

        function v(e) {
            if (null === e.parentNode) return !1;
            e.parentNode.removeChild(e);
            var t = l.indexOf(e);
            t >= 0 && l.splice(t, 1)
        }

        function y(e) {
            var t = document.createElement("style");
            void 0 === e.attrs.type && (e.attrs.type = "text/css");
            g(t, e.attrs);
            h(e, t);
            return t
        }

        function m(e) {
            var t = document.createElement("link");
            void 0 === e.attrs.type && (e.attrs.type = "text/css");
            e.attrs.rel = "stylesheet";
            g(t, e.attrs);
            h(e, t);
            return t
        }

        function g(e, t) {
            Object.keys(t).forEach(function(n) {
                e.setAttribute(n, t[n])
            })
        }

        function b(e, t) {
            var n, r, i, o;
            if (t.transform && e.css) {
                if (!(o = t.transform(e.css))) return function() {};
                e.css = o
            }
            if (t.singleton) {
                var a = c++;
                n = s || (s = y(t));
                r = k.bind(null, n, a, !1);
                i = k.bind(null, n, a, !0)
            } else if (e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa) {
                n = m(t);
                r = _.bind(null, n, t);
                i = function() {
                    v(n);
                    n.href && URL.revokeObjectURL(n.href)
                }
            } else {
                n = y(t);
                r = E.bind(null, n);
                i = function() {
                    v(n)
                }
            }
            r(e);
            return function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    r(e = t)
                } else i()
            }
        }
        var w, x = (w = [], function(e, t) {
            w[e] = t;
            return w.filter(Boolean).join("\n")
        });

        function k(e, t, n, r) {
            var i = n ? "" : r.css;
            if (e.styleSheet) e.styleSheet.cssText = x(t, i);
            else {
                var o = document.createTextNode(i),
                    a = e.childNodes;
                a[t] && e.removeChild(a[t]);
                a.length ? e.insertBefore(o, a[t]) : e.appendChild(o)
            }
        }

        function E(e, t) {
            var n = t.css,
                r = t.media;
            r && e.setAttribute("media", r);
            if (e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }

        function _(e, t, n) {
            var r = n.css,
                i = n.sourceMap,
                o = void 0 === t.convertToAbsoluteUrls && i;
            (t.convertToAbsoluteUrls || o) && (r = d(r));
            i && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
            var a = new Blob([r], {
                    type: "text/css"
                }),
                u = e.href;
            e.href = URL.createObjectURL(a);
            u && URL.revokeObjectURL(u)
        }
    }, function(e, t) {
        e.exports = function(e) {
            var t = [];
            t.toString = function() {
                return this.map(function(t) {
                    var r = n(t, e);
                    return t[2] ? "@media " + t[2] + "{" + r + "}" : r
                }).join("")
            };
            t.i = function(e, n) {
                "string" == typeof e && (e = [
                    [null, e, ""]
                ]);
                for (var r = {}, i = 0; i < this.length; i++) {
                    var o = this[i][0];
                    "number" == typeof o && (r[o] = !0)
                }
                for (i = 0; i < e.length; i++) {
                    var a = e[i];
                    if ("number" != typeof a[0] || !r[a[0]]) {
                        n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")");
                        t.push(a)
                    }
                }
            };
            return t
        };

        function n(e, t) {
            var n = e[1] || "",
                i = e[3];
            if (!i) return n;
            if (t && "function" == typeof btoa) {
                var o = r(i),
                    a = i.sources.map(function(e) {
                        return "/*# sourceURL=" + i.sourceRoot + e + " */"
                    });
                return [n].concat(a).concat([o]).join("\n")
            }
            return [n].join("\n")
        }

        function r(e) {
            return "/*# " + ("sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e))))) + " */"
        }
    }, function(e, t, n) {
        (e.exports = n(9)(!1)).push([e.i, '.vidyard-player-container .play-button{position:absolute;width:16%;height:auto;border-radius:50%;border:none;cursor:pointer;opacity:.65;filter:alpha(opacity = 65);transition:opacity .2s linear;overflow:hidden;font-size:0;padding:0;min-width:20px;top:50%;left:50%;transform:translate(-50%,-50%);-webkit-appearance:initial!important;-moz-appearance:initial!important;appearance:initial!important}.vidyard-player-container .play-button .play-button-size{padding-top:100%;width:100%}.vidyard-player-container .play-button .arrow-size{position:absolute;top:50%;left:50%;width:35%;height:auto;margin:-25% 0 0 -12%;overflow:hidden}.vidyard-player-container .play-button .arrow-size-ratio{padding-top:150%;width:100%}.vidyard-player-container .play-button .arrow{position:absolute;top:50%;left:auto;right:0;bottom:auto;width:0;height:0;margin:-200px 0 -200px -300px;border:200px solid transparent;border-left:300px solid #fff;border-right:none}.vidyard-lightbox-thumbnail:hover .play-button{opacity:1;filter:alpha(opacity = 100);zoom:1}.vidyard-player-container{position:relative;height:100%;text-align:center}.vidyard-player-container img{height:100%}.vidyard-player-container .play-button{display:none}.vidyard-close-container{position:fixed;right:20px;top:20px;height:34px;width:34px;cursor:pointer;z-index:1000}.vidyard-close-container:focus{outline:1px dotted grey}.vidyard-close-x{position:absolute;height:100%;width:100%;color:#fff;font-size:2em;text-align:center;line-height:34px}.vidyard-close-x:hover{color:#ddd}.vidyard-close-x:hover:after,.vidyard-close-x:hover:before{background:#ddd}.vidyard-close-x:after,.vidyard-close-x:before{content:"";position:absolute;background:#fff;display:block;left:50%;top:50%;height:65%;width:2px;transition:all .2s;-ms-high-contrast-adjust:none}.vidyard-close-x:before{transform:translate(-50%,-50%) rotate(45deg);-ms-transform:translate(-50%,-50%) rotate(45deg)}.vidyard-close-x:after{transform:translate(-50%,-50%) rotate(-45deg);-ms-transform:translate(-50%,-50%) rotate(-45deg)}.vidyard-close-x.simple-close:after,.vidyard-close-x.simple-close:before{display:none}.vidyard-lightbox-thumbnail{width:100%;height:100%;margin:auto}.vidyard-lightbox-image{height:100%;left:0;position:absolute;top:0;width:100%}.vidyard-lightbox-centering{cursor:pointer;height:0;max-width:100%;overflow:hidden;padding-bottom:56.25%;position:relative}.vidyard-lightbox-content-backer{-webkit-transform:opacity 1s,filter 1s;-ms-transform:opacity 1s,filter 1s;transition:opacity 1s,filter 1s;background-color:#000;height:100%;width:100%;position:absolute}#vidyard-overlay-wrapper,.vidyard-lightbox-content-backer{filter:alpha(opacity = 0);opacity:0;top:0;right:0;bottom:0;left:0}#vidyard-overlay-wrapper{position:relative;box-sizing:border-box;display:none;transition:opacity .5s,filter .5s}#vidyard-overlay{top:0;right:0;bottom:0;left:0;opacity:.9;filter:alpha(opacity = 90);width:100%;height:100%;background-color:#000;z-index:800}#vidyard-content-fixed,#vidyard-overlay{position:fixed;box-sizing:border-box;display:none}#vidyard-content-fixed{opacity:1;z-index:900;text-align:center;top:5%;right:5%;bottom:5%;left:5%;width:90%}#vidyard-popbox{display:inline-block;position:absolute;left:50%;top:50%;-webit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}#vidyard-popbox-constraint{opacity:0;filter:alpha(opacity = 0);display:block;visibility:hidden}#vidyard-popbox-constraint.landscape{height:90vh}#vidyard-popbox-constraint.portrait{width:90vw}.vidyard-player-container div[class^=vidyard-iframe-]{z-index:1}.vidyard-player-container div[class^=vidyard-div-]{background-repeat:no-repeat;background-position:0 50%;background-size:100%}img.vidyard-player-embed{width:100%}img.vidyard-player-embed.inserted{position:absolute;top:0;left:0;z-index:0;max-width:100%!important}.vidyard-player-container.playlist-open{padding-right:319px;width:auto!important}.vidyard-player-container.playlist-open div[class^=vidyard-div-]{width:calc(100% + 319px);max-width:calc(100% + 319px)!important;background-size:calc(100% - 319px);background-color:#f5f9ff}.vidyard-player-container.playlist-open div[class^=vidyard-div-] img.vidyard-player-embed{width:calc(100% - 319px)!important}', ""])
    }, function(e, t, n) {
        var r, i = n(10);
        "string" == typeof i && (i = [
            [e.i, i, ""]
        ]);
        var o = {
            hmr: !0
        };
        o.transform = r;
        o.insertInto = void 0;
        n(8)(i, o);
        i.locals && (e.exports = i.locals);
        0
    }, , function(e, t) {
        var n, r, i = e.exports = {};

        function o() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }! function() {
            try {
                n = "function" == typeof setTimeout ? setTimeout : o
            } catch (e) {
                n = o
            }
            try {
                r = "function" == typeof clearTimeout ? clearTimeout : a
            } catch (e) {
                r = a
            }
        }();

        function u(e) {
            if (n === setTimeout) return setTimeout(e, 0);
            if ((n === o || !n) && setTimeout) {
                n = setTimeout;
                return setTimeout(e, 0)
            }
            try {
                return n(e, 0)
            } catch (t) {
                try {
                    return n.call(null, e, 0)
                } catch (t) {
                    return n.call(this, e, 0)
                }
            }
        }

        function s(e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === a || !r) && clearTimeout) {
                r = clearTimeout;
                return clearTimeout(e)
            }
            try {
                return r(e)
            } catch (t) {
                try {
                    return r.call(null, e)
                } catch (t) {
                    return r.call(this, e)
                }
            }
        }
        var c, l = [],
            d = !1,
            f = -1;

        function p() {
            if (d && c) {
                d = !1;
                c.length ? l = c.concat(l) : f = -1;
                l.length && h()
            }
        }

        function h() {
            if (!d) {
                var e = u(p);
                d = !0;
                for (var t = l.length; t;) {
                    c = l;
                    l = [];
                    for (; ++f < t;) c && c[f].run();
                    f = -1;
                    t = l.length
                }
                c = null;
                d = !1;
                s(e)
            }
        }
        i.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            l.push(new v(e, t));
            1 !== l.length || d || u(h)
        };

        function v(e, t) {
            this.fun = e;
            this.array = t
        }
        v.prototype.run = function() {
            this.fun.apply(null, this.array)
        };
        i.title = "browser";
        i.browser = !0;
        i.env = {};
        i.argv = [];
        i.version = "";
        i.versions = {};

        function y() {}
        i.on = y;
        i.addListener = y;
        i.once = y;
        i.off = y;
        i.removeListener = y;
        i.removeAllListeners = y;
        i.emit = y;
        i.prependListener = y;
        i.prependOnceListener = y;
        i.listeners = function(e) {
            return []
        };
        i.binding = function(e) {
            throw new Error("process.binding is not supported")
        };
        i.cwd = function() {
            return "/"
        };
        i.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        };
        i.umask = function() {
            return 0
        }
    }, function(e, t, n) {
        (function(e, t) {
            ! function(e, n) {
                "use strict";
                if (!e.setImmediate) {
                    var r, i = 1,
                        o = {},
                        a = !1,
                        u = e.document,
                        s = Object.getPrototypeOf && Object.getPrototypeOf(e);
                    s = s && s.setTimeout ? s : e;
                    "[object process]" === {}.toString.call(e.process) ? p() : h() ? v() : e.MessageChannel ? y() : u && "onreadystatechange" in u.createElement("script") ? m() : g();
                    s.setImmediate = c;
                    s.clearImmediate = l
                }

                function c(e) {
                    "function" != typeof e && (e = new Function("" + e));
                    for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
                    var a = {
                        callback: e,
                        args: t
                    };
                    o[i] = a;
                    r(i);
                    return i++
                }

                function l(e) {
                    delete o[e]
                }

                function d(e) {
                    var t = e.callback,
                        r = e.args;
                    switch (r.length) {
                        case 0:
                            t();
                            break;
                        case 1:
                            t(r[0]);
                            break;
                        case 2:
                            t(r[0], r[1]);
                            break;
                        case 3:
                            t(r[0], r[1], r[2]);
                            break;
                        default:
                            t.apply(n, r)
                    }
                }

                function f(e) {
                    if (a) setTimeout(f, 0, e);
                    else {
                        var t = o[e];
                        if (t) {
                            a = !0;
                            try {
                                d(t)
                            } finally {
                                l(e);
                                a = !1
                            }
                        }
                    }
                }

                function p() {
                    r = function(e) {
                        t.nextTick(function() {
                            f(e)
                        })
                    }
                }

                function h() {
                    if (e.postMessage && !e.importScripts) {
                        var t = !0,
                            n = e.onmessage;
                        e.onmessage = function() {
                            t = !1
                        };
                        e.postMessage("", "*");
                        e.onmessage = n;
                        return t
                    }
                }

                function v() {
                    var t = "setImmediate$" + Math.random() + "$",
                        n = function(n) {
                            n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && f(+n.data.slice(t.length))
                        };
                    e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n);
                    r = function(n) {
                        e.postMessage(t + n, "*")
                    }
                }

                function y() {
                    var e = new MessageChannel;
                    e.port1.onmessage = function(e) {
                        f(e.data)
                    };
                    r = function(t) {
                        e.port2.postMessage(t)
                    }
                }

                function m() {
                    var e = u.documentElement;
                    r = function(t) {
                        var n = u.createElement("script");
                        n.onreadystatechange = function() {
                            f(t);
                            n.onreadystatechange = null;
                            e.removeChild(n);
                            n = null
                        };
                        e.appendChild(n)
                    }
                }

                function g() {
                    r = function(e) {
                        setTimeout(f, 0, e)
                    }
                }
            }("undefined" == typeof self ? void 0 === e ? this : e : self)
        }).call(this, n(0), n(13))
    }, function(e, t, n) {
        (function(e) {
            var r = void 0 !== e && e || "undefined" != typeof self && self || window,
                i = Function.prototype.apply;
            t.setTimeout = function() {
                return new o(i.call(setTimeout, r, arguments), clearTimeout)
            };
            t.setInterval = function() {
                return new o(i.call(setInterval, r, arguments), clearInterval)
            };
            t.clearTimeout = t.clearInterval = function(e) {
                e && e.close()
            };

            function o(e, t) {
                this._id = e;
                this._clearFn = t
            }
            o.prototype.unref = o.prototype.ref = function() {};
            o.prototype.close = function() {
                this._clearFn.call(r, this._id)
            };
            t.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId);
                e._idleTimeout = t
            };
            t.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId);
                e._idleTimeout = -1
            };
            t._unrefActive = t.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                }, t))
            };
            n(14);
            t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate;
            t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
        }).call(this, n(0))
    }])
});

//# sourceMappingURL=v4.umd.js.map