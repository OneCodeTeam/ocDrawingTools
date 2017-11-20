module action {
    /**
     * Class representing a delete shape action
     * 
     * @export
     * @class DeleteAction
     * @implements {IAction}
     */
    export class DeleteAction implements IAction
    {
        private mObject;
        private mParent: asSvg.DisplayObject;
        /**
         * Creates an instance of DeleteAction.
         * @param {shapes.Shape} pObject -Shape dleted
         * 
         * @memberOf DeleteAction
         */
        constructor(pObject: shapes.Shape) {
            this.mObject = pObject;
            this.mParent = pObject.parent;
        }
        //____________________________________________
        public redo() {
          
            if (this.mObject.myClassName == "Arrow"||"Circle"||"Shape"||"Scribble") {
                this.mObject.deleteShape();
                let aIndex = image.Globals.mCircles.indexOf(this.mObject);
                image.Globals.mCircles.splice(aIndex, 1);
                
            }
            else {
                this.mObject.destruct();
                let aIndex = image.Globals.mTextArray.indexOf(this.mObject as asSvg.ForeignObject);
                image.Globals.mTextArray.splice(aIndex, 1);
                
            }
           
        }
        //_________________________________________________
        public undo() {
            
            if (this.mObject.myClassName == "Shape") {
                image.Globals.mCircles.push(this.mObject);
                this.mObject.addToSprite(this.mParent);
          
            }
            else {
                image.Globals.mTextArray.push(this.mObject as asSvg.ForeignObject);
                (this.mParent as asSvg.Sprite).addChild(this.mObject);
                
            }
        }
    }
}