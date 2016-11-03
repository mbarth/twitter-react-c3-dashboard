import React from 'react';
import './Header.css';
import logo from './logo.svg';

class Header extends React.Component {
    render() {
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Twitter Dashboard</h2>
            </div>);
    }
}

export default Header;