/// <reference path="imagesave.ts" />


module image{
    /**
     * Class that manages saving and downloading of base64 image
     * 
     * @export
     * @class ImageSaveCanvas
     * @extends {ImageSave}
     */
    export class ImageSaveCanvas extends ImageSave {
        protected mStage: asSvg.DisplayObject;
        protected mImage: HTMLImageElement;
        private mDrawingObjects: Array<asSvg.DisplayObject>;
        private mScale;
        private mPrevScale;
        private mPrevRotation;
        private mPrevY;
        private mPrevX;
        /**
         * Creates an instance of ImageSaveCanvas.
         * @param {any} pStage 
         * @param {any} pImageDrawing 
         * 
         * @memberOf ImageSaveCanvas
         */
        constructor(pImageDrawing) {
            super(pImageDrawing);

            asBase.events.EventManager.addEventListener(Globals.ADD_SHAPES_AFTER_CROP, () => this.onAddShapesAfterCrop(),this);
        
        }
        //____________________________
        /**
         * 
         * Download the image in the frame
         * 
         * @memberOf ImageSaveCanvas
         */
        public getImage(): void {
           
        
            this.mImageDrawing.convertInuptToSVG();
            this.mImage = this.mStage.getImage();
            this.mImage.onload = () => this.saveImage();
            

       
        }
        //____________________________________________________________
        /**
         * Downloads the image frame with the original angle,scale and size
         * 
         * 
         * @memberOf ImageSaveCanvas
         */
        public getFullImage():void{
            this.mImageDrawing.convertInuptToSVG();
             let aConRect = this.mImageDrawing.mImageContainer.getBoundingClientRect();
            let aPanelWidth: number = this.mImageDrawing.mImgWidth * this.mImageDrawing.mRotationPanel.scaleX;
            let aMaxX = (aPanelWidth / 2 - aConRect.width / 2) / this.mImageDrawing.mRotationPanel.scaleX;
            let aPanelHight: number = this.mImageDrawing.mImgHeight * this.mImageDrawing.mRotationPanel.scaleX;
            let aMaxY = (aPanelHight / 2 - aConRect.height / 2) / this.mImageDrawing.mRotationPanel.scaleX;

            this.mImage = this.mImageDrawing.mRotationPanel.getImage(1, aMaxX, aMaxY);
            this.mImage.onload = () => this.saveImage();
        }
        //_______________________________________________________________
        /**
         * Gets and saves the cropped image
         * 
         * @param {ClientRect} pRect 
         * 
         * @memberOf ImageSaveCanvas
         */
        public getCroppedImage(pRect: ClientRect) {
            this.mPrevScale = this.mImageDrawing.mRotationPanel.scaleX;
            this.mPrevRotation = this.mImageDrawing.mRotationPanel.rotation;
            this.mPrevX = this.mImageDrawing.mMovePanel.x;
            this.mPrevY = this.mImageDrawing.mMovePanel.y;
           // this.mDrawingObjects= this.mImageDrawing.getShapesInRect();
           // this.mImageDrawing.mDrawPanel.visible = false;
            this.mImageDrawing.convertInuptToSVG();
            this.mImage = this.mStage.getImage();
            this.mImage.onload = (p) => this.saveCroppedImage(pRect);
        }
        //_______________________________________________________________
        protected saveCroppedImage(pRect) {
            let aWidthScale = this.mImageDrawing.mImgWidth / pRect.width;
            let aHeightScale = this.mImageDrawing.mImgHeight / pRect.height;
            this.mScale = Math.min(aWidthScale, aHeightScale);

            let aCanvas: HTMLCanvasElement = document.createElement("canvas");;
           // aCanvas.width = this.mImage.naturalWidth;
            //aCanvas.height = this.mImage.naturalHeight;

            aCanvas.width = pRect.width * this.mScale;
            aCanvas.height = pRect.height * this.mScale;

            let aContext: CanvasRenderingContext2D = aCanvas.getContext("2d");

         //   aContext.drawImage(this.mImage, pRect.x, pRect.y, pRect.width, pRect.height, 0, 0, this.mImage.naturalWidth, this.mImage.naturalHeight);
            aContext.drawImage(this.mImage, pRect.x, pRect.y, pRect.width, pRect.height, 0, 0, pRect.width * this.mScale, pRect.height * this.mScale);

            let aDataURL: string = aCanvas.toDataURL();


            this.mImageDrawing.convertSVGToInput();
            let aAction = new action.CropAction(this.mImageDrawing.mSourceImage.src, aDataURL, (pSrc, p, d, e,g,f,h) => this.mImageDrawing.setPicture(pSrc, p, d, e,g,f,h), 0, this.mPrevRotation, this.mPrevScale, this.mPrevX, this.mPrevY);
            Globals.ActionManager.addAction(aAction);


            //for (let i = 0; i < this.mDrawingObjects.length; i++) {
            //    let aWidth = this.mDrawingObjects[i].element.getBoundingClientRect().width;
            //    let aHeight = this.mDrawingObjects[i].element.getBoundingClientRect().height;
            //    this.mDrawingObjects[i].setScale(aScale);
            //    this.mDrawingObjects[i].x = ((aWidth * aScale) - aWidth  / 2);
            //    this.mDrawingObjects[i].y = ((aHeight * aScale) - aHeight / 2);
            //}
        
            this.mImageDrawing.setPicture(aDataURL);

            
           
     


            
        }
        //______________________________________________________________
        protected saveFullImage() {
            let aCanvas: HTMLCanvasElement = document.createElement("canvas");
            aCanvas.width = this.mImageDrawing.mImgWidth;
            aCanvas.height = this.mImageDrawing.mImgHeight;
            let aContext: CanvasRenderingContext2D = aCanvas.getContext("2d");
            aContext.drawImage(this.mImage, 0, 0, this.mImageDrawing.mImgWidth, this.mImageDrawing.mImgHeight);
            let aDataURL: string = aCanvas.toDataURL();
            this.downloadImage(aDataURL);
        }
        //__________________________________________________________
        protected saveImage() {
            
            let aCanvas: HTMLCanvasElement = document.createElement("canvas");;
            aCanvas.width = this.mImage.naturalWidth;
            aCanvas.height = this.mImage.naturalHeight;
            let aContext: CanvasRenderingContext2D = aCanvas.getContext("2d");
            aContext.drawImage(this.mImage, 0, 0);

        
            let aDataURL: string = aCanvas.toDataURL();
            this.downloadImage(aDataURL);

        }
        //_____________________________________
        protected downloadImage(pImgData: string): any {
            let aLink: HTMLAnchorElement = document.createElement('a');
            let aId = "";
         
            aLink.target = '_blank';
           aLink.download = "TEST"//pc.pcContext.currentLocation.name + "_marked" + aId;


            let blob = ImageSave.dataURLtoBlob(pImgData);
            let objurl = URL.createObjectURL(blob);
            aLink.href = objurl;
          
               // pc.pcContext.eventsLogs.sendEventLog(pc.data.eventsType.save);//logs
            aLink.click();
            
          
            //oc.Utils.debugHTMLElement(this.mCanvasToSave, 500);
            //var afile = pc2d.AttachmentUtils.dataURLtoFile(pImgData, pFileName + '.png');
            //return afile;
            this.mImageDrawing.convertSVGToInput();

        }
        //_____________________________________________________________
        public  onAddShapesAfterCrop() {
            if (this.mDrawingObjects) {
                this.mImageDrawing.drawShapes(this.mDrawingObjects, this.mScale);

            }
        }
        //______________________________________________
        public static dataURLtoBlob(dataurl) {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        }



    }
}