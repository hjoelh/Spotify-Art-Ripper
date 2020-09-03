import React from 'react';
const SpotifyWebApi = require('spotify-web-api-node');


function App() {

  const spotifyApi = new SpotifyWebApi();

  const regex1 = /(?<=\/).{22}(?=\?)/g

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
  const [url, setUrl] = React.useState('')

  if (params.access_token) {
    spotifyApi.setAccessToken(params.access_token)
    
  }


  const getNowPlaying = () => {
    spotifyApi.getTrack(url.match(regex1)) 
      .then(res => {
        setNowPlaying({
           artist: res.body.artists[0].name,
          song: res.body.album.name,
          image: res.body.album.images[0].url 
        })
      })
  }

const URLinput = (e) => {
  setUrl(e.target.value)
}




  return (
    <div className="App">

    <h1>{loggedIn ? 'Logged in' : 'Logged out'}</h1>

      <a href="http://localhost:8888">
        <button>Login with Spotify</button>
      </a>

      <div className='nowplaying'>{nowPlaying.song} by {nowPlaying.artist}</div>

      <div> <img src={nowPlaying.image} alt="album art"/> </div>



      <div className='nowPlayingBtn' onClick={getNowPlaying}>Search</div>


      <input placeholder='paste url here' className='nowPlayingBtn' type="text" autoFocus onChange={URLinput} value={url}/>
   

    </div>

  );
}

export default App;
