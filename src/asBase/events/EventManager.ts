module asBase.events
{
    /**
     * Class that represents an event manager
     * 
     * @export
     * @class EventManager
     */
    export class EventManager
    {
        private static mEvents: Array<Array<EventBase>>;

        constructor()
        {
        }
        //-----------------------------------------------------

        /**
         * Dispatches a custom event
         * 
         * @static
         * @param {EventBase} pEvent 
         * @returns {void} 
         * 
         * @memberOf EventManager
         */
        public static dispatchCustomEvent(pEvent: EventBase): void {
            if (EventManager.mEvents == null) {
                return;
            }
            if (EventManager.mEvents[pEvent.key] == null) {
                return;
            }
            const aEventsList: Array<EventBase> = EventManager.mEvents[pEvent.key];
            for (let i = 0; i < aEventsList.length; i++) {
                pEvent.attachedData = aEventsList[i].attachedData;
                pEvent.owner = aEventsList[i].owner;
                aEventsList[i].callBack(pEvent);
            }
        }
        //-----------------------------------------------------

        /**
         * Dispatches a event
         * 
         * @static
         * @param {string} pKey 
         * @param {*} pOwner 
         * @param {*} [pData] 
         * @returns {void} 
         * 
         * @memberOf EventManager
         */
        public static dispatchEvent(pKey: string, pOwner: any, pData?: any): void
        {
            if (EventManager.mEvents == null)
            {
                return;
            }
            if (EventManager.mEvents[pKey] == null)
            {
                return;
            }
            const aEventsList: Array<EventBase> = EventManager.mEvents[pKey];
            for (let i = 0; i < aEventsList.length; i++)
            {
                aEventsList[i].data = pData;
                aEventsList[i].sender = pOwner;
                aEventsList[i].callBack(aEventsList[i]);
            }
        }
        //-----------------------------------------------------

        /**
         * Adds an event listener 
         * 
         * @static
         * @param {string} pKey 
         * @param {Function} pCallback 
         * @param {*} pOwner 
         * @param {*} [pAtachedData] 
         * @param {Function} [pFunction] 
         * @returns {void} 
         * 
         * @memberOf EventManager
         */
        public static addEventListener(pKey: string, pCallback: Function, pOwner: any, pAtachedData ?: any, pFunction?: Function): void
        {
            if (EventManager.mEvents == null)
            {
                EventManager.mEvents = new Array<Array<EventBase>>();
            }
            if (EventManager.mEvents[pKey] == null)
            {
                EventManager.mEvents[pKey] = Array<EventBase>();
            }
            if (EventManager.hasEventListener(pKey, pOwner)) {
                return;
            }
            const aEvent = new EventBase(pKey, pCallback, pOwner, pAtachedData, pFunction);
            EventManager.mEvents[pKey].push(aEvent);
        }
        //-----------------------------------------------------

        /**
         * Checks if object has event listener
         * 
         * @static
         * @param {string} pKey 
         * @param {*} pOwner 
         * @returns {boolean} 
         * 
         * @memberOf EventManager
         */
        public static hasEventListener(pKey: string, pOwner: any): boolean {
            var aArray: Array<EventBase> = EventManager.mEvents[pKey];
            for (let i: number = 0; i < aArray.length; i++) {
                if (aArray[i].owner == pOwner) {
                    return true;
                }
            }
            return false
        }
        //-----------------------------------------------------

        /**
         * Removes a event listener
         * 
         * @static
         * @param {string} pKey 
         * @param {*} pOwner 
         * @returns {void} 
         * 
         * @memberOf EventManager
         */
        public static removeEventListener(pKey: string, pOwner: any): void
        {
            if (EventManager.mEvents == null)
            {
                return;
            }
            if (EventManager.mEvents[pKey] == null)
            {
                return;
            }
            const aEventsList: Array<EventBase> = EventManager.mEvents[pKey];
            for (let i = aEventsList.length - 1; i >= 0; i--)
            {
                if (aEventsList[i].owner == pOwner)
                {
                    aEventsList.splice(i, 1);
                }
            }
        }
        //-----------------------------------------------------

        /**
         * Removes all of a object's events
         * 
         * @static
         * @param {*} pOwner 
         * @returns {void} 
         * 
         * @memberOf EventManager
         */
        public static removeAllOwnerEvents( pOwner: any): void {
            if (EventManager.mEvents == null) {
                return;
            }
            for (let aKey in EventManager.mEvents) {
                let aEventsList: Array<EventBase> = EventManager.mEvents[aKey];
                for (let i = aEventsList.length - 1; i >= 0; i--) {
                    if (aEventsList[i].owner == pOwner) {
                        aEventsList.splice(i, 1);
                    }
                }
            }
        }
    }
}