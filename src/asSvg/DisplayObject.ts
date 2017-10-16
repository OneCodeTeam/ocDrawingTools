
/// <reference path="../asbase/math/matrix.ts" />
/// <reference path="../asbase/math/rectangle.ts" />
/// <reference path="../asbase/math/point.ts" />
/// <reference path="../asbase/math/mathutils.ts" />

var unescape = unescape;
module asSvg {
    /**
     *Represents a base class for all  display svg elements 
     * 
     * @export
     * @class DisplayObject
     * @module asSvg
     */
    export class DisplayObject {

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;
        protected mParent: asSvg.Sprite;
        protected mX: number = 0;
        protected mY: number = 0;
        protected mRotation: number = 0;
        protected mScaleX: number = 1;
        protected mScaleY: number = 1;
        protected mVisible: boolean = true;
        protected mCallbacks: {};
        protected mAlpha: number;
        protected mMatrix: asBase.math.Matrix;
        protected mEnterFrameCallback: Function;
        protected mMouseMoveCallback: EventListener;
        protected mStage: Stage;
        protected mDragingVector: asBase.math.Point;
        private mEvents: Array<Array<EventListenerHolder>>;
        protected mLastGlobalMousePoint: asBase.math.Point;
        protected mLastLocalMousePoint: asBase.math.Point;
        protected mIsInDrag: boolean = false;
        protected mMouseDownPoint: asBase.math.Point;
        protected mLastMouseEvent: MouseEvent = null;
        private mBoundaryCallBack: Function
        private static mInstanceCounter: number = 0;

        /**
         * Creates an instance of DisplayObject.
         * 
         * @memberOf DisplayObject
         */
        constructor() {
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
        public getImage(pScale?: number, pX?: number , pY?: number, pSizeX?:number , pSizeY?:number ): HTMLImageElement {
            let aImg: HTMLImageElement = document.createElement("img") as HTMLImageElement;
            let aXML: string;

            let aStage: Stage = new Stage();
            let aElement: DisplayObject = this.clone();


                if(pScale != null) {
                    aElement.setScale(pScale);
                }

                if(pX != null && pY!= null) {
                    aElement.x = pX;
                    aElement.y = pY;
                }

                if(pSizeX!=null && pSizeY!=null) {
                    aStage.setSize(pSizeX, pSizeY);
                }


            aStage.addChild(aElement);
            aXML = aStage.getAsString();

            var svg64 = btoa(unescape(encodeURIComponent(aXML)));
            aImg.src = "data:image/svg+xml;base64," + svg64;
            return aImg;
        }

        //_______________________________________________________________________

        /**
         * 
         * 
         * @returns {string} 
         * 
         * @memberOf DisplayObject
         */
        public getAsString(): string {
            let aXml: string = new XMLSerializer().serializeToString(this.mElement);
            return aXml;
        }

        //________________________________________________________________________

        /**
         * Clones the Display Object
         * 
         * @returns {DisplayObject} 
         * 
         * @memberOf DisplayObject
         */
        public clone(): DisplayObject {
            let aRet: DisplayObject = new DisplayObject();
            aRet.mElement = this.mElement.cloneNode(true) as Element;
            aRet.x = this.x;
            aRet.y = this.y;
            aRet.rotation = this.rotation;
            aRet.scaleX = this.scaleX;
            aRet.scaleY = this.scaleY;
            return aRet;
        }

        //_______________________________________________________________________

        /**
         * 
         * 
         * @protected
         * 
         * @memberOf DisplayObject
         */
        protected createElement() {
        };

        //_______________________________________________________________________

        /**
         * 
         * 
         * @protected
         * @param {string} pType 
         * 
         * @memberOf DisplayObject
         */
        protected create(pType: string) {
         
            this.mElement = document.createElementNS("http://www.w3.org/2000/svg", pType);
          
        };

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
        public setLineStyle(pWidth?: number, pColor?: number, pOpacity?: number, pLinecap?: string, pLinejoin?: string, pDashedLineArray?: Array<number>) {

            if (pWidth != null) {
                this.mElement.setAttribute("stroke-width", pWidth.toString());
            }
            if (pColor != null) {
                let aColor = "#" + pColor.toString(16);
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

        }

        //________________________________________________________
        /**
         * Sets the fill of the display object
         * 
         * @param {number} [pColor] 
         * @param {number} [pOpacity] 
         * 
         * @memberOf DisplayObject
         */
        public setFill(pColor?: number, pOpacity?: number) {
            if (pColor != null && pColor >= 0) {
                let aBase16 = pColor.toString(16);
                while (aBase16.length < 6) {
                    aBase16 = "0" + aBase16
                }
                let aColor = "#" + aBase16;
                this.mElement.setAttribute("fill", aColor);
            }
            if (pOpacity != null) {
                this.mElement.setAttribute("fill-opacity", pOpacity.toString());
            }
            if (pColor == null) {
                this.mElement.setAttribute("fill", "none");
            }
        }

        //_____________________________________________________________

        /**
         * Returns the Bounding Client Rect of the Display Object
         * 
         * @returns {ClientRect} 
         * 
         * @memberOf DisplayObject
         */
        public getLocalBounds(): ClientRect {
            return (this.mElement.getBoundingClientRect());
        }

        //_____________________________________________________________

        /**
         * Returns the Bounding Client Rect of the Display Object
         * 
         * @returns {ClientRect} 
         * 
         * @memberOf DisplayObject
         */
        public getBounds(): ClientRect {
            return (this.mElement.getBoundingClientRect());
        }

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
        public hitTestObject(pElement: DisplayObject, pGap: number = 0): boolean {
            let mRect1: ClientRect = this.mElement.getBoundingClientRect();
            let mRect2: ClientRect = pElement.getBounds();
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
        }

        //_________________________________________________________________

        /**
         * Returns the matrix of the display object
         * 
         * @readonly
         * @type {asBase.math.Matrix}
         * @memberOf DisplayObject
         */
        public get matrix(): asBase.math.Matrix {
            if (this.mMatrix == null) {
                this.mMatrix = new asBase.math.Matrix();
                var a = this.mRotation * Math.PI / 180;
                this.mMatrix.setTransform(this.mScaleX * Math.cos(a), this.mScaleY * Math.sin(a), -this.mScaleX * Math.sin(a), this.mScaleY * Math.cos(a), this.mX, this.mY);
                //this.mMatrix.setTransform(this.mScaleX, 0,0, this.mScaleY, this.mX, this.mY);
            }
            return (this.mMatrix);
        }

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
        public localToParent(pPoint: asBase.math.Point, Parent: Sprite): asBase.math.Point {
            let aMat = this.localToGlobalMatrix(Parent);
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        }

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
        public parentToLocal(pPoint: asBase.math.Point, Parent: Sprite): asBase.math.Point {
            let aMat = this.globalToLocalMatrix(Parent);
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        }

        //________________________________________________________________________
        /**
         * Converts a local point to a global point
         * 
         * @param {asBase.math.Point} pPoint 
         * @returns {asBase.math.Point} 
         * 
         * @memberOf DisplayObject
         */
        public localToGlobal(pPoint: asBase.math.Point): asBase.math.Point {
            let aMat = this.localToGlobalMatrix();
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        }

        //________________________________________________________________________
        /**
         * returns the local matrix as as global matrix
         * 
         * @param {Sprite} [Parent] 
         * @returns {asBase.math.Matrix} 
         * 
         * @memberOf DisplayObject
         */
        public localToGlobalMatrix(Parent?: Sprite): asBase.math.Matrix {

            let aMatrixArray: Array<asBase.math.Matrix> = this.getMatrixsStuck(Parent);

            if (aMatrixArray.length == 0) {
                return new asBase.math.Matrix();
            }
            var aMat: asBase.math.Matrix = new asBase.math.Matrix();
            for (var i: number = aMatrixArray.length - 2; i >= 0; i--) {
                aMat = aMat.multiply(aMatrixArray[i]);
            }
            return aMat;
        }

        //_________________________________________________________________________

        /**
         * returns the global matrix as a local matrix
         * 
         * @param {Sprite} [Parent] 
         * @returns {asBase.math.Matrix} 
         * 
         * @memberOf DisplayObject
         */
        public globalToLocalMatrix(Parent?: Sprite): asBase.math.Matrix {

            let aMatrixArray: Array<asBase.math.Matrix> = this.getMatrixsStuck(Parent);

            if (aMatrixArray.length == 0) {
                return new asBase.math.Matrix();
            }
            var aMat: asBase.math.Matrix = new asBase.math.Matrix();
            for (var i: number = aMatrixArray.length - 1; i >= 0; i--) {
                aMat = aMat.multiply(aMatrixArray[i]);
            }
            aMat = aMat.inverse();
            return aMat;
        }

        //________________________________________________________________________
        /**
         * Returns a global point as a local point
         * 
         * @param {asBase.math.Point} pPoint 
         * @returns {asBase.math.Point} 
         * 
         * @memberOf DisplayObject
         */
        public globalToLocal(pPoint: asBase.math.Point): asBase.math.Point {

            let aMat: asBase.math.Matrix = this.globalToLocalMatrix();
            return aMat.applyToPoint(pPoint.x, pPoint.y);
        }

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
        private getMatrixsStuck(pParent?: Sprite): Array<asBase.math.Matrix> {
            let aMatrixArray: Array<asBase.math.Matrix> = new Array<asBase.math.Matrix>();
            if (this.stage == null) {
                return aMatrixArray;
            }
            if (this.myClassName == Stage.myName) {
                return aMatrixArray;
            }
            aMatrixArray.push(this.matrix);
            let aCurrent: Sprite = this.parent
            while ((aCurrent != null) && (aCurrent.myClassName != Stage.myName) && (aCurrent != pParent)) {
                aMatrixArray.push(aCurrent.matrix);
                aCurrent = aCurrent.parent;
            }
            //aMatrixArray.push(aCurrent.matrix);
            return aMatrixArray;

        }


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
        public hitTestPoint(pX: number, pY: number, pIsShape: boolean): boolean {
            let mRect: ClientRect = this.mElement.getBoundingClientRect();
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

        }

        /****************************
         * Getters and Setters
         ****************************/
        /**
         * Sets the rotaion of the display object
         * 
         * @param {number} pVal- angle in degrees
         * @memberOf DisplayObject
         */
        public set rotation(pVal: number) {
            this.mRotation = pVal;
            this.updateTransform();
        }

        /**
         * Returns the rotation of the display object
         * 
         * @readonly
         * @type {number}
         * @memberOf DisplayObject
         */
        public get rotation(): number {
            return (this.mRotation);
        }

        //___________________________________________________
        /**
         * Sets the x value
         * 
         * @param {number} pVal - x value
         * @memberOf DisplayObject
         */
        public set x(pVal: number) {
            this.mX = pVal;
            this.updateTransform();
            this.updatePositionX();
        }

        /**
         * Returns the x value
         * 
         * @readonly
         * @type {number}
         * @memberOf DisplayObject
         */
        public get x(): number {
            return (this.mX);
        }

        //___________________________________________________

        /**
         * Sets the y value
         * 
         * @param {number} pVal - y value
         * @memberOf DisplayObject
         */
        public set y(pVal: number) {
            this.mY = pVal;
            this.updateTransform();
            this.updatePositionY();

        }

        /**
         * 
         * 
         * @readonly
         * @type {number}
         * @memberOf DisplayObject
         */
        public get y(): number {
            return (this.mY);
        }

        //___________________________________________________
        protected updatePositionY() {
        }

        //___________________________________________________

        protected updatePositionX() {
        }

        //___________________________________________________

        /**
         * Sets the y scale
         * 
         * @param {number} pVal - y scale
         * @memberOf DisplayObject
         */
        public set scaleY(pVal: number) {
            this.mScaleY = pVal;
            this.updateTransform();

        }

        /**
         * Returns the y scale
         * 
         * @readonly
         * @type {number}
         * @memberOf DisplayObject
         */
        public get scaleY(): number {
            return (this.mScaleY);
        }

        //___________________________________________________

        /**
         * Sets the x and y scale
         * 
         * @param {number} pVal  -scale
         * @returns 
         * 
         * @memberOf DisplayObject
         */
        public setScale(pVal: number) {
            if (isNaN(pVal)) {
                return;
            }
            this.mScaleY = pVal;
            this.mScaleX = pVal;
            this.updateTransform();

        }

        //___________________________________________________

        /**
         * Sets the x scale
         * @param {number} pVal - x scale
         * 
         * @memberOf DisplayObject
         */
        public set scaleX(pVal: number) {
            this.mScaleX = pVal;
            this.updateTransform();

        }

        /**
         * Returns the x scale
         * 
         * @readonly
         * @type {number}
         * @memberOf DisplayObject
         */
        public get scaleX(): number {
            return (this.mScaleX);
        }

        //___________________________________________________

        /**
         * Updates the transform matrix
         * 
         * 
         * @memberOf DisplayObject
         */
        public updateTransform() {
            this.mMatrix = null;
            var aMat = this.matrix;
            if (isNaN(aMat.a) || isNaN(aMat.c)) {
                console.log("failed -> updateTransform NaN");
            }
            var aTransform = "matrix(" + aMat.a + "," + aMat.b + "," + aMat.c + "," + aMat.d + "," + aMat.e + "," + aMat.f + ")";
            this.mElement.setAttribute("transform", aTransform);
        }

        //___________________________________________________

        /**
         * Update the transform matrix(defunct)
         * 
         * 
         * @memberOf DisplayObject
         */
        public updateTransformOld() {
            var aTransform = "";
            if ((this.mX != 0) || (this.mY != 0)) {
                aTransform += "translate(" + this.mX + "," + this.mY + ") "// rotate(20)";
            }
            if (this.mRotation != 0) {
                aTransform += "rotate(" + this.mRotation + ") "// rotate(20)";
            }
            if ((this.mScaleX != 1) || (this.mScaleY != 1)) {
                aTransform += "scale(" + this.mScaleX + "," + this.mScaleY + ")"// rotate(20)";
            }
            this.mElement.setAttribute("transform", aTransform);
        }

        //____________________________________________________________
        /**
         * Shows/Hides the display object
         * 
         * @param {boolean} pVal  
         * @returns 
         * 
         * @memberOf DisplayObject
         */
        public show(pVal: boolean) {
            this.mVisible = pVal;
            if (this.mParent == null) {
                return;
            }
            if (!this.mVisible) {
                if (this.mParent.element == this.mElement.parentNode) {
                    this.mParent.element.removeChild(this.mElement);
                }
            } else {
                this.mParent.element.appendChild(this.mElement);
            }
        }

        //_____________________________________________________________

        public set visible(pVal: boolean) {
            this.show(pVal);
        }

        public get visible(): boolean {
            return (this.mVisible);
        }

        //_____________________________________________________________

        /**
         * Sets the opacity of the display object
         * 
         * 
         * @memberOf DisplayObject
         */
        public set alpha(pVal: number) {
            this.setLineStyle(null, null, pVal);
            this.setFill(null, pVal);
            this.mAlpha = pVal;
        }

        /**
         * Returns the opcaity 
         * 
         * @readonly
         * @type {number}
         * @memberOf DisplayObject
         */
        public get alpha(): number {
            return (this.mAlpha);
        }

        //_____________________________________________________________

        public get height(): number {
            if (this.stage == null) {
                return 0;
            }
            return (this.mElement.getBoundingClientRect().height);

        }

        //_____________________________________________________________

        public get width(): number {
            if (this.stage == null) {
                return 0;
            }
            return (this.mElement.getBoundingClientRect().width);

        }

        //_____________________________________________________________

        public set parent(pVal: asSvg.Sprite) {
            this.mParent = pVal;
            if (pVal == null) {
                this.mStage = null;
            }
            this.mStage = this.stage;

        }

        public get parent(): asSvg.Sprite {
            return (this.mParent);
        }

        //_____________________________________________________________


        public get element(): Element {
            return this.mElement;
        }

        public static get myName(): string {
            return "DisplayObject";
        }

        //______________________________________________
        public get myClassName(): string {
            return "DisplayObject";
        }

        //______________________________________________

        public removeEventListenerOld(pKey: string, pEventListener?: EventListener) {
            if (this.mCallbacks[pKey] != null) {
                for (let i = 0; i < this.mCallbacks[pKey].length; i++) {
                    if (pEventListener != null) {
                        if (this.mCallbacks[pKey] == pEventListener) {
                            this.mElement.removeEventListener(pKey, pEventListener);
                        }
                    } else {
                        this.mElement.removeEventListener(pKey, this.mCallbacks[pKey]);
                    }
                }
            }
        }

        //_________________________________________________

        /**
         * Removes all of the event listeners
         * 
         * 
         * @memberOf DisplayObject
         */
        public removeAllEvents() {
            for (let aKey in this.mCallbacks) {
                if (this.mCallbacks[aKey] != null) {
                    this.removeEventListener(aKey, this);
                }
            }
        }

        //_________________________________________________

        public get stage(): Stage {
            if (this.mStage != null) {
                return this.mStage;
            }
            if (this.parent == null) {
                return null;
            }
            if (this.parent.myClassName == Stage.myName) {
                return this.parent as Stage;
            }
            this.mStage = this.parent.stage;
            return (this.mStage);

        }

        //_________________________________________________________
        public get onEnterFrame(): Function {
            return this.mEnterFrameCallback
        }

        //_________________________________________________________
        public set onEnterFrame(pEnterFrameCallback: Function) {

            this.mEnterFrameCallback = pEnterFrameCallback;
            if (pEnterFrameCallback == null) {
                this.disableEnterFrame();
                return;
            }
            this.enableEnterFrame();
        }

        //_________________________________________________________

        /**
         * Enables the enter frame
         * 
         * @returns {boolean} 
         * 
         * @memberOf DisplayObject
         */
        public enableEnterFrame(): boolean {
            let aStage: Stage = this.stage;
            if (aStage == null) {
                return false;
            }
            aStage.addToEnterFrameList(this);
            return true;
        }

        //_________________________________________________________

        /**
         * Disable the enter frame
         * 
         * @returns {boolean} 
         * 
         * @memberOf DisplayObject
         */
        public disableEnterFrame(): boolean {
            let aStage: Stage = this.stage;
            if (aStage == null) {
                return false;
            }
            aStage.removeFromEnterFrameList(this);
            return true;
        }

        //________________________________________________________

        /**
         * 
         * 
         * 
         * @memberOf DisplayObject
         */
        public enterFrame() {
            if (this.mEnterFrameCallback != null) {
                this.mEnterFrameCallback();
            }
        }

        //____________________________________________________________

        public get mouseX(): number {
            return this.parentMouseLocation.x - this.x;
        }

        //____________________________________________________________

        public get mouseY(): number {
            return this.parentMouseLocation.y - this.y;
        }

        //____________________________________________________________

        public set instanceName(pVal: string) {
            this.element.id = pVal;
        }

        public get instanceName(): string {
            return this.element.id;
        }

        //____________________________________________________________

        /**
         * Returns the parent Mouse Location
         * 
         * @readonly
         * @type {asBase.math.Point}
         * @memberOf DisplayObject
         */
        public get parentMouseLocation(): asBase.math.Point {
            if ((this.mLastGlobalMousePoint.x == this.stage.mouseLocation.x) && (this.mLastGlobalMousePoint.y == this.stage.mouseLocation.y)) {
                return this.mLastLocalMousePoint;
            }
            this.mLastGlobalMousePoint.x = this.stage.mouseLocation.x;
            this.mLastGlobalMousePoint.y = this.stage.mouseLocation.y;
            this.mLastLocalMousePoint = this.parent.globalToLocal(this.stage.mouseLocation);
            return (this.mLastLocalMousePoint);
        }

        //____________________________________________________________

        /**
         * Starts dragging the display object
         * 
         * @param {boolean} [pLockCenter=false] 
         * @param {Function} [pBoundaryCallBack=null] 
         * 
         * @memberOf DisplayObject
         */
        public startDrag(pLockCenter: boolean = false, pBoundaryCallBack: Function=null) {
            // console.log("startDrag");
            if (pLockCenter) {
                this.mDragingVector = new asBase.math.Point();
            } else {

                this.mDragingVector = null;
            }
            this.mBoundaryCallBack = pBoundaryCallBack;
            if (this.mMouseMoveCallback == null) {
                this.mMouseMoveCallback = (e: MouseEvent) => this.onMouseMove(e);
            }
            if (this.mStage != null) {
                this.mStage.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this.mMouseMoveCallback, this);
            }
        }

        //____________________________________________________________
        /**
         * Returns the distance to drag the object
         * 
         * @readonly
         * @type {number}
         * @memberOf DisplayObject
         */
        public get dragDistance(): number {
            if (this.mLastMouseEvent == null) {
                return 0;
            }
            let aDX: number = this.mLastMouseEvent.clientX - this.mMouseDownPoint.x;
            let aDY: number = this.mLastMouseEvent.clientY - this.mMouseDownPoint.y;
            return Math.sqrt(aDX * aDX + aDY * aDY);
        }

        //____________________________________________________________

        public get isInDrag(): boolean {
            return (this.mIsInDrag == true);
        }

        //____________________________________________________________

        /**
         * Stops dragging the object
         * 
         * @returns 
         * 
         * @memberOf DisplayObject
         */
        public stopDrag() {
            if (this.mMouseMoveCallback == null) {
                return;
            }
            this.mDragingVector = null;
            if (this.mStage != null) {
                this.mStage.removeEventListener(asBase.events.MouseEvents.MOUSE_MOVE, this);
            }
            this.mIsInDrag = false;
            this.mMouseDownPoint = null;
        }

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
        protected onMouseMove(e: MouseEvent) {
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
                let aDX: number = e.clientX - this.mMouseDownPoint.x;
                let aDY: number = e.clientY - this.mMouseDownPoint.y;
                this.mIsInDrag = ((aDX * aDX + aDY * aDY) > 25);
            }
            let aLocalPoint: asBase.math.Point = this.parent.globalToLocal(new asBase.math.Point(e.clientX - this.mStage.offsetX, e.clientY - this.mStage.offsetY));
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
        }

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
        public addEventListener(pType: string, pEventListener: EventListener, pOwner: any, useCapture?: boolean): boolean {
            if (this.mEvents == null) {
                this.mEvents = new Array<Array<EventListenerHolder>>();
            }
            if (this.mEvents[pType] == null) {
                this.mEvents[pType] = Array<EventListenerHolder>();
            }

            const aEventsList: Array<EventListenerHolder> = this.mEvents[pType];
            for (let i = 0; i < aEventsList.length; i++) {
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
        }

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
        public removeEventListener(pType: string, pOwner: any, useCapture?: boolean): boolean {

            if (this.mEvents == null) {
                return;
            }
            if (this.mEvents[pType] == null) {
                return;
            }
            let aEventListener: EventListener;
            const aEventsList: Array<EventListenerHolder> = this.mEvents[pType];
            for (let i = aEventsList.length - 1; i >= 0; i--) {
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
        }

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
        public removeAllOwnerEvents(pOwner: any, useCapture?: boolean): boolean {

            if (this.mEvents == null) {
                return;
            }
            for (let aType in this.mEvents) {
                let aEventListener: EventListener;
                const aEventsList: Array<EventListenerHolder> = this.mEvents[aType];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventListener = aEventsList[i].callback;
                        aEventsList.splice(i, 1);
                        if (this.eventElement == null) {
                            return false;
                        }
                        if (useCapture != null) {
                            this.eventElement.removeEventListener(aType, aEventListener, useCapture);

                        } else {
                            this.eventElement.removeEventListener(aType, aEventListener);
                        }
                    }
                }
            }
        }

        //_______________________________________________________________

        /**
         * Dispatches an event
         * 
         * @param {Event} pEvent 
         * @returns {boolean} 
         * 
         * @memberOf DisplayObject
         */
        public dispatchEvent(pEvent: Event): boolean {
            if (this.eventElement == null) {
                return false;
            }
            this.eventElement.dispatchEvent(pEvent);
            return true;
        }

        //_______________________________________________________________

        protected get eventElement(): Element {
            (this.mElement as any).asObject = this;
            return this.mElement;
        }

        //_______________________________________________________________
        /**
         * Destroys the display object
         * 
         * 
         * @memberOf DisplayObject
         */
        public destruct() {

            this.removeAllEvents();
            if (this.mStage != null) {
                this.mStage.removeAllOwnerEvents(this);
            }
            if (this.parent != null) {
                this.parent.removeChild(this);
            }

        }

        //_______________________________________________________________


    }

    /**
     * 
     * 
     * @class EventListenerHolder
     */
    class EventListenerHolder {
        public callback: EventListener;
        public owner: any;

        /**
         * Creates an instance of EventListenerHolder.
         * @param {EventListener} pCallback 
         * @param {*} pOwner 
         * 
         * @memberOf EventListenerHolder
         */
        constructor(pCallback: EventListener, pOwner: any) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
    }


}