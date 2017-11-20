module action{
    /**
     * Class representing a rotate sprite action
     * 
     * @export
     * @class RotateAction
     * @implements {IAction}
     */
    export class RotateAction implements IAction {
        private mOldAngle: number;
        private mNewAngle: number;
        private mRotationFunc: Function;
        /**
         * Creates an instance of RotateAction.
         * @param {any} pOldAngle -Angle of sprite before rotation
         * @param {any} pNewAngle -Angle of sprite after rotation
         * @param {Function} pRotationCallBack -Function to rotate sprite
         * 
         * @memberOf RotateAction
         */
        constructor(pOldAngle, pNewAngle, pRotationCallBack: Function) {
            this.mOldAngle = pOldAngle;
            this.mNewAngle = pNewAngle;
            this.mRotationFunc = pRotationCallBack;
        }
        //______________________________________________
        public undo() {
            this.mRotationFunc(this.mOldAngle);
        }
        //______________________________________________
        public redo() {
            this.mRotationFunc(this.mNewAngle);
        }
    }
}