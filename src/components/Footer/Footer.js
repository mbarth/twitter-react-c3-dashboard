import React, { Component } from 'react';
import './Footer.css';
import Link from '../Link/Link';

class Footer extends Component {

    render() {
        return (
            <div className='Footer_root'>
                <div className='Footer_container'>
                    <span className='Footer_text'>© Your Company</span>
                    <span className='Footer_spacer'>·</span>
                    <Link className='Footer_link' to="/">Home</Link>
                    <span className='Footer_spacer'>·</span>
                    <Link className='Footer_link' to="/link_2">Link 2</Link>
                    <span className='Footer_spacer'>·</span>
                    <Link className='Footer_link' to="/link_3">Link 3</Link>
                </div>
            </div>
        );
    }

}

export default Footer;
