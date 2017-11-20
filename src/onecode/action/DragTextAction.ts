module action {
    /**
     * Class representing a drag text user action
     * 
     * @export
     * @class DragTextAction
     * @implements {IAction}
     */
    export class DragTextAction implements IAction{
        private mTextField: asSvg.ForeignObject;
        private mOldPosition: asBase.math.Point;
        private mNewPosition: asBase.math.Point;
        private mIsAdded: boolean = false;
        /**
         * Creates an instance of DragTextAction.
         * @param {asSvg.ForeignObject} pTextField -Text Object whose position was changed
         * @param {asBase.math.Point} pOldPosition -Old position of text object
         * 
         * @memberOf DragTextAction
         */
        constructor(pTextField: asSvg.ForeignObject, pOldPosition: asBase.math.Point) {
            this.mTextField = pTextField;
            this.mOldPosition = pOldPosition;
        }
        //______________________________
        
        public redo() {
            this.mTextField.x = this.mNewPosition.x;
            this.mTextField.y = this.mNewPosition.y;
        }
        //__________________
        public undo() {
            this.mTextField.x = this.mOldPosition.x;
            this.mTextField.y = this.mOldPosition.y;

        }
        //_______________________
        public set newPosition(pNewPosition) {
            this.mNewPosition = pNewPosition;
            this.mIsAdded = true;
        }
        //________________________
        public get isAdded() {
            return this.mIsAdded;
        }

    }
}