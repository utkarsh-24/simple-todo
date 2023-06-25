"use strict"

class ErrorHandler extends Error {
    public statusCode: number = 500;
    public errorMessage: string = "Something went wrong";
    constructor(error: string, statusCode: number) {
        super(error);
        this.errorMessage = error;
        this.statusCode = statusCode;
    }
}


export default ErrorHandler