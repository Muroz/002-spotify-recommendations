import React from 'react'

const Login = ({authEndpoint, clientId, redirectUri, scopes}) => {
    return (
            <a
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
                Login to Spotify
            </a>
    )
};

export default Login;