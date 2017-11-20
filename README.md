# ocDrawingTools
[OneCode](http://onecode.co.il) offers cross platform development with a specialty in 3D. As part of our deveopment for one of our projects we developed an easy to use image template editor.
The template is based on asSvg and asBase libraries.

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

## Simple Example
**Dispatching a custom event**

Pass the event,owner and data(optional) as arguments
```typescript
asBase.events.EventManager.dispatchEvent("CustomEvent",this);
```

**Listening to a custom event**

Pass the event, callback function,owner, or data(optional) as arguments
```typescript
asBase.events.EventManager.addEventListener("CustomEvent",()=>this.someFunc(),this);
```

## Another exmaple
**Calculate the distance between two 2D points**

```typescript
let point1=new asBase.Math.Point(3,-10);
let point2=new asBase.Math.Point(-8,7);
let aDist=asBase.Math.MathUtils.distance(point1,point2);
```
# Installation
Download and include the asBase,asSvg and image folders in your project.

You can download the asSvg and asBase modules independently here:https://github.com/rtsamir/Allseated.git

# How to use 

Create a HTMLDivElement that the image will be set inside.

Create an instance of the ImageDrawing and ImageSaveCanvas class
```typescript
let aDiv=document.createElement(div);
document.appendChild(aDiv);`
let aImageDrawing=new image.ImageDrawing(aDiv);
let aImageSave=new image.ImageSaveCanvas(aImageDrawing);
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

**ImageCrop**
Manages cropping of the image

## Modules
**action**
Module for all classes that implement the IAction interfaces. 
This module executes the redo/unod functionallity of the program.
Each "user action" is repsented by a class
*ActionManager*
You can add a new action and undo/redo an action.
```typescript
Add a clear all shapes from the image action
let aActionManager=new ActionManager();
let aAction=new action.ClearAllAction(sprite);//instance of asSVG.Sprite that the shapes were cleared from
aActionManager.addAction(aAction);// Instance of class that implements IAction
aActionManager.undo(); // undo the last action
aActionManager.redo() // redo the last action undone.
```
**shapes**

Module for all classes that extend the Shape Class. 
Contains classes for shapes drawn by the user on the image
*Arrow*
An arrow object drawn by the user
*Circle*
A circle object drawn by the user
*Scribble*
A scribble object drawn by the user

# Example

Drawing a new shape:

```typescript
let aSprite=new asSvg.Sprite(); //create a new sprite or use a existing one to draw the shape on
aStage.addChild(aSprite); // add the sprite to the stage you created earlier on
let aCircle=new shapes.Circle(aSprite ,"#fffff");  // sprite to draw circle on, color to draw circle
```

**Globals**
Class for constant variales used by all the other classes
# Important Globals
*image.Globals.isDrawInBound*
Determines whether shapes can be drawn only in the image's bounds.
(true-only in bound, false,anywhere in the frame)
*image.Globals.isFullScreen*
Determines when the frame is on the full screen or not
*image.Globals.mTextArray*
Array of all text objects in the frame
*image.Globals.mCircles*
Array of all shape objects in the frame
*image.Globals.isArrowMode*
Determines whether the user is drawing an arrow or not
## Documentation

Full Documentation is available  here:http://labs.onecode.co.il/ocDrawingTools/doc
