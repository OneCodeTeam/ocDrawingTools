module image {
    export class Main {
        private mImageDrawing: image.ImageDrawing;
        private mImageSave: image.ImageSave;
        private mSetImageButton: HTMLElement;
        private mRotateButton: HTMLElement;
        private mSetTextButton: HTMLElement;
        private mDrawButton: HTMLElement;
        private mDrawColorBox: HTMLInputElement;
        private mDownloadButton: HTMLElement;
        private mSelectButton: HTMLElement;
        private mTextBox: HTMLInputElement;
        private mClearAllButton: HTMLElement;
        private mFontSizeBox: HTMLInputElement;
        private mLineWidthBox: HTMLInputElement
        
        constructor() {
            this.mImageDrawing = new image.ImageDrawing(document.getElementById("imageDiv"));
            if (Globals.isTest) {
                this.mImageSave = new image.ImageSaveCombineCanvas(this.mImageDrawing);
            }
            else {
                this.mImageSave = new image.ImageSaveCanvas(this.mImageDrawing);

            }
            this.mDownloadButton = document.getElementById("downloadButton");
            this.mDrawButton = document.getElementById("drawButton");
            this.mSelectButton = document.getElementById("selectButton");
            this.mSetImageButton = document.getElementById("setImageButton");
            this.mSetTextButton = document.getElementById("setTextButton");
            this.mDrawColorBox = document.getElementById("drawColor") as HTMLInputElement;
            this.mRotateButton = document.getElementById("rotateButton");
            this.mTextBox = document.getElementById("textBox") as HTMLInputElement;
            this.mClearAllButton = document.getElementById("clearAllButton");
            this.mFontSizeBox = document.getElementById("fontSizeBox") as HTMLInputElement;
            this.mLineWidthBox = document.getElementById("lineWidthBox") as HTMLInputElement;
            this.mImageDrawing.mDrawColor = (document.getElementById("drawColor") as HTMLInputElement).value;
            this.mImageDrawing.mTextButton = document.getElementById("setTextButton");

            this.mSetImageButton.addEventListener("click", () => this.setPicture());
            this.mSetTextButton.addEventListener("click", () => this.setText());
            this.mDrawButton.addEventListener("click", () => this.onDraw());
            this.mDownloadButton.addEventListener("click", () => this.onDownload());
            this.mSelectButton.addEventListener("click", () => this.onSelect());
            document.getElementById("rotateButton").addEventListener("click", () => this.rotateImage());
            this.mDrawColorBox.addEventListener("input", () => this.onColorChange());
            document.getElementById("fullScreenButton").addEventListener("click", (pText) => this.onFullScreen());
            this.mClearAllButton.addEventListener("click", () => this.onClearAll());
            this.mFontSizeBox.addEventListener("input", (pVal) => this.onFontSize(this.mFontSizeBox.value));
            this.mLineWidthBox.addEventListener("input", (pVal) => this.onLineWidth(this.mLineWidthBox.value));
        }
        //______________________________________
        private setPicture() {
            let aNum = Math.floor(Math.random() * 5) + 1
            this.mImageDrawing.setPicture("assets/" + aNum+".jpg",0,1);
            this.mRotateButton.style.display = "inline-block";
        }
        //____________________________________
        private rotateImage()
        {
            this.resetButtons();
            this.mImageDrawing.rotate(90);
        }
        //__________________________________
        private setText() {
            this.resetButtons();
            this.mSetTextButton.classList.add("active")
        
            this.mImageDrawing.onSetText();
            
        }
        //____________________________
        private onDraw() {
            this.resetButtons();
            this.mDrawButton.classList.add("active")
            var aColor = this.mDrawColorBox.value;
            console.log(aColor);
            this.mImageDrawing.startDraw(aColor);
        }
        //___________________________________
        private onDownload() {
   
            this.mImageSave.getImage();
       
        }
        //________________________________________
        private onSelect() {

            this.resetButtons();
            this.mSelectButton.classList.add("active")
            this.mImageDrawing.select();
        }
        //________________________________________
        private onColorChange() {
             var aColor = this.mDrawColorBox.value;
            console.log(aColor);
            this.mImageDrawing.changeColor(aColor);
        }
        //_________________________________________
        private resetButtons() {
            Globals.isSelectMode = false;
            Globals.isTextMode = false;
            Globals.isDrawMode = false;
            Globals.isRotateMode = false;
            this.mDrawButton.classList.remove("active");
            this.mRotateButton.classList.remove("active");
            this.mSelectButton.classList.remove("active");
            this.mSetTextButton.classList.remove("active");

        }
        //____________________________
        private onFullScreen() {
            this.mImageDrawing.onFullScreen(Globals.isFullScreen);
            if (!Globals.isFullScreen) {
                document.getElementById("fullScreenButton").getElementsByTagName("span")[0].className = "glyphicon glyphicon-resize-small";
                Globals.isFullScreen = true;
            }
            else {
                document.getElementById("fullScreenButton").getElementsByTagName("span")[0].className = "glyphicon glyphicon-resize-full";
                Globals.isFullScreen = false;
            }
          
        }
        //____________________________________
        private onClearAll() {
            this.mImageDrawing.clearAll();
        }
        //__________________________________
        private onFontSize(pVal) {
            this.mImageDrawing.fontsize = pVal;
        }
        //__________________________________
        private onLineWidth(pVal) {
            this.mImageDrawing.lineWidth = pVal;
        }
    }
}