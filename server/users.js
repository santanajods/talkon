let waitingUsers = []
const users = []

const addUser = ({ id, native, room, userId }) => {
    native = native.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const user = { id, native, room, userId }

    users.push(user)

    return { user }
}

const addUserToLobby = ({ id, native, language, userId }) => {
    native = native.trim().toLowerCase()

    const user = { id, native, language, userId }

    const existingUser = users.find((user) => user.userId === userId)

    if (!existingUser)
        waitingUsers.push(user)
    return { user }
}

const clearLobby = (userId1, userId2) => {
    waitingUsers.forEach((user, index) => {
        if ((user.userId === userId1) || (user.userId === userId2)) {
            waitingUsers.splice(index, 1)
        }
    })
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUsersByLanguage = (language) => {
    const users = waitingUsers.filter(user => user.language === language)
    return users
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = () => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getUsersInRoom, getUsersByLanguage, addUserToLobby, clearLobby }