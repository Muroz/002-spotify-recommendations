import React from 'react'
import styled from 'styled-components'
// why use const or let over var
const Container = styled.div`
    text-align: center;
    display: flex;
    align-content: center;
    justify-content: center;
`

const NowPlayingImg = styled.div`
    float: left;
    margin-right: 10px;
    text-align: right;
    width: 45%;
    img {
        max-width: 80vmin;
        width: 100%;
    }
`

const NowPlayingWrapper = styled.div`
    margin-left: 5%;
    width: 45%;
`

const NowPlayingSongName = styled.div`
    font-size: 1.5em;
    margin-bottom: 0.2em;
`

const NowPlayingArtistName = styled.div`
    margin-bottom: 1em;
`

const NowPlayingStatus = styled.div`
    margin-bottom: 1em;
`

const ProgressContainer = styled.div`
    border: 1px solid #eee;
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
`

const ProgressBar = styled.div`
    background-color: #eee;
    height: 4px;
    width: ${props => props.width};
`
// TODO SET DEFAULT PROPS
// TODO PULL THE PROGRESS BAR TO ITS OWN COMPONENT TO AVOID RE-RENDERING THE OTHER COMPONENTS
const Player = ({ currentSong }) => {
    console.log(currentSong);
    const { item, is_playing, progress_ms } = currentSong
    const backgroundStyles = {
        backgroundImage: `url(${item.album.images[0].url})`,
    }
    const progressBarWidth = (progress_ms * 100) / item.duration_ms + '%'

    return (
        <Container>
            <NowPlayingImg>
                <img src={item.album.images[0].url} />
            </NowPlayingImg>
            <NowPlayingWrapper>
                <NowPlayingSongName>{item.name}</NowPlayingSongName>
                <NowPlayingArtistName>
                    {item.artists[0].name}
                </NowPlayingArtistName>
                <NowPlayingStatus>
                    {is_playing ? 'Playing' : 'Paused'}
                </NowPlayingStatus>
                <ProgressContainer>
                    <ProgressBar width={progressBarWidth} />
                </ProgressContainer>
            </NowPlayingWrapper>
            <div className="background" style={backgroundStyles} />{' '}
        </Container>
    )
}
export default Player
