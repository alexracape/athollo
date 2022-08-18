const clientId = '1f54c2244d494eb794495c1a79f0f5eb';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    
    getAccessToken() {
        if (accessToken){
            return accessToken;
        }   

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}&show_dialog=true`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);

        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {Authorization: `Bearer ${accessToken}`}
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse)
            if(!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))

        })
    },

    getAudioFeatures(track) {
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);

        return fetch(
            `https://api.spotify.com/v1/audio-features/${track.id}`,
            {
                headers: {Authorization: `Bearer ${accessToken}`}
            }
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            console.log(jsonResponse)
            if(!jsonResponse.type === "audio_features"){
                return {}
            }
            
            return {
                danceability: jsonResponse.danceability,
                energy: jsonResponse.energy,
                loudness: jsonResponse.loudness,
                speechiness: jsonResponse.speechiness,
                acousticness: jsonResponse.acousticness,
                instrumentalness: jsonResponse.instrumentalness,
                liveness: jsonResponse.liveness,
                tempo: jsonResponse.tempo
            }
        })
    }

}

export default Spotify;