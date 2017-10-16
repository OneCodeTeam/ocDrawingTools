module asSvg {
    /**
     * Represents a class with a SVGImageElement
     * 
     * @export
     * @class Image
     * @extends {DisplayObject}
     */
    export class Image extends DisplayObject {

        //------------------------------
        // Members
        //------------------------------
        private mOnLoadCallback: Function;
        private mPath: string;
        private mSVG: SVGElement;
        private mHttpRequest: XMLHttpRequest;

        /**
         * Creates an instance of Image.
         * @param {string} pPath 
         * @param {Function} [pFunction] 
         * 
         * @memberOf Image
         */
        constructor(pPath: string, pFunction?: Function) {
            console.log("pPath = " + pPath);
            super();
            this.mOnLoadCallback = pFunction;
            this.mPath = pPath;
            if (pPath == null) {
                return;
            }
            (this.mElement as SVGImageElement).onload = () => this.onLoad();
            this.setPath(pPath);
           
        }


        /****************************
        * Override methods
        ****************************/
        protected createElement() {
            this.create("image");
        };


        //_____________________________________________________________

        public set alpha(pVal: number) {
            this.mElement.setAttribute("opacity", pVal.toString());
            this.mAlpha = pVal;
        }

        public get alpha(): number {
            return (this.mAlpha);
        }

        /****************************
        * Methods
        ****************************/
        //________________________________________________________________

        /**
         * Sets an attibute of the element
         * 
         * @param {string} pKey 
         * @param {string} pVal 
         * 
         * @memberOf Image
         */
        public setAttribute(pKey:string, pVal:string) {
            this.mElement.setAttribute(pKey, pVal);
        }

        //________________________________________________________________

        /**
         * Sets the height of the object's element
         * 
         * @param {number} pHeight 
         * 
         * @memberOf Image
         */
        public setHeight(pHeight: number) {
            this.mElement.setAttribute("height", pHeight.toString());
        }
        //________________________________________________________________

        /**
         * Sets the width of the object's element
         * 
         * @param {number} pWidth 
         * 
         * @memberOf Image
         */
        public setWidth(pWidth: number) {
            this.mElement.setAttribute("width", pWidth.toString());
        }
        //_____________________________________________________________________________

        /**
         * Sets the source of the image
         * 
         * @param {string} pPath 
         * 
         * @memberOf Image
         */
        public setPath(pPath: string) {
            this.mElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', pPath);
        }
        //______________________________________________________________________________
        /**
         * CallBack for when the image has loaded
         * 
         * @protected
         * 
         * @memberOf Image
         */
        protected onLoad() {

            this.mOnLoadCallback();
        }

        
        /**
         * Sets the x  of the object's element
         * 
         * 
         * @memberOf Image
         */
        public set x(pVal: number) {
            this.mX = pVal;
            this.updateTransform();
            this.updatePositionX();
        }
        /**
         * Sets the y of the object's element
         * 
         * 
         * @memberOf Image
         */
        public set y(pVal: number) {
            this.mY = pVal;
             this.updateTransform();
            this.updatePositionX();
        }

        /****************************
        * Getters and Setters
        ****************************/


        public static get myName(): string {
            return "Image";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Image";
        }
        //______________________________________________
    }
}