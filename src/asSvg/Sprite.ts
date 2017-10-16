/// <reference path="displayobject.ts" />

module asSvg {
    /**
     * Represents a sprite object
     * 
     * @export
     * @class Sprite
     * @extends {DisplayObject}
     */
    export class Sprite extends DisplayObject {

        //------------------------------
        // Members
        //------------------------------
        
        private mChildren : Array<DisplayObject>;

        /**
         * Creates an instance of Sprite.
         * 
         * @memberOf Sprite
         */
        constructor() {
            super();
            this.mChildren = new Array<DisplayObject>();
           

        }
        //_____________________________________________________

        /**
         * Creates a sprite from an element
         * 
         * @static
         * @param {Element} pElement -element to create sprite from
         * @returns {Sprite}  -sprite created
         * 
         * @memberOf Sprite
         */
        public static createSpriteFromElement(pElement: Element): Sprite {
            let aSprite: Sprite = new Sprite();
            aSprite.mElement = pElement;
            return aSprite;
        }


        //_____________________________________________________

        public findChiledElementById(pId: string): Sprite {
            // TO DO
            return null;
        }
        //_____________________________________________________


        /****************************
        * Override methods
        ****************************/
        /**
         * Creates the sprite's element
         * 
         * @protected
         * @override
         * @memberOf Sprite
         */
        protected createElement() {
            this.create("g");
        };
        //____________________________________________________

        /**
         * @override
         * Sets the sprite's parent
         * 
         * @memberOf Sprite
         */
        public set parent(pVal: asSvg.Sprite) {
            this.mParent = pVal;
            if (pVal == null) {
                this.mStage = null;
            }
            this.mStage = this.stage;
            for (let i = 0; i < this.mChildren.length; i++) {
                this.mChildren[i].parent = this;
            }
        }
        /**
         * @override
         * 
         * @type {asSvg.Sprite}
         * @memberOf Sprite
         */
        public get parent(): asSvg.Sprite {
            return (this.mParent);
        }
        /****************************
        * Methods
        ****************************/

        /**
         * Appends a svg element to the sprite's element
         * 
         * @param {DisplayObject} pElement 
         * @returns 
         * 
         * @memberOf Sprite
         */
        public addChild(pElement: DisplayObject) {
            if (pElement == this) {
                console.log("asSvg.Sprite::addChild() Error : Can't add Child to itsalf");
                return;
            }
            this.removeChild(pElement);
            this.mChildren.push(pElement);
             pElement.parent = this;
             if (pElement.visible) {
                 this.mElement.appendChild(pElement.element);
             }
        }
        //_________________________________________________________

        /**
         * Removes a svg element to the sprite's element
         * 
         * @param {DisplayObject} pElement 
         * @returns 
         * 
         * @memberOf Sprite
         */
        public removeChild(pElement: DisplayObject) {
            var aIndex: number = this.mChildren.indexOf(pElement);
            if (aIndex > -1) {
                this.mChildren.splice(aIndex, 1);
            }
             if (pElement.parent != this) {
                 return;
             }
             if (pElement.element.parentNode != this.mElement) {
                 if (pElement.parent == this) {
                     pElement.parent = null;
                 }
                 return;
             }
            this.mElement.removeChild(pElement.element);
            pElement.parent = null;
        }
        //_________________________________________________________________

        /**
         * 
         * 
         * @readonly
         * @type {Array<DisplayObject>}
         * @memberOf Sprite
         */
        public get children(): Array<DisplayObject> {
            return (this.mChildren);
        }
        //_________________________________________________________________

        /**
         * Appends a svg element at a specified index
         * 
         * @param {DisplayObject} pDisplayObject 
         * @param {number} pIndex 
         * @returns 
         * 
         * @memberOf Sprite
         */
        public addChildAt(pDisplayObject: DisplayObject, pIndex: number) {
            this.removeChild(pDisplayObject);
            if ((pIndex > this.mChildren.length - 1) || (this.mChildren.length == 0)) {
                this.addChild(pDisplayObject);
                return;
            }
            pDisplayObject.parent = this;
            if (pIndex <= 0 ) {
                this.element.insertBefore(pDisplayObject.element, this.mChildren[0].element);
                this.mChildren.unshift(pDisplayObject);
                return;
            }
            this.element.insertBefore(pDisplayObject.element, this.mChildren[pIndex].element);
            this.mChildren.splice(pIndex, 0, pDisplayObject);
            return (this.mChildren);
        }

        //__________________________________________________

        /**
         * Returns the index of the child element
         * 
         * @param {DisplayObject} pElement 
         * @returns {number} 
         * 
         * @memberOf Sprite
         */
        public getChildIndex(pElement: DisplayObject):number {
            return (this.mChildren.indexOf(pElement));
        }
        //__________________________________________________

        /**
         * Removes all of the svg elements from the sprite's element
         * 
         * 
         * @memberOf Sprite
         */
        public removeChildren() {
            for (let i: number = 0; i < this.mChildren.length; i++) {
                let aElement: DisplayObject = this.mChildren[i];
                if (aElement.element.parentNode == this.mElement) {
                    this.mElement.removeChild(aElement.element);
                }
                aElement.parent = null;
            }
            this.mChildren = new Array<DisplayObject>();
         }
        /****************************
        * Getters and Setters
        ****************************/

        /**
         * 
         * 
         * @readonly
         * @static
         * @type {string}
         * @memberOf Sprite
         */
        public static get myName(): string {
            return "Sprite";
        }
        //______________________________________________
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberOf Sprite
         */
        public get myClassName(): string {
            return "Sprite";
        }
        //______________________________________________


    }
}