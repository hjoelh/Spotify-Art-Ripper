import React from 'react';
const SpotifyWebApi = require('spotify-web-api-node');


function App() {

  const spotifyApi = new SpotifyWebApi();

  const getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  const params = getHashParams()


  const [loggedIn, setLoggedIn] = React.useState(params.access_token ? true : false)
  const [nowPlaying, setNowPlaying] = React.useState({
    song: 'Not Checked',
    artist: 'test',
    image: ''
  })
  const [track, setTrack] = React.useState('')

  if (params.access_token) {
    spotifyApi.setAccessToken(params.access_token)
    
  }


  const getNowPlaying = () => {
    spotifyApi.getTrack('3zmEykbQ6rlvYz4qJHdWMC') 
      .then(res => {
        setNowPlaying({
           artist: res.body.artists[0].name,
          song: res.body.album.name,
          image: res.body.album.images[0].url 
        })
      })
  }




  return (
    <div className="App">

    <h1>{loggedIn ? 'Logged in' : 'Logged out'}</h1>

      <a href="http://localhost:8888">
        <button>Login with Spotify</button>
      </a>

      <div className='nowplaying'>{nowPlaying.song} by {nowPlaying.artist}</div>

      <div> <img src={nowPlaying.image} alt="album art"/> </div>



      <div className='nowPlayingBtn' onClick={getNowPlaying}>Click to get now playing</div>


    </div>

  );
}

export default App;
