module action {
    /**
     * Class representing a draw shape user action
     * 
     * @export
     * @class DrawAction
     * @implements {IAction}
     */
    export class DrawAction implements IAction {
        private mDrawPanel: asSvg.Sprite;
        private mShape: shapes.Shape;
        /**
         * Creates an instance of DrawAction.
         * @param {asSvg.Sprite} pDrawPanel -Sprite that shape was drawn on
         * @param {shapes.Shape} pShape -Shape Object that was drawn
         * 
         * @memberOf DrawAction
         */
        constructor(pDrawPanel: asSvg.Sprite, pShape: shapes.Shape) {
            this.mDrawPanel = pDrawPanel;
            this.mShape = pShape;
            
        }
        //_______________________________________________
        public redo() {
            image.Globals.mCircles.push(this.mShape);
            this.mShape.addToSprite(this.mDrawPanel);
        }
        //__________________________________________
        public undo() {
            image.Globals.mCircles.splice(image.Globals.mCircles.indexOf(this.mShape, 1));
            this.mShape.deleteShape();
        }
    }
}