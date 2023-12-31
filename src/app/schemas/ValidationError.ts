class ValidationError implements Error {
    name: string;
    message: any;
    status: number
    constructor(message: any, status: number) {
        this.message = message;
        this.status = status;
        this.name = "Validation Error";
    }
    getResponse() {
        return Response.json(this.message, { status: this.status });
    }
}

export default ValidationError;