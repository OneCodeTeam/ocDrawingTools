//module 
module shapes{
    /**
     * Represents an arrow drawn by the user
     * 
     * @export
     * @class Arrow
     * @extends {Shape}
     */
    export class Arrow extends Shape {
        private mLines: Array<asSvg.Line>;
        private mHighlightedLines: Array<asSvg.Line>;
        private mEndPoint: asBase.math.Point;
        protected mWidth: number = 4;
        private mArrowLength: number = 25;
        protected mLastGoodX: Array<number>;
        protected mLastGoodY: Array<number>;
        protected mLastGoodMouseX;
        protected mLastGoodMouseY;
        /**
         * Creates an instance of Arrow.
         * @param {asSvg.Sprite} pSprite - Sprite to draw the arrow on
         * @param {any} pColor -Color to draw the arrow- in hex code
         * 
         * @memberOf Arrow
         */
        constructor(pSprite: asSvg.Sprite, pColor) {
            super();
            this.mSprite = pSprite;
            this.mColor = pColor;
        }
        //_____________________________________
        public onMouseDown(pMouseEvent) {
            super.onMouseDown(pMouseEvent);
            this.getGoodPoint(pMouseEvent, this.mLastMouseDownPoint);
        }
        //____________________________________________________
        public onMouseMove(pMouseEvent: MouseEvent) {
            if (this.mIsMouseDown) {
                this.mEndPoint = new asBase.math.Point(this.mSprite.parent.mouseX, this.mSprite.parent.mouseY);
                this.getGoodPoint(pMouseEvent, this.mEndPoint);
                if (!this.mLastMouseDownPoint.x || !this.mLastMouseDownPoint.y) {
                    this.mLastMouseDownPoint.x = this.mEndPoint.x;
                    this.mLastMouseDownPoint.y = this.mEndPoint.y;
                }
                this.drawShape();
            }

        }
        //_____________________________
        protected drawShape() {
            if (this.mLastMouseDownPoint.x && this.mLastMouseDownPoint.y && this.mEndPoint.x && this.mEndPoint.y) {
                if (!this.mLines) {

                    this.mLines = new Array<asSvg.Line>();
                    //main line
                    this.mLines[0] = new asSvg.Line(this.mLastMouseDownPoint.x, this.mLastMouseDownPoint.y, this.mEndPoint.x, this.mEndPoint.y);
                    this.mLines[0].setFill(null);
                    this.mLines[0].setLineStyle(this.mWidth / this.scale, 0xffbbff);
                    this.mLines[0].element.setAttribute("stroke", this.mColor);
                    this.mSprite.addChild(this.mLines[0]);
                    this.mLines[0].addEventListener("click", () => this.onSelect(), this);

                    ////arrow line 1
                    let aArrowPoint1 = this.getArrowPoint1();
                    if (isNaN(aArrowPoint1.x) || isNaN(aArrowPoint1.y)) {
                        aArrowPoint1.x = this.mEndPoint.x;
                        aArrowPoint1.y = this.mEndPoint.y;
                    }
                    this.mLines[1] = new asSvg.Line(this.mEndPoint.x, this.mEndPoint.y, aArrowPoint1.x, aArrowPoint1.y);
                    this.mLines[1].setFill(null);
                    this.mLines[1].setLineStyle((this.mWidth / this.scale) * 0.5);
                    this.mLines[1].element.setAttribute("stroke", this.mColor);
                    this.mSprite.addChild(this.mLines[1]);
                    this.mLines[1].addEventListener("click", () => this.onSelect(), this);

                    let aArrowPoint2 = this.getArrowPoint2();
                    if (isNaN(aArrowPoint2.x) || isNaN(aArrowPoint2.y)) {
                        aArrowPoint2.x = this.mEndPoint.x;
                        aArrowPoint2.y = this.mEndPoint.y;
                    }
                    this.mLines[2] = new asSvg.Line(this.mEndPoint.x, this.mEndPoint.y, aArrowPoint2.x, aArrowPoint2.y);
                    this.mLines[2].setFill(null);
                    this.mLines[2].setLineStyle((this.mWidth / this.scale) * 0.5);
                    this.mLines[2].element.setAttribute("stroke", this.mColor);
                    this.mSprite.addChild(this.mLines[2]);
                    this.mLines[2].addEventListener("click", () => this.onSelect(), this);



                }
                else {
                    this.mLines[0].update(this.mLastMouseDownPoint.x, this.mLastMouseDownPoint.y, this.mEndPoint.x, this.mEndPoint.y);
                    let aArrowPoint1 = this.getArrowPoint1();

                    if (isNaN(aArrowPoint1.x) || isNaN(aArrowPoint1.y)) {
                        aArrowPoint1.x = this.mEndPoint.x;
                        aArrowPoint1.y = this.mEndPoint.y;
                    }
                    this.mLines[1].update(this.mEndPoint.x, this.mEndPoint.y, aArrowPoint1.x, aArrowPoint1.y);
                    let aArrowPoint2 = this.getArrowPoint2();

                    if (isNaN(aArrowPoint2.x) || isNaN(aArrowPoint2.y)) {
                        aArrowPoint2.x = this.mEndPoint.x;
                        aArrowPoint2.y = this.mEndPoint.y;
                    }
                    this.mLines[2].update(this.mEndPoint.x, this.mEndPoint.y, aArrowPoint2.x, aArrowPoint2.y);
                }
            }
        }
        //________________________________
        
        public onMouseUp() {
            image.Globals.isArrowMode = false;
            super.onMouseUp();
            if (this.mLines) {
                for (let i = 0; i < this.mLines.length; i++) {
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
            
        }
        //________________________________
        /**
         * Returns the length of the arrow
         * 
         * @readonly
         * 
         * @memberOf Arrow
         * @returns {number}-length of arrow
         */
        public get length():number {
            let aLen = asBase.math.MathUtils.distance(this.mEndPoint, this.mLastMouseDownPoint);
            return aLen;
        }
        //________________________________________________
        private getLineAngle() {
            var angle = Math.atan((this.mEndPoint.x - this.mLastMouseDownPoint.x) / (this.mEndPoint.y - this.mLastMouseDownPoint.y)) * 180 / Math.PI;
            return angle;
        }
        //_______________________
        protected getArrowPoint1() {
            let arrowAngle = this.getLineAngle() + 45;
            if (this.mEndPoint.y < this.mLastMouseDownPoint.y) {
                arrowAngle = this.getLineAngle() + 180 + 45;
            }
            let aAdjAngle = 180 - arrowAngle;

            let aX = this.mEndPoint.x - (Math.cos(aAdjAngle * Math.PI / 180)) * (20);
            let aY = this.mEndPoint.y - (Math.sin(aAdjAngle * Math.PI / 180)) * (20);

            let aPoint = new asBase.math.Point(aX, aY);
            return aPoint;
        }
        //________________________________________
        protected getArrowPoint2() {
            let arrowAngle = this.getLineAngle() - 45;
            if (this.mEndPoint.y < this.mLastMouseDownPoint.y) {
                arrowAngle = this.getLineAngle() + 180 - 45;
            }
            let aAdjAngle = 180 - arrowAngle;

            let aX = this.mEndPoint.x + (Math.cos(aAdjAngle * Math.PI / 180)) * (20)
            let aY = this.mEndPoint.y + (Math.sin(aAdjAngle * Math.PI / 180)) * (20);

            let aPoint = new asBase.math.Point(aX, aY);
            return aPoint;
        }
        //_______________________________________________________
        protected onSelect() {
            if (!image.Globals.isItemSelected) {
                super.onSelect();
                this.mHighlightedLines = new Array<asSvg.Line>();
                for (let i = 0; i < this.mLines.length; i++) {
                    let aLine = this.mLines[i].clone() as asSvg.Line;
                    this.mSprite.addChild(aLine);
                    this.mSprite.addChild(this.mLines[i]);
                    this.mHighlightedLines.push(aLine);
                    aLine.setLineStyle(this.mWidth * 2.5, null, 0.5);
                }
                image.Globals.ImageDrawing.onSelectShape(this);
            }
        }
        //_________________________________________
        /**
         * Function that is called when the arrow object is unselected by the user
         * 
         * 
         * @memberOf Arrow
         */
        public onDeselect() :void{
            super.onDeselect();
            for (let i = 0; i < this.mHighlightedLines.length; i++) {
                this.mSprite.removeChild(this.mHighlightedLines[i]);
            }
        }
        //______________________________

        /**
         * Changes the color of the arrow
         * 
         * @param {any} pColor -color to change to- in hex code
         * 
         * @memberOf Arrow
         */
        public changeShapeColor(pColor) :void {
            for (let i = 0; i < this.mLines.length; i++) {
                this.mLines[i].element.setAttribute("stroke", pColor);
            }
            if (this.mHighlightedLines) {
                for (let i = 0; i < this.mHighlightedLines.length; i++) {
                    this.mHighlightedLines[i].element.setAttribute("stroke", pColor);
                }
            }
        }

        //___________________________________________________
        /**
         * Starts dragging the arrow object on the screen by the mouse
         * 
         * 
         * @memberOf Arrow
         */
        public startDrag() :void{
            let aOldPositionArr = new Array<asBase.math.Point>();
            this.mLastGoodX = new Array<number>(3);
            this.mLastGoodY = new Array<number>(3);
            for (let i = 0; i < this.mLines.length; i++) {
                this.mLastGoodX[i] = this.mLines[i].x;
                this.mLastGoodY[i] = this.mLines[i].y;
                let aPoint = new asBase.math.Point(this.mLines[i].x, this.mLines[i].y);
                aOldPositionArr.push(aPoint);
                image.Globals.currentShapeDragAction = new action.DragShapeAction(aOldPositionArr, this);
            }

            if (this.mHighlightedLines) {
                for (let i = 0; i < this.mHighlightedLines.length; i++) {
                    this.mHighlightedLines[i].startDrag();
                }
            }

            for (let i = 0; i < this.mLines.length-1; i++) {
                this.mLines[i].startDrag();
            }
            this.mLines[2].startDrag(false, () => this.setShapeInBound())
       
        }
        //_____________________________________________
        /**
         * Stops dragging the arrow object on the screen 
         * 
         * 
         * @memberOf Arrow
         */
        public stopDrag():void{
            for (let i = 0; i < this.mLines.length; i++) {
                this.mLines[i].stopDrag();
            }
            if (this.mHighlightedLines) {
                for (let i = 0; i < this.mHighlightedLines.length; i++) {
                    this.mHighlightedLines[i].stopDrag();
                }
            }

            let aNewPositionArr = new Array<asBase.math.Point>();
            if (image.Globals.currentShapeDragAction && !image.Globals.currentShapeDragAction.isAdded) {
                for (let i = 0; i < this.mLines.length; i++) {
                    let aPoint = new asBase.math.Point(this.mLines[i].x, this.mLines[i].y);
                    aNewPositionArr.push(aPoint);
                    image.Globals.currentShapeDragAction.newPosition = aNewPositionArr;
                    image.Globals.ActionManager.addAction(image.Globals.currentShapeDragAction);
                }
            }

        }
        //______________________________________
        protected setShapeInBound() {

            if (image.Globals.ImageDrawing.isOriginalRatio) {
                this.setShapeInBoundOriginal();
            }
            else {
                this.setShapeInBoundTransform();
            }

        }
        //___________________________________
        private setShapeInBoundOriginal() {
        let aImage = document.getElementById("image");
        let aImageRect = aImage.getBoundingClientRect();

        for (let i = 0; i < this.mLines.length; i++) {
            let aLineRect = this.mLines[i].getBounds();
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
        for (let i = 0; i < this.mLines.length; i++) {
            let aLineRect = this.mLines[i].getBounds();
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
    }
        //___________________________________
        private setShapeInBoundTransform() {
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();

            for (let i = 0; i < this.mLines.length; i++) {
                let aLineRect = this.mLines[i].getBounds();
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
            for (let i = 0; i < this.mLines.length; i++) {
                let aLineRect = this.mLines[i].getBounds();
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
        }
        //_____________________________________
        private getGoodPoint(pMouseEvent: MouseEvent, pPoint: asBase.math.Point) :void{
            this.mSprite.stage.onMouseMove(pMouseEvent);
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();

            if ((pMouseEvent.clientX < aImageRect.left || pMouseEvent.clientX > aImageRect.right || pMouseEvent.clientY < aImageRect.top || pMouseEvent.clientY > aImageRect.bottom) && image.Globals.isDrawInBound) {
                pPoint.x = this.mLastGoodMouseX;
                pPoint.y = this.mLastGoodMouseY;
            }
            else {
                this.mLastGoodMouseX = pPoint.x = this.mSprite.parent.mouseX;
                this.mLastGoodMouseY = pPoint.y = this.mSprite.parent.mouseY;
            }

        }
        //__________________________________________________
        /**
         * Moves the arrow object to a given point
         * 
         * @param {Array<asBase.math.Point>} pArr -Point to move arrow to {x,y}
         * 
         * @memberOf Arrow
         */
        public moveShape(pArr: Array<asBase.math.Point>):void{
            for (let i = 0; i < this.mLines.length; i++)
            {
                this.mLines[i].x = pArr[i].x,
                this.mLines[i].y = pArr[i].y;
            }
        }
        
        //____________________________________________________
        /**
         * Add mouse events to the arrow object
         * 
         * @param {Function} pMouseDownCallBack -Callback for "mouse down"
         * 
         * @memberOf Arrow
         */
        public addMouseEvents(pMouseDownCallBack: Function) :void{
            for (let i = 0; i < this.mLines.length; i++) {
                this.mLines[i].addEventListener("mousedown", (pEvent) => pMouseDownCallBack(pEvent), this);
            }
            this.mMouseDownListener = () => pMouseDownCallBack();
          
          
        }
        //____________________________________
        /**
         * Removes mouse events from the arrow o
         * 
         * 
         * @memberOf Arrow
         */
        public removeMouseEvents() :void{
            for (let i = 0; i < this.mLines.length; i++) {
                this.mLines[i].removeEventListener("mousedown", this.mMouseDownListener);
            }
        
        }
        //________________________________________
        /**
         * Deletes the arrow object and removes it from the sprite
         * 
         * 
         * @memberOf Arrow
         */
        public deleteShape() :void{
            for (let i = 0; i < this.mLines.length; i++) {
                this.mLines[i].destruct();
            }
            if (this.mHighlightedLines) {
                for (let i = 0; i < this.mHighlightedLines.length; i++) {
                    this.mHighlightedLines[i].destruct();
                }
            }
        }
        //____________________________________________
       
        /**
         * Clones the arrow object
         * 
         * @returns {Arrow} -The cloned arrow
         * 
         * @memberOf Arrow
         */
        public clone() {
            let aShape = new Arrow(null, this.mColor);
            aShape.mWidth = this.mWidth;
            aShape.mColor = this.mColor;
            aShape.mLines = new Array<asSvg.Line>();
            for (let i = 0; i < this.mLines.length; i++) {
                aShape.mLines[i] = this.mLines[i].clone() as asSvg.Line;
            }
            return aShape;
        }
        //________________________________
        /**
         * Adds the arrow object to a  svg sprite
         * 
         * @param {asSvg.Sprite} pSprite - SVG Sprite to add arrow to
         * 
         * @memberOf Arrow
         */
        public addToSprite(pSprite: asSvg.Sprite):void {
            this.mSprite = pSprite;
            for (let i = 0; i < this.mLines.length; i++) {
                this.mSprite.addChild(this.mLines[i]);
                this.mLines[i].addEventListener("click", () => this.onSelect(), this);
            }
        }
        //_______________________
        /**
         * Set the line width of arrow
         * 
         * @param {number} pWidth -Width to set arrow to 
         * 
         * @memberOf Arrow
         */
        public setLineWidth(pWidth: number):void {


            this.mLines[0].setLineStyle(pWidth );
                this.mLines[1].setLineStyle(pWidth*0.5);
            this.mLines[2].setLineStyle(pWidth * 0.5);
        }
        //_______________________________________
        }
    }
