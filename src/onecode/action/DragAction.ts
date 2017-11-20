module action {
    /**
     * Class representing a drag sprite user action
     * 
     * @export
     * @class DragAction
     * @implements {IAction}
     */
    export class DragAction implements IAction {
        private mOldPosition: asBase.math.Point;
        private mNewPosition: asBase.math.Point;
        private mMovePanel: asSvg.Sprite;
        private mBoundaryCallBack: Function;
        private mIsAdded: boolean = false;
        /**
         * Creates an instance of DragAction.
         * @param {asBase.math.Point} pOldPostion -Old position of sprite
         * @param {asSvg.Sprite} pMovePanel -Sprite that was moved
         * @param {Function} pBoundaryCallBack -Callback to check boundaries
         * 
         * @memberOf DragAction
         */
        constructor(pOldPostion: asBase.math.Point, pMovePanel: asSvg.Sprite, pBoundaryCallBack: Function) {
            this.mOldPosition = pOldPostion;
            this.mMovePanel = pMovePanel;
            this.mBoundaryCallBack = pBoundaryCallBack;
        }
        //__________________________
        public redo() {
            this.mMovePanel.x = this.mNewPosition.x;
            this.mMovePanel.y = this.mNewPosition.y;
            this.mBoundaryCallBack();
        }
        //___________________________
        public undo() {
            this.mMovePanel.x = this.mOldPosition.x;
            this.mMovePanel.y = this.mOldPosition.y;
            this.mBoundaryCallBack();
        }
        //______________________________________________
        public set newPosition(pNewPosition) {
            this.mNewPosition = pNewPosition;
            this.mIsAdded = true;
        }
        //______________________________________________
        public get isAdded(): boolean{
            return this.mIsAdded;
        }
    }
}