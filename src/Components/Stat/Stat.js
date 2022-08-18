import { div } from 'prelude-ls';
import React from 'react';

class Stat extends React.Component {
    
    
    render() {
        return (
            <div className="Stat">
                <h2>{this.props.statName} = {this.props.statValue}</h2>
            </div>
        )
    }
}

export default Stat;