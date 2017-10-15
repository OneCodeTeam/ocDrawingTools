# ocDrawingTools
Template for setting an image in frame, with the ability to scale,rotate, and drag while drawing on the image.
Based on asSvg and asBase libraries.
You can use this as a-ready-made template or include it in your project and use it appropiately.
# Installation
Download and include the asBase,asSvg and ocImage folders in your project.
You can download the asSvg and asBase modules independently here:
# Getting Started 
## Create an instance of imageDrawing and ImageSave
Create a HTMLDivElement that the image will be set into
`let aDiv=document.createElement(div);`
`documet.appendChild(aDiv);`
`let aImageDrawing=new ocImage.ImageDrawing(aDiv);`
`let aImageSave=new ocImage.ImageSave(aImageDrawing);`
## Set an Image
`let aUrl="assets/img.png"; //url of image`
`aImageDrawing.setPicture(aURL);`
## Rotate an Image
`aImageDrawing.rotate(90);`
## Download an Image
`aImageSave.getImage()`
## Draw on Image
`let aColor='#00000' //draw color`
`aImageDrawing.startDraw(aColor);`
##Write on Image
You can add a text box the image as well:
aImageDrawing.onSetText();
## Documentation
Full Documentation is available here:
