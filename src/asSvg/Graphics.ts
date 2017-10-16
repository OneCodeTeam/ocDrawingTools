module asSvg {
    /**
     * 
     * 
     * @export
     * @class Graphics
     */
    export class Graphics {

        //------------------------------
        // Members
        //------------------------------
        private mDraw:string 

        /**
         * Creates an instance of Graphics.
         * 
         * @memberOf Graphics
         */
        constructor() {
            this.mDraw = "";
        }


        /****************************
        * Override methods
        ****************************/



        /****************************
        * Methods
        ****************************/

        /**
         * Moves the object to a point
         * 
         * @param {any} x 
         * @param {any} y 
         * 
         * @memberOf Graphics
         */
        public moveTo(x, y) {
            this.mDraw += "M " + x + " " + y + " ";
        }
        //_________________________________________________________

        /**
         * Draws a line to a point
         * 
         * @param {any} x 
         * @param {any} y 
         * 
         * @memberOf Graphics
         */
        public lineTo(x, y) {
            this.mDraw += "l " + x + " " + y + " ";
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
         * @memberOf Graphics
         */
        public quadraticBezierCurve(x1, y1,x2,y2) {
            this.mDraw += "q " + x1 + " " + y1 + " " + x2 + " " + y2 + " ";
        }


        /****************************
        * Getters and Setters
        ****************************/
        public set owner(pElement: Element) {

        }

        public static get myName(): string {
            return "Graphics";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Graphics";
        }
        //______________________________________________


    }
}