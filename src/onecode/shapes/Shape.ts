module shapes {
    export class Shape {
        protected mIsMouseDown: boolean = false;
        protected mLastMouseDownPoint: asBase.math.Point;
        protected mSprite: asSvg.Sprite;
        protected mColor;
        protected mShape: asSvg.DisplayObject;
        protected mWidth: number;
        protected mMouseDownListener: Function;
        protected mMouseUpListener: Function;
        protected mClassName;
        protected mLastGoodX;
        protected mLastGoodY;
        constructor() {


        }
        //________________________________________
        public onMouseDown(pEvent: MouseEvent) {
            image.Globals.activeShape = this;
            this.mIsMouseDown = true;
            this.mLastMouseDownPoint = new asBase.math.Point();
          
            this.mLastMouseDownPoint.x = this.mSprite.parent.mouseX;
            this.mLastMouseDownPoint.y = this.mSprite.parent.mouseY;
        }
        //_____________________________
        public onMouseMove(pEvent:MouseEvent) {

        }
        //____________________________________
        public onMouseUp() {
            image.Globals.activeShape = null;
            this.mIsMouseDown = false;
            this.mLastMouseDownPoint = null;
            
        }
        //___________________________________
        protected drawShape() {
            
        }
        //________________________
        public changeShapeColor(pColor) {

        }
        //__________________________________
        protected onSelect() {
            image.Globals.isItemSelected = true;
            image.Globals.isSelectMode = false;
            image.Globals.isTextMode = false;
            image.Globals.isDrawMode = false;
            image.Globals.isRotateMode = false;
            image.Globals.isCropMode = false;
            image.Globals.isCircleMode = false;
            image.Globals.isArrowMode = false;
        }
        //____________________________________
        public onDeselect() {
            image.Globals.isItemSelected = false;
        }
        //__________________________
        public startDrag() {

        }
        //__________________________
        public stopDrag() {

        }
        //________________________
        public moveShape(pArr: Array<asBase.math.Point>)
        {
            this.mShape.x = pArr[0].x;
            this.mShape.y = pArr[0].y;

        }
        //_______________________________________-
        public addMouseEvents(pMouseDownCallBack: Function) {

        }
        //_________________________________________
        public removeMouseEvents() {
            this.element.removeEventListener("mousedown", (pEvent) => this.mMouseDownListener(pEvent));
            window.removeEventListener("mouseup", ()=>this.mMouseUpListener(), false);
          

        }
        //__________________________
        public deleteShape() {
            
        }
        //______________________________________
        public addToSprite(pSprite: asSvg.Sprite) {
            this.mSprite = pSprite;
            this.mSprite.addChild(this.element);
            this.element.addEventListener("click", () => this.onSelect(), this);
        
        }
        //_____________________________________
        public clone():Shape {
            let aShape = new Shape();
            aShape.mWidth = this.mWidth;
            aShape.mColor = this.mColor;
            aShape.mShape = this.element.clone();
            aShape.myClassName = this.myClassName;
            return aShape;
        }
        //________________________________________
        protected setShapeInBound() {
           
        }
        //___________________________________________
        public setLineWidth(pWidth: number) {
            this.element.setLineStyle(pWidth);
        }
        //___________________________________
        public get scale() {
           return this.mSprite.parent.parent.scaleX;
        }
        //____________________
        public get element() {
            return this.mShape;
        }
        //__________________________
        public get myClassName() {
            return this.mClassName;
        }
        //_______________________________
        public set myClassName(pClassName) {
            this.mClassName = pClassName;
        }
        //______________________
        public get parent() {
            return this.mSprite;
        }
        //__________________________
        public get color() {
            return this.mColor;
        }
        //_______________________
       
    }
}