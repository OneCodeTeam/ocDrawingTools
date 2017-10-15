# ocDrawingTools
Template for setting an image in frame, with the ability to scale,rotate, and drag while drawing on the image.
Based on asSvg and asBase libraries.
You can use this as a ready made template or include it in your project and use it appropiately.
# asSVG
asSVG is a library for building svg elements in HTML5
## Simple Example 
Draw an image on screen
```typescript
let aDiv=document.getElementById("imageDiv");
let aSVGStage = asSvg.Stage.cretaeStage(aDiv, aDiv.clientWidth, aDivRect.clientHeight);
let aImage=new asSvgImage("assets/railway.png");
aSVGStage.addChild(aImage);
```
## Classes
**Display Object** 
Abstract base class for all display elements in SVG.

**Stage**
The root level display container for display elements

**TextField**
Class that renders a single text line to the stage

**Foreign Object**
Renders a non-svg (html) element to the stage

**Image**
Renders an image to the stage

**Rect**
Renders a rectangle to the stage

**Shape**
Renders a display element for drawing vector data

**Circle**
Renders a circle to the stage

**Ellipse**
Renders an ellipse to the stage

**Line**
Renders a line to the stage


# Installation
Download and include the asBase,asSvg and ocImage folders in your project.

You can download the asSvg and asBase modules independently here:https://github.com/rtsamir/Allseated.git

# How to use 

Create a HTMLDivElement that the image will be set inside.

Create an instance of the ImageDrawing and ImageSaveCanvas class
```typescript
let aDiv=document.createElement(div);
documet.appendChild(aDiv);`
let aImageDrawing=new ocImage.ImageDrawing(aDiv);
let aImageSave=new ocImage.ImageSaveCanvas(aImageDrawing);
```

**Set an Image**
```typescript
let aUrl="assets/img.png"; //url of image
aImageDrawing.setPicture(aURL);
```
**Rotate an Image**
```typescript
aImageDrawing.rotate(90);
```

**Download an Image**
```typescript
aImageSave.getImage();
```

**Draw on Image**
```typescript
let aColor='#00000' //draw color
aImageDrawing.startDraw(aColor);
```

**Write on Image**

You can add a text box the image as well:
```typescript
aImageDrawing.onSetText();
```
## Classes
**ImageDrawing**
Manages the scaling,dragging,rotation and drawing of the image

**ImageSave**
Manages the dowloading and saving of the image
## Documentation

Full Documentation is available  here:http://labs.onecode.co.il/ocDrawingTools/doc
