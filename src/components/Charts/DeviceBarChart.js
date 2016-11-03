import React from 'react';
import 'c3/c3.css';
import './DeviceBarChart.css';
import Websocket from 'react-websocket';

let c3 = require("c3");
let d3 = require("d3");
let colorScale = d3.scale.category20b();

const DeviceBarChart = React.createClass({
    renderBarChart: function (data) {
        this.chart = c3.generate({
            bindto: '#bar-chart',
            size: {
                height: 400
            },
            title: {
                text: 'Popular Twitter Devices'
            },
            data: {
                x: 'x',
                columns: [[]],
                type: 'bar',
                labels: true,
                color: function (color, d) {
                    return colorScale(d.index);
                }
            },
            bar: {
                width: {
                    ratio: 0.85 // this makes bar width 85% of length between ticks
                }
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        rotate: 75,
                        multiline: false
                    },
                    height: 130
                },
                y: {
                    min: 0,
                    padding: {top: 12, bottom: 0}
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
                        bgcolor = colorScale(d[i].index);
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
        values.push('Count');
        for (var i = 0; i < result.device_stats.length; i++) {
            labels.push(result.device_stats[i].device);
            values.push(result.device_stats[i].count);
        }
        chartData.push(labels);
        chartData.push(values);
        this.chart.load({
            columns: chartData
        });
    },
    render: function () {
        return (
            <div className="vBarChart" id="bar-chart">
                {/*TODO extract to config file*/}
                <Websocket url='ws://localhost:9004'
                           onMessage={this.processData}
                           reconnect={true}/>
            </div>
        )
    }
});

export default DeviceBarChart;