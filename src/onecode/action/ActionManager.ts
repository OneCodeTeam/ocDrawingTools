module action {

    /**
     * Class that implements a redo/unod flow
     * 
     * @export
     * @class ActionManager
     */
    export class ActionManager {
        private mUndoArray: Array<IAction>;
        private mRedoArray: Array<IAction>;

        /**
         * Creates an instance of ActionManager.
         * 
         * @memberOf ActionManager
         */
        constructor() {
            this.mUndoArray = new Array<IAction>();
        }
        //_______________________________________________
        /**
         * Redos the last user action undone
         * 
         * 
         * @memberOf ActionManager
         */
        public redo() :void{
            if (this.mRedoArray.length > 0) {
                let action = this.mRedoArray.pop();
                action.redo();
                this.mUndoArray.push(action);
            }
        }
        //______________________________________
        /**
         * Undos the last user action
         * 
         * 
         * @memberOf ActionManager
         */
        public undo():void{
            if (this.mUndoArray.length > 0) {
                let action = this.mUndoArray.pop();
                action.undo();
                this.mRedoArray.push(action);
            }
        }
        //_____________________________
        /**
         * Adds a user action
         * 
         * @param {IAction} pAction -User Action to add
         * 
         * @memberOf ActionManager
         */
        public addAction(pAction: IAction) :void{
            this.mRedoArray = new Array<IAction>();
            this.mUndoArray.push(pAction);

            
        }
    }
}