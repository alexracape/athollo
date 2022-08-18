import React from 'react';

class Track extends React.Component {

    constructor(props) {
        super(props);
        this.selectTrack = this.selectTrack.bind(this);
    }

    selectTrack() {
        this.props.onSelect(this.props.track)
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track["name"]}</h3>
                    <p>{this.props.track["artist"]} | {this.props.track["album"]}</p>
                </div>
                <button className="Track-action" onClick={this.selectTrack}>+</button>
            </div>
        )
    }
}

export default Track;