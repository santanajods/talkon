import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import randomstring from 'randomstring'

import './Join.css'

const Join = () => {
    const [native, setNative] = useState('')
    const [userId, setUserId] = useState('')
    const [language, setLanguage] = useState('')

    useEffect(() => {
        setUserId(randomstring.generate(4))
    }, [])
    
    return (
        <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-12 col-md-6 col-lg-4 pt-5">
                    <h1 className="my-5">Let`s Talk</h1>
                    <div>
                        <input
                            placeholder="Native language"
                            type="text"
                            className="w-100 form-control mb-4"
                            onChange={(event) => setNative(event.target.value)}
                        />
                    </div>
                    <div>
                        <select 
                        onChange={(event) => setLanguage(event.target.value)}
                        className="w-100 form-control mb-4"
                        >
                            <option value="0">Select the language you want to talk</option>
                            <option value="1">English</option>
                            <option value="2">Spanish</option>
                            <option value="3">Italian</option>
                            <option value="4">Franch</option>
                        </select>
                    </div>
                    <Link
                        onClick={event => (!native || (!language || language == 0)) ? event.preventDefault() : null}
                        to={`/lobby?userId=${userId}&native=${native}&language=${language}`}
                    >
                        {/* <Link
                        onClick={event => (!name || !room) ? event.preventDefault() : null}
                        to={`/chat?name=${name}&room=${room}`}
                    ></Link> */}
                        <button className="btn btn-primary" type="submit">Let's Talk!</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Join