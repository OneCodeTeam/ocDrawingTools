module image {
    /**Class that manages saving and downloading of an image
     * 
     * 
     * @export
     * @class ImageSave
     */
    export class ImageSave  {
        protected mStage: asSvg.DisplayObject;
        protected mImage: HTMLImageElement;
        protected mImageDrawing: ImageDrawing;
        constructor(pImageDrawing: ImageDrawing) {
            this.mStage = pImageDrawing.mSVGStage;
            this.mImageDrawing = pImageDrawing;
        }
        //____________________________
        public getImage() {
           
        }
        //________________________________________

        protected saveImage() {

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

        }

        /**
         * 
         * 
         * @static
         * @param {any} dataurl 
         * @returns 
         * 
         * @memberOf ImageSave
         */
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