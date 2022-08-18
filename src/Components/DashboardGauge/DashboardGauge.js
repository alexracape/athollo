import React from 'react';
import Gauge from 'react-radial-gauge';
import './DashboardGauge.css'

class DashboardGauge extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initialStat
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <div className="gauge-container">
                <Gauge 
                    currentValue={Math.round(this.props.stats[this.state.value] * 100)}
                    size={this.props.gaugeSpecs['size']} 
                    tickLength={this.props.gaugeSpecs['tickLength']} 
                    tickWidth={this.props.gaugeSpecs['tickWidth']} 
                    dialColor={this.props.gaugeSpecs['dialColor']} 
                    tickColor={this.props.gaugeSpecs['tickColor']} 
                    progressColor={this.props.gaugeSpecs['progressColor']} 
                    needleColor={this.props.gaugeSpecs['needleColor']} 
                    needleBaseColor={this.props.gaugeSpecs['needleBaseColor']}
                />
                
                <form>
                    <select className="select-menu" value={this.state.value} onChange={this.handleChange}>
                        <option value="acousticness">Acousticness</option>
                        <option value="danceability">Danceability</option>
                        <option value="energy">Energy</option>
                        <option value="instrumentalness">instrumentalness</option>
                        <option value="liveness">Liveness</option>
                        <option value="speechiness">Speechiness</option>
                    </select>
                </form>
            </div>
        )
    }

}

export default DashboardGauge;