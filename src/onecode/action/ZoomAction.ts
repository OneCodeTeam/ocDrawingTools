module action{
    /**
     * Class representing a zoom action
     * 
     * @export
     * @class ZoomAction
     * @implements {IAction}
     */
    export class ZoomAction implements IAction {
        private mOldScale: number;
        private mNewScale: number;
        private mScaleCallBack: Function
        /**
         * Creates an instance of ZoomAction.
         * @param {number} pOldScale -Scale before zoom
         * @param {number} pNewScale -Scale after zoom
         * @param {Function} pScaleCallBack -Callback that re/undos the zoom
         * 
         * @memberOf ZoomAction
         */
        constructor(pOldScale: number, pNewScale: number, pScaleCallBack: Function) {
            this.mOldScale = pOldScale;
            this.mNewScale = pNewScale;
            this.mScaleCallBack = pScaleCallBack;
        }
        //____________________________
        public redo() {
            this.mScaleCallBack(this.mNewScale);
        }
        //____________________________
        public undo() {
            this.mScaleCallBack(this.mOldScale);
        }
        //_____________________________
        public set scale(pVal) {
            this.mNewScale += pVal;
            this.mOldScale -= pVal;
        }
    }
}