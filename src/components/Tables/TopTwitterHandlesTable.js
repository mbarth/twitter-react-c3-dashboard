import React from 'react';
import './TopTwitterHandlesTable.css';
import Websocket from 'react-websocket';
import TwitterUserRow from './TwitterUserRow';

class TopTwitterHandlesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
    }

    handleData(data) {
        let result = JSON.parse(data);
        let rows = [];
        for (let i = 0; i < result.user_stats.length; i++) {
            rows.push(<TwitterUserRow user={result.user_stats[i]} key={result.user_stats[i].username}/>);
        }
        this.setState({rows: rows});
    }

    render() {
        return (
            <div>
                <h4 className="sub-header">Top Twitter Users</h4>
                <div className="twitter">
                    <table className="table table-striped table-bordered" id="twitter-users">
                        <thead>
                        <tr>
                            <th>Twitter Handle</th>
                            <th>Count</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.rows}</tbody>
                    </table>
                </div>
                {/*TODO extract to config file*/}
                <Websocket url='ws://localhost:9001'
                           onMessage={this.handleData.bind(this)}
                           reconnect={true}/>
            </div >);
    }
}

export default TopTwitterHandlesTable;