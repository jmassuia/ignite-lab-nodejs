import {Notification} from '../entities/notification'
import {InMemoryNotificationsRepository} from '@test/repositories/in-memory-notifications-repository'
import { CancelNotification } from "./cancel-notification"
import { Content } from '@application/entities/content'
import { NotificationNotFound } from './errors/notification-not-found'

describe('Cancel Notification', () => {
    it('should cancel notification', async()=>{
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = new Notification({
            category:'social',
            content: new Content('Testing cancel notification'),
            recipientId: 'sample-recipient-id',
        });

        await notificationsRepository.create(notification);

        const test = await cancelNotification.execute({
            notificationId:notification.id
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    })
    it('should not be able to create a non existing notification',async()=>{
      const notificationsRepository = new InMemoryNotificationsRepository();
      const cancelNotification = new CancelNotification(notificationsRepository)

    
      expect(()=>{  
            return cancelNotification.execute({
            notificationId:'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    })

})