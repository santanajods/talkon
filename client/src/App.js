import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
import Waiting from './components/Waiting/Waiting'

const App = () => (
    <Router>
        <Route path="/" exact component={Join}/>
        <Route path="/lobby" exact component={Waiting}/>
        <Route path="/chat" exact component={Chat}/>
    </Router>
)

export default App
