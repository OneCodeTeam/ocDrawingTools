module asSvg {
    /**
     * Represents a Foreign Object
     * 
     * @export
     * @class ForeignObject
     * @extends {DisplayObject}
     *@module asSvg
     */
    export class ForeignObject extends DisplayObject{
        private mTextField: asSvg.TextField;
        public mInputElement: HTMLInputElement;
        private mOldValue: string="";
        /**
         * Creates an instance of ForeignObject.
         * 
         * @memberOf ForeignObject
         */
        constructor() {
            super();
        }
         /****************************
        * Override methods
        ****************************/
        protected createElement() {
            super.createElement();
            this.create("foreignObject");
        }
        /**
         * Sets the height
         * 
         * @param {number} pHeight 
         * 
         * @memberOf ForeignObject
         */
        public setHeight(pHeight: number) {
            this.mElement.setAttribute("height", pHeight.toString());
        }
        //________________________________________________________________

        /**
         * Sets the width
         * 
         * @param {number} pWidth 
         * 
         * @memberOf ForeignObject
         */
        public setWidth(pWidth: number) {
            this.mElement.setAttribute("width", pWidth.toString());
        }
        //______________________
        public get textField() {
            return this.mTextField
        }
        //________________________
        public set textField(pTextField) {
            this.mTextField = pTextField;
        }
        //______________________________
        public set fontSize(pFont: number) {
            //  this.mFontSize = pFont;
            this.mInputElement.setAttribute("font-size", pFont.toString());
        }
        //_____________________
        public clone(): ForeignObject {
            let aRet: ForeignObject = new ForeignObject();
            aRet.mElement = this.mElement.cloneNode() as Element
            aRet.mInputElement = this.mInputElement.cloneNode() as HTMLInputElement;
            aRet.textField = this.mTextField.clone() as asSvg.TextField;
            aRet.x = this.x;
            aRet.y = this.y;
            aRet.rotation = this.rotation;
            aRet.scaleX = this.scaleX;
            aRet.scaleY = this.scaleY;
            return aRet;
        }
        //________________________
        public get oldValue() {
            return this.mOldValue;
        }
        //_______________________
        public set oldValue(pVal) {
            this.mOldValue = pVal;
        }
    }
}
