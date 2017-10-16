/// <reference path="../../../scripts/jquery.d.ts" />



module image {
    /**
     * 
     * 
     * @export
     * @class ImageDrawing
     */
    export class ImageDrawing {

        public static FIX_TEXT_TO_ZOOM: boolean = true;
        public static SCALE_TO_MIN_AFTER_ROTATE: boolean = false;
        public static isZoomed: boolean = false;
        private fontSize = 25;
        private mLineWidth = 6;
        public mSVGStage: asSvg.Stage;
        public mRotationPanel: asSvg.Sprite;
        public mMovePanel: asSvg.Sprite;
        public mImageContainer: HTMLElement;
        public mImage: asSvg.Image;
        private mHeightOriginalScale: number;
        private mWidthOriginalScale: number;
        private mHeightTransformScale: number;
        private mWidthTransformScale: number;
        private mMouseDown: boolean;
        private mMousePoint;
        private mDrawPanel: asSvg.Sprite;
        public mTextButton: HTMLElement;
        private msetTextPoint;
        public mDrawColor;
        private mMinOriginalScale: number;
        private mMinTransformScale: number;
        private mCurrentAngle = 0;
        private mImgHeight: number;
        private mImgWidth: number;
        private mOrginalContainerHeight;
        private mOrginalContainerWidth;
        private mHeightScale;
        private mWidthScale;
        private mSourceImage: HTMLImageElement;
        private mDrawingController: DrawingController;
        private mOriginalAngle: number = 0;
        private mOrginalScale:number
        constructor(pDiv: HTMLElement) {
            this.mImageContainer = pDiv;
            let aDiv = document.createElement("div") as HTMLDivElement;
            aDiv.style.position = "absolute";
            pDiv.appendChild(aDiv);
            let aDivRect = pDiv.getBoundingClientRect();
            this.mOrginalContainerHeight = aDivRect.height;
            this.mOrginalContainerWidth = aDivRect.width;
            this.mSVGStage = asSvg.Stage.cretaeStage(aDiv, aDivRect.width, aDivRect.height);
            
            this.mRotationPanel = new asSvg.Sprite();
            this.mRotationPanel.x = aDivRect.width / 2;
            this.mRotationPanel.y = aDivRect.height / 2;
            this.mRotationPanel.instanceName="Rotation Panel"
            this.mSVGStage.addChild(this.mRotationPanel);
            this.mSVGStage.activeMouseLocation();

            this.mMovePanel = new asSvg.Sprite();
            this.mMovePanel.instanceName = "Move Panel";
            
            this.mRotationPanel.addChild(this.mMovePanel);
            (this.mSVGStage.element as any).onmousewheel = (pEvent) => this.onMouseWheel(pEvent);

            this.mDrawPanel = new asSvg.Sprite();
      
            //this.mMovePanel.addChild(this.mTextElement);

            (this.mSVGStage.element as any).addEventListener("click", (pEvent)=>this.setTextPoint(pEvent));
            (this.mSVGStage.element as any).onmousedown = (pEvent) => this.onMouseDown(pEvent);
            (this.mSVGStage.element as any).onmousemove = (pEvent) => this.onMouseMove(pEvent);
            window.onmouseup = (pEvent) => this.onMouseUp(pEvent);

            this.mDrawingController = new DrawingController();
            
         
        }
        //___________________________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public removeImage() {
            if (this.mImage)
            {
                this.mImage.destruct();
             
            }
            if (this.mDrawPanel) {
                this.mDrawPanel.destruct();
                this.mDrawPanel.removeChildren();
            }
            this.mMovePanel.removeChildren();
            this.mRotationPanel.removeChildren();
            this.mRotationPanel.rotation = 0;

            this.mMovePanel = new asSvg.Sprite();
            this.mMovePanel.instanceName = "Move Panel";
            this.mRotationPanel.addChild(this.mMovePanel);
     
        }
        //__________________________________________
        /**
         * 
         * Sets Image in frame
         * @param {string} pURL- the image src 
         * @param {number} [pAngle=0] -angle to rotate the image,in degrees
         * @param {number} [pScale=1] 
         * 
         * @memberOf ImageDrawing
         */
        public setPicture(pURL: string, pAngle: number=0,pScale:number=1) {
            this.removeImage();
            if (Globals.isTest) {
                this.setPictureTest(pURL, pAngle,pScale);

            }
            else {
                this.setPictureCanvas(pURL, pAngle,pScale);
            }
        }
     
        //_______________________________________
        private setPictureTest(pURL: string, pAngle = 0, pScale: number=1) {
            this.mImage = new asSvg.Image(pURL, (pData) => this.onImageLoadTest(pAngle,pScale));
        }
        //_________________________________________________
        /**
         * 
         * 
         * @param {number} [pAngle=0] 
         * @param {number} [pScale=1] 
         * 
         * @memberOf ImageDrawing
         */
        public onImageLoadTest(pAngle: number = 0, pScale: number = 1) {
            this.mOriginalAngle = pAngle;
            this.mCurrentAngle = pAngle;
            this.mOrginalScale = pScale;
            this.mImage.x = 100000;
            this.mSVGStage.addChild(this.mImage);
            let aImageRect = this.mImage.getBounds();
            this.mImgHeight = aImageRect.height;
            this.mImgWidth = aImageRect.width;
            this.getMinScale();

            this.mSVGStage.removeChild(this.mImage);


            this.mRotationPanel.setScale(this.minImgScale);
            this.mImgWidth = aImageRect.width;
            this.mImgHeight = aImageRect.height;
            this.mImage.x = -aImageRect.width / 2;
            this.mImage.y = -aImageRect.height / 2;
            this.mImage.instanceName = "image";
            this.mMovePanel.addChild(this.mImage);
            this.mDrawPanel.instanceName = "Draw Panel";
            this.mMovePanel.addChild(this.mDrawPanel);


            if (pAngle != 0) {
                this.rotate(pAngle);
            }
            if (this.mOrginalScale != 1) {
                this.scale(this.mOrginalScale);
            }
        }
        //__________________________________________
        private setPictureCanvas(pURL:string,pAngle=0,pScale:number=1) {
            this.mSourceImage = document.createElement("img");
            this.mSourceImage.src = pURL;
            this.mSourceImage.onload = (pData) => this.onImageLoadCanvas(pAngle, pScale);
        }
        //______________________________________________
        private onImageLoadCanvas(pAngle :number= 0,pScale:number=1) {
            this.mOriginalAngle = pAngle;
            this.mCurrentAngle = pAngle;
            this.mOrginalScale = pScale;
            let aCanvas: HTMLCanvasElement = document.createElement("canvas");;
            aCanvas.width = this.mSourceImage.naturalWidth;
            aCanvas.height = this.mSourceImage.naturalHeight;
            let aContext: CanvasRenderingContext2D = aCanvas.getContext("2d");
            aContext.drawImage(this.mSourceImage, 0, 0);
            let aDataURL: string = aCanvas.toDataURL();

            this.mImage = new asSvg.Image(null);
            this.mImage.setWidth(this.mSourceImage.naturalWidth);
            this.mImage.setHeight(this.mSourceImage.naturalHeight);
            this.mImage.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            this.mImage.setAttribute("xlink:href", aDataURL);
            ///this.mImage.x = 100000;
            //this.mSVGStage.addChild(this.mImage);
            //let aImageRect = this.mImage.getBounds();


            // this.mSVGStage.removeChild(this.mImage);
            this.mImgWidth = this.mSourceImage.naturalWidth;
            this.mImgHeight = this.mSourceImage.naturalHeight;
            this.getMinScale();
            this.mRotationPanel.setScale(this.minImgScale);
            this.mImage.x = -this.mSourceImage.naturalWidth / 2;
            this.mImage.y = -this.mSourceImage.naturalHeight / 2;
            this.mImage.instanceName = "image";
            this.mMovePanel.addChild(this.mImage);

            let aInnerHTML: string = this.mMovePanel.element.innerHTML;
            this.mMovePanel.element.innerHTML = "";
            this.mMovePanel.element.innerHTML = aInnerHTML;
            this.mDrawPanel.instanceName = "Draw Panel";
            this.mMovePanel.addChild(this.mDrawPanel);


            if (pAngle!=0) {
                this.rotate(pAngle);
            }
            if (this.mOrginalScale != 1) {
                this.scale(this.mOrginalScale);
            }
        }
        //_____________________________________
        private getMinScale() {
            var aRect = this.mImageContainer.getBoundingClientRect();
            var aContainerWidth = aRect.width;
            var aContainerHeight = aRect.height;

            var aImgWidth = this.mImgWidth;
            var aImgHeight = this.mImgHeight;

            this.mHeightOriginalScale = aContainerHeight / aImgHeight;
            this.mWidthOriginalScale = aContainerWidth / aImgWidth;

            if (this.mHeightOriginalScale < this.mWidthOriginalScale) {
                this.mMinOriginalScale = this.mHeightOriginalScale;
            }
            else {
                this.mMinOriginalScale = this.mWidthOriginalScale;
            }
            this.mHeightTransformScale = aContainerHeight / aImgWidth;
            this.mWidthTransformScale = aContainerWidth / aImgHeight;

            if (this.mHeightTransformScale < this.mWidthTransformScale) {
                this.mMinTransformScale = this.mHeightTransformScale;
            }
            else {
                this.mMinTransformScale = this.mWidthTransformScale;
            }
           
        }
        //_________________________________
        /**
         * 
         * 
         * @param {number} pAngle -angle to rotate image
         * 
         * @memberOf ImageDrawing
         */
        public rotate(pAngle: number) {
            this.mRotationPanel.rotation = this.mRotationPanel.rotation + pAngle;
            this.mCurrentAngle = this.mRotationPanel.rotation;
            
            if (this.mRotationPanel.scaleX < this.minImgScale) {
                this.mRotationPanel.setScale(this.minImgScale);
                ImageDrawing.isZoomed = false;
            }
            if (ImageDrawing.SCALE_TO_MIN_AFTER_ROTATE) {
                if (!ImageDrawing.isZoomed) {
                    this.mRotationPanel.setScale(this.minImgScale);
                }
            }
            this.adjustTextPanelAfterRotation();
            this.setImageInBound();
         }
        //_____________________________________
        /**
         * 
         * 
         * @param {string} pColor -drawing color( in hex)
         * 
         * @memberOf ImageDrawing
         */
        public startDraw(pColor: string) {
            if (!Globals.isDrawMode) {
               
                Globals.isDrawMode = true;
                this.mDrawColor = pColor;
            }
            else {
                
                Globals.isDrawMode = false;
            }
        }
        //_________________________________________
        private stopDraw() {
   
            Globals.isDrawMode = false;
         
        }
        //_____________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public clearAll() :void{
            this.mDrawPanel.removeChildren();
            Globals.mDrawingShapes = new Array<asSvg.Shape>();
            Globals.mTextArray = new Array<asSvg.ForeignObject>();
        }
        //____________________________
        /**
         * 
         * 
         * @param {string} pColor 
         * 
         * @memberOf ImageDrawing
         */
        public changeColor(pColor: string) {
            this.mDrawColor = pColor;
        }
        //_____________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public onSetText() :void{
            if (!Globals.isTextMode) {
                Globals.isTextMode = true;
            }
            else
                Globals.isTextMode = false;
        }
        //________________________________
        /**
         * 
         * 
         * @param {string} pText 
         * 
         * @memberOf ImageDrawing
         */
        public setText() :void{
                this.stopDraw();
                var aTextElement = new asSvg.TextField();
                if (!Globals.mTextArray) {
                    Globals.mTextArray = new Array<asSvg.ForeignObject>();
                }
                
                aTextElement.setLineStyle(6 / this.mRotationPanel.scaleX);
           
                this.mDrawPanel.addChild(aTextElement)

                let aForeignObject: asSvg.ForeignObject = new asSvg.ForeignObject();
                aForeignObject.x = this.msetTextPoint.x;
                aForeignObject.y = this.msetTextPoint.y;
                aForeignObject.setWidth(100);
                aForeignObject.setHeight(50);

                this.mDrawPanel.addChild(aForeignObject);
                aForeignObject.mInputElement = document.createElement("input");
                aForeignObject.mInputElement.size = 1;
                //  $(aForeignObject.mInputElement).on("focusout", (pForeign) => this.onFocusOutText(aForeignObject, aForeignObject.mInputElement));
                $(aForeignObject.mInputElement).on("focusin", (pEvent,pTextElement) => this.onSelectText(pEvent,aForeignObject));
                aForeignObject.mInputElement.oninput = (pInput) => this.expandTextBox(aForeignObject.mInputElement);
                aForeignObject.mInputElement.type = "text";
                aForeignObject.mInputElement.className = "imageTextBox";
                aForeignObject.mInputElement.style.fontSize = this.fontSize / this.mRotationPanel.scaleX + "px";
                aForeignObject.mInputElement.style.color = this.mDrawColor;

                aForeignObject.textField = aTextElement;
                aForeignObject.textField.textElement.style.display = "none";
                aForeignObject.rotation = -this.mRotationPanel.rotation;
                // aForeignObject.mInputElement.setAttribute("outline","dashed black")


                aForeignObject.element.appendChild(aForeignObject.mInputElement);
                aForeignObject.mInputElement.focus();

                Globals.mTextArray.push(aForeignObject);
                
            
        }
        //___________________________
        private createSVGText(pForeignObject: asSvg.ForeignObject, pInput: HTMLInputElement) {
            pForeignObject.textField.textElement.style.display = "block";
            pForeignObject.textField.x = pForeignObject.x ;
            pForeignObject.textField.y = pForeignObject.y ;
            pForeignObject.textField.rotation = pForeignObject.rotation;
            pForeignObject.textField.text = pInput.value;
            pForeignObject.textField.fontSize = this.fontSize / this.mRotationPanel.scaleX;
            pForeignObject.textField.textElement.setAttribute("fill", pForeignObject.mInputElement.style.color);
            pForeignObject.textField.textElement.setAttribute("font-family", "Arial");
     
            
        }
        //________________________
        private expandTextBox(pInput: HTMLInputElement) {

            //  pInput.style.width = (pInput.value.length + 1) * (this.fontSize / this.mRotationPanel.scaleX ) +"px";
            pInput.size = pInput.value.length + 1;
        }
        //___________________________________________
        private onMouseDown(pMouseEvent) {
            this.mMouseDown = true;

            if (Globals.isDragMode) {
                this.mMovePanel.startDrag(false,()=> this.setImageInBound());
                return;
            }
            let aShape: asSvg.Shape = new asSvg.Shape();
            if (Globals.mDrawingShapes == null) {
                Globals.mDrawingShapes = new Array<asSvg.Shape>();
            }
            Globals.mDrawingShapes.push(aShape);
            this.mDrawPanel.addChild(aShape);
            aShape.setFill(null);
            aShape.setLineStyle(this.mLineWidth / this.mRotationPanel.scaleX, parseInt(this.mDrawColor));
            aShape.addEventListener("click", (pShape) => this.onSelectShape(aShape),this);
            aShape.moveTo(this.mMovePanel.mouseX, this.mMovePanel.mouseY)
        }
        //__________________________________________
        private setTextPoint(pMouseEvent) {
            if (Globals.isTextMode) {
                this.msetTextPoint = {};
                this.msetTextPoint.x = this.mMovePanel.mouseX;
                this.msetTextPoint.y = this.mMovePanel.mouseY;
              
                this.setText();
                Globals.isTextMode = false;
                this.mTextButton.classList.remove("active");
            }
        }
        //_____________________________________
        private onMouseMove(pMouseEvent) {
            if (!this.mMouseDown) {
                return;
            }
            if (!Globals.isDragMode && Globals.isDrawMode) {
                let aCurrentShape: asSvg.Shape = Globals.mDrawingShapes[Globals.mDrawingShapes.length - 1];
                aCurrentShape.element.setAttribute("stroke", this.mDrawColor);
                aCurrentShape.setLineStyle(this.mLineWidth / this.mRotationPanel.scaleX);
                aCurrentShape.lineTo(this.mMovePanel.mouseX, this.mMovePanel.mouseY);
            }
            
        }
        //_____________________________________
        private setImageInBound() {

            if (this.isOriginalRatio) {
                this.setImageInBoundOriginal();
            }
            else {
                this.setImageInBoundTransform();
            }

        }
        //_____________________
        private setImageInBoundOriginal() {
            
         var aX = this.mMovePanel.x;
         var aY = this.mMovePanel.y;
         var aImageRect = this.mMovePanel.getBounds();
         var aConRect = this.mImageContainer.getBoundingClientRect();
           
            if (this.mWidthOriginalScale >= this.mRotationPanel.scaleX) {
                this.mMovePanel.x = 0;
            } else {
                let aPanelWidth: number = this.mImgWidth * this.mRotationPanel.scaleX;
                let aMaxX = (aPanelWidth / 2 - aConRect.width / 2) / this.mRotationPanel.scaleX;
                console.log("aPanelWidth = " + aPanelWidth + " --- " + aImageRect.width)
                if (this.mMovePanel.x > aMaxX) {
                    this.mMovePanel.x = aMaxX
                }
                if (this.mMovePanel.x < -aMaxX) {
                    this.mMovePanel.x = -aMaxX
                }
            }
            if (this.mHeightOriginalScale >= this.mRotationPanel.scaleY) {
                this.mMovePanel.y = 0;
            } else {
                let aPanelHight: number = this.mImgHeight * this.mRotationPanel.scaleX;
                let aMaxY = (aPanelHight / 2 - aConRect.height / 2) / this.mRotationPanel.scaleX
                console.log("aPanelWidth = " + aPanelHight + " --- " + aImageRect.height)
                if (this.mMovePanel.y > aMaxY) {
                    this.mMovePanel.y = aMaxY
                }
                if (this.mMovePanel.y < -aMaxY) {
                    this.mMovePanel.y = -aMaxY
                }
            }

            

        }
        //__________________________________________
        private setImageInBoundTransform() {
            
            var aImageRect = this.mMovePanel.getBounds();
            var aConRect = this.mImageContainer.getBoundingClientRect();

            if (this.mWidthTransformScale >= this.mRotationPanel.scaleX) {
                this.mMovePanel.y = 0;
            }
            else {
                let aPanelWidth: number = this.mImgHeight * this.mRotationPanel.scaleX;
                let aMaxX = (aPanelWidth / 2 - aConRect.width / 2) / this.mRotationPanel.scaleX;
                console.log("aPanelWidth = " + aPanelWidth + " --- " + aImageRect.width)
                if (this.mMovePanel.y > aMaxX) {
                    this.mMovePanel.y = aMaxX
                }
                if (this.mMovePanel.y < -aMaxX) {
                    this.mMovePanel.y = -aMaxX
                }
            }
            if (this.mHeightTransformScale >= this.mRotationPanel.scaleY) {
                this.mMovePanel.x = 0;
            }
            else {
                let aPanelHight: number = this.mImgWidth * this.mRotationPanel.scaleX;
                let aMaxY = (aPanelHight / 2 - aConRect.height / 2) / this.mRotationPanel.scaleX
                console.log("aPanelWidth = " + aPanelHight + " --- " + aImageRect.height)
                if (this.mMovePanel.x > aMaxY) {
                    this.mMovePanel.x = aMaxY
                }
                if (this.mMovePanel.x < -aMaxY) {
                    this.mMovePanel.x = -aMaxY
                }
            }
        }
        //_____________________________________
        private onMouseUp(pMouseEvent) {
            this.mMouseDown = false;
            this.mMousePoint = null;
            this.mMovePanel.stopDrag();
        }
        //________________________________________
        private onMouseWheel(e: any) {
            ImageDrawing.isZoomed = true;
            this.scale(e.wheelDelta / 10000 * this.mRotationPanel.scaleX);
        }
        //__________________________________
        private scale(pVal) {
            let aNextScale: number = this.mRotationPanel.scaleX + pVal * this.mRotationPanel.scaleX * 2;
            if (aNextScale > this.minImgScale) {
                this.mRotationPanel.setScale(this.mRotationPanel.scaleX + pVal);
            } else {
                ImageDrawing.isZoomed = false;
                this.mRotationPanel.setScale(this.minImgScale);
            }
            this.setImageInBound();
            this.adjustDrawPanelAfterScale();
        }
        //___________________________________________
        private adjustDrawPanelAfterScale() {
            for (let i = 0; i < Globals.mDrawingShapes.length; i++) {
                Globals.mDrawingShapes[i].setLineStyle(this.mLineWidth / this.mRotationPanel.scaleX);
            }
            if (ImageDrawing.FIX_TEXT_TO_ZOOM){
                for (let i = 0; i < Globals.mTextArray.length; i++) {
                    Globals.mTextArray[i].mInputElement.style.fontSize = this.fontSize / this.mRotationPanel.scaleX + "px";
                    //Globals.mTextArray[i].mInputElement.style.height = 64 / this.mRotationPanel.scaleX + "px";
                    // Globals.mTextArray[i].mInputElement.style.outlineWidth = ((Globals.mTextArray[i].mInputElement.value.length + 1) * (this.fontSize / this.mRotationPanel.scaleX)) / 10 + "px";
                    //  Globals.mTextArray[i].mInputElement.style.width = (Globals.mTextArray[i].mInputElement.value.length + 1) * (this.fontSize / this.mRotationPanel.scaleX) + "px";
                }
            }
        }
        //_____________________________________
        private adjustTextPanelAfterRotation() {
           
            for (let i = 0; i < Globals.mTextArray.length; i++) {
              
               Globals.mTextArray[i].rotation = - this.mRotationPanel.rotation;
               var aTemp = Globals.mTextArray[i].x;
               Globals.mTextArray[i].x = Globals.mTextArray[i].y;
             
               Globals.mTextArray[i].y = aTemp;

               Globals.mTextArray[i].textField.rotation = - this.mRotationPanel.rotation;
               var aTemp1 = Globals.mTextArray[i].textField.x;
               Globals.mTextArray[i].textField.x = Globals.mTextArray[i].textField.y;
         
               Globals.mTextArray[i].textField.y = aTemp1;
            }
        }
        //_________________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public select():void{
            if (!Globals.isSelectMode) {
                Globals.isSelectMode = true;
            }
            else
                Globals.isSelectMode = false;
        }
        //__________________________________________
        private onSelectShape(pShape: asSvg.Shape) {
            if (Globals.isSelectMode && !Globals.isItemSelected) {
                for (let i = 0; i < Globals.mDrawingShapes.length; i++) {
                    if (Globals.mDrawingShapes[i] != pShape) {
                        Globals.mDrawingShapes[i].alpha = 0.5;
                    }

                }
                for (let i = 0; i < Globals.mTextArray.length; i++) {
                        Globals.mTextArray[i].alpha = 0.5;   
                }
                pShape.parent.addChild(pShape);
                Globals.isItemSelected = true;
                this.mDrawingController.onSelectShape(pShape);
            }
        }
        //____________________________________________
        private onSelectText(pEvent,pText: asSvg.ForeignObject)
        {
            if (Globals.isSelectMode && !Globals.isItemSelected) {
                for (let i = 0; i < Globals.mDrawingShapes.length; i++) {
                        Globals.mDrawingShapes[i].alpha = 0.5;
                }
                for (let i = 0; i < Globals.mTextArray.length; i++) {
                    if (Globals.mTextArray[i] != pText) {
                        Globals.mTextArray[i].alpha = 0.5;
                    }
                }
                Globals.isItemSelected = true;
               // pText.parent.addChild(pText);
                this.mDrawingController.onSelectText(pText);
            }
            else if (!Globals.isTextMode){
                pEvent.preventDefault();
                pEvent.stopPropagation();
                $(pText.mInputElement).blur();
                
            };
        }
        //___________________________________________
        /**
         * 
         * 
         * @readonly
         * @type {number}
         * @memberOf ImageDrawing
         */
        public get minImgScale():number {
            if (this.isOriginalRatio) {
                return this.mMinOriginalScale;
            }
            else {
                return this.mMinTransformScale;
            }
        }
        //____________________________________________
        /**
         * 
         * 
         * @readonly
         * @type {boolean}
         * @memberOf ImageDrawing
         */
        public get isOriginalRatio(): boolean {
            let aVal =  this.mCurrentAngle % 36;
            return (aVal == 0);
        }
    
        //_________________________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public convertInuptToSVG():void {
            for (let i = 0; i < Globals.mTextArray.length; i++)
            {
                // this.onFocusOutText()
                (Globals.mTextArray[i].element as HTMLInputElement).style.display = "none";
                this.createSVGText(Globals.mTextArray[i], Globals.mTextArray[i].mInputElement);
            }
        }
        //_______________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public convertSVGToInput():void {
            for (let i = 0; i < Globals.mTextArray.length; i++) {
                
                (Globals.mTextArray[i].element as HTMLInputElement).style.display = "block";
                Globals.mTextArray[i].textField.text = "";
               
            }
        }
        //_______________________________________
        /**
         * 
         * 
         * @param {boolean} pIsFullScreen-true:minimize,false:maximize 
         * 
         * @memberOf ImageDrawing
         */
        public onFullScreen(pIsFullScreen: boolean): void {
            if (!pIsFullScreen) {
                this.resizeStage(window.innerWidth, window.innerHeight);
               
            }
            else {
                this.resizeStage(this.mOrginalContainerWidth, this.mOrginalContainerHeight);
               
            }
            
         
        }
     

        /**
         * 
         * 
         * @param {number} pWidth 
         * @param {number} pHeight 
         * 
         * @memberOf ImageDrawing
         */
        public resizeStage(pWidth:number, pHeight:number):void{
            this.mImageContainer.style.width = pWidth + "px";
            this.mImageContainer.style.height = pHeight + "px";
            this.mSVGStage.setSize(pWidth, pHeight);
            this.mRotationPanel.x = pWidth / 2;
            this.mRotationPanel.y = pHeight / 2;
            this.getMinScale();
            if (this.mRotationPanel.scaleX < this.minImgScale) {
                this.mRotationPanel.setScale(this.minImgScale);
            }
            this.setImageInBound();
        }
        //_____________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public resetRotationAndScale():void {
            this.mRotationPanel.rotation = 0;
            this.mCurrentAngle = this.mRotationPanel.rotation;

            if (this.mRotationPanel.scaleX < this.minImgScale) {
                this.mRotationPanel.setScale(this.minImgScale);
            }
            this.adjustTextPanelAfterRotation();
            this.setImageInBound();

            this.mRotationPanel.setScale(this.minImgScale);
            this.setImageInBound();
            this.adjustDrawPanelAfterScale();
        }
        //_______________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public set fontsize(pFontSize:number) {
            this.fontSize = pFontSize;
        }
        //__________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public set lineWidth(pLineWidth:number) {
            this.mLineWidth = pLineWidth;
        }
        //_____________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public set orginalScale(pScale: number) {
            this.mMinOriginalScale = pScale;
        }
        //____________________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageDrawing
         */
        public set currentAngle(pAngle: number) {
            this.mCurrentAngle = pAngle;
        }
    }
   
}