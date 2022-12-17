import {Notification} from '../entities/notification'
import {InMemoryNotificationsRepository} from '@test/repositories/in-memory-notifications-repository'
import { ReadNotification } from "./read-notification"
import { Content } from '@application/entities/content'
import { NotificationNotFound } from './errors/notification-not-found'

describe('Read Notification', () => {
    it('should read notification', async()=>{
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        const notification = new Notification({
            category:'social',
            content: new Content('Testing Read notification'),
            recipientId: 'sample-recipient-id',
        });

        await notificationsRepository.create(notification);

       await readNotification.execute({
            notificationId:notification.id
        });

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
    })
    it('should not be able to create a non existing notification',async()=>{
      const notificationsRepository = new InMemoryNotificationsRepository();
      const readNotification = new ReadNotification(notificationsRepository)

    
      expect(()=>{  
            return readNotification.execute({
            notificationId:'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    })

})