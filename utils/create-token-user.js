const createTokenUser = (user) => {
    return { name: user.name, userId: user._id, zodiac: user.zodiac };
}

module.exports = createTokenUser;