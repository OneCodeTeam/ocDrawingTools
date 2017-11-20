/// <reference path="../shapes/shape.ts" />

module image {
    /**
     * Class that manages cropping of an image
     * 
     * @export
     * @class ImageCrop
     * @extends {shapes.Shape}
     */
    export class ImageCrop extends shapes.Shape {
 
        private mRect: asSvg.Rect;
        private mRectBounds: any = {};
        private mHeight: number;
        protected mWidth: number;
        private mX: number;
        private mY: number;
        private mLastGoodRectX;
        private mLastGoodRectY;
        private mLastGoodMouseX;
        private mLastGoodMouseY;
        private mLastMouseDownPointRect: asBase.math.Point;
        /**
         * Creates an instance of ImageCrop.
         * @param {asSvg.Sprite} pSprite 
         * 
         * @memberOf ImageCrop
         */
        constructor(pSprite: asSvg.Sprite) {
            super();
            this.mSprite = new asSvg.Sprite();
            this.mSprite.instanceName = "Crop Panel";
            pSprite.addChild(this.mSprite);
            
        }
        //_________________________________
        public onMousedown(pEvent: MouseEvent) {
            super.onMouseDown(pEvent);
            this.mRectBounds = {};
            if (this.mRect) {
                this.mSprite.removeChild(this.mRect);
            }
            this.mRect = null;
            this.mLastGoodMouseX = null;
            this.mLastGoodMouseY = null;
            this.mLastGoodRectX = null;
            this.mLastGoodRectY=null;
            this.mLastMouseDownPointRect = new asBase.math.Point();
            this.mLastMouseDownPointRect.x= this.mSprite.parent.parent.parent.mouseX;
            this.mLastMouseDownPointRect.y = this.mSprite.parent.parent.parent.mouseY;
            this.getGoodPoints(pEvent, this.mLastMouseDownPoint, this.mLastMouseDownPointRect);
          
        }
        //____________________________________
        public onMouseMove(pEvent: MouseEvent) {
            if (this.mIsMouseDown) {
                let aPoint = new asBase.math.Point(this.mSprite.parent.mouseX, this.mSprite.parent.mouseY);
                let aPointRect = new asBase.math.Point(this.mSprite.parent.parent.parent.mouseX, this.mSprite.parent.parent.parent.mouseY);
                this.getGoodPoints(pEvent, aPoint, aPointRect);
                if (!this.mLastMouseDownPoint.x || !this.mLastMouseDownPoint.y) {
                    this.mLastMouseDownPoint.x = aPoint.x;
                    this.mLastMouseDownPoint.y = aPoint.y;
                    this.mLastMouseDownPointRect.x = aPointRect.x;
                    this.mLastMouseDownPointRect.y = aPointRect.y;
                }
                if (this.mLastMouseDownPoint.x && this.mLastMouseDownPoint.y && aPoint.x && aPoint.y)
                {


                    let aX1 = Math.min(aPoint.x, this.mLastMouseDownPoint.x)
                    let aX2 = Math.max(aPoint.x, this.mLastMouseDownPoint.x)
                    let aY1 = Math.min(aPoint.y, this.mLastMouseDownPoint.y)
                    let aY2 = Math.max(aPoint.y, this.mLastMouseDownPoint.y)


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



                    let aX1Rect = Math.min(aPointRect.x, this.mLastMouseDownPointRect.x);

                    let aX2Rect = Math.max(aPointRect.x, this.mLastMouseDownPointRect.x);
                    let aY1Rect = Math.min(aPointRect.y, this.mLastMouseDownPointRect.y);

                    let aY2Rect = Math.max(aPointRect.y,this.mLastMouseDownPointRect.y);

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

        }
        //____________________________________________
        protected drawShape() {
            if (!this.mRect) {
                this.mRect = new asSvg.Rect(this.mX, this.mY, this.mWidth, this.mHeight);
                this.mRect.setFill(null, 0);
                this.mRect.setLineStyle(4, 0xffff, 1, null, null, [10, 3]);
                
                this.mSprite.addChild(this.mRect);
            }
            else {
                this.mRect.update(this.mX, this.mY, this.mWidth, this.mHeight);
            }
        }
        //_______________________________________
        private getGoodPoints(pMouseEvent: MouseEvent, pPoint: asBase.math.Point, pPointRect: asBase.math.Point) {
            this.mSprite.stage.onMouseMove(pMouseEvent);
            let aImage = document.getElementById("image");
            let aImageRect = aImage.getBoundingClientRect();
            if ((pMouseEvent.clientX < aImageRect.left || pMouseEvent.clientX > aImageRect.right || pMouseEvent.clientY < aImageRect.top || pMouseEvent.clientY > aImageRect.bottom) && image.Globals.isDrawInBound) {
                pPoint.x = this.mLastGoodMouseX;
                pPoint.y = this.mLastGoodMouseY;
                pPointRect.x = this.mLastGoodRectX;
                pPointRect.y = this.mLastGoodRectY;
            }
            else {
                this.mLastGoodMouseX = pPoint.x=this.mSprite.parent.mouseX;
                this.mLastGoodMouseY = pPoint.y=this.mSprite.parent.mouseY;
                this.mLastGoodRectX = pPointRect.x=this.mSprite.parent.parent.parent.mouseX
                this.mLastGoodRectY=pPointRect.y=this.mSprite.parent.parent.parent.mouseY;

            }
        }        
      
        //_________________________________________

        public onMouseUp() {
            super.onMouseUp();
        }
        //____________________________________________
        /**
         * Returns the bounds of the rectangle to crop
         * 
         * @returns 
         * 
         * @memberOf ImageCrop
         */
        public getCropBounds() {
    
            return this.mRectBounds;
        }
        //_________________________________
        /**
         * Returns the rectangle  to crop
         * 
         * @readonly
         * 
         * @memberOf ImageCrop
         */
        public get rect() {
            return this.mRect;
        }
    }
}