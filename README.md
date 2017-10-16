# ocDrawingTools
Template for setting an image in frame, with the ability to scale,rotate, and drag while drawing on the image.
Based on asSvg and asBase libraries.

You can use this as a ready made template or include it in your project and use it appropiately.

A live demo is available here:http://labs.onecode.co.il/drawingTools
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
## Another example:
The asSvg library also supports rotating,moving and scaling of an svg element.
```typescript
aImage.startDrag();// to move the element
aImage.rotation=180; //to rotate the element 180 degrees
aImage.setScale(1.5); // to scale the element 1.5 times it's orginal size
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

# asBase
The asBase library contains many usefull modules that you can include in your project.


## Classes
**EventManager**
Manages the dispatching and listening of events between any object.
**MouseEvents**
Contains global constants for all the mouse events
**Keyboard Code**
Contains global contstants for all keyboard codes
**Point**
Class representing a 2D Point
**Math Utils**
Contains some useful global math equations, like the distance equation,converting deg to rad etc.
**Rectangle**
Class representing a rectangle
**Matrix** 
Class representing a transform matrix

##Simple Example
Dispatching and listening to a custom event bewtween two objects.
```typescript
asBase.EventManager.dispatchEvent("CustomEvent",this) //pass the event,owner and data(optional) as arguments
asBase.EventManager.addEventListener("CustomEvent",()=>this.someFunc(),this); //pass the event, callback function,owner, or data(optional) as arguments
```
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
