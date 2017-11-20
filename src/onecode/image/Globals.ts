/// <reference path="../action/actionmanager.ts" />


module image {
    /**
     * Contains Global Variables
     * 
     * @export
     * @class Globals
     */
    export class Globals {
     
        public static isDrawInBound: boolean = true;
        public static isSelectMode: boolean = false;
        public static isDrawMode: boolean = false;
        public static isRotateMode: boolean = false;
        public static isTextMode: boolean = false;
        public static isSelectDragMode: boolean = false;
        public static isItemSelected: boolean = false;
        public static imgURL = "assets/img2000.JPG";
        public static isUseBase64 = true;
        public static isFullScreen = false;
        public static isCropMode: boolean = false;
        public static isCircleMode: boolean = false;
        public static isArrowMode: boolean = false;
        public static currentShapeDragAction: action.DragShapeAction;
        public static ActionManager: action.ActionManager = new action.ActionManager();
        public static angle = 0;
        public static SET_IMAGE = "SET IMAGE";
        public static currentDragAction: action.DragAction;
        public static currentZoomAction: action.ZoomAction;
        public static currentTextDragAction: action.DragTextAction;
        public static currentEditTextAction: action.editTextAction;
        public static isDragMode: boolean = false;
        public static cropCounter: number = 0;

        public static ADD_SHAPES_AFTER_CROP: string = "ADD SHAPES AFTER CROP";
        public static ImageDrawing: image.ImageDrawing;
        public static activeShape: shapes.Shape;
        public static mTextArray: Array<asSvg.ForeignObject> = new Array<asSvg.ForeignObject>();
        public static mCircles: Array<shapes.Shape> = new Array<shapes.Shape>();
        public static mouseX;
        public static mouseY;
    }
}