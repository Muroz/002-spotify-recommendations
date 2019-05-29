import React from 'react'
import styled from 'styled-components'
import { TokenContext } from '../../App'

const Container = styled.div`
    margin: 5px;
    position: relative;
    text-align: center;
    width: 100px;
    height: 100px;
    transition: all 0.5s ease;
    div {
        opacity: 0;
        transition: all 1s ease;
    }
    &:hover {
        width: 300px;
        height: 300px;
        img {
            opacity: 0.3;
        }
        div {
            opacity: 1;
        }
        /* transform: scale(1.5) */
    }
`

const InformationOverlay = styled.div`
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
    h1 {
        text-align: left;
        margin-left: 5px;
    }
    /* position: absolute;
    top: 50%;
    left: 50%; */
`

const TrackImg = styled.img`
    background-image: url(${props => props.imageURL});
    background-size: cover;
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

const ArtistH1 = styled.h1`
    color: white;
    opacity: 0.7;
    font-size: 14px;
`

const TrackH1 = styled.h1`
    color: white;
    font-size: 20px;
`
const RecommendedCard = ({ track }) => {
    const { album, name, artists } = track
    const handlePlayClick = ({ token, trackUri }) => {
        const trackBody = {
            uris: [trackUri]
        };

        fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(trackBody)
        }).then(async response => {
            // TODO ADD RESPONSE HANDLE
            console.log(response)
        })
    }

    // TODO PASS THE FUNCTION THROUGH WITH CONTEXT
    return (
        <TokenContext.Consumer>
            {context => {
                return (
                    <Container onClick={() => handlePlayClick({token: context.token, trackUri: track.uri})}>
                        <TrackImg imageURL={album.images[0].url} />
                        <InformationOverlay>
                            <TrackH1>{name}</TrackH1>
                            <ArtistH1>{artists[0].name}</ArtistH1>
                        </InformationOverlay>
                    </Container>
                )
            }}
        </TokenContext.Consumer>
    )
}

export default RecommendedCard
