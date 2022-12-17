import { SendNotification } from "./send-notification"
import {InMemoryNotificationsRepository} from '@test/repositories/in-memory-notifications-repository'


describe('Send notification', () => {
    it('should send notification', async()=>{
        const notificationsRepository = new InMemoryNotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository)

        const {notification} = await sendNotification.execute({
            recipientId:'example notification',
            content: 'This is a test notification',
            category: 'social'
        });
        
        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    })

})