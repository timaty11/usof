export default class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static NotFound(res, message, errors) {
        console.log(errors);
        res.status(422).json({ errors });
        return new ApiError(404, message, errors);
    }

    static InvalidData(res, message, errors) {
        console.log(errors);
        res.status(422).json({ errors });
        return new ApiError(422, message, errors);
    }

}