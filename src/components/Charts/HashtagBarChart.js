import React from 'react';
import 'c3/c3.css';
import './HashtagBarChart.css';
import Websocket from 'react-websocket';

let c3 = require("c3");
let pattern = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
    '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];

const HashtagBarChart = React.createClass({
    renderBarChart: function (data) {
        this.chart = c3.generate({
            bindto: '#horizontal-bar-chart',
            title: {
                text: 'Trending Hashtags'
            },
            size: {
                height: 400
            },
            padding: {
                bottom: 10
            },
            data: {
                x: 'x',
                columns: [[]],
                type: 'bar',
                labels: true,
                color: function (color, d) {
                    return pattern[d.index];
                }
            },
            bar: {
                width: {
                    ratio: 0.85 // this makes bar width 50% of length between ticks
                }
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category'
                }
            },
            legend: {show: false},
            tooltip: {
                contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                    let $$ = this, config = $$.config,
                        titleFormat = config.tooltip_format_title || defaultTitleFormat,
                        nameFormat = config.tooltip_format_name || function (name) {
                                return name;
                            },
                        valueFormat = config.tooltip_format_value || defaultValueFormat,
                        text, i, title, value, name, bgcolor;
                    for (i = 0; i < d.length; i++) {
                        if (!(d[i] && (d[i].value || d[i].value === 0))) {
                            continue;
                        }
                        if (!text) {
                            title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                            text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                        }
                        name = nameFormat(d[i].name);
                        value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                        bgcolor = pattern[d[i].index];
                        text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                        text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                        text += "<td class='value'>" + value + "</td>";
                        text += "</tr>";
                    }
                    return text + "</table>";
                }
            }
        });
    },
    componentDidMount: function () {
        this.renderBarChart(this.props.data);
    },
    processData(data) {
        let result = JSON.parse(data);
        let chartData = [];
        let labels = [];
        labels.push('x');
        let values = [];
        values.push('Weight (Discounted Rate of .99)');
        for (let i = 0; i < result.hashtag_stats.length; i++) {
            labels.push(result.hashtag_stats[i].hashtag);
            values.push(Math.floor(result.hashtag_stats[i].weight));
        }
        chartData.push(labels);
        chartData.push(values);
        this.chart.load({
            columns: chartData
        });
    },
    render: function () {
        return (
            <div id="horizontal-bar-chart">
                {/*TODO extract to config file*/}
                <Websocket url='ws://localhost:9003'
                           onMessage={this.processData}
                           reconnect={true}/>
            </div>
        )
    }
});

export default HashtagBarChart;