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
        /**
         * Creates an instance of ImageSaveCanvas.
         * @param {any} pStage 
         * @param {any} pImageDrawing 
         * 
         * @memberOf ImageSaveCanvas
         */
        constructor(pImageDrawing) {
            super(pImageDrawing);
        
        }
        //____________________________
        /**
         * 
         * 
         * 
         * @memberOf ImageSaveCanvas
         */
        public getImage(): void {
            this.mImageDrawing.convertInuptToSVG();
            this.mImage = this.mStage.getImage();
            this.mImage.onload = ()=>this.saveImage();
        }
        //________________________________________

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