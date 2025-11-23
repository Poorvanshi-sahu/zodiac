const constants = {
    errorCode: {
        authorizationError: 43,
        validationError: 11,
        operationalError: 9,
        internalServerError: 51,
        duplicateEntryError: 40,
    },

    respMsg: {
        created: (elem) => `${elem} created successfully`,
        wentWrong: "Something Went Wrong",
        alreadyExists: (elem) => `${elem} already exists`,
        doesNotExists: (elem) => `${elem} does not exists`,
        inValidCreds: "Invalid credentials",
        login: "logged in successfully",
        loggedOut: "logged out successfully",
        loginInFirst: "User not logged in",
        ok: "Ok",
        fetched: "fetched Successfully",
    }
}


module.exports = constants;