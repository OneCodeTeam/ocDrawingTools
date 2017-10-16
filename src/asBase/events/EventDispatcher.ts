module asBase.events
{
    /**
     * Class that manages the dispatching of events
     * 
     * @export
     * @class EventDispatcher
     */
    export class EventDispatcher {

        private mEventsArray: Array<Array<CallbackHolder>>;

        /**
         * Creates an instance of EventDispatcher.
         * 
         * @memberOf EventDispatcher
         */
        constructor() {
        }

        /**
         * Adds an event listener to an owner
         * 
         * @param {string} pType -event to add to owner
         * @param {Function} pCallback -function to call when event is fired
         * @param {*} pOwner -owner to add event to
         * @returns {void} 
         * 
         * @memberOf EventDispatcher
         */
        public addEventListener(pType: string, pCallback: Function, pOwner: any): void {
            if (pCallback == undefined) {
                return;
            }
            if (this.mEventsArray == null) {
                this.mEventsArray = new Array<Array<CallbackHolder>>();
            }
            if (this.mEventsArray[pType] == null) {
                this.mEventsArray[pType] = new Array<CallbackHolder>();
            }
            const aEventsList: Array<CallbackHolder> = this.mEventsArray[pType];
            for (let i = aEventsList.length - 1; i >= 0; i--) {
                if (aEventsList[i].owner == pOwner) {
                    return;
                }
            }
            this.mEventsArray[pType].push(new CallbackHolder(pCallback, pOwner))

        }
        //______________________________________________________________

        /**
         * Removes an event listener from an object
         * 
         * @param {string} pType -event to remove
         * @param {*} pOwner - owner  to remove from
         * @returns {void} 
         * 
         * @memberOf EventDispatcher
         */
        public removeEventListener(pType: string, pOwner: any): void {
            if (this.mEventsArray == null) {
                return;
            }
            if (this.mEventsArray[pType] == null) {
                return;
            }
            const aEventsList: Array<CallbackHolder> = this.mEventsArray[pType];
            for (let i = aEventsList.length - 1; i >= 0; i--) {
                if (aEventsList[i].owner == pOwner) {
                    aEventsList.splice(i, 1);
                }
            }
        }
        //______________________________________________________________

        /**
         * 
         * Dispatches an event
         * @protected
         * @param {string} pType -event to dispatch
         * @param {*} [pData] -data to dispatch with event
         * @returns {void} 
         * 
         * @memberOf EventDispatcher
         */
        protected dispatchEvent(pType: string, pData?: any): void {
            if (this.mEventsArray == null) {
                return;
            }

            if (this.mEventsArray[pType] == null) {
                return;
            }
            if (pData == null) {

                for (let i = 0; i < this.mEventsArray[pType].length; i++) {
                    this.mEventsArray[pType][i].callback();
                }
            } else {
                for (let i = 0; i < this.mEventsArray[pType].length; i++) {
                    this.mEventsArray[pType][i].callback(pData);
                }
            }
        }
   
        //________________________________________________________________

        /**
         * Removes all of an object's events
         * 
         * @protected
         * @param {string} pType  
         * @param {*} pOwner 
         * @returns {void} 
         * 
         * @memberOf EventDispatcher
         */
        protected removeAllOwnerEvents(pType: string, pOwner: any): void {
            if (this.mEventsArray == null) {
                return;
            }
            for (let aTypes in this.mEventsArray) {
                const aEventsList: Array<CallbackHolder> = this.mEventsArray[aTypes];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            }
        }
    }
    //__________________________________________________________________
    /**
     * 
     * 
     * @class CallbackHolder
     */
    class CallbackHolder {
        public callback: Function;
        public owner: any;
        constructor(pCallback: Function, pOwner: any) {
            this.callback = pCallback;
            this.owner = pOwner;
        }
    }
}