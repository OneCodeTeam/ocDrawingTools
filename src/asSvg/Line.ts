/// <reference path="displayobject.ts" />

module asSvg {
    /**
     * Represents a SVGLineElement
     * 
     * @export
     * @class Line
     * @extends {DisplayObject}
     */
    export class Line extends DisplayObject{

        public static LINE_CAP_BUTT: string = "butt";
        public static LINE_CAP_SQUARE: string = "square";
        public static LINE_CAP_ROUND: string = "round";

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;


        /**
         * Creates an instance of Line.
         * @param {number} pX1 
         * @param {number} pY1 
         * @param {number} pX2 
         * @param {number} pY2 
         * 
         * @memberOf Line
         */
        constructor(pX1: number, pY1: number, pX2: number, pY2: number) {
            super();
            this.update(pX1, pY1, pX2, pY2);
        }


        /****************************
        * Override methods
        ****************************/
        protected createElement() {
            this.create("line");
        };


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
        public update(pX1?: number, pY1?: number, pX2?: number, pY2?: number) {
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
         * @memberOf Line
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
         * @memberOf Line
         */
        public get myClassName(): string {
            return "Line";
        }
        //______________________________________________


    }
}