import React from 'react';
import 'c3/c3.css';
import './TwitterMoodPieChart.css';
import Websocket from 'react-websocket';
let c3 = require("c3");

let colors = {Happy:'#22a30b', Angry:'#ea0e0e', Neutral:'#ffee3a'};

const TwitterMoodPieChart = React.createClass({
    renderPieChart: function (data) {
        this.chart = c3.generate({
            bindto: '#piechart',
            data: {
                columns: [[]],
                type: 'pie',
                color: function (color, d) {
                    return colors[d];
                }
            },
            size: {
                height: 250
            },
            title: {
                text: 'Tweet Sentiment'
            }
        });
    },
    componentDidMount: function () {
        this.renderPieChart(this.props.data);
    },
    processData(data) {
        let result = JSON.parse(data);
        let chartData = [];
        for (let i=0; i<result.mood_stats.length; i++) {
            let mood = [result.mood_stats[i].mood, result.mood_stats[i].count];
            chartData.push(mood);
        }
        this.chart.load({
            columns: chartData
        });
    },
    render: function () {
        return (
            <div className="pie-chart" id="piechart">
                {/*TODO extract to config file*/}
                <Websocket url='ws://localhost:9002'
                           onMessage={this.processData}
                           reconnect={true}/>
            </div>
        )
    }
});

export default TwitterMoodPieChart;