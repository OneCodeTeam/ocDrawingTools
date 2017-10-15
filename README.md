# ocDrawingTools
Template for setting an image in frame, with the ability to scale,rotate, and drag while drawing on the image.
Based on asSvg and asBase libraries.
You can use this as a-ready-made template or include it in your project and use it appropiately.
# Getting Started
Download and include the asBase,asSvg and ocImage folders in your project.
# Create and instance of ImageDrawing and ImageSave in your program
Create a HTMLDivElement that the image will be set into
let aDiv=document.createElement("div);
documet.appendChild(aDiv);
let aImageDrawing=new ocImage.ImageDrawing(aDiv);
let aImageSave=new ocImage.ImageSave(aImageDrawing);
# Set an Image
aImageDrawing.setPicture(<url of picture>);
# Rotate an Image
aImageDrawing.rotate(90);
# Documentation
Full Documentation is available here:
