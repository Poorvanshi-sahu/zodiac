const { errorCode } = require('../config/constants/zodiacConstants');

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.errorCode = errorCode.validationError;
        this.message = message;
    }
}
class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PermissionError';
        this.errorCode = errorCode.authorizationError;
        this.message = message;
    }
}
class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthorizationError';
        this.errorCode = errorCode.authorizationError;
        this.message = message;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.errorCode = errorCode.operationalError;
        this.message = message;
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
        this.errorCode = errorCode.internalServerError;
        this.message = message;
    }
}

class OperationalError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OperationalError';
        this.errorCode = errorCode.operationalError;
        this.message = message;
    }
}

class CustomError extends Error {
    constructor(message, err, errorName, type) {
        super(message);
        this.name = errorName;
        this.errorCode = errorCode[err];
        this.message = message;
        this.type = type;
    }
}

class CustomValidationErrorWithData extends ValidationError {
    constructor(message, err, errorName, type, data = {}) {
        super(message);
        this.name = errorName;
        this.errorCode = errorCode[err];
        this.message = message;
        this.type = type;
        this.data = data;
    }
}

module.exports = {
    ValidationError,
    PermissionError,
    AuthorizationError,
    DatabaseError,
    NotFoundError,
    OperationalError,
    CustomError,
    CustomValidationErrorWithData,
};