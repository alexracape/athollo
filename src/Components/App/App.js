import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import StatList from '../StatList/StatList'
import Spotify from '../../util/Spotify'
import Gauge from 'react-radial-gauge';
import DashboardGauge from '../DashboardGauge/DashboardGauge'

import './App.css';
 

/*
TODO
- Needle Animation: how to animate between two states / on state change
- Dynamic CSS to allow for changing window size / mobile
- Figure out more appealing look for center search console
- Place to indicat currently selected song
- Athollo logo
- Figure out consistent font
- Stats for song you are currently listening to
- What does each stat mean on hover

*/


class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = { 
      searchResults: [],
      currentSong: {},
      songStats: {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        speechiness: 0
      }
    }

    this.selectTrack = this.selectTrack.bind(this);
    this.search = this.search.bind(this);
  }

  selectTrack(track) {
    if (this.state.currentSong === track) {
      return;
    }
    this.setState({currentSong: track});
    Spotify.getAudioFeatures(track).then(audioFeatures => {
      this.setState({songStats: audioFeatures})
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    
    const largeGaugeSpecs = {
      size: 400,
      tickLength: 10,
      tickWidth: 2,
      dialColor: '#3766fc',
      tickColor: '#3766fc',
      progressColor: '#1533c5',
      needleColor: '#fb2d1e',
      needleBaseColor: '#04040b'
    }

    const smallGaugeSpecs = {
      size: 200,
      tickLength: 10,
      tickWidth: 2,
      dialColor: '#3766fc',
      tickColor: '#3766fc',
      progressColor: '#1533c5',
      needleColor: '#fb2d1e',
      needleBaseColor: '#04040b'
    }
    
    return (
    <div className="App">
      <h1>Athollo</h1>
      <div className="main-container">
        <DashboardGauge initialStat='energy' stats={this.state.songStats} gaugeSpecs={largeGaugeSpecs}/>
        <div className="center-flex-container">
          <SearchBar className="center-flex-child" onSearch={this.search}/>
          <SearchResults className="center-flex-child" searchResults={this.state.searchResults} onSelect={this.selectTrack}/>
           <div className="small-gauge-container center">
            <DashboardGauge initialStat='danceability' stats={this.state.songStats} gaugeSpecs={smallGaugeSpecs}/>
            <DashboardGauge initialStat='acousticness' stats={this.state.songStats} gaugeSpecs={smallGaugeSpecs}/>
          </div> 
        </div>
        <DashboardGauge initialStat='speechiness' stats={this.state.songStats} gaugeSpecs={largeGaugeSpecs}/>
      </div>
      <h2>Current Song is {this.state.currentSong.name}</h2>
    </div>
  )
    
  }

}

export default App;
