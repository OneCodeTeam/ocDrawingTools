module asBase.events {

    /**
     * Class that represents an event
     * 
     * @export
     * @class AsEvent
     */
    export class AsEvent  {
        private mKey: string;
        private mSender: any;
        private mEvent: CustomEvent;

        /**
         * Creates an instance of AsEvent.
         * @param {string} pKey 
         * @param {boolean} [pBubbles=false] 
         * @param {*} [pSender] 
         * @param {boolean} [pCancelable=false] 
         * 
         * @memberOf AsEvent
         */
        constructor(pKey: string, pBubbles: boolean = false, pSender?: any, pCancelable: boolean = false) {

            this.mEvent = document.createEvent("CustomEvent");
            this.mEvent.initCustomEvent(pKey, pBubbles, pCancelable,this);
            this.mSender = pSender;
           // this.mEvent.bubbles = (pBubbles != null) ? pBubbles : false
        }
        //_____________________________________________________________

        /**
         * 
         * 
         * @readonly
         * @type {CustomEvent}
         * @memberOf AsEvent
         */
        public get event(): CustomEvent {
            return (this.mEvent);
        }
        //_____________________________________________________________

        /**
         * 
         * 
         * @readonly
         * @type {*}
         * @memberOf AsEvent
         */
        public get sender(): any {
            return (this.mSender);
        }
    }
}