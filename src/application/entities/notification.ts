import { Replace } from 'src/helpers/Replace';
import {Content} from './content';
import {randomUUID} from 'crypto';

export interface NotificationProps{
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    canceledAt?: Date | null;
    createdAt: Date;
}

export class Notification {
    private _id: string;
    private props: NotificationProps;

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>,id?: string,) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
     }
    
    public get id():string{
        return this._id;
    }

    //Updating information
    public set recipientId(recipientId: string){
        this.props.recipientId = recipientId;
    }
    //Retrieving the information 
    public get recipientId():string{
        return this.props.recipientId;
    }

    //Updating information
    public set content(content: Content){
        this.props.content = content;
    }
    //Retrieving the information 
    public get content():Content{
        return this.props.content;
    }

    //Updating information
    public set category(category: string){
        this.props.category = category;
    }
    //Retrieving the information 
    public get category():string{
        return this.props.category;
    }

    public read(){
        this.props.readAt = new Date();
    }
    
    //Retrieving the information 
    public get readAt():Date | null | undefined{
        return this.props.readAt;
    }

    public unread(){
        this.props.readAt = null;
    }

    public cancel(){
        this.props.canceledAt = new Date();
    }
    //Retrieving the information 
    public get canceledAt():Date | null | undefined{
        return this.props.canceledAt;
    }

    //Retrieving the information 
    public get createdAt():Date | null | undefined{
        return this.props.createdAt;
    }
    
}

