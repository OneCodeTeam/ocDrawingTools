module action {
    /**
     * Class representing a drag shape user action
     * 
     * @export
     * @class DragShapeAction
     * @implements {IAction}
     */
    export class DragShapeAction implements IAction {
        private mOldPosition: Array<asBase.math.Point>;
        private mNewPosition: Array<asBase.math.Point>;
        private mIsAdded: boolean = false;
        private mShape: shapes.Shape;

        /**
         * Creates an instance of DragShapeAction.
         * @param {any} pOldPosition -Old posiiton of shape
         * @param {shapes.Shape} pShape -Shape whose position was changed
         * 
         * @memberOf DragShapeAction
         */
    
        constructor(pOldPosition, pShape: shapes.Shape) {
            this.mOldPosition = pOldPosition;
            this.mShape = pShape;

        }
        //________________________________________
        public redo() {
            this.mShape.moveShape(this.mNewPosition);
        }
        //_________________________________________
        public undo() {
            this.mShape.moveShape(this.mOldPosition);
        }
        //_________________________________________
        public set newPosition(pNewPosition)
        {
            this.mNewPosition = pNewPosition;
            this.mIsAdded;
        }
        //__________________________________________
        public get isAdded() {
            return this.mIsAdded;

        }
        //______________________________________________
    }
}