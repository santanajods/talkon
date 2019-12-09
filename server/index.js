const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom, addUserToLobby, getUsersByLanguage, clearLobby } = require('./users')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    socket.on('join', ({ native, room, userId }, callback) => {
        const { error, user } = addUser({ id: socket.id, native, room, userId })

        socket.broadcast.to(user.room).emit('message', { user: 'Nobody', text: `has joined!` });

        if (error) return callback(error)
        socket.join(user.room)

        callback()
    })

    socket.on('waiting', ({ native, language, userId }, callback) => {
        const { error, user } = addUserToLobby({ id: socket.id, native, language, userId })
        const users = getUsersByLanguage(language)
        const qtdUsers = users.length || 0

        socket.join(user.userId)

        console.log(users)
        
        let roomName = ''

        if (qtdUsers === 2) {
            if(!(users[0].userId === users[1].userId)){
                roomName = users[0].id.substring(0,3) + users[1].id.substring(0,3)
                socket.broadcast.to(users[0].userId).emit('match', { room: roomName })
                socket.broadcast.to(users[1].userId).emit('match', { room: roomName })
            }
            clearLobby(users[0].userId, users[1].userId)
        }

        callback(roomName || null)
    })



    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.userId, text: message })
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.userId} leaves.` })
        }
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))