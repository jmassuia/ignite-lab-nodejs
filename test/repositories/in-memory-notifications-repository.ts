import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { Notification } from "@application/entities/notification";
import { NotificationNotFound } from "@application/use-cases/errors/notification-not-found";

export class InMemoryNotificationsRepository implements NotificationsRepository{

    public notifications:Notification[]=[];
    
    async findById(notificationId: String): Promise<Notification> {
        const notification =  this.notifications.find(item => item.id == notificationId)

        if(!notification){
            return null
        }

        return notification;
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter(item => item.recipientId == recipientId);
    }

    async create(notification:Notification){
        this.notifications.push(notification);
    }

    async save(notification: Notification): Promise<void> {
        //Find notification index by notification id
        const notificationIndex = this.notifications.findIndex(item => item.id == notification.id)

        //If there's any, overwrite notification.
        if(notificationIndex >= 0){
            this.notifications[notificationIndex] = notification
        }
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(notification => notification.recipientId == recipientId).length;
    }

}