import React, {Component} from 'react';

import './App.css';
import Header from '../Header/Header'
import TopTwitterHandlesTable from '../Tables/TopTwitterHandlesTable';
import FilterTwitterCount from '../Metrics/FilterTwitterCount';
import TwitterMoodPieChart from '../Charts/TwitterMoodPieChart';
import TweetsPerSecondGauge from '../Charts/TweetsPerSecondGauge';
import DeviceBarChart from '../Charts/DeviceBarChart';
import HashtagBarChart from '../Charts/HashtagBarChart';
import Footer from '../Footer/Footer';

class App extends Component {
    render() {
        return (
            <div className="App container-full">
                <div className="row">
                    <Header />
                </div>
                <div className="row grey-underline"><FilterTwitterCount /></div>
                <div className="row grey-underline">
                    <div className="col-md-6">
                        <TwitterMoodPieChart />
                    </div>
                    <div className="col-md-6">
                        <TweetsPerSecondGauge />
                    </div>
                </div>
                <div className="row grey-underline">
                    <div className="col-md-6">
                        <DeviceBarChart />
                    </div>
                    <div className="col-md-6">
                        <HashtagBarChart />
                    </div>
                </div>
                <div className="row">
                    <TopTwitterHandlesTable />
                </div>
                <div className="row">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
