module asBase.math {
    /**
     * Represents a 2D Point
     * 
     * @export
     * @class Point
     */
    export class Point {

        //------------------------------
        // Members
        //------------------------------
        public x;
        public y;

        /**
         * Creates an instance of Point.
         * @param {number} [iX=0] 
         * @param {number} [iY=0] 
         * 
         * @memberOf Point
         */
        constructor(iX:number = 0,iY:number = 0) {
            this.x = iX;
            this.y = iY;
        }


        /****************************
        * Override methods
        ****************************/



        /****************************
        * Methods
        ****************************/
        /**
         * Subtracts two points
         * 
         * @param {Point} p -point to subtract from this point
         * @returns {Point}  - 
         * 
         * @memberOf Point
         */
        public subtract(p: Point): Point {
            return (new Point(this.x - p.x, this.y - p.y));
        }
        //________________________________________________________________

        /**
         * Adds two points
         * 
         * @param {Point} p -point to add
         * @returns {Point} - the sum of two points
         * 
         * @memberOf Point
         */
        public add(p: Point): Point {
            return (new Point(this.x + p.x, this.y + p.y));
        }

        //________________________________________________________________

        /**
         * 
         * 
         * @static
         * @param {Point} p1 
         * @param {Point} p2 
         * @param {number} pFrac 
         * @returns {Point} 
         * 
         * @memberOf Point
         */
        public static interpolate(p1: Point, p2: Point, pFrac:number): Point {
            var aX = p1.x + (p2.x - p1.x) * pFrac;
            var aY = p1.y + (p2.y - p1.y) * pFrac;
            return (new Point(aX,aY));
        }
        
        /****************************
        * Getters and Setters
        ****************************/
        public set length(pVal) {
            let aV: number = this.length / pVal;
            this.x /= aV;
            this.y /= aV;
        }
        
        public get length(): number {
            return (Math.sqrt(this.x * this.x + this.y * this.y));
        }
        //________________________________________________________________
        public static get myName(): string {
            return "Point";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Point";
        }
        //______________________________________________


    }
}