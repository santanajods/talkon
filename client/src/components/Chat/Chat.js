import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import Messages from '../Messages/Messages'

import "./Chat.css"

let socket


const Chat = ({ location }) => {
    const [native, setNative] = useState('')
    const [userId, setUserId] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { native, room, userId } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setNative(native)
        setRoom(room)
        setUserId(userId)

        socket.emit('join', { native, room, userId }, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container-chat mt-5">
                <Messages messages={messages} name={userId} />
                <form className="button-message w-100">
                    <input
                        className="input-message"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
                    />
                    <button
                        className="sendButton"
                        onClick={(event) => sendMessage(event)}
                    >Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat