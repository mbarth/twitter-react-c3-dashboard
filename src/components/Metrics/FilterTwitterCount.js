import React from 'react';
import './FilterTwitterCount.css';
import Websocket from 'react-websocket';

class FilterTwitterCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'N/A',
            count: 0
        }
    }

    handleData(data) {
        let result = JSON.parse(data);
        if (result) {
            this.setState({filter: result.filter, count: result.total_count});
        }
    }

    render() {
        return (
            <span>
                <h4 className="text-muted">Filtering on:&nbsp;
                    <span className="tweet-info">{this.state.filter}</span>
                    &nbsp;Tweets: <span className="tweet-info">{this.state.count}</span></h4>
                {/*TODO extract to config file*/}
                <Websocket url='ws://localhost:9005'
                           onMessage={this.handleData.bind(this)}
                           reconnect={true}/>
            </span>);
    }
}

export default FilterTwitterCount;