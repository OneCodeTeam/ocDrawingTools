var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            /**
             * Interpolate two points by a given measurement
             *
             * @static
             * @param {asBase.math.Point} pP1
             * @param {asBase.math.Point} pP2
             * @param {number} pVal
             * @returns {Point} -interpolated point
             *
             * @memberOf MathUtils
             */
            MathUtils.interpolate = function (pP1, pP2, pVal) {
                var aDx = (pP2.x - pP1.x) * pVal;
                var aDy = (pP2.y - pP1.y) * pVal;
                return (new asBase.math.Point(pP1.x + aDx, pP1.y + aDy));
            };
            //_____________________________________________________________________
            /**
             * Caculates the distance between 2 points
             *
             * @static
             * @param {asBase.math.Point} pP1 -point 1
             * @param {asBase.math.Point} pP2 -point 2
             * @returns {number} -caculated distance
             *
             * @memberOf MathUtils
             */
            MathUtils.distance = function (pP1, pP2) {
                var aDx = (pP1.x - pP2.x);
                var aDy = (pP1.y - pP2.y);
                return (Math.sqrt((aDx * aDx) + (aDy * aDy)));
            };
            //_____________________________________________________________________
            /**
             * Rotates a 2D point
             *
             * @static
             * @param {asBase.math.Point} pPoint -point to rotate
             * @param {number} pAngle -rotation angle
             * @returns {Point} -rotated point
             *
             * @memberOf MathUtils
             */
            MathUtils.rotatePoint = function (pPoint, pAngle) {
                var aRadAngle = pAngle * MathUtils.DEG_TO_RAD;
                var aX = pPoint.x * Math.cos(aRadAngle) - pPoint.y * Math.sin(aRadAngle);
                var aY = pPoint.x * Math.sin(aRadAngle) + pPoint.y * Math.cos(aRadAngle);
                return (new asBase.math.Point(aX, aY));
            };
            //_____________________________________________________________________
            /**
             * Checks if two rectangles are overlapping
             *
             * @static
             * @param {ClientRect} pRect1
             * @param {ClientRect} pRect2
             * @returns {boolean}
             *
             * @memberOf MathUtils
             */
            MathUtils.isRectOverlap = function (pRect1, pRect2) {
                return !(pRect2.left > pRect1.right ||
                    pRect2.right < pRect1.left ||
                    pRect2.top > pRect1.bottom ||
                    pRect2.bottom < pRect1.top);
            };
            //_____________________________________________________________________
            /**
             * Combines two rectangles together
             *
             * @static
             * @param {ClientRect} pBaseRect -Base rectangle
             * @param {ClientRect} pWithRect -rectangle to add to base rectangle
             * @returns {ClientRect} -combined rectangle
             *
             * @memberOf MathUtils
             */
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
            /**
             * Creates an instance of Matrix.
             *
             * @memberOf Matrix
             */
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
            /**
             * Rotate the matrix
             *
             * @param {any} pAngle -rotation angle
             * @returns {Matrix} -rotated matrix
             *
             * @memberOf Matrix
             */
            Matrix.prototype.rotate = function (pAngle) {
                var cos = Math.cos(pAngle), sin = Math.sin(pAngle);
                return this.transform(cos, sin, -sin, cos, 0, 0);
            };
            ;
            //____________________________________________________
            /**
             * Divide the matrix by a scalar
             *
             * @param {number} pScalar - scalar
             *
             * @memberOf Matrix
             */
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
            /**
             * Multiply the matrix with another matrix
             *
             * @param {Matrix} pMatrix -matrix to multiply with
             * @returns {Matrix} -multplied matrix
             *
             * @memberOf Matrix
             */
            Matrix.prototype.multiply = function (pMatrix) {
                return (this.transform(pMatrix.a, pMatrix.b, pMatrix.c, pMatrix.d, pMatrix.e, pMatrix.f));
            };
            //____________________________________________________
            /**
             * Inverse the matrix
             *
             * @returns {Matrix} -inversed matrix
             *
             * @memberOf Matrix
             */
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
            /**
             * Interpolates two matrix with a given value
             *
             * @param {Matrix} pMatrix -matrix to interpolate with
             * @param {any} pT
             * @returns {Matrix} -interpolated matrix
             *
             * @memberOf Matrix
             */
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
            /**
             * Creates an instance of Point.
             * @param {number} [iX=0]
             * @param {number} [iY=0]
             *
             * @memberOf Point
             */
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
            /**
             * Subtracts two points
             *
             * @param {Point} p -point to subtract from this point
             * @returns {Point}
             *
             * @memberOf Point
             */
            Point.prototype.subtract = function (p) {
                return (new Point(this.x - p.x, this.y - p.y));
            };
            //________________________________________________________________
            /**
             * Adds two points
             *
             * @param {Point} p -point to add
             * @returns {Point} - the sum of two points
             *
             * @memberOf Point
             */
            Point.prototype.add = function (p) {
                return (new Point(this.x + p.x, this.y + p.y));
            };
            //________________________________________________________________
            /**
             *
             *
             * @static
             * @param {Point} p1
             * @param {Point} p2
             * @param {number} pFrac
             * @returns {Point}
             *
             * @memberOf Point
             */
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
            /**
             * Creates an instance of Rectangle.
             * @param {ClientRect} [pClientRect]
             *
             * @memberOf Rectangle
             */
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
            /**
             * Checks is a point intersects with this rectangle
             *
             * @param {any} pX
             * @param {any} pY
             * @returns {boolean}
             *
             * @memberOf Rectangle
             */
            Rectangle.prototype.intersectsPoint = function (pX, pY) {
                return !((pX < this.left) || (pX > this.right) || (pY < this.top) || (pY > this.bottom));
            };
            //____________________________________
            /**
             * Checks if a rectangle intersects with this rectangle
             *
             * @param {Rectangle} pRectB -rectangle to check
             * @returns {boolean}
             *
             * @memberOf Rectangle
             */
            Rectangle.prototype.intersects = function (pRectB) {
                return !(pRectB.left > this.right ||
                    pRectB.right < this.left ||
                    pRectB.top > this.bottom ||
                    pRectB.bottom < this.top);
            };
            //____________________________________
            /**
             * Chekks if two rectangles intersects
             *
             * @static
             * @param {ClientRect} pRectA
             * @param {ClientRect} pRectB
             * @returns {boolean}
             *
             * @memberOf Rectangle
             */
            Rectangle.intersectRect = function (pRectA, pRectB) {
                return !(pRectB.left > pRectA.right ||
                    pRectB.right < pRectA.left ||
                    pRectB.top > pRectA.bottom ||
                    pRectB.bottom < pRectA.top);
            };
            //____________________________________
            /**
             * Checks if a rectangle and a point intersect
             *
             * @static
             * @param {ClientRect} pRectA
             * @param {number} iX
             * @param {number} iY
             * @returns {boolean}
             *
             * @memberOf Rectangle
             */
            Rectangle.intersectPoint = function (pRectA, iX, iY) {
                return !(pRectA.left > iX ||
                    pRectA.right < iX ||
                    pRectA.top > iY ||
                    pRectA.bottom < iY);
            };
            //____________________________________
            /**
             * Creates an instance of Rectangle
             *
             * @static
             * @param {number} iX
             * @param {number} iY
             * @param {number} iWidth
             * @param {number} iHeight
             * @returns {Rectangle}
             *
             * @memberOf Rectangle
             */
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
     * @module asSvg
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
                    //this.mMatrix.setTransform(this.mScaleX, 0,0, this.mScaleY, this.mX, this.mY);
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
            var _this = _super.call(this) || this;
            _this.mOldValue = "";
            return _this;
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
        //_____________________
        ForeignObject.prototype.clone = function () {
            var aRet = new ForeignObject();
            aRet.mElement = this.mElement.cloneNode();
            aRet.mInputElement = this.mInputElement.cloneNode();
            aRet.textField = this.mTextField.clone();
            aRet.x = this.x;
            aRet.y = this.y;
            aRet.rotation = this.rotation;
            aRet.scaleX = this.scaleX;
            aRet.scaleY = this.scaleY;
            return aRet;
        };
        Object.defineProperty(ForeignObject.prototype, "oldValue", {
            //________________________
            get: function () {
                return this.mOldValue;
            },
            //_______________________
            set: function (pVal) {
                this.mOldValue = pVal;
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
            this.mPath = pPath;
            this.mElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', pPath);
        };
        Image.prototype.getPath = function () {
            return this.mPath;
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
        //_______________________
        TextField.prototype.clone = function () {
            var aRet = new TextField();
            aRet.mElement = this.mElement.cloneNode(true);
            aRet.mTextElement = this.mTextElement.cloneNode();
            aRet.x = this.x;
            aRet.y = this.y;
            aRet.rotation = this.rotation;
            aRet.scaleX = this.scaleX;
            aRet.scaleY = this.scaleY;
            return aRet;
        };
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
var action;
(function (action) {
    /**
     * Class repsenting an action -when the user changes a shape's color
     *
     * @export
     * @class ColorAction
     * @implements {IAction}
     */
    var ColorAction = (function () {
        /**
         * Creates an instance of ColorAction.
         * @param {any} pOldColor- -Color before change
         * @param {any} pNewColor -Color after change
         * @param {any} pObject -Object whose color was changes
         *
         * @memberOf ColorAction
         */
        function ColorAction(pOldColor, pNewColor, pObject) {
            this.mOldColor = pOldColor;
            this.mNewColor = pNewColor;
            this.mObject = pObject;
        }
        //__________________________________________
        ColorAction.prototype.redo = function () {
            this.mObject.changeShapeColor(this.mNewColor);
        };
        //___________________________________________
        ColorAction.prototype.undo = function () {
            this.mObject.changeShapeColor(this.mOldColor);
        };
        return ColorAction;
    }());
    action.ColorAction = ColorAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class repsenting an action- when the user changes the color of a text
     *
     * @export
     * @class ColorTextAction
     * @implements {IAction}
     */
    var ColorTextAction = (function () {
        /**
         * Creates an instance of ColorTextAction.
         * @param {asSvg.ForeignObject} pTextField -Text Object whose color was  changed
         * @param {any} pOlDColor -color before change
         * @param {any} pNewColor -color after change
         *
         * @memberOf ColorTextAction
         */
        function ColorTextAction(pTextField, pOlDColor, pNewColor) {
            this.mTextField = pTextField;
            this.mOldColor = pOlDColor;
            this.mNewColor = pNewColor;
        }
        //____________________________
        ColorTextAction.prototype.redo = function () {
            this.mTextField.mInputElement.style.color = this.mNewColor;
        };
        //______________________
        ColorTextAction.prototype.undo = function () {
            this.mTextField.mInputElement.style.color = this.mOldColor;
        };
        return ColorTextAction;
    }());
    action.ColorTextAction = ColorTextAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a crop image action by the user
     *
     * @export
     * @class CropAction
     */
    var CropAction = (function () {
        /**
         * Creates an instance of CropAction.
         * @param {string} pOldSrc -Image Source before crop
         * @param {string} pNewSrc -Image Source after crop
         * @param {Function} pCropCallBack - Callback to re/undo crop
         * @param {number} [pAngle=0] -Angle of image after crop
         * @param {number} [pOldAngle=0] -Angle of image before crop
         * @param {number} [pOldScale=1] -Scale of image before crop
         * @param {number} [pOldX=0] -X position of image before crop
         * @param {number} [pOldY=0] -Y position of image before crop
         *
         * @memberOf CropAction
         */
        function CropAction(pOldSrc, pNewSrc, pCropCallBack, pAngle, pOldAngle, pOldScale, pOldX, pOldY) {
            if (pAngle === void 0) { pAngle = 0; }
            if (pOldAngle === void 0) { pOldAngle = 0; }
            if (pOldScale === void 0) { pOldScale = 1; }
            if (pOldX === void 0) { pOldX = 0; }
            if (pOldY === void 0) { pOldY = 0; }
            this.mOldSrc = pOldSrc;
            this.mNewSrc = pNewSrc;
            this.mCropCallBack = pCropCallBack;
            this.mAngle = pAngle;
            this.mOldAngle = pOldAngle;
            this.mOldScale = pOldScale;
            this.mOldX = pOldX;
            this.mOldY = pOldY;
            this.mDrawObjects = new Array();
            for (var i = 0; i < image.Globals.mCircles.length; i++) {
                this.mDrawObjects.push(image.Globals.mCircles[i].clone());
                if (!this.mDrawPanel) {
                    this.mDrawPanel = image.Globals.mCircles[0].parent;
                }
            }
            this.mTextObjects = new Array();
            for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                this.mTextObjects.push(image.Globals.mTextArray[i].clone());
                if (!this.mDrawPanel) {
                    this.mDrawPanel = image.Globals.mTextArray[0].parent;
                }
            }
        }
        //____________________________________________
        CropAction.prototype.redo = function () {
            image.Globals.cropCounter++;
            this.mCropCallBack(this.mNewSrc, this.mAngle, 1, null);
        };
        //__________________________________________
        CropAction.prototype.undo = function () {
            image.Globals.cropCounter--;
            this.mCropCallBack(this.mOldSrc, this.mOldAngle, this.mOldScale, this.mDrawObjects, this.mTextObjects, this.mOldX, this.mOldY);
        };
        return CropAction;
    }());
    action.CropAction = CropAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a delete text action
     *
     * @export
     * @class DeleteTextAction
     * @implements {IAction}
     */
    var DeleteTextAction = (function () {
        /**
         * Creates an instance of DeleteTextAction.
         * @param {asSvg.ForeignObject} pTextField -Text object deleted
         *
         * @memberOf DeleteTextAction
         */
        function DeleteTextAction(pTextField) {
            this.mSprite = pTextField.parent;
            this.mTextField = pTextField;
        }
        //_____________________________
        DeleteTextAction.prototype.redo = function () {
            image.Globals.mTextArray.splice(image.Globals.mTextArray.indexOf(this.mTextField, 1));
            this.mTextField.destruct();
        };
        //_______________________
        DeleteTextAction.prototype.undo = function () {
            image.Globals.mTextArray.push(this.mTextField);
            this.mSprite.addChild(this.mTextField);
        };
        return DeleteTextAction;
    }());
    action.DeleteTextAction = DeleteTextAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a drag sprite user action
     *
     * @export
     * @class DragAction
     * @implements {IAction}
     */
    var DragAction = (function () {
        /**
         * Creates an instance of DragAction.
         * @param {asBase.math.Point} pOldPostion -Old position of sprite
         * @param {asSvg.Sprite} pMovePanel -Sprite that was moved
         * @param {Function} pBoundaryCallBack -Callback to check boundaries
         *
         * @memberOf DragAction
         */
        function DragAction(pOldPostion, pMovePanel, pBoundaryCallBack) {
            this.mIsAdded = false;
            this.mOldPosition = pOldPostion;
            this.mMovePanel = pMovePanel;
            this.mBoundaryCallBack = pBoundaryCallBack;
        }
        //__________________________
        DragAction.prototype.redo = function () {
            this.mMovePanel.x = this.mNewPosition.x;
            this.mMovePanel.y = this.mNewPosition.y;
            this.mBoundaryCallBack();
        };
        //___________________________
        DragAction.prototype.undo = function () {
            this.mMovePanel.x = this.mOldPosition.x;
            this.mMovePanel.y = this.mOldPosition.y;
            this.mBoundaryCallBack();
        };
        Object.defineProperty(DragAction.prototype, "newPosition", {
            //______________________________________________
            set: function (pNewPosition) {
                this.mNewPosition = pNewPosition;
                this.mIsAdded = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragAction.prototype, "isAdded", {
            //______________________________________________
            get: function () {
                return this.mIsAdded;
            },
            enumerable: true,
            configurable: true
        });
        return DragAction;
    }());
    action.DragAction = DragAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a drag shape user action
     *
     * @export
     * @class DragShapeAction
     * @implements {IAction}
     */
    var DragShapeAction = (function () {
        /**
         * Creates an instance of DragShapeAction.
         * @param {any} pOldPosition -Old posiiton of shape
         * @param {shapes.Shape} pShape -Shape whose position was changed
         *
         * @memberOf DragShapeAction
         */
        function DragShapeAction(pOldPosition, pShape) {
            this.mIsAdded = false;
            this.mOldPosition = pOldPosition;
            this.mShape = pShape;
        }
        //________________________________________
        DragShapeAction.prototype.redo = function () {
            this.mShape.moveShape(this.mNewPosition);
        };
        //_________________________________________
        DragShapeAction.prototype.undo = function () {
            this.mShape.moveShape(this.mOldPosition);
        };
        Object.defineProperty(DragShapeAction.prototype, "newPosition", {
            //_________________________________________
            set: function (pNewPosition) {
                this.mNewPosition = pNewPosition;
                this.mIsAdded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragShapeAction.prototype, "isAdded", {
            //__________________________________________
            get: function () {
                return this.mIsAdded;
            },
            enumerable: true,
            configurable: true
        });
        return DragShapeAction;
    }());
    action.DragShapeAction = DragShapeAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a drag text user action
     *
     * @export
     * @class DragTextAction
     * @implements {IAction}
     */
    var DragTextAction = (function () {
        /**
         * Creates an instance of DragTextAction.
         * @param {asSvg.ForeignObject} pTextField -Text Object whose position was changed
         * @param {asBase.math.Point} pOldPosition -Old position of text object
         *
         * @memberOf DragTextAction
         */
        function DragTextAction(pTextField, pOldPosition) {
            this.mIsAdded = false;
            this.mTextField = pTextField;
            this.mOldPosition = pOldPosition;
        }
        //______________________________
        DragTextAction.prototype.redo = function () {
            this.mTextField.x = this.mNewPosition.x;
            this.mTextField.y = this.mNewPosition.y;
        };
        //__________________
        DragTextAction.prototype.undo = function () {
            this.mTextField.x = this.mOldPosition.x;
            this.mTextField.y = this.mOldPosition.y;
        };
        Object.defineProperty(DragTextAction.prototype, "newPosition", {
            //_______________________
            set: function (pNewPosition) {
                this.mNewPosition = pNewPosition;
                this.mIsAdded = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragTextAction.prototype, "isAdded", {
            //________________________
            get: function () {
                return this.mIsAdded;
            },
            enumerable: true,
            configurable: true
        });
        return DragTextAction;
    }());
    action.DragTextAction = DragTextAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a draw shape user action
     *
     * @export
     * @class DrawAction
     * @implements {IAction}
     */
    var DrawAction = (function () {
        /**
         * Creates an instance of DrawAction.
         * @param {asSvg.Sprite} pDrawPanel -Sprite that shape was drawn on
         * @param {shapes.Shape} pShape -Shape Object that was drawn
         *
         * @memberOf DrawAction
         */
        function DrawAction(pDrawPanel, pShape) {
            this.mDrawPanel = pDrawPanel;
            this.mShape = pShape;
        }
        //_______________________________________________
        DrawAction.prototype.redo = function () {
            image.Globals.mCircles.push(this.mShape);
            this.mShape.addToSprite(this.mDrawPanel);
        };
        //__________________________________________
        DrawAction.prototype.undo = function () {
            image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this.mShape, 1));
            this.mShape.deleteShape();
        };
        return DrawAction;
    }());
    action.DrawAction = DrawAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a delete shape action
     *
     * @export
     * @class DeleteAction
     * @implements {IAction}
     */
    var DeleteAction = (function () {
        /**
         * Creates an instance of DeleteAction.
         * @param {shapes.Shape} pObject -Shape dleted
         *
         * @memberOf DeleteAction
         */
        function DeleteAction(pObject) {
            this.mObject = pObject;
            this.mParent = pObject.parent;
        }
        //____________________________________________
        DeleteAction.prototype.redo = function () {
            if (this.mObject.myClassName == "Arrow" || "Circle" || "Shape" || "Scribble") {
                this.mObject.deleteShape();
                var aIndex = image.Globals.mCircles.indexOf(this.mObject);
                image.Globals.mCircles.splice(aIndex, 1);
            }
            else {
                this.mObject.destruct();
                var aIndex = image.Globals.mTextArray.indexOf(this.mObject);
                image.Globals.mTextArray.splice(aIndex, 1);
            }
        };
        //_________________________________________________
        DeleteAction.prototype.undo = function () {
            if (this.mObject.myClassName == "Shape") {
                image.Globals.mCircles.push(this.mObject);
                this.mObject.addToSprite(this.mParent);
            }
            else {
                image.Globals.mTextArray.push(this.mObject);
                this.mParent.addChild(this.mObject);
            }
        };
        return DeleteAction;
    }());
    action.DeleteAction = DeleteAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing an action that the user changed the text onject's input
     *
     * @export
     * @class editTextAction
     * @implements {IAction}
     */
    var editTextAction = (function () {
        /**
         * Creates an instance of editTextAction.
         * @param {asSvg.ForeignObject} pTextField -Text Object whose value was changed
         * @param {string} pOldValue -Value of text object before its value was changed
         *
         * @memberOf editTextAction
         */
        function editTextAction(pTextField, pOldValue) {
            this.mIsAdded = false;
            this.mTextField = pTextField;
            this.mOldValue = pOldValue;
        }
        //___________________________
        editTextAction.prototype.redo = function () {
            this.mTextField.mInputElement.value = this.mNewValue;
        };
        //_______________________
        editTextAction.prototype.undo = function () {
            this.mTextField.mInputElement.value = this.mOldValue;
        };
        Object.defineProperty(editTextAction.prototype, "newValue", {
            //______________________________
            /**
             * @param {string} pNewValue-value of text after change
             *
             *
             * @memberOf editTextAction
             */
            set: function (pNewValue) {
                this.mNewValue = pNewValue;
                this.mIsAdded = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(editTextAction.prototype, "isAdded", {
            //__________________
            get: function () {
                return this.mIsAdded;
            },
            enumerable: true,
            configurable: true
        });
        return editTextAction;
    }());
    action.editTextAction = editTextAction;
})(action || (action = {}));
var action;
(function (action_1) {
    /**
     * Class that implements a redo/unod flow
     *
     * @export
     * @class ActionManager
     */
    var ActionManager = (function () {
        /**
         * Creates an instance of ActionManager.
         *
         * @memberOf ActionManager
         */
        function ActionManager() {
            this.mUndoArray = new Array();
        }
        //_______________________________________________
        /**
         * Redos the last user action undone
         *
         *
         * @memberOf ActionManager
         */
        ActionManager.prototype.redo = function () {
            if (this.mRedoArray.length > 0) {
                var action_2 = this.mRedoArray.pop();
                action_2.redo();
                this.mUndoArray.push(action_2);
            }
        };
        //______________________________________
        /**
         * Undos the last user action
         *
         *
         * @memberOf ActionManager
         */
        ActionManager.prototype.undo = function () {
            if (this.mUndoArray.length > 0) {
                var action_3 = this.mUndoArray.pop();
                action_3.undo();
                this.mRedoArray.push(action_3);
            }
        };
        //_____________________________
        /**
         * Adds a user action
         *
         * @param {IAction} pAction -User Action to add
         *
         * @memberOf ActionManager
         */
        ActionManager.prototype.addAction = function (pAction) {
            this.mRedoArray = new Array();
            this.mUndoArray.push(pAction);
        };
        return ActionManager;
    }());
    action_1.ActionManager = ActionManager;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class reprseting a clear all shapes and text action
     *
     * @export
     * @class ClearAllAction
     * @implements {IAction}
     */
    var ClearAllAction = (function () {
        /**
         * Creates an instance of ClearAllAction.
         * @param {any} pSprite -SVG sprite that the shapes were cleared from
         *
         * @memberOf ClearAllAction
         */
        function ClearAllAction(pSprite) {
            this.mShapes = new Array();
            this.mTextFields = new Array();
            for (var i = 0; i < image.Globals.mCircles.length; i++) {
                this.mShapes.push(image.Globals.mCircles[i].clone());
            }
            for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                this.mTextFields.push(image.Globals.mTextArray[i].clone());
            }
            this.mSprite = pSprite;
        }
        //__________________________________
        ClearAllAction.prototype.redo = function () {
            this.mSprite.removeChildren();
            image.Globals.mCircles = new Array();
            image.Globals.mTextArray = new Array();
        };
        //_________________________________
        ClearAllAction.prototype.undo = function () {
            image.Globals.mCircles = this.mShapes;
            image.Globals.mTextArray = this.mTextFields;
            for (var i = 0; i < image.Globals.mCircles.length; i++) {
                image.Globals.mCircles[i].addToSprite(this.mSprite);
            }
            for (var i = 0; i < image.Globals.mTextArray.length; i++) {
                this.mSprite.addChild(image.Globals.mTextArray[i]);
            }
        };
        return ClearAllAction;
    }());
    action.ClearAllAction = ClearAllAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a rotate sprite action
     *
     * @export
     * @class RotateAction
     * @implements {IAction}
     */
    var RotateAction = (function () {
        /**
         * Creates an instance of RotateAction.
         * @param {any} pOldAngle -Angle of sprite before rotation
         * @param {any} pNewAngle -Angle of sprite after rotation
         * @param {Function} pRotationCallBack -Function to rotate sprite
         *
         * @memberOf RotateAction
         */
        function RotateAction(pOldAngle, pNewAngle, pRotationCallBack) {
            this.mOldAngle = pOldAngle;
            this.mNewAngle = pNewAngle;
            this.mRotationFunc = pRotationCallBack;
        }
        //______________________________________________
        RotateAction.prototype.undo = function () {
            this.mRotationFunc(this.mOldAngle);
        };
        //______________________________________________
        RotateAction.prototype.redo = function () {
            this.mRotationFunc(this.mNewAngle);
        };
        return RotateAction;
    }());
    action.RotateAction = RotateAction;
})(action || (action = {}));
var action;
(function (action) {
    var TextAction = (function () {
        /**
         * Creates an instance of TextAction.
         * @param {asSvg.Sprite} pDrawPanel -Sprite text was added to
         * @param {asSvg.ForeignObject} pTextField -Text object added
         *
         * @memberOf TextAction
         */
        function TextAction(pDrawPanel, pTextField) {
            this.mSprite = pDrawPanel;
            this.mTextField = pTextField;
        }
        //___________________________________
        TextAction.prototype.redo = function () {
            image.Globals.mTextArray.push(this.mTextField);
            this.mSprite.addChild(this.mTextField);
        };
        //________________________________________
        TextAction.prototype.undo = function () {
            image.Globals.mTextArray.splice(image.Globals.mTextArray.indexOf(this.mTextField, 1));
            this.mTextField.destruct();
        };
        return TextAction;
    }());
    action.TextAction = TextAction;
})(action || (action = {}));
var action;
(function (action) {
    /**
     * Class representing a zoom action
     *
     * @export
     * @class ZoomAction
     * @implements {IAction}
     */
    var ZoomAction = (function () {
        /**
         * Creates an instance of ZoomAction.
         * @param {number} pOldScale -Scale before zoom
         * @param {number} pNewScale -Scale after zoom
         * @param {Function} pScaleCallBack -Callback that re/undos the zoom
         *
         * @memberOf ZoomAction
         */
        function ZoomAction(pOldScale, pNewScale, pScaleCallBack) {
            this.mOldScale = pOldScale;
            this.mNewScale = pNewScale;
            this.mScaleCallBack = pScaleCallBack;
        }
        //____________________________
        ZoomAction.prototype.redo = function () {
            this.mScaleCallBack(this.mNewScale);
        };
        //____________________________
        ZoomAction.prototype.undo = function () {
            this.mScaleCallBack(this.mOldScale);
        };
        Object.defineProperty(ZoomAction.prototype, "scale", {
            //_____________________________
            set: function (pVal) {
                this.mNewScale += pVal;
                this.mOldScale -= pVal;
            },
            enumerable: true,
            configurable: true
        });
        return ZoomAction;
    }());
    action.ZoomAction = ZoomAction;
})(action || (action = {}));
var image;
(function (image_1) {
    /**
     * Class that controls each drawing item(text/shape)
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
            var aAction = new action.DeleteAction(this.mCurrentShape);
            image_1.Globals.ActionManager.addAction(aAction);
            this.mCurrentShape.deleteShape();
            var aIndex = image_1.Globals.mCircles.indexOf(this.mCurrentShape);
            image_1.Globals.mCircles.splice(aIndex, 1);
            this.onDeselectShape();
        };
        //_________________________________________
        DrawingController.prototype.deleteText = function () {
            var aAction = new action.DeleteTextAction(this.mCurrentText);
            image_1.Globals.ActionManager.addAction(aAction);
            this.mCurrentText.destruct();
            var aIndex = image_1.Globals.mTextArray.indexOf(this.mCurrentText);
            image_1.Globals.mTextArray.splice(aIndex, 1);
            this.onDeselectText();
        };
        //_______________________________________
        DrawingController.prototype.changeShapeColor = function () {
            var aColor = document.getElementById("editColor").value;
            var aAction = new action.ColorAction(this.mCurrentShape.color, aColor, this.mCurrentShape);
            image_1.Globals.ActionManager.addAction(aAction);
            this.mCurrentShape.changeShapeColor(aColor);
        };
        //_________________________________________
        DrawingController.prototype.changeTextColor = function () {
            var aColor = document.getElementById("editTextColor").value;
            var aAction = new action.ColorTextAction(this.mCurrentText, this.mCurrentText.mInputElement.style.color, aColor);
            image_1.Globals.ActionManager.addAction(aAction);
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
        //_______________________________
        DrawingController.prototype.onSelectShape = function (pShape) {
            var _this = this;
            this.mCurrentShape = pShape;
            document.getElementById("editShapeToolBar").style.display = "block";
            document.getElementById("imageTools").style.display = "none";
            this.mCurrentShape.addMouseEvents(function (pEvent) { return _this.onMouseDownShape(pEvent); });
            $(window).bind("mouseup", function (event) { return _this.onMouseUpShape(event); });
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
            this.mCurrentShape.onDeselect();
            this.mCurrentShape.removeMouseEvents();
            this.mCurrentShape = null;
            $(window).unbind("mouseup", function (event) { return _this.onMouseUpShape(event); });
        };
        //________________________________________
        DrawingController.prototype.onDeselectText = function () {
            var _this = this;
            image_1.Globals.isItemSelected = false;
            this.mLastGoodTextX = null;
            this.mLastGoodTextY = null;
            this.mCurrentText.mInputElement.style.outline = "none";
            document.getElementById("editTextToolBar").style.display = "none";
            document.getElementById("imageTools").style.display = "block";
            this.mCurrentText.stopDrag();
            this.mCurrentText.element.onmousedown = null;
            window.removeEventListener("mouseup", function () { return _this.onMouseUpText(); });
        };
        //__________________________________
        DrawingController.prototype.onMouseDownText = function (pEvent) {
            var _this = this;
            image_1.Globals.isSelectDragMode = true;
            var aPoint = new asBase.math.Point(this.mCurrentText.x, this.mCurrentText.y);
            image_1.Globals.currentTextDragAction = new action.DragTextAction(this.mCurrentText, aPoint);
            this.mCurrentText.startDrag(false, function () { return _this.setTextInBound(pEvent); });
        };
        //_________________________________________
        DrawingController.prototype.onMouseDownShape = function (pEvent) {
            pEvent.preventDefault();
            pEvent.stopPropagation();
            image_1.Globals.isSelectDragMode = true;
            if (this.mCurrentShape) {
                this.mCurrentShape.startDrag();
            }
        };
        //_______________________________________
        DrawingController.prototype.onMouseUpText = function () {
            image_1.Globals.isSelectDragMode = false;
            this.mCurrentText.stopDrag();
            var aPoint = new asBase.math.Point(this.mCurrentText.x, this.mCurrentText.y);
            if (image_1.Globals.currentTextDragAction && !image_1.Globals.currentTextDragAction.isAdded) {
                image_1.Globals.currentTextDragAction.newPosition = aPoint;
                image_1.Globals.ActionManager.addAction(image_1.Globals.currentTextDragAction);
            }
        };
        //__________________________________________
        DrawingController.prototype.onMouseUpShape = function (pEvent) {
            if (this.mCurrentShape) {
                this.mCurrentShape.stopDrag();
            }
            image_1.Globals.isSelectDragMode = false;
        };
        //______________________________________________
        DrawingController.prototype.setTextInBound = function (pMouseEvent) {
            image_1.Globals.ImageDrawing.mDrawPanel.stage.onMouseMove(pMouseEvent);
            var image = document.getElementById("image");
            var aImageRect = image.getBoundingClientRect();
            var aTextRect = this.mCurrentText.mInputElement.getBoundingClientRect();
            if ((aTextRect.left < aImageRect.left || aTextRect.right > aImageRect.right) && image_1.Globals.isDrawInBound) {
                console.log("text drag x out of bounds");
                this.mLastGoodTextX = this.mCurrentText.x;
            }
            else {
                this.mLastGoodTextX = this.mCurrentText.x;
            }
            if ((aTextRect.top < aImageRect.top || aTextRect.bottom > aImageRect.bottom) && image_1.Globals.isDrawInBound) {
                console.log("text drag y out of bounds");
                this.mLastGoodTextY = this.mCurrentText.y;
            }
            else {
                this.mLastGoodTextY = this.mCurrentText.y;
            }
        };
        return DrawingController;
    }());
    image_1.DrawingController = DrawingController;
})(image || (image = {}));
/// <reference path="../action/actionmanager.ts" />
var image;
/// <reference path="../action/actionmanager.ts" />
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
        return Globals;
    }());
    Globals.isDrawInBound = true;
    Globals.isSelectMode = false;
    Globals.isDrawMode = false;
    Globals.isRotateMode = false;
    Globals.isTextMode = false;
    Globals.isSelectDragMode = false;
    Globals.isItemSelected = false;
    Globals.imgURL = "assets/img2000.JPG";
    Globals.isUseBase64 = true;
    Globals.isFullScreen = false;
    Globals.isCropMode = false;
    Globals.isCircleMode = false;
    Globals.isArrowMode = false;
    Globals.ActionManager = new action.ActionManager();
    Globals.angle = 0;
    Globals.SET_IMAGE = "SET IMAGE";
    Globals.isDragMode = false;
    Globals.cropCounter = 0;
    Globals.ADD_SHAPES_AFTER_CROP = "ADD SHAPES AFTER CROP";
    Globals.mTextArray = new Array();
    Globals.mCircles = new Array();
    image.Globals = Globals;
})(image || (image = {}));
/// <reference path="../../../scripts/jquery.d.ts" />
var image;
/// <reference path="../../../scripts/jquery.d.ts" />
(function (image_2) {
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
            this.mCurrentAngle = 0;
            this.mOriginalAngle = 0;
            this.isRightMouseDown = false;
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
            this.mScalePanel = new asSvg.Sprite();
            this.mScalePanel.instanceName = "Scale Panel";
            this.mRotationPanel.addChild(this.mScalePanel);
            this.mMovePanel = new asSvg.Sprite();
            this.mMovePanel.instanceName = "Move Panel";
            this.mScalePanel.addChild(this.mMovePanel);
            this.mSVGStage.element.onmousewheel = function (pEvent) { return _this.onMouseWheel(pEvent); };
            this.mDrawPanel = new asSvg.Sprite();
            //this.mMovePanel.addChild(this.mTextElement);
            this.mSVGStage.element.addEventListener("click", function (pEvent) { return _this.setTextPoint(pEvent); });
            this.mSVGStage.element.onmousedown = function (pEvent) { return _this.onMouseDown(pEvent); };
            this.mSVGStage.element.onmousemove = function (pEvent) { return _this.onMouseMove(pEvent); };
            window.onmouseup = function (pEvent) { return _this.onMouseUp(pEvent); };
            this.mDrawingController = new image_2.DrawingController();
            document.getElementById("cropButton").addEventListener("click", function () { return _this.onCrop(); });
        }
        //___________________________________________________
        /**
         * Removes image from frame
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
            image_2.Globals.mCircles = new Array();
            image_2.Globals.mTextArray = new Array();
            image_2.Globals.currentShapeDragAction = null;
            image_2.Globals.currentDragAction = null;
            image_2.Globals.currentZoomAction = null;
            image_2.Globals.currentEditTextAction = null;
            image_2.Globals.currentTextDragAction = null;
            this.mDrawPanel.visible = true;
            this.mMovePanel.removeChildren();
            this.mRotationPanel.removeChildren();
            this.mRotationPanel.rotation = 0;
            this.mMovePanel = new asSvg.Sprite();
            this.mMovePanel.instanceName = "Move Panel";
            this.mRotationPanel.addChild(this.mMovePanel);
            image_2.Globals.currentShapeDragAction = null;
            image_2.Globals.currentDragAction = null;
            image_2.Globals.currentZoomAction = null;
            image_2.Globals.currentEditTextAction = null;
            image_2.Globals.currentTextDragAction = null;
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
        ImageDrawing.prototype.setPicture = function (pURL, pAngle, pScale, pDrawingObjects, pTextArray, pX, pY) {
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            if (pDrawingObjects === void 0) { pDrawingObjects = null; }
            if (pTextArray === void 0) { pTextArray = null; }
            if (pX === void 0) { pX = 0; }
            if (pY === void 0) { pY = 0; }
            this.removeImage();
            if (image_2.Globals.isUseBase64) {
                this.setPictureCanvas(pURL, pAngle, pScale, pDrawingObjects, pTextArray, pX, pY);
            }
            else {
                this.setPictureTest(pURL, pAngle, pScale, pDrawingObjects, pTextArray, pX, pY);
            }
        };
        //_______________________________________
        ImageDrawing.prototype.setPictureTest = function (pURL, pAngle, pScale, pDrawingObjects, pTextArray, pX, pY) {
            var _this = this;
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            if (pDrawingObjects === void 0) { pDrawingObjects = null; }
            if (pTextArray === void 0) { pTextArray = null; }
            if (pX === void 0) { pX = 0; }
            if (pY === void 0) { pY = 0; }
            this.mImage = new asSvg.Image(pURL, function (pData) { return _this.onImageLoadTest(pAngle, pScale, pDrawingObjects, pX, pY); });
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
        ImageDrawing.prototype.onImageLoadTest = function (pAngle, pScale, pDrawingObjects, pTextArray, pX, pY) {
            var _this = this;
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            if (pDrawingObjects === void 0) { pDrawingObjects = null; }
            if (pTextArray === void 0) { pTextArray = null; }
            if (pX === void 0) { pX = 0; }
            if (pY === void 0) { pY = 0; }
            this.HTMLImage = document.createElement("img");
            this.HTMLImage.src = this.mImage.getPath();
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
                this.scale(this.mOrginalScale - this.minImgScale);
            }
            if (pX != 0 || pY != 0) {
                this.mMovePanel.x = pX;
                this.mMovePanel.y = pY;
                this.setImageInBound();
            }
            // add shapes after crop
            asBase.events.EventManager.dispatchEvent(image_2.Globals.ADD_SHAPES_AFTER_CROP, this);
            this.mImageCrop = new image_2.ImageCrop(this.mMovePanel);
            if (pDrawingObjects) {
                for (var i = 0; i < pDrawingObjects.length; i++) {
                    pDrawingObjects[i].addToSprite(this.mDrawPanel);
                    image_2.Globals.mCircles.push(pDrawingObjects[i]);
                }
            }
            if (pTextArray) {
                var _loop_1 = function (i) {
                    pTextArray[i].element.appendChild(pTextArray[i].mInputElement);
                    this_1.mDrawPanel.addChild(pTextArray[i]);
                    image_2.Globals.mTextArray.push(pTextArray[i]);
                    $(pTextArray[i].mInputElement).on("focusin", function (pEvent, pTextElement) { return _this.onSelectText(pEvent, pTextArray[i]); });
                    pTextArray[i].mInputElement.addEventListener("input", function (pTextElement) { return _this.onInputText(pTextArray[i]); });
                    pTextArray[i].mInputElement.oninput = function (pInput) { return _this.expandTextBox(pTextArray[i].mInputElement); };
                    pTextArray[i].element.style.display = "block";
                };
                var this_1 = this;
                for (var i = 0; i < pTextArray.length; i++) {
                    _loop_1(i);
                }
            }
        };
        //__________________________________________
        ImageDrawing.prototype.setPictureCanvas = function (pURL, pAngle, pScale, pDrawingObjects, pTextArray, pX, pY) {
            var _this = this;
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            if (pDrawingObjects === void 0) { pDrawingObjects = null; }
            if (pTextArray === void 0) { pTextArray = null; }
            if (pX === void 0) { pX = 0; }
            if (pY === void 0) { pY = 0; }
            this.mSourceImage = document.createElement("img");
            this.mSourceImage.src = pURL;
            this.mSourceImage.onload = function (pData) { return _this.onImageLoadCanvas(pAngle, pScale, pDrawingObjects, pTextArray, pX, pY); };
        };
        //______________________________________________
        ImageDrawing.prototype.onImageLoadCanvas = function (pAngle, pScale, pDrawingObjects, pTextArray, pX, pY) {
            var _this = this;
            if (pAngle === void 0) { pAngle = 0; }
            if (pScale === void 0) { pScale = 1; }
            if (pDrawingObjects === void 0) { pDrawingObjects = null; }
            if (pTextArray === void 0) { pTextArray = null; }
            if (pX === void 0) { pX = 0; }
            if (pY === void 0) { pY = 0; }
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
                this.scale(this.mOrginalScale - this.minImgScale);
            }
            if (pX != 0 && pY != 0) {
                this.mMovePanel.x = pX;
                this.mMovePanel.y = pY;
            }
            // add shapes after crop
            asBase.events.EventManager.dispatchEvent(image_2.Globals.ADD_SHAPES_AFTER_CROP, this);
            this.mImageCrop = new image_2.ImageCrop(this.mMovePanel);
            if (pDrawingObjects) {
                for (var i = 0; i < pDrawingObjects.length; i++) {
                    pDrawingObjects[i].addToSprite(this.mDrawPanel);
                    image_2.Globals.mCircles.push(pDrawingObjects[i]);
                }
            }
            if (pTextArray) {
                var _loop_2 = function (i) {
                    pTextArray[i].element.appendChild(pTextArray[i].mInputElement);
                    this_2.mDrawPanel.addChild(pTextArray[i]);
                    image_2.Globals.mTextArray.push(pTextArray[i]);
                    $(pTextArray[i].mInputElement).on("focusin", function (pEvent, pTextElement) { return _this.onSelectText(pEvent, pTextArray[i]); });
                    pTextArray[i].mInputElement.addEventListener("input", function (pTextElement) { return _this.onInputText(pTextArray[i]); });
                    pTextArray[i].mInputElement.oninput = function (pInput) { return _this.expandTextBox(pTextArray[i].mInputElement); };
                };
                var this_2 = this;
                for (var i = 0; i < pTextArray.length; i++) {
                    _loop_2(i);
                }
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
         * Rotates the sprite
         *
         * @param {number} pAngle -angle to rotate image
         * im
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
        //_________________________
        ImageDrawing.prototype.onCrop = function () {
            image_2.Globals.isCropMode = true;
        };
        //_____________________________________
        /**
         * Starts sribbling on the image
         *
         * @param {string} pColor -drawing color( in hex)
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.startDraw = function (pColor) {
            if (!image_2.Globals.isDrawMode) {
                image_2.Globals.isDrawMode = true;
                this.mDrawColor = pColor;
            }
            else {
                image_2.Globals.isDrawMode = false;
            }
        };
        //_________________________________________
        ImageDrawing.prototype.stopDraw = function () {
            image_2.Globals.isDrawMode = false;
        };
        //_____________________________________
        /**
         * Clears all shapes and text from the image
         *
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.clearAll = function () {
            var aAction = new action.ClearAllAction(this.mDrawPanel);
            image_2.Globals.ActionManager.addAction(aAction);
            this.mDrawPanel.removeChildren();
            image_2.Globals.mCircles = new Array();
            image_2.Globals.mTextArray = new Array();
        };
        //____________________________
        /**
         * Changes the draw color
         *
         * @param {string} pColor -Color to change to
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.changeColor = function (pColor) {
            this.mDrawColor = pColor;
        };
        //_____________________________________
        /**
         *
         * Sets the mode to text mode
         *
         * @memberOf ImageDrawing
         */
        ImageDrawing.prototype.onSetText = function () {
            if (!image_2.Globals.isTextMode) {
                image_2.Globals.isTextMode = true;
            }
            else
                image_2.Globals.isTextMode = false;
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
            if (!image_2.Globals.mTextArray) {
                image_2.Globals.mTextArray = new Array();
            }
            aTextElement.setLineStyle(6 / this.mRotationPanel.scaleX);
            this.mDrawPanel.addChild(aTextElement);
            var aForeignObject = new asSvg.ForeignObject();
            aForeignObject.x = this.msetTextPoint.x;
            aForeignObject.y = this.msetTextPoint.y;
            aForeignObject.setWidth(10);
            aForeignObject.setHeight(10);
            this.mDrawPanel.addChild(aForeignObject);
            aForeignObject.mInputElement = document.createElement("input");
            aForeignObject.mInputElement.size = 1;
            //  $(aForeignObject.mInputElement).on("focusout", (pForeign) => this.onFocusOutText(aForeignObject, aForeignObject.mInputElement));
            $(aForeignObject.mInputElement).on("focusin", function (pEvent, pTextElement) { return _this.onSelectText(pEvent, aForeignObject); });
            aForeignObject.mInputElement.addEventListener("input", function (pTextElement) { return _this.onInputText(aForeignObject); });
            aForeignObject.mInputElement.oninput = function (pInput) { return _this.expandTextBox(aForeignObject.mInputElement); };
            aForeignObject.mInputElement.type = "text";
            aForeignObject.mInputElement.className = "imageTextBox";
            aForeignObject.mInputElement.style.fontSize = this.fontSize / this.mRotationPanel.scaleX + "px";
            aForeignObject.mInputElement.style.color = this.mDrawColor;
            aForeignObject.textField = aTextElement;
            aForeignObject.textField.textElement.style.display = "none";
            // aForeignObject.rotation = -this.mRotationPanel.rotation;
            // aForeignObject.mInputElement.setAttribute("outline","dashed black")
            aForeignObject.element.appendChild(aForeignObject.mInputElement);
            aForeignObject.mInputElement.focus();
            image_2.Globals.mTextArray.push(aForeignObject);
            //add action to action array
            var aAction = new action.TextAction(this.mDrawPanel, aForeignObject);
            image_2.Globals.ActionManager.addAction(aAction);
        };
        //___________________________
        ImageDrawing.prototype.createSVGText = function (pForeignObject, pInput) {
            this.mDrawPanel.addChild(pForeignObject.textField);
            pForeignObject.textField.textElement.style.display = "block";
            pForeignObject.textField.element.appendChild(pForeignObject.textField.textElement);
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
            if (pMouseEvent.which != 1) {
                this.onRightMouseDown();
                return;
            }
            this.mMouseDown = true;
            //crop mode
            if (image_2.Globals.isCropMode) {
                this.mImageCrop.onMousedown(pMouseEvent);
                return;
            }
            //draw a circle
            if (image_2.Globals.isCircleMode) {
                var aCircle = new shapes.Circle(this.mDrawPanel, this.mDrawColor);
                image_2.Globals.mCircles.push(aCircle);
                aCircle.onMouseDown(pMouseEvent);
                var aAction = new action.DrawAction(this.mDrawPanel, aCircle);
                image_2.Globals.ActionManager.addAction(aAction);
                return;
            }
            // draw an arrow
            if (image_2.Globals.isArrowMode) {
                var aArrow = new shapes.Arrow(this.mDrawPanel, this.mDrawColor);
                image_2.Globals.mCircles.push(aArrow);
                aArrow.onMouseDown(pMouseEvent);
                var aAction = new action.DrawAction(this.mDrawPanel, aArrow);
                image_2.Globals.ActionManager.addAction(aAction);
                return;
            }
            //draw a scribble
            if (image_2.Globals.isDrawMode) {
                //scribble mode
                var aShape = new shapes.Scribble(this.mDrawPanel, this.mDrawColor, ImageDrawing.LINE_WIDTH);
                image_2.Globals.mCircles.push(aShape);
                image_2.Globals.mCircles[image_2.Globals.mCircles.length - 1].onMouseDown(pMouseEvent);
                var aAction = new action.DrawAction(this.mDrawPanel, aShape);
                image_2.Globals.ActionManager.addAction(aAction);
            }
        };
        //__________________________________________
        ImageDrawing.prototype.onRightMouseDown = function () {
            var _this = this;
            this.isRightMouseDown = true;
            image_2.Globals.isDragMode = true;
            this.mMovePanel.startDrag(false, function () { return _this.setImageInBound(); });
            var aPoint = new asBase.math.Point(this.mMovePanel.x, this.mMovePanel.y);
            image_2.Globals.currentDragAction = new action.DragAction(aPoint, this.mMovePanel, function () { return _this.setImageInBound(); });
        };
        //__________________________________________
        ImageDrawing.prototype.setTextPoint = function (pMouseEvent) {
            console.log("client x :" + pMouseEvent.clientX + "   client y :" + pMouseEvent.clientY);
            if (image_2.Globals.isTextMode && this.isMouseInBound(pMouseEvent)) {
                this.msetTextPoint = {};
                this.msetTextPoint.x = this.mMovePanel.mouseX;
                this.msetTextPoint.y = this.mMovePanel.mouseY;
                this.setText();
                image_2.Globals.isTextMode = false;
                this.mTextButton.classList.remove("active");
            }
        };
        //_____________________________________
        ImageDrawing.prototype.onMouseMove = function (pMouseEvent) {
            if (!this.mMouseDown || pMouseEvent.which != 1) {
                return;
            }
            //crop mode
            if (image_2.Globals.isCropMode) {
                this.mImageCrop.onMouseMove(pMouseEvent);
                return;
            }
            //draw a circle
            if (image_2.Globals.isCircleMode) {
                image_2.Globals.mCircles[image_2.Globals.mCircles.length - 1].onMouseMove(pMouseEvent);
            }
            // draw an arrow
            if (image_2.Globals.isArrowMode) {
                image_2.Globals.mCircles[image_2.Globals.mCircles.length - 1].onMouseMove(pMouseEvent);
            }
            //scribble
            if (!image_2.Globals.isDragMode && image_2.Globals.isDrawMode) {
                var aCurrentShape = image_2.Globals.mCircles[image_2.Globals.mCircles.length - 1];
                aCurrentShape.onMouseMove(pMouseEvent);
            }
        };
        //______________________________
        ImageDrawing.prototype.isTextInBound = function (pText) {
            var image = document.getElementById("image");
            var aImageRect = image.getBoundingClientRect();
            var aTextRect = pText.mInputElement.getBoundingClientRect();
            if ((aTextRect.left < aImageRect.left || aTextRect.right > aImageRect.right || aTextRect.top < aImageRect.top || aTextRect.bottom > aImageRect.bottom) && image_2.Globals.isDrawInBound) {
                return false;
            }
            else {
                return true;
            }
        };
        //______________________________
        //______________________________
        ImageDrawing.prototype.onInputText = function (pText) {
            var _this = this;
            if (!this.isTextInBound(pText)) {
                // pText.mInputElement.value = pText.mInputElement.value.slice(0, pText.mInputElement.value.length - 1);
                console.log("text out of bounds");
                return;
            }
            //            pText.oldValue = pText.mInputElement.value;
            if (this.mInputTimeout) {
                clearTimeout(this.mInputTimeout);
            }
            else {
                image_2.Globals.currentEditTextAction = new action.editTextAction(pText, pText.mInputElement.value);
            }
            this.mInputTimeout = setTimeout(function (aText) { return _this.addEditTextAction(pText); }, 1000);
        };
        //_________________________________________
        ImageDrawing.prototype.addEditTextAction = function (pText) {
            this.mInputTimeout = null;
            if (image_2.Globals.currentEditTextAction && !image_2.Globals.currentEditTextAction.isAdded) {
                image_2.Globals.currentEditTextAction.newValue = pText.mInputElement.value;
                image_2.Globals.ActionManager.addAction(image_2.Globals.currentEditTextAction);
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
            var aImageRect = this.mMovePanel.getBounds();
            var aConRect = this.mImageContainer.getBoundingClientRect();
            if (this.mWidthOriginalScale >= this.mRotationPanel.scaleX) {
                this.mMovePanel.x = 0;
            }
            else {
                var aPanelWidth = this.mImgWidth * this.mRotationPanel.scaleX;
                var aMaxX = (aPanelWidth / 2 - aConRect.width / 2) / this.mRotationPanel.scaleX;
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
                if (this.mMovePanel.x > aMaxY) {
                    this.mMovePanel.x = aMaxY;
                }
                if (this.mMovePanel.x < -aMaxY) {
                    this.mMovePanel.x = -aMaxY;
                }
            }
        };
        //________________________________
        ImageDrawing.prototype.clearImgSrc = function () {
            if (this.mSourceImage) {
                this.mSourceImage.onload = function () { };
            }
            if (this.HTMLImage) {
                this.HTMLImage.onload = function () { };
            }
        };
        //___________________________________________
        ImageDrawing.prototype.isMouseInBound = function (pMousEvent) {
            var image = document.getElementById("image");
            var aImageRect = image.getBoundingClientRect();
            if ((pMousEvent.clientX < aImageRect.left || pMousEvent.clientX > aImageRect.right || pMousEvent.clientY < aImageRect.top || pMousEvent.clientY > aImageRect.bottom) && image_2.Globals.isDrawInBound) {
                return false;
            }
            else {
                return true;
            }
        };
        //_____________________________________
        ImageDrawing.prototype.onMouseUp = function (pMouseEvent) {
            if (pMouseEvent.which != 1) {
                this.onRightMouseUp();
            }
            this.mMouseDown = false;
            this.mMousePoint = null;
            //crop mode
            if (image_2.Globals.isCropMode) {
                this.mImageCrop.onMouseUp();
                return;
            }
            //draw a circle
            if (image_2.Globals.isCircleMode) {
                image_2.Globals.mCircles[image_2.Globals.mCircles.length - 1].onMouseUp();
                return;
            }
            //draw an arrow
            if (image_2.Globals.isArrowMode) {
                image_2.Globals.mCircles[image_2.Globals.mCircles.length - 1].onMouseUp();
                return;
            }
            if (image_2.Globals.isDrawMode) {
                //draw a shape
                image_2.Globals.mCircles[image_2.Globals.mCircles.length - 1].onMouseUp();
                return;
            }
        };
        //_____________________________________
        ImageDrawing.prototype.onRightMouseUp = function () {
            this.isRightMouseDown = false;
            image_2.Globals.isDragMode = false;
            this.mMovePanel.stopDrag();
            //add drag action
            if (image_2.Globals.currentDragAction && !image_2.Globals.currentDragAction.isAdded) {
                var aNewPosition = new asBase.math.Point(this.mMovePanel.x, this.mMovePanel.y);
                image_2.Globals.currentDragAction.newPosition = aNewPosition;
                image_2.Globals.ActionManager.addAction(image_2.Globals.currentDragAction);
            }
        };
        //________________________________________
        ImageDrawing.prototype.onMouseWheel = function (e) {
            var _this = this;
            ImageDrawing.isZoomed = true;
            var aNewScale = e.wheelDelta / 10000 * this.mRotationPanel.scaleX;
            var aOldScale = -aNewScale;
            if (ImageDrawing.zoom_timeout && image_2.Globals.currentZoomAction) {
                clearTimeout(ImageDrawing.zoom_timeout);
                image_2.Globals.currentZoomAction.scale = aNewScale;
            }
            else {
                image_2.Globals.currentZoomAction = new action.ZoomAction(aOldScale, aNewScale, function (pScale) { return _this.scale(pScale); });
                console.log("add zoom action");
            }
            ImageDrawing.zoom_timeout = setTimeout(function (pAction) { return _this.addZoomAction(image_2.Globals.currentZoomAction); }, 500);
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
        //__________________________________
        ImageDrawing.prototype.addZoomAction = function (pZoomAction) {
            image_2.Globals.ActionManager.addAction(pZoomAction);
            ImageDrawing.zoom_timeout = null;
            image_2.Globals.currentZoomAction = null;
        };
        //___________________________________________
        ImageDrawing.prototype.adjustDrawPanelAfterScale = function () {
            for (var i = 0; i < image_2.Globals.mCircles.length; i++) {
                image_2.Globals.mCircles[i].setLineWidth(ImageDrawing.LINE_WIDTH / this.mRotationPanel.scaleX);
            }
            if (ImageDrawing.FIX_TEXT_TO_ZOOM) {
                for (var i = 0; i < image_2.Globals.mTextArray.length; i++) {
                    image_2.Globals.mTextArray[i].mInputElement.style.fontSize = this.fontSize / this.mRotationPanel.scaleX + "px";
                    //Globals.mTextArray[i].mInputElement.style.height = 64 / this.mRotationPanel.scaleX + "px";
                    // Globals.mTextArray[i].mInputElement.style.outlineWidth = ((Globals.mTextArray[i].mInputElement.value.length + 1) * (this.fontSize / this.mRotationPanel.scaleX)) / 10 + "px";
                    //  Globals.mTextArray[i].mInputElement.style.width = (Globals.mTextArray[i].mInputElement.value.length + 1) * (this.fontSize / this.mRotationPanel.scaleX) + "px";
                }
            }
        };
        //_____________________________________
        ImageDrawing.prototype.adjustTextPanelAfterRotation = function () {
            for (var i = 0; i < image_2.Globals.mTextArray.length; i++) {
                image_2.Globals.mTextArray[i].rotation = -this.mRotationPanel.rotation;
                var aTemp = image_2.Globals.mTextArray[i].x;
                image_2.Globals.mTextArray[i].x = image_2.Globals.mTextArray[i].y;
                image_2.Globals.mTextArray[i].y = aTemp;
                image_2.Globals.mTextArray[i].textField.rotation = -this.mRotationPanel.rotation;
                var aTemp1 = image_2.Globals.mTextArray[i].textField.x;
                image_2.Globals.mTextArray[i].textField.x = image_2.Globals.mTextArray[i].textField.y;
                image_2.Globals.mTextArray[i].textField.y = aTemp1;
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
            if (!image_2.Globals.isSelectMode) {
                image_2.Globals.isSelectMode = true;
            }
            else
                image_2.Globals.isSelectMode = false;
        };
        //____________________________________________
        ImageDrawing.prototype.onSelectText = function (pEvent, pText) {
            if (!image_2.Globals.isItemSelected) {
                image_2.Globals.isItemSelected = true;
                this.mDrawingController.onSelectText(pText);
            }
            else if (!image_2.Globals.isTextMode) {
                pEvent.preventDefault();
                pEvent.stopPropagation();
                $(pText.mInputElement).blur();
                image_2.Globals.currentEditTextAction = new action.editTextAction(pText, pText.mInputElement.value);
            }
        };
        //____________________________
        ImageDrawing.prototype.onSelectShape = function (pShape) {
            this.mDrawingController.onSelectShape(pShape);
        };
        //__________________________________________
        ImageDrawing.prototype.drawShapes = function (pShapes, pScale) {
        };
        Object.defineProperty(ImageDrawing.prototype, "minImgScale", {
            //___________________________________
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
            for (var i = 0; i < image_2.Globals.mTextArray.length; i++) {
                // this.onFocusOutText()
                image_2.Globals.mTextArray[i].element.style.display = "none";
                this.createSVGText(image_2.Globals.mTextArray[i], image_2.Globals.mTextArray[i].mInputElement);
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
            for (var i = 0; i < image_2.Globals.mTextArray.length; i++) {
                image_2.Globals.mTextArray[i].element.style.display = "block";
                image_2.Globals.mTextArray[i].textField.text = "";
            }
        };
        //_______________________________________
        /**
         * Expands the frame to full screem
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
         * Resizes the SVG stage
         *
         * @param {number} pWidth -width to resize to
         * @param {number} pHeight -heigth to resize to
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
        //_______________________________________
        ImageDrawing.prototype.getCroppedBound = function () {
            var aRectBounds = this.mImageCrop.getCropBounds();
            return aRectBounds;
        };
        //____________________________________
        ImageDrawing.prototype.getCroppedRect = function () {
            return this.mImageCrop.rect;
        };
        Object.defineProperty(ImageDrawing.prototype, "fontsize", {
            /**
             *
             * Sets the font size of text objects
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
             * Sets the line width of shapes
             *
             * @memberOf ImageDrawing
             */
            set: function (pLineWidth) {
                ImageDrawing.LINE_WIDTH = pLineWidth;
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
    ImageDrawing.LINE_WIDTH = 4;
    image_2.ImageDrawing = ImageDrawing;
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
            this.mImageDrawing = pImageDrawing;
            this.mStage = this.mImageDrawing.mSVGStage;
        }
        //____________________________
        ImageSave.prototype.getImage = function () {
        };
        //___________________________
        ImageSave.prototype.getCroppedImage = function (pRect) {
        };
        //________________________________________
        ImageSave.prototype.saveCroppedImage = function (pRect) {
        };
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
            var _this = _super.call(this, pImageDrawing) || this;
            asBase.events.EventManager.addEventListener(image.Globals.ADD_SHAPES_AFTER_CROP, function () { return _this.onAddShapesAfterCrop(); }, _this);
            return _this;
        }
        //____________________________
        /**
         *
         * Download the image in the frame
         *
         * @memberOf ImageSaveCanvas
         */
        ImageSaveCanvas.prototype.getImage = function () {
            var _this = this;
            this.mImageDrawing.convertInuptToSVG();
            this.mImage = this.mStage.getImage();
            this.mImage.onload = function () { return _this.saveImage(); };
        };
        //____________________________________________________________
        /**
         * Downloads the image frame with the original angle,scale and size
         *
         *
         * @memberOf ImageSaveCanvas
         */
        ImageSaveCanvas.prototype.getFullImage = function () {
            var _this = this;
            this.mImageDrawing.convertInuptToSVG();
            var aConRect = this.mImageDrawing.mImageContainer.getBoundingClientRect();
            var aPanelWidth = this.mImageDrawing.mImgWidth * this.mImageDrawing.mRotationPanel.scaleX;
            var aMaxX = (aPanelWidth / 2 - aConRect.width / 2) / this.mImageDrawing.mRotationPanel.scaleX;
            var aPanelHight = this.mImageDrawing.mImgHeight * this.mImageDrawing.mRotationPanel.scaleX;
            var aMaxY = (aPanelHight / 2 - aConRect.height / 2) / this.mImageDrawing.mRotationPanel.scaleX;
            this.mImage = this.mImageDrawing.mRotationPanel.getImage(1, aMaxX, aMaxY);
            this.mImage.onload = function () { return _this.saveImage(); };
        };
        //_______________________________________________________________
        /**
         * Gets and saves the cropped image
         *
         * @param {ClientRect} pRect
         *
         * @memberOf ImageSaveCanvas
         */
        ImageSaveCanvas.prototype.getCroppedImage = function (pRect) {
            var _this = this;
            this.mPrevScale = this.mImageDrawing.mRotationPanel.scaleX;
            this.mPrevRotation = this.mImageDrawing.mRotationPanel.rotation;
            this.mPrevX = this.mImageDrawing.mMovePanel.x;
            this.mPrevY = this.mImageDrawing.mMovePanel.y;
            // this.mDrawingObjects= this.mImageDrawing.getShapesInRect();
            // this.mImageDrawing.mDrawPanel.visible = false;
            this.mImageDrawing.convertInuptToSVG();
            this.mImage = this.mStage.getImage();
            this.mImage.onload = function (p) { return _this.saveCroppedImage(pRect); };
        };
        //_______________________________________________________________
        ImageSaveCanvas.prototype.saveCroppedImage = function (pRect) {
            var _this = this;
            var aWidthScale = this.mImageDrawing.mImgWidth / pRect.width;
            var aHeightScale = this.mImageDrawing.mImgHeight / pRect.height;
            this.mScale = Math.min(aWidthScale, aHeightScale);
            var aCanvas = document.createElement("canvas");
            ;
            // aCanvas.width = this.mImage.naturalWidth;
            //aCanvas.height = this.mImage.naturalHeight;
            aCanvas.width = pRect.width * this.mScale;
            aCanvas.height = pRect.height * this.mScale;
            var aContext = aCanvas.getContext("2d");
            //   aContext.drawImage(this.mImage, pRect.x, pRect.y, pRect.width, pRect.height, 0, 0, this.mImage.naturalWidth, this.mImage.naturalHeight);
            aContext.drawImage(this.mImage, pRect.x, pRect.y, pRect.width, pRect.height, 0, 0, pRect.width * this.mScale, pRect.height * this.mScale);
            var aDataURL = aCanvas.toDataURL();
            this.mImageDrawing.convertSVGToInput();
            var aAction = new action.CropAction(this.mImageDrawing.mSourceImage.src, aDataURL, function (pSrc, p, d, e, g, f, h) { return _this.mImageDrawing.setPicture(pSrc, p, d, e, g, f, h); }, 0, this.mPrevRotation, this.mPrevScale, this.mPrevX, this.mPrevY);
            image.Globals.ActionManager.addAction(aAction);
            //for (let i = 0; i < this.mDrawingObjects.length; i++) {
            //    let aWidth = this.mDrawingObjects[i].element.getBoundingClientRect().width;
            //    let aHeight = this.mDrawingObjects[i].element.getBoundingClientRect().height;
            //    this.mDrawingObjects[i].setScale(aScale);
            //    this.mDrawingObjects[i].x = ((aWidth * aScale) - aWidth  / 2);
            //    this.mDrawingObjects[i].y = ((aHeight * aScale) - aHeight / 2);
            //}
            this.mImageDrawing.setPicture(aDataURL);
        };
        //______________________________________________________________
        ImageSaveCanvas.prototype.saveFullImage = function () {
            var aCanvas = document.createElement("canvas");
            aCanvas.width = this.mImageDrawing.mImgWidth;
            aCanvas.height = this.mImageDrawing.mImgHeight;
            var aContext = aCanvas.getContext("2d");
            aContext.drawImage(this.mImage, 0, 0, this.mImageDrawing.mImgWidth, this.mImageDrawing.mImgHeight);
            var aDataURL = aCanvas.toDataURL();
            this.downloadImage(aDataURL);
        };
        //__________________________________________________________
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
        //_____________________________________________________________
        ImageSaveCanvas.prototype.onAddShapesAfterCrop = function () {
            if (this.mDrawingObjects) {
                this.mImageDrawing.drawShapes(this.mDrawingObjects, this.mScale);
            }
        };
        //______________________________________________
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
            this.mPrevScale = this.mImageDrawing.mRotationPanel.scaleX;
            this.mPrevX = this.mImageDrawing.mMovePanel.x;
            this.mPrevY = this.mImageDrawing.mMovePanel.y;
            this.mPrevRotation = this.mImageDrawing.mRotationPanel.rotation;
            this.mImageDrawing.mRotationPanel.scaleX = this.mImageDrawing.minImgScale;
            this.mImageDrawing.mRotationPanel.scaleY = this.mImageDrawing.minImgScale;
            this.mImageDrawing.mMovePanel.x = 0;
            this.mImageDrawing.mMovePanel.y = 0;
            this.mImageDrawing.mRotationPanel.rotation = 0;
            this.mImage = this.mStage.getImage();
            this.mImage.onload = function () { return _this.saveImage(); };
        };
        //____________________________________________________
        ImageSaveCombineCanvas.prototype.getCroppedImage = function (pRect) {
            var _this = this;
            this.mImageDrawing.convertInuptToSVG();
            this.mPrevScale = this.mImageDrawing.mRotationPanel.scaleX;
            this.mPrevX = this.mImageDrawing.mMovePanel.x;
            this.mPrevY = this.mImageDrawing.mMovePanel.y;
            this.mPrevRotation = this.mImageDrawing.mRotationPanel.rotation;
            this.mImageDrawing.mRotationPanel.scaleX = this.mImageDrawing.minImgScale;
            this.mImageDrawing.mRotationPanel.scaleY = this.mImageDrawing.minImgScale;
            this.mImageDrawing.mMovePanel.x = 0;
            this.mImageDrawing.mMovePanel.y = 0;
            this.mImageDrawing.mRotationPanel.rotation = 0;
            var aRectBounds = pRect.getBounds();
            pRect.visible = false;
            this.mImage = this.mStage.getImage();
            this.mImage.onload = function () { return _this.saveCroppedImage(aRectBounds); };
        };
        //____________________________________
        ImageSaveCombineCanvas.prototype.saveCroppedImage = function (pRect) {
            var _this = this;
            var aCanvas = document.createElement("canvas");
            ;
            aCanvas.width = this.mImage.naturalWidth;
            aCanvas.height = this.mImage.naturalHeight;
            var aContext = aCanvas.getContext("2d");
            aContext.drawImage(this.mImage, 0, 0);
            this.mImageDrawing.HTMLImage;
            this.mCanvas = this.combineImageAndCanvas(this.mImageDrawing.HTMLImage, aCanvas);
            var aRectBounds = pRect;
            var aCropX = (pRect.left - image.Globals.ImageDrawing.mImage.getBounds().left) / image.Globals.ImageDrawing.minImgScale;
            var aCropY = (pRect.top - image.Globals.ImageDrawing.mImage.getBounds().top) / image.Globals.ImageDrawing.minImgScale;
            var aSaveCanvas = document.createElement("canvas");
            aSaveCanvas.width = aRectBounds.width / image.Globals.ImageDrawing.minImgScale;
            aSaveCanvas.height = aRectBounds.height / image.Globals.ImageDrawing.minImgScale;
            var aSaveContext = aSaveCanvas.getContext("2d");
            aSaveContext.drawImage(this.mCanvas, aCropX, aCropY, aRectBounds.width / image.Globals.ImageDrawing.minImgScale, aRectBounds.height / image.Globals.ImageDrawing.minImgScale, 0, 0, aRectBounds.width / image.Globals.ImageDrawing.minImgScale, aRectBounds.height / image.Globals.ImageDrawing.minImgScale);
            var aDataURL = aSaveCanvas.toDataURL();
            this.mImageDrawing.convertSVGToInput();
            var aAction = new action.CropAction(this.mImageDrawing.HTMLImage.src, aDataURL, function (pSrc, p, d, e, g, f, h) { return _this.mImageDrawing.setPicture(pSrc, p, d, e, g, f, h); }, this.mPrevRotation, this.mPrevRotation, this.mPrevScale, this.mPrevX, this.mPrevY);
            image.Globals.ActionManager.addAction(aAction);
            image.Globals.cropCounter++;
            this.mImageDrawing.setPicture(aDataURL, this.mPrevRotation, 1);
        };
        //_____________________________________
        ImageSaveCombineCanvas.prototype.saveImage = function () {
            var aCanvas = document.createElement("canvas");
            ;
            aCanvas.width = this.mImage.naturalWidth;
            aCanvas.height = this.mImage.naturalHeight;
            var aContext = aCanvas.getContext("2d");
            aContext.drawImage(this.mImage, 0, 0);
            this.mImageDrawing.HTMLImage;
            this.mCanvas = this.combineImageAndCanvas(this.mImageDrawing.HTMLImage, aCanvas);
            var aDataURL = this.mCanvas.toDataURL();
            this.downloadImage(aDataURL);
            this.mImageDrawing.mRotationPanel.scaleX = this.mPrevScale;
            this.mImageDrawing.mRotationPanel.scaleY = this.mPrevScale;
            this.mImageDrawing.mMovePanel.x = this.mPrevX;
            this.mImageDrawing.mMovePanel.y = this.mPrevY;
            this.mImageDrawing.mRotationPanel.rotation = this.mPrevRotation;
        };
        //_____________________________________________________________
        ImageSaveCombineCanvas.prototype.combineImageAndCanvas = function (pImage, pDrawing) {
            var aCanvasToReturn;
            var aAngle = image.Globals.angle;
            var aScaleFactor = 1;
            var aAllImageWidth = pImage.naturalWidth;
            var aAllImageHeight = pImage.naturalHeight;
            aCanvasToReturn = document.createElement('canvas');
            aCanvasToReturn.width = pImage.naturalWidth;
            aCanvasToReturn.height = pImage.naturalHeight;
            var ctxToSave = aCanvasToReturn.getContext("2d");
            ctxToSave.drawImage(pImage, 0, 0);
            var aScale = 1 / this.mImageDrawing.minImgScale;
            var aWidth = pDrawing.width * aScale;
            var aHeight = pDrawing.height * aScale;
            var aX = (aWidth - pImage.naturalWidth) / 2;
            var aY = (aHeight - pImage.naturalHeight) / 2;
            ctxToSave.drawImage(pDrawing, 0, 0, pDrawing.width, pDrawing.height, -aX, -aY, aWidth, aHeight);
            return aCanvasToReturn;
        };
        return ImageSaveCombineCanvas;
    }(image.ImageSave));
    image.ImageSaveCombineCanvas = ImageSaveCombineCanvas;
})(image || (image = {}));
/// <reference path="onecode/action/rotateaction.ts" />
var image;
/// <reference path="onecode/action/rotateaction.ts" />
(function (image) {
    var Main = (function () {
        function Main() {
            var _this = this;
            image.Globals.ImageDrawing = new image.ImageDrawing(document.getElementById("imageDiv"));
            if (image.Globals.isUseBase64) {
                this.mImageSave = new image.ImageSaveCanvas(image.Globals.ImageDrawing);
            }
            else {
                this.mImageSave = new image.ImageSaveCombineCanvas(image.Globals.ImageDrawing);
            }
            //get elements
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
            image.Globals.ImageDrawing.mDrawColor = document.getElementById("drawColor").value;
            image.Globals.ImageDrawing.mTextButton = document.getElementById("setTextButton");
            this.mRedoButton = document.getElementById("redoButton");
            this.mUndoButton = document.getElementById("undoButton");
            this.mDrawCircleButton = document.getElementById("drawCircleButton");
            //event listeners
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
            document.getElementById("confirmCropButton").addEventListener("click", function () { return _this.onSaveCrop(); });
            this.mRedoButton.addEventListener("click", function () { return _this.onRedo(); });
            this.mUndoButton.addEventListener("click", function () { return _this.onUndo(); });
            this.mDrawCircleButton.addEventListener("click", function () { return _this.onDrawCircle(); });
            document.getElementById("drawArrowButton").addEventListener("click", function () { return _this.onDrawArrow(); });
        }
        //______________________________________
        Main.prototype.setPicture = function () {
            var aNum = Math.floor(Math.random() * 5) + 1;
            image.Globals.ImageDrawing.setPicture("assets/" + aNum + ".jpg", 0, 1);
            this.mRotateButton.style.display = "inline-block";
        };
        //____________________________________
        Main.prototype.rotateImage = function () {
            this.resetButtons();
            image.Globals.ImageDrawing.rotate(90);
            var aAction = new action.RotateAction(-90, 90, function (pAngle) { return image.Globals.ImageDrawing.rotate(pAngle); });
            image.Globals.ActionManager.addAction(aAction);
        };
        //__________________________________
        Main.prototype.setText = function () {
            this.resetButtons();
            this.mSetTextButton.classList.add("active");
            image.Globals.ImageDrawing.onSetText();
        };
        //_______________________________
        Main.prototype.onRedo = function () {
            image.Globals.ActionManager.redo();
        };
        //______________________________________
        Main.prototype.onUndo = function () {
            image.Globals.ActionManager.undo();
        };
        //____________________________
        Main.prototype.onDraw = function () {
            this.resetButtons();
            this.mDrawButton.classList.add("active");
            var aColor = this.mDrawColorBox.value;
            console.log(aColor);
            image.Globals.ImageDrawing.startDraw(aColor);
        };
        //_________________________________
        Main.prototype.onDrawCircle = function () {
            this.resetButtons();
            image.Globals.isCircleMode = true;
        };
        //___________________________
        Main.prototype.onDrawArrow = function () {
            this.resetButtons();
            image.Globals.isArrowMode = true;
        };
        //___________________________________
        Main.prototype.onDownload = function () {
            this.mImageSave.getImage();
        };
        //_________________________________________
        Main.prototype.onSaveCrop = function () {
            this.resetButtons();
            if (image.Globals.isUseBase64) {
                var aRectBounds = image.Globals.ImageDrawing.getCroppedBound();
                this.mImageSave.getCroppedImage(aRectBounds);
            }
            else {
                var aRect = image.Globals.ImageDrawing.getCroppedRect();
                this.mImageSave.getCroppedImage(aRect);
            }
        };
        //________________________________________
        Main.prototype.onSelect = function () {
            this.resetButtons();
            this.mSelectButton.classList.add("active");
            image.Globals.ImageDrawing.select();
        };
        //________________________________________
        Main.prototype.onColorChange = function () {
            var aColor = this.mDrawColorBox.value;
            console.log(aColor);
            image.Globals.ImageDrawing.changeColor(aColor);
        };
        //_________________________________________
        Main.prototype.resetButtons = function () {
            image.Globals.isSelectMode = false;
            image.Globals.isTextMode = false;
            image.Globals.isDrawMode = false;
            image.Globals.isRotateMode = false;
            image.Globals.isCropMode = false;
            image.Globals.isCircleMode = false;
            image.Globals.isArrowMode = false;
            this.mDrawButton.classList.remove("active");
            this.mRotateButton.classList.remove("active");
            this.mSelectButton.classList.remove("active");
            this.mSetTextButton.classList.remove("active");
        };
        //____________________________
        Main.prototype.onFullScreen = function () {
            image.Globals.ImageDrawing.onFullScreen(image.Globals.isFullScreen);
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
            var aAction = new action.ClearAllAction(image.Globals.ImageDrawing.mDrawPanel);
            image.Globals.ActionManager.addAction(aAction);
            image.Globals.ImageDrawing.clearAll();
        };
        //__________________________________
        Main.prototype.onFontSize = function (pVal) {
            image.Globals.ImageDrawing.fontsize = pVal;
        };
        //__________________________________
        Main.prototype.onLineWidth = function (pVal) {
            image.Globals.ImageDrawing.lineWidth = pVal;
        };
        return Main;
    }());
    image.Main = Main;
})(image || (image = {}));
var shapes;
(function (shapes) {
    var Shape = (function () {
        function Shape() {
            this.mIsMouseDown = false;
        }
        //________________________________________
        Shape.prototype.onMouseDown = function (pEvent) {
            image.Globals.activeShape = this;
            this.mIsMouseDown = true;
            this.mLastMouseDownPoint = new asBase.math.Point();
            this.mLastMouseDownPoint.x = this.mSprite.parent.mouseX;
            this.mLastMouseDownPoint.y = this.mSprite.parent.mouseY;
        };
        //_____________________________
        Shape.prototype.onMouseMove = function (pEvent) {
        };
        //____________________________________
        Shape.prototype.onMouseUp = function () {
            image.Globals.activeShape = null;
            this.mIsMouseDown = false;
            this.mLastMouseDownPoint = null;
        };
        //___________________________________
        Shape.prototype.drawShape = function () {
        };
        //________________________
        Shape.prototype.changeShapeColor = function (pColor) {
        };
        //__________________________________
        Shape.prototype.onSelect = function () {
            image.Globals.isItemSelected = true;
            image.Globals.isSelectMode = false;
            image.Globals.isTextMode = false;
            image.Globals.isDrawMode = false;
            image.Globals.isRotateMode = false;
            image.Globals.isCropMode = false;
            image.Globals.isCircleMode = false;
            image.Globals.isArrowMode = false;
        };
        //____________________________________
        Shape.prototype.onDeselect = function () {
            image.Globals.isItemSelected = false;
        };
        //__________________________
        Shape.prototype.startDrag = function () {
        };
        //__________________________
        Shape.prototype.stopDrag = function () {
        };
        //________________________
        Shape.prototype.moveShape = function (pArr) {
            this.mShape.x = pArr[0].x;
            this.mShape.y = pArr[0].y;
        };
        //_______________________________________-
        Shape.prototype.addMouseEvents = function (pMouseDownCallBack) {
        };
        //_________________________________________
        Shape.prototype.removeMouseEvents = function () {
            var _this = this;
            this.element.removeEventListener("mousedown", function (pEvent) { return _this.mMouseDownListener(pEvent); });
            window.removeEventListener("mouseup", function () { return _this.mMouseUpListener(); }, false);
        };
        //__________________________
        Shape.prototype.deleteShape = function () {
        };
        //______________________________________
        Shape.prototype.addToSprite = function (pSprite) {
            var _this = this;
            this.mSprite = pSprite;
            this.mSprite.addChild(this.element);
            this.element.addEventListener("click", function () { return _this.onSelect(); }, this);
        };
        //_____________________________________
        Shape.prototype.clone = function () {
            var aShape = new Shape();
            aShape.mWidth = this.mWidth;
            aShape.mColor = this.mColor;
            aShape.mShape = this.element.clone();
            aShape.myClassName = this.myClassName;
            return aShape;
        };
        //________________________________________
        Shape.prototype.setShapeInBound = function () {
        };
        //___________________________________________
        Shape.prototype.setLineWidth = function (pWidth) {
            this.element.setLineStyle(pWidth);
        };
        Object.defineProperty(Shape.prototype, "scale", {
            //___________________________________
            get: function () {
                return this.mSprite.parent.parent.scaleX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "element", {
            //____________________
            get: function () {
                return this.mShape;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "myClassName", {
            //__________________________
            get: function () {
                return this.mClassName;
            },
            //_______________________________
            set: function (pClassName) {
                this.mClassName = pClassName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "parent", {
            //______________________
            get: function () {
                return this.mSprite;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "color", {
            //__________________________
            get: function () {
                return this.mColor;
            },
            enumerable: true,
            configurable: true
        });
        return Shape;
    }());
    shapes.Shape = Shape;
})(shapes || (shapes = {}));
/// <reference path="../shapes/shape.ts" />
var image;
/// <reference path="../shapes/shape.ts" />
(function (image) {
    /**
     * Class that manages cropping of an image
     *
     * @export
     * @class ImageCrop
     * @extends {shapes.Shape}
     */
    var ImageCrop = (function (_super) {
        __extends(ImageCrop, _super);
        /**
         * Creates an instance of ImageCrop.
         * @param {asSvg.Sprite} pSprite
         *
         * @memberOf ImageCrop
         */
        function ImageCrop(pSprite) {
            var _this = _super.call(this) || this;
            _this.mRectBounds = {};
            _this.mSprite = new asSvg.Sprite();
            _this.mSprite.instanceName = "Crop Panel";
            pSprite.addChild(_this.mSprite);
            return _this;
        }
        //_________________________________
        ImageCrop.prototype.onMousedown = function (pEvent) {
            _super.prototype.onMouseDown.call(this, pEvent);
            this.mRectBounds = {};
            if (this.mRect) {
                this.mSprite.removeChild(this.mRect);
            }
            this.mRect = null;
            this.mLastGoodMouseX = null;
            this.mLastGoodMouseY = null;
            this.mLastGoodRectX = null;
            this.mLastGoodRectY = null;
            this.mLastMouseDownPointRect = new asBase.math.Point();
            this.mLastMouseDownPointRect.x = this.mSprite.parent.parent.parent.mouseX;
            this.mLastMouseDownPointRect.y = this.mSprite.parent.parent.parent.mouseY;
            this.getGoodPoints(pEvent, this.mLastMouseDownPoint, this.mLastMouseDownPointRect);
        };
        //____________________________________
        ImageCrop.prototype.onMouseMove = function (pEvent) {
            if (this.mIsMouseDown) {
                var aPoint = new asBase.math.Point(this.mSprite.parent.mouseX, this.mSprite.parent.mouseY);
                var aPointRect = new asBase.math.Point(this.mSprite.parent.parent.parent.mouseX, this.mSprite.parent.parent.parent.mouseY);
                this.getGoodPoints(pEvent, aPoint, aPointRect);
                if (!this.mLastMouseDownPoint.x || !this.mLastMouseDownPoint.y) {
                    this.mLastMouseDownPoint.x = aPoint.x;
                    this.mLastMouseDownPoint.y = aPoint.y;
                    this.mLastMouseDownPointRect.x = aPointRect.x;
                    this.mLastMouseDownPointRect.y = aPointRect.y;
                }
                if (this.mLastMouseDownPoint.x && this.mLastMouseDownPoint.y && aPoint.x && aPoint.y) {
                    var aX1 = Math.min(aPoint.x, this.mLastMouseDownPoint.x);
                    var aX2 = Math.max(aPoint.x, this.mLastMouseDownPoint.x);
                    var aY1 = Math.min(aPoint.y, this.mLastMouseDownPoint.y);
                    var aY2 = Math.max(aPoint.y, this.mLastMouseDownPoint.y);
                    this.mWidth = aX2 - aX1;
                    this.mHeight = aY2 - aY1;
                    if (aPoint.x < this.mLastMouseDownPoint.x) {
                        this.mX = this.mLastMouseDownPoint.x - this.mWidth;
                    }
                    else {
                        this.mX = this.mLastMouseDownPoint.x;
                    }
                    if (aPoint.y < this.mLastMouseDownPoint.y) {
                        this.mY = this.mLastMouseDownPoint.y - this.mHeight;
                    }
                    else {
                        this.mY = this.mLastMouseDownPoint.y;
                    }
                    var aX1Rect = Math.min(aPointRect.x, this.mLastMouseDownPointRect.x);
                    var aX2Rect = Math.max(aPointRect.x, this.mLastMouseDownPointRect.x);
                    var aY1Rect = Math.min(aPointRect.y, this.mLastMouseDownPointRect.y);
                    var aY2Rect = Math.max(aPointRect.y, this.mLastMouseDownPointRect.y);
                    this.mRectBounds.width = aX2Rect - aX1Rect;
                    this.mRectBounds.height = aY2Rect - aY1Rect;
                    if (aPointRect.x < this.mLastMouseDownPointRect.x) {
                        this.mRectBounds.x = this.mLastMouseDownPointRect.x - this.mRectBounds.width;
                    }
                    else {
                        this.mRectBounds.x = this.mLastMouseDownPointRect.x;
                    }
                    if (aPointRect.y < this.mLastMouseDownPointRect.y) {
                        this.mRectBounds.y = this.mLastMouseDownPointRect.y - this.mRectBounds.height;
                    }
                    else {
                        this.mRectBounds.y = this.mLastMouseDownPointRect.y;
                    }
                    this.drawShape();
                }
            }
        };
        //____________________________________________
        ImageCrop.prototype.drawShape = function () {
            if (!this.mRect) {
                this.mRect = new asSvg.Rect(this.mX, this.mY, this.mWidth, this.mHeight);
                this.mRect.setFill(null, 0);
                this.mRect.setLineStyle(4, 0xffff, 1, null, null, [10, 3]);
                this.mSprite.addChild(this.mRect);
            }
            else {
                this.mRect.update(this.mX, this.mY, this.mWidth, this.mHeight);
            }
        };
        //_______________________________________
        ImageCrop.prototype.getGoodPoints = function (pMouseEvent, pPoint, pPointRect) {
            this.mSprite.stage.onMouseMove(pMouseEvent);
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            if ((pMouseEvent.clientX < aImageRect.left || pMouseEvent.clientX > aImageRect.right || pMouseEvent.clientY < aImageRect.top || pMouseEvent.clientY > aImageRect.bottom) && image.Globals.isDrawInBound) {
                pPoint.x = this.mLastGoodMouseX;
                pPoint.y = this.mLastGoodMouseY;
                pPointRect.x = this.mLastGoodRectX;
                pPointRect.y = this.mLastGoodRectY;
            }
            else {
                this.mLastGoodMouseX = pPoint.x = this.mSprite.parent.mouseX;
                this.mLastGoodMouseY = pPoint.y = this.mSprite.parent.mouseY;
                this.mLastGoodRectX = pPointRect.x = this.mSprite.parent.parent.parent.mouseX;
                this.mLastGoodRectY = pPointRect.y = this.mSprite.parent.parent.parent.mouseY;
            }
        };
        //_________________________________________
        ImageCrop.prototype.onMouseUp = function () {
            _super.prototype.onMouseUp.call(this);
        };
        //____________________________________________
        /**
         * Returns the bounds of the rectangle to crop
         *
         * @returns
         *
         * @memberOf ImageCrop
         */
        ImageCrop.prototype.getCropBounds = function () {
            return this.mRectBounds;
        };
        Object.defineProperty(ImageCrop.prototype, "rect", {
            //_________________________________
            /**
             * Returns the rectangle  to crop
             *
             * @readonly
             *
             * @memberOf ImageCrop
             */
            get: function () {
                return this.mRect;
            },
            enumerable: true,
            configurable: true
        });
        return ImageCrop;
    }(shapes.Shape));
    image.ImageCrop = ImageCrop;
})(image || (image = {}));
//module 
var shapes;
//module 
(function (shapes) {
    /**
     * Represents an arrow drawn by the user
     *
     * @export
     * @class Arrow
     * @extends {Shape}
     */
    var Arrow = (function (_super) {
        __extends(Arrow, _super);
        /**
         * Creates an instance of Arrow.
         * @param {asSvg.Sprite} pSprite - Sprite to draw the arrow on
         * @param {any} pColor -Color to draw the arrow- in hex code
         *
         * @memberOf Arrow
         */
        function Arrow(pSprite, pColor) {
            var _this = _super.call(this) || this;
            _this.mWidth = 4;
            _this.mArrowLength = 25;
            _this.mSprite = pSprite;
            _this.mColor = pColor;
            return _this;
        }
        //_____________________________________
        Arrow.prototype.onMouseDown = function (pMouseEvent) {
            _super.prototype.onMouseDown.call(this, pMouseEvent);
            this.getGoodPoint(pMouseEvent, this.mLastMouseDownPoint);
        };
        //____________________________________________________
        Arrow.prototype.onMouseMove = function (pMouseEvent) {
            if (this.mIsMouseDown) {
                this.mEndPoint = new asBase.math.Point(this.mSprite.parent.mouseX, this.mSprite.parent.mouseY);
                this.getGoodPoint(pMouseEvent, this.mEndPoint);
                if (!this.mLastMouseDownPoint.x || !this.mLastMouseDownPoint.y) {
                    this.mLastMouseDownPoint.x = this.mEndPoint.x;
                    this.mLastMouseDownPoint.y = this.mEndPoint.y;
                }
                this.drawShape();
            }
        };
        //_____________________________
        Arrow.prototype.drawShape = function () {
            var _this = this;
            if (this.mLastMouseDownPoint.x && this.mLastMouseDownPoint.y && this.mEndPoint.x && this.mEndPoint.y) {
                if (!this.mLines) {
                    this.mLines = new Array();
                    //main line
                    this.mLines[0] = new asSvg.Line(this.mLastMouseDownPoint.x, this.mLastMouseDownPoint.y, this.mEndPoint.x, this.mEndPoint.y);
                    this.mLines[0].setFill(null);
                    this.mLines[0].setLineStyle(this.mWidth / this.scale, 0xffbbff);
                    this.mLines[0].element.setAttribute("stroke", this.mColor);
                    this.mSprite.addChild(this.mLines[0]);
                    this.mLines[0].addEventListener("click", function () { return _this.onSelect(); }, this);
                    ////arrow line 1
                    var aArrowPoint1 = this.getArrowPoint1();
                    if (isNaN(aArrowPoint1.x) || isNaN(aArrowPoint1.y)) {
                        aArrowPoint1.x = this.mEndPoint.x;
                        aArrowPoint1.y = this.mEndPoint.y;
                    }
                    this.mLines[1] = new asSvg.Line(this.mEndPoint.x, this.mEndPoint.y, aArrowPoint1.x, aArrowPoint1.y);
                    this.mLines[1].setFill(null);
                    this.mLines[1].setLineStyle((this.mWidth / this.scale) * 0.5);
                    this.mLines[1].element.setAttribute("stroke", this.mColor);
                    this.mSprite.addChild(this.mLines[1]);
                    this.mLines[1].addEventListener("click", function () { return _this.onSelect(); }, this);
                    var aArrowPoint2 = this.getArrowPoint2();
                    if (isNaN(aArrowPoint2.x) || isNaN(aArrowPoint2.y)) {
                        aArrowPoint2.x = this.mEndPoint.x;
                        aArrowPoint2.y = this.mEndPoint.y;
                    }
                    this.mLines[2] = new asSvg.Line(this.mEndPoint.x, this.mEndPoint.y, aArrowPoint2.x, aArrowPoint2.y);
                    this.mLines[2].setFill(null);
                    this.mLines[2].setLineStyle((this.mWidth / this.scale) * 0.5);
                    this.mLines[2].element.setAttribute("stroke", this.mColor);
                    this.mSprite.addChild(this.mLines[2]);
                    this.mLines[2].addEventListener("click", function () { return _this.onSelect(); }, this);
                }
                else {
                    this.mLines[0].update(this.mLastMouseDownPoint.x, this.mLastMouseDownPoint.y, this.mEndPoint.x, this.mEndPoint.y);
                    var aArrowPoint1 = this.getArrowPoint1();
                    if (isNaN(aArrowPoint1.x) || isNaN(aArrowPoint1.y)) {
                        aArrowPoint1.x = this.mEndPoint.x;
                        aArrowPoint1.y = this.mEndPoint.y;
                    }
                    this.mLines[1].update(this.mEndPoint.x, this.mEndPoint.y, aArrowPoint1.x, aArrowPoint1.y);
                    var aArrowPoint2 = this.getArrowPoint2();
                    if (isNaN(aArrowPoint2.x) || isNaN(aArrowPoint2.y)) {
                        aArrowPoint2.x = this.mEndPoint.x;
                        aArrowPoint2.y = this.mEndPoint.y;
                    }
                    this.mLines[2].update(this.mEndPoint.x, this.mEndPoint.y, aArrowPoint2.x, aArrowPoint2.y);
                }
            }
        };
        //________________________________
        Arrow.prototype.onMouseUp = function () {
            image.Globals.isArrowMode = false;
            _super.prototype.onMouseUp.call(this);
            if (this.mLines) {
                for (var i = 0; i < this.mLines.length; i++) {
                    if (this.mLines[i].getBounds().width == 0 && this.mLines[i].getBounds().height) {
                        this.mLines[0].destruct();
                        this.mLines[1].destruct();
                        this.mLines[2].destruct();
                        image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
                        break;
                    }
                }
            }
            else {
                image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
            }
        };
        Object.defineProperty(Arrow.prototype, "length", {
            //________________________________
            /**
             * Returns the length of the arrow
             *
             * @readonly
             *
             * @memberOf Arrow
             * @returns {number}-length of arrow
             */
            get: function () {
                var aLen = asBase.math.MathUtils.distance(this.mEndPoint, this.mLastMouseDownPoint);
                return aLen;
            },
            enumerable: true,
            configurable: true
        });
        //________________________________________________
        Arrow.prototype.getLineAngle = function () {
            var angle = Math.atan((this.mEndPoint.x - this.mLastMouseDownPoint.x) / (this.mEndPoint.y - this.mLastMouseDownPoint.y)) * 180 / Math.PI;
            return angle;
        };
        //_______________________
        Arrow.prototype.getArrowPoint1 = function () {
            var arrowAngle = this.getLineAngle() + 45;
            if (this.mEndPoint.y < this.mLastMouseDownPoint.y) {
                arrowAngle = this.getLineAngle() + 180 + 45;
            }
            var aAdjAngle = 180 - arrowAngle;
            var aX = this.mEndPoint.x - (Math.cos(aAdjAngle * Math.PI / 180)) * (20);
            var aY = this.mEndPoint.y - (Math.sin(aAdjAngle * Math.PI / 180)) * (20);
            var aPoint = new asBase.math.Point(aX, aY);
            return aPoint;
        };
        //________________________________________
        Arrow.prototype.getArrowPoint2 = function () {
            var arrowAngle = this.getLineAngle() - 45;
            if (this.mEndPoint.y < this.mLastMouseDownPoint.y) {
                arrowAngle = this.getLineAngle() + 180 - 45;
            }
            var aAdjAngle = 180 - arrowAngle;
            var aX = this.mEndPoint.x + (Math.cos(aAdjAngle * Math.PI / 180)) * (20);
            var aY = this.mEndPoint.y + (Math.sin(aAdjAngle * Math.PI / 180)) * (20);
            var aPoint = new asBase.math.Point(aX, aY);
            return aPoint;
        };
        //_______________________________________________________
        Arrow.prototype.onSelect = function () {
            if (!image.Globals.isItemSelected) {
                _super.prototype.onSelect.call(this);
                this.mHighlightedLines = new Array();
                for (var i = 0; i < this.mLines.length; i++) {
                    var aLine = this.mLines[i].clone();
                    this.mSprite.addChild(aLine);
                    this.mSprite.addChild(this.mLines[i]);
                    this.mHighlightedLines.push(aLine);
                    aLine.setLineStyle(this.mWidth * 2.5, null, 0.5);
                }
                image.Globals.ImageDrawing.onSelectShape(this);
            }
        };
        //_________________________________________
        /**
         * Function that is called when the arrow object is unselected by the user
         *
         *
         * @memberOf Arrow
         */
        Arrow.prototype.onDeselect = function () {
            _super.prototype.onDeselect.call(this);
            for (var i = 0; i < this.mHighlightedLines.length; i++) {
                this.mSprite.removeChild(this.mHighlightedLines[i]);
            }
        };
        //______________________________
        /**
         * Changes the color of the arrow
         *
         * @param {any} pColor -color to change to- in hex code
         *
         * @memberOf Arrow
         */
        Arrow.prototype.changeShapeColor = function (pColor) {
            for (var i = 0; i < this.mLines.length; i++) {
                this.mLines[i].element.setAttribute("stroke", pColor);
            }
            if (this.mHighlightedLines) {
                for (var i = 0; i < this.mHighlightedLines.length; i++) {
                    this.mHighlightedLines[i].element.setAttribute("stroke", pColor);
                }
            }
        };
        //___________________________________________________
        /**
         * Starts dragging the arrow object on the screen by the mouse
         *
         *
         * @memberOf Arrow
         */
        Arrow.prototype.startDrag = function () {
            var _this = this;
            var aOldPositionArr = new Array();
            this.mLastGoodX = new Array(3);
            this.mLastGoodY = new Array(3);
            for (var i = 0; i < this.mLines.length; i++) {
                this.mLastGoodX[i] = this.mLines[i].x;
                this.mLastGoodY[i] = this.mLines[i].y;
                var aPoint = new asBase.math.Point(this.mLines[i].x, this.mLines[i].y);
                aOldPositionArr.push(aPoint);
                image.Globals.currentShapeDragAction = new action.DragShapeAction(aOldPositionArr, this);
            }
            if (this.mHighlightedLines) {
                for (var i = 0; i < this.mHighlightedLines.length; i++) {
                    this.mHighlightedLines[i].startDrag();
                }
            }
            for (var i = 0; i < this.mLines.length - 1; i++) {
                this.mLines[i].startDrag();
            }
            this.mLines[2].startDrag(false, function () { return _this.setShapeInBound(); });
        };
        //_____________________________________________
        /**
         * Stops dragging the arrow object on the screen
         *
         *
         * @memberOf Arrow
         */
        Arrow.prototype.stopDrag = function () {
            for (var i = 0; i < this.mLines.length; i++) {
                this.mLines[i].stopDrag();
            }
            if (this.mHighlightedLines) {
                for (var i = 0; i < this.mHighlightedLines.length; i++) {
                    this.mHighlightedLines[i].stopDrag();
                }
            }
            var aNewPositionArr = new Array();
            if (image.Globals.currentShapeDragAction && !image.Globals.currentShapeDragAction.isAdded) {
                for (var i = 0; i < this.mLines.length; i++) {
                    var aPoint = new asBase.math.Point(this.mLines[i].x, this.mLines[i].y);
                    aNewPositionArr.push(aPoint);
                    image.Globals.currentShapeDragAction.newPosition = aNewPositionArr;
                    image.Globals.ActionManager.addAction(image.Globals.currentShapeDragAction);
                }
            }
        };
        //______________________________________
        Arrow.prototype.setShapeInBound = function () {
            if (image.Globals.ImageDrawing.isOriginalRatio) {
                this.setShapeInBoundOriginal();
            }
            else {
                this.setShapeInBoundTransform();
            }
        };
        //___________________________________
        Arrow.prototype.setShapeInBoundOriginal = function () {
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            for (var i = 0; i < this.mLines.length; i++) {
                var aLineRect = this.mLines[i].getBounds();
                if ((aLineRect.left < aImageRect.left || aLineRect.right > aImageRect.right && image.Globals.isDrawInBound)) {
                    this.mLines[0].x = this.mLastGoodX[0];
                    this.mLines[1].x = this.mLastGoodX[1];
                    this.mLines[2].x = this.mLastGoodX[2];
                    if (this.mHighlightedLines) {
                        this.mHighlightedLines[0].x = this.mLastGoodX[0];
                        this.mHighlightedLines[1].x = this.mLastGoodX[1];
                        this.mHighlightedLines[2].x = this.mLastGoodX[2];
                    }
                }
                else {
                    this.mLastGoodX[0] = this.mLines[0].x;
                    this.mLastGoodX[1] = this.mLines[1].x;
                    this.mLastGoodX[2] = this.mLines[2].x;
                }
            }
            for (var i = 0; i < this.mLines.length; i++) {
                var aLineRect = this.mLines[i].getBounds();
                if ((aLineRect.top < aImageRect.top || aLineRect.bottom > aImageRect.bottom && image.Globals.isDrawInBound)) {
                    this.mLines[0].y = this.mLastGoodY[0];
                    this.mLines[1].y = this.mLastGoodY[1];
                    this.mLines[2].y = this.mLastGoodY[2];
                    if (this.mHighlightedLines) {
                        this.mHighlightedLines[0].y = this.mLastGoodY[0];
                        this.mHighlightedLines[1].y = this.mLastGoodY[1];
                        this.mHighlightedLines[2].y = this.mLastGoodY[2];
                    }
                }
                else {
                    this.mLastGoodY[0] = this.mLines[0].y;
                    this.mLastGoodY[1] = this.mLines[1].y;
                    this.mLastGoodY[2] = this.mLines[2].y;
                }
            }
        };
        //___________________________________
        Arrow.prototype.setShapeInBoundTransform = function () {
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            for (var i = 0; i < this.mLines.length; i++) {
                var aLineRect = this.mLines[i].getBounds();
                if ((aLineRect.left < aImageRect.left || aLineRect.right > aImageRect.right) && image.Globals.isDrawInBound) {
                    this.mLines[0].y = this.mLastGoodY[0];
                    this.mLines[1].y = this.mLastGoodY[1];
                    this.mLines[2].y = this.mLastGoodY[2];
                    if (this.mHighlightedLines) {
                        this.mHighlightedLines[0].y = this.mLastGoodY[0];
                        this.mHighlightedLines[1].y = this.mLastGoodY[1];
                        this.mHighlightedLines[2].y = this.mLastGoodY[2];
                    }
                }
                else {
                    this.mLastGoodY[0] = this.mLines[0].y;
                    this.mLastGoodY[1] = this.mLines[1].y;
                    this.mLastGoodY[2] = this.mLines[2].y;
                }
            }
            for (var i = 0; i < this.mLines.length; i++) {
                var aLineRect = this.mLines[i].getBounds();
                if ((aLineRect.top < aImageRect.top || aLineRect.bottom > aImageRect.bottom) && image.Globals.isDrawInBound) {
                    this.mLines[0].x = this.mLastGoodX[0];
                    this.mLines[1].x = this.mLastGoodX[1];
                    this.mLines[2].x = this.mLastGoodX[2];
                    if (this.mHighlightedLines) {
                        this.mHighlightedLines[0].x = this.mLastGoodX[0];
                        this.mHighlightedLines[1].x = this.mLastGoodX[1];
                        this.mHighlightedLines[2].x = this.mLastGoodX[2];
                    }
                }
                else {
                    this.mLastGoodX[0] = this.mLines[0].x;
                    this.mLastGoodX[1] = this.mLines[1].x;
                    this.mLastGoodX[2] = this.mLines[2].x;
                }
            }
        };
        //_____________________________________
        Arrow.prototype.getGoodPoint = function (pMouseEvent, pPoint) {
            this.mSprite.stage.onMouseMove(pMouseEvent);
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            if ((pMouseEvent.clientX < aImageRect.left || pMouseEvent.clientX > aImageRect.right || pMouseEvent.clientY < aImageRect.top || pMouseEvent.clientY > aImageRect.bottom) && image.Globals.isDrawInBound) {
                pPoint.x = this.mLastGoodMouseX;
                pPoint.y = this.mLastGoodMouseY;
            }
            else {
                this.mLastGoodMouseX = pPoint.x = this.mSprite.parent.mouseX;
                this.mLastGoodMouseY = pPoint.y = this.mSprite.parent.mouseY;
            }
        };
        //__________________________________________________
        /**
         * Moves the arrow object to a given point
         *
         * @param {Array<asBase.math.Point>} pArr -Point to move arrow to {x,y}
         *
         * @memberOf Arrow
         */
        Arrow.prototype.moveShape = function (pArr) {
            for (var i = 0; i < this.mLines.length; i++) {
                this.mLines[i].x = pArr[i].x,
                    this.mLines[i].y = pArr[i].y;
            }
        };
        //____________________________________________________
        /**
         * Add mouse events to the arrow object
         *
         * @param {Function} pMouseDownCallBack -Callback for "mouse down"
         *
         * @memberOf Arrow
         */
        Arrow.prototype.addMouseEvents = function (pMouseDownCallBack) {
            for (var i = 0; i < this.mLines.length; i++) {
                this.mLines[i].addEventListener("mousedown", function (pEvent) { return pMouseDownCallBack(pEvent); }, this);
            }
            this.mMouseDownListener = function () { return pMouseDownCallBack(); };
        };
        //____________________________________
        /**
         * Removes mouse events from the arrow o
         *
         *
         * @memberOf Arrow
         */
        Arrow.prototype.removeMouseEvents = function () {
            for (var i = 0; i < this.mLines.length; i++) {
                this.mLines[i].removeEventListener("mousedown", this.mMouseDownListener);
            }
        };
        //________________________________________
        /**
         * Deletes the arrow object and removes it from the sprite
         *
         *
         * @memberOf Arrow
         */
        Arrow.prototype.deleteShape = function () {
            for (var i = 0; i < this.mLines.length; i++) {
                this.mLines[i].destruct();
            }
            if (this.mHighlightedLines) {
                for (var i = 0; i < this.mHighlightedLines.length; i++) {
                    this.mHighlightedLines[i].destruct();
                }
            }
        };
        //____________________________________________
        /**
         * Clones the arrow object
         *
         * @returns {Arrow} -The cloned arrow
         *
         * @memberOf Arrow
         */
        Arrow.prototype.clone = function () {
            var aShape = new Arrow(null, this.mColor);
            aShape.mWidth = this.mWidth;
            aShape.mColor = this.mColor;
            aShape.mLines = new Array();
            for (var i = 0; i < this.mLines.length; i++) {
                aShape.mLines[i] = this.mLines[i].clone();
            }
            return aShape;
        };
        //________________________________
        /**
         * Adds the arrow object to a  svg sprite
         *
         * @param {asSvg.Sprite} pSprite - SVG Sprite to add arrow to
         *
         * @memberOf Arrow
         */
        Arrow.prototype.addToSprite = function (pSprite) {
            var _this = this;
            this.mSprite = pSprite;
            for (var i = 0; i < this.mLines.length; i++) {
                this.mSprite.addChild(this.mLines[i]);
                this.mLines[i].addEventListener("click", function () { return _this.onSelect(); }, this);
            }
        };
        //_______________________
        /**
         * Set the line width of arrow
         *
         * @param {number} pWidth -Width to set arrow to
         *
         * @memberOf Arrow
         */
        Arrow.prototype.setLineWidth = function (pWidth) {
            this.mLines[0].setLineStyle(pWidth);
            this.mLines[1].setLineStyle(pWidth * 0.5);
            this.mLines[2].setLineStyle(pWidth * 0.5);
        };
        return Arrow;
    }(shapes.Shape));
    shapes.Arrow = Arrow;
})(shapes || (shapes = {}));
/// <reference path="shape.ts" />
var shapes;
/// <reference path="shape.ts" />
(function (shapes) {
    /**
     * Class reprsenting a circle drawn by the user
     *
     * @export
     * @class Circle
     * @extends {Shape}
     */
    var Circle = (function (_super) {
        __extends(Circle, _super);
        /**
         * Creates an instance of Circle.
         * @param {asSvg.Sprite} pSprite -SVG Sprite to draw circle on
         * @param {any} pColor -Color to draw circle in
         *
         * @memberOf Circle
         */
        function Circle(pSprite, pColor) {
            var _this = _super.call(this) || this;
            _this.mWidth = 4;
            _this.mClassName = "Circle";
            _this.mSprite = pSprite;
            _this.mColor = pColor;
            return _this;
        }
        //_________________________________________
        Circle.prototype.onMouseDown = function (pMouseEvent) {
            _super.prototype.onMouseDown.call(this, pMouseEvent);
            this.getGoodPoint(pMouseEvent, this.mLastMouseDownPoint);
        };
        //_____________________________________
        Circle.prototype.onMouseMove = function (pEvent) {
            var aPoint = new asBase.math.Point(this.mSprite.parent.mouseX, this.mSprite.parent.mouseY);
            this.getGoodPoint(pEvent, aPoint);
            if (!this.mLastMouseDownPoint.x || !this.mLastMouseDownPoint.y) {
                this.mLastMouseDownPoint.x = aPoint.x;
                this.mLastMouseDownPoint.y = aPoint.y;
            }
            var aDist = asBase.math.MathUtils.distance(this.mLastMouseDownPoint, aPoint);
            this.mRadius = aDist;
            this.drawShape();
        };
        //_________________________________________
        Circle.prototype.drawShape = function () {
            var _this = this;
            if (this.mLastMouseDownPoint.x && this.mLastMouseDownPoint.y && this.mRadius && !isNaN(this.mRadius)) {
                var aX = void 0, aY = void 0;
                if (this.mSprite.parent.mouseX < this.mLastMouseDownPoint.x) {
                    this.mX = this.mSprite.parent.mouseX + this.mRadius / 2;
                }
                else {
                    this.mX = this.mLastMouseDownPoint.x + this.mRadius / 2;
                }
                if (this.mSprite.parent.mouseY < this.mLastMouseDownPoint.y) {
                    this.mY = this.mSprite.parent.mouseY + this.mRadius / 2;
                }
                else {
                    this.mY = this.mLastMouseDownPoint.y + this.mRadius / 2;
                }
                if (!this.mCircle) {
                    this.mCircle = new asSvg.Circle(this.mX, this.mY, this.mRadius / 2);
                    this.mCircle.setFill(null);
                    this.mCircle.setLineStyle(this.mWidth / this.scale);
                    this.mCircle.element.setAttribute("stroke", this.mColor);
                    this.mSprite.addChild(this.mCircle);
                    this.mCircle.addEventListener("click", function () { return _this.onSelect(); }, this);
                    this.mLastGoodMouseX = this.mSprite.parent.mouseX;
                    this.mLastGoodMouseY = this.mSprite.parent.mouseY;
                    this.mLastGoodX = this.mLastGoodMouseX;
                    this.mLastGoodY = this.mLastGoodMouseY;
                }
                else {
                    this.mCircle.update(this.mX, this.mY, this.mRadius / 2);
                    this.drawShapeInBound();
                }
            }
        };
        //____________________________
        Circle.prototype.onSelect = function () {
            if (!image.Globals.isItemSelected) {
                _super.prototype.onSelect.call(this);
                this.mHighlightedCircle = this.mCircle.clone();
                this.mHighlightedCircle.setLineStyle(this.mWidth * 4 / this.scale, null, 0.5);
                this.mHighlightedCircle.element.setAttribute("stroke", this.mColor);
                this.mSprite.addChild(this.mHighlightedCircle);
                this.mSprite.addChild(this.mCircle);
                image.Globals.ImageDrawing.onSelectShape(this);
            }
        };
        //_____________________________
        Circle.prototype.onMouseUp = function () {
            image.Globals.isCircleMode = false;
            _super.prototype.onMouseUp.call(this);
            if (this.mCircle) {
                if (this.mCircle.getBounds().width == 0 && this.mCircle.getBounds().height == 0) {
                    this.mCircle.destruct();
                    image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
                }
            }
            else {
                image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
            }
        };
        //___________________________________
        /**
         * Changes the color of the circle object
         *
         * @param {any} pColor -Color to set the circle to -in hex code
         *
         * @memberOf Circle
         */
        Circle.prototype.changeShapeColor = function (pColor) {
            this.mCircle.element.setAttribute("stroke", pColor);
            if (this.mHighlightedCircle) {
                this.mHighlightedCircle.element.setAttribute("stroke", pColor);
            }
        };
        //____________________________________
        Circle.prototype.onDeselect = function () {
            _super.prototype.onDeselect.call(this);
            this.mSprite.removeChild(this.mHighlightedCircle);
        };
        //______________________
        /**
         * Adds event listeners for mouse events to the circle object
         *
         * @param {Function} pMouseDownCallBack -Callback for the mousedown events
         *
         * @memberOf Circle
         */
        Circle.prototype.addMouseEvents = function (pMouseDownCallBack) {
            this.mCircle.addEventListener("mousedown", function (pEvent) { return pMouseDownCallBack(pEvent); }, this);
            this.mMouseDownListener = function () { return pMouseDownCallBack(); };
        };
        //________________________________
        /**
         * Starts dragging the circle object by following the mouse position
         *
         *
         * @memberOf Circle
         */
        Circle.prototype.startDrag = function () {
            var _this = this;
            this.mX = this.mCircle.x;
            this.mY = this.mCircle.y;
            this.mLastGoodX = this.mCircle.x;
            this.mLastGoodY = this.mCircle.y;
            var aOldPostionArr = new Array();
            var aPoint = new asBase.math.Point(this.mX, this.mY);
            aOldPostionArr.push(aPoint);
            image.Globals.currentShapeDragAction = new action.DragShapeAction(aOldPostionArr, this);
            if (this.mHighlightedCircle) {
                this.mHighlightedCircle.startDrag();
            }
            this.mCircle.startDrag(false, function () { return _this.setShapeInBound(); });
        };
        //_________________________________________________
        /**
         * Stops dragging the circle object
         *
         *
         * @memberOf Circle
         */
        Circle.prototype.stopDrag = function () {
            this.mX = this.mCircle.x;
            this.mY = this.mCircle.y;
            this.mCircle.stopDrag();
            if (this.mHighlightedCircle) {
                this.mHighlightedCircle.stopDrag();
            }
            if (image.Globals.currentShapeDragAction && !image.Globals.currentShapeDragAction.isAdded) {
                var aNewPositionArr = new Array();
                var aPoint = new asBase.math.Point(this.mX, this.mY);
                aNewPositionArr.push(aPoint);
                image.Globals.currentShapeDragAction.newPosition = aNewPositionArr;
                image.Globals.ActionManager.addAction(image.Globals.currentShapeDragAction);
            }
        };
        //_____________________________________________________
        /**
         * Moves the circle object to a  given point
         *
         * @param {Array<asBase.math.Point>} pArr -Array of points to move circle to
         *
         * @memberOf Circle
         */
        Circle.prototype.moveShape = function (pArr) {
            this.mCircle.x = pArr[0].x;
            this.mCircle.y = pArr[0].y;
        };
        //_________________________________________________________
        Circle.prototype.setShapeInBound = function () {
            if (image.Globals.ImageDrawing.isOriginalRatio) {
                this.setShapeInBoundOriginal();
            }
            else {
                this.setShapeInBoundTransform();
            }
        };
        //__________________________________
        Circle.prototype.setShapeInBoundOriginal = function () {
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            var aShapeRect = this.mCircle.getBounds();
            if ((aShapeRect.left < aImageRect.left || aShapeRect.right > aImageRect.right) && image.Globals.isDrawInBound) {
                this.mCircle.x = this.mLastGoodX;
                if (this.mHighlightedCircle) {
                    this.mHighlightedCircle.x = this.mLastGoodX;
                }
            }
            else {
                this.mLastGoodX = this.mCircle.x;
            }
            if ((aShapeRect.top < aImageRect.top || aShapeRect.bottom > aImageRect.bottom) && image.Globals.isDrawInBound) {
                this.mCircle.y = this.mLastGoodY;
                if (this.mHighlightedCircle) {
                    this.mHighlightedCircle.y = this.mLastGoodY;
                }
            }
            else {
                this.mLastGoodY = this.mCircle.y;
            }
        };
        //_____________________________________
        Circle.prototype.setShapeInBoundTransform = function () {
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            var aShapeRect = this.mCircle.getBounds();
            if ((aShapeRect.left < aImageRect.left || aShapeRect.right > aImageRect.right) && image.Globals.isDrawInBound) {
                this.mCircle.y = this.mLastGoodY;
                if (this.mHighlightedCircle) {
                    this.mHighlightedCircle.y = this.mLastGoodY;
                }
            }
            else {
                this.mLastGoodY = this.mCircle.y;
            }
            if ((aShapeRect.top < aImageRect.top || aShapeRect.bottom > aImageRect.bottom) && image.Globals.isDrawInBound) {
                this.mCircle.x = this.mLastGoodX;
                if (this.mHighlightedCircle) {
                    this.mHighlightedCircle.x = this.mLastGoodX;
                }
            }
            else {
                this.mLastGoodX = this.mCircle.x;
            }
        };
        //__________________________________
        Circle.prototype.getGoodPoint = function (pMouseEvent, pPoint) {
            this.mSprite.stage.onMouseMove(pMouseEvent);
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            if ((pMouseEvent.clientX < aImageRect.left || pMouseEvent.clientX > aImageRect.right || pMouseEvent.clientY < aImageRect.top || pMouseEvent.clientY > aImageRect.bottom) && image.Globals.isDrawInBound) {
                pPoint.x = this.mLastGoodMouseX;
                pPoint.y = this.mLastGoodMouseY;
            }
            else {
                this.mLastGoodMouseX = pPoint.x = this.mSprite.parent.mouseX;
                this.mLastGoodMouseY = pPoint.y = this.mSprite.parent.mouseY;
            }
        };
        //________________________________________
        Circle.prototype.drawShapeInBound = function () {
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            var aCircleRect = this.mCircle.getBounds();
            var aMouseX, aMouseY;
            if ((aCircleRect.left < aImageRect.left || aCircleRect.right > aImageRect.right || aCircleRect.top < aImageRect.top || aCircleRect.bottom > aImageRect.bottom) && image.Globals.isDrawInBound) {
                console.log("out of bounds circle");
                aMouseX = this.mLastGoodX;
                aMouseY = this.mLastGoodY;
                var aPoint = new asBase.math.Point(aMouseX, aMouseY);
                var aDist = asBase.math.MathUtils.distance(this.mLastMouseDownPoint, aPoint);
                this.mRadius = aDist;
                if (aPoint.x < this.mLastMouseDownPoint.x) {
                    this.mX = aPoint.x + this.mRadius / 2;
                }
                else {
                    this.mX = this.mLastMouseDownPoint.x + this.mRadius / 2;
                }
                if (aPoint.y < this.mLastMouseDownPoint.y) {
                    this.mY = aPoint.y + this.mRadius / 2;
                }
                else {
                    this.mY = this.mLastMouseDownPoint.y + this.mRadius / 2;
                }
                this.mCircle.update(this.mX, this.mY, this.mRadius / 2);
            }
            else {
                this.mLastGoodX = this.mSprite.parent.mouseX;
                this.mLastGoodY = this.mSprite.parent.mouseY;
            }
        };
        //_________________________________________________________
        /**
         * Deletes the circle object and removes it from the sprite
         *
         *
         * @memberOf Circle
         */
        Circle.prototype.deleteShape = function () {
            this.mCircle.destruct();
            if (this.mHighlightedCircle) {
                this.mHighlightedCircle.destruct();
            }
        };
        //___________________________
        /**
         * Clones the circle object
         *
         * @returns {Circle} -the cloned circle
         *
         * @memberOf Circle
         */
        Circle.prototype.clone = function () {
            var aShape = new Circle(null, this.mColor);
            aShape.mWidth = this.mWidth;
            aShape.mColor = this.mColor;
            aShape.mCircle = this.element.clone();
            aShape.myClassName = this.myClassName;
            return aShape;
        };
        //_________________________________________________________
        /**
         * Adds the circle object to a given SVG sprite
         *
         * @param {asSvg.Sprite} pSprite -Sprite to add circle to
         *
         * @memberOf Circle
         */
        Circle.prototype.addToSprite = function (pSprite) {
            var _this = this;
            this.mSprite = pSprite;
            this.mSprite.addChild(this.mCircle);
            this.mCircle.addEventListener("click", function () { return _this.onSelect(); }, this);
        };
        Object.defineProperty(Circle.prototype, "element", {
            //_________________________
            /**
             * Return the asSVG display object
             *
             * @readonly
             *
             * @memberOf Circle
             */
            get: function () {
                return this.mCircle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "myClassName", {
            //_________________________
            /**
             * Returns the class name
             *
             * @readonly
             * @type {string}
             * @memberOf Circle
             */
            get: function () {
                return this.mClassName;
            },
            //_______________________________
            /**
             * Sets the class name
             *
             *
             * @memberOf Circle
             */
            set: function (pClassName) {
                this.mClassName = pClassName;
            },
            enumerable: true,
            configurable: true
        });
        return Circle;
    }(shapes.Shape));
    shapes.Circle = Circle;
})(shapes || (shapes = {}));
var shapes;
(function (shapes) {
    /**
     * Class representing a scribble drawn by the user
     *
     * @export
     * @class Scribble
     * @extends {Shape}
     */
    var Scribble = (function (_super) {
        __extends(Scribble, _super);
        /**
         * Creates an instance of Scribble.
         * @param {asSvg.Sprite} pSprite -Sprite to add scribble object to
         * @param {any} pColor -Color of scribble
         * @param {number} pLineWidth -Line width of scribble
         *
         * @memberOf Scribble
         */
        function Scribble(pSprite, pColor, pLineWidth) {
            var _this = _super.call(this) || this;
            _this.mIsMouseDown = false;
            _this.mClassName = "Scribble";
            _this.mSprite = pSprite;
            _this.mColor = pColor;
            _this.mWidth = pLineWidth;
            return _this;
        }
        //_______________________________
        Scribble.prototype.onMouseDown = function (pMouseEvent) {
            _super.prototype.onMouseDown.call(this, pMouseEvent);
            this.getGoodPoint(pMouseEvent, this.mLastMouseDownPoint);
        };
        //________________________________
        Scribble.prototype.onMouseMove = function (pMouseEvent) {
            var aPoint = new asBase.math.Point(this.mSprite.parent.mouseX, this.mSprite.parent.mouseY);
            this.getGoodPoint(pMouseEvent, aPoint);
            if (this.mIsMouseDown) {
                if (!this.mLastMouseDownPoint.x || !this.mLastMouseDownPoint.y) {
                    this.mLastMouseDownPoint.x = aPoint.x;
                    this.mLastMouseDownPoint.y = aPoint.y;
                }
                this.drawShape();
            }
        };
        //________________________________
        Scribble.prototype.drawShape = function () {
            var _this = this;
            if (this.mLastMouseDownPoint.x && this.mLastMouseDownPoint.y && this.mLastGoodX && this.mLastGoodY) {
                if (!this.mShape) {
                    this.mShape = new asSvg.Shape();
                    this.mSprite.addChild(this.mShape);
                    this.mShape.setFill(null);
                    this.mShape.setLineStyle(image.ImageDrawing.LINE_WIDTH / this.scale, parseInt(this.mColor));
                    this.mShape.addEventListener("click", function () { return _this.onSelect(); }, this);
                    this.mShape.moveTo(this.mLastMouseDownPoint.x, this.mLastMouseDownPoint.y);
                }
                else {
                    this.mShape.element.setAttribute("stroke", this.mColor);
                    this.mShape.setLineStyle(this.mWidth / this.scale);
                    this.mShape.lineTo(this.mLastGoodX, this.mLastGoodY);
                }
            }
        };
        //________________________________
        Scribble.prototype.onMouseUp = function () {
            _super.prototype.onMouseUp.call(this);
            if (this.mShape) {
                if (this.mShape.getBounds().width == 0 && this.mShape.getBounds().height == 0) {
                    this.mShape.destruct();
                    image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
                }
            }
            else {
                image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
            }
        };
        //________________________________
        Scribble.prototype.onSelect = function () {
            if (!image.Globals.isItemSelected) {
                _super.prototype.onSelect.call(this);
                this.mHighlightedShape = this.mShape.clone();
                this.mHighlightedShape.setLineStyle(this.mWidth * 4 / this.scale, null, 0.5);
                this.mHighlightedShape.element.setAttribute("stroke", this.mColor);
                this.mSprite.addChild(this.mHighlightedShape);
                this.mSprite.addChild(this.mShape);
                image.Globals.ImageDrawing.onSelectShape(this);
            }
        };
        //________________________________
        Scribble.prototype.onDeselect = function () {
            _super.prototype.onDeselect.call(this);
            this.mHighlightedShape.destruct();
        };
        //________________________________
        /**
         * Changes the color of the scribble object
         *
         * @param {any} pColor -color to set to -in hex code
         *
         * @memberOf Scribble
         */
        Scribble.prototype.changeShapeColor = function (pColor) {
            this.mShape.element.setAttribute("stroke", pColor);
            if (this.mHighlightedShape) {
                this.mHighlightedShape.element.setAttribute("stroke", pColor);
            }
        };
        Object.defineProperty(Scribble.prototype, "scale", {
            //_________________________________
            /**
             * Returns the scale of the  SVG stage
             *
             * @readonly
             * @type {number}
             * @memberOf Scribble
             */
            get: function () {
                return this.mSprite.parent.parent.scaleX;
            },
            enumerable: true,
            configurable: true
        });
        //_________________________________
        /**
         * Adds mouse event listeners to the scribble object
         *
         * @param {Function} pMouseDownCallBack - mousedown event callback
         *
         * @memberOf Scribble
         */
        Scribble.prototype.addMouseEvents = function (pMouseDownCallBack) {
            this.mShape.addEventListener("mousedown", function (pEvent) { return pMouseDownCallBack(pEvent); }, this);
            this.mMouseDownListener = pMouseDownCallBack;
        };
        //__________________________________
        /**
         * Starts dragging the scribble object according the mouse's position
         *
         *
         * @memberOf Scribble
         */
        Scribble.prototype.startDrag = function () {
            var _this = this;
            this.mLastGoodX = this.mShape.x;
            this.mLastGoodY = this.mShape.y;
            var aOlDPositionArr = Array();
            var aPoint = new asBase.math.Point(this.mShape.x, this.mShape.y);
            aOlDPositionArr.push(aPoint);
            image.Globals.currentShapeDragAction = new action.DragShapeAction(aOlDPositionArr, this);
            if (this.mHighlightedShape) {
                this.mHighlightedShape.startDrag();
            }
            this.mShape.startDrag(false, function () { return _this.setShapeInBound(); });
        };
        //__________________________________
        /**
         * Stops dragging the scribble onject
         *
         *
         * @memberOf Scribble
         */
        Scribble.prototype.stopDrag = function () {
            this.mShape.stopDrag();
            if (this.mHighlightedShape) {
                this.mHighlightedShape.stopDrag();
            }
            if (image.Globals.currentShapeDragAction && !image.Globals.currentShapeDragAction.isAdded) {
                var aNewPositionArr = new Array();
                var aPoint = new asBase.math.Point(this.mShape.x, this.mShape.y);
                aNewPositionArr.push(aPoint);
                image.Globals.currentShapeDragAction.newPosition = aNewPositionArr;
                image.Globals.ActionManager.addAction(image.Globals.currentShapeDragAction);
            }
        };
        //__________________________________
        /**
         * Deletes the scribble object and removes it from the sprite
         *
         *
         * @memberOf Scribble
         */
        Scribble.prototype.deleteShape = function () {
            this.mShape.destruct();
            if (this.mHighlightedShape) {
                this.mHighlightedShape.destruct();
            }
        };
        //__________________________________
        /**
         * Moves the scribble object to a given point
         *
         * @param {Array<asBase.math.Point>} pArr -Array of one point to move scribble to
         *
         * @memberOf Scribble
         */
        Scribble.prototype.moveShape = function (pArr) {
            this.mShape.x = pArr[0].x;
            this.mShape.y = pArr[0].y;
        };
        //__________________________________
        /**
         * Adds the scribble object to a given sprite
         *
         * @param {asSvg.Sprite} pSprite -SVG sprite to add scribble to
         *
         * @memberOf Scribble
         */
        Scribble.prototype.addToSprite = function (pSprite) {
            var _this = this;
            this.mSprite = pSprite;
            this.mSprite.addChild(this.mShape);
            this.mShape.addEventListener("click", function () { return _this.onSelect(); }, this);
        };
        //__________________________________
        /**
         * Clones the scribble object
         *
         * @returns {Scribble} -cloned object
         *
         * @memberOf Scribble
         */
        Scribble.prototype.clone = function () {
            var aShape = new Scribble(null, this.mColor, this.mWidth);
            aShape.mWidth = this.mWidth;
            aShape.mColor = this.mColor;
            aShape.mShape = this.element.clone();
            aShape.myClassName = this.myClassName;
            return aShape;
        };
        //_________________________________
        Scribble.prototype.setShapeInBound = function () {
            if (image.Globals.ImageDrawing.isOriginalRatio) {
                this.setShapeInBoundOriginal();
            }
            else {
                this.setShapeInBoundTransform();
            }
        };
        //__________________________________________
        Scribble.prototype.setShapeInBoundOriginal = function () {
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            var aShapeRect = this.mShape.getBounds();
            console.log("circle rect");
            console.log("x   " + this.mShape.x + "    y " + this.mShape);
            if ((aShapeRect.left < aImageRect.left || aShapeRect.right > aImageRect.right) && image.Globals.isDrawInBound) {
                this.mShape.x = this.mLastGoodX;
                if (this.mHighlightedShape) {
                    this.mHighlightedShape.x = this.mLastGoodX;
                }
            }
            else {
                this.mLastGoodX = this.mShape.x;
            }
            if ((aShapeRect.top < aImageRect.top || aShapeRect.bottom > aImageRect.bottom) && image.Globals.isDrawInBound) {
                this.mShape.y = this.mLastGoodY;
                if (this.mHighlightedShape) {
                    this.mHighlightedShape.y = this.mLastGoodY;
                }
            }
            else {
                this.mLastGoodY = this.mShape.y;
            }
        };
        //________________________________________
        Scribble.prototype.setShapeInBoundTransform = function () {
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            var aShapeRect = this.mShape.getBounds();
            console.log("circle rect");
            console.log("x   " + this.mShape.x + "    y " + this.mShape);
            if ((aShapeRect.left < aImageRect.left || aShapeRect.right > aImageRect.right) && image.Globals.isDrawInBound) {
                this.mShape.y = this.mLastGoodY;
                if (this.mHighlightedShape) {
                    this.mHighlightedShape.y = this.mLastGoodY;
                }
            }
            else {
                this.mLastGoodY = this.mShape.y;
            }
            if ((aShapeRect.top < aImageRect.top || aShapeRect.bottom > aImageRect.bottom) && image.Globals.isDrawInBound) {
                this.mShape.x = this.mLastGoodX;
                if (this.mHighlightedShape) {
                    this.mHighlightedShape.x = this.mLastGoodX;
                }
            }
            else {
                this.mLastGoodX = this.mShape.x;
            }
        };
        //_________________________________________________________
        Scribble.prototype.getGoodPoint = function (pMouseEvent, pPoint) {
            this.mSprite.stage.onMouseMove(pMouseEvent);
            var aImage = document.getElementById("image");
            var aImageRect = aImage.getBoundingClientRect();
            var aRect = new asBase.math.Rectangle(aImageRect);
            if (!aRect.intersectsPoint(pMouseEvent.clientX, pMouseEvent.clientY) && image.Globals.isDrawInBound) {
                pPoint.x = this.mLastGoodX;
                pPoint.y = this.mLastGoodY;
            }
            else {
                this.mLastGoodX = pPoint.x = this.mSprite.parent.mouseX;
                this.mLastGoodY = pPoint.y = this.mSprite.parent.mouseY;
            }
        };
        Object.defineProperty(Scribble.prototype, "element", {
            //_________________________________
            /**
             * Returns the asSVG Display Object member
             *
             * @readonly
             *
             * @memberOf Scribble
             */
            get: function () {
                return this.mShape;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scribble.prototype, "myClassName", {
            //______________________________________
            /**
             * Retutns the class nmae
             *
             *
             * @memberOf Scribble
             */
            get: function () {
                return this.mClassName;
            },
            //_______________________________
            /**
             * Sets the class name
             *
             *
             * @memberOf Scribble
             */
            set: function (pClassName) {
                this.mClassName = pClassName;
            },
            enumerable: true,
            configurable: true
        });
        return Scribble;
    }(shapes.Shape));
    shapes.Scribble = Scribble;
})(shapes || (shapes = {}));
//# sourceMappingURL=code.js.map