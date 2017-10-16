/// <reference path="displayobject.ts" />

module asSvg {
    
    /**
     * Represents a shape
     * 
     * @export
     * @class Shape
     * @extends {DisplayObject}
     */
    export class Shape extends DisplayObject{

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;
        private mDraw: string
        private mCurrentX: number = 0;
        private mCurrentY: number = 0;

        /**
         * Creates an instance of Shape.
         * 
         * @memberOf Shape
         */
        constructor() {
            super();
            this.mDraw = "";
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
        protected createElement() {
            this.create("path");
        };


        /****************************
        * Methods
        ****************************/


        /**
         * Clears the element
         * 
         * 
         * @memberOf Shape
         */
        public clear() {
            this.mDraw = "";
            this.mElement.setAttribute("d", this.mDraw);
        }
        //_________________________________________________________


        /**
         * Moves the element to a given point
         * 
         * @param {number} x 
         * @param {number} y 
         * 
         * @memberOf Shape
         */
        public moveTo(x: number, y: number) {
            this.mDraw += "M " + x + " " + y + " ";
            this.mCurrentX = x;
            this.mCurrentY = y;
            this.mElement.setAttribute("d",this.mDraw);
        }
        //_________________________________________________________

        /**
         * Draws a line to a specified point
         * 
         * @param {number} x 
         * @param {number} y 
         * 
         * @memberOf Shape
         */
        public lineTo(x: number, y: number) {
            this.mDraw += "l " + (x - this.mCurrentX) + " " + (y - this.mCurrentY) + " ";
            this.mCurrentX = x;
            this.mCurrentY = y;
            this.mElement.setAttribute("d", this.mDraw);
        }

        //________________________________________________________
        /**
         * Sets the element's line as dashed
         * 
         * @param {Array<number>} pDashedArray 
         * 
         * @memberOf Shape
         */
        public dashLine(pDashedArray:Array<number>) {
            this.mElement.setAttribute("stroke-dasharray", pDashedArray.join(","));
        }

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
        public quadraticBezierCurve(x1, y1, x2, y2) {
           
            this.mDraw += "q " + (x1 - this.mCurrentX) + " " + (y1 - this.mCurrentY) + " " + (x2 - this.mCurrentX) + " " + (y2 - this.mCurrentY) + " ";
            this.mCurrentX = x2;
            this.mCurrentY = y2;
            this.mElement.setAttribute("d", this.mDraw);
        }
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
        public bezierCurveTo(x1, y1, x2, y2, x3, y3) {

            this.mDraw += "c " + (x1 - this.mCurrentX) + " " + (y1 - this.mCurrentY) + " " + (x2 - this.mCurrentX) + " " + (y2 - this.mCurrentY) + " " + (x3 - this.mCurrentX) + " " + (y3 - this.mCurrentY) + " ";
            this.mCurrentX = x3;
            this.mCurrentY = y3;
            this.mElement.setAttribute("d", this.mDraw);
        }
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
        public static get myName(): string {
            return "Shape";
        }
        //______________________________________________
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberOf Shape
         */
        public get myClassName(): string {
            return "Shape";
        }
        //______________________________________________


    }
}