module action {
    /**
     * Class repsenting an action -when the user changes a shape's color
     * 
     * @export
     * @class ColorAction
     * @implements {IAction}
     */
    export class ColorAction implements IAction {
        private mNewColor;
        private mOldColor;
        private mObject: shapes.Shape;
        /**
         * Creates an instance of ColorAction.
         * @param {any} pOldColor- -Color before change 
         * @param {any} pNewColor -Color after change
         * @param {any} pObject -Object whose color was changes
         * 
         * @memberOf ColorAction
         */
        constructor(pOldColor, pNewColor, pObject) {
            this.mOldColor = pOldColor;
            this.mNewColor = pNewColor;
            this.mObject = pObject;
        }
        //__________________________________________
        public redo() {
            this.mObject.changeShapeColor(this.mNewColor);
                
        }
        //___________________________________________
        public undo() {
          
            this.mObject.changeShapeColor(this.mOldColor);
        }
    }
}