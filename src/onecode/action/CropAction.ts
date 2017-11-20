module action {
    /**
     * Class representing a crop image action by the user
     * 
     * @export
     * @class CropAction
     */
    export class CropAction {
        private mOldSrc: string;
        private mNewSrc: string;
        private mCropCallBack: Function;
        private mDrawObjects: Array<shapes.Shape>;
        private mTextObjects: Array<asSvg.ForeignObject>;
        private mDrawPanel: asSvg.Sprite;
        private mAngle: number;
        private mOldX: number;
        private mOldY: number;
        private mOldAngle: number;
        private mOldScale: number;
        /**
         * Creates an instance of CropAction.
         * @param {string} pOldSrc -Image Source before crop
         * @param {string} pNewSrc -Image Source after crop
         * @param {Function} pCropCallBack - Callback to re/undo crop
         * @param {number} [pAngle=0] -Angle of image after crop
         * @param {number} [pOldAngle=0] -Angle of image before crop
         * @param {number} [pOldScale=1] -Scale of image before crop
         * @param {number} [pOldX=0] -X position of image before crop
         * @param {number} [pOldY=0] -Y position of image before crop
         * 
         * @memberOf CropAction
         */
        constructor(pOldSrc: string, pNewSrc: string, pCropCallBack: Function, pAngle: number = 0, pOldAngle = 0, pOldScale = 1, pOldX: number=0,pOldY:number=0) {
            this.mOldSrc = pOldSrc;
            this.mNewSrc = pNewSrc;
            this.mCropCallBack = pCropCallBack;
            this.mAngle = pAngle;
            this.mOldAngle = pOldAngle;
            this.mOldScale = pOldScale;
            this.mOldX = pOldX;
            this.mOldY = pOldY;

            this.mDrawObjects = new Array<shapes.Shape>();
            for (let i = 0; i < image.Globals.mCircles.length; i++) {
                this.mDrawObjects.push(image.Globals.mCircles[i].clone());
                if (!this.mDrawPanel) {
                    this.mDrawPanel = image.Globals.mCircles[0].parent;
                }
            }

            this.mTextObjects = new Array<asSvg.ForeignObject>();
           
            for (let i = 0; i < image.Globals.mTextArray.length; i++) {
                this.mTextObjects.push(image.Globals.mTextArray[i].clone() as asSvg.ForeignObject);
                if (!this.mDrawPanel) {
                    this.mDrawPanel = image.Globals.mTextArray[0].parent;
                }
            }
          
        }
        //____________________________________________
        public redo() {
            image.Globals.cropCounter++;
            this.mCropCallBack(this.mNewSrc, this.mAngle, 1,null);

        }
        //__________________________________________
        public undo() {
            image.Globals.cropCounter--;
            this.mCropCallBack(this.mOldSrc, this.mOldAngle, this.mOldScale, this.mDrawObjects, this.mTextObjects, this.mOldX, this.mOldY);
        }
        //_____________________________________________
       

    }
}