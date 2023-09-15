export default class ConnectionTimeoutError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ConnectionTimeout';
    }
}