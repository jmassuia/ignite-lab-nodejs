import { CountRecipientNotifications } from "./count-recipient-notifications"
import {InMemoryNotificationsRepository} from '@test/repositories/in-memory-notifications-repository'
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import { count } from "console";
import { makeNotification } from "@test/factories/notification-factory";


describe('Count recipient notifications', () => {
    it('should count recipient notification', async()=>{
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository)

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'}));

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'}));
        
        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-2'}));
            
        const {count} = await countRecipientNotifications.execute({
            recipientId:'recipient-1'
        })

        expect(count).toEqual(2);
        });
});