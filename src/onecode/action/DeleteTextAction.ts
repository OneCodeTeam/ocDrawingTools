module action {
    /**
     * Class representing a delete text action
     * 
     * @export
     * @class DeleteTextAction
     * @implements {IAction}
     */
    export class DeleteTextAction implements IAction {
        private mTextField: asSvg.ForeignObject;
        private mSprite: asSvg.Sprite;
        /**
         * Creates an instance of DeleteTextAction.
         * @param {asSvg.ForeignObject} pTextField -Text object deleted
         * 
         * @memberOf DeleteTextAction
         */
        constructor(pTextField: asSvg.ForeignObject) {
            this.mSprite = pTextField.parent;
            this.mTextField = pTextField;
        }
        //_____________________________
        public redo() {
            image.Globals.mTextArray.splice(image.Globals.mTextArray.indexOf(this.mTextField, 1));
            this.mTextField.destruct();
        }
        //_______________________
        public undo() {
            image.Globals.mTextArray.push(this.mTextField);
            this.mSprite.addChild(this.mTextField);
        }
    }
}