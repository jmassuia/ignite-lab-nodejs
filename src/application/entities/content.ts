export class Content{
    private readonly content: string;

    get value(): string{
        return this.content
    }

    private ValidateContentLength(content:string):boolean{
        return content.length >= 5 && content.length <= 240;
    }
    constructor(content: string){
        const isContentValid = this.ValidateContentLength(content);

        if(!isContentValid){
            throw new Error('Content has less than 5 chars or is greater than 240 chars.');
        }
        
        this.content = content;
    }
}