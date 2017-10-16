/// <reference path="displayobject.ts" />

module asSvg {

    /**
     * Represents a class containing a SVGRectElement
     * 
     * @export
     * @class Rect
     * @extends {DisplayObject}
     */
    export class Rect extends DisplayObject{

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;


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
        constructor(pX: number, pY: number, pWidth: number, pHeight: number, pRx?: number, pRy?: number) {
            super();
            this.update(pX, pY, pWidth, pHeight, pRx, pRy);
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
        protected createElement() {
            this.create("rect");
        };


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
        public update(pX?: number, pY?: number, pWidth?: number, pHeight?: number, pRx?: number, pRy?: number) {
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
         * @memberOf Rect
         */
        public static get myName(): string {
            return "Line";
        }
        //______________________________________________
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberOf Rect
         */
        public get myClassName(): string {
            return "Line";
        }
        //______________________________________________


    }
}