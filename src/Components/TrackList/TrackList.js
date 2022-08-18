import React from 'react';
import Track from '../Track/Track'

class TrackList extends React.Component {

    render(){
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    return <Track key={track.id} track={track} onSelect={this.props.onSelect}/>
                })}
            </div>
        )
    }
}

export default TrackList