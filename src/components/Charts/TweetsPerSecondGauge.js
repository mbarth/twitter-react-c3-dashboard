import React from 'react';
import './TweetsPerSecondGauge.css';
import 'c3/c3.css';
var c3 = require("c3");
import Websocket from 'react-websocket';

const TweetsPerSecondGauge = React.createClass({
    renderGauge: function (data) {
        this.chart = c3.generate({
            bindto: '#gauge',
            data: {
                columns: [['data', 50]],
                type: 'gauge',
            },
            gauge: {
                label: {
                    format: function (value, ratio) {
                        return value; //returning the value and not the ratio
                    },
                },
                min: 0,
                max: 50,
                units: 'Tweets/Sec' //text for the label
            },
            color: {
                pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
                threshold: {
                    values: [10, 20, 30, 50]
                }
            },
            size: {
                height: 180
            },
            title: {
                text: 'Tweet Frequency'
            },
            tooltip: {
                format: {
                    name: function(name, ratio, id, index) {return 'Tweets';},
                    title: function (d) { return 'Tweets/Sec'; },
                    value: function (value, ratio, id) {
                        return value;
                    }
                }
            },
            padding: {
                bottom: 10
            }
        });
    },
    componentDidMount: function () {
        this.renderGauge(this.props.data);
    },
    handleData(data) {
        let result = JSON.parse(data);
        let now = Date.now();
        let perSecond = Math.round(result.total_count / ((now - result.start_time)/1000));
        this.chart.load({
            columns: [['data', perSecond]]
        });
    },
    render: function () {
        return (
            <div className="gauge-chart" id="gauge">
                <Websocket url='ws://localhost:9005' onMessage={this.handleData} reconnect={true}/>
            </div>
        )
    }
});

export default TweetsPerSecondGauge;