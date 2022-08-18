import React from 'react';
import Stat from '../Stat/Stat'
import Gauge from 'react-radial-gauge';
import './StatList.css'


class StatList extends React.Component {

    render(){
        const confidenceStats = ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness'];
        return (
            <div className="stat-list">
                {
                    Object.keys(this.props.stats).map(stat => {  
                        let value = this.props.stats[stat];
                        
                        if (confidenceStats.includes(stat)) {
                            value *= 100;
                        }

                        return (
                            <div>
                                <Gauge currentValue={Math.round(value)}/>
                                <Stat statName={stat} statValue={this.props.stats[stat]}/>
                            </div>
                        )                        
                    })
                }
            </div>
        )
    }
}

export default StatList