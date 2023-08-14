(() => {
  'use strict';
  function t(t, e) {
    const n = e.width / t.width,
      r = e.height / t.height;
    return ({ width: i, height: o, x: s, y: c }) => ({
      width: (i = Math.round(i * n)),
      height: (o = Math.round(o * r)),
      x: (s = Math.round(e.x + (s - t.x) * n)),
      y: (c = Math.round(e.y + (c - t.y) * r)),
    });
  }
  function e(t, e) {
    return (
      t.x >= e.x && t.x <= e.x + e.width && t.y >= e.y && t.y <= e.y + e.height
    );
  }
  const n = ['cmd', 'ctrl', 'alt'],
    r = [...n, 'shift'];
  var i = function (t, e) {
    return (
      (i =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        }),
      i(t, e)
    );
  };
  function o(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError(
        'Class extends value ' + String(e) + ' is not a constructor or null',
      );
    function n() {
      this.constructor = t;
    }
    i(t, e),
      (t.prototype =
        null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
  }
  function s(t) {
    var e = 'function' == typeof Symbol && Symbol.iterator,
      n = e && t[e],
      r = 0;
    if (n) return n.call(t);
    if (t && 'number' == typeof t.length)
      return {
        next: function () {
          return (
            t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t }
          );
        },
      };
    throw new TypeError(
      e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
    );
  }
  function c(t, e) {
    var n = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!n) return t;
    var r,
      i,
      o = n.call(t),
      s = [];
    try {
      for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
        s.push(r.value);
    } catch (t) {
      i = { error: t };
    } finally {
      try {
        r && !r.done && (n = o.return) && n.call(o);
      } finally {
        if (i) throw i.error;
      }
    }
    return s;
  }
  function a(t, e, n) {
    if (n || 2 === arguments.length)
      for (var r, i = 0, o = e.length; i < o; i++)
        (!r && i in e) ||
          (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
    return t.concat(r || Array.prototype.slice.call(e));
  }
  function u(t) {
    return 'function' == typeof t;
  }
  function l(t) {
    var e = t(function (t) {
      Error.call(t), (t.stack = new Error().stack);
    });
    return (
      (e.prototype = Object.create(Error.prototype)),
      (e.prototype.constructor = e),
      e
    );
  }
  Object.create, Object.create;
  var h = l(function (t) {
    return function (e) {
      t(this),
        (this.message = e
          ? e.length +
            ' errors occurred during unsubscription:\n' +
            e
              .map(function (t, e) {
                return e + 1 + ') ' + t.toString();
              })
              .join('\n  ')
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = e);
    };
  });
  function f(t, e) {
    if (t) {
      var n = t.indexOf(e);
      0 <= n && t.splice(n, 1);
    }
  }
  var d = (function () {
      function t(t) {
        (this.initialTeardown = t),
          (this.closed = !1),
          (this._parentage = null),
          (this._finalizers = null);
      }
      var e;
      return (
        (t.prototype.unsubscribe = function () {
          var t, e, n, r, i;
          if (!this.closed) {
            this.closed = !0;
            var o = this._parentage;
            if (o)
              if (((this._parentage = null), Array.isArray(o)))
                try {
                  for (var l = s(o), f = l.next(); !f.done; f = l.next())
                    f.value.remove(this);
                } catch (e) {
                  t = { error: e };
                } finally {
                  try {
                    f && !f.done && (e = l.return) && e.call(l);
                  } finally {
                    if (t) throw t.error;
                  }
                }
              else o.remove(this);
            var d = this.initialTeardown;
            if (u(d))
              try {
                d();
              } catch (t) {
                i = t instanceof h ? t.errors : [t];
              }
            var p = this._finalizers;
            if (p) {
              this._finalizers = null;
              try {
                for (var y = s(p), w = y.next(); !w.done; w = y.next()) {
                  var b = w.value;
                  try {
                    v(b);
                  } catch (t) {
                    (i = null != i ? i : []),
                      t instanceof h
                        ? (i = a(a([], c(i)), c(t.errors)))
                        : i.push(t);
                  }
                }
              } catch (t) {
                n = { error: t };
              } finally {
                try {
                  w && !w.done && (r = y.return) && r.call(y);
                } finally {
                  if (n) throw n.error;
                }
              }
            }
            if (i) throw new h(i);
          }
        }),
        (t.prototype.add = function (e) {
          var n;
          if (e && e !== this)
            if (this.closed) v(e);
            else {
              if (e instanceof t) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                e,
              );
            }
        }),
        (t.prototype._hasParent = function (t) {
          var e = this._parentage;
          return e === t || (Array.isArray(e) && e.includes(t));
        }),
        (t.prototype._addParent = function (t) {
          var e = this._parentage;
          this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
        }),
        (t.prototype._removeParent = function (t) {
          var e = this._parentage;
          e === t ? (this._parentage = null) : Array.isArray(e) && f(e, t);
        }),
        (t.prototype.remove = function (e) {
          var n = this._finalizers;
          n && f(n, e), e instanceof t && e._removeParent(this);
        }),
        (t.EMPTY = (((e = new t()).closed = !0), e)),
        t
      );
    })(),
    p = d.EMPTY;
  function y(t) {
    return (
      t instanceof d ||
      (t && 'closed' in t && u(t.remove) && u(t.add) && u(t.unsubscribe))
    );
  }
  function v(t) {
    u(t) ? t() : t.unsubscribe();
  }
  var w = null,
    b = null,
    m = void 0,
    g = !1,
    x = !1,
    _ = {
      setTimeout: function (t, e) {
        for (var n = [], r = 2; r < arguments.length; r++)
          n[r - 2] = arguments[r];
        var i = _.delegate;
        return (null == i ? void 0 : i.setTimeout)
          ? i.setTimeout.apply(i, a([t, e], c(n)))
          : setTimeout.apply(void 0, a([t, e], c(n)));
      },
      clearTimeout: function (t) {
        var e = _.delegate;
        return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(t);
      },
      delegate: void 0,
    };
  function S() {}
  var k = F('C', void 0, void 0);
  function F(t, e, n) {
    return { kind: t, value: e, error: n };
  }
  var M = null;
  function E(t) {
    if (g) {
      var e = !M;
      if ((e && (M = { errorThrown: !1, error: null }), t(), e)) {
        var n = M,
          r = n.errorThrown,
          i = n.error;
        if (((M = null), r)) throw i;
      }
    } else t();
  }
  var O = (function (t) {
      function e(e) {
        var n = t.call(this) || this;
        return (
          (n.isStopped = !1),
          e ? ((n.destination = e), y(e) && e.add(n)) : (n.destination = I),
          n
        );
      }
      return (
        o(e, t),
        (e.create = function (t, e, n) {
          return new T(t, e, n);
        }),
        (e.prototype.next = function (t) {
          this.isStopped
            ? A(
                (function (t) {
                  return F('N', t, void 0);
                })(t),
                this,
              )
            : this._next(t);
        }),
        (e.prototype.error = function (t) {
          this.isStopped
            ? A(F('E', void 0, t), this)
            : ((this.isStopped = !0), this._error(t));
        }),
        (e.prototype.complete = function () {
          this.isStopped
            ? A(k, this)
            : ((this.isStopped = !0), this._complete());
        }),
        (e.prototype.unsubscribe = function () {
          this.closed ||
            ((this.isStopped = !0),
            t.prototype.unsubscribe.call(this),
            (this.destination = null));
        }),
        (e.prototype._next = function (t) {
          this.destination.next(t);
        }),
        (e.prototype._error = function (t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }),
        (e.prototype._complete = function () {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }),
        e
      );
    })(d),
    W = Function.prototype.bind;
  function P(t, e) {
    return W.call(t, e);
  }
  var C = (function () {
      function t(t) {
        this.partialObserver = t;
      }
      return (
        (t.prototype.next = function (t) {
          var e = this.partialObserver;
          if (e.next)
            try {
              e.next(t);
            } catch (t) {
              j(t);
            }
        }),
        (t.prototype.error = function (t) {
          var e = this.partialObserver;
          if (e.error)
            try {
              e.error(t);
            } catch (t) {
              j(t);
            }
          else j(t);
        }),
        (t.prototype.complete = function () {
          var t = this.partialObserver;
          if (t.complete)
            try {
              t.complete();
            } catch (t) {
              j(t);
            }
        }),
        t
      );
    })(),
    T = (function (t) {
      function e(e, n, r) {
        var i,
          o,
          s = t.call(this) || this;
        return (
          u(e) || !e
            ? (i = {
                next: null != e ? e : void 0,
                error: null != n ? n : void 0,
                complete: null != r ? r : void 0,
              })
            : s && x
            ? (((o = Object.create(e)).unsubscribe = function () {
                return s.unsubscribe();
              }),
              (i = {
                next: e.next && P(e.next, o),
                error: e.error && P(e.error, o),
                complete: e.complete && P(e.complete, o),
              }))
            : (i = e),
          (s.destination = new C(i)),
          s
        );
      }
      return o(e, t), e;
    })(O);
  function j(t) {
    var e;
    g
      ? ((e = t), g && M && ((M.errorThrown = !0), (M.error = e)))
      : (function (t) {
          _.setTimeout(function () {
            if (!w) throw t;
            w(t);
          });
        })(t);
  }
  function A(t, e) {
    var n = b;
    n &&
      _.setTimeout(function () {
        return n(t, e);
      });
  }
  var I = {
      closed: !0,
      next: S,
      error: function (t) {
        throw t;
      },
      complete: S,
    },
    z = ('function' == typeof Symbol && Symbol.observable) || '@@observable';
  function V(t) {
    return t;
  }
  function $(t) {
    return 0 === t.length
      ? V
      : 1 === t.length
      ? t[0]
      : function (e) {
          return t.reduce(function (t, e) {
            return e(t);
          }, e);
        };
  }
  var K = (function () {
    function t(t) {
      t && (this._subscribe = t);
    }
    return (
      (t.prototype.lift = function (e) {
        var n = new t();
        return (n.source = this), (n.operator = e), n;
      }),
      (t.prototype.subscribe = function (t, e, n) {
        var r,
          i = this,
          o =
            ((r = t) && r instanceof O) ||
            ((function (t) {
              return t && u(t.next) && u(t.error) && u(t.complete);
            })(r) &&
              y(r))
              ? t
              : new T(t, e, n);
        return (
          E(function () {
            var t = i,
              e = t.operator,
              n = t.source;
            o.add(e ? e.call(o, n) : n ? i._subscribe(o) : i._trySubscribe(o));
          }),
          o
        );
      }),
      (t.prototype._trySubscribe = function (t) {
        try {
          return this._subscribe(t);
        } catch (e) {
          t.error(e);
        }
      }),
      (t.prototype.forEach = function (t, e) {
        var n = this;
        return new (e = D(e))(function (e, r) {
          var i = new T({
            next: function (e) {
              try {
                t(e);
              } catch (t) {
                r(t), i.unsubscribe();
              }
            },
            error: r,
            complete: e,
          });
          n.subscribe(i);
        });
      }),
      (t.prototype._subscribe = function (t) {
        var e;
        return null === (e = this.source) || void 0 === e
          ? void 0
          : e.subscribe(t);
      }),
      (t.prototype[z] = function () {
        return this;
      }),
      (t.prototype.pipe = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return $(t)(this);
      }),
      (t.prototype.toPromise = function (t) {
        var e = this;
        return new (t = D(t))(function (t, n) {
          var r;
          e.subscribe(
            function (t) {
              return (r = t);
            },
            function (t) {
              return n(t);
            },
            function () {
              return t(r);
            },
          );
        });
      }),
      (t.create = function (e) {
        return new t(e);
      }),
      t
    );
  })();
  function D(t) {
    var e;
    return null !== (e = null != t ? t : m) && void 0 !== e ? e : Promise;
  }
  var H = l(function (t) {
      return function () {
        t(this),
          (this.name = 'ObjectUnsubscribedError'),
          (this.message = 'object unsubscribed');
      };
    }),
    U = (function (t) {
      function e() {
        var e = t.call(this) || this;
        return (
          (e.closed = !1),
          (e.currentObservers = null),
          (e.observers = []),
          (e.isStopped = !1),
          (e.hasError = !1),
          (e.thrownError = null),
          e
        );
      }
      return (
        o(e, t),
        (e.prototype.lift = function (t) {
          var e = new B(this, this);
          return (e.operator = t), e;
        }),
        (e.prototype._throwIfClosed = function () {
          if (this.closed) throw new H();
        }),
        (e.prototype.next = function (t) {
          var e = this;
          E(function () {
            var n, r;
            if ((e._throwIfClosed(), !e.isStopped)) {
              e.currentObservers ||
                (e.currentObservers = Array.from(e.observers));
              try {
                for (
                  var i = s(e.currentObservers), o = i.next();
                  !o.done;
                  o = i.next()
                )
                  o.value.next(t);
              } catch (t) {
                n = { error: t };
              } finally {
                try {
                  o && !o.done && (r = i.return) && r.call(i);
                } finally {
                  if (n) throw n.error;
                }
              }
            }
          });
        }),
        (e.prototype.error = function (t) {
          var e = this;
          E(function () {
            if ((e._throwIfClosed(), !e.isStopped)) {
              (e.hasError = e.isStopped = !0), (e.thrownError = t);
              for (var n = e.observers; n.length; ) n.shift().error(t);
            }
          });
        }),
        (e.prototype.complete = function () {
          var t = this;
          E(function () {
            if ((t._throwIfClosed(), !t.isStopped)) {
              t.isStopped = !0;
              for (var e = t.observers; e.length; ) e.shift().complete();
            }
          });
        }),
        (e.prototype.unsubscribe = function () {
          (this.isStopped = this.closed = !0),
            (this.observers = this.currentObservers = null);
        }),
        Object.defineProperty(e.prototype, 'observed', {
          get: function () {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype._trySubscribe = function (e) {
          return this._throwIfClosed(), t.prototype._trySubscribe.call(this, e);
        }),
        (e.prototype._subscribe = function (t) {
          return (
            this._throwIfClosed(),
            this._checkFinalizedStatuses(t),
            this._innerSubscribe(t)
          );
        }),
        (e.prototype._innerSubscribe = function (t) {
          var e = this,
            n = this,
            r = n.hasError,
            i = n.isStopped,
            o = n.observers;
          return r || i
            ? p
            : ((this.currentObservers = null),
              o.push(t),
              new d(function () {
                (e.currentObservers = null), f(o, t);
              }));
        }),
        (e.prototype._checkFinalizedStatuses = function (t) {
          var e = this,
            n = e.hasError,
            r = e.thrownError,
            i = e.isStopped;
          n ? t.error(r) : i && t.complete();
        }),
        (e.prototype.asObservable = function () {
          var t = new K();
          return (t.source = this), t;
        }),
        (e.create = function (t, e) {
          return new B(t, e);
        }),
        e
      );
    })(K),
    B = (function (t) {
      function e(e, n) {
        var r = t.call(this) || this;
        return (r.destination = e), (r.source = n), r;
      }
      return (
        o(e, t),
        (e.prototype.next = function (t) {
          var e, n;
          null ===
            (n =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.next) ||
            void 0 === n ||
            n.call(e, t);
        }),
        (e.prototype.error = function (t) {
          var e, n;
          null ===
            (n =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.error) ||
            void 0 === n ||
            n.call(e, t);
        }),
        (e.prototype.complete = function () {
          var t, e;
          null ===
            (e =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === e ||
            e.call(t);
        }),
        (e.prototype._subscribe = function (t) {
          var e, n;
          return null !==
            (n =
              null === (e = this.source) || void 0 === e
                ? void 0
                : e.subscribe(t)) && void 0 !== n
            ? n
            : p;
        }),
        e
      );
    })(U),
    L = (function (t) {
      function e(e, n) {
        return t.call(this) || this;
      }
      return (
        o(e, t),
        (e.prototype.schedule = function (t, e) {
          return void 0 === e && (e = 0), this;
        }),
        e
      );
    })(d),
    N = {
      setInterval: function (t, e) {
        for (var n = [], r = 2; r < arguments.length; r++)
          n[r - 2] = arguments[r];
        var i = N.delegate;
        return (null == i ? void 0 : i.setInterval)
          ? i.setInterval.apply(i, a([t, e], c(n)))
          : setInterval.apply(void 0, a([t, e], c(n)));
      },
      clearInterval: function (t) {
        var e = N.delegate;
        return ((null == e ? void 0 : e.clearInterval) || clearInterval)(t);
      },
      delegate: void 0,
    },
    q = (function (t) {
      function e(e, n) {
        var r = t.call(this, e, n) || this;
        return (r.scheduler = e), (r.work = n), (r.pending = !1), r;
      }
      return (
        o(e, t),
        (e.prototype.schedule = function (t, e) {
          var n;
          if ((void 0 === e && (e = 0), this.closed)) return this;
          this.state = t;
          var r = this.id,
            i = this.scheduler;
          return (
            null != r && (this.id = this.recycleAsyncId(i, r, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id =
              null !== (n = this.id) && void 0 !== n
                ? n
                : this.requestAsyncId(i, this.id, e)),
            this
          );
        }),
        (e.prototype.requestAsyncId = function (t, e, n) {
          return (
            void 0 === n && (n = 0), N.setInterval(t.flush.bind(t, this), n)
          );
        }),
        (e.prototype.recycleAsyncId = function (t, e, n) {
          if (
            (void 0 === n && (n = 0),
            null != n && this.delay === n && !1 === this.pending)
          )
            return e;
          null != e && N.clearInterval(e);
        }),
        (e.prototype.execute = function (t, e) {
          if (this.closed) return new Error('executing a cancelled action');
          this.pending = !1;
          var n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }),
        (e.prototype._execute = function (t, e) {
          var n,
            r = !1;
          try {
            this.work(t);
          } catch (t) {
            (r = !0),
              (n = t || new Error('Scheduled action threw falsy error'));
          }
          if (r) return this.unsubscribe(), n;
        }),
        (e.prototype.unsubscribe = function () {
          if (!this.closed) {
            var e = this.id,
              n = this.scheduler,
              r = n.actions;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              f(r, this),
              null != e && (this.id = this.recycleAsyncId(n, e, null)),
              (this.delay = null),
              t.prototype.unsubscribe.call(this);
          }
        }),
        e
      );
    })(L),
    Y = {
      now: function () {
        return (Y.delegate || Date).now();
      },
      delegate: void 0,
    },
    J = (function () {
      function t(e, n) {
        void 0 === n && (n = t.now),
          (this.schedulerActionCtor = e),
          (this.now = n);
      }
      return (
        (t.prototype.schedule = function (t, e, n) {
          return (
            void 0 === e && (e = 0),
            new this.schedulerActionCtor(this, t).schedule(n, e)
          );
        }),
        (t.now = Y.now),
        t
      );
    })(),
    X = (function (t) {
      function e(e, n) {
        void 0 === n && (n = J.now);
        var r = t.call(this, e, n) || this;
        return (r.actions = []), (r._active = !1), r;
      }
      return (
        o(e, t),
        (e.prototype.flush = function (t) {
          var e = this.actions;
          if (this._active) e.push(t);
          else {
            var n;
            this._active = !0;
            do {
              if ((n = t.execute(t.state, t.delay))) break;
            } while ((t = e.shift()));
            if (((this._active = !1), n)) {
              for (; (t = e.shift()); ) t.unsubscribe();
              throw n;
            }
          }
        }),
        e
      );
    })(J),
    G = new X(q);
  function Q(t) {
    return function (e) {
      if (
        (function (t) {
          return u(null == t ? void 0 : t.lift);
        })(e)
      )
        return e.lift(function (e) {
          try {
            return t(e, this);
          } catch (t) {
            this.error(t);
          }
        });
      throw new TypeError('Unable to lift unknown Observable type');
    };
  }
  function R(t, e, n, r, i) {
    return new Z(t, e, n, r, i);
  }
  var Z = (function (t) {
    function e(e, n, r, i, o, s) {
      var c = t.call(this, e) || this;
      return (
        (c.onFinalize = o),
        (c.shouldUnsubscribe = s),
        (c._next = n
          ? function (t) {
              try {
                n(t);
              } catch (t) {
                e.error(t);
              }
            }
          : t.prototype._next),
        (c._error = i
          ? function (t) {
              try {
                i(t);
              } catch (t) {
                e.error(t);
              } finally {
                this.unsubscribe();
              }
            }
          : t.prototype._error),
        (c._complete = r
          ? function () {
              try {
                r();
              } catch (t) {
                e.error(t);
              } finally {
                this.unsubscribe();
              }
            }
          : t.prototype._complete),
        c
      );
    }
    return (
      o(e, t),
      (e.prototype.unsubscribe = function () {
        var e;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
          var n = this.closed;
          t.prototype.unsubscribe.call(this),
            !n &&
              (null === (e = this.onFinalize) || void 0 === e || e.call(this));
        }
      }),
      e
    );
  })(O);
  const tt = Object.assign(
    function (...t) {
      (t = t.map((t) => et(t))), Phoenix.log(...t), console.trace(...t);
    },
    {
      notify: (...t) => {
        (t = t.map((t) => et(t))), Phoenix.log(...t);
        const e = t.join(' ');
        Phoenix.notify(e), console.trace(...t);
      },
      noTrace: (...t) => {
        (t = t.map((t) => et(t))), Phoenix.log(...t), console.log(...t);
      },
    },
  );
  function et(t) {
    if (t instanceof Error) {
      let e = '';
      if (t.stack) {
        const n = t.stack.trim().split('\n');
        (n[0] += ` (:${t.line}:${t.column})`),
          (e = `\n${n.map((t) => '\t at ' + t).join('\n')}`);
      }
      return `\n${t.toString()}${e}`;
    }
    switch (typeof t) {
      case 'object':
        return '\n' + JSON.stringify(t, null, 2);
      case 'function':
        return t.toString();
      default:
        return t;
    }
  }
  var nt, rt;
  function it(t, e) {
    ot(t, e, 2, 2);
  }
  function ot(t, e, n, r) {
    const { height: i, width: o, x: s, y: c } = t.frame(),
      a = e.visibleFrame();
    (t.origin = {
      x: a.x + (a.width / n - o / 2),
      y: a.y + (a.height / r - i / 2),
    }),
      t.show();
  }
  !(function (t) {
    (t[(t.NorthWest = 0)] = 'NorthWest'),
      (t[(t.NorthEast = 1)] = 'NorthEast'),
      (t[(t.SouthWest = 2)] = 'SouthWest'),
      (t[(t.SouthEast = 3)] = 'SouthEast');
  })(nt || (nt = {})),
    (function (t) {
      (t[(t.Forward = 0)] = 'Forward'), (t[(t.Backward = 1)] = 'Backward');
    })(rt || (rt = {}));
  const st = new Map();
  let ct = new Modal();
  const at = new U();
  var ut, lt, ht, ft, dt;
  function pt(t, e) {
    if (!e) return;
    const n = e.app(),
      r = n.windows().filter((t) => '' !== t.title() && !t.isMinimized());
    if (r.length < 2) return;
    if (t === rt.Forward) (i = e), st.set(i.hash(), +new Date());
    else {
      if (t !== rt.Backward) throw new Error('Unknown Direction: ' + t);
      !(function (t) {
        st.delete(t.hash());
      })(e);
    }
    var i;
    const o = (function (t, e) {
      switch (t) {
        case rt.Forward:
          return [...e].sort(vt);
        case rt.Backward:
          return [...e].reverse().sort(wt);
        default:
          throw new Error('Unknown Direction: ' + t);
      }
    })(t, r);
    tt(o.map((t) => t.hash() + ' - ' + t.title()));
    const s = o[0];
    (ct.weight = 18),
      (ct.text = s.title()),
      (ct.icon = n.icon()),
      it(ct, s.screen()),
      s.focus(),
      at.next();
  }
  function yt(t) {
    return st.get(t.hash()) || 0;
  }
  function vt(t, e) {
    const [n, r] = [yt(t), yt(e)];
    return n === r ? 0 : n < r ? -1 : 1;
  }
  function wt(t, e) {
    const [n, r] = [yt(t), yt(e)];
    return n === r ? 0 : n > r ? -1 : 1;
  }
  at.pipe(
    (2e3,
    void 0 === dt && (dt = G),
    Q(function (t, e) {
      var n = null,
        r = null,
        i = null,
        o = function () {
          if (n) {
            n.unsubscribe(), (n = null);
            var t = r;
            (r = null), e.next(t);
          }
        };
      function s() {
        var t = i + 2e3,
          r = dt.now();
        if (r < t) return (n = this.schedule(void 0, t - r)), void e.add(n);
        o();
      }
      t.subscribe(
        R(
          e,
          function (t) {
            (r = t), (i = dt.now()), n || ((n = dt.schedule(s, 2e3)), e.add(n));
          },
          function () {
            o(), e.complete();
          },
          void 0,
          function () {
            r = n = null;
          },
        ),
      );
    })),
    ((ut = () => {
      ct.close(), (ct = new Modal());
    }),
    (ft = u(ut) ? { next: ut, error: lt, complete: ht } : ut),
    ft
      ? Q(function (t, e) {
          var n;
          null === (n = ft.subscribe) || void 0 === n || n.call(ft);
          var r = !0;
          t.subscribe(
            R(
              e,
              function (t) {
                var n;
                null === (n = ft.next) || void 0 === n || n.call(ft, t),
                  e.next(t);
              },
              function () {
                var t;
                (r = !1),
                  null === (t = ft.complete) || void 0 === t || t.call(ft),
                  e.complete();
              },
              function (t) {
                var n;
                (r = !1),
                  null === (n = ft.error) || void 0 === n || n.call(ft, t),
                  e.error(t);
              },
              function () {
                var t, e;
                r &&
                  (null === (t = ft.unsubscribe) || void 0 === t || t.call(ft)),
                  null === (e = ft.finalize) || void 0 === e || e.call(ft);
              },
            ),
          );
        })
      : V),
  ).subscribe();
  const bt = new Map();
  function mt(t, e, n) {
    if (Array.isArray(t)) {
      const r = t.map((t) => gt(t, e, n));
      return () => r.forEach((t) => t());
    }
    return gt(t, e, n);
  }
  function gt(t, e, n) {
    const r = new Key(t, e, (r, i) => {
        const o = (n) => {
          tt.notify(`Key: ${t} + [${e}]:`, n);
        };
        try {
          const t = n(r, i);
          return t instanceof Promise ? t.catch(o) : t;
        } catch (t) {
          o(t);
        }
      }),
      i = xt(t, e);
    return (
      bt.set(i, r),
      () =>
        (function (t) {
          const e = bt.get(t);
          e && (e.disable(), bt.delete(t));
        })(i)
    );
  }
  function xt(t, e) {
    return t + e.sort().join();
  }
  function _t(t, e) {
    const n = xt(t, e);
    return bt.get(n);
  }
  const St = '\nYour coffee is done,\ngo get it!\n',
    kt = 'iTerm2',
    Ft = kt.replace(/[0-9]+$/, '');
  function Mt(t) {
    const e = t.name();
    return e === kt || e === Ft;
  }
  function Et() {
    App.launch(Ft, { focus: !0 });
  }
  const Ot = {
      normal: "§1234567890-=qwertyuiop[]asdfghjkl;'\\`zxcvbnm,./",
      shift: '±!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:"|~ZXCVBNM<>?',
      alt: ' ¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘åß∂ƒ©˙∆˚¬…æ«  ≈ç√∫˜µ≤≥÷',
      altShift: '±⁄€‹›ﬁﬂ‡°·‚—±Œ„´‰ˇÁ¨ Ø∏”’  Î ˝ÓÔÒÚÆ» ¸˛Ç◊ı˜Â¯˘¿',
    },
    Wt = ['delete', 'escape', 'return', 'space'];
  function Pt(t) {
    return new Promise((e) => {
      setTimeout(() => e(), t);
    });
  }
  const Ct = new Map();
  function Tt(t, e) {
    if ('object' != typeof t) return t === e;
    if (Object.keys(t).length !== Object.keys(e).length) return !1;
    for (const n of Object.keys(t)) {
      if ('object' == typeof t[n] && !Tt(t[n], e[n])) return !1;
      if (t[n] !== e[n]) return !1;
    }
    return !0;
  }
  function jt(t, e) {
    const n = t.setFrame(e);
    return n && Ct.delete(t.hash()), n;
  }
  Event.on('windowDidClose', (t) => {
    Ct.delete(t.hash());
  });
  const At = new (class {
    constructor() {
      (this.scanned = ''), (this.keyHandlers = []);
    }
    scan(t) {
      (this.doneCallback = t),
        (this.updateCallback = (e) => {
          e && (this.disable(), t(e));
        }),
        this.enable();
    }
    scanln(t, e = () => {}) {
      this.enable(), (this.doneCallback = t), (this.updateCallback = e);
    }
    enable() {
      if (
        ((this.scanned = ''),
        (this.keyHandlers.length = 0),
        !this.keyHandlers.length)
      ) {
        for (let t = 0; t < Ot.normal.length; t++) {
          const e = Ot.normal[t],
            n = Ot.altShift[t] || ' ';
          this.keyHandlers.push(
            new Key(e, [], () => this.handleKeyPress(e)),
            new Key(e, ['shift'], () => this.handleKeyPress(Ot.shift[t])),
            new Key(e, ['alt'], () => this.handleKeyPress(Ot.alt[t])),
            new Key(e, ['alt', 'shift'], () => this.handleKeyPress(n)),
          );
        }
        for (const t of Wt)
          this.keyHandlers.push(
            new Key(t, [], () => this.handleKeyPress(t)),
            new Key(t, ['shift'], (e) => this.handleKeyPress(t, e)),
          );
      }
      this.keyHandlers.forEach((t) => t.enable());
    }
    disable() {
      for (const t of this.keyHandlers) {
        t.disable();
        const e = _t(t.key, t.modifiers);
        e && e.enable();
      }
    }
    handleKeyPress(t, e) {
      if (!this.doneCallback || !this.updateCallback)
        throw new Error('Scanner callbacks are not set up properly');
      switch (t) {
        case 'delete':
          return (
            (this.scanned = this.scanned.slice(0, -1)),
            this.updateCallback(this.scanned)
          );
        case 'escape':
          return this.disable(), this.doneCallback('');
        case 'return':
          return e && e.modifiers.includes('shift')
            ? ((this.scanned += '\n'), this.updateCallback(this.scanned))
            : (this.disable(), this.doneCallback(this.scanned));
        case 'space':
          return (this.scanned += ' '), this.updateCallback(this.scanned);
        default:
          return (this.scanned += t), this.updateCallback(this.scanned);
      }
    }
  })();
  let It;
  Phoenix.set({ daemon: !0, openAtLogin: !0 }),
    Event.on('screensDidChange', () => {
      tt('Screens changed');
    });
  let zt,
    Vt = !1;
  const $t = (t, e) => {
    e || (Vt = !Vt);
  };
  function Kt({ modifiers: t }, e) {
    return (
      Math.ceil(t.length / 2) == e.length &&
      e.map((e) => t.includes(e)).every((t) => t)
    );
  }
  function Dt(t, e) {
    const n = Object.keys(t);
    return n.length === Object.keys(e).length && n.every((n) => t[n] === e[n]);
  }
  Event.on('mouseDidMove', (t) => {
    let e;
    if (Vt && Kt(t, n)) e = 'move';
    else {
      if (!Vt || !Kt(t, r)) return (Vt = !1), void (zt = void 0);
      e = 'resize';
    }
    if (zt)
      zt.type !== e &&
        (zt = {
          type: e,
          win: zt.win,
          wf: zt.win.frame(),
          sf: zt.sf,
          mp: { ...t },
        });
    else {
      const n = Window.at(t);
      if (!n) return;
      zt = {
        type: e,
        win: n,
        wf: n.frame(),
        sf: n.screen().flippedVisibleFrame(),
        mp: { ...t },
      };
    }
    const i = zt.mp.x - t.x,
      o = zt.mp.y - t.y;
    if (0 === i && 0 === o) return;
    tt(zt.win.screen().flippedVisibleFrame());
    const s = { ...zt.wf };
    if ('move' === e) {
      if (0 === t.y) return void zt.win.maximize();
      (s.x -= i), (s.y -= o);
      const e = 15;
      Math.abs(zt.sf.x - s.x) <= e && (s.x = zt.sf.x);
      const n = zt.sf.width - s.width;
      Math.abs(n - s.x) <= e && (s.x = n),
        Math.abs(zt.sf.y - s.y) <= e && (s.y = zt.sf.y);
      const r = zt.sf.y + zt.sf.height - s.height;
      Math.abs(r - s.y) <= e && (s.y = r), zt.win.setTopLeft(s);
    } else
      (s.x += i),
        s.x < zt.sf.x && (s.x = zt.sf.x),
        (s.y += o),
        s.y < zt.sf.y && (s.y = zt.sf.y),
        (s.width -= 2 * i),
        (s.height -= 2 * o),
        zt.win.setFrame(s);
  }),
    mt('a', n, $t),
    mt('a', r, $t),
    mt('tab', n, async () => {
      const e = Window.focused();
      if (!e) return;
      const n = e.isFullScreen();
      n && (e.setFullScreen(!1), await Pt(900));
      const r = e.screen(),
        i = r.next();
      r.isEqual(i) ||
        (jt(e, t(r.flippedVisibleFrame(), i.flippedVisibleFrame())(e.frame())),
        n && (await Pt(900), e.setFullScreen(!0)),
        e.focus());
    }),
    mt('tab', r, () => {
      const t = Window.focused();
      if (!t) return;
      const e = t.screen(),
        n = e.next();
      var r, i;
      e.isEqual(n) ||
        jt(
          t,
          ((r = e.flippedVisibleFrame()),
          (i = n.flippedVisibleFrame()),
          ({ width: t, height: e, x: n, y: o }) => ({
            width: t,
            height: e,
            x: (n = i.x + n - r.x),
            y: (o = i.y + o - r.y),
          }))(t.frame()),
        );
    }),
    mt(['left', 'j'], n, () => {
      const t = Window.focused();
      if (!t) return;
      const {
          width: e,
          height: n,
          x: r,
          y: i,
        } = t.screen().flippedVisibleFrame(),
        o = { width: Math.floor(e / 2), height: n, x: r, y: i },
        s = { width: Math.floor(e / 3), height: n, x: r, y: i },
        c = { width: Math.floor(e / 4), height: n, x: r, y: i };
      let a = o;
      Dt(t.frame(), o) && (a = s), Dt(t.frame(), s) && (a = c), jt(t, a);
    }),
    mt(['right', 'l'], n, () => {
      const t = Window.focused();
      if (!t) return;
      const {
          width: e,
          height: n,
          x: r,
          y: i,
        } = t.screen().flippedVisibleFrame(),
        o = {
          width: Math.floor(e / 2),
          height: n,
          x: r + Math.ceil(e / 2),
          y: i,
        },
        s = {
          width: Math.floor(e / 3),
          height: n,
          x: r + Math.ceil((e / 3) * 2),
          y: i,
        },
        c = {
          width: Math.floor(e / 4),
          height: n,
          x: r + Math.ceil((e / 4) * 3),
          y: i,
        };
      let a = o;
      Dt(t.frame(), o) && (a = s), Dt(t.frame(), s) && (a = c), jt(t, a);
    }),
    mt(['up', 'i'], n, () => {
      const t = Window.focused();
      if (!t) return;
      const { width: e, x: n } = t.frame();
      let { height: r, y: i } = t.screen().flippedVisibleFrame();
      (r = Math.ceil(r / 2)), jt(t, { height: r, width: e, x: n, y: i });
    }),
    mt(['down', 'k'], n, () => {
      const t = Window.focused();
      if (!t) return;
      const { width: e, x: n } = t.frame();
      let { height: r, y: i } = t.screen().flippedVisibleFrame();
      (r /= 2),
        ([r, i] = [Math.ceil(r), i + Math.floor(r)]),
        jt(t, { height: r, width: e, x: n, y: i });
    }),
    mt('return', n, () => {
      const e = Window.focused();
      e &&
        (function (e) {
          (function (t) {
            const e = Ct.get(t.hash());
            return (
              !(!e || !e.maximized) &&
              (tt(t.frame(), e.maximized.window),
              Tt(t.screen().flippedVisibleFrame(), e.maximized.screen) &&
                Tt(t.frame(), e.maximized.window))
            );
          })(e)
            ? jt(
                e,
                (function (e) {
                  let n = Ct.get(e.hash());
                  return (
                    n ||
                      (n = {
                        screen: e.screen().flippedVisibleFrame(),
                        window: e.frame(),
                      }),
                    t(n.screen, e.screen().flippedVisibleFrame())(n.window)
                  );
                })(e),
              )
            : (function (t) {
                const e = {
                    screen: t.screen().flippedVisibleFrame(),
                    window: t.frame(),
                  },
                  n = t.maximize(),
                  r = t.hash();
                Ct.set(r, {
                  ...e,
                  maximized: {
                    screen: t.screen().flippedVisibleFrame(),
                    window: t.frame(),
                  },
                });
              })(e);
        })(e);
    }),
    mt(['left', 'j'], r, () => {
      const t = Window.focused();
      if (!t) return;
      const { width: e, height: n, y: r, x: i } = t.frame();
      let { x: o } = t.screen().flippedVisibleFrame();
      jt(t, { width: e, height: n, y: r, x: Math.max(o, i - e) });
    }),
    mt(['right', 'l'], r, () => {
      const t = Window.focused();
      if (!t) return;
      const { width: e, height: n, y: r, x: i } = t.frame();
      let { width: o, x: s } = t.screen().flippedVisibleFrame();
      const c = s + o - e;
      jt(t, { width: e, height: n, y: r, x: Math.min(c, i + e) });
    }),
    mt(['up', 'i'], r, () => {
      const t = Window.focused();
      if (!t) return;
      const { width: e, height: n, x: r, y: i } = t.frame();
      let { y: o } = t.screen().flippedVisibleFrame();
      jt(t, { width: e, height: n, x: r, y: Math.max(o, i - n) });
    }),
    mt(['down', 'k'], r, () => {
      const t = Window.focused();
      if (!t) return;
      const { width: e, height: n, x: r, y: i } = t.frame();
      let { height: o, y: s } = t.screen().flippedVisibleFrame();
      const c = s + o - n;
      jt(t, { width: e, height: n, x: r, y: Math.min(c, i + n) });
    }),
    mt('return', r, () => {
      const t = Window.focused();
      t && t.setFullScreen(!t.isFullScreen());
    }),
    mt('space', r, () => {
      const t = Window.focused();
      if (!t) return;
      const { width: e, height: n } = t.frame(),
        { width: r, height: i, x: o, y: s } = t.screen().flippedVisibleFrame();
      jt(t, {
        height: n,
        width: e,
        x: o + r / 2 - e / 2,
        y: s + i / 2 - n / 2,
      });
    }),
    mt('§', [], (t, e) => {
      e ||
        (function () {
          const t = Window.focused(),
            e = t ? t.app() : void 0;
          e && Mt(e) && e.windows().length ? e.hide() : Et();
        })();
    }),
    mt('§', ['cmd'], (t, e) => {
      e ||
        (function () {
          const t = Window.focused(),
            e = t ? t.app() : void 0;
          if (!e || !Mt(e)) return Et();
          const n = e.windows();
          if (!n.length) return Et();
          n[n.length - 1].focus();
        })();
    }),
    mt('p', n, () => {
      const t = Window.focused();
      if (!t) return;
      const e = t.app().name(),
        n = t.app().bundleIdentifier(),
        r = t.app().processIdentifier(),
        i = t.title(),
        o = t.frame(),
        s = [
          `Application: ${e}`,
          `Title: ${i}`,
          `Frame: X=${o.x}, Y=${o.y}`,
          `Size: H=${o.height}, W=${o.width}`,
          `Bundle ID: ${n}`,
          `PID: ${r}`,
        ].join('\n');
      tt('Window information:\n' + s),
        it(
          Modal.build({
            duration: 10,
            icon: t.app().icon(),
            text: s,
            weight: 16,
          }),
          Screen.main(),
        );
    }),
    mt('.', n, () => {
      const t = Window.focused();
      t &&
        (tt(
          t
            .screen()
            .windows({ visible: !0 })
            .map((t) => t.title()),
        ),
        tt(
          t
            .screen()
            .windows()
            .map((t) => t.title()),
        ));
    }),
    mt('delete', n, () => {
      const t = Window.focused();
      if (t) {
        const e = t.screen().windows({ visible: !0 });
        if ((tt(e.map((t) => t.title())), t.minimize(), e.length)) {
          const t = e[e.length > 1 ? 1 : 0];
          tt('focusing: ' + t.title()), t.focus();
        }
      }
    }),
    mt('m', n, () => {
      const t = (function (t) {
        const n = Screen.all();
        for (const r of n) if (e(t, r.flippedFrame())) return r;
        throw new Error('point out of range');
      })(Mouse.location());
      tt(t.identifier(), Mouse.location());
    }),
    mt('c', n, () => {
      if (It) return It.stop(), void (It = null);
      It = (function ({ screen: t, timeout: e }) {
        const n = { modal: new Modal(), screen: t, timeout: e },
          r = (function (t) {
            return () => {
              if (!t.modal) return;
              t.timeout--;
              const e = t.timeout ? '~' + String(t.timeout) : '<1';
              t.modal.text = `Coffee in ${e} min`;
              const n = (function (t, e, n) {
                const { width: r, height: i } = t.frame();
                let { width: o, height: s, x: c, y: a } = e.visibleFrame();
                return (
                  n === nt.SouthEast ? (c = c + o - r) : nt.SouthWest,
                  { x: c, y: a }
                );
              })(t.modal, t.screen, nt.SouthEast);
              (t.modal.origin = (function ({ x: t, y: e }, n, r, i) {
                const o = n.visibleFrame();
                return (
                  t < o.x + o.width / 2 ? (t += r) : (t -= r),
                  e < o.y + o.height / 2 ? (e += i) : (e -= i),
                  { x: t, y: e }
                );
              })(n, t.screen, 10, 10)),
                t.modal.show();
            };
          })(n),
          i = setInterval(r, 6e4),
          o = setTimeout(
            (function (t, e) {
              return () => {
                clearTimeout(e),
                  t.modal && t.modal.close(),
                  (t.modal = new Modal()),
                  (t.modal.text = St.trim()),
                  it(t.modal, t.screen);
              };
            })(n, i),
            6e4 * n.timeout,
          );
        return (
          r(),
          {
            stop() {
              clearTimeout(i),
                clearTimeout(o),
                n.modal && n.modal.close(),
                (n.modal = void 0);
            },
          }
        );
      })({ screen: Screen.main(), timeout: 8 });
    }),
    mt('escape', ['cmd'], () => {
      return (t = Window.focused()), pt(rt.Forward, t);
      var t;
    }),
    mt('escape', ['cmd', 'shift'], () => {
      return (t = Window.focused()), pt(rt.Backward, t);
      var t;
    }),
    mt('space', n, () => {
      const t = new Modal(),
        e = 'Search: ';
      (t.text = e), it(t, Screen.main());
      const n = Window.focused(),
        r = Window.all({ visible: !0 });
      let i = [...r];
      const o = Screen.main();
      let s = !0;
      function c(t) {
        s !== t && ((s = t), c(t));
        const e = t ? i.pop() : i.shift();
        if (e) return t ? i.unshift(e) : i.push(e), e;
      }
      const a = (e) => () => {
          if (!i.length) return;
          const n = c(e);
          n && (n.focus(), (t.icon = n.app().icon()), it(t, o));
        },
        u = new Key('tab', [], a(!1)),
        l = new Key('tab', ['shift'], a(!0));
      At.scanln(
        (e) => {
          t.close(),
            u.disable(),
            l.disable(),
            '' === e && n && (n.focus(), setTimeout(() => n.focus(), 200));
        },
        (c) => {
          u.enable(),
            l.enable(),
            (s = !0),
            (i = r.filter(
              (t) =>
                (function (t) {
                  return t.app().name().toLowerCase().match(c.toLowerCase());
                })(t) ||
                (function (t) {
                  return t.title().toLowerCase().match(c.toLowerCase());
                })(t),
            )),
            (t.text = e + c + (c ? `\n${i.length} results` : '')),
            c && i.length
              ? (i[0].focus(), (t.icon = i[0].app().icon()))
              : (n && n.focus(), (t.icon = void 0)),
            it(t, o);
        },
      );
    }),
    mt('h', ['cmd'], (t, e) => {
      if (e) {
        const t = Window.all({ visible: !0 }).map((t) => t.app());
        return void new Set(t).forEach((t) => t.hide());
      }
      const n = Window.focused();
      n && n.app().hide();
    });
  const Ht = App.get('Phoenix') || App.get('Phoenix (Debug)');
  !(function (t, e = 1, n) {
    const r = new Modal();
    (r.text = t),
      (r.duration = e),
      n && (r.icon = n),
      (function (t, e) {
        ot(t, Screen.main(), 2, 1 + 1 / 3);
      })(r);
  })('Phoenix (re)loaded!', 2, Ht && Ht.icon());
})();
