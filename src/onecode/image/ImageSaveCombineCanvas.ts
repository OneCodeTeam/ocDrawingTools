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
        private mCanvas: HTMLCanvasElement;
        private aImage: HTMLImageElement;
        constructor(pImageDrawing) {
            super( pImageDrawing);
        }
        //____________________________________________________
        public getImage() {
            this.mImageDrawing.convertInuptToSVG();
            //this.mImageDrawing.resetRotationAndScale();
            this.mImage = this.mStage.getImage();
            this.mImage.onload = () => this.saveImage();
        }
        //____________________________________________________
        protected saveImage() {
            this.aImage = document.createElement("img");
            this.aImage.src = Globals.imgURL;
            this.aImage.onload = () => this.onLoadImage();
            
        }
        //__________________________________________
        private onLoadImage() {
            this.mCanvas = document.createElement("canvas");
            this.mCanvas.width = this.aImage.naturalWidth * this.mImageDrawing.mRotationPanel.scaleX

            this.mCanvas.height = this.aImage.naturalHeight * this.mImageDrawing.mRotationPanel.scaleX
          // this.aImage.width = this.aImage.naturalWidth * this.mImageDrawing.mRotationPanel.scaleX;
         //  this.aImage.height = this.aImage.naturalHeight * this.mImageDrawing.mRotationPanel.scaleX;
           //let aCanvas = this.combineImageAndCanvas(this.aImage, this.mCanvas);
          
            let aContext: CanvasRenderingContext2D = this.mCanvas.getContext("2d");

            aContext.drawImage(this.aImage,0,0, this.aImage.naturalWidth * this.mImageDrawing.mRotationPanel.scaleX, this.aImage.naturalHeight * this.mImageDrawing.mRotationPanel.scaleX);
            //this.adjustCanvas();

            aContext.drawImage(this.mImage, (this.aImage.naturalWidth * this.mImageDrawing.mRotationPanel.scaleX-this.mImage.width )/2 , this.aImage.naturalHeight * this.mImageDrawing.mRotationPanel.scaleX - this.mImage.height);

           




            //scale image to orginal size,

            var aTempCanvas = document.createElement("canvas");
           var tctx = aTempCanvas.getContext("2d");

           aTempCanvas.width = this.mCanvas.width;
           aTempCanvas.height = this.mCanvas.height;

           tctx.drawImage(this.mCanvas, 0, 0);

           this.mCanvas.width /= this.mImageDrawing.minImgScale;
           this.mCanvas.height /= this.mImageDrawing.minImgScale;
          // aContext.drawImage(aTempCanvas, 0, 0, this.mCanvas.width this.mImageDrawing.mRotationPanel.scaleX, this.mCanvas.height * this.mImageDrawing.mRotationPanel.scaleX,);




          //  //rotate image 
          // let aTempCanvas2 = document.createElement("canvas");
          // aTempCanvas2.width = this.mCanvas.width;
          // aTempCanvas2.height = this.mCanvas.height;
          // let aCtx = aTempCanvas2.getContext("2d");
          
          // aCtx.translate(this.mCanvas.width / 2, this.mCanvas.height / 2);
          // aCtx.rotate(Math.PI );
         
          // aCtx.drawImage(this.mCanvas, -this.mCanvas.width / 2,- this.mCanvas.height / 2);
          // aCtx.rotate(-Math.PI );
          //aCtx.translate(-this.mCanvas.width / 2, - this.mCanvas.height / 2);
         

           //aContext.scale(1 / this.mImageDrawing.minImgScale, 1 / this.mImageDrawing.minImgScale);
           let aDataURL: string = this.mCanvas.toDataURL();
           this.downloadImage(aDataURL);




           this.mImageDrawing.convertSVGToInput();


        }
        //___________________________________________________________
        private adjustCanvas() {
           this.mImage.width = this.mImage.width / this.mImageDrawing.minImgScale;
            this.mImage.height = this.mImage.height / this.mImageDrawing.minImgScale;
        }
        //_________________________________________
        public  combineImageAndCanvas(pImage: HTMLImageElement, pDrawing: HTMLCanvasElement): HTMLCanvasElement {
            let aCanvasToReturn: HTMLCanvasElement;
            let aAngle: number = Globals.angle;
            let aScaleFactor: number = 1;
           
            let aImageRect: ClientRect = pImage.getBoundingClientRect();
            let aCanvasRect: ClientRect = pDrawing.getBoundingClientRect();
    

            let aAllImageWidth: number = pImage.naturalWidth;
            let aAllImageHeight: number = pImage.naturalHeight;

            aCanvasToReturn = document.createElement('canvas') as HTMLCanvasElement;
            let ctxToSave: CanvasRenderingContext2D = aCanvasToReturn.getContext("2d") as CanvasRenderingContext2D;
            ctxToSave.save();
            let aMaxSize = 12000;
            let aScale;
            let aSize: number = Math.sqrt(aAllImageWidth * aAllImageWidth + aAllImageHeight * aAllImageHeight);
            if (aAngle == 0) {
                aScale = aImageRect.width / aAllImageWidth;
                if (aSize * aScale > aMaxSize) {
                    aScaleFactor = aMaxSize / (aSize * aScale);
                }
                aCanvasToReturn.width = aAllImageWidth * aScale * aScaleFactor;
                aCanvasToReturn.height = aAllImageHeight * aScale * aScaleFactor;
            }
            if (aAngle == 90) {
                aScale = aImageRect.width / aAllImageHeight;
                if (aSize * aScale > aMaxSize) {
                    aScaleFactor = aMaxSize / (aSize * aScale);
                }
                aCanvasToReturn.width = aAllImageHeight * aScale * aScaleFactor;
                aCanvasToReturn.height = aAllImageWidth * aScale * aScaleFactor;
                ctxToSave.rotate(aAngle * Math.PI / 180);
                ctxToSave.translate(0, -aAllImageHeight * aScale * aScaleFactor);
            }
            if (aAngle == 180) {
                aScale = aImageRect.width / aAllImageWidth;
                if (aSize * aScale > aMaxSize) {
                    aScaleFactor = aMaxSize / (aSize * aScale);
                }
                aCanvasToReturn.width = aAllImageWidth * aScale * aScaleFactor;
                aCanvasToReturn.height = aAllImageHeight * aScale * aScaleFactor;
                ctxToSave.rotate(aAngle * Math.PI / 180);
                ctxToSave.translate(-aAllImageWidth * aScale * aScaleFactor, -aAllImageHeight * aScale * aScaleFactor);
            }
            if (aAngle == 270) {
                aScale = aImageRect.width / aAllImageHeight;
                if (aSize * aScale > aMaxSize) {
                    aScaleFactor = aMaxSize / (aSize * aScale);
                }
                aCanvasToReturn.width = aAllImageHeight * aScale * aScaleFactor;
                aCanvasToReturn.height = aAllImageWidth * aScale * aScaleFactor;
                ctxToSave.rotate(aAngle * Math.PI / 180);
                ctxToSave.translate(-aAllImageWidth * aScale * aScaleFactor, 0);
            }
            ctxToSave.scale(aScale * aScaleFactor, aScale * aScaleFactor)
            ctxToSave.drawImage(pImage, 0, 0);
            ctxToSave.restore();
            ctxToSave.save();
            let aX: number = aCanvasRect.left - aImageRect.left;
            let aY: number = aCanvasRect.top - aImageRect.top;

            let aCanvasToSave2 = document.createElement('canvas');

            aCanvasToSave2.width = aCanvasToReturn.width;
            aCanvasToSave2.height = aCanvasToReturn.height;
            let ctxToSave2 = aCanvasToSave2.getContext("2d");
            ctxToSave2.drawImage(aCanvasToReturn, 0, 0);
            ctxToSave2.scale(aScaleFactor, aScaleFactor);
            ctxToSave2.drawImage(pDrawing, aX, aY);
            aCanvasToReturn = aCanvasToSave2;

            aX = (aX > 0) ? aX : 0;
            aY = (aY > 0) ? aY : 0;
            let aWidth = Math.min(aCanvasRect.width, aImageRect.width);
            let aHight = Math.min(aCanvasRect.height, aImageRect.height);
            aX *= aScaleFactor;
            aY *= aScaleFactor;
            aWidth *= aScaleFactor;
            aHight *= aScaleFactor;
            let aCanvasToSave3 = document.createElement('canvas');
            aCanvasToSave3.width = aWidth;
            aCanvasToSave3.height = aHight;
            let ctxToSave3 = aCanvasToSave3.getContext("2d");
            ctxToSave3.translate(-aX, -aY);

            ctxToSave3.drawImage(aCanvasToReturn, 0, 0);
            aCanvasToReturn = aCanvasToSave3;

            ////oc.Utils.debugHTMLElement(aCanvasToReturn, 400);
            return (aCanvasToReturn);


        }

    }
}