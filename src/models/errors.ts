export class ApiError extends Error {
    public code: number;
    public info: string;
    constructor(statusCode: number, info: string) {
        super(info);
        this.code = statusCode
        this.info = info
    }

    public getStatusCode() { return this.code; }
    public getInfo() { return this.info; }
}