module asBase.math {
    /**
     * Represetns a Rectangle
     * 
     * @export
     * @class Rectangle
     */
    export class Rectangle {

        //------------------------------
        // Members
        //------------------------------
        public left: number = 0;

        public right: number = 0;

        public top: number = 0;
        public bottom: number = 0;

        /**
         * Creates an instance of Rectangle.
         * @param {ClientRect} [pClientRect] 
         * 
         * @memberOf Rectangle
         */
        constructor(pClientRect?: ClientRect) {
            if (pClientRect != null) {
                this.left = pClientRect.left
                this.right = pClientRect.right
                this.top = pClientRect.top
                this.bottom = pClientRect.bottom
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
        public intersectsPoint(pX, pY): boolean {
            return !((pX < this.left) || (pX > this.right) || (pY < this.top) || (pY > this.bottom))
        }
        //____________________________________

        /**
         * Checks if a rectangle intersects with this rectangle
         * 
         * @param {Rectangle} pRectB -rectangle to check 
         * @returns {boolean} 
         * 
         * @memberOf Rectangle
         */
        public intersects(pRectB: Rectangle): boolean {
            return !(pRectB.left > this.right ||
                pRectB.right < this.left ||
                pRectB.top > this.bottom ||
                pRectB.bottom < this.top);
        }
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
        public static intersectRect(pRectA: ClientRect, pRectB: ClientRect): boolean {
            return !(pRectB.left > pRectA.right ||
                pRectB.right < pRectA.left ||
                pRectB.top > pRectA.bottom ||
                pRectB.bottom < pRectA.top);
        }
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
        public static intersectPoint(pRectA: ClientRect, iX:number, iY:number): boolean {
            return !(pRectA.left > iX ||
            pRectA.right < iX ||
            pRectA.top > iY ||
            pRectA.bottom < iY);
        }
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
        public static create(iX: number, iY: number, iWidth: number, iHeight: number): Rectangle {
            let aRet: Rectangle = new Rectangle();
            aRet.left = iX;
            aRet.right = iX + iWidth;
            aRet.top = iY;
            aRet.bottom = iY + iHeight;

            return aRet;
       
        }
        /****************************
        * Methods
        ****************************/



        /****************************
        * Getters and Setters
        ****************************/
        public get height(): number {
            return Math.abs(this.top - this.bottom);
        }
        public set height(pVal: number) {
            this.bottom = this.top + pVal;
        }
        //_____________________________________________________

        public get width(): number {
            return Math.abs(this.left - this.right);
        }
        public set width(pVal: number) {
            this.right = this.left + pVal;
        }
        //_____________________________________________________

        public get y(): number {
            return this.top;
        }
        public set y(pVal: number) {
            this.top = pVal;
        }
        //_____________________________________________________

        public get x(): number {
            return this.left;
        }
        public set x(pVal: number) {
            this.left = pVal;
        }
        //_____________________________________________________

        public static get myClassName(): string {
            return "Rectangle";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Rectangle";
        }
        //______________________________________________


    }
}