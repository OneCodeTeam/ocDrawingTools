/// <reference path="rect.ts" />
module asSvg {
    /**
     * Represents a class with a SVGTextElement
     * 
     * @export
     * @class TextField
     * @extends {Sprite}
     */
    export class TextField extends Sprite{

        
        
        public static ALIGN_RIGHT: string = "start"; 
        public static ALIGN_MIDDLE_X: string = "middle"; 
        public static ALIGN_LEFT: string = "left"; 

        public static ALIGN_TOP: string = "1em";
        public static ALIGN_MIDDLE_Y: string = ".3em";
        public static ALIGN_BOTTOM: string = "0em"; 
        
        //------------------------------
        // Members
        //------------------------------
        private mTextElement: SVGTextElement;
        private mBackground: asSvg.Rect;
        private mText: string = "";
        private mAlineX: string;
        private mAlineY: string;
        private mFontSize:number = 0;
        private mCreateBackgroundTimeOut: number = 0;

        /**
         * Creates an instance of TextField.
         * 
         * @memberOf TextField
         */
        constructor() {
            super();
        }


        /****************************
        * Override methods
        ****************************/

        /**
         * Creates the text element
         * 
         * @protected
         * 
         * @memberOf TextField
         */
        protected createElement() {
            super.createElement();
            this.mTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.alineX = TextField.ALIGN_LEFT;
            this.alineY = TextField.ALIGN_TOP;
           // (this.mTextElement as any).style.pointerEvents = "none";
            (this.mTextElement as any).classList.add("unselectable");
            this.mElement.appendChild(this.mTextElement);
          
        };

        /****************************
        * Methods
        ****************************/
        /**
         * Sets the background
         * 
         * 
         * @memberOf TextField
         */
        public set background(pValue: boolean) {
            if (pValue) {
                if (this.background) {
                    return;
                } else {
                    this.mBackground = new asSvg.Rect(0, 0, 0, 0);
                    this.mBackground.setFill(0xffffff, 1);
                    this.addChild(this.mBackground);
                    this.mElement.appendChild(this.mTextElement);
                    this.updateBackground();
                }
            } else {
                this.removeChild(this.mBackground);
                this.mBackground = null;
            }

        }
        //________________________________________________________________________

        /**
         * 
         * 
         * @readonly
         * @type {SVGTextElement}
         * @memberOf TextField
         */
        public get textElement(): SVGTextElement {
             return(this.mTextElement);
        }
        //________________________________________________________________________

        /**
         * Sets the line style
         * 
         * @param {number} [pWidth] 
         * @param {number} [pColor] 
         * @param {number} [pOpacity] 
         * @param {string} [pLinecap] 
         * @param {string} [pLinejoin] 
         * 
         * @memberOf TextField
         */
        public setLineStyle(pWidth?: number, pColor?: number, pOpacity?: number, pLinecap?: string, pLinejoin?: string) {

            if (pWidth != null) {
                this.mTextElement.setAttribute("stroke-width", pWidth.toString());
            }
            if (pColor != null) {
                let aColor = "#" + pColor.toString(16);
                while (aColor.length < 7) {
                    aColor += "0";
                }

                this.mTextElement.setAttribute("stroke", aColor);
            }
            else {
                this.mTextElement.setAttribute("stroke", "none");
            }
            if (pOpacity != null) {
                this.mTextElement.setAttribute("stroke-opacity", pOpacity.toString());
            }
            if (pLinecap != null) {
                this.mTextElement.setAttribute("stroke-linecap", pLinecap);
            }
            if (pLinejoin != null) {
                this.mTextElement.setAttribute("stroke-linejoin", pLinejoin);
            }

        }
        //_____________________________________________________________________
        /**
         * Sets the background for mouse events
         * 
         * 
         * @memberOf TextField
         */
        public setBackgroundForMouseEvents() {
            this.background = true;
            this.mBackground.setFill(0xffffff, 0);
        }
        //______________________________________________________________________

        /**
         * 
         * 
         * @readonly
         * @type {boolean}
         * @memberOf TextField
         */
        public get background(): boolean {
            return this.mBackground != null;
        }
        //_____________________________________________________________________
        /**
         * 
         * 
         * @readonly
         * @type {asSvg.Rect}
         * @memberOf TextField
         */
        public get backgroundRect(): asSvg.Rect {
            return this.mBackground;
        }
        //______________________________________________________________________
        /**
         * 
         * 
         * 
         * @memberOf TextField
         */
        public set alineX(pValue: string) {
            this.mAlineX = pValue;
            this.mTextElement.setAttribute("text-anchor", pValue);
            this.updateBackground();
        }
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberOf TextField
         */
        public get alineX(): string {
            return (this.mAlineX);
        }
        //____________________________________________________________

        /**
         * Updates the Background
         * 
         * @returns 
         * 
         * @memberOf TextField
         */
        public updateBackground() {
            clearTimeout(this.mCreateBackgroundTimeOut);
            if (!this.background) {
                return;
            }
            if (this.stage == null) {
                this.mCreateBackgroundTimeOut = setTimeout(() => this.updateBackground(), 100);
                return;
            }
            let aNode: Node = this.mTextElement.cloneNode();
            (aNode as HTMLElement).innerHTML = this.mTextElement.innerHTML;
            this.stage.element.appendChild(aNode);
            let w: number = (aNode as HTMLElement).getBoundingClientRect().width;
            let h: number = (aNode as HTMLElement).getBoundingClientRect().height;
            this.stage.element.removeChild(aNode);
            this.backgroundRect.update(-w/2, -h/2, w,h);
        }
        //____________________________________________________________

        /**
         * 
         * 
         * 
         * @memberOf TextField
         */
        public set alineY(pValue: string) {
            this.mAlineY = pValue;
            this.mTextElement.setAttribute("dy", pValue);
        }
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberOf TextField
         */
        public get alineY(): string {
            return (this.mAlineY);
        }
        //____________________________________________________________
        /****************************
        * Getters and Setters
        ****************************/

        //________________________________________
        /**
         * Sets the object's element's font size
         * 
         * 
         * @memberOf TextField
         */
        public set fontSize(pFont: number) {
            this.mFontSize = pFont;
            this.mTextElement.setAttribute("font-size", pFont.toString());
            this.updateBackground();
            this.updateText();
        }
        public get fontSize(): number {
            return (this.mFontSize);
        }
        //________________________________________

        /**
         * 
         * 
         * 
         * @memberOf TextField
         */
        public set font(pFont: string) {
            this.mTextElement.setAttribute("font-family", pFont);
            this.updateBackground();
        }
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberOf TextField
         */
        public get font(): string {
            return (this.mTextElement.getAttribute("font-family"));
        }
        //________________________________________________________________

        /**
         * 
         * 
         * 
         * @memberOf TextField
         */
        public set text(pVal: string) {
            this.mText = pVal;
            this.updateText();
        }
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberOf TextField
         */
        public get text(): string {
            return this.mText;
        }
        //________________________________________________________________

        /**
         * Updates the element's text
         * 
         * @returns 
         * 
         * @memberOf TextField
         */
        public updateText() {
            this.mTextElement.innerHTML = "";
            let aLines: Array<string> = this.mText.split("\n");
            if (aLines.length <= 1){
                this.mTextElement.textContent = this.mText;
                this.updateBackground();
                return;
            }
            let aFrom: number = 0;
            if (this.alineY == asSvg.TextField.ALIGN_MIDDLE_Y) {
                aFrom = -(aLines.length / 2) * this.mFontSize;
            }
            for (let a: number = 0; a < aLines.length; a++) {
                let aTspan: SVGTSpanElement = document.createElementNS("http://www.w3.org/2000/svg", "tspan") as SVGTSpanElement;
                aTspan.setAttribute("x", "0px");
                aTspan.setAttribute("y", (aFrom + this.mFontSize * a).toString() + "px");
                aTspan.setAttribute("dy", TextField.ALIGN_TOP);
                let tn = document.createTextNode(aLines[a]);
                aTspan.appendChild(tn);
                this.mTextElement.appendChild(aTspan);
            }
            this.updateBackground();
        }

        //________________________________________________

        public static get myName(): string {
            return "TextField";
        }
        //______________________________________________
        public get myClassName(): string {
            return "TextField";
        }
        //______________________________________________


    }
}