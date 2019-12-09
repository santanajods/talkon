import React from 'react'
import ReactEmoji from 'react-emoji'

import './Message.css'

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false

    const userId = name

    if (user === userId) {
        isSentByCurrentUser = true
    }

    return (
        isSentByCurrentUser
            ?
            (
                <div>
                    <p><span className="me">Me: </span>{ReactEmoji.emojify(text)}</p>
                </div>
            )
            :
            (
                <div>
                    <p><span className="stranger">Stranger: </span>{ReactEmoji.emojify(text)}</p>
                </div>
            )

    )
}

export default Message