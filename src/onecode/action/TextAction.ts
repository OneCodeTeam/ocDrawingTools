module action {
    export class TextAction implements IAction {
        private mTextField: asSvg.ForeignObject;
        private mSprite: asSvg.Sprite;
        /**
         * Creates an instance of TextAction.
         * @param {asSvg.Sprite} pDrawPanel -Sprite text was added to
         * @param {asSvg.ForeignObject} pTextField -Text object added
         * 
         * @memberOf TextAction
         */
        constructor(pDrawPanel: asSvg.Sprite, pTextField: asSvg.ForeignObject) {
            this.mSprite = pDrawPanel;
            this.mTextField = pTextField;
        }
        //___________________________________
        public redo() {
            image.Globals.mTextArray.push(this.mTextField);
            this.mSprite.addChild(this.mTextField);
        }
        //________________________________________
        public undo() {
            image.Globals.mTextArray.splice(image.Globals.mTextArray.indexOf(this.mTextField, 1));
            this.mTextField.destruct();
        }
    }
}