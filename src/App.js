import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

const fakeServerData = {
  user: {
    name: 'Jamal',
    playlists: [
      {
        name: 'My Fav',
        songs: [
          { name: 'Beat it', duration: 70000 },
          { name: 'Le song', duration: 70000 },
          { name: 'The son', duration: 70000 },
          { name: 'cheese cake', duration: 70000 },
          { name: 'fefe', duration: 70000 },
          { name: 'miss you', duration: 70000 }
        ]
      },
      {
        name: 'HipHop',
        songs: [
          { name: 'Beat it', duration: 70000 },
          { name: 'Le song', duration: 70000 },
          { name: 'The son', duration: 70000 },
          { name: 'cheese cake', duration: 70000 },
          { name: 'fefe', duration: 70000 },
          { name: 'miss you', duration: 70000 }
        ]
      },
      {
        name: 'RnB',
        songs: [
          { name: 'Beat it', duration: 70000 },
          { name: 'Le song', duration: 70000 },
          { name: 'The son', duration: 70000 },
          { name: 'cheese cake', duration: 70000 },
          { name: 'fefe', duration: 70000 },
          { name: 'miss you', duration: 70000 }
        ]
      },
      {
        name: 'Local',
        songs: [
          { name: 'Beat it', duration: 70000 },
          { name: 'Le song', duration: 70000 },
          { name: 'The son', duration: 70000 },
          { name: 'cheese cake', duration: 70000 },
          { name: 'fefe', duration: 70000 },
          { name: 'miss you', duration: 70000 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{this.props.playlists.length} playlist</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{Math.round(totalDuration / 60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input
          type="text"
          onChange={e => this.props.onTextChange(e.target.value)}
        />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{ ...defaultStyle, width: '25%', display: 'inline-block' }}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => (
            <li>{song.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData
      });
    }, 1000);
  }
  render() {
    let playlistToRender = this.state.serverData.user
      ? this.state.serverData.user.playlists.filter(playlist =>
          playlist.name
            .toLowerCase()
            .includes(this.state.filterString.toLowerCase())
        )
      : [];
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1 style={{ ...defaultStyle, fontSize: '54px' }}>
              {this.state.serverData.user.name}
              's Playlist
            </h1>
            <PlaylistCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {playlistToRender.map(playlist => (
              <Playlist playlist={playlist} />
            ))}
          </div>
        ) : (
          <h1 style={defaultStyle}>Loading...</h1>
        )}
      </div>
    );
  }
}

export default App;
