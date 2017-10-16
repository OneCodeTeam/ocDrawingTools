module image {
    /**
     * Contains Global Variables
     * 
     * @export
     * @class Globals
     */
    export class Globals {
        public static isSelectMode: boolean = false;
        public static isDrawMode: boolean = false;
        public static isRotateMode: boolean = false;
        public static isTextMode: boolean = false;
        public static isSelectDragMode: boolean = false;
        public static isItemSelected: boolean = false;
        public static imgURL = "assets/img2000.JPG";
        public static isTest = false;
        public static isFullScreen = false;
        public static angle = 0;
        public static get isDragMode() {
            return (!Globals.isDrawMode && !Globals.isSelectDragMode);
        }
        public static mDrawingShapes: Array<asSvg.Shape> = new Array<asSvg.Shape>();
        public static mTextArray: Array<asSvg.ForeignObject> = new Array<asSvg.ForeignObject>();
        
    }
}