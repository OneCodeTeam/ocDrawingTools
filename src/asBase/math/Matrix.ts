
/*
Base On:
https://github.com/epistemex/transformation-matrix-js/blob/master/src/matrix.js

*/

module asBase.math {
    /**
     * Represents a Matrix
     * 
     * @export
     * @class Matrix
     */
    export class Matrix {

        //------------------------------
        // Members
        //------------------------------

        public a: number = 1;
        public b: number = 0;
        public c: number = 0;
        public d: number = 1;
        public e: number = 0; //X
        public f: number = 0; //Y


        /**
         * Creates an instance of Matrix.
         * 
         * @memberOf Matrix
         */
        constructor() {

        }



        /****************************
        * Methods
        ****************************/
        public static fromSVGMatrix(svgMatrix: any): Matrix {
            return new Matrix().multiply(svgMatrix);
        };
        //______________________________________________________

        public static fromDOMMatrix(domMatrix: any): Matrix {
            return new Matrix().multiply(domMatrix);
        };
        //______________________________________________________

        public flipX(): Matrix {
           return(this.transform(-1, 0, 0, 1, 0, 0));
        };
        //______________________________________________________

        public flipY(): Matrix {
            return (this.transform(1, 0, 0, -1, 0, 0));
        };
        //______________________________________________________

        public applyToPoint(x, y): Point {
            let aPoint = new Point();
            aPoint.x = x * this.a + y * this.c + this.e;
            aPoint.y = x * this.b + y * this.d + this.f;

            return (aPoint);
        };
        //______________________________________________________

        public reflectVector(x, y): Point {
            var v = this.applyToPoint(0, 1),
                d = (v.x * x + v.y * y) * 2;

            x -= d * v.x;
            y -= d * v.y;

            return (new Point(x, y));
        };
        //______________________________________________________

        public determinant(): number {
            return (this.a * this.d - this.b * this.c);
        };
        //______________________________________________________

        public indent(): Matrix {
            return (this.setTransform(1, 0, 0, 1, 0, 0))
        };

        //______________________________________________________
        /**
         * Rotate the matrix
         * 
         * @param {any} pAngle -rotation angle
         * @returns {Matrix} -rotated matrix
         * 
         * @memberOf Matrix
         */
        public rotate(pAngle): Matrix {
            var cos = Math.cos(pAngle),
                sin = Math.sin(pAngle);
            return this.transform(cos, sin, -sin, cos, 0, 0)
        };

        //____________________________________________________

        /**
         * Divide the matrix by a scalar
         * 
         * @param {number} pScalar - scalar
         * 
         * @memberOf Matrix
         */
        public divideScalar(pScalar:number) {
   
            this.a /= pScalar;
            this.b /= pScalar;
            this.c /= pScalar;
            this.d /= pScalar;
            this.e /= pScalar;
            this.f /= pScalar;

        };
        //____________________________________________________

        public setTransform(pA, pB, pC, pD, pE, pF): Matrix {

            this.a = pA;
            this.b = pB;
            this.c = pC;
            this.d = pD;
            this.e = pE;
            this.f = pF;

            return this;

        };
        //____________________________________________________

        public transform(pA, pB, pC, pD, pE, pF): Matrix {
           
            let a1 = this.a;
            let b1 = this.b;
            let c1 = this.c;
            let d1 = this.d;
            let e1 = this.e;
            let f1 = this.f;


            this.a = a1 * pA + c1 * pB;
            this.b = b1 * pA + d1 * pB;
            this.c = a1 * pC + c1 * pD;
            this.d = b1 * pC + d1 * pD;
            this.e = a1 * pE + c1 * pF + e1;
            this.f = b1 * pE + d1 * pF + f1;

            return this;

        };
        //____________________________________________________
        /**
         * Multiply the matrix with another matrix
         * 
         * @param {Matrix} pMatrix -matrix to multiply with
         * @returns {Matrix} -multplied matrix
         * 
         * @memberOf Matrix
         */
        public multiply(pMatrix: Matrix): Matrix {
            return (this.transform(pMatrix.a, pMatrix.b, pMatrix.c, pMatrix.d, pMatrix.e, pMatrix.f))
        }
        //____________________________________________________

        /**
         * Inverse the matrix
         * 
         * @returns {Matrix} -inversed matrix
         * 
         * @memberOf Matrix
         */
        public inverse(): Matrix {
            let aRet: Matrix = new Matrix();
            let dt = this.determinant();

            if (this.q(dt, 0)) {
                throw "Matrix not invertible.";
            }

            aRet.a = this.d / dt;
            aRet.b = -this.b / dt;
            aRet.c = -this.c / dt;
            aRet.d = this.a / dt;
            aRet.e = (this.c * this.f - this.d * this.e) / dt;
            aRet.f = -(this.a * this.f - this.b * this.e) / dt;

            return aRet

        };
        //____________________________________________________

        /**
         * Interpolates two matrix with a given value
         * 
         * @param {Matrix} pMatrix -matrix to interpolate with
         * @param {any} pT 
         * @returns {Matrix} -interpolated matrix
         * 
         * @memberOf Matrix
         */
        public interpolate(pMatrix: Matrix, pT): Matrix {
            var aRet: Matrix = new Matrix();
            aRet.a = this.a + (pMatrix.a - this.a) * pT;
            aRet.b = this.b + (pMatrix.b - this.b) * pT;
            aRet.c = this.c + (pMatrix.c - this.c) * pT;
            aRet.d = this.d + (pMatrix.d - this.d) * pT;
            aRet.e = this.e + (pMatrix.e - this.e) * pT;
            aRet.f = this.f + (pMatrix.f - this.f) * pT;

            return aRet;
        };
        //____________________________________________________


        private q(p1, p2): boolean {
            return (Math.abs(p1 - p2) < 1e-14);
        }

        /****************************
        * Getters and Setters
        ****************************/


        public static get myName(): string {
            return "Matrix";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Matrix";
        }
        //______________________________________________


    }
}