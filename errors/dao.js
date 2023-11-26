class DaoError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

const DAO_ERRORS = {
    unknown: 'ERR_UNKNOWN',
    userNotFound: 'ERR_USER_NOT_FOUND',
    listNotFound: 'ERR_LIST_NOT_FOUND',
    itemNotFound: 'ERR_ITEM_NOT_FOUND',
    userAlreadyMember: 'ERR_USER_ALREADY_MEMBER',
    userNotMember: 'ERR_USER_NOT_MEMBER'
}

module.exports =  {DAO_ERRORS, DaoError}