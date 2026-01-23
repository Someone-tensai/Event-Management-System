class App_Error extends Error {
    message
    status_code
    is_operational
    details
    error_code

    constructor(message, status_code, error_code, is_operational, details="")
    {
        super(message);
        this.status_code =  status_code;
        this.error_code = error_code;
        this.is_operational = is_operational;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = App_Error;