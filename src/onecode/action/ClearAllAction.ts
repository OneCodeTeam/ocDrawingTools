module action{
    /**
     * Class reprseting a clear all shapes and text action
     * 
     * @export
     * @class ClearAllAction
     * @implements {IAction}
     */
    export class ClearAllAction implements IAction {
        private mShapes: Array<shapes.Shape>;
        private mTextFields: Array<asSvg.ForeignObject>;
        private mRedoCallBack: Function;
        private mSprite: asSvg.Sprite;
        /**
         * Creates an instance of ClearAllAction.
         * @param {any} pSprite -SVG sprite that the shapes were cleared from
         * 
         * @memberOf ClearAllAction
         */
        constructor(pSprite) {
            this.mShapes = new Array<shapes.Shape>();
            this.mTextFields = new Array<asSvg.ForeignObject>();

            for (let i = 0; i < image.Globals.mCircles.length; i++) {
                this.mShapes.push(image.Globals.mCircles[i].clone());
            }
            for (let i = 0; i < image.Globals.mTextArray.length; i++) {
                this.mTextFields.push(image.Globals.mTextArray[i].clone() as asSvg.ForeignObject);
            }

            
            this.mSprite = pSprite;
        }
        //__________________________________
        public redo() {
            this.mSprite.removeChildren();
            image.Globals.mCircles = new Array<shapes.Shape>();
            image.Globals.mTextArray = new Array<asSvg.ForeignObject>();
        }
        //_________________________________
        public undo() {
            image.Globals.mCircles = this.mShapes;
            image.Globals.mTextArray = this.mTextFields;

            for (let i = 0; i < image.Globals.mCircles.length; i++)
            {
                image.Globals.mCircles[i].addToSprite(this.mSprite);
            }
            for (let i = 0; i < image.Globals.mTextArray.length; i++) {
                this.mSprite .addChild(image.Globals.mTextArray[i]);
            }

        }
    }
}