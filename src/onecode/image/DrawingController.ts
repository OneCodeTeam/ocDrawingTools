module image{
    /**
     * Class that controls each drawing item(text/shape)
     * 
     * @export
     * @class DrawingController
     */
    export class DrawingController{
        private mCurrentText: asSvg.ForeignObject;
        private mCurrentShape: shapes.Shape;
        private mTimeOut;
        private mLastGoodTextX;
        private mLastGoodTextY;
        /**
         * Creates an instance of DrawingController.
         * 
         * @memberOf DrawingController
         */
        constructor() {
            document.getElementById("deleteButton").addEventListener("click", () => this.deleteShape());
            document.getElementById("editColor").addEventListener("input", () => this.changeShapeColor());
            document.getElementById("closeButton").addEventListener("click", () => this.onDeselectShape());
            document.getElementById("deleteTextButton").addEventListener("click", () => this.deleteText());
            document.getElementById("closeTextButton").addEventListener("click", () => this.onDeselectText());
            document.getElementById("editTextColor").addEventListener("input", () => this.changeTextColor());

            
        }
        //_________________________________________
     
        private deleteShape(): void {
            let aAction = new action.DeleteAction(this.mCurrentShape);
             Globals.ActionManager.addAction(aAction);

            this.mCurrentShape.deleteShape();
            let aIndex = Globals.mCircles.indexOf(this.mCurrentShape);
            Globals.mCircles.splice(aIndex, 1);
            this.onDeselectShape();

            
        }
 
        //_________________________________________
        
        private deleteText(): void{
            let aAction = new action.DeleteTextAction(this.mCurrentText)
            Globals.ActionManager.addAction(aAction);

            this.mCurrentText.destruct();
            
            let aIndex = Globals.mTextArray.indexOf(this.mCurrentText)
            Globals.mTextArray.splice(aIndex, 1);
            this.onDeselectText();
        }
        //_______________________________________
        private changeShapeColor(): void {
            var aColor = (document.getElementById("editColor") as HTMLInputElement).value;
            let aAction = new action.ColorAction(this.mCurrentShape.color, aColor, this.mCurrentShape);
           Globals.ActionManager.addAction(aAction);
            this.mCurrentShape.changeShapeColor(aColor);
            


        }
        //_________________________________________
        private changeTextColor() {
            var aColor = (document.getElementById("editTextColor") as HTMLInputElement).value;
            let aAction = new action.ColorTextAction(this.mCurrentText, this.mCurrentText.mInputElement.style.color, aColor);
            Globals.ActionManager.addAction(aAction);
            this.mCurrentText.mInputElement.style.color= aColor;
        }
            
        //________________________________________
        /**
         * 
         * 
         * @param {asSvg.Shape} pShape 
         * 
         * @memberOf DrawingController
         */
        //_______________________________
        public onSelectShape(pShape: shapes.Shape) {
            this.mCurrentShape = pShape;
            document.getElementById("editShapeToolBar").style.display = "block";
            document.getElementById("imageTools").style.display = "none";
            this.mCurrentShape.addMouseEvents((pEvent) => this.onMouseDownShape(pEvent));
            $(window).bind("mouseup", (event) => this.onMouseUpShape(event));
        }
        //___________________________________
        /**
         * 
         * 
         * @param {asSvg.ForeignObject} pText -Text Selected
         * 
         * @memberOf DrawingController
         */
        public onSelectText(pText: asSvg.ForeignObject) {
           
            this.mCurrentText = pText;
            document.getElementById("editTextToolBar").style.display = "block";
            this.mCurrentText.mInputElement.style.outline = "dashed black";
            document.getElementById("imageTools").style.display = "none";
            (this.mCurrentText.element as HTMLInputElement).onmousedown = (pEvent: MouseEvent) => this.onMouseDownText(pEvent);
            window.addEventListener("mouseup", () => this.onMouseUpText());
           // $(this.mCurrentText.mInputElement).on("focusout",()=> this.onDeselectText());
        }
        
        //______________________________________
        private onDeselectShape() {
            document.getElementById("editShapeToolBar").style.display = "none";
            document.getElementById("imageTools").style.display = "block";
            this.mCurrentShape.onDeselect();
            this.mCurrentShape.removeMouseEvents();
            this.mCurrentShape = null;  
            $(window).unbind("mouseup", (event) => this.onMouseUpShape(event));    
        }
        //________________________________________

        private onDeselectText() {
        
            Globals.isItemSelected = false;
            this.mLastGoodTextX = null;
            this.mLastGoodTextY = null;
            this.mCurrentText.mInputElement.style.outline = "none";
            document.getElementById("editTextToolBar").style.display = "none";
            document.getElementById("imageTools").style.display = "block";
            this.mCurrentText.stopDrag();
            (this.mCurrentText.element as HTMLElement).onmousedown = null;
            window.removeEventListener("mouseup", () => this.onMouseUpText());
           
        }

        //__________________________________
        private onMouseDownText(pEvent: MouseEvent) {
            Globals.isSelectDragMode = true;
            let aPoint = new asBase.math.Point(this.mCurrentText.x, this.mCurrentText.y);
            Globals.currentTextDragAction = new action.DragTextAction(this.mCurrentText, aPoint);
            this.mCurrentText.startDrag(false, () => this.setTextInBound(pEvent));

        }
        //_________________________________________
        private onMouseDownShape(pEvent:MouseEvent) {
            pEvent.preventDefault();
            pEvent.stopPropagation();
            Globals.isSelectDragMode = true;
            if (this.mCurrentShape) {
                this.mCurrentShape.startDrag();
            }
        }
       
        //_______________________________________
        private onMouseUpText() {
            Globals.isSelectDragMode = false;
            this.mCurrentText.stopDrag();
            let aPoint = new asBase.math.Point(this.mCurrentText.x, this.mCurrentText.y);
            if (Globals.currentTextDragAction && !Globals.currentTextDragAction.isAdded)
            {
                Globals.currentTextDragAction.newPosition = aPoint;
                Globals.ActionManager.addAction(Globals.currentTextDragAction);
            }

        }
        //__________________________________________
        private onMouseUpShape(pEvent) {

            if (this.mCurrentShape) {
                this.mCurrentShape.stopDrag();
            }
            Globals.isSelectDragMode = false;
        }
        //______________________________________________
        private setTextInBound(pMouseEvent: MouseEvent) {
            Globals.ImageDrawing.mDrawPanel.stage.onMouseMove(pMouseEvent);
            let image = document.getElementById("image");
            let aImageRect = image.getBoundingClientRect();
            let aTextRect = this.mCurrentText.mInputElement.getBoundingClientRect();
           
            if ((aTextRect.left < aImageRect.left || aTextRect.right > aImageRect.right) && Globals.isDrawInBound) {
                console.log("text drag x out of bounds");
                this.mLastGoodTextX = this.mCurrentText.x;
             
            }
            else {
                this.mLastGoodTextX = this.mCurrentText.x;
              
            }
            if ((aTextRect.top < aImageRect.top || aTextRect.bottom > aImageRect.bottom) && Globals.isDrawInBound) {
                console.log("text drag y out of bounds");
                this.mLastGoodTextY = this.mCurrentText.y;
            }
            else {
                this.mLastGoodTextY = this.mCurrentText.y;

            }

        }

    }
}