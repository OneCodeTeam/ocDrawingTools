/// <reference path="shape.ts" />

module shapes {
    /**
     * Class reprsenting a circle drawn by the user
     * 
     * @export
     * @class Circle
     * @extends {Shape}
     */
    export class Circle extends Shape {
        private mCircle: asSvg.Circle;
        private mHighlightedCircle: asSvg.Circle;
        private mRadius;
        protected mWidth: number = 4;
        protected mColor;
        private mX: number;
        private mY: number;
        public mClassName = "Circle";
        public mLastGoodMouseX;
        public mLastGoodMouseY;

        /**
         * Creates an instance of Circle.
         * @param {asSvg.Sprite} pSprite -SVG Sprite to draw circle on
         * @param {any} pColor -Color to draw circle in
         * 
         * @memberOf Circle
         */
        constructor(pSprite: asSvg.Sprite, pColor) {
            super();
            this.mSprite = pSprite;
            this.mColor = pColor;
        }
        //_________________________________________
        public onMouseDown(pMouseEvent: MouseEvent) {
            super.onMouseDown(pMouseEvent);
            this.getGoodPoint(pMouseEvent, this.mLastMouseDownPoint);

        }
        //_____________________________________
        public onMouseMove(pEvent: MouseEvent) {
            let aPoint: asBase.math.Point = new asBase.math.Point(this.mSprite.parent.mouseX, this.mSprite.parent.mouseY);
            this.getGoodPoint(pEvent, aPoint);
            if (!this.mLastMouseDownPoint.x || !this.mLastMouseDownPoint.y) {
                this.mLastMouseDownPoint.x = aPoint.x;
                this.mLastMouseDownPoint.y = aPoint.y;
            }
            let aDist = asBase.math.MathUtils.distance(this.mLastMouseDownPoint, aPoint);
            this.mRadius = aDist;

            this.drawShape();
        }
        //_________________________________________
        protected drawShape() {
            if (this.mLastMouseDownPoint.x && this.mLastMouseDownPoint.y && this.mRadius && !isNaN(this.mRadius)) {
                let aX, aY;
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
                    this.mCircle.addEventListener("click", () => this.onSelect(), this);
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
      
        }
        //____________________________
        public onSelect() {
            if (!image.Globals.isItemSelected) {
                super.onSelect();
                this.mHighlightedCircle = this.mCircle.clone() as asSvg.Circle;
                this.mHighlightedCircle.setLineStyle(this.mWidth * 4 / this.scale, null, 0.5);
                this.mHighlightedCircle.element.setAttribute("stroke", this.mColor);
                this.mSprite.addChild(this.mHighlightedCircle);
                this.mSprite.addChild(this.mCircle);
                image.Globals.ImageDrawing.onSelectShape(this);
            }
        }
        //_____________________________
        public onMouseUp() {
            image.Globals.isCircleMode = false;
            super.onMouseUp();
            if (this.mCircle) {
                if (this.mCircle.getBounds().width == 0 && this.mCircle.getBounds().height == 0) {
                    this.mCircle.destruct();
                    image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
                }
            }
            else {
                image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
            }
        }
        //___________________________________
        /**
         * Changes the color of the circle object
         * 
         * @param {any} pColor -Color to set the circle to -in hex code
         * 
         * @memberOf Circle
         */
        public changeShapeColor(pColor):void {
            this.mCircle.element.setAttribute("stroke", pColor);
            if (this.mHighlightedCircle) {
                this.mHighlightedCircle.element.setAttribute("stroke", pColor);
            }
        }
        //____________________________________
        public onDeselect() {
            super.onDeselect();
            this.mSprite.removeChild(this.mHighlightedCircle);
        }
        //______________________
        /**
         * Adds event listeners for mouse events to the circle object
         * 
         * @param {Function} pMouseDownCallBack -Callback for the mousedown events
         * 
         * @memberOf Circle
         */
        public addMouseEvents(pMouseDownCallBack: Function) :void{
            this.mCircle.addEventListener("mousedown", (pEvent) => pMouseDownCallBack(pEvent), this);
            this.mMouseDownListener = () => pMouseDownCallBack();
        }
        //________________________________
        /**
         * Starts dragging the circle object by following the mouse position
         * 
         * 
         * @memberOf Circle
         */
        public startDrag() :void{
            this.mX = this.mCircle.x;
            this.mY = this.mCircle.y;
            this.mLastGoodX = this.mCircle.x;
            this.mLastGoodY = this.mCircle.y;
            let aOldPostionArr = new Array<asBase.math.Point>();
            let aPoint = new asBase.math.Point(this.mX, this.mY);
            aOldPostionArr.push(aPoint);
            image.Globals.currentShapeDragAction = new action.DragShapeAction(aOldPostionArr, this);
           
            if (this.mHighlightedCircle) {
                this.mHighlightedCircle.startDrag();
            }
            this.mCircle.startDrag(false, () => this.setShapeInBound());
        }
        //_________________________________________________
        /**
         * Stops dragging the circle object
         * 
         * 
         * @memberOf Circle
         */
        public stopDrag() :void{
            this.mX = this.mCircle.x;
            this.mY = this.mCircle.y;
            this.mCircle.stopDrag();
            if (this.mHighlightedCircle) {
                this.mHighlightedCircle.stopDrag();
            }
            if (image.Globals.currentShapeDragAction && !image.Globals.currentShapeDragAction.isAdded) {
                let aNewPositionArr = new Array<asBase.math.Point>();
                let aPoint = new asBase.math.Point(this.mX, this.mY);
                aNewPositionArr.push(aPoint);
                image.Globals.currentShapeDragAction.newPosition = aNewPositionArr;
                image.Globals.ActionManager.addAction(image.Globals.currentShapeDragAction);
            }


        }
        //_____________________________________________________
        /**
         * Moves the circle object to a  given point
         * 
         * @param {Array<asBase.math.Point>} pArr -Array of points to move circle to 
         * 
         * @memberOf Circle
         */
        public moveShape(pArr: Array<asBase.math.Point>) {
            this.mCircle.x = pArr[0].x;
            this.mCircle.y = pArr[0].y;

        }
        //_________________________________________________________
        protected setShapeInBound() {
            if (image.Globals.ImageDrawing.isOriginalRatio)
            {
                this.setShapeInBoundOriginal();
            }
            else {
                this.setShapeInBoundTransform();
            }

        }
        //__________________________________
        private setShapeInBoundOriginal() {
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();
            let aShapeRect = this.mCircle.getBounds();
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
        }
        //_____________________________________
        private setShapeInBoundTransform() {
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();
            let aShapeRect = this.mCircle.getBounds();
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
        }
       
        //__________________________________
        private getGoodPoint(pMouseEvent: MouseEvent, pPoint: asBase.math.Point) {
            this.mSprite.stage.onMouseMove(pMouseEvent);
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();

            if ((pMouseEvent.clientX < aImageRect.left || pMouseEvent.clientX > aImageRect.right || pMouseEvent.clientY < aImageRect.top || pMouseEvent.clientY > aImageRect.bottom) && image.Globals.isDrawInBound) {
                pPoint.x = this.mLastGoodMouseX;
                pPoint.y = this.mLastGoodMouseY;
            }
           
            else {
                this.mLastGoodMouseX = pPoint.x =this.mSprite.parent.mouseX;
                this.mLastGoodMouseY = pPoint.y= this.mSprite.parent.mouseY;

            }

        }
        //________________________________________
        private drawShapeInBound() {
            
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();
            let aCircleRect = this.mCircle.getBounds();
            let aMouseX, aMouseY;
            if ((aCircleRect.left < aImageRect.left || aCircleRect.right > aImageRect.right || aCircleRect.top < aImageRect.top || aCircleRect.bottom > aImageRect.bottom) && image.Globals.isDrawInBound) {
                console.log("out of bounds circle");

                aMouseX = this.mLastGoodX;
                aMouseY = this.mLastGoodY;
                let aPoint = new asBase.math.Point(aMouseX, aMouseY);
                let aDist = asBase.math.MathUtils.distance(this.mLastMouseDownPoint, aPoint);
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
        }
        //_________________________________________________________
        /**
         * Deletes the circle object and removes it from the sprite
         * 
         * 
         * @memberOf Circle
         */
        public deleteShape():void {
            this.mCircle.destruct();
            if (this.mHighlightedCircle) {
                this.mHighlightedCircle.destruct();
            }
        }
        //___________________________
        /**
         * Clones the circle object
         * 
         * @returns {Circle} -the cloned circle
         * 
         * @memberOf Circle
         */
        public clone() {
            let aShape = new Circle(null, this.mColor);
            aShape.mWidth = this.mWidth;
            aShape.mColor = this.mColor;
            aShape.mCircle = this.element.clone() as asSvg.Circle;
            aShape.myClassName = this.myClassName;
            return aShape;
        }
        //_________________________________________________________
        /**
         * Adds the circle object to a given SVG sprite
         * 
         * @param {asSvg.Sprite} pSprite -Sprite to add circle to
         * 
         * @memberOf Circle
         */
        public addToSprite(pSprite: asSvg.Sprite) {
            this.mSprite = pSprite;
            this.mSprite.addChild(this.mCircle);
            this.mCircle.addEventListener("click", () => this.onSelect(), this);
        }
        //_________________________
        /**
         * Return the asSVG display object
         * 
         * @readonly
         * 
         * @memberOf Circle
         */
        public get element() {
            return this.mCircle;
        }
        //_________________________
        /**
         * Returns the class name
         * 
         * @readonly
         * @type {string}
         * @memberOf Circle
         */
        public get myClassName():string {
            return this.mClassName;
        }
        //_______________________________
        /**
         * Sets the class name
         * 
         * 
         * @memberOf Circle
         */
        public set myClassName(pClassName) {
            this.mClassName = pClassName;
        }
        
    }
}