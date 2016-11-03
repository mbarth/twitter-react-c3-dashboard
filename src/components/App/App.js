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
            <div className="App">
                <Header />
                <div className="filter-info"><FilterTwitterCount /></div>
                <TwitterMoodPieChart />
                <TweetsPerSecondGauge />
                <DeviceBarChart />
                <HashtagBarChart />
                <TopTwitterHandlesTable />
                <Footer />
            </div>
        );
    }
}

export default App;
