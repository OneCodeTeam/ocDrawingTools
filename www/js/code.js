var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        /**
         * Class that represents an event
         *
         * @export
         * @class AsEvent
         */
        var AsEvent = (function () {
            /**
             * Creates an instance of AsEvent.
             * @param {string} pKey
             * @param {boolean} [pBubbles=false]
             * @param {*} [pSender]
             * @param {boolean} [pCancelable=false]
             *
             * @memberOf AsEvent
             */
            function AsEvent(pKey, pBubbles, pSender, pCancelable) {
                if (pBubbles === void 0) { pBubbles = false; }
                if (pCancelable === void 0) { pCancelable = false; }
                this.mEvent = document.createEvent("CustomEvent");
                this.mEvent.initCustomEvent(pKey, pBubbles, pCancelable, this);
                this.mSender = pSender;
                // this.mEvent.bubbles = (pBubbles != null) ? pBubbles : false
            }
            Object.defineProperty(AsEvent.prototype, "event", {
                //_____________________________________________________________
                /**
                 *
                 *
                 * @readonly
                 * @type {CustomEvent}
                 * @memberOf AsEvent
                 */
                get: function () {
                    return (this.mEvent);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AsEvent.prototype, "sender", {
                //_____________________________________________________________
                /**
                 *
                 *
                 * @readonly
                 * @type {*}
                 * @memberOf AsEvent
                 */
                get: function () {
                    return (this.mSender);
                },
                enumerable: true,
                configurable: true
            });
            return AsEvent;
        }());
        events.AsEvent = AsEvent;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        /**
         * Represents an EventBase
         *
         * @export
         * @class EventBase
         */
        var EventBase = (function () {
            function EventBase(pKey, pCallBack, pOwner, pAttachedData, pFunction) {
                this.mAttachedData = pAttachedData;
                this.mOwner = pOwner;
                this.mKey = pKey;
                this.mCallBack = pCallBack;
            }
            Object.defineProperty(EventBase.prototype, "callBack", {
                //____________________________________________________________
                get: function () {
                    return this.mCallBack;
                },
                set: function (value) {
                    this.mCallBack = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "data", {
                //____________________________________________________________
                get: function () {
                    return this.mData;
                },
                set: function (value) {
                    this.mData = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "owner", {
                //____________________________________________________________
                get: function () {
                    return this.mOwner;
                },
                set: function (value) {
                    this.mOwner = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "sender", {
                //____________________________________________________________
                get: function () {
                    return this.mSender;
                },
                set: function (value) {
                    this.mSender = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "attachedData", {
                //____________________________________________________________
                get: function () {
                    return this.mAttachedData;
                },
                set: function (value) {
                    this.mAttachedData = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventBase.prototype, "key", {
                //____________________________________________________________
                get: function () {
                    return this.mKey;
                },
                set: function (value) {
                    this.mKey = value;
                },
                enumerable: true,
                configurable: true
            });
            return EventBase;
        }());
        events.EventBase = EventBase;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        /**
         * Class that manages the dispatching of events
         *
         * @export
         * @class EventDispatcher
         */
        var EventDispatcher = (function () {
            /**
             * Creates an instance of EventDispatcher.
             *
             * @memberOf EventDispatcher
             */
            function EventDispatcher() {
            }
            /**
             * Adds an event listener to an owner
             *
             * @param {string} pType -event to add to owner
             * @param {Function} pCallback -function to call when event is fired
             * @param {*} pOwner -owner to add event to
             * @returns {void}
             *
             * @memberOf EventDispatcher
             */
            EventDispatcher.prototype.addEventListener = function (pType, pCallback, pOwner) {
                if (pCallback == undefined) {
                    return;
                }
                if (this.mEventsArray == null) {
                    this.mEventsArray = new Array();
                }
                if (this.mEventsArray[pType] == null) {
                    this.mEventsArray[pType] = new Array();
                }
                var aEventsList = this.mEventsArray[pType];
                for (var i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        return;
                    }
                }
                this.mEventsArray[pType].push(new CallbackHolder(pCallback, pOwner));
            };
            //______________________________________________________________
            /**
             * Removes an event listener from an object
             *
             * @param {string} pType -event to remove
             * @param {*} pOwner - owner  to remove from
             * @returns {void}
             *
             * @memberOf EventDispatcher
             */
            EventDispatcher.prototype.removeEventListener = function (pType, pOwner) {
                if (this.mEventsArray == null) {
                    return;
                }
                if (this.mEventsArray[pType] == null) {
                    return;
                }
                var aEventsList = this.mEventsArray[pType];
                for (var i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            };
            //______________________________________________________________
            /**
             *
             * Dispatches an event
             * @protected
             * @param {string} pType -event to dispatch
             * @param {*} [pData] -data to dispatch with event
             * @returns {void}
             *
             * @memberOf EventDispatcher
             */
            EventDispatcher.prototype.dispatchEvent = function (pType, pData) {
                if (this.mEventsArray == null) {
                    return;
                }
                if (this.mEventsArray[pType] == null) {
                    return;
                }
                if (pData == null) {
                    for (var i = 0; i < this.mEventsArray[pType].length; i++) {
                        this.mEventsArray[pType][i].callback();
                    }
                }
                else {
                    for (var i = 0; i < this.mEventsArray[pType].length; i++) {
                        this.mEventsArray[pType][i].callback(pData);
                    }
                }
            };
            //________________________________________________________________
            /**
             * Removes all of an object's events
             *
             * @protected
             * @param {string} pType
             * @param {*} pOwner
             * @returns {void}
             *
             * @memberOf EventDispatcher
             */
            EventDispatcher.prototype.removeAllOwnerEvents = function (pType, pOwner) {
                if (this.mEventsArray == null) {
                    return;
                }
                for (var aTypes in this.mEventsArray) {
                    var aEventsList = this.mEventsArray[aTypes];
                    for (var i = aEventsList.length - 1; i >= 0; i--) {
                        if (aEventsList[i].owner == pOwner) {
                            aEventsList.splice(i, 1);
                        }
                    }
                }
            };
            return EventDispatcher;
        }());
        events.EventDispatcher = EventDispatcher;
        //__________________________________________________________________
        /**
         *
         *
         * @class CallbackHolder
         */
        var CallbackHolder = (function () {
            function CallbackHolder(pCallback, pOwner) {
                this.callback = pCallback;
                this.owner = pOwner;
            }
            return CallbackHolder;
        }());
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        /**
         * Class that represents an event manager
         *
         * @export
         * @class EventManager
         */
        var EventManager = (function () {
            function EventManager() {
            }
            //-----------------------------------------------------
            /**
             * Dispatches a custom event
             *
             * @static
             * @param {EventBase} pEvent
             * @returns {void}
             *
             * @memberOf EventManager
             */
            EventManager.dispatchCustomEvent = function (pEvent) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pEvent.key] == null) {
                    return;
                }
                var aEventsList = EventManager.mEvents[pEvent.key];
                for (var i = 0; i < aEventsList.length; i++) {
                    pEvent.attachedData = aEventsList[i].attachedData;
                    pEvent.owner = aEventsList[i].owner;
                    aEventsList[i].callBack(pEvent);
                }
            };
            //-----------------------------------------------------
            /**
             * Dispatches a event
             *
             * @static
             * @param {string} pKey
             * @param {*} pOwner
             * @param {*} [pData]
             * @returns {void}
             *
             * @memberOf EventManager
             */
            EventManager.dispatchEvent = function (pKey, pOwner, pData) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pKey] == null) {
                    return;
                }
                var aEventsList = EventManager.mEvents[pKey];
                for (var i = 0; i < aEventsList.length; i++) {
                    aEventsList[i].data = pData;
                    aEventsList[i].sender = pOwner;
                    aEventsList[i].callBack(aEventsList[i]);
                }
            };
            //-----------------------------------------------------
            /**
             * Adds an event listener
             *
             * @static
             * @param {string} pKey
             * @param {Function} pCallback
             * @param {*} pOwner
             * @param {*} [pAtachedData]
             * @param {Function} [pFunction]
             * @returns {void}
             *
             * @memberOf EventManager
             */
            EventManager.addEventListener = function (pKey, pCallback, pOwner, pAtachedData, pFunction) {
                if (EventManager.mEvents == null) {
                    EventManager.mEvents = new Array();
                }
                if (EventManager.mEvents[pKey] == null) {
                    EventManager.mEvents[pKey] = Array();
                }
                if (EventManager.hasEventListener(pKey, pOwner)) {
                    return;
                }
                var aEvent = new events.EventBase(pKey, pCallback, pOwner, pAtachedData, pFunction);
                EventManager.mEvents[pKey].push(aEvent);
            };
            //-----------------------------------------------------
            /**
             * Checks if object has event listener
             *
             * @static
             * @param {string} pKey
             * @param {*} pOwner
             * @returns {boolean}
             *
             * @memberOf EventManager
             */
            EventManager.hasEventListener = function (pKey, pOwner) {
                var aArray = EventManager.mEvents[pKey];
                for (var i = 0; i < aArray.length; i++) {
                    if (aArray[i].owner == pOwner) {
                        return true;
                    }
                }
                return false;
            };
            //-----------------------------------------------------
            /**
             * Removes a event listener
             *
             * @static
             * @param {string} pKey
             * @param {*} pOwner
             * @returns {void}
             *
             * @memberOf EventManager
             */
            EventManager.removeEventListener = function (pKey, pOwner) {
                if (EventManager.mEvents == null) {
                    return;
                }
                if (EventManager.mEvents[pKey] == null) {
                    return;
                }
                var aEventsList = EventManager.mEvents[pKey];
                for (var i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            };
            //-----------------------------------------------------
            /**
             * Removes all of a object's events
             *
             * @static
             * @param {*} pOwner
             * @returns {void}
             *
             * @memberOf EventManager
             */
            EventManager.removeAllOwnerEvents = function (pOwner) {
                if (EventManager.mEvents == null) {
                    return;
                }
                for (var aKey in EventManager.mEvents) {
                    var aEventsList = EventManager.mEvents[aKey];
                    for (var i = aEventsList.length - 1; i >= 0; i--) {
                        if (aEventsList[i].owner == pOwner) {
                            aEventsList.splice(i, 1);
                        }
                    }
                }
            };
            return EventManager;
        }());
        events.EventManager = EventManager;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        /**
         * Class that contains global keyboard codes
         *
         * @export
         * @class KeyboardCodes
         */
        var KeyboardCodes = (function () {
            function KeyboardCodes() {
            }
            return KeyboardCodes;
        }());
        KeyboardCodes.TAB = 9;
        KeyboardCodes.ENTER = 13;
        KeyboardCodes.ESC = 27;
        KeyboardCodes.PAGE_UP = 33;
        KeyboardCodes.PAGE_DOWN = 34;
        KeyboardCodes.END = 35;
        KeyboardCodes.HOME = 36;
        KeyboardCodes.ARROW_UP = 38;
        KeyboardCodes.ARROW_LEFT = 37;
        KeyboardCodes.ARROW_RIGHT = 39;
        KeyboardCodes.ARROW_DOWN = 40;
        KeyboardCodes.F1 = 112;
        KeyboardCodes.F2 = 113;
        KeyboardCodes.NUM_1 = 49;
        KeyboardCodes.NUM_2 = 50;
        KeyboardCodes.NUM_3 = 51;
        KeyboardCodes.BACKSPACE = 8;
        KeyboardCodes.DELETE = 46;
        KeyboardCodes.DIGIT_0 = 48;
        KeyboardCodes.LETTER_Z = 90;
        events.KeyboardCodes = KeyboardCodes;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var events;
    (function (events) {
        /**
         * Class that contains global mouse events
         *
         * @export
         * @class MouseEvents
         */
        var MouseEvents = (function () {
            function MouseEvents() {
            }
            return MouseEvents;
        }());
        MouseEvents.CLICK = "click";
        MouseEvents.DOUBLE_CLICK = "dblclick";
        MouseEvents.MOUSE_OVER = "mouseover";
        MouseEvents.MOUSE_OUT = "mouseout";
        MouseEvents.MOUSE_DOWN = "mousedown";
        MouseEvents.MOUSE_UP = "mouseup";
        MouseEvents.MOUSE_MOVE = "mousemove";
        MouseEvents.TOUCH_MOVE = "touchmove";
        MouseEvents.TOUCH_START = "touchstart";
        MouseEvents.TOUCH_END = "touchend";
        MouseEvents.DRAG_OVER = "dragover";
        MouseEvents.DRAG_LEAVE = "dragleave";
        MouseEvents.DROP = "drop";
        events.MouseEvents = MouseEvents;
    })(events = asBase.events || (asBase.events = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.interpolate = function (pP1, pP2, pVal) {
                var aDx = (pP2.x - pP1.x) * pVal;
                var aDy = (pP2.y - pP1.y) * pVal;
                return (new asBase.math.Point(pP1.x + aDx, pP1.y + aDy));
            };
            //_____________________________________________________________________
            MathUtils.distance = function (pP1, pP2) {
                var aDx = (pP1.x - pP2.x);
                var aDy = (pP1.y - pP2.y);
                return (Math.sqrt((aDx * aDx) + (aDy * aDy)));
            };
            //_____________________________________________________________________
            MathUtils.rotatePoint = function (pPoint, pAngle) {
                var aRadAngle = pAngle * MathUtils.DEG_TO_RAD;
                var aX = pPoint.x * Math.cos(aRadAngle) - pPoint.y * Math.sin(aRadAngle);
                var aY = pPoint.x * Math.sin(aRadAngle) + pPoint.y * Math.cos(aRadAngle);
                return (new asBase.math.Point(aX, aY));
            };
            //_____________________________________________________________________
            MathUtils.isRectOverlap = function (pRect1, pRect2) {
                return !(pRect2.left > pRect1.right ||
                    pRect2.right < pRect1.left ||
                    pRect2.top > pRect1.bottom ||
                    pRect2.bottom < pRect1.top);
            };
            //_____________________________________________________________________
            MathUtils.combineRectToBaseRect = function (pBaseRect, pWithRect) {
                pBaseRect.left = Math.min(pBaseRect.left, pWithRect.left);
                pBaseRect.right = Math.max(pBaseRect.right, pWithRect.right);
                pBaseRect.top = Math.min(pBaseRect.top, pWithRect.top);
                pBaseRect.bottom = Math.max(pBaseRect.bottom, pWithRect.bottom);
                return pBaseRect;
            };
            return MathUtils;
        }());
        MathUtils.RAD_TO_DEG = 180 / Math.PI;
        MathUtils.DEG_TO_RAD = Math.PI / 180;
        math.MathUtils = MathUtils;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
/*
Base On:
https://github.com/epistemex/transformation-matrix-js/blob/master/src/matrix.js

*/
var asBase;
/*
Base On:
https://github.com/epistemex/transformation-matrix-js/blob/master/src/matrix.js

*/
(function (asBase) {
    var math;
    (function (math) {
        /**
         * Represents a Matrix
         *
         * @export
         * @class Matrix
         */
        var Matrix = (function () {
            function Matrix() {
                //------------------------------
                // Members
                //------------------------------
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.e = 0; //X
                this.f = 0; //Y
            }
            /****************************
            * Methods
            ****************************/
            Matrix.fromSVGMatrix = function (svgMatrix) {
                return new Matrix().multiply(svgMatrix);
            };
            ;
            //______________________________________________________
            Matrix.fromDOMMatrix = function (domMatrix) {
                return new Matrix().multiply(domMatrix);
            };
            ;
            //______________________________________________________
            Matrix.prototype.flipX = function () {
                return (this.transform(-1, 0, 0, 1, 0, 0));
            };
            ;
            //______________________________________________________
            Matrix.prototype.flipY = function () {
                return (this.transform(1, 0, 0, -1, 0, 0));
            };
            ;
            //______________________________________________________
            Matrix.prototype.applyToPoint = function (x, y) {
                var aPoint = new math.Point();
                aPoint.x = x * this.a + y * this.c + this.e;
                aPoint.y = x * this.b + y * this.d + this.f;
                return (aPoint);
            };
            ;
            //______________________________________________________
            Matrix.prototype.reflectVector = function (x, y) {
                var v = this.applyToPoint(0, 1), d = (v.x * x + v.y * y) * 2;
                x -= d * v.x;
                y -= d * v.y;
                return (new math.Point(x, y));
            };
            ;
            //______________________________________________________
            Matrix.prototype.determinant = function () {
                return (this.a * this.d - this.b * this.c);
            };
            ;
            //______________________________________________________
            Matrix.prototype.indent = function () {
                return (this.setTransform(1, 0, 0, 1, 0, 0));
            };
            ;
            //______________________________________________________
            Matrix.prototype.rotate = function (pAngle) {
                var cos = Math.cos(pAngle), sin = Math.sin(pAngle);
                return this.transform(cos, sin, -sin, cos, 0, 0);
            };
            ;
            //____________________________________________________
            Matrix.prototype.divideScalar = function (pScalar) {
                this.a /= pScalar;
                this.b /= pScalar;
                this.c /= pScalar;
                this.d /= pScalar;
                this.e /= pScalar;
                this.f /= pScalar;
            };
            ;
            //____________________________________________________
            Matrix.prototype.setTransform = function (pA, pB, pC, pD, pE, pF) {
                this.a = pA;
                this.b = pB;
                this.c = pC;
                this.d = pD;
                this.e = pE;
                this.f = pF;
                return this;
            };
            ;
            //____________________________________________________
            Matrix.prototype.transform = function (pA, pB, pC, pD, pE, pF) {
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;
                var e1 = this.e;
                var f1 = this.f;
                this.a = a1 * pA + c1 * pB;
                this.b = b1 * pA + d1 * pB;
                this.c = a1 * pC + c1 * pD;
                this.d = b1 * pC + d1 * pD;
                this.e = a1 * pE + c1 * pF + e1;
                this.f = b1 * pE + d1 * pF + f1;
                return this;
            };
            ;
            //____________________________________________________
            Matrix.prototype.multiply = function (pMatrix) {
                return (this.transform(pMatrix.a, pMatrix.b, pMatrix.c, pMatrix.d, pMatrix.e, pMatrix.f));
            };
            //____________________________________________________
            Matrix.prototype.inverse = function () {
                var aRet = new Matrix();
                var dt = this.determinant();
                if (this.q(dt, 0)) {
                    throw "Matrix not invertible.";
                }
                aRet.a = this.d / dt;
                aRet.b = -this.b / dt;
                aRet.c = -this.c / dt;
                aRet.d = this.a / dt;
                aRet.e = (this.c * this.f - this.d * this.e) / dt;
                aRet.f = -(this.a * this.f - this.b * this.e) / dt;
                return aRet;
            };
            ;
            //____________________________________________________
            Matrix.prototype.interpolate = function (pMatrix, pT) {
                var aRet = new Matrix();
                aRet.a = this.a + (pMatrix.a - this.a) * pT;
                aRet.b = this.b + (pMatrix.b - this.b) * pT;
                aRet.c = this.c + (pMatrix.c - this.c) * pT;
                aRet.d = this.d + (pMatrix.d - this.d) * pT;
                aRet.e = this.e + (pMatrix.e - this.e) * pT;
                aRet.f = this.f + (pMatrix.f - this.f) * pT;
                return aRet;
            };
            ;
            //____________________________________________________
            Matrix.prototype.q = function (p1, p2) {
                return (Math.abs(p1 - p2) < 1e-14);
            };
            Object.defineProperty(Matrix, "myName", {
                /****************************
                * Getters and Setters
                ****************************/
                get: function () {
                    return "Matrix";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix.prototype, "myClassName", {
                //______________________________________________
                get: function () {
                    return "Matrix";
                },
                enumerable: true,
                configurable: true
            });
            return Matrix;
        }());
        math.Matrix = Matrix;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        /**
         * Represents a 2D Point
         *
         * @export
         * @class Point
         */
        var Point = (function () {
            function Point(iX, iY) {
                if (iX === void 0) { iX = 0; }
                if (iY === void 0) { iY = 0; }
                this.x = iX;
                this.y = iY;
            }
            /****************************
            * Override methods
            ****************************/
            /****************************
            * Methods
            ****************************/
            Point.prototype.subtract = function (p) {
                return (new Point(this.x - p.x, this.y - p.y));
            };
            //________________________________________________________________
            Point.prototype.add = function (p) {
                return (new Point(this.x + p.x, this.y + p.y));
            };
            //________________________________________________________________
            Point.interpolate = function (p1, p2, pFrac) {
                var aX = p1.x + (p2.x - p1.x) * pFrac;
                var aY = p1.y + (p2.y - p1.y) * pFrac;
                return (new Point(aX, aY));
            };
            Object.defineProperty(Point.prototype, "length", {
                get: function () {
                    return (Math.sqrt(this.x * this.x + this.y * this.y));
                },
                /****************************
                * Getters and Setters
                ****************************/
                set: function (pVal) {
                    var aV = this.length / pVal;
                    this.x /= aV;
                    this.y /= aV;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Point, "myName", {
                //________________________________________________________________
                get: function () {
                    return "Point";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Point.prototype, "myClassName", {
                //______________________________________________
                get: function () {
                    return "Point";
                },
                enumerable: true,
                configurable: true
            });
            return Point;
        }());
        math.Point = Point;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
var asBase;
(function (asBase) {
    var math;
    (function (math) {
        /**
         * Represetns a Rectangle
         *
         * @export
         * @class Rectangle
         */
        var Rectangle = (function () {
            function Rectangle(pClientRect) {
                //------------------------------
                // Members
                //------------------------------
                this.left = 0;
                this.right = 0;
                this.top = 0;
                this.bottom = 0;
                if (pClientRect != null) {
                    this.left = pClientRect.left;
                    this.right = pClientRect.right;
                    this.top = pClientRect.top;
                    this.bottom = pClientRect.bottom;
                }
            }
            //____________________________________
            Rectangle.prototype.intersectsPoint = function (pX, pY) {
                return !((pX < this.left) || (pX > this.right) || (pY < this.top) || (pY > this.bottom));
            };
            //____________________________________
            Rectangle.prototype.intersects = function (pRectB) {
                return !(pRectB.left > this.right ||
                    pRectB.right < this.left ||
                    pRectB.top > this.bottom ||
                    pRectB.bottom < this.top);
            };
            //____________________________________
            Rectangle.intersectRect = function (pRectA, pRectB) {
                return !(pRectB.left > pRectA.right ||
                    pRectB.right < pRectA.left ||
                    pRectB.top > pRectA.bottom ||
                    pRectB.bottom < pRectA.top);
            };
            //____________________________________
            Rectangle.intersectPoint = function (pRectA, iX, iY) {
                return !(pRectA.left > iX ||
                    pRectA.right < iX ||
                    pRectA.top > iY ||
                    pRectA.bottom < iY);
            };
            //____________________________________
            Rectangle.create = function (iX, iY, iWidth, iHeight) {
                var aRet = new Rectangle();
                aRet.left = iX;
                aRet.right = iX + iWidth;
                aRet.top = iY;
                aRet.bottom = iY + iHeight;
                return aRet;
            };
            Object.defineProperty(Rectangle.prototype, "height", {
                /****************************
                * Methods
                ****************************/
                /****************************
                * Getters and Setters
                ****************************/
                get: function () {
                    return Math.abs(this.top - this.bottom);
                },
                set: function (pVal) {
                    this.bottom = this.top + pVal;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "width", {
                //_____________________________________________________
                get: function () {
                    return Math.abs(this.left - this.right);
                },
                set: function (pVal) {
                    this.right = this.left + pVal;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "y", {
                //_____________________________________________________
                get: function () {
                    return this.top;
                },
                set: function (pVal) {
                    this.top = pVal;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "x", {
                //_____________________________________________________
                get: function () {
                    return this.left;
                },
                set: function (pVal) {
                    this.left = pVal;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle, "myClassName", {
                //_____________________________________________________
                get: function () {
                    return "Rectangle";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "myClassName", {
                //______________________________________________
                get: function () {
                    return "Rectangle";
                },
                enumerable: true,
                configurable: true
            });
            return Rectangle;
        }());
        math.Rectangle = Rectangle;
    })(math = asBase.math || (asBase.math = {}));
})(asBase || (asBase = {}));
/// <reference path="../asbase/math/matrix.ts" />
/// <reference path="../asbase/math/rectangle.ts" />
/// <reference path="../asbase/math/point.ts" />
/// <reference path="../asbase/math/mathutils.ts" />
var unescape = unescape;
var asSvg;
(function (asSvg) {
    /**
     *Represents a base class for all  display svg elements
     *
     * @export
     * @class DisplayObject
     */
    var DisplayObject = (function () {
        /**
         * Creates an instance of DisplayObject.
         *
         * @memberOf DisplayObject
         */
        function DisplayObject() {
            this.mX = 0;
            this.mY = 0;
            this.mRotation = 0;
            this.mScaleX = 1;
            this.mScaleY = 1;
            this.mVisible = true;
            this.mIsInDrag = false;
            this.mLastMouseEvent = null;
            DisplayObject.mInstanceCounter++;
            this.createElement();
            if (this.element != null) {
                this.element.id = "instance_" + DisplayObject.mInstanceCounter;
            }
            this.mLastGlobalMousePoint = new asBase.math.Point(-Number.MAX_VALUE, -Number.MAX_VALUE);
            this.mCallbacks = {};
        }
        /****************************
         * Override methods
         ****************************/
        /****************************
         * Methods
         ****************************/
        //_________________________________________________________
        /**
         * Returns the Display Object as an Image
         *
         * @param {number} [pScale]
         * @param {number} [pX]
         * @param {number} [pY]
         * @param {number} [pSizeX]
         * @param {number} [pSizeY]
         * @returns {HTMLImageElement}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.getImage = function (pScale, pX, pY, pSizeX, pSizeY) {
            var aImg = document.createElement("img");
            var aXML;
            var aStage = new asSvg.Stage();
            var aElement = this.clone();
            if (pScale != null) {
                aElement.setScale(pScale);
            }
            if (pX != null && pY != null) {
                aElement.x = pX;
                aElement.y = pY;
            }
            if (pSizeX != null && pSizeY != null) {
                aStage.setSize(pSizeX, pSizeY);
            }
            aStage.addChild(aElement);
            aXML = aStage.getAsString();
            var svg64 = btoa(unescape(encodeURIComponent(aXML)));
            aImg.src = "data:image/svg+xml;base64," + svg64;
            return aImg;
        };
        //_______________________________________________________________________
        /**
         *
         *
         * @returns {string}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.getAsString = function () {
            var aXml = new XMLSerializer().serializeToString(this.mElement);
            return aXml;
        };
        //________________________________________________________________________
        /**
         * Clones the Display Object
         *
         * @returns {DisplayObject}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.clone = function () {
            var aRet = new DisplayObject();
            aRet.mElement = this.mElement.cloneNode(true);
            aRet.x = this.x;
            aRet.y = this.y;
            aRet.rotation = this.rotation;
            aRet.scaleX = this.scaleX;
            aRet.scaleY = this.scaleY;
            return aRet;
        };
        //_______________________________________________________________________
        /**
         *
         *
         * @protected
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.createElement = function () {
        };
        ;
        //_______________________________________________________________________
        /**
         *
         *
         * @protected
         * @param {string} pType
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.create = function (pType) {
            this.mElement = document.createElementNS("http://www.w3.org/2000/svg", pType);
        };
        ;
        //_______________________________________________________
        /**
         * Sets the line style of the display object
         *
         * @param {number} [pWidth]
         * @param {number} [pColor]
         * @param {number} [pOpacity]
         * @param {string} [pLinecap]
         * @param {string} [pLinejoin]
         * @param {Array<number>} [pDashedLineArray]
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.setLineStyle = function (pWidth, pColor, pOpacity, pLinecap, pLinejoin, pDashedLineArray) {
            if (pWidth != null) {
                this.mElement.setAttribute("stroke-width", pWidth.toString());
            }
            if (pColor != null) {
                var aColor = "#" + pColor.toString(16);
                while (aColor.length < 7) {
                    aColor += "0";
                }
                this.mElement.setAttribute("stroke", aColor);
            }
            else if (pColor < 0) {
                this.mElement.setAttribute("stroke", "none");
            }
            if (pOpacity != null) {
                this.mElement.setAttribute("stroke-opacity", pOpacity.toString());
            }
            if (pLinecap != null) {
                this.mElement.setAttribute("stroke-linecap", pLinecap);
            }
            if (pLinejoin != null) {
                this.mElement.setAttribute("stroke-linejoin", pLinejoin);
            }
            if (pDashedLineArray != null) {
                this.mElement.setAttribute("stroke-dasharray", pDashedLineArray.join(","));
            }
        };
        //________________________________________________________
        /**
         * Sets the fill of the display object
         *
         * @param {number} [pColor]
         * @param {number} [pOpacity]
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.setFill = function (pColor, pOpacity) {
            if (pColor != null && pColor >= 0) {
                var aBase16 = pColor.toString(16);
                while (aBase16.length < 6) {
                    aBase16 = "0" + aBase16;
                }
                var aColor = "#" + aBase16;
                this.mElement.setAttribute("fill", aColor);
            }
            if (pOpacity != null) {
                this.mElement.setAttribute("fill-opacity", pOpacity.toString());
            }
            if (pColor == null) {
                this.mElement.setAttribute("fill", "none");
            }
        };
        //_____________________________________________________________
        /**
         * Returns the Bounding Client Rect of the Display Object
         *
         * @returns {ClientRect}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.getLocalBounds = function () {
            return (this.mElement.getBoundingClientRect());
        };
        //_____________________________________________________________
        /**
         * Returns the Bounding Client Rect of the Display Object
         *
         * @returns {ClientRect}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.getBounds = function () {
            return (this.mElement.getBoundingClientRect());
        };
        //________________________________________________________________
        /**
         * Returns if another display object has hit the display object
         *
         * @param {DisplayObject} pElement
         * @param {number} [pGap=0]
         * @returns {boolean}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.hitTestObject = function (pElement, pGap) {
            if (pGap === void 0) { pGap = 0; }
            var mRect1 = this.mElement.getBoundingClientRect();
            var mRect2 = pElement.getBounds();
            if (pGap > 0) {
                mRect1 = new asBase.math.Rectangle(mRect1);
                mRect1.left -= pGap;
                mRect1.right += pGap;
                mRect1.top -= pGap;
                mRect1.bottom += pGap;
            }
            return !(mRect2.left > mRect1.right ||
                mRect2.right < mRect1.left ||
                mRect2.top > mRect1.bottom ||
                mRect2.bottom < mRect1.top);
        };
        Object.defineProperty(DisplayObject.prototype, "matrix", {
            //_________________________________________________________________
            /**
             * Returns the matrix of the display object
             *
             * @readonly
             * @type {asBase.math.Matrix}
             * @memberOf DisplayObject
             */
            get: function () {
                if (this.mMatrix == null) {
                    this.mMatrix = new asBase.math.Matrix();
                    var a = this.mRotation * Math.PI / 180;
                    this.mMatrix.setTransform(this.mScaleX * Math.cos(a), this.mScaleY * Math.sin(a), -this.mScaleX * Math.sin(a), this.mScaleY * Math.cos(a), this.mX, this.mY);
                }
                return (this.mMatrix);
            },
            enumerable: true,
            configurable: true
        });
        //________________________________________________________________________
        /**
         * Converts a local point to a parent point
         *
         * @param {asBase.math.Point} pPoint
         * @param {Sprite} Parent
         * @returns {asBase.math.Point}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.localToParent = function (pPoint, Parent) {
            var aMat = this.localToGlobalMatrix(Parent);
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        };
        //________________________________________________________________________
        /**
         * Converts a parent's point to a local point -relative to its child
         *
         * @param {asBase.math.Point} pPoint
         * @param {Sprite} Parent
         * @returns {asBase.math.Point}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.parentToLocal = function (pPoint, Parent) {
            var aMat = this.globalToLocalMatrix(Parent);
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        };
        //________________________________________________________________________
        /**
         * Converts a local point to a global point
         *
         * @param {asBase.math.Point} pPoint
         * @returns {asBase.math.Point}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.localToGlobal = function (pPoint) {
            var aMat = this.localToGlobalMatrix();
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        };
        //________________________________________________________________________
        /**
         * returns the local matrix as as global matrix
         *
         * @param {Sprite} [Parent]
         * @returns {asBase.math.Matrix}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.localToGlobalMatrix = function (Parent) {
            var aMatrixArray = this.getMatrixsStuck(Parent);
            if (aMatrixArray.length == 0) {
                return new asBase.math.Matrix();
            }
            var aMat = new asBase.math.Matrix();
            for (var i = aMatrixArray.length - 2; i >= 0; i--) {
                aMat = aMat.multiply(aMatrixArray[i]);
            }
            return aMat;
        };
        //_________________________________________________________________________
        /**
         * returns the global matrix as a local matrix
         *
         * @param {Sprite} [Parent]
         * @returns {asBase.math.Matrix}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.globalToLocalMatrix = function (Parent) {
            var aMatrixArray = this.getMatrixsStuck(Parent);
            if (aMatrixArray.length == 0) {
                return new asBase.math.Matrix();
            }
            var aMat = new asBase.math.Matrix();
            for (var i = aMatrixArray.length - 1; i >= 0; i--) {
                aMat = aMat.multiply(aMatrixArray[i]);
            }
            aMat = aMat.inverse();
            return aMat;
        };
        //________________________________________________________________________
        /**
         * Returns a global point as a local point
         *
         * @param {asBase.math.Point} pPoint
         * @returns {asBase.math.Point}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.globalToLocal = function (pPoint) {
            var aMat = this.globalToLocalMatrix();
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        };
        //__________________________________________________________________________________
        /**
         *
         *
         * @private
         * @param {Sprite} [pParent]
         * @returns {Array<asBase.math.Matrix>}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.getMatrixsStuck = function (pParent) {
            var aMatrixArray = new Array();
            if (this.stage == null) {
                return aMatrixArray;
            }
            if (this.myClassName == asSvg.Stage.myName) {
                return aMatrixArray;
            }
            aMatrixArray.push(this.matrix);
            var aCurrent = this.parent;
            while ((aCurrent != null) && (aCurrent.myClassName != asSvg.Stage.myName) && (aCurrent != pParent)) {
                aMatrixArray.push(aCurrent.matrix);
                aCurrent = aCurrent.parent;
            }
            //aMatrixArray.push(aCurrent.matrix);
            return aMatrixArray;
        };
        //________________________________________________________________________
        /**
         * Returns if the dispay object has hit a point
         *
         * @param {number} pX
         * @param {number} pY
         * @param {boolean} pIsShape
         * @returns {boolean}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.hitTestPoint = function (pX, pY, pIsShape) {
            var mRect = this.mElement.getBoundingClientRect();
            if (pX < mRect.left) {
                return false;
            }
            if (pX > mRect.right) {
                return false;
            }
            if (pY > mRect.bottom) {
                return false;
            }
            if (pY < mRect.top) {
                return false;
            }
            if (!pIsShape) {
                return true;
            }
            // TODO - Shape Hit Test ;
            /* Options :
             NodeList getIntersectionList ( in SVGRect rect, in SVGElement referenceElement );
             NodeList getEnclosureList ( in SVGRect rect, in SVGElement referenceElement );
             boolean checkIntersection ( in SVGElement element, in SVGRect rect );
             boolean checkEnclosure
             */
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "rotation", {
            /**
             * Returns the rotation of the display object
             *
             * @readonly
             * @type {number}
             * @memberOf DisplayObject
             */
            get: function () {
                return (this.mRotation);
            },
            /****************************
             * Getters and Setters
             ****************************/
            /**
             * Sets the rotaion of the display object
             *
             * @param {number} pVal- angle in degrees
             * @memberOf DisplayObject
             */
            set: function (pVal) {
                this.mRotation = pVal;
                this.updateTransform();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "x", {
            /**
             * Returns the x value
             *
             * @readonly
             * @type {number}
             * @memberOf DisplayObject
             */
            get: function () {
                return (this.mX);
            },
            //___________________________________________________
            /**
             * Sets the x value
             *
             * @param {number} pVal - x value
             * @memberOf DisplayObject
             */
            set: function (pVal) {
                this.mX = pVal;
                this.updateTransform();
                this.updatePositionX();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "y", {
            /**
             *
             *
             * @readonly
             * @type {number}
             * @memberOf DisplayObject
             */
            get: function () {
                return (this.mY);
            },
            //___________________________________________________
            /**
             * Sets the y value
             *
             * @param {number} pVal - y value
             * @memberOf DisplayObject
             */
            set: function (pVal) {
                this.mY = pVal;
                this.updateTransform();
                this.updatePositionY();
            },
            enumerable: true,
            configurable: true
        });
        //___________________________________________________
        DisplayObject.prototype.updatePositionY = function () {
        };
        //___________________________________________________
        DisplayObject.prototype.updatePositionX = function () {
        };
        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            /**
             * Returns the y scale
             *
             * @readonly
             * @type {number}
             * @memberOf DisplayObject
             */
            get: function () {
                return (this.mScaleY);
            },
            //___________________________________________________
            /**
             * Sets the y scale
             *
             * @param {number} pVal - y scale
             * @memberOf DisplayObject
             */
            set: function (pVal) {
                this.mScaleY = pVal;
                this.updateTransform();
            },
            enumerable: true,
            configurable: true
        });
        //___________________________________________________
        /**
         * Sets the x and y scale
         *
         * @param {number} pVal  -scale
         * @returns
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.setScale = function (pVal) {
            if (isNaN(pVal)) {
                return;
            }
            this.mScaleY = pVal;
            this.mScaleX = pVal;
            this.updateTransform();
        };
        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            /**
             * Returns the x scale
             *
             * @readonly
             * @type {number}
             * @memberOf DisplayObject
             */
            get: function () {
                return (this.mScaleX);
            },
            //___________________________________________________
            /**
             * Sets the x scale
             * @param {number} pVal - x scale
             *
             * @memberOf DisplayObject
             */
            set: function (pVal) {
                this.mScaleX = pVal;
                this.updateTransform();
            },
            enumerable: true,
            configurable: true
        });
        //___________________________________________________
        /**
         * Updates the transform matrix
         *
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.updateTransform = function () {
            this.mMatrix = null;
            var aMat = this.matrix;
            if (isNaN(aMat.a) || isNaN(aMat.c)) {
                console.log("failed -> updateTransform NaN");
            }
            var aTransform = "matrix(" + aMat.a + "," + aMat.b + "," + aMat.c + "," + aMat.d + "," + aMat.e + "," + aMat.f + ")";
            this.mElement.setAttribute("transform", aTransform);
        };
        //___________________________________________________
        /**
         * Update the transform matrix(defunct)
         *
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.updateTransformOld = function () {
            var aTransform = "";
            if ((this.mX != 0) || (this.mY != 0)) {
                aTransform += "translate(" + this.mX + "," + this.mY + ") "; // rotate(20)";
            }
            if (this.mRotation != 0) {
                aTransform += "rotate(" + this.mRotation + ") "; // rotate(20)";
            }
            if ((this.mScaleX != 1) || (this.mScaleY != 1)) {
                aTransform += "scale(" + this.mScaleX + "," + this.mScaleY + ")"; // rotate(20)";
            }
            this.mElement.setAttribute("transform", aTransform);
        };
        //____________________________________________________________
        /**
         * Shows/Hides the display object
         *
         * @param {boolean} pVal
         * @returns
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.show = function (pVal) {
            this.mVisible = pVal;
            if (this.mParent == null) {
                return;
            }
            if (!this.mVisible) {
                if (this.mParent.element == this.mElement.parentNode) {
                    this.mParent.element.removeChild(this.mElement);
                }
            }
            else {
                this.mParent.element.appendChild(this.mElement);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "visible", {
            get: function () {
                return (this.mVisible);
            },
            //_____________________________________________________________
            set: function (pVal) {
                this.show(pVal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "alpha", {
            /**
             * Returns the opcaity
             *
             * @readonly
             * @type {number}
             * @memberOf DisplayObject
             */
            get: function () {
                return (this.mAlpha);
            },
            //_____________________________________________________________
            /**
             * Sets the opacity of the display object
             *
             *
             * @memberOf DisplayObject
             */
            set: function (pVal) {
                this.setLineStyle(null, null, pVal);
                this.setFill(null, pVal);
                this.mAlpha = pVal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "height", {
            //_____________________________________________________________
            get: function () {
                if (this.stage == null) {
                    return 0;
                }
                return (this.mElement.getBoundingClientRect().height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "width", {
            //_____________________________________________________________
            get: function () {
                if (this.stage == null) {
                    return 0;
                }
                return (this.mElement.getBoundingClientRect().width);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "parent", {
            get: function () {
                return (this.mParent);
            },
            //_____________________________________________________________
            set: function (pVal) {
                this.mParent = pVal;
                if (pVal == null) {
                    this.mStage = null;
                }
                this.mStage = this.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "element", {
            //_____________________________________________________________
            get: function () {
                return this.mElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject, "myName", {
            get: function () {
                return "DisplayObject";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "DisplayObject";
            },
            enumerable: true,
            configurable: true
        });
        //______________________________________________
        DisplayObject.prototype.removeEventListenerOld = function (pKey, pEventListener) {
            if (this.mCallbacks[pKey] != null) {
                for (var i = 0; i < this.mCallbacks[pKey].length; i++) {
                    if (pEventListener != null) {
                        if (this.mCallbacks[pKey] == pEventListener) {
                            this.mElement.removeEventListener(pKey, pEventListener);
                        }
                    }
                    else {
                        this.mElement.removeEventListener(pKey, this.mCallbacks[pKey]);
                    }
                }
            }
        };
        //_________________________________________________
        /**
         * Removes all of the event listeners
         *
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.removeAllEvents = function () {
            for (var aKey in this.mCallbacks) {
                if (this.mCallbacks[aKey] != null) {
                    this.removeEventListener(aKey, this);
                }
            }
        };
        Object.defineProperty(DisplayObject.prototype, "stage", {
            //_________________________________________________
            get: function () {
                if (this.mStage != null) {
                    return this.mStage;
                }
                if (this.parent == null) {
                    return null;
                }
                if (this.parent.myClassName == asSvg.Stage.myName) {
                    return this.parent;
                }
                this.mStage = this.parent.stage;
                return (this.mStage);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "onEnterFrame", {
            //_________________________________________________________
            get: function () {
                return this.mEnterFrameCallback;
            },
            //_________________________________________________________
            set: function (pEnterFrameCallback) {
                this.mEnterFrameCallback = pEnterFrameCallback;
                if (pEnterFrameCallback == null) {
                    this.disableEnterFrame();
                    return;
                }
                this.enableEnterFrame();
            },
            enumerable: true,
            configurable: true
        });
        //_________________________________________________________
        /**
         * Enables the enter frame
         *
         * @returns {boolean}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.enableEnterFrame = function () {
            var aStage = this.stage;
            if (aStage == null) {
                return false;
            }
            aStage.addToEnterFrameList(this);
            return true;
        };
        //_________________________________________________________
        /**
         * Disable the enter frame
         *
         * @returns {boolean}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.disableEnterFrame = function () {
            var aStage = this.stage;
            if (aStage == null) {
                return false;
            }
            aStage.removeFromEnterFrameList(this);
            return true;
        };
        //________________________________________________________
        /**
         *
         *
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.enterFrame = function () {
            if (this.mEnterFrameCallback != null) {
                this.mEnterFrameCallback();
            }
        };
        Object.defineProperty(DisplayObject.prototype, "mouseX", {
            //____________________________________________________________
            get: function () {
                return this.parentMouseLocation.x - this.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "mouseY", {
            //____________________________________________________________
            get: function () {
                return this.parentMouseLocation.y - this.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "instanceName", {
            get: function () {
                return this.element.id;
            },
            //____________________________________________________________
            set: function (pVal) {
                this.element.id = pVal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "parentMouseLocation", {
            //____________________________________________________________
            /**
             * Returns the parent Mouse Location
             *
             * @readonly
             * @type {asBase.math.Point}
             * @memberOf DisplayObject
             */
            get: function () {
                if ((this.mLastGlobalMousePoint.x == this.stage.mouseLocation.x) && (this.mLastGlobalMousePoint.y == this.stage.mouseLocation.y)) {
                    return this.mLastLocalMousePoint;
                }
                this.mLastGlobalMousePoint.x = this.stage.mouseLocation.x;
                this.mLastGlobalMousePoint.y = this.stage.mouseLocation.y;
                this.mLastLocalMousePoint = this.parent.globalToLocal(this.stage.mouseLocation);
                return (this.mLastLocalMousePoint);
            },
            enumerable: true,
            configurable: true
        });
        //____________________________________________________________
        /**
         * Starts dragging the display object
         *
         * @param {boolean} [pLockCenter=false]
         * @param {Function} [pBoundaryCallBack=null]
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.startDrag = function (pLockCenter, pBoundaryCallBack) {
            var _this = this;
            if (pLockCenter === void 0) { pLockCenter = false; }
            if (pBoundaryCallBack === void 0) { pBoundaryCallBack = null; }
            // console.log("startDrag");
            if (pLockCenter) {
                this.mDragingVector = new asBase.math.Point();
            }
            else {
                this.mDragingVector = null;
            }
            this.mBoundaryCallBack = pBoundaryCallBack;
            if (this.mMouseMoveCallback == null) {
                this.mMouseMoveCallback = function (e) { return _this.onMouseMove(e); };
            }
            if (this.mStage != null) {
                this.mStage.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this.mMouseMoveCallback, this);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "dragDistance", {
            //____________________________________________________________
            /**
             * Returns the distance to drag the object
             *
             * @readonly
             * @type {number}
             * @memberOf DisplayObject
             */
            get: function () {
                if (this.mLastMouseEvent == null) {
                    return 0;
                }
                var aDX = this.mLastMouseEvent.clientX - this.mMouseDownPoint.x;
                var aDY = this.mLastMouseEvent.clientY - this.mMouseDownPoint.y;
                return Math.sqrt(aDX * aDX + aDY * aDY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "isInDrag", {
            //____________________________________________________________
            get: function () {
                return (this.mIsInDrag == true);
            },
            enumerable: true,
            configurable: true
        });
        //____________________________________________________________
        /**
         * Stops dragging the object
         *
         * @returns
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.stopDrag = function () {
            if (this.mMouseMoveCallback == null) {
                return;
            }
            this.mDragingVector = null;
            if (this.mStage != null) {
                this.mStage.removeEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this);
            }
            this.mIsInDrag = false;
            this.mMouseDownPoint = null;
        };
        //____________________________________________________________
        /**
         * On Mouse Move Event CallBack
         *
         * @protected
         * @param {MouseEvent} e
         * @returns
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.onMouseMove = function (e) {
            if (this.mDragingVector == null) {
                this.stage.onMouseMove(e);
                this.mDragingVector = new asBase.math.Point(-this.mouseX, -this.mouseY);
            }
            if (this.parent == null) {
                return;
            }
            this.mLastMouseEvent = e;
            if (this.mMouseDownPoint == null) {
                this.mMouseDownPoint = new asBase.math.Point(e.clientX, e.clientY);
            }
            else if (!this.mIsInDrag) {
                var aDX = e.clientX - this.mMouseDownPoint.x;
                var aDY = e.clientY - this.mMouseDownPoint.y;
                this.mIsInDrag = ((aDX * aDX + aDY * aDY) > 25);
            }
            var aLocalPoint = this.parent.globalToLocal(new asBase.math.Point(e.clientX - this.mStage.offsetX, e.clientY - this.mStage.offsetY));
            // console.log("Diaply::aLocalPoint.x = " + aLocalPoint.x);
            var aX = aLocalPoint.x + this.mDragingVector.x;
            var aY = aLocalPoint.y + this.mDragingVector.y;
            this.x = aX;
            this.y = aY;
            if (this.mBoundaryCallBack) {
                this.mBoundaryCallBack();
            }
            ///else {
            ////    this.x = aLocalPoint.x + this.mDragingVector.x;
            ////    this.y = aLocalPoint.y + this.mDragingVector.y;
            ////}
            e.preventDefault();
        };
        //_______________________________________________________________
        /**
         * Adds an event listener to the object
         *
         * @param {string} pType
         * @param {EventListener} pEventListener
         * @param {*} pOwner
         * @param {boolean} [useCapture]
         * @returns {boolean}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.addEventListener = function (pType, pEventListener, pOwner, useCapture) {
            if (this.mEvents == null) {
                this.mEvents = new Array();
            }
            if (this.mEvents[pType] == null) {
                this.mEvents[pType] = Array();
            }
            var aEventsList = this.mEvents[pType];
            for (var i = 0; i < aEventsList.length; i++) {
                if (aEventsList[i].owner == pOwner) {
                    return;
                }
            }
            this.mEvents[pType].push(new EventListenerHolder(pEventListener, pOwner));
            if (this.eventElement == null) {
                return false;
            }
            if (useCapture != null) {
                this.eventElement.addEventListener(pType, pEventListener, useCapture);
                return true;
            }
            this.eventElement.addEventListener(pType, pEventListener);
        };
        //_______________________________________________________________
        /**
         * Removes an event listener from the object
         *
         * @param {string} pType
         * @param {*} pOwner
         * @param {boolean} [useCapture]
         * @returns {boolean}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.removeEventListener = function (pType, pOwner, useCapture) {
            if (this.mEvents == null) {
                return;
            }
            if (this.mEvents[pType] == null) {
                return;
            }
            var aEventListener;
            var aEventsList = this.mEvents[pType];
            for (var i = aEventsList.length - 1; i >= 0; i--) {
                if (aEventsList[i].owner == pOwner) {
                    aEventListener = aEventsList[i].callback;
                    aEventsList.splice(i, 1);
                }
            }
            if (aEventListener == null) {
                return;
            }
            if (this.eventElement == null) {
                return false;
            }
            if (useCapture != null) {
                this.eventElement.removeEventListener(pType, aEventListener, useCapture);
                return true;
            }
            this.eventElement.removeEventListener(pType, aEventListener);
        };
        //_______________________________________________________________
        /**
         * Removes all owner events
         *
         * @param {*} pOwner
         * @param {boolean} [useCapture]
         * @returns {boolean}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.removeAllOwnerEvents = function (pOwner, useCapture) {
            if (this.mEvents == null) {
                return;
            }
            for (var aType in this.mEvents) {
                var aEventListener = void 0;
                var aEventsList = this.mEvents[aType];
                for (var i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventListener = aEventsList[i].callback;
                        aEventsList.splice(i, 1);
                        if (this.eventElement == null) {
                            return false;
                        }
                        if (useCapture != null) {
                            this.eventElement.removeEventListener(aType, aEventListener, useCapture);
                        }
                        else {
                            this.eventElement.removeEventListener(aType, aEventListener);
                        }
                    }
                }
            }
        };
        //_______________________________________________________________
        /**
         * Dispatches an event
         *
         * @param {Event} pEvent
         * @returns {boolean}
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.dispatchEvent = function (pEvent) {
            if (this.eventElement == null) {
                return false;
            }
            this.eventElement.dispatchEvent(pEvent);
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "eventElement", {
            //_______________________________________________________________
            get: function () {
                this.mElement.asObject = this;
                return this.mElement;
            },
            enumerable: true,
            configurable: true
        });
        //_______________________________________________________________
        /**
         * Destroys the display object
         *
         *
         * @memberOf DisplayObject
         */
        DisplayObject.prototype.destruct = function () {
            this.removeAllEvents();
            if (this.mStage != null) {
                this.mStage.removeAllOwnerEvents(this);
            }
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
        };
        return DisplayObject;
    }());
    DisplayObject.mInstanceCounter = 0;
    asSvg.DisplayObject = DisplayObject;
    /**
     *
     *
     * @class EventListenerHolder
     */
    var EventListenerHolder = (function () {
        /**
         * Creates an instance of EventListenerHolder.
         * @param {EventListener} pCallback
         * @param {*} pOwner
         *
         * @memberOf EventListenerHolder
         */
        function EventListenerHolder(pCallback, pOwner) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
        return EventListenerHolder;
    }());
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
/// <reference path="displayobject.ts" />
(function (asSvg) {
    /**
     *
     *
     * @export
     * @class Circle
     * @extends {DisplayObject}
     */
    var Circle = (function (_super) {
        __extends(Circle, _super);
        /**
         * Creates an instance of Circle.
         * @param {number} pX
         * @param {number} pY
         * @param {number} pR
         * @param {number} [pColor=0]
         *
         * @memberOf Circle
         */
        function Circle(pX, pY, pR, pColor) {
            if (pColor === void 0) { pColor = 0; }
            var _this = _super.call(this) || this;
            _this.update(pX, pY, pR);
            if (pColor != 0) {
                _this.setFill(pColor);
            }
            return _this;
        }
        /****************************
        * Override methods
        ****************************/
        Circle.prototype.createElement = function () {
            this.create("circle");
        };
        /****************************
        * Methods
        ****************************/
        /**
         * Updates the coordinate of the circle
         *
         * @param {number} [pX]
         * @param {number} [pY]
         * @param {number} [pR]
         *
         * @memberOf Circle
         */
        Circle.prototype.update = function (pX, pY, pR) {
            if (pX != null) {
                this.mElement.setAttribute("cx", pX.toString());
            }
            if (pY != null) {
                this.mElement.setAttribute("cy", pY.toString());
            }
            if (pR != null) {
                this.mElement.setAttribute("r", pR.toString());
            }
        };
        Object.defineProperty(Circle.prototype, "radios", {
            get: function () {
                return (parseFloat(this.mElement.getAttribute("r")));
            },
            //_________________________________________________________________
            set: function (pR) {
                this.mElement.setAttribute("r", pR.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circle, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Circle";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Circle";
            },
            enumerable: true,
            configurable: true
        });
        return Circle;
    }(asSvg.DisplayObject));
    asSvg.Circle = Circle;
})(asSvg || (asSvg = {}));
///// https://github.com/pnitsch/BitmapData.js/blob/master/js/BitmapData.js
var halfColorMax = 0.00784313725;
function hexToRGB(hex) { return { r: ((hex & 0xff0000) >> 16), g: ((hex & 0x00ff00) >> 8), b: ((hex & 0x0000ff)) }; }
;
function RGBToHex(rgb) { return rgb.r << 16 | rgb.g << 8 | rgb.b; }
;
var asSvg;
(function (asSvg) {
    var display;
    (function (display) {
        var Point = asBase.math.Point;
        var BitmapData = (function () {
            function BitmapData(width, height, transparent, fillColor, canvas) {
                if (transparent === void 0) { transparent = true; }
                if (fillColor === void 0) { fillColor = 0x00000000; }
                if (canvas === void 0) { canvas = null; }
                this.va = null;
                this.tex0 = null;
                this.tex1 = null;
                this.glPixelArray = null;
                this.width = width;
                this.height = height;
                this.rect = new asBase.math.Rectangle();
                this.rect.x = 0;
                this.rect.y = 0;
                this.rect.width = this.width;
                this.rect.height = this.height;
                this.transparent = transparent;
                this.canvas = canvas || document.createElement("canvas");
                this.context = this.canvas.getContext("2d");
                this.canvas.setAttribute('width', this.width);
                this.canvas.setAttribute('height', this.height);
                this.drawingCanvas = document.createElement("canvas");
                this.drawingContext = this.drawingCanvas.getContext("2d");
                this.imagedata = this.context.createImageData(this.width, this.height);
                /*** WebGL functions ***/
                this.glCanvas = document.createElement("canvas");
                this.gl = null;
                this.program = null;
                this.gpuEnabled = true;
                try {
                    this.gl = this.glCanvas.getContext("experimental-webgl");
                }
                catch (e) {
                    this.gpuEnabled = false;
                }
            }
            ;
            Object.defineProperty(BitmapData.prototype, "data", {
                //_________________________________________________________
                get: function () {
                    return this.imagedata;
                },
                set: function (pData) {
                    this.imagedata = pData;
                },
                enumerable: true,
                configurable: true
            });
            BitmapData.prototype.initProgram = function (effect) {
                var gl = this.gl;
                var program = gl.createProgram();
                var vs = gl.createShader(gl.VERTEX_SHADER);
                var fs = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(vs, effect.vsSrc);
                gl.shaderSource(fs, effect.fsSrc);
                gl.compileShader(vs);
                gl.compileShader(fs);
                if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
                    gl.deleteProgram(program);
                }
                if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
                    gl.deleteProgram(program);
                }
                gl.attachShader(program, vs);
                gl.attachShader(program, fs);
                gl.deleteShader(vs);
                gl.deleteShader(fs);
                gl.linkProgram(program);
                if (this.program != null)
                    gl.deleteProgram(this.program);
                this.program = program;
                gl.viewport(0, 0, this.canvas.width, this.canvas.height);
                gl.useProgram(program);
                var vertices = new Float32Array([-1.0, -1.0,
                    1.0, -1.0,
                    -1.0, 1.0,
                    1.0, -1.0,
                    1.0, 1.0,
                    -1.0, 1.0]);
                this.va = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.va);
                gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.initTexture = function (pos, image) {
                var gl = this.gl;
                var tex = gl.createTexture();
                gl.enable(gl.TEXTURE_2D);
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.generateMipmap(gl.TEXTURE_2D);
                gl.bindTexture(gl.TEXTURE_2D, null);
                if (pos == 0) {
                    if (this.tex0 != null)
                        gl.deleteTexture(this.tex0);
                    this.tex0 = tex;
                    this.glCanvas.setAttribute('width', image.width);
                    this.glCanvas.setAttribute('height', image.height);
                    this.glPixelArray = new Uint8Array(image.width * image.height * 4);
                }
                else {
                    if (this.tex1 != null)
                        gl.deleteTexture(this.tex1);
                    this.tex1 = tex;
                }
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.drawGL = function (matrix) {
                var gl = this.gl;
                var program = this.program;
                var ra = [matrix.a, matrix.c, 0, matrix.b, matrix.d, 0, 0, 0, 1];
                var p = gl.getAttribLocation(program, "pos");
                var ur = gl.getUniformLocation(program, "r");
                var ut = gl.getUniformLocation(program, "t");
                var t0 = gl.getUniformLocation(program, "tex0");
                var t1 = gl.getUniformLocation(program, "tex1");
                var rm = gl.getUniformLocation(program, "rMat");
                gl.bindBuffer(gl.ARRAY_BUFFER, this.va);
                gl.uniform2f(ur, this.glCanvas.width * 2, this.glCanvas.height * 2);
                gl.uniformMatrix3fv(rm, false, new Float32Array(ra));
                gl.uniform2f(ut, matrix.tx, matrix.ty);
                gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(p);
                gl.uniform1i(t0, 0);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.tex0);
                gl.uniform1i(t1, 1);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, this.tex1);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
                gl.disableVertexAttribArray(p);
                gl.flush();
                var w = this.glCanvas.width;
                var h = this.glCanvas.height;
                var arr = this.glPixelArray;
                gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, arr);
                var pos;
                var data = this.imagedata.data;
                for (var y = 0; y < h; y++) {
                    for (var x = 0; x < w; x++) {
                        pos = (x + y * w) * 4;
                        data[pos] = arr[pos];
                        data[pos + 1] = arr[pos + 1];
                        data[pos + 2] = arr[pos + 2];
                    }
                }
            };
            ;
            /*** Canvas2D functions ***/
            //____________________________________________________________________
            BitmapData.prototype.setPixel = function (x, y, color) {
                var rgb = hexToRGB(color);
                var pos = (x + y * this.width) * 4;
                var data = this.imagedata.data;
                data[pos + 0] = rgb.r;
                data[pos + 1] = rgb.g;
                data[pos + 2] = rgb.b;
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.getPixel = function (x, y) {
                var pos = (x + y * this.width) * 4;
                var data = this.imagedata.data;
                var rgb = {
                    r: data[pos + 0],
                    g: data[pos + 1],
                    b: data[pos + 2]
                };
                return RGBToHex(rgb);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.clear = function (rect) {
                rect = rect || this.rect;
                this.context.clearRect(rect.x, rect.y, rect.width, rect.height);
                this.imagedata = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.clone = function () {
                this.context.putImageData(this.imagedata, 0, 0);
                var result = new BitmapData(this.width, this.height, this.transparent);
                result.data = this.context.getImageData(0, 0, this.width, this.height);
                return result;
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.histogramVector = function (n) {
                var v = [];
                for (var i = 0; i < 256; i++) {
                    v[i] = n;
                }
                return v;
            };
            //___________________________________________________________________
            BitmapData.prototype.colorTransform = function (rect, colorTransform) {
                rect = rect || this.rect;
                colorTransform = colorTransform || new display.ColorTransform();
                var data = this.imagedata.data;
                var xMax = rect.x + rect.height;
                var yMax = rect.y + rect.height;
                for (var y = rect.y; y < yMax; y++) {
                    for (var x = rect.x; x < xMax; x++) {
                        var r = (y * this.width + x) * 4;
                        var g = r + 1;
                        var b = r + 2;
                        var a = r + 3;
                        data[r] = data[r] * colorTransform.redMultiplier + colorTransform.redOffset;
                        data[g] = data[g] * colorTransform.greenMultiplier + colorTransform.greenOffset;
                        data[b] = data[b] * colorTransform.blueMultiplier + colorTransform.blueOffset;
                        data[a] = data[a] * colorTransform.alphaMultiplier + colorTransform.alphaOffset;
                    }
                }
                this.context.putImageData(this.imagedata, 0, 0);
            };
            //____________________________________________________________________
            BitmapData.prototype.applyFilter = function (sourceBitmapData, sourceRect, destPoint, filter) {
                var copy = this.clone();
                filter.run(sourceRect, this.imagedata.data, copy.imagedata.data);
                this.context.putImageData(this.imagedata, 0, 0);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.compare = function (otherBitmapData) {
                if (this.width != otherBitmapData.width)
                    return null; //-3;
                if (this.height != otherBitmapData.height)
                    return null; //-4;
                if (this.imagedata === otherBitmapData.data)
                    return null; //0;
                var otherRGB, thisRGB, dif;
                var result = new BitmapData(this.width, this.height);
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        otherRGB = hexToRGB(otherBitmapData.getPixel(x, y));
                        thisRGB = hexToRGB(this.getPixel(x, y));
                        dif = {
                            r: Math.abs(otherRGB.r - thisRGB.r),
                            g: Math.abs(otherRGB.g - thisRGB.g),
                            b: Math.abs(otherRGB.b - thisRGB.b)
                        };
                        result.setPixel(x, y, RGBToHex(dif));
                    }
                }
                return result;
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.copyCanvas = function (sourceCanvas, sourceRect, destPoint, blendMode) {
                this.context.putImageData(this.imagedata, 0, 0);
                var bw = this.canvas.width - sourceRect.width - destPoint.x;
                var bh = this.canvas.height - sourceRect.height - destPoint.y;
                var dw = (bw < 0) ? sourceRect.width + (this.canvas.width - sourceRect.width - destPoint.x) : sourceRect.width;
                var dh = (bh < 0) ? sourceRect.height + (this.canvas.height - sourceRect.height - destPoint.y) : sourceRect.height;
                if (blendMode && blendMode != display.BlendMode.NORMAL) {
                    var sourceData = sourceCanvas.getContext("2d").getImageData(sourceRect.x, sourceRect.y, dw, dh).data;
                    var sourcePos = void 0, destPos = void 0;
                    var data = this.imagedata.data;
                    for (var y = 0; y < dh; y++) {
                        for (var x = 0; x < dw; x++) {
                            sourcePos = (x + y * dw) * 4;
                            destPos = ((x + destPoint.x) + (y + destPoint.y) * this.width) * 4;
                            switch (blendMode) {
                                case display.BlendMode.ADD:
                                    data[destPos] = Math.min(data[destPos] + sourceData[sourcePos], 255);
                                    data[destPos + 1] = Math.min(data[destPos + 1] + sourceData[sourcePos + 1], 255);
                                    data[destPos + 2] = Math.min(data[destPos + 2] + sourceData[sourcePos + 2], 255);
                                    break;
                                case display.BlendMode.SUBTRACT:
                                    data[destPos] = Math.max(sourceData[sourcePos] - data[destPos], 0);
                                    data[destPos + 1] = Math.max(sourceData[sourcePos + 1] - data[destPos + 1], 0);
                                    data[destPos + 2] = Math.max(sourceData[sourcePos + 2] - data[destPos + 2], 0);
                                    break;
                                case display.BlendMode.INVERT:
                                    data[destPos] = 255 - sourceData[sourcePos];
                                    data[destPos + 1] = 255 - sourceData[sourcePos + 1];
                                    data[destPos + 2] = 255 - sourceData[sourcePos + 1];
                                    break;
                                case display.BlendMode.MULTIPLY:
                                    data[destPos] = Math.floor(sourceData[sourcePos] * data[destPos] / 255);
                                    data[destPos + 1] = Math.floor(sourceData[sourcePos + 1] * data[destPos + 1] / 255);
                                    data[destPos + 2] = Math.floor(sourceData[sourcePos + 2] * data[destPos + 2] / 255);
                                    break;
                                case display.BlendMode.LIGHTEN:
                                    if (sourceData[sourcePos] > data[destPos])
                                        data[destPos] = sourceData[sourcePos];
                                    if (sourceData[sourcePos + 1] > data[destPos + 1])
                                        data[destPos + 1] = sourceData[sourcePos + 1];
                                    if (sourceData[sourcePos + 2] > data[destPos + 2])
                                        data[destPos + 2] = sourceData[sourcePos + 2];
                                    break;
                                case display.BlendMode.DARKEN:
                                    if (sourceData[sourcePos] < data[destPos])
                                        data[destPos] = sourceData[sourcePos];
                                    if (sourceData[sourcePos + 1] < data[destPos + 1])
                                        data[destPos + 1] = sourceData[sourcePos + 1];
                                    if (sourceData[sourcePos + 2] < data[destPos + 2])
                                        data[destPos + 2] = sourceData[sourcePos + 2];
                                    break;
                                case display.BlendMode.DIFFERENCE:
                                    data[destPos] = Math.abs(sourceData[sourcePos] - data[destPos]);
                                    data[destPos + 1] = Math.abs(sourceData[sourcePos + 1] - data[destPos + 1]);
                                    data[destPos + 2] = Math.abs(sourceData[sourcePos + 2] - data[destPos + 2]);
                                    break;
                                case display.BlendMode.SCREEN:
                                    data[destPos] = (255 - (((255 - data[destPos]) * (255 - sourceData[sourcePos])) >> 8));
                                    data[destPos + 1] = (255 - (((255 - data[destPos + 1]) * (255 - sourceData[sourcePos + 1])) >> 8));
                                    data[destPos + 2] = (255 - (((255 - data[destPos + 2]) * (255 - sourceData[sourcePos + 2])) >> 8));
                                    break;
                                case display.BlendMode.OVERLAY:
                                    if (sourceData[sourcePos] < 128)
                                        data[destPos] = data[destPos] * sourceData[sourcePos] * halfColorMax;
                                    else
                                        data[destPos] = 255 - (255 - data[destPos]) * (255 - sourceData[sourcePos]) * halfColorMax;
                                    if (sourceData[sourcePos + 1] < 128)
                                        data[destPos + 1] = data[destPos + 1] * sourceData[sourcePos + 1] * halfColorMax;
                                    else
                                        data[destPos + 1] = 255 - (255 - data[destPos + 1]) * (255 - sourceData[sourcePos + 1]) * halfColorMax;
                                    if (sourceData[sourcePos + 2] < 128)
                                        data[destPos + 2] = data[destPos + 2] * sourceData[sourcePos + 2] * halfColorMax;
                                    else
                                        data[destPos + 2] = 255 - (255 - data[destPos + 2]) * (255 - sourceData[sourcePos + 2]) * halfColorMax;
                                    break;
                                case display.BlendMode.HARDLIGHT:
                                    if (data[destPos] < 128)
                                        data[destPos] = data[destPos] * sourceData[sourcePos] * halfColorMax;
                                    else
                                        data[destPos] = 255 - (255 - data[destPos]) * (255 - sourceData[sourcePos]) * halfColorMax;
                                    if (data[destPos + 1] < 128)
                                        data[destPos + 1] = data[destPos + 1] * sourceData[sourcePos + 1] * halfColorMax;
                                    else
                                        data[destPos + 1] = 255 - (255 - data[destPos + 1]) * (255 - sourceData[sourcePos + 1]) * halfColorMax;
                                    if (data[destPos + 2] < 128)
                                        data[destPos + 2] = data[destPos + 2] * sourceData[sourcePos + 2] * halfColorMax;
                                    else
                                        data[destPos + 2] = 255 - (255 - data[destPos + 2]) * (255 - sourceData[sourcePos + 2]) * halfColorMax;
                                    break;
                            }
                        }
                    }
                }
                else {
                    this.context.drawImage(sourceCanvas, sourceRect.x, sourceRect.y, dw, dh, destPoint.x, destPoint.y, dw, dh);
                    this.imagedata = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
                }
                this.context.putImageData(this.imagedata, 0, 0);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.copyChannel = function (sourceBitmapData, sourceRect, destPoint, sourceChannel, destChannel) {
                var sourceColor, sourceRGB, rgb;
                var redChannel = display.BitmapDataChannel.RED;
                var greenChannel = display.BitmapDataChannel.GREEN;
                var blueChannel = display.BitmapDataChannel.BLUE;
                var channelValue;
                for (var y = 0; y < sourceRect.height; y++) {
                    for (var x = 0; x < sourceRect.width; x++) {
                        sourceColor = sourceBitmapData.getPixel(sourceRect.x + x, sourceRect.y + y);
                        sourceRGB = hexToRGB(sourceColor);
                        switch (sourceChannel) {
                            case redChannel:
                                channelValue = sourceRGB.r;
                                break;
                            case greenChannel:
                                channelValue = sourceRGB.g;
                                break;
                            case blueChannel:
                                channelValue = sourceRGB.b;
                                break;
                        }
                        rgb = hexToRGB(this.getPixel(destPoint.x + x, destPoint.y + y)); // redundancy
                        switch (destChannel) {
                            case redChannel:
                                rgb.r = channelValue;
                                break;
                            case greenChannel:
                                rgb.g = channelValue;
                                break;
                            case blueChannel:
                                rgb.b = channelValue;
                                break;
                        }
                        this.setPixel(destPoint.x + x, destPoint.y + y, RGBToHex(rgb));
                    }
                }
                this.context.putImageData(this.imagedata, 0, 0);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.copyPixels = function (sourceBitmapData, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha) {
                this.copyCanvas(sourceBitmapData.canvas, sourceRect, destPoint, display.BlendMode.NORMAL);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.dispose = function () {
                this.rect = null;
                this.drawingCanvas = null;
                this.drawingContext = null;
                this.imagedata = null;
                this.glCanvas = null;
                this.gl = null;
                this.program = null;
                this.tex0 = null;
                this.tex1 = null;
                this.glPixelArray = null;
            };
            //____________________________________________________________________
            BitmapData.prototype.draw = function (source, matrix, colorTransform, blendMode, clipRect, smoothing) {
                /*
                 * currently only supports Image object
                 * TODO: implement instanceof switches
                 */
                var sourceMatrix = matrix || new asBase.math.Matrix();
                var sourceRect = clipRect;
                if (sourceRect == null) {
                    sourceRect = new asBase.math.Rectangle();
                    this.rect.x = 0;
                    this.rect.y = 0;
                    this.rect.width = source.width;
                    this.rect.height = source.height;
                }
                if (blendMode && this.gpuEnabled) {
                }
                this.drawingCanvas.setAttribute('width', source.width);
                this.drawingCanvas.setAttribute('height', source.height);
                this.drawingContext.transform(sourceMatrix.a, sourceMatrix.b, sourceMatrix.c, sourceMatrix.d, sourceMatrix.tx, sourceMatrix.ty);
                this.drawingContext.drawImage(source, 0, 0, source.width, source.height, 0, 0, source.width, source.height);
                this.copyCanvas(this.drawingCanvas, sourceRect, new asBase.math.Point(sourceRect.x, sourceRect.y), blendMode);
            };
            //____________________________________________________________________
            BitmapData.prototype.fillRect = function (rect, color) {
                this.context.putImageData(this.imagedata, 0, 0);
                var rgb = hexToRGB(color);
                this.context.fillStyle = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
                this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
                this.imagedata = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.floodFill = function (x, y, color) {
                var queue = new Array();
                queue.push(new Point(x, y));
                var old = this.getPixel(x, y);
                var iterations = 0;
                var searchBmp = new BitmapData(this.width, this.height, true, 0xffffff);
                var currPoint, newPoint;
                while (queue.length > 0) {
                    currPoint = queue.shift();
                    ++iterations;
                    if (currPoint.x < 0 || currPoint.x >= this.width)
                        continue;
                    if (currPoint.y < 0 || currPoint.y >= this.height)
                        continue;
                    searchBmp.setPixel(currPoint.x, currPoint.y, 0x00);
                    if (this.getPixel(currPoint.x, currPoint.y) == old) {
                        this.setPixel(currPoint.x, currPoint.y, color);
                        if (searchBmp.getPixel(currPoint.x + 1, currPoint.y) == 0xffffff) {
                            queue.push(new Point(currPoint.x + 1, currPoint.y));
                        }
                        if (searchBmp.getPixel(currPoint.x, currPoint.y + 1) == 0xffffff) {
                            queue.push(new Point(currPoint.x, currPoint.y + 1));
                        }
                        if (searchBmp.getPixel(currPoint.x - 1, currPoint.y) == 0xffffff) {
                            queue.push(new Point(currPoint.x - 1, currPoint.y));
                        }
                        if (searchBmp.getPixel(currPoint.x, currPoint.y - 1) == 0xffffff) {
                            queue.push(new Point(currPoint.x, currPoint.y - 1));
                        }
                    }
                }
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.histogram = function (hRect) {
                hRect = hRect || this.rect;
                var rgb = { r: [], g: [], b: [] };
                var rv = this.histogramVector(0);
                var gv = this.histogramVector(0);
                var bv = this.histogramVector(0);
                var p = hRect.width * hRect.height;
                var itr = -1;
                var pos;
                var color = [];
                var bw = this.canvas.width - hRect.width - hRect.x;
                var bh = this.canvas.height - hRect.height - hRect.y;
                var dw = (bw < 0) ? hRect.width + (this.canvas.width - hRect.width - hRect.x) : hRect.width;
                var dh = (bh < 0) ? hRect.height + (this.canvas.height - hRect.height - hRect.y) : hRect.height;
                var data = this.imagedata.data;
                for (var y = hRect.y; y < dh; y++) {
                    for (var x = hRect.x; x < dw; x++) {
                        pos = (x + y * this.width) * 4;
                        color[itr++] = data[pos + 0];
                        color[itr++] = data[pos + 1];
                        color[itr++] = data[pos + 2];
                    }
                }
                itr = 0;
                for (var i = 0; i < p; i += Math.floor(p / 256)) {
                    var px = itr * 3;
                    rv[itr] = color[px + 0];
                    gv[itr] = color[px + 1];
                    bv[itr] = color[px + 2];
                    itr++;
                }
                rgb.r = rv;
                rgb.g = gv;
                rgb.b = bv;
                return rgb;
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.noise = function (randomSeed, low, high, channelOptions, grayScale) {
                this.rand = this.rand || new display.PRNG();
                this.rand.seed = randomSeed;
                var redChannel = display.BitmapDataChannel.RED;
                var greenChannel = display.BitmapDataChannel.GREEN;
                var blueChannel = display.BitmapDataChannel.BLUE;
                var data = this.imagedata.data;
                low = low || 0;
                high = high || 255;
                channelOptions = channelOptions || 7;
                grayScale = grayScale || false;
                var pos, cr, cg, cb, gray;
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        pos = (x + y * this.width) * 4;
                        cr = this.rand.nextRange(low, high);
                        cg = this.rand.nextRange(low, high);
                        cb = this.rand.nextRange(low, high);
                        if (grayScale) {
                            gray = (cr + cg + cb) / 3;
                            cr = cg = cb = gray;
                        }
                        data[pos + 0] = (channelOptions & redChannel) ? (1 * cr) : 0x00;
                        data[pos + 1] = (channelOptions & greenChannel) ? (1 * cg) : 0x00;
                        data[pos + 2] = (channelOptions & blueChannel) ? (1 * cb) : 0x00;
                    }
                }
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.paletteMap = function (sourceBitmapData, sourceRect, destPoint, redArray, greenArray, blueArray, alphaArray) {
                var bw = this.canvas.width - sourceRect.width - destPoint.x;
                var bh = this.canvas.height - sourceRect.height - destPoint.y;
                var dw = (bw < 0) ? sourceRect.width + (this.canvas.width - sourceRect.width - destPoint.x) : sourceRect.width;
                var dh = (bh < 0) ? sourceRect.height + (this.canvas.height - sourceRect.height - destPoint.y) : sourceRect.height;
                var sourceData = sourceBitmapData.imagedata.data;
                var sourcePos, destPos, sourceHex;
                var r, g, b, pos;
                var sx = sourceRect.x;
                var sy = sourceRect.y;
                var sw = sourceBitmapData.width;
                var dx = destPoint.x;
                var dy = destPoint.y;
                var data = this.imagedata.data;
                var w = this.width;
                for (var y = 0; y < dh; y++) {
                    for (var x = 0; x < dw; x++) {
                        sourcePos = ((x + sx) + (y + sy) * sw) * 4;
                        r = sourceData[sourcePos + 0];
                        g = sourceData[sourcePos + 1];
                        b = sourceData[sourcePos + 2];
                        pos = ((x + dx) + (y + dy) * w) * 4;
                        data[pos + 0] = redArray[r];
                        data[pos + 1] = greenArray[g];
                        data[pos + 2] = blueArray[b];
                    }
                }
                this.context.putImageData(this.imagedata, 0, 0);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.perlinNoise = function (baseX, baseY, randomSeed, channelOptions, grayScale) {
                this.rand = this.rand || new display.PRNG();
                this.rand.seed = randomSeed;
                var redChannel = display.BitmapDataChannel.RED;
                var greenChannel = display.BitmapDataChannel.GREEN;
                var blueChannel = display.BitmapDataChannel.BLUE;
                channelOptions = channelOptions || 7;
                grayScale = grayScale || false;
                var data = this.imagedata.data;
                var numChannels = 0;
                if (channelOptions & redChannel) {
                    this.simplexR = this.simplexR || new display.SimplexNoise(this.rand);
                    this.simplexR.setSeed(randomSeed);
                    numChannels++;
                }
                if (channelOptions & greenChannel) {
                    this.simplexG = this.simplexG || new display.SimplexNoise(this.rand);
                    this.simplexG.setSeed(randomSeed + 1);
                    numChannels++;
                }
                if (channelOptions & blueChannel) {
                    this.simplexB = this.simplexB || new display.SimplexNoise(this.rand);
                    this.simplexB.setSeed(randomSeed + 2);
                    numChannels++;
                }
                var pos, cr, cg, cb;
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        pos = (x + y * this.width) * 4;
                        cr = (channelOptions & redChannel) ? Math.floor(((this.simplexR.noise(x / baseX, y / baseY) + 1) * 0.5) * 255) : 0x00;
                        cg = (channelOptions & greenChannel) ? Math.floor(((this.simplexG.noise(x / baseX, y / baseY) + 1) * 0.5) * 255) : 0x00;
                        cb = (channelOptions & blueChannel) ? Math.floor(((this.simplexB.noise(x / baseX, y / baseY) + 1) * 0.5) * 255) : 0x00;
                        if (grayScale) {
                            var gray = (cr + cg + cb) / numChannels;
                            cr = cg = cb = gray;
                        }
                        data[pos + 0] = cr;
                        data[pos + 1] = cg;
                        data[pos + 2] = cb;
                    }
                }
                this.context.putImageData(this.imagedata, 0, 0);
            };
            ;
            //____________________________________________________________________
            BitmapData.prototype.threshold = function (sourceBitmapData, sourceRect, destPoint, operation, threshold, color, mask, copySource) {
                color = color || 0;
                mask = mask || 0xffffff;
                copySource = copySource || false;
                var bw = this.canvas.width - sourceRect.width - destPoint.x;
                var bh = this.canvas.height - sourceRect.height - destPoint.y;
                var dw = (bw < 0) ? sourceRect.width + (this.canvas.width - sourceRect.width - destPoint.x) : sourceRect.width;
                var dh = (bh < 0) ? sourceRect.height + (this.canvas.height - sourceRect.height - destPoint.y) : sourceRect.height;
                var sourceData = sourceBitmapData.imagedata.data;
                var sourcePos, destPos, sourceHex;
                var sx = sourceRect.x;
                var sy = sourceRect.y;
                var sw = sourceBitmapData.width;
                for (var y = 0; y < dh; y++) {
                    for (var x = 0; x < dw; x++) {
                        sourcePos = ((x + sx) + (y + sy) * sw) * 4;
                        sourceHex = RGBToHex({ r: sourceData[sourcePos], g: sourceData[sourcePos + 1], b: sourceData[sourcePos + 2] });
                        switch (operation) {
                            case "<":
                                if ((sourceHex & mask) < (threshold & mask)) {
                                    if (copySource)
                                        this.setPixel(x + destPoint.x, y + destPoint.y, sourceHex);
                                    else
                                        this.setPixel(x + destPoint.x, y + destPoint.y, color);
                                }
                                break;
                            case "<=":
                                if ((sourceHex & mask) <= (threshold & mask)) {
                                    if (copySource)
                                        this.setPixel(x + destPoint.x, y + destPoint.y, sourceHex);
                                    else
                                        this.setPixel(x + destPoint.x, y + destPoint.y, color);
                                }
                                break;
                            case ">":
                                if ((sourceHex & mask) > (threshold & mask)) {
                                    if (copySource)
                                        this.setPixel(x + destPoint.x, y + destPoint.y, sourceHex);
                                    else
                                        this.setPixel(x + destPoint.x, y + destPoint.y, color);
                                }
                                break;
                            case ">=":
                                if ((sourceHex & mask) <= (threshold & mask)) {
                                    if (copySource)
                                        this.setPixel(x + destPoint.x, y + destPoint.y, sourceHex);
                                    else
                                        this.setPixel(x + destPoint.x, y + destPoint.y, color);
                                }
                                break;
                            case "==":
                                if ((sourceHex & mask) == (threshold & mask)) {
                                    if (copySource)
                                        this.setPixel(x + destPoint.x, y + destPoint.y, sourceHex);
                                    else
                                        this.setPixel(x + destPoint.x, y + destPoint.y, color);
                                }
                                break;
                            case "!=":
                                if ((sourceHex & mask) != (threshold & mask)) {
                                    if (copySource)
                                        this.setPixel(x + destPoint.x, y + destPoint.y, sourceHex);
                                    else
                                        this.setPixel(x + destPoint.x, y + destPoint.y, color);
                                }
                                break;
                        }
                    }
                }
                this.context.putImageData(this.imagedata, 0, 0);
            };
            ;
            return BitmapData;
        }());
        display.BitmapData = BitmapData;
    })(display = asSvg.display || (asSvg.display = {}));
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    var display;
    (function (display) {
        var BitmapDataChannel = (function () {
            function BitmapDataChannel() {
            }
            return BitmapDataChannel;
        }());
        BitmapDataChannel.ALPHA = 8;
        BitmapDataChannel.BLUE = 4;
        BitmapDataChannel.GREEN = 2;
        BitmapDataChannel.RED = 1;
        display.BitmapDataChannel = BitmapDataChannel;
    })(display = asSvg.display || (asSvg.display = {}));
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    var display;
    (function (display) {
        var BlendMode = (function () {
            function BlendMode() {
            }
            return BlendMode;
        }());
        BlendMode.ADD = "add";
        BlendMode.ALPHA = "alpha";
        BlendMode.DARKEN = "darken";
        BlendMode.DIFFERENCE = "difference";
        BlendMode.ERASE = "erase";
        BlendMode.HARDLIGHT = "hardlight";
        BlendMode.INVERT = "invert";
        BlendMode.LAYER = "layer";
        BlendMode.LIGHTEN = "lighten";
        BlendMode.MULTIPLY = "multiply";
        BlendMode.NORMAL = "normal";
        BlendMode.OVERLAY = "overlay";
        BlendMode.SCREEN = "screen";
        BlendMode.SHADER = "shader";
        BlendMode.SUBTRACT = "subtract";
        display.BlendMode = BlendMode;
    })(display = asSvg.display || (asSvg.display = {}));
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    var display;
    (function (display) {
        var ColorTransform = (function () {
            function ColorTransform(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
                this.redMultiplier = 1;
                this.greenMultiplier = 1;
                this.blueMultiplier = 1;
                this.alphaMultiplier = 1;
                this.redOffset = 0;
                this.greenOffset = 0;
                this.blueOffset = 0;
                this.alphaOffset = 0;
                this.redMultiplier = redMultiplier == undefined ? 1 : redMultiplier;
                this.greenMultiplier = greenMultiplier == undefined ? 1 : greenMultiplier;
                this.blueMultiplier = blueMultiplier == undefined ? 1 : blueMultiplier;
                this.alphaMultiplier = alphaMultiplier == undefined ? 1 : alphaMultiplier;
                this.redOffset = redOffset || 0;
                this.greenOffset = greenOffset || 0;
                this.blueOffset = blueOffset || 0;
                this.alphaOffset = alphaOffset || 0;
            }
            return ColorTransform;
        }());
        display.ColorTransform = ColorTransform;
    })(display = asSvg.display || (asSvg.display = {}));
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    var display;
    (function (display) {
        var PRNG = (function () {
            function PRNG() {
                this.seed = 1;
            }
            PRNG.prototype.next = function () {
                return (this.gen() / 2147483647);
            };
            ;
            PRNG.prototype.nextRange = function (min, max) {
                return min + ((max - min) * this.next());
            };
            ;
            PRNG.prototype.gen = function () {
                return this.seed = (this.seed * 16807) % 2147483647;
            };
            ;
            return PRNG;
        }());
        display.PRNG = PRNG;
    })(display = asSvg.display || (asSvg.display = {}));
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    var display;
    (function (display) {
        var SimplexNoise = (function () {
            function SimplexNoise(gen) {
                this.rand = gen;
                this.grad3 = [
                    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
                    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
                    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
                ];
                this.simplex = [
                    [0, 1, 2, 3], [0, 1, 3, 2], [0, 0, 0, 0], [0, 2, 3, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 3, 0],
                    [0, 2, 1, 3], [0, 0, 0, 0], [0, 3, 1, 2], [0, 3, 2, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 3, 2, 0],
                    [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
                    [1, 2, 0, 3], [0, 0, 0, 0], [1, 3, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 3, 0, 1], [2, 3, 1, 0],
                    [1, 0, 2, 3], [1, 0, 3, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 3, 1], [0, 0, 0, 0], [2, 1, 3, 0],
                    [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
                    [2, 0, 1, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 0, 1, 2], [3, 0, 2, 1], [0, 0, 0, 0], [3, 1, 2, 0],
                    [2, 1, 0, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 1, 0, 2], [0, 0, 0, 0], [3, 2, 0, 1], [3, 2, 1, 0]
                ];
            }
            SimplexNoise.prototype.setSeed = function (seed) {
                this.p = [];
                this.rand.seed = seed;
                for (var i = 0; i < 256; i++) {
                    this.p[i] = Math.floor(this.rand.nextRange(0, 255));
                }
                this.perm = [];
                for (var i = 0; i < 512; i++) {
                    this.perm[i] = this.p[i & 255];
                }
            };
            SimplexNoise.prototype.dot = function (g, x, y) {
                return g[0] * x + g[1] * y;
            };
            ;
            SimplexNoise.prototype.noise = function (xin, yin) {
                var n0, n1, n2;
                var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
                var s = (xin + yin) * F2;
                var i = Math.floor(xin + s);
                var j = Math.floor(yin + s);
                var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
                var t = (i + j) * G2;
                var X0 = i - t;
                var Y0 = j - t;
                var x0 = xin - X0;
                var y0 = yin - Y0;
                var i1, j1;
                if (x0 > y0) {
                    i1 = 1;
                    j1 = 0;
                }
                else {
                    i1 = 0;
                    j1 = 1;
                }
                var x1 = x0 - i1 + G2;
                var y1 = y0 - j1 + G2;
                var x2 = x0 - 1.0 + 2.0 * G2;
                var y2 = y0 - 1.0 + 2.0 * G2;
                var ii = i & 255;
                var jj = j & 255;
                var gi0 = this.perm[ii + this.perm[jj]] % 12;
                var gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
                var gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
                var t0 = 0.5 - x0 * x0 - y0 * y0;
                if (t0 < 0)
                    n0 = 0.0;
                else {
                    t0 *= t0;
                    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);
                }
                var t1 = 0.5 - x1 * x1 - y1 * y1;
                if (t1 < 0)
                    n1 = 0.0;
                else {
                    t1 *= t1;
                    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
                }
                var t2 = 0.5 - x2 * x2 - y2 * y2;
                if (t2 < 0)
                    n2 = 0.0;
                else {
                    t2 *= t2;
                    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
                }
                return 70.0 * (n0 + n1 + n2);
            };
            ;
            return SimplexNoise;
        }());
        display.SimplexNoise = SimplexNoise;
    })(display = asSvg.display || (asSvg.display = {}));
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
/// <reference path="displayobject.ts" />
(function (asSvg) {
    /**
     *
     *
     * @export
     * @class Ellipse
     * @extends {DisplayObject}
     */
    var Ellipse = (function (_super) {
        __extends(Ellipse, _super);
        /**
         * Creates an instance of Ellipse.
         * @param {number} pX
         * @param {number} pY
         * @param {number} pRx
         * @param {number} pRy
         *
         * @memberOf Ellipse
         */
        function Ellipse(pX, pY, pRx, pRy) {
            var _this = _super.call(this) || this;
            _this.update(pX, pY, pRx, pRy);
            return _this;
        }
        /****************************
        * Override methods
        ****************************/
        Ellipse.prototype.createElement = function () {
            this.create("ellipse");
        };
        ;
        /****************************
        * Methods
        ****************************/
        /**
         * Updates the coordinates of the ellipse
         *
         * @param {number} [pX]
         * @param {number} [pY]
         * @param {number} [pRx]
         * @param {number} [pRy]
         *
         * @memberOf Ellipse
         */
        Ellipse.prototype.update = function (pX, pY, pRx, pRy) {
            if (pX != null) {
                this.mElement.setAttribute("cx", pX.toString());
            }
            if (pY != null) {
                this.mElement.setAttribute("cy", pY.toString());
            }
            if (pRx != null) {
                this.mElement.setAttribute("rx", pRx.toString());
            }
            if (pRy != null) {
                this.mElement.setAttribute("ry", pRy.toString());
            }
        };
        Object.defineProperty(Ellipse, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Ellipse";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipse.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Ellipse";
            },
            enumerable: true,
            configurable: true
        });
        return Ellipse;
    }(asSvg.DisplayObject));
    asSvg.Ellipse = Ellipse;
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    /**
     * Represents a Foreign Object
     *
     * @export
     * @class ForeignObject
     * @extends {DisplayObject}
     *@module asSvg
     */
    var ForeignObject = (function (_super) {
        __extends(ForeignObject, _super);
        /**
         * Creates an instance of ForeignObject.
         *
         * @memberOf ForeignObject
         */
        function ForeignObject() {
            return _super.call(this) || this;
        }
        /****************************
       * Override methods
       ****************************/
        ForeignObject.prototype.createElement = function () {
            _super.prototype.createElement.call(this);
            this.create("foreignObject");
        };
        /**
         * Sets the height
         *
         * @param {number} pHeight
         *
         * @memberOf ForeignObject
         */
        ForeignObject.prototype.setHeight = function (pHeight) {
            this.mElement.setAttribute("height", pHeight.toString());
        };
        //________________________________________________________________
        /**
         * Sets the width
         *
         * @param {number} pWidth
         *
         * @memberOf ForeignObject
         */
        ForeignObject.prototype.setWidth = function (pWidth) {
            this.mElement.setAttribute("width", pWidth.toString());
        };
        Object.defineProperty(ForeignObject.prototype, "textField", {
            //______________________
            get: function () {
                return this.mTextField;
            },
            //________________________
            set: function (pTextField) {
                this.mTextField = pTextField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ForeignObject.prototype, "fontSize", {
            //______________________________
            set: function (pFont) {
                //  this.mFontSize = pFont;
                this.mInputElement.setAttribute("font-size", pFont.toString());
            },
            enumerable: true,
            configurable: true
        });
        return ForeignObject;
    }(asSvg.DisplayObject));
    asSvg.ForeignObject = ForeignObject;
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    /**
     *
     *
     * @export
     * @class Graphics
     */
    var Graphics = (function () {
        /**
         * Creates an instance of Graphics.
         *
         * @memberOf Graphics
         */
        function Graphics() {
            this.mDraw = "";
        }
        /****************************
        * Override methods
        ****************************/
        /****************************
        * Methods
        ****************************/
        /**
         * Moves the object to a point
         *
         * @param {any} x
         * @param {any} y
         *
         * @memberOf Graphics
         */
        Graphics.prototype.moveTo = function (x, y) {
            this.mDraw += "M " + x + " " + y + " ";
        };
        //_________________________________________________________
        /**
         * Draws a line to a point
         *
         * @param {any} x
         * @param {any} y
         *
         * @memberOf Graphics
         */
        Graphics.prototype.lineTo = function (x, y) {
            this.mDraw += "l " + x + " " + y + " ";
        };
        //________________________________________________________
        /**
         *
         *
         * @param {any} x1
         * @param {any} y1
         * @param {any} x2
         * @param {any} y2
         *
         * @memberOf Graphics
         */
        Graphics.prototype.quadraticBezierCurve = function (x1, y1, x2, y2) {
            this.mDraw += "q " + x1 + " " + y1 + " " + x2 + " " + y2 + " ";
        };
        Object.defineProperty(Graphics.prototype, "owner", {
            /****************************
            * Getters and Setters
            ****************************/
            set: function (pElement) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphics, "myName", {
            get: function () {
                return "Graphics";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Graphics.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Graphics";
            },
            enumerable: true,
            configurable: true
        });
        return Graphics;
    }());
    asSvg.Graphics = Graphics;
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    /**
     * Represents a class with a SVGImageElement
     *
     * @export
     * @class Image
     * @extends {DisplayObject}
     */
    var Image = (function (_super) {
        __extends(Image, _super);
        /**
         * Creates an instance of Image.
         * @param {string} pPath
         * @param {Function} [pFunction]
         *
         * @memberOf Image
         */
        function Image(pPath, pFunction) {
            var _this = this;
            console.log("pPath = " + pPath);
            _this = _super.call(this) || this;
            _this.mOnLoadCallback = pFunction;
            _this.mPath = pPath;
            if (pPath == null) {
                return;
            }
            _this.mElement.onload = function () { return _this.onLoad(); };
            _this.setPath(pPath);
            return _this;
        }
        /****************************
        * Override methods
        ****************************/
        Image.prototype.createElement = function () {
            this.create("image");
        };
        ;
        Object.defineProperty(Image.prototype, "alpha", {
            get: function () {
                return (this.mAlpha);
            },
            //_____________________________________________________________
            set: function (pVal) {
                this.mElement.setAttribute("opacity", pVal.toString());
                this.mAlpha = pVal;
            },
            enumerable: true,
            configurable: true
        });
        /****************************
        * Methods
        ****************************/
        //________________________________________________________________
        /**
         * Sets an attibute of the element
         *
         * @param {string} pKey
         * @param {string} pVal
         *
         * @memberOf Image
         */
        Image.prototype.setAttribute = function (pKey, pVal) {
            this.mElement.setAttribute(pKey, pVal);
        };
        //________________________________________________________________
        /**
         * Sets the height of the object's element
         *
         * @param {number} pHeight
         *
         * @memberOf Image
         */
        Image.prototype.setHeight = function (pHeight) {
            this.mElement.setAttribute("height", pHeight.toString());
        };
        //________________________________________________________________
        /**
         * Sets the width of the object's element
         *
         * @param {number} pWidth
         *
         * @memberOf Image
         */
        Image.prototype.setWidth = function (pWidth) {
            this.mElement.setAttribute("width", pWidth.toString());
        };
        //_____________________________________________________________________________
        /**
         * Sets the source of the image
         *
         * @param {string} pPath
         *
         * @memberOf Image
         */
        Image.prototype.setPath = function (pPath) {
            this.mElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', pPath);
        };
        //______________________________________________________________________________
        /**
         * CallBack for when the image has loaded
         *
         * @protected
         *
         * @memberOf Image
         */
        Image.prototype.onLoad = function () {
            this.mOnLoadCallback();
        };
        Object.defineProperty(Image.prototype, "x", {
            /**
             * Sets the x  of the object's element
             *
             *
             * @memberOf Image
             */
            set: function (pVal) {
                this.mX = pVal;
                this.updateTransform();
                this.updatePositionX();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "y", {
            /**
             * Sets the y of the object's element
             *
             *
             * @memberOf Image
             */
            set: function (pVal) {
                this.mY = pVal;
                this.updateTransform();
                this.updatePositionX();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            get: function () {
                return "Image";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "Image";
            },
            enumerable: true,
            configurable: true
        });
        return Image;
    }(asSvg.DisplayObject));
    asSvg.Image = Image;
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
/// <reference path="displayobject.ts" />
(function (asSvg) {
    /**
     * Represents a SVGLineElement
     *
     * @export
     * @class Line
     * @extends {DisplayObject}
     */
    var Line = (function (_super) {
        __extends(Line, _super);
        /**
         * Creates an instance of Line.
         * @param {number} pX1
         * @param {number} pY1
         * @param {number} pX2
         * @param {number} pY2
         *
         * @memberOf Line
         */
        function Line(pX1, pY1, pX2, pY2) {
            var _this = _super.call(this) || this;
            _this.update(pX1, pY1, pX2, pY2);
            return _this;
        }
        /****************************
        * Override methods
        ****************************/
        Line.prototype.createElement = function () {
            this.create("line");
        };
        ;
        /****************************
        * Methods
        ****************************/
        /**
         * Update the coordinates of the line element
         *
         * @param {number} [pX1]
         * @param {number} [pY1]
         * @param {number} [pX2]
         * @param {number} [pY2]
         *
         * @memberOf Line
         */
        Line.prototype.update = function (pX1, pY1, pX2, pY2) {
            if (pX1 != null) {
                this.mElement.setAttribute("x1", pX1.toString());
            }
            if (pY1 != null) {
                this.mElement.setAttribute("y1", pY1.toString());
            }
            if (pX2 != null) {
                this.mElement.setAttribute("x2", pX2.toString());
            }
            if (pY2 != null) {
                this.mElement.setAttribute("y2", pY2.toString());
            }
        };
        Object.defineProperty(Line, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            /**
             *
             *
             * @readonly
             * @static
             * @type {string}
             * @memberOf Line
             */
            get: function () {
                return "Line";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "myClassName", {
            //______________________________________________
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf Line
             */
            get: function () {
                return "Line";
            },
            enumerable: true,
            configurable: true
        });
        return Line;
    }(asSvg.DisplayObject));
    Line.LINE_CAP_BUTT = "butt";
    Line.LINE_CAP_SQUARE = "square";
    Line.LINE_CAP_ROUND = "round";
    asSvg.Line = Line;
})(asSvg || (asSvg = {}));
var asSvg;
(function (asSvg) {
    /**
     * Represents a Loader
     *
     * @export
     * @class Loader
     * @extends {DisplayObject}
     */
    var Loader = (function (_super) {
        __extends(Loader, _super);
        /**
         * Creates an instance of Loader.
         * @param {string} pPath
         * @param {Function} [pFunction]
         * @param {boolean} [pIsAutoLoad=true]
         *
         * @memberOf Loader
         */
        function Loader(pPath, pFunction, pIsAutoLoad) {
            if (pIsAutoLoad === void 0) { pIsAutoLoad = true; }
            var _this = _super.call(this) || this;
            _this.mOrginalWidth = -1;
            _this.mOrginalHeight = -1;
            _this.mCallback = pFunction;
            _this.mPath = pPath;
            if (pPath == null) {
                return _this;
            }
            if (pIsAutoLoad) {
                _this.load();
            }
            return _this;
        }
        /**
         * Loads a HttpRequest
         *
         *
         * @memberOf Loader
         */
        Loader.prototype.load = function () {
            var _this = this;
            this.mHttpRequest = new XMLHttpRequest;
            this.mHttpRequest.open('get', this.mPath, true);
            this.mHttpRequest.onreadystatechange = function () { return _this.onReadyStatecChange(); };
            this.mHttpRequest.send();
        };
        Object.defineProperty(Loader.prototype, "orginalHeight", {
            /**
             *
             *
             * @readonly
             * @type {number}
             * @memberOf Loader
             */
            get: function () {
                return this.mOrginalHeight;
            },
            //_______________________________________________________
            /**
             *
             *
             *
             * @memberOf Loader
             */
            set: function (pVal) {
                this.mOrginalHeight = pVal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Loader.prototype, "orginalWidth", {
            /**
             *
             *
             * @readonly
             * @type {number}
             * @memberOf Loader
             */
            get: function () {
                return this.mOrginalWidth;
            },
            //_______________________________________________________
            /**
             *
             *
             *
             * @memberOf Loader
             */
            set: function (pVal) {
                this.mOrginalWidth = pVal;
            },
            enumerable: true,
            configurable: true
        });
        //________________________________________________________
        /****************************
        * Override methods
        ****************************/
        /**
         * @override
         * Creates a SVGGElement
         * @protected
         *
         * @memberOf Loader
         */
        Loader.prototype.createElement = function () {
            this.create("g");
        };
        ;
        /****************************
        * Methods
        ****************************/
        //_____________________________________________________________________________
        //// <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="96px" height="48px" viewBox="0 0 96 48">
        /**
         * Sets the SVG Data from Data
         *
         * @param {Node} pSVG
         *
         * @memberOf Loader
         */
        Loader.prototype.setSVGDataFromData = function (pSVG) {
            Loader.mCounter++;
            var i;
            if (pSVG != null) {
                this.mSVG = document.importNode(pSVG, true);
                if (this.mOrginalWidth == -1) {
                    if (this.mSVG.attributes["width"] == null) {
                        this.mOrginalWidth = 620;
                        this.mOrginalHeight = 515;
                    }
                    else {
                        this.mOrginalWidth = parseInt(this.mSVG.attributes["width"].nodeValue);
                        this.mOrginalHeight = parseInt(this.mSVG.attributes["height"].nodeValue);
                    }
                }
                var aDefs = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs");
                var aAllGElements = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "g");
                var aUseElements = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "use");
                var aPathElements = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "path");
                var aGDefElements = void 0;
                if ((aDefs != null) && (aDefs.length > 0)) {
                    aGDefElements = aDefs[0].childNodes;
                }
                for (i = 0; i < aPathElements.length; i++) {
                    var aFilter = aPathElements[i].getAttribute("filter");
                    if ((aFilter != null) && (aFilter.indexOf("url(#") == 0)) {
                        aFilter = aFilter.substr(0, aFilter.length - 1) + "_" + Loader.mCounter + ")";
                        aPathElements[i].setAttribute("filter", aFilter);
                    }
                    var aFill = aPathElements[i].getAttribute("fill");
                    if ((aFill != null) && (aFill.indexOf("url(#") == 0)) {
                        aFill = aFill.substr(0, aFill.length - 1) + "_" + Loader.mCounter + ")";
                        aPathElements[i].setAttribute("fill", aFill);
                    }
                }
                var aGElementsFirstLevel = new Array();
                for (i = 0; i < aAllGElements.length; i++) {
                    if (aAllGElements[i].parentNode == this.mSVG) {
                        aGElementsFirstLevel.push(aAllGElements[i]);
                    }
                }
                for (i = 0; i < aUseElements.length; i++) {
                    var aLink = aUseElements[i].getAttribute("xlink:href") + "_" + Loader.mCounter;
                    aUseElements[i].setAttribute("xlink:href", aLink);
                    var aFilter = aUseElements[i].getAttribute("filter");
                    if ((aFilter != null) && (aFilter.indexOf("url(#") == 0)) {
                        aFilter = aFilter.substr(0, aFilter.length - 1) + "_" + Loader.mCounter + ")";
                        aUseElements[i].setAttribute("filter", aFilter);
                    }
                }
                var aBefore = void 0;
                if (aGDefElements != null) {
                    for (i = 0; i < aGDefElements.length; i++) {
                        if (aGDefElements[i].id != null) {
                            aGDefElements[i].id = aGDefElements[i].id + "_" + Loader.mCounter;
                        }
                    }
                    aBefore = aDefs[0];
                    this.mElement.appendChild(aBefore);
                    for (i = aDefs.length - 1; i >= 0; i--) {
                        this.mElement.insertBefore(aDefs[i], aBefore);
                        aBefore = aDefs[i];
                        ;
                    }
                }
                aBefore = aGElementsFirstLevel[0];
                this.mElement.appendChild(aBefore);
                for (i = aGElementsFirstLevel.length - 1; i >= 0; i--) {
                    this.mElement.insertBefore(aGElementsFirstLevel[i], aBefore);
                    aBefore = aGElementsFirstLevel[i];
                    ;
                }
            }
            //if (asBase.Utils.isFireFox) {
            //    this.mInnerSVG = this.mElement.innerHTML;
            //    this.mElement.innerHTML = '<ellipse cx="0" cy="0" rx="2" ry="2" fill="#ffffff" stroke-width="0.5" stroke="#ffffff"></ellipse>'
            //    setTimeout(() => this.updateSVGForFF(), 1000);
            //}
            if (this.mCallback != null) {
                this.mCallback(this);
            }
        };
        //______________________________________________________________________________
        /**
         * Updates the SVG for FF
         *
         * @protected
         * @returns
         *
         * @memberOf Loader
         */
        Loader.prototype.updateSVGForFF = function () {
            var _this = this;
            if (this.mElement.getBoundingClientRect().width == 0) {
                setTimeout(function () { return _this.updateSVGForFF(); }, 700);
                return;
            }
            this.mElement.innerHTML = this.mInnerSVG;
        };
        //______________________________________________________________________________
        /**
         *
         *
         * @protected
         * @returns
         *
         * @memberOf Loader
         */
        Loader.prototype.onReadyStatecChange = function () {
            if (this.mHttpRequest.readyState != 4) {
                return;
            }
            var aSvg = this.getXMLFromRespose();
            if (aSvg == null) {
                console.log("Error Loading SVG");
                this.setSVGDataFromData(null);
                return;
            }
            this.setSVGDataFromData(aSvg);
        };
        //______________________________________________________________________________
        /**
         *
         *
         * @protected
         * @returns
         *
         * @memberOf Loader
         */
        Loader.prototype.getXMLFromRespose = function () {
            if (this.mHttpRequest.responseXML != null) {
                return this.mHttpRequest.responseXML.documentElement;
            }
            if (this.mHttpRequest.responseText != null) {
                var div = document.createElement('div');
                div.innerHTML = this.mHttpRequest.responseText;
                var elements = div.childNodes;
                return elements[1];
            }
            return null;
        };
        Object.defineProperty(Loader, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            /**
             *
             *
             * @readonly
             * @static
             * @type {string}
             * @memberOf Loader
             */
            get: function () {
                return "Loader";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Loader.prototype, "myClassName", {
            //______________________________________________
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf Loader
             */
            get: function () {
                return "Loader";
            },
            enumerable: true,
            configurable: true
        });
        return Loader;
    }(asSvg.DisplayObject));
    Loader.mCounter = 0;
    asSvg.Loader = Loader;
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
/// <reference path="displayobject.ts" />
(function (asSvg) {
    /**
     * Represents a class containing a SVGRectElement
     *
     * @export
     * @class Rect
     * @extends {DisplayObject}
     */
    var Rect = (function (_super) {
        __extends(Rect, _super);
        /**
         * Creates an instance of Rect.
         * @param {number} pX
         * @param {number} pY
         * @param {number} pWidth
         * @param {number} pHeight
         * @param {number} [pRx]
         * @param {number} [pRy]
         *
         * @memberOf Rect
         */
        function Rect(pX, pY, pWidth, pHeight, pRx, pRy) {
            var _this = _super.call(this) || this;
            _this.update(pX, pY, pWidth, pHeight, pRx, pRy);
            return _this;
        }
        /****************************
        * Override methods
        ****************************/
        /**
         * @override
         * Creates a SVGRectElement
         * @protected
         *
         * @memberOf Rect
         */
        Rect.prototype.createElement = function () {
            this.create("rect");
        };
        ;
        /****************************
        * Methods
        ****************************/
        /**
         * Updates the elements coordinates
         *
         * @param {number} [pX]
         * @param {number} [pY]
         * @param {number} [pWidth]
         * @param {number} [pHeight]
         * @param {number} [pRx]
         * @param {number} [pRy]
         *
         * @memberOf Rect
         */
        Rect.prototype.update = function (pX, pY, pWidth, pHeight, pRx, pRy) {
            if (pX != null) {
                this.mElement.setAttribute("x", pX.toString());
            }
            if (pY != null) {
                this.mElement.setAttribute("y", pY.toString());
            }
            if (pWidth != null) {
                this.mElement.setAttribute("width", pWidth.toString());
            }
            if (pHeight != null) {
                this.mElement.setAttribute("height", pHeight.toString());
            }
            if (pRx != null) {
                this.mElement.setAttribute("rx", pRx.toString());
            }
            if (pRy != null) {
                this.mElement.setAttribute("ry", pRy.toString());
            }
        };
        Object.defineProperty(Rect, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            /**
             *
             *
             * @readonly
             * @static
             * @type {string}
             * @memberOf Rect
             */
            get: function () {
                return "Line";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "myClassName", {
            //______________________________________________
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf Rect
             */
            get: function () {
                return "Line";
            },
            enumerable: true,
            configurable: true
        });
        return Rect;
    }(asSvg.DisplayObject));
    asSvg.Rect = Rect;
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
/// <reference path="displayobject.ts" />
(function (asSvg) {
    /**
     * Represents a shape
     *
     * @export
     * @class Shape
     * @extends {DisplayObject}
     */
    var Shape = (function (_super) {
        __extends(Shape, _super);
        /**
         * Creates an instance of Shape.
         *
         * @memberOf Shape
         */
        function Shape() {
            var _this = _super.call(this) || this;
            _this.mCurrentX = 0;
            _this.mCurrentY = 0;
            _this.mDraw = "";
            return _this;
        }
        /****************************
        * Override methods
        ****************************/
        /**
         * @override
         * Creates a SVGPathElement
         * @protected
         *
         * @memberOf Shape
         */
        Shape.prototype.createElement = function () {
            this.create("path");
        };
        ;
        /****************************
        * Methods
        ****************************/
        /**
         * Clears the element
         *
         *
         * @memberOf Shape
         */
        Shape.prototype.clear = function () {
            this.mDraw = "";
            this.mElement.setAttribute("d", this.mDraw);
        };
        //_________________________________________________________
        /**
         * Moves the element to a given point
         *
         * @param {number} x
         * @param {number} y
         *
         * @memberOf Shape
         */
        Shape.prototype.moveTo = function (x, y) {
            this.mDraw += "M " + x + " " + y + " ";
            this.mCurrentX = x;
            this.mCurrentY = y;
            this.mElement.setAttribute("d", this.mDraw);
        };
        //_________________________________________________________
        /**
         * Draws a line to a specified point
         *
         * @param {number} x
         * @param {number} y
         *
         * @memberOf Shape
         */
        Shape.prototype.lineTo = function (x, y) {
            this.mDraw += "l " + (x - this.mCurrentX) + " " + (y - this.mCurrentY) + " ";
            this.mCurrentX = x;
            this.mCurrentY = y;
            this.mElement.setAttribute("d", this.mDraw);
        };
        //________________________________________________________
        /**
         * Sets the element's line as dashed
         *
         * @param {Array<number>} pDashedArray
         *
         * @memberOf Shape
         */
        Shape.prototype.dashLine = function (pDashedArray) {
            this.mElement.setAttribute("stroke-dasharray", pDashedArray.join(","));
        };
        //________________________________________________________
        /**
         *
         *
         * @param {any} x1
         * @param {any} y1
         * @param {any} x2
         * @param {any} y2
         *
         * @memberOf Shape
         */
        Shape.prototype.quadraticBezierCurve = function (x1, y1, x2, y2) {
            this.mDraw += "q " + (x1 - this.mCurrentX) + " " + (y1 - this.mCurrentY) + " " + (x2 - this.mCurrentX) + " " + (y2 - this.mCurrentY) + " ";
            this.mCurrentX = x2;
            this.mCurrentY = y2;
            this.mElement.setAttribute("d", this.mDraw);
        };
        //________________________________________________________
        /**
         *
         *
         * @param {any} x1
         * @param {any} y1
         * @param {any} x2
         * @param {any} y2
         * @param {any} x3
         * @param {any} y3
         *
         * @memberOf Shape
         */
        Shape.prototype.bezierCurveTo = function (x1, y1, x2, y2, x3, y3) {
            this.mDraw += "c " + (x1 - this.mCurrentX) + " " + (y1 - this.mCurrentY) + " " + (x2 - this.mCurrentX) + " " + (y2 - this.mCurrentY) + " " + (x3 - this.mCurrentX) + " " + (y3 - this.mCurrentY) + " ";
            this.mCurrentX = x3;
            this.mCurrentY = y3;
            this.mElement.setAttribute("d", this.mDraw);
        };
        Object.defineProperty(Shape, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            /**
             *
             *
             * @readonly
             * @static
             * @type {string}
             * @memberOf Shape
             */
            get: function () {
                return "Shape";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "myClassName", {
            //______________________________________________
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf Shape
             */
            get: function () {
                return "Shape";
            },
            enumerable: true,
            configurable: true
        });
        return Shape;
    }(asSvg.DisplayObject));
    asSvg.Shape = Shape;
})(asSvg || (asSvg = {}));
/// <reference path="displayobject.ts" />
var asSvg;
/// <reference path="displayobject.ts" />
(function (asSvg) {
    /**
     * Represents a sprite object
     *
     * @export
     * @class Sprite
     * @extends {DisplayObject}
     */
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        /**
         * Creates an instance of Sprite.
         *
         * @memberOf Sprite
         */
        function Sprite() {
            var _this = _super.call(this) || this;
            _this.mChildren = new Array();
            return _this;
        }
        //_____________________________________________________
        /**
         * Creates a sprite from an element
         *
         * @static
         * @param {Element} pElement -element to create sprite from
         * @returns {Sprite}  -sprite created
         *
         * @memberOf Sprite
         */
        Sprite.createSpriteFromElement = function (pElement) {
            var aSprite = new Sprite();
            aSprite.mElement = pElement;
            return aSprite;
        };
        //_____________________________________________________
        Sprite.prototype.findChiledElementById = function (pId) {
            // TO DO
            return null;
        };
        //_____________________________________________________
        /****************************
        * Override methods
        ****************************/
        /**
         * Creates the sprite's element
         *
         * @protected
         * @override
         * @memberOf Sprite
         */
        Sprite.prototype.createElement = function () {
            this.create("g");
        };
        ;
        Object.defineProperty(Sprite.prototype, "parent", {
            /**
             * @override
             *
             * @type {asSvg.Sprite}
             * @memberOf Sprite
             */
            get: function () {
                return (this.mParent);
            },
            //____________________________________________________
            /**
             * @override
             * Sets the sprite's parent
             *
             * @memberOf Sprite
             */
            set: function (pVal) {
                this.mParent = pVal;
                if (pVal == null) {
                    this.mStage = null;
                }
                this.mStage = this.stage;
                for (var i = 0; i < this.mChildren.length; i++) {
                    this.mChildren[i].parent = this;
                }
            },
            enumerable: true,
            configurable: true
        });
        /****************************
        * Methods
        ****************************/
        /**
         * Appends a svg element to the sprite's element
         *
         * @param {DisplayObject} pElement
         * @returns
         *
         * @memberOf Sprite
         */
        Sprite.prototype.addChild = function (pElement) {
            if (pElement == this) {
                console.log("asSvg.Sprite::addChild() Error : Can't add Child to itsalf");
                return;
            }
            this.removeChild(pElement);
            this.mChildren.push(pElement);
            pElement.parent = this;
            if (pElement.visible) {
                this.mElement.appendChild(pElement.element);
            }
        };
        //_________________________________________________________
        /**
         * Removes a svg element to the sprite's element
         *
         * @param {DisplayObject} pElement
         * @returns
         *
         * @memberOf Sprite
         */
        Sprite.prototype.removeChild = function (pElement) {
            var aIndex = this.mChildren.indexOf(pElement);
            if (aIndex > -1) {
                this.mChildren.splice(aIndex, 1);
            }
            if (pElement.parent != this) {
                return;
            }
            if (pElement.element.parentNode != this.mElement) {
                if (pElement.parent == this) {
                    pElement.parent = null;
                }
                return;
            }
            this.mElement.removeChild(pElement.element);
            pElement.parent = null;
        };
        Object.defineProperty(Sprite.prototype, "children", {
            //_________________________________________________________________
            /**
             *
             *
             * @readonly
             * @type {Array<DisplayObject>}
             * @memberOf Sprite
             */
            get: function () {
                return (this.mChildren);
            },
            enumerable: true,
            configurable: true
        });
        //_________________________________________________________________
        /**
         * Appends a svg element at a specified index
         *
         * @param {DisplayObject} pDisplayObject
         * @param {number} pIndex
         * @returns
         *
         * @memberOf Sprite
         */
        Sprite.prototype.addChildAt = function (pDisplayObject, pIndex) {
            this.removeChild(pDisplayObject);
            if ((pIndex > this.mChildren.length - 1) || (this.mChildren.length == 0)) {
                this.addChild(pDisplayObject);
                return;
            }
            pDisplayObject.parent = this;
            if (pIndex <= 0) {
                this.element.insertBefore(pDisplayObject.element, this.mChildren[0].element);
                this.mChildren.unshift(pDisplayObject);
                return;
            }
            this.element.insertBefore(pDisplayObject.element, this.mChildren[pIndex].element);
            this.mChildren.splice(pIndex, 0, pDisplayObject);
            return (this.mChildren);
        };
        //__________________________________________________
        /**
         * Returns the index of the child element
         *
         * @param {DisplayObject} pElement
         * @returns {number}
         *
         * @memberOf Sprite
         */
        Sprite.prototype.getChildIndex = function (pElement) {
            return (this.mChildren.indexOf(pElement));
        };
        //__________________________________________________
        /**
         * Removes all of the svg elements from the sprite's element
         *
         *
         * @memberOf Sprite
         */
        Sprite.prototype.removeChildren = function () {
            for (var i = 0; i < this.mChildren.length; i++) {
                var aElement = this.mChildren[i];
                if (aElement.element.parentNode == this.mElement) {
                    this.mElement.removeChild(aElement.element);
                }
                aElement.parent = null;
            }
            this.mChildren = new Array();
        };
        Object.defineProperty(Sprite, "myName", {
            /****************************
            * Getters and Setters
            ****************************/
            /**
             *
             *
             * @readonly
             * @static
             * @type {string}
             * @memberOf Sprite
             */
            get: function () {
                return "Sprite";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "myClassName", {
            //______________________________________________
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf Sprite
             */
            get: function () {
                return "Sprite";
            },
            enumerable: true,
            configurable: true
        });
        return Sprite;
    }(asSvg.DisplayObject));
    asSvg.Sprite = Sprite;
})(asSvg || (asSvg = {}));
/// <reference path="sprite.ts" />
var unescape = unescape;
var asSvg;
(function (asSvg) {
    /**Class that represents the stage
     *
     *
     * @export
     * @class Stage
     * @extends {Sprite}
     */
    var Stage = (function (_super) {
        __extends(Stage, _super);
        /**
         * Creates an instance of Stage.
         * @param {HTMLElement} [pStage]
         *
         * @memberOf Stage
         */
        function Stage(pStage) {
            var _this = _super.call(this) || this;
            _this.mElement = pStage;
            if (pStage == null) {
                _this.create("svg");
            }
            return _this;
        }
        //_________________________________________________________
        /**
         * Returns the svg stage as a HTMLImageElemnt
         *
         * @returns {HTMLImageElement}
         *
         * @memberOf Stage
         */
        Stage.prototype.getImage = function () {
            var aImg = document.createElement("img");
            var aXML = this.getAsString();
            //var svg64 = btoa(aXML);
            var svg64 = btoa(unescape(encodeURIComponent(aXML)));
            aImg.src = "data:image/svg+xml;base64," + svg64;
            return aImg;
        };
        //_________________________________________________________
        /**
         * Activate the mouse location
         *
         * @returns {void}
         *
         * @memberOf Stage
         */
        Stage.prototype.activeMouseLocation = function () {
            var _this = this;
            if (this.mMouseLocation != null) {
                return;
            }
            this.mMouseLocation = new asBase.math.Point();
            window.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, function (e) { return _this.onMouseMove(e); });
            window.addEventListener(asBase.events.MouseEvents.TOUCH_MOVE, function (e) { return _this.onTouchMove(e); });
            window.addEventListener(asBase.events.MouseEvents.TOUCH_START, function (e) { return _this.onTouchStart(e); });
        };
        //________________________________________________________
        /**
         * Sets the color and opacity of the element
         *
         * @param {number} [pColor]
         * @param {number} [pOpacity]
         * @override
         * @memberOf Stage
         */
        Stage.prototype.setFill = function (pColor, pOpacity) {
            if (pColor != null) {
                var aBase16 = pColor.toString(16);
                while (aBase16.length < 6) {
                    aBase16 = "0" + aBase16;
                }
                var aColor = "#" + aBase16;
                this.mElement.style.background = aColor;
            }
        };
        //_________________________________________________________
        /**
         * On Touch Move Callback
         *
         * @param {TouchEvent} e
         * @override
         * @memberOf Stage
         */
        Stage.prototype.onTouchMove = function (e) {
            this.mMouseLocation.x = e.touches[0].clientX - this.offsetX;
            this.mMouseLocation.y = e.touches[0].clientY - this.offsetY;
        };
        /**
         * On Touch Start callback
         *
         * @param {TouchEvent} e
         *
         * @memberOf Stage
         */
        Stage.prototype.onTouchStart = function (e) {
            this.mMouseLocation.x = e.touches[0].clientX - this.offsetX;
            this.mMouseLocation.y = e.touches[0].clientY - this.offsetY;
        };
        //_________________________________________________________
        /**
         * On Mouse Move Callback
         *
         * @param {MouseEvent} e
         * @override
         * @memberOf Stage
         */
        Stage.prototype.onMouseMove = function (e) {
            this.mMouseLocation.x = e.clientX - this.offsetX;
            this.mMouseLocation.y = e.clientY - this.offsetY;
        };
        Object.defineProperty(Stage.prototype, "offsetX", {
            //_________________________________________________________
            /**
             *
             *
             * @readonly
             * @type {number}
             * @memberOf Stage
             */
            get: function () {
                return this.element.getBoundingClientRect().left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "offsetY", {
            //_________________________________________________________
            /**
             *
             *
             * @readonly
             * @type {number}
             * @memberOf Stage
             */
            get: function () {
                return this.element.getBoundingClientRect().top;
            },
            enumerable: true,
            configurable: true
        });
        //_________________________________________________________
        /**
         *
         *
         * @static
         * @param {HTMLElement} pStage
         * @returns {Stage}
         *
         * @memberOf Stage
         */
        Stage.setStage = function (pStage) {
            var aStage = new Stage(pStage);
            return aStage;
        };
        //_________________________________________________________
        /**
       * Creating the Stage
       * @param pParent  The HTML Element that will host the stage,
       * @param pWidth   The Stage width in pixels
       * @param pHeight  The Stage height in pixels
       * @returns     new SVG element
       */
        Stage.cretaeStage = function (pParent, pWidth, pHeight) {
            var aStage = new Stage();
            if (pParent != null) {
                aStage.setParent(pParent);
            }
            aStage.setSize(pWidth, pHeight);
            return aStage;
        };
        //_____________________________________________________
        /**
         * Sets the size of the width
         *
         * @param {number} pWidth  - the stage width in pixels
         * @param {number} pHeight -the stage height in pixels
         *
         * @memberOf Stage
         */
        Stage.prototype.setSize = function (pWidth, pHeight) {
            this.mElement.setAttribute("width", pWidth.toString());
            this.mElement.setAttribute("height", pHeight.toString());
        };
        //_____________________________________________________
        /**
         * Sets the parent of the stage
         *
         * @protected
         * @param {HTMLElement} [pParent]
         *
         * @memberOf Stage
         */
        Stage.prototype.setParent = function (pParent) {
            if (pParent == null) {
                return;
            }
            this.mParentDiv = pParent;
            if (this.mElement == null) {
                return;
            }
            if (this.mElement.parentNode != this.mParentDiv) {
                this.mParentDiv.appendChild(this.mElement);
            }
        };
        //_____________________________________________________
        /**
         * Sets the svg element
         *
         * @protected
         * @param {HTMLElement} [pElement]
         *
         * @memberOf Stage
         */
        Stage.prototype.setSvgElement = function (pElement) {
            if (this.mElement == null) {
                return;
            }
            this.mElement = pElement;
            if (this.mParent == null) {
                return;
            }
            if (this.mElement.parentNode != this.mParentDiv) {
                this.mParentDiv.appendChild(this.mElement);
            }
        };
        Object.defineProperty(Stage.prototype, "height", {
            //________________________________________________________
            /**
             * @override
             *
             * @readonly
             * @type {number}
             * @memberOf Stage
             */
            get: function () {
                return (this.mElement.getBoundingClientRect().height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "width", {
            //________________________________________________________
            /**
             * @override
             *
             * @readonly
             * @type {number}
             * @memberOf Stage
             */
            get: function () {
                return (this.mElement.getBoundingClientRect().width);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage, "myName", {
            //________________________________________________________
            /**
             * @override
             *
             * @readonly
             * @static
             * @type {string}
             * @memberOf Stage
             */
            get: function () {
                return "Stage";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "myClassName", {
            //______________________________________________
            /**
             * @override
             *
             * @readonly
             * @type {string}
             * @memberOf Stage
             */
            get: function () {
                return "Stage";
            },
            enumerable: true,
            configurable: true
        });
        //______________________________________________
        /**
         * @override
         *
         * @protected
         *
         * @memberOf Stage
         */
        Stage.prototype.createElement = function () { };
        //________________________________________________________
        /**
         *
         *
         * @private
         * @returns
         *
         * @memberOf Stage
         */
        Stage.prototype.tick = function () {
            var _this = this;
            window.requestAnimationFrame(function () { return _this.tick(); });
            this.enterFrame();
            if (this.mEnterFrameList == null) {
                return;
            }
            for (var i = 0; i < this.mEnterFrameList.length; i++) {
                this.mEnterFrameList[i].enterFrame();
            }
            if (this.mEnterFrameCallbacks == null) {
                return;
            }
            for (var i = 0; i < this.mEnterFrameCallbacks.length; i++) {
                this.mEnterFrameCallbacks[i].callback();
            }
        };
        //_________________________________________________________
        /**
         * Enables the enter frame
         *
         * @returns {boolean}
         * @override
         * @memberOf Stage
         */
        Stage.prototype.enableEnterFrame = function () {
            var _this = this;
            if (this.mEnterFrameList == null) {
                this.mEnterFrameList = new Array();
                window.requestAnimationFrame(function () { return _this.tick(); });
            }
            return true;
        };
        //_________________________________________________________
        /**
         * Disables the enter frame
         *
         * @returns {boolean}
         * @override
         * @memberOf Stage
         */
        Stage.prototype.disableEnterFrame = function () {
            throw "cant stop EnterFrame on Stage";
        };
        //_________________________________________________________
        /**
         * Adds to enter frame list
         *
         * @param {DisplayObject} pDisplayObject
         * @returns
         *
         * @memberOf Stage
         */
        Stage.prototype.addToEnterFrameList = function (pDisplayObject) {
            if (this.mEnterFrameList == null) {
                this.enableEnterFrame();
            }
            if (this.mEnterFrameList.indexOf(pDisplayObject) != -1) {
                return;
            }
            this.mEnterFrameList.push(pDisplayObject);
        };
        //_________________________________________________________
        /**
         * Removes from enter frame list
         *
         * @param {DisplayObject} pDisplayObject
         *
         * @memberOf Stage
         */
        Stage.prototype.removeFromEnterFrameList = function (pDisplayObject) {
            if (this.mEnterFrameList == null) {
                this.mEnterFrameList = new Array();
            }
            if (this.mEnterFrameList.indexOf(pDisplayObject) != -1) {
                this.mEnterFrameList.splice(this.mEnterFrameList.indexOf(pDisplayObject), 1);
            }
        };
        //_______________________________________________________________
        /**
         * Adds  enter frame callback
         *
         * @param {Function} pCallback
         * @param {*} pOwner
         * @returns
         *
         * @memberOf Stage
         */
        Stage.prototype.addEnterFrameCallback = function (pCallback, pOwner) {
            if (this.mEnterFrameCallbacks == null) {
                this.mEnterFrameCallbacks = new Array();
            }
            for (var i = this.mEnterFrameCallbacks.length - 1; i >= 0; i--) {
                if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                    return;
                }
            }
            this.mEnterFrameCallbacks.push(new CallbackHolder(pCallback, pOwner));
        };
        Object.defineProperty(Stage.prototype, "mouseLocation", {
            //_______________________________________________________________
            /**
             * @override
             *
             * @readonly
             * @type {asBase.math.Point}
             * @memberOf Stage
             */
            get: function () {
                if (this.mMouseLocation == null) {
                    throw ("Use activeMouseLocation() for get the stage mouse location  ");
                }
                return this.mMouseLocation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "mouseX", {
            //_______________________________________________________________
            /**
             *
             *
             * @readonly
             * @type {number}
             * @memberOf Stage
             */
            get: function () {
                if (this.mMouseLocation == null) {
                    throw ("Use activeMouseLocation() for get the stage mouse location  ");
                }
                return this.mMouseLocation.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "mouseY", {
            //_______________________________________________________________
            /**
             *
             *
             * @readonly
             * @type {number}
             * @memberOf Stage
             */
            get: function () {
                if (this.mMouseLocation == null) {
                    throw ("Use activeMouseLocation() for get the stage mouse location  ");
                }
                return this.mMouseLocation.y;
            },
            enumerable: true,
            configurable: true
        });
        //_______________________________________________________________
        /**
         * Removes enter frame callback
         *
         * @param {*} pOwner
         * @returns
         *
         * @memberOf Stage
         */
        Stage.prototype.removeEnterFrameCallback = function (pOwner) {
            if (this.mEnterFrameCallbacks == null) {
                return;
            }
            for (var i = this.mEnterFrameCallbacks.length - 1; i >= 0; i--) {
                if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                    if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                        this.mEnterFrameCallbacks.splice(i, 1);
                    }
                }
            }
        };
        Object.defineProperty(Stage.prototype, "eventElement", {
            //_______________________________________________________________
            /**
             * @override
             *
             * @readonly
             * @protected
             * @type {Element}
             * @memberOf Stage
             */
            get: function () {
                this.mParentDiv.asObject = this;
                return this.mParentDiv;
            },
            enumerable: true,
            configurable: true
        });
        return Stage;
    }(asSvg.Sprite));
    asSvg.Stage = Stage;
    //__________________________________________________________________
    /**
     *
     *
     * @class CallbackHolder
     */
    var CallbackHolder = (function () {
        /**
         * Creates an instance of CallbackHolder.
         * @param {Function} pCallback
         * @param {*} pOwner
         *
         * @memberOf CallbackHolder
         */
        function CallbackHolder(pCallback, pOwner) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
        return CallbackHolder;
    }());
})(asSvg || (asSvg = {}));
/// <reference path="rect.ts" />
var asSvg;
/// <reference path="rect.ts" />
(function (asSvg) {
    /**
     * Represents a class with a SVGTextElement
     *
     * @export
     * @class TextField
     * @extends {Sprite}
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        /**
         * Creates an instance of TextField.
         *
         * @memberOf TextField
         */
        function TextField() {
            var _this = _super.call(this) || this;
            _this.mText = "";
            _this.mFontSize = 0;
            _this.mCreateBackgroundTimeOut = 0;
            return _this;
        }
        /****************************
        * Override methods
        ****************************/
        /**
         * Creates the text element
         *
         * @protected
         *
         * @memberOf TextField
         */
        TextField.prototype.createElement = function () {
            _super.prototype.createElement.call(this);
            this.mTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.alineX = TextField.ALIGN_LEFT;
            this.alineY = TextField.ALIGN_TOP;
            // (this.mTextElement as any).style.pointerEvents = "none";
            this.mTextElement.classList.add("unselectable");
            this.mElement.appendChild(this.mTextElement);
        };
        ;
        Object.defineProperty(TextField.prototype, "background", {
            //______________________________________________________________________
            /**
             *
             *
             * @readonly
             * @type {boolean}
             * @memberOf TextField
             */
            get: function () {
                return this.mBackground != null;
            },
            /****************************
            * Methods
            ****************************/
            /**
             * Sets the background
             *
             *
             * @memberOf TextField
             */
            set: function (pValue) {
                if (pValue) {
                    if (this.background) {
                        return;
                    }
                    else {
                        this.mBackground = new asSvg.Rect(0, 0, 0, 0);
                        this.mBackground.setFill(0xffffff, 1);
                        this.addChild(this.mBackground);
                        this.mElement.appendChild(this.mTextElement);
                        this.updateBackground();
                    }
                }
                else {
                    this.removeChild(this.mBackground);
                    this.mBackground = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "textElement", {
            //________________________________________________________________________
            /**
             *
             *
             * @readonly
             * @type {SVGTextElement}
             * @memberOf TextField
             */
            get: function () {
                return (this.mTextElement);
            },
            enumerable: true,
            configurable: true
        });
        //________________________________________________________________________
        /**
         * Sets the line style
         *
         * @param {number} [pWidth]
         * @param {number} [pColor]
         * @param {number} [pOpacity]
         * @param {string} [pLinecap]
         * @param {string} [pLinejoin]
         *
         * @memberOf TextField
         */
        TextField.prototype.setLineStyle = function (pWidth, pColor, pOpacity, pLinecap, pLinejoin) {
            if (pWidth != null) {
                this.mTextElement.setAttribute("stroke-width", pWidth.toString());
            }
            if (pColor != null) {
                var aColor = "#" + pColor.toString(16);
                while (aColor.length < 7) {
                    aColor += "0";
                }
                this.mTextElement.setAttribute("stroke", aColor);
            }
            else {
                this.mTextElement.setAttribute("stroke", "none");
            }
            if (pOpacity != null) {
                this.mTextElement.setAttribute("stroke-opacity", pOpacity.toString());
            }
            if (pLinecap != null) {
                this.mTextElement.setAttribute("stroke-linecap", pLinecap);
            }
            if (pLinejoin != null) {
                this.mTextElement.setAttribute("stroke-linejoin", pLinejoin);
            }
        };
        //_____________________________________________________________________
        /**
         * Sets the background for mouse events
         *
         *
         * @memberOf TextField
         */
        TextField.prototype.setBackgroundForMouseEvents = function () {
            this.background = true;
            this.mBackground.setFill(0xffffff, 0);
        };
        Object.defineProperty(TextField.prototype, "backgroundRect", {
            //_____________________________________________________________________
            /**
             *
             *
             * @readonly
             * @type {asSvg.Rect}
             * @memberOf TextField
             */
            get: function () {
                return this.mBackground;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "alineX", {
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf TextField
             */
            get: function () {
                return (this.mAlineX);
            },
            //______________________________________________________________________
            /**
             *
             *
             *
             * @memberOf TextField
             */
            set: function (pValue) {
                this.mAlineX = pValue;
                this.mTextElement.setAttribute("text-anchor", pValue);
                this.updateBackground();
            },
            enumerable: true,
            configurable: true
        });
        //____________________________________________________________
        /**
         * Updates the Background
         *
         * @returns
         *
         * @memberOf TextField
         */
        TextField.prototype.updateBackground = function () {
            var _this = this;
            clearTimeout(this.mCreateBackgroundTimeOut);
            if (!this.background) {
                return;
            }
            if (this.stage == null) {
                this.mCreateBackgroundTimeOut = setTimeout(function () { return _this.updateBackground(); }, 100);
                return;
            }
            var aNode = this.mTextElement.cloneNode();
            aNode.innerHTML = this.mTextElement.innerHTML;
            this.stage.element.appendChild(aNode);
            var w = aNode.getBoundingClientRect().width;
            var h = aNode.getBoundingClientRect().height;
            this.stage.element.removeChild(aNode);
            this.backgroundRect.update(-w / 2, -h / 2, w, h);
        };
        Object.defineProperty(TextField.prototype, "alineY", {
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf TextField
             */
            get: function () {
                return (this.mAlineY);
            },
            //____________________________________________________________
            /**
             *
             *
             *
             * @memberOf TextField
             */
            set: function (pValue) {
                this.mAlineY = pValue;
                this.mTextElement.setAttribute("dy", pValue);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "fontSize", {
            get: function () {
                return (this.mFontSize);
            },
            //____________________________________________________________
            /****************************
            * Getters and Setters
            ****************************/
            //________________________________________
            /**
             * Sets the object's element's font size
             *
             *
             * @memberOf TextField
             */
            set: function (pFont) {
                this.mFontSize = pFont;
                this.mTextElement.setAttribute("font-size", pFont.toString());
                this.updateBackground();
                this.updateText();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "font", {
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf TextField
             */
            get: function () {
                return (this.mTextElement.getAttribute("font-family"));
            },
            //________________________________________
            /**
             *
             *
             *
             * @memberOf TextField
             */
            set: function (pFont) {
                this.mTextElement.setAttribute("font-family", pFont);
                this.updateBackground();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "text", {
            /**
             *
             *
             * @readonly
             * @type {string}
             * @memberOf TextField
             */
            get: function () {
                return this.mText;
            },
            //________________________________________________________________
            /**
             *
             *
             *
             * @memberOf TextField
             */
            set: function (pVal) {
                this.mText = pVal;
                this.updateText();
            },
            enumerable: true,
            configurable: true
        });
        //________________________________________________________________
        /**
         * Updates the element's text
         *
         * @returns
         *
         * @memberOf TextField
         */
        TextField.prototype.updateText = function () {
            this.mTextElement.innerHTML = "";
            var aLines = this.mText.split("\n");
            if (aLines.length <= 1) {
                this.mTextElement.textContent = this.mText;
                this.updateBackground();
                return;
            }
            var aFrom = 0;
            if (this.alineY == asSvg.TextField.ALIGN_MIDDLE_Y) {
                aFrom = -(aLines.length / 2) * this.mFontSize;
            }
            for (var a = 0; a < aLines.length; a++) {
                var aTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                aTspan.setAttribute("x", "0px");
                aTspan.setAttribute("y", (aFrom + this.mFontSize * a).toString() + "px");
                aTspan.setAttribute("dy", TextField.ALIGN_TOP);
                var tn = document.createTextNode(aLines[a]);
                aTspan.appendChild(tn);
                this.mTextElement.appendChild(aTspan);
            }
            this.updateBackground();
        };
        Object.defineProperty(TextField, "myName", {
            //________________________________________________
            get: function () {
                return "TextField";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "myClassName", {
            //______________________________________________
            get: function () {
                return "TextField";
            },
            enumerable: true,
            configurable: true
        });
        return TextField;
    }(asSvg.Sprite));
    TextField.ALIGN_RIGHT = "start";
    TextField.ALIGN_MIDDLE_X = "middle";
    TextField.ALIGN_LEFT = "left";
    TextField.ALIGN_TOP = "1em";
    TextField.ALIGN_MIDDLE_Y = ".3em";
    TextField.ALIGN_BOTTOM = "0em";
    asSvg.TextField = TextField;
})(asSvg || (asSvg = {}));
var image;
(function (image) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this.mImageDrawing = new image.ImageDrawing(document.getElementById("imageDiv"));
            if (image.Globals.isTest) {
                this.mImageSave = new image.ImageSaveCombineCanvas(this.mImageDrawing);
            }
            else {
                this.mImageSave = new image.ImageSaveCanvas(this.mImageDrawing);
            }
            this.mDownloadButton = document.getElementById("downloadButton");
            this.mDrawButton = document.getElementById("drawButton");
            this.mSelectButton = document.getElementById("selectButton");
            this.mSetImageButton = document.getElementById("setImageButton");
            this.mSetTextButton = document.getElementById("setTextButton");
            this.mDrawColorBox = document.getElementById("drawColor");
            this.mRotateButton = document.getElementById("rotateButton");
            this.mTextBox = document.getElementById("textBox");
            this.mClearAllButton = document.getElementById("clearAllButton");
            this.mFontSizeBox = document.getElementById("fontSizeBox");
            this.mLineWidthBox = document.getElementById("lineWidthBox");
            this.mImageDrawing.mDrawColor = document.getElementById("drawColor").value;
            this.mImageDrawing.mTextButton = document.getElementById("setTextButton");
            this.mSetImageButton.addEventListener("click", function () { return _this.setPicture(); });
            this.mSetTextButton.addEventListener("click", function () { return _this.setText(); });
            this.mDrawButton.addEventListener("click", function () { return _this.onDraw(); });
            this.mDownloadButton.addEventListener("click", function () { return _this.onDownload(); });
            this.mSelectButton.addEventListener("click", function () { return _this.onSelect(); });
            document.getElementById("rotateButton").addEventListener("click", function () { return _this.rotateImage(); });
            this.mDrawColorBox.addEventListener("input", function () { return _this.onColorChange(); });
            document.getElementById("fullScreenButton").addEventListener("click", function (pText) { return _this.onFullScreen(); });
            this.mClearAllButton.addEventListener("click", function () { return _this.onClearAll(); });
            this.mFontSizeBox.addEventListener("input", function (pVal) { return _this.onFontSize(_this.mFontSizeBox.value); });
            this.mLineWidthBox.addEventListener("input", function (pVal) { return _this.onLineWidth(_this.mLineWidthBox.value); });
        }
        //______________________________________
        Main.prototype.setPicture = function () {
            var aNum = Math.floor(Math.random() * 5) + 1;
            this.mImageDrawing.setPicture("assets/" + aNum + ".jpg", 0, 1);
            this.mRotateButton.style.display = "inline-block";
        };
        //____________________________________
        Main.prototype.rotateImage = function () {
            this.resetButtons();
            this.mImageDrawing.rotate(90);
        };
        //__________________________________
        Main.prototype.setText = function () {
            this.resetButtons();
            this.mSetTextButton.classList.add("active");
            this.mImageDrawing.onSetText();
        };
        //____________________________
        Main.prototype.onDraw = function () {
            this.resetButtons();
            this.mDrawButton.classList.add("active");
            var aColor = this.mDrawColorBox.value;
            console.log(aColor);
            this.mImageDrawing.startDraw(aColor);
        };
        //___________________________________
        Main.prototype.onDownload = function () {
            this.mImageSave.getImage();
        };
        //________________________________________
        Main.prototype.onSelect = function () {
            this.resetButtons();
            this.mSelectButton.classList.add("active");
            this.mImageDrawing.select();
        };
        //________________________________________
        Main.prototype.onColorChange = function () {
            var aColor = this.mDrawColorBox.value;
            console.log(aColor);
            this.mImageDrawing.changeColor(aColor);
        };
        //_________________________________________
        Main.prototype.resetButtons = function () {
            image.Globals.isSelectMode = false;
            image.Globals.isTextMode = false;
            image.Globals.isDrawMode = false;
            image.Globals.isRotateMode = false;
            this.mDrawButton.classList.remove("active");
            this.mRotateButton.classList.remove("active");
            this.mSelectButton.classList.remove("active");
            this.mSetTextButton.classList.remove("active");
        };
        //____________________________
        Main.prototype.onFullScreen = function () {
            this.mImageDrawing.onFullScreen(image.Globals.isFullScreen);
            if (!image.Globals.isFullScreen) {
                document.getElementById("fullScreenButton").getElementsByTagName("span")[0].className = "glyphicon glyphicon-resize-small";
                image.Globals.isFullScreen = true;
            }
            else {
                document.getElementById("fullScreenButton").getElementsByTagName("span")[0].className = "glyphicon glyphicon-resize-full";
                image.Globals.isFullScreen = false;
            }
        };
        //____________________________________
        Main.prototype.onClearAll = function () {
            this.mImageDrawing.clearAll();
        };
        //__________________________________
        Main.prototype.onFontSize = function (pVal) {
            this.mImageDrawing.fontsize = pVal;
        };
        //__________________________________
        Main.prototype.onLineWidth = function (pVal) {
            this.mImageDrawing.lineWidth = pVal;
        };
        return Main;
    }());
    image.Main = Main;
})(image || (image = {}));
var image;
(function (image) {
    /**
     * Class that controls each drawing item(text/scribble)
     *
     * @export
     * @class DrawingController
     */
    var DrawingController = (function () {
        /**
         * Creates an instance of DrawingController.
         *
         * @memberOf DrawingController
         */
        function DrawingController() {
            var _this = this;
            document.getElementById("deleteButton").addEventListener("click", function () { return _this.deleteShape(); });
            document.getElementById("editColor").addEventListener("input", function () { return _this.changeShapeColor(); });
            document.getElementById("closeButton").addEventListener("click", function () { return _this.onDeselectShape(); });
            document.getElementById("deleteTextButton").addEventListener("click", function () { return _this.deleteText(); });
            document.getElementById("closeTextButton").addEventListener("click", function () { return _this.onDeselectText(); });
            document.getElementById("editTextColor").addEventListener("input", function () { return _this.changeTextColor(); });
        }
        //_________________________________________
        DrawingController.prototype.deleteShape = function () {
            this.mCurrentShape.destruct();
            var aIndex = image.Globals.mDrawingShapes.indexOf(this.mCurrentShape);
            image.Globals.mDrawingShapes.splice(aIndex, 1);
            this.onDeselectShape();
        };
        //_________________________________________
        DrawingController.prototype.deleteText = function () {
            this.mCurrentText.destruct();
            var aIndex = image.Globals.mTextArray.indexOf(this.mCurrentText);
            image.Globals.mTextArray.splice(aIndex, 1);
            this.onDeselectText();
        };
        //_______________________________________
        DrawingController.prototype.changeShapeColor = function () {
            var aColor = document.getElementById("editColor").value;
            this.mCurrentShape.element.setAttribute("stroke", aColor);
        };
        //_________________________________________
        DrawingController.prototype.changeTextColor = function () {
            var aColor = document.getElementById("editTextColor").value;
            this.mCurrentText.mInputElement.style.color = aColor;
        };
        //________________________________________
        /**
         *
         *
         * @param {asSvg.Shape} pShape
         *
         * @memberOf DrawingController
         */
        DrawingController.prototype.onSelectShape = function (pShape) {
            var _this = this;
            this.mCurrentShape = pShape;
            this.mCurrentShape.element.onmousedown = function (pEvent) { return _this.onMouseDownShape(pEvent); };
            window.addEventListener("mouseup", function () { return _this.onMouseUpShape(); });
            document.getElementById("editShapeToolBar").style.display = "block";
            document.getElementById("imageTools").style.display = "none";
        };
        //___________________________________
        /**
         *
         *
         * @param {asSvg.ForeignObject} pText -Text Selected
         *
         * @memberOf DrawingController
         */
        DrawingController.prototype.onSelectText = function (pText) {
            var _this = this;
            this.mCurrentText = pText;
            document.getElementById("editTextToolBar").style.display = "block";
            this.mCurrentText.mInputElement.style.outline = "dashed black";
            document.getElementById("imageTools").style.display = "none";
            this.mCurrentText.element.onmousedown = function (pEvent) { return _this.onMouseDownText(pEvent); };
            window.addEventListener("mouseup", function () { return _this.onMouseUpText(); });
            // $(this.mCurrentText.mInputElement).on("focusout",()=> this.onDeselectText());
        };
        //______________________________________
        DrawingController.prototype.onDeselectShape = function () {
            var _this = this;
            document.getElementById("editShapeToolBar").style.display = "none";
            document.getElementById("imageTools").style.display = "block";
            this.mCurrentShape.stopDrag();
            this.mCurrentShape.element.onmousedown = null;
            window.removeEventListener("mouseup", function () { return _this.onMouseUpShape(); });
            this.onDeselect();
        };
        //________________________________________
        DrawingController.prototype.onDeselect = function () {
            for (var i = 0; i < image.Globals.mDrawingShapes.length; i++) {
                image.Globals.mDrawingShapes[i].alpha = 1;
            }
            for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                image.Globals.mTextArray[i].alpha = 1;
            }
            image.Globals.isItemSelected = false;
        };
        //____________________________________
        DrawingController.prototype.onDeselectText = function () {
            var _this = this;
            this.mCurrentText.mInputElement.style.outline = "none";
            document.getElementById("editTextToolBar").style.display = "none";
            document.getElementById("imageTools").style.display = "block";
            this.mCurrentText.stopDrag();
            this.mCurrentText.element.onmousedown = null;
            window.removeEventListener("mouseup", function () { return _this.onMouseUpText(); });
            this.onDeselect();
        };
        //______________________________________________
        DrawingController.prototype.onMouseDownShape = function (pEvent) {
            pEvent.preventDefault();
            pEvent.stopPropagation();
            this.mCurrentShape.startDrag();
        };
        //__________________________________
        DrawingController.prototype.onMouseDownText = function (pEvent) {
            image.Globals.isSelectDragMode = true;
            this.mCurrentText.startDrag();
        };
        //_______________________________________
        DrawingController.prototype.onMouseUpText = function () {
            image.Globals.isSelectDragMode = false;
            this.mCurrentText.stopDrag();
        };
        //____________________________________
        DrawingController.prototype.onMouseUpShape = function () {
            this.mCurrentShape.stopDrag();
        };
        return DrawingController;
    }());
    image.DrawingController = DrawingController;
})(image || (image = {}));
var image;
(function (image) {
    /**
     * Contains Global Variables
     *
     * @export
     * @class Globals
     */
    var Globals = (function () {
        function Globals() {
        }
        Object.defineProperty(Globals, "isDragMode", {
            get: function () {
                return (!Globals.isDrawMode && !Globals.isSelectDragMode);
            },
            enumerable: true,
            configurable: true
        });
        return Globals;
    }());
    Globals.isSelectMode = false;
    Globals.isDrawMode = false;
    Globals.isRotateMode = false;
    Globals.isTextMode = false;
    Globals.isSelectDragMode = false;
    Globals.isItemSelected = false;
    Globals.imgURL = "assets/img2000.JPG";
    Globals.isTest = false;
    Globals.isFullScreen = false;
    Globals.angle = 0;
    Globals.mDrawingShapes = new Array();
    Globals.mTextArray = new Array();
    image.Globals = Globals;
})(image || (image = {}));
/// <reference path="../../../scripts/jquery.d.ts" />
var image;
/// <reference path="../../../scripts/jquery.d.ts" />
(function (image) {
    /**
     *
     *
     * @export
     * @class ImageDrawing
     */
    var ImageDrawing = (function () {
        function ImageDrawing(pDiv) {
            var _this = this;
            this.fontSize = 25;
            this.mLineWidth = 6;
            this.mCurrentAngle = 0;
            this.mOriginalAngle = 0;
            this.mImageContainer = pDiv;
            var aDiv = document.createElement("div");
            aDiv.style.position = "absolute";
            pDiv.appendChild(aDiv);
            var aDivRect = pDiv.getBoundingClientRect();
            this.mOrginalContainerHeight = aDivRect.height;
            this.mOrginalContainerWidth = aDivRect.width;
            this.mSVGStage = asSvg.Stage.cretaeStage(aDiv, aDivRect.width, aDivRect.height);
            this.mRotationPanel = new asSvg.Sprite();
            this.mRotationPanel.x = aDivRect.width / 2;
            this.mRotationPanel.y = aDivRect.height / 2;
            this.mRotationPanel.instanceName = "Rotation Panel";
            this.mSVGStage.addChild(this.mRotationPanel);
            this.mSVGStage.activeMouseLocation();
            this.mMovePanel = new asSvg.Sprite();
            this.mMovePanel.instanceName = "Move Panel";
            this.mRotationPanel.addChild(this.mMovePanel);
            this.mSVGStage.element.onmousewheel = function (pEvent) { return _this.onMouseWheel(pEvent); };
            this.mDrawPanel = new asSvg.Sprite();
            //this.mMovePanel.addChild(this.mTextElement);
            this.mSVGStage.element.addEventListener("click", function (pEvent) { return _this.setTextPoint(pEvent); });
            this.mSVGStage.element.onmousedown = function (pEvent) { return _this.onMouseDown(pEvent); };
            this.mSVGStage.element.onmousemove = function (pEvent) { return _this.onMouseMove(pEvent); };
            window.onmouseup = function (pEvent) { return _this.onMouseUp(pEvent); };
            this.mDrawingController = new image.DrawingController();
        }
        //___________________________________________________
        /**
         *
         *
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.removeImage = function () {
            if (this.mImage) {
                this.mImage.destruct();
            }
            if (this.mDrawPanel) {
                this.mDrawPanel.destruct();
                this.mDrawPanel.removeChildren();
            }
            this.mMovePanel.removeChildren();
            this.mRotationPanel.removeChildren();
            this.mRotationPanel.rotation = 0;
            this.mMovePanel = new asSvg.Sprite();
            this.mMovePanel.instanceName = "Move Panel";
            this.mRotationPanel.addChild(this.mMovePanel);
        };
        //__________________________________________
        /**
         *
         * Sets Image in frame
         * @param {string} pURL- the image src
         * @param {number} [pAngle=0] -angle to rotate the image,in degrees
         * @param {number} [pScale=1]
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.setPicture = function (pURL, pAngle, pScale) {
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            this.removeImage();
            if (image.Globals.isTest) {
                this.setPictureTest(pURL, pAngle, pScale);
            }
            else {
                this.setPictureCanvas(pURL, pAngle, pScale);
            }
        };
        //_______________________________________
        ImageDrawing.prototype.setPictureTest = function (pURL, pAngle, pScale) {
            var _this = this;
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            this.mImage = new asSvg.Image(pURL, function (pData) { return _this.onImageLoadTest(pAngle, pScale); });
        };
        //_________________________________________________
        /**
         *
         *
         * @param {number} [pAngle=0]
         * @param {number} [pScale=1]
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.onImageLoadTest = function (pAngle, pScale) {
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            this.mOriginalAngle = pAngle;
            this.mCurrentAngle = pAngle;
            this.mOrginalScale = pScale;
            this.mImage.x = 100000;
            this.mSVGStage.addChild(this.mImage);
            var aImageRect = this.mImage.getBounds();
            this.mImgHeight = aImageRect.height;
            this.mImgWidth = aImageRect.width;
            this.getMinScale();
            this.mSVGStage.removeChild(this.mImage);
            this.mRotationPanel.setScale(this.minImgScale);
            this.mImgWidth = aImageRect.width;
            this.mImgHeight = aImageRect.height;
            this.mImage.x = -aImageRect.width / 2;
            this.mImage.y = -aImageRect.height / 2;
            this.mImage.instanceName = "image";
            this.mMovePanel.addChild(this.mImage);
            this.mDrawPanel.instanceName = "Draw Panel";
            this.mMovePanel.addChild(this.mDrawPanel);
            if (pAngle != 0) {
                this.rotate(pAngle);
            }
            if (this.mOrginalScale != 1) {
                this.scale(this.mOrginalScale);
            }
        };
        //__________________________________________
        ImageDrawing.prototype.setPictureCanvas = function (pURL, pAngle, pScale) {
            var _this = this;
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            this.mSourceImage = document.createElement("img");
            this.mSourceImage.src = pURL;
            this.mSourceImage.onload = function (pData) { return _this.onImageLoadCanvas(pAngle, pScale); };
        };
        //______________________________________________
        ImageDrawing.prototype.onImageLoadCanvas = function (pAngle, pScale) {
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            this.mOriginalAngle = pAngle;
            this.mCurrentAngle = pAngle;
            this.mOrginalScale = pScale;
            var aCanvas = document.createElement("canvas");
            ;
            aCanvas.width = this.mSourceImage.naturalWidth;
            aCanvas.height = this.mSourceImage.naturalHeight;
            var aContext = aCanvas.getContext("2d");
            aContext.drawImage(this.mSourceImage, 0, 0);
            var aDataURL = aCanvas.toDataURL();
            this.mImage = new asSvg.Image(null);
            this.mImage.setWidth(this.mSourceImage.naturalWidth);
            this.mImage.setHeight(this.mSourceImage.naturalHeight);
            this.mImage.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            this.mImage.setAttribute("xlink:href", aDataURL);
            ///this.mImage.x = 100000;
            //this.mSVGStage.addChild(this.mImage);
            //let aImageRect = this.mImage.getBounds();
            // this.mSVGStage.removeChild(this.mImage);
            this.mImgWidth = this.mSourceImage.naturalWidth;
            this.mImgHeight = this.mSourceImage.naturalHeight;
            this.getMinScale();
            this.mRotationPanel.setScale(this.minImgScale);
            this.mImage.x = -this.mSourceImage.naturalWidth / 2;
            this.mImage.y = -this.mSourceImage.naturalHeight / 2;
            this.mImage.instanceName = "image";
            this.mMovePanel.addChild(this.mImage);
            var aInnerHTML = this.mMovePanel.element.innerHTML;
            this.mMovePanel.element.innerHTML = "";
            this.mMovePanel.element.innerHTML = aInnerHTML;
            this.mDrawPanel.instanceName = "Draw Panel";
            this.mMovePanel.addChild(this.mDrawPanel);
            if (pAngle != 0) {
                this.rotate(pAngle);
            }
            if (this.mOrginalScale != 1) {
                this.scale(this.mOrginalScale);
            }
        };
        //_____________________________________
        ImageDrawing.prototype.getMinScale = function () {
            var aRect = this.mImageContainer.getBoundingClientRect();
            var aContainerWidth = aRect.width;
            var aContainerHeight = aRect.height;
            var aImgWidth = this.mImgWidth;
            var aImgHeight = this.mImgHeight;
            this.mHeightOriginalScale = aContainerHeight / aImgHeight;
            this.mWidthOriginalScale = aContainerWidth / aImgWidth;
            if (this.mHeightOriginalScale < this.mWidthOriginalScale) {
                this.mMinOriginalScale = this.mHeightOriginalScale;
            }
            else {
                this.mMinOriginalScale = this.mWidthOriginalScale;
            }
            this.mHeightTransformScale = aContainerHeight / aImgWidth;
            this.mWidthTransformScale = aContainerWidth / aImgHeight;
            if (this.mHeightTransformScale < this.mWidthTransformScale) {
                this.mMinTransformScale = this.mHeightTransformScale;
            }
            else {
                this.mMinTransformScale = this.mWidthTransformScale;
            }
        };
        //_________________________________
        /**
         *
         *
         * @param {number} pAngle -angle to rotate image
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.rotate = function (pAngle) {
            this.mRotationPanel.rotation = this.mRotationPanel.rotation + pAngle;
            this.mCurrentAngle = this.mRotationPanel.rotation;
            if (this.mRotationPanel.scaleX < this.minImgScale) {
                this.mRotationPanel.setScale(this.minImgScale);
                ImageDrawing.isZoomed = false;
            }
            if (ImageDrawing.SCALE_TO_MIN_AFTER_ROTATE) {
                if (!ImageDrawing.isZoomed) {
                    this.mRotationPanel.setScale(this.minImgScale);
                }
            }
            this.adjustTextPanelAfterRotation();
            this.setImageInBound();
        };
        //_____________________________________
        /**
         *
         *
         * @param {string} pColor -drawing color( in hex)
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.startDraw = function (pColor) {
            if (!image.Globals.isDrawMode) {
                image.Globals.isDrawMode = true;
                this.mDrawColor = pColor;
            }
            else {
                image.Globals.isDrawMode = false;
            }
        };
        //_________________________________________
        ImageDrawing.prototype.stopDraw = function () {
            image.Globals.isDrawMode = false;
        };
        //_____________________________________
        /**
         *
         *
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.clearAll = function () {
            this.mDrawPanel.removeChildren();
            image.Globals.mDrawingShapes = new Array();
            image.Globals.mTextArray = new Array();
        };
        //____________________________
        /**
         *
         *
         * @param {string} pColor
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.changeColor = function (pColor) {
            this.mDrawColor = pColor;
        };
        //_____________________________________
        /**
         *
         *
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.onSetText = function () {
            if (!image.Globals.isTextMode) {
                image.Globals.isTextMode = true;
            }
            else
                image.Globals.isTextMode = false;
        };
        //________________________________
        /**
         *
         *
         * @param {string} pText
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.setText = function () {
            var _this = this;
            this.stopDraw();
            var aTextElement = new asSvg.TextField();
            if (!image.Globals.mTextArray) {
                image.Globals.mTextArray = new Array();
            }
            aTextElement.setLineStyle(6 / this.mRotationPanel.scaleX);
            this.mDrawPanel.addChild(aTextElement);
            var aForeignObject = new asSvg.ForeignObject();
            aForeignObject.x = this.msetTextPoint.x;
            aForeignObject.y = this.msetTextPoint.y;
            aForeignObject.setWidth(100);
            aForeignObject.setHeight(50);
            this.mDrawPanel.addChild(aForeignObject);
            aForeignObject.mInputElement = document.createElement("input");
            aForeignObject.mInputElement.size = 1;
            //  $(aForeignObject.mInputElement).on("focusout", (pForeign) => this.onFocusOutText(aForeignObject, aForeignObject.mInputElement));
            $(aForeignObject.mInputElement).on("focusin", function (pEvent, pTextElement) { return _this.onSelectText(pEvent, aForeignObject); });
            aForeignObject.mInputElement.oninput = function (pInput) { return _this.expandTextBox(aForeignObject.mInputElement); };
            aForeignObject.mInputElement.type = "text";
            aForeignObject.mInputElement.className = "imageTextBox";
            aForeignObject.mInputElement.style.fontSize = this.fontSize / this.mRotationPanel.scaleX + "px";
            aForeignObject.mInputElement.style.color = this.mDrawColor;
            aForeignObject.textField = aTextElement;
            aForeignObject.textField.textElement.style.display = "none";
            aForeignObject.rotation = -this.mRotationPanel.rotation;
            // aForeignObject.mInputElement.setAttribute("outline","dashed black")
            aForeignObject.element.appendChild(aForeignObject.mInputElement);
            aForeignObject.mInputElement.focus();
            image.Globals.mTextArray.push(aForeignObject);
        };
        //___________________________
        ImageDrawing.prototype.createSVGText = function (pForeignObject, pInput) {
            pForeignObject.textField.textElement.style.display = "block";
            pForeignObject.textField.x = pForeignObject.x;
            pForeignObject.textField.y = pForeignObject.y;
            pForeignObject.textField.rotation = pForeignObject.rotation;
            pForeignObject.textField.text = pInput.value;
            pForeignObject.textField.fontSize = this.fontSize / this.mRotationPanel.scaleX;
            pForeignObject.textField.textElement.setAttribute("fill", pForeignObject.mInputElement.style.color);
            pForeignObject.textField.textElement.setAttribute("font-family", "Arial");
        };
        //________________________
        ImageDrawing.prototype.expandTextBox = function (pInput) {
            //  pInput.style.width = (pInput.value.length + 1) * (this.fontSize / this.mRotationPanel.scaleX ) +"px";
            pInput.size = pInput.value.length + 1;
        };
        //___________________________________________
        ImageDrawing.prototype.onMouseDown = function (pMouseEvent) {
            var _this = this;
            this.mMouseDown = true;
            if (image.Globals.isDragMode) {
                this.mMovePanel.startDrag(false, function () { return _this.setImageInBound(); });
                return;
            }
            var aShape = new asSvg.Shape();
            if (image.Globals.mDrawingShapes == null) {
                image.Globals.mDrawingShapes = new Array();
            }
            image.Globals.mDrawingShapes.push(aShape);
            this.mDrawPanel.addChild(aShape);
            aShape.setFill(null);
            aShape.setLineStyle(this.mLineWidth / this.mRotationPanel.scaleX, parseInt(this.mDrawColor));
            aShape.addEventListener("click", function (pShape) { return _this.onSelectShape(aShape); }, this);
            aShape.moveTo(this.mMovePanel.mouseX, this.mMovePanel.mouseY);
        };
        //__________________________________________
        ImageDrawing.prototype.setTextPoint = function (pMouseEvent) {
            if (image.Globals.isTextMode) {
                this.msetTextPoint = {};
                this.msetTextPoint.x = this.mMovePanel.mouseX;
                this.msetTextPoint.y = this.mMovePanel.mouseY;
                this.setText();
                image.Globals.isTextMode = false;
                this.mTextButton.classList.remove("active");
            }
        };
        //_____________________________________
        ImageDrawing.prototype.onMouseMove = function (pMouseEvent) {
            if (!this.mMouseDown) {
                return;
            }
            if (!image.Globals.isDragMode && image.Globals.isDrawMode) {
                var aCurrentShape = image.Globals.mDrawingShapes[image.Globals.mDrawingShapes.length - 1];
                aCurrentShape.element.setAttribute("stroke", this.mDrawColor);
                aCurrentShape.setLineStyle(this.mLineWidth / this.mRotationPanel.scaleX);
                aCurrentShape.lineTo(this.mMovePanel.mouseX, this.mMovePanel.mouseY);
            }
        };
        //_____________________________________
        ImageDrawing.prototype.setImageInBound = function () {
            if (this.isOriginalRatio) {
                this.setImageInBoundOriginal();
            }
            else {
                this.setImageInBoundTransform();
            }
        };
        //_____________________
        ImageDrawing.prototype.setImageInBoundOriginal = function () {
            var aX = this.mMovePanel.x;
            var aY = this.mMovePanel.y;
            var aImageRect = this.mMovePanel.getBounds();
            var aConRect = this.mImageContainer.getBoundingClientRect();
            if (this.mWidthOriginalScale >= this.mRotationPanel.scaleX) {
                this.mMovePanel.x = 0;
            }
            else {
                var aPanelWidth = this.mImgWidth * this.mRotationPanel.scaleX;
                var aMaxX = (aPanelWidth / 2 - aConRect.width / 2) / this.mRotationPanel.scaleX;
                console.log("aPanelWidth = " + aPanelWidth + " --- " + aImageRect.width);
                if (this.mMovePanel.x > aMaxX) {
                    this.mMovePanel.x = aMaxX;
                }
                if (this.mMovePanel.x < -aMaxX) {
                    this.mMovePanel.x = -aMaxX;
                }
            }
            if (this.mHeightOriginalScale >= this.mRotationPanel.scaleY) {
                this.mMovePanel.y = 0;
            }
            else {
                var aPanelHight = this.mImgHeight * this.mRotationPanel.scaleX;
                var aMaxY = (aPanelHight / 2 - aConRect.height / 2) / this.mRotationPanel.scaleX;
                console.log("aPanelWidth = " + aPanelHight + " --- " + aImageRect.height);
                if (this.mMovePanel.y > aMaxY) {
                    this.mMovePanel.y = aMaxY;
                }
                if (this.mMovePanel.y < -aMaxY) {
                    this.mMovePanel.y = -aMaxY;
                }
            }
        };
        //__________________________________________
        ImageDrawing.prototype.setImageInBoundTransform = function () {
            var aImageRect = this.mMovePanel.getBounds();
            var aConRect = this.mImageContainer.getBoundingClientRect();
            if (this.mWidthTransformScale >= this.mRotationPanel.scaleX) {
                this.mMovePanel.y = 0;
            }
            else {
                var aPanelWidth = this.mImgHeight * this.mRotationPanel.scaleX;
                var aMaxX = (aPanelWidth / 2 - aConRect.width / 2) / this.mRotationPanel.scaleX;
                console.log("aPanelWidth = " + aPanelWidth + " --- " + aImageRect.width);
                if (this.mMovePanel.y > aMaxX) {
                    this.mMovePanel.y = aMaxX;
                }
                if (this.mMovePanel.y < -aMaxX) {
                    this.mMovePanel.y = -aMaxX;
                }
            }
            if (this.mHeightTransformScale >= this.mRotationPanel.scaleY) {
                this.mMovePanel.x = 0;
            }
            else {
                var aPanelHight = this.mImgWidth * this.mRotationPanel.scaleX;
                var aMaxY = (aPanelHight / 2 - aConRect.height / 2) / this.mRotationPanel.scaleX;
                console.log("aPanelWidth = " + aPanelHight + " --- " + aImageRect.height);
                if (this.mMovePanel.x > aMaxY) {
                    this.mMovePanel.x = aMaxY;
                }
                if (this.mMovePanel.x < -aMaxY) {
                    this.mMovePanel.x = -aMaxY;
                }
            }
        };
        //_____________________________________
        ImageDrawing.prototype.onMouseUp = function (pMouseEvent) {
            this.mMouseDown = false;
            this.mMousePoint = null;
            this.mMovePanel.stopDrag();
        };
        //________________________________________
        ImageDrawing.prototype.onMouseWheel = function (e) {
            ImageDrawing.isZoomed = true;
            this.scale(e.wheelDelta / 10000 * this.mRotationPanel.scaleX);
        };
        //__________________________________
        ImageDrawing.prototype.scale = function (pVal) {
            var aNextScale = this.mRotationPanel.scaleX + pVal * this.mRotationPanel.scaleX * 2;
            if (aNextScale > this.minImgScale) {
                this.mRotationPanel.setScale(this.mRotationPanel.scaleX + pVal);
            }
            else {
                ImageDrawing.isZoomed = false;
                this.mRotationPanel.setScale(this.minImgScale);
            }
            this.setImageInBound();
            this.adjustDrawPanelAfterScale();
        };
        //___________________________________________
        ImageDrawing.prototype.adjustDrawPanelAfterScale = function () {
            for (var i = 0; i < image.Globals.mDrawingShapes.length; i++) {
                image.Globals.mDrawingShapes[i].setLineStyle(this.mLineWidth / this.mRotationPanel.scaleX);
            }
            if (ImageDrawing.FIX_TEXT_TO_ZOOM) {
                for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                    image.Globals.mTextArray[i].mInputElement.style.fontSize = this.fontSize / this.mRotationPanel.scaleX + "px";
                }
            }
        };
        //_____________________________________
        ImageDrawing.prototype.adjustTextPanelAfterRotation = function () {
            for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                image.Globals.mTextArray[i].rotation = -this.mRotationPanel.rotation;
                var aTemp = image.Globals.mTextArray[i].x;
                image.Globals.mTextArray[i].x = image.Globals.mTextArray[i].y;
                image.Globals.mTextArray[i].y = aTemp;
                image.Globals.mTextArray[i].textField.rotation = -this.mRotationPanel.rotation;
                var aTemp1 = image.Globals.mTextArray[i].textField.x;
                image.Globals.mTextArray[i].textField.x = image.Globals.mTextArray[i].textField.y;
                image.Globals.mTextArray[i].textField.y = aTemp1;
            }
        };
        //_________________________________________
        /**
         *
         *
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.select = function () {
            if (!image.Globals.isSelectMode) {
                image.Globals.isSelectMode = true;
            }
            else
                image.Globals.isSelectMode = false;
        };
        //__________________________________________
        ImageDrawing.prototype.onSelectShape = function (pShape) {
            if (image.Globals.isSelectMode && !image.Globals.isItemSelected) {
                for (var i = 0; i < image.Globals.mDrawingShapes.length; i++) {
                    if (image.Globals.mDrawingShapes[i] != pShape) {
                        image.Globals.mDrawingShapes[i].alpha = 0.5;
                    }
                }
                for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                    image.Globals.mTextArray[i].alpha = 0.5;
                }
                pShape.parent.addChild(pShape);
                image.Globals.isItemSelected = true;
                this.mDrawingController.onSelectShape(pShape);
            }
        };
        //____________________________________________
        ImageDrawing.prototype.onSelectText = function (pEvent, pText) {
            if (image.Globals.isSelectMode && !image.Globals.isItemSelected) {
                for (var i = 0; i < image.Globals.mDrawingShapes.length; i++) {
                    image.Globals.mDrawingShapes[i].alpha = 0.5;
                }
                for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                    if (image.Globals.mTextArray[i] != pText) {
                        image.Globals.mTextArray[i].alpha = 0.5;
                    }
                }
                image.Globals.isItemSelected = true;
                // pText.parent.addChild(pText);
                this.mDrawingController.onSelectText(pText);
            }
            else if (!image.Globals.isTextMode) {
                pEvent.preventDefault();
                pEvent.stopPropagation();
                $(pText.mInputElement).blur();
            }
            ;
        };
        Object.defineProperty(ImageDrawing.prototype, "minImgScale", {
            //___________________________________________
            /**
             *
             *
             * @readonly
             * @type {number}
             * @memberOf ImageDrawing
             */
            get: function () {
                if (this.isOriginalRatio) {
                    return this.mMinOriginalScale;
                }
                else {
                    return this.mMinTransformScale;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageDrawing.prototype, "isOriginalRatio", {
            //____________________________________________
            /**
             *
             *
             * @readonly
             * @type {boolean}
             * @memberOf ImageDrawing
             */
            get: function () {
                var aVal = this.mCurrentAngle % 36;
                return (aVal == 0);
            },
            enumerable: true,
            configurable: true
        });
        //_________________________________________________
        /**
         *
         *
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.convertInuptToSVG = function () {
            for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                // this.onFocusOutText()
                image.Globals.mTextArray[i].element.style.display = "none";
                this.createSVGText(image.Globals.mTextArray[i], image.Globals.mTextArray[i].mInputElement);
            }
        };
        //_______________________________________
        /**
         *
         *
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.convertSVGToInput = function () {
            for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                image.Globals.mTextArray[i].element.style.display = "block";
                image.Globals.mTextArray[i].textField.text = "";
            }
        };
        //_______________________________________
        /**
         *
         *
         * @param {boolean} pIsFullScreen-true:minimize,false:maximize
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.onFullScreen = function (pIsFullScreen) {
            if (!pIsFullScreen) {
                this.resizeStage(window.innerWidth, window.innerHeight);
            }
            else {
                this.resizeStage(this.mOrginalContainerWidth, this.mOrginalContainerHeight);
            }
        };
        /**
         *
         *
         * @param {number} pWidth
         * @param {number} pHeight
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.resizeStage = function (pWidth, pHeight) {
            this.mImageContainer.style.width = pWidth + "px";
            this.mImageContainer.style.height = pHeight + "px";
            this.mSVGStage.setSize(pWidth, pHeight);
            this.mRotationPanel.x = pWidth / 2;
            this.mRotationPanel.y = pHeight / 2;
            this.getMinScale();
            if (this.mRotationPanel.scaleX < this.minImgScale) {
                this.mRotationPanel.setScale(this.minImgScale);
            }
            this.setImageInBound();
        };
        //_____________________________
        /**
         *
         *
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.resetRotationAndScale = function () {
            this.mRotationPanel.rotation = 0;
            this.mCurrentAngle = this.mRotationPanel.rotation;
            if (this.mRotationPanel.scaleX < this.minImgScale) {
                this.mRotationPanel.setScale(this.minImgScale);
            }
            this.adjustTextPanelAfterRotation();
            this.setImageInBound();
            this.mRotationPanel.setScale(this.minImgScale);
            this.setImageInBound();
            this.adjustDrawPanelAfterScale();
        };
        Object.defineProperty(ImageDrawing.prototype, "fontsize", {
            //_______________________________________
            /**
             *
             *
             *
             * @memberOf ImageDrawing
             */
            set: function (pFontSize) {
                this.fontSize = pFontSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageDrawing.prototype, "lineWidth", {
            //__________________________________
            /**
             *
             *
             *
             * @memberOf ImageDrawing
             */
            set: function (pLineWidth) {
                this.mLineWidth = pLineWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageDrawing.prototype, "orginalScale", {
            //_____________________________
            /**
             *
             *
             *
             * @memberOf ImageDrawing
             */
            set: function (pScale) {
                this.mMinOriginalScale = pScale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageDrawing.prototype, "currentAngle", {
            //____________________________________
            /**
             *
             *
             *
             * @memberOf ImageDrawing
             */
            set: function (pAngle) {
                this.mCurrentAngle = pAngle;
            },
            enumerable: true,
            configurable: true
        });
        return ImageDrawing;
    }());
    ImageDrawing.FIX_TEXT_TO_ZOOM = true;
    ImageDrawing.SCALE_TO_MIN_AFTER_ROTATE = false;
    ImageDrawing.isZoomed = false;
    image.ImageDrawing = ImageDrawing;
})(image || (image = {}));
var image;
(function (image) {
    /**Class that manages saving and downloading of an image
     *
     *
     * @export
     * @class ImageSave
     */
    var ImageSave = (function () {
        function ImageSave(pImageDrawing) {
            this.mStage = pImageDrawing.mSVGStage;
            this.mImageDrawing = pImageDrawing;
        }
        //____________________________
        ImageSave.prototype.getImage = function () {
        };
        //________________________________________
        ImageSave.prototype.saveImage = function () {
        };
        //_____________________________________
        ImageSave.prototype.downloadImage = function (pImgData) {
            var aLink = document.createElement('a');
            var aId = "";
            aLink.target = '_blank';
            aLink.download = "TEST"; //pc.pcContext.currentLocation.name + "_marked" + aId;
            var blob = ImageSave.dataURLtoBlob(pImgData);
            var objurl = URL.createObjectURL(blob);
            aLink.href = objurl;
            // pc.pcContext.eventsLogs.sendEventLog(pc.data.eventsType.save);//logs
            aLink.click();
            //oc.Utils.debugHTMLElement(this.mCanvasToSave, 500);
            //var afile = pc2d.AttachmentUtils.dataURLtoFile(pImgData, pFileName + '.png');
            //return afile;
        };
        /**
         *
         *
         * @static
         * @param {any} dataurl
         * @returns
         *
         * @memberOf ImageSave
         */
        ImageSave.dataURLtoBlob = function (dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        };
        return ImageSave;
    }());
    image.ImageSave = ImageSave;
})(image || (image = {}));
/// <reference path="imagesave.ts" />
var image;
/// <reference path="imagesave.ts" />
(function (image) {
    /**
     * Class that manages saving and downloading of base64 image
     *
     * @export
     * @class ImageSaveCanvas
     * @extends {ImageSave}
     */
    var ImageSaveCanvas = (function (_super) {
        __extends(ImageSaveCanvas, _super);
        /**
         * Creates an instance of ImageSaveCanvas.
         * @param {any} pStage
         * @param {any} pImageDrawing
         *
         * @memberOf ImageSaveCanvas
         */
        function ImageSaveCanvas(pImageDrawing) {
            return _super.call(this, pImageDrawing) || this;
        }
        //____________________________
        /**
         *
         *
         *
         * @memberOf ImageSaveCanvas
         */
        ImageSaveCanvas.prototype.getImage = function () {
            var _this = this;
            this.mImageDrawing.convertInuptToSVG();
            this.mImage = this.mStage.getImage();
            this.mImage.onload = function () { return _this.saveImage(); };
        };
        //________________________________________
        ImageSaveCanvas.prototype.saveImage = function () {
            var aCanvas = document.createElement("canvas");
            ;
            aCanvas.width = this.mImage.naturalWidth;
            aCanvas.height = this.mImage.naturalHeight;
            var aContext = aCanvas.getContext("2d");
            aContext.drawImage(this.mImage, 0, 0);
            var aDataURL = aCanvas.toDataURL();
            this.downloadImage(aDataURL);
        };
        //_____________________________________
        ImageSaveCanvas.prototype.downloadImage = function (pImgData) {
            var aLink = document.createElement('a');
            var aId = "";
            aLink.target = '_blank';
            aLink.download = "TEST"; //pc.pcContext.currentLocation.name + "_marked" + aId;
            var blob = image.ImageSave.dataURLtoBlob(pImgData);
            var objurl = URL.createObjectURL(blob);
            aLink.href = objurl;
            // pc.pcContext.eventsLogs.sendEventLog(pc.data.eventsType.save);//logs
            aLink.click();
            //oc.Utils.debugHTMLElement(this.mCanvasToSave, 500);
            //var afile = pc2d.AttachmentUtils.dataURLtoFile(pImgData, pFileName + '.png');
            //return afile;
            this.mImageDrawing.convertSVGToInput();
        };
        ImageSaveCanvas.dataURLtoBlob = function (dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        };
        return ImageSaveCanvas;
    }(image.ImageSave));
    image.ImageSaveCanvas = ImageSaveCanvas;
})(image || (image = {}));
/// <reference path="imagesave.ts" />
var image;
/// <reference path="imagesave.ts" />
(function (image) {
    /**
     * Class that managaes downloading of images from URL
     *
     * @export
     * @class ImageSaveCombineCanvas
     * @extends {ImageSave}
     */
    var ImageSaveCombineCanvas = (function (_super) {
        __extends(ImageSaveCombineCanvas, _super);
        function ImageSaveCombineCanvas(pImageDrawing) {
            return _super.call(this, pImageDrawing) || this;
        }
        //____________________________________________________
        ImageSaveCombineCanvas.prototype.getImage = function () {
            var _this = this;
            this.mImageDrawing.convertInuptToSVG();
            //this.mImageDrawing.resetRotationAndScale();
            this.mImage = this.mStage.getImage();
            this.mImage.onload = function () { return _this.saveImage(); };
        };
        //____________________________________________________
        ImageSaveCombineCanvas.prototype.saveImage = function () {
            var _this = this;
            this.aImage = document.createElement("img");
            this.aImage.src = image.Globals.imgURL;
            this.aImage.onload = function () { return _this.onLoadImage(); };
        };
        //__________________________________________
        ImageSaveCombineCanvas.prototype.onLoadImage = function () {
            this.mCanvas = document.createElement("canvas");
            this.mCanvas.width = this.aImage.naturalWidth * this.mImageDrawing.mRotationPanel.scaleX;
            this.mCanvas.height = this.aImage.naturalHeight * this.mImageDrawing.mRotationPanel.scaleX;
            // this.aImage.width = this.aImage.naturalWidth * this.mImageDrawing.mRotationPanel.scaleX;
            //  this.aImage.height = this.aImage.naturalHeight * this.mImageDrawing.mRotationPanel.scaleX;
            //let aCanvas = this.combineImageAndCanvas(this.aImage, this.mCanvas);
            var aContext = this.mCanvas.getContext("2d");
            aContext.drawImage(this.aImage, 0, 0, this.aImage.naturalWidth * this.mImageDrawing.mRotationPanel.scaleX, this.aImage.naturalHeight * this.mImageDrawing.mRotationPanel.scaleX);
            //this.adjustCanvas();
            aContext.drawImage(this.mImage, (this.aImage.naturalWidth * this.mImageDrawing.mRotationPanel.scaleX - this.mImage.width) / 2, this.aImage.naturalHeight * this.mImageDrawing.mRotationPanel.scaleX - this.mImage.height);
            //scale image to orginal size,
            var aTempCanvas = document.createElement("canvas");
            var tctx = aTempCanvas.getContext("2d");
            aTempCanvas.width = this.mCanvas.width;
            aTempCanvas.height = this.mCanvas.height;
            tctx.drawImage(this.mCanvas, 0, 0);
            this.mCanvas.width /= this.mImageDrawing.minImgScale;
            this.mCanvas.height /= this.mImageDrawing.minImgScale;
            // aContext.drawImage(aTempCanvas, 0, 0, this.mCanvas.width this.mImageDrawing.mRotationPanel.scaleX, this.mCanvas.height * this.mImageDrawing.mRotationPanel.scaleX,);
            //  //rotate image 
            // let aTempCanvas2 = document.createElement("canvas");
            // aTempCanvas2.width = this.mCanvas.width;
            // aTempCanvas2.height = this.mCanvas.height;
            // let aCtx = aTempCanvas2.getContext("2d");
            // aCtx.translate(this.mCanvas.width / 2, this.mCanvas.height / 2);
            // aCtx.rotate(Math.PI );
            // aCtx.drawImage(this.mCanvas, -this.mCanvas.width / 2,- this.mCanvas.height / 2);
            // aCtx.rotate(-Math.PI );
            //aCtx.translate(-this.mCanvas.width / 2, - this.mCanvas.height / 2);
            //aContext.scale(1 / this.mImageDrawing.minImgScale, 1 / this.mImageDrawing.minImgScale);
            var aDataURL = this.mCanvas.toDataURL();
            this.downloadImage(aDataURL);
            this.mImageDrawing.convertSVGToInput();
        };
        //___________________________________________________________
        ImageSaveCombineCanvas.prototype.adjustCanvas = function () {
            this.mImage.width = this.mImage.width / this.mImageDrawing.minImgScale;
            this.mImage.height = this.mImage.height / this.mImageDrawing.minImgScale;
        };
        //_________________________________________
        ImageSaveCombineCanvas.prototype.combineImageAndCanvas = function (pImage, pDrawing) {
            var aCanvasToReturn;
            var aAngle = image.Globals.angle;
            var aScaleFactor = 1;
            var aImageRect = pImage.getBoundingClientRect();
            var aCanvasRect = pDrawing.getBoundingClientRect();
            var aAllImageWidth = pImage.naturalWidth;
            var aAllImageHeight = pImage.naturalHeight;
            aCanvasToReturn = document.createElement('canvas');
            var ctxToSave = aCanvasToReturn.getContext("2d");
            ctxToSave.save();
            var aMaxSize = 12000;
            var aScale;
            var aSize = Math.sqrt(aAllImageWidth * aAllImageWidth + aAllImageHeight * aAllImageHeight);
            if (aAngle == 0) {
                aScale = aImageRect.width / aAllImageWidth;
                if (aSize * aScale > aMaxSize) {
                    aScaleFactor = aMaxSize / (aSize * aScale);
                }
                aCanvasToReturn.width = aAllImageWidth * aScale * aScaleFactor;
                aCanvasToReturn.height = aAllImageHeight * aScale * aScaleFactor;
            }
            if (aAngle == 90) {
                aScale = aImageRect.width / aAllImageHeight;
                if (aSize * aScale > aMaxSize) {
                    aScaleFactor = aMaxSize / (aSize * aScale);
                }
                aCanvasToReturn.width = aAllImageHeight * aScale * aScaleFactor;
                aCanvasToReturn.height = aAllImageWidth * aScale * aScaleFactor;
                ctxToSave.rotate(aAngle * Math.PI / 180);
                ctxToSave.translate(0, -aAllImageHeight * aScale * aScaleFactor);
            }
            if (aAngle == 180) {
                aScale = aImageRect.width / aAllImageWidth;
                if (aSize * aScale > aMaxSize) {
                    aScaleFactor = aMaxSize / (aSize * aScale);
                }
                aCanvasToReturn.width = aAllImageWidth * aScale * aScaleFactor;
                aCanvasToReturn.height = aAllImageHeight * aScale * aScaleFactor;
                ctxToSave.rotate(aAngle * Math.PI / 180);
                ctxToSave.translate(-aAllImageWidth * aScale * aScaleFactor, -aAllImageHeight * aScale * aScaleFactor);
            }
            if (aAngle == 270) {
                aScale = aImageRect.width / aAllImageHeight;
                if (aSize * aScale > aMaxSize) {
                    aScaleFactor = aMaxSize / (aSize * aScale);
                }
                aCanvasToReturn.width = aAllImageHeight * aScale * aScaleFactor;
                aCanvasToReturn.height = aAllImageWidth * aScale * aScaleFactor;
                ctxToSave.rotate(aAngle * Math.PI / 180);
                ctxToSave.translate(-aAllImageWidth * aScale * aScaleFactor, 0);
            }
            ctxToSave.scale(aScale * aScaleFactor, aScale * aScaleFactor);
            ctxToSave.drawImage(pImage, 0, 0);
            ctxToSave.restore();
            ctxToSave.save();
            var aX = aCanvasRect.left - aImageRect.left;
            var aY = aCanvasRect.top - aImageRect.top;
            var aCanvasToSave2 = document.createElement('canvas');
            aCanvasToSave2.width = aCanvasToReturn.width;
            aCanvasToSave2.height = aCanvasToReturn.height;
            var ctxToSave2 = aCanvasToSave2.getContext("2d");
            ctxToSave2.drawImage(aCanvasToReturn, 0, 0);
            ctxToSave2.scale(aScaleFactor, aScaleFactor);
            ctxToSave2.drawImage(pDrawing, aX, aY);
            aCanvasToReturn = aCanvasToSave2;
            aX = (aX > 0) ? aX : 0;
            aY = (aY > 0) ? aY : 0;
            var aWidth = Math.min(aCanvasRect.width, aImageRect.width);
            var aHight = Math.min(aCanvasRect.height, aImageRect.height);
            aX *= aScaleFactor;
            aY *= aScaleFactor;
            aWidth *= aScaleFactor;
            aHight *= aScaleFactor;
            var aCanvasToSave3 = document.createElement('canvas');
            aCanvasToSave3.width = aWidth;
            aCanvasToSave3.height = aHight;
            var ctxToSave3 = aCanvasToSave3.getContext("2d");
            ctxToSave3.translate(-aX, -aY);
            ctxToSave3.drawImage(aCanvasToReturn, 0, 0);
            aCanvasToReturn = aCanvasToSave3;
            ////oc.Utils.debugHTMLElement(aCanvasToReturn, 400);
            return (aCanvasToReturn);
        };
        return ImageSaveCombineCanvas;
    }(image.ImageSave));
    image.ImageSaveCombineCanvas = ImageSaveCombineCanvas;
})(image || (image = {}));
//# sourceMappingURL=code.js.map