/// <reference path="sprite.ts" />

var unescape = unescape;
module asSvg {

    /**Class that represents the stage
     * 
     * 
     * @export
     * @class Stage
     * @extends {Sprite}
     */
    export class Stage extends Sprite {

        private mParentDiv: HTMLElement;
        private mEnterFrameList: Array<DisplayObject>;
        private mEnterFrameCallbacks: Array<CallbackHolder>;
        private mMouseLocation: asBase.math.Point;

        /**
         * Creates an instance of Stage.
         * @param {HTMLElement} [pStage] 
         * 
         * @memberOf Stage
         */
        constructor(pStage?: HTMLElement) {
            super();
            this.mElement = pStage;
            if (pStage == null) {
                this.create("svg");
            }
        }
        //_________________________________________________________

        /**
         * Returns the svg stage as a HTMLImageElemnt
         * 
         * @returns {HTMLImageElement} 
         * 
         * @memberOf Stage
         */
        public getImage(): HTMLImageElement {
            let aImg: HTMLImageElement = document.createElement("img") as HTMLImageElement;
            let aXML:string = this.getAsString();
            //var svg64 = btoa(aXML);
            var svg64 = btoa(unescape(encodeURIComponent(aXML)))
            aImg.src = "data:image/svg+xml;base64," + svg64;
            return aImg;  
        }
        //_________________________________________________________

        /**
         * Activate the mouse location
         * 
         * @returns {void} 
         * 
         * @memberOf Stage
         */
        public activeMouseLocation(): void {
            if (this.mMouseLocation != null) {
                return;
            }
            this.mMouseLocation = new asBase.math.Point();
            window.addEventListener(asBase.events.MouseEvents.MOUSE_MOVE, (e: MouseEvent) => this.onMouseMove(e));
            window.addEventListener(asBase.events.MouseEvents.TOUCH_MOVE, (e: TouchEvent) => this.onTouchMove(e));
            window.addEventListener(asBase.events.MouseEvents.TOUCH_START, (e: TouchEvent) => this.onTouchStart(e));
        }
        //________________________________________________________
        
        /**
         * Sets the color and opacity of the element
         * 
         * @param {number} [pColor] 
         * @param {number} [pOpacity] 
         * @override
         * @memberOf Stage
         */
        public setFill(pColor?: number, pOpacity?: number) {
            if (pColor != null) {
                let aBase16 = pColor.toString(16);
                while (aBase16.length < 6) { aBase16 = "0" + aBase16 }
                let aColor = "#" + aBase16;
                (this.mElement as HTMLElement).style.background =  aColor;
            }
        }
        //_________________________________________________________

       
        /**
         * On Touch Move Callback
         * 
         * @param {TouchEvent} e 
         * @override 
         * @memberOf Stage
         */
        public onTouchMove(e: TouchEvent): void {
    

            this.mMouseLocation.x = e.touches[0].clientX - this.offsetX;
            this.mMouseLocation.y = e.touches[0].clientY - this.offsetY;
        }
        /**
         * On Touch Start callback
         * 
         * @param {TouchEvent} e 
         * 
         * @memberOf Stage
         */
        public onTouchStart(e: TouchEvent): void {
     
            this.mMouseLocation.x = e.touches[0].clientX - this.offsetX;
            this.mMouseLocation.y = e.touches[0].clientY - this.offsetY;
        }
        //_________________________________________________________

        
        /**
         * On Mouse Move Callback
         * 
         * @param {MouseEvent} e 
         * @override 
         * @memberOf Stage
         */
        public onMouseMove(e: MouseEvent): void {
            this.mMouseLocation.x = e.clientX - this.offsetX;
            this.mMouseLocation.y = e.clientY - this.offsetY;
        }
        //_________________________________________________________

        /**
         * 
         * 
         * @readonly
         * @type {number}
         * @memberOf Stage
         */
        public get offsetX(): number {
            return (this.element as HTMLElement).getBoundingClientRect().left;
        }

        //_________________________________________________________
        /**
         * 
         * 
         * @readonly
         * @type {number}
         * @memberOf Stage
         */
        public get offsetY(): number {
            return (this.element as HTMLElement).getBoundingClientRect().top;
        }

        //_________________________________________________________

        /**
         * 
         * 
         * @static
         * @param {HTMLElement} pStage 
         * @returns {Stage} 
         * 
         * @memberOf Stage
         */
        public static setStage(pStage: HTMLElement): Stage {
            var aStage: Stage = new Stage(pStage);
            return aStage;
        }
        //_________________________________________________________
          /**
         * Creating the Stage
         * @param pParent  The HTML Element that will host the stage,
         * @param pWidth   The Stage width in pixels
         * @param pHeight  The Stage height in pixels
         * @returns     new SVG element
         */
        public static cretaeStage(pParent: HTMLElement, pWidth: number, pHeight: number): Stage {
            let aStage: Stage = new Stage();
            if (pParent != null) {
                aStage.setParent(pParent);
            }
            aStage.setSize(pWidth, pHeight);
            return aStage;
        }
        //_____________________________________________________
        /**
         * Sets the size of the width
         * 
         * @param {number} pWidth  - the stage width in pixels
         * @param {number} pHeight -the stage height in pixels
         * 
         * @memberOf Stage
         */
        public setSize(pWidth: number, pHeight: number) {
            this.mElement.setAttribute("width", pWidth.toString() );
            this.mElement.setAttribute("height", pHeight.toString());
        }
        //_____________________________________________________

        /**
         * Sets the parent of the stage
         * 
         * @protected
         * @param {HTMLElement} [pParent] 
         * 
         * @memberOf Stage
         */
        protected setParent(pParent?: HTMLElement) {
            if (pParent == null) {
                return
            }
            this.mParentDiv = pParent;
            if (this.mElement == null) {
                return
            }
            if (this.mElement.parentNode != this.mParentDiv) {
                this.mParentDiv.appendChild(this.mElement);
            }
        }
        //_____________________________________________________

        /**
         * Sets the svg element
         * 
         * @protected
         * @param {HTMLElement} [pElement] 
         * 
         * @memberOf Stage
         */
        protected setSvgElement(pElement?: HTMLElement) {
            if (this.mElement == null) {
                return
            }
            this.mElement = pElement;
            if (this.mParent == null) {
                return
            }
            if (this.mElement.parentNode != this.mParentDiv) {
                this.mParentDiv.appendChild(this.mElement);
            }
        }
        //________________________________________________________
        
        /**
         * @override
         * 
         * @readonly
         * @type {number}
         * @memberOf Stage
         */
        public get height(): number {
            return (this.mElement.getBoundingClientRect().height);

        }
        //________________________________________________________
        
        /**
         * @override
         * 
         * @readonly
         * @type {number}
         * @memberOf Stage
         */
        public get width(): number {
            return (this.mElement.getBoundingClientRect().width);

        }
        //________________________________________________________
       
        /**
         * @override
         * 
         * @readonly
         * @static
         * @type {string}
         * @memberOf Stage
         */
        public static get myName(): string {
            return "Stage";
        }
        //______________________________________________
       
        /**
         * @override
         * 
         * @readonly
         * @type {string}
         * @memberOf Stage
         */
        public get myClassName(): string {
            return "Stage";
        }
        //______________________________________________
       
        /**
         * @override 
         * 
         * @protected
         * 
         * @memberOf Stage
         */
        protected createElement() { }
        //________________________________________________________
        /**
         * 
         * 
         * @private
         * @returns 
         * 
         * @memberOf Stage
         */
        private tick() {
            window.requestAnimationFrame(() => this.tick());
            this.enterFrame();
            if (this.mEnterFrameList == null) {
                return;
            }
            for (let i = 0; i < this.mEnterFrameList.length; i++) {
                this.mEnterFrameList[i].enterFrame();
            }
            if (this.mEnterFrameCallbacks == null) {
                return;
            }
            for (let i = 0; i < this.mEnterFrameCallbacks.length; i++) {
                this.mEnterFrameCallbacks[i].callback();
            }
        }
        //_________________________________________________________
        
        /**
         * Enables the enter frame
         * 
         * @returns {boolean} 
         * @override
         * @memberOf Stage
         */
        public enableEnterFrame(): boolean {
            if (this.mEnterFrameList == null) {
                this.mEnterFrameList = new Array<DisplayObject>();
                window.requestAnimationFrame(() => this.tick());
            }
            return true;
        }
        //_________________________________________________________
      
        /**
         * Disables the enter frame
         * 
         * @returns {boolean} 
         * @override
         * @memberOf Stage
         */
        public disableEnterFrame(): boolean {
            throw "cant stop EnterFrame on Stage";
        }

        //_________________________________________________________

        /**
         * Adds to enter frame list
         * 
         * @param {DisplayObject} pDisplayObject 
         * @returns 
         * 
         * @memberOf Stage
         */
        public addToEnterFrameList(pDisplayObject: DisplayObject) {
            if (this.mEnterFrameList == null) {
                this.enableEnterFrame();
            }
            if (this.mEnterFrameList.indexOf(pDisplayObject) != -1) {
                return;
            }
            this.mEnterFrameList.push(pDisplayObject);
        }
        //_________________________________________________________

        /**
         * Removes from enter frame list
         * 
         * @param {DisplayObject} pDisplayObject 
         * 
         * @memberOf Stage
         */
        public removeFromEnterFrameList(pDisplayObject: DisplayObject) {
            if (this.mEnterFrameList == null) {
                this.mEnterFrameList = new Array<DisplayObject>();
            }
            if (this.mEnterFrameList.indexOf(pDisplayObject) != -1) {
                this.mEnterFrameList.splice(this.mEnterFrameList.indexOf(pDisplayObject), 1);
            }
        }
        //_______________________________________________________________

        /**
         * Adds  enter frame callback
         * 
         * @param {Function} pCallback 
         * @param {*} pOwner 
         * @returns 
         * 
         * @memberOf Stage
         */
        public addEnterFrameCallback(pCallback: Function, pOwner: any) {
            if (this.mEnterFrameCallbacks == null) {
                this.mEnterFrameCallbacks = new Array<CallbackHolder>();
            }
            for (let i = this.mEnterFrameCallbacks.length - 1; i >= 0; i--) {
                if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                    return;
                }
            }
            this.mEnterFrameCallbacks.push(new CallbackHolder(pCallback, pOwner));
        } 
        //_______________________________________________________________
        
        /**
         * @override
         * 
         * @readonly
         * @type {asBase.math.Point}
         * @memberOf Stage
         */
        public get mouseLocation(): asBase.math.Point {
            if (this.mMouseLocation == null) {
                throw ("Use activeMouseLocation() for get the stage mouse location  ");
            }
            return this.mMouseLocation;
        }
        //_______________________________________________________________

        /**
         * 
         * 
         * @readonly
         * @type {number}
         * @memberOf Stage
         */
        public get mouseX(): number {
            if (this.mMouseLocation == null) {
                throw ("Use activeMouseLocation() for get the stage mouse location  ");
            }
            return this.mMouseLocation.x;
        }
        //_______________________________________________________________

        /**
         * 
         * 
         * @readonly
         * @type {number}
         * @memberOf Stage
         */
        public get mouseY(): number {
            if (this.mMouseLocation == null) {
                throw ("Use activeMouseLocation() for get the stage mouse location  ");
            }
            return this.mMouseLocation.y;
        }
        //_______________________________________________________________

        /**
         * Removes enter frame callback
         * 
         * @param {*} pOwner 
         * @returns 
         * 
         * @memberOf Stage
         */
        public removeEnterFrameCallback(pOwner: any) {
            if (this.mEnterFrameCallbacks == null) {
                return;
            }
            for (let i = this.mEnterFrameCallbacks.length - 1; i >= 0; i--) {
                if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                    if (this.mEnterFrameCallbacks[i].owner == pOwner) {
                        this.mEnterFrameCallbacks.splice(i, 1);
                    }
                }
            }
           
        } 
        //_______________________________________________________________

      
        /**
         * @override
         * 
         * @readonly
         * @protected
         * @type {Element}
         * @memberOf Stage
         */
        protected get eventElement(): Element {
            (this.mParentDiv as any).asObject = this;
            return this.mParentDiv;
        }
    }
    //__________________________________________________________________

    /**
     * 
     * 
     * @class CallbackHolder
     */
    class CallbackHolder {
        public callback: Function;
        public owner: any;
        /**
         * Creates an instance of CallbackHolder.
         * @param {Function} pCallback 
         * @param {*} pOwner 
         * 
         * @memberOf CallbackHolder
         */
        constructor(pCallback: Function, pOwner: any) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
    }
}


