import React from 'react';
import './TwitterUserRow.css';

const TwitterUserRow = React.createClass({
    render() {
        return (
            <tr>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.tweets}</td>
            </tr>
        );
    }
});

export default TwitterUserRow;
