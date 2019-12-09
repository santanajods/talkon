import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'

let socket

export default ({ location }) => {
    const [native, setNative] = useState('')
    const [userId, setUserId] = useState('')
    const [room, setRoom] = useState('')
    const [match, setMatch] = useState(false)

    const ENDPOINT = 'localhost:5000'
    socket = io(ENDPOINT)

    useEffect(() => {
        const { native, language, userId } = queryString.parse(location.search)
        setNative(native)
        setUserId(userId)
        socket.emit('waiting', { native, language, userId }, (callback) => {
            if (callback) {
                console.log(callback)
                setRoom(callback)
                setMatch(true)
            }
        })
    }, [])


    useEffect(() => {
        socket.on('match', ({ room }) => {
            setMatch(true)
            setRoom(room)
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [room])

    return (
        <div style={{ height: '100%' }}>
            <div
                className="h-100 text-center d-flex justify-content-center flex-column align-items-center"
                style={{ marginTop: '20%' }}
            >
                {match ?
                    <>
                        <p>We found a stranger!</p>
                        <Link className="btn btn-primary" to={`/chat?userId=${userId}&native=${native}&room=${room}`}>OPEN CHAT!</Link>
                    </>
                    :
                    <>
                        <BounceLoader
                            sizeUnit={'px'}
                            size={60}
                            color={'#57B8FF'}
                            loading={true}
                        />
                        <p className="mt-5">Searching for someone...</p>
                    </>
                }
            </div>
        </div>
    )
}
