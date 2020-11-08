const SpotifyWebApi = require("spotify-web-api-node")
const Keyv = require("keyv")
const savedSpotifyToken = new Keyv("sqlite://DatabaseFiles/Data/BotInfo.sqlite", { namespace: 'spotifyToken' })

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

module.exports = {
    async getPlaylist(playlistID) {
        let accesstoken = "AQDo9BhWaqkKhWfOL6mYpu9VkQcyVT-bsURWPk0rb3kfyjgNaAsI8FdHJNBmQbDJWmgqFQ1JF0cV3CPng2sVF2LR0Rjrx251t7SsgThy4H3N7ZFPgDkR1FM-hnVjdMme-oBn4vTtJVHGnTyM90dxBd1UYxfLeC4vRptt77k"
        let spotifyToken = await savedSpotifyToken.get(accesstoken)
        let success

        if (!spotifyToken) {
            await spotifyApi.clientCredentialsGrant().then(
                async function(data) {
                    token = data.body["access_token"]
                    expiresIn = data.body["expires_in"]
                    console.log('Generated new token\nThe access token expires in ' + expiresIn + ' seconds\nThe access token is ' + token)

                    spotifyApi.setAccessToken(token)
                    await savedSpotifyToken.set(accesstoken, `${token}`,  ((parseInt(expiresIn) * 1000) - (60 * 1000)))
                    success = true
                },
                function (err) {
                    console.log('Something went wrong when retrieving an access token', err.message)
                    success = false
                }
            )
        } else {
            spotifyApi.setAccessToken(spotifyToken)
            success = true
        }

        if (success) {
            let Alldata
            let SongQueries = []
            await spotifyApi.getPlaylist(playlistID).then(function(data) {
                Alldata = data.body

                let items = Alldata.tracks.items
                items.forEach(data => {
                    Name = data.track.name
                    Artists = data.track.artists
                    ArtistsName = []
                    Artists.forEach(artist => {
                        ArtistsName.push(artist.name)
                    })
                    SongQueries.push(`${Name} ${ArtistsName.join(", ")}`)
                })
            }, function (err) {
                if (err.statusCode == 404) return
                else console.log("Something went wrong!", err)
            })

            if (!SongQueries[0]) return false
            data = {
                songQueries: SongQueries,
                name: `${Alldata.name}`,
                url: Alldata.external_urls.spotify
            }
            return data
        }
        else return false
    },
    async getTrack(trackID) {
        let accesstoken = "AQDo9BhWaqkKhWfOL6mYpu9VkQcyVT-bsURWPk0rb3kfyjgNaAsI8FdHJNBmQbDJWmgqFQ1JF0cV3CPng2sVF2LR0Rjrx251t7SsgThy4H3N7ZFPgDkR1FM-hnVjdMme-oBn4vTtJVHGnTyM90dxBd1UYxfLeC4vRptt77k"
        let spotifyToken = await savedSpotifyToken.get(accesstoken)
        if (!spotifyToken) {
            await spotifyApi.clientCredentialsGrant().then(
                async function(data) {
                    token = data.body['access_token']
                    expiresIn = data.body['expires_in']
                    console.log('Generated new token\nThe access token expires in ' + expiresIn + ' seconds\nThe access token is ' + token)
    
                    spotifyApi.setAccessToken(token)
                    await savedSpotifyToken.set(accesstoken, `${token}`, ((parseInt(expiresIn) * 1000) - (60 * 1000)))
                    success = true
                }, function(err) {
                    console.log('Something went wrong when retrieving an access token', err.message);
                    success = false;
                }
            )
        } else {
            spotifyApi.setAccessToken(spotifyToken)
            success = true
        }

        if (success) {
            let Alldata
            let SongQuery
            await spotifyApi.getTrack(trackID).then(function(data) {
                Alldata = data.body
                ArtistsData = Alldata.artists
                ArtistNames = []
                ArtistsData.forEach(artist => {
                    ArtistNames.push(artist.name)
                })
                SongQuery = `${Alldata.name} ${ArtistNames.join(", ")}`
            }, function(err) {
                if (err.statusCode == 404) return
                else console.log('Something went wrong!', err)
            })
        }
        else return false
    }
}