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
        wentWrong: "something Went Wrong",
        alreadyExists: (elem) => `${elem} already exists`,
        doesNotExists: (elem) => `${elem} does not exists`,
        inValidCreds: "invalid credentials",
        login: "logged in successfully",
        loggedOut: "logged out successfully",
        loginInFirst: "user not logged in",
        ok: "ok",
        fetched: "fetched Successfully",
        required: "all fields are required",
        invalidEmail: "email is invalid",
        invalidPassword: "password too short min length is 6",
        invalidBirthdate: "invalid birthdate",
        invalidName: "invalid name"
    }
}


module.exports = constants;