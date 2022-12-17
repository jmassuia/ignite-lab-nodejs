import { Content } from './content';
import { Notification } from './notification';

describe('Notification',()=>{
    it('should create a notification',()=>{

        const notification = new Notification({
            content: new Content('Nova solicitacao de amizade'),
            category:'social',
            recipientId: 'example recipient-id',
            createdAt: new Date()
        });
    
        expect(notification).toBeTruthy();
    })
    
})
