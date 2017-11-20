module action {
    /**
     * Class representing an action that the user changed the text onject's input
     * 
     * @export
     * @class editTextAction
     * @implements {IAction}
     */
    export class editTextAction implements IAction {
        private mTextField: asSvg.ForeignObject;
        private mOldValue: string;
        private mNewValue: string;
        private mIsAdded: boolean = false;
        /**
         * Creates an instance of editTextAction.
         * @param {asSvg.ForeignObject} pTextField -Text Object whose value was changed
         * @param {string} pOldValue -Value of text object before its value was changed
         * 
         * @memberOf editTextAction
         */
        constructor(pTextField: asSvg.ForeignObject, pOldValue: string) {
            this.mTextField = pTextField;
            this.mOldValue = pOldValue;
            
        }
        //___________________________
        public redo() {
            this.mTextField.mInputElement.value = this.mNewValue;
        }
        //_______________________
        public undo() {
            this.mTextField.mInputElement.value = this.mOldValue;
        }
        //______________________________
        /**
         * @param {string} pNewValue-value of text after change
         * 
         * 
         * @memberOf editTextAction
         */
        public set newValue(pNewValue)
        {
            this.mNewValue = pNewValue;
            this.mIsAdded = true;

        }
        //__________________
        public get isAdded() {
            return this.mIsAdded;
        }
    }
}