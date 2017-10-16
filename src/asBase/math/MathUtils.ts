module asBase.math {
    export class MathUtils {

        static RAD_TO_DEG = 180 / Math.PI
        static DEG_TO_RAD = Math.PI / 180;


        /**
         * Interpolate two points by a given measurement
         * 
         * @static
         * @param {asBase.math.Point} pP1 
         * @param {asBase.math.Point} pP2 
         * @param {number} pVal 
         * @returns {Point} -interpolated point
         * 
         * @memberOf MathUtils
         */
        static interpolate(pP1: asBase.math.Point, pP2: asBase.math.Point, pVal: number):Point {
            var aDx = (pP2.x - pP1.x) * pVal;
            var aDy = (pP2.y - pP1.y) * pVal;
            return (new asBase.math.Point(pP1.x + aDx, pP1.y + aDy))

        }
        //_____________________________________________________________________

        /**
         * Caculates the distance between 2 points
         * 
         * @static
         * @param {asBase.math.Point} pP1 -point 1
         * @param {asBase.math.Point} pP2 -point 2
         * @returns {number} -caculated distance
         * 
         * @memberOf MathUtils
         */
        static distance(pP1: asBase.math.Point, pP2: asBase.math.Point): number {
            var aDx = (pP1.x - pP2.x);
            var aDy = (pP1.y - pP2.y);
            return (Math.sqrt((aDx * aDx) + (aDy * aDy)));

        }
        //_____________________________________________________________________

        /**
         * Rotates a 2D point
         * 
         * @static
         * @param {asBase.math.Point} pPoint -point to rotate
         * @param {number} pAngle -rotation angle
         * @returns {Point} -rotated point
         * 
         * @memberOf MathUtils
         */
        public static rotatePoint(pPoint: asBase.math.Point, pAngle: number): Point {
            var aRadAngle: number = pAngle * MathUtils.DEG_TO_RAD;
            var aX: number = pPoint.x * Math.cos(aRadAngle) - pPoint.y * Math.sin(aRadAngle);
            var aY: number = pPoint.x * Math.sin(aRadAngle) + pPoint.y * Math.cos(aRadAngle);
            return (new asBase.math.Point(aX, aY));
        }
        //_____________________________________________________________________

        /**
         * Checks if two rectangles are overlapping
         * 
         * @static
         * @param {ClientRect} pRect1 
         * @param {ClientRect} pRect2 
         * @returns {boolean} 
         * 
         * @memberOf MathUtils
         */
        public static isRectOverlap(pRect1: ClientRect, pRect2: ClientRect): boolean {
            return !(pRect2.left > pRect1.right ||
                pRect2.right < pRect1.left ||
                pRect2.top > pRect1.bottom ||
                pRect2.bottom < pRect1.top);
        }
        //_____________________________________________________________________

        /**
         * Combines two rectangles together
         * 
         * @static
         * @param {ClientRect} pBaseRect -Base rectangle
         * @param {ClientRect} pWithRect -rectangle to add to base rectangle
         * @returns {ClientRect} -combined rectangle
         * 
         * @memberOf MathUtils
         */
        public static combineRectToBaseRect(pBaseRect: ClientRect, pWithRect: ClientRect): ClientRect {
                pBaseRect.left = Math.min(pBaseRect.left, pWithRect.left);
                pBaseRect.right = Math.max(pBaseRect.right, pWithRect.right);
                pBaseRect.top = Math.min(pBaseRect.top, pWithRect.top);
                pBaseRect.bottom = Math.max(pBaseRect.bottom, pWithRect.bottom); 
            
            return pBaseRect;
        }



    }
}