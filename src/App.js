import React, { Component } from 'react'
import './App.css'
import Login from './components/Login/Login'
import MusicDisplay from './components/MusicDisplay/MusicDisplay'
export const authEndpoint = 'https://accounts.spotify.com/authorize'

// TODO MOVE TO .ENV
const clientId = '5bcc27b739f94a48981b8a71c4789105'
const redirectUri = 'http://localhost:3000'
const scopes = ['user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state']

const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split('=')
            initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
    }, {})
window.location.hash = '';

export const TokenContext = React.createContext();

class App extends Component {
    constructor() {
        super()
        this.state = {
            token: null,
        }
    }

    componentDidMount() {
        let _token = hash.access_token

        if (_token) {
            this.setState({
                token: _token,
            })
        }
    }

    render() {
      const { token } = this.state;
        return (
          <TokenContext.Provider
            value={{
              token
            }}
          >
            <div className="App">
                <header className="App-header">
                    {!this.state.token ? (
                        <Login
                            authEndpoint={authEndpoint}
                            clientId={clientId}
                            redirectUri={redirectUri}
                            scopes={scopes}
                        />
                    ) : (
                        <MusicDisplay token={token} />
                    )}
                </header>
            </div>
          </TokenContext.Provider>
        )
    }
}
export default App

/*

Reason behind not using JQuery and React together

jQuery in this context usually refers to DOM scripting, where events and UI updates happen in the browser DOM. Because React handles events directly and uses a virtual DOM, in theory using React should mean you simply don't need to use jQuery as well.

Changing the browser DOM outside your React app means React is potentially no longer handling state, events and UI rendering. Also, it means you are basically building one thing two entirely different ways; and sending two dependency loads down to the browser instead of one.

Still - it's not the end of the world if both are being used, you just have to be aware of what each is doing and how the other will deal with that.


*/

/*

Why fetch is better in this case than axios and jquery.ajax

https://www.quora.com/Is-Axios-a-good-replacement-for-Ajax-to-make-HTTP-calls


*/

/*

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch


fixed fetch issue with

https://stackoverflow.com/questions/53511974/javascript-fetch-failed-to-execute-json-on-response-body-stream-is-locked

potentially because I call .json on the console log beforehand

*/

/*
Look into readable streams

*/
