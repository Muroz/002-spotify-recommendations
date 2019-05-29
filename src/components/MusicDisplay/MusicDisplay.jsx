// TODO CREATE MUSIC DISPLAY

import React, { Component } from 'react'
import Player from '../Player/Player'
import RecommendedDisplay from '../RecommendedDisplay/RecommendedDisplay';

// pass in a token
class MusicDisplay extends Component {
    state = {
		currentSong: null,
		recommended: []
	}

    componentDidMount() {
		// TODO REPLACE WITH CONTEXT
        const { token } = this.props
        if (token) {
            this.interval = setInterval(
                () => this.getCurrentlyPlaying(token),
                1000
            )
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

	// TODO PASS THE TOKEN USING CONTEXT SO THAT IT IS ACCESSIBLE TO EVERY OTHER FUNCTION
    getCurrentlyPlaying = token => {
        // Make a call using the token
        fetch('https://api.spotify.com/v1/me/player', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            // TODO Look into credentials variable
        }).then(async response => {
            // THIS BREAKS IF THERE ARE NO ITEMS UNDER USE
            if (response.status === 200) {
				const data = await response.json()
				const { currentSong } = this.state;
				const oldSongID = currentSong && currentSong.item && currentSong.item.id;
				const newSongID = data && data.item && data.item.id;
				const isNewSong = newSongID !== oldSongID
                this.setState({
					currentSong: data,
                }, () => {

					const { item } = data;
					const { id } = item;
					if( !id ) {
						// TODO ADD ERROR HANDLER
						console.log('no id');
						return;
					}

					if (!isNewSong){
						return;
					}
					fetch(`https://api.spotify.com/v1/recommendations?limit=8&seed_tracks=${id}`, {
						method: 'GET',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						// TODO Look into credentials variable
					}).then(async response => {
						const recommended = await response.json();
						this.setState({
							recommended: recommended.tracks
						})
						// TODO ADD ROTATING LISTS OF WITH THE SONGS AND ADD PLAY TO IT
					});
				})
            } else {
                this.setState({
                    currentSong: null,
                });
            }
        })
	}

    render() {
        const { currentSong, recommended } = this.state
        return (
            <div>
                {currentSong ? (
                    <Player currentSong={currentSong} />
                ) : (
                    <div>No song currently playing</div>
				)}
				<RecommendedDisplay
					recommended={recommended}
				/>
            </div>
        )
    }
}

export default MusicDisplay
