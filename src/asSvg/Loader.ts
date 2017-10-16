module asSvg {
    /**
     * Represents a Loader 
     * 
     * @export
     * @class Loader
     * @extends {DisplayObject}
     */
    export class Loader extends DisplayObject {

        //------------------------------
        // Members
        //------------------------------
        private mCallback: Function;
        protected mPath: string;
        protected mInnerSVG: string;
        protected mSVG: SVGElement;
        private mHttpRequest: XMLHttpRequest;
        protected mOrginalWidth: number = -1;
        protected mOrginalHeight: number = -1;
        private static mCounter: number = 0;

        /**
         * Creates an instance of Loader.
         * @param {string} pPath 
         * @param {Function} [pFunction] 
         * @param {boolean} [pIsAutoLoad=true] 
         * 
         * @memberOf Loader
         */
        constructor(pPath: string, pFunction?: Function, pIsAutoLoad: boolean = true) {

            super();
            this.mCallback = pFunction;
            this.mPath = pPath;
            if (pPath == null) {
                return;
            }
            if (pIsAutoLoad) {
                this.load();
            }
        }

        /**
         * Loads a HttpRequest
         * 
         * 
         * @memberOf Loader
         */
        public load(){
            this.mHttpRequest = new XMLHttpRequest;
            this.mHttpRequest.open('get', this.mPath, true);
            this.mHttpRequest.onreadystatechange = () => this.onReadyStatecChange();
            this.mHttpRequest.send();
        }
        //_______________________________________________________

        /**
         * 
         * 
         * 
         * @memberOf Loader
         */
        public set orginalHeight(pVal: number) {
            this.mOrginalHeight = pVal;
        }
        /**
         * 
         * 
         * @readonly
         * @type {number}
         * @memberOf Loader
         */
        public get orginalHeight(): number {
            return this.mOrginalHeight;
        }
        //_______________________________________________________

        /**
         * 
         * 
         * 
         * @memberOf Loader
         */
        public set orginalWidth(pVal:number) {
            this.mOrginalWidth = pVal;
        }
        /**
         * 
         * 
         * @readonly
         * @type {number}
         * @memberOf Loader
         */
        public get orginalWidth(): number {
            return this.mOrginalWidth;
        }
        //________________________________________________________
        /****************************
        * Override methods
        ****************************/
        /**
         * @override
         * Creates a SVGGElement
         * @protected
         * 
         * @memberOf Loader
         */
        protected createElement() {
            this.create("g");
        };


        /****************************
        * Methods
        ****************************/

        //_____________________________________________________________________________
        //// <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="96px" height="48px" viewBox="0 0 96 48">
        /**
         * Sets the SVG Data from Data
         * 
         * @param {Node} pSVG 
         * 
         * @memberOf Loader
         */
        public setSVGDataFromData(pSVG: Node): void {
            Loader.mCounter++;
            let i: number;
            if (pSVG != null) {
                this.mSVG = document.importNode(pSVG, true) as SVGElement;

                if (this.mOrginalWidth == -1) {
                    if (this.mSVG.attributes["width"] == null) {
                        this.mOrginalWidth = 620;
                        this.mOrginalHeight = 515;
                    } else {
                        this.mOrginalWidth = parseInt(this.mSVG.attributes["width"].nodeValue);
                        this.mOrginalHeight = parseInt(this.mSVG.attributes["height"].nodeValue);
                    }
                }
                let aDefs = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs",);
                let aAllGElements = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "g");
                let aUseElements = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "use");
                let aPathElements = this.mSVG.getElementsByTagNameNS("http://www.w3.org/2000/svg", "path");

                let aGDefElements: NodeList;
                if ((aDefs != null) && (aDefs.length > 0)) {
                    aGDefElements = aDefs[0].childNodes;
                }
                
                for (i = 0; i < aPathElements.length; i++) {
                    let aFilter: string = aPathElements[i].getAttribute("filter");
                    if ((aFilter != null) && (aFilter.indexOf("url(#") == 0)) {
                        aFilter = aFilter.substr(0, aFilter.length - 1) + "_" + Loader.mCounter + ")";
                        aPathElements[i].setAttribute("filter", aFilter);
                    }
                    let aFill: string = aPathElements[i].getAttribute("fill");
                    if ((aFill != null) && (aFill.indexOf("url(#") == 0)) {
                        aFill = aFill.substr(0, aFill.length - 1) + "_" + Loader.mCounter + ")";
                        aPathElements[i].setAttribute("fill", aFill);
                    }
                }

                
                let aGElementsFirstLevel: Array<SVGElement> = new Array<SVGElement>() ;
                for (i = 0; i < aAllGElements.length; i++) {
                    if (aAllGElements[i].parentNode == this.mSVG) {
                        aGElementsFirstLevel.push(aAllGElements[i] as SVGElement);
                    }
                }


                for (i = 0; i < aUseElements.length; i++) {
                    let aLink: string = aUseElements[i].getAttribute("xlink:href") + "_" + Loader.mCounter;
                    aUseElements[i].setAttribute("xlink:href", aLink);
                    let aFilter: string = aUseElements[i].getAttribute("filter");
                    if ((aFilter != null)&&(aFilter.indexOf("url(#") == 0)) {
                        aFilter = aFilter.substr(0, aFilter.length - 1) + "_" + Loader.mCounter + ")";
                        aUseElements[i].setAttribute("filter", aFilter);
                    }
                    
                }
                let aBefore: SVGElement
                if (aGDefElements != null) {
                    for (i = 0; i < aGDefElements.length; i++) {
                        if ((aGDefElements[i] as SVGAElement).id != null) {
                            (aGDefElements[i] as SVGAElement).id = (aGDefElements[i] as SVGAElement).id + "_" + Loader.mCounter;
                        }
                    }
                    aBefore = aDefs[0] as SVGElement;
                    this.mElement.appendChild(aBefore);
                    for (i = aDefs.length - 1; i >= 0; i--) {
                        this.mElement.insertBefore(aDefs[i], aBefore);
                        aBefore = aDefs[i] as SVGElement;;
                    }
                }
                aBefore = aGElementsFirstLevel[0] as SVGElement;
                this.mElement.appendChild(aBefore);
                for (i = aGElementsFirstLevel.length - 1; i >= 0; i--) {
                    this.mElement.insertBefore(aGElementsFirstLevel[i], aBefore);
                    aBefore = aGElementsFirstLevel[i] as SVGElement;;
                }
            }
            //if (asBase.Utils.isFireFox) {
            //    this.mInnerSVG = this.mElement.innerHTML;
            //    this.mElement.innerHTML = '<ellipse cx="0" cy="0" rx="2" ry="2" fill="#ffffff" stroke-width="0.5" stroke="#ffffff"></ellipse>'
            //    setTimeout(() => this.updateSVGForFF(), 1000);
            //}
            if (this.mCallback != null) {
                this.mCallback(this);
            }
        }
        //______________________________________________________________________________

        /**
         * Updates the SVG for FF
         * 
         * @protected
         * @returns 
         * 
         * @memberOf Loader
         */
        protected updateSVGForFF() {
            if (this.mElement.getBoundingClientRect().width == 0) {
                setTimeout(() => this.updateSVGForFF(), 700);
                return;
            }
            this.mElement.innerHTML = this.mInnerSVG;
        }
        //______________________________________________________________________________

        /**
         * 
         * 
         * @protected
         * @returns 
         * 
         * @memberOf Loader
         */
        protected onReadyStatecChange() {
            if (this.mHttpRequest.readyState != 4) {
                return;
            }
            var aSvg = this.getXMLFromRespose();
            if (aSvg == null) {
                console.log("Error Loading SVG");
                this.setSVGDataFromData(null);
                return;
            }
            this.setSVGDataFromData(aSvg);
        }
         //______________________________________________________________________________

        /**
         * 
         * 
         * @protected
         * @returns 
         * 
         * @memberOf Loader
         */
        protected getXMLFromRespose() {
            if (this.mHttpRequest.responseXML != null) {
                return this.mHttpRequest.responseXML.documentElement;
            }
            if (this.mHttpRequest.responseText != null) {
                var div = document.createElement('div');
                div.innerHTML = this.mHttpRequest.responseText;
                var elements = div.childNodes;
                return elements[1];
            }
            return null;
        }
        /****************************
        * Getters and Setters
        ****************************/


        /**
         * 
         * 
         * @readonly
         * @static
         * @type {string}
         * @memberOf Loader
         */
        public static get myName(): string {
            return "Loader";
        }
        //______________________________________________
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberOf Loader
         */
        public get myClassName(): string {
            return "Loader";
        }
        //______________________________________________
    }
}