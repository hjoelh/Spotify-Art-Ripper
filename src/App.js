import React from 'react';
const request = require('request');

function App() {

  const regex1 = /(?<=\/).{22}(?=\?)/g

  const [track, setTrack] = React.useState('')
  const [url, setUrl] = React.useState('')

  const [nowPlaying, setNowPlaying] = React.useState({
    song: 'paste a url',
    artist: 'below',
    image: ''
  })

  const URLinput = (e) => {
    setUrl(e.target.value)
    console.log(url)
  }

var client_id = process.env.REACT_APP_ID; 
var client_secret = process.env.REACT_APP_SECRET; 


  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
   };
   
   const pingSpotify = ur => {

   request.post(authOptions, function(error, response, body) {
       if (!error && response.statusCode === 200) {
      
         var token = body.access_token;
         var options = {
           url: 'https://api.spotify.com/v1/tracks/'+ ur,
           headers: {
             'Authorization': 'Bearer ' + token
           },
           json: true
         };
         request.get(options, function(error, response, body) {
           setNowPlaying({
                     artist: body.artists[0].name,
                    song: body.album.name,
                    image: body.album.images[0].url 
                  })

         });
       }
      });
   
   }

  return (
    <div className="App">

      <div className='nowplaying'>{nowPlaying.song} by {nowPlaying.artist}</div>

      <div> <img src={nowPlaying.image} alt="album art"/> </div>

      <div className='nowPlayingBtn'  onClick={ () => pingSpotify(url.match(regex1))} >Search</div>

      <input placeholder='paste url here' className='nowPlayingBtn' type="text" autoFocus onChange={URLinput} value={url}/>

    </div>

  );
}

export default App;
