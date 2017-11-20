/// <reference path="imagesave.ts" />

module image {
    /**
     * Class that managaes downloading of images from URL
     * 
     * @export
     * @class ImageSaveCombineCanvas
     * @extends {ImageSave}
     */
    export class ImageSaveCombineCanvas extends ImageSave {
        private mPrevY: number;
        private mPrevRotation: number;
        private mPrevX: number;
        private mPrevScale: number;
        private mCanvas: HTMLCanvasElement;
        private mImage: HTMLImageElement;

        constructor(pImageDrawing) {
            super(pImageDrawing);
        }
        //____________________________________________________
        public getImage() {
            this.mImageDrawing.convertInuptToSVG();
           this.mPrevScale = this.mImageDrawing.mRotationPanel.scaleX;
           this.mPrevX = this.mImageDrawing.mMovePanel.x;
           this.mPrevY = this.mImageDrawing.mMovePanel.y;
           this.mPrevRotation = this.mImageDrawing.mRotationPanel.rotation;
            this.mImageDrawing.mRotationPanel.scaleX = this.mImageDrawing.minImgScale;
            this.mImageDrawing.mRotationPanel.scaleY = this.mImageDrawing.minImgScale;
            this.mImageDrawing.mMovePanel.x = 0;
            this.mImageDrawing.mMovePanel.y = 0;
            this.mImageDrawing.mRotationPanel.rotation = 0;
            this.mImage = this.mStage.getImage();
            this.mImage.onload = () => this.saveImage();
        }
        //____________________________________________________
        public getCroppedImage(pRect: asSvg.Rect) {
            this.mImageDrawing.convertInuptToSVG();
            this.mPrevScale = this.mImageDrawing.mRotationPanel.scaleX;
            this.mPrevX = this.mImageDrawing.mMovePanel.x;
            this.mPrevY = this.mImageDrawing.mMovePanel.y;
            this.mPrevRotation = this.mImageDrawing.mRotationPanel.rotation;
            this.mImageDrawing.mRotationPanel.scaleX = this.mImageDrawing.minImgScale;
            this.mImageDrawing.mRotationPanel.scaleY = this.mImageDrawing.minImgScale;
            this.mImageDrawing.mMovePanel.x = 0;
            this.mImageDrawing.mMovePanel.y = 0;
            this.mImageDrawing.mRotationPanel.rotation = 0;
            let aRectBounds = pRect.getBounds();
            pRect.visible = false;
            this.mImage = this.mStage.getImage();
            this.mImage.onload = () => this.saveCroppedImage(aRectBounds);
        }
        //____________________________________
        public saveCroppedImage(pRect: ClientRect) {
            let aCanvas: HTMLCanvasElement = document.createElement("canvas");;
            aCanvas.width = this.mImage.naturalWidth;
            aCanvas.height = this.mImage.naturalHeight;
            let aContext: CanvasRenderingContext2D = aCanvas.getContext("2d");
            aContext.drawImage(this.mImage, 0, 0);
            this.mImageDrawing.HTMLImage;
            this.mCanvas = this.combineImageAndCanvas(this.mImageDrawing.HTMLImage, aCanvas)
            let aRectBounds = pRect;
            let aCropX= (pRect.left - Globals.ImageDrawing.mImage.getBounds().left) / Globals.ImageDrawing.minImgScale;
            let aCropY = (pRect.top - Globals.ImageDrawing.mImage.getBounds().top) / Globals.ImageDrawing.minImgScale;
            let aSaveCanvas = document.createElement("canvas");
            aSaveCanvas.width = aRectBounds.width / Globals.ImageDrawing.minImgScale;
            aSaveCanvas.height = aRectBounds.height /Globals.ImageDrawing.minImgScale;
            let aSaveContext = aSaveCanvas.getContext("2d");
            aSaveContext.drawImage(this.mCanvas, aCropX, aCropY, aRectBounds.width /Globals.ImageDrawing.minImgScale, aRectBounds.height/ Globals.ImageDrawing.minImgScale, 0, 0, aRectBounds.width / Globals.ImageDrawing.minImgScale, aRectBounds.height / Globals.ImageDrawing.minImgScale);
            let aDataURL: string = aSaveCanvas.toDataURL();
            this.mImageDrawing.convertSVGToInput();
            let aAction = new action.CropAction(this.mImageDrawing.HTMLImage.src, aDataURL, (pSrc, p, d, e,g,f,h) => this.mImageDrawing.setPicture(pSrc, p, d, e,g,f,h), this.mPrevRotation, this.mPrevRotation, this.mPrevScale, this.mPrevX, this.mPrevY);
            Globals.ActionManager.addAction(aAction);
            Globals.cropCounter++;
            this.mImageDrawing.setPicture(aDataURL, this.mPrevRotation,1);
        }
        //_____________________________________
        protected saveImage() {
            let aCanvas: HTMLCanvasElement = document.createElement("canvas");;
            aCanvas.width = this.mImage.naturalWidth;
            aCanvas.height = this.mImage.naturalHeight;
            let aContext: CanvasRenderingContext2D = aCanvas.getContext("2d");
            aContext.drawImage(this.mImage, 0, 0);
            this.mImageDrawing.HTMLImage;
            this.mCanvas = this.combineImageAndCanvas(this.mImageDrawing.HTMLImage, aCanvas)
            let aDataURL: string = this.mCanvas.toDataURL();
            this.downloadImage(aDataURL);
            this.mImageDrawing.mRotationPanel.scaleX = this.mPrevScale;
            this.mImageDrawing.mRotationPanel.scaleY = this.mPrevScale;
            this.mImageDrawing.mMovePanel.x = this.mPrevX;
            this.mImageDrawing.mMovePanel.y = this.mPrevY;
            this.mImageDrawing.mRotationPanel.rotation = this.mPrevRotation;
        }
        //_____________________________________________________________
        public combineImageAndCanvas(pImage: HTMLImageElement, pDrawing: HTMLCanvasElement): HTMLCanvasElement {
            let aCanvasToReturn: HTMLCanvasElement;
            let aAngle: number = Globals.angle;
            let aScaleFactor: number = 1;

            let aAllImageWidth: number = pImage.naturalWidth;
            let aAllImageHeight: number = pImage.naturalHeight;

            aCanvasToReturn = document.createElement('canvas') as HTMLCanvasElement;
            aCanvasToReturn.width = pImage.naturalWidth;
            aCanvasToReturn.height = pImage.naturalHeight;
            let ctxToSave: CanvasRenderingContext2D = aCanvasToReturn.getContext("2d") as CanvasRenderingContext2D;
            ctxToSave.drawImage(pImage, 0, 0);
            let aScale: number = 1 / this.mImageDrawing.minImgScale;
            let aWidth: number = pDrawing.width * aScale;
            let aHeight: number = pDrawing.height * aScale;
            let aX = (aWidth - pImage.naturalWidth) / 2
            let aY = (aHeight - pImage.naturalHeight) / 2
            ctxToSave.drawImage(pDrawing, 0, 0, pDrawing.width, pDrawing.height, -aX, -aY, aWidth, aHeight);
            return aCanvasToReturn;
        }
     

    }
}