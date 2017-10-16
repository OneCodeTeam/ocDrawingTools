module asBase.events
{
    /**
     * Represents an EventBase
     * 
     * @export
     * @class EventBase
     */
    export class EventBase
    {
        private mKey: string;
        private mCallBack: Function;
        private mAttachedData: any;
        private mData: any;
        private mSender: any;
        private mOwner: any;
        constructor(pKey: string, pCallBack: Function, pOwner: any, pAttachedData?: any, pFunction?: Function)
        {
            this.mAttachedData = pAttachedData;
            this.mOwner = pOwner;
            this.mKey = pKey;
            this.mCallBack = pCallBack;
        }
        //____________________________________________________________
        public get callBack(): Function
        {
            return this.mCallBack;
        }

        public set callBack(value: Function)
        {
            this.mCallBack = value;
        }
        //____________________________________________________________
        public get data(): any
        {
            return this.mData;
        }

        public set data(value: any)
        {
            this.mData = value;
        }
        //____________________________________________________________
        public get owner(): any
        {
            return this.mOwner;
        }

        public set owner(value: any)
        {
            this.mOwner = value;
        }
        //____________________________________________________________

        public get sender(): any
        {
            return this.mSender;
        }

        public set sender(value: any)
        {
            this.mSender = value;
        }
        //____________________________________________________________

        public get attachedData(): any
        {
            return this.mAttachedData;
        }

        public set attachedData(value: any)
        {
            this.mAttachedData = value;
        }
        //____________________________________________________________
        public get key(): string
        {
            return this.mKey;
        }

        public set key(value: string)
        {
            this.mKey = value;
        }
    }
}