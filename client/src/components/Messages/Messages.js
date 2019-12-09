import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Message from '../Message/Message'

import './Messages.css'

const Messages = ({messages, name}) => (
    <ScrollToBottom className="messages-wrapper">
        <p className="text-center">Let's talk!</p>
        {messages.map((message, index) => (
            <div key={index}>
                <Message message={message} name={name} />
                </div>)
        )
        }
        </ScrollToBottom>
)

export default Messages