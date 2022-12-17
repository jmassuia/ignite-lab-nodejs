import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import {Notification} from '../entities/notification';
import {NotificationsRepository} from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest{
    notificationId:string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification{
    constructor(private notificationRepository:NotificationsRepository){
    }

    async execute(request:UnreadNotificationRequest):Promise<UnreadNotificationResponse>{
        const { notificationId } = request;
        
        const notification = await this.notificationRepository.findById(notificationId);
        
        if (!notification){
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationRepository.save(notification);
    }
}