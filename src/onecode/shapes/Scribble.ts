module shapes {
    /**
     * Class representing a scribble drawn by the user
     * 
     * @export
     * @class Scribble
     * @extends {Shape}
     */
    export class Scribble extends Shape {
        protected mIsMouseDown: boolean = false;
        protected mShape: asSvg.Shape;
        private mHighlightedShape: asSvg.Shape;
        protected mWidth: number;
        protected mClassName = "Scribble";
        /**
         * Creates an instance of Scribble.
         * @param {asSvg.Sprite} pSprite -Sprite to add scribble object to
         * @param {any} pColor -Color of scribble
         * @param {number} pLineWidth -Line width of scribble
         * 
         * @memberOf Scribble
         */
        constructor(pSprite: asSvg.Sprite, pColor, pLineWidth: number) {
            super();
            this.mSprite = pSprite;
            this.mColor = pColor;
            this.mWidth = pLineWidth;
        }
        //_______________________________
        public onMouseDown(pMouseEvent: MouseEvent) {
            super.onMouseDown(pMouseEvent);
            this.getGoodPoint(pMouseEvent, this.mLastMouseDownPoint);
          
        }
        //________________________________
        public onMouseMove(pMouseEvent) {
            let aPoint = new asBase.math.Point(this.mSprite.parent.mouseX, this.mSprite.parent.mouseY);
            this.getGoodPoint(pMouseEvent, aPoint);
            if (this.mIsMouseDown) {
                if (!this.mLastMouseDownPoint.x || !this.mLastMouseDownPoint.y) {
                    this.mLastMouseDownPoint.x = aPoint.x;
                    this.mLastMouseDownPoint.y = aPoint.y;
                }
                this.drawShape();
            }

        }
        //________________________________
        protected drawShape()
            {
                if (this.mLastMouseDownPoint.x && this.mLastMouseDownPoint.y && this.mLastGoodX && this.mLastGoodY) {
                    if (!this.mShape) {
                        this.mShape = new asSvg.Shape();
                        this.mSprite.addChild(this.mShape);

                        this.mShape.setFill(null);
                        this.mShape.setLineStyle(image.ImageDrawing.LINE_WIDTH / this.scale, parseInt(this.mColor));
                        this.mShape.addEventListener("click", () => this.onSelect(), this);
                        this.mShape.moveTo(this.mLastMouseDownPoint.x, this.mLastMouseDownPoint.y);
                    }
                    else {
                        this.mShape.element.setAttribute("stroke", this.mColor);
                        this.mShape.setLineStyle(this.mWidth / this.scale);
                        this.mShape.lineTo(this.mLastGoodX, this.mLastGoodY);
                    }
                }
        }
        //________________________________
        public onMouseUp() {
            super.onMouseUp();
            if (this.mShape) {
                if (this.mShape.getBounds().width == 0 && this.mShape.getBounds().height == 0) {
                    this.mShape.destruct();
                    image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);

                }
            }
            else {
                image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this), 1);
            }
            
        }
        //________________________________
        public onSelect() {
            if (!image.Globals.isItemSelected) {
                super.onSelect();
                this.mHighlightedShape = this.mShape.clone() as asSvg.Shape;
                this.mHighlightedShape.setLineStyle(this.mWidth * 4 / this.scale, null, 0.5);
                this.mHighlightedShape.element.setAttribute("stroke", this.mColor);
                this.mSprite.addChild(this.mHighlightedShape);
                this.mSprite.addChild(this.mShape);

                image.Globals.ImageDrawing.onSelectShape(this);
            }
        }
        //________________________________
        public onDeselect() {
            super.onDeselect();
            this.mHighlightedShape.destruct();
        }
        //________________________________
        /**
         * Changes the color of the scribble object
         * 
         * @param {any} pColor -color to set to -in hex code
         * 
         * @memberOf Scribble
         */
        public changeShapeColor(pColor) :void{
            this.mShape.element.setAttribute("stroke", pColor);
            if (this.mHighlightedShape) {
                this.mHighlightedShape.element.setAttribute("stroke", pColor);
            }
        }
        //_________________________________
        /**
         * Returns the scale of the  SVG stage
         * 
         * @readonly
         * @type {number}
         * @memberOf Scribble
         */
        public get scale() :number{
            return this.mSprite.parent.parent.scaleX;
        }
        //_________________________________
        /**
         * Adds mouse event listeners to the scribble object
         * 
         * @param {Function} pMouseDownCallBack - mousedown event callback
         * 
         * @memberOf Scribble
         */
        public addMouseEvents(pMouseDownCallBack: Function) :void{
            this.mShape.addEventListener("mousedown", (pEvent) => pMouseDownCallBack(pEvent), this);
            this.mMouseDownListener = pMouseDownCallBack;
        }
        //__________________________________
        /**
         * Starts dragging the scribble object according the mouse's position
         * 
         * 
         * @memberOf Scribble
         */
        public startDrag() :void{
            this.mLastGoodX = this.mShape.x;
            this.mLastGoodY = this.mShape.y;
            let aOlDPositionArr: Array<asBase.math.Point> = Array<asBase.math.Point>();
            let aPoint = new asBase.math.Point(this.mShape.x, this.mShape.y);
            aOlDPositionArr.push(aPoint);
            image.Globals.currentShapeDragAction = new action.DragShapeAction(aOlDPositionArr, this);
            if (this.mHighlightedShape) {
                this.mHighlightedShape.startDrag();
            }
            this.mShape.startDrag(false, () => this.setShapeInBound());
         

        }
        //__________________________________
        /**
         * Stops dragging the scribble onject
         * 
         * 
         * @memberOf Scribble
         */
        public stopDrag() :void{
            this.mShape.stopDrag();
            if (this.mHighlightedShape) {
                this.mHighlightedShape.stopDrag();
            }
            if (image.Globals.currentShapeDragAction && !image.Globals.currentShapeDragAction.isAdded) {
                let aNewPositionArr = new Array<asBase.math.Point>();
                let aPoint = new asBase.math.Point(this.mShape.x, this.mShape.y);
                aNewPositionArr.push(aPoint);
                image.Globals.currentShapeDragAction.newPosition = aNewPositionArr;
                image.Globals.ActionManager.addAction(image.Globals.currentShapeDragAction);
            }
        }
        //__________________________________
        /**
         * Deletes the scribble object and removes it from the sprite
         * 
         * 
         * @memberOf Scribble
         */
        public deleteShape():void {
            this.mShape.destruct();
            if (this.mHighlightedShape) {
                this.mHighlightedShape.destruct();
            }
        }
        //__________________________________
        /**
         * Moves the scribble object to a given point
         * 
         * @param {Array<asBase.math.Point>} pArr -Array of one point to move scribble to
         * 
         * @memberOf Scribble
         */
        public moveShape(pArr: Array<asBase.math.Point>) {
            this.mShape.x = pArr[0].x;
            this.mShape.y = pArr[0].y;
        }
        //__________________________________
        /**
         * Adds the scribble object to a given sprite
         * 
         * @param {asSvg.Sprite} pSprite -SVG sprite to add scribble to
         * 
         * @memberOf Scribble
         */
        public addToSprite(pSprite: asSvg.Sprite) {
            this.mSprite = pSprite;
            this.mSprite.addChild(this.mShape);
            this.mShape.addEventListener("click", () => this.onSelect(), this);
        }
        //__________________________________
        /**
         * Clones the scribble object
         * 
         * @returns {Scribble} -cloned object
         * 
         * @memberOf Scribble
         */
        public clone() {
            let aShape = new Scribble(null, this.mColor, this.mWidth);
            aShape.mWidth = this.mWidth;
            aShape.mColor = this.mColor;
            aShape.mShape = this.element.clone() as asSvg.Shape;
            aShape.myClassName = this.myClassName;
            return aShape;
        }
        //_________________________________
        protected setShapeInBound() {
            if (image.Globals.ImageDrawing.isOriginalRatio)
            {
                this.setShapeInBoundOriginal();

            }
            else {
                this.setShapeInBoundTransform();
            }
        }
        //__________________________________________
        private setShapeInBoundOriginal() {
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();
            let aShapeRect = this.mShape.getBounds();
            console.log("circle rect");
            console.log("x   " + this.mShape.x + "    y " + this.mShape);
            if ((aShapeRect.left < aImageRect.left || aShapeRect.right > aImageRect.right) && image.Globals.isDrawInBound ) {
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
        }
        //________________________________________
        private setShapeInBoundTransform() {
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();
            let aShapeRect = this.mShape.getBounds();
            console.log("circle rect");
            console.log("x   " + this.mShape.x + "    y " + this.mShape);
            if ((aShapeRect.left < aImageRect.left || aShapeRect.right > aImageRect.right) && image.Globals.isDrawInBound)  {
                this.mShape.y = this.mLastGoodY;
                if (this.mHighlightedShape) {
                    this.mHighlightedShape.y = this.mLastGoodY;
                }
            }
            else {
                this.mLastGoodY = this.mShape.y;
            }
            if ((aShapeRect.top < aImageRect.top || aShapeRect.bottom > aImageRect.bottom) && image.Globals.isDrawInBound){
                this.mShape.x = this.mLastGoodX;
                if (this.mHighlightedShape) {
                    this.mHighlightedShape.x = this.mLastGoodX;
                }
            }
            else {
                this.mLastGoodX = this.mShape.x;
            }
        }
        //_________________________________________________________
        private getGoodPoint(pMouseEvent: MouseEvent, pPoint: asBase.math.Point) {
            this.mSprite.stage.onMouseMove(pMouseEvent);
            let aImage = document.getElementById("image");
            let aImageRect: ClientRect = aImage.getBoundingClientRect();
            let aRect: asBase.math.Rectangle = new asBase.math.Rectangle(aImageRect);
            if (!aRect.intersectsPoint(pMouseEvent.clientX, pMouseEvent.clientY) && image.Globals.isDrawInBound) {
                pPoint.x = this.mLastGoodX;
                pPoint.y = this.mLastGoodY;
            }
            else {
                this.mLastGoodX = pPoint.x = this.mSprite.parent.mouseX;
                this.mLastGoodY= pPoint.y = this.mSprite.parent.mouseY;
            }

        }
        //_________________________________
        /**
         * Returns the asSVG Display Object member
         * 
         * @readonly
         * 
         * @memberOf Scribble
         */
        public get element() {
            return this.mShape;
        }
        //______________________________________
        /**
         * Retutns the class nmae
         * 
         * 
         * @memberOf Scribble
         */
        public get myClassName():string {
            return this.mClassName;
        }
        //_______________________________
        /**
         * Sets the class name
         * 
         * 
         * @memberOf Scribble
         */
        public set myClassName(pClassName) {
            this.mClassName = pClassName;
        }
        //______________________________

    }
}