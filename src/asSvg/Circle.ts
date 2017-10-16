/// <reference path="displayobject.ts" />


module asSvg {
    /**
     * 
     * 
     * @export
     * @class Circle
     * @extends {DisplayObject}
     */
    export class Circle extends DisplayObject{

        //------------------------------
        // Members
        //------------------------------
        protected mElement: Element;


        /**
         * Creates an instance of Circle.
         * @param {number} pX 
         * @param {number} pY 
         * @param {number} pR 
         * @param {number} [pColor=0] 
         * 
         * @memberOf Circle
         */
        constructor(pX: number, pY: number, pR: number,pColor:number = 0) {
            super();
            this.update(pX, pY, pR);
            if (pColor != 0) {
                this.setFill(pColor);
            }
        }


        /****************************
        * Override methods
        ****************************/
        protected createElement() {
            this.create("circle");
        }


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
        public update(pX?: number, pY?: number, pR?: number) {
            if (pX != null) {
                this.mElement.setAttribute("cx", pX.toString());
            }
            if (pY != null) {
                this.mElement.setAttribute("cy", pY.toString());
            }
            if (pR != null) {
                this.mElement.setAttribute("r", pR.toString());
            }
        }
        //_________________________________________________________________
        public set radios(pR: number) {
            this.mElement.setAttribute("r", pR.toString());
        }
        public get radios(): number {
            return (parseFloat(this.mElement.getAttribute("r")));
        }
        /****************************
        * Getters and Setters
        ****************************/


        public static get myName(): string {
            return "Circle";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Circle";
        }
        //______________________________________________


    }
}