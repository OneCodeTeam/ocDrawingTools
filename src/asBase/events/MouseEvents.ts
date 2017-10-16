module asBase.events {
    /**
     * Class that contains global mouse events
     * 
     * @export
     * @class MouseEvents
     */
    export class MouseEvents {

        public static CLICK:string = "click";
        public static DOUBLE_CLICK:string = "dblclick";
        public static MOUSE_OVER:string = "mouseover";
        public static MOUSE_OUT:string = "mouseout";
        public static MOUSE_DOWN: string = "mousedown";
        public static MOUSE_UP: string = "mouseup";
        public static MOUSE_MOVE: string = "mousemove";

        public static TOUCH_MOVE: string = "touchmove";
        public static TOUCH_START: string = "touchstart";
        public static TOUCH_END: string = "touchend";

        public static DRAG_OVER: string = "dragover";
        public static DRAG_LEAVE: string = "dragleave";
        public static DROP: string = "drop";
    }
}