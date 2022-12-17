import { CountRecipientNotifications } from "./count-recipient-notifications"
import {InMemoryNotificationsRepository} from '@test/repositories/in-memory-notifications-repository'
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import { count } from "console";
import { makeNotification } from "@test/factories/notification-factory";
import { GetRecipientNotifications } from "./get-recipient-notifications";


describe('Get recipient notifications', () => {
    it('should get recipient notification(s)', async()=>{
        const notificationsRepository = new InMemoryNotificationsRepository();
        const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository)

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'}));

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'}));
        
        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-2'}));
            
        const {notifications} = await getRecipientNotifications.execute({
            recipientId:'recipient-1'
        })

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({recipientId: 'recipient-1'}),
            expect.objectContaining({recipientId: 'recipient-1'}),
        ]))
        });
});