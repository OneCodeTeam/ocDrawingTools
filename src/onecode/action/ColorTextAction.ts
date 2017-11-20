module action {
    /**
     * Class repsenting an action- when the user changes the color of a text
     * 
     * @export
     * @class ColorTextAction
     * @implements {IAction}
     */
    export class ColorTextAction implements IAction {
        private mOldColor;
        private mNewColor;
        private mTextField: asSvg.ForeignObject;
        /**
         * Creates an instance of ColorTextAction.
         * @param {asSvg.ForeignObject} pTextField -Text Object whose color was  changed
         * @param {any} pOlDColor -color before change
         * @param {any} pNewColor -color after change
         * 
         * @memberOf ColorTextAction
         */
        constructor(pTextField: asSvg.ForeignObject, pOlDColor, pNewColor) {
            this.mTextField = pTextField;
            this.mOldColor = pOlDColor;
            this.mNewColor = pNewColor;
        }
        //____________________________
        public redo() {
            this.mTextField.mInputElement.style.color = this.mNewColor;
        }
        //______________________
        public undo() {
            this.mTextField.mInputElement.style.color = this.mOldColor;
        }

    }
}