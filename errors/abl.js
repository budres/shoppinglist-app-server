class AblError extends Error {
    constructor(code, message) {
        super()
        this.code = code
        this.message = message
    }
}

const ABL_ERRORS = {
    unknown: 'ERR_UNKNOWN',
    tagTaken: 'ERR_TAG_TAKEN',
    invalidBody: 'ERR_INVALID_BODY',
    invalidParams: 'ERR_INVALID_PARAMS',
    userNotFound: 'ERR_USER_NOT_FOUND',
    invalidPassword: 'ERR_INVALID_PASSWORD',
    missingToken: 'ERR_MISSING_TOKEN',
    invalidToken: 'ERR_INVALID_TOKEN',
    forbidden: 'ERR_FORBIDDEN'
}

module.exports = {ABL_ERRORS, AblError}