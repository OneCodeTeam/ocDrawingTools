module image{
    /**
     * Class that controls each drawing item(text/scribble)
     * 
     * @export
     * @class DrawingController
     */
    export class DrawingController{
        private mCurrentShape: asSvg.Shape;
        private mCurrentText: asSvg.ForeignObject;
        private mTimeOut;
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
     
        private deleteShape():void {
            this.mCurrentShape.destruct();
            let aIndex = Globals.mDrawingShapes.indexOf(this.mCurrentShape)
            Globals.mDrawingShapes.splice(aIndex, 1);
            this.onDeselectShape();
        }
        //_________________________________________
        
        private deleteText() :void{
            this.mCurrentText.destruct();
            let aIndex = Globals.mTextArray.indexOf(this.mCurrentText)
            Globals.mTextArray.splice(aIndex, 1);
            this.onDeselectText();
        }
        //_______________________________________
        private changeShapeColor():void {
            var aColor = (document.getElementById("editColor") as HTMLInputElement).value;
            this.mCurrentShape.element.setAttribute("stroke", aColor);
        }
        //_________________________________________
        private changeTextColor() {
            var aColor = (document.getElementById("editTextColor") as HTMLInputElement).value;
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
        public onSelectShape(pShape:asSvg.Shape) {
            this.mCurrentShape = pShape;
            (this.mCurrentShape.element as HTMLInputElement).onmousedown = (pEvent: MouseEvent) => this.onMouseDownShape(pEvent);
            window.addEventListener("mouseup", () => this.onMouseUpShape());
            document.getElementById("editShapeToolBar").style.display = "block";
            document.getElementById("imageTools").style.display = "none";
        }
        //___________________________________
        /**
         * 
         * 
         * @param {asSvg.ForeignObject} pText -Text Selected
         * 
         * @memberOf DrawingController
         */
        public onSelectText(pText:asSvg.ForeignObject) {
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
            this.mCurrentShape.stopDrag();
           (this.mCurrentShape.element as HTMLElement).onmousedown= null;
           window.removeEventListener("mouseup", () => this.onMouseUpShape());
           this.onDeselect();
            
        }
        //________________________________________
        private onDeselect() {
            for (let i = 0; i < Globals.mDrawingShapes.length; i++) {
                
                    Globals.mDrawingShapes[i].alpha =1;
                

            }
            for (let i = 0; i < Globals.mTextArray.length; i++) {
                Globals.mTextArray[i].alpha = 1;
            }
            Globals.isItemSelected = false;
        }
        //____________________________________
        private onDeselectText() {
            this.mCurrentText.mInputElement.style.outline = "none";
            document.getElementById("editTextToolBar").style.display = "none";
            document.getElementById("imageTools").style.display = "block";
            this.mCurrentText.stopDrag();
            (this.mCurrentText.element as HTMLElement).onmousedown = null;
            window.removeEventListener("mouseup", () => this.onMouseUpText());
            this.onDeselect();
        }
        //______________________________________________
        private onMouseDownShape(pEvent: MouseEvent) {
            pEvent.preventDefault();
            pEvent.stopPropagation();
            this.mCurrentShape.startDrag();
        }
        //__________________________________
        private onMouseDownText(pEvent: MouseEvent) {
            Globals.isSelectDragMode = true;
            this.mCurrentText.startDrag();

        }
        //_______________________________________
        private onMouseUpText() {
            Globals.isSelectDragMode = false;
            this.mCurrentText.stopDrag();
        }
        //____________________________________
        private onMouseUpShape() {
            this.mCurrentShape.stopDrag();
        }


    }
}