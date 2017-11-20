/// <reference path="../../../scripts/jquery.d.ts" />



module image {
    /**
     * 
     * 
     * @export
     * @class ImageDrawing
     */
    export class ImageDrawing {
        public static zoom_timeout: number;
        public static FIX_TEXT_TO_ZOOM: boolean = true;
        public static SCALE_TO_MIN_AFTER_ROTATE: boolean = false;
        public static isZoomed: boolean = false;
        private fontSize = 25;
        public static LINE_WIDTH = 4;
        public mSVGStage: asSvg.Stage;
        public mRotationPanel: asSvg.Sprite;
        public mScalePanel: asSvg.Sprite;
        public mMovePanel: asSvg.Sprite;
        public mImageContainer: HTMLElement;
        public mImage: asSvg.Image;
        public HTMLImage: HTMLImageElement;
        private mHeightOriginalScale: number;
        private mWidthOriginalScale: number;
        private mHeightTransformScale: number;
        private mWidthTransformScale: number;
        private mMouseDown: boolean;
        private mMousePoint;
        public mDrawPanel: asSvg.Sprite;
        public mTextButton: HTMLElement;
        private msetTextPoint;
        public mDrawColor;
        private mMinOriginalScale: number;
        private mMinTransformScale: number;
        private mCurrentAngle = 0;
        public mImgHeight: number;
        public mImgWidth: number;
        private mOrginalContainerHeight;
        private mOrginalContainerWidth;
        private mHeightScale;
        private mWidthScale;
        public mSourceImage: HTMLImageElement;
        private mDrawingController: DrawingController;
        private mOriginalAngle: number = 0;
        private mOrginalScale: number
        private mImageCrop: image.ImageCrop;
        private isRightMouseDown: boolean = false;
        private mInputTimeout;
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
            this.mScalePanel = new asSvg.Sprite();
            this.mScalePanel.instanceName = "Scale Panel";
            this.mRotationPanel.addChild(this.mScalePanel);
            this.mMovePanel = new asSvg.Sprite();
          
            this.mMovePanel.instanceName = "Move Panel";

            this.mScalePanel.addChild(this.mMovePanel);
            (this.mSVGStage.element as any).onmousewheel = (pEvent) => this.onMouseWheel(pEvent);

            this.mDrawPanel = new asSvg.Sprite();
      
            //this.mMovePanel.addChild(this.mTextElement);

            (this.mSVGStage.element as any).addEventListener("click", (pEvent)=>this.setTextPoint(pEvent));
            (this.mSVGStage.element as any).onmousedown = (pEvent) => this.onMouseDown(pEvent);
            (this.mSVGStage.element as any).onmousemove = (pEvent) => this.onMouseMove(pEvent);
            window.onmouseup = (pEvent) => this.onMouseUp(pEvent);

            this.mDrawingController = new DrawingController();

        

            document.getElementById("cropButton").addEventListener("click", () => this.onCrop());
        }
        //___________________________________________________
        /**
         * Removes image from frame
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
            Globals.mCircles = new Array<shapes.Shape>();
            Globals.mTextArray = new Array<asSvg.ForeignObject>();
            Globals.currentShapeDragAction = null;
            Globals.currentDragAction = null;
            Globals.currentZoomAction = null;
            Globals.currentEditTextAction = null;
            Globals.currentTextDragAction = null;
            this.mDrawPanel.visible = true;
          
            this.mMovePanel.removeChildren();
            this.mRotationPanel.removeChildren();
            this.mRotationPanel.rotation = 0;

            this.mMovePanel = new asSvg.Sprite();
            this.mMovePanel.instanceName = "Move Panel";
            this.mRotationPanel.addChild(this.mMovePanel);
            Globals.currentShapeDragAction = null;
            Globals.currentDragAction = null;
            Globals.currentZoomAction = null;
            Globals.currentEditTextAction = null;
            Globals.currentTextDragAction = null;
     
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
        public setPicture(pURL: string, pAngle: number = 0, pScale: number = 1, pDrawingObjects: Array<shapes.Shape> = null,pTextArray: Array<asSvg.ForeignObject>=null,pX:number = 0, pY: number = 0) {
            this.removeImage();
            if (Globals.isUseBase64) {
                this.setPictureCanvas(pURL, pAngle, pScale, pDrawingObjects,pTextArray,pX,pY);
            }
            else {
                this.setPictureTest(pURL, pAngle, pScale, pDrawingObjects,pTextArray,pX,pY);
            }
        }
     
        //_______________________________________
        private setPictureTest(pURL: string, pAngle = 0, pScale: number = 1, pDrawingObjects = null,pTextArray=null, pX: number = 0,pY: number=0) {
            this.mImage = new asSvg.Image(pURL, (pData) => this.onImageLoadTest(pAngle, pScale, pDrawingObjects,pX,pY));
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
        private onImageLoadTest(pAngle: number = 0, pScale: number = 1, pDrawingObjects: Array<shapes.Shape> = null,pTextArray=null, pX: number=0,pY:number=0) {
            this.HTMLImage = document.createElement("img");
            this.HTMLImage.src = this.mImage.getPath();
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
                this.scale(this.mOrginalScale - this.minImgScale);
            }

            if (pX != 0 || pY != 0) {
                this.mMovePanel.x = pX;
                this.mMovePanel.y = pY;
                this.setImageInBound();
            }

            // add shapes after crop
            asBase.events.EventManager.dispatchEvent(Globals.ADD_SHAPES_AFTER_CROP, this);
            this.mImageCrop = new ImageCrop(this.mMovePanel);
            if (pDrawingObjects) {
                for (let i = 0; i < pDrawingObjects.length; i++) {
                    pDrawingObjects[i].addToSprite(this.mDrawPanel);
                    Globals.mCircles.push(pDrawingObjects[i]);
                }

            }

            if (pTextArray) {
                for (let i = 0; i < pTextArray.length; i++) {
                   
                    pTextArray[i].element.appendChild(pTextArray[i].mInputElement);
                    this.mDrawPanel.addChild(pTextArray[i]);
                
                    Globals.mTextArray.push(pTextArray[i]);

                    $(pTextArray[i].mInputElement).on("focusin", (pEvent, pTextElement) => this.onSelectText(pEvent, pTextArray[i]));
                    pTextArray[i].mInputElement.addEventListener("input", (pTextElement) => this.onInputText(pTextArray[i]));
                    pTextArray[i].mInputElement.oninput = (pInput) => this.expandTextBox(pTextArray[i].mInputElement);
                    pTextArray[i].element.style.display = "block";
                }
            }

        }
        //__________________________________________
        private setPictureCanvas(pURL: string, pAngle = 0, pScale: number = 1, pDrawingObjects=null,pTextArray=null, pX: number=0,pY:number=0) {
            this.mSourceImage = document.createElement("img");
            this.mSourceImage.src = pURL;
            this.mSourceImage.onload = (pData) => this.onImageLoadCanvas(pAngle, pScale, pDrawingObjects,pTextArray,pX,pY);
        }
        //______________________________________________
        private onImageLoadCanvas(pAngle: number = 0, pScale: number = 1, pDrawingObjects: Array<shapes.Shape>=null,pTextArray=null ,pX: number = 0,pY: number=0) {

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


            if (pAngle != 0) {
                this.rotate(pAngle);
            }
            if (this.mOrginalScale != 1) {
                this.scale(this.mOrginalScale - this.minImgScale);
            }

            if (pX != 0 && pY != 0) {
                this.mMovePanel.x = pX;
                this.mMovePanel.y = pY;
            }
            // add shapes after crop
            asBase.events.EventManager.dispatchEvent(Globals.ADD_SHAPES_AFTER_CROP, this);
            this.mImageCrop = new ImageCrop(this.mMovePanel);
            if (pDrawingObjects) {
                for (let i = 0; i < pDrawingObjects.length; i++) {
                    pDrawingObjects[i].addToSprite(this.mDrawPanel);
                      Globals.mCircles.push(pDrawingObjects[i]);
                    }
                  
            }
            if (pTextArray) {
                for (let i = 0; i < pTextArray.length; i++) {
                   
                    pTextArray[i].element.appendChild(pTextArray[i].mInputElement);
                    this.mDrawPanel.addChild(pTextArray[i]);
                    
                    Globals.mTextArray.push(pTextArray[i]);

                    $(pTextArray[i].mInputElement).on("focusin", (pEvent, pTextElement) => this.onSelectText(pEvent, pTextArray[i]));
                    pTextArray[i].mInputElement.addEventListener("input", (pTextElement) => this.onInputText(pTextArray[i]));
                    pTextArray[i].mInputElement.oninput = (pInput) => this.expandTextBox(pTextArray[i].mInputElement);
                }
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
         * Rotates the sprite
         * 
         * @param {number} pAngle -angle to rotate image
         * im
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
        //_________________________
        private onCrop() {
            Globals.isCropMode = true;
        }
        //_____________________________________
        /**
         * Starts sribbling on the image
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
         * Clears all shapes and text from the image
         * 
         * 
         * @memberOf ImageDrawing
         */
        public clearAll(): void{
            let aAction = new action.ClearAllAction(this.mDrawPanel);
            Globals.ActionManager.addAction(aAction);
            this.mDrawPanel.removeChildren();
            Globals.mCircles = new Array<shapes.Shape>();
            Globals.mTextArray = new Array<asSvg.ForeignObject>();
        }
        //____________________________
        /**
         * Changes the draw color
         * 
         * @param {string} pColor -Color to change to
         * 
         * @memberOf ImageDrawing
         */
        public changeColor(pColor: string) {
            this.mDrawColor = pColor;
        }
        //_____________________________________
        /**
         * 
         * Sets the mode to text mode
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
           
                this.mDrawPanel.addChild(aTextElement);

                let aForeignObject: asSvg.ForeignObject = new asSvg.ForeignObject();
                aForeignObject.x = this.msetTextPoint.x;
                aForeignObject.y = this.msetTextPoint.y;
                aForeignObject.setWidth(10);
                aForeignObject.setHeight(10);

                this.mDrawPanel.addChild(aForeignObject);
                aForeignObject.mInputElement = document.createElement("input");
                aForeignObject.mInputElement.size = 1;
                //  $(aForeignObject.mInputElement).on("focusout", (pForeign) => this.onFocusOutText(aForeignObject, aForeignObject.mInputElement));
                $(aForeignObject.mInputElement).on("focusin", (pEvent, pTextElement) => this.onSelectText(pEvent, aForeignObject));
                aForeignObject.mInputElement.addEventListener("input", (pTextElement) => this.onInputText(aForeignObject));
              
                aForeignObject.mInputElement.oninput = (pInput) => this.expandTextBox(aForeignObject.mInputElement);
                aForeignObject.mInputElement.type = "text";
                aForeignObject.mInputElement.className = "imageTextBox";
                aForeignObject.mInputElement.style.fontSize = this.fontSize / this.mRotationPanel.scaleX + "px";
                aForeignObject.mInputElement.style.color = this.mDrawColor;

                aForeignObject.textField = aTextElement;
                aForeignObject.textField.textElement.style.display = "none";
               // aForeignObject.rotation = -this.mRotationPanel.rotation;
                // aForeignObject.mInputElement.setAttribute("outline","dashed black")


                aForeignObject.element.appendChild(aForeignObject.mInputElement);
                aForeignObject.mInputElement.focus();

                Globals.mTextArray.push(aForeignObject);

                //add action to action array
                let aAction = new action.TextAction(this.mDrawPanel, aForeignObject);
                Globals.ActionManager.addAction(aAction);
            
        }
        //___________________________
        private createSVGText(pForeignObject: asSvg.ForeignObject, pInput: HTMLInputElement) {
            this.mDrawPanel.addChild(pForeignObject.textField);
            pForeignObject.textField.textElement.style.display = "block";

            pForeignObject.textField.element.appendChild(pForeignObject.textField.textElement);
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
        private onMouseDown(pMouseEvent: MouseEvent) {
            if (pMouseEvent.which != 1) {
                this.onRightMouseDown();
                return;
            }
            this.mMouseDown = true;
          
            //crop mode
            if (Globals.isCropMode) {
                this.mImageCrop.onMousedown(pMouseEvent);
                return;
            }
            //draw a circle
            if (Globals.isCircleMode) {
                let aCircle = new shapes.Circle(this.mDrawPanel, this.mDrawColor);
                Globals.mCircles.push(aCircle);
                aCircle.onMouseDown(pMouseEvent);
                let aAction = new action.DrawAction(this.mDrawPanel, aCircle);
                Globals.ActionManager.addAction(aAction);
                return;
            }
            // draw an arrow
            if (Globals.isArrowMode) {
                let aArrow = new shapes.Arrow(this.mDrawPanel, this.mDrawColor);
                Globals.mCircles.push(aArrow);
                aArrow.onMouseDown(pMouseEvent);
                let aAction = new action.DrawAction(this.mDrawPanel, aArrow);
                Globals.ActionManager.addAction(aAction);
                return;
            }
            //draw a scribble
            if (Globals.isDrawMode) {
                //scribble mode
                let aShape: shapes.Scribble = new shapes.Scribble(this.mDrawPanel, this.mDrawColor, ImageDrawing.LINE_WIDTH);
                Globals.mCircles.push(aShape);
                Globals.mCircles[Globals.mCircles.length - 1].onMouseDown(pMouseEvent);
                let aAction = new action.DrawAction(this.mDrawPanel, aShape);
                Globals.ActionManager.addAction(aAction);
            }

            


        }
        //__________________________________________
        private onRightMouseDown() {
            this.isRightMouseDown = true;
            Globals.isDragMode = true;
            this.mMovePanel.startDrag(false, () => this.setImageInBound());
            let aPoint = new asBase.math.Point(this.mMovePanel.x, this.mMovePanel.y);
            Globals.currentDragAction = new action.DragAction(aPoint, this.mMovePanel, () => this.setImageInBound());
        }
        //__________________________________________
        private setTextPoint(pMouseEvent: MouseEvent) {
            console.log("client x :" + pMouseEvent.clientX + "   client y :" + pMouseEvent.clientY);
            if (Globals.isTextMode && this.isMouseInBound(pMouseEvent)) {
                this.msetTextPoint = {};
                this.msetTextPoint.x = this.mMovePanel.mouseX;
                this.msetTextPoint.y = this.mMovePanel.mouseY;
              
                this.setText();
                Globals.isTextMode = false;
                this.mTextButton.classList.remove("active");
            }
        }
        //_____________________________________
        private onMouseMove(pMouseEvent: MouseEvent) {
           if (!this.mMouseDown || pMouseEvent.which != 1) {
                return;
            }
            //crop mode
            if (Globals.isCropMode) {
                this.mImageCrop.onMouseMove(pMouseEvent);
                return;
            }
            //draw a circle
            if (Globals.isCircleMode)
            {
             Globals.mCircles[Globals.mCircles.length - 1].onMouseMove(pMouseEvent);
            }
            // draw an arrow
            if (Globals.isArrowMode) {
             Globals.mCircles[Globals.mCircles.length - 1].onMouseMove(pMouseEvent);

            }
            //scribble
            if (!Globals.isDragMode && Globals.isDrawMode) {
            let aCurrentShape = Globals.mCircles[Globals.mCircles.length - 1];
            aCurrentShape.onMouseMove(pMouseEvent);
                }
        }
        //______________________________
        private isTextInBound(pText: asSvg.ForeignObject) {
  
            let image = document.getElementById("image");
            let aImageRect = image.getBoundingClientRect();
            let aTextRect = pText.mInputElement.getBoundingClientRect();
           
            if ((aTextRect.left < aImageRect.left || aTextRect.right > aImageRect.right || aTextRect.top < aImageRect.top || aTextRect.bottom > aImageRect.bottom) && Globals.isDrawInBound) {
                return false;
            }
            else {
                return true;
            }
        }
        //______________________________
     
        //______________________________
        private onInputText(pText: asSvg.ForeignObject) {
            if (!this.isTextInBound(pText))
            {
               // pText.mInputElement.value = pText.mInputElement.value.slice(0, pText.mInputElement.value.length - 1);
                console.log("text out of bounds");
                return;
            }

//            pText.oldValue = pText.mInputElement.value;
            if (this.mInputTimeout) {
                clearTimeout(this.mInputTimeout);
            }
            else {
                Globals.currentEditTextAction = new action.editTextAction(pText, pText.mInputElement.value);
            }
            this.mInputTimeout = setTimeout((aText) => this.addEditTextAction(pText), 1000);
        }
            
        //_________________________________________
        private addEditTextAction(pText: asSvg.ForeignObject) {
            this.mInputTimeout = null;
          
            if (Globals.currentEditTextAction && !Globals.currentEditTextAction.isAdded) {
              
                Globals.currentEditTextAction.newValue = pText.mInputElement.value;
                Globals.ActionManager.addAction(Globals.currentEditTextAction);
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
            
    
         var aImageRect = this.mMovePanel.getBounds();
         var aConRect = this.mImageContainer.getBoundingClientRect();
           
            if (this.mWidthOriginalScale >= this.mRotationPanel.scaleX) {
                this.mMovePanel.x = 0;
            } else {
                let aPanelWidth: number = this.mImgWidth * this.mRotationPanel.scaleX;
                let aMaxX = (aPanelWidth / 2 - aConRect.width / 2) / this.mRotationPanel.scaleX;
                
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
                
                if (this.mMovePanel.x > aMaxY) {
                    this.mMovePanel.x = aMaxY
                }
                if (this.mMovePanel.x < -aMaxY) {
                    this.mMovePanel.x = -aMaxY
                }
            }
        }
       
    
        
        

        //________________________________
        public clearImgSrc() {
            if (this.mSourceImage) {
                this.mSourceImage.onload = () => { };
            }
            if (this.HTMLImage) {
                this.HTMLImage.onload = () => { };
            }
        }
        //___________________________________________
        private isMouseInBound(pMousEvent: MouseEvent): boolean {
            let image = document.getElementById("image");
            let aImageRect = image.getBoundingClientRect();
            if ((pMousEvent.clientX < aImageRect.left || pMousEvent.clientX > aImageRect.right || pMousEvent.clientY < aImageRect.top || pMousEvent.clientY > aImageRect.bottom) && Globals.isDrawInBound) {
                return false;
            }
            else {
                return true;
            }

        }
        //_____________________________________
        public onMouseUp(pMouseEvent: MouseEvent) {
            if (pMouseEvent.which != 1)
            {
                this.onRightMouseUp();
            }
            this.mMouseDown = false;
            this.mMousePoint = null;
       

            //crop mode
            if (Globals.isCropMode) {
                this.mImageCrop.onMouseUp();
                return;
            }
            //draw a circle
            if (Globals.isCircleMode){
                Globals.mCircles[Globals.mCircles.length - 1].onMouseUp();
                return;
            }
            //draw an arrow
            if (Globals.isArrowMode) {
                Globals.mCircles[Globals.mCircles.length - 1].onMouseUp();
                return;
            }
            if (Globals.isDrawMode) {
                //draw a shape
                Globals.mCircles[Globals.mCircles.length - 1].onMouseUp();
                return;
            }
           
        }
        //_____________________________________
        private onRightMouseUp() {
            this.isRightMouseDown = false;
            Globals.isDragMode = false;
            this.mMovePanel.stopDrag();
            //add drag action
            if (Globals.currentDragAction && !Globals.currentDragAction.isAdded) {
                let aNewPosition = new asBase.math.Point(this.mMovePanel.x, this.mMovePanel.y);
                Globals.currentDragAction.newPosition = aNewPosition;
                Globals.ActionManager.addAction(Globals.currentDragAction);
            }

        }
        //________________________________________
        private onMouseWheel(e: any) {
            ImageDrawing.isZoomed = true;
            let aNewScale = e.wheelDelta / 10000 * this.mRotationPanel.scaleX;
            let aOldScale = -aNewScale;

            if (ImageDrawing.zoom_timeout && Globals.currentZoomAction) {
                clearTimeout(ImageDrawing.zoom_timeout);
                Globals.currentZoomAction.scale = aNewScale;
            }
            else {
                Globals.currentZoomAction = new action.ZoomAction(aOldScale, aNewScale, (pScale) => this.scale(pScale));
                console.log("add zoom action");
            }
            ImageDrawing.zoom_timeout = setTimeout((pAction) => this.addZoomAction(Globals.currentZoomAction), 500);
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

        //__________________________________
        private addZoomAction(pZoomAction: action.ZoomAction) {
            Globals.ActionManager.addAction(pZoomAction);
            ImageDrawing.zoom_timeout = null;
            Globals.currentZoomAction = null;
        }
      
        //___________________________________________
        private adjustDrawPanelAfterScale() {
            for (let i = 0; i < Globals.mCircles.length; i++) {
                Globals.mCircles[i].setLineWidth(ImageDrawing.LINE_WIDTH / this.mRotationPanel.scaleX);
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
      
      
        //____________________________________________
        private onSelectText(pEvent,pText: asSvg.ForeignObject)
        {
            if (!Globals.isItemSelected) {
              
                Globals.isItemSelected = true;
               
                this.mDrawingController.onSelectText(pText);
            }
            else if (!Globals.isTextMode){
                pEvent.preventDefault();
                pEvent.stopPropagation();
                $(pText.mInputElement).blur();
                Globals.currentEditTextAction = new action.editTextAction(pText, pText.mInputElement.value)
                
            }
        }

        //____________________________
        public onSelectShape(pShape: shapes.Shape) {
            this.mDrawingController.onSelectShape(pShape);
        }
        //__________________________________________
        public drawShapes(pShapes: Array<asSvg.DisplayObject>, pScale: number) {
           
        }
        //___________________________________
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
         * Expands the frame to full screem
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
         * Resizes the SVG stage
         * 
         * @param {number} pWidth -width to resize to
         * @param {number} pHeight -heigth to resize to
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
        public getCroppedBound() {
            let aRectBounds = this.mImageCrop.getCropBounds();
            return aRectBounds;
        }
        //____________________________________
        public getCroppedRect() {
            return this.mImageCrop.rect;
        }
        /**
         * 
         * Sets the font size of text objects
         * 
         * @memberOf ImageDrawing
         */
        public set fontsize(pFontSize:number) {
            this.fontSize = pFontSize;
        }
        //__________________________________
        /**
         * 
         * Sets the line width of shapes
         * 
         * @memberOf ImageDrawing
         */
        public set lineWidth(pLineWidth: number) {
            ImageDrawing.LINE_WIDTH = pLineWidth;
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